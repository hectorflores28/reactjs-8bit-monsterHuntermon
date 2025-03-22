import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { COMBAT_EFFECTS, STATUS_EFFECTS } from '../../config/combatConfig';
import SpriteAnimation from './SpriteAnimation';

const EffectsContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 1000;
`;

const EffectWrapper = styled(motion.div)`
  position: absolute;
  transform-origin: center;
`;

const StatusEffect = styled(motion.div)`
  position: absolute;
  width: 32px;
  height: 32px;
  background-color: ${props => props.color};
  border-radius: 50%;
  opacity: 0.7;
`;

const CombatEffects = ({ effects }) => {
  const [activeEffects, setActiveEffects] = useState([]);
  const [statusEffects, setStatusEffects] = useState([]);

  useEffect(() => {
    if (effects.length > 0) {
      const newEffects = effects.map(effect => ({
        ...effect,
        id: Date.now() + Math.random(),
        timestamp: Date.now()
      }));

      setActiveEffects(prev => [...prev, ...newEffects]);

      // Eliminar efectos después de su duración
      newEffects.forEach(effect => {
        setTimeout(() => {
          setActiveEffects(prev => prev.filter(e => e.id !== effect.id));
        }, effect.duration || 1000);
      });
    }
  }, [effects]);

  const handleEffectComplete = (effectId) => {
    setActiveEffects(prev => prev.filter(effect => effect.id !== effectId));
  };

  const getEffectConfig = (type) => {
    return COMBAT_EFFECTS[type] || COMBAT_EFFECTS.HIT;
  };

  const getStatusEffectConfig = (type) => {
    return STATUS_EFFECTS[type];
  };

  return (
    <EffectsContainer>
      <AnimatePresence>
        {activeEffects.map(effect => (
          <EffectWrapper
            key={effect.id}
            initial={{ 
              scale: 0,
              opacity: 0,
              x: effect.position.x,
              y: effect.position.y
            }}
            animate={{ 
              scale: effect.scale || 1,
              opacity: 1,
              x: effect.position.x,
              y: effect.position.y
            }}
            exit={{ 
              scale: 0,
              opacity: 0,
              x: effect.position.x,
              y: effect.position.y
            }}
            transition={{ duration: 0.3 }}
          >
            <SpriteAnimation
              spriteConfig={getEffectConfig(effect.type)}
              position={effect.position}
              scale={effect.scale || 1}
              onAnimationComplete={() => handleEffectComplete(effect.id)}
            />
          </EffectWrapper>
        ))}
      </AnimatePresence>

      <AnimatePresence>
        {statusEffects.map(effect => (
          <StatusEffect
            key={effect.id}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.7 }}
            exit={{ scale: 0, opacity: 0 }}
            color={getStatusEffectConfig(effect.type).color}
            style={{
              left: effect.position.x,
              top: effect.position.y
            }}
          />
        ))}
      </AnimatePresence>
    </EffectsContainer>
  );
};

export default CombatEffects; 