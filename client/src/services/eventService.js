import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const eventService = {
  // Obtener eventos activos
  async getActiveEvents() {
    try {
      const response = await axios.get(`${API_URL}/events/active`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error al obtener eventos activos:', error);
      throw error;
    }
  },

  // Obtener eventos diarios
  async getDailyEvents() {
    try {
      const response = await axios.get(`${API_URL}/events/daily`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error al obtener eventos diarios:', error);
      throw error;
    }
  },

  // Obtener eventos semanales
  async getWeeklyEvents() {
    try {
      const response = await axios.get(`${API_URL}/events/weekly`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error al obtener eventos semanales:', error);
      throw error;
    }
  },

  // Obtener eventos mensuales
  async getMonthlyEvents() {
    try {
      const response = await axios.get(`${API_URL}/events/monthly`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error al obtener eventos mensuales:', error);
      throw error;
    }
  },

  // Obtener eventos especiales
  async getSpecialEvents() {
    try {
      const response = await axios.get(`${API_URL}/events/special`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error al obtener eventos especiales:', error);
      throw error;
    }
  },

  // Participar en un evento
  async participateInEvent(eventId) {
    try {
      const response = await axios.post(
        `${API_URL}/events/${eventId}/participate`,
        {},
        {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        }
      );
      return response.data;
    } catch (error) {
      console.error('Error al participar en el evento:', error);
      throw error;
    }
  },

  // Obtener recompensas del evento
  async claimEventRewards(eventId) {
    try {
      const response = await axios.post(
        `${API_URL}/events/${eventId}/rewards`,
        {},
        {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        }
      );
      return response.data;
    } catch (error) {
      console.error('Error al reclamar recompensas del evento:', error);
      throw error;
    }
  }
}; 