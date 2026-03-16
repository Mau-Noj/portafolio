import React, { useState, useEffect } from 'react';
import './Navbar.css';
import { BiGridAlt, BiNews, BiLibrary, BiUser, BiMicrochip,
  BiEnvelope, BiMoon, BiSun, BiSearch, BiMenu, BiX, BiCodeAlt,
  BiCalculator } from "react-icons/bi";
import { BiLogoGithub, BiLogoYoutube, BiLogoInstagram } from "react-icons/bi";
import { Link, useLocation } from 'react-router-dom';
import { SearchModal } from './SearchModal';


/* ─── SEO helper ───────────────────────────────────────────── */
export const updateSEO = ({
  title       = 'Mauricio.dev',
  description = 'Portafolio personal de Mauricio — desarrollador web full-stack.',
  url         = 'https://mauricio.dev',
  image       = 'https://mauricio.dev/og-cover.png',
  type        = 'website',
} = {}) => {
  document.title = title;
  const setMeta = (selector, attr, value) => {
    let el = document.querySelector(selector);
    if (!el) {
      el = document.createElement('meta');
      const [attrName] = selector.match(/\[([^\]]+)=/)?.[1]
        ? [selector.match(/\[([^=]+)=/)[1]] : ['name'];
      el.setAttribute(attrName, attr);
      document.head.appendChild(el);
    }
    el.setAttribute('content', value);
  };
  setMeta('meta[name="description"]',         'description',         description);
  setMeta('meta[property="og:title"]',        'property og:title',   title);
  setMeta('meta[property="og:description"]',  'property',            description);
  setMeta('meta[property="og:url"]',          'property',            url);
  setMeta('meta[property="og:image"]',        'property',            image);
  setMeta('meta[property="og:type"]',         'property',            type);
  setMeta('meta[property="og:site_name"]',    'property',            'Mauricio.dev');
  setMeta('meta[name="twitter:card"]',        'twitter:card',        'summary_large_image');
  setMeta('meta[name="twitter:title"]',       'twitter:title',       title);
  setMeta('meta[name="twitter:description"]', 'twitter:description', description);
  setMeta('meta[name="twitter:image"]',       'twitter:image',       image);
  let canonical = document.querySelector('link[rel="canonical"]');
  if (!canonical) {
    canonical = document.createElement('link');
    canonical.setAttribute('rel', 'canonical');
    document.head.appendChild(canonical);
  }
  canonical.setAttribute('href', url);
};

/* ─── Config ───────────────────────────────────────────────── */
const SOCIAL = {
  github:    'https://github.com/Mau-Noj',
  youtube:   'https://www.youtube.com/@programandoconpepito',
  instagram: 'https://www.instagram.com/superpepitopro64/',
};

const NAV_LINKS = [
  { to: '/blog',        label: 'Blog',                icon: BiNews,        desc: 'Notas del proceso'              },
  { to: '/proyectos',   label: 'Proyectos',           icon: BiGridAlt,     desc: '80+ proyectos de laboratorio'   },
  { to: '/articulos',   label: 'Artículos',           icon: BiNews,        desc: 'Artículos técnicos'             },
  { to: '/materiales',  label: 'Materiales de Apoyo', icon: BiLibrary,     desc: 'Recursos y plantillas'          },
  { to: '/sobre-mi',    label: 'Sobre mí',            icon: BiUser,        desc: 'Trayectoria y stack técnico'    },
  { to: '/componentes', label: 'Componentes',         icon: BiMicrochip,   desc: 'Fichas técnicas duales'         },
  { to: '/software',    label: 'Software',            icon: BiCodeAlt,     desc: 'Análisis y diseño de sistemas'  },
  { to: '/lab',         label: 'Lab Cuantitativo',    icon: BiCalculator,  desc: 'Calculadoras & métodos numéricos' },
];
/* ─── Hook: dark mode ──────────────────────────────────────── */
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

/* ─── Componente ───────────────────────────────────────────── */
export const Navbar = () => {
  const [drawerOpen,  setDrawerOpen]  = useState(false);
  const [scrolled,    setScrolled]    = useState(false);
  const [dark,        toggleDark]     = useDarkMode();
  const [searchOpen,  setSearchOpen]  = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Cierra drawer al navegar
  useEffect(() => { setDrawerOpen(false); }, [location]);

  // Bloquear scroll cuando drawer o search están abiertos
  useEffect(() => {
    document.body.style.overflow = (drawerOpen || searchOpen) ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [drawerOpen, searchOpen]);

  // Ctrl+K
  useEffect(() => {
    const handler = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setSearchOpen(true);
      }
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, []);

  const close = () => setDrawerOpen(false);

  return (
    <>
      {/* ══════════════ NAVBAR STRIP ══════════════ */}
      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`} role="navigation">
        <div className="navbar-container">

          {/* Hamburguesa */}
          <button
            className="nav-hamburger"
            onClick={() => setDrawerOpen(o => !o)}
            aria-label={drawerOpen ? 'Cerrar menú' : 'Abrir menú'}
            aria-expanded={drawerOpen}
          >
            {drawerOpen
              ? <BiX    className="hamburger-icon" />
              : <BiMenu className="hamburger-icon" />
            }
          </button>

          {/* Logo */}
          <Link to="/" className="navbar-logo" onClick={close} aria-label="Inicio">
            <img src="/logo.png" alt="Logo" className="logo-image" />
            Mauricio<span className="logo-accent">.dev</span>
          </Link>

          {/* Spacer */}
          <div className="nav-spacer" />

          {/* Acciones derechas */}
          <div className="nav-actions">
            <button
              className="nav-icon-btn"
              onClick={() => setSearchOpen(true)}
              aria-label="Buscar (Ctrl+K)"
              title="Buscar (Ctrl+K)"
            >
              <BiSearch />
              <kbd className="nav-kbd">⌘K</kbd>
            </button>

            <button
              className="nav-icon-btn"
              onClick={toggleDark}
              aria-label={dark ? 'Modo claro' : 'Modo oscuro'}
              title={dark ? 'Modo claro' : 'Modo oscuro'}
            >
              {dark
                ? <BiSun  className="icon-sun"  />
                : <BiMoon className="icon-moon" />
              }
            </button>

            <Link to="/contacto" className="nav-cta" onClick={close}>
              <BiEnvelope />
              <span className="nav-cta-label">Contacto</span>
            </Link>
          </div>

        </div>
      </nav>

      {/* ══════════════ OVERLAY ══════════════ */}
      <div
        className={`drawer-overlay ${drawerOpen ? 'drawer-overlay--on' : ''}`}
        onClick={close}
        aria-hidden="true"
      />

      {/* ══════════════ DRAWER PANEL ══════════════ */}
      <aside className={`drawer ${drawerOpen ? 'drawer--open' : ''}`} aria-label="Menú principal">

        {/* Cabecera del drawer */}
        <div className="drawer-head">
          <Link to="/" className="drawer-logo" onClick={close}>
            <img src="/logo.png" alt="Logo" className="drawer-logo-img" />
            <div>
              <span className="drawer-logo-name">Mauricio</span>
              <span className="drawer-logo-accent">.dev</span>
              <p className="drawer-logo-sub">Ing. Sistemas · USAC</p>
            </div>
          </Link>
          <button className="drawer-close" onClick={close} aria-label="Cerrar">
            <BiX />
          </button>
        </div>

        {/* Separador */}
        <div className="drawer-sep" />

        {/* Links de navegación */}
        <nav className="drawer-nav">
          <p className="drawer-nav-label">Navegación</p>
          {NAV_LINKS.map(({ to, label, icon: Icon, desc }) => (
            <Link
              key={to}
              to={to}
              className={`drawer-link ${location.pathname.startsWith(to) ? 'drawer-link--active' : ''}`}
              onClick={close}
            >
              <span className="drawer-link-icon"><Icon /></span>
              <span className="drawer-link-body">
                <span className="drawer-link-label">{label}</span>
                <span className="drawer-link-desc">{desc}</span>
              </span>
              {location.pathname.startsWith(to) && (
                <span className="drawer-link-dot" aria-hidden="true" />
              )}
            </Link>
          ))}
        </nav>

        <div className="drawer-sep" />

        {/* Redes sociales */}
        <div className="drawer-socials">
          <p className="drawer-nav-label">Redes</p>
          <a href={SOCIAL.github} target="_blank" rel="noopener noreferrer" className="drawer-social">
            <BiLogoGithub className="drawer-social-icon" />
            <span>GitHub</span>
            <span className="drawer-social-handle">@Mau-Noj</span>
          </a>
          <a href={SOCIAL.youtube} target="_blank" rel="noopener noreferrer" className="drawer-social drawer-social--yt">
            <BiLogoYoutube className="drawer-social-icon" />
            <span>YouTube</span>
            <span className="drawer-social-handle">@programandoconpepito</span>
          </a>
          <a href={SOCIAL.instagram} target="_blank" rel="noopener noreferrer" className="drawer-social drawer-social--ig">
            <BiLogoInstagram className="drawer-social-icon" />
            <span>Instagram</span>
            <span className="drawer-social-handle">@superpepitopro64</span>
          </a>
        </div>

        <div className="drawer-sep" />

        {/* CTA inferior */}
        <div className="drawer-footer">
          <p className="drawer-footer-note">brandonromero1964@gmail.com</p>
        </div>

      </aside>

      {/* Search Modal */}
      <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
};