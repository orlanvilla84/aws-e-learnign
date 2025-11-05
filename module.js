// Este objeto simula nuestra base de datos.
// Aquí pondremos TODO el contenido de tu PDF, lección por lección.
const moduleData = {
    // ================================================================
    // MÓDULO 1: CONCEPTOS DE LA NUBE
    // ================================================================
    "1": {
        title: "Módulo 1: Conceptos de la Nube",
        lessons: [
            { id: "1_1", title: "Las 6 Ventajas de la Nube", contentKey: "lesson_1_1", examKey: "exam_1_1" },
            { id: "1_2", title: "Modelos de Servicio (IaaS, PaaS, SaaS)", contentKey: "lesson_1_2", examKey: "exam_1_2" },
            // ... Aquí añadiremos más lecciones del Módulo 1
        ]
    },
    // ================================================================
    // MÓDULO 2: SEGURIDAD
    // ================================================================
    "2": {
        title: "Módulo 2: Seguridad y Cumplimiento",
        lessons: [
            { id: "2_1", title: "Modelo de Responsabilidad Compartida", contentKey: "lesson_2_1", examKey: "exam_2_1" },
            // ... Aquí añadiremos más lecciones del Módulo 2
        ]
    },
    // ... Aquí añadiremos los Módulos 3 y 4
};

// ================================================================
// BASE DE DATOS DE CONTENIDO
// ================================================================
const contentDB = {
    "lesson_1_1": `
        <h3>¿Qué es la Computación en la Nube?</h3>
        <p>La computación en la nube es la <strong>entrega bajo demanda de recursos de TI</strong> (como cómputo, almacenamiento, bases de datos) a través de Internet con un modelo de <strong>pago por uso</strong>.</p>
        
        <div class="analogy-box">
            <h4>Analogía: La Compañía Eléctrica ⚡</h4>
            <p>Hace 100 años, si querías electricidad, tenías que construir tu propio generador en el sótano. Era caro, tenías que comprar el combustible, darle mantenimiento y, si fallaba, te quedabas a oscuras.</p>
            <p>Hoy, simplemente te conectas a la red eléctrica y pagas solo por los kilovatios que consumes. La compañía eléctrica se encarga del mantenimiento, la infraestructura y la capacidad.</p>
            <p><strong>AWS es la "compañía eléctrica" de la computación.</strong> En lugar de comprar y mantener tus propios servidores (tu "generador"), simplemente "te conectas" a AWS y pagas solo por los segundos de cómputo o los gigabytes de almacenamiento que usas.</p>
        </div>

        <h3>Las 6 Ventajas de la Computación en la Nube</h3>
        <p>Estas son fundamentales para el examen. AWS las resume en 6 puntos clave:</p>
        
        <ol>
            <li><strong>Dejar de gastar dinero en comprar y mantener centros de datos (CAPEX por OPEX):</strong>
                <ul>
                    <li><strong>CAPEX (Capital Expenditure):</strong> Gasto de capital. Es el dinero que gastas <em>por adelantado</em> en infraestructura física (comprar servidores, construir un data center). Es una gran inversión inicial.</li>
                    <li><strong>OPEX (Operational Expenditure):</strong> Gasto operativo. Es el dinero que gastas en el día a día para mantener algo funcionando (tu factura mensual de AWS, la electricidad).</li>
                    <li>La nube te permite cambiar un gran gasto inicial (CAPEX) por un gasto variable (OPEX).</li>
                </ul>
            </li>
            <li><strong>Beneficiarse de economías de escala masivas:</strong>
                <ul>
                    <li>Como AWS compra hardware para millones de clientes a la vez, obtienen precios mucho más bajos que tú. Te pasan esos ahorros, por lo que usar AWS es más barato que hacerlo tú mismo.</li>
                </ul>
            </li>
            <li><strong>Dejar de adivinar la capacidad:</strong>
                <ul>
                    <li>En un centro de datos tradicional, tienes que "adivinar" cuánta capacidad necesitarás para Navidad. Si compras demasiado, desperdicias dinero. Si compras muy poco, tu sitio se cae y pierdes ventas.</li>
                    <li>Con la nube, no adivinas. Simplemente tomas la capacidad que necesitas y la devuelves cuando terminas.</li>
                </ul>
            </li>
            <li><strong>Aumentar la velocidad y la agilidad:</strong>
                <ul>
                    <li>En un centro de datos tradicional, pedir un nuevo servidor puede tardar semanas. En AWS, puedes aprovisionar miles de servidores en minutos. Esto te permite innovar y experimentar mucho más rápido.</li>
                </ul>
            </li>
            <li><strong>Dejar de gastar dinero en ejecutar y mantener centros de datos:</strong>
                <ul>
                    <li>AWS se encarga del "trabajo pesado" (montar racks, cambiar discos duros, gestionar la refrigeración). Esto libera a tu personal de TI para que se concentre en tareas que agregan valor a tu negocio, en lugar de mantener las luces encendidas.</li>
                </ul>
            </li>
            <li><strong>"Volverse global" en minutos (Go global in minutes):</strong>
                <ul>
                    <li>Puedes desplegar tu aplicación en múltiples regiones de todo el mundo con solo unos clics. Esto te permite dar una baja latencia (mayor velocidad) a tus clientes, sin importar dónde se encuentren.</li>
                </ul>
            </li>
        </ol>
    `
    // ... (Aquí irá el contenido de lesson_1_2, lesson_2_1, etc.)
};

