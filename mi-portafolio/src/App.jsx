// src/App.jsx
import './App.css'
import { Navbar } from './components/Navbar';
import { ComingSoon } from './views/ComingSoon';
import { MaterialsSection } from './views/MaterialsSection';
import { ProjectsSection } from './views/ProjectsSection';   // ← NUEVO
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/"            element={<ComingSoon />}      />
        <Route path="/materiales"  element={<MaterialsSection />} />
        <Route path="/proyectos"   element={<ProjectsSection />}  />  {/* ← NUEVO */}
      </Routes>
    </>
  )
}

export default App