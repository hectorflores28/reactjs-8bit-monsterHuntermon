import axios from 'axios';

const API_URL = import.meta.env.VITE_APP_API_URL;

export const saveGameData = async (userId, gameData) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.post(
      `${API_URL}/api/cloud-save/save`,
      { userId, gameData },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error al guardar los datos:', error);
    throw error;
  }
};

export const loadGameData = async (userId) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.get(
      `${API_URL}/api/cloud-save/load/${userId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error al cargar los datos:', error);
    throw error;
  }
};

export const syncGameData = async (userId, localData) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.post(
      `${API_URL}/api/cloud-save/sync`,
      { userId, localData },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error al sincronizar los datos:', error);
    throw error;
  }
}; 