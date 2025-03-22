import React from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { STATUS_EFFECTS } from '../../config/statusEffects';

const EffectsContainer = styled.div`
  position: absolute;
  top: 50px;
  left: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  z-index: 1000;
`;

const EffectIcon = styled(motion.div)`
  width: 32px;
  height: 32px;
  background-color: ${props => props.color};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  cursor: pointer;
`;

const EffectTimer = styled.div`
  position: absolute;
  bottom: -5px;
  left: 50%;
  transform: translateX(-50%);
  background-color: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 2px 4px;
  border-radius: 3px;
  font-size: 10px;
  font-family: 'Press Start 2P', monospace;
`;

const EffectTooltip = styled(motion.div)`
  position: absolute;
  left: 40px;
  top: 50%;
  transform: translateY(-50%);
  background-color: rgba(0, 0, 0, 0.8);
  color: white;
  padding: 8px;
  border-radius: 5px;
  font-size: 12px;
  font-family: 'Press Start 2P', monospace;
  white-space: nowrap;
  pointer-events: none;
`;

const StatusEffectsDisplay = ({ 
  effects, 
  onEffectClick,
  target 
}) => {
  const formatTime = (ms) => {
    return Math.ceil(ms / 1000);
  };

  const getEffectConfig = (effectType) => {
    return STATUS_EFFECTS[effectType];
  };

  const getEffectDescription = (effect) => {
    const config = getEffectConfig(effect.name);
    if (!config) return '';

    let description = `${config.name}\n`;
    
    if (config.damagePerTick) {
      description += `Daño: ${config.damagePerTick} cada ${config.tickInterval / 1000}s\n`;
    }
    
    if (config.effects) {
      Object.entries(config.effects).forEach(([stat, value]) => {
        const statName = {
          movementSpeed: 'Velocidad de movimiento',
          attackSpeed: 'Velocidad de ataque',
          defense: 'Defensa',
          accuracy: 'Precisión'
        }[stat] || stat;

        const modifier = value < 1 ? 'Reducido' : 'Aumentado';
        description += `${statName}: ${modifier} ${Math.abs((value - 1) * 100)}%\n`;
      });
    }

    if (config.damageMultiplier) {
      description += `Daño: ${(config.damageMultiplier - 1) * 100}% aumentado\n`;
    }

    return description;
  };

  return (
    <EffectsContainer>
      <AnimatePresence>
        {effects.map(effect => {
          const config = getEffectConfig(effect.name);
          if (!config) return null;

          return (
            <EffectIcon
              key={effect.id}
              color={config.color}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              whileHover={{ scale: 1.1 }}
              onClick={() => onEffectClick?.(effect.id)}
            >
              <EffectTimer>
                {formatTime(effect.remainingTime)}s
              </EffectTimer>
              <EffectTooltip
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
              >
                {getEffectDescription(effect)}
              </EffectTooltip>
            </EffectIcon>
          );
        })}
      </AnimatePresence>
    </EffectsContainer>
  );
};

export default StatusEffectsDisplay; 