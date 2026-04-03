// src/views/Home.jsx
import React, { useEffect, useRef, useState } from "react";
import "./Home.css";

/* ── DATA ── */
const STACK = [
  {
    icon: "⚛",
    name: "React / Next.js",
    desc: "Interfaces modernas, SSR, App Router y componentes reutilizables",
    pct: 92,
    color: "#4B8EFF",
  },
  {
    icon: "🟢",
    name: "Node.js",
    desc: "APIs REST, microservicios y backend robusto con Express o Fastify",
    pct: 88,
    color: "#4ade80",
  },
  {
    icon: "🐘",
    name: "PostgreSQL",
    desc: "Bases de datos relacionales, consultas optimizadas y migraciones",
    pct: 80,
    color: "#a78bfa",
  },
  {
    icon: "☁",
    name: "Cloud & DevOps",
    desc: "AWS, Vercel, Docker, CI/CD y despliegues automatizados",
    pct: 75,
    color: "#38bdf8",
  },
  {
    icon: "🎨",
    name: "UI / UX Design",
    desc: "Figma, Tailwind CSS, sistemas de diseño y accesibilidad",
    pct: 85,
    color: "#f472b6",
  },
  {
    icon: "🔒",
    name: "Seguridad Web",
    desc: "Autenticación, JWT, OAuth 2.0 y buenas prácticas de seguridad",
    pct: 78,
    color: "#fb923c",
  },
];

const SOCIALS = [
  {
    href: "https://www.linkedin.com/in/brandon-mauricio-noj-romero-38b4701b6/",
    neon: "#0a66c2",
    label: "LinkedIn",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    href: "https://github.com/Mau-Noj",
    neon: "#e2e8f0",
    label: "GitHub",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.009-.868-.013-1.703-2.782.603-3.369-1.342-3.369-1.342-.454-1.154-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0 1 12 6.836a9.59 9.59 0 0 1 2.504.337c1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
      </svg>
    ),
  },
  {
    href: "https://www.youtube.com/@programandoconpepito",
    neon: "#ff4444",
    label: "YouTube",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    ),
  },
  {
    href: "https://instagram.com/superpepitopro64",
    neon: "#e1306c",
    label: "Instagram",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
      </svg>
    ),
  },
];

const SERVICES = [
  {
    num: "01",
    title: "Desarrollo Web Full-Stack",
    desc: "Aplicaciones web completas, desde el diseño de la base de datos hasta la interfaz. Rápidas, seguras y escalables desde el primer día.",
  },
  {
    num: "02",
    title: "APIs & Integraciones",
    desc: "Diseño y desarrollo de APIs REST o GraphQL. Integración con servicios de pago, CRMs, plataformas de terceros y más.",
  },
  {
    num: "03",
    title: "E-Commerce & Tiendas",
    desc: "Soluciones de comercio electrónico a medida, con pasarelas de pago, gestión de inventario y experiencias de compra optimizadas.",
  },
  {
    num: "04",
    title: "Optimización & Performance",
    desc: "Auditorías de velocidad, Core Web Vitals, SEO técnico y refactorización de código legado para máximo rendimiento.",
  },
  {
    num: "05",
    title: "Consultoría Técnica",
    desc: "Arquitectura de proyectos, elección del stack tecnológico y revisión de código. Te ayudo a tomar las decisiones correctas.",
  },
  {
    num: "06",
    title: "Mantenimiento & Soporte",
    desc: "Mantenimiento continuo, actualizaciones de seguridad, monitoreo y soporte técnico para que tu aplicación siempre funcione.",
  },
];

const PROJECTS = [
  {
    tag: "Web App",
    title: "QuímicaAnalizador",
    desc: "Herramienta web para análisis de compuestos químicos con visualización interactiva de moléculas y balanceo de ecuaciones.",
    stack: ["React", "Python", "Django"],
    neon: "#4B8EFF",
    link: "https://github.com/Mau-Noj",
  },
  {
    tag: "Mobile",
    title: "CumpleañosAmiga",
    desc: "App mobile con recordatorios personalizados, cuenta regresiva animada y generador de mensajes.",
    stack: ["React Native", "Firebase"],
    neon: "#f472b6",
    link: "https://github.com/Mau-Noj",
  },
  {
    tag: "IoT / Hardware",
    title: "Monitor Ambiental RPi",
    desc: "Sistema de monitoreo de temperatura, humedad y calidad del aire con dashboard en tiempo real sobre Raspberry Pi.",
    stack: ["Python", "RPi", "Docker"],
    neon: "#4ade80",
    link: "https://github.com/Mau-Noj",
  },
];

