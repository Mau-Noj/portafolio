// src/views/BlogPost.jsx
// Ruta: /blog/:id
// Página de lectura individual de una entrada del blog.

import React, { useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import './BlogPost.css';
import { MathText } from '../components/MathText';

// ── Data completa de posts ────────────────────────────────────
// En el futuro puedes mover esto a src/models/blog.data.js
const POSTS_DATA = [
  {
    id: 1,
    date: "2026-03-01",
    dateLabel: "01 de marzo, 2026",
    category: "aprendizajes",
    catLabel: "#aprendizajes",
    readMin: 3,
    status: "consolidado",
    title: "Por qué calculo primero antes de armar cualquier circuito",
    excerpt: "Quemé un LED el primer día. No porque no supiera que necesitaba una resistencia, sino porque no me tomé 30 segundos en hacer la cuenta.",
    tags: ["Electricidad", "Método", "Errores"],
    content: [
      {
        type: "p",
        text: "Quemé un LED el primer día. No porque no supiera que necesitaba una resistencia, sino porque no me tomé 30 segundos en hacer la cuenta. Desde entonces tengo una regla: si no puedo predecir el resultado antes de encender, no enciendo."
      },
      {
        type: "h2",
        text: "El error que todos cometemos"
      },
      {
        type: "p",
        text: "Hay una diferencia enorme entre entender un concepto y aplicarlo bajo presión de querer ver resultados rápido. Sabía perfectamente que $V = IR$ y que un LED sin resistencia muere. Lo sabía. Pero tenía el circuito armado, la fuente lista, y pensé 'un segundo no le hace nada'."
      },
      {
        type: "p",
        text: "Le hizo. El LED murió en menos de un segundo. Y lo peor no fue perder el componente — fue darme cuenta de que había tomado una decisión técnica basada en impaciencia, no en datos."
      },
      {
        type: "formula",
        text: "$$R = \\frac{V_{cc} - V_f}{I_f} = \\frac{5V - 2V}{0.02A} = 150\\Omega$$",
        caption: "Cálculo de resistencia limitadora para LED rojo. 30 segundos. Eso es todo."
      },
      {
        type: "h2",
        text: "La regla que me funciona"
      },
      {
        type: "p",
        text: "Antes de conectar cualquier cosa, abro el cuaderno y escribo: voltaje de entrada, corriente esperada, potencia disipada. No porque no confíe en mi cabeza, sino porque escribirlo me obliga a pensar despacio cuando el instinto dice rápido."
      },
      {
        type: "callout",
        icon: "💡",
        text: "Un resistor de $150\\Omega$ a $\\frac{1}{4}W$ disipa $P = I^2 R = (0.02)^2 \\times 150 = 0.06W$. Mucho margen de seguridad. El cálculo tarda menos que conectar mal."
      },
      {
        type: "p",
        text: "Ahora cuando veo a alguien conectar directamente sin calcular, no digo nada. Solo espero. El LED les enseña mejor que yo."
      },
    ]
  },
  {
    id: 2,
    date: "2026-02-20",
    dateLabel: "20 de febrero, 2026",
    category: "hardware",
    catLabel: "#hardware",
    readMin: 5,
    status: "en-proceso",
    title: "El RPi5 no es una computadora de juguete",
    excerpt: "Cuando lo compré pensé que sería otro experimento de fin de semana. Ocho meses después es mi servidor de desarrollo principal.",
    tags: ["RPi5", "Linux", "Embedded"],
    content: [
      {
        type: "p",
        text: "Cuando lo compré pensé que sería otro experimento de fin de semana. Ocho meses después es mi servidor de desarrollo, host de modelos ONNX y controlador de dos proyectos CNC simultáneos."
      },
      {
        type: "h2",
        text: "Lo que nadie te dice"
      },
      {
        type: "p",
        text: "El RPi5 con 8GB de RAM no es un microcontrolador disfrazado. Es una computadora ARM completa que puede correr Debian, compilar código, servir aplicaciones web y ejecutar modelos de ML en simultáneo. El límite no es el hardware — es no saber qué pedirle."
      },
      {
        type: "callout",
        icon: "⚠",
        text: "El consumo en carga completa puede superar los 5W. Una PSU de calidad y un buen disipador no son opcionales si vas a correrlo 24/7."
      },
      {
        type: "h2",
        text: "Mi setup actual"
      },
      {
        type: "p",
        text: "Corre Raspberry Pi OS Lite (sin escritorio), SSH siempre activo, y tiene montado un SSD de 256GB vía USB 3.0 para no depender de la microSD. El sistema de archivos raíz está en el SSD — la microSD solo hace boot."
      },
      {
        type: "p",
        text: "Con esa configuración, los tiempos de compilación de proyectos medianos en Python + C++ son completamente viables para desarrollo real. No es mi laptop, pero tampoco pretendo que lo sea."
      },
    ]
  },
  {
    id: 3,
    date: "2026-02-10",
    dateLabel: "10 de febrero, 2026",
    category: "ia",
    catLabel: "#ia",
    readMin: 7,
    status: "exploracion",
    title: "YOLOv8 en hardware sin GPU: expectativas vs realidad",
    excerpt: "La promesa: detección en tiempo real en dispositivos edge. La realidad: 4 FPS con el modelo base, 15 FPS con el nano.",
    tags: ["YOLOv8", "ONNX", "Optimización"],
    content: [
      {
        type: "p",
        text: "La promesa de los modelos de visión en edge es tentadora: detección en tiempo real, sin nube, sin latencia de red. La realidad es más matizada. Documenté cada paso del proceso de optimización, incluyendo los callejones sin salida."
      },
      {
        type: "h2",
        text: "Punto de partida: 4 FPS"
      },
      {
        type: "p",
        text: "YOLOv8 base (.pt de PyTorch) corriendo directamente en RPi5: 4 FPS. Inutilizable para cualquier aplicación en tiempo real. El problema no es el modelo — es el formato. PyTorch no está optimizado para inferencia en CPU ARM."
      },
      {
        type: "h2",
        text: "La solución: exportar a ONNX"
      },
      {
        type: "p",
        text: "ONNX Runtime tiene backends optimizados para ARM. Exportar el modelo y usar ONNX Runtime en lugar del runtime de PyTorch triplicó la velocidad sin cambiar una sola línea del modelo."
      },
      {
        type: "callout",
        icon: "💡",
        text: "YOLOv8n (nano) + ONNX Runtime + session options optimizadas para CPU = 15 FPS estables en RPi5. Suficiente para detección de objetos en aplicaciones de monitoreo."
      },
      {
        type: "p",
        text: "El proceso tomó una semana, no un día. La documentación de ONNX Runtime para ARM es escasa y los foros están llenos de respuestas desactualizadas. Pero el resultado justificó el tiempo invertido."
      },
    ]
  },
  {
    id: 4,
    date: "2026-01-28",
    dateLabel: "28 de enero, 2026",
    category: "notas",
    catLabel: "#notas",
    readMin: 2,
    status: "consolidado",
    title: "Nota rápida: diferencia entre paso a paso y servo",
    excerpt: "No son intercambiables. Un servo quiere posición, un stepper quiere pasos.",
    tags: ["Motores", "Hardware", "CNC"],
    content: [
      {
        type: "p",
        text: "Apunte corto porque lo confundí una vez y no quiero volver a hacerlo."
      },
      {
        type: "h2",
        text: "Motor paso a paso (stepper)"
      },
      {
        type: "p",
        text: "Recibe pulsos. Cada pulso = un paso = un ángulo fijo. Control de posición en lazo abierto — no necesita encoder porque la posición se infiere contando pasos. Ideal para CNC, plotters, impresoras 3D."
      },
      {
        type: "h2",
        text: "Servo"
      },
      {
        type: "p",
        text: "Recibe una señal PWM que codifica el ángulo deseado. Tiene un encoder interno y un controlador PID que mantiene esa posición. Ideal para brazos robóticos, timones, cualquier cosa que requiera torque constante en posición."
      },
      {
        type: "callout",
        icon: "⚠",
        text: "Un servo SG90 no puede reemplazar a un stepper en un CNC. El control es diferente, la precisión es diferente, y el SG90 no tiene la resolución angular que necesita un plotter."
      },
    ]
  },
  {
    id: 5,
    date: "2026-01-15",
    dateLabel: "15 de enero, 2026",
    category: "aprendizajes",
    catLabel: "#aprendizajes",
    readMin: 4,
    status: "en-proceso",
    title: "Cursando dos ingenierías: sistemas y ambiental",
    excerpt: "La gente me pregunta si no es demasiado. Probablemente sí. Pero hay una intersección que nadie está trabajando.",
    tags: ["Carrera", "IoT", "Ambiental"],
    content: [
      {
        type: "p",
        text: "La gente me pregunta si no es demasiado. Probablemente sí. Pero hay una intersección que nadie está trabajando: sensores IoT aplicados a monitoreo ambiental real, con ML encima. Ahí es donde quiero estar."
      },
      {
        type: "h2",
        text: "Por qué dos carreras"
      },
      {
        type: "p",
        text: "Sistemas me da las herramientas: algoritmos, arquitectura de software, electrónica, IA. Ambiental me da el problema real: calidad del aire, agua, suelo. Sin el problema, las herramientas son solo juguetes."
      },
      {
        type: "p",
        text: "Guatemala tiene problemas ambientales serios y poca infraestructura de monitoreo. Un sistema de sensores IoT de bajo costo que reporte calidad del aire en tiempo real costaría una fracción de lo que cuestan las estaciones meteorológicas comerciales."
      },
      {
        type: "callout",
        icon: "💡",
        text: "El sensor MQ-3 que tengo puede detectar etanol y otros VOCs. El RPi5 puede procesar y transmitir los datos. La parte difícil no es técnica — es diseñar un protocolo de calibración confiable."
      },
    ]
  },
  {
    id: 6,
    date: "2025-12-20",
    dateLabel: "20 de diciembre, 2025",
    category: "hardware",
    catLabel: "#hardware",
    readMin: 6,
    status: "consolidado",
    title: "Construí un plotter con lectoras de CD viejas",
    excerpt: "Costo total: $5 en tornillos. Todo lo demás salió de dispositivos que iban a la basura.",
    tags: ["CNC", "Reciclado", "Maker"],
    content: [
      {
        type: "p",
        text: "Costo total: $5 en tornillos y algo de madera. Todo lo demás — motores, rieles, guías — salió de lectoras de CD y DVD que iban a la basura. El resultado es un plotter XY que traza vectores G-code con precisión de décimas de milímetro."
      },
      {
        type: "h2",
        text: "Por qué las lectoras de CD son un tesoro"
      },
      {
        type: "p",
        text: "Los motores paso a paso de una lectora de CD están diseñados para mover el láser con precisión micrométrica. Son motores de 20 pasos por vuelta acoplados a un tornillo sin fin de paso 3mm, lo que da una resolución de:"
      },
      {
        type: "formula",
        text: "$$\\text{Resolución} = \\frac{3\\text{mm}}{20\\text{ pasos}} = 0.15\\text{mm/paso}$$",
        caption: "Mejor que muchos CNC de entrada de mercado."
      },
      {
        type: "h2",
        text: "El proceso fue un desastre ordenado"
      },
      {
        type: "p",
        text: "La estructura tardó tres intentos. El primero era demasiado flexible — el marcador vibraba y las líneas salían temblorosas. El segundo tenía los ejes desalineados. El tercero funciona."
      },
      {
        type: "callout",
        icon: "💡",
        text: "GRBL en Arduino UNO interpreta G-code directamente. El RPi5 envía los archivos vía USB serial. El flujo completo: SVG → Inkscape + plugin → G-code → GRBL → plotter."
      },
      {
        type: "p",
        text: "Vale la pena. Ver una máquina que construiste con basura trazar un polígono perfecto tiene algo que ningún tutorial en línea puede replicar."
      },
    ]
  },
];

// ── Sub-componentes de contenido ─────────────────────────────
const ContentBlock = ({ block }) => {
  switch (block.type) {
    case 'h2':
      return <h2 className="bp__h2">{block.text}</h2>;
    case 'p':
      return <p className="bp__p"><MathText text={block.text} /></p>;
    case 'formula':
      return (
        <div className="bp__formula">
          <div className="bp__formula-math"><MathText text={block.text} /></div>
          {block.caption && <p className="bp__formula-caption">{block.caption}</p>}
        </div>
      );
    case 'callout':
      return (
        <div className="bp__callout">
          <span className="bp__callout-icon">{block.icon}</span>
          <p><MathText text={block.text} /></p>
        </div>
      );
    default:
      return null;
  }
};

const STATUS_MAP = {
  consolidado:  { label: "Consolidado",  dot: "●" },
  "en-proceso": { label: "En proceso",   dot: "◑" },
  exploracion:  { label: "Exploración",  dot: "○" },
};

// ── Página principal ─────────────────────────────────────────
export const BlogPost = () => {
  const { id }   = useParams();
  const navigate = useNavigate();
  const post     = POSTS_DATA.find(p => p.id === Number(id));

  // Scroll al top al entrar
  useEffect(() => { window.scrollTo(0, 0); }, [id]);

  if (!post) {
    return (
      <div className="bp-wrapper">
        <div className="bp-notfound">
          <span>404</span>
          <p>Entrada no encontrada.</p>
          <Link to="/blog" className="bp-back-link">← Volver al blog</Link>
        </div>
      </div>
    );
  }

  const st = STATUS_MAP[post.status] || STATUS_MAP.exploracion;

  // Posts adyacentes para navegación
  const idx  = POSTS_DATA.findIndex(p => p.id === post.id);
  const prev = POSTS_DATA[idx + 1] ?? null;
  const next = POSTS_DATA[idx - 1] ?? null;

  return (
    <div className="bp-wrapper">
      <article className="bp">

        {/* ── BREADCRUMB ── */}
        <nav className="bp__nav">
          <button className="bp__back" onClick={() => navigate('/blog')}>
            ← Blog
          </button>
          <span className="bp__nav-sep">/</span>
          <span className="bp__nav-cat">{post.catLabel}</span>
        </nav>

        {/* ── HEADER DEL POST ── */}
        <header className="bp__header">
          <div className="bp__header-meta">
            <time className="bp__date">{post.dateLabel}</time>
            <span className={`bp__status bp__status--${post.status}`}>
              {st.dot} {st.label}
            </span>
            <span className="bp__read">{post.readMin} min de lectura</span>
          </div>

          <h1 className="bp__title">{post.title}</h1>
          <p className="bp__excerpt">{post.excerpt}</p>

          <div className="bp__tags">
            {post.tags.map(t => (
              <span key={t} className="bp__tag">{t}</span>
            ))}
          </div>
        </header>

        {/* ── SEPARADOR ── */}
        <div className="bp__rule" />

        {/* ── CUERPO DEL ARTÍCULO ── */}
        <div className="bp__body">
          {post.content.map((block, i) => (
            <ContentBlock key={i} block={block} />
          ))}
        </div>

        {/* ── FIRMA ── */}
        <footer className="bp__footer">
          <div className="bp__footer-rule" />
          <div className="bp__author">
            <div className="bp__author-dot" />
            <div>
              <p className="bp__author-name">Mauricio Noj</p>
              <p className="bp__author-role">Ing. Sistemas + Ambiental · Guatemala</p>
            </div>
          </div>
        </footer>

        {/* ── NAVEGACIÓN ENTRE POSTS ── */}
        <nav className="bp__pagination">
          {prev ? (
            <Link to={`/blog/${prev.id}`} className="bp__pag-item bp__pag-item--prev">
              <span className="bp__pag-label">← Anterior</span>
              <span className="bp__pag-title">{prev.title}</span>
            </Link>
          ) : <div />}

          {next && (
            <Link to={`/blog/${next.id}`} className="bp__pag-item bp__pag-item--next">
              <span className="bp__pag-label">Siguiente →</span>
              <span className="bp__pag-title">{next.title}</span>
            </Link>
          )}
        </nav>

      </article>
    </div>
  );
};