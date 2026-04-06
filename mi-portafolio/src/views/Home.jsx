// src/views/Home.jsx
import React, { useEffect, useRef, useState, useCallback } from "react";
import { useSEO } from "../hooks/useSEO";
import {
  STACK,
  SOCIALS,
  SERVICES,
  PROJECTS,
  POSTS,
  TESTIMONIALS,
  ROLE_ICONS,
} from "../models/home.data.jsx";
import "./Home.css";

// ── RING CHART ────────────────────────────────────────────────
const RingChart = ({ pct, color, size = 60 }) => {
  const svgRef = useRef(null);
  const circleRef = useRef(null);
  const [display, setDisplay] = useState(0);
  const r = (size - 10) / 2;
  const circ = 2 * Math.PI * r;

  useEffect(() => {
    const svg = svgRef.current;
    const el = circleRef.current;
    if (!svg || !el) return;

    el.style.transition = "none";
    el.style.strokeDasharray = `0 ${circ}`;
    setDisplay(0);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            el.style.transition =
              "stroke-dasharray 1.4s cubic-bezier(0.4, 0, 0.2, 1)";
            el.style.strokeDasharray = `${(pct / 100) * circ} ${circ}`;
            const duration = 1400;
            const start = performance.now();
            const tick = (now) => {
              const progress = Math.min((now - start) / duration, 1);
              const eased = 1 - Math.pow(1 - progress, 2);
              setDisplay(Math.round(eased * pct));
              if (progress < 1) requestAnimationFrame(tick);
            };
            requestAnimationFrame(tick);
          });
        });
      },
      { threshold: 0.25 },
    );

    observer.observe(svg);
    return () => observer.disconnect();
  }, [pct, circ]);

  return (
    <svg
      ref={svgRef}
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      className="ring-chart"
      style={{ overflow: "visible" }}
    >
      <circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        fill="none"
        stroke="rgba(255,255,255,0.06)"
        strokeWidth="4.5"
      />
      <circle
        ref={circleRef}
        cx={size / 2}
        cy={size / 2}
        r={r}
        fill="none"
        stroke={color}
        strokeWidth="4.5"
        strokeLinecap="round"
        strokeDasharray={`0 ${circ}`}
        transform={`rotate(-90 ${size / 2} ${size / 2})`}
      />
      <text
        x={size / 2}
        y={size / 2}
        textAnchor="middle"
        dominantBaseline="central"
        fill={color}
        fontSize="11"
        fontFamily="'JetBrains Mono', monospace"
        fontWeight="600"
      >
        {display}%
      </text>
    </svg>
  );
};

// ── TARJETA TESTIMONIO (estilo terminal) ──────────────────────
const TestiCard = ({
  name,
  role,
  text,
  neon,
  initial,
  roleType,
  university,
  universityColor,
}) => (
  <div className="testi-card-pc" style={{ "--pneon": neon }}>
    <div className="testi-pc-bar">
      <div className="testi-pc-dots">
        <span className="testi-pc-dot testi-pc-dot--red" />
        <span className="testi-pc-dot testi-pc-dot--yellow" />
        <span className="testi-pc-dot testi-pc-dot--green" />
      </div>
      <span className="testi-pc-filename">testimonial.log</span>
      <div className="testi-pc-badge" style={{ "--bneon": neon }}>
        <span className="testi-pc-role-icon">
          {ROLE_ICONS[roleType] ?? ROLE_ICONS.developer}
        </span>
        {university && (
          <span
            className="testi-pc-uni"
            style={{ "--unineon": universityColor ?? neon }}
          >
            {university}
          </span>
        )}
      </div>
    </div>

    <div className="testi-pc-body">
      <span className="testi-pc-prompt">{">"}</span>
      <p className="testi-pc-quote">"{text}"</p>
    </div>

    <div className="testi-pc-footer">
      <div className="testi-avatar" style={{ "--pneon": neon }}>
        {initial}
      </div>
      <div className="testi-pc-info">
        <span className="testi-name">{name}</span>
        <span className="testi-role">{role}</span>
      </div>
      <span className="testi-pc-status">
        <span className="testi-pc-status-dot" />
        verified
      </span>
    </div>
  </div>
);

