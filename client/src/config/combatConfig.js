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
    duration: 5000, // 5 segundos
    damagePerTick: 5,
    tickInterval: 1000, // 1 segundo
    color: '#00ff00',
    sprite: '/assets/sprites/effects/poison.png'
  },
  STUN: {
    name: 'stun',
    duration: 3000, // 3 segundos
    color: '#ffff00',
    sprite: '/assets/sprites/effects/stun.png'
  },
  STRENGTH: {
    name: 'strength',
    duration: 8000, // 8 segundos
    damageMultiplier: 1.5,
    color: '#ff0000',
    sprite: '/assets/sprites/effects/strength.png'
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
      cooldown: 10000, // 10 segundos
      animation: 'true_charged_slash',
      effect: 'charged_slash'
    },
    combos: [
      {
        name: 'Basic Combo',
        sequence: ['light', 'light', 'heavy'],
        damage: 45,
        staminaCost: 60,
        animation: 'basic_combo',
        effect: 'combo_finish'
      },
      {
        name: 'Advanced Combo',
        sequence: ['heavy', 'light', 'heavy', 'heavy'],
        damage: 70,
        staminaCost: 80,
        animation: 'advanced_combo',
        effect: 'combo_finish_advanced'
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
      cooldown: 8000, // 8 segundos
      animation: 'counter_thrust',
      effect: 'counter_effect'
    },
    combos: [
      {
        name: 'Poke Combo',
        sequence: ['light', 'light', 'light'],
        damage: 35,
        staminaCost: 45,
        animation: 'poke_combo',
        effect: 'poke_finish'
      },
      {
        name: 'Charge Combo',
        sequence: ['heavy', 'heavy', 'light'],
        damage: 55,
        staminaCost: 65,
        animation: 'charge_combo',
        effect: 'charge_finish'
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
      effect: 'fire_breath_effect'
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
      effect: 'burrow_charge_effect'
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
      effect: 'dive_bomb_effect'
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