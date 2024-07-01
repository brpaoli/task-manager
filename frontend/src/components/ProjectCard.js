import React from 'react';
import { IoMdTrash, IoMdCheckboxOutline  } from "react-icons/io";
import { useNavigate } from 'react-router-dom';

const formatDate = (isoString) => {
    const date = new Date(isoString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // getMonth() retorna 0-11
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
};

const ProjectCard = ({ project, onDelete }) => {
    const navigate = useNavigate();
    
    const handleCardClick = () => {
    navigate('/tasks', { state: { projectId: project._id } });
    };

    return (
        <div className="flex flex-col project-card max-w-sm items-stretch min-h-50 p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700" onClick={handleCardClick}>
            <h2 className="mb-2 text-2xl font-bold tracking-tight text-[#540d6e] dark:text-white">{project.name}</h2>
            <p className="font-normal text-gray-700 dark:text-gray-400">{project.description}</p>
            <div className="card-footer w-full pt-2 flex border-solid border-0 border-t-2 border-gray-200 justify-between mt-4">
                <small>Criado em: {formatDate(project.createdAt)}</small>
                    <button
                        onClick={(e) => { e.stopPropagation(); onDelete(project._id); }}
                        className="text-gray-500 hover:text-gray-700"
                        aria-label="Delete project"
                        type='button'
                    >
                    <IoMdTrash  size={18} />
                </button>
            </div>


        </div>
    );
};

export default ProjectCard;