// Tipos de daño
export const DAMAGE_TYPES = {
  SLASHING: 'slashing',
  BLUNT: 'blunt',
  PIERCING: 'piercing',
  FIRE: 'fire',
  ICE: 'ice',
  LIGHTNING: 'lightning',
  POISON: 'poison'
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
    sound: 'poison_tick'
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
    }
  },
  STRENGTH: {
    name: 'strength',
    duration: 8000,
    damageMultiplier: 1.5,
    color: '#ff0000',
    sprite: '/assets/sprites/effects/strength.png',
    animation: 'strength_effect',
    sound: 'strength_buff'
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
      statusEffects: ['STUN']
    },
    combos: [
      {
        name: 'Basic Combo',
        sequence: ['light', 'light', 'heavy'],
        damage: 45,
        staminaCost: 60,
        animation: 'basic_combo',
        effect: 'combo_finish',
        statusEffects: ['POISON']
      },
      {
        name: 'Advanced Combo',
        sequence: ['heavy', 'light', 'heavy', 'heavy'],
        damage: 70,
        staminaCost: 80,
        animation: 'advanced_combo',
        effect: 'combo_finish_advanced',
        statusEffects: ['BURN']
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
      statusEffects: ['BLIND']
    },
    combos: [
      {
        name: 'Poke Combo',
        sequence: ['light', 'light', 'light'],
        damage: 35,
        staminaCost: 45,
        animation: 'poke_combo',
        effect: 'poke_finish',
        statusEffects: ['FROST']
      },
      {
        name: 'Charge Combo',
        sequence: ['heavy', 'heavy', 'light'],
        damage: 55,
        staminaCost: 65,
        animation: 'charge_combo',
        effect: 'charge_finish',
        statusEffects: ['STUN']
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
      statusEffects: ['BURN']
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
      statusEffects: ['STUN']
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
      statusEffects: ['BLIND']
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
    RATHALOS: 1000,
    DIABLOS: 1200,
    NERGIGANTE: 1500
  },
  MATERIALS: {
    RATHALOS: {
      common: ['Rathalos Scale', 'Rathalos Claw'],
      rare: ['Rathalos Plate', 'Rathalos Ruby']
    },
    DIABLOS: {
      common: ['Diablos Shell', 'Diablos Fang'],
      rare: ['Diablos Carapace', 'Diablos Medulla']
    },
    NERGIGANTE: {
      common: ['Nergigante Scale', 'Nergigante Talon'],
      rare: ['Nergigante Gem', 'Nergigante Horn']
    }
  },
  MONEY: {
    RATHALOS: 5000,
    DIABLOS: 6000,
    NERGIGANTE: 7500
  }
}; 