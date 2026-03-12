// src/components/ProjectCard.jsx
// Al hacer click navega a /proyectos/:id (página de detalle).
// La prop onOpen ya no abre modal — redirige con useNavigate.

import React from 'react';
import { useNavigate } from 'react-router-dom';
import './ProjectCard.css';

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
  basico:    { label: 'básico',    cls: 'diff-basico'   },
  medio:     { label: 'medio',     cls: 'diff-medio'    },
  avanzado:  { label: 'avanzado',  cls: 'diff-avanzado' },
};

const STATUS_META = {
  pendiente:     { label: '○ Pendiente',    cls: 'status-pendiente'   },
  'en-progreso': { label: '◑ En progreso', cls: 'status-progreso'    },
  completado:    { label: '● Completado',   cls: 'status-completado'  },
};

export const ProjectCard = ({ project }) => {
  const navigate = useNavigate();
  const cat    = CAT_META[project.cat]    || { label: project.cat,    color: '#00ff9f' };
  const diff   = DIFF_META[project.diff]  || { label: project.diff,   cls: 'diff-basico' };
  const status = STATUS_META[project.status] || STATUS_META['pendiente'];

  const handleClick = () => navigate(`/proyectos/${project.id}`);

  return (
    <article
      className="pcard"
      style={{ '--accent': cat.color }}
      onClick={handleClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && handleClick()}
      aria-label={`Ver detalle de ${project.title}`}
    >
      <div className="pcard__bar" />

      <header className="pcard__head">
        <span className="pcard__icon" aria-hidden="true">{project.icon}</span>
        <span className={`pcard__diff ${diff.cls}`}>{diff.label}</span>
      </header>

      <span className="pcard__cat" style={{ color: cat.color }}>{cat.label}</span>
      <h3 className="pcard__title">{project.title}</h3>
      <p className="pcard__short">{project.short}</p>

      <div className="pcard__tags">
        {project.tags.slice(0, 3).map((tag) => (
          <span key={tag} className="pcard__tag">{tag}</span>
        ))}
        {project.tags.length > 3 && (
          <span className="pcard__tag pcard__tag--more">+{project.tags.length - 3}</span>
        )}
      </div>

      <footer className="pcard__footer">
        <span className="pcard__hw">⌁ {project.hw.split('+')[0].trim()}</span>
        <div className="pcard__meta">
          <span className="pcard__cost">{project.cost}</span>
          <span className={`pcard__status ${status.cls}`}>{status.label}</span>
        </div>
      </footer>
    </article>
  );
};