const POSTS = [
  {
    date: "Mar 2025",
    tag: "ADS",
    icon: "📐",
    title: "Cómo diseñar un diagrama de clases sin morir en el intento",
    desc: "Los errores más comunes al modelar con UML y cómo evitarlos desde el primer borrador.",
    neon: "#a78bfa",
    link: "https://www.youtube.com/@programandoconpepito",
  },
  {
    date: "Feb 2025",
    tag: "DevOps",
    icon: "🐳",
    title: "Docker desde cero para proyectos universitarios",
    desc: "Guía práctica para contenerizar tu proyecto de laboratorio sin necesitar un servidor dedicado.",
    neon: "#38bdf8",
    link: "https://www.youtube.com/@programandoconpepito",
  },
  {
    date: "Ene 2025",
    tag: "IoT",
    icon: "🍓",
    title: "RPi5 como servidor de desarrollo: vale la pena?",
    desc: "Benchmark real, casos de uso y configuración mínima para correr tu stack completo en una Raspberry Pi 5.",
    neon: "#4ade80",
    link: "https://www.youtube.com/@programandoconpepito",
  },
];

const TESTIMONIALS = [
  {
    name: "Ana García",
    role: "Estudiante USAC · ADS 2",
    text: "Los laboratorios de Brandon son los únicos donde entendí realmente cómo funciona RUP. Explica con ejemplos reales, no solo teoría.",
    neon: "#4B8EFF",
    initial: "AG",
    roleType: "student",
    university: "USAC",
    universityColor: "#4B8EFF",
  },
  {
    name: "Carlos Méndez",
    role: "Desarrollador Jr.",
    text: "El canal de YouTube me salvó en varios proyectos. Los videos de UML son concisos y van directo al problema.",
    neon: "#f472b6",
    initial: "CM",
    roleType: "developer",
    university: null,
    universityColor: null,
  },
  {
    name: "Diego Fuentes",
    role: "Graduando · Ing. Sistemas",
    text: "Me asesoró en la arquitectura de mi proyecto de graduación. En una sesión resolvimos problemas que llevaban semanas bloqueados.",
    neon: "#4ade80",
    initial: "DF",
    roleType: "engineer",
    university: "USAC",
    universityColor: "#4ade80",
  },
  {
    name: "Laura Pérez",
    role: "Estudiante · Ing. Informática",
    text: "Los tutoriales de Docker me ayudaron a entregar mi proyecto final sin complicaciones. Claros, directos y con ejemplos del mundo real.",
    neon: "#a78bfa",
    initial: "LP",
    roleType: "student",
    university: "URL",
    universityColor: "#a78bfa",
  },
  {
    name: "Mario Castillo",
    role: "Full-Stack Developer",
    text: "La forma en que explica la arquitectura de microservicios es increíble. Lo apliqué directamente en mi trabajo y mejoró la calidad del código.",
    neon: "#38bdf8",
    initial: "MC",
    roleType: "developer",
    university: null,
    universityColor: null,
  },
];

/* ── ÍCONOS DE ROL ── */
const ROLE_ICONS = {
  student: (
    <svg
      width="13"
      height="13"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
      <path d="M6 12v5c3 3 9 3 12 0v-5" />
    </svg>
  ),
  developer: (
    <svg
      width="13"
      height="13"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </svg>
  ),
  engineer: (
    <svg
      width="13"
      height="13"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 2L2 7l10 5 10-5-10-5z" />
      <path d="M2 17l10 5 10-5" />
      <path d="M2 12l10 5 10-5" />
    </svg>
  ),
};

/* ── RING CHART ── */
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

/* ── TARJETA PC/TERMINAL (Testimonios) ── */
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

