// src/controllers/useProjectsController.js
import { useState, useEffect } from 'react';
import { getProjectsService } from '../models/projects.model';

export const useProjectsController = () => {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadProjects = async () => {
            try {
                const data = await getProjectsService();
                setProjects(data);
            } catch (error) {
                console.error("Error cargando proyectos:", error);
            } finally {
                setLoading(false);
            }
        };

        loadProjects();
    }, []);

    // El controlador retorna lo que la vista necesita saber
    return { projects, loading };
};