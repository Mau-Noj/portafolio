// src/components/UMLDiagram.jsx
import React, { useEffect, useRef } from "react";
import "./UMLDiagram.css";

const BG = "#060c18";
const C = {
  blue: "#38bdf8",
  green: "#4ade80",
  purple: "#a78bfa",
  orange: "#fb923c",
  gray: "#1e293b",
  muted: "#64748b",
  text: "#e2e8f0",
  dim: "#94a3b8",
  header: "#0d1829",
};

/* ── Zoom container ── */
const ZoomSVG = ({ svgString, height }) => {
  const outerRef = useRef(null);
  const innerRef = useRef(null);
  const scaleRef = useRef(1);
  const offsetRef = useRef({ x: 0, y: 0 });
  const dragging = useRef(false);
  const lastPos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (innerRef.current) innerRef.current.innerHTML = svgString;
  }, [svgString]);

  useEffect(() => {
    const el = outerRef.current;
    if (!el) return;
    const onWheel = (e) => {
      e.preventDefault();
      e.stopPropagation();
      const delta = e.deltaY > 0 ? 0.88 : 1.12;
      scaleRef.current = Math.min(Math.max(scaleRef.current * delta, 0.25), 5);
      applyTransform();
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, []);

  const applyTransform = () => {
    if (!innerRef.current) return;
    const { x, y } = offsetRef.current;
    const s = scaleRef.current;
    innerRef.current.style.transform = `translate(${x}px,${y}px) scale(${s})`;
  };

  const onMouseDown = (e) => {
    dragging.current = true;
    lastPos.current = { x: e.clientX, y: e.clientY };
  };
  const onMouseMove = (e) => {
    if (!dragging.current) return;
    offsetRef.current.x += e.clientX - lastPos.current.x;
    offsetRef.current.y += e.clientY - lastPos.current.y;
    lastPos.current = { x: e.clientX, y: e.clientY };
    applyTransform();
  };
  const onMouseUp = () => {
    dragging.current = false;
  };

  const reset = () => {
    scaleRef.current = 1;
    offsetRef.current = { x: 0, y: 0 };
    applyTransform();
  };

  return (
    <div
      className="uml-zoom-outer"
      style={{ height }}
      ref={outerRef}
      onMouseDown={onMouseDown}
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}
      onMouseLeave={onMouseUp}
    >
      <div className="uml-zoom-hint">⌨ Scroll = zoom · Arrastra = mover</div>
      <button className="uml-zoom-reset" onClick={reset}>
        ↺ Reset
      </button>
      <div className="uml-zoom-inner" ref={innerRef} />
    </div>
  );
};

