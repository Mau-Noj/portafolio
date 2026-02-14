// src/App.jsx
import './App.css'
import { useProjectsController } from './controllers/useProjectsController'; // Importamos Controlador
import { ProjectCard } from './views/ProjectCard'; // Importamos Vista

function App() {
  // 1. Invocamos al Controlador
  const { projects, loading } = useProjectsController();

  return (
    <div className="portfolio-container">
      <header>
        <h1>Mi Portafolio MVC</h1>
      </header>

      <main>
        {/* 2. Lógica de UI basada en el estado del controlador */}
        {loading ? (
          <p>Cargando proyectos...</p>
        ) : (
          <div className="projects-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
            {/* 3. Renderizamos la Vista */}
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        )}
      </main>
    </div>
  )
}

export default App