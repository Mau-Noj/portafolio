// src/views/ComingSoon.jsx
import React from 'react';

export const ComingSoon = () => {
  return (
    <div className="coming-soon-container">
      <div className="content-box">
        <h1>🚧 Página en Construcción 🚧</h1>
        
        <div className="avatar-wrapper">
          {/* Si es video MP4 usa esta etiqueta: */}
          <video 
            src="/avatar.webm" 
            poster="/avatar-poster.jpg"
            autoPlay 
            loop 
            muted 
            playsInline 
            className="avatar-media" 
          />
          
          {/* Si decidiste usar un GIF, borra lo de arriba y usa esto: 
          <img src="/avatar.gif" alt="Mi Avatar" className="avatar-media" />
          */}
        </div>

        <h2>Próximamente: El portafolio de Mauricio Noj</h2>
        <p>Estoy preparando algo genial. ¡Vuelve pronto!</p>
      </div>
    </div>
  );
};