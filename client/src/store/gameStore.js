import create from 'zustand';
import { WEAPONS, MONSTERS, STATUS_EFFECTS } from '../config/combatConfig';
import { QuestManager } from '../managers/QuestManager';

const useGameStore = create((set, get) => ({
  // Estado del jugador
  player: {
    health: 100,
    maxHealth: 100,
    stamina: 100,
    maxStamina: 100,
    level: 1,
    experience: 0,
    gold: 0,
    inventory: new Map(),
    equipment: {
      weapon: 'GREAT_SWORD',
      armor: null,
      accessories: []
    }
  },

  // Estado del monstruo actual
  monster: null,

  // Estado del combate
  isInCombat: false,
  currentAction: null,
  comboSequence: [],

  // Sistema de misiones
  questManager: new QuestManager(),
  activeQuests: [],
  questNotifications: [],

  // Acciones
  startCombat: (monsterType) => {
    const monsterConfig = MONSTERS[monsterType];
    set({
      monster: {
        type: monsterType,
        health: monsterConfig.baseHealth,
        maxHealth: monsterConfig.baseHealth,
        statusEffects: []
      },
      isInCombat: true,
      currentAction: null,
      comboSequence: []
    });
  },

  endCombat: (rewards = null) => {
    const state = get();
    
    if (rewards) {
      state.updatePlayerExperience(rewards.experience);
      state.updatePlayerGold(rewards.gold);
      rewards.materials.forEach(material => {
        state.addToInventory(material);
      });

      // Actualizar progreso de misiones
      state.questManager.onMonsterDefeated(state.monster.type);
    }

    set({
      monster: null,
      isInCombat: false,
      currentAction: null,
      comboSequence: []
    });
  },

  updatePlayerHealth: (health) => set(state => ({
    player: {
      ...state.player,
      health: Math.max(0, Math.min(health, state.player.maxHealth))
    }
  })),

  updateMonsterHealth: (health) => set(state => ({
    monster: {
      ...state.monster,
      health: Math.max(0, health)
    }
  })),

  updatePlayerStamina: (stamina) => set(state => ({
    player: {
      ...state.player,
      stamina: Math.max(0, Math.min(stamina, state.player.maxStamina))
    }
  })),

  updatePlayerExperience: (experience) => set(state => {
    const newExperience = state.player.experience + experience;
    const experienceToLevel = state.player.level * 1000;
    
    if (newExperience >= experienceToLevel) {
      return {
        player: {
          ...state.player,
          level: state.player.level + 1,
          experience: newExperience - experienceToLevel,
          maxHealth: state.player.maxHealth + 10,
          maxStamina: state.player.maxStamina + 5,
          health: state.player.maxHealth + 10,
          stamina: state.player.maxStamina + 5
        }
      };
    }

    return {
      player: {
        ...state.player,
        experience: newExperience
      }
    };
  }),

  updatePlayerGold: (gold) => set(state => ({
    player: {
      ...state.player,
      gold: Math.max(0, state.player.gold + gold)
    }
  })),

  addToInventory: (itemId, quantity = 1) => set(state => {
    const newInventory = new Map(state.player.inventory);
    const currentQuantity = newInventory.get(itemId) || 0;
    newInventory.set(itemId, currentQuantity + quantity);

    return {
      player: {
        ...state.player,
        inventory: newInventory
      }
    };
  }),

  removeFromInventory: (itemId, quantity = 1) => set(state => {
    const newInventory = new Map(state.player.inventory);
    const currentQuantity = newInventory.get(itemId) || 0;
    
    if (currentQuantity <= quantity) {
      newInventory.delete(itemId);
    } else {
      newInventory.set(itemId, currentQuantity - quantity);
    }

    return {
      player: {
        ...state.player,
        inventory: newInventory
      }
    };
  }),

  addExperience: (amount) => {
    set(state => {
      const newExperience = state.player.experience + amount;
      const experienceToNextLevel = state.player.experienceToNextLevel;
      
      if (newExperience >= experienceToNextLevel) {
        // Subir de nivel
        return {
          player: {
            ...state.player,
            level: state.player.level + 1,
            experience: newExperience - experienceToNextLevel,
            experienceToNextLevel: Math.floor(experienceToNextLevel * 1.5),
            maxHealth: state.player.maxHealth + 10,
            health: state.player.maxHealth + 10,
            maxStamina: state.player.maxStamina + 5,
            stamina: state.player.maxStamina + 5
          }
        };
      }

      return {
        player: {
          ...state.player,
          experience: newExperience
        }
      };
    });
  },

  addMoney: (amount) => {
    set(state => ({
      player: {
        ...state.player,
        money: state.player.money + amount
      }
    }));
  },

  addItem: (item) => {
    set(state => ({
      player: {
        ...state.player,
        inventory: [...state.player.inventory, item]
      }
    }));
  },

  addStatusEffect: (target, effectType) => {
    const effect = STATUS_EFFECTS[effectType];
    if (!effect) return;

    const newEffect = {
      type: effectType,
      expiresAt: Date.now() + effect.duration
    };

    if (target === 'player') {
      set(state => ({
        player: {
          ...state.player,
          statusEffects: [...state.player.statusEffects, newEffect]
        }
      }));
    } else if (target === 'monster') {
      set(state => ({
        monster: state.monster ? {
          ...state.monster,
          statusEffects: [...state.monster.statusEffects, newEffect]
        } : null
      }));
    }
  },

  removeStatusEffect: (target, effectType) => {
    if (target === 'player') {
      set(state => ({
        player: {
          ...state.player,
          statusEffects: state.player.statusEffects.filter(effect => effect.type !== effectType)
        }
      }));
    } else if (target === 'monster') {
      set(state => ({
        monster: state.monster ? {
          ...state.monster,
          statusEffects: state.monster.statusEffects.filter(effect => effect.type !== effectType)
        } : null
      }));
    }
  },

  setCurrentAction: (action) => {
    set({ currentAction: action });
  },

  addToComboSequence: (action) => {
    set(state => ({
      comboSequence: [...state.comboSequence, action]
    }));
  },

  clearComboSequence: () => {
    set({ comboSequence: [] });
  },

  // Acciones de misiones
  initializeQuests: () => {
    const state = get();
    state.questManager.initializeQuests();
    set({
      activeQuests: state.questManager.getActiveQuests()
    });
  },

  startQuest: (questId) => {
    const state = get();
    if (state.questManager.startQuest(questId)) {
      set({
        activeQuests: state.questManager.getActiveQuests()
      });
    }
  },

  abandonQuest: (questId) => {
    const state = get();
    if (state.questManager.abandonQuest(questId)) {
      set({
        activeQuests: state.questManager.getActiveQuests()
      });
    }
  },

  addQuestNotification: (notification) => set(state => ({
    questNotifications: [...state.questNotifications, {
      ...notification,
      id: Date.now()
    }]
  })),

  removeQuestNotification: (notificationId) => set(state => ({
    questNotifications: state.questNotifications.filter(n => n.id !== notificationId)
  })),

  // Eventos de juego
  onComboPerformed: (comboType) => {
    const state = get();
    state.questManager.onComboPerformed(comboType);
  },

  onItemCollected: (itemId) => {
    const state = get();
    state.questManager.onItemCollected(itemId);
  }
}));

export default useGameStore; 