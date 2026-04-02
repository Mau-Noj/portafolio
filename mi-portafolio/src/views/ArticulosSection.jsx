// src/views/ArticulosSection.jsx
import { Link } from "react-router-dom";
import { useEffect } from "react";
import "./ArticulosSection.css";

const ARTICULOS = [
  {
    slug: "arquitectura-informacion",
    titulo: "La arquitectura invisible que lo sostiene todo",
    categoria: "UX / Sistemas",
    fecha: "Mar. 2025",
    vol: "01",
    resumen: "La Arquitectura de la Información no vive en las pantallas. Vive en las decisiones que preceden a cada píxel.",
    lecturaMin: 8,
    tags: ["AI", "UX", "Estrategia"],
    sello: "AI",
    accent: "#2563eb",
    neon: "#38bdf8",
    publicado: true,
  },
  {
    slug: "sistemas-de-diseno",
    titulo: "Design Systems: del componente al ecosistema",
    categoria: "Design Systems",
    fecha: "Próximamente",
    vol: "02",
    resumen: "Cómo un sistema de diseño deja de ser una librería de componentes y se convierte en lenguaje compartido.",
    lecturaMin: 10,
    tags: ["DS", "Tokens", "Figma"],
    sello: "DS",
    accent: "#7c3aed",
    neon: "#a78bfa",
    publicado: false,
  },
  {
    slug: "ux-banca-digital",
    titulo: "UX en banca digital: regulación como diseño",
    categoria: "Fintech / UX",
    fecha: "Próximamente",
    vol: "03",
    resumen: "En banca, la regulación no es un obstáculo al diseño: es una capa de la arquitectura que hay que integrar.",
    lecturaMin: 12,
    tags: ["Fintech", "KYC", "AI"],
    sello: "FX",
    accent: "#0891b2",
    neon: "#34d399",
    publicado: false,
  },
  {
    slug: "investigacion-usuarios",
    titulo: "Del dato al insight: métodos de research cualitativo",
    categoria: "Research",
    fecha: "Próximamente",
    vol: "04",
    resumen: "Card sorting, tree testing, entrevistas contextuales. Qué método usar, cuándo y cómo evitar sesgos.",
    lecturaMin: 9,
    tags: ["Research", "Card Sorting", "UX"],
    sello: "RX",
    accent: "#059669",
    neon: "#f472b6",
    publicado: false,
  },
  {
    slug: "flujos-y-ficciones",
    titulo: "Flujos de usuario: entre la realidad y el happy path",
    categoria: "UX / Interaction",
    fecha: "Próximamente",
    vol: "05",
    resumen: "El flujo feliz oculta la mayoría del trabajo real. Diseñar para los errores es donde se decide la calidad.",
    lecturaMin: 7,
    tags: ["Flows", "Interaction", "Edge Cases"],
    sello: "FX",
    accent: "#d97706",
    neon: "#fb923c",
    publicado: false,
  },
  {
    slug: "accesibilidad-ux",
    titulo: "Accesibilidad como práctica, no como checklist",
    categoria: "Accesibilidad",
    fecha: "Próximamente",
    vol: "06",
    resumen: "WCAG no es una lista de requisitos técnicos. Es un marco para entender que el diseño accesible es siempre mejor diseño.",
    lecturaMin: 11,
    tags: ["A11y", "WCAG", "Inclusión"],
    sello: "AX",
    accent: "#be185d",
    neon: "#e879f9",
    publicado: false,
  },
];

function subcatAbbr(cat) {
  const map = {
    "UX / Sistemas":    "Lector de sistemas",
    "Design Systems":   "Lector de diseño",
    "Fintech / UX":     "Lector de fintech",
    "Research":         "Investigador",
    "UX / Interaction": "Diseñador",
    "Accesibilidad":    "Diseñador inclusivo",
  };
  return map[cat] || "Lector";
}

// ── Íconos SVG por categoría ─────────────────────────────────
const ICONS = {
  "UX / Sistemas":    <><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></>,
  "Design Systems":   <><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><circle cx="17.5" cy="17.5" r="3.5"/></>,
  "Fintech / UX":     <><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></>,
  "Research":         <><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/><line x1="11" y1="8" x2="11" y2="14"/><line x1="8" y1="11" x2="14" y2="11"/></>,
  "UX / Interaction": <><polyline points="15 10 20 15 15 20"/><path d="M4 4v7a4 4 0 0 0 4 4h12"/></>,
  "Accesibilidad":    <><circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/></>,
  default:            <><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></>,
};

