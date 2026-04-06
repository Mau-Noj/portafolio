// src/components/LogBlock.jsx
import React from "react";
import { MathText } from "./MathText";
import "./LogBlock.css";

const PhaseBlock = ({ block }) => (
  <div className="lb lb-phase">
    <span className="lb-phase__dot" />
    <span className="lb-phase__label">{block.label}</span>
    <div className="lb-phase__line" />
  </div>
);

const TextBlock = ({ block }) => (
  <div className="lb lb-text">
    <MathText text={block.content} />
  </div>
);

const FormulaBlock = ({ block }) => (
  <div className="lb lb-formula">
    <div className="lb-formula__content">
      <MathText text={block.content} />
    </div>
    {block.caption && <p className="lb-formula__caption">{block.caption}</p>}
  </div>
);

const CodeBlock = ({ block }) => (
  <div className="lb lb-code">
    <div className="lb-code__header">
      <span className="lb-code__lang">{block.lang ?? "code"}</span>
      {block.label && <span className="lb-code__label">{block.label}</span>}
    </div>
    <pre className="lb-code__pre">
      <code>{block.content}</code>
    </pre>
  </div>
);

// ── Imagen con formato APA 7 ───────────────────────────────────
const ImageBlock = ({ block }) => (
  <figure className="lb lb-image">
    <img
      src={block.src}
      alt={block.title ?? block.caption ?? ""}
      className="lb-image__img"
      loading="lazy"
    />
    <figcaption className="lb-image__caption">
      {block.figureNum && (
        <span className="lb-image__figure-num">
          <em>Figura {block.figureNum}.</em>{" "}
        </span>
      )}
      {block.title && <span className="lb-image__title">{block.title}</span>}
      {/* Fallback: si usan caption en lugar de title (retrocompatible) */}
      {!block.title && block.caption && (
        <span className="lb-image__title">{block.caption}</span>
      )}
      {block.note && (
        <span className="lb-image__note">
          {" "}
          <em>Nota.</em> {block.note}
        </span>
      )}
    </figcaption>
  </figure>
);

const ResultBlock = ({ block }) => (
  <div className="lb lb-result">
    <span className="lb-result__icon">✓</span>
    <MathText text={block.content} />
  </div>
);

const WarningBlock = ({ block }) => (
  <div className="lb lb-warning">
    <span className="lb-warning__icon">⚠</span>
    <MathText text={block.content} />
  </div>
);

const TipBlock = ({ block }) => (
  <div className="lb lb-tip">
    <span className="lb-tip__icon">💡</span>
    <MathText text={block.content} />
  </div>
);

const TableBlock = ({ block }) => (
  <div className="lb lb-table">
    {/* Título de tabla APA 7 si existe */}
    {block.tableNum && (
      <p className="lb-table__num">
        <em>Tabla {block.tableNum}</em>
      </p>
    )}
    {block.title && <p className="lb-table__title">{block.title}</p>}
    <div className="lb-table__scroll">
      <table className="lb-table__tbl">
        {block.headers && (
          <thead>
            <tr>
              {block.headers.map((h, i) => (
                <th key={i}>
                  <MathText text={h} />
                </th>
              ))}
            </tr>
          </thead>
        )}
        <tbody>
          {block.rows?.map((row, i) => (
            <tr key={i}>
              {row.map((cell, j) => (
                <td key={j}>
                  <MathText text={String(cell)} />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    {block.note && (
      <p className="lb-table__note">
        <em>Nota.</em> {block.note}
      </p>
    )}
  </div>
);

const DividerBlock = () => <div className="lb lb-divider" />;

const BLOCK_MAP = {
  phase: PhaseBlock,
  text: TextBlock,
  formula: FormulaBlock,
  code: CodeBlock,
  image: ImageBlock,
  result: ResultBlock,
  warning: WarningBlock,
  tip: TipBlock,
  table: TableBlock,
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
