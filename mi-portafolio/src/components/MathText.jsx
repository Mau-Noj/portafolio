// src/components/MathText.jsx
// Renderiza texto con fórmulas LaTeX inline ($...$) y en bloque ($$...$$)
// Uso: <MathText text="La fórmula es $V = IR$ para resistencias." />

import React from 'react';
import katex from 'katex';
import 'katex/dist/katex.min.css';

/**
 * Convierte un string con LaTeX en nodos React.
 * Soporta:
 *   $$...$$ → bloque centrado (display mode)
 *   $...$   → inline
 *   texto normal → span
 */
const parseLatex = (text) => {
  if (!text || typeof text !== 'string') return [text];

  const parts = [];
  // Regex: primero detecta $$...$$ (bloque), luego $...$ (inline)
  const regex = /\$\$([^$]+)\$\$|\$([^$]+)\$/g;
  let lastIndex = 0;
  let match;
  let key = 0;

  while ((match = regex.exec(text)) !== null) {
    // Texto antes de la fórmula
    if (match.index > lastIndex) {
      parts.push(
        <span key={key++}>{text.slice(lastIndex, match.index)}</span>
      );
    }

    const isBlock  = match[1] !== undefined;
    const formula  = isBlock ? match[1] : match[2];

    try {
      const html = katex.renderToString(formula, {
        displayMode: isBlock,
        throwOnError: false,
        output: 'html',
      });

      if (isBlock) {
        parts.push(
          <span
            key={key++}
            className="math-block"
            dangerouslySetInnerHTML={{ __html: html }}
          />
        );
      } else {
        parts.push(
          <span
            key={key++}
            className="math-inline"
            dangerouslySetInnerHTML={{ __html: html }}
          />
        );
      }
    } catch {
      // Si falla, muestra el texto crudo
      parts.push(<span key={key++}>{match[0]}</span>);
    }

    lastIndex = match.index + match[0].length;
  }

  // Texto restante después de la última fórmula
  if (lastIndex < text.length) {
    parts.push(<span key={key++}>{text.slice(lastIndex)}</span>);
  }

  return parts;
};

export const MathText = ({ text, className = '' }) => {
  const nodes = parseLatex(text);
  return <span className={`math-text ${className}`}>{nodes}</span>;
};