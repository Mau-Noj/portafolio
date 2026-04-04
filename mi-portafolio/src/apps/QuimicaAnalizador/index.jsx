import React, { useState, useEffect, useRef } from "react";
import "./QuimicaAnalizador.css";

const DEFAULT_API =
  import.meta.env.VITE_API_URL ||
  "https://close-sapphire-mauricionoj-10f63b1b.koyeb.app/api";

// ── Alert de servidor dormido ─────────────────────────────────────────────────
const AlertServidorDormido = ({ onClose }) => {
  const [segundos, setSegundos] = useState(300);

  useEffect(() => {
    if (segundos <= 0) return;
    const t = setInterval(() => setSegundos((s) => s - 1), 1000);
    return () => clearInterval(t);
  }, [segundos]);

  const min = Math.floor(segundos / 60);
  const seg = segundos % 60;
  const progreso = ((300 - segundos) / 300) * 100;

  return (
    <div className="qa__sleep-alert">
      <div className="qa__sleep-icon">☕</div>
      <div className="qa__sleep-body">
        <p className="qa__sleep-title">El servidor está despertando…</p>
        <p className="qa__sleep-desc">
          Estoy en una capa gratuita — el servidor se duerme tras la
          inactividad. Espera unos <strong>5 minutos</strong> e intenta de
          nuevo.
        </p>
        <div className="qa__sleep-bar-wrap">
          <div className="qa__sleep-bar" style={{ width: `${progreso}%` }} />
        </div>
        <p className="qa__sleep-timer">
          {min}:{seg.toString().padStart(2, "0")} transcurridos
        </p>
      </div>
      <button className="qa__sleep-close" onClick={onClose}>
        ✕
      </button>
    </div>
  );
};

// ── Navbar interna ────────────────────────────────────────────────────────────
const NavInterna = ({ seccionActiva, setSeccion }) => {
  const [abierto, setAbierto] = useState(false);

  const menuItems = [
    { id: "analizador", label: "Analizador", icon: "🔍" },
    { id: "validador", label: "Validador", icon: "✅" },
    { id: "balanceador", label: "Balanceador", icon: "⚖️" },
    { id: "quiz", label: "Quiz", icon: "📝" },
  ];

  return (
    <div className={`qa__fab-container ${abierto ? "qa__fab--open" : ""}`}>
      <div className="qa__fab-menu">
        {menuItems.map((item) => (
          <button
            key={item.id}
            className={`qa__fab-item ${seccionActiva === item.id ? "qa__fab-item--active" : ""}`}
            onClick={() => {
              setSeccion(item.id);
              setAbierto(false);
            }}
          >
            <span className="qa__fab-label">{item.label}</span>
            <span className="qa__fab-icon">{item.icon}</span>
          </button>
        ))}
      </div>
      <button className="qa__fab-main" onClick={() => setAbierto(!abierto)}>
        <span className="qa__fab-main-icon">{abierto ? "✕" : "⚗️"}</span>
      </button>
    </div>
  );
};

// ── Notación libro: H2SO4 → H₂SO₄ con <sub> reales ──────────────────────────
const FormulaLibro = ({ formula, className = "" }) => {
  if (!formula) return null;
  const parts = [];
  let i = 0;
  while (i < formula.length) {
    let letters = "";
    while (i < formula.length && !/[0-9]/.test(formula[i]))
      letters += formula[i++];
    if (letters) parts.push(<span key={`l${i}`}>{letters}</span>);
    let digits = "";
    while (i < formula.length && /[0-9]/.test(formula[i]))
      digits += formula[i++];
    if (digits)
      parts.push(
        <sub key={`d${i}`} style={{ fontSize: "0.72em", lineHeight: 0 }}>
          {digits}
        </sub>,
      );
  }
  return <span className={className}>{parts}</span>;
};

