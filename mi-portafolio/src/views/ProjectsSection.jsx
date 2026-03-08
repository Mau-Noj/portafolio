// src/views/ProjectsSection.jsx
import React, { useState } from 'react';
import './ProjectsSection.css';
import { getAllProjects, getProjectsByCategory } from '../models/projects.data';
import { ProjectCard } from '../components/ProjectCard';
import { ProjectModal } from '../components/ProjectModal';

// Filtros disponibles — agrega/quita según las categorías que uses
const FILTERS = [
  { key: 'all',       label: 'Todos'          },
  { key: 'electric',  label: '⚡ Electricidad' },
  { key: 'ttl',       label: '◈ TTL Digital'   },
  { key: 'expfis',    label: '🔬 Física Exp.'   },
  { key: 'ia',        label: '🤖 IA / ML'       },
  { key: 'maker',     label: '♻ Maker'          },
  { key: 'compiler',  label: '⚙️ Compiladores'  },
  { key: 'fintech',   label: '📈 Fintech'        },
  { key: 'ambiental', label: '🌿 Ambiental'      },
  { key: 'sistemas',  label: '💻 Sistemas'       },
  { key: 'fisica',    label: '⚛ Física'          },
  { key: 'quimica',   label: '🧪 Química'         },
  { key: 'math',      label: '📐 Matemáticas'    },
  { key: 'cyber',     label: '🔒 Cyber'           },
];

export const ProjectsSection = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedProject, setSelectedProject] = useState(null);

  const projects = getProjectsByCategory(activeFilter);

  return (
    <section className="psection">

      {/* ── HEADER ── */}
      <header className="psection__header">
        <p className="psection__eyebrow">RPi5 · Arduino · TTL · IA · Maker</p>
        <h1 className="psection__title">
          <span className="psection__title-plain">Engineering</span>
          <span className="psection__title-accent"> Lab</span>
        </h1>
        <p className="psection__subtitle">
          Proyectos técnicos que iré completando. Cada uno calcula primero,
          construye después y valida con hardware real.
        </p>
        <div className="psection__divider">
          <span className="psection__divider-icon">◈</span>
        </div>
      </header>

      {/* ── FILTROS ── */}
      <div className="psection__filters" role="group" aria-label="Filtrar proyectos">
        {FILTERS.map((f) => (
          <button
            key={f.key}
            className={`psection__filter ${activeFilter === f.key ? 'psection__filter--active' : ''}`}
            onClick={() => setActiveFilter(f.key)}
            aria-pressed={activeFilter === f.key}
          >
            {f.label}
            {f.key === 'all' && (
              <span className="psection__filter-count">{getAllProjects().length}</span>
            )}
          </button>
        ))}
      </div>

      {/* ── CONTADOR ── */}
      <p className="psection__count">
        Mostrando <strong>{projects.length}</strong> proyecto{projects.length !== 1 ? 's' : ''}
      </p>

      {/* ── GRID ── */}
      {projects.length > 0 ? (
        <div className="psection__grid">
          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onOpen={setSelectedProject}
            />
          ))}
        </div>
      ) : (
        <div className="psection__empty">
          <span>○</span>
          <p>No hay proyectos en esta categoría aún.</p>
        </div>
      )}

      {/* ── MODAL ── */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
};