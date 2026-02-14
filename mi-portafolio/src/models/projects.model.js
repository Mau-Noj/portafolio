// src/models/projects.model.js

// Simulamos una base de datos local
const projectsData = [
    {
      id: 1,
      title: "E-commerce React",
      description: "Tienda virtual con carrito de compras.",
      image: "https://via.placeholder.com/300",
      url: "https://google.com"
    },
    {
      id: 2,
      title: "App de Tareas",
      description: "Gestor de tareas usando LocalStorage.",
      image: "https://via.placeholder.com/300",
      url: "#"
    }
];

// Esta función es la única autorizada para "buscar" los datos
export const getProjectsService = async () => {
    // Simulamos una pequeña espera como si fuera internet real
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(projectsData);
        }, 500);
    });
};