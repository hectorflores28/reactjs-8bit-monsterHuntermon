import { STATUS_EFFECTS } from './combatConfig';

// Estados de comportamiento del monstruo
export const MONSTER_STATES = {
  IDLE: 'IDLE',
  AGGRESSIVE: 'AGGRESSIVE',
  DEFENSIVE: 'DEFENSIVE',
  ENRAGED: 'ENRAGED',
  STUNNED: 'STUNNED'
};

// Patrones de ataque
export const ATTACK_PATTERNS = {
  BASIC: {
    name: 'basic',
    damage: 1.0,
    staminaCost: 0,
    cooldown: 1000,
    priority: 1
  },
  HEAVY: {
    name: 'heavy',
    damage: 1.5,
    staminaCost: 20,
    cooldown: 2000,
    priority: 2
  },
  SPECIAL: {
    name: 'special',
    damage: 2.0,
    staminaCost: 40,
    cooldown: 5000,
    priority: 3
  },
  COUNTER: {
    name: 'counter',
    damage: 1.8,
    staminaCost: 30,
    cooldown: 3000,
    priority: 4
  }
};

// Configuración de IA para cada monstruo
export const MONSTER_AI_CONFIG = {
  RATHALOS: {
    baseAggression: 0.7,
    learningRate: 0.1,
    attackPatterns: [
      {
        pattern: ATTACK_PATTERNS.BASIC,
        conditions: {
          health: { min: 0.5 },
          playerDistance: { max: 2 }
        }
      },
      {
        pattern: ATTACK_PATTERNS.HEAVY,
        conditions: {
          health: { min: 0.3 },
          playerDistance: { max: 1.5 }
        }
      },
      {
        pattern: ATTACK_PATTERNS.SPECIAL,
        conditions: {
          health: { max: 0.3 },
          playerDistance: { max: 3 }
        }
      },
      {
        pattern: ATTACK_PATTERNS.COUNTER,
        conditions: {
          playerAttacking: true,
          playerDistance: { max: 1 }
        }
      }
    ],
    stateTransitions: {
      [MONSTER_STATES.IDLE]: {
        conditions: {
          playerDistance: { min: 5 }
        },
        targetState: MONSTER_STATES.AGGRESSIVE
      },
      [MONSTER_STATES.AGGRESSIVE]: {
        conditions: {
          health: { max: 0.3 }
        },
        targetState: MONSTER_STATES.ENRAGED
      },
      [MONSTER_STATES.AGGRESSIVE]: {
        conditions: {
          playerAttacking: true,
          health: { max: 0.5 }
        },
        targetState: MONSTER_STATES.DEFENSIVE
      },
      [MONSTER_STATES.DEFENSIVE]: {
        conditions: {
          health: { min: 0.7 }
        },
        targetState: MONSTER_STATES.AGGRESSIVE
      }
    },
    reactions: {
      playerAttack: {
        dodgeChance: 0.3,
        counterChance: 0.2,
        blockChance: 0.1
      },
      playerSpecial: {
        dodgeChance: 0.5,
        counterChance: 0.3,
        blockChance: 0.2
      },
      playerCombo: {
        dodgeChance: 0.4,
        counterChance: 0.25,
        blockChance: 0.15
      }
    }
  },
  DIABLOS: {
    baseAggression: 0.8,
    learningRate: 0.15,
    attackPatterns: [
      {
        pattern: ATTACK_PATTERNS.BASIC,
        conditions: {
          health: { min: 0.6 },
          playerDistance: { max: 2.5 }
        }
      },
      {
        pattern: ATTACK_PATTERNS.HEAVY,
        conditions: {
          health: { min: 0.4 },
          playerDistance: { max: 2 }
        }
      },
      {
        pattern: ATTACK_PATTERNS.SPECIAL,
        conditions: {
          health: { max: 0.4 },
          playerDistance: { max: 3.5 }
        }
      },
      {
        pattern: ATTACK_PATTERNS.COUNTER,
        conditions: {
          playerAttacking: true,
          playerDistance: { max: 1.5 }
        }
      }
    ],
    stateTransitions: {
      [MONSTER_STATES.IDLE]: {
        conditions: {
          playerDistance: { min: 4 }
        },
        targetState: MONSTER_STATES.AGGRESSIVE
      },
      [MONSTER_STATES.AGGRESSIVE]: {
        conditions: {
          health: { max: 0.4 }
        },
        targetState: MONSTER_STATES.ENRAGED
      },
      [MONSTER_STATES.AGGRESSIVE]: {
        conditions: {
          playerAttacking: true,
          health: { max: 0.6 }
        },
        targetState: MONSTER_STATES.DEFENSIVE
      },
      [MONSTER_STATES.DEFENSIVE]: {
        conditions: {
          health: { min: 0.8 }
        },
        targetState: MONSTER_STATES.AGGRESSIVE
      }
    },
    reactions: {
      playerAttack: {
        dodgeChance: 0.35,
        counterChance: 0.25,
        blockChance: 0.15
      },
      playerSpecial: {
        dodgeChance: 0.55,
        counterChance: 0.35,
        blockChance: 0.25
      },
      playerCombo: {
        dodgeChance: 0.45,
        counterChance: 0.3,
        blockChance: 0.2
      }
    }
  },
  NERGIGANTE: {
    baseAggression: 0.9,
    learningRate: 0.2,
    attackPatterns: [
      {
        pattern: ATTACK_PATTERNS.BASIC,
        conditions: {
          health: { min: 0.7 },
          playerDistance: { max: 3 }
        }
      },
      {
        pattern: ATTACK_PATTERNS.HEAVY,
        conditions: {
          health: { min: 0.5 },
          playerDistance: { max: 2.5 }
        }
      },
      {
        pattern: ATTACK_PATTERNS.SPECIAL,
        conditions: {
          health: { max: 0.5 },
          playerDistance: { max: 4 }
        }
      },
      {
        pattern: ATTACK_PATTERNS.COUNTER,
        conditions: {
          playerAttacking: true,
          playerDistance: { max: 2 }
        }
      }
    ],
    stateTransitions: {
      [MONSTER_STATES.IDLE]: {
        conditions: {
          playerDistance: { min: 3 }
        },
        targetState: MONSTER_STATES.AGGRESSIVE
      },
      [MONSTER_STATES.AGGRESSIVE]: {
        conditions: {
          health: { max: 0.5 }
        },
        targetState: MONSTER_STATES.ENRAGED
      },
      [MONSTER_STATES.AGGRESSIVE]: {
        conditions: {
          playerAttacking: true,
          health: { max: 0.7 }
        },
        targetState: MONSTER_STATES.DEFENSIVE
      },
      [MONSTER_STATES.DEFENSIVE]: {
        conditions: {
          health: { min: 0.9 }
        },
        targetState: MONSTER_STATES.AGGRESSIVE
      }
    },
    reactions: {
      playerAttack: {
        dodgeChance: 0.4,
        counterChance: 0.3,
        blockChance: 0.2
      },
      playerSpecial: {
        dodgeChance: 0.6,
        counterChance: 0.4,
        blockChance: 0.3
      },
      playerCombo: {
        dodgeChance: 0.5,
        counterChance: 0.35,
        blockChance: 0.25
      }
    }
  }
};

