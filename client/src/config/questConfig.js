// Tipos de misiones
export const QUEST_TYPES = {
  MAIN: 'main',
  SIDE: 'side',
  DAILY: 'daily'
};

// Estados de las misiones
export const QUEST_STATUS = {
  NOT_STARTED: 'not_started',
  IN_PROGRESS: 'in_progress',
  COMPLETED: 'completed',
  FAILED: 'failed'
};

// Configuración de misiones principales
export const MAIN_QUESTS = {
  CHAPTER_1: {
    id: 'main_001',
    title: 'El Despertar del Cazador',
    description: 'Comienza tu viaje como cazador y aprende las bases del combate.',
    objectives: [
      {
        id: 'obj_001',
        description: 'Derrota a tu primer Rathalos',
        type: 'DEFEAT_MONSTER',
        target: 'RATHALOS',
        count: 1,
        reward: {
          experience: 1000,
          gold: 500,
          items: ['basic_armor_set', 'health_potion_x3']
        }
      }
    ],
    requirements: null,
    nextQuest: 'main_002'
  }
};

// Configuración de misiones secundarias
export const SIDE_QUESTS = {
  HUNTING_EXPERT: {
    id: 'side_001',
    title: 'Cazador Experto',
    description: 'Demuestra tu habilidad derrotando múltiples monstruos.',
    objectives: [
      {
        id: 'obj_002',
        description: 'Derrota 5 monstruos usando combos',
        type: 'DEFEAT_WITH_COMBO',
        count: 5,
        reward: {
          experience: 500,
          gold: 300,
          items: ['rare_material_x2']
        }
      }
    ],
    requirements: {
      level: 5
    },
    timeLimit: 86400000 // 24 horas en milisegundos
  }
};

// Configuración de desafíos diarios
export const DAILY_CHALLENGES = {
  COMBO_MASTER: {
    id: 'daily_001',
    title: 'Maestro del Combo',
    description: 'Realiza combos perfectos en batalla.',
    objectives: [
      {
        id: 'obj_003',
        description: 'Realiza 10 combos perfectos',
        type: 'PERFECT_COMBO',
        count: 10,
        reward: {
          experience: 200,
          gold: 100,
          items: ['combo_scroll']
        }
      }
    ],
    resetTime: 'daily' // Se reinicia cada día
  }
};

// Recompensas por rango
export const QUEST_REWARDS = {
  S_RANK: {
    multiplier: 2.0,
    bonus_items: ['legendary_material']
  },
  A_RANK: {
    multiplier: 1.5,
    bonus_items: ['rare_material']
  },
  B_RANK: {
    multiplier: 1.2,
    bonus_items: ['uncommon_material']
  },
  C_RANK: {
    multiplier: 1.0,
    bonus_items: []
  }
};

// Sistema de progresión de misiones
export class QuestProgressionSystem {
  constructor() {
    this.activeQuests = new Map();
    this.completedQuests = new Set();
    this.dailyProgress = new Map();
  }

  startQuest(questId) {
    // Implementación para iniciar una misión
  }

  updateProgress(questId, objectiveId, progress) {
    // Implementación para actualizar el progreso
  }

  completeQuest(questId) {
    // Implementación para completar una misión
  }

  calculateRank(questId, performance) {
    // Implementación para calcular el rango
  }

  getDailyQuests() {
    // Implementación para obtener misiones diarias
  }

  resetDailyQuests() {
    // Implementación para reiniciar misiones diarias
  }
} 