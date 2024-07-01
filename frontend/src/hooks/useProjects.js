import { useState, useCallback } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';

const useProjects = () => {
    const [projects, setProjects] = useState([]);
    const [error, setError] = useState(null);
    const token = useSelector((state) => state.auth.token);

    const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000',
    });
    //Callback para buscar a lista de projetos pelo id do usuário.
    const fetchProjects = useCallback(async (userId) => {    
        try {
            const response = await axiosInstance.get(`/usuario/${userId}/projects`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setProjects(response.data);
        } catch (error) {
            setError(error.response ? error.response.data.message : 'Erro ao buscar projetos');
        }
    }, [token, axiosInstance]);

    //Callback para deletar o projeto na lista de projetos pelo id do projeto.
    const deleteProject = useCallback(async (projectId) => {
            try {
                await axiosInstance.delete(`/projects/${projectId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setProjects((prevProjects) => prevProjects.filter(project => project.id !== projectId));
            } catch (error) {
                console.error('Failed to delete project:', error);
            }
    }, [axiosInstance]);

    return { projects, error, fetchProjects, deleteProject  };
};

export default useProjects;