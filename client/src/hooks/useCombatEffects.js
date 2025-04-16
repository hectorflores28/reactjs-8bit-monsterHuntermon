import { useState, useCallback } from 'react';

export const useCombatEffects = () => {
  const [effects, setEffects] = useState([]);

  const addEffect = useCallback((effect) => {
    setEffects(prev => [...prev, { ...effect, id: Date.now() }]);
  }, []);

  const removeEffect = useCallback((id) => {
    setEffects(prev => prev.filter(effect => effect.id !== id));
  }, []);

  const addDamageEffect = useCallback((damage, position, type = 'normal') => {
    addEffect({
      type: 'damage',
      damage,
      position,
      effectType: type,
      onComplete: () => removeEffect(Date.now())
    });
  }, [addEffect, removeEffect]);

  const addStatusEffect = useCallback((type, position, duration) => {
    addEffect({
      type: 'status',
      effectType: type,
      position,
      duration,
      onComplete: () => removeEffect(Date.now())
    });
  }, [addEffect, removeEffect]);

  const addWeaponEffect = useCallback((type, position, direction) => {
    addEffect({
      type: 'weapon',
      effectType: type,
      position,
      direction,
      onComplete: () => removeEffect(Date.now())
    });
  }, [addEffect, removeEffect]);

  return {
    effects,
    addDamageEffect,
    addStatusEffect,
    addWeaponEffect,
    removeEffect
  };
}; 