import { create } from 'zustand';

const useGameStore = create((set) => ({
  // Estado del juego
  jugador: null,
  monstruo: null,
  enCombate: false,
  error: null,
  cargando: false,

  // Acciones básicas
  crearJugador: (nombre) => {
    try {
      // Por ahora, solo guardamos localmente
      const nuevoJugador = {
        id: Date.now(), // ID temporal
        nombre: nombre,
        nivel: 1,
        vida: 100,
        energia: 100,
        experiencia: 0,
        oro: 0,
        inventario: []
      };
      
      set({ jugador: nuevoJugador, error: null });
      return nuevoJugador;
    } catch (error) {
      set({ error: 'Error al crear el jugador' });
      throw error;
    }
  },

  // Acciones de combate
  iniciarCombate: (monstruo) => {
    set({ monstruo, enCombate: true });
  },

  finalizarCombate: () => {
    set({ monstruo: null, enCombate: false });
  },

  // Utilidades
  reiniciarJuego: () => {
    set({
      jugador: null,
      monstruo: null,
      enCombate: false,
      error: null
    });
  }
}));

export { useGameStore }; 