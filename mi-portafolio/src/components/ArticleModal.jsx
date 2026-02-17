// src/components/ArticleModal.jsx
import React from 'react';
import './ArticleModal.css';
import { BiX, BiTimeFive, BiPurchaseTag } from "react-icons/bi";

export const ArticleModal = ({ article, onClose }) => {
  if (!article) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      {/* stopPropagation evita que el modal se cierre si das clic DENTRO de él */}
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        
        <button className="close-btn" onClick={onClose}>
          <BiX />
        </button>

        <div className="article-header-modal">
          <span className="article-category">Artículo Técnico</span>
          <h2>{article.title}</h2>
          
          <div className="article-meta">
            <div className="meta-item">
              <BiTimeFive /> 5 min de lectura
            </div>
            <div className="meta-item">
              <BiPurchaseTag /> {article.tags.join(", ")}
            </div>
          </div>
        </div>

        <div className="article-body-scroll">
            {article.content}
        </div>

      </div>
    </div>
  );
};