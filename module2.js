// ================================================================
// CONFIGURACIÓN DEL MÓDULO
// ================================================================
const currentModuleId = "2"; // ID de este módulo

// Este objeto simula nuestra base de datos.
const moduleData = {
    "2": {
        title: "Módulo 2: Seguridad y Cumplimiento",
        lessons: [
            { id: "2_1", title: "Modelo de Responsabilidad Compartida", contentKey: "lesson_2_1", examKey: "exam_2_1" },
            { id: "2_2", title: "IAM: Usuarios, Grupos y Roles", contentKey: "lesson_2_2", examKey: "exam_2_2" },
            { id: "2_3", title: "IAM: Políticas y Mejores Prácticas", contentKey: "lesson_2_3", examKey: "exam_2_3" },
            { id: "2_4", title: "Seguridad de Red: VPC, Grupos de Seguridad y NACLs", contentKey: "lesson_2_4", examKey: "exam_2_4" },
            { id: "2_5", title: "Protección de Red: AWS WAF y Shield", contentKey: "lesson_2_5", examKey: "exam_2_5" },
            { id: "2_6", title: "Cifrado y Secretos: KMS, CloudHSM y Secrets Manager", contentKey: "lesson_2_6", examKey: "exam_2_6" },
            { id: "2_7", title: "Detección y Monitoreo: GuardDuty, CloudTrail y Config", contentKey: "lesson_2_7", examKey: "exam_2_7" },
            { id: "2_8", title: "Cumplimiento y Asesoría: Artifact y Trusted Advisor", contentKey: "lesson_2_8", examKey: "exam_2_8" }
        ]
    }
};