// ================================================================
// BASE DE DATOS DE EXÁMENES
// ================================================================
const examDB = {
    "exam_1_1": {
        title: "Examen: Las 6 Ventajas de la Nube",
        passThreshold: 0.8, // Se necesita 80% para aprobar
        questions: [
            // Pregunta 1
            {
                text: "Una compañía quiere cambiar su modelo de gasto de grandes inversiones iniciales en hardware a un modelo de pago mensual basado en el consumo. ¿A cuál de las 6 ventajas de la nube se refiere esto?",
                options: [
                    "Aumentar la velocidad y la agilidad.",
                    "Dejar de adivinar la capacidad.",
                    "Cambiar el gasto de capital (CAPEX) por gasto variable (OPEX).",
                    "Beneficiarse de economías de escala masivas."
                ],
                correctAnswer: 2, // Índice de la respuesta correcta (empieza en 0)
                explanation: "La clave es 'grandes inversiones iniciales' (CAPEX) a 'pago mensual' (OPEX). Esta es la definición exacta de cambiar el gasto de capital por gasto operativo."
            },
            // Pregunta 2
            {
                text: "¿Qué ventaja de la nube describe la capacidad de AWS para reducir sus precios a medida que crece su base de clientes, gracias a su enorme poder de compra?",
                options: [
                    "Volverse global en minutos.",
                    "Economías de escala masivas.",
                    "Dejar de gastar dinero en mantener centros de datos.",
                    "Agilidad."
                ],
                correctAnswer: 1,
                explanation: "Las 'Economías de escala' se refieren a que, al ser tan grande, AWS obtiene descuentos en hardware y eficiencia operativa, y traslada esos ahorros a los clientes en forma de precios más bajos."
            },
            // Pregunta 3 (Cascarita: Elasticidad vs Adivinar Capacidad) - ¡CORREGIDA!
            {
                text: "Un sitio web de comercio electrónico experimenta picos de tráfico masivos durante el Black Friday. En un centro de datos tradicional, tendrían que comprar muchos servidores que estarían inactivos el resto del año. ¿Qué ventaja de la nube soluciona este problema?",
                options: [
                    "Elasticidad",
                    "Dejar de adivinar la capacidad",
                    "Agilidad",
                    "Escalabilidad"
                ],
                correctAnswer: 1,
                explanation: "¡Esta es una cascarita! Aunque 'Elasticidad' (la capacidad de crecer y decrecer) es la <strong>característica técnica</strong> que lo soluciona, la <strong>ventaja de negocio</strong> (según las 6 ventajas) es 'Dejar de adivinar la capacidad'. No tienes que predecir el pico y comprar para él; simplemente usas lo que necesitas."
            },
            // Pregunta 4
            {
                text: "Un desarrollador puede probar una idea nueva desplegando un entorno de prueba completo en 5 minutos, y luego eliminarlo cuando termina. En su compañía anterior, esto tomaba 6 semanas. ¿A qué ventaja de la nube se refiere esto?",
                options: [
                    "Economías de escala.",
                    "Cambiar CAPEX por OPEX.",
                    "Aumentar la velocidad y la agilidad.",
                    "Volverse global en minutos."
                ],
                correctAnswer: 2,
                explanation: "La capacidad de aprovisionar (y desaprovisionar) recursos de TI en minutos, en lugar de semanas o meses, es la definición de 'Velocidad y Agilidad'."
            },
            // Pregunta 5
            {
                text: "Una startup en Colombia quiere lanzar su aplicación en Europa y Asia para reducir la latencia de sus usuarios en esas regiones. ¿Qué ventaja de la nube les permite hacer esto fácil y rápidamente?",
                options: [
                    "Dejar de adivinar la capacidad.",
                    "Volverse global en minutos.",
                    "Alta Disponibilidad.",
                    "Cambiar CAPEX por OPEX."
                ],
                correctAnswer: 1,
                explanation: "La infraestructura global de AWS permite desplegar aplicaciones en múltiples regiones de todo el mundo en minutos, logrando una presencia global instantánea."
            },
             // Pregunta 6
            {
                text: "Tu equipo de TI pasa el 60% de su tiempo cambiando discos duros defectuosos y aplicando parches a los sistemas operativos del hipervisor. ¿Qué ventaja de la nube te permite reenfocar a ese equipo en tareas que generen ingresos para la empresa?",
                options: [
                    "Aumentar la velocidad y la agilidad.",
                    "Beneficiarse de economías de escala masivas.",
                    "Dejar de gastar dinero en ejecutar y mantener centros de datos.",
                    "Dejar de adivinar la capacidad."
                ],
                correctAnswer: 2,
                explanation: "AWS se encarga del 'trabajo pesado indiferenciado' (como cambiar hardware o parchear la infraestructura base). Esto libera a tu personal de esas tareas de mantenimiento para que puedan innovar."
            },
            // Pregunta 7 (Cascarita: Agilidad vs OPEX)
            {
                text: "El término 'OPEX' (Gasto Operativo) se refiere a:",
                options: [
                    "Pagar por adelantado por hardware y software.",
                    "Pagar por los recursos de TI según se consumen (pago por uso).",
                    "La capacidad de desplegar recursos en minutos.",
                    "Los ahorros obtenidos al compartir infraestructura."
                ],
                correctAnswer: 1,
                explanation: "OPEX es el gasto operativo, como tu factura de electricidad o tu factura de AWS. Es un costo variable y recurrente. El pago por adelantado es CAPEX."
            },
            // Pregunta 8 (Cascarita: CAPEX)
            {
                text: "Un hospital compra un nuevo servidor de imágenes médicas por $50,000 para instalarlo en su centro de datos. Este costo es un ejemplo de:",
                options: [
                    "OPEX (Gasto Operativo)",
                    "CAPEX (Gasto de Capital)",
                    "Economía de escala",
                    "Agilidad"
                ],
                correctAnswer: 1,
                explanation: "CAPEX (Gasto de Capital) es la inversión inicial y por adelantado en activos físicos (como un servidor). Esto es exactamente lo que la nube ayuda a evitar."
            },
            // Pregunta 9
            {
                text: "¿Cuál de las siguientes NO es una de las 6 ventajas de la computación en la nube según AWS?",
                options: [
                    "Aumentar la velocidad y la agilidad.",
                    "Beneficiarse de economías de escala masivas.",
                    "Garantizar un 100% de tiempo de actividad (uptime).",
                    "Dejar de adivinar la capacidad."
                ],
                correctAnswer: 2,
                explanation: "AWS no garantiza un 100% de uptime. Aunque diseñan para una alta disponibilidad, las fallas pueden ocurrir. La ventaja es la 'Fiabilidad' (que se ve en el Well-Architected Framework), pero no una garantía del 100%."
            },
            // Pregunta 10
            {
                text: "El hecho de que no necesites mantener un equipo de personas para gestionar la refrigeración y la seguridad física de tu centro de datos es un ejemplo de...",
                options: [
                    "Dejar de gastar dinero en ejecutar y mantener centros de datos.",
                    "Cambiar CAPEX por OPEX.",
                    "Volverse global en minutos.",
                    "Dejar de adivinar la capacidad."
                ],
                correctAnswer: 0,
                explanation: "El mantenimiento (refrigeración, seguridad física, hardware) es parte del 'trabajo pesado' de ejecutar un centro de datos. AWS se encarga de esto por ti."
            }
        ]
    }
    // ... (Aquí irán los exámenes de lesson_1_2, lesson_2_1, etc.)
};

