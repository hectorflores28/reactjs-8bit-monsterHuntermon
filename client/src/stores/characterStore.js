import { create } from 'zustand';
import axios from 'axios';

const API_URL = '/api';

const useCharacterStore = create((set, get) => ({
  // Estado del personaje
  character: {
    appearance: {
      hair: 'default',
      face: 'default',
      skin: 'default',
      outfit: 'default',
      accessories: []
    },
    stats: {
      strength: 1,
      dexterity: 1,
      vitality: 1,
      intelligence: 1,
      availablePoints: 0
    },
    talents: [],
    equipment: {
      weapon: null,
      armor: null,
      accessory: null
    }
  },
  loading: false,
  error: null,

  // Acciones de personalización
  updateAppearance: async (appearance) => {
    try {
      set({ loading: true, error: null });
      const response = await axios.put(
        `${API_URL}/character/appearance`,
        { appearance },
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      );
      set({
        character: {
          ...get().character,
          appearance: response.data.appearance
        },
        loading: false
      });
    } catch (error) {
      set({
        error: error.response?.data?.message || 'Error al actualizar apariencia',
        loading: false
      });
    }
  },

  // Sistema de talentos
  addTalent: async (talentId) => {
    try {
      set({ loading: true, error: null });
      const response = await axios.post(
        `${API_URL}/character/talents`,
        { talentId },
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      );
      set({
        character: {
          ...get().character,
          talents: [...get().character.talents, response.data.talent]
        },
        loading: false
      });
    } catch (error) {
      set({
        error: error.response?.data?.message || 'Error al agregar talento',
        loading: false
      });
    }
  },

  // Sistema de estadísticas
  updateStats: async (stats) => {
    try {
      set({ loading: true, error: null });
      const response = await axios.put(
        `${API_URL}/character/stats`,
        { stats },
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      );
      set({
        character: {
          ...get().character,
          stats: response.data.stats
        },
        loading: false
      });
    } catch (error) {
      set({
        error: error.response?.data?.message || 'Error al actualizar estadísticas',
        loading: false
      });
    }
  },

  // Sistema de equipamiento
  equipItem: async (itemId, slot) => {
    try {
      set({ loading: true, error: null });
      const response = await axios.post(
        `${API_URL}/character/equipment`,
        { itemId, slot },
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      );
      set({
        character: {
          ...get().character,
          equipment: response.data.equipment
        },
        loading: false
      });
    } catch (error) {
      set({
        error: error.response?.data?.message || 'Error al equipar item',
        loading: false
      });
    }
  },

  // Cargar datos del personaje
  loadCharacter: async () => {
    try {
      set({ loading: true, error: null });
      const response = await axios.get(
        `${API_URL}/character`,
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      );
      set({
        character: response.data.character,
        loading: false
      });
    } catch (error) {
      set({
        error: error.response?.data?.message || 'Error al cargar personaje',
        loading: false
      });
    }
  }
}));

export default useCharacterStore; 