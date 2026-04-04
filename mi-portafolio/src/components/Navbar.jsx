import React, { useState, useEffect } from "react";
import "./Navbar.css";
import {
  BiGridAlt,
  BiNews,
  BiLibrary,
  BiUser,
  BiMicrochip,
  BiEnvelope,
  BiMoon,
  BiSun,
  BiSearch,
  BiMenu,
  BiX,
  BiCodeAlt,
  BiCalculator,
} from "react-icons/bi";
import { BiLogoGithub, BiLogoYoutube, BiLogoInstagram } from "react-icons/bi";
import { Link, useLocation } from "react-router-dom";
import { SearchModal } from "./SearchModal";

/* ─── SEO helper ─── */
export const updateSEO = ({
  title = "Mauricio.dev",
  description = "Portafolio personal de Mauricio — desarrollador web full-stack.",
  url = "https://mauricionoj.com",
  image = "https://mauricionoj.com/og-cover.webp",
  type = "website",
} = {}) => {
  document.title = title;
  const setMeta = (selector, attr, value) => {
    let el = document.querySelector(selector);
    if (!el) {
      el = document.createElement("meta");
      const [attrName] = selector.match(/\[([^\]]+)=/)?.[1]
        ? [selector.match(/\[([^=]+)=/)[1]]
        : ["name"];
      el.setAttribute(attrName, attr);
      document.head.appendChild(el);
    }
    el.setAttribute("content", value);
  };
  setMeta('meta[name="description"]', "description", description);
  setMeta('meta[property="og:title"]', "property og:title", title);
  setMeta('meta[property="og:description"]', "property", description);
  setMeta('meta[property="og:url"]', "property", url);
  setMeta('meta[property="og:image"]', "property", image);
  setMeta('meta[property="og:type"]', "property", type);
  setMeta('meta[property="og:site_name"]', "property", "Mauricio.dev");
  setMeta('meta[name="twitter:card"]', "twitter:card", "summary_large_image");
  setMeta('meta[name="twitter:title"]', "twitter:title", title);
  setMeta(
    'meta[name="twitter:description"]',
    "twitter:description",
    description,
  );
  setMeta('meta[name="twitter:image"]', "twitter:image", image);
  let canonical = document.querySelector('link[rel="canonical"]');
  if (!canonical) {
    canonical = document.createElement("link");
    canonical.setAttribute("rel", "canonical");
    document.head.appendChild(canonical);
  }
  canonical.setAttribute("href", url);
};

const SOCIAL = {
  github: "https://github.com/Mau-Noj",
  youtube: "https://www.youtube.com/@programandoconpepito",
  instagram: "https://www.instagram.com/superpepitopro64/",
};

const NAV_LINKS = [
  { to: "/blog", label: "Blog", icon: BiNews, desc: "Notas del proceso" },
  {
    to: "/proyectos",
    label: "Proyectos",
    icon: BiGridAlt,
    desc: "80+ proyectos de laboratorio",
  },
  {
    to: "/articulos",
    label: "Artículos",
    icon: BiNews,
    desc: "Artículos técnicos",
  },
  {
    to: "/materiales",
    label: "Materiales de Apoyo",
    icon: BiLibrary,
    desc: "Recursos y plantillas",
  },
  {
    to: "/sobre-mi",
    label: "Sobre mí",
    icon: BiUser,
    desc: "Trayectoria y stack técnico",
  },
  {
    to: "/componentes",
    label: "Componentes",
    icon: BiMicrochip,
    desc: "Fichas técnicas duales",
  },
  {
    to: "/software",
    label: "Software",
    icon: BiCodeAlt,
    desc: "Análisis y diseño de sistemas",
  },
  {
    to: "/lab",
    label: "Lab Cuantitativo",
    icon: BiCalculator,
    desc: "Calculadoras & métodos numéricos",
  },
  {
    to: "/db3d",
    label: "DB Engine 3D",
    icon: BiMicrochip,
    desc: "Internals de MySQL/InnoDB",
  },
];

/* ─── Hook dark mode ─── */
const useDarkMode = () => {
  const [dark, setDark] = useState(() => {
    const saved = localStorage.getItem("theme");
    if (saved) return saved === "dark";
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });
  useEffect(() => {
    const root = document.documentElement;
    if (dark) {
      root.setAttribute("data-theme", "dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.removeAttribute("data-theme");
      localStorage.setItem("theme", "light");
    }
  }, [dark]);
  return [dark, () => setDark((d) => !d)];
};

/* ─── FAB radial (solo móvil) ─── */
const MobileFAB = ({ dark, toggleDark, onSearch }) => {
  const [open, setOpen] = useState(false);

  const handle = (fn) => (e) => {
    e.preventDefault();
    e.stopPropagation();
    setOpen(false);
    setTimeout(fn, 100);
  };

  return (
    <div className="mob-fab-wrap">
      {open && (
        <div
          className="mob-fab-backdrop"
          onTouchEnd={() => setOpen(false)}
          onClick={() => setOpen(false)}
        />
      )}

      {/* Acción 0: Tema */}
      <div
        className={`mob-fab-action mob-fab-action--0 ${open ? "mob-fab-action--visible" : ""}`}
        style={{ "--delay": "0s" }}
      >
        {open && (
          <span className="mob-fab-label">
            {dark ? "Modo claro" : "Modo oscuro"}
          </span>
        )}
        <button
          className="mob-fab-btn"
          style={{ color: dark ? "#f59e0b" : "#818cf8" }}
          onTouchEnd={handle(toggleDark)}
          onClick={handle(toggleDark)}
        >
          {dark ? <BiSun /> : <BiMoon />}
        </button>
      </div>

      {/* Acción 1: Buscar */}
      <div
        className={`mob-fab-action mob-fab-action--1 ${open ? "mob-fab-action--visible" : ""}`}
        style={{ "--delay": "0.06s" }}
      >
        {open && <span className="mob-fab-label">Buscar</span>}
        <button
          className="mob-fab-btn"
          style={{ color: "#4B8EFF" }}
          onTouchEnd={handle(onSearch)}
          onClick={handle(onSearch)}
        >
          <BiSearch />
        </button>
      </div>

      {/* Acción 2: Contacto */}
      {/* Acción 2: Contacto */}
      <div
        className={`mob-fab-action mob-fab-action--2 ${open ? "mob-fab-action--visible" : ""}`}
        style={{ "--delay": "0.12s" }}
      >
        {open && <span className="mob-fab-label">Contacto</span>}
        <Link
          to="/contacto"
          className="mob-fab-btn"
          style={{ color: "#4ade80" }}
        >
          <BiEnvelope />
        </Link>
      </div>

      {/* Botón principal */}
      <button
        className={`mob-fab-main ${open ? "mob-fab-main--open" : ""}`}
        onTouchEnd={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setOpen((o) => !o);
        }}
        onClick={(e) => {
          e.stopPropagation();
          setOpen((o) => !o);
        }}
        aria-label="Acciones rápidas"
      >
        {open ? <BiX /> : <BiEnvelope />}
      </button>
    </div>
  );
};

/* ─── Componente principal ─── */
export const Navbar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [dark, toggleDark] = useDarkMode();
  const [searchOpen, setSearchOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setDrawerOpen(false);
  }, [location]);

  useEffect(() => {
    document.body.style.overflow = drawerOpen || searchOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [drawerOpen, searchOpen]);

  useEffect(() => {
    const handler = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        setSearchOpen(true);
      }
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, []);

  const close = () => setDrawerOpen(false);

  return (
    <>
      {/* ── NAVBAR ── */}
      <nav className={`navbar ${scrolled ? "scrolled" : ""}`} role="navigation">
        <div className="navbar-container">
          <button
            className="nav-hamburger"
            onClick={() => setDrawerOpen((o) => !o)}
            aria-label={drawerOpen ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={drawerOpen}
          >
            {drawerOpen ? (
              <BiX className="hamburger-icon" />
            ) : (
              <BiMenu className="hamburger-icon" />
            )}
          </button>

          <Link
            to="/"
            className="navbar-logo"
            onClick={close}
            aria-label="Inicio"
          >
            <img src="/logo.webp" alt="Logo" className="logo-image" />
            Mauricio<span className="logo-accent">.dev</span>
          </Link>

          <div className="nav-spacer" />

          {/* Acciones desktop */}
          <div className="nav-actions nav-actions--desktop">
            <button
              className="nav-icon-btn"
              onClick={() => setSearchOpen(true)}
              aria-label="Buscar (Ctrl+K)"
            >
              <BiSearch />
              <kbd className="nav-kbd">⌘K</kbd>
            </button>
            <button
              className="nav-icon-btn"
              onClick={toggleDark}
              aria-label={dark ? "Modo claro" : "Modo oscuro"}
            >
              {dark ? (
                <BiSun className="icon-sun" />
              ) : (
                <BiMoon className="icon-moon" />
              )}
            </button>
            <Link to="/contacto" className="nav-cta" onClick={close}>
              <BiEnvelope />
              <span className="nav-cta-label">Contacto</span>
            </Link>
          </div>
        </div>
      </nav>

      {/* ── FAB móvil ── */}
      <MobileFAB
        dark={dark}
        toggleDark={toggleDark}
        onSearch={() => setSearchOpen(true)}
      />

      {/* ── OVERLAY ── */}
      <div
        className={`drawer-overlay ${drawerOpen ? "drawer-overlay--on" : ""}`}
        onClick={close}
        aria-hidden="true"
      />

      {/* ── DRAWER ── */}
      <aside
        className={`drawer ${drawerOpen ? "drawer--open" : ""}`}
        aria-label="Menú principal"
      >
        <div className="drawer-head">
          <Link to="/" className="drawer-logo" onClick={close}>
            <img src="/logo.webp" alt="Logo" className="drawer-logo-img" />
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
        <div className="drawer-sep" />
        <nav className="drawer-nav">
          <p className="drawer-nav-label">Navegación</p>
          {NAV_LINKS.map(({ to, label, icon: Icon, desc }) => (
            <Link
              key={to}
              to={to}
              className={`drawer-link ${location.pathname.startsWith(to) ? "drawer-link--active" : ""}`}
              onClick={close}
            >
              <span className="drawer-link-icon">
                <Icon />
              </span>
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
        <div className="drawer-footer">
          <p className="drawer-footer-note">superpepitopro0101@gmail.com</p>
        </div>
      </aside>

      <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
};
