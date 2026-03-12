// src/views/AboutSection.jsx
import React, { useState } from 'react';
import './AboutSection.css';

// ── Data ────────────────────────────────────────────────────
const STACK = [
  // Core
  { name: 'Java',           level: 50, group: 'Lenguajes'    },
  { name: 'JavaScript',     level: 80, group: 'Lenguajes'    },
  { name: 'Python',         level: 50, group: 'Lenguajes'    },
  { name: 'C++',            level: 50, group: 'Lenguajes'    },
  { name: 'SQL',            level: 60, group: 'Lenguajes'    },
  { name: 'PHP',            level: 45, group: 'Lenguajes'    },
  { name: 'Bash',           level: 55, group: 'Lenguajes'    },
  // Frontend
  { name: 'React',          level: 70, group: 'Frontend'     },
  { name: 'React Native',   level: 50, group: 'Frontend'     },
  { name: 'HTML/CSS',       level: 90, group: 'Frontend'     },
  { name: 'Angular',        level: 30, group: 'Frontend'     },
  // Backend / Infra
  { name: 'Spring Boot',    level: 55, group: 'Backend'      },
  { name: 'Django',         level: 60, group: 'Backend'      },
  { name: 'Docker',         level: 70, group: 'DevOps'       },
  { name: 'Nginx',          level: 60, group: 'DevOps'       },
  { name: 'GitHub Actions', level: 55, group: 'DevOps'       },
  { name: 'GitLab CI/CD',   level: 50, group: 'DevOps'       },
  { name: 'Jenkins',        level: 50, group: 'DevOps'       },
  { name: 'AWS',            level: 40, group: 'DevOps'       },
  { name: 'Terraform',      level: 40, group: 'DevOps'       },
  // DB
  { name: 'MySQL',          level: 60, group: 'Datos'        },
  { name: 'SQL Server',     level: 40, group: 'Datos'        },
  { name: 'Firebase',       level: 65, group: 'Datos'        },
  // Hardware
  { name: 'Arduino',        level: 70, group: 'Hardware'     },
  { name: 'RPi / Embedded', level: 70, group: 'Hardware'     },
  { name: 'AutoCAD',        level: 55, group: 'Hardware'     },
  { name: 'Mastercam 2D',   level: 45, group: 'Hardware'     },
  // Metodologías / Diseño
  { name: 'ANTLR4',         level: 60, group: 'Metodologías' },
  { name: 'UML (todos)',    level: 85, group: 'Metodologías' },
  { name: 'RUP / SCRUM',   level: 75, group: 'Metodologías' },
  { name: 'Patrones GOF',   level: 65, group: 'Metodologías' },
  { name: 'Arq. Software',  level: 65, group: 'Metodologías' },
  { name: 'Git',            level: 70, group: 'Metodologías' },
];

const GROUPS = ['Lenguajes','Frontend','Backend','DevOps','Datos','Hardware','Metodologías'];

const TIMELINE = [
  {
    year: '2014–2016',
    title: 'Bachiller Industrial — Mecánica General',
    place: 'Instituto Técnico Vocacional Dr. Imrich Fichmann',
    note: 'Ahí aprendí que construir algo físico que funcione es diferente a dibujarlo en papel.',
  },
  {
    year: '2017',
    title: 'Diplomado en Redes Digitales + Soporte IT',
    place: 'BM Computación',
    note: 'Reparación de laptops, celulares e impresoras. Premio honor al mérito.',
  },
  {
    year: '2018',
    title: 'Inicio — Ing. Ciencias y Sistemas',
    place: 'USAC · Guatemala',
    note: 'También: Diplomado en Administración de Redes Digitales.',
  },
  {
    year: '2022',
    title: 'Proyectos personales activos',
    place: 'GitHub · youtube.com/@programandoconpepito',
    note: 'Empieza el canal de YouTube sobre análisis y diseño de sistemas.',
  },
  {
    year: '2024',
    title: 'Auxiliar de cátedra — ADS 2',
    place: 'USAC · Noveno semestre',
    note: 'Impartir laboratorio, evaluar proyectos, explicar lo que entendí hasta que otros también lo entiendan.',
  },
  {
    year: 'Sep 2025',
    title: 'Consultor independiente',
    place: 'Guatemala',
    note: 'Arquitectura UML, revisión metodológica (RUP/SCRUM), asesoría a proyectos de graduación.',
  },
  {
    year: '2025',
    title: 'Cierre de pensum — Sistemas',
    place: 'USAC',
    note: 'El final de una etapa, el inicio de la siguiente.',
  },
  {
    year: '2026',
    title: 'Inicio — Ing. Ambiental',
    place: 'USAC',
    note: 'La intersección que quiero explorar: IoT + ML aplicado a monitoreo ambiental real.',
  },
];

