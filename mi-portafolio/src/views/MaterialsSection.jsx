import React, { useState, useRef } from 'react';
import './MaterialsSection.css';
import { materials } from '../models/materials.data';
import { ArticleModal } from '../components/ArticleModal'; 
import { BiChevronLeft, BiChevronRight, BiShow, BiHide } from "react-icons/bi";

// --- COMPONENTE INTERNO PARA CADA CARTA ---
const MaterialCard = ({ item, onRead }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="material-card-flip">
      <div className={`card-inner ${isExpanded ? 'expanded-mode' : ''}`}>
        
        {/* CARA FRONTAL (PÓKER) */}
        <div className="card-face card-front-poker">
          <div className="poker-pattern"></div>
          <div className="poker-border">
            <span className="corner-symbol">♠</span>
            <h3 className="palmer-title">{item.title}</h3>
            <span className="corner-symbol bottom">♦</span>
          </div>
        </div>

        {/* CARA TRASERA (CONTENIDO) */}
        <div className="card-face card-back-content">
          
          <div className={`card-image ${isExpanded ? 'hidden-content' : ''}`}>
            <img src={item.thumbnail} alt={item.title} />
          </div>
          
          <div className="card-content">
            <div className={`tags-container ${isExpanded ? 'hidden-content' : ''}`}>
              {item.tags.map((tag, idx) => (
                <span key={idx} className="tag-badge">{tag}</span>
              ))}
            </div>
            
            <h4 className="inner-title">{item.title}</h4>
            
            <div className={`card-description ${isExpanded ? 'full-text' : 'clamped-text'}`}>
              {item.description}
            </div>

            <button 
              className="toggle-text-btn"
              onClick={(e) => { e.stopPropagation(); setIsExpanded(!isExpanded); }}
              onTouchEnd={(e) => { e.stopPropagation(); }}
            >
              {isExpanded ? <><BiHide /> Ocultar</> : <><BiShow /> Ver más...</>}
            </button>
            
            <div className="action-area">
              {item.type === 'article' ? (
                <button 
                  className="action-btn read-btn"
                  onClick={(e) => { e.stopPropagation(); onRead(item); }}
                >
                  📖 Leer Artículo
                </button>
              ) : (
                <a href={item.url} target="_blank" rel="noreferrer" className="action-btn download-btn">
                  📥 Descargar
                </a>
              )}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

// --- COMPONENTE PRINCIPAL ---
export const MaterialsSection = () => {
  const [selectedMaterial, setSelectedMaterial] = useState(null);
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    const { current } = scrollRef;
    if (current) {
      current.scrollBy({ left: direction === 'left' ? -320 : 320, behavior: 'smooth' });
    }
  };

  return (
    <div className="materials-container">

      {/* ── HEADER MEJORADO ── */}
      <div className="materials-header">

        {/* Título: dos líneas centradas */}
        <h2 className="materials-title">
          <span className="materials-title-plain">Material de</span>
          <span className="materials-title-accent">Apoyo</span>
        </h2>

        {/* Subtítulo */}
        <p className="materials-subtitle">
          Recursos, plantillas y guías que uso en mis proyectos.
          Descubre el contenido oculto en cada carta.
        </p>

        {/* Línea decorativa */}
        <div className="materials-header-line">
          <span className="materials-header-line-icon">✦</span>
        </div>

      </div>

      {/* ── CARRUSEL ── */}
      <div className="carousel-wrapper">
        <button className="nav-btn left" onClick={() => scroll('left')}>
          <BiChevronLeft size={30} />
        </button>

        <div className="cards-scroll-container" ref={scrollRef}>
          {materials.map((item) => (
            <MaterialCard 
              key={item.id} 
              item={item} 
              onRead={setSelectedMaterial} 
            />
          ))}
        </div>

        <button className="nav-btn right" onClick={() => scroll('right')}>
          <BiChevronRight size={30} />
        </button>
      </div>

      {selectedMaterial && (
        <ArticleModal 
          isOpen={!!selectedMaterial} 
          onClose={() => setSelectedMaterial(null)} 
          article={selectedMaterial} 
        />
      )}
    </div>
  );
};