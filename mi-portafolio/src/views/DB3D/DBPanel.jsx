import { useState } from 'react';
import './DBPanel.css';

export default function DBPanel({ component, onClose }) {
  const [activeTab, setActiveTab] = useState('desc');

  if (!component) return null;

  const tabs = [
    { id: 'desc',   label: 'Descripción' },
    { id: 'details',label: 'Parámetros' },
    { id: 'cases',  label: 'Casos reales' },
  ];

  return (
    <aside className="db-panel open">
      <div className="db-panel__header">
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span className="db-panel__badge" style={{ background: component.css + '22', color: component.css, border: `1px solid ${component.css}44` }}>
            {component.short}
          </span>
          <h2 style={{ color: component.css, margin: 0, fontSize: 15, fontWeight: 700 }}>
            {component.name}
          </h2>
        </div>
        <button className="db-panel__close" onClick={onClose}>✕</button>
      </div>

      <div className="db-panel__body">
        <div className="db-panel__bar" style={{ background: component.css }} />

        {/* Tabs */}
        <div className="db-panel__tabs">
          {tabs.map(t => (
            <button
              key={t.id}
              className={`db-panel__tab ${activeTab === t.id ? 'active' : ''}`}
              style={activeTab === t.id ? { borderBottomColor: component.css, color: '#fff' } : {}}
              onClick={() => setActiveTab(t.id)}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Descripción */}
        {activeTab === 'desc' && (
          <div className="db-panel__tc">
            <div className="db-panel__slabel">¿Qué es?</div>
            <p className="db-panel__text">{component.desc}</p>
            <div className="db-panel__slabel">Función técnica</div>
            <p className="db-panel__text">{component.fn}</p>
          </div>
        )}

        {/* Parámetros */}
        {activeTab === 'details' && (
          <div className="db-panel__tc">
            <div className="db-panel__slabel">Parámetros clave</div>
            <div className="db-panel__params">
              {(component.details || []).map((d, i) => (
                <div key={i} className="db-panel__param-row">
                  <span className="db-panel__param-label">{d.label}</span>
                  <span className="db-panel__param-value" style={{ color: component.css }}>{d.value}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Casos reales */}
        {activeTab === 'cases' && (
          <div className="db-panel__tc">
            <div className="db-panel__slabel">Casos de uso reales</div>
            {(component.cases || []).map((c, i) => (
              <div
                key={i}
                className="db-panel__case"
                style={{ borderLeftColor: component.css + '66', background: component.bg + '55' }}
              >
                <div className="db-panel__case-title" style={{ color: component.css }}>{c.t}</div>
                <div className="db-panel__case-desc">{c.d}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </aside>
  );
}