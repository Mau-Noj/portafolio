// src/models/project-logs.data.js
//
// TIPOS DE BLOQUE DISPONIBLES:
// ─────────────────────────────────────────────────────────────────
//  { type: 'phase',    label: 'Fase 1 — Teoría' }
//  { type: 'text',     content: 'Texto con soporte LaTeX' }
//  { type: 'formula',  content: '$V = IR$', caption: 'Ley de Ohm' }
//  { type: 'code',     lang: 'python', label: 'main.py', content: `...` }
//
//  // Imagen APA 7:
//  { type: 'image',
//    src: '/fotos/foto.jpg',
//    figureNum: 1,
//    title: 'Título descriptivo de la imagen.',
//    note: 'Fuente. Autor, año. Licencia.' }
//
//  // Tabla APA 7:
//  { type: 'table',
//    tableNum: 1,
//    title: 'Título descriptivo de la tabla',
//    headers: ['Col 1', 'Col 2'],
//    rows: [[...], [...]],
//    note: 'Nota aclaratoria si es necesaria.' }
//
//  { type: 'result',   content: 'μ = 0.32 → error 4.2%' }
//  { type: 'warning',  content: 'El LM7805 se calienta.' }
//  { type: 'tip',      content: 'Mide primero sin carga.' }
//  { type: 'divider' }
// ─────────────────────────────────────────────────────────────────

export const projectLogs = {
  // ──────────────────────────────────────────────────────────────
  // E01 — Ley de Ohm
  // ──────────────────────────────────────────────────────────────
  E01: {
    status: "pendiente",
    lastUpdated: null,
    blocks: [
      {
        type: "phase",
        label: "Fase 1 — Cálculo Teórico",
      },
      {
        type: "text",
        content:
          "Antes de tocar cualquier componente, calculamos los valores teóricos. El objetivo es tener una predicción clara para después comparar con la medición real.",
      },
      {
        type: "formula",
        content: "$$I = \\frac{V}{R}$$",
        caption: "Corriente para cada resistencia a V = 5V",
      },
      {
        type: "table",
        tableNum: 1,
        title:
          "Valores teóricos de corriente y potencia para diferentes resistencias a V = 5V",
        headers: ["R nominal (Ω)", "I teórico (mA)", "P disipada (mW)"],
        rows: [
          ["100", "50.0", "250.0"],
          ["220", "22.7", "113.6"],
          ["470", "10.6", "53.2"],
          ["1000", "5.0", "25.0"],
          ["4700", "1.06", "5.3"],
        ],
        note: "Los valores fueron calculados aplicando la Ley de Ohm (V = IR) con V = 5V constante. La potencia se obtuvo con P = V²/R.",
      },
      {
        type: "tip",
        content:
          "Agrega aquí los valores reales una vez que los midas con el multímetro.",
      },
      {
        type: "phase",
        label: "Fase 2 — Armado en Protoboard",
      },
      {
        type: "text",
        content:
          "Pendiente: fotografías del armado y mediciones reales. Ejemplo de cómo agregar una imagen:",
      },
      // Ejemplo de imagen APA 7 — descomenta cuando tengas la foto:
      // {
      //   type: "image",
      //   src: "/fotos/e01-protoboard.jpg",
      //   figureNum: 1,
      //   title: "Circuito de prueba con resistencia de 1 kΩ conectado a fuente LM7805.",
      //   note: "Fotografía propia. Elaboración propia, 2024."
      // },
    ],
  },

  // ──────────────────────────────────────────────────────────────
  // TTL01 — Tablas de Verdad
  // ──────────────────────────────────────────────────────────────
  TTL01: {
    status: "pendiente",
    lastUpdated: null,
    blocks: [
      {
        type: "phase",
        label: "Fase 1 — Teoría: Álgebra de Boole",
      },
      {
        type: "text",
        content:
          "Las compuertas lógicas TTL implementan físicamente el álgebra de Boole. Cada compuerta es un circuito integrado que procesa voltajes: <0.8V = 0 lógico, >2V = 1 lógico.",
      },
      {
        type: "table",
        tableNum: 1,
        title: "Comparación de compuertas lógicas TTL de la familia 74LS",
        headers: ["Compuerta", "IC", "Expresión", "Descripción"],
        rows: [
          ["AND", "74LS08", "Y = A · B", "1 solo si ambas entradas son 1"],
          ["OR", "74LS32", "Y = A + B", "0 solo si ambas entradas son 0"],
          ["NOT", "74LS04", "Y = Ā", "Invierte la entrada"],
          ["NAND", "74LS00", "Y = A·B̄", "Universal — puede construir todo"],
          ["XOR", "74LS86", "Y = A ⊕ B", "1 si las entradas son distintas"],
        ],
        note: "Todos los ICs operan con alimentación de 5V DC. La compuerta NAND es funcionalmente completa, lo que significa que puede implementar cualquier función lógica.",
      },
      {
        type: "tip",
        content:
          "Agrega aquí las fotografías del circuito real y los resultados de cada tabla de verdad una vez que lo construyas.",
      },
    ],
  },
};

export const getProjectLog = (id) => projectLogs[id] ?? null;
