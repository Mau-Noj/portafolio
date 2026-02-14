// src/views/ProjectCard.jsx
import React from 'react';

// Recibe datos por props, no tiene lógica compleja
export const ProjectCard = ({ project }) => {
  return (
    <div className="project-card" style={{ border: '1px solid #ddd', padding: '1rem', borderRadius: '8px' }}>
      <img src={project.image} alt={project.title} style={{ width: '100%', borderRadius: '4px' }} />
      <h3>{project.title}</h3>
      <p>{project.description}</p>
      <a href={project.url} target="_blank" rel="noreferrer">Ver proyecto</a>
    </div>
  );
};