// src/views/ComponentDetail.jsx
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getComponentById } from '../models/components.data';
import { CATEGORIAS } from '../models/components.model';
import './ComponentDetail.css';

const TOXICIDAD_COLOR = { BAJO: '#16a34a', MEDIO: '#f59e0b', ALTO: '#dc2626' };
const TOXICIDAD_LABEL = { BAJO: 'Baja toxicidad', MEDIO: 'Toxicidad media', ALTO: 'Alta toxicidad' };

const Badge = ({ ok, label }) => (
  <span className={`cd__norm ${ok ? 'cd__norm--ok' : 'cd__norm--no'}`}>
    {ok ? '✓' : '✗'} {label}
  </span>
);

const CO2Bar = ({ value }) => {
  // Escala: 0–100g, verde a rojo
  const pct = Math.min((value / 100) * 100, 100);
  const color = pct < 20 ? '#16a34a' : pct < 50 ? '#f59e0b' : '#dc2626';
  return (
    <div className="cd__bar-wrap">
      <div className="cd__bar-track">
        <div className="cd__bar-fill" style={{ width: `${pct}%`, background: color }} />
      </div>
      <span className="cd__bar-val" style={{ color }}>{value}g CO₂</span>
    </div>
  );
};

const RecycleRing = ({ pct }) => {
  const r = 28, circ = 2 * Math.PI * r;
  const dash = (pct / 100) * circ;
  const color = pct > 60 ? '#16a34a' : pct > 30 ? '#f59e0b' : '#dc2626';
  return (
    <svg className="cd__ring" viewBox="0 0 64 64">
      <circle cx="32" cy="32" r={r} fill="none" stroke="var(--rule)" strokeWidth="5" />
      <circle
        cx="32" cy="32" r={r} fill="none"
        stroke={color} strokeWidth="5"
        strokeDasharray={`${dash} ${circ}`}
        strokeLinecap="round"
        transform="rotate(-90 32 32)"
        style={{ transition: 'stroke-dasharray 1s ease' }}
      />
      <text x="32" y="37" textAnchor="middle" fontSize="11" fontWeight="700" fill={color}>
        {pct}%
      </text>
    </svg>
  );
};

