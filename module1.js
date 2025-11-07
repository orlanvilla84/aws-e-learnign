// ================================================================
// CONFIGURACIÓN DEL MÓDULO
// ================================================================
const currentModuleId = "1"; // ID de este módulo

// Este objeto simula nuestra base de datos.
const moduleData = {
    "1": {
        title: "Módulo 1: Conceptos de la Nube",
        lessons: [
            { id: "1_1", title: "Las 6 Ventajas de la Nube", contentKey: "lesson_1_1", examKey: "exam_1_1" },
            { id: "1_2", title: "Modelos de Servicio (IaaS, PaaS, SaaS)", contentKey: "lesson_1_2", examKey: "exam_1_2" },
            { id: "1_3", title: "Modelos de Despliegue (Pública, Híbrida, Privada)", contentKey: "lesson_1_3", examKey: "exam_1_3" },
            { id: "1_4", title: "Infraestructura Global de AWS (Regiones, AZs, Edge)", contentKey: "lesson_1_4", examKey: "exam_1_4" },
            { id: "1_5", title: "AWS Well-Architected Framework (Los 6 Pilares)", contentKey: "lesson_1_5", examKey: "exam_1_5" }
        ]
    }
};

// ================================================================
// BASE DE DATOS DE CONTENIDO
// ================================================================
const contentDB = {
    // =================== LECCIÓN 1.1 ===================
    "lesson_1_1": `
        <h3>¿Qué es la Computación en la Nube?</h3>
        <p>La computación en la nube es la <strong>entrega bajo demanda de recursos de TI</strong> (como cómputo, almacenamiento, bases de datos) a través de Internet con un modelo de <strong>pago por uso</strong>.</p>
        <div class="analogy-box">
            <h4>Analogía: La Compañía Eléctrica ⚡</h4>
            <p><strong>AWS es la "compañía eléctrica" de la computación.</strong> En lugar de comprar y mantener tus propios servidores (tu "generador"), simplemente "te conectas" a AWS y pagas solo por los segundos de cómputo o los gigabytes de almacenamiento que usas.</p>
        </div>
        <h3>Profundización: Las 6 Ventajas de la Nube</h3>
        <p>Estas son las 6 ventajas de negocio que AWS identifica. Son la respuesta a la pregunta "¿Por qué migrar a la nube?".</p>
        
        <h4>1. Cambiar el Gasto de Capital (CAPEX) por Gasto Variable (OPEX)</h4>
        <ul>
            <li><strong>Definición:</strong>
                <ul>
                    <li><strong>CAPEX (Capital Expenditure):</strong> Es el dinero que una empresa gasta por adelantado para comprar, actualizar o mantener activos físicos, como edificios o servidores. Es una gran inversión inicial.</li>
                    <li><strong>OPEX (Operational Expenditure):</strong> Es el gasto del día a día, como la electricidad, los salarios o tu factura mensual de AWS.</li>
                </ul>
            </li>
            <li><strong>Por qué importa:</strong> En lugar de gastar millones comprando servidores y construyendo un centro de datos antes de saber si tu idea de negocio funcionará, pagas solo por los recursos que consumes, por hora o por segundo. Esto reduce drásticamente la barrera de entrada para nuevas ideas.</li>
            <li><strong>Servicios Relacionados:</strong> Todos los servicios de pago por uso, como <strong>Amazon EC2</strong> (pago por segundo) y <strong>Amazon S3</strong> (pago por GB).</li>
        </ul>

        <h4>2. Beneficiarse de Economías de Escala Masivas</h4>
        <ul>
            <li><strong>Definición:</strong> Como AWS tiene millones de clientes, compra hardware a una escala masiva. Esto le da a AWS descuentos por volumen que un cliente individual jamás podría obtener.</li>
            <li><strong>Por qué importa:</strong> AWS te pasa esos ahorros a ti. El resultado es que usar los servicios de AWS es casi siempre más barato que hacerlo tú mismo en tu propio centro de datos.</li>
        </ul>

        <h4>3. Dejar de Adivinar la Capacidad</h4>
        <ul>
            <li><strong>Definición:</strong> En un centro de datos tradicional, debías "adivinar" tu capacidad máxima (ej: "necesitaré 100 servidores para el Black Friday"). Si comprabas de menos, tu sitio se caía. Si comprabas de más, desperdiciabas dinero el 99% del año.</li>
            <li><strong>Por qué importa:</strong> Con la nube, usas la <strong>elasticidad</strong> para escalar automáticamente hacia arriba (añadir servidores) cuando hay demanda, y escalar hacia abajo (eliminar servidores) cuando la demanda baja. Pagas solo por lo que usas, eliminando el desperdicio.</li>
            <li><strong>Servicios Relacionados:</strong> <strong>Amazon EC2 Auto Scaling</strong>, <strong>AWS Lambda</strong> (escala automáticamente por diseño).</li>
        </ul>

        <h4>4. Aumentar la Velocidad y la Agilidad</h4>
        <ul>
            <li><strong>Definición:</strong> En un centro de datos tradicional, obtener un nuevo servidor podía tomar semanas o meses (proceso de compra, instalación, configuración).</li>
            <li><strong>Por qué importa:</strong> En AWS, puedes aprovisionar miles de servidores en minutos. Esto permite a los equipos de desarrollo experimentar e innovar mucho más rápido. Si una idea falla, simplemente apagan los recursos sin ningún costo a largo plazo.</li>
            <li><strong>Servicios Relacionados:</strong> <strong>AWS CloudFormation</strong> (para desplegar infraestructura como código), <strong>AWS Elastic Beanstalk</strong> (para desplegar aplicaciones web rápidamente).</li>
        </ul>

        <h4>5. Dejar de Gastar Dinero en Operar y Mantener Centros de Datos</h4>
        <ul>
            <li><strong>Definición:</strong> AWS se encarga del "trabajo pesado indiferenciado" (undifferentiated heavy lifting): instalar servidores en racks, cambiar discos duros, gestionar la energía y la refrigeración.</li>
            <li><strong>Por qué importa:</strong> Esto libera a tu personal de TI de las tareas de mantenimiento de infraestructura, permitiéndoles enfocarse en tareas que agregan valor real al negocio, como construir mejores aplicaciones.</li>
            <li><strong>Servicios Relacionados:</strong> <strong>Amazon RDS</strong> (donde AWS gestiona los parches y backups de la BD), <strong>AWS Fargate</strong> (para ejecutar contenedores sin gestionar servidores).</li>
        </ul>

        <h4>6. Volverse Global en Minutos</h4>
        <ul>
            <li><strong>Definición:</strong> AWS tiene Regiones (centros de datos) en todo el mundo.</li>
            <li><strong>Por qué importa:</strong> Puedes desplegar tu aplicación en múltiples continentes con solo unos clics. Esto te permite ofrecer una baja latencia (mejor experiencia) a tus clientes, sin importar dónde se encuentren, y todo desde una consola centralizada.</li>
            <li><strong>Servicios Relacionados:</strong> <strong>Amazon CloudFront</strong> (que usa Ubicaciones de Borde para entregar contenido globalmente), <strong>Amazon Route 53</strong> (para enrutamiento basado en geolocalización o latencia).</li>
        </ul>
    `,
    "lesson_1_2": `
        <h3>Modelos de Servicio: IaaS, PaaS, SaaS</h3>
        <p>Esto define cuánta responsabilidad de gestión asumes tú (el cliente) versus cuánta asume AWS. Es una parte clave del Modelo de Responsabilidad Compartida.</p>
        <div class="analogy-box">
            <h4>Analogía: Pizza como Servicio 🍕</h4>
            <p>Imagina que quieres comer pizza. Tienes varias opciones:</p>
            <ul>
                <li><strong>Tradicional (On-Premises):</strong> Haces todo tú. Compras la harina, el queso, los tomates. Usas tu propio horno, tu propia mesa, tu propia cocina y limpias todo. <strong>(Tú gestionas todo)</strong>.</li>
                <li><strong>IaaS (Infraestructura como Servicio):</strong> Pides una pizza congelada del supermercado. El supermercado te da la pizza (infraestructura), pero tú pones el horno, la mesa y la bebida.
                    <br>En AWS: <strong>Amazon EC2</strong>. AWS te da el servidor virtual, pero <strong>tú gestionas el sistema operativo, los parches y el software</strong>.</li>
                <li><strong>PaaS (Plataforma como Servicio):</strong> Pides una pizza a domicilio. El restaurante hace la pizza y te la entrega caliente. Tú solo pones la mesa y la bebida.
                    <br>En AWS: <strong>Amazon RDS</strong> o <strong>AWS Elastic Beanstalk</strong>. AWS gestiona el servidor, el sistema operativo y los parches. <strong>Tú solo subes tu código o tus datos</strong>.</li>
                <li><strong>SaaS (Software como Servicio):</strong> Vas a un restaurante de pizza. Te sientas y ellos se encargan de todo: la comida, la bebida, la mesa, la limpieza.
                    <br>En AWS: <strong>Amazon Chime</strong> o <strong>Amazon Connect</strong>. <strong>Tú solo usas el software</strong>, no gestionas absolutamente nada.</li>
            </ul>
        </div>
        <img src="https://via.placeholder.com/800x400.png?text=Diagrama+IaaS+PaaS+SaaS" alt="Diagrama de Pizza como Servicio" style="width:100%; border-radius: 8px; margin-bottom: 1rem;">
        <h3>Resumen de Modelos</h3>
        <ul>
            <li><strong>IaaS (Infrastructure as a Service):</strong>
                <ul>
                    <li><strong>Qué es:</strong> Los bloques de construcción básicos. AWS gestiona el hardware físico (servidores, redes, almacenamiento).</li>
                    <li><strong>Tú Gestionas:</strong> El sistema operativo (Windows, Linux), los parches de seguridad del S.O., el runtime (Java, Node.js) y tus aplicaciones.</li>
                    <li><strong>Ejemplo Principal:</strong> <strong>Amazon EC2</strong>.</li>
                </ul>
            </li>
            <li><strong>PaaS (Platform as a Service):</strong>
                <ul>
                    <li><strong>Qué es:</strong> AWS gestiona el hardware Y el sistema operativo. Te da una plataforma para desplegar tu código.</li>
                    <li><strong>Tú Gestionas:</strong> Solo tu aplicación y tus datos. No te preocupas por parches del S.O. ni mantenimiento del hardware.</li>
                    <li><strong>Ejemplos:</strong> <strong>Amazon RDS</strong>, <strong>AWS Elastic Beanstalk</strong>.</li>
                </ul>
            </li>
            <li><strong>SaaS (Software as a Service):</strong>
                <ul>
                    <li><strong>Qué es:</strong> Un producto de software completo que consumes, generalmente por suscripción.</li>
                    <li><strong>Tú Gestionas:</strong> Nada. Solo usas el software. El proveedor (que puede ser AWS u otra empresa) gestiona todo.</li>
                    <li><strong>Ejemplos:</strong> <strong>Amazon Connect</strong> (un call center), <strong>Amazon Chime</strong>. (Ejemplos externos: Gmail, Salesforce).</li>
                </ul>
            </li>
        </ul>
    `,
    "lesson_1_3": `
        <h3>Modelos de Despliegue de la Nube</h3>
        <p>Esto define <strong>dónde</strong> se aloja físicamente la infraestructura.</p>
        <ul>
            <li><strong>Nube Pública (Cloud):</strong>
                <ul>
                    <li><strong>Qué es:</strong> Es el modelo estándar. Todos los recursos se ejecutan en la infraestructura de un proveedor de nube, como AWS. No tienes ningún hardware local (on-premises).</li>
                    <li><strong>Ventajas:</strong> Máxima flexibilidad, agilidad y no hay CAPEX.</li>
                </ul>
            </li>
            <li><strong>Nube Privada (On-Premises):</strong>
                <ul>
                    <li><strong>Qué es:</strong> Es tu propio centro de datos. Usas tecnologías de virtualización (como VMware) para simular una "nube" interna.</li>
                    <li><strong>Ventajas:</strong> Control total sobre el hardware y la seguridad.</li>
                    <li><strong>Desventajas:</strong> Es caro (alto CAPEX), no es elástico y tú debes gestionarlo todo.</li>
                </ul>
            </li>
            <li><strong>Nube Híbrida (Hybrid):</strong>
                <ul>
                    <li><strong>Qué es:</strong> Es la combinación de una <strong>nube pública (AWS)</strong> y una <strong>nube privada (tu data center)</strong>, conectadas de forma segura.</li>
                    <li><strong>¿Por qué usarla?</strong>
                        <ol>
                            <li><strong>Soberanía de Datos / Regulación:</strong> Tienes aplicaciones que, por ley, no pueden mover sus datos fuera de tu data center.</li>
                            <li><strong>Baja Latencia:</strong> Tienes una fábrica que necesita respuestas en milisegundos de un servidor, por lo que el servidor debe estar físicamente en la fábrica (on-premises).</li>
                            <li><strong>Migración Gradual:</strong> Estás moviendo tu empresa a AWS poco a poco.</li>
                        </ol>
                    </li>
                    <li><strong>Servicios Clave:</strong> <strong>AWS Direct Connect</strong> (conexión física privada), <strong>AWS Site-to-Site VPN</strong> (conexión cifrada por internet), <strong>AWS Outposts</strong> (hardware de AWS en tu data center).</li>
                </ul>
            </li>
        </ul>
    `,
    "lesson_1_4": `
        <h3>Infraestructura Global de AWS</h3>
        <p>AWS tiene centros de datos por todo el mundo. Es crucial entender la jerarquía.</p>
        <img src="https://via.placeholder.com/800x300.png?text=Mapa+Global+AWS:+Regiones+y+AZs" alt="Infraestructura Global de AWS" style="width:100%; border-radius: 8px; margin-bottom: 1rem;">
        <div class="analogy-box">
            <h4>Analogía: El Imperio de Comida Rápida 🍔</h4>
            <ul>
                <li><strong>Región (Region):</strong> Es un área geográfica aislada, como un país o una ciudad grande (Ej: "Norte de Virginia", "São Paulo", "Irlanda").</li>
                <li><strong>Zona de Disponibilidad (AZ):</strong> Son los "barrios" o "sucursales" dentro de esa ciudad. Cada Región tiene <strong>múltiples AZs</strong> (mínimo 2, usualmente 3 o más). Una AZ es uno o más centros de datos físicos.
                    <br>Están lo suficientemente <strong>lejos</strong> para que un desastre (incendio, inundación) en una AZ no afecte a las otras, pero lo suficientemente <strong>cerca</strong> para tener conexiones de red súper rápidas (baja latencia).</li>
                <li><strong>Ubicación de Borde (Edge Location):</strong> Son miles de "quioscos" o "puntos de entrega" (como un Rappi) distribuidos por todas las ciudades del mundo. No cocinan la hamburguesa (no tienen cómputo pesado), pero tienen las más populares listas para entregar rápido (caché).</li>
            </ul>
        </div>
        <h3>Jerarquía de Conceptos</h3>
        <h4>1. Región (Region)</h4>
        <ul>
            <li><strong>Qué es:</strong> Es el concepto más grande. Es un <strong>área geográfica física</strong> en el mundo (Ej: <code>us-east-1</code>, <code>sa-east-1</code>).</li>
            <li><strong>Factor clave: ¿Por qué elegir una Región?</strong>
                <ol>
                    <li><strong>Latencia:</strong> Elige la Región más cercana a tus usuarios para que la aplicación sea más rápida.</li>
                    <li><strong>Soberanía de Datos:</strong> Por ley, quizás necesites que los datos permanezcan físicamente dentro de un país (Región de Frankfurt).</li>
                    <li><strong>Costo:</strong> Los precios varían entre Regiones.</li>
                    <li><strong>Disponibilidad de Servicios:</strong> No todos los servicios de AWS están disponibles en todas las Regiones.</li>
                </ol>
            </li>
        </ul>
        <h4>2. Zona de Disponibilidad (Availability Zone - AZ)</h4>
        <ul>
            <li><strong>Qué es:</strong> Una Región <strong>contiene</strong> múltiples Zonas de Disponibilidad. Una AZ es uno o más centros de datos discretos, con energía, refrigeración y redes redundantes.</li>
            <li><strong>Concepto clave (¡MUY IMPORTANTE!):</strong> Para lograr <strong>Alta Disponibilidad (HA)</strong> y <strong>Tolerancia a Fallos</strong>, debes desplegar tu aplicación en <strong>MÚLTIPLES ZONAS DE DISPONIBILIDAD</strong>. Si una AZ falla, tu aplicación sigue funcionando en las otras.</li>
            <li><strong>Ejemplo:</strong> Desplegar 2 instancias EC2 en <code>us-east-1a</code> y 2 instancias en <code>us-east-1b</code>, detrás de un balanceador de carga.</li>
        </ul>
        <h4>3. Ubicaciones de Borde (Edge Locations)</h4>
        <ul>
            <li><strong>Qué es:</strong> Son una red global de puntos de presencia (POPs) mucho más numerosa que las Regiones.</li>
            <li><strong>Propósito:</strong> Se usan para <strong>acelerar la entrega de contenido</strong>.</li>
            <li><strong>Servicio clave:</strong> <strong>Amazon CloudFront</strong> (la Red de Entrega de Contenido o CDN) usa las Edge Locations para <strong>almacenar en caché</strong> tu contenido (imágenes, videos, sitios web) cerca de tus usuarios finales.</li>
        </ul>
    `,
    "lesson_1_5": `
        <h3>AWS Well-Architected Framework</h3>
        <p>Este es el "manual de buenas prácticas" de AWS. Es un conjunto de principios y preguntas para ayudarte a diseñar y construir las mejores arquitecturas en la nube.</p>
        <img src="https://via.placeholder.com/800x350.png?text=6+Pilares+del+Well-Architected+Framework" alt="6 Pilares de AWS" style="width:100%; border-radius: 8px; margin-bottom: 1rem;">
        <div class="analogy-box">
            <h4>Analogía: Los Planos de una Casa 🏠</h4>
            <p>No construirías una casa sin planos. El Well-Architected Framework son los "planos" que te da un arquitecto experto para asegurar que tu casa (tu aplicación) no se caiga, sea segura, no desperdicie energía y sea funcional.</p>
        </div>
        <h3>Los 6 Pilares</h3>
        <ol>
            <li><strong>Excelencia Operativa:</strong>
                <ul>
                    <li><strong>Enfoque:</strong> <strong>Automatización</strong> y <strong>mejora continua</strong>. Ejecutar y monitorear sistemas para entregar valor de negocio.</li>
                    <li><strong>Servicios Clave:</strong> <strong>AWS CloudFormation</strong> (Infraestructura como Código), <strong>Amazon CloudWatch</strong> (Monitoreo), <strong>AWS Systems Manager</strong> (Gestión operativa).</li>
                </ul>
            </li>
            <li><strong>Seguridad:</strong>
                <ul>
                    <li><strong>Enfoque:</strong> <strong>Protección</strong> de datos e infraestructura. Implementar el <strong>principio de privilegio mínimo</strong>.</li>
                    <li><strong>Servicios Clave:</strong> <strong>AWS IAM</strong> (Permisos), <strong>AWS KMS</strong> (Cifrado), <strong>Amazon VPC</strong> (Redes), <strong>Amazon GuardDuty</strong> (Detección de amenazas).</li>
                </ul>
            </li>
            <li><strong>Fiabilidad (Reliability):</strong>
                <ul>
                    <li><strong>Enfoque:</strong> <strong>Recuperación automática ante fallos</strong> y <strong>alta disponibilidad</strong>.</li>
                    <li><strong>Concepto Clave:</strong> Desplegar en <strong>Múltiples Zonas de Disponibilidad (Multi-AZ)</strong>.</li>
                    <li><strong>Servicios Clave:</strong> <strong>Amazon EC2 Auto Scaling</strong>, <strong>Amazon RDS Multi-AZ</strong>, <strong>Amazon Route 53</strong> (Failover).</li>
                </ul>
            </li>
            <li><strong>Eficiencia del Rendimiento:</strong>
                <ul>
                    <li><strong>Enfoque:</strong> Usar los <strong>recursos correctos</strong> para el trabajo correcto y <strong>escalar</strong> elásticamente.</li>
                    <li><strong>Servicios Clave:</strong> <strong>Amazon EC2 Auto Scaling</strong>, <strong>AWS Lambda</strong> (Cómputo serverless), <strong>Amazon EBS</strong> (Elegir el tipo de volumen correcto, ej: gp3 vs io2), <strong>Amazon ElastiCache</strong> (Caché).</li>
                </ul>
            </li>
            <li><strong>Optimización de Costos:</strong>
                <ul>
                    <li><strong>Enfoque:</strong> <strong>Evitar gastos innecesarios</strong>. Pagar solo por lo que necesitas, cuando lo necesitas.</li>
                    <li><strong>Concepto Clave:</strong> "Right-sizing" (elegir el tamaño de instancia correcto).</li>
                    <li><strong>Servicios Clave:</strong> <strong>AWS Budgets</strong>, <strong>AWS Cost Explorer</strong>, <strong>AWS Trusted Advisor</strong> (Chequeos de costos), <strong>Savings Plans</strong>.</li>
                </ul>
            </li>
            <li><strong>Sostenibilidad:</strong>
                <ul>
                    <li><strong>Enfoque:</strong> Minimizar el <strong>impacto ambiental</strong>. Reducir el desperdicio de energía y recursos.</li>
                    <li><strong>Concepto Clave:</strong> La nube es inherentemente más sostenible que un data center tradicional por las economías de escala (mejor uso de energía y refrigeración).</li>
                </ul>
            </li>
        </ol>
    `
};

