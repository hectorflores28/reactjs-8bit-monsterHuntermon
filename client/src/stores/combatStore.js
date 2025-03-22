import { create } from 'zustand';
import axios from 'axios';
import { 
  calculateStatusEffectInteraction,
  canStatusEffectsInteract,
  getInteractionResult
} from '../config/statusEffectInteractions';
import {
  calculateSkillDamage,
  checkComboChain,
  applyComboBonus
} from '../config/comboSystem';

const API_URL = '/api';

const useCombatStore = create((set, get) => ({
  // Estado del combate
  combat: {
    health: 100,
    maxHealth: 100,
    statusEffects: [],
    skills: [],
    comboProgress: 0,
    comboPoints: 0,
    lastUsedSkills: [],
    isInCombat: false
  },
  loading: false,
  error: null,

  // Acciones de combate
  startCombat: async (monsterId) => {
    try {
      set({ loading: true, error: null });
      const response = await axios.post(
        `${API_URL}/combat/start`,
        { monsterId },
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      );
      set({
        combat: {
          ...get().combat,
          ...response.data.combat,
          isInCombat: true,
          lastUsedSkills: [],
          comboPoints: 0
        },
        loading: false
      });
    } catch (error) {
      set({
        error: error.response?.data?.message || 'Error al iniciar combate',
        loading: false
      });
    }
  },

  useSkill: async (skillId) => {
    try {
      const currentCombat = get().combat;
      const skill = currentCombat.skills.find(s => s.id === skillId);
      
      if (!skill) {
        throw new Error('Habilidad no encontrada');
      }

      // Calcular daño con bonus de combo
      const comboChain = checkComboChain([...currentCombat.lastUsedSkills, skill]);
      const enhancedSkill = applyComboBonus(skill, comboChain);
      const finalDamage = calculateSkillDamage(enhancedSkill, currentCombat.comboPoints);

      set({ loading: true, error: null });
      const response = await axios.post(
        `${API_URL}/combat/skill`,
        { 
          skillId,
          damage: finalDamage,
          comboChain: comboChain?.id
        },
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      );

      // Actualizar estado del combate
      const newLastUsedSkills = [...currentCombat.lastUsedSkills, skill].slice(-3);
      const newComboPoints = currentCombat.comboPoints + skill.comboPoints;

      set({
        combat: {
          ...currentCombat,
          ...response.data.combat,
          lastUsedSkills: newLastUsedSkills,
          comboPoints: newComboPoints,
          comboProgress: Math.min(100, (newComboPoints / 5) * 100)
        },
        loading: false
      });

      return response.data.result;
    } catch (error) {
      set({
        error: error.response?.data?.message || 'Error al usar habilidad',
        loading: false
      });
      throw error;
    }
  },

  updateCombatState: (newState) => {
    set({
      combat: {
        ...get().combat,
        ...newState
      }
    });
  },

  // Sistema de estados alterados
  addStatusEffect: (effect) => {
    const currentEffects = get().combat.statusEffects;
    const existingEffect = currentEffects.find(e => e.id === effect.id);

    if (existingEffect) {
      set({
        combat: {
          ...get().combat,
          statusEffects: currentEffects.map(e =>
            e.id === effect.id ? { ...e, duration: effect.duration } : e
          )
        }
      });
    } else {
      // Verificar interacciones con efectos existentes
      const interactions = currentEffects
        .filter(e => canStatusEffectsInteract(effect, e))
        .map(e => calculateStatusEffectInteraction(effect, e))
        .filter(Boolean);

      set({
        combat: {
          ...get().combat,
          statusEffects: [...currentEffects, effect, ...interactions]
        }
      });
    }
  },

  removeStatusEffect: (effectId) => {
    set({
      combat: {
        ...get().combat,
        statusEffects: get().combat.statusEffects.filter(e => e.id !== effectId)
      }
    });
  },

  // Sistema de combos
  updateComboProgress: (progress) => {
    set({
      combat: {
        ...get().combat,
        comboProgress: Math.min(100, Math.max(0, progress))
      }
    });
  },

  resetCombo: () => {
    set({
      combat: {
        ...get().combat,
        comboProgress: 0,
        comboPoints: 0,
        lastUsedSkills: []
      }
    });
  },

  // Sistema de habilidades
  updateSkillCooldown: (skillId, cooldown) => {
    set({
      combat: {
        ...get().combat,
        skills: get().combat.skills.map(skill =>
          skill.id === skillId ? { ...skill, cooldown } : skill
        )
      }
    });
  },

  // Finalizar combate
  endCombat: async () => {
    try {
      set({ loading: true, error: null });
      const response = await axios.post(
        `${API_URL}/combat/end`,
        {},
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      );
      set({
        combat: {
          ...get().combat,
          isInCombat: false,
          statusEffects: [],
          comboProgress: 0,
          comboPoints: 0,
          lastUsedSkills: []
        },
        loading: false
      });
      return response.data.rewards;
    } catch (error) {
      set({
        error: error.response?.data?.message || 'Error al finalizar combate',
        loading: false
      });
      throw error;
    }
  }
}));

export default useCombatStore; 