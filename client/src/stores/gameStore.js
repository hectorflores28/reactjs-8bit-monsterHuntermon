import { create } from 'zustand';
import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const useGameStore = create((set, get) => ({
  // Estado del juego
  jugador: null,
  monstruoActual: null,
  inventario: [],
  estadisticas: null,
  enCombate: false,
  cargando: false,
  error: null,

  // Acciones del jugador
  crearJugador: async (nombre) => {
    set({ cargando: true, error: null });
    try {
      const response = await axios.post(`${API_URL}/jugadores`, { nombre });
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
      const response = await axios.get(`${API_URL}/jugadores/${id}`);
      set({ jugador: response.data });
    } catch (error) {
      set({ error: error.response?.data?.message || 'Error al cargar jugador' });
      throw error;
    } finally {
      set({ cargando: false });
    }
  },

  // Acciones de combate
  iniciarCombate: (monstruo) => {
    set({ monstruoActual: monstruo, enCombate: true });
  },

  atacar: async (tipoAtaque) => {
    const { monstruoActual } = get();
    if (!monstruoActual) return;

    set({ cargando: true });
    try {
      const response = await axios.post(`${API_URL}/combate/atacar`, {
        tipoAtaque,
        monstruoId: monstruoActual.id
      });
      set({ monstruoActual: response.data.monstruo });
      return response.data;
    } catch (error) {
      set({ error: error.response?.data?.message || 'Error al atacar' });
    } finally {
      set({ cargando: false });
    }
  },

  esquivar: async () => {
    set({ cargando: true });
    try {
      const response = await axios.post(`${API_URL}/combate/esquivar`);
      return response.data;
    } catch (error) {
      set({ error: error.response?.data?.message || 'Error al esquivar' });
    } finally {
      set({ cargando: false });
    }
  },

  bloquear: async () => {
    set({ cargando: true });
    try {
      const response = await axios.post(`${API_URL}/combate/bloquear`);
      return response.data;
    } catch (error) {
      set({ error: error.response?.data?.message || 'Error al bloquear' });
    } finally {
      set({ cargando: false });
    }
  },

  finalizarCombate: () => {
    set({ monstruoActual: null, enCombate: false });
  },

  // Gestión de inventario
  agregarItem: (item) => {
    const { inventario } = get();
    set({ inventario: [...inventario, item] });
  },

  removerItem: (itemId) => {
    const { inventario } = get();
    set({ inventario: inventario.filter(item => item.id !== itemId) });
  },

  equiparItem: (itemId) => {
    const { inventario, jugador } = get();
    const item = inventario.find(i => i.id === itemId);
    if (item) {
      set({
        jugador: { ...jugador, equipamiento: { ...jugador.equipamiento, [item.tipo]: item } },
        inventario: inventario.filter(i => i.id !== itemId)
      });
    }
  },

  // Gestión de estadísticas
  actualizarEstadisticas: async () => {
    try {
      const response = await axios.get(`${API_URL}/jugadores/${get().jugador?.id}/estadisticas`);
      set({ estadisticas: response.data });
    } catch (error) {
      set({ error: error.response?.data?.message || 'Error al actualizar estadísticas' });
    }
  },

  // Utilidades
  limpiarError: () => set({ error: null }),
  
  reiniciarEstado: () => {
    set({
      jugador: null,
      monstruoActual: null,
      inventario: [],
      estadisticas: null,
      enCombate: false,
      cargando: false,
      error: null
    });
  }
}));

export { useGameStore }; 