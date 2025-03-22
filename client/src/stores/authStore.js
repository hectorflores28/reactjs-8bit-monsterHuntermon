import { create } from 'zustand';
import axios from 'axios';

const API_URL = '/api';

const useAuthStore = create((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,

  login: async (credentials) => {
    set({ isLoading: true, error: null });
    try {
      // TODO: Implementar llamada a la API
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });
      
      if (!response.ok) {
        throw new Error('Error de autenticación');
      }

      const data = await response.json();
      set({ user: data.user, isAuthenticated: true, isLoading: false });
    } catch (error) {
      set({ error: error.message, isLoading: false });
    }
  },

  register: async (userData) => {
    set({ isLoading: true, error: null });
    try {
      // TODO: Implementar llamada a la API
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        throw new Error('Error en el registro');
      }

      const data = await response.json();
      set({ user: data.user, isAuthenticated: true, isLoading: false });
    } catch (error) {
      set({ error: error.message, isLoading: false });
    }
  },

  logout: () => {
    set({ user: null, isAuthenticated: false, error: null });
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