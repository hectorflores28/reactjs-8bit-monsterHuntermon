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
          sound: 'ice_clear'
        },
        FIRE: {
          effect: 'POTENTIATE',
          multiplier: 1.5,
          message: '¡El veneno se intensifica!',
          animation: 'fire_potentiate',
          sound: 'fire_potentiate'
        }
      },
      STUN: {
        LIGHTNING: {
          effect: 'EXTEND',
          duration: 2000,
          message: '¡El aturdimiento se prolonga!',
          animation: 'lightning_extend',
          sound: 'lightning_extend'
        }
      },
      FROST: {
        FIRE: {
          effect: 'CLEAR',
          message: '¡El hielo se derrite!',
          animation: 'fire_clear',
          sound: 'fire_clear'
        },
        ICE: {
          effect: 'POTENTIATE',
          multiplier: 1.3,
          message: '¡El hielo se intensifica!',
          animation: 'ice_potentiate',
          sound: 'ice_potentiate'
        }
      },
      BURN: {
        ICE: {
          effect: 'CLEAR',
          message: '¡El fuego se apaga!',
          animation: 'ice_clear',
          sound: 'ice_clear'
        },
        FIRE: {
          effect: 'POTENTIATE',
          multiplier: 1.4,
          message: '¡El fuego arde más fuerte!',
          animation: 'fire_potentiate',
          sound: 'fire_potentiate'
        }
      },
      BLIND: {
        LIGHTNING: {
          effect: 'CLEAR',
          message: '¡El relámpago disipa la ceguera!',
          animation: 'lightning_clear',
          sound: 'lightning_clear'
        }
      }
    };
  }

  checkInteraction(effect1, effect2) {
    return this.interactions[effect1]?.[effect2] || null;
  }

  applyInteraction(target, effect1, effect2) {
    const interaction = this.checkInteraction(effect1, effect2);
    if (!interaction) return null;

    switch (interaction.effect) {
      case 'CLEAR':
        return {
          type: 'CLEAR',
          effect: effect1,
          message: interaction.message,
          animation: interaction.animation,
          sound: interaction.sound
        };

      case 'POTENTIATE':
        return {
          type: 'POTENTIATE',
          effect: effect1,
          multiplier: interaction.multiplier,
          message: interaction.message,
          animation: interaction.animation,
          sound: interaction.sound
        };

      case 'EXTEND':
        return {
          type: 'EXTEND',
          effect: effect1,
          duration: interaction.duration,
          message: interaction.message,
          animation: interaction.animation,
          sound: interaction.sound
        };

      default:
        return null;
    }
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