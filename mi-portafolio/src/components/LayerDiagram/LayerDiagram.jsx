// src/components/LayerDiagram/LayerDiagram.jsx
//
// Diagrama de capas frontal — relieve CSS + conexiones neon animadas + InfoCards
// Genérico: recibe layers[], legend[], info{}
// Sin dependencias externas — solo React

import { useState, useRef, useEffect, useCallback } from "react";
import "./LayerDiagram.css";

// ══════════════════════════════════════════════════════════════
// COLOR CONFIG — borde neon por tema
// ══════════════════════════════════════════════════════════════
const THEME_HEX = {
  blue:   "#38bdf8",
  pink:   "#f472b6",
  purple: "#a78bfa",
  green:  "#34d399",
  amber:  "#fb923c",
};

// ══════════════════════════════════════════════════════════════
// INFO CARD
// ══════════════════════════════════════════════════════════════
function InfoCard({ data, onClose }) {
  if (!data) return null;
  const { hex } = data;

  return (
    <div className="ld-infocard ld-infocard--visible">
      <button className="ld-infocard__close" onClick={onClose} aria-label="Cerrar">
        ✕
      </button>
      <span
        className="ld-infocard__badge"
        style={{ background: hex + "22", color: hex, borderColor: hex + "44" }}
      >
        {data.badge}
      </span>
      <h4 className="ld-infocard__title" style={{ color: hex }}>
        {data.title}
      </h4>
      <p className="ld-infocard__body">{data.body}</p>
      <div className="ld-infocard__chips">
        {data.chips.map(c => (
          <span
            key={c}
            className="ld-infocard__chip"
            style={{ borderColor: hex + "33", color: hex + "bb" }}
          >
            {c}
          </span>
        ))}
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════
// LEGEND
// ══════════════════════════════════════════════════════════════
function Legend({ items }) {
  return (
    <div className="ld-legend">
      {items.map(({ c, l }) => (
        <div key={l} className="ld-legend-item">
          <span
            className="ld-legend-dot"
            style={{ background: c, boxShadow: `0 0 5px ${c}99` }}
          />
          {l}
        </div>
      ))}
    </div>
  );
}

// ══════════════════════════════════════════════════════════════
// CONNECTOR ZONE — SVG neon flowing lines between two rows
// ══════════════════════════════════════════════════════════════
function ConnectorZone({ rowTopRef, rowBotRef }) {
  const zoneRef = useRef(null);
  const svgRef  = useRef(null);

  const buildLines = useCallback(() => {
    const zone   = zoneRef.current;
    const svg    = svgRef.current;
    const rowTop = rowTopRef.current;
    const rowBot = rowBotRef.current;
    if (!zone || !svg || !rowTop || !rowBot) return;

    const nodesTop = [...rowTop.querySelectorAll(".ld-node")];
    const nodesBot = [...rowBot.querySelectorAll(".ld-node")];
    const zr = zone.getBoundingClientRect();

    // Center of each node relative to zone
    const center = el => {
      const r = el.getBoundingClientRect();
      return { x: r.left - zr.left + r.width / 2, y: r.top - zr.top + r.height / 2 };
    };

    // For each top node, find the closest bottom node
    const pairs = [];
    nodesTop.forEach(top => {
      const ct  = center(top);
      let best  = nodesBot[0];
      let minDx = Infinity;
      nodesBot.forEach(bot => {
        const dx = Math.abs(center(bot).x - ct.x);
        if (dx < minDx) { minDx = dx; best = bot; }
      });
      const key = top.dataset.id + "|" + best.dataset.id;
      if (!pairs.find(p => p.key === key)) {
        pairs.push({ key, top, bot: best });
      }
    });

    // Build SVG viewBox
    svg.setAttribute("viewBox", `0 0 ${zone.offsetWidth} ${zone.offsetHeight}`);
    svg.innerHTML = "";

    pairs.forEach(({ top, bot }) => {
      const ct = center(top);
      const cb = center(bot);
      // Color from the bottom node's theme
      const theme = [...bot.classList].find(c => THEME_HEX[c]) || "blue";
      const col   = THEME_HEX[theme] || "#a78bfa";
      const speed = (1.4 + Math.random() * 0.9).toFixed(2);

      // Curved path
      const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
      path.setAttribute("d",
        `M${ct.x},${ct.y} C${ct.x},${ct.y + 13} ${cb.x},${cb.y - 13} ${cb.x},${cb.y}`
      );
      path.setAttribute("fill", "none");
      path.setAttribute("stroke", col);
      path.setAttribute("stroke-width", "1.5");
      path.setAttribute("stroke-dasharray", "6 5");
      path.setAttribute("opacity", "0.65");
      path.style.animation = `ld-flow ${speed}s linear infinite`;
      svg.appendChild(path);

      // Endpoint dots
      [ct, cb].forEach(pt => {
        const dot = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        dot.setAttribute("cx",   pt.x);
        dot.setAttribute("cy",   pt.y);
        dot.setAttribute("r",    "2.5");
        dot.setAttribute("fill", col);
        dot.setAttribute("opacity", "0.85");
        svg.appendChild(dot);
      });
    });
  }, [rowTopRef, rowBotRef]);

  useEffect(() => {
    const t = setTimeout(buildLines, 80);
    window.addEventListener("resize", buildLines);
    return () => {
      clearTimeout(t);
      window.removeEventListener("resize", buildLines);
    };
  }, [buildLines]);

  return (
    <div className="ld-conn-zone" ref={zoneRef}>
      <svg className="ld-conn-svg" ref={svgRef} />
    </div>
  );
}

// ══════════════════════════════════════════════════════════════
// NODE
// ══════════════════════════════════════════════════════════════
function Node({ id, theme, title, sub, isActive, onClick }) {
  return (
    <div
      className={`ld-node ld-${theme}${isActive ? " ld-node--active" : ""}`}
      data-id={id}
      onClick={() => onClick(id)}
      role="button"
      tabIndex={0}
      onKeyDown={e => e.key === "Enter" && onClick(id)}
    >
      <span className="ld-node__title">{title}</span>
      {sub && <span className="ld-node__sub">{sub}</span>}
    </div>
  );
}

// ══════════════════════════════════════════════════════════════
// LAYER ROW
// ══════════════════════════════════════════════════════════════
const LayerRow = ({ layer, activeId, onNodeClick, rowRef }) => (
  <div className="ld-layer">
    <div className="ld-layer-label" style={{ color: layer.labelColor }}>
      {layer.label}
    </div>
    <div className="ld-row" ref={rowRef}>
      {layer.nodes.map(node => (
        <Node
          key={node.id}
          id={node.id}
          theme={node.theme}
          title={node.title}
          sub={node.sub}
          isActive={activeId === node.id}
          onClick={onNodeClick}
          minWidth={node.minWidth}
        />
      ))}
    </div>
  </div>
);

// ══════════════════════════════════════════════════════════════
// ROOT EXPORT
// ══════════════════════════════════════════════════════════════
export default function LayerDiagram({ layers, legend, info }) {
  const [activeId, setActiveId] = useState(null);

  // One ref per layer row
  const rowRefs = useRef(layers.map(() => ({ current: null })));

  const handleNodeClick = useCallback(id => {
    setActiveId(prev => prev === id ? null : id);
  }, []);

  const activeData = activeId ? info[activeId] : null;

  return (
    <div className="ld-wrap">
      <Legend items={legend} />

      <div className="ld-canvas">
        {layers.map((layer, i) => (
          <div key={layer.id}>
            <LayerRow
              layer={layer}
              activeId={activeId}
              onNodeClick={handleNodeClick}
              rowRef={el => { rowRefs.current[i] = { current: el }; }}
            />
            {i < layers.length - 1 && (
              <ConnectorZone
                rowTopRef={rowRefs.current[i]}
                rowBotRef={rowRefs.current[i + 1]}
              />
            )}
          </div>
        ))}
      </div>

      <p className="ld-hint">Haz clic en cualquier nodo para ver su descripción</p>

      <InfoCard data={activeData} onClose={() => setActiveId(null)} />
    </div>
  );
}