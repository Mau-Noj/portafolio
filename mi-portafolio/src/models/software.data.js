// src/models/software.data.js
import { ARCH_QUIMICA, ARCH_LABORATORIO } from "./arch-nodes.data";
import {
  UML_QUIMICA_CLASES,
  UML_QUIMICA_CU,
  UML_QUIMICA_SEQ,
  UML_LAB_CLASES,
  UML_LAB_CU,
  UML_LAB_SEQ,
} from "./uml-data";

export const ESTADOS = {
  ACTIVO: { label: "Activo", color: "#16a34a" },
  COMPLETADO: { label: "Completado", color: "#2563eb" },
  PAUSADO: { label: "Pausado", color: "#f59e0b" },
  PROTOTIPO: { label: "Prototipo", color: "#7c3aed" },
};

export const FASES_RUP = [
  { id: "inicio", label: "Inicio", icon: "◎" },
  { id: "elaboracion", label: "Elaboración", icon: "◈" },
  { id: "construccion", label: "Construcción", icon: "⬡" },
  { id: "transicion", label: "Transición", icon: "◉" },
];

export const TIPO_DIAGRAMA = {
  CASOS_USO: "Casos de Uso",
  CLASES: "Clases",
  SECUENCIA: "Secuencia",
  ACTIVIDAD: "Actividad",
  COMPONENTES: "Componentes",
  DESPLIEGUE: "Despliegue",
  ARQUITECTURA: "Arquitectura",
  ER: "Entidad-Relación",
};