// Sistema de aprendizaje y adaptación
export class MonsterAI {
  constructor(monsterType) {
    this.monsterType = monsterType;
    this.config = MONSTER_AI_CONFIG[monsterType];
    this.currentState = MONSTER_STATES.IDLE;
    this.attackHistory = [];
    this.playerPatterns = [];
    this.adaptationLevel = 0;
    this.lastActionTime = 0;
  }

  // Actualizar el estado del monstruo basado en las condiciones
  updateState(conditions) {
    const transitions = this.config.stateTransitions[this.currentState];
    if (!transitions) return;

    const { targetState, conditions: stateConditions } = transitions;
    if (this.checkConditions(stateConditions, conditions)) {
      this.currentState = targetState;
      return true;
    }
    return false;
  }

  // Seleccionar el siguiente patrón de ataque
  selectAttackPattern(conditions) {
    const availablePatterns = this.config.attackPatterns.filter(pattern => {
      return this.checkConditions(pattern.conditions, conditions);
    });

    if (availablePatterns.length === 0) return ATTACK_PATTERNS.BASIC;

    // Ordenar por prioridad y aplicar adaptación
    availablePatterns.sort((a, b) => {
      const priorityA = a.priority * (1 + this.adaptationLevel);
      const priorityB = b.priority * (1 + this.adaptationLevel);
      return priorityB - priorityA;
    });

    return availablePatterns[0].pattern;
  }

  // Reaccionar a las acciones del jugador
  reactToPlayerAction(action, conditions) {
    const reactions = this.config.reactions[action];
    if (!reactions) return null;

    const { dodgeChance, counterChance, blockChance } = reactions;
    const totalChance = dodgeChance + counterChance + blockChance;
    const roll = Math.random() * totalChance;

    if (roll < dodgeChance) return 'dodge';
    if (roll < dodgeChance + counterChance) return 'counter';
    if (roll < dodgeChance + counterChance + blockChance) return 'block';

    return null;
  }

  // Aprender de las acciones del jugador
  learnFromPlayerAction(action) {
    this.playerPatterns.push(action);
    if (this.playerPatterns.length > 5) {
      this.playerPatterns.shift();
    }

    // Detectar patrones y adaptarse
    const pattern = this.detectPattern();
    if (pattern) {
      this.adaptationLevel += this.config.learningRate;
      this.adaptationLevel = Math.min(1, this.adaptationLevel);
    }
  }

  // Detectar patrones en las acciones del jugador
  detectPattern() {
    if (this.playerPatterns.length < 3) return null;

    const lastThree = this.playerPatterns.slice(-3);
    const pattern = lastThree.join('-');

    // Buscar patrones comunes
    const commonPatterns = ['light-light-heavy', 'heavy-heavy-light', 'special-light-heavy'];
    return commonPatterns.includes(pattern) ? pattern : null;
  }

  // Verificar condiciones
  checkConditions(conditions, currentState) {
    for (const [key, value] of Object.entries(conditions)) {
      if (typeof value === 'object') {
        if (value.min !== undefined && currentState[key] < value.min) return false;
        if (value.max !== undefined && currentState[key] > value.max) return false;
      } else if (currentState[key] !== value) {
        return false;
      }
    }
    return true;
  }

  // Verificar cooldown
  checkCooldown(pattern) {
    const now = Date.now();
    if (now - this.lastActionTime < pattern.cooldown) {
      return false;
    }
    this.lastActionTime = now;
    return true;
  }
} 