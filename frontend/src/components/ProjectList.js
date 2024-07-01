//Listar todos os projetos do usuário autenticado.
//Excluir projetos.
//Editar projeto
//Adicionar e editar projetos.
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import ProjectCard from './ProjectCard';
import useProjects from '../hooks/useProjects';

const ProjectList = () => {
    
    const user = useSelector((state) => state.auth.user);
    const { projects, fetchProjects, deleteProject  } = useProjects();
    const parsedUser = user ? JSON.parse(user) : null;

    useEffect(() => {
        if (parsedUser?.id) {
            fetchProjects(parsedUser.id);
        }
    }, [parsedUser, fetchProjects]);

    const handleDelete = async (projectId) => {
        try {
            await deleteProject(projectId);
            fetchProjects(parsedUser.id); // Refetch projects after deletion
        } catch (error) {
            console.error('Failed to delete project:', error);
        }
    };

    return (
        <div className="project-list flex flex-col pt-8">
            <div className="w-full grid grid-cols-1 md:grid-cols-3 md:flex-row flex-wrap justify-center items-stretch gap-8">
                {projects.map((project) => (
                    <ProjectCard key={project._id} project={project} onDelete={handleDelete} />
                ))}
            </div>
        </div>
    );
};

export default ProjectList;