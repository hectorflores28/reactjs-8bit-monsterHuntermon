// Tipos de daño
export const DAMAGE_TYPES = {
  SLASHING: 'slashing',
  BLUNT: 'blunt',
  PIERCING: 'piercing',
  FIRE: 'fire',
  ICE: 'ice',
  LIGHTNING: 'lightning',
  POISON: 'poison',
  SONIC: 'sonic'
};

// Posiciones de ataque
export const ATTACK_POSITIONS = {
  FRONT: {
    name: 'Frontal',
    damageMultiplier: 1.0,
    description: 'Posición básica de ataque'
  },
  BACK: {
    name: 'Espalda',
    damageMultiplier: 1.5,
    description: 'Daño aumentado por ataque desde atrás'
  },
  SIDE: {
    name: 'Lateral',
    damageMultiplier: 1.2,
    description: 'Daño moderadamente aumentado desde los lados'
  },
  AERIAL: {
    name: 'Aéreo',
    damageMultiplier: 1.3,
    description: 'Daño aumentado por ataque desde el aire'
  }
};

// Estados alterados
export const STATUS_EFFECTS = {
  POISON: {
    name: 'poison',
    duration: 5000,
    damagePerTick: 5,
    tickInterval: 1000,
    color: '#00ff00',
    sprite: '/assets/sprites/effects/poison.png',
    animation: 'poison_effect',
    sound: 'poison_tick',
    interactions: {
      ICE: { effect: 'CLEAR', message: '¡El veneno se congela!' },
      FIRE: { effect: 'POTENTIATE', multiplier: 1.5, message: '¡El veneno se intensifica!' }
    }
  },
  STUN: {
    name: 'stun',
    duration: 3000,
    color: '#ffff00',
    sprite: '/assets/sprites/effects/stun.png',
    animation: 'stun_effect',
    sound: 'stun_effect',
    effects: {
      movementSpeed: 0.5,
      attackSpeed: 0.5
    },
    interactions: {
      LIGHTNING: { effect: 'EXTEND', duration: 2000, message: '¡El aturdimiento se prolonga!' }
    }
  },
  STRENGTH: {
    name: 'strength',
    duration: 8000,
    damageMultiplier: 1.5,
    color: '#ff0000',
    sprite: '/assets/sprites/effects/strength.png',
    animation: 'strength_effect',
    sound: 'strength_buff',
    interactions: {
      FIRE: { effect: 'POTENTIATE', multiplier: 1.2, message: '¡La fuerza aumenta!' }
    }
  },
  FROST: {
    name: 'frost',
    duration: 6000,
    damagePerTick: 3,
    tickInterval: 1000,
    color: '#00ffff',
    sprite: '/assets/sprites/effects/frost.png',
    animation: 'frost_effect',
    sound: 'frost_tick',
    effects: {
      movementSpeed: 0.7,
      attackSpeed: 0.7
    },
    interactions: {
      FIRE: { effect: 'CLEAR', message: '¡El hielo se derrite!' },
      ICE: { effect: 'POTENTIATE', multiplier: 1.3, message: '¡El hielo se intensifica!' }
    }
  },
  BURN: {
    name: 'burn',
    duration: 7000,
    damagePerTick: 7,
    tickInterval: 1000,
    color: '#ff6600',
    sprite: '/assets/sprites/effects/burn.png',
    animation: 'burn_effect',
    sound: 'burn_tick',
    effects: {
      defense: 0.8
    },
    interactions: {
      ICE: { effect: 'CLEAR', message: '¡El fuego se apaga!' },
      FIRE: { effect: 'POTENTIATE', multiplier: 1.4, message: '¡El fuego arde más fuerte!' }
    }
  },
  BLIND: {
    name: 'blind',
    duration: 4000,
    color: '#800080',
    sprite: '/assets/sprites/effects/blind.png',
    animation: 'blind_effect',
    sound: 'blind_effect',
    effects: {
      accuracy: 0.7
    },
    interactions: {
      LIGHTNING: { effect: 'CLEAR', message: '¡El relámpago disipa la ceguera!' }
    }
  }
};

