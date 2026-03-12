// src/models/project-logs.data.js
// Sistema de bloques para documentar el proceso de cada proyecto.
//
// TIPOS DE BLOQUE DISPONIBLES:
// ─────────────────────────────────────────────────────────────────
//  { type: 'phase',    label: 'Fase 1 — Teoría' }
//  { type: 'text',     content: 'Explicación en texto...' }
//  { type: 'formula',  content: '$V = IR$',  caption: 'Ley de Ohm' }
//  { type: 'code',     lang: 'python',  label: 'main.py',  content: `...` }
//  { type: 'image',    src: '/fotos/ohm.jpg',  caption: 'Protoboard armado' }
//  { type: 'result',   content: 'μ = 0.32 → error 4.2%' }
//  { type: 'warning',  content: 'Ojo: el LM7805 se calienta mucho.' }
//  { type: 'tip',      content: 'Truco: mide primero sin carga.' }
//  { type: 'table',    headers: ['R (Ω)', 'I teórico', 'I medido'], rows: [[...],[...]] }
//  { type: 'divider' }
// ─────────────────────────────────────────────────────────────────

export const projectLogs = {

  // ──────────────────────────────────────────────────────────────
  // E01 — Ley de Ohm
  // ──────────────────────────────────────────────────────────────
  "E01": {
    status: "pendiente",
    lastUpdated: null,
    blocks: [
      {
        type: "phase",
        label: "Fase 1 — Cálculo Teórico"
      },
      {
        type: "text",
        content: "Antes de tocar cualquier componente, calculamos los valores teóricos. El objetivo es tener una predicción clara para después comparar con la medición real."
      },
      {
        type: "formula",
        content: "$$I = \\frac{V}{R}$$",
        caption: "Corriente para cada resistencia a V = 5V"
      },
      {
        type: "table",
        headers: ["R nominal (Ω)", "I teórico (mA)", "P disipada (mW)"],
        rows: [
          ["100",   "50.0",  "250.0"],
          ["220",   "22.7",  "113.6"],
          ["470",   "10.6",   "53.2"],
          ["1000",   "5.0",   "25.0"],
          ["4700",   "1.06",   "5.3"],
        ]
      },
      {
        type: "tip",
        content: "Agrega aquí los valores reales una vez que los midas con el multímetro."
      },
      {
        type: "phase",
        label: "Fase 2 — Armado en Protoboard"
      },
      {
        type: "text",
        content: "Pendiente: fotografías del armado y mediciones reales."
      },
    ]
  },

  // ──────────────────────────────────────────────────────────────
  // TTL01 — Tablas de Verdad
  // ──────────────────────────────────────────────────────────────
  "TTL01": {
    status: "pendiente",
    lastUpdated: null,
    blocks: [
      {
        type: "phase",
        label: "Fase 1 — Teoría: Álgebra de Boole"
      },
      {
        type: "text",
        content: "Las compuertas lógicas TTL implementan físicamente el álgebra de Boole. Cada compuerta es un circuito integrado que procesa voltajes: <0.8V = 0 lógico, >2V = 1 lógico."
      },
      {
        type: "table",
        headers: ["Compuerta", "IC", "Expresión", "Descripción"],
        rows: [
          ["AND",  "74LS08", "Y = A · B",       "1 solo si ambas entradas son 1"],
          ["OR",   "74LS32", "Y = A + B",       "0 solo si ambas entradas son 0"],
          ["NOT",  "74LS04", "Y = Ā",           "Invierte la entrada"],
          ["NAND", "74LS00", "Y = A · B con barra", "Universal — puede construir todo"],
          ["XOR",  "74LS86", "Y = A ⊕ B",       "1 si las entradas son distintas"],
        ]
      },
      {
        type: "tip",
        content: "Agrega aquí las fotografías del circuito real y los resultados de cada tabla de verdad una vez que lo construyas."
      },
    ]
  },
};

// Helper: obtener el log de un proyecto por id
export const getProjectLog = (id) => projectLogs[id] ?? null;