// ================================================================
// LÓGICA DE LA PÁGINA
// ================================================================

document.addEventListener('DOMContentLoaded', () => {
    // 1. Obtener elementos del DOM
    const moduleTitleEl = document.getElementById('module-title');
    const lessonListEl = document.getElementById('lesson-list');
    const lessonContentEl = document.getElementById('lesson-content');

    // 2. Obtener el progreso
    const progress = JSON.parse(localStorage.getItem('awsProgress')) || {};

    // 3. Obtener el ID del módulo desde la URL (ej: ?id=1)
    const params = new URLSearchParams(window.location.search);
    const moduleId = params.get('id');

    if (!moduleId || !moduleData[moduleId]) {
        moduleTitleEl.textContent = "Error";
        lessonContentEl.innerHTML = "<p>Módulo no encontrado. <a href='index.html'>Volver al inicio</a>.</p>";
        lessonContentEl.style.display = 'block'; // Mostrar el error
        return;
    }

    // 4. Cargar el módulo
    const module = moduleData[moduleId];
    moduleTitleEl.textContent = module.title;

    // 5. Poblar la lista de lecciones
    lessonListEl.innerHTML = '<h3>Lecciones</h3>';
    module.lessons.forEach(lesson => {
        const lessonKey = `lesson_${lesson.id}_complete`;
        const isComplete = progress[lessonKey];
        
        const lessonEl = document.createElement('div');
        lessonEl.className = 'lesson-item';
        lessonEl.innerHTML = `
            <div>
                <span class="status-icon">${isComplete ? '✅' : '📖'}</span>
                <span>${lesson.title}</span>
            </div>
            <button class="start-lesson" data-content-key="${lesson.contentKey}" data-exam-key="${lesson.examKey}" data-lesson-id="${lesson.id}">
                ${isComplete ? 'Repasar' : 'Comenzar'}
            </button>
        `;
        lessonListEl.appendChild(lessonEl);
    });

    // 6. Añadir Event Listeners a los botones de "Comenzar"
    lessonListEl.addEventListener('click', (e) => {
        if (e.target.classList.contains('start-lesson')) {
            const contentKey = e.target.dataset.contentKey;
            const examKey = e.target.dataset.examKey;
            const lessonId = e.target.dataset.lessonId; // ej: 1_1
            loadLesson(contentKey, examKey, lessonId, moduleId);
        }
    });
});

