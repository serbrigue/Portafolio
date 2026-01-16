from flask import Blueprint, jsonify

main = Blueprint('main', __name__)

# --- ENDPOINT: PERFIL ---
@main.route('/api/v1/profile', methods=['GET'])
def get_profile():
    return jsonify({
        "name": "Sergio Briones",
        "title": "Junior Cloud Engineer & Python Developer",
        "location": "Valparaíso, Chile (Disponibilidad Remota/Híbrida)",
        "availability": "Inmediata - Jornada Completa",
        # OPTIMIZACIÓN: Quitamos "Estudiante" de la primera línea.
        # Nos enfocamos en el valor que aportas: Resiliencia y Automatización.
        "summary": (
            "Ingeniero en formación especializado en el puente entre el código (Dev) y la infraestructura (Ops). "
            "Mi enfoque no es solo escribir software, sino diseñar sistemas resilientes y auto-reparables. "
            "Combino una fuerte lógica de programación en Python con herramientas modernas de nube (AWS/Docker) "
            "para transformar procesos manuales propensos a error en flujos automatizados y eficientes."
        ),
        "image": "/assets/yo.jpg",
        "cv_url": "/assets/CV_Sergio_Briones_junior_developer.pdf",
        "social_links": {
            "linkedin": "https://linkedin.com/in/serbrigue",
            "github": "https://github.com/serbrigue",
            "email": "serbrigue@gmail.com" # Asegúrate de poner el real si deseas
        }
    }), 200

# --- ENDPOINT: PROYECTOS (La Joya de la Corona) ---
@main.route('/api/v1/projects', methods=['GET'])
def get_projects():
    return jsonify([
        {
            "id": "tmm-v2",
            "title": "TMM v2 - ERP Educativo & E-commerce",
            # OPTIMIZACIÓN: Palabras clave de negocio: "Centralización", "Escalabilidad".
            "short_description": "Plataforma Fullstack para la gestión centralizada de recursos educativos. Integra LMS, ventas y CRM en una arquitectura contenerizada.",
            "tech_stack": ["Django REST", "React", "Docker", "PostgreSQL", "n8n", "Redis"],
            "repo_url": "https://github.com/serbrigue/TMM-v2",
            "demo_url": None, # Si tienes un deploy en Render/Railway, ponlo aquí.
            "features": ["Atomic Transactions", "Docker Microservices", "RAG AI Agent", "Polymorphic DB"],
            "image": "/assets/TMM.png",
            "details": {
                "problem": "La operación manual generaba inconsistencias de stock y datos dispersos entre múltiples herramientas.",
                "solution": "Arquitectura monolítica modular contenerizada que asegura la integridad transaccional y automatiza la atención al cliente.",
                "highlights": [
                    {
                        "title": "Integridad Transaccional",
                        "description": "Manejo de concurrencia con `select_for_update` para evitar sobreventa de cupos (Race Conditions)."
                    },
                    {
                        "title": "Asistente IA (RAG)",
                        "description": "Chatbot orquestado en n8n que consulta la BD en tiempo real para responder dudas de disponibilidad."
                    },
                    {
                        "title": "Arquitectura Híbrida",
                        "description": "Separación de responsabilidades: Backend API (Django) y Frontend SPA (React)."
                    }
                ]
            }
        },
        {
            "id": "devops-pipeline",
            "title": "Infraestructura CI/CD & Self-Healing",
            "short_description": "Pipeline de despliegue automatizado con detección de fallos y recuperación autónoma de servicios.",
            "tech_stack": ["Ansible", "GitHub Actions", "Docker Compose", "Bash", "Linux"],
            # OJO: Asegúrate de crear este repo o poner uno de ejemplo bien documentado
            "repo_url": "https://github.com/serbrigue/devops-lab-pipeline",
            "demo_url": None,
            "features": ["Zero-Touch Deployment", "Self-Healing Watchdog", "Idempotent Config", "Multi-stage Builds"],
            "image": "/assets/devops.png",
            "details": {
                "problem": "Los despliegues manuales y la falta de monitoreo causaban tiempos de inactividad prolongados.",
                "solution": "Implementación de Infraestructura como Código (IaC) y scripts de vigilancia activa.",
                "highlights": [
                    {
                        "title": "Despliegue Continuo",
                        "description": "Pipeline en GitHub Actions que testea y despliega contenedores optimizados (Alpine Linux)."
                    },
                    {
                        "title": "Sistema Self-Healing",
                        "description": "Watchdog en Bash que monitorea endpoints de salud (/health) y reinicia servicios automáticamente ante fallos."
                    },
                    {
                        "title": "Configuración Idempotente",
                        "description": "Playbooks de Ansible que garantizan que el estado del servidor sea siempre el deseado, sin deriva de configuración."
                    }
                ]
            }
        },
        {
            "id": "bot-rpa",
            "title": "Agente Autónomo de Visión Artificial",
            "short_description": "Bot RPA capaz de 'ver' y operar interfaces gráficas dinámicas en tiempo real, imitando comportamiento humano.",
            "tech_stack": ["Python", "OpenCV", "PyAutoGUI", "NumPy", "State Machine"],
            "repo_url": "https://github.com/serbrigue/bot-petsociety-v2",
            "demo_url": None,
            "features": ["Computer Vision", "Heuristic Logic", "Anti-Bot Evasion", "Real-time Processing"],
            "image": "/assets/bot.png",
            "details": {
                "problem": "Necesidad de automatizar tareas complejas en una interfaz visual sin acceso a API.",
                "solution": "Agente inteligente basado en reconocimiento de patrones visuales y máquina de estados finitos.",
                "highlights": [
                    {
                        "title": "Robustez Visual",
                        "description": "Uso de Template Matching con umbrales dinámicos para detectar elementos incluso con cambios de resolución."
                    },
                    {
                        "title": "Lógica de Estados",
                        "description": "Arquitectura de software que permite al bot tomar decisiones no lineales basadas en el entorno."
                    },
                    {
                        "title": "Simulación Humana",
                        "description": "Algoritmos de movimiento curvo y tiempos aleatorios para evitar detección por sistemas anti-bot."
                    }
                ]
            }
        },
        {
            "id": "gdrive-cli",
            "title": "Cloud Sync Automation CLI",
            "short_description": "Herramienta de línea de comandos para sincronización masiva y segura hacia Google Cloud Storage/Drive.",
            "tech_stack": ["Python", "Google Cloud API", "OAuth 2.0", "CLI"],
            "repo_url": "https://github.com/serbrigue/Subida-fotos-Google-drive",
            "demo_url": None,
            "features": ["OAuth 2.0 Security", "Batch Processing", "Error Handling", "Cross-Platform"],
            "image": "/assets/gdrive.png",
            "details": {
                "problem": "El respaldo manual de archivos multimedia era lento y propenso a errores de red.",
                "solution": "CLI robusta que maneja autenticación segura, reintentos y validación de integridad.",
                "highlights": [
                    {
                        "title": "Seguridad Enterprise",
                        "description": "Implementación de flujo OAuth 2.0 para gestión de tokens sin exponer credenciales de usuario."
                    },
                    {
                        "title": "Manejo de Cuotas",
                        "description": "Lógica de espera exponencial (backoff) para respetar los límites de la API de Google."
                    }
                ]
            }
        }
    ]), 200

