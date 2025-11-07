// ================================================================
// CONFIGURACIÓN DEL MÓDULO
// ================================================================
const currentModuleId = "3";
const requiredModuleKey = "module_2_exam"; // ¡Requiere Módulo 2!

const moduleData = {
    "3": {
        title: "Módulo 3: Tecnología y Servicios",
        lessons: [
            { id: "3_1", title: "Cómputo (EC2, Lambda, etc.)", contentKey: "lesson_3_1", examKey: "exam_3_1" },
            { id: "3_2", title: "Almacenamiento (S3, EBS, EFS)", contentKey: "lesson_3_2", examKey: "exam_3_2" },
        ]
    }
};

// ================================================================
// BASE DE DATOS DE CONTENIDO
// ================================================================
const contentDB = {
    "lesson_3_1": `<h3>Lección 3.1: Cómputo</h3><p>Contenido profundo de la lección sobre EC2, Tipos de Instancias, AMI, Lambda, Fargate, etc. irá aquí.</p>`,
    "lesson_3_2": `<h3>Lección 3.2: Almacenamiento</h3><p>Contenido profundo de la lección sobre S3, Clases de Almacenamiento, EBS, EFS, etc. irá aquí.</p>`
};

// ================================================================
// BASE DE DATOS DE EXÁMENES
// ================================================================
const examDB = {
    "exam_3_1": {
        title: "Examen: Servicios de Cómputo",
        questions: [
            { text: "¿Qué servicio es IaaS y te da control total del S.O.?", options: ["EC2", "Lambda", "RDS", "Fargate"], correctAnswer: 0, explanation: "EC2 (Elastic Compute Cloud) es IaaS." }
        ]
    },
    "exam_3_2": {
        title: "Examen: Servicios de Almacenamiento",
        questions: [
            { text: "¿Qué servicio es para almacenamiento de objetos?", options: ["S3", "EBS", "EFS", "RDS"], correctAnswer: 0, explanation: "S3 (Simple Storage Service) es almacenamiento de objetos." }
        ]
    }
};

