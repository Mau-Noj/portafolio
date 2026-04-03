// src/App.jsx
import "./App.css";
import { Navbar } from "./components/Navbar";
import { Home } from "./views/Home";
import { MaterialsSection } from "./views/MaterialsSection";
import { ProjectsSection } from "./views/ProjectsSection";
import { ProjectDetail } from "./views/ProjectDetail";
import { BlogSection } from "./views/BlogSection";
import { BlogPost } from "./views/BlogPost";
import { AboutSection } from "./views/AboutSection";
import { ContactSection } from "./views/ContactSection";
import { ComponentsSection } from "./views/ComponentsSection";
import { ComponentDetail } from "./views/ComponentDetail";
import { SoftwareSection } from "./views/SoftwareSection";
import { SoftwareDetail } from "./views/SoftwareDetail";
import { SoftwareApp } from "./views/SoftwareApp";
import { LabCuantitativo } from "./views/LabCuantitativo";
import ArticulosSection from "./views/ArticulosSection";
import Blog_Post from "./views/Blog_Post";
import OSI3D from "./views/OSI3D/OSI3D";
import DB3D from "./views/DB3D/DB3D";
import { NotFoundView } from "./views/NotFoundView";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Navbar />
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
    </>
  );
}

export default App;