# --- ENDPOINT: FORTALEZAS (Soft + Hard Skills) ---
@main.route('/api/v1/strengths', methods=['GET'])
def get_strengths():
    return jsonify([
        {
            "id": 1,
            "title": "Ingeniería de Resiliencia",
            "description": "Diseño pensando en el fallo. Mis sistemas incluyen 'Self-Healing' y manejo de errores para recuperarse sin intervención humana.",
            "icon": "ShieldCheck"
        },
        {
            "id": 2,
            "title": "Perfil DevOps (T-Shaped)",
            "description": "Desarrollador que entiende la infraestructura. No solo escribo código Python, sé cómo desplegarlo, escalarlo y monitorearlo (AWS/Docker).",
            "icon": "Server"
        },
        {
            "id": 3,
            "title": "Automatización Pragmática",
            "description": "Detecto cuellos de botella manuales y creo soluciones (Scripts, Bots, APIs) que ahorran horas de trabajo real.",
            "icon": "Cpu"
        },
        {
            "id": 4,
            "title": "Aprendizaje Ágil",
            "description": "Capacidad demostrada para dominar tecnologías complejas (Terraform, Ansible) de forma autónoma y certificada.",
            "icon": "Zap"
        }
    ]), 200

# --- ENDPOINT: TIMELINE (Education + Experience) ---
@main.route('/api/v1/timeline', methods=['GET'])
def get_timeline():
    return jsonify([
        {
            "id": 1,
            "year": "2025 - 2026",
            "title": "Consolidación: Arquitectura & DevOps",
            "institution": "Proyectos Personales & Portafolio",
            "type": "autodidact",
            "description": "Fase de integración total. Al no encontrar 'retos suficientes' en lo básico, decidí aprender orquestación avanzada por mi cuenta. Diseñé TMM v2 y este portafolio implementando Docker, CI/CD y servicios Cloud (GCP/AWS) desde cero, documentándome con la documentación oficial y prueba/error.",
            "tech_tags": ["Docker Compose", "Terraform", "GCP", "Architecture Design"],
            "icon": "Rocket"
        },
        {
            "id": 2,
            "year": "2024 - Presente",
            "title": "Formalización: Ingeniería en Informática",
            "institution": "INACAP (Vespertino)",
            "type": "education",
            "description": "Decidí respaldar mis conocimientos prácticos con bases teóricas sólidas. Actualmente curso la ingeniería con un rendimiento destacado, combinando los estudios con mi autoformación diaria en tecnologías emergentes.",
            "tech_tags": ["Gestión de Proyectos", "Bases de Datos", "Algoritmia"],
            "icon": "Book"
        },
        {
            "id": 3,
            "year": "2024",
            "title": "Especialización: Full Stack Python",
            "institution": "Bootcamp SENCE / Talento Digital",
            "type": "education",
            "description": "Perfeccionamiento profesional. Llevé mi scripting 'de guerrilla' a un nivel estandarizado, aprendiendo patrones de diseño (MVC), seguridad en APIs y buenas prácticas de desarrollo colaborativo con Django.",
            "tech_tags": ["Django", "API REST", "Scrum", "Git Flow"],
            "icon": "Code"
        },
        {
            "id": 4,
            "year": "2023",
            "title": "El Salto a la Automatización (RPA)",
            "institution": "Aprendizaje Autónomo / Google",
            "type": "autodidact",
            "description": "Hito clave: Me di cuenta de que el Soporte TI manual era ineficiente. Aprendí Python de forma autodidacta para automatizar tareas repetitivas. Creé mis primeros bots con OpenCV y PyAutoGUI para resolver problemas reales que nadie más estaba atacando.",
            "tech_tags": ["Python Scripting", "OpenCV", "Automatización", "Linux"],
            "icon": "Terminal"
        },
        {
            "id": 5,
            "year": "2022",
            "title": "Fundamentos: Cloud & Soporte",
            "institution": "AWS re/Start & Google Support",
            "type": "education",
            "description": "Mi entrada al mundo TI. Obtuve las bases de redes, sistemas operativos y nube. Aquí nació mi obsesión por entender qué pasa 'detrás del telón' de los servidores y la infraestructura.",
            "tech_tags": ["AWS Cloud Practitioner", "Networking", "Troubleshooting", "Hardware"],
            "icon": "Cloud"
        }
    ]), 200