const VALUES = [
  {
    glyph: '01',
    title: 'Calcular antes de encender',
    body: 'Cualquier decisión técnica sin datos previos es una apuesta, no ingeniería. La predicción va siempre antes del experimento.',
  },
  {
    glyph: '02',
    title: 'Las derrotas enseñan más',
    body: 'El LED quemado, el circuito mal calculado, el deploy que cayó: cada falla tiene más información que diez éxitos. Documentar los errores es tan valioso como documentar las soluciones.',
  },
  {
    glyph: '03',
    title: 'Construir desde cero cuando sea posible',
    body: 'No por masoquismo, sino porque el que construyó entiende. Usar una caja negra es rápido; entenderla es duradero.',
  },
  {
    glyph: '04',
    title: 'La basura es un recurso',
    body: 'Un plotter de $5 con lectoras de CD. Un servidor de desarrollo en una RPi5. La limitación de recursos obliga a ser más ingeniero, no menos.',
  },
];

// ── Componente ───────────────────────────────────────────────
export const AboutSection = () => {
  const [activeGroup, setActiveGroup] = useState('Todos');

  const filtered = activeGroup === 'Todos'
    ? STACK
    : STACK.filter(s => s.group === activeGroup);

  return (
    <div className="about-wrap">
    <div className="about">

      {/* ════════════════════ HERO ════════════════════ */}
      <section className="about__hero">

        {/* Avatar monograma */}
        <div className="about__avatar" aria-hidden="true">
          <div className="about__avatar-ring" />
          <div className="about__avatar-ring about__avatar-ring--2" />
          <span className="about__avatar-initials">MN</span>
          <div className="about__avatar-dot" />
        </div>

        <div className="about__hero-text">
          <p className="about__kicker">— sobre mí</p>
          <h1 className="about__name">
            Brandon<br />
            <em>Mauricio</em><br />
            Noj Romero
          </h1>
          <p className="about__role">
            Ing. Ciencias y Sistemas (cierre) · Ing. Ambiental · USAC
          </p>
          <p className="about__bio">
            Consultor técnico, auxiliar de cátedra y creador de contenido académico.
            Construyo cosas con hardware real, escribo sobre lo que aprendo
            y enseño lo que entiendo.
            Dos ingenierías no porque sea fácil,
            sino porque la intersección entre sistemas y ambiente
            es donde quiero trabajar.
          </p>

          {/* Contacto rápido */}
          <div className="about__links">
            <a href="https://github.com/Mau-Noj" target="_blank" rel="noopener" className="about__link">
              <span className="about__link-icon">⌥</span> GitHub
            </a>
            <a href="https://www.youtube.com/@programandoconpepito" target="_blank" rel="noopener" className="about__link about__link--yt">
              <span className="about__link-icon">▶</span> YouTube
            </a>
            <a href="mailto:brandonromero1964@gmail.com" className="about__link">
              <span className="about__link-icon">✉</span> Email
            </a>
            <a href="https://www.linkedin.com/in/brandon-mauricio-noj-romero-38b4701b6/" target="_blank" rel="noopener" className="about__link">
              <span className="about__link-icon">in</span> LinkedIn
            </a>
          </div>
        </div>

        {/* Números flotantes */}
        <div className="about__numbers">
          <div className="about__num">
            <span className="about__num-n">7+</span>
            <span className="about__num-l">años en USAC</span>
          </div>
          <div className="about__num">
            <span className="about__num-n">80+</span>
            <span className="about__num-l">proyectos lab</span>
          </div>
          <div className="about__num">
            <span className="about__num-n">2</span>
            <span className="about__num-l">ingenierías</span>
          </div>
        </div>
      </section>

      <div className="about__divider"><span>◈</span></div>

      {/* ════════════════════ VALORES ════════════════════ */}
      <section className="about__section">
        <p className="about__section-label">Filosofía de trabajo</p>
        <div className="about__values">
          {VALUES.map(v => (
            <article key={v.glyph} className="about__value">
              <span className="about__value-glyph">{v.glyph}</span>
              <div>
                <h3 className="about__value-title">{v.title}</h3>
                <p className="about__value-body">{v.body}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <div className="about__divider"><span>◈</span></div>

      {/* ════════════════════ STACK ════════════════════ */}
      <section className="about__section">
        <p className="about__section-label">Stack técnico</p>

        {/* Filtros de grupo */}
        <div className="about__stack-filters">
          {['Todos', ...GROUPS].map(g => (
            <button
              key={g}
              className={`about__sf ${activeGroup === g ? 'about__sf--on' : ''}`}
              onClick={() => setActiveGroup(g)}
            >
              {g}
            </button>
          ))}
        </div>

        <div className="about__stack-grid">
          {filtered.map(s => (
            <div key={s.name} className="about__skill">
              <div className="about__skill-head">
                <span className="about__skill-name">{s.name}</span>
                <span className="about__skill-pct">{s.level}%</span>
              </div>
              <div className="about__skill-bar">
                <div
                  className="about__skill-fill"
                  style={{ '--w': `${s.level}%` }}
                />
              </div>
              <span className="about__skill-group">{s.group}</span>
            </div>
          ))}
        </div>
      </section>

      <div className="about__divider"><span>◈</span></div>

      {/* ════════════════════ TIMELINE ════════════════════ */}
      <section className="about__section">
        <p className="about__section-label">Trayectoria</p>
        <div className="about__timeline">
          {TIMELINE.map((t, i) => (
            <div key={i} className="about__tl-item">
              <div className="about__tl-left">
                <span className="about__tl-year">{t.year}</span>
              </div>
              <div className="about__tl-connector">
                <div className="about__tl-dot" />
                {i < TIMELINE.length - 1 && <div className="about__tl-line" />}
              </div>
              <div className="about__tl-right">
                <h3 className="about__tl-title">{t.title}</h3>
                <p className="about__tl-place">{t.place}</p>
                <p className="about__tl-note">{t.note}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="about__divider"><span>◈</span></div>

      {/* ════════════════════ EDUCACIÓN FORMAL ════════════════════ */}
      <section className="about__section">
        <p className="about__section-label">Educación formal</p>
        <div className="about__edu">
          <div className="about__edu-card">
            <span className="about__edu-year">2018 — 2025</span>
            <h3 className="about__edu-title">Ingeniería en Ciencias y Sistemas</h3>
            <p className="about__edu-place">Universidad de San Carlos de Guatemala · USAC</p>
            <p className="about__edu-note">Cierre de pensum. Auxiliar de ADS 2 (2024). Intercambio académico USAC → Universidad Modular Abierta, El Salvador.</p>
          </div>
          <div className="about__edu-card">
            <span className="about__edu-year">2026 — presente</span>
            <h3 className="about__edu-title">Ingeniería Ambiental</h3>
            <p className="about__edu-place">Universidad de San Carlos de Guatemala · USAC</p>
            <p className="about__edu-note">En curso. Enfoque en la intersección IoT + monitoreo ambiental.</p>
          </div>
          <div className="about__edu-card">
            <span className="about__edu-year">2014 — 2016</span>
            <h3 className="about__edu-title">Bachiller Industrial — Mecánica General</h3>
            <p className="about__edu-place">Instituto Técnico Vocacional Dr. Imrich Fichmann · Guatemala</p>
            <p className="about__edu-note">Manufactura, CAD, tornería. La base física de todo lo que vino después.</p>
          </div>
        </div>
      </section>

      {/* ════════════════════ FOOTER FIRMA ════════════════════ */}
      <footer className="about__footer">
        <p className="about__footer-quote">
          "Aprendemos más de nuestras derrotas que de nuestras victorias."
        </p>
        <p className="about__footer-sub">
          Brandon Mauricio Noj Romero · Guatemala · mauricionoj.com
        </p>
      </footer>

    </div>
    </div>
  );
};