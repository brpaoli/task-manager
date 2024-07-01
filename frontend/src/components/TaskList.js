import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation, Link } from 'react-router-dom';
import TaskItem from './TaskItem';
import TaskForm from './TaskForm';
import useTasks from '../hooks/useTasks';


const TaskList = () => {
    const token = useSelector((state) => state.auth.token);
    const { state } = useLocation();
    const { projectId } = state || {};
    const { tasks, fetchTasks, deleteTask, completeTask, createTask, updateTask } = useTasks();
    const [isTaskFormOpen, setIsTaskFormOpen] = useState(false);
    const [selectedTask, setSelectedTask] = useState(null);

    useEffect(() => {
        if (projectId && token) {
            fetchTasks(projectId, token);
        }
    }, [projectId, token, fetchTasks]);

    const handleDelete = async (taskId) => {
        try {
            await deleteTask(taskId);
            fetchTasks(projectId, token); // Refetch tasks after deletion
        } catch (error) {
            console.error('Failed to delete task:', error);
        }
    };

    const handleComplete = async (taskId) => {
        try {
            await completeTask(taskId, token);
            fetchTasks(projectId, token); // Refresh tasks after completion
        } catch (error) {
            console.error('Failed to complete task:', error);
        }
    };

    const handleCreateTask = () => {
        setSelectedTask(null); // Define uma tarefa vazia para criar uma nova
        setIsTaskFormOpen(true);
    };

    const handleCloseForm = () => {
        setIsTaskFormOpen(false);
        setSelectedTask(null);
        fetchTasks(projectId, token); // Atualiza a lista de tarefas após a criação ou edição
    };

    const handleEditTask = (task) => {
        setSelectedTask(task);
        setIsTaskFormOpen(true);
    };

   // Função para voltar para a página de projetos

    return (
        <div className="task-list flex flex-col pt-8">

                <Link to={'/projects'} className="text-center bg-[#452b9c] hover:bg-[#5fdaa4]  text-white hover:text-[#452b9c] m-8 w-52 px-8 py-4 border border-0 rounded-md flex align-center justify-center self-center cursor-pointer">
                    Voltar para projetos
                </Link>


            <div className="w-full grid grid-cols-1 md:grid-cols-3 md:flex-row flex-wrap justify-center items-stretch gap-8">
                {tasks.map((task) => (
                    <TaskItem
                        key={task._id}
                        task={task}
                        onDelete={handleDelete}
                        onComplete={handleComplete}
                        onEdit={() => handleEditTask(task)} // Passa a função de edição para TaskItem
                    />
                ))}
            </div>

            <button
                className="fixed bottom-4 right-4 bg-[#452b9c] hover:bg-[#5fdaa4] text-white hover:text-[#452b9c] text-xl py-2 px-4 rounded-full shadow-lg cursor-pointer"
                onClick={handleCreateTask}
            >
                + Criar Nova Tarefa
            </button>

            {isTaskFormOpen && (
                <TaskForm
                    task={selectedTask || {}} // Garante que task seja sempre um objeto
                    onCloseForm={handleCloseForm}
                    projectId={projectId} // Passa o projectId para TaskForm
                />
            )}
        </div>
    );
};

export default TaskList;
