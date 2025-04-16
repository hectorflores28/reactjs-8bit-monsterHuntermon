import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const cloudSaveService = {
  // Guardar el estado del juego
  async saveGameState(gameState) {
    try {
      const response = await axios.post(`${API_URL}/save`, gameState, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error al guardar el juego:', error);
      throw error;
    }
  },

  // Cargar el estado del juego
  async loadGameState() {
    try {
      const response = await axios.get(`${API_URL}/save`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error al cargar el juego:', error);
      throw error;
    }
  },

  // Sincronizar el estado del juego
  async syncGameState(gameState) {
    try {
      const response = await axios.put(`${API_URL}/save/sync`, gameState, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error al sincronizar el juego:', error);
      throw error;
    }
  },

  // Verificar el estado de la sincronización
  async checkSyncStatus() {
    try {
      const response = await axios.get(`${API_URL}/save/status`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error al verificar el estado de sincronización:', error);
      throw error;
    }
  }
}; 