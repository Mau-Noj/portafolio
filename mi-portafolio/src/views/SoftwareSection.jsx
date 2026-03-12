// src/views/SoftwareSection.jsx
import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllSoftware, ESTADOS } from '../models/software.data';
import './SoftwareSection.css';

export const SoftwareSection = () => {
  const navigate = useNavigate();
  const [filtroTag, setFiltroTag]     = useState('all');
  const [filtroEstado, setFiltroEstado] = useState('all');
  const [query, setQuery]             = useState('');

  const todos = getAllSoftware();

  // Todos los tags únicos
  const allTags = [...new Set(todos.flatMap(s => s.tags))].sort();

  const filtrados = useMemo(() => {
    let list = [...todos];
    if (filtroTag !== 'all')    list = list.filter(s => s.tags.includes(filtroTag));
    if (filtroEstado !== 'all') list = list.filter(s => s.estado === filtroEstado);
    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter(s =>
        s.nombre.toLowerCase().includes(q) ||
        s.tagline.toLowerCase().includes(q) ||
        s.tags.some(t => t.toLowerCase().includes(q))
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
              Software<br />
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
                  <span className="sw__legend-dot" style={{ background: v.color }} />
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
              {todos.reduce((a, s) => a + (s.requerimientos?.funcionales?.length || 0), 0)}
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
              onChange={e => setQuery(e.target.value)}
            />
            {query && <button onClick={() => setQuery('')}>✕</button>}
          </div>

          <select value={filtroEstado} onChange={e => setFiltroEstado(e.target.value)} className="sw__select">
            <option value="all">Todos los estados</option>
            {Object.entries(ESTADOS).map(([k, v]) => (
              <option key={k} value={k}>{v.label}</option>
            ))}
          </select>
        </div>

        {/* ── Tags ── */}
        <div className="sw__tags">
          <button
            className={`sw__tag-btn ${filtroTag === 'all' ? 'sw__tag-btn--active' : ''}`}
            onClick={() => setFiltroTag('all')}
          >
            todos
          </button>
          {allTags.map(tag => (
            <button
              key={tag}
              className={`sw__tag-btn ${filtroTag === tag ? 'sw__tag-btn--active' : ''}`}
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
                        <span>{ '{  }' }</span>
                      </div>
                    )}
                    <div className="sw__card-overlay">
                      <span className="sw__card-year">{sw.año}</span>
                      <span
                        className="sw__card-estado"
                        style={{ borderColor: estado.color, color: estado.color }}
                      >
                        <span className="sw__card-dot" style={{ background: estado.color }} />
                        {estado.label}
                      </span>
                    </div>
                  </div>

                  {/* Body */}
                  <div className="sw__card-body">
                    <h3 className="sw__card-name">{sw.nombre}</h3>
                    <p className="sw__card-tagline">{sw.tagline}</p>

                    {/* Métricas doc */}
                    <div className="sw__card-meta">
                      <span className="sw__card-meta-item">
                        <span className="sw__meta-icon">◎</span> {rfCount} RF
                      </span>
                      <span className="sw__card-meta-item">
                        <span className="sw__meta-icon">⬡</span> {umlCount} UML
                      </span>
                      <span className="sw__card-meta-item">
                        <span className="sw__meta-icon">◈</span> {sw.metodologia?.iteraciones || 0} iter.
                      </span>
                      <span className="sw__card-meta-item">
                        <span className="sw__meta-icon">⌖</span> {sw.metodologia?.duracion}
                      </span>
                    </div>

                    {/* Stack */}
                    <div className="sw__card-stack">
                      {[
                        ...(sw.stack?.frontend  || []),
                        ...(sw.stack?.backend   || []),
                        ...(sw.stack?.base_datos|| []),
                      ].slice(0, 4).map(t => (
                        <span key={t} className="sw__stack-badge">{t}</span>
                      ))}
                    </div>

                    {/* Arquitectura */}
                    <p className="sw__card-arch">
                      {sw.arquitectura?.patron}
                    </p>
                  </div>

                  <div className="sw__card-cta">
                    Ver documentación completa →
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