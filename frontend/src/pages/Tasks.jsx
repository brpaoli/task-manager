import React from 'react';
import { useSelector } from 'react-redux';
import { selectToken, selectUser } from '../redux/authSlice';
import { Navigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import TaskList from '../components/TaskList';


const Tasks = () => {
    const token = useSelector(selectToken);
    const user = useSelector(selectUser);
    const parsedUser = JSON.parse(user);

    const { projectId } = useParams();

      // Verifica se há token JWT
    if (!token) {
        // Redireciona para a página de login se o usuário não estiver autenticado
        console.log('Usuário deslogado');
        return (<Navigate to={'/login'} />);
    } else {
        console.log('Usuário logado');
        return (
        <div className="w-full min-h-screen flex items-center justify-center flex-col bg-[#2e2157] p-5">
                <h1 className="md:text-3xl font-black text-left text-[#5fdaa4]" >As Tarefas de { parsedUser.name }</h1>
                <TaskList projectId={projectId} />
        </div>
        )
    }
}

export default Tasks