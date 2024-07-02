import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { selectToken, setToken } from '../redux/authSlice';

const useTokenRefresh = () => {
    const dispatch = useDispatch();
    const token = useSelector(selectToken);

    useEffect(() => {
        const intervalId = setInterval(async () => {
            try {
                const refreshToken = localStorage.getItem('refreshToken');
                if (refreshToken) {
                    const response = await axios.post(`${process.env.REACT_APP_API_URL}/token`, { refreshToken });
                    const newAccessToken = response.data.token;
                    dispatch(setToken(newAccessToken));
                    localStorage.setItem('token', newAccessToken);
                }
            } catch (error) {
                console.error('Error refreshing token:', error);
                // Se o refresh token falhar, você pode redirecionar o usuário para a página de login
                // ou tomar outras ações apropriadas
            }
        }, 1000 * 60 * 60 * 2); // 2 horas

        return () => clearInterval(intervalId); // Limpa o intervalo ao desmontar o componente
    }, [dispatch]);

    return token;
};

export default useTokenRefresh;
