import React from 'react';
import { useDispatch } from 'react-redux';
import { setToken } from '../redux/authSlice';
import useAuthForm from '../hooks/useAuthForm';

const AuthForm = () => {
    const dispatch = useDispatch();
    const {
    isLogin,
    setIsLogin,
    name,
    setName,
    email,
    setEmail,
    password,
    setPassword,
    error,
    handleSubmit,
    } = useAuthForm((token) => dispatch(setToken(token)));

    return (
    <div className="flex justify-center items-center md:h-screen w-full">
        <div className="w-full">
        {error && <div className="text-red-500 text-center mb-4">{error}</div>}
        <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-8 pb-8 mb-4">
            <h2 className="mb-4 text-xl font-bold text-gray-600 text-center">
            {isLogin ? 'Login' : 'Cadastro'}
            </h2>
            {!isLogin && (
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                Nome
                </label>
                <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
                />
            </div>
            )}
            <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                Email
            </label>
            <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
            />
            </div>
            <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                Senha
            </label>
            <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                required
            />
            </div>
            <div className="flex flex-col items-center justify-between">
            <button
                type="submit"
                className="bg-[#68397a] min-w-full hover:bg-[#5fdaa4] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
                {isLogin ? 'Login' : 'Cadastrar'}
            </button>
            <button
                type="button"
                onClick={() => setIsLogin(!isLogin)}
                className="mt-2 inline-block align-baseline font-medium text-sm text-gray-500 hover:text-[#68397a]"
            >
                {isLogin ? 'Não tem uma conta? Cadastre-se' : 'Já tem uma conta? Faça login'}
            </button>
            </div>
        </form>
        </div>
    </div>
    );
};

export default AuthForm;
