import { useState, useCallback } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';

const useTasks = () => {
    const [tasks, setTasks] = useState([]);
    const [error, setError] = useState(null);
    const token = useSelector((state) => state.auth.token);

    const fetchTasks = useCallback(async (projectId, token) => {
        try {
            const response = await axios.get(`http://localhost:5000/usuario/${projectId}/tasks`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setTasks(response.data);
        } catch (error) {
            setError(error.response ? error.response.data.message : 'Erro ao buscar as tarefas');
        }
    }, []);

    const deleteTask = useCallback(async (taskId) => {
        try {
            await axios.delete(`http://localhost:5000/tasks/${taskId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setTasks((prevTasks) => prevTasks.filter(task => task.id !== taskId));
        } catch (error) {
            console.error('Falha ao deletar a tarefa:', error);
        }
    }, [token]);

    const completeTask = useCallback(async (taskId) => {
        try {
            const response = await axios.put(`http://localhost:5000/tasks/${taskId}`, {
                status: 'concluída',
                completedAt: new Date().toISOString(),
            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setTasks((prevTasks) =>
                prevTasks.map((task) =>
                    task._id === taskId ? { ...task, ...response.data } : task
                )
            );
        } catch (error) {
            console.error('Falha ao atualizar a tarefa:', error);
        }
    }, [token]);

    const createTask = useCallback(async (projectId, taskData) => {
        try {
            console.log('Dados enviados para criar tarefa:', {
            ...taskData,
            projectId,
            });
            const response = await axios.post(
                'http://localhost:5000/tasks',
                {
                    ...taskData,
                    projectId,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            setTasks((prevTasks) => [...prevTasks, response.data]);
        } catch (error) {
            console.error('Erro ao criar a tarefa:', error);
            throw error;
        }
    }, [token]);

    const updateTask = useCallback(async (taskId, taskData) => {
        try {

            const response = await axios.put(
                `http://localhost:5000/tasks/${taskId}`,
                taskData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            setTasks((prevTasks) =>
                prevTasks.map((task) =>
                    task._id === taskId ? { ...task, ...response.data } : task
                )
            );
        } catch (error) {
            console.error('Erro ao atualizar a tarefa:', error);
            throw error;
        }
    }, [token]);

    return { tasks, error, fetchTasks, deleteTask, completeTask, createTask, updateTask };
};

export default useTasks;
