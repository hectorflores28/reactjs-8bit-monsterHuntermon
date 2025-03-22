import { DAMAGE_TYPES } from './combatConfig';

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

// Sistema de gestión de estados alterados
export class StatusEffectManager {
  constructor() {
    this.activeEffects = new Map();
  }

  // Aplicar un estado alterado
  applyEffect(target, effectType) {
    const effect = STATUS_EFFECTS[effectType];
    if (!effect) return;

    const effectId = `${target}-${effectType}-${Date.now()}`;
    const effectInstance = {
      ...effect,
      id: effectId,
      startTime: Date.now(),
      endTime: Date.now() + effect.duration
    };

    this.activeEffects.set(effectId, effectInstance);

    // Iniciar el efecto de daño periódico si existe
    if (effect.damagePerTick && effect.tickInterval) {
      this.startDamageOverTime(effectId, effect);
    }

    return effectId;
  }

  // Remover un estado alterado
  removeEffect(effectId) {
    this.activeEffects.delete(effectId);
  }

  // Obtener todos los efectos activos de un objetivo
  getActiveEffects(target) {
    return Array.from(this.activeEffects.values())
      .filter(effect => effect.id.startsWith(target))
      .map(effect => ({
        ...effect,
        remainingTime: effect.endTime - Date.now()
      }));
  }

  // Actualizar efectos de daño periódico
  startDamageOverTime(effectId, effect) {
    const interval = setInterval(() => {
      const effectInstance = this.activeEffects.get(effectId);
      if (!effectInstance || Date.now() >= effectInstance.endTime) {
        clearInterval(interval);
        this.removeEffect(effectId);
        return;
      }

      // Aplicar daño
      if (effect.damagePerTick) {
        // Aquí se llamaría a la función de daño del juego
        this.onDamageTick?.(effectId, effect.damagePerTick);
      }
    }, effect.tickInterval);
  }

  // Calcular modificadores de estadísticas
  calculateStatModifiers(target) {
    const effects = this.getActiveEffects(target);
    const modifiers = {
      movementSpeed: 1,
      attackSpeed: 1,
      defense: 1,
      accuracy: 1,
      damageMultiplier: 1
    };

    effects.forEach(effect => {
      if (effect.effects) {
        Object.entries(effect.effects).forEach(([stat, value]) => {
          modifiers[stat] *= value;
        });
      }
      if (effect.damageMultiplier) {
        modifiers.damageMultiplier *= effect.damageMultiplier;
      }
    });

    return modifiers;
  }

  // Verificar si un objetivo está afectado por un estado específico
  hasEffect(target, effectType) {
    return this.getActiveEffects(target)
      .some(effect => effect.name === effectType);
  }

  // Obtener la duración restante de un efecto
  getEffectRemainingTime(effectId) {
    const effect = this.activeEffects.get(effectId);
    if (!effect) return 0;
    return Math.max(0, effect.endTime - Date.now());
  }

  // Actualizar el estado de los efectos
  update() {
    const now = Date.now();
    this.activeEffects.forEach((effect, effectId) => {
      if (now >= effect.endTime) {
        this.removeEffect(effectId);
      }
    });
  }
}

// Sistema de aplicación de estados alterados
export class StatusEffectApplier {
  constructor(statusEffectManager) {
    this.statusEffectManager = statusEffectManager;
  }

  // Aplicar efecto basado en el tipo de daño
  applyEffectFromDamage(target, damageType) {
    switch (damageType) {
      case DAMAGE_TYPES.FIRE:
        return this.statusEffectManager.applyEffect(target, 'BURN');
      case DAMAGE_TYPES.ICE:
        return this.statusEffectManager.applyEffect(target, 'FROST');
      case DAMAGE_TYPES.POISON:
        return this.statusEffectManager.applyEffect(target, 'POISON');
      default:
        return null;
    }
  }

  // Aplicar efecto basado en una habilidad especial
  applyEffectFromAbility(target, abilityType) {
    switch (abilityType) {
      case 'STUN_ATTACK':
        return this.statusEffectManager.applyEffect(target, 'STUN');
      case 'BLIND_ATTACK':
        return this.statusEffectManager.applyEffect(target, 'BLIND');
      case 'STRENGTH_BUFF':
        return this.statusEffectManager.applyEffect(target, 'STRENGTH');
      default:
        return null;
    }
  }

  // Remover efecto específico
  removeEffect(effectId) {
    this.statusEffectManager.removeEffect(effectId);
  }

  // Remover todos los efectos de un objetivo
  removeAllEffects(target) {
    const effects = this.statusEffectManager.getActiveEffects(target);
    effects.forEach(effect => {
      this.statusEffectManager.removeEffect(effect.id);
    });
  }
} 