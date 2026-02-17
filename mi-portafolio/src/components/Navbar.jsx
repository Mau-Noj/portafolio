import React, { useState } from 'react';
import './Navbar.css';
import { BiHomeAlt, BiGridAlt, BiNews, BiLibrary, BiUser, BiEnvelope } from "react-icons/bi";

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="navbar-container">
        
        {/* Logo */}
        <a href="#" className="navbar-logo">
          <img src="/logo.png" alt="Logo" className="logo-image" />
          Mauricio<span className="logo-accent">.dev</span>
        </a>

        {/* Menú de escritorio */}
        <div className={`nav-menu ${isOpen ? 'active' : ''}`}>
          
          <a href="#inicio" className="nav-item">
            <BiHomeAlt className="nav-icon" /> Inicio
          </a>
          
          <a href="#proyectos" className="nav-item">
            <BiGridAlt className="nav-icon" /> Proyectos
          </a>

          <a href="#articulos" className="nav-item">
            <BiNews className="nav-icon" /> Artículos
          </a>

          <a href="#materiales" className="nav-item">
            <BiLibrary className="nav-icon" /> Materiales de Apoyo
          </a>
          
          <a href="#sobre-mi" className="nav-item">
            <BiUser className="nav-icon" /> Sobre mí
          </a>
          
          <a href="#contacto" className="nav-button">
            <BiEnvelope className="btn-icon" /> Contáctame
          </a>
        </div>

        {/* Icono de hamburguesa móvil */}
        <div className="nav-toggle" onClick={() => setIsOpen(!isOpen)}>
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </div>
      </div>
    </nav>
  );
};