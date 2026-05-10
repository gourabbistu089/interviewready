import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { AuthState, User } from '@/types';

const initialState: AuthState = {
  user: null,
  token: typeof window !== 'undefined' ? localStorage.getItem('token') : null,
  isLoggedIn: typeof window !== 'undefined' ? !!localStorage.getItem('token') : false,
  loading: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login(state, action: PayloadAction<{ user: User; token: string }>) {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isLoggedIn = true;
      if (typeof window !== 'undefined') {
        localStorage.setItem('token', action.payload.token);
        // Also set a cookie so the Edge middleware can read it for route protection
        document.cookie = `token=${action.payload.token}; path=/; max-age=${60 * 60 * 24 * 30}; SameSite=Strict`;
      }
    },
    logout(state) {
      state.user = null;
      state.token = null;
      state.isLoggedIn = false;
      if (typeof window !== 'undefined') {
        localStorage.removeItem('token');
        // Clear the middleware cookie
        document.cookie = 'token=; path=/; max-age=0; SameSite=Strict';
      }
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    setUser(state, action: PayloadAction<User | null>) {
      state.user = action.payload;
    },
    updateProfilePicture(state, action: PayloadAction<string>) {
      if (state.user) {
        state.user.profilePicture = action.payload;
      }
    },
  },
});

export const { login, logout, setLoading, setUser, updateProfilePicture } = authSlice.actions;
export default authSlice.reducer;
