//Para gerenciar o estado da aplicação
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    token: localStorage.getItem('token') || null,
    user: localStorage.getItem('user') || null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setToken(state, action) {
        state.token = action.payload;
    },
    setUser(state, action) {
        state.user = action.payload;
    },
    logout(state) {
        state.token = null;
        state.user = null;
    },
  },
});

export const { setToken, setUser, logout } = authSlice.actions;

export const selectToken = (state) => state.auth.token;
export const selectUser = (state) => state.auth.user;

export default authSlice.reducer;