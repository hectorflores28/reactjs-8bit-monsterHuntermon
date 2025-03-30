import { create } from 'zustand';
import axios from 'axios';

const API_URL = '/api';

const useAuthStore = create((set) => ({
  isAuthenticated: false,
  user: null,
  loading: false,
  error: null,

  login: async (credentials) => {
    set({ loading: true, error: null });
    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', credentials);
      set({
        isAuthenticated: true,
        user: response.data.user,
        loading: false
      });
      return response.data;
    } catch (error) {
      set({
        error: error.response?.data?.message || 'Error al iniciar sesión',
        loading: false
      });
      throw error;
    }
  },

  register: async (userData) => {
    set({ loading: true, error: null });
    try {
      const response = await axios.post('http://localhost:5000/api/auth/register', userData);
      set({
        isAuthenticated: true,
        user: response.data.user,
        loading: false
      });
      return response.data;
    } catch (error) {
      set({
        error: error.response?.data?.message || 'Error al registrar usuario',
        loading: false
      });
      throw error;
    }
  },

  logout: () => {
    set({
      isAuthenticated: false,
      user: null,
      error: null
    });
  },

  clearError: () => {
    set({ error: null });
  },

  getProfile: async () => {
    try {
      set({ loading: true, error: null });
      const response = await axios.get(`${API_URL}/auth/profile`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      set({ user: response.data, loading: false });
      return response.data;
    } catch (error) {
      set({ error: error.response?.data?.message || 'Error al obtener perfil', loading: false });
      throw error;
    }
  },

  updateProfile: async (characterName, weapon, armor) => {
    try {
      set({ loading: true, error: null });
      const response = await axios.put(
        `${API_URL}/auth/profile`,
        { characterName, weapon, armor },
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      );
      set({ user: response.data, loading: false });
      return response.data;
    } catch (error) {
      set({ error: error.response?.data?.message || 'Error al actualizar perfil', loading: false });
      throw error;
    }
  }
}));

export default useAuthStore; 