// ── Teclado químico ───────────────────────────────────────────────────────────
const ELEMENTOS_COMUNES = [
  "H",
  "He",
  "Li",
  "Be",
  "B",
  "C",
  "N",
  "O",
  "F",
  "Ne",
  "Na",
  "Mg",
  "Al",
  "Si",
  "P",
  "S",
  "Cl",
  "Ar",
  "K",
  "Ca",
  "Fe",
  "Cu",
  "Zn",
  "Ag",
  "Au",
  "Hg",
  "Pb",
];

const TECLADO_ROWS = [
  {
    label: "Elementos frecuentes",
    items: ELEMENTOS_COMUNES.map((e) => ({
      label: e,
      value: e,
      tipo: "elemento",
    })),
  },
  {
    label: "Números y grupos",
    items: [
      { label: "(", value: "(", tipo: "grupo" },
      { label: ")", value: ")", tipo: "grupo" },
      ...["2", "3", "4", "5", "6", "7", "8", "9"].map((n) => ({
        label: n,
        value: n,
        tipo: "numero",
      })),
      { label: "⌫", value: "DEL", tipo: "accion" },
      { label: "✕", value: "CLR", tipo: "accion" },
    ],
  },
];

const TecladoQuimico = ({ onInsert, onDelete, onClear }) => {
  const [expandido, setExpandido] = useState(true);
  return (
    <div className="qa__teclado">
      <button
        className="qa__teclado-toggle"
        onClick={() => setExpandido((e) => !e)}
      >
        <span>⌨ Teclado químico</span>
        <span style={{ fontSize: "0.7rem", opacity: 0.6 }}>
          {expandido ? "▲ ocultar" : "▼ mostrar"}
        </span>
      </button>
      {expandido && (
        <div className="qa__teclado-body">
          {TECLADO_ROWS.map((row) => (
            <div key={row.label} className="qa__teclado-row">
              <span className="qa__teclado-label">{row.label}</span>
              <div className="qa__teclado-btns">
                {row.items.map((item, idx) => (
                  <button
                    key={idx}
                    className={`qa__key qa__key--${item.tipo}`}
                    onClick={() => {
                      if (item.value === "DEL") onDelete();
                      else if (item.value === "CLR") onClear();
                      else onInsert(item.value);
                    }}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// ══════════════════════════════════════════════════════════════════════════════
// SECCIÓN: ANALIZADOR
// ══════════════════════════════════════════════════════════════════════════════
const EJEMPLOS = [
  { f: "H2SO4", label: "H₂SO₄" },
  { f: "Fe2O3", label: "Fe₂O₃" },
  { f: "Ca3(PO4)2", label: "Ca₃(PO₄)₂" },
  { f: "NaOH", label: "NaOH" },
  { f: "CO2", label: "CO₂" },
  { f: "HCl", label: "HCl" },
  { f: "NaCl", label: "NaCl" },
];

const SeccionAnalizador = ({ api }) => {
  const [formula, setFormula] = useState("");
  const [resultado, setResultado] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const inputRef = useRef(null);

  const insertarTexto = (texto) => {
    const input = inputRef.current;
    if (!input) {
      setFormula((f) => f + texto);
      return;
    }
    const start = input.selectionStart;
    const end = input.selectionEnd;
    const nueva = formula.slice(0, start) + texto + formula.slice(end);
    setFormula(nueva);
    setTimeout(() => {
      input.focus();
      input.setSelectionRange(start + texto.length, start + texto.length);
    }, 0);
  };

  const borrarUltimo = () => {
    const input = inputRef.current;
    if (!input) {
      setFormula((f) => f.slice(0, -1));
      return;
    }
    const start = input.selectionStart;
    if (start === 0) return;
    const nueva = formula.slice(0, start - 1) + formula.slice(start);
    setFormula(nueva);
    setTimeout(() => {
      input.focus();
      input.setSelectionRange(start - 1, start - 1);
    }, 0);
  };

  const analizar = async (f) => {
    const target = (f || formula).trim();
    if (!target) return;
    setLoading(true);
    setError("");
    setResultado(null);
    try {
      const res = await fetch(`${api}/analizar/formula`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ formula: target }),
      });
      const data = await res.json();
      if (!res.ok)
        throw new Error(data.detalle || data.error || "Error al analizar");
      setResultado(data);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="qa__section">
      <div className="qa__section-header">
        <h2 className="qa__section-title">Analizador de Fórmulas</h2>
        <p className="qa__section-sub">
          Obtén los tres sistemas de nomenclatura química al instante.
        </p>
      </div>

      <div className="qa__chips">
        {EJEMPLOS.map(({ f, label }) => (
          <button
            key={f}
            className="qa__chip"
            onClick={() => {
              setFormula(f);
              analizar(f);
            }}
          >
            {label}
          </button>
        ))}
      </div>

      {formula && (
        <div className="qa__formula-preview">
          <span className="qa__formula-preview-label">Vista previa</span>
          <FormulaLibro
            formula={formula}
            className="qa__formula-preview-value"
          />
        </div>
      )}

      <div className="qa__input-row">
        <input
          ref={inputRef}
          className="qa__input"
          value={formula}
          onChange={(e) => setFormula(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && analizar()}
          placeholder="Ej: H2SO4, Ca3(PO4)2, Fe2O3…"
          spellCheck={false}
          autoComplete="off"
        />
        <button
          className="qa__btn-primary"
          onClick={() => analizar()}
          disabled={loading}
        >
          {loading ? <span className="qa__spinner" /> : "Analizar"}
        </button>
      </div>

      <TecladoQuimico
        onInsert={insertarTexto}
        onDelete={borrarUltimo}
        onClear={() => {
          setFormula("");
          setResultado(null);
          setError("");
        }}
      />

      {error && (
        <>
          <AlertServidorDormido onClose={() => setError("")} />
          <div className="qa__error-box" style={{ marginTop: "8px" }}>
            ⚠ {error}
          </div>
        </>
      )}

      {resultado && (
        <div className="qa__resultado" style={{ marginTop: "24px" }}>
          <div className="qa__result-header">
            <FormulaLibro
              formula={resultado.formulaEntrada}
              className="qa__formula-display"
            />
            <span className="qa__badge qa__badge--info">
              {resultado.tipoCompuesto?.replace(/_/g, " ")}
            </span>
            <span
              className={`qa__badge ${resultado.valida ? "qa__badge--ok" : "qa__badge--err"}`}
            >
              {resultado.valida ? "✓ Válida" : "✗ Inválida"}
            </span>
          </div>

          {resultado.usoComun && (
            <p className="qa__uso">{resultado.usoComun}</p>
          )}

          <div className="qa__nom-grid">
            {[
              { label: "IUPAC", value: resultado.nombreIUPAC },
              { label: "Stock", value: resultado.nombreStock },
              { label: "Tradicional", value: resultado.nombreTradicional },
            ]
              .filter((n) => n.value)
              .map(({ label, value }) => (
                <div className="qa__nom-card" key={label}>
                  <span className="qa__nom-label">{label}</span>
                  <span className="qa__nom-value">{value}</span>
                </div>
              ))}
          </div>

          {resultado.elementos?.length > 0 && (
            <div className="qa__elementos">
              {resultado.elementos.map((el) => (
                <div className="qa__elemento" key={el.simbolo}>
                  <FormulaLibro
                    formula={
                      el.simbolo +
                      (el.subindice > 1 ? String(el.subindice) : "")
                    }
                    className="qa__elemento-simbolo"
                  />
                  <span className="qa__elemento-nombre">{el.nombre}</span>
                  <span className="qa__elemento-sub">×{el.subindice}</span>
                </div>
              ))}
            </div>
          )}

          {resultado.pasos?.length > 0 && (
            <details className="qa__pasos">
              <summary className="qa__pasos-title">
                Ver razonamiento paso a paso
              </summary>
              <div className="qa__pasos-body">
                {resultado.pasos.map((p, i) => (
                  <p className="qa__paso" key={i}>
                    {p}
                  </p>
                ))}
              </div>
            </details>
          )}
        </div>
      )}
    </section>
  );
};

// ══════════════════════════════════════════════════════════════════════════════
// SECCIÓN: VALIDADOR
// ══════════════════════════════════════════════════════════════════════════════
const EJEMPLOS_VAL = ["H2O", "Ca3(PO4)2", "H2SO4", "H2X4", "Ca((OH)2"];

const SeccionValidador = ({ api }) => {
  const [formula, setFormula] = useState("");
  const [resultado, setResultado] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const validar = async (f) => {
    const target = (f || formula).trim();
    if (!target) return;
    setLoading(true);
    setError("");
    setResultado(null);
    try {
      const res = await fetch(`${api}/validar`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ formula: target }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Error al validar");
      setResultado(data);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="qa__section">
      <div className="qa__section-header">
        <h2 className="qa__section-title">Validador de Fórmulas</h2>
        <p className="qa__section-sub">
          Detecta errores sintácticos con el parser ANTLR4.
        </p>
      </div>

      <div className="qa__chips">
        {EJEMPLOS_VAL.map((e) => (
          <button
            key={e}
            className="qa__chip"
            onClick={() => {
              setFormula(e);
              validar(e);
            }}
          >
            {e}
          </button>
        ))}
      </div>

      <div className="qa__input-row">
        <input
          className="qa__input"
          value={formula}
          onChange={(e) => setFormula(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && validar()}
          placeholder="Ej: Ca3(PO4)2"
          spellCheck={false}
        />
        <button
          className="qa__btn-primary"
          onClick={() => validar()}
          disabled={loading}
        >
          {loading ? <span className="qa__spinner" /> : "Validar"}
        </button>
      </div>

      {error && (
        <>
          <AlertServidorDormido onClose={() => setError("")} />
          <div className="qa__error-box" style={{ marginTop: "8px" }}>
            ⚠ {error}
          </div>
        </>
      )}

      {resultado && (
        <div className="qa__resultado">
          <div className="qa__result-header">
            <FormulaLibro
              formula={resultado.formula}
              className="qa__formula-display"
            />
            <span
              className={`qa__badge ${resultado.valida ? "qa__badge--ok" : "qa__badge--err"}`}
            >
              {resultado.valida ? "✓ Fórmula válida" : "✗ Fórmula inválida"}
            </span>
          </div>

          {resultado.errores?.length > 0 && (
            <div className="qa__errores-list">
              {resultado.errores.map((e, i) => (
                <div className="qa__error-box" key={i}>
                  {e}
                </div>
              ))}
            </div>
          )}

          {resultado.valida && resultado.atomos && (
            <table className="qa__tabla">
              <thead>
                <tr>
                  <th>Elemento</th>
                  <th>Cantidad</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(resultado.atomos).map(([simbolo, cantidad]) => (
                  <tr key={simbolo}>
                    <td className="qa__tabla-simbolo">
                      <FormulaLibro formula={simbolo} />
                    </td>
                    <td>{cantidad}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {resultado.valida && (
            <p className="qa__info-box">
              ✓ Sintaxis correcta. Usa el <strong>Analizador</strong> para
              obtener la nomenclatura completa.
            </p>
          )}
        </div>
      )}
    </section>
  );
};

// ══════════════════════════════════════════════════════════════════════════════
// SECCIÓN: QUIZ
// ══════════════════════════════════════════════════════════════════════════════
const SeccionQuiz = ({ api }) => {
  const [pregunta, setPregunta] = useState(null);
  const [seleccion, setSeleccion] = useState(null);
  const [feedback, setFeedback] = useState(null);
  const [loading, setLoading] = useState(false);
  const [score, setScore] = useState({ correctas: 0, total: 0 });
  const [error, setError] = useState("");

  useEffect(() => {
    cargarPregunta();
  }, []);

  const cargarPregunta = async () => {
    setLoading(true);
    setSeleccion(null);
    setFeedback(null);
    setError("");
    try {
      const res = await fetch(`${api}/quiz/pregunta`);
      const data = await res.json();
      if (!res.ok) throw new Error("Error al cargar pregunta");
      setPregunta(data);
    } catch {
      setError("No se pudo conectar con el servidor.");
    } finally {
      setLoading(false);
    }
  };

  const responder = async (opcion) => {
    if (seleccion || !pregunta) return;
    setSeleccion(opcion);
    const match = pregunta.pregunta.match(/de\s+(\S+)\?/);
    const formula = match ? match[1] : "";
    try {
      const res = await fetch(`${api}/quiz/responder`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ formula, respuesta: opcion }),
      });
      const data = await res.json();
      setFeedback(data);
      setScore((prev) => ({
        correctas: prev.correctas + (data.correcto ? 1 : 0),
        total: prev.total + 1,
      }));
    } catch {
      setError("Error al verificar respuesta.");
    }
  };

  const getClase = (opcion) => {
    if (!feedback || seleccion !== opcion) return "";
    return feedback.correcto
      ? "qa__opcion--correcta"
      : "qa__opcion--incorrecta";
  };

  const porcentaje =
    score.total > 0 ? Math.round((score.correctas / score.total) * 100) : null;

  return (
    <section className="qa__section">
      <div className="qa__section-header">
        <h2 className="qa__section-title">Quiz de Nomenclatura</h2>
        <p className="qa__section-sub">
          Pon a prueba tu conocimiento de fórmulas y nombres.
        </p>
      </div>

      <div className="qa__score-bar">
        <div>
          <span className="qa__score-num">
            {score.correctas}/{score.total}
          </span>
          <span className="qa__score-label">correctas</span>
        </div>
        {porcentaje !== null && (
          <span
            className={`qa__badge ${porcentaje >= 70 ? "qa__badge--ok" : "qa__badge--err"}`}
          >
            {porcentaje}%
          </span>
        )}
      </div>

      {error && (
        <>
          <AlertServidorDormido onClose={() => setError("")} />
          <div className="qa__error-box" style={{ marginTop: "8px" }}>
            ⚠ {error}
          </div>
        </>
      )}

      {loading && (
        <div className="qa__loading-wrap">
          <span className="qa__spinner" />
        </div>
      )}

      {pregunta && !loading && (
        <div className="qa__quiz-card">
          <p className="qa__quiz-pregunta">
            {pregunta.pregunta
              .split(/(\b[A-Z][a-zA-Z0-9()]*\b)/)
              .map((part, i) =>
                /^[A-Z][a-zA-Z0-9()]*$/.test(part) && part.length > 1 ? (
                  <FormulaLibro key={i} formula={part} />
                ) : (
                  <span key={i}>{part}</span>
                ),
              )}
          </p>

          <div className="qa__opciones">
            {pregunta.opciones?.map((opcion) => (
              <button
                key={opcion}
                className={`qa__opcion ${getClase(opcion)}`}
                onClick={() => responder(opcion)}
                disabled={!!seleccion}
              >
                {opcion}
              </button>
            ))}
          </div>

          {feedback && (
            <div className="qa__feedback">
              <p
                className={feedback.correcto ? "qa__info-box" : "qa__error-box"}
              >
                {feedback.correcto
                  ? `✓ ¡Correcto! ${feedback.explicacion}`
                  : `✗ Incorrecto. La respuesta es: ${feedback.respuestaCorrecta}`}
              </p>
              <button
                className="qa__btn-primary qa__btn-siguiente"
                onClick={cargarPregunta}
              >
                Siguiente →
              </button>
            </div>
          )}
        </div>
      )}
    </section>
  );
};

// ══════════════════════════════════════════════════════════════════════════════
// SECCIÓN: BALANCEADOR DE ECUACIONES
// ══════════════════════════════════════════════════════════════════════════════
const EJEMPLOS_BAL = [
  { e: "H2 + O2 -> H2O", label: "H₂ + O₂ → H₂O" },
  { e: "Fe + O2 -> Fe2O3", label: "Fe + O₂ → Fe₂O₃" },
  { e: "Al + O2 -> Al2O3", label: "Al + O₂ → Al₂O₃" },
  { e: "C3H8 + O2 -> CO2 + H2O", label: "C₃H₈ + O₂ → CO₂ + H₂O" },
  { e: "Na + H2O -> NaOH + H2", label: "Na + H₂O → NaOH + H₂" },
  { e: "N2 + H2 -> NH3", label: "N₂ + H₂ → NH₃" },
  { e: "KMnO4 + HCl -> KCl + MnCl2 + H2O + Cl2", label: "KMnO₄ + HCl → ..." },
];

const MoleculaBalanceada = ({ formula, coeficiente, lado }) => {
  const colorBase =
    lado === "reactivo" ? "var(--qa-accent2)" : "var(--qa-accent)";
  return (
    <span className="qa__mol-bal" style={{ "--mol-color": colorBase }}>
      {coeficiente > 1 && <span className="qa__mol-coef">{coeficiente}</span>}
      <FormulaLibro formula={formula} />
    </span>
  );
};

const TablaBalance = ({ moleculas, elementos }) => (
  <table className="qa__tabla qa__tabla-balance">
    <thead>
      <tr>
        <th>Elemento</th>
        {moleculas.map((m, i) => (
          <th
            key={i}
            style={{
              color:
                m.lado === "reactivo"
                  ? "var(--qa-accent2)"
                  : "var(--qa-accent)",
            }}
          >
            <FormulaLibro formula={m.formula} />
            {m.coeficiente > 1 && (
              <span style={{ fontSize: "0.65rem", marginLeft: 2 }}>
                ×{m.coeficiente}
              </span>
            )}
          </th>
        ))}
        <th style={{ color: "var(--qa-accent2)" }}>Σ React</th>
        <th style={{ color: "var(--qa-accent)" }}>Σ Prod</th>
        <th>✓</th>
      </tr>
    </thead>
    <tbody>
      {elementos.map((elem) => {
        const sumaR = moleculas
          .filter((m) => m.lado === "reactivo")
          .reduce((s, m) => s + m.coeficiente * (m.atomos[elem] || 0), 0);
        const sumaP = moleculas
          .filter((m) => m.lado === "producto")
          .reduce((s, m) => s + m.coeficiente * (m.atomos[elem] || 0), 0);
        return (
          <tr key={elem}>
            <td className="qa__tabla-simbolo">
              <FormulaLibro formula={elem} />
            </td>
            {moleculas.map((m, i) => (
              <td
                key={i}
                style={{ opacity: (m.atomos[elem] || 0) === 0 ? 0.25 : 1 }}
              >
                {m.coeficiente * (m.atomos[elem] || 0)}
              </td>
            ))}
            <td style={{ fontWeight: 600, color: "var(--qa-accent2)" }}>
              {sumaR}
            </td>
            <td style={{ fontWeight: 600, color: "var(--qa-accent)" }}>
              {sumaP}
            </td>
            <td>{sumaR === sumaP ? "✓" : "✗"}</td>
          </tr>
        );
      })}
    </tbody>
  </table>
);

const TECLADO_BAL_ROWS = [
  {
    label: "Elementos frecuentes",
    items: [
      "H",
      "O",
      "C",
      "N",
      "Na",
      "K",
      "Ca",
      "Fe",
      "Al",
      "Mg",
      "S",
      "P",
      "Cl",
      "Cu",
      "Zn",
    ].map((e) => ({ label: e, value: e, tipo: "elemento" })),
  },
  {
    label: "Operadores",
    items: [
      { label: "+", value: " + ", tipo: "grupo" },
      { label: "→", value: " -> ", tipo: "grupo" },
      ...["2", "3", "4", "5", "6", "7", "8", "9"].map((n) => ({
        label: n,
        value: n,
        tipo: "numero",
      })),
      { label: "(", value: "(", tipo: "grupo" },
      { label: ")", value: ")", tipo: "grupo" },
      { label: "⌫", value: "DEL", tipo: "accion" },
      { label: "✕", value: "CLR", tipo: "accion" },
    ],
  },
];

const SeccionBalanceador = ({ api }) => {
  const [ecuacion, setEcuacion] = useState("");
  const [resultado, setResultado] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [tecladoOpen, setTecladoOpen] = useState(true);
  const inputRef = useRef(null);

  const insertarTexto = (texto) => {
    const input = inputRef.current;
    if (!input) {
      setEcuacion((e) => e + texto);
      return;
    }
    const start = input.selectionStart;
    const end = input.selectionEnd;
    const nueva = ecuacion.slice(0, start) + texto + ecuacion.slice(end);
    setEcuacion(nueva);
    setTimeout(() => {
      input.focus();
      input.setSelectionRange(start + texto.length, start + texto.length);
    }, 0);
  };

  const borrarUltimo = () => {
    const input = inputRef.current;
    if (!input) {
      setEcuacion((e) => e.slice(0, -1));
      return;
    }
    const start = input.selectionStart;
    if (start === 0) return;
    const nueva = ecuacion.slice(0, start - 1) + ecuacion.slice(start);
    setEcuacion(nueva);
    setTimeout(() => {
      input.focus();
      input.setSelectionRange(start - 1, start - 1);
    }, 0);
  };

  const balancear = async (ec) => {
    const target = (ec || ecuacion).trim();
    if (!target) return;
    setLoading(true);
    setError("");
    setResultado(null);
    try {
      const res = await fetch(`${api}/balancear`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ecuacion: target }),
      });
      const data = await res.json();
      if (!res.ok || !data.ecuacionBalanceada)
        throw new Error(data.error || "No se pudo balancear");
      setResultado(data);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="qa__section">
      <div className="qa__section-header">
        <h2 className="qa__section-title">Balanceador de Ecuaciones</h2>
        <p className="qa__section-sub">
          Obtén los coeficientes mínimos enteros por álgebra lineal.
        </p>
      </div>

      <div
        className="qa__info-box"
        style={{ marginBottom: 16, fontSize: "0.8rem" }}
      >
        Formato:{" "}
        <code
          style={{ fontFamily: "var(--qa-mono)", color: "var(--qa-accent)" }}
        >
          H2 + O2 -&gt; H2O
        </code>
        &nbsp;·&nbsp; Usa{" "}
        <code style={{ fontFamily: "var(--qa-mono)" }}>-&gt;</code> como flecha.
        Separa con <code style={{ fontFamily: "var(--qa-mono)" }}>+</code>.
      </div>

      <div className="qa__chips">
        {EJEMPLOS_BAL.map(({ e, label }) => (
          <button
            key={e}
            className="qa__chip"
            onClick={() => {
              setEcuacion(e);
              balancear(e);
            }}
          >
            {label}
          </button>
        ))}
      </div>

      {ecuacion && (
        <div className="qa__formula-preview">
          <span className="qa__formula-preview-label">Vista previa</span>
          <span
            className="qa__formula-preview-value"
            style={{ fontSize: "1.1rem" }}
          >
            {ecuacion.split(/(\s*\+\s*|\s*->\s*|\s*→\s*)/).map((part, i) => {
              const t = part.trim();
              if (t === "+")
                return (
                  <span
                    key={i}
                    style={{ color: "var(--qa-text2)", margin: "0 4px" }}
                  >
                    +
                  </span>
                );
              if (t === "->" || t === "→")
                return (
                  <span
                    key={i}
                    style={{ color: "var(--qa-text2)", margin: "0 4px" }}
                  >
                    →
                  </span>
                );
              return part.trim() ? (
                <FormulaLibro key={i} formula={part.trim()} />
              ) : null;
            })}
          </span>
        </div>
      )}

      <div className="qa__input-row">
        <input
          ref={inputRef}
          className="qa__input"
          value={ecuacion}
          onChange={(e) => setEcuacion(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && balancear()}
          placeholder="Ej: Fe + O2 -> Fe2O3"
          spellCheck={false}
          autoComplete="off"
        />
        <button
          className="qa__btn-primary"
          onClick={() => balancear()}
          disabled={loading}
        >
          {loading ? <span className="qa__spinner" /> : "Balancear"}
        </button>
      </div>

      <div className="qa__teclado">
        <button
          className="qa__teclado-toggle"
          onClick={() => setTecladoOpen((v) => !v)}
        >
          <span>⌨ Teclado de ecuaciones</span>
          <span style={{ fontSize: "0.7rem", opacity: 0.6 }}>
            {tecladoOpen ? "▲ ocultar" : "▼ mostrar"}
          </span>
        </button>
        {tecladoOpen && (
          <div className="qa__teclado-body">
            {TECLADO_BAL_ROWS.map((row) => (
              <div key={row.label} className="qa__teclado-row">
                <span className="qa__teclado-label">{row.label}</span>
                <div className="qa__teclado-btns">
                  {row.items.map((item, idx) => (
                    <button
                      key={idx}
                      className={`qa__key qa__key--${item.tipo}`}
                      onClick={() => {
                        if (item.value === "DEL") borrarUltimo();
                        else if (item.value === "CLR") {
                          setEcuacion("");
                          setResultado(null);
                          setError("");
                        } else insertarTexto(item.value);
                      }}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {error && (
        <>
          <AlertServidorDormido onClose={() => setError("")} />
          <div className="qa__error-box" style={{ marginTop: "8px" }}>
            ⚠ {error}
          </div>
        </>
      )}

      {resultado && (
        <div className="qa__resultado" style={{ marginTop: 24 }}>
          <div
            className="qa__result-header"
            style={{ flexWrap: "wrap", gap: 8 }}
          >
            <div className="qa__ecuacion-balanceada">
              {resultado.moleculas.map((m, i) => {
                const totalReact = resultado.moleculas.filter(
                  (x) => x.lado === "reactivo",
                ).length;
                return (
                  <React.Fragment key={i}>
                    {i > 0 && (
                      <span className="qa__bal-op">
                        {i === totalReact ? "→" : "+"}
                      </span>
                    )}
                    <MoleculaBalanceada
                      formula={m.formula}
                      coeficiente={m.coeficiente}
                      lado={m.lado}
                    />
                  </React.Fragment>
                );
              })}
            </div>
            <span className="qa__badge qa__badge--ok">✓ Balanceada</span>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <code className="qa__ec-texto">{resultado.ecuacionBalanceada}</code>
            <button
              className="qa__btn-copy"
              onClick={() =>
                navigator.clipboard?.writeText(resultado.ecuacionBalanceada)
              }
            >
              ⎘ copiar
            </button>
          </div>

          <details className="qa__pasos" open>
            <summary className="qa__pasos-title">
              Tabla de verificación de balance
            </summary>
            <div style={{ overflowX: "auto", padding: "8px 16px 16px" }}>
              <TablaBalance
                moleculas={resultado.moleculas}
                elementos={resultado.elementosBalanceados}
              />
            </div>
          </details>
        </div>
      )}
    </section>
  );
};

// ══════════════════════════════════════════════════════════════════════════════
// APP PRINCIPAL
// ══════════════════════════════════════════════════════════════════════════════
const QuimicaAnalizador = ({ apiBaseUrl }) => {
  const api = apiBaseUrl || DEFAULT_API;
  const [seccion, setSeccion] = useState("analizador");

  return (
    <div className="qa__wrap">
      <NavInterna seccionActiva={seccion} setSeccion={setSeccion} />
      <main className="qa__main">
        {seccion === "analizador" && <SeccionAnalizador api={api} />}
        {seccion === "validador" && <SeccionValidador api={api} />}
        {seccion === "balanceador" && <SeccionBalanceador api={api} />}
        {seccion === "quiz" && <SeccionQuiz api={api} />}
      </main>
    </div>
  );
};

export default QuimicaAnalizador;
