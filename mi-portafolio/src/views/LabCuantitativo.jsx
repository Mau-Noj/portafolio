// src/views/LabCuantitativo.jsx
import React, { useState, useEffect } from "react";
import { MathText } from "../components/MathText";
import "./LabCuantitativo.css";
import { LAB_TOOLS } from "../models/lab.data";
import { useSEO } from "../hooks/useSEO";

useSEO({
  title: "Lab Cuantitativo",
  description:
    "Calculadoras y métodos numéricos para ingeniería — bisección, Newton-Raphson, interpolación y más.",
  url: "https://mauricionoj.com/lab",
});

const API = import.meta.env.VITE_GO_API_URL || "http://localhost:8080/api/lab";

/* ══════════════════════════════════════════════════════════
   SECCIÓN: Explicación + Fórmulas
══════════════════════════════════════════════════════════ */
const SectionExplanation = ({ tool }) => (
  <div className="lab-section">
    <h2 className="lab-section-title" style={{ "--mc": tool.categoryColor }}>
      Explicación &amp; Fórmulas
    </h2>
    <div className="lab-article">{tool.article}</div>
  </div>
);

/* ══════════════════════════════════════════════════════════
   SECCIÓN: Ejemplos resueltos
══════════════════════════════════════════════════════════ */
const SectionExamples = ({ tool }) => (
  <div className="lab-section">
    <h2 className="lab-section-title" style={{ "--mc": tool.categoryColor }}>
      Ejemplos Resueltos
    </h2>
    {tool.examples.map((ex, i) => (
      <div
        key={i}
        className="lab-example"
        style={{ "--mc": tool.categoryColor }}
      >
        <div className="lab-example-header">
          <span className="lab-example-num">Ejemplo {i + 1}</span>
          <span className="lab-example-tag">{ex.tag}</span>
        </div>
        <p className="lab-example-problem">{ex.problem}</p>
        <div className="lab-example-steps">
          {ex.steps.map((s, j) => (
            <div key={j} className="lab-example-step">
              <span className="lab-step-num">{j + 1}</span>
              <div>
                <p className="lab-step-text">{s.text}</p>
                {s.formula && (
                  <div className="lab-step-formula">
                    <MathText text={`$$${s.formula}$$`} />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
        <div className="lab-example-result">
          <span className="lab-example-result-label">Resultado</span>
          <span className="lab-example-result-val">{ex.result}</span>
        </div>
      </div>
    ))}
  </div>
);

/* ══════════════════════════════════════════════════════════
   SECCIÓN: Calculadora (backend Django)
══════════════════════════════════════════════════════════ */
const SectionCalculator = ({ tool }) => {
  const [inputs, setInputs] = useState({});
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (key, val) => setInputs((p) => ({ ...p, [key]: val }));

  const handleCompute = async () => {
    setError("");
    setResults(null);
    setLoading(true);
    try {
      const payload = tool.calc.buildPayload(inputs);
      const res = await fetch(`${API}/${tool.calc.endpoint}/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) setError(data.error || JSON.stringify(data));
      else setResults(data);
    } catch {
      setError(
        "No se pudo conectar con el servidor. Verifica que el backend esté corriendo en localhost:8000",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="lab-section">
      <h2 className="lab-section-title" style={{ "--mc": tool.categoryColor }}>
        Calculadora Interactiva
      </h2>
      <p className="lab-calc-note">
        Los cálculos se procesan en el servidor — resultados más precisos y con
        tabla de iteraciones.
      </p>
      <div className="lab-calc">
        <div className="lab-fields">
          {tool.calc.fields.map((f) => (
            <div className="lab-field" key={f.key}>
              <label className="lab-field-label">{f.label}</label>
              <input
                className="lab-field-input"
                type="text"
                placeholder={f.placeholder}
                value={inputs[f.key] || ""}
                onChange={(e) => handleChange(f.key, e.target.value)}
                style={{ "--mc": tool.categoryColor }}
              />
              {f.hint && <span className="lab-field-hint">{f.hint}</span>}
            </div>
          ))}
        </div>

        <button
          className="lab-compute-btn"
          style={{ "--mc": tool.categoryColor }}
          onClick={handleCompute}
          disabled={loading}
        >
          {loading ? <span className="lab-spinner" /> : "Calcular →"}
        </button>

        {error && <p className="lab-error">{error}</p>}
        {results && tool.calc.renderResults(results, tool.categoryColor)}
      </div>
    </div>
  );
};

/* ══════════════════════════════════════════════════════════
   SECCIÓN: Relación con otros temas
══════════════════════════════════════════════════════════ */
const SectionRelations = ({ tool, onNavigate }) => (
  <div className="lab-section">
    <h2 className="lab-section-title" style={{ "--mc": tool.categoryColor }}>
      Relación con Otros Temas
    </h2>
    <div className="lab-relations">
      {tool.relations.map((r, i) => {
        const related = LAB_TOOLS.find((t) => t.id === r.id);
        return (
          <div
            key={i}
            className="lab-relation-card"
            style={{ "--mc": related?.categoryColor || tool.categoryColor }}
            onClick={() => related && onNavigate(related)}
          >
            <span className="lab-relation-icon">{related?.icon || "🔗"}</span>
            <div className="lab-relation-body">
              <p className="lab-relation-title">{r.title}</p>
              <p className="lab-relation-desc">{r.desc}</p>
            </div>
            <span className="lab-relation-arrow">→</span>
          </div>
        );
      })}
    </div>
  </div>
);

/* ══════════════════════════════════════════════════════════
   SECCIÓN: Aplicaciones reales
══════════════════════════════════════════════════════════ */
const SectionApplications = ({ tool }) => (
  <div className="lab-section">
    <h2 className="lab-section-title" style={{ "--mc": tool.categoryColor }}>
      Aplicaciones Reales
    </h2>
    <div className="lab-apps-grid">
      {tool.applications.map((app, i) => (
        <div
          key={i}
          className="lab-app-card"
          style={{ "--mc": tool.categoryColor }}
        >
          <span className="lab-app-icon">{app.icon}</span>
          <h4 className="lab-app-title">{app.title}</h4>
          <p className="lab-app-desc">{app.desc}</p>
          {app.example && (
            <div className="lab-app-example">
              <span className="lab-app-example-label">Ejemplo real</span>
              <span>{app.example}</span>
            </div>
          )}
        </div>
      ))}
    </div>
  </div>
);

/* ══════════════════════════════════════════════════════════
   MODAL FULLSCREEN
══════════════════════════════════════════════════════════ */
const TABS = [
  { id: "explain", label: "📖 Explicación" },
  { id: "examples", label: "🔍 Ejemplos" },
  { id: "calc", label: "🧮 Calculadora" },
  { id: "related", label: "🔗 Relaciones" },
  { id: "apps", label: "🌍 Aplicaciones" },
];

const LabModal = ({ tool, onClose }) => {
  const [tab, setTab] = useState("explain");
  const [currentTool, setCurrentTool] = useState(tool);

  useEffect(() => {
    setCurrentTool(tool);
    setTab("explain");
  }, [tool]);

  useEffect(() => {
    const h = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", h);
    return () => document.removeEventListener("keydown", h);
  }, [onClose]);

  const t = currentTool;

  return (
    <div className="lab-fs-overlay" onClick={onClose}>
      <div className="lab-fs-modal" onClick={(e) => e.stopPropagation()}>
        {/* SIDEBAR */}
        <aside className="lab-fs-sidebar" style={{ "--mc": t.categoryColor }}>
          <div className="lab-fs-sidebar-hero">
            <span className="lab-fs-big-icon">{t.icon}</span>
            <p className="lab-fs-sidebar-cat">{t.category}</p>
            <h2 className="lab-fs-sidebar-title">{t.title}</h2>
            <p className="lab-fs-sidebar-sub">{t.subtitle}</p>
            <div className="lab-fs-tags">
              {t.tags.map((tag) => (
                <span key={tag} className="lab-fs-tag">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <nav className="lab-fs-nav">
            {TABS.map((tb) => (
              <button
                key={tb.id}
                className={`lab-fs-nav-btn ${tab === tb.id ? "lab-fs-nav-btn--on" : ""}`}
                style={{ "--mc": t.categoryColor }}
                onClick={() => setTab(tb.id)}
              >
                {tb.label}
              </button>
            ))}
          </nav>

          <button className="lab-fs-close" onClick={onClose}>
            ✕ Cerrar
          </button>
        </aside>

        {/* CONTENIDO */}
        <main className="lab-fs-content">
          {tab === "explain" && <SectionExplanation tool={t} />}
          {tab === "examples" && <SectionExamples tool={t} />}
          {tab === "calc" && <SectionCalculator tool={t} />}
          {tab === "related" && (
            <SectionRelations
              tool={t}
              onNavigate={(nt) => {
                setCurrentTool(nt);
                setTab("explain");
              }}
            />
          )}
          {tab === "apps" && <SectionApplications tool={t} />}
        </main>
      </div>
    </div>
  );
};

/* ══════════════════════════════════════════════════════════
   CARD
══════════════════════════════════════════════════════════ */
const LabCard = ({ tool, onOpen }) => (
  <div
    className="lab-card"
    style={{ "--mc": tool.categoryColor }}
    onClick={() => onOpen(tool)}
  >
    <div className="lab-card-top">
      <span className="lab-card-cat">{tool.category}</span>
      <span className="lab-card-icon">{tool.icon}</span>
    </div>
    <h3 className="lab-card-title">{tool.title}</h3>
    <p className="lab-card-sub">{tool.subtitle}</p>
    <p className="lab-card-desc">{tool.desc}</p>
    <div className="lab-card-tags">
      {tool.tags.map((t) => (
        <span key={t} className="lab-card-tag">
          {t}
        </span>
      ))}
    </div>
    <div className="lab-card-footer">
      <span className="lab-card-open">Abrir herramienta →</span>
    </div>
  </div>
);

/* ══════════════════════════════════════════════════════════
   MAIN
══════════════════════════════════════════════════════════ */
const CATEGORIES = [
  "Todos",
  "Ing. Económica",
  "Inv. Operaciones",
  "Estadística",
  "Métodos Numéricos",
];

export const LabCuantitativo = () => {
  const [active, setActive] = useState("Todos");
  const [modal, setModal] = useState(null);

  const filtered =
    active === "Todos"
      ? LAB_TOOLS
      : LAB_TOOLS.filter((t) => t.category === active);

  useEffect(() => {
    document.body.style.overflow = modal ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [modal]);

  return (
    <div className="lab-wrap">
      <div className="lab-hero">
        <p className="lab-kicker">— lab cuantitativo</p>
        <h1 className="lab-heading">
          Herramientas
          <br />
          <em>matemáticas</em>
          <br />
          interactivas
        </h1>
        <p className="lab-sub">
          Calculadoras + artículos para Ingeniería Económica, Investigación de
          Operaciones, Estadística y Métodos Numéricos.
        </p>
      </div>

      <div className="lab-filters">
        {CATEGORIES.map((c) => (
          <button
            key={c}
            className={`lab-filter ${active === c ? "lab-filter--on" : ""}`}
            onClick={() => setActive(c)}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="lab-grid">
        {filtered.map((tool) => (
          <LabCard key={tool.id} tool={tool} onOpen={setModal} />
        ))}
      </div>

      {modal && <LabModal tool={modal} onClose={() => setModal(null)} />}
    </div>
  );
};
