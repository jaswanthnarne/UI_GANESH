import { create } from 'zustand';
import API from '../services/api';

export const useAuthStore = create((set) => ({
  user: null,
  isAuthenticated: false,
  loading: true,
  error: null,
  usersList: [],

  checkAuth: async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      set({ user: null, isAuthenticated: false, loading: false });
      return;
    }
    try {
      set({ loading: true });
      const res = await API.get('/auth/me');
      if (res.data.success) {
        set({ user: res.data.user, isAuthenticated: true, loading: false });
      }
    } catch (err) {
      localStorage.removeItem('token');
      set({ user: null, isAuthenticated: false, loading: false });
    }
  },

  login: async (email, password) => {
    try {
      set({ error: null });
      const res = await API.post('/auth/login', { email, password });
      if (res.data.success) {
        if (res.data.token) {
          localStorage.setItem('token', res.data.token);
        }
        set({ user: res.data.user, isAuthenticated: true });
        return { success: true };
      }
    } catch (err) {
      const msg = err.response?.data?.message || 'Login failed. Please check credentials.';
      set({ error: msg });
      return { success: false, message: msg };
    }
  },

  logout: async () => {
    try {
      await API.post('/auth/logout');
    } catch (err) {
      console.error(err);
    } finally {
      localStorage.removeItem('token');
      set({ user: null, isAuthenticated: false });
    }
  },

  forgotPassword: async (email) => {
    try {
      const res = await API.post('/auth/forgot-password', { email });
      return res.data;
    } catch (err) {
      throw new Error(err.response?.data?.message || 'Failed to request password reset');
    }
  },

  resetPassword: async (token, newPassword) => {
    try {
      const res = await API.post('/auth/reset-password', { token, newPassword });
      return res.data;
    } catch (err) {
      throw new Error(err.response?.data?.message || 'Failed to reset password');
    }
  },

  fetchUserAccounts: async () => {
    try {
      const res = await API.get('/auth/users');
      if (res.data.success) {
        set({ usersList: res.data.users });
      }
    } catch (err) {
      console.error(err);
    }
  },

  createUserAccount: async (userData) => {
    try {
      const res = await API.post('/auth/users', userData);
      if (res.data.success) {
        set((state) => ({ usersList: [res.data.user, ...state.usersList] }));
        return res.data;
      }
    } catch (err) {
      throw new Error(err.response?.data?.message || 'Failed to create user account');
    }
  },

  deleteUserAccount: async (id) => {
    try {
      const res = await API.delete(`/auth/users/${id}`);
      if (res.data.success) {
        set((state) => ({ usersList: state.usersList.filter((u) => u.id !== id && u._id !== id) }));
        return res.data;
      }
    } catch (err) {
      throw new Error(err.response?.data?.message || 'Failed to delete account');
    }
  },
}));
