import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  token: localStorage.getItem('token') || null,
  isLoggedIn: !!localStorage.getItem('token'),
  loading: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login(state, action) {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isLoggedIn = true;
      localStorage.setItem('token', action.payload.token);
      // localStorage.setItem('user', JSON.stringify(action.payload.user));
    },
    logout(state) {
      state.user = null;
      state.token = null;
      state.isLoggedIn = false;
      localStorage.removeItem('token');
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
    setUser(state, action) {
      state.user = action.payload;
    },
  }
});

export const { login, logout,setLoading , setUser} = authSlice.actions;
export default authSlice.reducer;
