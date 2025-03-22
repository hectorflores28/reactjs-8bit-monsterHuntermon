import { STATUS_EFFECTS } from './combatConfig';

export class StatusEffectInteractionManager {
  constructor() {
    this.interactions = {
      // Interacciones entre efectos
      POISON: {
        ICE: {
          effect: 'CLEAR',
          message: '¡El veneno se congela!',
          animation: 'ice_clear',
          sound: 'ice_clear',
          visualEffect: 'ice_crystal'
        },
        FIRE: {
          effect: 'POTENTIATE',
          multiplier: 1.5,
          message: '¡El veneno se intensifica!',
          animation: 'fire_potentiate',
          sound: 'fire_potentiate',
          visualEffect: 'toxic_flame'
        },
        LIGHTNING: {
          effect: 'SPREAD',
          radius: 2,
          message: '¡El veneno se propaga!',
          animation: 'lightning_spread',
          sound: 'lightning_spread',
          visualEffect: 'toxic_lightning'
        }
      },
      STUN: {
        LIGHTNING: {
          effect: 'EXTEND',
          duration: 2000,
          message: '¡El aturdimiento se prolonga!',
          animation: 'lightning_extend',
          sound: 'lightning_extend',
          visualEffect: 'stun_lightning'
        },
        ICE: {
          effect: 'FREEZE',
          duration: 3000,
          message: '¡El aturdimiento se congela!',
          animation: 'ice_freeze',
          sound: 'ice_freeze',
          visualEffect: 'frozen_stun'
        }
      },
      FROST: {
        FIRE: {
          effect: 'CLEAR',
          message: '¡El hielo se derrite!',
          animation: 'fire_clear',
          sound: 'fire_clear',
          visualEffect: 'steam'
        },
        ICE: {
          effect: 'POTENTIATE',
          multiplier: 1.3,
          message: '¡El hielo se intensifica!',
          animation: 'ice_potentiate',
          sound: 'ice_potentiate',
          visualEffect: 'ice_crystal'
        },
        WATER: {
          effect: 'SPREAD',
          radius: 1.5,
          message: '¡El hielo se propaga!',
          animation: 'water_spread',
          sound: 'water_spread',
          visualEffect: 'ice_wave'
        }
      },
      BURN: {
        ICE: {
          effect: 'CLEAR',
          message: '¡El fuego se apaga!',
          animation: 'ice_clear',
          sound: 'ice_clear',
          visualEffect: 'steam'
        },
        FIRE: {
          effect: 'POTENTIATE',
          multiplier: 1.4,
          message: '¡El fuego arde más fuerte!',
          animation: 'fire_potentiate',
          sound: 'fire_potentiate',
          visualEffect: 'inferno'
        },
        WIND: {
          effect: 'SPREAD',
          radius: 2.5,
          message: '¡El fuego se propaga!',
          animation: 'wind_spread',
          sound: 'wind_spread',
          visualEffect: 'firestorm'
        }
      },
      BLIND: {
        LIGHTNING: {
          effect: 'CLEAR',
          message: '¡El relámpago disipa la ceguera!',
          animation: 'lightning_clear',
          sound: 'lightning_clear',
          visualEffect: 'light_flash'
        },
        LIGHT: {
          effect: 'POTENTIATE',
          multiplier: 1.2,
          message: '¡La ceguera se intensifica!',
          animation: 'light_potentiate',
          sound: 'light_potentiate',
          visualEffect: 'blinding_light'
        }
      }
    };

    this.countermeasures = {
      POISON: {
        item: 'ANTIDOTE',
        ability: 'CURE',
        message: '¡El veneno ha sido curado!',
        animation: 'cure_effect',
        sound: 'cure_sound'
      },
      STUN: {
        item: 'STIMULANT',
        ability: 'RECOVER',
        message: '¡El aturdimiento ha sido aliviado!',
        animation: 'recover_effect',
        sound: 'recover_sound'
      },
      FROST: {
        item: 'WARMTH_POTION',
        ability: 'THAW',
        message: '¡El hielo ha sido derretido!',
        animation: 'thaw_effect',
        sound: 'thaw_sound'
      },
      BURN: {
        item: 'COOLING_SALVE',
        ability: 'EXTINGUISH',
        message: '¡El fuego ha sido apagado!',
        animation: 'extinguish_effect',
        sound: 'extinguish_sound'
      },
      BLIND: {
        item: 'EYE_DROPS',
        ability: 'CLEAR_VISION',
        message: '¡La vista ha sido restaurada!',
        animation: 'clear_vision_effect',
        sound: 'clear_vision_sound'
      }
    };
  }

  checkInteraction(effect1, effect2) {
    return this.interactions[effect1]?.[effect2] || null;
  }

