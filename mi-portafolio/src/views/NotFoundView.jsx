// src/views/NotFoundView.jsx
import React, { useEffect, useRef, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import "./NotFoundView.css";

// ── Detectar móvil ──────────────────────────────────────────
const isMobileDevice = () => window.innerWidth <= 820;

// ══════════════════════════════════════════════════════════
// SNAKE (solo móvil)
// ══════════════════════════════════════════════════════════
const SCOLS = 16,
  SROWS = 16;

const snakeInit = () => ({
  snake: [
    { x: 8, y: 8 },
    { x: 7, y: 8 },
    { x: 6, y: 8 },
  ],
  dir: { x: 1, y: 0 },
  nextDir: { x: 1, y: 0 },
  food: { x: 12, y: 4 },
  score: 0,
  gameOver: false,
  started: false,
});

const randFood = (snake) => {
  let f;
  do {
    f = {
      x: Math.floor(Math.random() * SCOLS),
      y: Math.floor(Math.random() * SROWS),
    };
  } while (snake.some((s) => s.x === f.x && s.y === f.y));
  return f;
};

const SnakeGame = ({ size }) => {
  const canvasRef = useRef(null);
  const stRef = useRef(snakeInit());
  const [score, setScore] = useState(0);
  const [phase, setPhase] = useState("idle"); // idle | playing | over
  const rafRef = useRef(null);
  const lastRef = useRef(0);
  const B = Math.floor(size / SCOLS);

  const draw = useCallback(() => {
    const c = canvasRef.current;
    if (!c) return;
    const ctx = c.getContext("2d");
    const s = stRef.current;
    const W = SCOLS * B,
      H = SROWS * B;

    ctx.fillStyle = "#0c0d11";
    ctx.fillRect(0, 0, W, H);

    // grid
    ctx.strokeStyle = "rgba(255,255,255,0.03)";
    ctx.lineWidth = 0.5;
    for (let r = 0; r <= SROWS; r++) {
      ctx.beginPath();
      ctx.moveTo(0, r * B);
      ctx.lineTo(W, r * B);
      ctx.stroke();
    }
    for (let c2 = 0; c2 <= SCOLS; c2++) {
      ctx.beginPath();
      ctx.moveTo(c2 * B, 0);
      ctx.lineTo(c2 * B, H);
      ctx.stroke();
    }

    // food
    ctx.fillStyle = "#ff2d78";
    ctx.shadowColor = "#ff2d78";
    ctx.shadowBlur = 10;
    ctx.beginPath();
    ctx.arc(
      s.food.x * B + B / 2,
      s.food.y * B + B / 2,
      B / 2 - 1,
      0,
      Math.PI * 2,
    );
    ctx.fill();
    ctx.shadowBlur = 0;

    // snake
    s.snake.forEach((seg, i) => {
      const t = 1 - i / s.snake.length;
      ctx.fillStyle = i === 0 ? "#4ade80" : `rgba(74,222,128,${0.2 + t * 0.6})`;
      if (i === 0) {
        ctx.shadowColor = "#4ade80";
        ctx.shadowBlur = 8;
      }
      ctx.fillRect(seg.x * B + 1, seg.y * B + 1, B - 2, B - 2);
      ctx.shadowBlur = 0;
    });

    // overlay
    if (!s.started || s.gameOver) {
      ctx.fillStyle = "rgba(8,8,7,0.88)";
      ctx.fillRect(0, 0, W, H);
      ctx.textAlign = "center";
      ctx.fillStyle = s.gameOver ? "#ff2d78" : "#4ade80";
      ctx.shadowColor = ctx.fillStyle;
      ctx.shadowBlur = 16;
      ctx.font = `900 ${B * 1.5}px 'Syne',sans-serif`;
      ctx.fillText(
        s.gameOver ? "GAME OVER" : "SNAKE",
        W / 2,
        H / 2 - (s.gameOver ? B : 0),
      );
      ctx.shadowBlur = 0;
      if (s.gameOver) {
        ctx.fillStyle = "rgba(255,255,255,0.7)";
        ctx.font = `700 ${B * 0.9}px 'Syne',sans-serif`;
        ctx.fillText(`Score: ${s.score}`, W / 2, H / 2 + B * 0.8);
      }
      ctx.fillStyle = "rgba(255,255,255,0.35)";
      ctx.font = `500 ${B * 0.6}px 'JetBrains Mono',monospace`;
      ctx.fillText(
        s.gameOver ? "[ TAP ] reiniciar" : "[ TAP ] iniciar",
        W / 2,
        H / 2 + (s.gameOver ? B * 2 : B * 0.8),
      );
      ctx.textAlign = "left";
    }
  }, [B]);

  const step = useCallback(() => {
    const s = stRef.current;
    if (!s.started || s.gameOver) return;
    s.dir = { ...s.nextDir };
    const head = { x: s.snake[0].x + s.dir.x, y: s.snake[0].y + s.dir.y };
    if (
      head.x < 0 ||
      head.x >= SCOLS ||
      head.y < 0 ||
      head.y >= SROWS ||
      s.snake.some((seg) => seg.x === head.x && seg.y === head.y)
    ) {
      s.gameOver = true;
      setPhase("over");
      draw();
      return;
    }
    const ate = head.x === s.food.x && head.y === s.food.y;
    const ns = [head, ...s.snake];
    if (!ate) ns.pop();
    else {
      s.score += 10;
      s.food = randFood(ns);
      setScore(s.score);
    }
    s.snake = ns;
    draw();
  }, [draw]);

  const loop = useCallback(
    (ts) => {
      if (ts - lastRef.current > 160) {
        lastRef.current = ts;
        step();
      }
      rafRef.current = requestAnimationFrame(loop);
    },
    [step],
  );

  const start = useCallback(() => {
    stRef.current = { ...snakeInit(), started: true };
    setScore(0);
    setPhase("playing");
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    lastRef.current = performance.now();
    rafRef.current = requestAnimationFrame(loop);
  }, [loop]);

  useEffect(() => {
    draw();
    rafRef.current = requestAnimationFrame(loop);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [loop, draw]);

  const touchRef = useRef(null);
  const onTouchStart = (e) => {
    e.preventDefault();
    touchRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
  };
  const onTouchEnd = (e) => {
    e.preventDefault();
    const s = stRef.current;
    if (!s.started || s.gameOver) {
      start();
      return;
    }
    if (!touchRef.current) return;
    const dx = e.changedTouches[0].clientX - touchRef.current.x;
    const dy = e.changedTouches[0].clientY - touchRef.current.y;
    if (Math.abs(dx) < 8 && Math.abs(dy) < 8) return;
    const d = s.dir;
    if (Math.abs(dx) > Math.abs(dy)) {
      if (dx > 0 && d.x !== -1) s.nextDir = { x: 1, y: 0 };
      if (dx < 0 && d.x !== 1) s.nextDir = { x: -1, y: 0 };
    } else {
      if (dy > 0 && d.y !== -1) s.nextDir = { x: 0, y: 1 };
      if (dy < 0 && d.y !== 1) s.nextDir = { x: 0, y: -1 };
    }
  };

  const tap = (dir) => {
    const s = stRef.current;
    if (!s.started || s.gameOver) {
      start();
      return;
    }
    const d = s.dir;
    if (dir === "up" && d.y !== 1) s.nextDir = { x: 0, y: -1 };
    if (dir === "down" && d.y !== -1) s.nextDir = { x: 0, y: 1 };
    if (dir === "left" && d.x !== 1) s.nextDir = { x: -1, y: 0 };
    if (dir === "right" && d.x !== -1) s.nextDir = { x: 1, y: 0 };
  };

  return (
    <div className="sk-wrap">
      <div className="sk-top">
        <div className="sk-score-box">
          <span className="sk-label">Score</span>
          <span className="sk-val">{score}</span>
        </div>
        <span className="sk-hint">
          {phase === "idle" && "Toca para iniciar"}
          {phase === "playing" && "Swipe o usa el D-pad"}
          {phase === "over" && "Toca para reintentar"}
        </span>
      </div>

      <canvas
        ref={canvasRef}
        width={SCOLS * B}
        height={SROWS * B}
        className="sk-canvas"
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
        onClick={() => {
          const s = stRef.current;
          if (!s.started || s.gameOver) start();
        }}
      />

      <div className="sk-dpad">
        <div className="sk-dpad-col">
          <button
            className="sk-btn"
            onTouchStart={(e) => {
              e.preventDefault();
              tap("up");
            }}
          >
            ▲
          </button>
          <div className="sk-dpad-row">
            <button
              className="sk-btn"
              onTouchStart={(e) => {
                e.preventDefault();
                tap("left");
              }}
            >
              ◀
            </button>
            <div className="sk-dpad-mid" />
            <button
              className="sk-btn"
              onTouchStart={(e) => {
                e.preventDefault();
                tap("right");
              }}
            >
              ▶
            </button>
          </div>
          <button
            className="sk-btn"
            onTouchStart={(e) => {
              e.preventDefault();
              tap("down");
            }}
          >
            ▼
          </button>
        </div>
      </div>
    </div>
  );
};

// ══════════════════════════════════════════════════════════
// TETRIS (solo desktop)
// ══════════════════════════════════════════════════════════
const TCOLS = 10,
  TROWS = 18;
const TPIECES = [
  { shape: [[1, 1, 1, 1]], color: "#00f5ff" },
  {
    shape: [
      [1, 1],
      [1, 1],
    ],
    color: "#ffe600",
  },
  {
    shape: [
      [0, 1, 0],
      [1, 1, 1],
    ],
    color: "#a78bfa",
  },
  {
    shape: [
      [1, 0, 0],
      [1, 1, 1],
    ],
    color: "#fb923c",
  },
  {
    shape: [
      [0, 0, 1],
      [1, 1, 1],
    ],
    color: "#4B8EFF",
  },
  {
    shape: [
      [0, 1, 1],
      [1, 1, 0],
    ],
    color: "#4ade80",
  },
  {
    shape: [
      [1, 1, 0],
      [0, 1, 1],
    ],
    color: "#ff2d78",
  },
];
const tEmpty = () => Array.from({ length: TROWS }, () => Array(TCOLS).fill(0));
const tRot = (m) =>
  Array.from({ length: m[0].length }, (_, c) =>
    Array.from({ length: m.length }, (_, r) => m[m.length - 1 - r][c]),
  );
const tRand = () => {
  const p = TPIECES[Math.floor(Math.random() * TPIECES.length)];
  return {
    shape: p.shape,
    color: p.color,
    x: Math.floor(TCOLS / 2) - Math.floor(p.shape[0].length / 2),
    y: 0,
  };
};
const tHit = (b, p, dx = 0, dy = 0, sh = p.shape) => {
  for (let r = 0; r < sh.length; r++)
    for (let c = 0; c < sh[r].length; c++) {
      if (!sh[r][c]) continue;
      const nx = p.x + c + dx,
        ny = p.y + r + dy;
      if (nx < 0 || nx >= TCOLS || ny >= TROWS) return true;
      if (ny >= 0 && b[ny][nx]) return true;
    }
  return false;
};
const tMerge = (b, p) => {
  const nb = b.map((r) => [...r]);
  p.shape.forEach((row, r) =>
    row.forEach((c, ci) => {
      if (c && p.y + r >= 0) nb[p.y + r][p.x + ci] = p.color;
    }),
  );
  return nb;
};
const tClear = (b) => {
  const nb = b.filter((row) => row.some((c) => !c));
  const cl = TROWS - nb.length;
  return {
    board: [...Array.from({ length: cl }, () => Array(TCOLS).fill(0)), ...nb],
    cleared: cl,
  };
};
const tBlock = () =>
  Math.max(14, Math.floor((window.innerHeight - 168) / TROWS));
const NXS = 12;

const TetrisGame = () => {
  const cvRef = useRef(null),
    nxRef = useRef(null),
    blkRef = useRef(tBlock());
  const stRef = useRef({
    board: tEmpty(),
    cur: tRand(),
    next: tRand(),
    score: 0,
    lines: 0,
    level: 1,
    over: false,
    paused: false,
    on: false,
  });
  const [disp, setDisp] = useState({ score: 0, lines: 0, level: 1 });
  const rafRef = useRef(null),
    lastRef = useRef(0),
    dropRef = useRef(800);

  const drawNext = useCallback(() => {
    const nc = nxRef.current;
    if (!nc) return;
    const ctx = nc.getContext("2d"),
      W = 4 * NXS;
    ctx.fillStyle = "#0c0d11";
    ctx.fillRect(0, 0, W, W);
    const { next } = stRef.current;
    if (!next) return;
    const ox = Math.floor((4 - next.shape[0].length) / 2),
      oy = Math.floor((4 - next.shape.length) / 2);
    next.shape.forEach((row, r) =>
      row.forEach((cell, c) => {
        if (!cell) return;
        ctx.fillStyle = next.color;
        ctx.shadowColor = next.color;
        ctx.shadowBlur = 4;
        ctx.fillRect((ox + c) * NXS + 1, (oy + r) * NXS + 1, NXS - 2, NXS - 2);
        ctx.shadowBlur = 0;
      }),
    );
  }, []);

  const draw = useCallback(() => {
    const cv = cvRef.current;
    if (!cv) return;
    const ctx = cv.getContext("2d"),
      s = stRef.current,
      B = blkRef.current,
      W = TCOLS * B,
      H = TROWS * B;
    ctx.fillStyle = "#0c0d11";
    ctx.fillRect(0, 0, W, H);
    ctx.strokeStyle = "rgba(255,255,255,0.04)";
    ctx.lineWidth = 0.5;
    for (let r = 0; r <= TROWS; r++) {
      ctx.beginPath();
      ctx.moveTo(0, r * B);
      ctx.lineTo(W, r * B);
      ctx.stroke();
    }
    for (let c = 0; c <= TCOLS; c++) {
      ctx.beginPath();
      ctx.moveTo(c * B, 0);
      ctx.lineTo(c * B, H);
      ctx.stroke();
    }
    s.board.forEach((row, r) =>
      row.forEach((cell, c) => {
        if (!cell) return;
        ctx.fillStyle = cell;
        ctx.shadowColor = cell;
        ctx.shadowBlur = 4;
        ctx.fillRect(c * B + 1, r * B + 1, B - 2, B - 2);
        ctx.shadowBlur = 0;
      }),
    );
    if (s.on && !s.over) {
      let gy = 0;
      while (!tHit(s.board, s.cur, 0, gy + 1)) gy++;
      s.cur.shape.forEach((row, r) =>
        row.forEach((cell, c) => {
          if (!cell) return;
          const gx = s.cur.x + c,
            gy2 = s.cur.y + r + gy;
          if (gx < 0 || gx >= TCOLS || gy2 < 0 || gy2 >= TROWS) return;
          ctx.fillStyle = "rgba(255,255,255,0.05)";
          ctx.fillRect(gx * B + 1, gy2 * B + 1, B - 2, B - 2);
        }),
      );
      s.cur.shape.forEach((row, r) =>
        row.forEach((cell, c) => {
          if (!cell) return;
          const px = s.cur.x + c,
            py = s.cur.y + r;
          if (py < 0) return;
          ctx.fillStyle = s.cur.color;
          ctx.shadowColor = s.cur.color;
          ctx.shadowBlur = 8;
          ctx.fillRect(px * B + 1, py * B + 1, B - 2, B - 2);
          ctx.shadowBlur = 0;
        }),
      );
    }
    if (!s.on || s.over || s.paused) {
      ctx.fillStyle = "rgba(8,8,7,0.86)";
      ctx.fillRect(0, 0, W, H);
      ctx.fillStyle = s.over ? "#ff2d78" : "#4B8EFF";
      ctx.shadowColor = ctx.fillStyle;
      ctx.shadowBlur = 14;
      ctx.font = `900 ${Math.max(16, B * 1.1)}px 'Syne',sans-serif`;
      ctx.textAlign = "center";
      ctx.fillText(
        s.over ? "GAME OVER" : s.paused ? "PAUSED" : "TETRIS",
        W / 2,
        H / 2 - 14,
      );
      ctx.shadowBlur = 0;
      ctx.fillStyle = "rgba(255,255,255,0.4)";
      ctx.font = `500 ${Math.max(10, B * 0.5)}px 'JetBrains Mono',monospace`;
      ctx.fillText(
        s.over ? "[ ENTER ] reiniciar" : "[ ENTER ] iniciar",
        W / 2,
        H / 2 + 10,
      );
      ctx.textAlign = "left";
    }
    drawNext();
  }, [drawNext]);

  const loop = useCallback(
    (ts) => {
      const s = stRef.current;
      if (!s.on || s.over || s.paused) {
        draw();
        return;
      }
      if (ts - lastRef.current > dropRef.current) {
        lastRef.current = ts;
        if (!tHit(s.board, s.cur, 0, 1)) {
          s.cur.y++;
        } else {
          s.board = tMerge(s.board, s.cur);
          const { board, cleared } = tClear(s.board);
          s.board = board;
          s.lines += cleared;
          s.score += ([0, 100, 300, 500, 800][cleared] || 0) * s.level;
          s.level = Math.floor(s.lines / 10) + 1;
          dropRef.current = Math.max(80, 800 - (s.level - 1) * 70);
          s.cur = s.next;
          s.next = tRand();
          if (tHit(s.board, s.cur)) s.over = true;
          setDisp({ score: s.score, lines: s.lines, level: s.level });
        }
      }
      draw();
      rafRef.current = requestAnimationFrame(loop);
    },
    [draw],
  );

  const startLoop = useCallback(() => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    lastRef.current = performance.now();
    rafRef.current = requestAnimationFrame(loop);
  }, [loop]);

  const reset = useCallback(() => {
    stRef.current = {
      board: tEmpty(),
      cur: tRand(),
      next: tRand(),
      score: 0,
      lines: 0,
      level: 1,
      over: false,
      paused: false,
      on: true,
    };
    dropRef.current = 800;
    setDisp({ score: 0, lines: 0, level: 1 });
    startLoop();
  }, [startLoop]);

  const resize = useCallback(() => {
    blkRef.current = tBlock();
    const cv = cvRef.current;
    if (cv) {
      cv.width = TCOLS * blkRef.current;
      cv.height = TROWS * blkRef.current;
    }
    draw();
  }, [draw]);

  useEffect(() => {
    resize();
    rafRef.current = requestAnimationFrame(loop);
    window.addEventListener("resize", resize);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
    };
  }, [loop, resize]);

  useEffect(() => {
    const h = (e) => {
      if (
        ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", " "].includes(e.key)
      )
        e.preventDefault();
      const s = stRef.current;
      if (e.key === "Enter") {
        if (!s.on || s.over) {
          reset();
          return;
        }
        s.paused = !s.paused;
        if (!s.paused) startLoop();
        else draw();
        return;
      }
      if (!s.on || s.over || s.paused) return;
      if (e.key === "ArrowLeft" && !tHit(s.board, s.cur, -1)) {
        s.cur.x--;
        draw();
      }
      if (e.key === "ArrowRight" && !tHit(s.board, s.cur, 1)) {
        s.cur.x++;
        draw();
      }
      if (e.key === "ArrowDown" && !tHit(s.board, s.cur, 0, 1)) {
        s.cur.y++;
        draw();
      }
      if (e.key === "ArrowUp") {
        const rot = tRot(s.cur.shape);
        if (!tHit(s.board, s.cur, 0, 0, rot)) {
          s.cur.shape = rot;
          draw();
        }
      }
      if (e.key === " ") {
        while (!tHit(s.board, s.cur, 0, 1)) s.cur.y++;
        draw();
      }
    };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [draw, startLoop, reset]);

  return (
    <div className="nf-tetris">
      <canvas ref={cvRef} className="nf-tetris-canvas" />
      <div className="nf-panel">
        <div className="nf-panel-block">
          <span className="nf-panel-label">Score</span>
          <span className="nf-panel-val" style={{ color: "#4B8EFF" }}>
            {disp.score}
          </span>
        </div>
        <div className="nf-panel-block">
          <span className="nf-panel-label">Lines</span>
          <span className="nf-panel-val" style={{ color: "#4ade80" }}>
            {disp.lines}
          </span>
        </div>
        <div className="nf-panel-block">
          <span className="nf-panel-label">Level</span>
          <span className="nf-panel-val" style={{ color: "#ffe600" }}>
            {disp.level}
          </span>
        </div>
        <div className="nf-panel-block">
          <span className="nf-panel-label">Next</span>
          <canvas
            ref={nxRef}
            width={4 * NXS}
            height={4 * NXS}
            className="nf-next-canvas"
          />
        </div>
        <div className="nf-panel-divider" />
        <div className="nf-panel-block nf-panel-block--ctrl">
          <span className="nf-panel-label">Controls</span>
          <div className="nf-ctrl">
            <kbd>← →</kbd>
            <span>mover</span>
          </div>
          <div className="nf-ctrl">
            <kbd>↑</kbd>
            <span>rotar</span>
          </div>
          <div className="nf-ctrl">
            <kbd>↓</kbd>
            <span>bajar</span>
          </div>
          <div className="nf-ctrl">
            <kbd>Space</kbd>
            <span>drop</span>
          </div>
          <div className="nf-ctrl">
            <kbd>Enter</kbd>
            <span>pausa</span>
          </div>
        </div>
      </div>
    </div>
  );
};

// ══════════════════════════════════════════════════════════
// TERMINAL CARD (shared)
// ══════════════════════════════════════════════════════════
const TerminalCard = ({ typed, navigate, onPlay }) => (
  <div className="nf-terminal">
    <div className="nf-terminal-bar">
      <div className="nf-dots">
        <span className="nf-dot nf-dot--red" />
        <span className="nf-dot nf-dot--yellow" />
        <span className="nf-dot nf-dot--green" />
      </div>
      <span className="nf-filename">error.log</span>
      <span className="nf-badge">404</span>
    </div>
    <div className="nf-terminal-body">
      <div className="nf-prompt-row">
        <span className="nf-prompt">mauricionoj.dev $</span>
        <span className="nf-cmd">
          {typed}
          <span className="nf-cursor" />
        </span>
      </div>
      <span className="nf-num">404</span>
      <div className="nf-log-lines">
        <div className="nf-log-line">
          <span className="nf-tag nf-tag--err">[ERROR]</span>
          <span className="nf-log-text">
            Ruta <span className="nf-hl">no existe</span> en este servidor
          </span>
        </div>
        <div className="nf-log-line">
          <span className="nf-tag nf-tag--info">[INFO]</span>
          <span className="nf-log-text">
            Status: <span className="nf-hl">PAGE_NOT_FOUND</span>
          </span>
        </div>
        <div className="nf-log-line">
          <span className="nf-tag nf-tag--info">[INFO]</span>
          <span className="nf-log-text">Navega al inicio o revisa la URL</span>
        </div>
        <div className="nf-log-line">
          <span className="nf-tag nf-tag--ok">[OK]</span>
          <span className="nf-log-text">
            El sitio sigue <span className="nf-hl">funcionando</span>
          </span>
        </div>
      </div>
      <div className="nf-actions">
        <button
          className="nf-btn nf-btn--primary"
          onClick={() => navigate("/")}
        >
          <svg
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
          >
            <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
            <polyline points="9 22 9 12 15 12 15 22" />
          </svg>
          Inicio
        </button>
        <button
          className="nf-btn nf-btn--ghost"
          onClick={() => navigate("/proyectos")}
        >
          Proyectos
        </button>
        <button
          className="nf-btn nf-btn--ghost"
          onClick={() => navigate("/contacto")}
        >
          Contacto
        </button>
        <button className="nf-btn nf-btn--ghost" onClick={() => navigate(-1)}>
          ← Volver
        </button>
      </div>
      {onPlay && (
        <button className="nf-play-btn" onClick={onPlay}>
          <svg
            width="13"
            height="13"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
          >
            <polygon points="5 3 19 12 5 21 5 3" />
          </svg>
          Jugar mientras esperas
        </button>
      )}
      <div className="nf-status">
        <span className="nf-status-dot" />
        <span>process exited with code 404</span>
      </div>
    </div>
  </div>
);

// ══════════════════════════════════════════════════════════
// MAIN 404
// ══════════════════════════════════════════════════════════
export const NotFoundView = () => {
  const navigate = useNavigate();
  const [typed, setTyped] = useState("");
  const [mobile] = useState(isMobileDevice);
  const [screen, setScreen] = useState("error"); // "error" | "game"
  const [snakeSize, setSnakeSize] = useState(0);
  const gameRef = useRef(null);

  // Type animation
  useEffect(() => {
    const full = "ERROR: ruta no encontrada";
    let i = 0;
    const iv = setInterval(() => {
      setTyped(full.slice(0, i + 1));
      i++;
      if (i >= full.length) clearInterval(iv);
    }, 45);
    return () => clearInterval(iv);
  }, []);

  // Desktop: block scroll
  useEffect(() => {
    if (!mobile) document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobile]);

  // Calculate snake canvas size once we go to game screen
  useEffect(() => {
    if (screen === "game" && mobile) {
      // Wait for DOM then measure
      const t = setTimeout(() => {
        const el = gameRef.current;
        if (el) {
          const available = Math.min(el.clientWidth, window.innerHeight * 0.45);
          setSnakeSize(Math.max(160, Math.floor(available / SCOLS) * SCOLS));
        }
      }, 80);
      return () => clearTimeout(t);
    }
  }, [screen, mobile]);

  // Desktop layout
  if (!mobile) {
    return (
      <div className="nf-wrap nf-wrap--desktop">
        <div className="nf-inner">
          <TerminalCard typed={typed} navigate={navigate} />
          <div className="nf-game-wrap">
            <div className="nf-game-header">
              <span className="nf-game-label">// mientras esperas</span>
              <span className="nf-game-sub">juega un rato</span>
            </div>
            <TetrisGame />
          </div>
        </div>
      </div>
    );
  }

  // Mobile: error screen
  if (screen === "error") {
    return (
      <div className="nf-wrap nf-wrap--mobile">
        <TerminalCard
          typed={typed}
          navigate={navigate}
          onPlay={() => setScreen("game")}
        />
      </div>
    );
  }

  // Mobile: game screen
  return (
    <div className="nf-wrap nf-wrap--mobile-game" ref={gameRef}>
      <div className="nf-mobile-game-header">
        <button className="nf-back-btn" onClick={() => setScreen("error")}>
          ← Volver
        </button>
        <span className="nf-game-section-label">Snake</span>
      </div>
      {snakeSize > 0 ? (
        <SnakeGame size={snakeSize} />
      ) : (
        <div className="nf-loading">Cargando...</div>
      )}
    </div>
  );
};
