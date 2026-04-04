// src/App.jsx
import "./App.css";
import { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import { Navbar } from "./components/Navbar";

// ── Carga inmediata: Home y 404 (se ven siempre) ──────────────
import { Home } from "./views/Home";
import { NotFoundView } from "./views/NotFoundView";

// ── Lazy: todo lo demás carga solo cuando se navega ───────────
const MaterialsSection = lazy(() =>
  import("./views/MaterialsSection").then((m) => ({
    default: m.MaterialsSection,
  })),
);
const ProjectsSection = lazy(() =>
  import("./views/ProjectsSection").then((m) => ({
    default: m.ProjectsSection,
  })),
);
const ProjectDetail = lazy(() =>
  import("./views/ProjectDetail").then((m) => ({ default: m.ProjectDetail })),
);
const BlogSection = lazy(() =>
  import("./views/BlogSection").then((m) => ({ default: m.BlogSection })),
);
const BlogPost = lazy(() =>
  import("./views/BlogPost").then((m) => ({ default: m.BlogPost })),
);
const AboutSection = lazy(() =>
  import("./views/AboutSection").then((m) => ({ default: m.AboutSection })),
);
const ContactSection = lazy(() =>
  import("./views/ContactSection").then((m) => ({ default: m.ContactSection })),
);
const ComponentsSection = lazy(() =>
  import("./views/ComponentsSection").then((m) => ({
    default: m.ComponentsSection,
  })),
);
const ComponentDetail = lazy(() =>
  import("./views/ComponentDetail").then((m) => ({
    default: m.ComponentDetail,
  })),
);
const SoftwareSection = lazy(() =>
  import("./views/SoftwareSection").then((m) => ({
    default: m.SoftwareSection,
  })),
);
const SoftwareDetail = lazy(() =>
  import("./views/SoftwareDetail").then((m) => ({ default: m.SoftwareDetail })),
);
const SoftwareApp = lazy(() =>
  import("./views/SoftwareApp").then((m) => ({ default: m.SoftwareApp })),
);
const LabCuantitativo = lazy(() =>
  import("./views/LabCuantitativo").then((m) => ({
    default: m.LabCuantitativo,
  })),
);
const ArticulosSection = lazy(() => import("./views/ArticulosSection"));
const Blog_Post = lazy(() => import("./views/Blog_Post"));
const OSI3D = lazy(() => import("./views/OSI3D/OSI3D"));
const DB3D = lazy(() => import("./views/DB3D/DB3D"));

// ── Fallback mientras carga ───────────────────────────────────
const PageLoader = () => (
  <div
    style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      height: "calc(100vh - 68px)",
      marginTop: "68px",
      fontFamily: "'JetBrains Mono', monospace",
      fontSize: "0.7rem",
      letterSpacing: "3px",
      textTransform: "uppercase",
      color: "var(--h-text-dim, #64748b)",
      gap: "0.75rem",
    }}
  >
    <span
      style={{ animation: "spin 1s linear infinite", display: "inline-block" }}
    >
      ◌
    </span>
    Cargando...
    <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
  </div>
);

function App() {
  return (
    <>
      <Navbar />
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="*" element={<NotFoundView />} />
          <Route path="/blog" element={<BlogSection />} />
          <Route path="/blog/:id" element={<BlogPost />} />
          <Route path="/materiales" element={<MaterialsSection />} />
          <Route path="/proyectos" element={<ProjectsSection />} />
          <Route path="/proyectos/:id" element={<ProjectDetail />} />
          <Route path="/sobre-mi" element={<AboutSection />} />
          <Route path="/componentes" element={<ComponentsSection />} />
          <Route path="/componentes/:id" element={<ComponentDetail />} />
          <Route path="/contacto" element={<ContactSection />} />
          <Route path="/software" element={<SoftwareSection />} />
          <Route path="/software/:id" element={<SoftwareDetail />} />
          <Route path="/software/:id/app" element={<SoftwareApp />} />
          <Route path="/osi3d" element={<OSI3D />} />
          <Route path="/db3d" element={<DB3D />} />
          <Route path="/lab" element={<LabCuantitativo />} />
          <Route path="/articulos" element={<ArticulosSection />} />
          <Route path="/articulos/:slug" element={<Blog_Post />} />
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
