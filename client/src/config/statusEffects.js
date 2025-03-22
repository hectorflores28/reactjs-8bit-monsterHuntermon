// Estados alterados
export const STATUS_EFFECTS_CONFIG = {
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

// Sistema de gestión de estados alterados
export class StatusEffectManager {
  constructor() {
    this.activeEffects = {
      player: new Map(),
      monster: new Map()
    };
  }

  applyEffect(effect, target, source = null) {
    const effectConfig = STATUS_EFFECTS_CONFIG[effect];
    if (!effectConfig) return false;

    const targetEffects = this.activeEffects[target];
    const existingEffect = targetEffects.get(effect);

    if (existingEffect) {
      // Verificar reglas de apilamiento
      const maxStacks = effectConfig.maxStacks || 1;
      if (existingEffect.stacks >= maxStacks) {
        // Si ya tiene el máximo de stacks, actualizar la duración
        existingEffect.duration = effectConfig.duration;
        return true;
      }

      // Aumentar stacks
      existingEffect.stacks++;
      existingEffect.duration = effectConfig.duration;
    } else {
      // Crear nuevo efecto
      targetEffects.set(effect, {
        type: effect,
        duration: effectConfig.duration,
        stacks: 1,
        source: source,
        appliedAt: Date.now()
      });
    }

    return true;
  }

  removeEffect(effect, target) {
    const targetEffects = this.activeEffects[target];
    return targetEffects.delete(effect);
  }

  potentiateEffect(effect, target, multiplier) {
    const targetEffects = this.activeEffects[target];
    const existingEffect = targetEffects.get(effect);
    
    if (existingEffect) {
      existingEffect.multiplier = (existingEffect.multiplier || 1) * multiplier;
    }
  }

  extendEffect(effect, target, duration) {
    const targetEffects = this.activeEffects[target];
    const existingEffect = targetEffects.get(effect);
    
    if (existingEffect) {
      existingEffect.duration += duration;
    }
  }

  getActiveEffects(target) {
    const targetEffects = this.activeEffects[target];
    const currentTime = Date.now();
    const activeEffects = [];

    for (const [effect, data] of targetEffects.entries()) {
      if (currentTime - data.appliedAt < data.duration) {
        activeEffects.push({
          type: effect,
          duration: data.duration - (currentTime - data.appliedAt),
          stacks: data.stacks,
          multiplier: data.multiplier || 1
        });
      } else {
        targetEffects.delete(effect);
      }
    }

    return activeEffects;
  }

  calculateStatModifiers(target) {
    const activeEffects = this.getActiveEffects(target);
    const modifiers = {
      damageMultiplier: 1,
      defenseMultiplier: 1,
      movementSpeedMultiplier: 1,
      attackSpeedMultiplier: 1,
      accuracyMultiplier: 1
    };

    activeEffects.forEach(effect => {
      const effectConfig = STATUS_EFFECTS_CONFIG[effect.type];
      if (!effectConfig) return;

      // Aplicar efectos base
      if (effectConfig.effects) {
        Object.entries(effectConfig.effects).forEach(([stat, value]) => {
          modifiers[`${stat}Multiplier`] *= value * effect.multiplier;
        });
      }

      // Aplicar multiplicadores de daño
      if (effectConfig.damageMultiplier) {
        modifiers.damageMultiplier *= effectConfig.damageMultiplier * effect.multiplier;
      }
    });

    return modifiers;
  }

  update() {
    const currentTime = Date.now();
    
    for (const target of ['player', 'monster']) {
      const targetEffects = this.activeEffects[target];
      
      for (const [effect, data] of targetEffects.entries()) {
        if (currentTime - data.appliedAt >= data.duration) {
          targetEffects.delete(effect);
        }
      }
    }
  }
}

// Sistema de aplicación de estados alterados
export class StatusEffectApplier {
  constructor(statusEffectManager) {
    this.statusEffectManager = statusEffectManager;
  }

  applyEffectFromDamage(target, damageType) {
    const effectMap = {
      FIRE: 'BURN',
      ICE: 'FROST',
      LIGHTNING: 'STUN',
      POISON: 'POISON'
    };

    const effect = effectMap[damageType];
    if (effect) {
      this.statusEffectManager.applyEffect(effect, target);
    }
  }

  applyEffectFromAbility(target, effect) {
    this.statusEffectManager.applyEffect(effect, target);
  }

  removeEffect(target, effect) {
    this.statusEffectManager.removeEffect(effect, target);
  }

  removeAllEffects(target) {
    const activeEffects = this.statusEffectManager.getActiveEffects(target);
    activeEffects.forEach(effect => {
      this.statusEffectManager.removeEffect(effect.type, target);
    });
  }
} 