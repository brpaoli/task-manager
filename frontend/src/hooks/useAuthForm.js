import { useState } from 'react';
import axios from 'axios';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setToken, setUser } from '../redux/authSlice';

const useAuthForm = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch();


    const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000',
    });

    const handleSubmit = async (e) => {
    e.preventDefault();
    const endpoint = isLogin ? '/auth/login' : '/auth/register';
    const data = isLogin ? { email, password } : { name, email, password };

    try {
        const response = await axiosInstance.post(endpoint, data);
        const { token, user } = response.data;

        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));

        //Callback para passar o token e algumas informações que usaremos depois nas consultas
        dispatch(setToken(token));
        dispatch(setUser(JSON.stringify(user)));
        
        //Dispara o toast com o feedback do login, cadastro ou falha
        toast.success(isLogin ? 'Autenticação bem-sucedida' : 'Cadastro realizado com sucesso, faça o login para acessar.');
        setTimeout(() => {
            navigate('/projects'); 
        }, 2000);

    } catch (error) {
        toast.error(error.response ? error.response.data.message : 'Não foi possível autenticar o usuário');
    }
    };

    return {
    isLogin,
    setIsLogin,
    name,
    setName,
    email,
    setEmail,
    password,
    setPassword,
    handleSubmit,
    };
};

export default useAuthForm;
