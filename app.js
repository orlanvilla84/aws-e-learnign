document.addEventListener('DOMContentLoaded', () => {
    // 1. Obtener el progreso del localStorage
    // Si no existe, crea un objeto vacío.
    const progress = JSON.parse(localStorage.getItem('awsProgress')) || {};

    // 2. Definir los módulos y sus dependencias
    const modules = [
        { id: 'module-1', element: document.getElementById('module-1'), required: null },
        { id: 'module-2', element: document.getElementById('module-2'), required: 'module_1_exam' },
        { id: 'module-3', element: document.getElementById('module-3'), required: 'module_2_exam' },
        { id: 'module-4', element: document.getElementById('module-4'), required: 'module_3_exam' }
    ];

    // 3. Recorrer cada módulo y aplicar el bloqueo si es necesario
    modules.forEach(module => {
        if (module.required) {
            // Comprueba si la clave 'required' (ej: 'module_1_exam') NO está en el progreso
            if (!progress[module.required]) {
                module.element.classList.add('locked');
            }
        }
    });
});