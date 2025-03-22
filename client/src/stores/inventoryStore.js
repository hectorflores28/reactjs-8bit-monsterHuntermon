import { create } from 'zustand';
import axios from 'axios';

const API_URL = '/api';

const useInventoryStore = create((set, get) => ({
  // Estado del inventario
  inventory: {
    items: [],
    equippedItems: [],
    maxSlots: 20,
    usedSlots: 0
  },
  loading: false,
  error: null,

  // Cargar inventario
  loadInventory: async () => {
    try {
      set({ loading: true, error: null });
      const response = await axios.get(
        `${API_URL}/inventory`,
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      );
      set({
        inventory: response.data.inventory,
        loading: false
      });
    } catch (error) {
      set({
        error: error.response?.data?.message || 'Error al cargar inventario',
        loading: false
      });
    }
  },

  // Equipar item
  equipItem: async (itemId) => {
    try {
      set({ loading: true, error: null });
      const response = await axios.post(
        `${API_URL}/inventory/equip`,
        { itemId },
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      );
      set({
        inventory: {
          ...get().inventory,
          equippedItems: response.data.equippedItems
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

  // Desequipar item
  unequipItem: async (itemId) => {
    try {
      set({ loading: true, error: null });
      const response = await axios.post(
        `${API_URL}/inventory/unequip`,
        { itemId },
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      );
      set({
        inventory: {
          ...get().inventory,
          equippedItems: response.data.equippedItems
        },
        loading: false
      });
    } catch (error) {
      set({
        error: error.response?.data?.message || 'Error al desequipar item',
        loading: false
      });
    }
  },

  // Agregar item al inventario
  addItem: async (item) => {
    const currentInventory = get().inventory;
    if (currentInventory.usedSlots >= currentInventory.maxSlots) {
      set({
        error: 'Inventario lleno'
      });
      return false;
    }

    try {
      set({ loading: true, error: null });
      const response = await axios.post(
        `${API_URL}/inventory/add`,
        { item },
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      );
      set({
        inventory: response.data.inventory,
        loading: false
      });
      return true;
    } catch (error) {
      set({
        error: error.response?.data?.message || 'Error al agregar item',
        loading: false
      });
      return false;
    }
  },

  // Remover item del inventario
  removeItem: async (itemId) => {
    try {
      set({ loading: true, error: null });
      const response = await axios.post(
        `${API_URL}/inventory/remove`,
        { itemId },
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      );
      set({
        inventory: response.data.inventory,
        loading: false
      });
    } catch (error) {
      set({
        error: error.response?.data?.message || 'Error al remover item',
        loading: false
      });
    }
  },

  // Filtrar items por tipo
  filterItems: (type) => {
    const items = get().inventory.items;
    if (type === 'all') return items;
    return items.filter(item => item.type === type);
  },

  // Ordenar items por rareza
  sortItemsByRarity: () => {
    const items = get().inventory.items;
    const rarityOrder = {
      legendary: 4,
      epic: 3,
      rare: 2,
      uncommon: 1,
      common: 0
    };
    return [...items].sort((a, b) => rarityOrder[b.rarity] - rarityOrder[a.rarity]);
  },

  // Verificar si un item está equipado
  isItemEquipped: (itemId) => {
    return get().inventory.equippedItems.includes(itemId);
  },

  // Obtener items equipados por tipo
  getEquippedItemsByType: (type) => {
    const equippedItems = get().inventory.equippedItems;
    return get().inventory.items.filter(item => 
      equippedItems.includes(item.id) && item.type === type
    );
  }
}));

export default useInventoryStore; 