// ================================================================
// BASE DE DATOS DE EXÁMENES
// ================================================================
const examDB = {
    // =================== EXAMEN 1.1 ===================
    "exam_1_1": {
        title: "Examen: Las 6 Ventajas de la Nube",
        questions: [
            { text: "Una compañía quiere cambiar su modelo de gasto de grandes inversiones iniciales en hardware a un modelo de pago mensual basado en el consumo. ¿A cuál de las 6 ventajas de la nube se refiere esto?", options: ["Aumentar la velocidad y la agilidad.","Dejar de adivinar la capacidad.","Cambiar el gasto de capital (CAPEX) por gasto variable (OPEX).","Beneficiarse de economías de escala masivas."], correctAnswer: 2, explanation: "La clave es 'grandes inversiones iniciales' (CAPEX) a 'pago mensual' (OPEX). Esta es la definición exacta de cambiar el gasto de capital por gasto operativo." },
            { text: "¿Qué ventaja de la nube describe la capacidad de AWS para reducir sus precios a medida que crece su base de clientes, gracias a su enorme poder de compra?", options: ["Volverse global en minutos.","Economías de escala masivas.","Dejar de gastar dinero en mantener centros de datos.","Agilidad."], correctAnswer: 1, explanation: "Las 'Economías de escala' se refieren a que, al ser tan grande, AWS obtiene descuentos en hardware y eficiencia operativa, y traslada esos ahorros a los clientes en forma de precios más bajos." },
            { text: "(Cascarita) Un sitio web de comercio electrónico experimenta picos de tráfico masivos durante el Black Friday. En un centro de datos tradicional, tendrían que comprar muchos servidores que estarían inactivos el resto del año. ¿Qué ventaja de la nube soluciona este problema?", options: ["Elasticidad","Dejar de adivinar la capacidad","Agilidad","Escalabilidad"], correctAnswer: 1, explanation: "¡Esta es una cascarita! Aunque 'Elasticidad' (la capacidad de crecer y decrecer) es la <strong>característica técnica</strong> que lo soluciona (ej: con EC2 Auto Scaling), la <strong>ventaja de negocio</strong> (según las 6 ventajas) es 'Dejar de adivinar la capacidad'. No tienes que predecir el pico y comprar para él; simplemente usas lo que necesitas." },
            { text: "Un desarrollador puede probar una idea nueva desplegando un entorno de prueba completo en 5 minutos, y luego eliminarlo cuando termina. En su compañía anterior, esto tomaba 6 semanas. ¿A qué ventaja de la nube se refiere esto?", options: ["Economías de escala.","Cambiar CAPEX por OPEX.","Aumentar la velocidad y la agilidad.","Volverse global en minutos."], correctAnswer: 2, explanation: "La capacidad de aprovisionar (y desaprovisionar) recursos de TI en minutos, en lugar de semanas o meses, es la definición de 'Velocidad y Agilidad'." },
            { text: "Una startup en Colombia quiere lanzar su aplicación en Europa y Asia para reducir la latencia de sus usuarios en esas regiones. ¿Qué ventaja de la nube les permite hacer esto fácil y rápidamente?", options: ["Dejar de adivinar la capacidad.","Volverse global en minutos.","Alta Disponibilidad.","Cambiar CAPEX por OPEX."], correctAnswer: 1, explanation: "La infraestructura global de AWS permite desplegar aplicaciones en múltiples regiones de todo el mundo en minutos, logrando una presencia global instantánea." },
            { text: "Tu equipo de TI pasa el 60% de su tiempo cambiando discos duros defectuosos y aplicando parches a los sistemas operativos del hipervisor. ¿Qué ventaja de la nube te permite reenfocar a ese equipo en tareas que generen ingresos para la empresa?", options: ["Aumentar la velocidad y la agilidad.","Beneficiarse de economías de escala masivas.","Dejar de gastar dinero en ejecutar y mantener centros de datos.","Dejar de adivinar la capacidad."], correctAnswer: 2, explanation: "AWS se encarga del 'trabajo pesado indiferenciado' (como cambiar hardware o parchear la infraestructura base). Esto libera a tu personal de esas tareas de mantenimiento para que puedan innovar." },
            { text: "(Cascarita) El término 'OPEX' (Gasto Operativo) se refiere a:", options: ["Pagar por adelantado por hardware y software.","Pagar por los recursos de TI según se consumen (pago por uso).","La capacidad de desplegar recursos en minutos.","Los ahorros obtenidos al compartir infraestructura."], correctAnswer: 1, explanation: "OPEX es el gasto operativo, como tu factura de electricidad o tu factura de AWS. Es un costo variable y recurrente. El pago por adelantado es CAPEX." },
            { text: "(Cascarita) Un hospital compra un nuevo servidor de imágenes médicas por $50,000 para instalarlo en su centro de datos. Este costo es un ejemplo de:", options: ["OPEX (Gasto Operativo)","CAPEX (Gasto de Capital)","Economía de escala","Agilidad"], correctAnswer: 1, explanation: "CAPEX (Gasto de Capital) es la inversión inicial y por adelantado en activos físicos (como un servidor). Esto es exactamente lo que la nube ayuda a evitar." },
            { text: "¿Cuál de las siguientes NO es una de las 6 ventajas de la computación en la nube según AWS?", options: ["Aumentar la velocidad y la agilidad.","Beneficiarse de economías de escala masivas.","Garantizar un 100% de tiempo de actividad (uptime).","Dejar de adivinar la capacidad."], correctAnswer: 2, explanation: "AWS no garantiza un 100% de uptime. Aunque diseñan para una alta disponibilidad (Fiabilidad), las fallas pueden ocurrir. La ventaja es la 'Fiabilidad', pero no una garantía del 100%." },
            { text: "El hecho de que no necesites mantener un equipo de personas para gestionar la refrigeración y la seguridad física de tu centro de datos es un ejemplo de...", options: ["Dejar de gastar dinero en ejecutar y mantener centros de datos.","Cambiar CAPEX por OPEX.","Volverse global en minutos.","Dejar de adivinar la capacidad."], correctAnswer: 0, explanation: "El mantenimiento (refrigeración, seguridad física, hardware) es parte del 'trabajo pesado' de ejecutar un centro de datos. AWS se encarga de esto por ti." }
        ]
    },
    "exam_1_2": {
        title: "Examen: Modelos de Servicio (IaaS, PaaS, SaaS)",
        questions: [
            { text: "Tu equipo quiere desplegar una máquina virtual de Linux en AWS y tener control total sobre el sistema operativo, incluyendo cuándo instalar parches. ¿Qué modelo de servicio deberían usar?", options: ["IaaS", "PaaS", "SaaS", "On-Premises"], correctAnswer: 0, explanation: "IaaS (Infraestructura como Servicio), como Amazon EC2, te da control total sobre el sistema operativo. Eres responsable de instalar parches, gestionar el software y la seguridad a ese nivel." },
            { text: "¿Cuál de los siguientes es un ejemplo de PaaS (Plataforma como Servicio)?", options: ["Amazon EC2", "Gmail", "Amazon RDS", "Tu data center privado"], correctAnswer: 2, explanation: "Amazon RDS (Servicio de Base de Datos Relacional) es PaaS. AWS gestiona el hardware, el sistema operativo y los parches del motor de la base de datos. Tú solo gestionas tus datos y optimizas tus consultas." },
            { text: "Un cliente está buscando una solución de call center lista para usar, sin tener que gestionar servidores, bases de datos o software. ¿Qué modelo de servicio está buscando?", options: ["IaaS", "PaaS", "SaaS", "Híbrido"], correctAnswer: 2, explanation: "SaaS (Software como Servicio) es un producto de software completo y gestionado. El cliente solo lo usa. Amazon Connect es un ejemplo de SaaS para call centers." },
            { text: "(Cascarita) En el modelo IaaS (ej: Amazon EC2), ¿quién es responsable de aplicar los parches de seguridad al sistema operativo invitado (ej: Windows Server)?", options: ["AWS", "El Cliente", "El proveedor del sistema operativo", "Nadie, es automático"], correctAnswer: 1, explanation: "¡Cascarita clave! En IaaS, el cliente es <strong>totalmente responsable</strong> del sistema operativo invitado, sus parches y configuración. AWS solo se encarga del hipervisor y el hardware físico." },
            { text: "(Cascarita) En el modelo PaaS (ej: Amazon RDS), ¿quién es responsable de aplicar los parches de seguridad al sistema operativo subyacente?", options: ["AWS", "El Cliente", "El proveedor de la base de datos", "Ambos"], correctAnswer: 0, explanation: "Esta es la gran ventaja de PaaS. AWS gestiona la infraestructura subyacente, incluyendo el sistema operativo y sus parches. Tú te liberas de esa carga administrativa." },
            { text: "AWS Elastic Beanstalk permite a los desarrolladores simplemente cargar su código (Java, PHP, Node.js) y el servicio automáticamente gestiona el aprovisionamiento, balanceo de carga y escalado. ¿Qué tipo de modelo es Elastic Beanstalk?", options: ["IaaS", "PaaS", "SaaS", "FaaS (Function as a Service)"], correctAnswer: 1, explanation: "Elastic Beanstalk es un ejemplo clásico de PaaS. Abstrae la infraestructura subyacente (IaaS) y te da una plataforma para ejecutar tu código sin gestionar servidores." },
            { text: "¿Cuál de los siguientes modelos de servicio ofrece el MÁXIMO nivel de control y flexibilidad al cliente sobre la infraestructura de red y el sistema operativo?", options: ["PaaS", "SaaS", "IaaS", "Híbrido"], correctAnswer: 2, explanation: "IaaS te da el control más granular. Obtienes los 'bloques de construcción' (servidores virtuales, almacenamiento, redes) y tú decides cómo configurarlos, incluyendo el S.O. y el software." },
            { text: "¿Cuál de los siguientes modelos de servicio requiere la MÍNIMA gestión de infraestructura por parte del cliente?", options: ["PaaS", "SaaS", "IaaS", "Nube Privada"], correctAnswer: 1, explanation: "SaaS no requiere <strong>ninguna</strong> gestión de infraestructura. El cliente es simplemente un usuario final consumiendo el software (ej: Gmail, Salesforce, Amazon Chime)." },
            { text: "Usando la analogía de la 'Pizza como Servicio', el modelo PaaS es equivalente a:", options: ["Comprar los ingredientes y usar tu propio horno (IaaS)", "Ir a un restaurante y que te sirvan todo (SaaS)", "Hacer la pizza desde cero en tu casa (On-Premises)", "Pedir una pizza a domicilio (PaaS)"], correctAnswer: 3, explanation: "PaaS es como 'Pizza a Domicilio'. El restaurante (AWS) prepara la pizza (gestiona el S.O. y el hardware), pero tú pones la mesa y las bebidas (gestionas tu código y tus datos)." },
            { text: "Amazon EC2 es un ejemplo de...", options: ["IaaS", "PaaS", "SaaS", "Híbrido"], correctAnswer: 0, explanation: "Amazon EC2 (Elastic Compute Cloud) es el servicio de Infraestructura como Servicio por excelencia. Te da servidores virtuales (infraestructura) y tú gestionas el resto." }
        ]
    },
    "exam_1_3": {
        title: "Examen: Modelos de Despliegue",
        questions: [
            { text: "Una gran empresa bancaria debe mantener, por regulaciones gubernamentales, todos sus datos de clientes dentro de su propio centro de datos. Sin embargo, quiere usar la nube de AWS para ejecutar su sitio web público de marketing. ¿Qué modelo de despliegue es este?", options: ["Nube Pública", "Nube Privada", "Nube Híbrida", "SaaS"], correctAnswer: 2, explanation: "Esto es Híbrido: una combinación de recursos privados (on-premises) para los datos sensibles y recursos de nube pública (AWS) para las aplicaciones menos críticas." },
            { text: "¿Qué es un despliegue de nube 'On-Premises'?", options: ["Usar múltiples proveedores de nube, como AWS y Azure.", "Desplegar recursos en la infraestructura global de AWS.", "Desplegar recursos en un centro de datos corporativo privado.", "Una combinación de nube pública y privada."], correctAnswer: 2, explanation: "'On-Premises' (en las instalaciones) es sinónimo de Nube Privada. Es el centro de datos tradicional que la empresa posee y opera." },
            { text: "Una startup que está construyendo una nueva aplicación móvil desde cero y no tiene hardware existente decide construir toda su infraestructura en AWS. ¿Qué modelo de despliegue están usando?", options: ["Nube Pública", "Nube Privada", "Nube Híbrida", "IaaS"], correctAnswer: 0, explanation: "Cuando una organización está 'all-in' (totalmente dentro) en AWS y no utiliza centros de datos propios, está usando un modelo de Nube Pública." },
            { text: "AWS Outposts es un servicio que instala hardware de AWS dentro del centro de datos de un cliente. ¿Qué tipo de modelo de despliegue facilita esto?", options: ["Nube Pública exclusivamente", "Nube Híbrida", "Nube Privada exclusivamente", "Multi-Región"], correctAnswer: 1, explanation: "AWS Outposts es la definición de Híbrido. Extiende la infraestructura y servicios de AWS a las instalaciones del cliente." },
            { text: "(Cascarita) ¿Cuál es la principal desventaja de un modelo de Nube Privada (On-Premises) en comparación con la Nube Pública?", options: ["Mayor seguridad.", "El cliente es responsable del CAPEX (gasto de capital) y del mantenimiento del hardware.", "Mayor latencia para los usuarios locales.", "Menor control sobre la soberanía de los datos."], correctAnswer: 1, explanation: "La principal desventaja de la nube privada es el costo y la responsabilidad. El cliente debe comprar el hardware (CAPEX) y encargarse de todo el mantenimiento (refrigeración, parches, hardware), lo cual no es elástico." },
            { text: "Una compañía necesita mantener una base de datos Oracle en su data center debido a licencias de software complejas, pero quiere que sus nuevas aplicaciones web en EC2 puedan acceder a esa base de datos. ¿Qué modelo está implementando?", options: ["Nube Híbrida", "Nube Privada", "Nube Pública", "PaaS"], correctAnswer: 0, explanation: "Este es otro escenario clásico de Nube Híbrida. La aplicación (EC2) vive en la nube pública, pero depende de un recurso (la base de datos) que vive en la nube privada." },
            { text: "El modelo de despliegue que ofrece la mayor elasticidad y agilidad es:", options: ["Nube Privada", "Nube Híbrida", "Nube Pública", "On-Premises"], correctAnswer: 2, explanation: "La Nube Pública (como AWS) ofrece la mayor elasticidad, ya que tienes acceso a una capacidad virtualmente ilimitada que puedes tomar y soltar bajo demanda." }
        ]
    },
    "exam_1_4": {
        title: "Examen: Infraestructura Global de AWS",
        questions: [
            { text: "Una Región de AWS es...", options: ["Un único centro de datos físico.", "Un área geográfica aislada que contiene múltiples Zonas de Disponibilidad.", "Un punto de presencia para almacenar contenido en caché.", "Un grupo de Regiones conectadas por enlaces de alta velocidad."], correctAnswer: 1, explanation: "Una Región es un área geográfica (ej: Norte de Virginia). Dentro de esa área, hay múltiples Zonas de Disponibilidad (centros de datos) aisladas." },
            { text: "Para diseñar una aplicación con Alta Disponibilidad (HA) y tolerancia a fallos, ¿cuál es la mejor práctica recomendada?", options: ["Desplegar la aplicación en múltiples Regiones.", "Desplegar la aplicación en múltiples Zonas de Disponibilidad (AZs) dentro de una Región.", "Desplegar la aplicación en un clúster dentro de una sola AZ.", "Desplegar la aplicación en las Ubicaciones de Borde."], correctAnswer: 1, explanation: "¡Pregunta clave del examen! La Alta Disponibilidad se logra desplegando en múltiples AZs. Si una AZ (un centro de datos) falla, las otras siguen operando." },
            { text: "¿Qué componente de la infraestructura global de AWS se utiliza para entregar contenido (como videos y sitios web) con baja latencia a los usuarios finales?", options: ["Regiones", "Zonas de Disponibilidad", "Ubicaciones de Borde (Edge Locations)", "AWS Outposts"], correctAnswer: 2, explanation: "Las Ubicaciones de Borde (Edge Locations) son la respuesta. Son una red mucho más grande de puntos de presencia que almacenan en caché el contenido cerca del usuario. El servicio que las usa es Amazon CloudFront." },
            { text: "Un banco en Alemania necesita desplegar una aplicación y debe asegurarse de que los datos de los clientes nunca salgan físicamente de Alemania. ¿Qué debería hacer?", options: ["Usar la Región de Irlanda, ya que está en Europa.", "Usar la Región de Frankfurt.", "Usar una Ubicación de Borde en Berlín.", "Usar un despliegue Híbrido."], correctAnswer: 1, explanation: "Este es un requisito de 'Soberanía de Datos'. El cliente debe elegir una Región de AWS que esté físicamente dentro de las fronteras del país, en este caso, la Región de Frankfurt en Alemania." },
            { text: "(Cascarita) ¿Cuál es la relación correcta entre Regiones y AZs?", options: ["Una AZ contiene múltiples Regiones.", "Una Región contiene múltiples AZs.", "Las Regiones y las AZs son independientes.", "Una Región es lo mismo que una AZ."], correctAnswer: 1, explanation: "La jerarquía es: Región > Zona de Disponibilidad. Una Región (la ciudad) está compuesta por múltiples AZs (los barrios/centros de datos)." },
            { text: "¿Cuál de los siguientes NO es un factor al elegir una Región?", options: ["La latencia para los usuarios finales.", "El costo de los servicios en esa Región.", "La necesidad de soberanía de datos.", "El número de Ubicaciones de Borde dentro de esa Región."], correctAnswer: 3, explanation: "El número de Edge Locations no es un factor directo al elegir una Región. Las Edge Locations son una red global separada que funciona *con* la Región de origen, pero no eliges una Región basándote en cuántas Edge Locations tiene." },
            { text: "Amazon CloudFront es un servicio de CDN. ¿Qué infraestructura de AWS utiliza principalmente para reducir la latencia?", options: ["Múltiples Zonas de Disponibilidad", "La red de Ubicaciones de Borde", "Instancias EC2 optimizadas para la red", "AWS Direct Connect"], correctAnswer: 1, explanation: "CloudFront (CDN) y Route 53 (DNS) son servicios globales que usan la red de Ubicaciones de Borde para estar lo más cerca posible de los usuarios finales en todo el mundo." },
            { text: "Una Zona de Disponibilidad (AZ) es...", options: ["Un sinónimo de una Región de AWS.", "Un área geográfica que contiene múltiples Regiones.", "Uno o más centros de datos discretos con energía, refrigeración y redes redundantes.", "Una pequeña caché para contenido web."], correctAnswer: 2, explanation: "Esta es la definición de libro de una AZ. Es un centro de datos (o un grupo de ellos) aislado físicamente de otras AZs." }
        ]
    },
    "exam_1_5": {
        title: "Examen: AWS Well-Architected Framework",
        questions: [
            { text: "¿Cuál de los siguientes pilares se enfoca en la capacidad de un sistema para recuperarse de fallos de infraestructura o servicios?", options: ["Seguridad", "Eficiencia del Rendimiento", "Fiabilidad (Reliability)", "Optimización de Costos"], correctAnswer: 2, explanation: "La Fiabilidad (Reliability) trata sobre el diseño de sistemas que puedan recuperarse automáticamente de fallos. El uso de Múltiples AZs es un concepto clave de este pilar." },
            { text: "Usar plantillas de AWS CloudFormation para automatizar la creación de tu infraestructura es una práctica recomendada del pilar de:", options: ["Excelencia Operativa", "Optimización de Costos", "Sostenibilidad", "Seguridad"], correctAnswer: 0, explanation: "La Excelencia Operativa se centra en 'Infraestructura como Código' (IaC) y la automatización de despliegues y operaciones para reducir el error humano. AWS CloudFormation es el servicio de IaC de AWS." },
            { text: "Un arquitecto está revisando su arquitectura y decide cambiar una instancia EC2 'm5.4xlarge' (muy grande) por una 't3.medium' (más pequeña) después de analizar las métricas de CloudWatch y ver que la CPU nunca supera el 10%. ¿Qué pilar está aplicando?", options: ["Fiabilidad", "Seguridad", "Optimización de Costos", "Excelencia Operativa"], correctAnswer: 2, explanation: "Esto es 'Right Sizing' (Dimensionamiento Correcto). El arquitecto está eliminando el desperdicio y evitando gastos innecesarios, lo cual es el núcleo del pilar de Optimización de Costos." },
            { text: "¿Cuál de los siguientes NO es uno de los 6 pilares del AWS Well-Architected Framework?", options: ["Seguridad", "Agilidad", "Sostenibilidad", "Eficiencia del Rendimiento"], correctAnswer: 1, explanation: "¡Cascarita! La 'Agilidad' es una <strong>ventaja</strong> de la nube, pero no es uno de los <strong>6 pilares</strong> del Framework. Los pilares son: Excelencia Operativa, Seguridad, Fiabilidad, Eficiencia del Rendimiento, Optimización de Costos y Sostenibilidad." },
            { text: "El pilar de Eficiencia del Rendimiento se enfoca en:", options: ["Proteger los datos y sistemas.", "Gastar la menor cantidad de dinero posible.", "Usar los recursos de TI de manera eficiente y adaptarse a los cambios de la demanda.", "Automatizar los despliegues."], correctAnswer: 2, explanation: "La Eficiencia del Rendimiento trata sobre elegir el recurso correcto para el trabajo (ej: el tipo de instancia, la base de datos correcta) y escalar elásticamente para satisfacer la demanda sin desperdiciar recursos." },
            { text: "Implementar el principio de 'privilegio mínimo' usando políticas de IAM es una práctica clave del pilar de:", options: ["Excelencia Operativa", "Fiabilidad", "Seguridad", "Optimización de Costos"], correctAnswer: 2, explanation: "El 'Privilegio Mínimo' (dar a los usuarios y servicios solo los permisos que absolutamente necesitan) es un concepto fundamental del pilar de Seguridad." },
            { text: "Configurar un despliegue de Amazon RDS en 'Multi-AZ' mejora principalmente ¿cuál pilar del Well-Architected Framework?", options: ["Optimización de Costos", "Eficiencia del Rendimiento", "Excelencia Operativa", "Fiabilidad"], correctAnswer: 3, explanation: "Multi-AZ crea una réplica de tu base de datos en otra Zona de Disponibilidad y conmuta automáticamente si la principal falla. Esta es una característica clave para la Alta Disponibilidad y, por lo tanto, para la Fiabilidad." },
            { text: "El pilar más nuevo, añadido en 2021, que se enfoca en reducir el impacto ambiental de las cargas de trabajo en la nube es:", options: ["Optimización de Costos", "Sostenibilidad", "Eficiencia Energética", "Excelencia Operativa"], correctAnswer: 1, explanation: "La Sostenibilidad es el sexto pilar y se centra en la eficiencia energética y la reducción del impacto ambiental." },
            { text: "La herramienta de AWS que te da acceso a preguntas y revisiones basadas en el Well-Architected Framework es:", options: ["AWS Trusted Advisor", "AWS Cost Explorer", "AWS Well-Architected Tool", "Amazon Inspector"], correctAnswer: 2, explanation: "La 'AWS Well-Architected Tool' es un servicio en la consola que te guía a través de una serie de preguntas basadas en los 6 pilares para ayudarte a revisar tu arquitectura." },
            { text: "¿Qué pilar se enfoca en el monitoreo de sistemas y la automatización de respuestas a eventos?", options: ["Fiabilidad", "Seguridad", "Excelencia Operativa", "Sostenibilidad"], correctAnswer: 2, explanation: "La Excelencia Operativa trata sobre cómo operas y monitoreas tus sistemas para entregar valor de negocio y cómo mejoras continuamente tus procesos. El monitoreo (CloudWatch) y la automatización son claves." }
        ]
    }
};

