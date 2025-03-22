import { create } from 'zustand';
import axios from 'axios';

const API_URL = '/api';

const useGameStore = create((set, get) => ({
  player: {
    position: { x: 0, y: 0 },
    health: 100,
    stamina: 100,
    level: 1,
    experience: 0,
    weapon: null,
    armor: null,
    inventory: []
  },
  currentMonster: null,
  isInCombat: false,
  loading: false,
  error: null,

  // Acciones del jugador
  movePlayer: (movement) => {
    const { player } = get();
    set({
      player: {
        ...player,
        position: {
          x: player.position.x + movement.x,
          y: player.position.y + movement.y
        }
      }
    });
  },

  // Acciones de combate
  startCombat: async (monsterId) => {
    try {
      set({ loading: true, error: null });
      const response = await axios.post(`${API_URL}/game/hunt/start`, { monsterId });
      set({
        currentMonster: response.data.monster,
        isInCombat: true,
        loading: false
      });
    } catch (error) {
      set({
        error: error.response?.data?.message || 'Error al iniciar combate',
        loading: false
      });
    }
  },

  performAttack: async (attackType, combo) => {
    try {
      set({ loading: true, error: null });
      const response = await axios.post(`${API_URL}/game/hunt/attack`, {
        attackType,
        combo
      });
      set({ loading: false });
      return response.data;
    } catch (error) {
      set({
        error: error.response?.data?.message || 'Error al realizar ataque',
        loading: false
      });
      throw error;
    }
  },

  endCombat: () => {
    set({
      currentMonster: null,
      isInCombat: false
    });
  },

  // Gestión de inventario
  addItem: (item) => {
    const { player } = get();
    set({
      player: {
        ...player,
        inventory: [...player.inventory, item]
      }
    });
  },

  removeItem: (itemId) => {
    const { player } = get();
    set({
      player: {
        ...player,
        inventory: player.inventory.filter(item => item.id !== itemId)
      }
    });
  },

  equipItem: (itemId) => {
    const { player } = get();
    const item = player.inventory.find(item => item.id === itemId);
    if (!item) return;

    set({
      player: {
        ...player,
        [item.type]: item,
        inventory: player.inventory.filter(item => item.id !== itemId)
      }
    });
  },

  // Progresión del personaje
  gainExperience: (amount) => {
    const { player } = get();
    const newExperience = player.experience + amount;
    const experienceNeeded = player.level * 1000;

    if (newExperience >= experienceNeeded) {
      // Subir de nivel
      set({
        player: {
          ...player,
          level: player.level + 1,
          experience: newExperience - experienceNeeded,
          health: player.health + 10,
          stamina: player.stamina + 5
        }
      });
    } else {
      set({
        player: {
          ...player,
          experience: newExperience
        }
      });
    }
  },

  // Guardado automático
  saveGame: async () => {
    try {
      const { player } = get();
      await axios.post(`${API_URL}/game/save`, { player });
    } catch (error) {
      console.error('Error al guardar el juego:', error);
    }
  },

  // Cargar juego guardado
  loadGame: async () => {
    try {
      set({ loading: true, error: null });
      const response = await axios.get(`${API_URL}/game/load`);
      set({
        player: response.data.player,
        loading: false
      });
    } catch (error) {
      set({
        error: error.response?.data?.message || 'Error al cargar el juego',
        loading: false
      });
    }
  }
}));

export default useGameStore; 