// ================================================================
// BASE DE DATOS DE CONTENIDO
// ================================================================
const contentDB = {
    // =================== LECCIÓN 2.1 ===================
    "lesson_2_1": `
        <h3>El Concepto Más Importante: El Modelo de Responsabilidad Compartida</h3>
        <p>Este es el concepto de seguridad más fundamental en AWS. Define qué parte de la seguridad gestiona AWS y qué parte gestionas tú, el cliente.</p>
       <p>La regla simple es: <strong>AWS es responsable de la seguridad "DE" la nube, mientras que el Cliente es responsable de la seguridad "EN" la nube.</strong> [cite: 1235, 1236]</p>

        <div class="analogy-box">
            <h4>Analogía: Alquilar un Apartamento 🏢</h4>
            <p>Imagina que alquilas un apartamento en un edificio seguro.</p>
            <ul>
                <li><strong>Responsabilidad del Dueño (AWS):</strong> El dueño del edificio es responsable de la seguridad <strong>DE</strong>L edificio. [cite_start]Esto incluye los cimientos, los muros externos, la seguridad del lobby, los guardias de la entrada y que nadie pueda entrar al edificio sin autorización. [cite: 1224, 1225]</li>
                <li><strong>Responsabilidad del Inquilino (Cliente):</strong> Tú eres responsable de la seguridad <strong>EN</strong> tu apartamento. [cite_start]El dueño te da las llaves, pero es tu responsabilidad cerrar la puerta con llave, no dejar las ventanas abiertas y no darle una copia de tu llave a extraños. [cite: 1550, 1551]</li>
            </ul>
        </div>

        <h4>Responsabilidad de AWS (Seguridad DE la Nube)</h4>
        <p>AWS gestiona y protege la infraestructura física que ejecuta todos los servicios. Si puedes tocarlo, AWS lo protege.</p>
        <ul>
           <li><strong>Hardware e Infraestructura Global:</strong> Servidores físicos, almacenamiento físico, redes y los centros de datos (Regiones, AZs, Edge Locations). [cite: 546, 541]</li>
            <li><strong>Software de Virtualización:</strong> El hipervisor que ejecuta las instancias EC2 (el "software base").</li>
            <li><strong>Servicios Gestionados (Capa Base):</strong> En servicios como S3 o DynamoDB, AWS gestiona casi todo, incluyendo el S.O. y la plataforma.</li>
        </ul>

        <h4>Responsabilidad del Cliente (Seguridad EN la Nube)</h4>
        <p>Tu responsabilidad depende del servicio que uses (recuerda IaaS, PaaS, SaaS).</p>
        <ol>
           <li><strong>Datos del Cliente:</strong> Eres <strong>SIEMPRE</strong> responsable de tus datos. [cite: 529]</li>
           <li><strong>Cifrado de Datos:</strong> AWS te da las herramientas (como KMS), pero tú eres responsable de <strong>decidir qué cifrar</strong> (ya sea en reposo o en tránsito). [cite: 532, 533, 534]</li>
            <li><strong>Gestión de Identidad y Acceso (IAM):</strong> Configurar usuarios, roles, permisos y habilitar MFA. [cite_start]Es tu "llave". [cite: 530, 273, 274]</li>
            <li><strong>Configuración de Red:</strong> Configurar Grupos de Seguridad, NACLs, VPCs. [cite_start]Es tu "puerta de entrada". [cite: 531]</li>
           <li><strong>Parches del Sistema Operativo (en IaaS):</strong> Si usas <strong>EC2 (IaaS)</strong>, tú eres responsable de actualizar y parchear el S.O. invitado (Windows, Linux). [cite: 2204, 2205]</li>
        </ol>

        <h4>El Modelo Varía según el Servicio</h4>
        <ul>
            <li><strong>IaaS (ej: EC2):</strong> Tú gestionas más. [cite_start]Eres responsable del S.O., los parches, los datos, IAM y la configuración de red. [cite: 1428]</li>
            <li><strong>PaaS (ej: RDS):</strong> AWS gestiona más. [cite_start]AWS parchea el S.O. y el motor de la base de datos[cite: 2074, 2075]. Tú sigues siendo responsable de tus datos, IAM y las reglas de red (Grupos de Seguridad).</li>
            <li><strong>SaaS (ej: Amazon Chime):</strong> AWS gestiona casi todo. Tú solo gestionas tus datos y quién tiene acceso.</li>
        </ul>
    `,
    // =================== LECCIÓN 2.2 ===================
    "lesson_2_2": `
        <h3>IAM: Usuarios, Grupos y Roles</h3>
        <p><strong>AWS Identity and Access Management (IAM)</strong> es el servicio que te permite gestionar el acceso a los servicios y recursos de AWS de forma segura. Es el "servicio de seguridad" de tu apartamento.</p>
       <p>IAM es un servicio <strong>Global</strong>, no está atado a una Región. [cite: 1363, 1364]</p>
        
        <div class="analogy-box">
            <h4>Analogía: Las Tarjetas de un Hotel 🏨</h4>
            <p>Imagina que tu cuenta de AWS es un hotel.</p>
            <ul>
                <li><strong>Usuario IAM (User):</strong> Es una <strong>persona</strong> (un empleado). Se le da una tarjeta (credenciales) que le permite entrar al hotel. (Ej: Juan, el desarrollador)[cite_start]. [cite: 2354, 2355]</li>
                <li><strong>Grupo IAM (Group):</strong> Es un <strong>departamento</strong> (Ej: "Recepcionistas", "Limpieza"). [cite_start]En lugar de programar cada tarjeta individualmente, programas la tarjeta "Recepcionista" (con acceso al lobby y oficinas) y metes a todos los recepcionistas en ese grupo. [cite: 2146, 2147]</li>
                <li><strong>Rol IAM (Role):</strong> Es una <strong>tarjeta temporal para una tarea específica</strong>. NO está atada a una persona, sino a quien la "asume".
                    <br><strong>Ej 1 (Servicio):</strong> El ascensor (un servicio de AWS como EC2) necesita acceso temporal al cuarto de máquinas (S3). [cite_start]Le das un Rol. [cite: 1540, 1541]
                    <br><strong>Ej 2 (Externo):</strong> Un auditor externo (de otra cuenta de AWS) necesita acceso por 1 hora. [cite_start]No le das un usuario, le dejas "asumir un Rol" de auditor temporalmente. [cite: 1542, 1543]</li>
            </ul>
        </div>

        <h4>1. Usuario IAM (User)</h4>
        <ul>
           <li><strong>Qué es:</strong> Una entidad (persona o aplicación) con credenciales a largo plazo (contraseña para la consola, o <strong>Claves de Acceso</strong> para la CLI/SDK). [cite: 2354, 1647, 1648]</li>
            <li><strong>Cuándo usarlo:</strong> Para humanos que necesitan acceso a la consola, o para aplicaciones fuera de AWS que necesitan credenciales permanentes (aunque se prefiere un Rol).</li>
        </ul>

        <h4>2. Grupo IAM (Group)</h4>
        <ul>
            <li><strong>Qué es:</strong> Una colección de usuarios. [cite_start]No puedes iniciar sesión como un Grupo; es solo un contenedor de permisos. [cite: 1228, 1229]</li>
            <li><strong>Mejor Práctica:</strong> <strong>No asignes permisos directamente a los usuarios.</strong> Asigna permisos a los Grupos, y luego añade o quita usuarios de esos Grupos. [cite_start]Es mucho más fácil de gestionar. [cite: 2199, 2200]</li>
        </ul>

        <h4>3. Rol IAM (Role)</h4>
        <ul>
            <li><strong>Qué es:</strong> Una identidad con <strong>credenciales temporales</strong>. [cite_start]Un Rol se "asume" por una entidad (un usuario, un servicio, otra cuenta) para realizar una tarea. [cite: 29, 30]</li>
            <li><strong>¡Concepto Clave!</strong> Esta es la forma más segura de dar permisos.</li>
            <li><strong>Casos de uso:</strong>
                <ol>
                    <li><strong>Servicio de AWS a Servicio de AWS:</strong> El caso más común. Permitir que una instancia EC2 escriba en un bucket S3. [cite_start]Asignas un Rol a la instancia EC2. [cite: 1540, 1541, 1918, 1919]</li>
                   <li><strong>Acceso entre cuentas:</strong> Permitir que la Cuenta A (Auditoría) lea recursos en la Cuenta B (Producción). [cite: 1542]</li>
                   <li><strong>Federación (Identity Federation):</strong> Permitir que usuarios de tu Directorio Activo corporativo (o de Google/Facebook) inicien sesión en AWS asumiendo un Rol. [cite: 477, 478, 1503, 1504]</li>
                </ol>
            </li>
        </ul>
    `,
    // =================== LECCIÓN 2.3 ===================
    "lesson_2_3": `
        <h3>IAM: Políticas y Mejores Prácticas</h3>
        <p>Ya tenemos las entidades (Usuarios, Grupos, Roles). ¿Cómo les damos permisos? Con <strong>Políticas IAM</strong>.</p>
        
        <h4>Políticas IAM (IAM Policies)</h4>
        <ul>
           <li><strong>Qué es:</strong> Un documento (en formato JSON) que define explícitamente qué acciones (<code>"Action"</code>) están permitidas (<code>"Effect": "Allow"</code>) o denegadas (<code>"Effect": "Deny"</code>) sobre qué recursos (<code>"Resource"</code>). [cite: 1661, 1662]</li>
            <li><strong>Cómo funcionan:</strong> Las políticas se "adjuntan" a las entidades IAM (Usuarios, Grupos o Roles).</li>
            <li><strong>Denegación Explícita (Explicit Deny):</strong> Una regla de "Deny" <strong>SIEMPRE</strong> gana. Si un usuario está en 10 grupos que le dan "Allow" a S3, pero una sola política dice "Deny", el acceso es denegado.</li>
        </ul>

        <h3>Mejores Prácticas de Seguridad de IAM (¡Examen Seguro!)</h3>
        <p>Estas son las reglas de oro para proteger tu cuenta.</p>

        <h4>1. NO Usar el Usuario Raíz (Root User)</h4>
        <ul>
            <li><strong>Qué es:</strong> El usuario Raíz es el email que usaste para crear la cuenta. Tiene poder absoluto e ilimitado.</li>
            <li><strong>Mejor Práctica:</strong> <strong>NUNCA</strong> uses el usuario Raíz para tareas diarias. [cite_start]Guárdalo bajo llave. [cite: 2158, 2159]</li>
           <li><strong>Acción Inmediata:</strong> Habilita <strong>MFA</strong> en el usuario Raíz. [cite: 274, 2301]</li>
        </ul>

        <h4>2. Implementar el Principio de Privilegio Mínimo (Least Privilege)</h4>
        <ul>
           <li><strong>Qué es:</strong> Dar a los usuarios y servicios <strong>solo los permisos mínimos</strong> que necesitan para realizar su trabajo, y nada más. [cite: 2161, 2162]</li>
            <li><strong>Ejemplo Malo:</strong> Dar permisos de Administrador (<code>"*:*"</code>) a un desarrollador que solo necesita leer de S3.</li>
            <li><strong>Ejemplo Bueno:</strong> Dar permisos <code>"s3:GetObject"</code> solo al bucket <code>"proyectos-dev"</code>.</li>
        </ul>

        <h4>3. Habilitar MFA (Autenticación Multifactor)</h4>
        <ul>
            <li><strong>Qué es:</strong> Una capa extra de seguridad. [cite_start]Requiere "algo que sabes" (tu contraseña) y "algo que tienes" (un código de una app en tu teléfono o un dispositivo físico). [cite: 273]</li>
           <li><strong>Mejor Práctica:</strong> <strong>OBLIGATORIO</strong> para el usuario Raíz y para todos los usuarios con permisos elevados (Administradores). [cite: 274, 2301]</li>
        </ul>

        <h4>4. Usar Roles de IAM para Servicios de AWS</h4>
        <ul>
            <li><strong>Qué es:</strong> <strong>NUNCA</strong> guardes Claves de Acceso (Access Keys) de IAM dentro de una instancia EC2. Es un riesgo de seguridad enorme.</li>
           <li><strong>Mejor Práctica:</strong> Asigna un <strong>Rol de IAM</strong> a la instancia EC2 para que obtenga credenciales temporales automáticamente. [cite: 1540, 1541, 1918, 1919]</li>
        </ul>

        <h4>5. Rotar Credenciales y Configurar Políticas de Contraseña</h4>
        <ul>
           <li><strong>Qué es:</strong> Configura una política de contraseñas sólida (longitud mínima, caracteres especiales, etc.) [cite: 270, 271, 2302] y rota las Claves de Acceso (Access Keys) regularmente.</li>
        </ul>
    `,
    // =================== LECCIÓN 2.4 ===================
    "lesson_2_4": `
        <h3>Seguridad de Red: VPC, Grupos de Seguridad y NACLs</h3>
        <p>IAM controla "quién" (identidad) puede acceder a los servicios. La seguridad de red controla "qué" (tráfico IP) puede entrar o salir de tus recursos.</p>
        <p><strong>Amazon VPC (Virtual Private Cloud)</strong> es tu centro de datos virtual y privado en la nube. [cite_start]Te da control total sobre tu entorno de red. [cite: 1626, 1914, 1915]</p>
        <p>Dentro de una VPC, tienes dos "firewalls" principales: Grupos de Seguridad y NACLs.</p>

        <div class="analogy-box">
            <h4>Analogía: El Edificio de Apartamentos 🏢 (Otra vez)</h4>
            <p>Tu <strong>VPC</strong> es el edificio completo.</p>
            <p>Una <strong>Subred</strong> es un <strong>piso</strong> del edificio (Ej: "Piso 1 - Subred Pública", "Piso 10 - Subred Privada").</p>
            <ul>
                <li><strong>Grupo de Seguridad (Security Group):</strong> Es el <strong>guardia en la puerta de tu apartamento</strong> (tu instancia EC2). Revisa la lista de invitados. Si dejas entrar a un amigo (tráfico entrante), el guardia <strong>automáticamente lo deja salir</strong>. Es <strong>Stateful</strong>.</li>
                <li><strong>NACL (Network ACL):</strong> Es el <strong>guardia en la entrada del PISO</strong> (la subred). Es más estricto. Revisa la lista de invitados cuando entran Y cuando salen. Si permites entrar a un amigo (regla de entrada), debes <strong>también crear una regla para dejarlo salir</strong>. Es <strong>Stateless</strong>.</li>
            </ul>
        </div>

        <h4>1. Grupos de Seguridad (Security Groups - SG)</h4>
        <ul>
           <li><strong>Nivel:</strong> Actúa a nivel de <strong>Instancia</strong> (EC2, RDS). [cite: 1506, 2270]</li>
            <li><strong>Tipo:</strong> <strong>Stateful</strong> (con estado).
                <ul>
                    <li>Esto significa que si permites tráfico de entrada (ej: Puerto 80), el tráfico de respuesta (salida) se permite automáticamente, sin necesidad de una regla de salida.</li>
                </ul>
            </li>
            <li><strong>Reglas:</strong> Solo soporta reglas de <strong>Permitir (Allow)</strong>. Todo lo que no está explícitamente permitido, está denegado por defecto.</li>
            <li><strong>Caso de uso:</strong> Es la primera línea de defensa. "Permitir tráfico HTTP (Puerto 80) desde cualquier IP (0.0.0.0/0) a mis servidores web".</li>
        </ul>

        <h4>2. NACLs (Network Access Control Lists)</h4>
        <ul>
            <li><strong>Nivel:</strong> Actúa a nivel de <strong>Subred</strong>. [cite_start]Afecta a TODAS las instancias dentro de esa subred. [cite: 1507, 1905, 1906]</li>
           <li><strong>Tipo:</strong> <strong>Stateless</strong> (sin estado). [cite: 1210]
                <ul>
                    <li>Debes crear reglas explícitas para la entrada <strong>Y</strong> la salida. [cite_start]Si permites la entrada por el puerto 80, debes permitir la salida por los puertos efímeros (ej: 1024-65535). [cite: 1208]</li>
                </ul>
            </li>
            <li><strong>Reglas:</strong> Soporta reglas de <strong>Permitir (Allow)</strong> y <strong>Denegar (Deny)</strong> explícitas. Se evalúan por número, de menor a mayor.</li>
            <li><strong>Caso de uso:</strong> Segunda capa de defensa. Útil para denegar explícitamente una IP maliciosa conocida (Ej: "Denegar todo el tráfico de 1.2.3.4").</li>
        </ul>
    `,
    // =================== LECCIÓN 2.5 ===================
    "lesson_2_5": `
        <h3>Protección de Red: AWS WAF y Shield</h3>
        <p>Estos servicios protegen tus aplicaciones web (que se ejecutan en servicios como CloudFront, Application Load Balancer o API Gateway) de ataques comunes de Internet.</p>

        <h4>1. AWS Shield</h4>
        <ul>
            <li><strong>Qué es:</strong> Un servicio gestionado de protección contra ataques de <strong>DDoS (Denegación de Servicio Distribuido)</strong>.</li>
            <li><strong>¿Qué es un DDoS?</strong> Cuando miles de computadoras infectadas (una "botnet") intentan inundar tu servidor web con tráfico falso para tumbarlo.</li>
            <li><strong>Niveles:</strong>
                <ul>
                    <li><strong>Shield Standard:</strong> <strong>Gratuito</strong> y se activa automáticamente para todos los clientes de AWS. Protege contra los ataques DDoS más comunes de capa 3 y 4.</li>
                    <li><strong>Shield Advanced:</strong> Un servicio de pago que ofrece protección avanzada contra ataques más grandes y sofisticados, soporte 24/7 del equipo de respuesta de AWS (DRT) y protección contra costos (te reembolsan si tu factura de EC2 se dispara por un ataque).</li>
                </ul>
            </li>
        </ul>

        <h4>2. AWS WAF (Web Application Firewall)</h4>
        <ul>
           <li><strong>Qué es:</strong> Es un firewall que protege contra ataques a nivel de <strong>aplicación (Capa 7)</strong>. [cite: 276, 1140]</li>
            <li><strong>¿Qué protege?</strong> Te protege de exploits web comunes, como:
                <ul>
                   <li><strong>Inyección SQL (SQL Injection):</strong> Cuando un atacante intenta escribir comandos de base de datos en un formulario (Ej: <code>' OR 1=1; --</code>). [cite: 1422]</li>
                   <li><strong>Cross-Site Scripting (XSS):</strong> Cuando un atacante intenta inyectar código JavaScript malicioso en tu sitio. [cite: 1141]</li>
                </ul>
            </li>
           <li><strong>Cómo funciona:</strong> Creas reglas (ACLs) para filtrar el tráfico basándote en el contenido de la solicitud, como las IPs de origen, los encabezados HTTP o el cuerpo de la solicitud. [cite: 277, 281]</li>
        </ul>

        <div class="analogy-box">
            <h4>Analogía: El Guardia del Concierto 🎸</h4>
            <p>Imagina la entrada a un concierto (tu aplicación web).</p>
            <ul>
                <li><strong>AWS Shield (DDoS):</strong> Es el <strong>control de multitudes</strong> en la calle. Evita que 10,000 personas sin boleta intenten tumbar la puerta principal a la fuerza.</li>
                <li><strong>AWS WAF (Aplicación):</strong> Es el <strong>guardia de seguridad</strong> en la puerta. No le importa la multitud (de eso se encarga Shield), sino que revisa a cada persona individualmente. Busca "armas" específicas (Inyección SQL, XSS) y si las encuentra, no te deja entrar.</li>
            </ul>
        </div>
    `,
    // =================== LECCIÓN 2.6 ===================
    "lesson_2_6": `
        <h3>Cifrado y Secretos: KMS, CloudHSM y Secrets Manager</h3>
        <p>Proteger tus datos es tu responsabilidad. El cifrado es la herramienta principal para hacerlo. AWS ofrece varios servicios para gestionar las claves de cifrado y los secretos.</p>

        <h4>1. AWS KMS (Key Management Service)</h4>
        <ul>
            <li><strong>Qué es:</strong> El servicio de cifrado más común. [cite_start]Es un servicio <strong>gestionado</strong> que facilita la creación y control de claves criptográficas. [cite: 807, 808]</li>
           <li><strong>Cómo funciona:</strong> KMS se integra con casi todo (S3, EBS, RDS). [cite: 366, 367, 808] Tú creas una "Clave Maestra de Cliente" (CMK) en KMS, y luego le pides a KMS que cifre o descifre datos usando esa clave.</li>
            <li><strong>Ventaja Clave:</strong> AWS gestiona el hardware y el software de las claves por ti. Tú solo controlas los permisos (quién puede usar la clave) a través de IAM. Es la opción más fácil y recomendada para la mayoría.</li>
        </ul>

        <h4>2. AWS CloudHSM (Hardware Security Module)</h4>
        <ul>
           <li><strong>Qué es:</strong> Es un <strong>dispositivo de hardware físico dedicado</strong> (un "módulo de seguridad de hardware") que instalas en la nube de AWS para tu uso exclusivo. [cite: 106, 732, 733]</li>
            <li><strong>Diferencia con KMS:</strong> En KMS, compartes el hardware (aunque tus claves son seguras). En CloudHSM, el dispositivo físico es <strong>solo tuyo</strong>.</li>
            <li><strong>Cuándo usarlo:</strong> Cuando tienes requisitos de cumplimiento <strong>extremadamente estrictos</strong> (ej: banca de alto nivel) que exigen que las claves se almacenen en un dispositivo de hardware dedicado que tú controlas exclusivamente. [cite_start]Es mucho más caro y complejo que KMS. [cite: 107]</li>
        </ul>

        <h4>3. AWS Secrets Manager</h4>
        <ul>
           <li><strong>Qué es:</strong> Un servicio para gestionar, recuperar y (lo más importante) <strong>rotar automáticamente</strong> "secretos". [cite: 747]</li>
            <li><strong>¿Qué es un secreto?</strong> Contraseñas de bases de datos, claves de API, tokens, etc.</li>
            <li><strong>Problema que resuelve:</strong> Evita que los desarrolladores escriban contraseñas directamente en el código (una práctica terrible).</li>
           <li><strong>Característica Clave:</strong> Se integra con servicios como RDS y DocumentDB para <strong>rotar automáticamente las contraseñas</strong> (ej: cambiar la contraseña de la BD cada 30 días) sin que tu aplicación se caiga. [cite: 748]</li>
        </ul>
    `,
    // =================== LECCIÓN 2.7 ===================
    "lesson_2_7": `
        <h3>Detección y Monitoreo: GuardDuty, CloudTrail y Config</h3>
        <p>No basta con poner cerraduras (IAM, KMS); necesitas cámaras de seguridad (CloudTrail) y un sistema de alarma (GuardDuty).</p>

        <div class="analogy-box">
            <h4>Analogía: El Sistema de Seguridad del Edificio 🚨</h4>
            <ul>
                <li><strong>AWS CloudTrail:</strong> Es el <strong>registro de acceso (la bitácora)</strong>. Anota absolutamente todo: "Quién, Qué y Cuándo". "Juan (IAM) usó la API (Qué) para eliminar una instancia (Acción) a las 10:03 AM (Cuándo)". Es para <strong>auditoría</strong>.</li>
                <li><strong>Amazon GuardDuty:</strong> Es el <strong>guardia de seguridad inteligente</strong> que lee la bitácora (CloudTrail) y los registros de red (VPC Flow Logs) y te <strong>alerta</strong> si ve algo sospechoso. "Oye, Juan suele trabajar desde Colombia, pero acabo de ver un intento de inicio de sesión desde Corea del Norte... ¡Alerta!". Es para <strong>detección de amenazas</strong>.</li>
                <li><strong>AWS Config:</strong> Es el <strong>inspector de cumplimiento</strong>. Revisa que todo esté según las reglas. "La política del edificio dice que todas las puertas de los apartamentos deben tener cerraduras de seguridad. Acabo de revisar el apartamento 10B (una instancia EC2) y su puerta (Grupo de Seguridad) está abierta al público (Puerto 22)... ¡Alerta de no cumplimiento!". Es para <strong>evaluación de configuración</strong>.</li>
            </ul>
        </div>

        <h4>1. Amazon GuardDuty</h4>
        <ul>
           <li><strong>Qué es:</strong> Un servicio <strong>inteligente de detección de amenazas</strong>. [cite: 575, 1997]</li>
           <li><strong>Cómo funciona:</strong> Utiliza Machine Learning para analizar registros (CloudTrail, VPC Flow Logs, DNS logs) y encontrar actividad maliciosa o anómala. [cite: 576]</li>
            <li><strong>Ejemplos de hallazgos:</strong> Minería de criptomonedas en tus EC2, instancias comunicándose con IPs maliciosas conocidas, intentos de fuerza bruta desde una IP extraña.</li>
        </ul>

        <h4>2. AWS CloudTrail</h4>
        <ul>
           <li><strong>Qué es:</strong> El servicio de <strong>auditoría y registro de bitácora</strong> de tu cuenta. [cite: 1578, 2202]</li>
            <li><strong>Qué registra:</strong> Cada llamada a la API de AWS. [cite_start]Responde: <strong>¿Quién hizo qué, cuándo y desde dónde?</strong> [cite: 1579, 2203]</li>
            <li><strong>Caso de uso:</strong> "Un desarrollador eliminó una instancia EC2 por error. ¿Quién fue?". Vas a CloudTrail, filtras por el evento <code>TerminateInstances</code> y encuentras al culpable.</li>
            <li><strong>CloudTrail vs CloudWatch:</strong> CloudTrail registra <strong>eventos de API</strong> (quién hizo qué). CloudWatch registra <strong>métricas de rendimiento</strong> (CPU, Red) y <strong>logs de aplicación</strong>.</li>
        </ul>

        <h4>3. AWS Config</h4>
        <ul>
           <li><strong>Qué es:</strong> Un servicio que <strong>evalúa, audita y monitorea las configuraciones</strong> de tus recursos de AWS. [cite: 1500, 1501]</li>
            <li><strong>Cómo funciona:</strong> Tomas una "foto" de la configuración de tus recursos (ej: cómo está configurado un bucket S3). Luego, AWS Config monitorea continuamente si esa configuración cambia.</li>
           <li><strong>Caso de uso:</strong> Puedes crear reglas, como "Alertarme si alguien crea un bucket S3 y lo hace público" o "Alertarme si un Grupo de Seguridad permite el puerto 22 (SSH) abierto al mundo". [cite: 1502]</li>
        </ul>
    `,
    // =================== LECCIÓN 2.8 ===================
    "lesson_2_8": `
        <h3>Cumplimiento y Asesoría: Artifact y Trusted Advisor</h3>
        <p>Estos servicios te ayudan con el cumplimiento normativo y con la optimización general de tu cuenta.</p>

        <h4>1. AWS Artifact</h4>
        <ul>
           <li><strong>Qué es:</strong> Es un portal de autoservicio para acceder a los <strong>informes de cumplimiento y auditoría de AWS</strong>. [cite: 2072, 2337]</li>
            <li><strong>Problema que resuelve:</strong> Tu empresa necesita pasar una auditoría (ej: PCI para tarjetas de crédito, o ISO 27001). El auditor te pregunta: "Demuéstrame que el centro de datos de AWS donde corres tu aplicación es seguro".</li>
            <li><strong>Cómo usarlo:</strong> Vas a AWS Artifact y descargas el informe SOC 2 o el certificado ISO de AWS y se lo entregas a tu auditor. [cite_start]Es un servicio gratuito. [cite: 2073, 2338]</li>
        </ul>

        <h4>2. AWS Trusted Advisor</h4>
        <ul>
           <li><strong>Qué es:</strong> Es un <strong>asesor automático</strong> que escanea tu cuenta de AWS y te da recomendaciones de mejores prácticas. [cite: 250, 2360]</li>
            <li><strong>Los 5 Pilares de Trusted Advisor:</strong> (No confundir con los 6 pilares del Well-Architected Framework, aunque son similares).
                <ol>
                    <li><strong>Optimización de Costos:</strong> "Oye, tienes instancias EC2 que casi no usas. Apágalas".</li>
                   <li><strong>Rendimiento:</strong> "Tu instancia EC2 tiene la CPU al 99% todo el tiempo. Auméntala". [cite: 2127, 2128]</li>
                   <li><strong>Seguridad:</strong> "¡Alerta! Tienes un Grupo de Seguridad con el puerto 3389 (RDP) abierto al mundo". [cite: 251]</li>
                   <li><strong>Tolerancia a Fallos:</strong> "No tienes backups habilitados en tu base de datos RDS". [cite: 2336]</li>
                   <li><strong>Límites de Servicio:</strong> "Estás usando 18 de tus 20 instancias EC2 permitidas en esta región. Estás cerca del límite". [cite: 2129, 2130]</li>
                </ol>
            </li>
            <li><strong>Niveles de Soporte:</strong>
                <ul>
                   <li><strong>Plan Basic/Developer:</strong> Acceso a un subconjunto de chequeos (los de seguridad y límites de servicio). [cite: 2206]</li>
                   <li><strong>Plan Business/Enterprise:</strong> Acceso a <strong>TODOS</strong> los chequeos, incluyendo los de optimización de costos y rendimiento. [cite: 887, 1007, 1903]</li>
                </ul>
            </li>
        </ul>
    `
};