/* ── CAROUSEL TESTIMONIOS ── */
const TestiCarousel = ({ items }) => {
  const carouselRef = React.useRef(null);
  const [current, setCurrent] = React.useState(0);
  const [paused, setPaused] = React.useState(false);
  const PER_VIEW = 3;
  const max = Math.max(0, items.length - PER_VIEW);

  React.useEffect(() => {
    const el = carouselRef.current;
    if (!el || !el.children[0]) return;
    const gap = parseFloat(getComputedStyle(el).gap) || 19.2;
    const cardW = el.children[0].offsetWidth + gap;
    el.scrollTo({ left: current * cardW, behavior: "smooth" });
  }, [current]);

  React.useEffect(() => {
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

/* ── CAROUSEL POSTS (estilo terminal) ── */
const PostCarousel = ({ items }) => {
  const carouselRef = React.useRef(null);
  const intervalRef = React.useRef(null);
  const [current, setCurrent] = React.useState(0);

  const total = items.length;

  const scrollTo = React.useCallback((idx) => {
    const el = carouselRef.current;
    if (!el || !el.children[0]) return;
    const gap = parseFloat(getComputedStyle(el).gap) || 19.2;
    const cardW = el.children[0].offsetWidth + gap;
    el.scrollTo({ left: idx * cardW, behavior: "smooth" });
  }, []);

  React.useEffect(() => {
    scrollTo(current);
  }, [current, scrollTo]);

  const startTimer = React.useCallback(() => {
    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setCurrent((prev) => (prev + 1) % total);
    }, 10000);
  }, [total]);

  React.useEffect(() => {
    startTimer();
    return () => clearInterval(intervalRef.current);
  }, [startTimer]);

  const pause = () => clearInterval(intervalRef.current);
  const resume = () => startTimer();

  return (
    <div
      className="post-carousel-wrap"
      onMouseEnter={pause}
      onMouseLeave={resume}
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
            {/* Barra superior estilo terminal */}
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

            {/* Cuerpo con prompt */}
            <div className="post-card-body">
              <div className="post-card-prompt-row">
                <span className="post-card-prompt">&gt;</span>
                <h3 className="post-title">{title}</h3>
              </div>
              <p className="post-desc">{desc}</p>
            </div>

            {/* Barra inferior */}
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

      {/* Dots de navegación */}
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

/* ── MAIN COMPONENT ── */
export const Home = () => {
  const blobRef = useRef(null);
  const [overlayOpen, setOverlayOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = overlayOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [overlayOpen]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!blobRef.current) return;
      blobRef.current.style.transform = `translate(
        ${(e.clientX - window.innerWidth * 0.7) * 0.04}px,
        ${e.clientY * 0.04}px
      )`;
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

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
        style={{ "--hero-bg-image": `url('/inicio.png')` }}
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
            <a
              href="https://www.linkedin.com/in/brandon-mauricio-noj-romero-38b4701b6/"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-contact-link"
              style={{ "--sneon": "#0a66c2" }}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </a>
            <a
              href="https://github.com/Mau-Noj"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-social-link"
              style={{ "--sneon": "#e2e8f0" }}
              aria-label="GitHub"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.009-.868-.013-1.703-2.782.603-3.369-1.342-3.369-1.342-.454-1.154-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0 1 12 6.836a9.59 9.59 0 0 1 2.504.337c1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
              </svg>
            </a>
            <a
              href="https://www.youtube.com/@programandoconpepito"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-social-link"
              style={{ "--sneon": "#ff4444" }}
              aria-label="YouTube"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
              </svg>
            </a>
            <a
              href="https://instagram.com/superpepitopro64"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-social-link"
              style={{ "--sneon": "#e1306c" }}
              aria-label="Instagram"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
              </svg>
            </a>
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
            <a
              href="/sobre-mi"
              className="svc-nav-item"
              style={{ "--card-neon": "#4B8EFF" }}
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
                  <circle cx="12" cy="8" r="4" />
                  <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
                </svg>
              </div>
              <div className="svc-nav-body">
                <span className="svc-nav-title">Sobre mí</span>
                <span className="svc-nav-desc">
                  Quién soy, mi historia y estadísticas
                </span>
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

            <a
              href="#proyectos"
              className="svc-nav-item"
              style={{ "--card-neon": "#38bdf8" }}
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
                  <path d="M3 3h7v7H3zM14 3h7v7h-7zM14 14h7v7h-7zM3 14h7v7H3z" />
                </svg>
              </div>
              <div className="svc-nav-body">
                <span className="svc-nav-title">Proyectos</span>
                <span className="svc-nav-desc">Cosas que construí</span>
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

            <a
              href="#blog"
              className="svc-nav-item"
              style={{ "--card-neon": "#fb923c" }}
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
                  <path d="M12 2a10 10 0 1 0 0 20A10 10 0 0 0 12 2z" />
                  <polygon points="10 8 16 12 10 16 10 8" />
                </svg>
              </div>
              <div className="svc-nav-body">
                <span className="svc-nav-title">Blog &amp; YouTube</span>
                <span className="svc-nav-desc">Lo que estoy aprendiendo</span>
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

            <a
              href="#testimonios"
              className="svc-nav-item"
              style={{ "--card-neon": "#f472b6" }}
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
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                </svg>
              </div>
              <div className="svc-nav-body">
                <span className="svc-nav-title">Testimonios</span>
                <span className="svc-nav-desc">Lo que dicen otros</span>
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
          </div>

          {/* Redes sociales en el overlay */}
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