// ================================================================
// LÓGICA DE LA PÁGINA (Común para todos los módulos)
// ================================================================

// Variables globales para los elementos principales
let lessonListEl, mainContentEl, moduleTitleEl, studyContentEl, quizContainerEl;
let currentLessonId, currentExamKey;
let progress = {};

document.addEventListener('DOMContentLoaded', () => {
    // 1. Obtener elementos del DOM
    moduleTitleEl = document.getElementById('module-title');
    lessonListEl = document.getElementById('lesson-list');
    mainContentEl = document.getElementById('lesson-main-content');
    studyContentEl = document.getElementById('lesson-study-content');
    quizContainerEl = document.getElementById('lesson-quiz-container');

    // 2. Cargar progreso
    progress = JSON.parse(localStorage.getItem('awsProgress')) || {};

    // 3. Cargar datos del módulo
    const module = moduleData[currentModuleId];
    if (!module) {
        moduleTitleEl.textContent = "Error";
        studyContentEl.innerHTML = "<p>Módulo no encontrado. <a href='index.html'>Volver al inicio</a>.</p>";
        return;
    }
    
    moduleTitleEl.textContent = module.title;

    // 4. Poblar la barra lateral de lecciones (¡CON LÓGICA DE BLOQUEO!)
    populateLessonList(module.lessons);

    // 5. Añadir Event Listeners
    setupEventListeners();
});

