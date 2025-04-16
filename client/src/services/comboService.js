import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Tiempo mínimo para considerar un click como pesado (en ms)
const HOLD_THRESHOLD = 300;

export const comboService = {
  // Detectar tipo de click
  detectClickType(event, startTime) {
    const duration = Date.now() - startTime;
    return duration >= HOLD_THRESHOLD ? 'heavy' : 'light';
  },

  // Registrar combo
  async registerCombo(comboData) {
    try {
      const response = await axios.post(`${API_URL}/combos/register`, comboData, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error al registrar combo:', error);
      throw error;
    }
  },

  // Obtener combos disponibles
  async getAvailableCombos() {
    try {
      const response = await axios.get(`${API_URL}/combos/available`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error al obtener combos:', error);
      throw error;
    }
  },

  // Obtener progreso de combos
  async getComboProgress() {
    try {
      const response = await axios.get(`${API_URL}/combos/progress`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error al obtener progreso de combos:', error);
      throw error;
    }
  },

  // Obtener recompensas de combo
  async getComboRewards(comboId) {
    try {
      const response = await axios.get(`${API_URL}/combos/${comboId}/rewards`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error al obtener recompensas de combo:', error);
      throw error;
    }
  }
}; 