// ================================================================
// BASE DE DATOS DE EXÁMENES
// ================================================================
const examDB = {
    // =================== EXAMEN 2.1 ===================
    "exam_2_1": {
        title: "Examen: Modelo de Responsabilidad Compartida",
        questions: [
           { text: "Según el modelo de responsabilidad compartida, ¿de qué es responsable AWS?", options: ["Parchear el sistema operativo de una instancia EC2.", "Configurar los Grupos de Seguridad.", "Cifrar los datos de un bucket S3.", "Proteger la infraestructura física de los centros de datos."], correctAnswer: 3, explanation: "AWS es responsable de la seguridad 'DE' la nube, lo que incluye el hardware físico, la infraestructura global (Regiones, AZs) y la seguridad de sus instalaciones. [cite: 1224, 1225, 1235]" },
            { text: "Un cliente lanza una instancia EC2 con Windows (IaaS). ¿Quién es responsable de aplicar los parches de seguridad al sistema operativo Windows?", options: ["AWS", "El Cliente", "Microsoft", "El servicio AWS Systems Manager automáticamente."], correctAnswer: 1, explanation: "En IaaS (como EC2), el cliente es responsable de todo lo que está 'por encima' del hipervisor. [cite_start]Esto incluye el sistema operativo invitado (Windows/Linux), sus parches y la configuración. [cite: 2204, 2205]" },
            { text: "Un cliente usa Amazon RDS (PaaS). ¿Quién es responsable de aplicar los parches al motor de la base de datos (ej: MySQL) y al S.O. subyacente?", options: ["AWS", "El Cliente", "Oracle", "El Cliente es responsable del S.O. y AWS del motor."], correctAnswer: 0, explanation: "En PaaS (como RDS), AWS gestiona la infraestructura subyacente, el S.O. Y la plataforma (el motor de la BD). [cite_start]El cliente solo gestiona sus datos y el acceso (Grupos de Seguridad). [cite: 2074, 2075, 1561]" },
           { text: "¿Cuál de las siguientes es SIEMPRE una responsabilidad del cliente, independientemente del modelo de servicio (IaaS, PaaS, SaaS)?", options: ["El hardware físico.", "El sistema operativo.", "La gestión de datos y el control de acceso (IAM).", "La virtualización."], correctAnswer: 2, explanation: "El cliente siempre es dueño de sus datos y es responsable de gestionarlos y de controlar quién (IAM) y qué (red) puede acceder a ellos. [cite: 529, 530, 1550, 1551]" },
            { text: "La frase 'Seguridad DE la Nube' se refiere a:", options: ["La responsabilidad del cliente de cifrar sus datos.", "La responsabilidad de AWS de proteger su infraestructura global.", "La configuración de los Grupos de Seguridad.", "La instalación de antivirus en EC2."], correctAnswer: 1, explanation: "Seguridad 'DE' la Nube = Responsabilidad de AWS (Hardware, Infraestructura Global). [cite_start]Seguridad 'EN' la Nube = Responsabilidad del Cliente (Datos, IAM, Parches de S.O. en EC2). [cite: 1235, 1236]" },
            { text: "El cliente quiere asegurarse de que sus datos en S3 estén cifrados. ¿Quién es responsable de habilitar esta configuración?", options: ["AWS (lo hace por defecto para todas las cuentas)", "El Cliente (debe configurar la política de cifrado en el bucket)", "El proveedor del S.O.", "El servicio de soporte de AWS"], correctAnswer: 1, explanation: "AWS provee las herramientas (KMS, Cifrado S3), pero el cliente es responsable de 'usarlas'. [cite_start]Habilitar el cifrado es una responsabilidad del cliente 'EN' la nube. [cite: 533, 1551]" },
           { text: "En el modelo IaaS, ¿qué gestiona el cliente?", options: ["Sistema Operativo, Redes, Aplicaciones y Datos.", "Solo las Aplicaciones y Datos.", "Solo el Hardware Físico.", "AWS lo gestiona todo."], correctAnswer: 0, explanation: "En IaaS, el cliente gestiona la mayor parte: S.O., parches, middleware, aplicaciones, datos, redes (VPC, SG), y acceso (IAM). [cite: 1428, 1437-1440, 1453-1455]" },
            { text: "En el modelo PaaS, ¿qué gestiona el cliente?", options: ["Sistema Operativo, Aplicaciones y Datos.", "Solo las Aplicaciones y Datos.", "Solo el Hardware Físico.", "AWS lo gestiona todo."], correctAnswer: 1, explanation: "En PaaS, AWS gestiona el hardware, el S.O. y el runtime. [cite_start]El cliente solo se preocupa por su código (aplicación) y sus datos. [cite: 1441-1443, 2013, 2014]" }
        ]
    },
    // =================== EXAMEN 2.2 ===================
    "exam_2_2": {
        title: "Examen: IAM: Usuarios, Grupos y Roles",
        questions: [
            { text: "¿Qué entidad de IAM es la más adecuada para otorgar permisos a una instancia EC2 para que pueda acceder a un bucket S3?", options: ["Un Usuario IAM", "Un Grupo IAM", "Un Rol IAM", "Una Política de Bucket"], correctAnswer: 2, explanation: "¡Pregunta clave! La mejor práctica para dar permisos a un servicio de AWS (como EC2) es un Rol IAM. [cite_start]El servicio 'asume' el rol para obtener credenciales temporales. [cite: 1540, 1541, 1918, 1919]" },
            { text: "Un nuevo empleado (Juan) se une al equipo de desarrolladores. ¿Cuál es la forma más eficiente y segura de otorgarle los mismos permisos que al resto del equipo?", options: ["Clonar los permisos de otro desarrollador y asignárselos a Juan.", "Crear un nuevo Rol IAM para Juan.", "Añadir al usuario IAM de Juan al Grupo 'Desarrolladores' existente.", "Darle a Juan las Claves de Acceso del usuario Raíz."], correctAnswer: 2, explanation: "La mejor práctica es gestionar permisos mediante Grupos. [cite_start]Simplemente añade al nuevo usuario al grupo 'Desarrolladores' y automáticamente heredará todos los permisos del grupo. [cite: 2146, 2147, 2199, 2200]" },
          { text: "¿Qué entidad de IAM se asocia con credenciales a largo plazo (contraseña y/o claves de acceso)?", options: ["Rol IAM", "Grupo IAM", "Usuario IAM", "Política IAM"], correctAnswer: 2, explanation: "Un Usuario IAM es la entidad diseñada para tener credenciales permanentes (largo plazo), como una contraseña para la consola o Claves de Acceso (Access Keys) para la CLI/SDK. [cite: 150, 151, 2354, 2355]" },
            { text: "¿Qué entidad de IAM se utiliza para otorgar acceso temporal a usuarios de otra cuenta de AWS?", options: ["Grupo IAM", "Rol IAM", "Usuario IAM entre cuentas", "AWS Organizations"], correctAnswer: 1, explanation: "Los Roles son el mecanismo para delegar acceso. [cite_start]Se puede configurar un Rol para que confíe en otra cuenta de AWS, permitiendo a los usuarios de esa cuenta 'asumir' el Rol y obtener acceso temporal. [cite: 1542, 1543]" },
            { text: "El servicio de IAM (Identity and Access Management) opera a qué nivel:", options: ["Regional (debe configurarse en cada Región)", "Nivel de Zona de Disponibilidad (AZ)", "Global (se configura una vez y se aplica a todas las Regiones)", "Nivel de VPC"], correctAnswer: 2, explanation: "IAM es un servicio Global. [cite_start]Los usuarios, grupos, roles y políticas que creas están disponibles en todas las regiones; no necesitas recrearlos. [cite: 1363, 1364]" },
            { text: "¿Puede un Usuario IAM pertenecer a múltiples Grupos IAM?", options: ["No, un usuario solo puede estar en un grupo.", "Sí, un usuario puede estar en múltiples grupos.", "Solo si el MFA está activado.", "Solo si son roles, no usuarios."], correctAnswer: 1, explanation: "Sí. [cite_start]Un usuario puede pertenecer a múltiples grupos (ej: 'Desarrolladores' y 'Operaciones-S3-Lectura'), y sus permisos finales son la suma de todas las políticas de esos grupos. [cite: 1228]" },
            { text: "¿Cuál es el propósito principal de Amazon Cognito?", options: ["Gestionar el cifrado de claves.", "Gestionar la autenticación y autorización de usuarios para aplicaciones web y móviles.", "Proteger contra ataques DDoS.", "Auditar las llamadas a la API."], correctAnswer: 1, explanation: "Amazon Cognito es el servicio para 'IAM de cara al cliente'. [cite_start]Gestiona el registro, inicio de sesión y control de acceso para los usuarios de tu aplicación, permitiendo federación con Google, Facebook, etc. [cite: 841, 842, 1503, 1504]" }
        ]
    },
    // =================== EXAMEN 2.3 ===================
    "exam_2_3": {
        title: "Examen: IAM: Políticas y Mejores Prácticas",
        questions: [
            { text: "¿Cuál es la mejor práctica de seguridad para la cuenta Raíz (Root User) de AWS?", options: ["Usarla para todas las tareas administrativas diarias.", "Eliminarla después de crear el primer usuario IAM.", "Habilitar MFA y no usarla para tareas diarias.", "Compartir sus credenciales con el equipo de administración."], correctAnswer: 2, explanation: "La cuenta Raíz tiene poder ilimitado. [cite_start]La mejor práctica es habilitarle MFA, guardar sus credenciales en un lugar seguro y NUNCA usarla para tareas diarias. [cite: 2158, 2159, 2301]" },
            { text: "Un desarrollador solo necesita leer objetos de un bucket S3 específico. ¿Qué concepto de seguridad de IAM se debe aplicar al crear su política?", options: ["Principio de Privilegio Mínimo (Least Privilege)", "Autenticación Multifactor (MFA)", "Rotación de Claves", "Responsabilidad Compartida"], correctAnswer: 0, explanation: "El Principio de Privilegio Mínimo dicta que solo debes dar los permisos estrictamente necesarios para hacer un trabajo. [cite_start]En este caso, solo <code>s3:GetObject</code> para ese bucket específico. [cite: 2161, 2162]" },
            { text: "Un desarrollador guarda sus Claves de Acceso de IAM (Access Keys) en el código fuente de una aplicación y lo sube a un repositorio público en GitHub. ¿Por qué es esto un riesgo de seguridad catastrófico?", options: ["Porque las claves rotarán automáticamente y la aplicación fallará.", "Porque los bots escanean GitHub buscando claves y las usarán para minar criptomonedas en tu cuenta.", "Porque viola la política de contraseñas de IAM.", "No es un riesgo si el bucket de S3 es privado."], correctAnswer: 1, explanation: "Esta es una de las peores brechas de seguridad. Los atacantes tienen bots escaneando repositorios públicos 24/7. Si encuentran claves, las usan en segundos para crear miles de instancias EC2 (u otros recursos) a tu costa. [cite_start]La mejor práctica es NUNCA guardar claves en el código; se debe usar un Rol IAM. [cite: 1918, 1919]" },
            { text: "¿Qué es la Autenticación Multifactor (MFA)?", options: ["Una política de IAM que requiere cambiar la contraseña cada 90 días.", "Un servicio que detecta amenazas en la cuenta.", "Una capa de seguridad que requiere una contraseña (algo que sabes) y un código de un dispositivo físico (algo que tienes).", "Un tipo de Rol IAM temporal."], correctAnswer: 2, explanation: "MFA (Multi-Factor Authentication) añade una segunda capa de seguridad. [cite_start]Combina 'algo que sabes' (contraseña) con 'algo que tienes' (un token de una app o un dispositivo USB). [cite: 273, 274]" },
            { text: "Un usuario IAM tiene una política 'Allow' para <code>ec2:*</code> y una política 'Deny' para <code>ec2:TerminateInstances</code>. ¿Podrá el usuario terminar instancias EC2?", options: ["Sí, porque 'Allow' tiene prioridad.", "No, porque 'Deny' explícito siempre anula cualquier 'Allow'.", "Solo si usa MFA.", "Depende de a qué Grupo pertenezca."], correctAnswer: 1, explanation: "La regla de oro de la evaluación de políticas IAM es: un 'Deny' (denegación) explícito SIEMPRE gana. No importa cuántas políticas 'Allow' tenga, si hay un 'Deny', la acción es bloqueada." },
           { text: "¿Qué servicio de AWS te permite forzar reglas como 'longitud mínima de contraseña' o 'requerir caracteres especiales' para tus usuarios IAM?", options: ["AWS Organizations", "Una Política de Contraseñas de IAM (IAM Password Policy)", "AWS Config", "Amazon GuardDuty"], correctAnswer: 1, explanation: "Dentro de la configuración de IAM, puedes establecer una 'Política de Contraseñas' (Password Policy) para toda la cuenta, que obliga a los usuarios a cumplir con ciertos requisitos de complejidad. [cite: 270, 271, 2302]" }
        ]
    },
    // =================== EXAMEN 2.4 ===================
    "exam_2_4": {
        title: "Examen: Grupos de Seguridad vs. NACLs",
        questions: [
            { text: "¿Cuál de las siguientes opciones describe correctamente a un Grupo de Seguridad (Security Group)?", options: ["Actúa a nivel de Subred; es Stateless.", "Actúa a nivel de Instancia; es Stateful.", "Actúa a nivel de Instancia; es Stateless.", "Actúa a nivel de Subred; es Stateful."], correctAnswer: 1, explanation: "Grupo de Seguridad = Nivel de Instancia (el guardia en la puerta de tu apartamento). [cite_start]Es Stateful (recuerda la conexión). [cite: 1506, 2270]" },
            { text: "¿Cuál de las siguientes opciones describe correctamente a una NACL (Network ACL)?", options: ["Actúa a nivel de Subred; es Stateless.", "Actúa a nivel de Instancia; es Stateful.", "Actúa a nivel de Instancia; es Stateless.", "Actúa a nivel de Subred; es Stateful."], correctAnswer: 0, explanation: "NACL = Nivel de Subred (el guardia en la entrada del piso). [cite_start]Es Stateless (no recuerda la conexión). [cite: 1507, 1210, 1905]" },
            { text: "Un Grupo de Seguridad (Stateful) permite la entrada por el puerto 80 (HTTP). ¿Qué regla de salida necesitas para que el servidor web responda al cliente?", options: ["Permitir la salida por el puerto 80.", "Permitir la salida por todos los puertos (0.0.0.0/0).", "Ninguna. El tráfico de respuesta se permite automáticamente.", "Permitir la salida por los puertos 1024-65535."], correctAnswer: 2, explanation: "La naturaleza 'Stateful' (con estado) de los Grupos de Seguridad significa que 'recuerdan' quién inició la conexión. El tráfico de respuesta a una conexión entrante permitida se permite salir automáticamente, sin reglas." },
            { text: "Una NACL (Stateless) permite la entrada por el puerto 80 (HTTP). ¿Qué regla de salida necesitas para que el servidor web responda al cliente?", options: ["Permitir la salida por el puerto 80.", "Permitir la salida por los puertos efímeros (ej: 1024-65535).", "Ninguna. El tráfico de respuesta se permite automáticamente.", "Permitir la salida por el puerto 443."], correctAnswer: 1, explanation: "La naturaleza 'Stateless' (sin estado) significa que la NACL no recuerda la conexión. [cite_start]Debes permitir explícitamente el tráfico de respuesta, que sale por un puerto efímero (aleatorio, de rango alto). [cite: 1208, 1210]" },
            { text: "¿Cuál de estos 'firewalls' te permite crear reglas de 'Denegar' (Deny)?", options: ["Grupo de Seguridad", "NACL (Network ACL)", "Ambos", "Ninguno"], correctAnswer: 1, explanation: "Los Grupos de Seguridad solo soportan reglas de 'Permitir' (todo lo demás es denegado implícitamente). [cite_start]Las NACLs soportan reglas explícitas de 'Permitir' y 'Denegar'. [cite: 1207, 2272]" },
            { text: "Quieres bloquear una dirección IP maliciosa específica (ej: 50.1.1.1) para que no acceda a NINGUNA de tus instancias en una subred. ¿Cuál es la herramienta más efectiva?", options: ["Añadir una regla 'Deny' en el Grupo de Seguridad de cada instancia.", "Añadir una regla 'Deny' en la NACL de la subred.", "Usar AWS WAF.", "Usar AWS Shield."], correctAnswer: 1, explanation: "Las NACLs son perfectas para esto. [cite_start]Operan a nivel de subred y pueden denegar explícitamente una IP, bloqueándola antes de que llegue a los Grupos de Seguridad de las instancias. [cite: 2272, 2273]" },
            { text: "Por defecto, el Grupo de Seguridad que se crea con una VPC...", options: ["Permite todo el tráfico entrante y saliente.", "Deniega todo el tráfico entrante y permite todo el tráfico saliente.", "Permite todo el tráfico entrante y deniega todo el tráfico saliente.", "Deniega todo el tráfico entrante y saliente."], correctAnswer: 1, explanation: "Por defecto, un Grupo de Seguridad es seguro. Bloquea toda entrada, pero permite toda salida (para que tus instancias puedan descargar actualizaciones)." },
            { text: "Por defecto, la NACL que se crea con una VPC...", options: ["Permite todo el tráfico entrante y saliente.", "Deniega todo el tráfico entrante y permite todo el tráfico saliente.", "Permite todo el tráfico entrante y deniega todo el tráfico saliente.", "Deniega todo el tráfico entrante y saliente."], correctAnswer: 0, explanation: "Por defecto, la NACL es 'abierta' (Permite todo en ambas direcciones) para no bloquear el tráfico. Se espera que tú uses los Grupos de Seguridad como el control principal." }
        ]
    },
    // =================== EXAMEN 2.5 ===================
    "exam_2_5": {
        title: "Examen: Protección de Red: AWS WAF y Shield",
        questions: [
           { text: "¿Qué servicio de AWS está diseñado específicamente para proteger aplicaciones contra ataques de Inyección SQL (SQLi) y Cross-Site Scripting (XSS)?", options: ["AWS Shield", "Amazon GuardDuty", "AWS WAF (Web Application Firewall)", "NACL"], correctAnswer: 2, explanation: "AWS WAF es el firewall de Capa 7 (Aplicación) diseñado para filtrar tráfico web malicioso como Inyección SQL y XSS. [cite: 276, 1141, 1422, 1996]" },
            { text: "¿Qué servicio de AWS proporciona protección contra ataques DDoS (Denegación de Servicio Distribuido)?", options: ["AWS WAF", "AWS Shield", "Amazon Inspector", "AWS Config"], correctAnswer: 1, explanation: "AWS Shield es el servicio gestionado de protección contra DDoS. Shield Standard es gratuito y automático para todos. Shield Advanced es de pago y más potente." },
            { text: "¿Cuál es la principal diferencia entre AWS Shield Standard y Shield Advanced?", options: ["Standard es para EC2 y Advanced es para S3.", "Standard es gratuito y protege contra ataques comunes; Advanced es de pago y ofrece protección avanzada y soporte 24/7.", "Standard es un firewall y Advanced es un servicio de DNS.", "Standard es para Inyección SQL y Advanced es para DDoS."], correctAnswer: 1, explanation: "Shield Standard es gratuito y automático, protegiendo contra los ataques DDoS más comunes. Shield Advanced cuesta dinero pero ofrece protección contra ataques más grandes, soporte del equipo de respuesta de AWS y protección contra costos." },
            { text: "AWS WAF opera en la Capa 7 (Aplicación) del modelo OSI. ¿Qué tipo de reglas puedes crear?", options: ["Reglas que bloquean puertos TCP específicos.", "Reglas que bloquean tráfico basado en el contenido de los encabezados HTTP o strings en la URI.", "Reglas que deniegan tráfico de subredes enteras.", "Reglas que cifran el tráfico."], correctAnswer: 1, explanation: "Al ser de Capa 7, WAF puede inspeccionar el contenido de la solicitud web. [cite_start]Puedes bloquear tráfico si la URI contiene '/wp-admin' o si el encabezado 'User-Agent' es de un bot malicioso. [cite: 277]" },
            { text: "Un atacante está intentando tumbar tu aplicación web enviando millones de solicitudes falsas desde una red de bots (botnet). ¿Qué servicio te protege de esto?", options: ["AWS WAF", "Amazon GuardDuty", "AWS Shield", "AWS Secrets Manager"], correctAnswer: 2, explanation: "Este es un ataque clásico de DDoS (Denegación de Servicio Distribuido). AWS Shield es el servicio diseñado para absorber y mitigar este tipo de ataques." },
            { text: "Un atacante intenta robar datos de tu base de datos escribiendo <code>' OR 1=1; --</code> en el formulario de inicio de sesión de tu sitio web. ¿Qué servicio puede bloquear este intento?", options: ["AWS Shield", "NACL", "Grupo de Seguridad", "AWS WAF"], correctAnswer: 3, explanation: "Este es un ataque de Inyección SQL (SQLi). [cite_start]AWS WAF puede inspeccionar el cuerpo de la solicitud, detectar este patrón malicioso y bloquearlo antes de que llegue a tu aplicación. [cite: 1141, 1422]" },
            { text: "¿En qué servicios de AWS puedes desplegar AWS WAF?", options: ["Solo en instancias EC2.", "En Amazon CloudFront, Application Load Balancer (ALB) y API Gateway.", "Solo en buckets S3.", "En cualquier servicio de AWS."], correctAnswer: 1, explanation: "WAF actúa como un filtro en el 'borde' de tu aplicación. Se despliega en los puntos de entrada como CloudFront, ALB o API Gateway." }
        ]
    },
    // =================== EXAMEN 2.6 ===================
    "exam_2_6": {
        title: "Examen: Cifrado: KMS, CloudHSM y Secrets Manager",
        questions: [
            { text: "¿Cuál es el servicio de AWS más común y recomendado para que los clientes gestionen sus propias claves de cifrado (CMKs) para servicios como S3 y EBS?", options: ["AWS Secrets Manager", "AWS CloudHSM", "AWS IAM", "AWS KMS (Key Management Service)"], correctAnswer: 3, explanation: "AWS KMS es el servicio gestionado y multi-tenant (compartido) estándar para crear y controlar claves de cifrado. [cite_start]Se integra con la mayoría de los servicios de AWS. [cite: 807, 808, 366, 367]" },
            { text: "Una compañía de finanzas tiene un requisito regulatorio estricto que exige que sus claves de cifrado se almacenen en un dispositivo de hardware dedicado (un solo inquilino). ¿Qué servicio cumple este requisito?", options: ["AWS KMS", "AWS Shield", "AWS CloudHSM", "AWS Secrets Manager"], correctAnswer: 2, explanation: "CloudHSM proporciona un Módulo de Seguridad de Hardware (HSM) físico y dedicado. [cite_start]Es para cumplimiento estricto que prohíbe el hardware compartido (multi-tenant) que usa KMS. [cite: 106, 107, 732, 733]" },
            { text: "¿Qué servicio está diseñado para almacenar y rotar automáticamente contraseñas de bases de datos?", options: ["AWS Secrets Manager", "AWS KMS", "AWS Config", "AWS IAM"], correctAnswer: 0, explanation: "AWS Secrets Manager es el servicio específico para gestionar 'secretos' (como contraseñas de BD). [cite_start]Su característica estrella es la capacidad de rotar automáticamente esas contraseñas. [cite: 747, 748]" },
            { text: "Un desarrollador ha escrito la contraseña de la base de datos de producción directamente en el código de la aplicación. ¿Qué servicio de AWS ayuda a evitar esta mala práctica?", options: ["AWS CloudTrail", "AWS CloudHSM", "AWS Secrets Manager", "Amazon GuardDuty"], correctAnswer: 2, explanation: "Esta es una mala práctica peligrosa. [cite_start]La solución es almacenar la contraseña en AWS Secrets Manager, y hacer que la aplicación consulte la API de Secrets Manager para obtener la contraseña en tiempo de ejecución. [cite: 747]" },
            { text: "¿Cuál es la principal diferencia entre AWS KMS y AWS CloudHSM?", options: ["KMS es para cifrado, CloudHSM es para contraseñas.", "KMS usa hardware compartido (multi-tenant), CloudHSM usa hardware dedicado (single-tenant).", "KMS es Gratuito, CloudHSM es de pago.", "KMS es Global, CloudHSM es Regional."], correctAnswer: 1, explanation: "Ambos gestionan claves, pero la diferencia clave es la tenencia del hardware. KMS es un servicio gestionado en hardware compartido (más barato y fácil). [cite_start]CloudHSM es un dispositivo físico dedicado para ti (más caro y complejo, para cumplimiento estricto). [cite: 106, 732, 807]" },
           { text: "Cuando habilitas el cifrado en un volumen de Amazon EBS, ¿qué servicio se utiliza por debajo para gestionar la clave de cifrado?", options: ["AWS CloudTrail", "AWS Config", "AWS KMS", "AWS Shield"], correctAnswer: 2, explanation: "La mayoría de los servicios de AWS que ofrecen cifrado nativo (como EBS, S3, RDS) se integran directamente con AWS KMS para gestionar las claves maestras. [cite: 366, 367]" }
        ]
    },
    // =================== EXAMEN 2.7 ===================
    "exam_2_7": {
        title: "Examen: Detección y Monitoreo",
        questions: [
            { text: "Necesitas un registro de auditoría de todas las llamadas a la API en tu cuenta (Ej: 'Quién eliminó una instancia EC2 y cuándo'). ¿Qué servicio proporciona esto?", options: ["Amazon GuardDuty", "AWS Config", "Amazon CloudWatch", "AWS CloudTrail"], correctAnswer: 3, explanation: "AWS CloudTrail es la 'bitácora' de la cuenta. Registra todas las llamadas a la API (eventos) y responde 'quién, qué, cuándo'. [cite_start]Es tu herramienta de auditoría principal. [cite: 1578, 1579, 2202, 2203]" },
            { text: "Quieres un servicio que use Machine Learning para analizar tus registros (CloudTrail, VPC Flow Logs) y te alerte sobre amenazas de seguridad (Ej: 'Instancia EC2 minando criptomonedas'). ¿Qué servicio es este?", options: ["Amazon GuardDuty", "AWS Config", "AWS Trusted Advisor", "AWS CloudTrail"], correctAnswer: 0, explanation: "Amazon GuardDuty es el 'guardia de seguridad inteligente'. [cite_start]No solo registra, sino que analiza los registros en busca de actividad maliciosa o anómala y genera alertas (hallazgos). [cite: 575, 576, 1997]" },
            { text: "Necesitas asegurarte de que ningún bucket S3 en tu cuenta se configure como público. Quieres un servicio que evalúe continuamente tus configuraciones y te alerte si se viola esta regla. ¿Qué servicio usarías?", options: ["Amazon GuardDuty", "AWS Config", "AWS CloudTrail", "AWS WAF"], correctAnswer: 1, explanation: "AWS Config es el 'inspector de cumplimiento'. [cite_start]Su trabajo es evaluar la configuración de tus recursos (¿está este S3 público? ¿está este SG abierto?) contra un conjunto de reglas deseadas. [cite: 1500, 1501, 1502]" },
            { text: "(Cascarita) Quieres monitorear el uso de CPU de una instancia EC2. ¿Qué servicio usarías?", options: ["AWS CloudTrail", "AWS Config", "Amazon CloudWatch", "Amazon GuardDuty"], correctAnswer: 2, explanation: "¡Cascarita clave! CloudWatch monitorea métricas de *rendimiento* (CPU, Red, Disco). CloudTrail monitorea *llamadas a la API* (quién hizo qué). [cite_start]Para ver la CPU, usas CloudWatch. [cite: 1474]" },
            { text: "¿Qué servicio usarías para responder a la pregunta: '¿Ha cambiado la configuración de mi Grupo de Seguridad en los últimos 30 días?'?", options: ["AWS CloudTrail", "AWS Config", "Amazon GuardDuty", "Amazon Inspector"], correctAnswer: 1, explanation: "AWS Config es el servicio diseñado para rastrear cambios en la *configuración* de los recursos a lo largo del tiempo. [cite_start]Te da un historial de cómo ha cambiado un recurso. [cite: 1501]" },
            { text: "¿Qué servicio usarías para responder a la pregunta: '¿Quién intentó iniciar sesión como Root ayer?'?", options: ["AWS CloudTrail", "AWS Config", "Amazon CloudWatch", "Amazon Inspector"], correctAnswer: 0, explanation: "Esta es una pregunta de auditoría de 'quién hizo qué'. [cite_start]La respuesta siempre es CloudTrail. [cite: 1579, 2203]" },
            { text: "Amazon GuardDuty obtiene sus datos de tres fuentes principales. [cite_start]¿Cuáles son?", options: ["Registros de AWS CloudTrail, Registros de Flujo de VPC (VPC Flow Logs) y Registros de DNS.", "Registros de Amazon S3, métricas de CloudWatch y AWS Config.", "AWS Trusted Advisor, AWS Artifact y AWS WAF.", "Solo registros de CloudTrail."], correctAnswer: 0, explanation: "GuardDuty combina estas tres fuentes de registros (eventos de API, tráfico de red y consultas de DNS) para obtener una visión completa de la actividad en tu cuenta y detectar amenazas. [cite: 576]" }
        ]
    },
    // =================== EXAMEN 2.8 ===================
    "exam_2_8": {
        title: "Examen: Cumplimiento y Asesoría",
        questions: [
            { text: "Un cliente necesita proporcionar a sus auditores una copia del informe de certificación ISO 27001 de AWS. [cite_start]¿Dónde puede encontrar este documento?", options: ["En la documentación pública de AWS.", "En AWS Trusted Advisor.", "En AWS Artifact.", "Debe solicitarlo a través de un caso de soporte."], correctAnswer: 2, explanation: "AWS Artifact es el portal de autoservicio donde puedes descargar los informes de cumplimiento y certificaciones de AWS (como ISO, SOC 2, PCI) para tus auditores. [cite: 2072, 2073, 2337, 2338]" },
           { text: "¿Qué servicio de AWS escanea tu entorno y te da recomendaciones sobre Optimización de Costos, Seguridad, Rendimiento y Tolerancia a Fallos?", options: ["Amazon GuardDuty", "AWS Config", "AWS Trusted Advisor", "AWS Artifact"], correctAnswer: 2, explanation: "AWS Trusted Advisor actúa como un asesor experto automatizado que revisa tu cuenta en busca de desviaciones de las mejores prácticas en esas categorías. [cite: 250, 2360, 2335, 2336]" },
            { text: "Un cliente con el plan de soporte Básico (Basic) quiere ver las recomendaciones de optimización de costos de Trusted Advisor. ¿Por qué no puede verlas?", options: ["Porque la Optimización de Costos solo está disponible en la Región us-east-1.", "Porque debe habilitar AWS Config primero.", "Porque los chequeos de Optimización de Costos solo están disponibles para los planes Business y Enterprise.", "Porque Trusted Advisor está obsoleto y fue reemplazado por GuardDuty."], correctAnswer: 2, explanation: "Los planes Basic y Developer solo tienen acceso a un conjunto limitado de chequeos (Seguridad y Límites de Servicio). [cite_start]Los chequeos completos, incluyendo Optimización de Costos y Rendimiento, requieren un plan Business o Enterprise. [cite: 887, 1007, 1903, 2206]" },
            { text: "Trusted Advisor te alerta: 'Tienes un bucket S3 con permisos públicos'. ¿Bajo qué pilar o categoría caería esta recomendación?", options: ["Optimización de Costos", "Rendimiento", "Seguridad", "Límites de Servicio"], correctAnswer: 2, explanation: "Un bucket S3 público es un riesgo de seguridad de alta prioridad. [cite_start]Trusted Advisor lo clasifica bajo la categoría de Seguridad. [cite: 251]" },
            { text: "Trusted Advisor te alerta: 'Estás usando el 85% de tu límite de instancias EC2 en us-east-1'. ¿Bajo qué categoría caería esta recomendación?", options: ["Optimización de Costos", "Rendimiento", "Tolerancia a Fallos", "Límites de Servicio"], correctAnswer: 3, explanation: "Esta es una advertencia sobre los Límites de Servicio (Service Limits). [cite_start]Si alcanzas el 100%, no podrás lanzar más instancias, lo que podría afectar tu capacidad de escalar (Rendimiento) o recuperarte de fallos (Tolerancia a Fallos). [cite: 2129, 2130]" },
            { text: "Trusted Advisor te alerta: 'Tienes instancias EC2 con bajo uso (menos del 10% de CPU)'. ¿Bajo qué categoría caería esta recomendación?", options: ["Optimización de Costos", "Seguridad", "Límites de Servicio", "Tolerancia a Fallos"], correctAnswer: 0, explanation: "Esta es una recomendación clásica de Optimización de Costos. Estás pagando por una instancia que no estás usando (desperdicio), por lo que deberías reducir su tamaño ('right-sizing')." }
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
	// (Asegúrate de que el contenedor principal exista antes de añadir el listener)
	if (mainContentEl) {
		mainContentEl.addEventListener('click', (e) => {
			if (e.target.id === 'btn-hacer-examen') {
				loadQuiz(currentExamKey);
			}
			
			if (e.target.id === 'btn-repasar-tematica') {
				// Re-calculamos la clave de contenido por si acaso
				const contentKey = contentDB[`lesson_${currentLessonId}`] ? `lesson_${currentLessonId}` : null;
				if(contentKey) {
					loadStudyContent(contentKey);
				}
			}

			const label = e.target.closest('.options label');
			if (label) {
				const input = label.querySelector('input[type="radio"]');
				const optionsDiv = label.closest('.options');
				
				if (input && optionsDiv && !optionsDiv.classList.contains('disabled')) {
					input.checked = true;
					handleQuizAnswer(input);
				}
			}
		});
	}
}


/**
 * Carga el contenido de ESTUDIO en el panel principal.
 */
function loadStudyContent(contentKey) {
	if (!studyContentEl || !quizContainerEl || !mainContentEl) return;

    const lessonData = contentDB[contentKey];
    
    if (lessonData) {
        studyContentEl.innerHTML = lessonData;
        // Añadimos el botón, pero lo ocultamos por CSS/JS hasta el scroll
        studyContentEl.innerHTML += `<button id="btn-hacer-examen" class="action-button" style="display: none;">Hacer Examen</button>`;
    } else {
        studyContentEl.innerHTML = `<p>Error: Contenido de la lección no encontrado.</p>`;
    }

    studyContentEl.style.display = 'block';
    quizContainerEl.style.display = 'none';
    quizContainerEl.innerHTML = '';
    mainContentEl.scrollTop = 0; // Reiniciar el scroll al cargar la lección
}

/**
 * Carga el EXAMEN en el panel principal.
 */
function loadQuiz(examKey) {
	if (!quizContainerEl || !studyContentEl || !mainContentEl) return;

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
    
    // Asegurarse de que los datos del examen están cargados
    if (!examDB[currentExamKey] || !examDB[currentExamKey].questions[questionIndex]) {
        console.error("Error: No se pudieron encontrar los datos de la pregunta.");
        return;
    }

    const userAnswer = parseInt(input.value);
    const qData = examDB[currentExamKey].questions[questionIndex];
    const isCorrect = userAnswer === qData.correctAnswer;

    // Deshabilitar opciones y mostrar retroalimentación
    optionsDiv.classList.add('disabled');
    selectedLabel.classList.add('selected', isCorrect ? 'correct' : 'incorrect');
    
    feedbackEl.innerHTML = isCorrect 
        ? `<p><strong>¡Correcto!</strong> ${qData.explanation}</p>` 
        : `<p><strong>Incorrecto.</strong> La respuesta correcta era: <strong>${qData.options[qData.correctAnswer]}</strong></p><p><strong>Explicación:</strong> ${qData.explanation}</p>`;
    
    feedbackEl.className = `feedback ${isCorrect ? 'correct' : 'incorrect'}`;

    // Avanzar a la siguiente pregunta o finalizar
    const nextQuestionEl = document.getElementById(`q-${questionIndex + 1}`);
    setTimeout(() => {
        if (nextQuestionEl) {
            nextQuestionEl.classList.add('active');
            // (Opcional) Desplazarse a la nueva pregunta
            // nextQuestionEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
        } else {
            // No hay más preguntas, calificar el examen
            gradeFullQuiz();
        }
    }, 2000); // 2 segundos para leer la explicación
}


/**
 * Califica el examen completo después de la última pregunta.
 */
function gradeFullQuiz() {
    const examData = examDB[currentExamKey];
    let score = 0;
    
    examData.questions.forEach((q, i) => {
        const selectedInput = document.querySelector(`input[name="q-${i}"]:checked`);
        if (selectedInput && parseInt(selectedInput.value) === q.correctAnswer) {
            score++;
        }
    });
    
    const resultsEl = document.getElementById('quiz-results');
    resultsEl.style.display = 'block';
    
    // REGLA: Debe ser 100% para aprobar
    const isPassed = score === examData.questions.length; 
    
    if (isPassed) {
        resultsEl.innerHTML = `<h3>¡Aprobado!</h3><p>Tu puntaje: ${score} de ${examData.questions.length} (${(score/examData.questions.length)*100}%)</p><p>¡Excelente! Has dominado este tema. La siguiente lección ha sido desbloqueada.</p>`;
        resultsEl.className = 'success';
        
        // Guardar progreso de la lección
        saveProgress(`lesson_${currentLessonId}_complete`);
        
        // Actualizar la UI de la barra lateral
        updateLessonListUI();
        
        // Verificar si el módulo completo está terminado
        checkModuleCompletion(currentModuleId);
        
    } else {
        resultsEl.innerHTML = `<h3>Sigue intentando...</h3><p>Tu puntaje: ${score} de ${examData.questions.length}.</p><p>Debes obtener 100% para aprobar. Repasa la temática y vuelve a intentarlo.</p>`;
        resultsEl.className = 'failure';
        // Añadir botón de repasar
        resultsEl.innerHTML += `<button id="btn-repasar-tematica" class="action-button">Repasar Temática</button>`;
    }
    
    resultsEl.scrollIntoView({ behavior: 'smooth' });
}


/**
 * Recarga la lista de lecciones en la barra lateral
 */
function updateLessonListUI() {
    const module = moduleData[currentModuleId];
    if (module) {
        populateLessonList(module.lessons);
        // Resaltar la lección activa actual
        const currentLessonItem = document.querySelector(`.lesson-item[data-lesson-id="${currentLessonId}"]`);
        if (currentLessonItem) {
            currentLessonItem.classList.add('active');
        }
    }
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
* Si es así, guarda la clave de finalización del módulo.
*/
function checkModuleCompletion(moduleId) {
    const module = moduleData[moduleId];
    if (!module) return;

    // Comprueba si *alguna* lección NO está completa
    const isModuleComplete = !module.lessons.some(lesson => !progress[`lesson_${lesson.id}_complete`]);

    if (isModuleComplete) {
        console.log(`¡Módulo ${moduleId} completado!`);
        
        // Esta es la clave que desbloquea el siguiente módulo en app.js
        saveProgress(`module_${moduleId}_exam`); 
        
        // Mostrar mensaje de felicitaciones en la barra lateral (si no existe ya)
        if (lessonListEl && !lessonListEl.querySelector('.congrats-message')) {
            const congrats = document.createElement('div');
            congrats.innerHTML = `<div style="padding: 1rem; text-align: center; background-color: #e6ffed; border: 1px solid var(--success-green); border-radius: 8px; margin-top: 1rem;"><h4 style="color: var(--success-green); margin: 0;">¡Módulo Completo!</h4></div>`;
            congrats.className = 'congrats-message';
            lessonListEl.appendChild(congrats);
        }
    }
}