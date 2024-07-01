//Componente individual para cada tarefa, com opções para editar e excluir.
//Marcar como concluído ou pendente
// Registrar o responsável pela tarefa e a data ao concluir
import React, { useState } from 'react';
import { IoMdTrash,IoMdCheckboxOutline,IoMdCreate } from "react-icons/io";
import { useSelector } from 'react-redux';
import { selectUser } from '../redux/authSlice';
import TaskForm from './TaskForm';

const formatDate = (isoString) => {
    const date = new Date(isoString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // getMonth() retorna 0-11
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
};

const TaskItem = ({ task, onDelete, onComplete }) => {
    
    const [showTaskForm, setShowTaskForm] = useState(false);
    const user = useSelector(selectUser);
    const parsedUser = JSON.parse(user);


    const handleEdit = () => {
        setShowTaskForm(true); // Abre o modal TaskForm ao clicar em Editar
    };

    const handleCloseForm = () => {
        setShowTaskForm(false); // Fecha o modal TaskForm
    };
    

    return (
        <div className="flex flex-col task-card max-w-sm items-stretch min-h-50 p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
            <h2 className="mb-2 text-2xl font-bold tracking-tight text-[#540d6e] dark:text-white">{task.title}</h2>
            <p className="font-normal text-gray-700 dark:text-gray-400">{task.description}</p>
            <div className="card-footer w-full pt-2 flex justify-between mt-4">
                <div className="card-info flex flex-col w-5/6">
                    <small>Criada:{formatDate(task.createdAt)}</small>
                    
                    {task.status === 'concluída' ? (
                        <small><span className="text-[#540d6e] font-bold">concluída</span> em {new Date(task.completedAt).toLocaleDateString()} por <span className="text-[#540d6e] font-bold">{ parsedUser.name }</span> </small>
                    ) : (<small>Status: <b className='text-[#540d6e]'>{task.status}</b> </small>)}
                </div>
                <div className="card-info w-1/6 flex flex-row justify-center items-end">
                    <button  className="text-gray-500 hover:text-gray-700"
                        aria-label="Criar ou editar Projeto"
                        type='button' onClick={(e) => { e.stopPropagation(); handleEdit() }}>
                        <IoMdCreate size={18} />
                    </button>
                    <button
                        onClick={(e) => { e.stopPropagation(); onDelete(task._id); }}
                        className="text-gray-500 hover:text-gray-700"
                        aria-label="Deletar Projeto"
                        type='button'
                    >
                        <IoMdTrash  size={22} />
                    </button>
                    {task.status !== 'concluída' && (
                        <button
                        onClick={(e) => { e.stopPropagation(); onComplete(task._id); }}
                        className="text-gray-500 hover:text-gray-700"
                        aria-label="Completar Projeto"
                        type='button'
                        >
                    
                        <IoMdCheckboxOutline size={22} />
                        </button>
                    )}

                    {showTaskForm && (
                        <TaskForm
                            task={task}
                            onCloseForm={handleCloseForm}
                            // Passa a função para fechar o modal TaskForm
                        />
                    )}
       
                </div>


            </div>


        </div>
    );
};

export default TaskItem;