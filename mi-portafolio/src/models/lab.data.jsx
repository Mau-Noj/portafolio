// src/models/lab.data.jsx
// Requiere: npm install katex
import React from 'react';
import { MathText } from '../components/MathText';

/* ─────────────────────────────────────────────────────────────
   HELPERS INTERNOS
───────────────────────────────────────────────────────────── */

/** Bloque de fórmula display (centrado, destacado con color de categoría) */
const Formula = ({ tex, color }) => (
  <div className="lab-formula-block" style={{ '--mc': color }}>
    <MathText text={`$$${tex}$$`} />
  </div>
);

/** Fórmula inline dentro de texto */
const F = ({ tex }) => <MathText text={`$${tex}$`} />;

/** Grid de resultados de la calculadora */
const ResultGrid = ({ results, color }) => (
  <div className="lab-results">
    {results.map((r, i) => (
      <div
        key={i}
        className={`lab-result-item ${r.good === true ? 'good' : r.good === false ? 'bad' : ''}`}
        style={{ '--mc': color }}
      >
        <span className="lab-result-label">{r.label}</span>
        <span className="lab-result-value">{r.value}</span>
      </div>
    ))}
  </div>
);

/** Tabla de pasos / iteraciones */
const StepTable = ({ rows, headers, color }) => (
  <div className="lab-table-wrap" style={{ '--mc': color }}>
    <table className="lab-table">
      <thead>
        <tr>{headers.map(h => <th key={h}>{h}</th>)}</tr>
      </thead>
      <tbody>
        {rows.map((row, i) => (
          <tr key={i}>{row.map((cell, j) => <td key={j}>{cell}</td>)}</tr>
        ))}
      </tbody>
    </table>
  </div>
);

