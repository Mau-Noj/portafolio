// src/apps/CumpleañosAmiga/index.jsx

import React, { useState, useEffect, useRef } from 'react';
import './CumpleañosAmiga.css';

// ── Navbar interna ────────────────────────────────────────────────────────────
const NavInterna = ({ seccionActiva, setSección }) => (
  <nav className="ca__nav">
    <div className="ca__nav-logo">🎂</div>
    <div className="ca__nav-links">
      {['carta', 'momentos'].map(s => (
        <button
          key={s}
          className={`ca__nav-link ${seccionActiva === s ? 'ca__nav-link--active' : ''}`}
          onClick={() => setSección(s)}
        >
          {s.charAt(0).toUpperCase() + s.slice(1)}
        </button>
      ))}
    </div>
  </nav>
);

// ── Confetti ──────────────────────────────────────────────────────────────────
const Confetti = () => {
  const piezas = Array.from({ length: 30 }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    delay: Math.random() * 3,
    color: ['#f472b6','#a78bfa','#34d399','#fbbf24','#60a5fa'][Math.floor(Math.random()*5)],
    size: 6 + Math.random() * 8,
  }));
  return (
    <div className="ca__confetti">
      {piezas.map(p => (
        <div key={p.id} className="ca__confetti-pieza" style={{
          left: `${p.left}%`,
          animationDelay: `${p.delay}s`,
          background: p.color,
          width: p.size,
          height: p.size,
        }} />
      ))}
    </div>
  );
};

// ── Analizador léxico ─────────────────────────────────────────────────────────
const analizarRelacion = (texto) => {
  const t = texto.toLowerCase()
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z\s]/g, '');
  const tokens = t.split(/\s+/).filter(Boolean);

  const ESPECIALES = {
    amiga:  ['amiga','amiguita','amigui','bestie','bff','mejor amiga'],
    esposa: ['esposa','wifey','wife','casada','senora','mi senora'],
    amante: ['amante','amor secreto','lo nuestro','mi secreto'],
  };

  let encontrado = false;
  for (const palabras of Object.values(ESPECIALES)) {
    for (const p of palabras) {
      if (t.includes(p)) { encontrado = true; break; }
    }
    if (encontrado) break;
  }
  if (!encontrado) {
    for (const token of tokens) {
      if (['amiga','amiguita','bestie','bff','esposa','wifey','amante'].includes(token)) {
        encontrado = true; break;
      }
    }
  }
  return encontrado ? 'ESPECIAL' : 'NORMAL';
};

// ── Alert modal personalizado ─────────────────────────────────────────────────
let _setAlertState = null;
const showAlert = (titulo, mensaje) => {
  if (_setAlertState) _setAlertState({ visible: true, titulo, mensaje });
};

const AlertModal = () => {
  const [state, setState] = useState({ visible: false, titulo: '', mensaje: '' });
  _setAlertState = setState;
  if (!state.visible) return null;
  return (
    <div className="ca__alert-overlay" onClick={() => setState({ ...state, visible: false })}>
      <div className="ca__alert-box" onClick={e => e.stopPropagation()}>
        <div className="ca__alert-confetti-mini">
          {['🎉','🎈','🎂','💜','✨'].map((e, i) => (
            <span key={i} style={{ animationDelay: `${i * 0.15}s` }}>{e}</span>
          ))}
        </div>
        <h3 className="ca__alert-titulo">{state.titulo}</h3>
        <p className="ca__alert-mensaje">{state.mensaje}</p>
        <button className="ca__alert-btn" onClick={() => setState({ ...state, visible: false })}>
          💜 Cerrar
        </button>
      </div>
    </div>
  );
};

