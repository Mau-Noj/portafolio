/**
 * useSEO — Hook para manejar SEO y Open Graph por página
 *
 * Uso en cualquier página/componente:
 *   import { useSEO } from '../hooks/useSEO';
 *
 *   export const HomePage = () => {
 *     useSEO({
 *       title: 'Mauricio.dev · Inicio',
 *       description: 'Portafolio de Mauricio, desarrollador web full-stack.',
 *       url: 'https://mauricio.dev',
 *       image: 'https://mauricio.dev/og-cover.png',
 *     });
 *     return <main>...</main>;
 *   };
 */

import { useEffect } from 'react';

const SITE_NAME    = 'Mauricio.dev';
const DEFAULT_URL  = 'https://mauricio.dev';           // ← cambia aquí
const DEFAULT_IMG  = 'https://mauricio.dev/og-cover.png'; // ← cambia aquí (1200×630px recomendado)
const TWITTER_USER = '@mauricio_dev';                  // ← cambia aquí

export const useSEO = ({
  title       = SITE_NAME,
  description = 'Portafolio personal de Mauricio — desarrollador web full-stack apasionado por crear experiencias digitales.',
  url         = DEFAULT_URL,
  image       = DEFAULT_IMG,
  type        = 'website',
  noindex     = false,
} = {}) => {
  useEffect(() => {
    const fullTitle = title.includes(SITE_NAME) ? title : `${title} · ${SITE_NAME}`;

    /* ── Helpers ─────────────────────────────────────────── */
    const setOrCreate = (selector, attrKey, attrVal, contentVal) => {
      let el = document.querySelector(selector);
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute(attrKey, attrVal);
        document.head.appendChild(el);
      }
      el.setAttribute('content', contentVal);
    };

    const setLinkOrCreate = (rel, href) => {
      let el = document.querySelector(`link[rel="${rel}"]`);
      if (!el) {
        el = document.createElement('link');
        el.setAttribute('rel', rel);
        document.head.appendChild(el);
      }
      el.setAttribute('href', href);
    };

    /* ── Título ──────────────────────────────────────────── */
    document.title = fullTitle;

    /* ── Meta estándar ───────────────────────────────────── */
    setOrCreate('meta[name="description"]',  'name', 'description', description);
    setOrCreate('meta[name="robots"]',       'name', 'robots',      noindex ? 'noindex,nofollow' : 'index,follow');
    setOrCreate('meta[name="author"]',       'name', 'author',      SITE_NAME);

    /* ── Open Graph ──────────────────────────────────────── */
    setOrCreate('meta[property="og:title"]',       'property', 'og:title',       fullTitle);
    setOrCreate('meta[property="og:description"]', 'property', 'og:description', description);
    setOrCreate('meta[property="og:url"]',         'property', 'og:url',         url);
    setOrCreate('meta[property="og:image"]',       'property', 'og:image',       image);
    setOrCreate('meta[property="og:image:width"]', 'property', 'og:image:width', '1200');
    setOrCreate('meta[property="og:image:height"]','property', 'og:image:height','630');
    setOrCreate('meta[property="og:type"]',        'property', 'og:type',        type);
    setOrCreate('meta[property="og:site_name"]',   'property', 'og:site_name',   SITE_NAME);
    setOrCreate('meta[property="og:locale"]',      'property', 'og:locale',      'es_MX');

    /* ── Twitter Card ────────────────────────────────────── */
    setOrCreate('meta[name="twitter:card"]',        'name', 'twitter:card',        'summary_large_image');
    setOrCreate('meta[name="twitter:site"]',        'name', 'twitter:site',        TWITTER_USER);
    setOrCreate('meta[name="twitter:title"]',       'name', 'twitter:title',       fullTitle);
    setOrCreate('meta[name="twitter:description"]', 'name', 'twitter:description', description);
    setOrCreate('meta[name="twitter:image"]',       'name', 'twitter:image',       image);

    /* ── Canonical ───────────────────────────────────────── */
    setLinkOrCreate('canonical', url);

    /* ── Cleanup: restaurar título al desmontar ──────────── */
    return () => {
      document.title = SITE_NAME;
    };
  }, [title, description, url, image, type, noindex]);
};