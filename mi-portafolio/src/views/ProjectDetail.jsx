// src/views/ProjectDetail.jsx
// Página de detalle de un proyecto.
// Ruta: /proyectos/:id
// Muestra info del proyecto + todos sus bloques de log.

import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import './ProjectDetail.css';
import { getProjectById } from '../models/projects.data';
import { getProjectLog }   from '../models/project-logs.data';
import { LogBlock }        from '../components/LogBlock';
import { MathText }        from '../components/MathText';

/* ── Meta de categorías (mismo que ProjectCard) ── */
const CAT_META = {
  electric:  { label: '⚡ Electricidad',    color: '#ffe066' },
  ttl:       { label: '◈ TTL Digital',      color: '#ff6ef7' },
  expfis:    { label: '🔬 Física Exp.',      color: '#f59e0b' },
  ia:        { label: '🤖 IA / ML',          color: '#c084fc' },
  maker:     { label: '♻ Maker',             color: '#ff8c00' },
  compiler:  { label: '⚙️ Compiladores',     color: '#06b6d4' },
  fintech:   { label: '📈 Fintech IA',       color: '#34d399' },
  ambiental: { label: '🌿 Ambiental',        color: '#00ff9f' },
  sistemas:  { label: '💻 Sistemas',         color: '#38bdf8' },
  fisica:    { label: '⚡ Física',           color: '#facc15' },
  quimica:   { label: '🧪 Química',          color: '#fb923c' },
  math:      { label: '📐 Matemáticas',      color: '#c084fc' },
  cyber:     { label: '🔒 Ciberseguridad',   color: '#ff2d55' },
};

const DIFF_META = {
  basico:   { label: 'básico'   },
  medio:    { label: 'medio'    },
  avanzado: { label: 'avanzado' },
};

const STATUS_META = {
  pendiente:     { label: '○ Pendiente',    cls: 'pd-status--pendiente'  },
  'en-progreso': { label: '◑ En progreso', cls: 'pd-status--progreso'   },
  completado:    { label: '● Completado',   cls: 'pd-status--completado' },
};

export const ProjectDetail = () => {
  const { id }    = useParams();
  const navigate  = useNavigate();
  const project   = getProjectById(id);
  const log       = getProjectLog(id);

  /* ── 404 ── */
  if (!project) {
    return (
      <div className="pd-notfound">
        <span>404</span>
        <p>Proyecto no encontrado.</p>
        <Link to="/proyectos" className="pd-back-btn">← Volver a proyectos</Link>
      </div>
    );
  }

  const cat    = CAT_META[project.cat]   || { label: project.cat,   color: '#2563eb' };
  const diff   = DIFF_META[project.diff] || { label: project.diff };
  const status = STATUS_META[project.status] || STATUS_META['pendiente'];
  const hasLog = log && log.blocks && log.blocks.length > 0;

  return (
    <div className="pd" style={{ '--accent': cat.color }}>

      {/* ── BREADCRUMB ── */}
      <nav className="pd-breadcrumb" aria-label="Navegación de migas de pan">
        <button className="pd-back" onClick={() => navigate(-1)} aria-label="Volver">
          ← Volver
        </button>
        <span className="pd-breadcrumb__sep">/</span>
        <Link to="/proyectos" className="pd-breadcrumb__link">Proyectos</Link>
        <span className="pd-breadcrumb__sep">/</span>
        <span className="pd-breadcrumb__current">{project.id}</span>
      </nav>

      {/* ── HERO ── */}
      <header className="pd-hero">
        <div className="pd-hero__icon" aria-hidden="true">{project.icon}</div>

        <div className="pd-hero__meta">
          <span className="pd-hero__cat" style={{ color: cat.color }}>{cat.label}</span>
          <span className="pd-hero__dot" aria-hidden="true">·</span>
          <span className="pd-hero__diff">{diff.label}</span>
          <span className="pd-hero__dot" aria-hidden="true">·</span>
          <span className={`pd-hero__status ${status.cls}`}>{status.label}</span>
        </div>

        <h1 className="pd-hero__title">{project.title}</h1>
        <p className="pd-hero__desc"><MathText text={project.desc} /></p>

        <div className="pd-hero__chips">
          <span className="pd-chip pd-chip--cost">{project.cost}</span>
          {project.tags.map(t => (
            <span key={t} className="pd-chip">{t}</span>
          ))}
        </div>
      </header>

      {/* ── LAYOUT: sidebar + contenido ── */}
      <div className="pd-body">

        {/* ── SIDEBAR ── */}
        <aside className="pd-sidebar">

          {/* Hardware */}
          <div className="pd-sidebar__card">
            <p className="pd-sidebar__title">🔧 Hardware</p>
            <p className="pd-sidebar__text">{project.hw}</p>
          </div>

          {/* Pasos del proyecto */}
          <div className="pd-sidebar__card">
            <p className="pd-sidebar__title">📋 Pasos</p>
            <ol className="pd-sidebar__steps">
              {project.steps.map((step, i) => (
                <li key={i}><MathText text={step} /></li>
              ))}
            </ol>
          </div>

          {/* Skills */}
          <div className="pd-sidebar__card">
            <p className="pd-sidebar__title">🎯 Skills</p>
            <div className="pd-sidebar__skills">
              {project.skills.map(s => (
                <span key={s} className="pd-skill">{s}</span>
              ))}
            </div>
          </div>

          {/* Concepto clave */}
          {project.concept && (
            <div className="pd-sidebar__card pd-sidebar__card--accent">
              <p className="pd-sidebar__title">⚡ Concepto clave</p>
              <p className="pd-sidebar__text">
                <MathText text={project.concept} />
              </p>
            </div>
          )}

          {/* Insight */}
          {project.insight && (
            <div className="pd-sidebar__card pd-sidebar__card--insight">
              <p className="pd-sidebar__title">💡 Insight</p>
              <p className="pd-sidebar__text">{project.insight}</p>
            </div>
          )}
        </aside>

        {/* ── ÁREA DE LOGS / PROCESO ── */}
        <main className="pd-main">
          <div className="pd-main__header">
            <h2 className="pd-main__title">Proceso & Avances</h2>
            {log?.lastUpdated && (
              <span className="pd-main__updated">
                Actualizado: {log.lastUpdated}
              </span>
            )}
          </div>

          {hasLog ? (
            <div className="pd-blocks">
              {log.blocks.map((block, i) => (
                <LogBlock key={i} block={block} />
              ))}
            </div>
          ) : (
            /* Estado vacío — mientras el proyecto está pendiente */
            <div className="pd-empty">
              <div className="pd-empty__icon">◌</div>
              <p className="pd-empty__title">Sin avances aún</p>
              <p className="pd-empty__sub">
                Cuando empieces este proyecto, aquí aparecerán fórmulas,
                código, fotografías del proceso, tablas de datos y resultados.
              </p>
              <div className="pd-empty__types">
                {['Fórmulas LaTeX','Código','Imágenes','Tablas','Resultados','Advertencias'].map(t => (
                  <span key={t} className="pd-empty__type">{t}</span>
                ))}
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};