// ── Input modal de relación ───────────────────────────────────────────────────
const InputModal = ({ onClose }) => {
  const [val, setVal] = useState('');
  const inputRef = useRef(null);

  useEffect(() => { setTimeout(() => inputRef.current?.focus(), 100); }, []);

  const enviar = () => {
    if (!val.trim()) return;
    onClose();
    setTimeout(() => {
      if (analizarRelacion(val) === 'ESPECIAL') {
        showAlert(
          '💜 Nunca he olvidado tu cumpleaños',
          'Mi niña Jennifer... mi amorcito Corazón.\n\nHoy como siempre, aquí estoy para celebrarte. Que este día sea tan especial como tú eres para mí. ¡Feliz cumpleaños! 🎂🌸'
        );
      } else {
        showAlert(
          '🎉 ¡Feliz Cumpleaños!',
          'Hoy es tu día, mi amiga especial.\n\nQue este año que comienza esté lleno de alegría, salud y momentos que te hagan sonreír. ¡Que lo pases increíble! 🎈🎂'
        );
      }
    }, 200);
  };

  return (
    <div className="ca__alert-overlay" onClick={onClose}>
      <div className="ca__alert-box" onClick={e => e.stopPropagation()}>
        <div className="ca__alert-confetti-mini">
          {['🎁','🎀','💜','✨','🎊'].map((e, i) => (
            <span key={i} style={{ animationDelay: `${i * 0.15}s` }}>{e}</span>
          ))}
        </div>
        <h3 className="ca__alert-titulo">Tu eres mi...</h3>
        <p className="ca__alert-mensaje" style={{ fontSize: '0.85rem', marginBottom: '1.5rem' }}>
          Escríbelo y descubre tu mensaje 🎁
        </p>
        <div className="ca__input-row">
          <input
            ref={inputRef}
            type="text"
            className="ca__input"
            value={val}
            onChange={e => setVal(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && enviar()}
            placeholder="¿Quién soy para ti?"
            maxLength={60}
          />
          <button className="ca__input-btn" onClick={enviar}>✨</button>
        </div>
      </div>
    </div>
  );
};

// ── Sección: Carta ────────────────────────────────────────────────────────────
const SeccionCarta = () => {
  const [visible,      setVisible]      = useState(false);
  const [mostrarInput, setMostrarInput] = useState(false);

  useEffect(() => { setTimeout(() => setVisible(true), 200); }, []);

  return (
    <section className={`ca__carta ${visible ? 'ca__carta--visible' : ''}`}>
      <Confetti />
      <div className="ca__carta-paper">

        <div className="ca__carta-globos">🎈🎉🎈</div>
        <p className="ca__carta-fecha">
          {new Date(2026, 2, 12).toLocaleDateString('es-GT', { year:'numeric', month:'long', day:'numeric' })}
        </p>
        <h2 className="ca__carta-saludo">
          Feliz cumpleaños,<br/>mi querida amiga del alma.
        </h2>

        <div className="ca__carta-cuerpo">
          <p>Hay personas que llegan a tu vida sin avisar y sin pedir permiso se vuelven parte de todo lo que eres.</p>
          <p>Hoy es tu día. Y aunque no tenga las palabras perfectas, quise construir algo — porque así soy yo — para decirte lo mucho que vale tenerte.</p>
          <p>Que este año nuevo de vida te traiga todo lo que mereces: paz, risas, y momentos que valgan la pena recordar.</p>
          <p className="ca__carta-especial">¡Que lo disfrutes muchísimo! 🎂</p>
        </div>

        <p className="ca__carta-firma">Con mucho cariño 🌸</p>

        {/* ── Botón regalo ── */}
        <div className="ca__regalo-wrap">
          <button className="ca__regalo-btn" onClick={() => setMostrarInput(true)}>
            <span className="ca__regalo-emoji">🎁</span>
            <span className="ca__regalo-label">Tu regalo</span>
          </button>
        </div>

        <div className="ca__carta-decoracion">
          {['✦','✧','✦','✧','✦'].map((s, i) => (
            <span key={i} style={{ animationDelay: `${i * 0.3}s` }}>{s}</span>
          ))}
        </div>
      </div>

      {mostrarInput && <InputModal onClose={() => setMostrarInput(false)} />}
      <AlertModal />
    </section>
  );
};

// ── Sección: Momentos ─────────────────────────────────────────────────────────
const MOMENTOS = [
  { emoji: '😂', titulo: 'Las carcajadas',       desc: 'Esas que te duele el estómago y ya ni recuerdas de qué.' },
  { emoji: '🤝', titulo: 'El primer "hola"',     desc: 'El que sin saber empezó todo.' },
  { emoji: '🌧', titulo: 'Los días difíciles',   desc: 'Donde estar presente valió más que cualquier palabra.' },
  { emoji: '🎵', titulo: 'La canción de siempre',desc: 'Esa que cuando suena te recuerda al instante.' },
  { emoji: '🌙', titulo: 'Las charlas de noche', desc: 'Las que empiezan con "oye una cosa" y terminan a las 3am.' },
  { emoji: '🎂', titulo: 'Este momento',         desc: 'Tu cumpleaños. Y aquí estoy, recordándolo.' },
];

const SeccionMomentos = () => (
  <section className="ca__momentos">
    <h2 className="ca__section-title">Momentos que guardo 💜</h2>
    <div className="ca__momentos-grid">
      {MOMENTOS.map((m, i) => (
        <div key={i} className="ca__momento" style={{ animationDelay: `${i * 0.08}s` }}>
          <span className="ca__momento-emoji">{m.emoji}</span>
          <h3 className="ca__momento-titulo">{m.titulo}</h3>
          <p className="ca__momento-desc">{m.desc}</p>
        </div>
      ))}
    </div>
  </section>
);

// ── App principal ─────────────────────────────────────────────────────────────
const CumpleañosAmiga = () => {
  const [seccion, setSección] = useState('carta');
  return (
    <div className="ca__wrap">
      <NavInterna seccionActiva={seccion} setSección={setSección} />
      <main className="ca__main">
        {seccion === 'carta'    && <SeccionCarta />}
        {seccion === 'momentos' && <SeccionMomentos />}
      </main>
    </div>
  );
};

export default CumpleañosAmiga;