/* ══════════════════════════════════════════
   CASOS DE USO
══════════════════════════════════════════ */
function renderUseCases(data, W, H) {
  const {
    actors = [],
    usecases = [],
    relations = [],
    systemName = "Sistema",
  } = data;
  const SYS_X = 180,
    SYS_Y = 20,
    SYS_W = W - 200,
    SYS_H = H - 40;
  const cols = Math.ceil(Math.sqrt(usecases.length));
  const rows = Math.ceil(usecases.length / cols);

  const ucPos = {};
  usecases.forEach((uc, i) => {
    const col = i % cols,
      row = Math.floor(i / cols);
    ucPos[uc.id] = {
      x: SYS_X + 20 + col * ((SYS_W - 40) / cols) + (SYS_W - 40) / (cols * 2),
      y: SYS_Y + 55 + row * ((SYS_H - 55) / rows) + (SYS_H - 55) / (rows * 2),
    };
  });

  const actorPos = {};
  actors.forEach((a, i) => {
    actorPos[a.id] = {
      x: 90,
      y: SYS_Y + 60 + i * ((SYS_H - 80) / Math.max(actors.length - 1, 1)),
    };
  });

  let s = `<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg" style="background:${BG}">
  <defs>
    <marker id="open" markerWidth="14" markerHeight="10" refX="13" refY="5" orient="auto">
      <polyline points="0,0 12,5 0,10" fill="none" stroke="${C.green}" stroke-width="2"/>
    </marker>
    <marker id="solid-blue" markerWidth="12" markerHeight="8" refX="11" refY="4" orient="auto">
      <polygon points="0 0,10 4,0 8" fill="${C.blue}"/>
    </marker>
    <marker id="solid-orange" markerWidth="12" markerHeight="8" refX="11" refY="4" orient="auto">
      <polygon points="0 0,10 4,0 8" fill="${C.orange}"/>
    </marker>
  </defs>`;

  s += `<rect x="${SYS_X}" y="${SYS_Y}" width="${SYS_W}" height="${SYS_H}"
    fill="rgba(56,189,248,0.03)" stroke="#1e293b" stroke-width="2" rx="8" stroke-dasharray="10,5"/>`;
  s += `<text x="${SYS_X + SYS_W / 2}" y="${SYS_Y + 22}" text-anchor="middle"
    font-family="JetBrains Mono,monospace" font-size="11" fill="${C.muted}" letter-spacing="2">${systemName}</text>`;

  relations.forEach((rel) => {
    const from = actorPos[rel.from] || ucPos[rel.from];
    const to = ucPos[rel.to] || actorPos[rel.to];
    if (!from || !to) return;
    const isInc = rel.type === "include",
      isExt = rel.type === "extend";
    const color = isInc ? C.blue : isExt ? C.orange : C.green;
    const dash = isInc || isExt ? "8,4" : "none";
    const marker = isInc ? "solid-blue" : isExt ? "solid-orange" : "open";
    const sw = isInc || isExt ? 2 : 1.8;
    const uc = usecases.find((u) => u.id === rel.to);
    let tx = to.x,
      ty = to.y;
    if (uc) {
      const rx = uc.rx || 70,
        ry = uc.ry || 26;
      const a = Math.atan2((to.y - from.y) * rx, (to.x - from.x) * ry);
      tx = to.x - rx * Math.cos(a) * 0.95;
      ty = to.y - ry * Math.sin(a) * 0.95;
    }
    s += `<line x1="${from.x}" y1="${from.y}" x2="${tx}" y2="${ty}"
      stroke="${color}" stroke-width="${sw}" stroke-dasharray="${dash}" marker-end="url(#${marker})"/>`;
    if (isInc || isExt) {
      const mx = (from.x + tx) / 2,
        my = (from.y + ty) / 2;
      const lbl = isInc ? "«include»" : "«extend»",
        lw = lbl.length * 6 + 8;
      s += `<rect x="${mx - lw / 2}" y="${my - 12}" width="${lw}" height="14" fill="${BG}" rx="3" opacity="0.9"/>`;
      s += `<text x="${mx}" y="${my - 1}" text-anchor="middle"
        font-family="JetBrains Mono,monospace" font-size="10" font-weight="700"
        fill="${color}" font-style="italic">${lbl}</text>`;
    }
  });

  usecases.forEach((uc) => {
    const p = ucPos[uc.id],
      rx = uc.rx || 70,
      ry = uc.ry || 26;
    s += `<ellipse cx="${p.x}" cy="${p.y}" rx="${rx}" ry="${ry}"
      fill="${C.header}" stroke="${C.blue}" stroke-width="1.8"/>`;
    const words = uc.name.split(" ");
    if (words.length <= 3) {
      s += `<text x="${p.x}" y="${p.y + 4}" text-anchor="middle"
        font-family="Plus Jakarta Sans,sans-serif" font-size="11" font-weight="600" fill="${C.text}">${uc.name}</text>`;
    } else {
      const mid = Math.ceil(words.length / 2);
      s += `<text x="${p.x}" y="${p.y - 5}" text-anchor="middle"
        font-family="Plus Jakarta Sans,sans-serif" font-size="11" font-weight="600" fill="${C.text}">${words.slice(0, mid).join(" ")}</text>`;
      s += `<text x="${p.x}" y="${p.y + 9}" text-anchor="middle"
        font-family="Plus Jakarta Sans,sans-serif" font-size="11" font-weight="600" fill="${C.text}">${words.slice(mid).join(" ")}</text>`;
    }
  });

  actors.forEach((a) => {
    const { x, y } = actorPos[a.id];
    s += `<circle cx="${x}" cy="${y - 32}" r="13" fill="none" stroke="${C.green}" stroke-width="1.8"/>
      <line x1="${x}" y1="${y - 19}" x2="${x}" y2="${y + 5}" stroke="${C.green}" stroke-width="1.8"/>
      <line x1="${x - 16}" y1="${y - 8}" x2="${x + 16}" y2="${y - 8}" stroke="${C.green}" stroke-width="1.8"/>
      <line x1="${x}" y1="${y + 5}" x2="${x - 13}" y2="${y + 24}" stroke="${C.green}" stroke-width="1.8"/>
      <line x1="${x}" y1="${y + 5}" x2="${x + 13}" y2="${y + 24}" stroke="${C.green}" stroke-width="1.8"/>
      <text x="${x}" y="${y + 42}" text-anchor="middle"
        font-family="Plus Jakarta Sans,sans-serif" font-size="11" font-weight="700" fill="${C.green}">${a.name}</text>`;
  });

  s += "</svg>";
  return s;
}

