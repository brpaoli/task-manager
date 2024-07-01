import React, { useState } from 'react';
import useTasks from '../hooks/useTasks';

const TaskForm = ({ task, onCloseForm, projectId }) => {
    const [title, setTitle] = useState(task.title || '');
    const [description, setDescription] = useState(task.description || '');
    const { createTask, updateTask } = useTasks();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newTaskData = {
            title,
            description,
        };

        try {
            if (task._id) {
                await updateTask(task._id, newTaskData);
            } else {
                await createTask(projectId, newTaskData);
            }
            onCloseForm(); // Fechar o modal após salvar/atualizar a tarefa
        } catch (error) {
            console.error('Erro ao salvar a tarefa:', error);
        }
    };

    return (
        <div className="fixed inset-0 z-50 overflow-auto bg-gray-800 bg-opacity-75 flex justify-center items-center">
            <div className="bg-white rounded-lg p-8 max-w-lg w-full">
                <h3 className="text-xl mb-4">{task._id ? 'Editar Tarefa' : 'Nova Tarefa'}</h3>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <input
                            className="w-full px-3 py-2 border border-gray-300 rounded"
                            type="text"
                            placeholder="Título"
                            name="title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <textarea
                            className="w-full px-3 py-2 border border-gray-300 rounded"
                            placeholder="Descrição"
                            name="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            rows="4"
                        />
                    </div>
                    <div className="flex justify-end">
                        <button
                            type="submit"
                            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded mr-2"
                        >
                            Salvar
                        </button>
                        <button
                            type="button"
                            onClick={onCloseForm}
                            className="bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 px-4 rounded"
                        >
                            Cancelar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default TaskForm;
