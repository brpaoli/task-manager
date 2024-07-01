import { useState, useCallback } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';

const useProjects = () => {
    const [projects, setProjects] = useState([]);
    const [error, setError] = useState(null);
    const token = useSelector((state) => state.auth.token);
    const user = useSelector((state) => state.auth.user);
    const userId = user.id;
    const axiosInstance = axios.create({
        baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000',
    });

    const fetchProjects = useCallback(async (userId) => {
        try {
            const response = await axiosInstance.get(`/usuario/${userId}/projects`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            return setProjects(response.data);
            
        } catch (error) {
            setError(error.response ? error.response.data.message : 'Erro ao buscar projetos');
        }
    }, [axiosInstance, token]);

    const deleteProject = useCallback(async (projectId) => {
        try {
            await axiosInstance.delete(`/projects/${projectId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setProjects((prevProjects) => prevProjects.filter(project => project.id !== projectId));

        } catch (error) {
            console.error('Failed to delete project:', error);
        }
    }, [axiosInstance, token]);

    const createProject = useCallback(async (userId, projectData) => {
        try {
            const response = await axiosInstance.post('/projects', {
                ...projectData,
                userId, // Include userId in the request body
            }, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setProjects(prevProjects => [...prevProjects, response.data]);
        } catch (error) {
            console.error('Erro ao criar o projeto:', error);
            throw error;
        }
    }, [axiosInstance, token]);

    const updateProject = useCallback(async (projectId, projectData) => {
        try {
            const response = await axiosInstance.put(`/projects/${projectId}`, projectData, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setProjects((prevProjects) =>
                prevProjects.map((project) =>
                    project._id === projectId ? { ...project, ...response.data } : project
                )
            );
        } catch (error) {
            console.error('Erro ao atualizar o projeto:', error);
            throw error;
        }
    }, [axiosInstance, token]);

    return { projects, error, fetchProjects, deleteProject, createProject, updateProject };
};

export default useProjects;
