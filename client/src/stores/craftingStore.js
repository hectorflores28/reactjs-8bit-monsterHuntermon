import { create } from 'zustand';
import axios from 'axios';

const API_URL = '/api';

const useCraftingStore = create((set, get) => ({
  // Estado del sistema de fabricación
  recipes: [],
  materials: [],
  craftingQueue: [],
  loading: false,
  error: null,

  // Cargar recetas y materiales
  loadCraftingData: async () => {
    try {
      set({ loading: true, error: null });
      const [recipesResponse, materialsResponse] = await Promise.all([
        axios.get(`${API_URL}/crafting/recipes`),
        axios.get(`${API_URL}/crafting/materials`)
      ]);
      set({
        recipes: recipesResponse.data.recipes,
        materials: materialsResponse.data.materials,
        loading: false
      });
    } catch (error) {
      set({
        error: error.response?.data?.message || 'Error al cargar datos de fabricación',
        loading: false
      });
    }
  },

  // Fabricar un item
  craftItem: async (recipeId) => {
    try {
      set({ loading: true, error: null });
      const response = await axios.post(
        `${API_URL}/crafting/craft`,
        { recipeId },
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      );
      set({
        craftingQueue: [...get().craftingQueue, response.data.craftingJob],
        loading: false
      });
      return response.data.craftingJob;
    } catch (error) {
      set({
        error: error.response?.data?.message || 'Error al fabricar item',
        loading: false
      });
      throw error;
    }
  },

  // Mejorar un item
  upgradeItem: async (itemId, upgradeType) => {
    try {
      set({ loading: true, error: null });
      const response = await axios.post(
        `${API_URL}/crafting/upgrade`,
        { itemId, upgradeType },
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      );
      set({ loading: false });
      return response.data.upgradedItem;
    } catch (error) {
      set({
        error: error.response?.data?.message || 'Error al mejorar item',
        loading: false
      });
      throw error;
    }
  },

  // Desmantelar un item
  dismantleItem: async (itemId) => {
    try {
      set({ loading: true, error: null });
      const response = await axios.post(
        `${API_URL}/crafting/dismantle`,
        { itemId },
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      );
      set({
        materials: [...get().materials, ...response.data.materials],
        loading: false
      });
      return response.data.materials;
    } catch (error) {
      set({
        error: error.response?.data?.message || 'Error al desmantelar item',
        loading: false
      });
      throw error;
    }
  },

  // Actualizar cola de fabricación
  updateCraftingQueue: async () => {
    try {
      const response = await axios.get(
        `${API_URL}/crafting/queue`,
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      );
      set({ craftingQueue: response.data.queue });
    } catch (error) {
      console.error('Error al actualizar cola de fabricación:', error);
    }
  },

  // Verificar si se pueden fabricar recetas
  checkRecipeAvailability: (recipeId) => {
    const recipe = get().recipes.find(r => r.id === recipeId);
    if (!recipe) return false;

    return recipe.requirements.every(req => {
      const material = get().materials.find(m => m.id === req.materialId);
      return material && material.quantity >= req.quantity;
    });
  }
}));

export default useCraftingStore; 