// Configuración de armas
export const WEAPONS = {
  GREAT_SWORD: {
    name: 'Great Sword',
    type: DAMAGE_TYPES.SLASHING,
    baseDamage: 30,
    criticalChance: 0.15,
    criticalMultiplier: 2.0,
    staminaCost: {
      light: 20,
      heavy: 30,
      combo: 40
    },
    specialAbility: {
      name: 'True Charged Slash',
      damage: 50,
      staminaCost: 50,
      cooldown: 10000,
      animation: 'true_charged_slash',
      effect: 'charged_slash',
      statusEffects: ['STUN'],
      positionMultipliers: {
        [ATTACK_POSITIONS.BACK]: 1.5,
        [ATTACK_POSITIONS.SIDE]: 1.2
      }
    },
    ultimateAbility: {
      name: 'Dragon Slayer',
      damage: 100,
      energyCost: 100,
      cooldown: 30000,
      animation: 'dragon_slayer',
      effect: 'ultimate_slash',
      statusEffects: ['BURN', 'STUN'],
      areaOfEffect: {
        radius: 3,
        damageMultiplier: 0.5
      }
    },
    combos: [
      {
        name: 'Basic Combo',
        sequence: ['light', 'light', 'heavy'],
        damage: 45,
        staminaCost: 60,
        animation: 'basic_combo',
        effect: 'combo_finish',
        statusEffects: ['POISON'],
        energyGain: 20
      },
      {
        name: 'Advanced Combo',
        sequence: ['heavy', 'light', 'heavy', 'heavy'],
        damage: 70,
        staminaCost: 80,
        animation: 'advanced_combo',
        effect: 'combo_finish_advanced',
        statusEffects: ['BURN'],
        energyGain: 30
      },
      {
        name: 'Ultimate Combo',
        sequence: ['heavy', 'heavy', 'light', 'heavy', 'heavy'],
        damage: 90,
        staminaCost: 100,
        animation: 'ultimate_combo',
        effect: 'ultimate_combo_finish',
        statusEffects: ['STUN', 'BURN'],
        energyGain: 50,
        unlocksUltimate: true
      }
    ]
  },
  LANCE: {
    name: 'Lance',
    type: DAMAGE_TYPES.PIERCING,
    baseDamage: 20,
    criticalChance: 0.1,
    criticalMultiplier: 1.8,
    staminaCost: {
      light: 15,
      heavy: 25,
      combo: 35
    },
    specialAbility: {
      name: 'Counter Thrust',
      damage: 35,
      staminaCost: 40,
      cooldown: 8000,
      animation: 'counter_thrust',
      effect: 'counter_effect',
      statusEffects: ['BLIND'],
      positionMultipliers: {
        [ATTACK_POSITIONS.FRONT]: 1.3,
        [ATTACK_POSITIONS.SIDE]: 1.1
      }
    },
    ultimateAbility: {
      name: 'Dragon Piercer',
      damage: 80,
      energyCost: 100,
      cooldown: 25000,
      animation: 'dragon_piercer',
      effect: 'ultimate_pierce',
      statusEffects: ['FROST', 'STUN'],
      areaOfEffect: {
        radius: 2,
        damageMultiplier: 0.7
      }
    },
    combos: [
      {
        name: 'Poke Combo',
        sequence: ['light', 'light', 'light'],
        damage: 35,
        staminaCost: 45,
        animation: 'poke_combo',
        effect: 'poke_finish',
        statusEffects: ['FROST'],
        energyGain: 15
      },
      {
        name: 'Charge Combo',
        sequence: ['heavy', 'heavy', 'light'],
        damage: 55,
        staminaCost: 65,
        animation: 'charge_combo',
        effect: 'charge_finish',
        statusEffects: ['STUN'],
        energyGain: 25
      },
      {
        name: 'Ultimate Combo',
        sequence: ['light', 'light', 'heavy', 'heavy', 'light'],
        damage: 75,
        staminaCost: 90,
        animation: 'ultimate_combo',
        effect: 'ultimate_combo_finish',
        statusEffects: ['FROST', 'STUN'],
        energyGain: 40,
        unlocksUltimate: true
      }
    ]
  }
};

// Configuración de monstruos
export const MONSTERS = {
  RATHALOS: {
    name: 'Rathalos',
    baseHealth: 1000,
    baseDamage: 25,
    weaknesses: [DAMAGE_TYPES.ICE],
    resistances: [DAMAGE_TYPES.FIRE],
    criticalChance: 0.1,
    criticalMultiplier: 1.5,
    specialAbility: {
      name: 'Fire Breath',
      damage: 40,
      cooldown: 15000,
      animation: 'fire_breath',
      effect: 'fire_breath_effect',
      statusEffects: ['BURN'],
      areaOfEffect: {
        radius: 2,
        damageMultiplier: 0.8
      }
    },
    ultimateAbility: {
      name: 'Infernal Rage',
      damage: 70,
      cooldown: 30000,
      animation: 'infernal_rage',
      effect: 'ultimate_fire',
      statusEffects: ['BURN', 'STUN'],
      areaOfEffect: {
        radius: 4,
        damageMultiplier: 0.6
      }
    }
  },
  DIABLOS: {
    name: 'Diablos',
    baseHealth: 1200,
    baseDamage: 30,
    weaknesses: [DAMAGE_TYPES.ICE, DAMAGE_TYPES.SONIC],
    resistances: [DAMAGE_TYPES.FIRE],
    criticalChance: 0.15,
    criticalMultiplier: 1.8,
    specialAbility: {
      name: 'Burrow Charge',
      damage: 45,
      cooldown: 12000,
      animation: 'burrow_charge',
      effect: 'burrow_charge_effect',
      statusEffects: ['STUN'],
      areaOfEffect: {
        radius: 1.5,
        damageMultiplier: 0.9
      }
    },
    ultimateAbility: {
      name: 'Underground Rage',
      damage: 80,
      cooldown: 25000,
      animation: 'underground_rage',
      effect: 'ultimate_burrow',
      statusEffects: ['STUN', 'BLIND'],
      areaOfEffect: {
        radius: 3,
        damageMultiplier: 0.7
      }
    }
  },
  NERGIGANTE: {
    name: 'Nergigante',
    baseHealth: 1500,
    baseDamage: 35,
    weaknesses: [DAMAGE_TYPES.LIGHTNING],
    resistances: [DAMAGE_TYPES.POISON],
    criticalChance: 0.2,
    criticalMultiplier: 2.0,
    specialAbility: {
      name: 'Dive Bomb',
      damage: 50,
      cooldown: 20000,
      animation: 'dive_bomb',
      effect: 'dive_bomb_effect',
      statusEffects: ['BLIND'],
      areaOfEffect: {
        radius: 2.5,
        damageMultiplier: 0.75
      }
    },
    ultimateAbility: {
      name: 'Elder Dragon Rage',
      damage: 90,
      cooldown: 35000,
      animation: 'elder_dragon_rage',
      effect: 'ultimate_dive',
      statusEffects: ['BLIND', 'STUN'],
      areaOfEffect: {
        radius: 4,
        damageMultiplier: 0.6
      }
    }
  }
};

