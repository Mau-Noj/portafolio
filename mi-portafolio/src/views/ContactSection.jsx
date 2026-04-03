// src/views/ContactSection.jsx
// EmailJS: REMOVED | REMOVED | REMOVED
// Instalar: npm install @emailjs/browser

import React, { useState, useRef } from "react";
import emailjs from "@emailjs/browser";
import "./ContactSection.css";

const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

const SOCIAL_LINKS = [
  {
    label: "GitHub",
    handle: "@Mau-Noj",
    href: "https://github.com/Mau-Noj",
    icon: "⌥",
  },
  {
    label: "YouTube",
    handle: "@programandoconpepito",
    href: "https://www.youtube.com/@programandoconpepito",
    icon: "▶",
  },
  {
    label: "LinkedIn",
    handle: "brandon-noj",
    href: "https://www.linkedin.com/in/brandon-mauricio-noj-romero-38b4701b6/",
    icon: "in",
  },
  {
    label: "Instagram",
    handle: "@superpepitopro64",
    href: "https://www.instagram.com/superpepitopro64/",
    icon: "◎",
  },
];

const SUBJECTS = [
  "Consultoría técnica",
  "Colaboración en proyecto",
  "Trabajo / pasantía",
  "Pregunta sobre un proyecto",
  "Otro",
];

// Estado inicial del form
const INIT = { name: "", email: "", subject: "", message: "" };