  applyInteraction(target, effect1, effect2) {
    const interaction = this.checkInteraction(effect1, effect2);
    if (!interaction) return null;

    const result = {
      type: interaction.effect,
      effect: effect1,
      message: interaction.message,
      animation: interaction.animation,
      sound: interaction.sound,
      visualEffect: interaction.visualEffect
    };

    switch (interaction.effect) {
      case 'CLEAR':
        result.action = () => {
          return {
            type: 'CLEAR',
            effect: effect1
          };
        };
        break;

      case 'POTENTIATE':
        result.action = () => {
          return {
            type: 'POTENTIATE',
            effect: effect1,
            multiplier: interaction.multiplier
          };
        };
        break;

      case 'EXTEND':
        result.action = () => {
          return {
            type: 'EXTEND',
            effect: effect1,
            duration: interaction.duration
          };
        };
        break;

      case 'SPREAD':
        result.action = () => {
          return {
            type: 'SPREAD',
            effect: effect1,
            radius: interaction.radius
          };
        };
        break;

      case 'FREEZE':
        result.action = () => {
          return {
            type: 'FREEZE',
            effect: effect1,
            duration: interaction.duration
          };
        };
        break;
    }

    return result;
  }

  getCountermeasure(effect) {
    return this.countermeasures[effect] || null;
  }

  applyCountermeasure(target, effect, type) {
    const countermeasure = this.getCountermeasure(effect);
    if (!countermeasure) return null;

    return {
      type: type,
      effect: effect,
      message: countermeasure.message,
      animation: countermeasure.animation,
      sound: countermeasure.sound
    };
  }

  getEffectStackingRules(effect) {
    return {
      maxStacks: STATUS_EFFECTS[effect].maxStacks || 1,
      stackDuration: STATUS_EFFECTS[effect].stackDuration || STATUS_EFFECTS[effect].duration,
      stackMultiplier: STATUS_EFFECTS[effect].stackMultiplier || 1.2
    };
  }

  calculateStackedEffect(effect, currentStacks) {
    const rules = this.getEffectStackingRules(effect);
    const baseEffect = STATUS_EFFECTS[effect];

    return {
      ...baseEffect,
      duration: rules.stackDuration,
      damagePerTick: baseEffect.damagePerTick * Math.pow(rules.stackMultiplier, currentStacks - 1),
      effects: Object.entries(baseEffect.effects || {}).reduce((acc, [key, value]) => ({
        ...acc,
        [key]: value * Math.pow(rules.stackMultiplier, currentStacks - 1)
      }), {})
    };
  }
}

export class StatusEffectVisualManager {
  constructor() {
    this.effectAnimations = {
      POISON: {
        base: 'poison_effect',
        stack: 'poison_stack',
        clear: 'poison_clear'
      },
      STUN: {
        base: 'stun_effect',
        stack: 'stun_stack',
        clear: 'stun_clear'
      },
      FROST: {
        base: 'frost_effect',
        stack: 'frost_stack',
        clear: 'frost_clear'
      },
      BURN: {
        base: 'burn_effect',
        stack: 'burn_stack',
        clear: 'burn_clear'
      },
      BLIND: {
        base: 'blind_effect',
        stack: 'blind_stack',
        clear: 'blind_clear'
      }
    };

    this.effectSounds = {
      POISON: {
        apply: 'poison_apply',
        tick: 'poison_tick',
        clear: 'poison_clear'
      },
      STUN: {
        apply: 'stun_apply',
        tick: 'stun_tick',
        clear: 'stun_clear'
      },
      FROST: {
        apply: 'frost_apply',
        tick: 'frost_tick',
        clear: 'frost_clear'
      },
      BURN: {
        apply: 'burn_apply',
        tick: 'burn_tick',
        clear: 'burn_clear'
      },
      BLIND: {
        apply: 'blind_apply',
        tick: 'blind_tick',
        clear: 'blind_clear'
      }
    };
  }

  getEffectAnimation(effect, type = 'base', stacks = 1) {
    const animations = this.effectAnimations[effect];
    if (!animations) return null;

    switch (type) {
      case 'stack':
        return animations.stack || animations.base;
      case 'clear':
        return animations.clear;
      default:
        return animations.base;
    }
  }

  getEffectSound(effect, type = 'apply') {
    const sounds = this.effectSounds[effect];
    if (!sounds) return null;

    return sounds[type] || sounds.apply;
  }

  getEffectColor(effect, stacks = 1) {
    const baseColor = STATUS_EFFECTS[effect].color;
    if (!baseColor) return '#ffffff';

    // Ajustar el color basado en el número de stacks
    const color = new THREE.Color(baseColor);
    color.multiplyScalar(1 + (stacks - 1) * 0.2);
    return color.getHexString();
  }

