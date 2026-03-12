// src/models/components.model.js
// Modelo de datos para componentes electrónicos/ambientales

export const TOXICIDAD = {
  BAJO:  { label: 'Bajo',  color: '#16a34a', icon: '●' },
  MEDIO: { label: 'Medio', color: '#f59e0b', icon: '●' },
  ALTO:  { label: 'Alto',  color: '#dc2626', icon: '●' },
};

export const CATEGORIAS = [
  { id: 'pasivos',    label: 'Pasivos',     icon: '⏚',  desc: 'Resistencias, capacitores, inductores' },
  { id: 'activos',    label: 'Activos',     icon: '⚡',  desc: 'Transistores, diodos, CIs' },
  { id: 'sensores',   label: 'Sensores',    icon: '◎',  desc: 'Temperatura, humedad, gases, luz' },
  { id: 'quimicos',   label: 'Químicos',    icon: '⬡',  desc: 'Ácidos, soldaduras, flux' },
  { id: 'mecanicos',  label: 'Mecánicos',   icon: '⌖',  desc: 'Conectores, switches, relés' },
  { id: 'potencia',   label: 'Potencia',    icon: '◈',  desc: 'Reguladores, MOSFETs, drivers' },
];

/**
 * Estructura completa de un componente
 * @typedef {Object} Componente
 */
export const ComponenteSchema = {
  // ── Identificación ──────────────────────────────
  id:           '',          // slug único: 'resistencia-carbon-10k'
  nombre:       '',          // 'Resistencia de Carbón 10kΩ'
  imagen:       '',          // URL en R2: assets.mauricionoj.com/components/xxx.jpg
  categoria:    '',          // id de CATEGORIAS
  subcategoria: '',          // 'Resistencias de carbón'
  tags:         [],          // ['pasivo', 'resistencia', 'through-hole']

  // ── Descripción ─────────────────────────────────
  descripcion:  '',

  // ── Specs técnicas (tabla dinámica) ─────────────
  specs: {},
  // Ejemplos por categoría:
  // Resistencia: { resistencia: '10kΩ', tolerancia: '±5%', potencia: '0.25W', temp_coef: '±200ppm/°C' }
  // Capacitor:   { capacitancia: '100µF', voltaje: '25V', tipo: 'Electrolítico', esr: '0.5Ω' }
  // Transistor:  { tipo: 'NPN', Vce: '40V', Ic: '600mA', hFE: '100-300', frecuencia: '300MHz' }

  // ── Recursos ────────────────────────────────────
  datasheet_url:  '',        // URL al PDF del datasheet
  precio_aprox:   '',        // 'Q0.50 / $0.05'

  // ── Proyectos relacionados ───────────────────────
  proyectos: [],             // array de IDs de proyectos

  // ── Química ─────────────────────────────────────
  formula_quimica:  '',      // 'C (grafito)', 'SiO₂', 'Al₂O₃'
  composicion:      '',      // descripción de materiales

  // ── Toxicidad ───────────────────────────────────
  toxicidad:        'BAJO',  // 'BAJO' | 'MEDIO' | 'ALTO'
  toxicidad_notas:  '',      // detalles sobre la toxicidad

  // ── Huella ambiental ────────────────────────────
  origen_material:      '',  // 'Arena de cuarzo (SiO₂), minas de California'
  huella_carbono:       0,   // gramos de CO₂ en fabricación
  reciclabilidad:       0,   // % recuperable (0-100)
  conflicto_minerales:  false,
  conflicto_detalle:    '',  // descripción si aplica
  alternativa_verde:    '',  // 'Usar resistencia de película metálica'
  vida_util:            '',  // '25 años en condiciones normales'
  disposicion:          '',  // 'Reciclaje electrónico certificado'

  // ── Normativas ──────────────────────────────────
  rohs:   false,
  reach:  false,
  weee:   false,

  // ── Perspectiva Dual ────────────────────────────
  punto_conexion: '',        // párrafo que une electrónica + ambiental
};