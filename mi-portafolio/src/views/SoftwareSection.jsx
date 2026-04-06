// src/views/SoftwareSection.jsx
import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { getAllSoftware, ESTADOS } from "../models/software.data";
import { useSEO } from "../hooks/useSEO";
import "./SoftwareSection.css";

const GitHubIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.009-.868-.013-1.703-2.782.603-3.369-1.342-3.369-1.342-.454-1.154-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0 1 12 6.836a9.59 9.59 0 0 1 2.504.337c1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
  </svg>
);

export const SoftwareSection = () => {
  useSEO({
    title: "Software",
    description:
      "Análisis y diseño de sistemas — diagramas UML, casos de uso y arquitectura de software.",
    url: "https://mauricionoj.com/software",
  });

  const navigate = useNavigate();
  const [filtroTag, setFiltroTag] = useState("all");
  const [filtroEstado, setFiltroEstado] = useState("all");
  const [query, setQuery] = useState("");

  const todos = getAllSoftware();
  const allTags = [...new Set(todos.flatMap((s) => s.tags))].sort();

  const filtrados = useMemo(() => {
    let list = [...todos];
    if (filtroTag !== "all")
      list = list.filter((s) => s.tags.includes(filtroTag));
    if (filtroEstado !== "all")
      list = list.filter((s) => s.estado === filtroEstado);
    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter(
        (s) =>
          s.nombre.toLowerCase().includes(q) ||
          s.tagline.toLowerCase().includes(q) ||
          s.tags.some((t) => t.toLowerCase().includes(q)),
      );
    }
    return list.sort((a, b) => b.año - a.año);
  }, [todos, filtroTag, filtroEstado, query]);

  return (
    <div className="sw-wrap">
      <div className="sw">
        {/* ── Header ── */}
        <header className="sw__header">
          <div className="sw__header-left">
            <p className="sw__kicker">— análisis y diseño de sistemas</p>
            <h1 className="sw__title">
              Software
              <br />
              <em>Engineering</em>
            </h1>
            <p className="sw__subtitle">
              Proyectos documentados bajo metodología RUP — diagramas UML,
              arquitectura, requerimientos y ciclo de vida completo.
            </p>
          </div>
          <div className="sw__header-right">
            <div className="sw__legend">
              {Object.entries(ESTADOS).map(([k, v]) => (
                <div key={k} className="sw__legend-item">
                  <span
                    className="sw__legend-dot"
                    style={{ background: v.color }}
                  />
                  <span>{v.label}</span>
                </div>
              ))}
            </div>
          </div>
        </header>

        {/* ── Stats ── */}
        <div className="sw__stats">
          <div className="sw__stat">
            <span className="sw__stat-n">{todos.length}</span>
            <span className="sw__stat-l">Proyectos</span>
          </div>
          <div className="sw__stat-sep" />
          <div className="sw__stat">
            <span className="sw__stat-n">
              {todos.reduce(
                (a, s) => a + (s.requerimientos?.funcionales?.length || 0),
                0,
              )}
            </span>
            <span className="sw__stat-l">Requerimientos</span>
          </div>
          <div className="sw__stat-sep" />
          <div className="sw__stat">
            <span className="sw__stat-n">
              {todos.reduce((a, s) => a + (s.diagramas?.length || 0), 0)}
            </span>
            <span className="sw__stat-l">Diagramas UML</span>
          </div>
          <div className="sw__stat-sep" />
          <div className="sw__stat">
            <span className="sw__stat-n">RUP</span>
            <span className="sw__stat-l">Metodología</span>
          </div>
        </div>

        {/* ── Controles ── */}
        <div className="sw__controls">
          <div className="sw__search">
            <span>⌕</span>
            <input
              type="text"
              placeholder="Buscar proyecto, tecnología…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            {query && <button onClick={() => setQuery("")}>✕</button>}
          </div>
          <select
            value={filtroEstado}
            onChange={(e) => setFiltroEstado(e.target.value)}
            className="sw__select"
          >
            <option value="all">Todos los estados</option>
            {Object.entries(ESTADOS).map(([k, v]) => (
              <option key={k} value={k}>
                {v.label}
              </option>
            ))}
          </select>
        </div>

        {/* ── Tags ── */}
        <div className="sw__tags">
          <button
            className={`sw__tag-btn ${filtroTag === "all" ? "sw__tag-btn--active" : ""}`}
            onClick={() => setFiltroTag("all")}
          >
            todos
          </button>
          {allTags.map((tag) => (
            <button
              key={tag}
              className={`sw__tag-btn ${filtroTag === tag ? "sw__tag-btn--active" : ""}`}
              onClick={() => setFiltroTag(tag)}
            >
              {tag}
            </button>
          ))}
        </div>

        {/* ── Grid ── */}
        {filtrados.length === 0 ? (
          <div className="sw__empty">No se encontraron proyectos.</div>
        ) : (
          <div className="sw__grid">
            {filtrados.map((sw, i) => {
              const estado = ESTADOS[sw.estado];
              const rfCount = sw.requerimientos?.funcionales?.length || 0;
              const umlCount = sw.diagramas?.length || 0;
              return (
                <article
                  key={sw.id}
                  className="sw__card"
                  style={{ animationDelay: `${i * 0.06}s` }}
                  onClick={() => navigate(`/software/${sw.id}`)}
                >
                  {/* Screenshot */}
                  <div className="sw__card-img">
                    {sw.screenshot ? (
                      <img src={sw.screenshot} alt={sw.nombre} loading="lazy" />
                    ) : (
                      <div className="sw__card-placeholder">
                        <span>{"{  }"}</span>
                      </div>
                    )}
                    <div className="sw__card-overlay">
                      <span className="sw__card-year">{sw.año}</span>
                      <span
                        className="sw__card-estado"
                        style={{
                          borderColor: estado.color,
                          color: estado.color,
                        }}
                      >
                        <span
                          className="sw__card-dot"
                          style={{ background: estado.color }}
                        />
                        {estado.label}
                      </span>
                    </div>
                  </div>

                  {/* Body */}
                  <div className="sw__card-body">
                    <h3 className="sw__card-name">{sw.nombre}</h3>
                    <p className="sw__card-tagline">{sw.tagline}</p>

                    <div className="sw__card-meta">
                      <span className="sw__card-meta-item">
                        <span className="sw__meta-icon">◎</span> {rfCount} RF
                      </span>
                      <span className="sw__card-meta-item">
                        <span className="sw__meta-icon">⬡</span> {umlCount} UML
                      </span>
                      <span className="sw__card-meta-item">
                        <span className="sw__meta-icon">◈</span>{" "}
                        {sw.metodologia?.iteraciones || 0} iter.
                      </span>
                      <span className="sw__card-meta-item">
                        <span className="sw__meta-icon">⌖</span>{" "}
                        {sw.metodologia?.duracion}
                      </span>
                    </div>

                    <div className="sw__card-stack">
                      {[
                        ...(sw.stack?.frontend || []),
                        ...(sw.stack?.backend || []),
                        ...(sw.stack?.base_datos || []),
                      ]
                        .slice(0, 4)
                        .map((t) => (
                          <span key={t} className="sw__stack-badge">
                            {t}
                          </span>
                        ))}
                    </div>

                    <p className="sw__card-arch">{sw.arquitectura?.patron}</p>
                  </div>

                  {/* Footer: CTA + GitHub */}
                  <div className="sw__card-footer">
                    <span className="sw__card-cta-text">
                      Ver documentación →
                    </span>
                    {sw.github && (
                      <a
                        href={sw.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="sw__card-github"
                        onClick={(e) => e.stopPropagation()}
                        title="Ver en GitHub"
                      >
                        <GitHubIcon />
                      </a>
                    )}
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
