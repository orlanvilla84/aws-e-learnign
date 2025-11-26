export const courseData = [
  {
    id: 1,
    title: "Módulo 1: Seguridad e Identidad (IAM)",
    description: "Gestión de accesos, WAF, Shield y Herramientas de Auditoría.",
    topics: [
      {
        id: "1-1",
        title: "IAM: Usuarios, Roles y Políticas",
        content: `
          <h3 class="text-2xl font-bold mb-4 text-aws-dark">Identity and Access Management (IAM)</h3>
          <p class="mb-4">IAM es el servicio global para gestionar el acceso a los recursos de AWS. Es gratuito.</p>
          
          <div class="bg-white p-6 rounded-lg shadow-sm border-l-4 border-aws-orange mb-6">
            <h4 class="font-bold text-lg mb-2 text-aws-dark">Conceptos Clave (Fuente: PDF)</h4>
            <ul class="list-disc ml-5 space-y-2 text-gray-700">
              <li><strong>Usuario IAM:</strong> Entidad con credenciales permanentes (Usuario/Contraseña o Claves de Acceso).</li>
              <li><strong>Roles:</strong> Proporcionan <strong>credenciales temporales</strong> de seguridad. Son ideales para:
                <ul class="list-circle ml-6 mt-1">
                  <li>Servicios de AWS (ej. una instancia EC2 que necesita acceder a S3).</li>
                  <li>Accesos entre cuentas.</li>
                  <li>Federación de identidades.</li>
                </ul>
              </li>
              <li><strong>Políticas (Policies):</strong> Documentos JSON que definen permisos ("Allow" o "Deny").</li>
              <li><strong>MFA (Autenticación Multifactor):</strong> Capa crítica de seguridad. Debe activarse siempre para la cuenta raíz (Root).</li>
            </ul>
          </div>

          <h4 class="font-bold text-aws-blue mb-2">Herramientas de Auditoría</h4>
          <ul class="list-disc ml-5 mb-4">
            <li><strong>Informe de Credenciales (Credential Report):</strong> Lista el estado de las contraseñas, MFA y claves de acceso de todos los usuarios.</li>
            <li><strong>IAM Access Analyzer:</strong> Identifica recursos compartidos con entidades externas.</li>
          </ul>
        `,
        lab: {
          title: "Laboratorio: Rol para EC2",
          steps: [
            "Ve a IAM > Roles > Crear Rol.",
            "Selecciona 'AWS Service' y luego 'EC2'.",
            "Asigna la política 'AmazonS3ReadOnlyAccess'.",
            "Lanza una instancia EC2 y asígnale este rol.",
            "Intenta listar buckets desde la EC2 (funcionará sin configurar claves)."
          ]
        },
        quiz: [
          {
            question: "Una aplicación en una instancia EC2 necesita acceder a un bucket S3. ¿Cuál es la forma más segura de dar acceso?",
            options: [
              "Guardar las Access Keys en el código de la aplicación.",
              "Crear un usuario IAM y guardar las credenciales en un archivo de configuración.",
              "Crear un Rol de IAM con permisos S3 y asignarlo a la instancia EC2.",
              "Hacer público el bucket de S3."
            ],
            correct: 2,
            explanation: "Los Roles proporcionan credenciales temporales. Nunca debes guardar credenciales de larga duración (Access Keys) en instancias EC2.",
            source: "PDF: Rol de IAM"
          },
          {
            question: "¿Qué herramienta utilizarías para verificar si todos tus usuarios tienen MFA activado y cuándo rotaron sus contraseñas por última vez?",
            options: [
              "AWS CloudTrail",
              "Informe de Credenciales de IAM (Credential Report)",
              "AWS Artifact",
              "Amazon Inspector"
            ],
            correct: 1,
            explanation: "El Informe de Credenciales lista el estado de contraseñas, claves de acceso y MFA de todos los usuarios.",
            source: "PDF: Informe de Credenciales"
          }
        ]
      },
      {
        id: "1-2",
        title: "Seguridad de Infraestructura (WAF & Shield)",
        content: `
          <h3 class="text-2xl font-bold mb-4 text-aws-dark">Protección en el Borde</h3>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div class="bg-blue-50 p-5 rounded-lg border border-blue-100">
              <h4 class="font-bold text-aws-blue text-xl mb-2">AWS WAF</h4>
              <p class="text-sm">Firewall de Aplicaciones Web. Protege contra ataques comunes en la capa de aplicación (Capa 7).</p>
              <ul class="list-disc ml-5 mt-2 text-sm">
                <li>Inyección SQL.</li>
                <li>Cross-Site Scripting (XSS).</li>
                <li>Bloqueo por IP o país.</li>
              </ul>
            </div>
            <div class="bg-orange-50 p-5 rounded-lg border border-orange-100">
              <h4 class="font-bold text-aws-orange text-xl mb-2">AWS Shield</h4>
              <p class="text-sm">Protección contra ataques DDoS (Denegación de Servicio).</p>
              <ul class="list-disc ml-5 mt-2 text-sm">
                <li><strong>Standard:</strong> Gratis, activado por defecto.</li>
                <li><strong>Advanced:</strong> De pago. Protección especializada y reembolso de costos por ataques.</li>
              </ul>
            </div>
          </div>
        `,
        quiz: [
          {
            question: "Deseas bloquear el tráfico proveniente de direcciones IP de un país específico hacia tu aplicación web. ¿Qué servicio usas?",
            options: [
              "Security Groups",
              "Network ACLs",
              "AWS WAF",
              "AWS Shield"
            ],
            correct: 2,
            explanation: "AWS WAF permite crear reglas para filtrar tráfico web basándose en criterios como direcciones IP de origen, países o encabezados.",
            source: "PDF: AWS WAF"
          }
        ]
      },
      {
        id: "1-3",
        title: "Detección de Amenazas (GuardDuty, Inspector, Macie)",
        content: `
          <h3 class="text-xl font-bold mb-4">Servicios de Detección Inteligente</h3>
          <table class="w-full text-left border-collapse mb-6 text-sm">
            <thead>
              <tr class="bg-gray-200">
                <th class="p-2 border">Servicio</th>
                <th class="p-2 border">Función Principal</th>
              </tr>
            </thead>
            <tbody>
              <tr class="border-b">
                <td class="p-2 font-bold text-aws-blue">Amazon GuardDuty</td>
                <td class="p-2">Detecta amenazas analizando logs (CloudTrail, VPC Flow Logs, DNS). Identifica minería de criptomonedas o accesos inusuales.</td>
              </tr>
              <tr class="border-b">
                <td class="p-2 font-bold text-aws-blue">Amazon Inspector</td>
                <td class="p-2">Evalúa <strong>Instancias EC2</strong> en busca de vulnerabilidades de software (CVEs) y exposición de red.</td>
              </tr>
              <tr class="border-b">
                <td class="p-2 font-bold text-aws-blue">Amazon Macie</td>
                <td class="p-2">Descubre y protege datos sensibles (PII) en <strong>S3</strong> usando Machine Learning.</td>
              </tr>
            </tbody>
          </table>
        `,
        quiz: [
          {
            question: "¿Qué servicio utilizarías para buscar vulnerabilidades de software y parches faltantes en tus instancias EC2 automáticamente?",
            options: [
              "AWS Trusted Advisor",
              "Amazon GuardDuty",
              "Amazon Inspector",
              "AWS Config"
            ],
            correct: 2,
            explanation: "Amazon Inspector es un servicio automatizado de evaluación de seguridad para identificar vulnerabilidades en instancias EC2.",
            source: "PDF: Amazon Inspector"
          },
          {
            question: "¿Qué servicio analiza CloudTrail y VPC Flow Logs para detectar una instancia EC2 comprometida que mina criptomonedas?",
            options: [
              "Amazon Macie",
              "Amazon GuardDuty",
              "AWS Shield",
              "AWS WAF"
            ],
            correct: 1,
            explanation: "GuardDuty monitorea actividad maliciosa analizando logs de infraestructura.",
            source: "PDF: Amazon GuardDuty"
          }
        ]
      }
    ]
  },
  {
    id: 2,
    title: "Módulo 2: Cómputo (EC2 & Serverless)",
    description: "Instancias, Precios, Escalabilidad y Lambda.",
    topics: [
      {
        id: "2-1",
        title: "Modelos de Precios EC2",
        content: `
          <h3 class="text-2xl font-bold mb-4 text-aws-dark">Opciones de Compra EC2</h3>
          <div class="space-y-4 mb-6">
            <div class="border-l-4 border-aws-orange bg-white p-4 shadow">
              <h4 class="font-bold">1. On-Demand (Bajo Demanda)</h4>
              <p class="text-sm">Sin compromiso. Pagas por segundo. Ideal para cargas cortas o impredecibles.</p>
            </div>
            <div class="border-l-4 border-green-500 bg-white p-4 shadow">
              <h4 class="font-bold">2. Reserved Instances (Reservadas)</h4>
              <p class="text-sm">Compromiso de 1 o 3 años. Descuento hasta 72%. Ideal para bases de datos o servidores siempre encendidos. <br><strong>Convertible RI:</strong> Permite cambiar atributos de la instancia.</p>
            </div>
            <div class="border-l-4 border-blue-500 bg-white p-4 shadow">
              <h4 class="font-bold">3. Spot Instances</h4>
              <p class="text-sm">Capacidad sobrante. Descuento hasta 90%. <strong>Riesgo:</strong> AWS puede terminarla con 2 minutos de aviso. Ideal para procesos batch o tolerantes a fallos.</p>
            </div>
            <div class="border-l-4 border-purple-500 bg-white p-4 shadow">
              <h4 class="font-bold">4. Dedicated Hosts</h4>
              <p class="text-sm">Servidor físico dedicado. Necesario para licencias BYOL (Bring Your Own License).</p>
            </div>
          </div>
        `,
        quiz: [
          {
            question: "Una empresa necesita ejecutar un proceso de Big Data que puede detenerse y reanudarse sin problemas. Quieren minimizar costos. ¿Qué opción eligen?",
            options: [
              "Instancias Reservadas",
              "Instancias On-Demand",
              "Instancias Spot",
              "Dedicated Hosts"
            ],
            correct: 2,
            explanation: "Las instancias Spot ofrecen los mayores descuentos (hasta 90%) para cargas de trabajo flexibles.",
            source: "PDF: Instancia Spot"
          },
          {
            question: "Necesitas una base de datos en producción encendida 24/7 por 3 años. ¿Qué es más rentable?",
            options: [
              "Instancia Spot",
              "Instancia Reservada Standard con pago total adelantado",
              "Instancia On-Demand",
              "Instancia Reservada Convertible"
            ],
            correct: 1,
            explanation: "Las instancias reservadas estándar con pago total por adelantado ofrecen el mayor descuento posible (72%) para uso continuo.",
            source: "PDF: Instancia reservada"
          }
        ]
      },
      {
        id: "2-2",
        title: "Escalabilidad y Balanceo",
        content: `
          <h3 class="text-2xl font-bold mb-4 text-aws-dark">Elasticidad</h3>
          <ul class="list-disc ml-6 mb-6 space-y-2">
            <li><strong>Auto Scaling Group (ASG):</strong> Escala horizontalmente (añade/quita instancias) según demanda (ej. CPU > 70%). Asegura disponibilidad.</li>
            <li><strong>Elastic Load Balancer (ELB):</strong> Distribuye tráfico entre instancias en varias Zonas de Disponibilidad (AZ).</li>
          </ul>
          <p class="bg-blue-50 p-3 rounded border border-blue-200"><strong>Nota Importante:</strong> Para alta disponibilidad, despliega siempre en al menos <strong>2 Zonas de Disponibilidad</strong>.</p>
        `,
        quiz: [
          {
            question: "Tu aplicación recibe tráfico impredecible. ¿Qué combinación asegura escalabilidad y alta disponibilidad?",
            options: [
              "AWS Direct Connect y VPN",
              "Auto Scaling Group y Elastic Load Balancer (Multi-AZ)",
              "CloudFront y S3",
              "Solo instancias grandes"
            ],
            correct: 1,
            explanation: "Auto Scaling ajusta la capacidad y ELB distribuye el tráfico entre zonas para mantener la disponibilidad.",
            source: "PDF: Auto Scaling"
          }
        ]
      },
      {
        id: "2-3",
        title: "Serverless (Lambda & Fargate)",
        content: `
          <h3 class="text-xl font-bold mb-4">Computación Sin Servidor</h3>
          <ul class="list-disc ml-6 mb-4">
            <li><strong>AWS Lambda:</strong> Ejecuta código en respuesta a eventos. No administras servidores. Pagas por tiempo de ejecución (ms). Tiempo máx ejecución: 15 min.</li>
            <li><strong>AWS Fargate:</strong> Motor serverless para contenedores (ECS/EKS). No gestionas las instancias EC2 subyacentes.</li>
          </ul>
        `,
        quiz: [
          {
            question: "¿Qué servicio permite ejecutar código sin aprovisionar ni administrar servidores?",
            options: [
              "Amazon EC2",
              "AWS Lambda",
              "AWS Systems Manager",
              "Amazon RDS"
            ],
            correct: 1,
            explanation: "AWS Lambda es un servicio de cómputo serverless que ejecuta código en respuesta a eventos.",
            source: "PDF: AWS Lambda"
          }
        ]
      }
    ]
  },
  {
    id: 3,
    title: "Módulo 3: Almacenamiento (S3 & EBS)",
    description: "Clases de S3, Volúmenes EBS y Snow Family.",
    topics: [
      {
        id: "3-1",
        title: "Amazon S3 y sus Clases",
        content: `
          <h3 class="text-2xl font-bold mb-4 text-aws-dark">Clases de Almacenamiento S3</h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div class="p-3 border rounded bg-white shadow-sm">
              <strong class="text-aws-blue">S3 Standard:</strong> Acceso frecuente, baja latencia.
            </div>
            <div class="p-3 border rounded bg-white shadow-sm">
              <strong class="text-aws-blue">S3 Intelligent-Tiering:</strong> Mueve datos automáticamente entre capas según uso.
            </div>
            <div class="p-3 border rounded bg-white shadow-sm">
              <strong class="text-aws-blue">S3 Standard-IA:</strong> Acceso infrecuente. Menor costo de almacenamiento, costo por recuperación.
            </div>
            <div class="p-3 border rounded bg-white shadow-sm">
              <strong class="text-aws-blue">S3 Glacier Deep Archive:</strong> Archivo a largo plazo. El más barato. Recuperación tarda 12h.
            </div>
          </div>
          <p class="mt-4"><strong>Lifecycle Policies:</strong> Reglas para mover objetos automáticamente a clases más baratas.</p>
        `,
        quiz: [
          {
            question: "Necesitas almacenar registros de auditoría por 7 años por ley. Rara vez se accederá a ellos. ¿Qué clase es la más económica?",
            options: [
              "S3 Standard",
              "S3 Intelligent-Tiering",
              "S3 Glacier Deep Archive",
              "S3 Standard-IA"
            ],
            correct: 2,
            explanation: "S3 Glacier Deep Archive es la opción de menor costo diseñada para retención a largo plazo.",
            source: "PDF: S3 Glacier Flexible Retrieval"
          },
          {
            question: "Tienes archivos que se usan mucho el primer mes y luego casi nunca. Quieres automatizar el movimiento a una clase más barata. ¿Qué usas?",
            options: [
              "S3 Versioning",
              "S3 Lifecycle Policies",
              "S3 Transfer Acceleration",
              "S3 Replication"
            ],
            correct: 1,
            explanation: "Las políticas de ciclo de vida automatizan la transición de objetos entre clases de almacenamiento.",
            source: "PDF: Política de ciclo de vida"
          }
        ]
      },
      {
        id: "3-2",
        title: "EBS y Almacenamiento Híbrido",
        content: `
          <h3 class="text-xl font-bold mb-4">Almacenamiento en Bloque y Físico</h3>
          <ul class="list-disc ml-6 mb-4">
            <li><strong>Amazon EBS:</strong> Disco duro virtual para EC2. Persistente. Se conecta a una sola instancia a la vez (generalmente).</li>
            <li><strong>Instance Store:</strong> Disco físico efímero. Si apagas la instancia, pierdes los datos. Muy rápido.</li>
            <li><strong>AWS Storage Gateway:</strong> Conecta tu centro de datos on-premise con el almacenamiento en la nube (S3).</li>
            <li><strong>Familia Snow:</strong> Dispositivos físicos para mover datos cuando internet es lento.
              <ul class="list-circle ml-6 text-sm text-gray-600">
                <li><strong>Snowcone:</strong> Pequeño (8TB).</li>
                <li><strong>Snowball Edge:</strong> Petabytes. Procesa datos localmente.</li>
                <li><strong>Snowmobile:</strong> Camión para Exabytes (100PB).</li>
              </ul>
            </li>
          </ul>
        `,
        quiz: [
          {
            question: "Necesitas migrar 80 TB de datos desde una ubicación remota sin internet confiable. ¿Qué usas?",
            options: [
              "AWS Direct Connect",
              "AWS Snowball Edge",
              "Site-to-Site VPN",
              "S3 Transfer Acceleration"
            ],
            correct: 1,
            explanation: "La familia Snow está diseñada para transferencias masivas offline. Snowball Edge es ideal para terabytes/petabytes.",
            source: "PDF: AWS Snowball Edge"
          }
        ]
      }
    ]
  },
  {
    id: 4,
    title: "Módulo 4: Redes y Conectividad",
    description: "VPC, VPN, Direct Connect y CloudFront.",
    topics: [
      {
        id: "4-1",
        title: "VPC y Conectividad",
        content: `
          <h3 class="text-xl font-bold mb-2">Virtual Private Cloud (VPC)</h3>
          <p class="mb-4">Es tu red privada en la nube. Controlas el rango de IPs, subredes y enrutamiento.</p>
          <h4 class="font-bold">Opciones de Conectividad Híbrida:</h4>
          <ul class="list-disc ml-5 mb-4">
            <li><strong>Site-to-Site VPN:</strong> Conexión cifrada a través de internet. Rápida de implementar.</li>
            <li><strong>AWS Direct Connect:</strong> Conexión física dedicada (fibra). No usa internet público. Alta velocidad y seguridad.</li>
          </ul>
        `,
        quiz: [
          {
            question: "Una empresa financiera necesita una conexión dedicada y privada entre sus oficinas centrales y AWS que NO atraviese la internet pública. ¿Qué servicio deben usar?",
            options: [
              "Site-to-Site VPN",
              "AWS Direct Connect",
              "Internet Gateway",
              "VPC Peering"
            ],
            correct: 1,
            explanation: "Direct Connect proporciona una conexión de red dedicada y privada, evitando la internet pública.",
            source: "PDF: AWS Direct Connect"
          },
          {
            question: "¿Qué componente actúa como un firewall virtual a nivel de instancia?",
            options: [
              "Network ACL",
              "Security Group",
              "Route Table",
              "Internet Gateway"
            ],
            correct: 1,
            explanation: "Los Security Groups operan a nivel de instancia. Las NACLs operan a nivel de subred.",
            source: "PDF: Grupo de seguridad"
          }
        ]
      },
      {
        id: "4-2",
        title: "CloudFront y Route 53",
        content: `
          <h3 class="text-xl font-bold mb-2">Aceleración de Contenido</h3>
          <ul class="list-disc ml-5 mb-4">
            <li><strong>Amazon CloudFront:</strong> CDN global. Almacena caché en el borde (Edge Locations) para reducir latencia.</li>
            <li><strong>Amazon Route 53:</strong> Servicio de DNS escalable. Traduce nombres de dominio a IPs.</li>
          </ul>
        `,
        quiz: [
          {
            question: "¿Qué servicio mejora el rendimiento de un sitio web global almacenando contenido estático (imágenes, videos) en caché cerca de los usuarios?",
            options: [
              "Amazon VPC",
              "AWS Direct Connect",
              "Amazon CloudFront",
              "Amazon Route 53"
            ],
            correct: 2,
            explanation: "CloudFront utiliza una red global de ubicaciones de borde para entregar contenido con baja latencia.",
            source: "PDF: Amazon CloudFront"
          }
        ]
      }
    ]
  },
  {
    id: 5,
    title: "Módulo 5: Bases de Datos",
    description: "RDS, DynamoDB, Redshift y Migración.",
    topics: [
      {
        id: "5-1",
        title: "Tipos de Bases de Datos",
        content: `
          <h3 class="text-xl font-bold mb-2">Selección de Base de Datos</h3>
          <div class="space-y-2 mb-4">
            <p><strong>Amazon RDS:</strong> Relacional (SQL). Motores: MySQL, Postgres, SQL Server. Ideal para ERP/CRM.</p>
            <p><strong>Amazon DynamoDB:</strong> NoSQL (Clave-Valor). Serverless. Rendimiento de milisegundos. Ideal para apps móviles y juegos.</p>
            <p><strong>Amazon Redshift:</strong> Data Warehouse (OLAP). Para análisis de Big Data y reportes complejos.</p>
          </div>
        `,
        quiz: [
          {
            question: "Necesitas una base de datos para una aplicación de juegos que requiere latencia de milisegundos de un solo dígito y escalabilidad automática. ¿Qué servicio usas?",
            options: [
              "Amazon RDS",
              "Amazon Redshift",
              "Amazon DynamoDB",
              "Amazon Aurora"
            ],
            correct: 2,
            explanation: "DynamoDB es un servicio NoSQL diseñado para alto rendimiento y baja latencia a escala.",
            source: "PDF: Amazon DynamoDB"
          },
          {
            question: "¿Qué servicio utilizarías para realizar consultas analíticas complejas sobre petabytes de datos estructurados?",
            options: [
              "Amazon RDS",
              "Amazon ElastiCache",
              "Amazon Redshift",
              "Amazon DynamoDB"
            ],
            correct: 2,
            explanation: "Redshift es el servicio de Data Warehouse de AWS optimizado para análisis masivo.",
            source: "PDF: Amazon Redshift"
          }
        ]
      },
      {
        id: "5-2",
        title: "Migración (DMS)",
        content: `
          <h3 class="text-xl font-bold mb-2">AWS Database Migration Service</h3>
          <p>Permite migrar bases de datos a AWS de forma rápida y segura. La base de datos de origen permanece operativa durante la migración, minimizando el tiempo de inactividad.</p>
        `,
        quiz: [
          {
            question: "Una empresa quiere migrar su base de datos Oracle on-premise a Amazon Aurora con el mínimo tiempo de inactividad posible. ¿Qué servicio debe usar?",
            options: [
              "Schema Conversion Tool",
              "AWS Database Migration Service (DMS)",
              "AWS DataSync",
              "DynamoDB"
            ],
            correct: 1,
            explanation: "AWS DMS permite migrar bases de datos manteniendo la fuente operativa durante el proceso.",
            source: "PDF: AWS DMS"
          }
        ]
      }
    ]
  },
  {
    id: 6,
    title: "Módulo 6: Gestión y Gobernanza",
    description: "CloudWatch, CloudTrail y Planes de Soporte.",
    topics: [
      {
        id: "6-1",
        title: "Monitoreo vs Auditoría",
        content: `
          <h3 class="text-xl font-bold mb-2">Herramientas de Gestión</h3>
          <ul class="list-disc ml-5 mb-4">
            <li><strong>Amazon CloudWatch:</strong> Monitoreo de rendimiento (Métricas, CPU, Logs, Alarmas).</li>
            <li><strong>AWS CloudTrail:</strong> Auditoría de seguridad. Registra QUIÉN hizo QUÉ (Llamadas a la API).</li>
            <li><strong>AWS Trusted Advisor:</strong> Recomendaciones para reducir costos, aumentar rendimiento y seguridad.</li>
          </ul>
        `,
        quiz: [
          {
            question: "¿Qué servicio utilizarías para investigar quién terminó una instancia EC2 de producción ayer por la tarde?",
            options: [
              "Amazon CloudWatch",
              "AWS CloudTrail",
              "Amazon Inspector",
              "AWS Config"
            ],
            correct: 1,
            explanation: "CloudTrail registra el historial de actividad de la cuenta, incluyendo la identidad del usuario y la acción realizada.",
            source: "PDF: AWS CloudTrail"
          }
        ]
      },
      {
        id: "6-2",
        title: "Planes de Soporte",
        content: `
          <h3 class="text-xl font-bold mb-2">Niveles de Soporte AWS</h3>
          <ul class="list-disc ml-5 mb-4">
            <li><strong>Basic:</strong> Gratis. Acceso a documentación.</li>
            <li><strong>Developer:</strong> Email en horario laboral.</li>
            <li><strong>Business:</strong> 24/7 Chat/Teléfono. Respuesta &lt; 1 hora si sistema cae.</li>
            <li><strong>Enterprise:</strong> Incluye un <strong>TAM (Technical Account Manager)</strong> dedicado y respuesta en 15 min para sistemas críticos.</li>
          </ul>
        `,
        quiz: [
          {
            question: "¿Cuál es el único plan de soporte que incluye un Technical Account Manager (TAM) dedicado?",
            options: [
              "Developer",
              "Business",
              "Enterprise",
              "Basic"
            ],
            correct: 2,
            explanation: "El plan Enterprise es el único que proporciona un TAM, quien actúa como contacto técnico principal.",
            source: "PDF: Enterprise Support"
          }
        ]
      }
    ]
  },
  {
    id: 7,
    title: "Módulo 7: Integración y Mensajería",
    description: "SQS, SNS y Desacoplamiento.",
    topics: [
      {
        id: "7-1",
        title: "Desacoplamiento de Aplicaciones",
        content: `
          <h3 class="text-xl font-bold mb-2">Colas y Notificaciones</h3>
          <p class="mb-4">Desacoplar componentes evita que el fallo de uno afecte a todo el sistema.</p>
          <ul class="list-disc ml-5 mb-4">
            <li><strong>Amazon SQS (Simple Queue Service):</strong> Cola de mensajes. Garantiza que los mensajes no se pierdan. Modelo "Pull".</li>
            <li><strong>Amazon SNS (Simple Notification Service):</strong> Envío de notificaciones (Pub/Sub) a email, SMS o Lambda. Modelo "Push".</li>
          </ul>
        `,
        quiz: [
          {
            question: "Tienes una aplicación donde un componente envía pedidos y otro los procesa. Si el procesador falla, no quieres perder los pedidos. ¿Qué servicio usas?",
            options: [
              "Amazon SNS",
              "Amazon SQS",
              "AWS Step Functions",
              "Amazon Connect"
            ],
            correct: 1,
            explanation: "SQS permite desacoplar componentes mediante colas, almacenando mensajes de forma segura hasta que puedan procesarse.",
            source: "PDF: Amazon SQS"
          }
        ]
      }
    ]
  },
  {
    id: 8,
    title: "Módulo 8: Arquitectura (Well-Architected)",
    description: "Los 6 pilares del diseño en la nube.",
    topics: [
      {
        id: "8-1",
        title: "AWS Well-Architected Framework",
        content: `
          <h3 class="text-xl font-bold mb-2">Los 6 Pilares</h3>
          <p class="mb-4">Guía para diseñar infraestructuras seguras y eficientes.</p>
          <ul class="grid grid-cols-2 gap-2 text-sm">
            <li class="bg-white p-2 border">Seguridad</li>
            <li class="bg-white p-2 border">Excelencia Operativa</li>
            <li class="bg-white p-2 border">Fiabilidad (Reliability)</li>
            <li class="bg-white p-2 border">Eficiencia de Rendimiento</li>
            <li class="bg-white p-2 border">Optimización de Costos</li>
            <li class="bg-white p-2 border">Sostenibilidad</li>
          </ul>
        `,
        quiz: [
          {
            question: "¿Qué pilar del Well-Architected Framework se centra en la capacidad de un sistema para recuperarse de interrupciones y mitigar fallos?",
            options: [
              "Seguridad",
              "Excelencia Operativa",
              "Fiabilidad (Reliability)",
              "Eficiencia de Rendimiento"
            ],
            correct: 2,
            explanation: "El pilar de Fiabilidad se enfoca en asegurar que las cargas de trabajo realicen sus funciones correctamente y se recuperen de fallos.",
            source: "PDF: Well-Architected Framework"
          }
        ]
      }
    ]
  },
  {
    id: 9,
    title: "Módulo 9: Migración de Datos (Snow Family)",
    description: "Transferencia de datos física masiva.",
    topics: [
      {
        id: "9-1",
        title: "Familia AWS Snow",
        content: `
          <h3 class="text-xl font-bold mb-2">Transferencia de Datos Offline</h3>
          <p>Dispositivos físicos para mover datos cuando la red es lenta o inexistente.</p>
          <ul class="list-disc ml-5 mb-4">
            <li><strong>Snowcone:</strong> Pequeño (8 TB). Portable.</li>
            <li><strong>Snowball Edge:</strong> Tamaño maleta (80 TB). Puede procesar datos localmente.</li>
            <li><strong>Snowmobile:</strong> Camión contenedor (100 PB). Para exabytes de datos.</li>
          </ul>
        `,
        quiz: [
          {
            question: "Necesitas migrar 80 TB de datos desde una ubicación remota con conectividad a internet muy limitada. ¿Cuál es la solución más eficiente?",
            options: [
              "AWS Direct Connect",
              "AWS Snowball Edge",
              "Site-to-Site VPN",
              "S3 Transfer Acceleration"
            ],
            correct: 1,
            explanation: "Snowball Edge es un dispositivo físico de transferencia de datos con capacidad de almacenamiento de 80 TB, ideal para entornos sin buena conectividad.",
            source: "PDF: AWS Snowball Edge"
          }
        ]
      }
    ]
  },
  {
    id: 10,
    title: "Módulo 10: Simulacros de Certificación (Examen Final)",
    description: "Evaluaciones completas tipo examen para validar tu preparación.",
    topics: [
      {
        id: "10-1",
        title: "Simulacro de Examen AWS #1",
        content: `
          <h3 class="text-3xl font-bold mb-4 text-aws-dark">Simulacro de Examen #1</h3>
          <div class="bg-white p-6 rounded-lg shadow-lg border-l-8 border-aws-orange mb-8">
            <h4 class="text-xl font-bold mb-2">Instrucciones del Examen Real:</h4>
            <ul class="list-disc ml-6 space-y-2 text-gray-700">
              <li><strong>Tiempo recomendado:</strong> 90 minutos.</li>
              <li><strong>Puntuación de aprobación:</strong> 700/1000 (70%).</li>
              <li><strong>Enfoque:</strong> Este examen cubre los 4 dominios: Conceptos de Nube, Seguridad, Tecnología y Facturación.</li>
            </ul>
            <p class="mt-4 font-bold text-red-600">¡Este es el reto final! Asegúrate de haber repasado los módulos anteriores.</p>
          </div>
        `,
        quiz: [
          {
            question: "Una empresa quiere migrar una base de datos Oracle on-premise a Amazon Aurora con el mínimo tiempo de inactividad posible. La base de datos debe permanecer operativa durante la migración. ¿Qué servicio debe usar?",
            options: [
              "AWS Schema Conversion Tool (SCT)",
              "AWS Database Migration Service (DMS)",
              "AWS DataSync",
              "Amazon DynamoDB"
            ],
            correct: 1,
            explanation: "AWS DMS permite migrar bases de datos de manera rápida y segura, manteniendo la base de datos de origen completamente operativa durante el proceso.",
            source: "PDF Página 39 - AWS DMS"
          },
          {
            question: "Un cliente necesita almacenar archivos a los que se accede con poca frecuencia, pero que deben estar disponibles inmediatamente cuando se soliciten. ¿Qué clase de almacenamiento S3 es la MÁS rentable?",
            options: [
              "S3 Standard",
              "S3 Glacier Deep Archive",
              "S3 Standard-IA (Infrequent Access)",
              "S3 Intelligent-Tiering"
            ],
            correct: 2,
            explanation: "S3 Standard-IA es ideal para datos de acceso poco frecuente pero que requieren recuperación rápida (milisegundos). Glacier tiene tiempos de recuperación de minutos a horas.",
            source: "PDF Página 30 - S3 One Zone-IA / Standard-IA"
          },
          {
            question: "¿Qué plan de soporte de AWS proporciona acceso a un Technical Account Manager (TAM) dedicado?",
            options: [
              "Developer",
              "Business",
              "Enterprise",
              "Basic"
            ],
            correct: 2,
            explanation: "El plan de soporte Enterprise es el único que incluye un TAM dedicado para orientación proactiva y defensa del cliente.",
            source: "PDF Página 47 - Gestor técnico de cuentas (TAM)"
          },
          {
            question: "Bajo el modelo de responsabilidad compartida, ¿cuál de las siguientes es responsabilidad EXCLUSIVA del cliente?",
            options: [
              "Seguridad física de los centros de datos",
              "Gestión de parches del sistema operativo de las instancias EC2",
              "Eliminación segura de dispositivos de almacenamiento",
              "Mantenimiento de la infraestructura de red de AWS"
            ],
            correct: 1,
            explanation: "El cliente es responsable de la seguridad 'EN' la nube, lo que incluye parchear el SO de sus instancias EC2, configurar firewalls y cifrar datos.",
            source: "PDF Página 18 - Modelo de Responsabilidad Compartida"
          },
          {
            question: "¿Qué servicio de AWS permite desplegar infraestructura como código (IaC) utilizando archivos de plantilla JSON o YAML?",
            options: [
              "AWS CodeDeploy",
              "AWS Elastic Beanstalk",
              "AWS CloudFormation",
              "AWS Systems Manager"
            ],
            correct: 2,
            explanation: "AWS CloudFormation permite modelar y aprovisionar todos los recursos de infraestructura en un entorno de nube mediante plantillas de texto.",
            source: "PDF Página 41 - AWS CloudFormation"
          },
          {
            question: "Una empresa necesita una conexión de red dedicada y privada entre sus instalaciones locales y AWS que NO atraviese la internet pública. ¿Qué servicio deben elegir?",
            options: [
              "AWS Site-to-Site VPN",
              "AWS Direct Connect",
              "Internet Gateway",
              "VPC Peering"
            ],
            correct: 1,
            explanation: "AWS Direct Connect proporciona una conexión física dedicada y privada que evita la internet pública, ofreciendo mayor ancho de banda y consistencia.",
            source: "PDF Página 16 - AWS Direct Connect"
          },
          {
            question: "¿Qué herramienta de AWS utilizarías para obtener recomendaciones sobre cómo reducir costos, mejorar el rendimiento y aumentar la seguridad?",
            options: [
              "AWS Cost Explorer",
              "AWS Trusted Advisor",
              "AWS CloudTrail",
              "Amazon Inspector"
            ],
            correct: 1,
            explanation: "AWS Trusted Advisor analiza el entorno y ofrece recomendaciones en 5 categorías: costos, rendimiento, seguridad, tolerancia a fallos y límites de servicio.",
            source: "PDF Página 9 - AWS Trusted Advisor"
          },
          {
            question: "Estás diseñando una aplicación que requiere una base de datos NoSQL rápida y flexible para una aplicación móvil con millones de usuarios. ¿Qué servicio recomienda AWS?",
            options: [
              "Amazon RDS",
              "Amazon Redshift",
              "Amazon DynamoDB",
              "Amazon Aurora"
            ],
            correct: 2,
            explanation: "Amazon DynamoDB es una base de datos NoSQL clave-valor totalmente gestionada, ideal para aplicaciones móviles que requieren latencia de milisegundos a cualquier escala.",
            source: "PDF Página 12 - Amazon DynamoDB"
          },
          {
            question: "¿Qué característica de AWS permite obtener descuentos significativos (hasta un 90%) a cambio de permitir que AWS interrumpa la instancia si necesita capacidad?",
            options: [
              "Instancias Reservadas",
              "Instancias On-Demand",
              "Instancias Spot",
              "Dedicated Hosts"
            ],
            correct: 2,
            explanation: "Las instancias Spot permiten aprovechar capacidad sobrante con grandes descuentos, pero pueden ser interrumpidas con 2 minutos de aviso.",
            source: "PDF Página 45 - Instancia Spot"
          },
          {
            question: "¿Qué servicio de AWS se utiliza para rastrear y registrar todas las llamadas a la API y la actividad de los usuarios para fines de auditoría?",
            options: [
              "Amazon CloudWatch",
              "AWS CloudTrail",
              "AWS Config",
              "AWS X-Ray"
            ],
            correct: 1,
            explanation: "AWS CloudTrail registra el historial de actividad de la cuenta, incluyendo la identidad del usuario, la hora y la acción realizada en la API.",
            source: "PDF Página 56 - AWS CloudTrail"
          },
          {
            question: "Una empresa quiere implementar una arquitectura desacoplada. ¿Qué servicio permite enviar mensajes entre componentes de software garantizando que no se pierdan?",
            options: [
              "Amazon SNS",
              "Amazon SQS",
              "AWS Step Functions",
              "Amazon Connect"
            ],
            correct: 1,
            explanation: "Amazon SQS es un servicio de colas de mensajes que permite desacoplar componentes y garantiza la entrega de mensajes sin pérdida.",
            source: "PDF Página 42 - Amazon SQS"
          },
          {
            question: "¿Qué servicio de AWS ayuda a proteger las aplicaciones web contra ataques comunes como inyección SQL y Cross-Site Scripting (XSS)?",
            options: [
              "AWS Shield Standard",
              "Amazon GuardDuty",
              "AWS WAF",
              "Security Groups"
            ],
            correct: 2,
            explanation: "AWS WAF (Web Application Firewall) protege aplicaciones web filtrando tráfico malicioso basado en reglas personalizables como SQLi y XSS.",
            source: "PDF Página 10 - AWS WAF"
          },
          {
            question: "¿Qué estrategia de precios de EC2 es la MÁS adecuada para una carga de trabajo estable y predecible que se ejecutará continuamente durante 3 años?",
            options: [
              "Instancias Spot",
              "Instancias On-Demand",
              "Instancias Reservadas",
              "Dedicated Hosts"
            ],
            correct: 2,
            explanation: "Las Instancias Reservadas ofrecen hasta un 72% de descuento a cambio de un compromiso de 1 o 3 años, ideal para cargas estables.",
            source: "PDF Página 60 - Instancia reservada estándar"
          },
          {
            question: "¿Qué pilar del AWS Well-Architected Framework se centra en la capacidad de un sistema para recuperarse de interrupciones y mitigar fallos?",
            options: [
              "Seguridad",
              "Excelencia Operativa",
              "Fiabilidad (Reliability)",
              "Eficiencia de Rendimiento"
            ],
            correct: 2,
            explanation: "El pilar de Fiabilidad se enfoca en asegurar que las cargas de trabajo realicen sus funciones correctamente y se recuperen rápidamente de los fallos.",
            source: "PDF Página 50 - Fiabilidad"
          },
          {
            question: "¿Cuál es el propósito principal de una Zona de Disponibilidad (AZ)?",
            options: [
              "Reducir la latencia para usuarios globales (CDN)",
              "Proporcionar aislamiento de fallos dentro de una región",
              "Proporcionar la mayor capacidad de almacenamiento",
              "Ofrecer el costo más bajo de red"
            ],
            correct: 1,
            explanation: "Una AZ es un centro de datos aislado físicamente. Usar múltiples AZs proporciona alta disponibilidad y tolerancia a fallos ante desastres locales.",
            source: "PDF Página 24 - Alta disponibilidad"
          }
        ]
      },
      {
        id: "10-2",
        title: "Simulacro de Examen AWS #2",
        content: `
          <h3 class="text-3xl font-bold mb-4 text-aws-dark">Simulacro de Examen #2</h3>
          <p class="mb-4">Este segundo examen se enfoca más en <strong>Escenarios de Arquitectura y Billing</strong>.</p>
          <div class="bg-blue-50 p-4 rounded border border-blue-200">
            <strong>Consejo:</strong> Presta atención a las palabras clave como "Menor costo", "Alta disponibilidad" o "Tiempo real".
          </div>
        `,
        quiz: [
          {
            question: "¿Qué servicio de AWS permite establecer un túnel cifrado seguro a través de Internet entre la red on-premise de una empresa y su VPC?",
            options: [
              "AWS Direct Connect",
              "AWS Site-to-Site VPN",
              "VPC Peering",
              "Transit Gateway"
            ],
            correct: 1,
            explanation: "AWS Site-to-Site VPN establece una conexión segura y cifrada (IPsec) a través de la internet pública.",
            source: "PDF Página 32 - AWS Site-to-Site VPN"
          },
          {
            question: "Una empresa quiere recibir una notificación cuando su gasto mensual estimado supere un umbral específico. ¿Qué herramienta deben usar?",
            options: [
              "AWS Cost Explorer",
              "AWS Budgets",
              "Cost and Usage Report",
              "AWS Trusted Advisor"
            ],
            correct: 1,
            explanation: "AWS Budgets permite definir presupuestos personalizados y enviar alertas cuando los costos o el uso superan los límites definidos.",
            source: "PDF Página 90 - AWS Budgets"
          },
          {
            question: "¿Qué servicio de base de datos es un Data Warehouse (almacén de datos) capaz de analizar petabytes de datos usando SQL?",
            options: [
              "Amazon RDS",
              "Amazon DynamoDB",
              "Amazon Redshift",
              "Amazon ElastiCache"
            ],
            correct: 2,
            explanation: "Amazon Redshift es un servicio de data warehouse a escala de petabytes, optimizado para análisis (OLAP) y reportes complejos.",
            source: "PDF Página 26 - Amazon Redshift"
          },
          {
            question: "¿Qué componente de la VPC actúa como un firewall virtual a nivel de subred para controlar el tráfico entrante y saliente?",
            options: [
              "Security Group",
              "Network ACL (NACL)",
              "Internet Gateway",
              "Route Table"
            ],
            correct: 1,
            explanation: "Las Network ACLs (NACLs) son firewalls sin estado (stateless) que controlan el tráfico a nivel de subred. Los Security Groups son a nivel de instancia.",
            source: "PDF Página 54 - Network ACL"
          },
          {
            question: "¿Qué servicio de AWS permite ejecutar contenedores sin tener que administrar la infraestructura de servidores subyacente (EC2)?",
            options: [
              "Amazon EC2",
              "AWS Fargate",
              "Amazon EKS en EC2",
              "AWS Lambda"
            ],
            correct: 1,
            explanation: "AWS Fargate es un motor de computación serverless para contenedores que elimina la necesidad de aprovisionar y administrar servidores.",
            source: "PDF Página 29 - AWS Fargate"
          }
        ]
      }
    ]
  }
];