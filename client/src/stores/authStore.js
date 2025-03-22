import { create } from 'zustand';
import axios from 'axios';

const API_URL = '/api';

const useAuthStore = create((set) => ({
  user: null,
  token: localStorage.getItem('token'),
  loading: false,
  error: null,

  setUser: (user) => set({ user }),
  setToken: (token) => {
    localStorage.setItem('token', token);
    set({ token });
  },
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),

  login: async (email, password) => {
    try {
      set({ loading: true, error: null });
      const response = await axios.post(`${API_URL}/auth/login`, { email, password });
      const { token, ...user } = response.data;
      set({ user, token, loading: false });
      return user;
    } catch (error) {
      set({ error: error.response?.data?.message || 'Error al iniciar sesión', loading: false });
      throw error;
    }
  },

  register: async (username, email, password, characterName) => {
    try {
      set({ loading: true, error: null });
      const response = await axios.post(`${API_URL}/auth/register`, {
        username,
        email,
        password,
        characterName
      });
      const { token, ...user } = response.data;
      set({ user, token, loading: false });
      return user;
    } catch (error) {
      set({ error: error.response?.data?.message || 'Error al registrarse', loading: false });
      throw error;
    }
  },

  logout: () => {
    localStorage.removeItem('token');
    set({ user: null, token: null, error: null });
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