// ================================================================
// CONFIGURACIÓN DEL MÓDULO
// ================================================================
const currentModuleId = "4";
const requiredModuleKey = "module_3_exam"; // ¡Requiere Módulo 3!

const moduleData = {
    "4": {
        title: "Módulo 4: Facturación y Precios",
        lessons: [
            { id: "4_1", title: "Modelos de Precios y Ahorro", contentKey: "lesson_4_1", examKey: "exam_4_1" },
            { id: "4_2", title: "Herramientas de Costos", contentKey: "lesson_4_2", examKey: "exam_4_2" },
            { id: "4_3", title: "Planes de Soporte de AWS", contentKey: "lesson_4_3", examKey: "exam_4_3" }
        ]
    }
};

// ================================================================
// BASE DE DATOS DE CONTENIDO
// ================================================================
const contentDB = {
    "lesson_4_1": `
        <h3>Modelos de Precios y Ahorro</h3>
        <p>Entender cómo pagas en AWS es tan importante como saber qué servicios usar. El modelo principal es <strong>Pago por Uso</strong>, pero hay formas de ahorrar mucho dinero.</p>
        
        <h4>1. Instancias Bajo Demanda (On-Demand)</h4>
        <ul>
            <li><strong>Qué es:</strong> El modelo base. Pagas por segundo (para EC2) o por hora, sin compromisos.</li>
            <li><strong>Caso de Uso:</strong> Perfecto para cargas de trabajo impredecibles, de corto plazo, o para desarrollo y pruebas.</li>
            <li><strong>Desventaja:</strong> Es el precio más caro.</li>
        </ul>

        <h4>2. Instancias Reservadas (Reserved Instances - RIs)</h4>
        <ul>
            <li><strong>Qué es:</strong> Obtienes un descuento significativo (hasta 72%) a cambio de un compromiso de uso de <strong>1 o 3 años</strong>.</li>
            <li><strong>Caso de Uso:</strong> Cargas de trabajo estables y predecibles (ej: un servidor web que *siempre* está encendido).</li>
            <li><strong>Tipos:</strong>
                <ul>
                    <li><strong>Estándar:</strong> El mayor descuento, pero no puedes cambiar el tipo de instancia.</li>
                    <li><strong>Convertible:</strong> Menor descuento, pero te da la flexibilidad de cambiar el tipo de instancia durante el compromiso.</li>
                </ul>
            </li>
        </ul>

        <h4>3. Savings Plans (Planes de Ahorro)</h4>
        <ul>
            <li><strong>Qué es:</strong> El modelo de ahorro más nuevo y flexible. Te comprometes a un gasto en $ por hora (ej: "$10/hora") durante 1 o 3 años.</li>
            <li><strong>Por qué importa:</strong> A diferencia de las RIs, <strong>se aplica automáticamente a EC2, Fargate y Lambda</strong>, sin importar la familia de instancia, tamaño, S.O. o Región. Es mucho más fácil de gestionar.</li>
            <li><strong>Caso de Uso:</strong> La forma moderna de ahorrar dinero en cómputo si tienes un uso constante.</li>
        </ul>

        <h4>4. Instancias Spot</h4>
        <ul>
            <li><strong>Qué es:</strong> AWS te vende capacidad de cómputo no utilizada con descuentos masivos (hasta 90%).</li>
            <li><strong>La "Trampa" (Cascarita):</strong> AWS puede <strong>interrumpir (terminar) tu instancia en cualquier momento</strong> con solo 2 minutos de aviso si necesita la capacidad de vuelta.</li>
            <li><strong>Caso de Uso:</strong> Cargas de trabajo que <strong>pueden ser interrumpidas</strong>. Ej: procesamiento de big data, renderización de video, simulaciones científicas. <strong>Nunca</strong> uses Spot para una base de datos o un sitio web crítico.</li>
        </ul>
    `,
    "lesson_4_2": `
        <h3>Herramientas de Gestión de Costos</h3>
        <p>AWS te da varias herramientas para monitorear, controlar y optimizar tu gasto.</p>
        
        <h4>1. AWS Cost Explorer</h4>
        <ul>
            <li><strong>Qué es:</strong> Una herramienta visual para <strong>analizar y explorar</strong> tus costos y uso <strong>históricos (hasta 12 meses)</strong>.</li>
            <li><strong>Para qué sirve:</strong> Entender "¿En qué gasté dinero el mes pasado?". Puedes filtrar por servicio, por Región, por etiqueta, etc. También te da un <strong>pronóstico</strong> de gasto.</li>
        </ul>

        <h4>2. AWS Budgets</h4>
        <ul>
            <li><strong>Qué es:</strong> Te permite <strong>establecer un presupuesto</strong> personalizado (ej: "No quiero gastar más de $500 este mes").</li>
            <li><strong>Para qué sirve:</strong> Te envía <strong>alertas</strong> cuando tu gasto *real* o *pronosticado* supera el umbral que definiste. Es proactivo, te avisa ANTES de que el desastre sea muy grande.</li>
        </ul>

        <h4>3. AWS Cost and Usage Report (CUR)</h4>
        <ul>
            <li><strong>Qué es:</strong> El informe de facturación <strong>más detallado posible</strong>. Es un archivo CSV gigante que se entrega en un bucket S3.</li>
            <li><strong>Para qué sirve:</strong> Para análisis de datos muy profundos. Puedes cargar este archivo en herramientas como <strong>Amazon Athena</strong> o Amazon QuickSight para hacer consultas complejas.</li>
        </ul>

        <h4>4. AWS Organizations (Facturación Consolidada)</h4>
        <ul>
            <li><strong>Qué es:</strong> Te permite agrupar múltiples cuentas de AWS bajo una sola "Organización".</li>
            <li><strong>Para qué sirve:</strong> Recibes <strong>una sola factura</strong> para todas tus cuentas. Además, combina el uso de todas las cuentas para darte <strong>descuentos por volumen</strong> (ej: más almacenamiento en S3 = precio más bajo por GB).</li>
        </ul>

        <h4>5. Etiquetas de Asignación de Costos (Cost Allocation Tags)</h4>
        <ul>
            <li><strong>Qué es:</strong> Son "etiquetas" (pares clave-valor) que pones a tus recursos (ej: <code>Proyecto:Alfa</code>, <code>CentroCosto:123</code>).</li>
            <li><strong>Para qué sirve:</strong> Te permiten filtrar tus costos en Cost Explorer o el CUR usando esas etiquetas. Es la única forma de saber cuánto está gastando el "Proyecto Alfa" en EC2, S3 y RDS combinados.</li>
        </ul>
    `,
    "lesson_4_3": `
        <h3>Planes de Soporte de AWS</h3>
        <p>AWS ofrece diferentes niveles de soporte. Es crucial saber qué obtienes con cada uno.</p>

        <h4>1. Basic (Básico)</h4>
        <ul>
            <li><strong>Costo:</strong> Gratis (incluido con todas las cuentas).</li>
            <li><strong>Soporte Técnico:</strong> Ninguno. No puedes crear casos de soporte técnico.</li>
            <li><strong>¿Qué obtienes?:</strong> Acceso a foros, documentación y 7 comprobaciones de <strong>AWS Trusted Advisor</strong> (solo seguridad y límites de servicio).</li>
        </ul>

        <h4>2. Developer (Desarrollador)</h4>
        <ul>
            <li><strong>Costo:</strong> $ (Bajo, ~29/mes).</li>
            <li><strong>Soporte Técnico:</strong> Sí, por <strong>email durante horario laboral</strong>.</li>
            <li><strong>Caso de Uso:</strong> Para pruebas o desarrollo temprano donde no importa el tiempo de respuesta.</li>
            <li><strong>Trusted Advisor:</strong> 7 comprobaciones (igual que Basic).</li>
        </ul>

        <h4>3. Business (Empresarial)</h4>
        <ul>
            <li><strong>Costo:</strong> $$ (Medio, ~100/mes mínimo).</li>
            <li><strong>Soporte Técnico:</strong> <strong>24/7 por email, chat y teléfono</strong>. Tiempos de respuesta garantizados (ej: < 1 hora para sistemas de producción caídos).</li>
            <li><strong>Caso de Uso:</strong> Para cargas de trabajo de producción.</li>
            <li><strong>Trusted Advisor:</strong> ¡Obtienes el <strong>conjunto COMPLETO</strong> de comprobaciones de Trusted Advisor!</li>
            <li><strong>Extra:</strong> Obtienes acceso a la <strong>API de Soporte de AWS</strong> para automatizar casos.</li>
        </ul>

        <h4>4. Enterprise (Corporativo)</h4>
        <ul>
            <li><strong>Costo:</strong> $$$$ (Muy alto, ~15,000/mes mínimo).</li>
            <li><strong>Soporte Técnico:</strong> 24/7 con el tiempo de respuesta más rápido (ej: <strong>< 15 minutos</strong> para sistemas críticos caídos).</li>
            <li><strong>Caso de Uso:</strong> Para cargas de trabajo críticas de misión empresarial.</li>
            <li><strong>Trusted Advisor:</strong> Conjunto completo.</li>
            <li><strong>Extras Clave:</strong>
                <ul>
                    <li><strong>Technical Account Manager (TAM):</strong> Un ingeniero de AWS <strong>dedicado</strong> a tu cuenta, que te da consejos proactivos y te ayuda a optimizar.</li>
                    <li><strong>Support Concierge:</strong> Un equipo que te ayuda con temas de facturación y gestión de cuentas.</li>
                </ul>
            </li>
        </ul>
    `
};

