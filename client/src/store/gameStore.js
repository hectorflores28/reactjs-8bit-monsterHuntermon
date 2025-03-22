import create from 'zustand';
import { WEAPONS, MONSTERS, STATUS_EFFECTS } from '../config/combatConfig';

const useGameStore = create((set, get) => ({
  // Estado del jugador
  player: {
    health: 100,
    maxHealth: 100,
    stamina: 100,
    maxStamina: 100,
    level: 1,
    experience: 0,
    experienceToNextLevel: 1000,
    money: 0,
    weapon: 'GREAT_SWORD',
    inventory: [],
    statusEffects: []
  },

  // Estado del monstruo
  monster: null,

  // Estado del combate
  isInCombat: false,
  currentAction: null,
  comboSequence: [],

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

  endCombat: () => {
    set({
      monster: null,
      isInCombat: false,
      currentAction: null,
      comboSequence: []
    });
  },

  updatePlayerHealth: (newHealth) => {
    set(state => ({
      player: {
        ...state.player,
        health: Math.max(0, Math.min(newHealth, state.player.maxHealth))
      }
    }));
  },

  updateMonsterHealth: (newHealth) => {
    set(state => ({
      monster: state.monster ? {
        ...state.monster,
        health: Math.max(0, Math.min(newHealth, state.monster.maxHealth))
      } : null
    }));
  },

  updatePlayerStamina: (newStamina) => {
    set(state => ({
      player: {
        ...state.player,
        stamina: Math.max(0, Math.min(newStamina, state.player.maxStamina))
      }
    }));
  },

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
  }
}));

export default useGameStore; 