export const ComponentDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const comp = getComponentById(id);
  const [tab, setTab] = useState('electronica'); // 'electronica' | 'ambiental' | 'dual'

  if (!comp) return (
    <div className="cd-wrap cd-wrap--404">
      <p>Componente no encontrado.</p>
      <button onClick={() => navigate('/componentes')}>← Volver</button>
    </div>
  );

  const catInfo = CATEGORIAS.find(c => c.id === comp.categoria);

  return (
    <div className="cd-wrap">
      <div className="cd">

        {/* ── Breadcrumb ── */}
        <nav className="cd__breadcrumb">
          <button onClick={() => navigate('/componentes')}>Componentes</button>
          <span>/</span>
          <span>{catInfo?.label}</span>
          <span>/</span>
          <span>{comp.nombre}</span>
        </nav>

        {/* ── Hero ── */}
        <div className="cd__hero">
          <div className="cd__hero-img">
            {comp.imagen ? (
              <img src={comp.imagen} alt={comp.nombre} />
            ) : (
              <div className="cd__hero-placeholder">{catInfo?.icon || '◎'}</div>
            )}
          </div>

          <div className="cd__hero-info">
            <p className="cd__kicker">{catInfo?.icon} {comp.subcategoria}</p>
            <h1 className="cd__name">{comp.nombre}</h1>

            {comp.formula_quimica && (
              <p className="cd__formula">{comp.formula_quimica}</p>
            )}

            <p className="cd__desc">{comp.descripcion}</p>

            {/* Normativas */}
            <div className="cd__norms">
              <Badge ok={comp.rohs}  label="RoHS"  />
              <Badge ok={comp.reach} label="REACH" />
              <Badge ok={comp.weee}  label="WEEE"  />
            </div>

            {/* Conflicto */}
            {comp.conflicto_minerales && (
              <div className="cd__conflict">
                <span className="cd__conflict-icon">⚠</span>
                <div>
                  <p className="cd__conflict-title">Minerales de conflicto detectados</p>
                  <p className="cd__conflict-detail">{comp.conflicto_detalle}</p>
                </div>
              </div>
            )}

            {/* Links */}
            <div className="cd__hero-actions">
              {comp.datasheet_url && (
                <a href={comp.datasheet_url} target="_blank" rel="noopener noreferrer" className="cd__btn cd__btn--primary">
                  ↓ Datasheet PDF
                </a>
              )}
              {comp.precio_aprox && (
                <span className="cd__price">~{comp.precio_aprox}</span>
              )}
            </div>
          </div>
        </div>

        {/* ── Tabs ── */}
        <div className="cd__tabs">
          <button
            className={`cd__tab ${tab === 'electronica' ? 'cd__tab--active' : ''}`}
            onClick={() => setTab('electronica')}
          >
            ⚡ Electrónica
          </button>
          <button
            className={`cd__tab ${tab === 'ambiental' ? 'cd__tab--active' : ''}`}
            onClick={() => setTab('ambiental')}
          >
            🌿 Ambiental
          </button>
          <button
            className={`cd__tab ${tab === 'dual' ? 'cd__tab--active cd__tab--dual' : ''}`}
            onClick={() => setTab('dual')}
          >
            ◈ Perspectiva Dual
          </button>
        </div>

        {/* ══════════════════════════════════════════
            TAB: ELECTRÓNICA
        ══════════════════════════════════════════ */}
        {tab === 'electronica' && (
          <div className="cd__panel cd__panel--fade">

            {/* Specs técnicas */}
            <section className="cd__section">
              <h2 className="cd__section-title">Especificaciones técnicas</h2>
              <div className="cd__specs">
                {Object.entries(comp.specs).map(([k, v]) => (
                  <div key={k} className="cd__spec-row">
                    <span className="cd__spec-key">{k}</span>
                    <span className="cd__spec-val">{v}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Composición */}
            <section className="cd__section">
              <h2 className="cd__section-title">Composición del material</h2>
              <p className="cd__text">{comp.composicion}</p>
            </section>

            {/* Proyectos */}
            {comp.proyectos?.length > 0 && (
              <section className="cd__section">
                <h2 className="cd__section-title">Usado en proyectos</h2>
                <div className="cd__project-tags">
                  {comp.proyectos.map(p => (
                    <button
                      key={p}
                      className="cd__project-tag"
                      onClick={() => navigate(`/proyectos/${p}`)}
                    >
                      {p} →
                    </button>
                  ))}
                </div>
              </section>
            )}

          </div>
        )}

        {/* ══════════════════════════════════════════
            TAB: AMBIENTAL
        ══════════════════════════════════════════ */}
        {tab === 'ambiental' && (
          <div className="cd__panel cd__panel--fade">

            {/* Métricas visuales */}
            <section className="cd__section">
              <h2 className="cd__section-title">Métricas ambientales</h2>
              <div className="cd__env-metrics">

                {/* CO₂ */}
                <div className="cd__env-card">
                  <p className="cd__env-label">Huella de carbono (fabricación)</p>
                  <CO2Bar value={comp.huella_carbono} />
                  <p className="cd__env-note">gramos de CO₂ equivalente</p>
                </div>

                {/* Reciclabilidad */}
                <div className="cd__env-card">
                  <p className="cd__env-label">Reciclabilidad</p>
                  <RecycleRing pct={comp.reciclabilidad} />
                  <p className="cd__env-note">porcentaje recuperable</p>
                </div>

                {/* Toxicidad */}
                <div className="cd__env-card">
                  <p className="cd__env-label">Toxicidad</p>
                  <div
                    className="cd__tox-badge"
                    style={{ borderColor: TOXICIDAD_COLOR[comp.toxicidad], color: TOXICIDAD_COLOR[comp.toxicidad] }}
                  >
                    {TOXICIDAD_LABEL[comp.toxicidad]}
                  </div>
                  <p className="cd__env-note">{comp.toxicidad_notas}</p>
                </div>

              </div>
            </section>

            {/* Origen */}
            <section className="cd__section">
              <h2 className="cd__section-title">Origen del material</h2>
              <p className="cd__text">{comp.origen_material}</p>
            </section>

            {/* Conflicto */}
            <section className="cd__section">
              <h2 className="cd__section-title">Minerales de conflicto</h2>
              {comp.conflicto_minerales ? (
                <div className="cd__conflict-detail">
                  <span className="cd__conflict-icon">⚠</span>
                  <p>{comp.conflicto_detalle}</p>
                </div>
              ) : (
                <p className="cd__text cd__text--ok">✓ No se han identificado minerales de conflicto en este componente.</p>
              )}
            </section>

            {/* Alternativa verde */}
            <section className="cd__section">
              <h2 className="cd__section-title">Alternativa más sostenible</h2>
              <div className="cd__alt-verde">
                <span className="cd__alt-icon">🌿</span>
                <p>{comp.alternativa_verde}</p>
              </div>
            </section>

            {/* Vida útil y disposición */}
            <div className="cd__two-col">
              <section className="cd__section">
                <h2 className="cd__section-title">Vida útil estimada</h2>
                <p className="cd__text">{comp.vida_util}</p>
              </section>
              <section className="cd__section">
                <h2 className="cd__section-title">Disposición correcta</h2>
                <p className="cd__text">{comp.disposicion}</p>
              </section>
            </div>

          </div>
        )}

        {/* ══════════════════════════════════════════
            TAB: PERSPECTIVA DUAL
        ══════════════════════════════════════════ */}
        {tab === 'dual' && (
          <div className="cd__panel cd__panel--fade">

            {/* Panel split */}
            <div className="cd__dual-grid">

              {/* Columna electrónica */}
              <div className="cd__dual-col cd__dual-col--elec">
                <div className="cd__dual-header">
                  <span className="cd__dual-icon">⚡</span>
                  <h3>Ingeniería Electrónica</h3>
                </div>
                <div className="cd__dual-items">
                  {Object.entries(comp.specs).slice(0, 5).map(([k, v]) => (
                    <div key={k} className="cd__dual-item">
                      <span className="cd__dual-key">{k}</span>
                      <span className="cd__dual-val">{v}</span>
                    </div>
                  ))}
                  <div className="cd__dual-item">
                    <span className="cd__dual-key">Vida útil</span>
                    <span className="cd__dual-val">{comp.vida_util?.split('.')[0]}</span>
                  </div>
                </div>
              </div>

              {/* Columna ambiental */}
              <div className="cd__dual-col cd__dual-col--env">
                <div className="cd__dual-header">
                  <span className="cd__dual-icon">🌿</span>
                  <h3>Ingeniería Ambiental</h3>
                </div>
                <div className="cd__dual-items">
                  <div className="cd__dual-item">
                    <span className="cd__dual-key">Huella CO₂</span>
                    <span className="cd__dual-val">{comp.huella_carbono}g</span>
                  </div>
                  <div className="cd__dual-item">
                    <span className="cd__dual-key">Reciclable</span>
                    <span className="cd__dual-val">{comp.reciclabilidad}%</span>
                  </div>
                  <div className="cd__dual-item">
                    <span className="cd__dual-key">Toxicidad</span>
                    <span className="cd__dual-val" style={{ color: TOXICIDAD_COLOR[comp.toxicidad] }}>
                      {TOXICIDAD_LABEL[comp.toxicidad]}
                    </span>
                  </div>
                  <div className="cd__dual-item">
                    <span className="cd__dual-key">Conflicto</span>
                    <span className="cd__dual-val" style={{ color: comp.conflicto_minerales ? '#dc2626' : '#16a34a' }}>
                      {comp.conflicto_minerales ? 'Detectado' : 'No detectado'}
                    </span>
                  </div>
                  <div className="cd__dual-item">
                    <span className="cd__dual-key">Origen</span>
                    <span className="cd__dual-val">{comp.origen_material?.split('.')[0]}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Punto de conexión */}
            <div className="cd__conexion">
              <div className="cd__conexion-header">
                <span className="cd__conexion-icon">◈</span>
                <h3>Punto de conexión</h3>
                <span className="cd__conexion-tag">Análisis integrado</span>
              </div>
              <blockquote className="cd__conexion-text">
                {comp.punto_conexion}
              </blockquote>
            </div>

            {/* Alternativa verde */}
            <div className="cd__alt-verde cd__alt-verde--dual">
              <span className="cd__alt-icon">🌿</span>
              <div>
                <p className="cd__alt-label">Alternativa más sostenible</p>
                <p>{comp.alternativa_verde}</p>
              </div>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};