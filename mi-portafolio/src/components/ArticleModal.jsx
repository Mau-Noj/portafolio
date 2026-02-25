// src/components/ArticleModal.jsx
import React, { useEffect } from 'react';
import './ArticleModal.css';
import { BiX, BiTimeFive, BiPurchaseTag } from "react-icons/bi";

export const ArticleModal = ({ article, onClose }) => {
  if (!article) return null;

  // Bloquea scroll del body mientras el modal está abierto
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    document.body.style.position = 'fixed';
    document.body.style.width = '100%';
    return () => {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
    };
  }, []);

  // Cierra solo si el clic/toque fue directo en el overlay
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="modal-overlay"
      onClick={handleOverlayClick}
      onTouchEnd={handleOverlayClick}
    >
      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
        onTouchEnd={(e) => e.stopPropagation()}
      >
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