/**
 * Carga el contenido de la lección y el examen en el DOM.
 */
function loadLesson(contentKey, examKey, lessonId, moduleId) {
    const lessonContentEl = document.getElementById('lesson-content');
    const lessonData = contentDB[contentKey];
    const examData = examDB[examKey];

    // Ocultar la lista de lecciones (o podrías dejarla visible)
    // document.getElementById('lesson-list').style.display = 'none';
    
    // Mostrar el contenedor de contenido
    lessonContentEl.style.display = 'block';

    let html = `<h2>${examData.title.replace('Examen: ', '')}</h2>`;
    
    // Validar si el contenido existe
    if (lessonData) {
        html += lessonData; // Añade el contenido de la lección
    } else {
        html += `<p>Error: Contenido de la lección no encontrado (contentKey: ${contentKey}).</p>`;
    }
    

    // Validar si el examen existe
    if (examData) {
        // Construye el HTML del examen
        html += `<div class="quiz-container">`;
        html += `<h3>Examen de la Lección</h3>`;
        html += `<p>Debes aprobar con un ${examData.passThreshold * 100}% para marcar esta lección como completada.</p>`;
        
        examData.questions.forEach((q, index) => {
            html += `
                <div class="question" id="q-${index}">
                    <p>${index + 1}. ${q.text}</p>
                    <div class="options">
            `;
            q.options.forEach((option, optionIndex) => {
                html += `
                    <label>
                        <input type="radio" name="q-${index}" value="${optionIndex}">
                        ${option}
                    </label>
                `;
            });
            html += `</div><div class="feedback"></div></div>`; // Contenedor para el feedback
        });

        html += `<button id="submit-quiz" data-exam-key="${examKey}" data-lesson-id="${lessonId}" data-module-id="${moduleId}">Calificar Examen</button>`;
        html += `<div id="quiz-results"></div>`;
        html += `</div>`; // fin de quiz-container
    } else {
         html += `<p>Error: Examen no encontrado (examKey: ${examKey}).</p>`;
    }

    lessonContentEl.innerHTML = html;
    
    // Hacer scroll hacia el inicio del contenido
    lessonContentEl.scrollIntoView({ behavior: 'smooth' });
}

