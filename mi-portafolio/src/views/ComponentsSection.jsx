// src/views/ComponentsSection.jsx
import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { getAllComponents } from "../models/components.data";
import { CATEGORIAS } from "../models/components.model";
import { useSEO } from "../hooks/useSEO";
import "./ComponentsSection.css";

const TOXICIDAD_COLOR = { BAJO: "#16a34a", MEDIO: "#f59e0b", ALTO: "#dc2626" };
const TOXICIDAD_LABEL = { BAJO: "Baja", MEDIO: "Media", ALTO: "Alta" };

export const ComponentsSection = () => {
  useSEO({
    title: "Componentes",
    description:
      "Fichas técnicas de componentes electrónicos — datasheets, pinouts y ejemplos de uso.",
    url: "https://mauricionoj.com/componentes",
  });
  const navigate = useNavigate();
  const [catActiva, setCat] = useState("all");
  const [query, setQuery] = useState("");
  const [orden, setOrden] = useState("nombre");

  const todos = getAllComponents();

  const filtrados = useMemo(() => {
    let list = [...todos];
    if (catActiva !== "all")
      list = list.filter((c) => c.categoria === catActiva);
    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter(
        (c) =>
          c.nombre.toLowerCase().includes(q) ||
          c.descripcion.toLowerCase().includes(q) ||
          c.tags.some((t) => t.toLowerCase().includes(q)),
      );
    }
    if (orden === "nombre")
      list.sort((a, b) => a.nombre.localeCompare(b.nombre));
    if (orden === "carbono")
      list.sort((a, b) => a.huella_carbono - b.huella_carbono);
    if (orden === "toxicidad") {
      const rank = { BAJO: 0, MEDIO: 1, ALTO: 2 };
      list.sort((a, b) => rank[a.toxicidad] - rank[b.toxicidad]);
    }
    return list;
  }, [todos, catActiva, query, orden]);

  return (
    <div className="cs-wrap">
      <div className="cs">
        {/* ── Header ── */}
        <header className="cs__header">
          <p className="cs__kicker">— catálogo de componentes</p>
          <h1 className="cs__title">
            Electrónica
            <br />
            <em>& Ambiente</em>
          </h1>
          <p className="cs__subtitle">
            Fichas técnicas con perspectiva dual — ingeniería electrónica e
            impacto ambiental integrados en cada componente.
          </p>

          {/* Stats */}
          <div className="cs__stats">
            <div className="cs__stat">
              <span className="cs__stat-n">{todos.length}</span>
              <span className="cs__stat-l">Componentes</span>
            </div>
            <div className="cs__stat-sep" />
            <div className="cs__stat">
              <span className="cs__stat-n">
                {todos.filter((c) => !c.conflicto_minerales).length}
              </span>
              <span className="cs__stat-l">Sin conflicto</span>
            </div>
            <div className="cs__stat-sep" />
            <div className="cs__stat">
              <span className="cs__stat-n">
                {(
                  todos.reduce((a, c) => a + c.huella_carbono, 0) / todos.length
                ).toFixed(1)}
                g
              </span>
              <span className="cs__stat-l">CO₂ promedio</span>
            </div>
          </div>
        </header>

        {/* ── Controles ── */}
        <div className="cs__controls">
          {/* Buscador */}
          <div className="cs__search">
            <span className="cs__search-icon">⌕</span>
            <input
              className="cs__search-input"
              type="text"
              placeholder="Buscar componente, tag, fórmula…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            {query && (
              <button className="cs__search-clear" onClick={() => setQuery("")}>
                ✕
              </button>
            )}
          </div>

          {/* Orden */}
          <select
            className="cs__sort"
            value={orden}
            onChange={(e) => setOrden(e.target.value)}
          >
            <option value="nombre">A–Z</option>
            <option value="carbono">↑ CO₂</option>
            <option value="toxicidad">↑ Toxicidad</option>
          </select>
        </div>

        {/* ── Filtros por categoría ── */}
        <div className="cs__cats">
          <button
            className={`cs__cat ${catActiva === "all" ? "cs__cat--active" : ""}`}
            onClick={() => setCat("all")}
          >
            <span>⊞</span> Todos
            <span className="cs__cat-count">{todos.length}</span>
          </button>
          {CATEGORIAS.map((cat) => {
            const count = todos.filter((c) => c.categoria === cat.id).length;
            if (!count) return null;
            return (
              <button
                key={cat.id}
                className={`cs__cat ${catActiva === cat.id ? "cs__cat--active" : ""}`}
                onClick={() => setCat(cat.id)}
              >
                <span>{cat.icon}</span> {cat.label}
                <span className="cs__cat-count">{count}</span>
              </button>
            );
          })}
        </div>

        {/* ── Grid de componentes ── */}
        {filtrados.length === 0 ? (
          <div className="cs__empty">
            <p>
              No se encontraron componentes para "<strong>{query}</strong>"
            </p>
          </div>
        ) : (
          <div className="cs__grid">
            {filtrados.map((comp, i) => (
              <article
                key={comp.id}
                className="cs__card"
                style={{ animationDelay: `${i * 0.05}s` }}
                onClick={() => navigate(`/componentes/${comp.id}`)}
              >
                {/* Imagen */}
                <div className="cs__card-img">
                  {comp.imagen ? (
                    <img src={comp.imagen} alt={comp.nombre} loading="lazy" />
                  ) : (
                    <div className="cs__card-placeholder">
                      {CATEGORIAS.find((c) => c.id === comp.categoria)?.icon ||
                        "◎"}
                    </div>
                  )}
                  {/* Badges */}
                  <div className="cs__card-badges">
                    {comp.conflicto_minerales && (
                      <span
                        className="cs__badge cs__badge--warn"
                        title="Contiene minerales de conflicto"
                      >
                        ⚠
                      </span>
                    )}
                    {comp.rohs && (
                      <span
                        className="cs__badge cs__badge--ok"
                        title="RoHS compliant"
                      >
                        R
                      </span>
                    )}
                  </div>
                </div>

                {/* Info */}
                <div className="cs__card-body">
                  <p className="cs__card-cat">
                    {CATEGORIAS.find((c) => c.id === comp.categoria)?.icon}{" "}
                    {comp.subcategoria}
                  </p>
                  <h3 className="cs__card-name">{comp.nombre}</h3>
                  <p className="cs__card-desc">
                    {comp.descripcion.slice(0, 90)}…
                  </p>

                  {/* Métricas rápidas */}
                  <div className="cs__card-metrics">
                    <div className="cs__metric">
                      <span className="cs__metric-label">CO₂</span>
                      <span className="cs__metric-val">
                        {comp.huella_carbono}g
                      </span>
                    </div>
                    <div className="cs__metric">
                      <span className="cs__metric-label">Reciclable</span>
                      <span className="cs__metric-val">
                        {comp.reciclabilidad}%
                      </span>
                    </div>
                    <div className="cs__metric">
                      <span className="cs__metric-label">Toxicidad</span>
                      <span
                        className="cs__metric-val"
                        style={{ color: TOXICIDAD_COLOR[comp.toxicidad] }}
                      >
                        {TOXICIDAD_LABEL[comp.toxicidad]}
                      </span>
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="cs__card-tags">
                    {comp.tags.slice(0, 3).map((t) => (
                      <span key={t} className="cs__tag">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="cs__card-arrow">→</div>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
