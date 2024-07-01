import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import ProjectCard from './ProjectCard';
import useProjects from '../hooks/useProjects';
import ProjectForm from './ProjectForm';

const ProjectList = () => {
    const user = useSelector((state) => state.auth.user);
    const { projects, fetchProjects, deleteProject } = useProjects();
    const parsedUser = user ? JSON.parse(user) : null;
    const [isProjectFormOpen, setProjectFormOpen] = useState(false);
    const [selectedProject, setSelectedProject] = useState(null);


    useEffect(() => {
        if (parsedUser?.id) {
            fetchProjects(parsedUser.id);
        }
    }, []);

    const handleDelete = async (projectId) => {
        try {
            await deleteProject(projectId);
        } catch (error) {
            console.error('Failed to delete project:', error);
        }
    };

    const handleCreateProject = () => {
        setSelectedProject(null);
        setProjectFormOpen(true);
    };

    const handleCloseForm = () => {
        setProjectFormOpen(false);
        fetchProjects(parsedUser?.id); // Update projects after closing form
    };

    const handleEditProject = (project) => {
        setSelectedProject(project);
        setProjectFormOpen(true);
    };

    return (
        <div className="project-list flex flex-col pt-8">
            <div className="w-full grid grid-cols-1 md:grid-cols-3 md:flex-row flex-wrap justify-center items-stretch gap-8">
                {projects.map((project) => (
                    <ProjectCard key={project._id} project={project} onDelete={handleDelete} onEdit={() => handleEditProject(project)} />
                ))}
            </div>
            <button
                className="fixed bottom-4 right-4 bg-[#452b9c] hover:bg-[#5fdaa4] text-white text-xl py-2 px-4 rounded-full shadow-lg"
                onClick={handleCreateProject}
            >
                + Criar Novo Projeto
            </button>
            {isProjectFormOpen && (
                <ProjectForm
                    project={selectedProject || {}}
                    onCloseForm={handleCloseForm}
                    userid={parsedUser.id}
                />
            )}
        </div>
    );
};

export default ProjectList;