/* ══════════════════════════════════════════
   DIAGRAMA DE CLASES
══════════════════════════════════════════ */
function renderClasses(data, W, H) {
  const { classes = [], relations = [], layout = null } = data;
  const ROW_H = 19,
    PAD = 8,
    HDR_H = 38,
    CHAR_PX = 6.2;
  const COLS = 3;

  // FIX 1: Aumentar separación entre columnas y filas
  const GAP_X = 110; // antes: 60
  const GAP_Y = 130; // antes: 80

  // Extra padding en los laterales para los carriles D
  const SIDE_PAD = 60; // espacio reservado en cada lateral para carriles
  const LANE_STEP = 16;

  function calcW(cls) {
    let max = cls.name.length * 8.5 + 30;
    (cls.attributes || []).forEach((a) => {
      max = Math.max(max, a.length * CHAR_PX + 24);
    });
    (cls.methods || []).forEach((m) => {
      max = Math.max(max, m.length * CHAR_PX + 24);
    });
    return Math.min(Math.max(max, 180), 320);
  }

  const meta = {};
  classes.forEach((cls) => {
    const w = calcW(cls);
    const aH = Math.max((cls.attributes?.length || 0) * ROW_H + PAD * 2, 28);
    const mH = Math.max((cls.methods?.length || 0) * ROW_H + PAD * 2, 28);
    meta[cls.id] = { w, h: HDR_H + aH + mH, attrH: aH, methH: mH };
  });

  const colIds = [[], [], []];
  if (layout) {
    layout.forEach((item, i) => colIds[i % COLS].push(item.id));
  } else {
    classes.forEach((cls, i) => colIds[i % COLS].push(cls.id));
  }

  const colW = colIds.map((col) =>
    Math.max(...col.map((id) => meta[id]?.w || 180)),
  );
  const numRows = Math.max(...colIds.map((c) => c.length));
  const rowH = Array.from({ length: numRows }, (_, ri) =>
    Math.max(...colIds.map((col) => meta[col[ri]]?.h || 0)),
  );

  // Centro del gap vertical entre fila ri y ri+1 — libre de cajas garantizado
  const rowStartY = (() => {
    const arr = [];
    let y = 20;
    for (let ri = 0; ri < numRows; ri++) {
      arr.push(y);
      y += rowH[ri] + GAP_Y;
    }
    return arr;
  })();
  const rowGapCenterY = rowStartY.map((y, ri) => y + rowH[ri] + GAP_Y / 2);

  const pos = {};
  // Empezar con SIDE_PAD para márgenes limpios
  let xCur = SIDE_PAD;
  const colStartX = []; // x inicial de cada columna
  colIds.forEach((col, ci) => {
    colStartX.push(xCur);
    let yCur = 20;
    col.forEach((id, ri) => {
      pos[id] = { ...meta[id], x: xCur, y: yCur, col: ci, row: ri };
      yCur += rowH[ri] + GAP_Y;
    });
    xCur += colW[ci] + GAP_X;
  });

  // Centro del gap entre la columna ci y ci+1
  // = borde derecho de col ci + GAP_X/2
  const gapCenterX = colIds.map(
    (_, ci) => colStartX[ci] + colW[ci] + GAP_X / 2,
  );

  const svgW = xCur - GAP_X + SIDE_PAD;
  let maxY = 0;
  Object.values(pos).forEach((p) => {
    if (p) maxY = Math.max(maxY, p.y + p.h);
  });
  const globalBottom = maxY;

  // ── Clasificación de routing ──────────────────────────────────
  function classifyRel(fromId, toId) {
    const f = pos[fromId],
      t = pos[toId];
    if (!f || !t) return "straight";
    const fc = f.col,
      tc = t.col,
      fr = f.row,
      tr = t.row;
    if (fc === tc) return "A";
    if (Math.abs(fc - tc) === 1 && fr === tr) return "B";
    if (Math.abs(fc - tc) === 1) return "C";
    return "D";
  }

  // Pre-asignar carriles D — solo necesitamos el índice de carril
  // para separar relaciones D paralelas con un leve offset en el gap
  const dCounter = {};
  const relLanes = relations.map((rel) => {
    if (classifyRel(rel.from, rel.to) !== "D") return { lane: 0, goDown: true };
    const f = pos[rel.from],
      t = pos[rel.to];
    if (!f || !t) return { lane: 0, goDown: true };
    const key = `${Math.min(f.col, t.col)}-${Math.max(f.col, t.col)}`;
    const lane = dCounter[key] ?? 0;
    dCounter[key] = lane + 1;
    const goDown = t.row >= f.row;
    return { lane, goDown };
  });

  // Pre-asignar offsets B
  const bPairCount = {};
  const bOffsets = relations.map((rel) => {
    if (classifyRel(rel.from, rel.to) !== "B") return 0;
    const key = [rel.from, rel.to].sort().join("|");
    const idx = bPairCount[key] ?? 0;
    bPairCount[key] = idx + 1;
    return idx === 0 ? 0 : (idx % 2 === 1 ? 1 : -1) * Math.ceil(idx / 2) * 12;
  });

  // Pre-asignar offsets C
  const cPairCount = {};
  const cOffsets = relations.map((rel) => {
    if (classifyRel(rel.from, rel.to) !== "C") return 0;
    const f = pos[rel.from],
      t = pos[rel.to];
    if (!f || !t) return 0;
    const key = `${Math.min(f.col, t.col)}-${Math.max(f.col, t.col)}`;
    const idx = cPairCount[key] ?? 0;
    cPairCount[key] = idx + 1;
    return idx === 0 ? 0 : (idx % 2 === 1 ? 1 : -1) * Math.ceil(idx / 2) * 10;
  });

  const LEGEND = 32;
  const svgH = globalBottom + 30 + LEGEND + 10;

  // ── Determina qué lados usa cada extremo de una relación ──────
  function getSides(fromId, toId) {
    const f = pos[fromId],
      t = pos[toId];
    if (!f || !t) return { fSide: "right", tSide: "left" };
    const fc = f.col,
      tc = t.col,
      fr = f.row,
      tr = t.row;
    if (fc === tc) {
      const down = fr < tr;
      return { fSide: down ? "bottom" : "top", tSide: down ? "top" : "bottom" };
    }
    if (Math.abs(fc - tc) === 1) {
      const right = fc < tc;
      return {
        fSide: right ? "right" : "left",
        tSide: right ? "left" : "right",
      };
    }
    // D: row-gap — sale por abajo/arriba, entra por arriba/abajo
    const down = t.row >= f.row;
    return { fSide: down ? "bottom" : "top", tSide: down ? "top" : "bottom" };
  }

  // ── Pre-computar cuántas relaciones usan cada (caja, lado) ────
  // para distribuir sus puntos de conexión a lo largo del borde
  const edgeTotals = {};
  relations.forEach((rel) => {
    const { fSide, tSide } = getSides(rel.from, rel.to);
    const fk = `${rel.from}-${fSide}`,
      tk = `${rel.to}-${tSide}`;
    edgeTotals[fk] = (edgeTotals[fk] ?? 0) + 1;
    edgeTotals[tk] = (edgeTotals[tk] ?? 0) + 1;
  });
  const edgeCursor = {};
  const relEdgeInfo = relations.map((rel) => {
    const { fSide, tSide } = getSides(rel.from, rel.to);
    const fk = `${rel.from}-${fSide}`,
      tk = `${rel.to}-${tSide}`;
    const fIdx = edgeCursor[fk] ?? 0;
    edgeCursor[fk] = fIdx + 1;
    const tIdx = edgeCursor[tk] ?? 0;
    edgeCursor[tk] = tIdx + 1;
    return {
      fIdx,
      fTotal: edgeTotals[fk],
      fSide,
      tIdx,
      tTotal: edgeTotals[tk],
      tSide,
    };
  });

  // ── Punto en el borde cardinal con distribución de múltiples conexiones ──
  const SPREAD = 14; // px entre puntos de conexión en el mismo borde
  function borderPt(id, side, idx = 0, total = 1) {
    const p = pos[id];
    if (!p) return { x: 0, y: 0 };
    // offset centrado: si hay 3 flechas → -SPREAD, 0, +SPREAD
    const off = total <= 1 ? 0 : (idx - (total - 1) / 2) * SPREAD;
    return (
      {
        top: { x: p.x + p.w / 2 + off, y: p.y },
        bottom: { x: p.x + p.w / 2 + off, y: p.y + p.h },
        left: { x: p.x, y: p.y + p.h / 2 + off },
        right: { x: p.x + p.w, y: p.y + p.h / 2 + off },
      }[side] || { x: 0, y: 0 }
    );
  }

  // ── Generador de path ─────────────────────────────────────────
  function routePath(fromId, toId, laneInfo, bOff, cOff, edgeInfo) {
    const f = pos[fromId],
      t = pos[toId];
    if (!f || !t) return "M0,0";
    const fc = f.col,
      tc = t.col,
      fr = f.row,
      tr = t.row;

    const { fIdx, fTotal, fSide, tIdx, tTotal, tSide } = edgeInfo;

    // ── A: misma columna ──────────────────────────────────────
    if (fc === tc) {
      const goDown = fr < tr;
      const fp = borderPt(fromId, goDown ? "bottom" : "top", fIdx, fTotal);
      const tp = borderPt(toId, goDown ? "top" : "bottom", tIdx, tTotal);
      const midY = (fp.y + tp.y) / 2;
      return `M${fp.x},${fp.y} L${fp.x},${midY} L${tp.x},${midY} L${tp.x},${tp.y}`;
    }

    // ── B: adyacentes, misma fila ─────────────────────────────
    if (Math.abs(fc - tc) === 1 && fr === tr) {
      const goRight = fc < tc;
      const fp = borderPt(fromId, goRight ? "right" : "left", fIdx, fTotal);
      const tp = borderPt(toId, goRight ? "left" : "right", tIdx, tTotal);
      if (bOff === 0) return `M${fp.x},${fp.y} L${tp.x},${tp.y}`;
      return `M${fp.x},${fp.y + bOff} L${tp.x},${tp.y + bOff}`;
    }

    // ── C: adyacentes, filas distintas ────────────────────────
    if (Math.abs(fc - tc) === 1) {
      const goRight = fc < tc;
      const gapX = goRight
        ? f.x + f.w + GAP_X / 2 + cOff
        : f.x - GAP_X / 2 + cOff;
      const fp = borderPt(fromId, goRight ? "right" : "left", fIdx, fTotal);
      const tp = borderPt(toId, goRight ? "left" : "right", tIdx, tTotal);
      return `M${fp.x},${fp.y} L${gapX},${fp.y} L${gapX},${tp.y} L${tp.x},${tp.y}`;
    }

    // ── D: salta ≥2 columnas — ruta por gap entre FILAS (espacio libre garantizado) ──
    // El segmento horizontal va por el espacio vertical entre filas, nunca dentro de una caja
    const { lane, goDown } = laneInfo;
    // Elegir el gap de fila a usar: si va hacia abajo, usar el gap debajo de la fila origen
    const gapRowIdx = goDown
      ? Math.max(0, Math.min(fr, numRows - 2))
      : Math.max(0, Math.min(fr - 1, numRows - 2));
    const gapY = rowGapCenterY[gapRowIdx] + lane * 10; // offset Y para paralelas

    const fp = borderPt(fromId, goDown ? "bottom" : "top", fIdx, fTotal);
    const tp = borderPt(toId, goDown ? "top" : "bottom", tIdx, tTotal);
    return `M${fp.x},${fp.y} L${fp.x},${gapY} L${tp.x},${gapY} L${tp.x},${tp.y}`;
  }

  // ── Puntos de borde para labels de multiplicidad ──────────────
  function exitPts(fromId, toId, ei) {
    const { fIdx, fTotal, fSide, tIdx, tTotal, tSide } = ei;
    return {
      fp: borderPt(fromId, fSide, fIdx, fTotal),
      tp: borderPt(toId, tSide, tIdx, tTotal),
    };
  }

  // ── SVG ───────────────────────────────────────────────────────
  let s = `<svg width="${svgW}" height="${svgH}" xmlns="http://www.w3.org/2000/svg" style="background:${BG}">
  <defs>
    <marker id="dep" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
      <polygon points="0 0,9 3.5,0 7" fill="${C.blue}"/>
    </marker>
    <marker id="assoc" markerWidth="11" markerHeight="8" refX="10" refY="4" orient="auto">
      <polyline points="0,0 9,4 0,8" fill="none" stroke="${C.green}" stroke-width="1.8"/>
    </marker>
    <marker id="inherit" markerWidth="12" markerHeight="9" refX="11" refY="4.5" orient="auto">
      <polygon points="0 0,10 4.5,0 9" fill="${BG}" stroke="${C.purple}" stroke-width="1.8"/>
    </marker>
    <marker id="aggr-s" markerWidth="16" markerHeight="9" refX="2" refY="4.5" orient="auto">
      <polygon points="8 0,16 4.5,8 9,0 4.5" fill="${BG}" stroke="${C.orange}" stroke-width="1.8"/>
    </marker>
    <marker id="comp-s" markerWidth="16" markerHeight="9" refX="2" refY="4.5" orient="auto">
      <polygon points="8 0,16 4.5,8 9,0 4.5" fill="${C.orange}"/>
    </marker>
  </defs>`;

  const ST = {
    use: { dash: "7,4", color: C.blue, me: "dep", ms: "none" },
    depends: { dash: "7,4", color: C.blue, me: "dep", ms: "none" },
    association: { dash: "none", color: C.green, me: "assoc", ms: "none" },
    inheritance: { dash: "none", color: C.purple, me: "inherit", ms: "none" },
    aggregation: { dash: "none", color: C.orange, me: "none", ms: "aggr-s" },
    composition: { dash: "none", color: C.orange, me: "none", ms: "comp-s" },
  };

  // ── Relaciones ────────────────────────────────────────────────
  relations.forEach((rel, ri) => {
    const f = pos[rel.from],
      t = pos[rel.to];
    if (!f || !t) return;

    const st = ST[rel.type] || ST.association;
    const mE = st.me !== "none" ? `marker-end="url(#${st.me})"` : "";
    const mS = st.ms !== "none" ? `marker-start="url(#${st.ms})"` : "";

    const path = routePath(
      rel.from,
      rel.to,
      relLanes[ri],
      bOffsets[ri],
      cOffsets[ri],
      relEdgeInfo[ri],
    );

    s += `<path d="${path}" fill="none" stroke="${st.color}" stroke-width="1.6"
      stroke-dasharray="${st.dash}" ${mE} ${mS} opacity="0.9"/>`;

    // Label de relación
    if (rel.label) {
      const { fp, tp } = exitPts(rel.from, rel.to, relEdgeInfo[ri]);
      const lx = (fp.x + tp.x) / 2;
      const ly = (fp.y + tp.y) / 2 - 8;
      const lw = rel.label.length * 5.5 + 10;
      s += `<rect x="${lx - lw / 2}" y="${ly - 10}" width="${lw}" height="13" fill="${BG}" rx="2" opacity="0.9"/>`;
      s += `<text x="${lx}" y="${ly}" text-anchor="middle"
        font-family="JetBrains Mono,monospace" font-size="9" fill="${st.color}">${rel.label}</text>`;
    }

    // Labels de multiplicidad
    if (rel.fromLabel || rel.toLabel) {
      const { fp, tp } = exitPts(rel.from, rel.to, relEdgeInfo[ri]);
      if (rel.fromLabel)
        s += `<text x="${fp.x + 4}" y="${fp.y - 6}"
          font-family="JetBrains Mono,monospace" font-size="10" font-weight="700" fill="${C.blue}">${rel.fromLabel}</text>`;
      if (rel.toLabel)
        s += `<text x="${tp.x + 4}" y="${tp.y - 6}"
          font-family="JetBrains Mono,monospace" font-size="10" font-weight="700" fill="${C.blue}">${rel.toLabel}</text>`;
    }
  });

  // ── Cajas (dibujadas encima de las líneas) ────────────────────
  classes.forEach((cls) => {
    const p = pos[cls.id];
    if (!p) return;
    const bc = cls.type === "interface" ? C.purple : C.blue;
    const aY = p.y + HDR_H,
      mY = aY + p.attrH;

    s += `<rect x="${p.x + 2}" y="${p.y + 2}" width="${p.w}" height="${p.h}" fill="rgba(0,0,0,0.28)" rx="3"/>`;
    s += `<rect x="${p.x}" y="${p.y}" width="${p.w}" height="${HDR_H}" fill="${C.header}" stroke="${bc}" stroke-width="1.8" rx="3"/>`;
    s += `<text x="${p.x + p.w / 2}" y="${p.y + 24}" text-anchor="middle"
      font-family="Plus Jakarta Sans,sans-serif" font-size="13" font-weight="800" fill="${C.text}">${cls.name}</text>`;

    s += `<rect x="${p.x}" y="${aY}" width="${p.w}" height="${p.attrH}" fill="${BG}" stroke="${bc}" stroke-width="1"/>`;
    if (!cls.attributes?.length) {
      s += `<text x="${p.x + p.w / 2}" y="${aY + p.attrH / 2 + 4}" text-anchor="middle"
        font-family="JetBrains Mono,monospace" font-size="8" fill="#2d3748" font-style="italic">— sin atributos —</text>`;
    }
    cls.attributes?.forEach((a, ai) => {
      const v = a.startsWith("+") ? "+" : a.startsWith("-") ? "−" : "#";
      const vc = a.startsWith("+")
        ? C.green
        : a.startsWith("-")
          ? "#f87171"
          : C.orange;
      const n = a.replace(/^[+\-#]\s*/, "");
      s += `<text x="${p.x + 7}" y="${aY + PAD + 12 + ai * ROW_H}"
        font-family="JetBrains Mono,monospace" font-size="8.5" fill="${C.dim}">
        <tspan fill="${vc}" font-weight="bold">${v} </tspan>${n}</text>`;
    });

    s += `<rect x="${p.x}" y="${mY}" width="${p.w}" height="${p.methH}" fill="${BG}" stroke="${bc}" stroke-width="1"/>`;
    s += `<line x1="${p.x}" y1="${mY}" x2="${p.x + p.w}" y2="${mY}" stroke="${bc}" stroke-width="1" opacity="0.5"/>`;
    if (!cls.methods?.length) {
      s += `<text x="${p.x + p.w / 2}" y="${mY + p.methH / 2 + 4}" text-anchor="middle"
        font-family="JetBrains Mono,monospace" font-size="8" fill="#2d3748" font-style="italic">— sin métodos —</text>`;
    }
    cls.methods?.forEach((m, mi) => {
      const v = m.startsWith("+") ? "+" : m.startsWith("-") ? "−" : "#";
      const vc = m.startsWith("+") ? C.blue : "#f87171";
      const n = m.replace(/^[+\-#]\s*/, "");
      s += `<text x="${p.x + 7}" y="${mY + PAD + 12 + mi * ROW_H}"
        font-family="JetBrains Mono,monospace" font-size="8.5" fill="${C.dim}">
        <tspan fill="${vc}" font-weight="bold">${v} </tspan>${n}</text>`;
    });
  });

  // ── Leyenda ───────────────────────────────────────────────────
  const LY = svgH - LEGEND + 12;
  s += `<rect x="0" y="${svgH - LEGEND}" width="${svgW}" height="${LEGEND}" fill="${BG}"/>`;
  s += `<line x1="0" y1="${svgH - LEGEND}" x2="${svgW}" y2="${svgH - LEGEND}" stroke="#1e293b" stroke-width="1"/>`;
  [
    { color: C.blue, dash: "7,4", shape: "arrow-solid", label: "Dependencia" },
    { color: C.green, dash: "none", shape: "arrow-open", label: "Asociación" },
    {
      color: C.purple,
      dash: "none",
      shape: "arrow-inherit",
      label: "Herencia",
    },
    {
      color: C.orange,
      dash: "none",
      shape: "diamond-open",
      label: "Agregación",
    },
  ].forEach((l, i) => {
    const lx = 20 + i * 215,
      ly = LY;
    s += `<line x1="${lx}" y1="${ly}" x2="${lx + 32}" y2="${ly}" stroke="${l.color}" stroke-width="2" stroke-dasharray="${l.dash}"/>`;
    if (l.shape === "arrow-solid")
      s += `<polygon points="${lx + 32},${ly - 4} ${lx + 42},${ly} ${lx + 32},${ly + 4}" fill="${l.color}"/>`;
    if (l.shape === "arrow-open")
      s += `<polyline points="${lx + 32},${ly - 4} ${lx + 42},${ly} ${lx + 32},${ly + 4}" fill="none" stroke="${l.color}" stroke-width="2"/>`;
    if (l.shape === "arrow-inherit")
      s += `<polygon points="${lx + 32},${ly - 5} ${lx + 44},${ly} ${lx + 32},${ly + 5}" fill="${BG}" stroke="${l.color}" stroke-width="2"/>`;
    if (l.shape === "diamond-open") {
      s += `<polygon points="${lx + 38},${ly - 5} ${lx + 50},${ly} ${lx + 38},${ly + 5} ${lx + 26},${ly}" fill="${BG}" stroke="${l.color}" stroke-width="2"/>`;
      s += `<line x1="${lx}" y1="${ly}" x2="${lx + 26}" y2="${ly}" stroke="${l.color}" stroke-width="2"/>`;
    }
    s += `<text x="${lx + 56}" y="${ly + 4}"
      font-family="JetBrains Mono,monospace" font-size="9.5" fill="${C.muted}">${l.label}</text>`;
  });

  s += "</svg>";
  return s;
}

/* ══════════════════════════════════════════
   SECUENCIA
══════════════════════════════════════════ */
function renderSequence(data, W, H) {
  const { participants = [], messages = [] } = data;
  const N = participants.length,
    PART_W = 120,
    PART_H = 38;
  const MARGIN = 50,
    GAP = (W - MARGIN * 2) / N;
  const MSG_Y0 = 95,
    MSG_GAP = 48,
    ACT_W = 10;
  const cx = participants.map((_, i) => MARGIN + i * GAP + GAP / 2);
  const totalH = Math.max(H, MSG_Y0 + messages.length * MSG_GAP + 70);

  let s = `<svg width="${W}" height="${totalH}" xmlns="http://www.w3.org/2000/svg" style="background:${BG}">
  <defs>
    <marker id="ms" markerWidth="12" markerHeight="8" refX="11" refY="4" orient="auto">
      <polygon points="0 0,10 4,0 8" fill="${C.blue}"/>
    </marker>
    <marker id="mr" markerWidth="14" markerHeight="10" refX="13" refY="5" orient="auto">
      <polyline points="0,0 12,5 0,10" fill="none" stroke="${C.muted}" stroke-width="2"/>
    </marker>
  </defs>`;

  cx.forEach((x) => {
    s += `<line x1="${x}" y1="${MSG_Y0 - 8}" x2="${x}" y2="${totalH - 20}"
      stroke="#1e293b" stroke-width="1.5" stroke-dasharray="7,5"/>`;
  });

  participants.forEach((p, i) => {
    const x = cx[i];
    if (p.type === "actor") {
      s += `<circle cx="${x}" cy="${16}" r="11" fill="none" stroke="${C.green}" stroke-width="1.8"/>
        <line x1="${x}" y1="${27}" x2="${x}" y2="${46}" stroke="${C.green}" stroke-width="1.8"/>
        <line x1="${x - 13}" y1="${34}" x2="${x + 13}" y2="${34}" stroke="${C.green}" stroke-width="1.8"/>
        <line x1="${x}" y1="${46}" x2="${x - 10}" y2="${60}" stroke="${C.green}" stroke-width="1.8"/>
        <line x1="${x}" y1="${46}" x2="${x + 10}" y2="${60}" stroke="${C.green}" stroke-width="1.8"/>
        <text x="${x}" y="${76}" text-anchor="middle"
          font-family="Plus Jakarta Sans,sans-serif" font-size="10" font-weight="700" fill="${C.green}">${p.name}</text>`;
    } else {
      s += `<rect x="${x - PART_W / 2}" y="4" width="${PART_W}" height="${PART_H}"
        fill="${C.header}" stroke="${C.blue}" stroke-width="1.8" rx="3"/>
        <text x="${x}" y="${23}" text-anchor="middle"
          font-family="Plus Jakarta Sans,sans-serif" font-size="10" font-weight="700" fill="${C.text}">${p.name}</text>`;
      if (p.label)
        s += `<text x="${x}" y="${34}" text-anchor="middle"
          font-family="JetBrains Mono,monospace" font-size="7.5" fill="${C.blue}">${p.label}</text>`;
    }
  });

  messages.forEach((msg, mi) => {
    const y = MSG_Y0 + mi * MSG_GAP;
    const fi = participants.findIndex((p) => p.id === msg.from);
    const ti = participants.findIndex((p) => p.id === msg.to);
    if (fi === -1 || ti === -1) return;
    const x1 = cx[fi],
      x2 = cx[ti];
    const isRet = msg.type === "return",
      isSelf = fi === ti;
    const color = isRet ? C.muted : C.blue;
    const dash = isRet ? "5,3" : "none";
    const marker = isRet ? "mr" : "ms";

    s += `<rect x="${x1 - ACT_W / 2}" y="${y - 4}" width="${ACT_W}" height="${MSG_GAP - 8}"
      fill="rgba(56,189,248,0.1)" stroke="${C.blue}" stroke-width="1" opacity="0.7" rx="1"/>`;

    if (isSelf) {
      const ox = x1 + 40;
      s += `<path d="M${x1 + ACT_W / 2},${y} L${ox},${y} L${ox},${y + 24} L${x1 + ACT_W / 2},${y + 24}"
        fill="none" stroke="${color}" stroke-width="1.8" stroke-dasharray="${dash}" marker-end="url(#${marker})"/>`;
      const lw = msg.label.length * 5.5 + 10;
      s += `<rect x="${ox + 4}" y="${y + 4}" width="${lw}" height="13" fill="${BG}" opacity="0.8" rx="2"/>`;
      s += `<text x="${ox + 8}" y="${y + 15}"
        font-family="JetBrains Mono,monospace" font-size="9" fill="${color}">${msg.label}</text>`;
    } else {
      const lx = x1 < x2 ? x1 + ACT_W / 2 : x1 - ACT_W / 2;
      const rx = x1 < x2 ? x2 - ACT_W / 2 : x2 + ACT_W / 2;
      s += `<line x1="${lx}" y1="${y}" x2="${rx}" y2="${y}"
        stroke="${color}" stroke-width="1.8" stroke-dasharray="${dash}" marker-end="url(#${marker})"/>`;
      const mx = (lx + rx) / 2,
        lw = msg.label.length * 5.5 + 10;
      s += `<rect x="${mx - lw / 2}" y="${y - 14}" width="${lw}" height="13" fill="${BG}" opacity="0.8" rx="2"/>`;
      s += `<text x="${mx}" y="${y - 5}" text-anchor="middle"
        font-family="JetBrains Mono,monospace" font-size="9" fill="${color}">${msg.label}</text>`;
    }
  });

  s += "</svg>";
  return s;
}

/* ── Componente principal ── */
export const UMLDiagram = ({ type, data, height = 500 }) => {
  const W = 920;
  let svg = "";
  if (data) {
    if (type === "CASOS_USO") svg = renderUseCases(data, W, height);
    if (type === "CLASES") svg = renderClasses(data, W, height);
    if (type === "SECUENCIA") svg = renderSequence(data, W, height);
  }
  return <ZoomSVG svgString={svg} height={height} />;
};
