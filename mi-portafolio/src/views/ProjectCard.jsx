// src/components/ProjectCard.jsx
import React, { useState } from 'react';
import './ProjectCard.css';

export const ProjectCard = ({ project, onOpen }) => {
  const [imgError, setImgError] = useState(false);

  const difficultyColor = {
    básico: '#22c55e',
    medio:  '#f59e0b',
    avanzado: '#ef4444',
  }[project.difficulty?.toLowerCase()] ?? '#64748b';

  const statusColor = {
    pendiente:   '#f59e0b',
    'en progreso': '#3b82f6',
    completado:  '#22c55e',
  }[project.status?.toLowerCase()] ?? '#64748b';

  return (
    <article
      className="pcard"
      onClick={() => onOpen?.(project)}
      role="button"
      tabIndex={0}
      onKeyDown={e => e.key === 'Enter' && onOpen?.(project)}
    >
      {/* ── Imagen / Placeholder ── */}
      <div className="pcard__img">
        {project.image && !imgError ? (
          <img
            src={project.image}
            alt={project.title}
            loading="lazy"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="pcard__placeholder">
            <span className="pcard__placeholder-icon">{project.icon ?? '⚙'}</span>
          </div>
        )}

        {/* Overlay badges */}
        <div className="pcard__overlay">
          {project.difficulty && (
            <span className="pcard__badge" style={{ '--badge-color': difficultyColor }}>
              {project.difficulty}
            </span>
          )}
          {project.cost !== undefined && (
            <span className="pcard__cost">~${project.cost}</span>
          )}
        </div>
      </div>

      {/* ── Body ── */}
      <div className="pcard__body">

        {/* Categoría */}
        {project.category && (
          <p className="pcard__category">
            <span className="pcard__cat-dot" />
            {project.category}
          </p>
        )}

        <h3 className="pcard__title">{project.title}</h3>
        <p className="pcard__desc">{project.description}</p>

        {/* Tags */}
        {project.tags?.length > 0 && (
          <div className="pcard__tags">
            {project.tags.slice(0, 4).map(tag => (
              <span key={tag} className="pcard__tag">{tag}</span>
            ))}
            {project.tags.length > 4 && (
              <span className="pcard__tag pcard__tag--more">+{project.tags.length - 4}</span>
            )}
          </div>
        )}

        {/* Platform */}
        {project.platform && (
          <p className="pcard__platform">— {project.platform}</p>
        )}
      </div>

      {/* ── Footer ── */}
      <div className="pcard__footer">
        <span
          className="pcard__status"
          style={{ '--status-color': statusColor }}
        >
          <span className="pcard__status-dot" />
          {project.status ?? 'Pendiente'}
        </span>
        <span className="pcard__cta">Ver proyecto →</span>
      </div>
    </article>
  );
};