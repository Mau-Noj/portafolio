// src/views/BlogSection.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSEO } from "../hooks/useSEO";
import "./BlogSection.css";

// ── Data de entradas ──────────────────────────────────────────
const POSTS = [
  {
    id: 1,
    date: "2026-03-01",
    dateLabel: "01 MAR 2026",
    category: "aprendizajes",
    catLabel: "#aprendizajes",
    readMin: 3,
    status: "consolidado",
    title: "Por qué calculo primero antes de armar cualquier circuito",
    excerpt:
      "Quemé un LED el primer día. No porque no supiera que necesitaba una resistencia, sino porque no me tomé 30 segundos en hacer la cuenta. Desde entonces tengo una regla: si no puedo predecir el resultado antes de encender, no enciendo.",
    tags: ["Electricidad", "Método", "Errores"],
  },
  {
    id: 2,
    date: "2026-02-20",
    dateLabel: "20 FEB 2026",
    category: "hardware",
    catLabel: "#hardware",
    readMin: 5,
    status: "en-proceso",
    title: "El RPi5 no es una computadora de juguete",
    excerpt:
      "Cuando lo compré pensé que sería otro experimento de fin de semana. Ocho meses después es mi servidor de desarrollo, host de modelos ONNX y controlador de dos proyectos CNC simultáneos. Esto es lo que nadie te dice sobre trabajar en serio con hardware embebido.",
    tags: ["RPi5", "Linux", "Embedded"],
  },
  {
    id: 3,
    date: "2026-02-10",
    dateLabel: "10 FEB 2026",
    category: "ia",
    catLabel: "#ia",
    readMin: 7,
    status: "exploracion",
    title: "YOLOv8 en hardware sin GPU: expectativas vs realidad",
    excerpt:
      "La promesa: detección en tiempo real en dispositivos edge. La realidad: 4 FPS con el modelo base, 15 FPS con el nano, y una semana de optimización para llegar ahí. Documenté cada paso, incluyendo los callejones sin salida.",
    tags: ["YOLOv8", "ONNX", "Optimización"],
  },
  {
    id: 4,
    date: "2026-01-28",
    dateLabel: "28 ENE 2026",
    category: "notas",
    catLabel: "#notas",
    readMin: 2,
    status: "consolidado",
    title: "Nota rápida: diferencia entre paso a paso y servo",
    excerpt:
      "No son intercambiables. Un servo quiere posición, un stepper quiere pasos. Suena obvio hasta que intentas hacer un plotter con servos y te preguntas por qué el trazo tiembla. Apunte corto para no olvidarlo.",
    tags: ["Motores", "Hardware", "CNC"],
  },
  {
    id: 5,
    date: "2026-01-15",
    dateLabel: "15 ENE 2026",
    category: "aprendizajes",
    catLabel: "#aprendizajes",
    readMin: 4,
    status: "en-proceso",
    title: "Cursando dos ingenierías: sistemas y ambiental",
    excerpt:
      "La gente me pregunta si no es demasiado. Probablemente sí. Pero hay una intersección que nadie está trabajando: sensores IoT aplicados a monitoreo ambiental real, con ML encima. Ahí es donde quiero estar.",
    tags: ["Carrera", "IoT", "Ambiental"],
  },
  {
    id: 6,
    date: "2025-12-20",
    dateLabel: "20 DIC 2025",
    category: "hardware",
    catLabel: "#hardware",
    readMin: 6,
    status: "consolidado",
    title: "Construí un plotter con lectoras de CD viejas",
    excerpt:
      "Costo total: $5 en tornillos. Todo lo demás salió de dispositivos que iban a la basura. Los motores de las lectoras de CD tienen una precisión brutal — mejor que muchos CNC baratos del mercado. El proceso fue un desastre ordenado.",
    tags: ["CNC", "Reciclado", "Maker"],
  },
];

const FILTERS = [
  { key: "all", label: "Todo" },
  { key: "hardware", label: "#hardware" },
  { key: "ia", label: "#ia" },
  { key: "aprendizajes", label: "#aprendizajes" },
  { key: "notas", label: "#notas" },
];

const STATUS_MAP = {
  consolidado: { label: "Consolidado", dot: "●" },
  "en-proceso": { label: "En proceso", dot: "◑" },
  exploracion: { label: "Exploración", dot: "○" },
};

