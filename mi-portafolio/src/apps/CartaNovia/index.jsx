// src/apps/CartaNovia/index.jsx
// Proyecto 1 — Carta para mi novia
// Frontend puro, sin backend

import React, { useState, useEffect } from 'react';
import './CartaNovia.css';

// ── Navbar interno ───────────────────────────────────────────────────────────
const NavInterna = ({ seccionActiva, setSección }) => (
  <nav className="cn__nav">
    <div className="cn__nav-logo">M <span>&</span> A</div>
    <div className="cn__nav-links">
      {['carta', 'momentos', 'promesas'].map(s => (
        <button
          key={s}
          className={`cn__nav-link ${seccionActiva === s ? 'cn__nav-link--active' : ''}`}
          onClick={() => setSección(s)}
        >
          {s.charAt(0).toUpperCase() + s.slice(1)}
        </button>
      ))}
    </div>
  </nav>
);

// ── Sección: Carta ───────────────────────────────────────────────────────────
const SeccionCarta = () => {
  const [visible, setVisible] = useState(false);
  useEffect(() => { setTimeout(() => setVisible(true), 200); }, []);

  return (
    <section className={`cn__carta ${visible ? 'cn__carta--visible' : ''}`}>
      <div className="cn__carta-paper">
        <p className="cn__carta-fecha">{new Date().toLocaleDateString('es-GT', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
        <h2 className="cn__carta-saludo">Para ti,</h2>
        <div className="cn__carta-cuerpo">
          <p>Hay cosas que cuesta decir en voz alta, no porque no se sientan, sino porque las palabras a veces se quedan pequeñas.</p>
          <p>Pero soy ingeniero — así que hice lo que sé hacer: construí algo para decírtelo.</p>
          <p>Esta carta no tiene fecha de vencimiento. Cada vez que la abras, sigue siendo verdad.</p>
          <p className="cn__carta-especial">Gracias por estar.</p>
        </div>
        <p className="cn__carta-firma">— Mauricio</p>
        <div className="cn__carta-decoracion">
          {['✦', '✧', '✦', '✧', '✦'].map((s, i) => (
            <span key={i} style={{ animationDelay: `${i * 0.3}s` }}>{s}</span>
          ))}
        </div>
      </div>
    </section>
  );
};

// ── Sección: Momentos ────────────────────────────────────────────────────────
const MOMENTOS = [
  { emoji: '☕', titulo: 'El primer café', desc: 'Donde todo empezó sin que lo planeáramos.' },
  { emoji: '🌧', titulo: 'La lluvia de marzo', desc: 'Quedamos atrapados y no nos importó.' },
  { emoji: '🎧', titulo: 'La canción de siempre', desc: 'Ya no puedo escucharla sin pensar en ti.' },
  { emoji: '📱', titulo: 'El mensaje a las 2am', desc: 'El que no debí enviar y me alegra haber enviado.' },
  { emoji: '🌄', titulo: 'Ese amanecer', desc: 'No recuerdo por qué seguíamos despiertos. Sí recuerdo que valió.' },
  { emoji: '🔧', titulo: 'Cuando me viste programar', desc: 'Y no te fuiste.' },
];

const SeccionMomentos = () => (
  <section className="cn__momentos">
    <h2 className="cn__section-title">Momentos que guardo</h2>
    <div className="cn__momentos-grid">
      {MOMENTOS.map((m, i) => (
        <div key={i} className="cn__momento" style={{ animationDelay: `${i * 0.08}s` }}>
          <span className="cn__momento-emoji">{m.emoji}</span>
          <h3 className="cn__momento-titulo">{m.titulo}</h3>
          <p className="cn__momento-desc">{m.desc}</p>
        </div>
      ))}
    </div>
  </section>
);

// ── Sección: Promesas ────────────────────────────────────────────────────────
const PROMESAS = [
  'Seguir construyendo cosas para ti.',
  'Nunca dejar de preguntarte cómo estás.',
  'Aprender a cocinar ese plato que te gusta.',
  'Estar cuando importa, no solo cuando es fácil.',
  'Hacerte reír aunque esté cansado.',
  'Recordar las fechas importantes. Y las que no lo son.',
];

const SeccionPromesas = () => {
  const [reveladas, setReveladas] = useState([]);
  const revelar = (i) => {
    if (!reveladas.includes(i)) setReveladas(prev => [...prev, i]);
  };

  return (
    <section className="cn__promesas">
      <h2 className="cn__section-title">Promesas</h2>
      <p className="cn__promesas-hint">Toca cada una para revelarla</p>
      <div className="cn__promesas-list">
        {PROMESAS.map((p, i) => (
          <button
            key={i}
            className={`cn__promesa ${reveladas.includes(i) ? 'cn__promesa--revelada' : ''}`}
            onClick={() => revelar(i)}
          >
            <span className="cn__promesa-num">{String(i + 1).padStart(2, '0')}</span>
            <span className="cn__promesa-texto">
              {reveladas.includes(i) ? p : '• • • • • • • • • • • •'}
            </span>
          </button>
        ))}
      </div>
      {reveladas.length === PROMESAS.length && (
        <div className="cn__promesas-final">
          <p>Lo digo en serio. Todo.</p>
        </div>
      )}
    </section>
  );
};

// ── App principal ─────────────────────────────────────────────────────────────
const CartaNovia = () => {
  const [seccion, setSección] = useState('carta');

  return (
    <div className="cn__wrap">
      <NavInterna seccionActiva={seccion} setSección={setSección} />
      <main className="cn__main">
        {seccion === 'carta'    && <SeccionCarta />}
        {seccion === 'momentos' && <SeccionMomentos />}
        {seccion === 'promesas' && <SeccionPromesas />}
      </main>
    </div>
  );
};

export default CartaNovia;