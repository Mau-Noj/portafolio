// src/components/LogBlock.jsx
// Renderiza un bloque individual según su type.
// Importa este componente en ProjectDetail.jsx

import React from 'react';
import { MathText } from './MathText';
import './LogBlock.css';

// ── Bloque: separador de fase ──────────────────────────────────
const PhaseBlock = ({ block }) => (
  <div className="lb lb-phase">
    <span className="lb-phase__dot" />
    <span className="lb-phase__label">{block.label}</span>
    <div className="lb-phase__line" />
  </div>
);

// ── Bloque: texto libre con soporte LaTeX ──────────────────────
const TextBlock = ({ block }) => (
  <div className="lb lb-text">
    <MathText text={block.content} />
  </div>
);

// ── Bloque: fórmula destacada ──────────────────────────────────
const FormulaBlock = ({ block }) => (
  <div className="lb lb-formula">
    <div className="lb-formula__content">
      <MathText text={block.content} />
    </div>
    {block.caption && (
      <p className="lb-formula__caption">{block.caption}</p>
    )}
  </div>
);

// ── Bloque: código con sintaxis highlight (sin librería) ────────
const CodeBlock = ({ block }) => (
  <div className="lb lb-code">
    <div className="lb-code__header">
      <span className="lb-code__lang">{block.lang ?? 'code'}</span>
      {block.label && <span className="lb-code__label">{block.label}</span>}
    </div>
    <pre className="lb-code__pre"><code>{block.content}</code></pre>
  </div>
);

// ── Bloque: imagen con caption ─────────────────────────────────
const ImageBlock = ({ block }) => (
  <figure className="lb lb-image">
    <img
      src={block.src}
      alt={block.caption ?? ''}
      className="lb-image__img"
      loading="lazy"
    />
    {block.caption && (
      <figcaption className="lb-image__caption">{block.caption}</figcaption>
    )}
  </figure>
);

// ── Bloque: resultado destacado ────────────────────────────────
const ResultBlock = ({ block }) => (
  <div className="lb lb-result">
    <span className="lb-result__icon">✓</span>
    <MathText text={block.content} />
  </div>
);

// ── Bloque: advertencia ────────────────────────────────────────
const WarningBlock = ({ block }) => (
  <div className="lb lb-warning">
    <span className="lb-warning__icon">⚠</span>
    <MathText text={block.content} />
  </div>
);

// ── Bloque: tip / consejo ──────────────────────────────────────
const TipBlock = ({ block }) => (
  <div className="lb lb-tip">
    <span className="lb-tip__icon">💡</span>
    <MathText text={block.content} />
  </div>
);

// ── Bloque: tabla de datos ─────────────────────────────────────
const TableBlock = ({ block }) => (
  <div className="lb lb-table">
    <div className="lb-table__scroll">
      <table className="lb-table__tbl">
        {block.headers && (
          <thead>
            <tr>
              {block.headers.map((h, i) => (
                <th key={i}><MathText text={h} /></th>
              ))}
            </tr>
          </thead>
        )}
        <tbody>
          {block.rows?.map((row, i) => (
            <tr key={i}>
              {row.map((cell, j) => (
                <td key={j}><MathText text={String(cell)} /></td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

// ── Bloque: divisor visual ─────────────────────────────────────
const DividerBlock = () => (
  <div className="lb lb-divider" />
);

// ── Dispatcher principal ───────────────────────────────────────
const BLOCK_MAP = {
  phase:   PhaseBlock,
  text:    TextBlock,
  formula: FormulaBlock,
  code:    CodeBlock,
  image:   ImageBlock,
  result:  ResultBlock,
  warning: WarningBlock,
  tip:     TipBlock,
  table:   TableBlock,
  divider: DividerBlock,
};

export const LogBlock = ({ block }) => {
  const Component = BLOCK_MAP[block.type];
  if (!Component) {
    console.warn(`LogBlock: tipo desconocido "${block.type}"`);
    return null;
  }
  return <Component block={block} />;
};