// ================================================================
// LÓGICA DE LA PÁGINA (Común para todos los módulos)
// ================================================================
let lessonListEl, mainContentEl, moduleTitleEl, studyContentEl, quizContainerEl;
let currentLessonId, currentExamKey;
let progress = {};
document.addEventListener('DOMContentLoaded', () => {
    moduleTitleEl = document.getElementById('module-title');
    lessonListEl = document.getElementById('lesson-list');
    mainContentEl = document.getElementById('lesson-main-content');
    studyContentEl = document.getElementById('lesson-study-content');
    quizContainerEl = document.getElementById('lesson-quiz-container');
    progress = JSON.parse(localStorage.getItem('awsProgress')) || {};

    // ¡¡BLOQUEO DESACTIVADO TEMPORALMENTE!!
    // if (requiredModuleKey && !progress[requiredModuleKey]) {
    //     moduleTitleEl.textContent = "Módulo Bloqueado";
    //     studyContentEl.innerHTML = `<div class="analogy-box" style="border-color: var(--error-red);">
    //         <h4>Módulo Bloqueado</h4>
    //         <p>Debes completar el <strong>Módulo ${currentModuleId - 1}</strong> al 100% para desbloquear este contenido.</p>
    //         <a href="index.html" style="color: var(--primary-color); font-weight: bold;">Volver al inicio</a>
    //         </div>`;
    //     lessonListEl.innerHTML = '<h3>Lecciones</h3><div class="lesson-item locked"><span class="status-icon">🔒</span><span>Módulo Bloqueado</span></div>';
    //     return;
    // }

    const module = moduleData[currentModuleId];
    if (!module) {
        moduleTitleEl.textContent = "Error";
        studyContentEl.innerHTML = "<p>Módulo no encontrado. <a href='index.html'>Volver al inicio</a>.</p>";
        return;
    }
    moduleTitleEl.textContent = module.title;
    populateLessonList(module.lessons);
    setupEventListeners();
});
function populateLessonList(lessons) {
    lessonListEl.innerHTML = '<h3>Lecciones</h3>';

    // ¡¡BLOQUEO DE LECCIÓN DESACTIVADO TEMPORALMENTE!!
    let previousLessonComplete = true; 

    lessons.forEach(lesson => {
        const lessonKey = `lesson_${lesson.id}_complete`;
        const isComplete = progress[lessonKey];
        const lessonEl = document.createElement('div');
        lessonEl.className = 'lesson-item';
        lessonEl.dataset.lessonId = lesson.id;
        let icon = isComplete ? '✅' : '📖';
        if (previousLessonComplete) {
            lessonEl.classList.add('unlocked');
            lessonEl.dataset.contentKey = lesson.contentKey;
            lessonEl.dataset.examKey = lesson.examKey;
        } else {
            icon = '🔒';
            lessonEl.classList.add('locked');
        }
        lessonEl.innerHTML = `<span class="status-icon">${icon}</span><span>${lesson.title}</span>`;
        lessonListEl.appendChild(lessonEl);
        
        // ¡¡BLOQUEO DESACTIVADO!!
        // if (!isComplete) previousLessonComplete = false;
    });
}
function setupEventListeners() {
    lessonListEl.addEventListener('click', (e) => {
        const lessonItem = e.target.closest('.lesson-item');
        if (lessonItem && !lessonItem.classList.contains('locked')) {
            document.querySelectorAll('.lesson-item.active').forEach(item => item.classList.remove('active'));
            lessonItem.classList.add('active');
            currentLessonId = lessonItem.dataset.lessonId;
            currentExamKey = lessonItem.dataset.examKey;
            loadStudyContent(lessonItem.dataset.contentKey);
        }
    });
    mainContentEl.addEventListener('scroll', () => {
        const btn = document.getElementById('btn-hacer-examen');
        if (btn) {
            const isAtBottom = mainContentEl.scrollTop + mainContentEl.clientHeight >= mainContentEl.scrollHeight - 50;
            if (isAtBottom) btn.style.display = 'block';
        }
    });
    mainContentEl.addEventListener('click', (e) => {
        if (e.target.id === 'btn-hacer-examen') loadQuiz(currentExamKey);
        if (e.target.id === 'btn-repasar-tematica') {
            const contentKey = contentDB[`lesson_${currentLessonId}`] ? `lesson_${currentLessonId}` : null;
            if(contentKey) loadStudyContent(contentKey);
        }
        const label = e.target.closest('.options label');
        if (label) {
            const input = label.querySelector('input[type="radio"]');
            const optionsDiv = label.closest('.options');
            if (!optionsDiv.classList.contains('disabled')) {
                input.checked = true;
                handleQuizAnswer(input);
            }
        }
    });
}
function loadStudyContent(contentKey) {
    const lessonData = contentDB[contentKey];
    studyContentEl.innerHTML = lessonData ? lessonData + `<button id="btn-hacer-examen" class="action-button" style="display: none;">Hacer Examen</button>` : `<p>Error: Contenido no encontrado.</p>`;
    studyContentEl.style.display = 'block';
    quizContainerEl.style.display = 'none';
    quizContainerEl.innerHTML = '';
    mainContentEl.scrollTop = 0;
}
function loadQuiz(examKey) {
    const examData = examDB[examKey];
    if (!examData) {
        quizContainerEl.innerHTML = `<p>Error: Examen no encontrado.</p>`;
        return;
    }
    let html = `<h3>${examData.title}</h3><p>Responde a cada pregunta. La siguiente pregunta aparecerá automáticamente.</p>`;
    examData.questions.forEach((q, index) => {
        const isActive = index === 0;
        html += `<div class="question ${isActive ? 'active' : ''}" id="q-${index}" data-question-index="${index}"><p>${index + 1}. ${q.text}</p><div class="options">`;
        q.options.forEach((option, optionIndex) => {
            html += `<label><input type="radio" name="q-${index}" value="${optionIndex}">${option}</label>`;
        });
        html += `</div><div class="feedback"></div></div>`;
    });
    html += `<div id="quiz-results"></div>`;
    quizContainerEl.innerHTML = html;
    studyContentEl.style.display = 'none';
    quizContainerEl.style.display = 'block';
    mainContentEl.scrollTop = 0;
}
function handleQuizAnswer(input) {
    const questionEl = input.closest('.question');
    const feedbackEl = questionEl.querySelector('.feedback');
    const optionsDiv = input.closest('.options');
    const selectedLabel = input.closest('label');
    const questionIndex = parseInt(questionEl.dataset.questionIndex);
    const userAnswer = parseInt(input.value);
    const qData = examDB[currentExamKey].questions[questionIndex];
    const isCorrect = userAnswer === qData.correctAnswer;
    optionsDiv.classList.add('disabled');
    selectedLabel.classList.add('selected', isCorrect ? 'correct' : 'incorrect');
    feedbackEl.innerHTML = isCorrect ? `<p><strong>¡Correcto!</strong> ${qData.explanation}</p>` : `<p><strong>Incorrecto.</strong> La respuesta correcta era: <strong>${qData.options[qData.correctAnswer]}</strong></p><p><strong>Explicación:</strong> ${qData.explanation}</p>`;
    feedbackEl.className = `feedback ${isCorrect ? 'correct' : 'incorrect'}`;
    const nextQuestionEl = document.getElementById(`q-${questionIndex + 1}`);
    setTimeout(() => {
        if (nextQuestionEl) {
            nextQuestionEl.classList.add('active');
            nextQuestionEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
        } else {
            gradeFullQuiz();
        }
    }, 1000);
}
function gradeFullQuiz() {
    const examData = examDB[currentExamKey];
    let score = 0;
    examData.questions.forEach((q, i) => {
        const selectedInput = document.querySelector(`input[name="q-${i}"]:checked`);
        if (selectedInput && parseInt(selectedInput.value) === q.correctAnswer) score++;
    });
    const resultsEl = document.getElementById('quiz-results');
    resultsEl.style.display = 'block';
    if (score === examData.questions.length) {
        resultsEl.innerHTML = `<h3>¡Aprobado!</h3><p>Tu puntaje: ${score} de ${examData.questions.length} (100%)</p><p>¡Excelente! Has dominado este tema. La siguiente lección ha sido desbloqueada.</p>`;
        resultsEl.className = 'success';
        saveProgress(`lesson_${currentLessonId}_complete`);
        updateLessonListUI();
        checkModuleCompletion(currentModuleId);
    } else {
        resultsEl.innerHTML = `<h3>Sigue intentando...</h3><p>Tu puntaje: ${score} de ${examData.questions.length}.</p><p>Debes obtener 100% para aprobar. Repasa la temática y vuelve a intentarlo.</p>`;
        resultsEl.className = 'failure';
        resultsEl.innerHTML += `<button id="btn-repasar-tematica" class="action-button">Repasar Temática</button>`;
    }
    resultsEl.scrollIntoView({ behavior: 'smooth' });
}
function updateLessonListUI() {
    const module = moduleData[currentModuleId];
    populateLessonList(module.lessons);
    const currentLessonItem = document.querySelector(`.lesson-item[data-lesson-id="${currentLessonId}"]`);
    if (currentLessonItem) currentLessonItem.classList.add('active');
}
function saveProgress(progressKey) {
    progress[progressKey] = true;
    localStorage.setItem('awsProgress', JSON.stringify(progress));
}
function checkModuleCompletion(moduleId) {
    const module = moduleData[moduleId];
    const isModuleComplete = !module.lessons.some(lesson => !progress[`lesson_${lesson.id}_complete`]);
    if (isModuleComplete) {
        console.log(`¡Módulo ${moduleId} completado!`);
        saveProgress(`module_${moduleId}_exam`);
        const congrats = document.createElement('div');
        congrats.innerHTML = `<div style="padding: 1rem; text-align: center; background-color: #e6ffed; border: 1px solid var(--success-green); border-radius: 8px; margin-top: 1rem;"><h4 style="color: var(--success-green); margin: 0;">¡Módulo Completo!</h4></div>`;
        if (!lessonListEl.querySelector('.congrats-message')) {
            congrats.className = 'congrats-message';
            lessonListEl.appendChild(congrats);
        }
    }
}