/**
 * Puebla la barra lateral con las lecciones del módulo.
 * Implementa la lógica de bloqueo de lecciones.
 */
function populateLessonList(lessons) {
    lessonListEl.innerHTML = '<h3>Lecciones</h3>'; // Limpiar
    let previousLessonComplete = true; // La primera lección siempre está desbloqueada

    lessons.forEach(lesson => {
        const lessonKey = `lesson_${lesson.id}_complete`;
        const isComplete = progress[lessonKey];
        
        const lessonEl = document.createElement('div');
        lessonEl.className = 'lesson-item';
        lessonEl.dataset.lessonId = lesson.id;
        
        let icon = '📖'; // Icono de "listo para estudiar"
        
        if (isComplete) {
            icon = '✅'; // Completado
        }

        if (previousLessonComplete) {
            // Esta lección está desbloqueada
            lessonEl.classList.add('unlocked');
            lessonEl.dataset.contentKey = lesson.contentKey;
            lessonEl.dataset.examKey = lesson.examKey;
        } else {
            // Esta lección está bloqueada
            icon = '🔒'; // Bloqueado
            lessonEl.classList.add('locked');
        }
        
        lessonEl.innerHTML = `
            <span class="status-icon">${icon}</span>
            <span>${lesson.title}</span>
        `;
        lessonListEl.appendChild(lessonEl);

        // Actualizar la bandera para la *siguiente* iteración
        if (!isComplete) {
            previousLessonComplete = false;
        }
    });
}