export const SOFTWARE_DATA = [
  // ── Analizador de Nomenclatura Química ─────────────────────────────────
  {
    id: "quimica-analizador",
    nombre: "Analizador de Nomenclatura Química",
    tagline:
      "Parser ANTLR4 que clasifica y nombra compuestos químicos en tres sistemas de nomenclatura",
    screenshot: "https://assets.mauricionoj.com/projects/antlr_quimica_pro.png",
    estado: "ACTIVO",
    año: 2026,
    github: "https://github.com/Mau-Noj/Analizador_nomenclatura_qu-mica_ANTLR4",
    tags: ["java", "spring-boot", "antlr4", "react", "docker", "compiladores"],
    app: {
      activa: true,
      tipo: "fullstack-externo",
      api_base_url: import.meta.env.VITE_API_URL,
      componente: "QuimicaAnalizador",
    },
    demo: {
      youtube_id: "",
      descripcion:
        "Analizador con parser ANTLR4: ingresa una fórmula y obtén IUPAC, Stock y Tradicional.",
    },
    stack: {
      frontend: ["React", "Vite", "CSS Modules"],
      backend: ["Java 21", "Spring Boot 3.2.3", "ANTLR4 4.13.1"],
      base_datos: [],
      otros: ["Docker", "GitHub Actions", "Docker Hub", "Dokploy"],
    },
    descripcion:
      "API REST con gramática ANTLR4 que tokeniza y parsea fórmulas químicas para clasificar compuestos (óxidos, hidróxidos, ácidos, sales) y generar nomenclatura IUPAC, Stock y Tradicional con pasos de razonamiento detallados.",
    problema:
      "Estudiantes de química tienen dificultad para convertir fórmulas a los distintos sistemas de nomenclatura y no cuentan con una herramienta que explique el razonamiento paso a paso.",
    solucion:
      "Parser formal con ANTLR4 que construye un árbol sintáctico de la fórmula, extrae átomos con un visitor y aplica reglas de nomenclatura con explicación del proceso.",
    metodologia: {
      nombre: "RUP",
      fase_actual: "transicion",
      iteraciones: 2,
      duracion: "3 semanas",
      equipo: 1,
      rol_autor: "Diseñador de compiladores / Desarrollador fullstack",
      descripcion:
        "RUP con 2 iteraciones. Primera: gramática ANTLR4, visitor y servicio de nomenclatura. Segunda: API REST, CI/CD y frontend integrado al portafolio.",
      fases: [
        {
          fase: "inicio",
          completada: true,
          descripcion:
            "Definición de gramática química: elementos, subíndices, paréntesis anidados.",
        },
        {
          fase: "elaboracion",
          completada: true,
          descripcion:
            "Diseño del visitor ANTLR4 y arquitectura del servicio de nomenclatura.",
        },
        {
          fase: "construccion",
          completada: true,
          descripcion:
            "Implementación: gramáticas .g4, FormulaVisitor, NomenclaturService, QuizService, REST controllers, Dockerfile, CI/CD.",
        },
        {
          fase: "transicion",
          completada: true,
          descripcion:
            "Integración al portafolio como micro-frontend. GitHub Actions → Docker Hub.",
        },
      ],
    },
    requerimientos: {
      funcionales: [
        {
          id: "RF-001",
          nombre: "Parseo ANTLR4",
          descripcion: "Tokenizar y parsear fórmulas usando gramática formal.",
          prioridad: "Alta",
          estado: "Implementado",
        },
        {
          id: "RF-002",
          nombre: "Análisis de fórmula",
          descripcion:
            "Clasificar compuesto y generar nombres IUPAC, Stock y Tradicional.",
          prioridad: "Alta",
          estado: "Implementado",
        },
        {
          id: "RF-003",
          nombre: "Validación sintáctica",
          descripcion: "Detectar y reportar errores en fórmulas malformadas.",
          prioridad: "Alta",
          estado: "Implementado",
        },
        {
          id: "RF-004",
          nombre: "Pasos de razonamiento",
          descripcion:
            "Devolver explicación paso a paso del proceso de nomenclatura.",
          prioridad: "Media",
          estado: "Implementado",
        },
        {
          id: "RF-005",
          nombre: "Quiz interactivo",
          descripcion:
            "Generar preguntas y verificar respuestas de nomenclatura.",
          prioridad: "Media",
          estado: "Implementado",
        },
        {
          id: "RF-006",
          nombre: "API REST",
          descripcion:
            "Endpoints para analizar, validar y quiz consumibles desde el frontend.",
          prioridad: "Alta",
          estado: "Implementado",
        },
      ],
      no_funcionales: [
        {
          id: "RNF-001",
          categoria: "Portabilidad",
          descripcion: "Desplegable en cualquier entorno con Docker.",
          criterio: "docker run en una línea",
        },
        {
          id: "RNF-002",
          categoria: "CI/CD",
          descripcion: "Build y push automático en cada push a main.",
          criterio: "GitHub Actions < 5 min",
        },
        {
          id: "RNF-003",
          categoria: "Rendimiento",
          descripcion: "Respuesta del parser < 200ms por fórmula.",
          criterio: "Medición local con curl",
        },
        {
          id: "RNF-004",
          categoria: "Mantenibilidad",
          descripcion: "Gramática extensible sin tocar la lógica Java.",
          criterio: "Agregar elemento solo en .g4",
        },
      ],
    },
    trazabilidad: [
      {
        rf_id: "RF-001",
        caso_uso: "CU-001",
        caso_prueba: "CP-001",
        estado: "Verificado",
      },
      {
        rf_id: "RF-002",
        caso_uso: "CU-002",
        caso_prueba: "CP-002",
        estado: "Verificado",
      },
      {
        rf_id: "RF-003",
        caso_uso: "CU-003",
        caso_prueba: "CP-003",
        estado: "Verificado",
      },
      {
        rf_id: "RF-004",
        caso_uso: "CU-002",
        caso_prueba: "CP-004",
        estado: "Verificado",
      },
      {
        rf_id: "RF-005",
        caso_uso: "CU-004",
        caso_prueba: "CP-005",
        estado: "Verificado",
      },
      {
        rf_id: "RF-006",
        caso_uso: "CU-001",
        caso_prueba: "CP-006",
        estado: "Verificado",
      },
    ],
    diagramas: [
      {
        tipo: "SECUENCIA",
        titulo: "Secuencia — Analizar Fórmula",
        descripcion:
          "Flujo completo desde que el estudiante ingresa la fórmula hasta recibir la nomenclatura.",
        mermaid: "",
        uml_data: UML_QUIMICA_SEQ,
        imagen: "",
      },
      {
        tipo: "CASOS_USO",
        titulo: "CU — Analizador Químico",
        descripcion: "Casos de uso del sistema.",
        mermaid: "",
        uml_data: UML_QUIMICA_CU,
        imagen: "",
      },
      {
        tipo: "CLASES",
        titulo: "Diagrama de Clases — Backend",
        descripcion:
          "Clases principales del sistema con sus atributos y métodos reales.",
        mermaid: "",
        uml_data: UML_QUIMICA_CLASES,
        imagen: "",
      },
    ],
    arquitectura: {
      patron: "Layered Architecture + Visitor Pattern",
      descripcion:
        "Arquitectura en capas (Controller → Service → Visitor/Model) con Visitor Pattern aplicado sobre el árbol ANTLR4. El Controller recibe HTTP y delega al Service de nomenclatura, que usa el FormulaVisitor para parsear la fórmula. Desplegado en Koyeb con CI/CD via GitHub Actions + Docker Hub.",
      mermaid: "",
      imagen: "",
      capas: [
        {
          icon: "🎮",
          nombre: "Controller Layer",
          tech: "@RestController · WebConfig.java",
          color: "#38bdf8",
          desc: "Recibe requests HTTP, configura CORS y delega al Service. Sin lógica de negocio.",
        },
        {
          icon: "⚙️",
          nombre: "Service Layer",
          tech: "NomenclaturService.java",
          color: "#4ade80",
          desc: "Lógica de nomenclatura química: clasifica el compuesto y genera IUPAC, Stock y Tradicional con pasos de razonamiento.",
        },
        {
          icon: "🌳",
          nombre: "Visitor Layer",
          tech: "ANTLR4 + FormulaVisitor.java",
          color: "#e879f9",
          desc: "Visitor Pattern: FormulaVisitor recorre el árbol ANTLR4 y extrae Map<átomo, cantidad> sin conocer la lógica de negocio.",
        },
        {
          icon: "📦",
          nombre: "Model Layer",
          tech: "ResultadoAnalisis · ElementosDB",
          color: "#f59e0b",
          desc: "DTOs y base de datos en memoria de 118 elementos con sus estados de oxidación y propiedades.",
        },
      ],
      decisiones: [
        {
          decision: "ANTLR4 sobre parsing manual",
          razon:
            "Gramática formal extensible — agregar elementos solo requiere editar el .g4.",
          alternativas: "Regex, parser manual",
        },
        {
          decision: "Visitor pattern",
          razon:
            "Separación limpia entre gramática (ANTLR) y lógica de negocio (Java).",
          alternativas: "Listener pattern",
        },
        {
          decision: "Sin base de datos",
          razon:
            "Todo en memoria — sin estado persistente, despliegue más simple.",
          alternativas: "H2, PostgreSQL",
        },
        {
          decision: "Koyeb + Docker + GitHub Actions",
          razon:
            "Deploy automático con imagen Docker. Koyeb free tier tolera el spin-down para un proyecto académico.",
          alternativas: "JAR manual, Render, Railway",
        },
      ],
    },
    arch_diagram: ARCH_QUIMICA,
    patrones: [
      {
        nombre: "Visitor",
        categoria: "Compiler Pattern",
        uso: "Recorre el árbol ANTLR y extrae átomos sin modificar la gramática.",
      },
      {
        nombre: "Builder",
        categoria: "Creacional",
        uso: "Construcción de ResultadoAnalisis y PreguntaQuiz sin Lombok.",
      },
      {
        nombre: "Strategy implícita",
        categoria: "Comportamental",
        uso: "NomenclaturService selecciona el algoritmo según tipo de compuesto.",
      },
      {
        nombre: "Lazy Loading",
        categoria: "Performance",
        uso: "App cargada solo al navegar a /software/quimica-analizador/app.",
      },
    ],
    ciclo_vida: {
      descripcion: "Desarrollo en 3 semanas con 2 iteraciones RUP.",
      hitos: [
        {
          fecha: "2026-02",
          fase: "Inicio",
          descripcion: "Definición de gramática y alcance del parser.",
        },
        {
          fecha: "2026-02",
          fase: "Elaboración",
          descripcion: "Gramáticas .g4, visitor y servicio de nomenclatura.",
        },
        {
          fecha: "2026-03",
          fase: "Construcción",
          descripcion: "API REST, CI/CD con GitHub Actions y Docker Hub.",
        },
        {
          fecha: "2026-03",
          fase: "Transición",
          descripcion: "Integración al portafolio como micro-frontend.",
        },
      ],
    },
  },

  // ── Sistema de Gestión de Laboratorio ──────────────────────────────────
  {
    id: "sistema-gestion-laboratorio",
    nombre: "Sistema de Gestión de Laboratorio",
    tagline:
      "Control de prácticas, equipos y estudiantes para laboratorios de ingeniería",
    screenshot: "https://assets.mauricionoj.com/projects/sw-laboratorio.jpg",
    estado: "COMPLETADO",
    año: 2025,
    github: "https://github.com/Mau-Noj/Backend-lab-cuantitativo",
    tags: ["web", "react", "node", "mysql", "RUP", "MVC"],
    app: {
      activa: true,
      tipo: "fullstack-externo",
      api_base_url: "https://api-laboratorio.tudominio.com",
      componente: "SistemaInventario",
    },
    demo: {
      youtube_id: "REEMPLAZAR_CON_ID_REAL",
      descripcion:
        "Demo completo: registro de prácticas, asignación de equipos y reportes PDF.",
    },
    stack: {
      frontend: ["React", "CSS Modules", "Vite"],
      backend: ["Node.js", "Express"],
      base_datos: ["MySQL 8"],
      otros: ["JWT", "Cloudflare R2", "Dokploy"],
    },
    descripcion:
      "Sistema web para gestión integral de laboratorios de ingeniería. Administra prácticas, equipos, asistencia y genera reportes académicos.",
    problema:
      "Prácticas y equipos manejados en hojas de cálculo dispersas — pérdida de información y reportes difíciles.",
    solucion:
      "Sistema centralizado con roles diferenciados, inventario en tiempo real y reportes exportables.",
    metodologia: {
      nombre: "RUP",
      fase_actual: "transicion",
      iteraciones: 3,
      duracion: "4 meses",
      equipo: 1,
      rol_autor: "Analista / Diseñador / Desarrollador",
      descripcion:
        "RUP con 3 iteraciones. Inicio: requerimientos. Elaboración: arquitectura y UML. Construcción: módulos por prioridad. Transición: pruebas y despliegue.",
      fases: [
        {
          fase: "inicio",
          completada: true,
          descripcion:
            "Levantamiento de requerimientos con docentes. Identificación de stakeholders.",
        },
        {
          fase: "elaboracion",
          completada: true,
          descripcion:
            "Arquitectura MVC, diagramas UML completos, prototipo de interfaz aprobado.",
        },
        {
          fase: "construccion",
          completada: true,
          descripcion:
            "Módulos: autenticación, prácticas, equipos, asistencia, reportes PDF.",
        },
        {
          fase: "transicion",
          completada: true,
          descripcion:
            "Pruebas de aceptación con 5 docentes. Despliegue en Dokploy.",
        },
      ],
    },
    requerimientos: {
      funcionales: [
        {
          id: "RF-AUTH-001",
          nombre: "Autenticación",
          descripcion: "Inicio de sesión con credenciales únicas por rol.",
          prioridad: "Alta",
          estado: "Implementado",
        },
        {
          id: "RF-AUTH-002",
          nombre: "Gestión de roles",
          descripcion: "Permisos diferenciados: admin, docente, estudiante.",
          prioridad: "Alta",
          estado: "Implementado",
        },
        {
          id: "RF-PRAC-001",
          nombre: "Registro de prácticas",
          descripcion: "Crear, editar y eliminar prácticas de laboratorio.",
          prioridad: "Alta",
          estado: "Implementado",
        },
        {
          id: "RF-PRAC-002",
          nombre: "Asignación estudiantes",
          descripcion: "Asignar estudiantes a grupos de práctica.",
          prioridad: "Alta",
          estado: "Implementado",
        },
        {
          id: "RF-EQUIP-001",
          nombre: "Inventario de equipos",
          descripcion: "Registrar y actualizar estado de cada equipo.",
          prioridad: "Media",
          estado: "Implementado",
        },
        {
          id: "RF-REP-001",
          nombre: "Reportes PDF",
          descripcion: "Generar reportes de asistencia y equipos en PDF.",
          prioridad: "Media",
          estado: "Implementado",
        },
        {
          id: "RF-ASIST-001",
          nombre: "Control asistencia",
          descripcion: "Registrar asistencia de estudiantes por práctica.",
          prioridad: "Baja",
          estado: "Implementado",
        },
      ],
      no_funcionales: [
        {
          id: "RNF-001",
          categoria: "Rendimiento",
          descripcion: "Respuesta en menos de 2 segundos.",
          criterio: "Lighthouse > 85",
        },
        {
          id: "RNF-002",
          categoria: "Seguridad",
          descripcion: "Bcrypt + JWT.",
          criterio: "OWASP Top 10",
        },
        {
          id: "RNF-003",
          categoria: "Disponibilidad",
          descripcion: "99% uptime en horario académico.",
          criterio: "Monitor mensual",
        },
        {
          id: "RNF-004",
          categoria: "Escalabilidad",
          descripcion: "200 usuarios concurrentes.",
          criterio: "Test de carga k6",
        },
      ],
    },
    trazabilidad: [
      {
        rf_id: "RF-AUTH-001",
        caso_uso: "CU-001",
        caso_prueba: "CP-001",
        estado: "Verificado",
      },
      {
        rf_id: "RF-AUTH-002",
        caso_uso: "CU-001",
        caso_prueba: "CP-002",
        estado: "Verificado",
      },
      {
        rf_id: "RF-PRAC-001",
        caso_uso: "CU-002",
        caso_prueba: "CP-003",
        estado: "Verificado",
      },
      {
        rf_id: "RF-PRAC-002",
        caso_uso: "CU-003",
        caso_prueba: "CP-004",
        estado: "Verificado",
      },
      {
        rf_id: "RF-EQUIP-001",
        caso_uso: "CU-004",
        caso_prueba: "CP-005",
        estado: "Verificado",
      },
      {
        rf_id: "RF-REP-001",
        caso_uso: "CU-006",
        caso_prueba: "CP-006",
        estado: "Verificado",
      },
      {
        rf_id: "RF-ASIST-001",
        caso_uso: "CU-003",
        caso_prueba: "CP-007",
        estado: "Verificado",
      },
    ],
    diagramas: [
      {
        tipo: "CASOS_USO",
        titulo: "CU — Sistema de Laboratorio",
        descripcion: "Actores y casos de uso del sistema completo.",
        mermaid: "",
        uml_data: UML_LAB_CU,
        imagen: "",
      },
      {
        tipo: "CLASES",
        titulo: "Diagrama de Clases — Dominio",
        descripcion: "Clases principales con relaciones.",
        mermaid: "",
        uml_data: UML_LAB_CLASES,
        imagen: "",
      },
      {
        tipo: "SECUENCIA",
        titulo: "Secuencia — Registro de Práctica",
        descripcion:
          "Flujo completo para registrar una nueva práctica con autenticación JWT.",
        mermaid: "",
        uml_data: UML_LAB_SEQ,
        imagen: "",
      },
    ],
    arquitectura: {
      patron: "MVC — Model View Controller",
      descripcion:
        "React SPA en portafolio (Vercel) hace fetch() a Express API desplegada en Dokploy. MySQL en el mismo servidor. Archivos en Cloudflare R2.",
      mermaid: "",
      imagen: "",
      decisiones: [
        {
          decision: "Frontend en portafolio, API en Dokploy",
          razon: "Separación clara: portafolio = UI, servidor = lógica.",
          alternativas: "Next.js fullstack",
        },
        {
          decision: "MySQL",
          razon: "Datos relacionales fuertes.",
          alternativas: "PostgreSQL, MongoDB",
        },
        {
          decision: "JWT",
          razon: "Stateless, compatible con frontend separado.",
          alternativas: "Sessions, OAuth2",
        },
      ],
    },
    arch_diagram: ARCH_LABORATORIO,
    patrones: [
      {
        nombre: "Repository",
        categoria: "Arquitectural",
        uso: "Abstracción de acceso a datos por entidad.",
      },
      {
        nombre: "Singleton",
        categoria: "Creacional",
        uso: "Conexión única a MySQL.",
      },
      {
        nombre: "Factory Method",
        categoria: "Creacional",
        uso: "Reportes PDF con diferentes plantillas.",
      },
      {
        nombre: "MVC",
        categoria: "Arquitectural",
        uso: "Separación de presentación, lógica y datos.",
      },
    ],
    ciclo_vida: {
      descripcion:
        "RUP con 3 iteraciones en Construcción. Cada una entregó un módulo funcional.",
      hitos: [
        {
          fecha: "2025-01",
          fase: "Inicio",
          descripcion: "Reunión con docentes. 7 RF y 4 RNF levantados.",
        },
        {
          fecha: "2025-02",
          fase: "Elaboración",
          descripcion: "Arquitectura MVC, UML, prototipo aprobado.",
        },
        {
          fecha: "2025-02",
          fase: "Construcción I",
          descripcion: "Autenticación y roles.",
        },
        {
          fecha: "2025-03",
          fase: "Construcción II",
          descripcion: "Prácticas, grupos y asistencia.",
        },
        {
          fecha: "2025-03",
          fase: "Construcción III",
          descripcion: "Equipos y reportes PDF.",
        },
        {
          fecha: "2025-04",
          fase: "Transición",
          descripcion: "Pruebas con 5 docentes. Despliegue Dokploy.",
        },
      ],
    },
  },
];

export const getSoftwareById = (id) => SOFTWARE_DATA.find((s) => s.id === id);
export const getAllSoftware = () => SOFTWARE_DATA;
export const getSoftwareByTag = (tag) =>
  SOFTWARE_DATA.filter((s) => s.tags.includes(tag));