export const ContactSection = () => {
  const formRef = useRef(null);
  const [fields, setFields] = useState(INIT);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // idle | sending | success | error
  const [charCount, setChar] = useState(0);

  // ── Validación ─────────────────────────────────────────────
  const validate = () => {
    const e = {};
    if (!fields.name.trim()) e.name = "Tu nombre es requerido.";
    if (!fields.email.trim()) e.email = "Tu email es requerido.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email))
      e.email = "Email no válido.";
    if (!fields.subject) e.subject = "Selecciona un asunto.";
    if (!fields.message.trim()) e.message = "Escribe tu mensaje.";
    else if (fields.message.trim().length < 20)
      e.message = "Mínimo 20 caracteres.";
    return e;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFields((f) => ({ ...f, [name]: value }));
    if (name === "message") setChar(value.length);
    if (errors[name]) setErrors((er) => ({ ...er, [name]: "" }));
  };

  // ── Envío ───────────────────────────────────────────────────
  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }

    setStatus("sending");
    try {
      await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        {
          name: fields.name,
          email: fields.email,
          subject: fields.subject,
          message: fields.message,
        },
        PUBLIC_KEY,
      );
      setStatus("success");
      setFields(INIT);
      setChar(0);
    } catch (err) {
      console.error("EmailJS error:", err);
      setStatus("error");
    }
  };

  const resetForm = () => {
    setStatus("idle");
    setErrors({});
  };

  // ── Render ──────────────────────────────────────────────────
  return (
    <div className="ct-wrap">
      <div className="ct">
        {/* ── Columna izquierda — info ── */}
        <aside className="ct__aside">
          <p className="ct__kicker">— contacto</p>
          <h1 className="ct__title">
            Hablemos
            <br />
            <em>de tu idea</em>
          </h1>
          <p className="ct__desc">
            Consultoría técnica, revisión de arquitectura, colaboración en
            proyectos o simplemente una pregunta. Respondo en menos de 48 horas.
          </p>

          {/* Email directo */}
          <a href="mailto:contacto@mauricionoj.com" className="ct__email">
            <span className="ct__email-icon">✉</span>
            <span>contacto@mauricionoj.com</span>
          </a>

          {/* Separador */}
          <div className="ct__sep" />

          {/* Redes */}
          <p className="ct__social-label">También en</p>
          <div className="ct__socials">
            {SOCIAL_LINKS.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="ct__social"
              >
                <span className="ct__social-icon">{s.icon}</span>
                <span className="ct__social-body">
                  <span className="ct__social-name">{s.label}</span>
                  <span className="ct__social-handle">{s.handle}</span>
                </span>
              </a>
            ))}
          </div>

          {/* Disponibilidad */}
          <div className="ct__availability">
            <span className="ct__avail-dot" />
            <span>Disponible para proyectos — Guatemala / Remoto</span>
          </div>
        </aside>

        {/* ── Columna derecha — formulario ── */}
        <main className="ct__main">
          {/* ── Estado: éxito ── */}
          {status === "success" && (
            <div className="ct__feedback ct__feedback--ok">
              <span className="ct__fb-icon">✓</span>
              <div>
                <p className="ct__fb-title">Mensaje enviado</p>
                <p className="ct__fb-sub">
                  Gracias por escribirme. Te respondo en menos de 48 horas a{" "}
                  <strong>{fields.email || "tu email"}</strong>.
                </p>
              </div>
              <button className="ct__fb-btn" onClick={resetForm}>
                Enviar otro
              </button>
            </div>
          )}

          {/* ── Estado: error ── */}
          {status === "error" && (
            <div className="ct__feedback ct__feedback--err">
              <span className="ct__fb-icon">✕</span>
              <div>
                <p className="ct__fb-title">No se pudo enviar</p>
                <p className="ct__fb-sub">
                  Escríbeme directamente a{" "}
                  <a href="mailto:contacto@mauricionoj.com">
                    contacto@mauricionoj.com
                  </a>
                </p>
              </div>
              <button className="ct__fb-btn" onClick={resetForm}>
                Reintentar
              </button>
            </div>
          )}

          {/* ── Formulario ── */}
          {(status === "idle" || status === "sending") && (
            <form
              ref={formRef}
              className="ct__form"
              onSubmit={handleSubmit}
              noValidate
            >
              {/* Fila nombre + email */}
              <div className="ct__row">
                <div
                  className={`ct__field ${errors.name ? "ct__field--err" : ""}`}
                >
                  <label className="ct__label" htmlFor="ct-name">
                    Nombre
                  </label>
                  <input
                    id="ct-name"
                    className="ct__input"
                    type="text"
                    name="name"
                    placeholder="Brandon Mauricio"
                    value={fields.name}
                    onChange={handleChange}
                    disabled={status === "sending"}
                    autoComplete="name"
                  />
                  {errors.name && (
                    <span className="ct__err">{errors.name}</span>
                  )}
                </div>

                <div
                  className={`ct__field ${errors.email ? "ct__field--err" : ""}`}
                >
                  <label className="ct__label" htmlFor="ct-email">
                    Email
                  </label>
                  <input
                    id="ct-email"
                    className="ct__input"
                    type="email"
                    name="email"
                    placeholder="tu@email.com"
                    value={fields.email}
                    onChange={handleChange}
                    disabled={status === "sending"}
                    autoComplete="email"
                  />
                  {errors.email && (
                    <span className="ct__err">{errors.email}</span>
                  )}
                </div>
              </div>

              {/* Asunto */}
              <div
                className={`ct__field ${errors.subject ? "ct__field--err" : ""}`}
              >
                <label className="ct__label" htmlFor="ct-subject">
                  Asunto
                </label>
                <select
                  id="ct-subject"
                  className="ct__select"
                  name="subject"
                  value={fields.subject}
                  onChange={handleChange}
                  disabled={status === "sending"}
                >
                  <option value="">Selecciona un asunto…</option>
                  {SUBJECTS.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
                {errors.subject && (
                  <span className="ct__err">{errors.subject}</span>
                )}
              </div>

              {/* Mensaje */}
              <div
                className={`ct__field ${errors.message ? "ct__field--err" : ""}`}
              >
                <label className="ct__label" htmlFor="ct-message">
                  Mensaje
                  <span
                    className={`ct__char ${charCount > 800 ? "ct__char--warn" : ""}`}
                  >
                    {charCount}/1000
                  </span>
                </label>
                <textarea
                  id="ct-message"
                  className="ct__textarea"
                  name="message"
                  placeholder="Cuéntame de tu proyecto, pregunta o idea…"
                  rows={6}
                  maxLength={1000}
                  value={fields.message}
                  onChange={handleChange}
                  disabled={status === "sending"}
                />
                {errors.message && (
                  <span className="ct__err">{errors.message}</span>
                )}
              </div>

              {/* Submit */}
              <button
                type="submit"
                className={`ct__submit ${status === "sending" ? "ct__submit--loading" : ""}`}
                disabled={status === "sending"}
              >
                {status === "sending" ? (
                  <>
                    <span className="ct__spinner" />
                    Enviando…
                  </>
                ) : (
                  <>
                    <span>Enviar mensaje</span>
                    <span className="ct__submit-arrow">→</span>
                  </>
                )}
              </button>

              <p className="ct__note">
                Enviado desde <strong>contacto@mauricionoj.com</strong> vía
                Brevo · 300 emails/día
              </p>
            </form>
          )}
        </main>
      </div>
    </div>
  );
};