// Configuración de efectos visuales
export const COMBAT_EFFECTS = {
  HIT: {
    name: 'hit',
    frames: 4,
    frameRate: 12,
    sprite: '/assets/sprites/effects/hit.png',
    width: 32,
    height: 32
  },
  CRITICAL_HIT: {
    name: 'critical_hit',
    frames: 6,
    frameRate: 15,
    sprite: '/assets/sprites/effects/critical_hit.png',
    width: 64,
    height: 64
  },
  COMBO_FINISH: {
    name: 'combo_finish',
    frames: 8,
    frameRate: 12,
    sprite: '/assets/sprites/effects/combo_finish.png',
    width: 96,
    height: 96
  },
  SPECIAL_ABILITY: {
    name: 'special_ability',
    frames: 12,
    frameRate: 15,
    sprite: '/assets/sprites/effects/special_ability.png',
    width: 128,
    height: 128
  },
  ULTIMATE_ABILITY: {
    name: 'ultimate_ability',
    frames: 16,
    frameRate: 15,
    sprite: '/assets/sprites/effects/ultimate_ability.png',
    width: 192,
    height: 192
  },
  CHARGED_SLASH: {
    name: 'charged_slash',
    frames: 10,
    frameRate: 12,
    sprite: '/assets/sprites/effects/charged_slash.png',
    width: 160,
    height: 160
  },
  COUNTER_EFFECT: {
    name: 'counter_effect',
    frames: 6,
    frameRate: 15,
    sprite: '/assets/sprites/effects/counter_effect.png',
    width: 80,
    height: 80
  },
  FIRE_BREATH: {
    name: 'fire_breath',
    frames: 8,
    frameRate: 12,
    sprite: '/assets/sprites/effects/fire_breath.png',
    width: 192,
    height: 96
  },
  BURROW_CHARGE: {
    name: 'burrow_charge',
    frames: 8,
    frameRate: 12,
    sprite: '/assets/sprites/effects/burrow_charge.png',
    width: 160,
    height: 160
  },
  DIVE_BOMB: {
    name: 'dive_bomb',
    frames: 10,
    frameRate: 15,
    sprite: '/assets/sprites/effects/dive_bomb.png',
    width: 224,
    height: 224
  }
};

// Configuración de recompensas
export const REWARDS = {
  EXPERIENCE: {
    SMALL: 100,
    MEDIUM: 250,
    LARGE: 500,
    BOSS: 1000
  },
  MATERIALS: {
    SMALL: ['common_material'],
    MEDIUM: ['common_material', 'uncommon_material'],
    LARGE: ['uncommon_material', 'rare_material'],
    BOSS: ['rare_material', 'legendary_material']
  },
  MONEY: {
    SMALL: 50,
    MEDIUM: 100,
    LARGE: 200,
    BOSS: 500
  },
  BONUS_REWARDS: {
    SPEED_KILL: {
      timeThreshold: 60000, // 60 segundos
      multiplier: 1.5,
      description: 'Bonus por victoria rápida'
    },
    NO_DAMAGE: {
      multiplier: 2.0,
      description: 'Bonus por no recibir daño'
    },
    COMBO_MASTER: {
      requiredCombos: 5,
      multiplier: 1.3,
      description: 'Bonus por maestría de combos'
    },
    STATUS_EFFECT: {
      requiredEffects: 3,
      multiplier: 1.2,
      description: 'Bonus por aplicar efectos de estado'
    }
  }
}; 