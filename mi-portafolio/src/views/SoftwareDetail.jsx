// src/views/SoftwareDetail.jsx
import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  getSoftwareById,
  ESTADOS,
  FASES_RUP,
  TIPO_DIAGRAMA,
} from "../models/software.data";
import { useSEO } from "../hooks/useSEO";
import { ArchDiagram } from "../components/ArchDiagram";
import { UMLDiagram } from "../components/UMLDiagram";
import "./SoftwareDetail.css";

// ── Mermaid loader ───────────────────────────────────────────────────────────
const useMermaid = () => {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    if (window.mermaid) {
      setLoaded(true);
      return;
    }
    const s = document.createElement("script");
    s.src = "https://cdn.jsdelivr.net/npm/mermaid@10/dist/mermaid.min.js";
    s.onload = () => {
      window.mermaid.initialize({
        startOnLoad: false,
        theme: "dark",
        securityLevel: "loose",
      });
      setLoaded(true);
    };
    document.head.appendChild(s);
  }, []);
  return loaded;
};

const MermaidDiagram = ({ code, id }) => {
  const ref = useRef(null);
  const mermaidLoaded = useMermaid();

  useEffect(() => {
    if (!mermaidLoaded || !ref.current || !code?.trim()) return;
    const render = async () => {
      try {
        const { svg } = await window.mermaid.render(
          `mermaid-${id}`,
          code.trim(),
        );
        if (ref.current) ref.current.innerHTML = svg;
      } catch (e) {
        if (ref.current)
          ref.current.innerHTML = `<pre style="color:#f87171;font-size:0.75rem">${e.message}</pre>`;
      }
    };
    render();
  }, [mermaidLoaded, code, id]);

  return <div ref={ref} className="sd__mermaid" />;
};

// ── Icono GitHub ─────────────────────────────────────────────────────────────
const GitHubIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.009-.868-.013-1.703-2.782.603-3.369-1.342-3.369-1.342-.454-1.154-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0 1 12 6.836a9.59 9.59 0 0 1 2.504.337c1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
  </svg>
);

const PRIORIDAD_COLOR = { Alta: "#dc2626", Media: "#f59e0b", Baja: "#16a34a" };
const ESTADO_RF_COLOR = {
  Implementado: "#16a34a",
  Pendiente: "#f59e0b",
  Cancelado: "#dc2626",
};

const Badge = ({ text, color }) => (
  <span className="sd__badge" style={{ borderColor: color, color }}>
    {text}
  </span>
);

