// src/components/ProjectModal.jsx
import React, { useEffect } from 'react';
import './ProjectModal.css';

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
  basico:   { label: 'básico',   cls: 'diff-basico'   },
  medio:    { label: 'medio',    cls: 'diff-medio'    },
  avanzado: { label: 'avanzado', cls: 'diff-avanzado' },
};

export const ProjectModal = ({ project, onClose }) => {
  const isOpen = !!project;

  // Cerrar con Escape
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', handler);
    // Bloquear scroll del body
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handler);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const cat  = CAT_META[project.cat]  || { label: project.cat,  color: '#00ff9f' };
  const diff = DIFF_META[project.diff] || { label: project.diff, cls: 'diff-basico' };

  return (
    <div
      className="pmodal__overlay"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`Detalle de ${project.title}`}
    >
      <div
        className="pmodal"
        style={{ '--accent': cat.color }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Barra de acento */}
        <div className="pmodal__topbar" />

        {/* Botón cerrar */}
        <button className="pmodal__close" onClick={onClose} aria-label="Cerrar">✕</button>

        {/* Icono */}
        <div className="pmodal__icon" aria-hidden="true">{project.icon}</div>

        {/* Eyebrow */}
        <div className="pmodal__eye">
          <span style={{ color: cat.color }}>{cat.label}</span>
          <span className={`pmodal__diff ${diff.cls}`}>{diff.label}</span>
        </div>

        {/* Título */}
        <h2 className="pmodal__title">{project.title}</h2>

        {/* Descripción */}
        <p className="pmodal__desc">{project.desc}</p>

        {/* Costo */}
        {project.cost && (
          <span className="pmodal__cost">Costo estimado: {project.cost}</span>
        )}

        {/* Pasos */}
        <p className="pmodal__section-label">Pasos del Proyecto</p>
        <ul className="pmodal__steps">
          {project.steps.map((step, i) => (
            <li key={i}>{step}</li>
          ))}
        </ul>

        {/* Skills */}
        <p className="pmodal__section-label">Skills que aprenderás</p>
        <div className="pmodal__skills">
          {project.skills.map((skill) => (
            <span key={skill} className="pmodal__skill">{skill}</span>
          ))}
        </div>

        {/* Hardware */}
        <div className="pmodal__hw">
          <p className="pmodal__hw-label">Hardware necesario</p>
          <p className="pmodal__hw-value">{project.hw}</p>
        </div>

        {/* Concepto clave (solo si existe) */}
        {project.concept && (
          <div className="pmodal__concept">
            <p className="pmodal__concept-label">⚡ Concepto Clave</p>
            <p className="pmodal__concept-value">{project.concept}</p>
          </div>
        )}

        {/* Insight (solo si existe) */}
        {project.insight && (
          <div className="pmodal__insight">
            <p className="pmodal__insight-label">💡 Insight</p>
            <p className="pmodal__insight-value">{project.insight}</p>
          </div>
        )}
      </div>
    </div>
  );
};