/* ─────────────────────────────────────────────────────────────
   DATOS
───────────────────────────────────────────────────────── */
export const LAB_TOOLS = [

  /* ══════════════════════════════════════════════════════════
     VPN & TIR
  ══════════════════════════════════════════════════════════ */
  {
    id: 'vpn',
    category: 'Ing. Económica',
    categoryColor: '#4B8EFF',
    icon: '📈',
    title: 'VPN & TIR',
    subtitle: 'Valor Presente Neto y Tasa Interna de Retorno',
    desc: 'Evalúa la viabilidad financiera de un proyecto ingresando los flujos de caja y la tasa de descuento.',
    tags: ['VPN', 'TIR', 'Flujos de Caja'],

    /* ── Artículo ── */
    article: (
      <>
        <h3>¿Qué es el VPN?</h3>
        <p>
          El <strong>Valor Presente Neto</strong> trae todos los flujos futuros al momento
          actual usando una tasa de descuento. Si <F tex="VPN > 0" />, el proyecto genera
          más valor del que consume.
        </p>
        <Formula color="#4B8EFF" tex="\text{VPN} = \sum_{t=0}^{n} \frac{F_t}{(1+i)^t}" />

        <h3>¿Qué es la TIR?</h3>
        <p>
          La <strong>Tasa Interna de Retorno</strong> es la tasa que hace que el VPN sea
          exactamente cero. Se calcula iterativamente con Newton-Raphson.
        </p>
        <Formula color="#4B8EFF" tex="\text{VPN}(\text{TIR}) = 0 \implies \sum_{t=0}^{n} \frac{F_t}{(1+\text{TIR})^t} = 0" />

        <h3>Criterios de decisión</h3>
        <ul>
          <li><F tex="VPN > 0" /> → Aceptar: el proyecto agrega valor</li>
          <li><F tex="\text{TIR} > \text{TMAR}" /> → Aceptar: retorna más que la mínima exigida</li>
          <li>Si ambos coinciden → alta confianza en la decisión</li>
          <li>Si difieren → evaluar el costo de capital con más detalle</li>
        </ul>
        <h3>Limitaciones</h3>
        <p>
          La TIR puede tener múltiples valores si los flujos cambian de signo más de una vez.
          En ese caso el VPN es el indicador más confiable.
        </p>
      </>
    ),

    /* ── Ejemplos ── */
    examples: [
      {
        tag: 'Proyecto industrial',
        problem: 'Una empresa invierte Q 100,000 hoy. Espera recibir Q 30,000 al año 1, Q 40,000 al año 2, Q 50,000 al año 3 y Q 20,000 al año 4. La TMAR es 12%. ¿Es viable?',
        steps: [
          {
            text: 'Identificar los flujos de caja:',
            formula: 'F_0 = -100{,}000 \\quad F_1 = 30{,}000 \\quad F_2 = 40{,}000 \\quad F_3 = 50{,}000 \\quad F_4 = 20{,}000',
          },
          {
            text: 'Calcular el Valor Presente del primer flujo:',
            formula: 'VP_1 = \\frac{30{,}000}{(1.12)^1} = 26{,}785.71',
          },
          {
            text: 'Sumar todos los valores presentes:',
            formula: '\\text{VPN} = -100{,}000 + 26{,}785.71 + 31{,}887.76 + 35{,}589.55 + 12{,}710.56 = 6{,}973.58',
          },
          { text: 'VPN = Q 6,973.58 > 0 y TIR ≈ 15.1% > 12% → el proyecto es viable.' },
        ],
        result: 'VPN = Q 6,973.58 | TIR ≈ 15.1% | Decisión: ACEPTAR ✓',
      },
    ],

    /* ── Calculadora ── */
    calc: {
      endpoint: 'vpn-tir',
      fields: [
        { key: 'rate',  label: 'TMAR / Tasa de descuento (%)', placeholder: '12',    hint: 'Porcentaje, ej: 12 para 12%' },
        { key: 'flows', label: 'Flujos de caja (F₀, F₁, F₂…)', placeholder: '-100000, 30000, 40000, 50000, 20000', hint: 'Separados por coma. F₀ negativo = inversión inicial' },
      ],
      buildPayload: (inputs) => ({
        rate:  parseFloat(inputs.rate),
        flows: inputs.flows.split(',').map(f => parseFloat(f.trim())),
      }),
      renderResults: (data, color) => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <ResultGrid color={color} results={[
            { label: 'VPN',      value: `Q ${data.vpn?.toLocaleString()}`, good: data.viable },
            { label: 'TIR',      value: `${data.tir} %`,                    good: data.viable },
            { label: 'Decisión', value: data.decision,                       good: data.viable },
          ]} />
          {data.steps && (
            <StepTable
              color={color}
              headers={['Período', 'Flujo (Q)', 'Valor Presente (Q)']}
              rows={data.steps.map(s => [s.step, s.flujo?.toLocaleString(), s.vp?.toLocaleString()])}
            />
          )}
        </div>
      ),
    },

    relations: [
      { id: 'anualidades', title: 'Anualidades',    desc: 'Cuando los flujos son uniformes se puede usar la fórmula de anualidad antes de calcular el VPN.' },
      { id: 'newton',      title: 'Newton-Raphson', desc: 'El algoritmo que usa el backend para encontrar la TIR iterativamente.' },
    ],

    applications: [
      { icon: '🏭', title: 'Expansión industrial',  desc: 'Decidir si comprar maquinaria nueva en base a flujos proyectados.',           example: 'IRTRA evalúa si construir una nueva atracción en 3 años.' },
      { icon: '🌱', title: 'Proyectos ambientales', desc: 'Evaluar inversiones en energía solar con retorno a largo plazo.',             example: 'Planta de biogás con inversión inicial y ahorros anuales.' },
      { icon: '💻', title: 'Startups',              desc: 'Los VCs usan TIR para comparar múltiples oportunidades de inversión.',        example: 'Comparar app A vs app B con distintos perfiles de flujo.' },
    ],
  },

  /* ══════════════════════════════════════════════════════════
     ANUALIDADES
  ══════════════════════════════════════════════════════════ */
  {
    id: 'anualidades',
    category: 'Ing. Económica',
    categoryColor: '#4B8EFF',
    icon: '💰',
    title: 'Anualidades',
    subtitle: 'Valor presente y futuro de series uniformes',
    desc: 'Calcula el valor de cuotas periódicas uniformes. Útil para créditos, inversiones y planes de ahorro.',
    tags: ['Anualidades', 'VP', 'VF', 'Amortización'],

    article: (
      <>
        <h3>Anualidad Ordinaria</h3>
        <p>
          Serie de pagos <strong>iguales</strong> realizados al <strong>final</strong> de
          cada período a una tasa de interés constante.
        </p>
        <Formula color="#4B8EFF" tex="VP = A \cdot \frac{1-(1+i)^{-n}}{i}" />
        <Formula color="#4B8EFF" tex="VF = A \cdot \frac{(1+i)^{n}-1}{i}" />

        <h3>Tipos de anualidades</h3>
        <ul>
          <li><strong>Ordinaria:</strong> pago al final del período (más común en créditos)</li>
          <li><strong>Anticipada:</strong> pago al inicio — <F tex="VP_{ant} = VP \cdot (1+i)" /></li>
          <li><strong>Diferida:</strong> comienza después de k períodos de gracia</li>
          <li><strong>Perpetua:</strong> pagos infinitos → <F tex="VP_{\infty} = A / i" /></li>
        </ul>

        <h3>Tabla de amortización</h3>
        <p>
          Muestra cómo cada pago se divide en <strong>capital</strong> e <strong>interés</strong>.
          Al inicio la mayor parte es interés; al final, casi todo es abono a capital.
        </p>
      </>
    ),

    examples: [
      {
        tag: 'Crédito vehicular',
        problem: 'Préstamo de Q 80,000 a 36 meses con tasa mensual del 1.5%. ¿Cuánto es la cuota y cuánto se paga en total?',
        steps: [
          {
            text: 'Datos del problema:',
            formula: 'VP = 80{,}000 \\quad i = 1.5\\%\\;\\text{mensual} \\quad n = 36\\;\\text{meses}',
          },
          {
            text: 'Despejar A de la fórmula de VP:',
            formula: 'A = VP \\cdot \\frac{i}{1-(1+i)^{-n}} = 80{,}000 \\cdot \\frac{0.015}{1-(1.015)^{-36}}',
          },
          {
            text: 'Calcular el denominador:',
            formula: '1 - (1.015)^{-36} = 1 - 0.5851 = 0.4149',
          },
          {
            text: 'Cuota mensual:',
            formula: 'A = 80{,}000 \\times \\frac{0.015}{0.4149} = Q\\;2{,}892.13/\\text{mes}',
          },
        ],
        result: 'Cuota = Q 2,892.13 | Total pagado = Q 104,116.68 | Intereses = Q 24,116.68',
      },
    ],

    calc: {
      endpoint: 'anualidades',
      fields: [
        { key: 'A', label: 'Pago por período (A)', placeholder: '2892', hint: 'Monto de cada cuota' },
        { key: 'i', label: 'Tasa por período (%)', placeholder: '1.5',  hint: 'Mensual, trimestral, anual…' },
        { key: 'n', label: 'Número de períodos',   placeholder: '36',   hint: 'En la misma unidad que la tasa' },
      ],
      buildPayload: (inputs) => ({
        A: parseFloat(inputs.A),
        i: parseFloat(inputs.i),
        n: parseInt(inputs.n),
      }),
      renderResults: (data, color) => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <ResultGrid color={color} results={[
            { label: 'Valor Presente (VP)', value: `Q ${data.vp?.toLocaleString()}`,              good: null },
            { label: 'Valor Futuro (VF)',   value: `Q ${data.vf?.toLocaleString()}`,              good: null },
            { label: 'Total pagado',        value: `Q ${data.total_pagado?.toLocaleString()}`,    good: null },
            { label: 'Intereses totales',   value: `Q ${data.total_intereses?.toLocaleString()}`, good: null },
          ]} />
          {data.tabla_amortizacion && (
            <StepTable
              color={color}
              headers={['Período', 'Saldo inicial', 'Interés', 'Pago']}
              rows={data.tabla_amortizacion.map(r => [r.periodo, `Q ${r.saldo_inicial}`, `Q ${r.interes}`, `Q ${r.pago}`])}
            />
          )}
        </div>
      ),
    },

    relations: [
      { id: 'vpn', title: 'VPN & TIR', desc: 'Cuando los flujos de un proyecto son uniformes se puede usar la fórmula de anualidad para calcular el VP antes de evaluar la viabilidad.' },
    ],

    applications: [
      { icon: '🏠', title: 'Créditos hipotecarios', desc: 'Calcular la cuota mensual de un préstamo de vivienda a 20 años.',        example: 'Banco otorga Q 500,000 al 0.8% mensual por 240 meses.' },
      { icon: '📱', title: 'Planes de pago',         desc: 'Financiamiento de equipos electrónicos en cuotas fijas.',               example: 'Laptop Q 15,000 en 12 cuotas con costo oculto.' },
      { icon: '📊', title: 'Fondos de retiro',       desc: 'Proyectar cuánto acumular ahorrando una cuota fija mensual.',           example: 'Q 1,000/mes al 0.5% mensual por 30 años.' },
    ],
  },

  /* ══════════════════════════════════════════════════════════
     SIMPLEX
  ══════════════════════════════════════════════════════════ */
  {
    id: 'simplex',
    category: 'Inv. Operaciones',
    categoryColor: '#a78bfa',
    icon: '🔢',
    title: 'Método Simplex',
    subtitle: 'Programación lineal — maximización',
    desc: 'Resuelve problemas de programación lineal con n variables y m restricciones usando el algoritmo Simplex.',
    tags: ['Simplex', 'PL', 'Optimización', 'Tableau'],

    article: (
      <>
        <h3>Modelo de Programación Lineal</h3>
        <p>Busca optimizar una <strong>función objetivo lineal</strong> sujeta a restricciones lineales.</p>
        <Formula color="#a78bfa" tex="\max\; Z = \mathbf{c}^T\mathbf{x}" />
        <Formula color="#a78bfa" tex="\text{s.a.}\quad A\mathbf{x} \leq \mathbf{b},\quad \mathbf{x} \geq \mathbf{0}" />

        <h3>Pasos del Simplex</h3>
        <ol>
          <li>Forma estándar: agregar holguras <F tex="s_i \geq 0" /></li>
          <li>Variable entrante: <F tex="\max_j\; c_j > 0" /> (columna pivote)</li>
          <li>Variable saliente: <F tex="\min_i \left\{ b_i / a_{ij} \mid a_{ij} > 0 \right\}" /></li>
          <li>Pivotear y repetir hasta <F tex="c_j \leq 0\;\forall j" /></li>
        </ol>

        <h3>Teorema fundamental</h3>
        <p>
          La solución óptima siempre ocurre en un <strong>vértice</strong> del poliedro
          factible. El Simplex recorre vértices eficientemente sin evaluarlos todos.
        </p>
      </>
    ),

    examples: [
      {
        tag: 'Producción óptima',
        problem: 'Max Z = 5x₁ + 4x₂ | 6x₁ + 4x₂ ≤ 24 (madera) | x₁ + 2x₂ ≤ 6 (pintura). Maximizar ganancia.',
        steps: [
          {
            text: 'Forma estándar con holguras:',
            formula: '6x_1 + 4x_2 + s_1 = 24 \\qquad x_1 + 2x_2 + s_2 = 6',
          },
          {
            text: 'Variable entrante: x₁ (mayor coef.). Ratio test:',
            formula: '\\min\\!\\left(\\frac{24}{6},\\, \\frac{6}{1}\\right) = 4 \\implies \\text{pivot fila 1}',
          },
          {
            text: 'Tras dos pivotes, solución óptima:',
            formula: 'x_1 = 3,\\quad x_2 = 1.5,\\quad Z = 5(3)+4(1.5) = 21',
          },
        ],
        result: 'x₁ = 3 sillas | x₂ = 1.5 mesas | Z = Q 21 de ganancia',
      },
    ],

    calc: {
      endpoint: 'simplex',
      fields: [
        { key: 'c',  label: 'Coefs. función objetivo (c₁, c₂…)', placeholder: '5, 4',  hint: 'Ej: 5, 4 para Max Z=5x₁+4x₂' },
        { key: 'a1', label: 'Restricción 1 (coeficientes)',        placeholder: '6, 4',  hint: 'Ej: 6, 4 para 6x₁+4x₂ ≤ b₁' },
        { key: 'b1', label: 'Restricción 1 — lado derecho',        placeholder: '24' },
        { key: 'a2', label: 'Restricción 2 (coeficientes)',        placeholder: '1, 2' },
        { key: 'b2', label: 'Restricción 2 — lado derecho',        placeholder: '6' },
      ],
      buildPayload: (inputs) => ({
        c: inputs.c.split(',').map(Number),
        A: [inputs.a1.split(',').map(Number), inputs.a2.split(',').map(Number)],
        b: [parseFloat(inputs.b1), parseFloat(inputs.b2)],
      }),
      renderResults: (data, color) => (
        <ResultGrid color={color} results={[
          ...Object.entries(data.solucion || {}).map(([k, v]) => ({ label: k, value: v, good: true })),
          { label: 'Z óptimo',    value: data.z_optimo,               good: true },
          { label: 'Iteraciones', value: data.iteraciones?.length ?? 0, good: null },
        ]} />
      ),
    },

    relations: [
      { id: 'estadistica', title: 'Estadística', desc: 'En PL estocástico, los coeficientes del modelo se estiman con medias y varianzas.' },
    ],

    applications: [
      { icon: '🏭', title: 'Planificación de producción', desc: 'Mezcla óptima de productos con recursos limitados.',        example: 'Cemento, arena y grava en planta constructora.' },
      { icon: '✈️', title: 'Logística y transporte',     desc: 'Minimizar costos de distribución entre orígenes y destinos.', example: 'Rutas de distribución CARGOSA Guatemala.' },
      { icon: '💊', title: 'Nutrición y dieta',           desc: 'Dieta de mínimo costo que cumpla requerimientos nutricionales.', example: 'Menú hospitalario con restricciones calóricas.' },
    ],
  },

  /* ══════════════════════════════════════════════════════════
     ESTADÍSTICA
  ══════════════════════════════════════════════════════════ */
  {
    id: 'estadistica',
    category: 'Estadística',
    categoryColor: '#4ade80',
    icon: '📊',
    title: 'Estadística Descriptiva',
    subtitle: 'Media, varianza, cuartiles y más',
    desc: 'Ingresa un conjunto de datos y obtén automáticamente sus principales medidas estadísticas.',
    tags: ['Media', 'Varianza', 'Cuartiles', 'CV'],

    article: (
      <>
        <h3>Medidas de tendencia central</h3>
        <ul>
          <li><strong>Media <F tex="\bar{x}" />:</strong> promedio aritmético — sensible a valores extremos</li>
          <li><strong>Mediana:</strong> valor central al ordenar — robusta ante outliers</li>
          <li><strong>Moda:</strong> valor más frecuente — puede ser multimodal</li>
        </ul>

        <h3>Medidas de dispersión</h3>
        <Formula color="#4ade80" tex="s^2 = \frac{\sum_{i=1}^{n}(x_i - \bar{x})^2}{n-1} \quad \text{(varianza muestral)}" />
        <Formula color="#4ade80" tex="s = \sqrt{s^2} \qquad CV = \frac{s}{\bar{x}} \times 100\,\%" />

        <h3>Cuartiles</h3>
        <p>
          El <strong>rango intercuartil <F tex="IQR = Q_3 - Q_1" /></strong> mide la
          dispersión del 50% central y es robusto ante outliers.
        </p>

        <h3>¿Cuándo usar cada medida?</h3>
        <ul>
          <li>Datos simétricos → <F tex="\bar{x}" /> y <F tex="s" /></li>
          <li>Datos asimétricos o con outliers → mediana e <F tex="IQR" /></li>
          <li>Comparar dispersión relativa → <F tex="CV" /></li>
        </ul>
      </>
    ),

    examples: [
      {
        tag: 'Tiempos de proceso',
        problem: 'Tiempos (min) en una línea de producción: 12, 15, 11, 18, 14, 16, 13, 20, 11, 15. Calcular las medidas principales.',
        steps: [
          {
            text: 'Ordenar los datos:',
            formula: '11,\\;11,\\;12,\\;13,\\;14,\\;15,\\;15,\\;16,\\;18,\\;20',
          },
          {
            text: 'Calcular la media:',
            formula: '\\bar{x} = \\frac{\\sum x_i}{n} = \\frac{145}{10} = 14.5\\;\\text{min}',
          },
          {
            text: 'Mediana (n = 10, par):',
            formula: 'Me = \\frac{x_5 + x_6}{2} = \\frac{14+15}{2} = 14.5\\;\\text{min}',
          },
          {
            text: 'Varianza y desviación estándar:',
            formula: 's^2 = \\frac{70.5}{9} = 7.83 \\implies s = 2.80\\;\\text{min}',
          },
          {
            text: 'Coeficiente de variación:',
            formula: 'CV = \\frac{2.80}{14.5} \\times 100 = 19.3\\,\\%',
          },
        ],
        result: 'Media = 14.5 | Mediana = 14.5 | s = 2.80 min | CV = 19.3%',
      },
    ],

    calc: {
      endpoint: 'estadistica',
      fields: [
        { key: 'data', label: 'Datos (separados por coma)', placeholder: '12, 15, 11, 18, 14, 16, 13, 20, 11, 15', hint: 'Mínimo 2 valores numéricos' },
      ],
      buildPayload: (inputs) => ({
        data: inputs.data.split(',').map(d => parseFloat(d.trim())).filter(d => !isNaN(d)),
      }),
      renderResults: (data, color) => (
        <ResultGrid color={color} results={[
          { label: 'n',                   value: data.n,            good: null },
          { label: 'Media (x̄)',           value: data.media,        good: null },
          { label: 'Mediana',             value: data.mediana,      good: null },
          { label: 'Moda',                value: data.moda ?? '—',  good: null },
          { label: 'Varianza (s²)',        value: data.varianza,     good: null },
          { label: 'Desv. Estándar (s)',   value: data.desv_est,     good: null },
          { label: 'CV (%)',              value: data.cv ? `${data.cv}` : '—', good: null },
          { label: 'Mínimo',              value: data.minimo,       good: null },
          { label: 'Máximo',              value: data.maximo,       good: null },
          { label: 'Q1',                  value: data.q1,           good: null },
          { label: 'Q3',                  value: data.q3,           good: null },
          { label: 'IQR',                 value: data.rango_intercuartil, good: null },
        ]} />
      ),
    },

    relations: [
      { id: 'simplex', title: 'Método Simplex', desc: 'En optimización estocástica, los parámetros del modelo PL se estiman con medias y varianzas.' },
      { id: 'newton',  title: 'Newton-Raphson', desc: 'Se usa para ajustar parámetros de distribuciones estadísticas (MLE) de forma iterativa.' },
    ],

    applications: [
      { icon: '🏥', title: 'Control de calidad',   desc: 'Monitorear variabilidad en manufactura farmacéutica.',            example: 'CV < 2% para peso de tabletas según farmacopea.' },
      { icon: '🌡️', title: 'Monitoreo ambiental', desc: 'Analizar series de temperatura, pH o contaminantes.',             example: 'Temperatura lago Atitlán vs lago Petén Itzá.' },
      { icon: '📈',  title: 'Análisis financiero', desc: 'Retorno promedio y riesgo (desviación) de una cartera.',         example: 'Portafolio en Bolsa de Valores de Guatemala.' },
    ],
  },

  /* ══════════════════════════════════════════════════════════
     NEWTON-RAPHSON
  ══════════════════════════════════════════════════════════ */
  {
    id: 'newton',
    category: 'Métodos Numéricos',
    categoryColor: '#fb923c',
    icon: '🧮',
    title: 'Newton-Raphson',
    subtitle: 'Raíces de ecuaciones no lineales',
    desc: 'Encuentra raíces de f(x)=0 con convergencia cuadrática. Muestra tabla completa de iteraciones.',
    tags: ['Raíces', 'Newton', 'Convergencia', 'Iterativo'],

    article: (
      <>
        <h3>Idea central</h3>
        <p>
          Newton-Raphson usa la <strong>tangente</strong> de la curva en el punto actual
          para estimar dónde cruza el eje x. Converge cuadráticamente cerca de la raíz.
        </p>
        <Formula color="#fb923c" tex="x_{n+1} = x_n - \frac{f(x_n)}{f'(x_n)}" />

        <h3>Derivada numérica (diferencias centradas)</h3>
        <Formula color="#fb923c" tex="f'(x) \approx \frac{f(x+h) - f(x-h)}{2h},\quad h = 10^{-7}" />

        <h3>Convergencia y limitaciones</h3>
        <ul>
          <li>✓ Orden de convergencia 2 — muy rápido cerca de la raíz</li>
          <li>✓ Solo necesita <F tex="x_0" /></li>
          <li>✗ Puede diverger si <F tex="x_0" /> está lejos de la raíz</li>
          <li>✗ Falla si <F tex="f'(x_n) = 0" /></li>
          <li>✗ No garantiza todas las raíces — depende de <F tex="x_0" /></li>
        </ul>

        <h3>Funciones válidas</h3>
        <p>
          Usa: <code>sin(x)</code>, <code>cos(x)</code>, <code>tan(x)</code>,{' '}
          <code>exp(x)</code>, <code>log(x)</code>, <code>sqrt(x)</code>,{' '}
          <code>x**n</code> para potencias.
        </p>
      </>
    ),

    examples: [
      {
        tag: 'Ecuación cúbica',
        problem: 'Encontrar la raíz real de f(x) = x³ - x - 2, comenzando desde x₀ = 1.5',
        steps: [
          {
            text: 'Evaluar f y f\' en x₀ = 1.5:',
            formula: "f(1.5) = 1.5^3 - 1.5 - 2 = -0.125 \\qquad f'(1.5) \\approx 5.75",
          },
          {
            text: 'Primera iteración:',
            formula: 'x_1 = 1.5 - \\frac{-0.125}{5.75} = 1.5217',
          },
          {
            text: 'Segunda iteración:',
            formula: "x_2 = 1.5217 - \\frac{f(1.5217)}{f'(1.5217)} \\approx 1.5214",
          },
          { text: 'El error es menor a la tolerancia → convergió en 3 iteraciones.' },
        ],
        result: 'x ≈ 1.52138 | f(x) ≈ 3.2×10⁻⁹ | Convergió en 3 iteraciones',
      },
    ],

    calc: {
      endpoint: 'newton',
      fields: [
        { key: 'expression', label: 'f(x)', placeholder: 'x**3 - x - 2', hint: 'Usa: sin(x), cos(x), exp(x), log(x), sqrt(x), x**n' },
        { key: 'x0',         label: 'Valor inicial x₀', placeholder: '1.5' },
        { key: 'tol',        label: 'Tolerancia',        placeholder: '1e-6', hint: 'Ej: 1e-6 o 0.0001' },
        { key: 'max_iter',   label: 'Iteraciones máx.',  placeholder: '50' },
      ],
      buildPayload: (inputs) => ({
        expression: inputs.expression,
        x0:       parseFloat(inputs.x0),
        tol:      parseFloat(inputs.tol) || 1e-6,
        max_iter: parseInt(inputs.max_iter) || 50,
      }),
      renderResults: (data, color) => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <ResultGrid color={color} results={[
            { label: 'Raíz (x)',    value: data.raiz,                           good: data.convergido },
            { label: 'f(raíz)',     value: data.f_raiz,                         good: Math.abs(data.f_raiz) < 1e-4 },
            { label: 'Iteraciones', value: data.iteraciones,                    good: null },
            { label: '¿Convergió?', value: data.convergido ? 'Sí ✓' : 'No ✗', good: data.convergido },
          ]} />
          {data.tabla && (
            <StepTable
              color={color}
              headers={['Iter.', 'xₙ', 'f(xₙ)', "f'(xₙ)", 'xₙ₊₁', 'Error']}
              rows={data.tabla.map(r => [r.iteracion, r.x, r.fx, r.dfx, r.x_new, r.error])}
            />
          )}
        </div>
      ),
    },

    relations: [
      { id: 'vpn',         title: 'VPN & TIR',           desc: 'La TIR se calcula resolviendo f(TIR)=VPN=0 con Newton-Raphson.' },
      { id: 'integracion', title: 'Integración Numérica', desc: 'En cuadratura adaptiva se usa para encontrar nodos de Gauss óptimos.' },
    ],

    applications: [
      { icon: '⚡', title: 'Circuitos no lineales', desc: 'Punto de operación de diodos y transistores.',                  example: 'Ecuación de Shockley: I = I₀(e^(V/VT)−1).' },
      { icon: '🌊', title: 'Mecánica de fluidos',   desc: 'Factor de fricción Darcy-Weisbach (ecuación de Colebrook).',   example: 'Diseño de tuberías de agua potable.' },
      { icon: '🔬', title: 'Cinética química',       desc: 'Equilibrio en reacciones con múltiples productos.',            example: 'Concentración de equilibrio en reacciones ácido-base.' },
    ],
  },

  /* ══════════════════════════════════════════════════════════
     INTEGRACIÓN NUMÉRICA
  ══════════════════════════════════════════════════════════ */
  {
    id: 'integracion',
    category: 'Métodos Numéricos',
    categoryColor: '#fb923c',
    icon: '∫',
    title: 'Integración Numérica',
    subtitle: 'Trapecio y Simpson 1/3',
    desc: 'Aproxima integrales definidas cuando no existe solución analítica. Incluye puntos para visualización.',
    tags: ['Integral', 'Simpson', 'Trapecio', 'Cuadratura'],

    article: (
      <>
        <h3>Método del Trapecio</h3>
        <p>Divide el intervalo en <F tex="n" /> subintervalos y aproxima el área usando trapecios (líneas rectas).</p>
        <Formula color="#fb923c" tex="\int_a^b f(x)\,dx \approx \frac{h}{2}\!\left[f(x_0) + 2\sum_{i=1}^{n-1}f(x_i) + f(x_n)\right],\quad \varepsilon \sim O(h^2)" />

        <h3>Método de Simpson 1/3</h3>
        <p>Usa parábolas — más preciso con el mismo <F tex="n" />. Requiere <F tex="n" /> par.</p>
        <Formula color="#fb923c" tex="\int_a^b f(x)\,dx \approx \frac{h}{3}\!\left[f(x_0) + 4f(x_1) + 2f(x_2) + 4f(x_3) + \cdots + f(x_n)\right],\quad \varepsilon \sim O(h^4)" />

        <h3>¿Cuándo usar cada método?</h3>
        <ul>
          <li>Trapecio: función casi lineal, o cuando <F tex="n" /> es impar</li>
          <li>Simpson 1/3: siempre preferible cuando <F tex="n" /> es par y la función es suave</li>
          <li>Si la diferencia entre ambos es pequeña → aproximación confiable</li>
          <li>Aumentar <F tex="n" /> siempre mejora la precisión</li>
        </ul>
      </>
    ),

    examples: [
      {
        tag: 'Integral trigonométrica',
        problem: 'Calcular ∫₀^π sin(x)dx con n=4 subintervalos. El valor exacto es 2.',
        steps: [
          {
            text: 'Paso h y puntos:',
            formula: 'h = \\frac{\\pi - 0}{4} = \\frac{\\pi}{4} \\approx 0.7854',
          },
          {
            text: 'Evaluar f en los 5 puntos:',
            formula: 'f(0)=0,\\;f(\\tfrac{\\pi}{4})=0.7071,\\;f(\\tfrac{\\pi}{2})=1,\\;f(\\tfrac{3\\pi}{4})=0.7071,\\;f(\\pi)=0',
          },
          {
            text: 'Método del Trapecio:',
            formula: 'I \\approx \\frac{0.7854}{2}\\bigl[0 + 2(0.7071) + 2(1) + 2(0.7071) + 0\\bigr] = 1.8961',
          },
          {
            text: 'Método de Simpson 1/3:',
            formula: 'I \\approx \\frac{0.7854}{3}\\bigl[0 + 4(0.7071) + 2(1) + 4(0.7071) + 0\\bigr] = 2.0046',
          },
          { text: 'Error trapecio: 5.2% | Error Simpson: 0.23%' },
        ],
        result: 'Trapecio ≈ 1.8961 | Simpson ≈ 2.0046 | Exacto = 2.0000',
      },
    ],

    calc: {
      endpoint: 'integracion',
      fields: [
        { key: 'fx', label: 'f(x)', placeholder: 'sin(x)', hint: 'Usa: sin(x), cos(x), exp(x), log(x), sqrt(x), x**n' },
        { key: 'a',  label: 'Límite inferior (a)', placeholder: '0' },
        { key: 'b',  label: 'Límite superior (b)', placeholder: '3.14159', hint: 'π ≈ 3.14159265' },
        { key: 'n',  label: 'Subintervalos (n)',    placeholder: '100', hint: 'Número par. Más n = más preciso.' },
      ],
      buildPayload: (inputs) => ({
        expression: inputs.fx,
        a: parseFloat(inputs.a),
        b: parseFloat(inputs.b),
        n: parseInt(inputs.n) || 100,
      }),
      renderResults: (data, color) => (
        <ResultGrid color={color} results={[
          { label: 'Trapecio',    value: data.trapecio,   good: null },
          { label: 'Simpson 1/3', value: data.simpson,    good: true },
          { label: 'Diferencia',  value: data.diferencia, good: parseFloat(data.diferencia) < 0.001 },
          { label: 'h',           value: data.h,          good: null },
          { label: 'n usado',     value: data.n_usado,    good: null },
        ]} />
      ),
    },

    relations: [
      { id: 'newton',      title: 'Newton-Raphson', desc: 'En cuadratura adaptiva se usa para encontrar nodos de Gauss óptimos.' },
      { id: 'estadistica', title: 'Estadística',    desc: 'Las distribuciones continuas (normal, exponencial) se evalúan numéricamente integrando su PDF.' },
    ],

    applications: [
      { icon: '🌿', title: 'Trabajo mecánico',         desc: 'Trabajo de una fuerza variable F(x) sobre un trayecto.',            example: 'F(x) = 3x² + 2x N en el intervalo [0, 5] metros.' },
      { icon: '📡', title: 'Procesamiento de señales', desc: 'La FFT es esencialmente una integral numérica de una señal.',        example: 'Análisis espectral de una señal de audio muestreada.' },
      { icon: '💧', title: 'Hidráulica',               desc: 'Caudal desde función de velocidad en una sección transversal.',      example: 'Aforo de río con perfil de velocidades medido en campo.' },
    ],
  },
];