// ── CAROUSEL TESTIMONIOS ──────────────────────────────────────
const TestiCarousel = ({ items }) => {
  const carouselRef = useRef(null);
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const PER_VIEW = 3;
  const max = Math.max(0, items.length - PER_VIEW);

  useEffect(() => {
    const el = carouselRef.current;
    if (!el || !el.children[0]) return;
    const gap = parseFloat(getComputedStyle(el).gap) || 19.2;
    const cardW = el.children[0].offsetWidth + gap;
    el.scrollTo({ left: current * cardW, behavior: "smooth" });
  }, [current]);

  useEffect(() => {
    if (items.length <= PER_VIEW || paused) return;
    const id = setInterval(() => {
      setCurrent((prev) => (prev >= max ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(id);
  }, [paused, items.length, max]);

  return (
    <div className="testi-carousel-wrap">
      <div
        ref={carouselRef}
        className="testi-carousel"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        {items.map((t) => (
          <TestiCard key={t.name} {...t} />
        ))}
      </div>

      {items.length > PER_VIEW && (
        <div className="testi-dots">
          {Array.from({ length: max + 1 }).map((_, i) => (
            <button
              key={i}
              className={`testi-dot ${current === i ? "testi-dot--active" : ""}`}
              onClick={() => setCurrent(i)}
              aria-label={`Ir al grupo ${i + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

// ── CAROUSEL POSTS ────────────────────────────────────────────
const PostCarousel = ({ items }) => {
  const carouselRef = useRef(null);
  const intervalRef = useRef(null);
  const [current, setCurrent] = useState(0);
  const total = items.length;

  const scrollTo = useCallback((idx) => {
    const el = carouselRef.current;
    if (!el || !el.children[0]) return;
    const gap = parseFloat(getComputedStyle(el).gap) || 19.2;
    const cardW = el.children[0].offsetWidth + gap;
    el.scrollTo({ left: idx * cardW, behavior: "smooth" });
  }, []);

  useEffect(() => {
    scrollTo(current);
  }, [current, scrollTo]);

  const startTimer = useCallback(() => {
    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setCurrent((prev) => (prev + 1) % total);
    }, 10000);
  }, [total]);

  useEffect(() => {
    startTimer();
    return () => clearInterval(intervalRef.current);
  }, [startTimer]);

  return (
    <div
      className="post-carousel-wrap"
      onMouseEnter={() => clearInterval(intervalRef.current)}
      onMouseLeave={startTimer}
    >
      <div ref={carouselRef} className="post-carousel">
        {items.map(({ date, tag, icon, title, desc, neon, link, filename }) => (
          <a
            key={title}
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="post-card post-card--carousel"
            style={{ "--pneon": neon }}
          >
            <div className="post-card-bar">
              <div className="post-card-dots">
                <span className="post-card-dot post-card-dot--red" />
                <span className="post-card-dot post-card-dot--yellow" />
                <span className="post-card-dot post-card-dot--green" />
              </div>
              <span className="post-card-filename">
                {filename ?? `${tag.toLowerCase()}.log`}
              </span>
              <span className="post-tag">{tag}</span>
            </div>

            <div className="post-card-body">
              <div className="post-card-prompt-row">
                <span className="post-card-prompt">&gt;</span>
                <h3 className="post-title">{title}</h3>
              </div>
              <p className="post-desc">{desc}</p>
            </div>

            <div className="post-card-footer">
              <span className="post-date">{date}</span>
              <div className="post-card-status">
                <span className="post-card-status-dot" />
                published
              </div>
              <span className="post-read">Leer más →</span>
            </div>
          </a>
        ))}
      </div>

      {total > 1 && (
        <div className="testi-dots">
          {items.map((_, i) => (
            <button
              key={i}
              className={`testi-dot ${current === i ? "testi-dot--active" : ""}`}
              onClick={() => {
                setCurrent(i);
                startTimer();
              }}
              aria-label={`Post ${i + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

// ── PAGE LOADER (fallback Suspense) ───────────────────────────
// (Se mantiene aquí por si se reutiliza, pero el principal está en App.jsx)

// ── MAIN COMPONENT ────────────────────────────────────────────
export const Home = () => {
  useSEO({
    title: "Mauricio Noj · Desarrollador Web",
    description:
      "Portafolio de Brandon Mauricio Noj — desarrollador web full-stack desde Guatemala. React, Node.js, Docker, IoT.",
    url: "https://mauricionoj.com",
  });

  const blobRef = useRef(null);
  const [overlayOpen, setOverlayOpen] = useState(false);

  // Bloquear scroll cuando el overlay está abierto
  useEffect(() => {
    document.body.style.overflow = overlayOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [overlayOpen]);

  // Efecto parallax del blob — con throttle via requestAnimationFrame
  useEffect(() => {
    let rafId = null;
    const handleMouseMove = (e) => {
      if (rafId) return;
      rafId = requestAnimationFrame(() => {
        if (blobRef.current) {
          blobRef.current.style.transform = `translate(
            ${(e.clientX - window.innerWidth * 0.7) * 0.04}px,
            ${e.clientY * 0.04}px
          )`;
        }
        rafId = null;
      });
    };
    // passive: true → el browser puede optimizar el scroll en paralelo
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  // Animaciones de aparición por scroll
  useEffect(() => {
    const reveals = document.querySelectorAll(".reveal");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, i) => {
          if (entry.isIntersecting) {
            setTimeout(() => entry.target.classList.add("visible"), i * 60);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 },
    );
    reveals.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <div className="glow-blob" ref={blobRef} />

      {/* ── HERO ── */}
      <div
        className="hero-bg-section"
        style={{ "--hero-bg-image": `url('/inicio.webp')` }}
      >
        <section className="hero">
          <h1 className="hero-title">
            <em className="hero-neon-cyan">Como hilos de tejido digital,</em>
            <br />
            <span className="hero-solid">
              exploro el universo a través del{" "}
            </span>
            <em className="hero-neon-pink">software</em>
            <br />
            <span className="hero-solid">y comparto </span>
            <em className="hero-neon-green">sabiduría en cada paso.</em>
          </h1>
          <div className="hero-actions">
            <button
              className="btn-primary"
              onClick={() => setOverlayOpen(true)}
            >
              Ver más
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </button>
            <a href="/sobre-mi" className="btn-ghost">
              Sobre mí
            </a>
          </div>
          <div className="scroll-hint">
            <div className="scroll-line" />
            Conoce más sobre mí
          </div>
        </section>
      </div>

      {/* ── BLOG ── */}
      <hr className="full-divider" />
      <section className="section" id="blog">
        <p className="section-label reveal">Blog &amp; YouTube</p>
        <h2
          className="about-title reveal"
          style={{ maxWidth: "600px", marginBottom: "3rem" }}
        >
          <span className="neon-purple">Explorando</span>
          <div className="title-row-bottom">
            <span className="neon-purple">nuevos</span>
            <em className="font-script neon-magenta">Universos</em>
          </div>
        </h2>
        <PostCarousel items={POSTS} />
      </section>

      {/* ── TESTIMONIALS ── */}
      <hr className="full-divider" />
      <section className="section" id="testimonios">
        <p className="section-label reveal">Testimonios</p>
        <h2
          className="about-title reveal"
          style={{ maxWidth: "600px", marginBottom: "3rem" }}
        >
          <span className="neon-purple">Ecos del</span>
          <div className="title-row-bottom">
            <em className="font-script neon-purple">Sistema</em>
          </div>
        </h2>
        <TestiCarousel items={TESTIMONIALS} />
      </section>

      {/* ── FOOTER ── */}
      <hr className="full-divider" />
      <footer className="site-footer" id="contacto">
        <div className="footer-quote">
          <span className="footer-quote-moon">☽</span>
          <p>
            La luna ha inspirado a muchos poetas…
            <br />
            <em>que tu análisis inspire grandes sistemas.</em>
          </p>
        </div>

        <div className="footer-divider" />

        <div className="footer-bottom">
          <a href="#" className="footer-brand">
            Mauricio<span>.dev</span>
          </a>
          <p className="footer-copy">
            © {new Date().getFullYear()} Mauricio Noj · Hecho en Guatemala 🇬🇹
          </p>
          <nav className="footer-socials">
            {SOCIALS.map(({ href, neon, label, icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="footer-social-link"
                style={{ "--sneon": neon }}
                aria-label={label}
              >
                {icon}
              </a>
            ))}
          </nav>
        </div>
      </footer>

      {/* ── OVERLAY ── */}
      <div className={`svc-overlay ${overlayOpen ? "svc-overlay--open" : ""}`}>
        <div className="svc-pill-nav">
          <span className="svc-pill-brand">
            Mauricio<em>.dev</em>
          </span>
          <span className="svc-pill-label">Navegación</span>
          <button
            className="svc-close-btn"
            onClick={() => setOverlayOpen(false)}
            aria-label="Cerrar"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        <div className="svc-overlay-body">
          <p className="svc-overlay-eyebrow">¿A dónde quieres ir?</p>

          <div className="svc-overlay-nav">
            {[
              {
                href: "/sobre-mi",
                neon: "#4B8EFF",
                title: "Sobre mí",
                desc: "Quién soy, mi historia y estadísticas",
                icon: (
                  <>
                    <circle cx="12" cy="8" r="4" />
                    <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
                  </>
                ),
              },
              {
                href: "#proyectos",
                neon: "#38bdf8",
                title: "Proyectos",
                desc: "Cosas que construí",
                icon: (
                  <path d="M3 3h7v7H3zM14 3h7v7h-7zM14 14h7v7h-7zM3 14h7v7H3z" />
                ),
              },
              {
                href: "#blog",
                neon: "#fb923c",
                title: "Blog & YouTube",
                desc: "Lo que estoy aprendiendo",
                icon: (
                  <>
                    <path d="M12 2a10 10 0 1 0 0 20A10 10 0 0 0 12 2z" />
                    <polygon points="10 8 16 12 10 16 10 8" />
                  </>
                ),
              },
              {
                href: "#testimonios",
                neon: "#f472b6",
                title: "Testimonios",
                desc: "Lo que dicen otros",
                icon: (
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                ),
              },
            ].map(({ href, neon, title, desc, icon }) => (
              <a
                key={title}
                href={href}
                className="svc-nav-item"
                style={{ "--card-neon": neon }}
                onClick={() => setOverlayOpen(false)}
              >
                <div className="svc-nav-icon">
                  <svg
                    width="28"
                    height="28"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    {icon}
                  </svg>
                </div>
                <div className="svc-nav-body">
                  <span className="svc-nav-title">{title}</span>
                  <span className="svc-nav-desc">{desc}</span>
                </div>
                <svg
                  className="svc-nav-arrow"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </a>
            ))}
          </div>

          <div className="svc-overlay-socials">
            <p className="svc-overlay-socials-label">Redes</p>
            <div className="svc-overlay-socials-row">
              {SOCIALS.map(({ href, neon, label, icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="svc-social-pill"
                  style={{ "--sneon": neon }}
                  aria-label={label}
                >
                  {icon}
                  <span>{label}</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
