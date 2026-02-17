import React, { useState, useRef } from 'react';
import './MaterialsSection.css';
import { materials } from '../models/materials.data';
import { ArticleModal } from '../components/ArticleModal'; // <--- CORREGIDO: Con llaves
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";

export const MaterialsSection = () => {
  const [selectedMaterial, setSelectedMaterial] = useState(null);
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    const { current } = scrollRef;
    if (current) {
      const scrollAmount = direction === 'left' ? -320 : 320;
      current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <div className="materials-container">
      <div className="materials-header">
        <h2>📚 Material de Apoyo</h2>
        <p>Descubre el contenido oculto en cada carta.</p>
      </div>

      <div className="carousel-wrapper">
        <button className="nav-btn left" onClick={() => scroll('left')}>
          <BiChevronLeft size={30} />
        </button>

        <div className="cards-scroll-container" ref={scrollRef}>
          {materials.map((item) => (
            // --- ESTRUCTURA FLIP CARD 3D ---
            <div key={item.id} className="material-card-flip">
              <div className="card-inner">
                
                {/* --- CARA FRONTAL (DISEÑO PÓKER) --- */}
                <div className="card-face card-front-poker">
                  <div className="poker-pattern"></div>
                  <div className="poker-border">
                    <span className="corner-symbol">♠</span>
                    <h3 className="palmer-title">{item.title}</h3>
                    <span className="corner-symbol bottom">♦</span>
                  </div>
                </div>

                {/* --- CARA TRASERA (CONTENIDO REAL) --- */}
                <div className="card-face card-back-content">
                  <div className="card-image">
                    <img src={item.thumbnail} alt={item.title} />
                  </div>
                  
                  <div className="card-content">
                    <div className="tags-container">
                      {item.tags.map((tag, index) => (
                        <span key={index} className="tag-badge">{tag}</span>
                      ))}
                    </div>
                    {/* Título más pequeño adentro para ahorrar espacio */}
                    <h4 className="inner-title">{item.title}</h4>
                    
                    {item.type === 'article' ? (
                      <button 
                        className="action-btn read-btn"
                        onClick={(e) => {
                          e.stopPropagation(); // Evita conflictos con el click de la carta
                          setSelectedMaterial(item);
                        }}
                      >
                        📖 Leer
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