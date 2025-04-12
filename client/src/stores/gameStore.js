import { create } from 'zustand';

const useGameStore = create((set) => ({
  jugador: null,
  monstruoActual: null,
  enCombate: false,
  inventario: [],
  misiones: [],
  
  crearJugador: (datosPersonaje) => set((state) => ({
    jugador: {
      ...datosPersonaje,
      nivel: 1,
      experiencia: 0,
      vida: 100,
      vidaMaxima: 100,
      stamina: 100,
      staminaMaxima: 100,
      ataque: 10,
      defensa: 5,
      velocidad: 5,
      zenny: 1000,
      armas: [],
      armadura: null,
      items: [],
      misionesCompletadas: 0
    }
  })),

  iniciarCombate: (monstruo) => set((state) => ({
    monstruoActual: monstruo,
    enCombate: true
  })),

  terminarCombate: () => set((state) => ({
    monstruoActual: null,
    enCombate: false
  })),

  actualizarJugador: (datos) => set((state) => ({
    jugador: {
      ...state.jugador,
      ...datos
    }
  })),

  agregarItem: (item) => set((state) => ({
    inventario: [...state.inventario, item]
  })),

  removerItem: (itemId) => set((state) => ({
    inventario: state.inventario.filter(item => item.id !== itemId)
  })),

  agregarMision: (mision) => set((state) => ({
    misiones: [...state.misiones, mision]
  })),

  completarMision: (misionId) => set((state) => ({
    misiones: state.misiones.map(mision => 
      mision.id === misionId 
        ? { ...mision, completada: true }
        : mision
    )
  })),

  // Utilidades
  reiniciarJuego: () => {
    set({
      jugador: null,
      monstruoActual: null,
      enCombate: false,
      inventario: [],
      misiones: [],
      error: null
    });
  }
}));

export default useGameStore; 