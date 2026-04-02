import { useState } from 'react';
import './OSIPanel.css';

export default function OSIPanel({ layer, onClose }) {
  const [activeTab, setActiveTab] = useState('desc');

  if (!layer) return null;

  const tabs = [
    { id: 'desc',  label: 'Descripción' },
    { id: 'diag',  label: 'Diagrama' },
    { id: 'cases', label: 'Casos de uso' },
  ];

  return (
    <aside className="osi-panel open">
      <div className="osi-panel__header">
        <h2 style={{ color: layer.css }}>{layer.name}</h2>
        <button className="osi-panel__close" onClick={onClose}>✕</button>
      </div>

      <div className="osi-panel__body">
        <div className="osi-panel__bar" style={{ background: layer.css }} />
        <div className="osi-panel__icon">{layer.icon}</div>
        <div className="osi-panel__title" style={{ color: layer.css }}>{layer.name}</div>
        <div className="osi-panel__sub">PDU: {layer.pdu} &nbsp;·&nbsp; Capa {layer.n}</div>

        {/* Tabs */}
        <div className="osi-panel__tabs">
          {tabs.map(t => (
            <button
              key={t.id}
              className={`osi-panel__tab ${activeTab === t.id ? 'active' : ''}`}
              style={activeTab === t.id ? { borderBottomColor: layer.css, color: '#fff' } : {}}
              onClick={() => setActiveTab(t.id)}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Tab: Descripción */}
        {activeTab === 'desc' && (
          <div className="osi-panel__tc">
            <div className="osi-panel__slabel">¿Qué hace?</div>
            <p className="osi-panel__text">{layer.desc}</p>
            <div className="osi-panel__slabel">Función técnica</div>
            <p className="osi-panel__text">{layer.fn}</p>
            <div className="osi-panel__slabel">Protocolos</div>
            <div className="osi-panel__pills">
              {layer.protos.map(p => (
                <span
                  key={p} className="osi-panel__pill"
                  style={{ color: layer.css, borderColor: layer.css + '44', background: layer.bg }}
                >{p}</span>
              ))}
            </div>
            <div className="osi-panel__slabel">Dispositivos</div>
            <div className="osi-panel__pills">
              {layer.devs.map(d => (
                <span
                  key={d} className="osi-panel__pill"
                  style={{ color: layer.css, borderColor: layer.css + '33', background: layer.bg }}
                >{d}</span>
              ))}
            </div>
          </div>
        )}

        {/* Tab: Diagrama */}
        {activeTab === 'diag' && (
          <div className="osi-panel__tc">
            <div className="osi-panel__slabel">Diagrama visual</div>
            <div
              className="osi-panel__diag"
              dangerouslySetInnerHTML={{ __html: layer.diag }}
            />
          </div>
        )}

        {/* Tab: Casos */}
        {activeTab === 'cases' && (
          <div className="osi-panel__tc">
            <div className="osi-panel__slabel">Casos de uso reales</div>
            {layer.cases.map((c, i) => (
              <div
                key={i} className="osi-panel__case"
                style={{ borderLeftColor: layer.css + '66', background: layer.bg + '55' }}
              >
                <div className="osi-panel__case-title" style={{ color: layer.css }}>{c.t}</div>
                <div className="osi-panel__case-desc">{c.d}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </aside>
  );
}