/**
 * Configura los event listeners principales.
 */
function setupEventListeners() {
    // 1. Clic en una lección de la barra lateral
    lessonListEl.addEventListener('click', (e) => {
        const lessonItem = e.target.closest('.lesson-item');
        
        // ¡CONDICIÓN! Solo cargar si NO está bloqueado
        if (lessonItem && !lessonItem.classList.contains('locked')) {
            // Marcar como activo en la barra lateral
            document.querySelectorAll('.lesson-item.active').forEach(item => item.classList.remove('active'));
            lessonItem.classList.add('active');
            
            // Cargar el contenido de estudio
            currentLessonId = lessonItem.dataset.lessonId;
            currentExamKey = lessonItem.dataset.examKey;
            loadStudyContent(lessonItem.dataset.contentKey);
        }
    });

    // 2. Scroll en el área de contenido (para el "slider")
    mainContentEl.addEventListener('scroll', () => {
        const btn = document.getElementById('btn-hacer-examen');
        if (btn) {
            const isAtBottom = mainContentEl.scrollTop + mainContentEl.clientHeight >= mainContentEl.scrollHeight - 50;
            if (isAtBottom) {
                btn.style.display = 'block';
            }
        }
    });

    // 3. Clics en botones (Hacer Examen, Repasar) y respuestas del examen
    mainContentEl.addEventListener('click', (e) => {
        if (e.target.id === 'btn-hacer-examen') {
            loadQuiz(currentExamKey);
        }
        
        if (e.target.id === 'btn-repasar-tematica') {
            const contentKey = contentDB[`lesson_${currentLessonId}`] ? `lesson_${currentLessonId}` : null;
            if(contentKey) {
                loadStudyContent(contentKey);
            }
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

/**
 * Carga el contenido de ESTUDIO en el panel principal.
 */
function loadStudyContent(contentKey) {
    const lessonData = contentDB[contentKey];
    
    if (lessonData) {
        studyContentEl.innerHTML = lessonData;
        studyContentEl.innerHTML += `<button id="btn-hacer-examen" class="action-button" style="display: none;">Hacer Examen</button>`;
    } else {
        studyContentEl.innerHTML = `<p>Error: Contenido de la lección no encontrado.</p>`;
    }

    studyContentEl.style.display = 'block';
    quizContainerEl.style.display = 'none';
    quizContainerEl.innerHTML = '';
    mainContentEl.scrollTop = 0;
}

/**
 * Carga el EXAMEN en el panel principal.
 */
function loadQuiz(examKey) {
    const examData = examDB[examKey];
    if (!examData) {
        quizContainerEl.innerHTML = `<p>Error: Examen no encontrado.</p>`;
        return;
    }

    let html = `<h3>${examData.title}</h3>`;
    html += `<p>Responde a cada pregunta. La siguiente pregunta aparecerá automáticamente.</p>`;
    
    examData.questions.forEach((q, index) => {
        const isActive = index === 0;
        html += `
            <div class="question ${isActive ? 'active' : ''}" id="q-${index}" data-question-index="${index}">
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
        html += `</div><div class="feedback"></div></div>`;
    });

    html += `<div id="quiz-results"></div>`;
    quizContainerEl.innerHTML = html;

    studyContentEl.style.display = 'none';
    quizContainerEl.style.display = 'block';
    mainContentEl.scrollTop = 0;
}

/**
 * Gestiona el clic en una respuesta del examen.
 */
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

/**
 * Califica el examen completo después de la última pregunta.
 */
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


/**
 * Recarga la lista de lecciones en la barra lateral
 */
function updateLessonListUI() {
    const module = moduleData[currentModuleId];
    populateLessonList(module.lessons);
    const currentLessonItem = document.querySelector(`.lesson-item[data-lesson-id="${currentLessonId}"]`);
    if (currentLessonItem) currentLessonItem.classList.add('active');
}

/**
 * Guarda una clave de progreso en el localStorage.
 */
function saveProgress(progressKey) {
    progress[progressKey] = true;
    localStorage.setItem('awsProgress', JSON.stringify(progress));
}

/**
 * Verifica si todas las lecciones de un módulo están completas.
 */
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