// ================================================================
// BASE DE DATOS DE EXÁMENES
// ================================================================
const examDB = {
    "exam_4_1": {
        title: "Examen: Modelos de Precios y Ahorro",
        questions: [
            { text: "¿Qué modelo de precios ofrece el mayor descuento a cambio de un compromiso de 1 o 3 años?", options: ["On-Demand", "Spot", "Instancias Reservadas", "Gratuito"], correctAnswer: 2, explanation: "Las Instancias Reservadas (RIs) y Savings Plans ofrecen grandes descuentos por compromisos a largo plazo." }
        ]
    },
    "exam_4_2": {
        title: "Examen: Herramientas de Costos",
        questions: [
            { text: "¿Qué herramienta te permite crear una alerta que te notifique si tu gasto supera los $100?", options: ["AWS Cost Explorer", "AWS Budgets", "AWS Trusted Advisor", "Amazon CloudWatch"], correctAnswer: 1, explanation: "AWS Budgets se usa específicamente para crear alertas de presupuesto." }
        ]
    },
    "exam_4_3": {
        title: "Examen: Planes de Soporte de AWS",
        questions: [
            { text: "¿Qué plan de soporte es gratuito y te da acceso a 7 comprobaciones de Trusted Advisor?", options: ["Developer", "Business", "Enterprise", "Basic"], correctAnswer: 3, explanation: "El plan Basic (Básico) es gratuito, no da soporte técnico, pero sí incluye 7 comprobaciones de Trusted Advisor (Seguridad y Límites de Servicio)." },
            { text: "(Cascarita) ¿Cuál es el plan de soporte MÁS BARATO que te da acceso 24/7 por teléfono a ingenieros de soporte y al conjunto COMPLETO de comprobaciones de AWS Trusted Advisor?", options: ["Developer", "Business", "Enterprise", "Basic"], correctAnswer: 1, explanation: "El plan Developer solo da soporte por email. El plan Business es el primero que ofrece soporte 24/7 por teléfono y, crucialmente, el acceso completo a todas las comprobaciones de Trusted Advisor." },
            { text: "Un cliente corporativo paga por el plan de soporte más alto y tiene un ingeniero de AWS asignado proactivamente a su cuenta para ayudarlo a planificar la arquitectura. ¿Cómo se llama este ingeniero?", options: ["Support Concierge", "Solutions Architect", "Technical Account Manager (TAM)", "Agente de Soporte Enterprise"], correctAnswer: 2, explanation: "El Technical Account Manager (TAM) es el beneficio clave del plan Enterprise. Es un recurso técnico dedicado a tu cuenta." },
            { text: "Un cliente con el plan Business necesita automatizar la creación de casos de soporte. ¿Qué característica puede usar?", options: ["El AWS CLI", "El SDK de AWS", "La API de Soporte de AWS", "No es posible, debe hacerse manualmente."], correctAnswer: 2, explanation: "Tanto el plan Business como el Enterprise obtienen acceso a la API de Soporte de AWS, que permite la gestión programática de casos." },
            { text: "¿Qué plan de soporte te da un tiempo de respuesta garantizado de menos de 15 minutos para casos críticos de negocio caídos?", options: ["Developer", "Business", "Enterprise", "Todos los planes de pago"], correctAnswer: 2, explanation: "El plan Enterprise es el único con el SLA (Acuerdo de Nivel de Servicio) de < 15 minutos para sistemas críticos de negocio. El plan Business es < 1 hora." }
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
    //     // ¡¡CORRECCIÓN!! El mensaje ahora usa la variable correcta
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