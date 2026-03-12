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

  // ── 1. Carta Novia ───────────────────────────────────────────────────────
  {
    id:         'carta-novia',
    nombre:     'Carta para mi novia',
    tagline:    'Una carta digital interactiva — porque soy ingeniero y así lo digo',
    screenshot: 'https://assets.mauricionoj.com/projects/sw-carta-novia.jpg',
    estado:     'COMPLETADO',
    año:        2024,
    tags:       ['react', 'css', 'frontend-puro', 'personal'],

    app: {
      activa:       true,
      tipo:         'frontend-puro',
      api_base_url: '',
      componente:   'CartaNovia',
    },

    demo: {
      youtube_id:  '',
      descripcion: 'Carta digital interactiva con tres secciones: carta, momentos y promesas.',
    },

    stack: {
      frontend:   ['React', 'CSS', 'Vite'],
      backend:    [],
      base_datos: [],
      otros:      [],
    },

    descripcion: 'Proyecto personal — carta digital interactiva en React. Incluye carta tipografiada, galería de momentos y promesas interactivas que se revelan al tocarlas.',
    problema:    'Las palabras en voz alta a veces se quedan pequeñas.',
    solucion:    'Construir algo para decirlo de la forma que mejor sé.',

    metodologia: {
      nombre:      'RUP',
      fase_actual: 'transicion',
      iteraciones: 1,
      duracion:    '2 días',
      equipo:      1,
      rol_autor:   'Diseñador / Desarrollador',
      descripcion: 'Proyecto de alcance mínimo. Una iteración completa desde concepto hasta despliegue.',
      fases: [
        { fase: 'inicio',       completada: true, descripcion: 'Definición del concepto y estructura de secciones.' },
        { fase: 'elaboracion',  completada: true, descripcion: 'Diseño visual — paleta oscura, tipografía Playfair Display.' },
        { fase: 'construccion', completada: true, descripcion: 'Implementación de 3 secciones con animaciones CSS.' },
        { fase: 'transicion',   completada: true, descripcion: 'Integración al portafolio y entrega.' },
      ],
    },

    requerimientos: {
      funcionales: [
        { id: 'RF-001', nombre: 'Carta tipografiada',        descripcion: 'Carta con animación de entrada y fecha dinámica.',           prioridad: 'Alta',  estado: 'Implementado' },
        { id: 'RF-002', nombre: 'Galería de momentos',       descripcion: 'Grid de tarjetas con momentos y descripción.',               prioridad: 'Alta',  estado: 'Implementado' },
        { id: 'RF-003', nombre: 'Promesas interactivas',     descripcion: 'Promesas ocultas que se revelan al tocar.',                  prioridad: 'Media', estado: 'Implementado' },
        { id: 'RF-004', nombre: 'Navegación interna',        descripcion: 'Navbar con 3 secciones y estado activo.',                   prioridad: 'Alta',  estado: 'Implementado' },
        { id: 'RF-005', nombre: 'Botón regreso a docs',      descripcion: 'Botón flotante para volver a documentación del proyecto.',  prioridad: 'Alta',  estado: 'Implementado' },
      ],
      no_funcionales: [
        { id: 'RNF-001', categoria: 'Rendimiento', descripcion: 'Carga en menos de 1 segundo.',  criterio: 'Sin imágenes externas' },
        { id: 'RNF-002', categoria: 'Usabilidad',  descripcion: 'Funcional en móvil.',           criterio: 'Responsive desde 320px' },
        { id: 'RNF-003', categoria: 'Estética',    descripcion: 'Paleta oscura elegante.',       criterio: 'Playfair Display + Lato' },
      ],
    },

    trazabilidad: [
      { rf_id: 'RF-001', caso_uso: 'CU-001', caso_prueba: 'CP-001', estado: 'Verificado' },
      { rf_id: 'RF-002', caso_uso: 'CU-002', caso_prueba: 'CP-002', estado: 'Verificado' },
      { rf_id: 'RF-003', caso_uso: 'CU-003', caso_prueba: 'CP-003', estado: 'Verificado' },
      { rf_id: 'RF-004', caso_uso: 'CU-001', caso_prueba: 'CP-004', estado: 'Verificado' },
      { rf_id: 'RF-005', caso_uso: 'CU-001', caso_prueba: 'CP-005', estado: 'Verificado' },
    ],

    diagramas: [
      {
        tipo:        'COMPONENTES',
        titulo:      'Diagrama de Componentes React',
        descripcion: 'Estructura de componentes del proyecto.',
        mermaid: `
graph TD
  Shell[SoftwareApp Shell]
  App[CartaNovia App]
  Nav[NavInterna]
  SC[SeccionCarta]
  SM[SeccionMomentos]
  SP[SeccionPromesas]
  Shell -->|lazy load| App
  App --> Nav
  App --> SC
  App --> SM
  App --> SP
        `,
        imagen: '',
      },
    ],

    arquitectura: {
      patron:      'SPA — Single Page Application',
      descripcion: 'Frontend puro sin backend. Estado con React useState. Desplegado dentro del portafolio principal en Vercel. Sin llamadas a API externas.',
      mermaid: `
graph LR
  subgraph Vercel["Portafolio (Vercel)"]
    Shell[SoftwareApp Shell]
    App[CartaNovia Component]
  end
  Usuario([Usuario]) --> Shell
  Shell --> App
      `,
      imagen: '',
      decisiones: [
        { decision: 'Sin backend',             razon: 'Contenido estático. No requiere persistencia.',                    alternativas: 'Firebase, localStorage' },
        { decision: 'Playfair Display',        razon: 'Serif elegante para atmósfera romántica.',                         alternativas: 'Cormorant, EB Garamond' },
        { decision: 'Embebido en portafolio',  razon: 'Arquitectura micro-frontend — cada proyecto vive en el portafolio.', alternativas: 'Subdominio separado' },
      ],
    },

    patrones: [
      { nombre: 'Componentes controlados', categoria: 'React Pattern', uso: 'Estado de sección activa con useState en componente padre.' },
      { nombre: 'Lazy Loading',            categoria: 'Performance',   uso: 'Cargado solo al navegar a /software/carta-novia/app.' },
    ],

    ciclo_vida: {
      descripcion: 'Proyecto de ciclo corto — concepto a producción en 2 días.',
      hitos: [
        { fecha: '2024-02', fase: 'Concepto',    descripcion: 'Idea: carta digital como proyecto de ingeniería personal.' },
        { fecha: '2024-02', fase: 'Diseño',      descripcion: 'Paleta oscura dorada, tipografía, estructura de secciones.' },
        { fecha: '2024-02', fase: 'Desarrollo',  descripcion: 'Implementación completa con animaciones CSS.' },
        { fecha: '2024-02', fase: 'Despliegue',  descripcion: 'Integrado al portafolio y entregado.' },
      ],
    },
  },

  //---2. Carta de cumpleaños para una amiga
  {
  id:         'cumpleanos-amiga',
  nombre:     'Cumpleaños de mi Amiga',
  tagline:    'Una sorpresa digital para celebrar a alguien especial',
  screenshot: 'https://assets.mauricionoj.com/projects/sw-cumpleanos.jpg',
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