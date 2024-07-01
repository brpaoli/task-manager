// LogoutButton.js
import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../redux/authSlice';

export const LogoutButton = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(logout());
        localStorage.removeItem('token');
        localStorage.removeItem('user');

        navigate('/login'); // Redireciona para a página de login após o logout
    };

    return (
        <button onClick={handleLogout} className="text-center bg-[#452b9c] hover:bg-[#5fdaa4]  text-white hover:text-[#452b9c] m-8 w-52 px-8 py-4 border border-0 rounded-md flex align-center justify-center self-center cursor-pointer">
            Logout
        </button>
    );
};