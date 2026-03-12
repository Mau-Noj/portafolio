// src/components/SearchModal.jsx
// Buscador global — Ctrl+K para abrir, Escape para cerrar
// Busca en: proyectos, blog, materiales de apoyo, páginas

import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './SearchModal.css';
import { getAllProjects } from '../models/projects.data';

// ── Índice de Blog ───────────────────────────────────────────
const BLOG_INDEX = [
  { id: 1, title: 'Por qué calculo primero antes de armar cualquier circuito', tags: ['Electricidad','Método','Errores'],   cat: 'aprendizajes' },
  { id: 2, title: 'El RPi5 no es una computadora de juguete',                  tags: ['RPi5','Linux','Embedded'],          cat: 'hardware'     },
  { id: 3, title: 'YOLOv8 en hardware sin GPU: expectativas vs realidad',       tags: ['YOLOv8','ONNX','Optimización'],     cat: 'ia'           },
  { id: 4, title: 'Nota rápida: diferencia entre paso a paso y servo',          tags: ['Motores','Hardware','CNC'],         cat: 'notas'        },
  { id: 5, title: 'Cursando dos ingenierías: sistemas y ambiental',             tags: ['Carrera','IoT','Ambiental'],        cat: 'aprendizajes' },
  { id: 6, title: 'Construí un plotter con lectoras de CD viejas',              tags: ['CNC','Reciclado','Maker'],          cat: 'hardware'     },
];

// ── Índice de Materiales de Apoyo ────────────────────────────
// Mantén este array sincronizado con src/models/materials.data.jsx
const MATERIALS_INDEX = [
  {
    id: 1,
    type: 'article',
    title: 'Entendiendo los Casos de Uso',
    desc: 'Actores, límites del sistema y relaciones include, extend, generalización.',
    tags: ['Análisis', 'UML', 'Ingeniería'],
    icon: '📖',
  },
  {
    id: 2,
    type: 'download',
    title: 'Plantilla SRS (Requerimientos)',
    desc: 'Formato estándar IEEE 830 para documentación de software.',
    tags: ['Documentación', 'IEEE'],
    icon: '📥',
  },
  // ── Agrega aquí nuevos materiales cuando los agregues en materials.data.jsx ──
];

// ── Páginas estáticas ────────────────────────────────────────
const PAGES_INDEX = [
  { title: 'Proyectos',           path: '/proyectos',  desc: 'Catálogo de 80+ proyectos de laboratorio',        icon: '⚗'  },
  { title: 'Blog',                path: '/blog',       desc: 'Notas del proceso — hardware, IA, aprendizajes',  icon: '📓' },
  { title: 'Materiales de Apoyo', path: '/materiales', desc: 'Artículos técnicos y plantillas de estudio',      icon: '📚' },
  { title: 'Sobre mí',            path: '/sobre-mi',   desc: 'Trayectoria, stack técnico y filosofía',          icon: '◈'  },
  { title: 'Artículos',           path: '/articulos',  desc: 'Artículos técnicos de ingeniería',                icon: '✍'  },
];

// ── Helpers ──────────────────────────────────────────────────
const normalize = (s) =>
  s?.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '') ?? '';

const highlight = (text, query) => {
  if (!query) return text;
  const idx = normalize(text).indexOf(normalize(query));
  if (idx === -1) return text;
  return (
    <>
      {text.slice(0, idx)}
      <mark className="sm__mark">{text.slice(idx, idx + query.length)}</mark>
      {text.slice(idx + query.length)}
    </>
  );
};