  getEffectScale(effect, stacks = 1) {
    return 1 + (stacks - 1) * 0.1;
  }
}

// Definición de tipos de estados alterados
export const STATUS_EFFECT_TYPES = {
  POSITIVE: 'positive',
  NEGATIVE: 'negative',
  NEUTRAL: 'neutral'
};

// Definición de categorías de estados alterados
export const STATUS_EFFECT_CATEGORIES = {
  ELEMENTAL: 'elemental',
  PHYSICAL: 'physical',
  MAGICAL: 'magical',
  SPECIAL: 'special'
};

// Configuración de interacciones entre estados alterados
export const STATUS_EFFECT_INTERACTIONS = {
  // Interacciones elementales
  FIRE: {
    WATER: {
      result: 'STEAM',
      effect: {
        type: STATUS_EFFECT_TYPES.NEUTRAL,
        category: STATUS_EFFECT_CATEGORIES.ELEMENTAL,
        name: 'Vapor',
        duration: 5,
        stats: {
          visibility: -20,
          speed: -10
        }
      }
    },
    ICE: {
      result: 'MELT',
      effect: {
        type: STATUS_EFFECT_TYPES.POSITIVE,
        category: STATUS_EFFECT_CATEGORIES.ELEMENTAL,
        name: 'Derretido',
        duration: 3,
        stats: {
          defense: -15,
          speed: 10
        }
      }
    }
  },
  WATER: {
    FIRE: {
      result: 'STEAM',
      effect: {
        type: STATUS_EFFECT_TYPES.NEUTRAL,
        category: STATUS_EFFECT_CATEGORIES.ELEMENTAL,
        name: 'Vapor',
        duration: 5,
        stats: {
          visibility: -20,
          speed: -10
        }
      }
    },
    ICE: {
      result: 'FROZEN',
      effect: {
        type: STATUS_EFFECT_TYPES.NEGATIVE,
        category: STATUS_EFFECT_CATEGORIES.ELEMENTAL,
        name: 'Congelado',
        duration: 4,
        stats: {
          speed: -30,
          attack: -20
        }
      }
    }
  },
  ICE: {
    FIRE: {
      result: 'MELT',
      effect: {
        type: STATUS_EFFECT_TYPES.POSITIVE,
        category: STATUS_EFFECT_CATEGORIES.ELEMENTAL,
        name: 'Derretido',
        duration: 3,
        stats: {
          defense: -15,
          speed: 10
        }
      }
    },
    WATER: {
      result: 'FROZEN',
      effect: {
        type: STATUS_EFFECT_TYPES.NEGATIVE,
        category: STATUS_EFFECT_CATEGORIES.ELEMENTAL,
        name: 'Congelado',
        duration: 4,
        stats: {
          speed: -30,
          attack: -20
        }
      }
    }
  },

  // Interacciones físicas
  BLEED: {
    POISON: {
      result: 'TOXIC_BLEED',
      effect: {
        type: STATUS_EFFECT_TYPES.NEGATIVE,
        category: STATUS_EFFECT_CATEGORIES.PHYSICAL,
        name: 'Sangrado Tóxico',
        duration: 6,
        stats: {
          health: -5,
          defense: -10
        }
      }
    }
  },

  // Interacciones mágicas
  SHIELD: {
    DISPEL: {
      result: 'SHATTER',
      effect: {
        type: STATUS_EFFECT_TYPES.NEGATIVE,
        category: STATUS_EFFECT_CATEGORIES.MAGICAL,
        name: 'Escudo Destruido',
        duration: 2,
        stats: {
          defense: -25,
          magicResist: -20
        }
      }
    }
  }
};

// Función para calcular la interacción entre dos estados alterados
export const calculateStatusEffectInteraction = (effect1, effect2) => {
  const interaction = STATUS_EFFECT_INTERACTIONS[effect1.type]?.[effect2.type];
  if (!interaction) return null;

  return {
    ...interaction.effect,
    id: `${effect1.id}_${effect2.id}_${interaction.result}`,
    source: [effect1.id, effect2.id]
  };
};

// Función para determinar si dos estados alterados pueden interactuar
export const canStatusEffectsInteract = (effect1, effect2) => {
  return !!STATUS_EFFECT_INTERACTIONS[effect1.type]?.[effect2.type];
};

// Función para obtener el resultado de una interacción
export const getInteractionResult = (effect1, effect2) => {
  const interaction = STATUS_EFFECT_INTERACTIONS[effect1.type]?.[effect2.type];
  return interaction?.result || null;
}; 