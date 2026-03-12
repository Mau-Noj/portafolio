// src/models/software.model.js
// Modelo de datos para proyectos de software — Análisis y Diseño de Sistemas

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

/**
 * @typedef {Object} SoftwareProject
 */
export const SoftwareProjectSchema = {
  // ── Identificación ──────────────────────────────
  id:           '',        // slug: 'sistema-inventario-usac'
  nombre:       '',        // 'Sistema de Inventario USAC'
  tagline:      '',        // una línea: 'Control de activos para laboratorios'
  screenshot:   '',        // URL R2: assets.mauricionoj.com/projects/sw-xxx.jpg
  estado:       'ACTIVO',  // clave de ESTADOS
  año:          2025,
  tags:         [],        // ['web', 'java', 'mysql', 'RUP']

  // ── Demo ────────────────────────────────────────
  demo: {
    youtube_id:  '',       // ID del video: 'dQw4w9WgXcQ'
    descripcion: '',       // 'Demo de flujo completo del sistema'
  },

  // ── Stack tecnológico ───────────────────────────
  stack: {
    frontend:  [],         // ['React', 'CSS', 'Vite']
    backend:   [],         // ['Java', 'Spring Boot']
    base_datos:[],         // ['MySQL', 'Redis']
    otros:     [],         // ['Docker', 'Nginx']
  },

  // ── Descripción ─────────────────────────────────
  descripcion:  '',
  problema:     '',        // qué problema resuelve
  solucion:     '',        // cómo lo resuelve

  // ── Metodología RUP ─────────────────────────────
  metodologia: {
    nombre:         'RUP',
    fase_actual:    'construccion',  // id de FASES_RUP
    iteraciones:    0,
    duracion:       '',              // '3 meses'
    equipo:         0,               // número de personas
    rol_autor:      '',              // 'Analista / Arquitecto'
    descripcion:    '',
    fases: [
      // { fase: 'inicio', completada: true, descripcion: '...' }
    ],
  },

  // ── Requerimientos ──────────────────────────────
  requerimientos: {
    funcionales: [
      // { id: 'RF-001', nombre: '', descripcion: '', prioridad: 'Alta', estado: 'Implementado' }
    ],
    no_funcionales: [
      // { id: 'RNF-001', categoria: 'Rendimiento', descripcion: '', criterio: '' }
    ],
  },

  // ── Matriz de trazabilidad ──────────────────────
  trazabilidad: [
    // { rf_id: 'RF-001', caso_uso: 'CU-001', caso_prueba: 'CP-001', estado: 'Verificado' }
  ],

  // ── Diagramas UML ───────────────────────────────
  diagramas: [
    // {
    //   tipo: 'CASOS_USO',        // clave de TIPO_DIAGRAMA
    //   titulo: 'CU — Módulo de autenticación',
    //   descripcion: '',
    //   mermaid: '',              // código Mermaid.js (si aplica)
    //   imagen: '',               // URL R2 (si es imagen)
    // }
  ],

  // ── Arquitectura ────────────────────────────────
  arquitectura: {
    patron:      '',    // 'MVC', 'Microservicios', 'Monolítico', 'Hexagonal'
    descripcion: '',
    mermaid:     '',    // diagrama de arquitectura en Mermaid
    imagen:      '',    // URL R2 alternativa
    decisiones: [
      // { decision: '', razon: '', alternativas: '' }
    ],
  },

  // ── Patrones de diseño ──────────────────────────
  patrones: [
    // { nombre: 'Singleton', categoria: 'Creacional', uso: 'Gestión de conexión BD', archivo: '' }
  ],

  // ── Ciclo de vida ───────────────────────────────
  ciclo_vida: {
    descripcion: '',
    hitos: [
      // { fecha: '2025-01', fase: 'Inicio', descripcion: 'Levantamiento de requerimientos' }
    ],
  },
};