// ── Componente ───────────────────────────────────────────────
export const SearchModal = ({ isOpen, onClose }) => {
  const [query,  setQuery]  = useState('');
  const [cursor, setCursor] = useState(0);
  const navigate            = useNavigate();
  const inputRef            = useRef(null);

  // Focus al abrir
  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setCursor(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  // Escape cierra
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [isOpen, onClose]);

  // Bloquear scroll del body
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  if (!isOpen) return null;

  // ── Búsqueda ──────────────────────────────────────────────
  const q  = query.trim();
  const nq = normalize(q);

  const projects = getAllProjects().filter(p =>
    !q || [p.title, p.short, p.id, ...(p.tags ?? []), p.cat]
      .some(f => normalize(String(f)).includes(nq))
  ).slice(0, 5);

  const posts = BLOG_INDEX.filter(p =>
    !q || [p.title, p.cat, ...p.tags]
      .some(f => normalize(f).includes(nq))
  ).slice(0, 4);

  const materials = MATERIALS_INDEX.filter(m =>
    !q || [m.title, m.desc, m.type, ...m.tags]
      .some(f => normalize(f).includes(nq))
  ).slice(0, 4);

  const pages = PAGES_INDEX.filter(p =>
    !q || [p.title, p.desc]
      .some(f => normalize(f).includes(nq))
  );

  // Lista plana para navegar con teclado
  const allResults = [
    ...pages.map(p     => ({ type: 'page',     item: p, path: p.path                    })),
    ...projects.map(p  => ({ type: 'project',  item: p, path: `/proyectos/${p.id}`      })),
    ...posts.map(p     => ({ type: 'post',     item: p, path: `/blog/${p.id}`           })),
    ...materials.map(m => ({ type: 'material', item: m, path: `/materiales#mat-${m.id}` })),
  ];

  const isEmpty = allResults.length === 0 && q.length > 0;

  const goTo = (path) => { navigate(path); onClose(); };

  const handleKey = (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setCursor(c => Math.min(c + 1, allResults.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setCursor(c => Math.max(c - 1, 0));
    } else if (e.key === 'Enter' && allResults[cursor]) {
      goTo(allResults[cursor].path);
    }
  };

  // Contador global para el cursor
  let gIdx = -1;

  return (
    <div className="sm__overlay" onClick={onClose} role="dialog" aria-modal="true" aria-label="Buscador global">
      <div className="sm" onClick={e => e.stopPropagation()}>

        {/* ── Input ── */}
        <div className="sm__input-wrap">
          <span className="sm__search-icon" aria-hidden="true">⌕</span>
          <input
            ref={inputRef}
            className="sm__input"
            type="text"
            placeholder="Buscar proyectos, blog, materiales, secciones…"
            value={query}
            onChange={e => { setQuery(e.target.value); setCursor(0); }}
            onKeyDown={handleKey}
            autoComplete="off"
            spellCheck="false"
          />
          {q && (
            <button className="sm__clear" onClick={() => setQuery('')} aria-label="Limpiar">✕</button>
          )}
          <kbd className="sm__esc" onClick={onClose}>ESC</kbd>
        </div>

        {/* ── Resultados ── */}
        <div className="sm__results">

          {isEmpty && (
            <div className="sm__empty">
              <span className="sm__empty-icon">◌</span>
              <p>Sin resultados para <strong>"{q}"</strong></p>
            </div>
          )}

          {!q && (
            <div className="sm__hint">
              <span>↑↓ navegar</span>
              <span>↵ abrir</span>
              <span>ESC cerrar</span>
            </div>
          )}

          {/* Páginas */}
          {pages.length > 0 && (
            <div className="sm__group">
              <p className="sm__group-label">Secciones</p>
              {pages.map(p => {
                gIdx++;
                const idx = gIdx;
                return (
                  <button key={p.path} className={`sm__item ${cursor === idx ? 'sm__item--on' : ''}`}
                    onClick={() => goTo(p.path)} onMouseEnter={() => setCursor(idx)}>
                    <span className="sm__item-icon">{p.icon}</span>
                    <span className="sm__item-body">
                      <span className="sm__item-title">{highlight(p.title, q)}</span>
                      <span className="sm__item-sub">{p.desc}</span>
                    </span>
                    <span className="sm__item-arrow">→</span>
                  </button>
                );
              })}
            </div>
          )}

          {/* Proyectos */}
          {projects.length > 0 && (
            <div className="sm__group">
              <p className="sm__group-label">Proyectos</p>
              {projects.map(p => {
                gIdx++;
                const idx = gIdx;
                return (
                  <button key={p.id} className={`sm__item ${cursor === idx ? 'sm__item--on' : ''}`}
                    onClick={() => goTo(`/proyectos/${p.id}`)} onMouseEnter={() => setCursor(idx)}>
                    <span className="sm__item-icon">{p.icon}</span>
                    <span className="sm__item-body">
                      <span className="sm__item-title">{highlight(p.title, q)}</span>
                      <span className="sm__item-sub">{p.id} · {(p.tags ?? []).slice(0,3).join(' · ')}</span>
                    </span>
                    <span className={`sm__item-badge sm__item-badge--${p.cat}`}>{p.cat}</span>
                  </button>
                );
              })}
            </div>
          )}

          {/* Blog */}
          {posts.length > 0 && (
            <div className="sm__group">
              <p className="sm__group-label">Blog</p>
              {posts.map(p => {
                gIdx++;
                const idx = gIdx;
                return (
                  <button key={p.id} className={`sm__item ${cursor === idx ? 'sm__item--on' : ''}`}
                    onClick={() => goTo(`/blog/${p.id}`)} onMouseEnter={() => setCursor(idx)}>
                    <span className="sm__item-icon">✍</span>
                    <span className="sm__item-body">
                      <span className="sm__item-title">{highlight(p.title, q)}</span>
                      <span className="sm__item-sub">#{p.cat} · {p.tags.join(' · ')}</span>
                    </span>
                    <span className="sm__item-arrow">→</span>
                  </button>
                );
              })}
            </div>
          )}

          {/* Materiales de Apoyo */}
          {materials.length > 0 && (
            <div className="sm__group">
              <p className="sm__group-label">Materiales de Apoyo</p>
              {materials.map(m => {
                gIdx++;
                const idx = gIdx;
                return (
                  <button key={m.id} className={`sm__item ${cursor === idx ? 'sm__item--on' : ''}`}
                    onClick={() => goTo(`/materiales`)} onMouseEnter={() => setCursor(idx)}>
                    <span className="sm__item-icon">{m.icon}</span>
                    <span className="sm__item-body">
                      <span className="sm__item-title">{highlight(m.title, q)}</span>
                      <span className="sm__item-sub">{m.tags.join(' · ')} · {m.desc}</span>
                    </span>
                    <span className={`sm__item-badge sm__item-badge--mat-${m.type}`}>
                      {m.type === 'article' ? 'artículo' : 'descarga'}
                    </span>
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* ── Footer ── */}
        <div className="sm__footer">
          <span>{allResults.length} resultado{allResults.length !== 1 ? 's' : ''}</span>
          <span>Ctrl+K para abrir en cualquier momento</span>
        </div>
      </div>
    </div>
  );
};