// ── Envelope Card ─────────────────────────────────────────────
function EnvelopeCard({ art }) {
  const { slug, titulo, categoria, fecha, vol, resumen, lecturaMin, tags, sello, accent, neon, publicado } = art;

  const cssVars = {
    "--accent": accent,
    "--neon":   neon,
    "--neon-1": neon + "ee",
    "--neon-2": neon + "77",
    "--neon-3": neon + "33",
    "--neon-4": neon + "11",
  };

  const card = (
    <article
      className={`envelope${!publicado ? " envelope--soon" : ""}`}
      style={cssVars}
    >
      <div className="env-body">

        {/* ── CARTA — sube al hacer hover, contiene todo el info ── */}
        <div className="env-letter">
          <div className="env-letter-paper">

            {/* Header: Vol + tiempo lectura */}
            <div className="env-letter-head">
              <span className="env-letter-vol">Vol. {vol}</span>
              <span className="env-letter-read">⏱ {lecturaMin} min</span>
            </div>

            {/* Título */}
            <h3 className="env-letter-title">{titulo}</h3>

            {/* Extracto */}
            <p className="env-letter-excerpt">{resumen}</p>

            {/* Tags */}
            <div className="env-letter-tags">
              {tags.map(t => (
                <span key={t} className="env-letter-tag">{t}</span>
              ))}
            </div>

            {/* Footer CTA */}
            <div className="env-letter-footer">
              {publicado
                ? <span className="env-letter-cta">Abrir carta <span className="env-letter-arrow">→</span></span>
                : <span className="env-letter-soon">✦ Próximamente</span>
              }
            </div>

          </div>
        </div>

        {/* ── SOBRE — siempre visible, se queda en su lugar ── */}
        <div className="env-shell">
          <div className="env-base" />
          <div className="env-flap-left"  aria-hidden="true" />
          <div className="env-flap-right" aria-hidden="true" />
          <div className="env-x-folds"    aria-hidden="true" />
          <div className="env-flap-top"   aria-hidden="true" />

          {/* Sello de lacre */}
          <div className="env-seal" aria-hidden="true">
            <span className="env-seal-text">{sello}</span>
          </div>

          {/* Matasellos */}
          <div className="env-postmark" aria-hidden="true">
            <div className="env-pm-ring" />
            <div className="env-pm-ring env-pm-ring--2" />
            <span className="env-pm-date">{fecha.slice(0, 8)}</span>
            <div className="env-pm-lines">
              <span /><span /><span /><span />
            </div>
          </div>

          {/* Estampilla */}
          <div className="env-stamp" aria-hidden="true">
            <span className="env-stamp-cat">
              {categoria.split("/")[0].trim().slice(0, 3).toUpperCase()}
            </span>
            <span className="env-stamp-num">N°{vol}</span>
            <div className="env-stamp-perf" />
          </div>

          {/* Dirección */}
          <div className="env-addr" aria-hidden="true">
            <span className="env-addr-de">DE: OSI3D · Portafolio</span>
            <span className="env-addr-para">PARA: {subcatAbbr(categoria)}</span>
          </div>

          {/* ── Icono + Título neon en el frente del sobre ── */}
          <div className="env-front" aria-hidden="true">
            <div className="env-front-icon">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                {ICONS[categoria] || ICONS.default}
              </svg>
            </div>
            <span className="env-front-title">{titulo}</span>
          </div>

          <div className="env-x-folds" aria-hidden="true" />
        </div>

        {/* Film de próximamente */}
        {!publicado && <div className="env-soon-film" aria-hidden="true" />}

      </div>
    </article>
  );

  if (publicado) {
    return <Link to={`/articulos/${slug}`} className="env-link">{card}</Link>;
  }
  return <div className="env-link env-link--disabled">{card}</div>;
}

// ── Fade-in ───────────────────────────────────────────────────
function useFadeIn() {
  useEffect(() => {
    const els = document.querySelectorAll(".env-link");
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => e.isIntersecting && e.target.classList.add("env-link--in")),
      { threshold: 0.08, rootMargin: "0px 0px -30px 0px" }
    );
    els.forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);
}

// ── Main ──────────────────────────────────────────────────────
export default function ArticulosSection() {
  useFadeIn();
  const pub   = ARTICULOS.filter(a => a.publicado).length;
  const total = ARTICULOS.length;

  return (
    <section className="articulos-section">
      <header className="articulos-header">
        <div className="articulos-eyebrow-row">
          <span className="articulos-eyebrow">Correspondencia</span>
          <div className="articulos-eyebrow-line" />
        </div>
        <h1 className="articulos-title">
          Artículos<br /><em>&amp; Ensayos</em>
        </h1>
        <p className="articulos-subtitle">
          Una colección de escritos sobre diseño de experiencias, sistemas de información
          y la disciplina invisible que los une.<br />Cada carta, un argumento.
        </p>
        <div className="articulos-counter">
          <span className="articulos-counter-num">0{pub}</span>
          <span className="articulos-counter-label">publicado{pub !== 1 ? "s" : ""}</span>
          <span className="articulos-counter-sep">·</span>
          <span className="articulos-counter-num">{total}</span>
          <span className="articulos-counter-label">en total</span>
        </div>
      </header>

      <div className="articulos-grid">
        {ARTICULOS.map(art => <EnvelopeCard key={art.slug} art={art} />)}
      </div>
    </section>
  );
}