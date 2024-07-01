//Formulário para criar e atualizar projetos.
import React, { useState } from 'react';
import useProjects from '../hooks/useProjects';

const ProjectForm = ({ project, onCloseForm, userid }) => {
    const [name, setName] = useState(project.name || '');
    const [description, setDescription] = useState(project.description || '');
    const { createProject, updateProject } = useProjects();
   
const handleSubmit = async (e) => {
    e.preventDefault();

    const newProjectData = {
        name,
        description,
    };

    try {
        if (project.projectId) {
            await updateProject(project.projectId, newProjectData);
        } else {
            await createProject(userid, newProjectData); 
        }
// Pass userId as first argument
        onCloseForm(); // Close form after successful creation
    } catch (error) {
        console.error('Erro ao salvar o projeto:', error);
    }
};

    return (
        <div className="fixed inset-0 z-50 overflow-auto bg-gray-800 bg-opacity-75 flex justify-center items-center">
            <div className="bg-white rounded-lg p-8 max-w-lg w-full">
                <h3 className="text-xl mb-4">{project._id ? 'Editar Projeto' : 'Novo Projeto'}</h3>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <input
                            className="w-full px-3 py-2 border border-gray-300 rounded"
                            type="text"
                            placeholder="Título"
                            name="title"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
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

export default ProjectForm;