/**
 * Event Listener para calificar el examen.
 * Usamos un listener en el 'document' porque el botón se crea dinámicamente.
 */
document.addEventListener('click', (e) => {
    if (e.target.id === 'submit-quiz') {
        const examKey = e.target.dataset.examKey;
        const lessonId = e.target.dataset.lessonId;
        const moduleId = e.target.dataset.moduleId;
        gradeQuiz(examKey, lessonId, moduleId);
    }
});

/**
 * Califica el examen, muestra los resultados y guarda el progreso.
 */
function gradeQuiz(examKey, lessonId, moduleId) {
    const examData = examDB[examKey];
    if (!examData) {
        console.error("No se pudieron cargar los datos del examen para: ", examKey);
        return;
    }
    
    let score = 0;
    
    examData.questions.forEach((q, index) => {
        const questionEl = document.getElementById(`q-${index}`);
        const feedbackEl = questionEl.querySelector('.feedback');
        
        // Obtener la respuesta seleccionada por el usuario
        const selectedInput = document.querySelector(`input[name="q-${index}"]:checked`);
        
        if (!selectedInput) {
            feedbackEl.innerHTML = `<p><strong>Respuesta:</strong> ¡No has seleccionado una opción!</p>`;
            feedbackEl.className = 'feedback incorrect';
            return; // Saltar esta pregunta
        }
        
        const userAnswer = parseInt(selectedInput.value);
        
        if (userAnswer === q.correctAnswer) {
            score++;
            feedbackEl.innerHTML = `<p><strong>¡Correcto!</strong> ${q.explanation}</p>`;
            feedbackEl.className = 'feedback correct';
        } else {
            feedbackEl.innerHTML = `
                <p><strong>Incorrecto.</strong> La respuesta correcta era: <strong>${q.options[q.correctAnswer]}</strong></p>
                <p><strong>Explicación:</strong> ${q.explanation}</p>
            `;
            feedbackEl.className = 'feedback incorrect';
        }
    });

    // Mostrar resultados finales
    const totalQuestions = examData.questions.length;
    const percentage = score / totalQuestions;
    const resultsEl = document.getElementById('quiz-results');

    if (percentage >= examData.passThreshold) {
        resultsEl.innerHTML = `<h3>¡Aprobado!</h3><p>Tu puntaje: ${score} de ${totalQuestions} (${(percentage * 100).toFixed(0)}%)</p>`;
        resultsEl.className = 'success';
        
        // Guardar progreso en localStorage
        saveProgress(`lesson_${lessonId}_complete`);
        
        // Actualizar el icono de la lección en la lista
        updateLessonListStatus(lessonId);

        // Comprobar si todo el módulo está completo
        checkModuleCompletion(moduleId);

    } else {
        resultsEl.innerHTML = `<h3>No aprobado</h3><p>Tu puntaje: ${score} de ${totalQuestions} (${(percentage * 100).toFixed(0)}%). Necesitas ${examData.passThreshold * 100}%. ¡Sigue intentando!</p>`;
        resultsEl.className = 'failure';
    }
    
    // Hacer scroll hacia los resultados
    resultsEl.scrollIntoView({ behavior: 'smooth' });
}