// ── Componente ────────────────────────────────────────────────
export const BlogSection = () => {
  useSEO({
    title: "Blog",
    description:
      "Notas del proceso — hardware, IA, aprendizajes y experiencias construyendo proyectos reales.",
    url: "https://mauricionoj.com/blog",
  });
  const [filter, setFilter] = useState("all");
  const navigate = useNavigate();

  const visible =
    filter === "all" ? POSTS : POSTS.filter((p) => p.category === filter);

  return (
    <div className="blog-wrapper">
      <div className="blog">
        {/* ── CABECERA ── */}
        <header className="blog__header">
          <div className="blog__header-left">
            <p className="blog__kicker">CUADERNO DE LABORATORIO</p>
            <h1 className="blog__title">
              Notas del
              <br />
              <em>proceso</em>
            </h1>
            <p className="blog__sub">
              Escribo sobre lo que estoy aprendiendo — hardware, IA, errores y
              todo lo que no aparece en los tutoriales. Sin editar demasiado.
              Sin pretender saber más de lo que sé.
            </p>
          </div>

          <div className="blog__header-right">
            <div className="blog__stat">
              <span className="blog__stat-n">{POSTS.length}</span>
              <span className="blog__stat-l">entradas</span>
            </div>
            <div className="blog__stat">
              <span className="blog__stat-n">
                {POSTS.reduce((a, p) => a + p.readMin, 0)}
              </span>
              <span className="blog__stat-l">min de lectura</span>
            </div>
            <div className="blog__stat">
              <span className="blog__stat-n">2025</span>
              <span className="blog__stat-l">desde</span>
            </div>
          </div>
        </header>

        {/* ── SEPARADOR ── */}
        <div className="blog__rule" />

        {/* ── FILTROS ── */}
        <nav className="blog__filters" aria-label="Filtros de categoría">
          {FILTERS.map((f) => (
            <button
              key={f.key}
              className={`blog__filter ${filter === f.key ? "blog__filter--on" : ""}`}
              onClick={() => setFilter(f.key)}
            >
              {f.label}
              <span className="blog__filter-n">
                {f.key === "all"
                  ? POSTS.length
                  : POSTS.filter((p) => p.category === f.key).length}
              </span>
            </button>
          ))}
        </nav>

        {/* ── LISTA DE ENTRADAS ── */}
        <main className="blog__list">
          {visible.map((post, i) => {
            const st = STATUS_MAP[post.status] || STATUS_MAP.exploracion;
            const isFeatured = i === 0 && filter === "all";

            return (
              <article
                key={post.id}
                className={`blog__post ${isFeatured ? "blog__post--featured" : ""}`}
              >
                {/* Número de entrada */}
                <div className="blog__post-num">
                  {String(POSTS.length - POSTS.indexOf(post)).padStart(2, "0")}
                </div>

                <div className="blog__post-body">
                  {/* Meta superior */}
                  <div className="blog__post-meta">
                    <time className="blog__post-date">{post.dateLabel}</time>
                    <span className="blog__post-cat">{post.catLabel}</span>
                    <span
                      className={`blog__post-status blog__post-status--${post.status}`}
                    >
                      {st.dot} {st.label}
                    </span>
                    <span className="blog__post-read">{post.readMin} min</span>
                  </div>

                  {/* Título */}
                  <h2
                    className="blog__post-title"
                    onClick={() => navigate(`/blog/${post.id}`)}
                    style={{ cursor: "pointer" }}
                  >
                    {post.title}
                  </h2>

                  {/* Extracto */}
                  <p className="blog__post-excerpt">{post.excerpt}</p>

                  {/* Footer */}
                  <div className="blog__post-footer">
                    <div className="blog__post-tags">
                      {post.tags.map((t) => (
                        <span key={t} className="blog__tag">
                          {t}
                        </span>
                      ))}
                    </div>
                    <button
                      className="blog__post-cta"
                      onClick={() => navigate(`/blog/${post.id}`)}
                    >
                      Leer entrada <span aria-hidden="true">→</span>
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </main>

        {/* ── FOOTER / CTA escritura ── */}
        <footer className="blog__footer">
          <p className="blog__footer-text">
            Este blog es un trabajo en progreso. Las entradas se actualizan
            conforme los proyectos avanzan.
          </p>
          <div className="blog__footer-rule" />
          <p className="blog__footer-sub">
            Mauricio Noj · Ing. Sistemas + Ambiental · Guatemala
          </p>
        </footer>
      </div>
    </div>
  );
};
