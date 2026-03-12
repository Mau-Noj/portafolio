// src/views/SoftwareApp.jsx
// Shell que carga el componente de cada proyecto embebido

import React, { Suspense, lazy } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getSoftwareById } from '../models/software.data';
import './SoftwareApp.css';

// ── Registro de apps ─────────────────────────────────────────────────────────
// Agrega aquí cada nuevo proyecto con su componente lazy
const APP_REGISTRY = {
  //'carta-novia':              lazy(() => import('../apps/CartaNovia')),
  'cumpleanos-amiga': lazy(() => import('../apps/CumpleañosAmiga')),
  //'sistema-inventario-usac':  lazy(() => import('../apps/SistemaInventario')),
  // 'mi-nuevo-proyecto':     lazy(() => import('../apps/MiNuevoProyecto')),
};

// ── Loading fallback ─────────────────────────────────────────────────────────
const AppLoader = () => (
  <div className="sa__loader">
    <div className="sa__loader-ring" />
    <p>Cargando aplicación…</p>
  </div>
);

// ── Shell principal ──────────────────────────────────────────────────────────
export const SoftwareApp = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const proyecto = getSoftwareById(id);

  // Proyecto no existe
  if (!proyecto) {
    return (
      <div className="sa__error">
        <p>Proyecto no encontrado.</p>
        <button onClick={() => navigate('/software')}>← Volver a Software</button>
      </div>
    );
  }

  // App no disponible
  if (!proyecto.app?.activa) {
    return (
      <div className="sa__error">
        <p>Esta aplicación aún no está disponible.</p>
        <button onClick={() => navigate(`/software/${id}`)}>← Ver documentación</button>
      </div>
    );
  }

  const AppComponent = APP_REGISTRY[id];

  // Componente no registrado
  if (!AppComponent) {
    return (
      <div className="sa__error">
        <p>Componente de aplicación no registrado para: <code>{id}</code></p>
        <button onClick={() => navigate(`/software/${id}`)}>← Ver documentación</button>
      </div>
    );
  }

  return (
    <div className="sa__wrap">

      {/* ── Botón flotante "← Docs" ── */}
      <button
        className="sa__back-btn"
        onClick={() => navigate(`/software/${id}`)}
        title="Ver documentación técnica"
      >
        <span className="sa__back-icon">←</span>
        <span className="sa__back-label">Docs</span>
      </button>

      {/* ── App embebida ── */}
      <div className="sa__app-container">
        <Suspense fallback={<AppLoader />}>
          <AppComponent
            apiBaseUrl={proyecto.app?.api_base_url || ''}
            proyectoId={id}
            nombreProyecto={proyecto.nombre}
          />
        </Suspense>
      </div>

    </div>
  );
};