export const SoftwareDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const sw = getSoftwareById(id);
  const [tab, setTab] = useState("demo");
  const [diagActivo, setDiagActivo] = useState(0);

  // SEO dinámico por proyecto
  useSEO({
    title: sw ? `${sw.nombre} · Software` : "Software",
    description: sw
      ? sw.tagline
      : "Proyectos de software con documentación RUP.",
    url: sw
      ? `https://mauricionoj.com/software/${sw.id}`
      : "https://mauricionoj.com/software",
  });

  if (!sw)
    return (
      <div className="sd-wrap sd-wrap--404">
        <p>Proyecto no encontrado.</p>
        <button onClick={() => navigate("/software")}>← Volver</button>
      </div>
    );

  const estado = ESTADOS[sw.estado];
  const tabs = [
    {
      id: "demo",
      label: "▶ Demo",
      show: !!sw.demo?.youtube_id || !!sw.app?.activa,
    },
    { id: "reqs", label: "◎ Requerimientos", show: true },
    { id: "uml", label: "⬡ Diagramas UML", show: sw.diagramas?.length > 0 },
    { id: "arquitectura", label: "⌖ Arquitectura", show: true },
    { id: "patrones", label: "◈ Patrones", show: sw.patrones?.length > 0 },
    {
      id: "trazabilidad",
      label: "⊞ Trazabilidad",
      show: sw.trazabilidad?.length > 0,
    },
    { id: "ciclo", label: "◉ Ciclo de Vida", show: true },
  ].filter((t) => t.show);

  return (
    <div className="sd-wrap">
      <div className="sd">
        {/* ── Breadcrumb ── */}
        <nav className="sd__breadcrumb">
          <button onClick={() => navigate("/software")}>Software</button>
          <span>/</span>
          <span>{sw.nombre}</span>
        </nav>

        {/* ── Hero ── */}
        <div className="sd__hero">
          <div className="sd__hero-left">
            <div className="sd__hero-meta">
              <span className="sd__estado" style={{ color: estado.color }}>
                <span
                  className="sd__dot"
                  style={{ background: estado.color }}
                />
                {estado.label}
              </span>
              <span className="sd__año">{sw.año}</span>
              <span className="sd__metodologia">
                RUP · {sw.metodologia?.iteraciones} iteraciones
              </span>
            </div>

            <h1 className="sd__name">{sw.nombre}</h1>
            <p className="sd__tagline">{sw.tagline}</p>
            <p className="sd__desc">{sw.descripcion}</p>

            {/* ── Botones de acción ── */}
            <div className="sd__hero-actions">
              {sw.app?.activa && (
                <button
                  className="sd__btn sd__btn--primary"
                  onClick={() => navigate(`/software/${sw.id}/app`)}
                >
                  ▶ Abrir aplicación
                </button>
              )}
              {sw.github && (
                <a
                  href={sw.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="sd__btn sd__btn--github"
                >
                  <GitHubIcon />
                  Ver en GitHub
                </a>
              )}
            </div>

            {/* Problema / Solución */}
            <div className="sd__ps">
              <div className="sd__ps-block sd__ps-block--prob">
                <p className="sd__ps-label">Problema</p>
                <p className="sd__ps-text">{sw.problema}</p>
              </div>
              <div className="sd__ps-block sd__ps-block--sol">
                <p className="sd__ps-label">Solución</p>
                <p className="sd__ps-text">{sw.solucion}</p>
              </div>
            </div>
          </div>

          <div className="sd__hero-right">
            {/* Stack */}
            <div className="sd__stack-card">
              <p className="sd__stack-title">Stack Tecnológico</p>
              {sw.stack?.frontend?.length > 0 && (
                <div className="sd__stack-row">
                  <span>Frontend</span>
                  <div>
                    {sw.stack.frontend.map((t) => (
                      <span key={t} className="sd__stack-tag">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              {sw.stack?.backend?.length > 0 && (
                <div className="sd__stack-row">
                  <span>Backend</span>
                  <div>
                    {sw.stack.backend.map((t) => (
                      <span key={t} className="sd__stack-tag">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              {sw.stack?.base_datos?.length > 0 && (
                <div className="sd__stack-row">
                  <span>BD</span>
                  <div>
                    {sw.stack.base_datos.map((t) => (
                      <span key={t} className="sd__stack-tag">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              {sw.stack?.otros?.length > 0 && (
                <div className="sd__stack-row">
                  <span>Otros</span>
                  <div>
                    {sw.stack.otros.map((t) => (
                      <span key={t} className="sd__stack-tag">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Rol */}
            <div className="sd__rol-card">
              <p className="sd__rol-label">Rol en el proyecto</p>
              <p className="sd__rol-value">{sw.metodologia?.rol_autor}</p>
              <p className="sd__rol-dur">
                {sw.metodologia?.duracion} · {sw.metodologia?.equipo} persona(s)
              </p>
            </div>

            {/* GitHub card — si tiene repo */}
            {sw.github && (
              <a
                href={sw.github}
                target="_blank"
                rel="noopener noreferrer"
                className="sd__github-card"
              >
                <GitHubIcon />
                <div>
                  <p className="sd__github-label">Repositorio</p>
                  <p className="sd__github-url">
                    {sw.github.replace("https://github.com/", "")}
                  </p>
                </div>
                <span className="sd__github-arrow">→</span>
              </a>
            )}
          </div>
        </div>

        {/* ── Fases RUP ── */}
        <div className="sd__rup">
          {FASES_RUP.map((fase, i) => {
            const info = sw.metodologia?.fases?.find((f) => f.fase === fase.id);
            const completada = info?.completada;
            const esActual = sw.metodologia?.fase_actual === fase.id;
            return (
              <div
                key={fase.id}
                className={`sd__rup-fase ${completada ? "sd__rup-fase--done" : ""} ${esActual ? "sd__rup-fase--actual" : ""}`}
              >
                <div className="sd__rup-icon">{fase.icon}</div>
                <div className="sd__rup-label">{fase.label}</div>
                {i < FASES_RUP.length - 1 && <div className="sd__rup-line" />}
              </div>
            );
          })}
        </div>

        {/* ── Tabs ── */}
        <div className="sd__tabs">
          {tabs.map((t) => (
            <button
              key={t.id}
              className={`sd__tab ${tab === t.id ? "sd__tab--active" : ""}`}
              onClick={() => setTab(t.id)}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* ══════════════════════════════════════════
            DEMO
        ══════════════════════════════════════════ */}
        {tab === "demo" && (sw.demo?.youtube_id || sw.app?.activa) && (
          <div className="sd__panel sd__panel--fade">
            <div className="sd__section">
              <div className="sd__demo-actions">
                {sw.app?.activa && (
                  <button
                    onClick={() => navigate(`/software/${sw.id}/app`)}
                    className="sd__btn sd__btn--primary"
                  >
                    ▶ Abrir aplicación
                  </button>
                )}
                {sw.github && (
                  <a
                    href={sw.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="sd__btn sd__btn--github"
                  >
                    <GitHubIcon />
                    Código fuente
                  </a>
                )}
              </div>

              {sw.demo?.descripcion && (
                <p className="sd__section-desc">{sw.demo.descripcion}</p>
              )}

              {sw.demo?.youtube_id ? (
                <div className="sd__youtube">
                  <iframe
                    src={`https://www.youtube.com/embed/${sw.demo.youtube_id}`}
                    title={sw.nombre}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              ) : (
                <div className="sd__demo-placeholder">
                  <span>▶</span>
                  <p>Demo en video próximamente</p>
                  <span className="sd__demo-hint">
                    Usa el botón "Abrir aplicación" para ver el proyecto en vivo
                  </span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ══════════════════════════════════════════
            REQUERIMIENTOS
        ══════════════════════════════════════════ */}
        {tab === "reqs" && (
          <div className="sd__panel sd__panel--fade">
            <div className="sd__section">
              <h2 className="sd__section-title">Requerimientos Funcionales</h2>
              <div className="sd__rf-table">
                <div className="sd__rf-head">
                  <span>ID</span>
                  <span>Nombre</span>
                  <span>Prioridad</span>
                  <span>Estado</span>
                </div>
                {sw.requerimientos.funcionales.map((rf) => (
                  <div key={rf.id} className="sd__rf-row">
                    <span className="sd__rf-id">{rf.id}</span>
                    <div>
                      <p className="sd__rf-nombre">{rf.nombre}</p>
                      <p className="sd__rf-desc">{rf.descripcion}</p>
                    </div>
                    <Badge
                      text={rf.prioridad}
                      color={PRIORIDAD_COLOR[rf.prioridad]}
                    />
                    <Badge
                      text={rf.estado}
                      color={ESTADO_RF_COLOR[rf.estado]}
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="sd__section">
              <h2 className="sd__section-title">
                Requerimientos No Funcionales
              </h2>
              <div className="sd__rnf-grid">
                {sw.requerimientos.no_funcionales.map((rnf) => (
                  <div key={rnf.id} className="sd__rnf-card">
                    <div className="sd__rnf-header">
                      <span className="sd__rnf-id">{rnf.id}</span>
                      <span className="sd__rnf-cat">{rnf.categoria}</span>
                    </div>
                    <p className="sd__rnf-desc">{rnf.descripcion}</p>
                    <p className="sd__rnf-criterio">✓ {rnf.criterio}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ══════════════════════════════════════════
            DIAGRAMAS UML
        ══════════════════════════════════════════ */}
        {tab === "uml" && (
          <div className="sd__panel sd__panel--fade">
            <div className="sd__uml-nav">
              {sw.diagramas.map((d, i) => (
                <button
                  key={i}
                  className={`sd__uml-btn ${diagActivo === i ? "sd__uml-btn--active" : ""}`}
                  onClick={() => setDiagActivo(i)}
                >
                  <span className="sd__uml-tipo">{TIPO_DIAGRAMA[d.tipo]}</span>
                  <span className="sd__uml-titulo">{d.titulo}</span>
                </button>
              ))}
            </div>

            {sw.diagramas[diagActivo] && (
              <div className="sd__uml-viewer">
                <div className="sd__uml-header">
                  <span className="sd__uml-tipo-badge">
                    {TIPO_DIAGRAMA[sw.diagramas[diagActivo].tipo]}
                  </span>
                  <h3>{sw.diagramas[diagActivo].titulo}</h3>
                </div>
                {sw.diagramas[diagActivo].descripcion && (
                  <p className="sd__uml-desc">
                    {sw.diagramas[diagActivo].descripcion}
                  </p>
                )}
                {sw.diagramas[diagActivo].uml_data ? (
                  <UMLDiagram
                    type={sw.diagramas[diagActivo].tipo}
                    data={sw.diagramas[diagActivo].uml_data}
                    height={
                      sw.diagramas[diagActivo].tipo === "CLASES"
                        ? 680
                        : sw.diagramas[diagActivo].tipo === "SECUENCIA"
                          ? 580
                          : sw.diagramas[diagActivo].tipo === "CASOS_USO"
                            ? 500
                            : 480
                    }
                  />
                ) : sw.diagramas[diagActivo].mermaid ? (
                  <MermaidDiagram
                    code={sw.diagramas[diagActivo].mermaid}
                    id={`${sw.id}-${diagActivo}`}
                  />
                ) : sw.diagramas[diagActivo].imagen ? (
                  <img
                    src={sw.diagramas[diagActivo].imagen}
                    alt={sw.diagramas[diagActivo].titulo}
                    className="sd__uml-img"
                  />
                ) : (
                  <div className="sd__uml-empty">Diagrama pendiente</div>
                )}
              </div>
            )}
          </div>
        )}

        {/* ══════════════════════════════════════════
            ARQUITECTURA
        ══════════════════════════════════════════ */}
        {tab === "arquitectura" && (
          <div className="sd__panel sd__panel--fade">
            <div className="sd__section">
              <h2 className="sd__section-title">Estilo Arquitectónico</h2>
              <div className="sd__arch-badges">
                {sw.arquitectura.patron.split("+").map((p, i) => (
                  <span key={i} className="sd__arch-patron-badge">
                    {p.trim()}
                  </span>
                ))}
              </div>
              <p className="sd__text" style={{ marginTop: "1rem" }}>
                {sw.arquitectura.descripcion}
              </p>
              {sw.arquitectura.capas?.length > 0 && (
                <div className="sd__arch-layers">
                  {sw.arquitectura.capas.map((capa, i) => (
                    <div
                      key={i}
                      className="sd__arch-layer"
                      style={{ "--layer-color": capa.color || "#2563eb" }}
                    >
                      <div className="sd__arch-layer-header">
                        <span className="sd__arch-layer-icon">{capa.icon}</span>
                        <span className="sd__arch-layer-name">
                          {capa.nombre}
                        </span>
                        <span className="sd__arch-layer-tech">{capa.tech}</span>
                      </div>
                      <p className="sd__arch-layer-desc">{capa.desc}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="sd__section">
              <h2 className="sd__section-title">Diagrama de Arquitectura</h2>
              {sw.arch_diagram?.nodes?.length > 0 ? (
                <ArchDiagram
                  nodes={sw.arch_diagram.nodes}
                  edges={sw.arch_diagram.edges}
                />
              ) : sw.arquitectura.mermaid ? (
                <MermaidDiagram
                  code={sw.arquitectura.mermaid}
                  id={`arch-${sw.id}`}
                />
              ) : sw.arquitectura.imagen ? (
                <img
                  src={sw.arquitectura.imagen}
                  alt="Arquitectura"
                  className="sd__uml-img"
                />
              ) : null}
            </div>

            {sw.arquitectura.decisiones?.length > 0 && (
              <div className="sd__section">
                <h2 className="sd__section-title">Decisiones de Diseño</h2>
                <div className="sd__decisions">
                  {sw.arquitectura.decisiones.map((d, i) => (
                    <div key={i} className="sd__decision">
                      <div className="sd__decision-n">
                        {String(i + 1).padStart(2, "0")}
                      </div>
                      <div>
                        <p className="sd__decision-title">{d.decision}</p>
                        <p className="sd__decision-razon">{d.razon}</p>
                        <p className="sd__decision-alt">
                          Alternativas consideradas: {d.alternativas}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* ══════════════════════════════════════════
            PATRONES
        ══════════════════════════════════════════ */}
        {tab === "patrones" && (
          <div className="sd__panel sd__panel--fade">
            <div className="sd__section">
              <h2 className="sd__section-title">
                Patrones de Diseño Implementados
              </h2>
              <div className="sd__patrones">
                {sw.patrones.map((p, i) => (
                  <div key={i} className="sd__patron">
                    <div className="sd__patron-header">
                      <span className="sd__patron-nombre">{p.nombre}</span>
                      <span className="sd__patron-cat">{p.categoria}</span>
                    </div>
                    <p className="sd__patron-uso">{p.uso}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ══════════════════════════════════════════
            TRAZABILIDAD
        ══════════════════════════════════════════ */}
        {tab === "trazabilidad" && (
          <div className="sd__panel sd__panel--fade">
            <div className="sd__section">
              <h2 className="sd__section-title">Matriz de Trazabilidad</h2>
              <p className="sd__text" style={{ marginBottom: "1.5rem" }}>
                Vinculación entre requerimientos funcionales, casos de uso y
                casos de prueba.
              </p>
              <div className="sd__traz-table">
                <div className="sd__traz-head">
                  <span>RF</span>
                  <span>Caso de Uso</span>
                  <span>Caso de Prueba</span>
                  <span>Estado</span>
                </div>
                {sw.trazabilidad.map((t, i) => {
                  const rf = sw.requerimientos.funcionales.find(
                    (r) => r.id === t.rf_id,
                  );
                  return (
                    <div key={i} className="sd__traz-row">
                      <div>
                        <span className="sd__traz-id">{t.rf_id}</span>
                        {rf && (
                          <span className="sd__traz-nombre">{rf.nombre}</span>
                        )}
                      </div>
                      <span className="sd__traz-cu">{t.caso_uso}</span>
                      <span className="sd__traz-cp">{t.caso_prueba}</span>
                      <Badge text={t.estado} color="#16a34a" />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* ══════════════════════════════════════════
            CICLO DE VIDA
        ══════════════════════════════════════════ */}
        {tab === "ciclo" && (
          <div className="sd__panel sd__panel--fade">
            <div className="sd__section">
              <h2 className="sd__section-title">Ciclo de Vida del Software</h2>
              <p className="sd__text">{sw.ciclo_vida.descripcion}</p>
            </div>

            <div className="sd__section">
              <h2 className="sd__section-title">Línea de tiempo</h2>
              <div className="sd__timeline">
                {sw.ciclo_vida.hitos.map((h, i) => (
                  <div key={i} className="sd__hito">
                    <div className="sd__hito-left">
                      <span className="sd__hito-fecha">{h.fecha}</span>
                    </div>
                    <div className="sd__hito-line">
                      <div className="sd__hito-dot" />
                      {i < sw.ciclo_vida.hitos.length - 1 && (
                        <div className="sd__hito-track" />
                      )}
                    </div>
                    <div className="sd__hito-right">
                      <p className="sd__hito-fase">{h.fase}</p>
                      <p className="sd__hito-desc">{h.descripcion}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="sd__section">
              <h2 className="sd__section-title">Detalle por fase RUP</h2>
              <div className="sd__fases-detail">
                {sw.metodologia.fases.map((f, i) => {
                  const faseInfo = FASES_RUP.find((r) => r.id === f.fase);
                  return (
                    <div
                      key={i}
                      className={`sd__fase-card ${f.completada ? "sd__fase-card--done" : ""}`}
                    >
                      <div className="sd__fase-header">
                        <span className="sd__fase-icon">{faseInfo?.icon}</span>
                        <span className="sd__fase-nombre">
                          {faseInfo?.label}
                        </span>
                        {f.completada && (
                          <span className="sd__fase-check">✓</span>
                        )}
                      </div>
                      <p className="sd__fase-desc">{f.descripcion}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