# --- ENDPOINT: HABILIDADES (Skills) ---
@main.route('/api/v1/skills', methods=['GET'])
def get_skills():
    # OPTIMIZACIÓN: Añadimos un valor numérico 'percentage' por si quieres hacer barras de progreso en el Frontend.
    return jsonify({
        "backend": [
            { "name": "Python (Scripting & Automation)", "level": "Avanzado", "percentage": 90 },
            { "name": "Django REST Framework", "level": "Intermedio", "percentage": 75 },
            { "name": "SQL / PostgreSQL", "level": "Competente", "percentage": 70 },
            { "name": "APIs & Auth (OAuth/JWT)", "level": "Competente", "percentage": 80 }
        ],
        "infrastructure": [
            { "name": "Docker & Compose", "level": "Avanzado", "percentage": 85 },
            { "name": "Linux SysAdmin", "level": "Intermedio", "percentage": 75 },
            { "name": "AWS Services", "level": "Fundamentos", "percentage": 60 },
            { "name": "IaC (Terraform/Ansible)", "level": "Nociones Sólidas", "percentage": 50 }
        ],
        "tools": [
            { "name": "Git & GitHub Actions", "level": "Intermedio", "percentage": 70 },
            { "name": "OpenCV (Visión)", "level": "Intermedio", "percentage": 65 },
            { "name": "RPA / n8n", "level": "Avanzado", "percentage": 85 }
        ]
    }), 200

# --- ENDPOINT: CERTIFICACIONES ---
@main.route('/api/v1/certifications', methods=['GET'])
def get_certifications():
    # OPTIMIZACIÓN: Unificamos Timeline y Certificaciones para no repetir info, 
    # o dejamos este endpoint exclusivo para las credenciales verificables.
    return jsonify([
        {
            "id": 1,
            "title": "Google IT Support Professional",
            "issuer": "Google",
            "date": "2025",
            "url": "https://www.credly.com/badges/4ee9144e-73b8-4223-9ba8-1b15f028b4fb/linked_in_profile",
            "icon": "Google"
        },
        {
            "id": 2,
            "title": "Bootcamp Desarrollo Full Stack Python",
            "issuer": "SENCE / Talento Digital",
            "date": "2024",
            "url": "https://www.acreditta.com/credential/5c36b86b-fec1-476e-a862-0014d61071cc",
            "icon": "Python"
        },
        {
            "id": 3,
            "title": "Google IT Automation with Python",
            "issuer": "Google",
            "date": "2023",
            "url": "https://www.credly.com/badges/75c081e6-bcba-4cd5-9ebe-cdb4fab338e4/linked_in_profile",
            "icon": "Google"
        },
        {
            "id": 4,
            "title": "AWS re/Start Graduate",
            "issuer": "Amazon Web Services",
            "date": "2022",
            "url": "https://www.credly.com/badges/5087d82d-eb29-4a93-9534-a78955679c07/linked_in_profile",
            "icon": "AWS"
        }
    ]), 200