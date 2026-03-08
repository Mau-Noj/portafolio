import React, { useState, useEffect } from 'react';
import './Navbar.css';
import {
  BiGridAlt, BiNews, BiLibrary,
  BiUser, BiEnvelope, BiMoon, BiSun
} from "react-icons/bi";
import { BiLogoGithub, BiLogoYoutube, BiLogoInstagram} from "react-icons/bi";
import { Link, useLocation } from 'react-router-dom';

/* ─── SEO / Open Graph helper ───────────────────────────────────────────────
   Llama a esta función en cada página para inyectar los meta tags correctos.
   Ejemplo de uso en tu página Home:
     import { updateSEO } from '../components/Navbar';
     useEffect(() => updateSEO({
       title: 'Mauricio.dev · Inicio',
       description: 'Portafolio de Mauricio, desarrollador web full-stack.',
       url: 'https://mauricio.dev',
       image: 'https://mauricio.dev/og-cover.png',
     }), []);
──────────────────────────────────────────────────────────────────────────── */
export const updateSEO = ({
  title       = 'Mauricio.dev',
  description = 'Portafolio personal de Mauricio — desarrollador web full-stack apasionado por crear experiencias digitales.',
  url         = 'https://mauricio.dev',
  image       = 'https://mauricio.dev/og-cover.png',
  type        = 'website',
} = {}) => {
  // Título
  document.title = title;

  const setMeta = (selector, attr, value) => {
    let el = document.querySelector(selector);
    if (!el) {
      el = document.createElement('meta');
      const [attrName] = selector.match(/\[([^\]]+)=/)?.[1]
        ? [selector.match(/\[([^=]+)=/)[1]]
        : ['name'];
      el.setAttribute(attrName, attr);
      document.head.appendChild(el);
    }
    el.setAttribute('content', value);
  };

  // Standard
  setMeta('meta[name="description"]',         'description',          description);

  // Open Graph
  setMeta('meta[property="og:title"]',        'property og:title',    title);
  setMeta('meta[property="og:description"]',  'property',             description);
  setMeta('meta[property="og:url"]',          'property',             url);
  setMeta('meta[property="og:image"]',        'property',             image);
  setMeta('meta[property="og:type"]',         'property',             type);
  setMeta('meta[property="og:site_name"]',    'property',             'Mauricio.dev');

  // Twitter Card
  setMeta('meta[name="twitter:card"]',        'twitter:card',         'summary_large_image');
  setMeta('meta[name="twitter:title"]',       'twitter:title',        title);
  setMeta('meta[name="twitter:description"]', 'twitter:description',  description);
  setMeta('meta[name="twitter:image"]',       'twitter:image',        image);

  // Canonical
  let canonical = document.querySelector('link[rel="canonical"]');
  if (!canonical) {
    canonical = document.createElement('link');
    canonical.setAttribute('rel', 'canonical');
    document.head.appendChild(canonical);
  }
  canonical.setAttribute('href', url);
};

/* ─── Constantes de configuración ──────────────────────────────────────── */
const SOCIAL = {
  github:  'https://github.com/Mau-Noj',     
  youtube: 'https://www.youtube.com/@programandoconpepito',    
  instagram: 'https://www.instagram.com/superpepitopro64/'  
};

const NAV_LINKS = [
  { href: '#blog',      label: 'blog',                icon: BiNews     },
  { href: '/proyectos', label: 'Proyectos',           icon: BiGridAlt  },
  { href: '#articulos', label: 'Artículos',           icon: BiNews     },
  { to: '/materiales',  label: 'Materiales de Apoyo', icon: BiLibrary  },
  { href: '#sobre-mi',  label: 'Sobre mí',            icon: BiUser     },
];

/* ─── Hook: dark mode ───────────────────────────────────────────────────── */
const useDarkMode = () => {
  const [dark, setDark] = useState(() => {
    const saved = localStorage.getItem('theme');
    if (saved) return saved === 'dark';
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    const root = document.documentElement;
    if (dark) {
      root.setAttribute('data-theme', 'dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.removeAttribute('data-theme');
      localStorage.setItem('theme', 'light');
    }
  }, [dark]);

  return [dark, () => setDark(d => !d)];
};

/* ─── Componente ────────────────────────────────────────────────────────── */
export const Navbar = () => {
  const [isOpen, setIsOpen]   = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [dark, toggleDark]    = useDarkMode();
  const location = useLocation();

  // Scroll shadow
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Cierra menú al navegar
  useEffect(() => { setIsOpen(false); }, [location]);

  // Bloquea scroll del body en móvil
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  const close = () => setIsOpen(false);

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`} role="navigation" aria-label="Navegación principal">
      <div className="navbar-container">

        {/* ── Logo ── */}
        <Link to="/" className="navbar-logo" onClick={close} aria-label="Ir al inicio">
          <img src="/logo.png" alt="Logo Mauricio.dev" className="logo-image" />
          Mauricio<span className="logo-accent">.dev</span>
        </Link>

        {/* ── Menú principal ── */}
        <div className={`nav-menu ${isOpen ? 'active' : ''}`} role="menu">
          {NAV_LINKS.map(({ href, to, label, icon: Icon }) =>
            to ? (
              <Link
                key={label}
                to={to}
                role="menuitem"
                className={`nav-item ${location.pathname === to ? 'active' : ''}`}
                onClick={close}
              >
                <Icon className="nav-icon" aria-hidden="true" /> {label}
              </Link>
            ) : (
              <a key={label} href={href} role="menuitem" className="nav-item" onClick={close}>
                <Icon className="nav-icon" aria-hidden="true" /> {label}
              </a>
            )
          )}

          {/* Separador */}
          <div className="nav-divider" aria-hidden="true" />

          {/* ── Redes sociales ── */}
          <div className="nav-socials">
            <a
              href={SOCIAL.github}
              className="nav-social-btn"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Ver perfil de GitHub"
              title="GitHub"
            >
              <BiLogoGithub className="social-icon" aria-hidden="true" />
            </a>
            <a
              href={SOCIAL.youtube}
              className="nav-social-btn nav-social-btn--youtube"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Ver canal de YouTube"
              title="YouTube"
            >
              <BiLogoYoutube className="social-icon" aria-hidden="true" />
            </a>
            <a
              href={SOCIAL.instagram}
              className="nav-social-btn nav-social-btn--instagram"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Ver perfil de Instagram"
              title="Instagram"
            >
              <BiLogoInstagram className="social-icon" aria-hidden="true" />
            </a>
          </div>

          {/* Separador */}
          <div className="nav-divider" aria-hidden="true" />

          {/* ── Dark mode toggle ── */}
          <button
            className="nav-theme-toggle"
            onClick={toggleDark}
            aria-label={dark ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
            title={dark ? 'Modo claro' : 'Modo oscuro'}
          >
            {dark
              ? <BiSun  className="theme-icon theme-icon--sun"  aria-hidden="true" />
              : <BiMoon className="theme-icon theme-icon--moon" aria-hidden="true" />
            }
          </button>

          {/* ── CTA ── */}
          <a href="#contacto" className="nav-button" onClick={close}>
            <BiEnvelope className="btn-icon" aria-hidden="true" /> Contáctame
          </a>
        </div>

        {/* ── Acciones móvil (socials + dark + hamburguesa) ── */}
        <div className="mobile-actions">
          <a
            href={SOCIAL.youtube}
            className="nav-social-btn nav-social-btn--youtube mobile-only"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="YouTube"
          >
            <BiLogoYoutube className="social-icon" aria-hidden="true" />
          </a>
          <a
            href={SOCIAL.instagram}
            className="nav-social-btn nav-social-btn--instagram mobile-only"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Ver perfil de Instagram"
            title="Instagram"
          >
            <BiLogoInstagram className="social-icon" aria-hidden="true" />
          </a>
          <button
            className="nav-theme-toggle mobile-only"
            onClick={toggleDark}
            aria-label={dark ? 'Modo claro' : 'Modo oscuro'}
          >
            {dark
              ? <BiSun  className="theme-icon theme-icon--sun"  aria-hidden="true" />
              : <BiMoon className="theme-icon theme-icon--moon" aria-hidden="true" />
            }
          </button>

          <button
            className={`nav-toggle ${isOpen ? 'open' : ''}`}
            onClick={() => setIsOpen(o => !o)}
            aria-label={isOpen ? 'Cerrar menú' : 'Abrir menú'}
            aria-expanded={isOpen}
            aria-controls="nav-menu"
          >
            <span className="bar" />
            <span className="bar" />
            <span className="bar" />
          </button>
        </div>

      </div>
    </nav>
  );
};