/**
 * Actualiza el icono y texto del botón de una lección tras completarla.
 */
function updateLessonListStatus(lessonId) {
    const button = document.querySelector(`button[data-lesson-id="${lessonId}"]`);
    if (button) {
        button.textContent = 'Repasar';
        const statusIcon = button.closest('.lesson-item').querySelector('.status-icon');
        if (statusIcon) {
            statusIcon.textContent = '✅';
        }
    }
}

/**
 * Guarda una clave de progreso en el localStorage.
 */
function saveProgress(progressKey) {
    const progress = JSON.parse(localStorage.getItem('awsProgress')) || {};
    progress[progressKey] = true;
    localStorage.setItem('awsProgress', JSON.stringify(progress));
}

/**
 * Verifica si todas las lecciones de un módulo están completas.
 * Si es así, guarda la clave de finalización del módulo.
 */
function checkModuleCompletion(moduleId) {
    const module = moduleData[moduleId];
    const progress = JSON.parse(localStorage.getItem('awsProgress')) || {};
    
    // some() devuelve true si *al menos una* lección NO está completa.
    // Por lo tanto, isModuleComplete es true si NINGUNA lección falta.
    const isModuleComplete = !module.lessons.some(lesson => {
        const lessonKey = `lesson_${lesson.id}_complete`;
        return !progress[lessonKey]; // Devuelve true si la lección NO está en el progreso
    });

    if (isModuleComplete) {
        console.log(`¡Módulo ${moduleId} completado!`);
        // Guarda la clave que desbloquea el siguiente módulo en index.html
        saveProgress(`module_${moduleId}_exam`); 
        
        // (Opcional) Mostrar un mensaje de felicitación
        const lessonListEl = document.getElementById('lesson-list');
        const congrats = document.createElement('div');
        congrats.innerHTML = `
            <div style="padding: 1.5rem; text-align: center; background-color: #e6ffed; border: 1px solid var(--success-green); border-radius: 8px; margin-top: 2rem;">
                <h2 style="color: var(--success-green); margin-top: 0;">¡Felicidades!</h2>
                <p style="font-size: 1.1rem; margin-bottom: 0;">Has completado todas las lecciones del Módulo ${moduleId}. El siguiente módulo ha sido desbloqueado.</p>
            </div>
        `;
        // Evitar múltiples mensajes de felicitación
        if (!lessonListEl.querySelector('.congrats-message')) {
            congrats.className = 'congrats-message';
            lessonListEl.appendChild(congrats);
        }
    }
}