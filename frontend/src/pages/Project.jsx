import React from 'react';
import { useSelector } from 'react-redux';
import { selectToken } from '../redux/authSlice';
import { Navigate } from 'react-router-dom';

const Project = () => {
    const token = useSelector(selectToken);


      // Verifica se há token JWT
    if (!token) {
        // Redireciona para a página de login se o usuário não estiver autenticado
        console.log('Usuário deslogado');
        return (<Navigate to={'/login'} />);
    } else {
        console.log('Usuário logado');
        return (
        <div>Projects </div>
        )
    }
}

export default Project