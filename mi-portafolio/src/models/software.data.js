// src/models/software.data.js

export const ESTADOS = {
  ACTIVO:      { label: 'Activo',      color: '#16a34a' },
  COMPLETADO:  { label: 'Completado',  color: '#2563eb' },
  PAUSADO:     { label: 'Pausado',     color: '#f59e0b' },
  PROTOTIPO:   { label: 'Prototipo',   color: '#7c3aed' },
};

export const FASES_RUP = [
  { id: 'inicio',        label: 'Inicio',        icon: '◎' },
  { id: 'elaboracion',   label: 'Elaboración',   icon: '◈' },
  { id: 'construccion',  label: 'Construcción',  icon: '⬡' },
  { id: 'transicion',    label: 'Transición',    icon: '◉' },
];

export const TIPO_DIAGRAMA = {
  CASOS_USO:    'Casos de Uso',
  CLASES:       'Clases',
  SECUENCIA:    'Secuencia',
  ACTIVIDAD:    'Actividad',
  COMPONENTES:  'Componentes',
  DESPLIEGUE:   'Despliegue',
  ARQUITECTURA: 'Arquitectura',
  ER:           'Entidad-Relación',
};

export const SOFTWARE_DATA = [


  //---2. Carta de cumpleaños para una amiga
  {
  id:         'cumpleanos-amiga',
  nombre:     'Cumpleaños de mi Amiga',
  tagline:    'Una sorpresa digital para celebrar a alguien especial',
  screenshot: 'https://assets.mauricionoj.com/projects/Cumple_1.png',
  estado:     'COMPLETADO',
  año:        2025,
  tags:       ['react', 'css', 'frontend-puro', 'personal'],

  app: {
    activa:       true,
    tipo:         'frontend-puro',
    api_base_url: '',
    componente:   'CumpleañosAmiga',
  },

  demo: { youtube_id: '', descripcion: 'App interactiva de cumpleaños con analizador léxico.' },
  stack: { frontend: ['React', 'CSS', 'Vite'], backend: [], base_datos: [], otros: [] },
  descripcion: 'Aplicación personal de cumpleaños con carta, momentos y regalo interactivo con analizador léxico de relación.',
  problema:    'Quería algo más especial que un mensaje de WhatsApp.',
  solucion:    'Una app con analizador léxico que reconoce quién eres para mí.',
  metodologia: {
    nombre: 'RUP', fase_actual: 'transicion', iteraciones: 1,
    duracion: '1 día', equipo: 1, rol_autor: 'Diseñador / Desarrollador',
    descripcion: 'Proyecto de ciclo mínimo.',
    fases: [
      { fase: 'inicio',       completada: true, descripcion: 'Concepto y estructura.' },
      { fase: 'elaboracion',  completada: true, descripcion: 'Diseño visual púrpura festivo.' },
      { fase: 'construccion', completada: true, descripcion: 'Carta, momentos, regalo + analizador léxico.' },
      { fase: 'transicion',   completada: true, descripcion: 'Integrado al portafolio.' },
    ],
  },
  requerimientos: {
    funcionales: [
      { id: 'RF-001', nombre: 'Carta animada',       descripcion: 'Carta con confetti y animación de entrada.',      prioridad: 'Alta',  estado: 'Implementado' },
      { id: 'RF-002', nombre: 'Galería de momentos', descripcion: 'Grid de momentos especiales.',                    prioridad: 'Alta',  estado: 'Implementado' },
      { id: 'RF-003', nombre: 'Regalo interactivo',  descripcion: 'Caja que se abre y revela mensaje.',              prioridad: 'Alta',  estado: 'Implementado' },
      { id: 'RF-004', nombre: 'Analizador léxico',   descripcion: 'Detecta tokens: amiga, esposa, amante → alerta personalizada.', prioridad: 'Alta', estado: 'Implementado' },
    ],
    no_funcionales: [
      { id: 'RNF-001', categoria: 'Usabilidad', descripcion: 'Funcional en móvil.', criterio: 'Responsive desde 320px' },
    ],
  },
  trazabilidad: [
    { rf_id: 'RF-001', caso_uso: 'CU-001', caso_prueba: 'CP-001', estado: 'Verificado' },
    { rf_id: 'RF-002', caso_uso: 'CU-002', caso_prueba: 'CP-002', estado: 'Verificado' },
    { rf_id: 'RF-003', caso_uso: 'CU-003', caso_prueba: 'CP-003', estado: 'Verificado' },
    { rf_id: 'RF-004', caso_uso: 'CU-003', caso_prueba: 'CP-004', estado: 'Verificado' },
  ],
  diagramas: [],
  arquitectura: {
    patron: 'SPA — Single Page Application',
    descripcion: 'Frontend puro. Analizador léxico implementado en JavaScript puro sin ANTLR.',
    mermaid: '', imagen: '', decisiones: [],
  },
  patrones: [
    { nombre: 'Analizador Léxico', categoria: 'Compiler Pattern', uso: 'Tokenización del input para detectar tipo de relación.' },
    { nombre: 'Lazy Loading',      categoria: 'Performance',       uso: 'Cargado solo al navegar a la app.' },
  ],
  ciclo_vida: {
    descripcion: 'Un día, concepto a producción.',
    hitos: [
      { fecha: '2025-03', fase: 'Desarrollo', descripcion: 'Implementación completa en un día.' },
    ],
  },
},

// ── Analizador de Nomenclatura Química ─────────────────────────────────

  {
    id:         'quimica-analizador',
    nombre:     'Analizador de Nomenclatura Química',
    tagline:    'Parser ANTLR4 que clasifica y nombra compuestos químicos en tres sistemas de nomenclatura',
    screenshot: 'https://assets.mauricionoj.com/projects/quimica-analizador.png',
    estado:     'ACTIVO',
    año:        2026,
    tags:       ['java', 'spring-boot', 'antlr4', 'react', 'docker', 'compiladores'],

    app: {
      activa:       true,
      tipo:         'fullstack-externo',
      api_base_url: import.meta.env.VITE_API_URL, 
      componente:   'QuimicaAnalizador',
    },

    demo: {
      youtube_id:  '', // ← agregar cuando grabes el demo
      descripcion: 'Analizador con parser ANTLR4: ingresa una fórmula y obtén IUPAC, Stock y Tradicional.',
    },

    stack: {
      frontend:   ['React', 'Vite', 'CSS Modules'],
      backend:    ['Java 21', 'Spring Boot 3.2.3', 'ANTLR4 4.13.1'],
      base_datos: [],
      otros:      ['Docker', 'GitHub Actions', 'Docker Hub', 'Dokploy'],
    },

    descripcion: 'API REST con gramática ANTLR4 que tokeniza y parsea fórmulas químicas para clasificar compuestos (óxidos, hidróxidos, ácidos, sales) y generar nomenclatura IUPAC, Stock y Tradicional con pasos de razonamiento detallados.',
    problema:    'Estudiantes de química tienen dificultad para convertir fórmulas a los distintos sistemas de nomenclatura y no cuentan con una herramienta que explique el razonamiento paso a paso.',
    solucion:    'Parser formal con ANTLR4 que construye un árbol sintáctico de la fórmula, extrae átomos con un visitor y aplica reglas de nomenclatura con explicación del proceso.',

    metodologia: {
      nombre:      'RUP',
      fase_actual: 'transicion',
      iteraciones: 2,
      duracion:    '3 semanas',
      equipo:      1,
      rol_autor:   'Diseñador de compiladores / Desarrollador fullstack',
      descripcion: 'RUP con 2 iteraciones. Primera: gramática ANTLR4, visitor y servicio de nomenclatura. Segunda: API REST, CI/CD y frontend integrado al portafolio.',
      fases: [
        { fase: 'inicio',       completada: true, descripcion: 'Definición de gramática química: elementos, subíndices, paréntesis anidados.' },
        { fase: 'elaboracion',  completada: true, descripcion: 'Diseño del visitor ANTLR4 y arquitectura del servicio de nomenclatura.' },
        { fase: 'construccion', completada: true, descripcion: 'Implementación: gramáticas .g4, FormulaVisitor, NomenclaturService, QuizService, REST controllers, Dockerfile, CI/CD.' },
        { fase: 'transicion',   completada: true, descripcion: 'Integración al portafolio como micro-frontend. GitHub Actions → Docker Hub.' },
      ],
    },

    requerimientos: {
      funcionales: [
        { id: 'RF-001', nombre: 'Parseo ANTLR4',         descripcion: 'Tokenizar y parsear fórmulas usando gramática formal.',                  prioridad: 'Alta',  estado: 'Implementado' },
        { id: 'RF-002', nombre: 'Análisis de fórmula',   descripcion: 'Clasificar compuesto y generar nombres IUPAC, Stock y Tradicional.',     prioridad: 'Alta',  estado: 'Implementado' },
        { id: 'RF-003', nombre: 'Validación sintáctica',  descripcion: 'Detectar y reportar errores en fórmulas malformadas.',                  prioridad: 'Alta',  estado: 'Implementado' },
        { id: 'RF-004', nombre: 'Pasos de razonamiento',  descripcion: 'Devolver explicación paso a paso del proceso de nomenclatura.',         prioridad: 'Media', estado: 'Implementado' },
        { id: 'RF-005', nombre: 'Quiz interactivo',       descripcion: 'Generar preguntas y verificar respuestas de nomenclatura.',             prioridad: 'Media', estado: 'Implementado' },
        { id: 'RF-006', nombre: 'API REST',               descripcion: 'Endpoints para analizar, validar y quiz consumibles desde el frontend.', prioridad: 'Alta',  estado: 'Implementado' },
      ],
      no_funcionales: [
        { id: 'RNF-001', categoria: 'Portabilidad',   descripcion: 'Desplegable en cualquier entorno con Docker.',     criterio: 'docker run en una línea'     },
        { id: 'RNF-002', categoria: 'CI/CD',          descripcion: 'Build y push automático en cada push a main.',     criterio: 'GitHub Actions < 5 min'      },
        { id: 'RNF-003', categoria: 'Rendimiento',    descripcion: 'Respuesta del parser < 200ms por fórmula.',        criterio: 'Medición local con curl'      },
        { id: 'RNF-004', categoria: 'Mantenibilidad', descripcion: 'Gramática extensible sin tocar la lógica Java.',   criterio: 'Agregar elemento solo en .g4' },
      ],
    },

    trazabilidad: [
      { rf_id: 'RF-001', caso_uso: 'CU-001', caso_prueba: 'CP-001', estado: 'Verificado' },
      { rf_id: 'RF-002', caso_uso: 'CU-002', caso_prueba: 'CP-002', estado: 'Verificado' },
      { rf_id: 'RF-003', caso_uso: 'CU-003', caso_prueba: 'CP-003', estado: 'Verificado' },
      { rf_id: 'RF-004', caso_uso: 'CU-002', caso_prueba: 'CP-004', estado: 'Verificado' },
      { rf_id: 'RF-005', caso_uso: 'CU-004', caso_prueba: 'CP-005', estado: 'Verificado' },
      { rf_id: 'RF-006', caso_uso: 'CU-001', caso_prueba: 'CP-006', estado: 'Verificado' },
    ],

    diagramas: [
      {
        tipo: 'ARQUITECTURA', titulo: 'Arquitectura del Parser ANTLR4',
        descripcion: 'Flujo de procesamiento de una fórmula química.',
        mermaid: `
flowchart LR
  Input["Fórmula (ej: Ca3(PO4)2)"]
  Lexer["QuimicaLexer .g4"]
  Parser["QuimicaParser .g4"]
  Visitor["FormulaVisitor (Java)"]
  Service["NomenclaturService (Java)"]
  Output["ResultadoAnalisis (JSON)"]
  Input --> Lexer --> Parser --> Visitor --> Service --> Output
        `, imagen: '',
      },
      {
        tipo: 'CASOS_USO', titulo: 'CU — Analizador Químico',
        descripcion: 'Casos de uso del sistema.',
        mermaid: `
graph TD
  U([Estudiante]) --> CU1[Analizar fórmula]
  U --> CU2[Validar fórmula]
  U --> CU3[Responder quiz]
  CU1 --> CU4[Ver pasos de razonamiento]
  CU1 --> CU5[Ver nomenclatura IUPAC / Stock / Tradicional]
        `, imagen: '',
      },
      {
        tipo: 'CLASES', titulo: 'Diagrama de Clases — Backend',
        descripcion: 'Clases principales del sistema.',
        mermaid: `
classDiagram
  class QuimicaController  { +analizarFormula() +validarFormula() +obtenerPregunta() }
  class FormulaVisitor     { +visitFormula() +visitGrupoParentesis() +visitElementoConSubindice() }
  class NomenclaturService { +analizar(atomos, formula) ResultadoAnalisis }
  class ElementosDB        { +esMetal() +esNoMetal() +getEstadosOxidacion() }
  class ResultadoAnalisis  { +nombreIUPAC +nombreStock +nombreTradicional +pasos }
  QuimicaController --> FormulaVisitor
  QuimicaController --> NomenclaturService
  NomenclaturService --> ElementosDB
  NomenclaturService --> ResultadoAnalisis
        `, imagen: '',
      },
    ],

    arquitectura: {
      patron: 'Compiler Pattern + REST API',
      descripcion: 'ANTLR4 genera el lexer y parser desde gramáticas .g4. Un visitor recorre el árbol y produce un Map<String, Integer> de átomos que consume el servicio de nomenclatura. Spring Boot expone todo como REST API. El frontend React vive en el portafolio (Vercel) y hace fetch() a la API desplegada en Dokploy.',
      mermaid: `
graph TB
  subgraph Vercel["Portafolio (Vercel)"]
    React["React — QuimicaAnalizador"]
  end
  subgraph Dokploy["Servidor (Dokploy)"]
    API["Spring Boot REST API"]
    ANTLR["ANTLR4 Parser"]
  end
  subgraph CICD["CI/CD"]
    GHA["GitHub Actions"]
    DH["Docker Hub"]
  end
  React -->|fetch JSON| API
  API --> ANTLR
  GHA -->|push image| DH
  DH -->|pull and deploy| Dokploy
      `, imagen: '',
      decisiones: [
        { decision: 'ANTLR4 sobre parsing manual',  razon: 'Gramática formal extensible — agregar elementos solo requiere editar el .g4.',  alternativas: 'Regex, parser manual' },
        { decision: 'Visitor pattern',              razon: 'Separación limpia entre gramática (ANTLR) y lógica de negocio (Java).',          alternativas: 'Listener pattern'     },
        { decision: 'Sin base de datos',            razon: 'Todo en memoria — sin estado persistente, despliegue más simple.',               alternativas: 'H2, PostgreSQL'       },
        { decision: 'Docker + GitHub Actions',      razon: 'Reproducibilidad y despliegue automático en cada push sin intervención manual.', alternativas: 'JAR manual'           },
      ],
    },

    patrones: [
      { nombre: 'Visitor',            categoria: 'Compiler Pattern', uso: 'Recorre el árbol ANTLR y extrae átomos sin modificar la gramática.'        },
      { nombre: 'Builder',            categoria: 'Creacional',       uso: 'Construcción de ResultadoAnalisis y PreguntaQuiz sin Lombok.'               },
      { nombre: 'Strategy implícita', categoria: 'Comportamental',   uso: 'NomenclaturService selecciona el algoritmo según tipo de compuesto.'        },
      { nombre: 'Lazy Loading',       categoria: 'Performance',      uso: 'App cargada solo al navegar a /software/quimica-analizador/app.'            },
    ],

    ciclo_vida: {
      descripcion: 'Desarrollo en 3 semanas con 2 iteraciones RUP.',
      hitos: [
        { fecha: '2026-02', fase: 'Inicio',       descripcion: 'Definición de gramática y alcance del parser.'     },
        { fecha: '2026-02', fase: 'Elaboración',  descripcion: 'Gramáticas .g4, visitor y servicio de nomenclatura.' },
        { fecha: '2026-03', fase: 'Construcción', descripcion: 'API REST, CI/CD con GitHub Actions y Docker Hub.'   },
        { fecha: '2026-03', fase: 'Transición',   descripcion: 'Integración al portafolio como micro-frontend.'     },
      ],
    },
  },
  // ← aquí continúa el resto de SOFTWARE_DATA (cumpleanos-amiga, sistema-gestion-laboratorio...)
  // ── 2. Sistema de Gestión de Laboratorio ────────────────────────────────
  {
    id:         'sistema-gestion-laboratorio',
    nombre:     'Sistema de Gestión de Laboratorio',
    tagline:    'Control de prácticas, equipos y estudiantes para laboratorios de ingeniería',
    screenshot: 'https://assets.mauricionoj.com/projects/sw-laboratorio.jpg',
    estado:     'COMPLETADO',
    año:        2025,
    tags:       ['web', 'react', 'node', 'mysql', 'RUP', 'MVC'],

    app: {
      activa:       true,
      tipo:         'fullstack-externo',
      api_base_url: 'https://api-laboratorio.tudominio.com', // ← reemplazar con URL Dokploy/DO
      componente:   'SistemaInventario',
    },

    demo: {
      youtube_id:  'REEMPLAZAR_CON_ID_REAL',
      descripcion: 'Demo completo: registro de prácticas, asignación de equipos y reportes PDF.',
    },

    stack: {
      frontend:   ['React', 'CSS Modules', 'Vite'],
      backend:    ['Node.js', 'Express'],
      base_datos: ['MySQL 8'],
      otros:      ['JWT', 'Cloudflare R2', 'Dokploy'],
    },

    descripcion: 'Sistema web para gestión integral de laboratorios de ingeniería. Administra prácticas, equipos, asistencia y genera reportes académicos.',
    problema:    'Prácticas y equipos manejados en hojas de cálculo dispersas — pérdida de información y reportes difíciles.',
    solucion:    'Sistema centralizado con roles diferenciados, inventario en tiempo real y reportes exportables.',

    metodologia: {
      nombre:      'RUP',
      fase_actual: 'transicion',
      iteraciones: 3,
      duracion:    '4 meses',
      equipo:      1,
      rol_autor:   'Analista / Diseñador / Desarrollador',
      descripcion: 'RUP con 3 iteraciones. Inicio: requerimientos. Elaboración: arquitectura y UML. Construcción: módulos por prioridad. Transición: pruebas y despliegue.',
      fases: [
        { fase: 'inicio',       completada: true, descripcion: 'Levantamiento de requerimientos con docentes. Identificación de stakeholders.' },
        { fase: 'elaboracion',  completada: true, descripcion: 'Arquitectura MVC, diagramas UML completos, prototipo de interfaz aprobado.' },
        { fase: 'construccion', completada: true, descripcion: 'Módulos: autenticación, prácticas, equipos, asistencia, reportes PDF.' },
        { fase: 'transicion',   completada: true, descripcion: 'Pruebas de aceptación con 5 docentes. Despliegue en Dokploy.' },
      ],
    },

    requerimientos: {
      funcionales: [
        { id: 'RF-AUTH-001', nombre: 'Autenticación',          descripcion: 'Inicio de sesión con credenciales únicas por rol.',           prioridad: 'Alta',  estado: 'Implementado' },
        { id: 'RF-AUTH-002', nombre: 'Gestión de roles',       descripcion: 'Permisos diferenciados: admin, docente, estudiante.',         prioridad: 'Alta',  estado: 'Implementado' },
        { id: 'RF-PRAC-001', nombre: 'Registro de prácticas',  descripcion: 'Crear, editar y eliminar prácticas de laboratorio.',         prioridad: 'Alta',  estado: 'Implementado' },
        { id: 'RF-PRAC-002', nombre: 'Asignación estudiantes', descripcion: 'Asignar estudiantes a grupos de práctica.',                  prioridad: 'Alta',  estado: 'Implementado' },
        { id: 'RF-EQUIP-001',nombre: 'Inventario de equipos',  descripcion: 'Registrar y actualizar estado de cada equipo.',              prioridad: 'Media', estado: 'Implementado' },
        { id: 'RF-REP-001',  nombre: 'Reportes PDF',           descripcion: 'Generar reportes de asistencia y equipos en PDF.',           prioridad: 'Media', estado: 'Implementado' },
        { id: 'RF-ASIST-001',nombre: 'Control asistencia',     descripcion: 'Registrar asistencia de estudiantes por práctica.',          prioridad: 'Baja',  estado: 'Implementado' },
      ],
      no_funcionales: [
        { id: 'RNF-001', categoria: 'Rendimiento',    descripcion: 'Respuesta en menos de 2 segundos.',    criterio: 'Lighthouse > 85' },
        { id: 'RNF-002', categoria: 'Seguridad',      descripcion: 'Bcrypt + JWT.',                        criterio: 'OWASP Top 10' },
        { id: 'RNF-003', categoria: 'Disponibilidad', descripcion: '99% uptime en horario académico.',     criterio: 'Monitor mensual' },
        { id: 'RNF-004', categoria: 'Escalabilidad',  descripcion: '200 usuarios concurrentes.',           criterio: 'Test de carga k6' },
      ],
    },

    trazabilidad: [
      { rf_id: 'RF-AUTH-001', caso_uso: 'CU-001', caso_prueba: 'CP-001', estado: 'Verificado' },
      { rf_id: 'RF-AUTH-002', caso_uso: 'CU-001', caso_prueba: 'CP-002', estado: 'Verificado' },
      { rf_id: 'RF-PRAC-001', caso_uso: 'CU-002', caso_prueba: 'CP-003', estado: 'Verificado' },
      { rf_id: 'RF-PRAC-002', caso_uso: 'CU-003', caso_prueba: 'CP-004', estado: 'Verificado' },
      { rf_id: 'RF-EQUIP-001',caso_uso: 'CU-004', caso_prueba: 'CP-005', estado: 'Verificado' },
      { rf_id: 'RF-REP-001',  caso_uso: 'CU-006', caso_prueba: 'CP-006', estado: 'Verificado' },
      { rf_id: 'RF-ASIST-001',caso_uso: 'CU-003', caso_prueba: 'CP-007', estado: 'Verificado' },
    ],

    diagramas: [
      {
        tipo: 'CASOS_USO', titulo: 'CU — Módulo Autenticación',
        descripcion: 'Actores y casos de uso del módulo de autenticación.',
        mermaid: `
graph TD
  Admin([Administrador]) --> CU1[Iniciar sesión]
  Admin --> CU4[Gestionar usuarios]
  Docente([Docente]) --> CU1
  Estudiante([Estudiante]) --> CU1
  Admin --> CU2[Cerrar sesión]
  Docente --> CU2
  Estudiante --> CU2
        `, imagen: '',
      },
      {
        tipo: 'CLASES', titulo: 'Diagrama de Clases — Dominio',
        descripcion: 'Clases principales con relaciones.',
        mermaid: `
classDiagram
  class Usuario { +id: int; +nombre: string; +rol: Rol }
  class Practica { +id: int; +nombre: string; +fecha: date }
  class Equipo { +id: int; +codigo: string; +estado: string }
  class Asistencia { +id: int; +presente: boolean }
  Usuario "1" --> "*" Asistencia
  Practica "1" --> "*" Asistencia
  Practica "1" --> "*" Equipo
        `, imagen: '',
      },
      {
        tipo: 'SECUENCIA', titulo: 'Secuencia — Registro de Práctica',
        descripcion: 'Flujo para registrar una nueva práctica.',
        mermaid: `
sequenceDiagram
  actor Docente
  participant UI as React
  participant API as Express
  participant DB as MySQL
  Docente->>UI: Nueva Práctica
  UI->>API: POST /practicas + JWT
  API->>DB: INSERT practica
  DB-->>API: practica_id
  API-->>UI: 201 Created
  UI-->>Docente: Confirmación
        `, imagen: '',
      },
    ],

    arquitectura: {
      patron: 'MVC — Model View Controller',
      descripcion: 'React SPA en portafolio (Vercel) hace fetch() a Express API desplegada en Dokploy. MySQL en el mismo servidor. Archivos en Cloudflare R2.',
      mermaid: `
graph TB
  subgraph Vercel["Portafolio (Vercel)"]
    React[React Frontend]
  end
  subgraph Dokploy["Servidor (Dokploy)"]
    API[Express API]
    DB[(MySQL 8)]
  end
  React -->|fetch + JWT| API
  API --> DB
      `, imagen: '',
      decisiones: [
        { decision: 'Frontend en portafolio, API en Dokploy', razon: 'Separación clara: portafolio = UI, servidor = lógica.',      alternativas: 'Next.js fullstack' },
        { decision: 'MySQL',                                   razon: 'Datos relacionales fuertes.',                               alternativas: 'PostgreSQL, MongoDB' },
        { decision: 'JWT',                                     razon: 'Stateless, compatible con frontend separado.',              alternativas: 'Sessions, OAuth2' },
      ],
    },

    patrones: [
      { nombre: 'Repository',     categoria: 'Arquitectural', uso: 'Abstracción de acceso a datos por entidad.' },
      { nombre: 'Singleton',      categoria: 'Creacional',    uso: 'Conexión única a MySQL.' },
      { nombre: 'Factory Method', categoria: 'Creacional',    uso: 'Reportes PDF con diferentes plantillas.' },
      { nombre: 'MVC',            categoria: 'Arquitectural', uso: 'Separación de presentación, lógica y datos.' },
    ],

    ciclo_vida: {
      descripcion: 'RUP con 3 iteraciones en Construcción. Cada una entregó un módulo funcional.',
      hitos: [
        { fecha: '2025-01', fase: 'Inicio',           descripcion: 'Reunión con docentes. 7 RF y 4 RNF levantados.' },
        { fecha: '2025-02', fase: 'Elaboración',      descripcion: 'Arquitectura MVC, UML, prototipo aprobado.' },
        { fecha: '2025-02', fase: 'Construcción I',   descripcion: 'Autenticación y roles.' },
        { fecha: '2025-03', fase: 'Construcción II',  descripcion: 'Prácticas, grupos y asistencia.' },
        { fecha: '2025-03', fase: 'Construcción III', descripcion: 'Equipos y reportes PDF.' },
        { fecha: '2025-04', fase: 'Transición',       descripcion: 'Pruebas con 5 docentes. Despliegue Dokploy.' },
      ],
    },
  },
];

export const getSoftwareById  = (id)  => SOFTWARE_DATA.find(s => s.id === id);
export const getAllSoftware    = ()    => SOFTWARE_DATA;
export const getSoftwareByTag = (tag) => SOFTWARE_DATA.filter(s => s.tags.includes(tag));