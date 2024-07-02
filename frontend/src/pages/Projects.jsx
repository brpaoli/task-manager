import React from 'react';
import { useSelector } from 'react-redux';
import { selectToken, selectUser } from '../redux/authSlice';
import { Navigate } from 'react-router-dom';
import ProjectList from '../components/ProjectList';

const Projects = () => {
    const token = useSelector(selectToken);
    const user = useSelector(selectUser);

    // Verifica se há token JWT
    if (!token) {
        console.log('User', user);
        // Redireciona para a página de login se o usuário não estiver autenticado
        console.log('Usuário deslogado');
        return (<Navigate to={'/login'} />);
    } else {
        console.log('Usuário logado');
        const userJson = JSON.parse(user);

        return (
            <div className="w-full min-h-screen flex items-center justify-center flex-col bg-[#2e2157] p-5">
                <h1 className="md:text-3xl font-black text-left text-[#5fdaa4]">Os Projetos de {userJson.name}</h1>
                <ProjectList />
            </div>
        );
    }
}

export default Projects;
