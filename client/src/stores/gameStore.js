import { create } from 'zustand';
import axios from 'axios';

const API_URL = '/api';

const useGameStore = create((set, get) => ({
  jugador: null,
  monstruoActual: null,
  inventario: [],
  estadisticas: null,
  enCombate: false,
  cargando: false,
  error: null,

  crearJugador: async (nombre) => {
    set({ cargando: true, error: null });
    try {
      const response = await axios.post('http://localhost:5000/api/jugadores', { nombre });
      set({ jugador: response.data });
      return response.data;
    } catch (error) {
      set({ error: error.response?.data?.message || 'Error al crear jugador' });
      throw error;
    } finally {
      set({ cargando: false });
    }
  },

  cargarJugador: async (id) => {
    set({ cargando: true, error: null });
    try {
      const [jugadorResponse, estadisticasResponse, inventarioResponse] = await Promise.all([
        axios.get(`http://localhost:5000/api/jugadores/${id}`),
        axios.get(`http://localhost:5000/api/jugadores/${id}/estadisticas`),
        axios.get(`http://localhost:5000/api/jugadores/${id}/inventario`)
      ]);

      set({
        jugador: jugadorResponse.data,
        estadisticas: estadisticasResponse.data,
        inventario: inventarioResponse.data
      });
    } catch (error) {
      set({ error: error.response?.data?.message || 'Error al cargar jugador' });
      throw error;
    } finally {
      set({ cargando: false });
    }
  },

  iniciarCombate: (monstruo) => {
    set({ monstruoActual: monstruo, enCombate: true });
  },

  finalizarCombate: async (resultado, duracion, recompensa) => {
    try {
      const { jugador, monstruoActual } = get();
      await axios.post('http://localhost:5000/api/jugadores/caza', {
        jugadorId: jugador.id,
        monstruoId: monstruoActual.id,
        duracion,
        resultado,
        recompensa
      });

      // Recargar estadísticas del jugador
      await get().cargarJugador(jugador.id);
      
      set({ monstruoActual: null, enCombate: false });
    } catch (error) {
      set({ error: error.response?.data?.message || 'Error al finalizar combate' });
      throw error;
    }
  },

  clearError: () => {
    set({ error: null });
  },

  // Acciones del jugador
  movePlayer: (movement) => {
    const { jugador } = get();
    set({
      jugador: {
        ...jugador,
        position: {
          x: jugador.position.x + movement.x,
          y: jugador.position.y + movement.y
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
        monstruoActual: response.data.monster,
        enCombate: true,
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
      monstruoActual: null,
      enCombate: false
    });
  },

  // Gestión de inventario
  addItem: (item) => {
    const { jugador } = get();
    set({
      jugador: {
        ...jugador,
        inventory: [...jugador.inventory, item]
      }
    });
  },

  removeItem: (itemId) => {
    const { jugador } = get();
    set({
      jugador: {
        ...jugador,
        inventory: jugador.inventory.filter(item => item.id !== itemId)
      }
    });
  },

  equipItem: (itemId) => {
    const { jugador } = get();
    const item = jugador.inventory.find(item => item.id === itemId);
    if (!item) return;

    set({
      jugador: {
        ...jugador,
        [item.type]: item,
        inventory: jugador.inventory.filter(item => item.id !== itemId)
      }
    });
  },

  // Progresión del personaje
  gainExperience: (amount) => {
    const { jugador } = get();
    const newExperience = jugador.experience + amount;
    const experienceNeeded = jugador.level * 1000;

    if (newExperience >= experienceNeeded) {
      // Subir de nivel
      set({
        jugador: {
          ...jugador,
          level: jugador.level + 1,
          experience: newExperience - experienceNeeded,
          health: jugador.health + 10,
          stamina: jugador.stamina + 5
        }
      });
    } else {
      set({
        jugador: {
          ...jugador,
          experience: newExperience
        }
      });
    }
  },

  // Guardado automático
  saveGame: async () => {
    try {
      const { jugador } = get();
      await axios.post(`${API_URL}/game/save`, { jugador });
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
        jugador: response.data.jugador,
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