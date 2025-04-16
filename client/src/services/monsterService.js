import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const monsterService = {
  // Obtener todos los monstruos
  async getAllMonsters() {
    try {
      const response = await axios.get(`${API_URL}/monsters`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error al obtener monstruos:', error);
      throw error;
    }
  },

  // Obtener monstruos por tipo
  async getMonstersByType(type) {
    try {
      const response = await axios.get(`${API_URL}/monsters/type/${type}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error al obtener monstruos por tipo:', error);
      throw error;
    }
  },

  // Obtener información detallada de un monstruo
  async getMonsterDetails(monsterId) {
    try {
      const response = await axios.get(`${API_URL}/monsters/${monsterId}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error al obtener detalles del monstruo:', error);
      throw error;
    }
  },

  // Obtener patrones de ataque de un monstruo
  async getMonsterAttackPatterns(monsterId) {
    try {
      const response = await axios.get(`${API_URL}/monsters/${monsterId}/attacks`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error al obtener patrones de ataque:', error);
      throw error;
    }
  },

  // Obtener debilidades de un monstruo
  async getMonsterWeaknesses(monsterId) {
    try {
      const response = await axios.get(`${API_URL}/monsters/${monsterId}/weaknesses`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error al obtener debilidades:', error);
      throw error;
    }
  },

  // Obtener recompensas de un monstruo
  async getMonsterRewards(monsterId) {
    try {
      const response = await axios.get(`${API_URL}/monsters/${monsterId}/rewards`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error al obtener recompensas:', error);
      throw error;
    }
  },

  // Registrar derrota de monstruo
  async registerMonsterDefeat(monsterId, data) {
    try {
      const response = await axios.post(
        `${API_URL}/monsters/${monsterId}/defeat`,
        data,
        {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        }
      );
      return response.data;
    } catch (error) {
      console.error('Error al registrar derrota:', error);
      throw error;
    }
  }
}; 