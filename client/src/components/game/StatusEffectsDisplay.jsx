import React from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { StatusEffectVisualManager } from '../../config/statusEffectInteractions';

const EffectsContainer = styled(motion.div)`
  position: fixed;
  ${props => props.target === 'player' ? 'bottom: 20px; left: 20px;' : 'top: 20px; right: 20px;'}
  display: flex;
  gap: 10px;
  z-index: 1000;
`;

const EffectIcon = styled(motion.div)`
  width: 40px;
  height: 40px;
  background-image: url(${props => props.sprite});
  background-size: cover;
  position: relative;
  cursor: pointer;
  border-radius: 5px;
  border: 2px solid ${props => props.color || '#ffffff'};
  box-shadow: 0 0 10px ${props => props.color || '#ffffff'};
`;

const StackIndicator = styled(motion.div)`
  position: absolute;
  top: -5px;
  right: -5px;
  background-color: #ff4444;
  color: white;
  font-size: 8px;
  padding: 2px 4px;
  border-radius: 3px;
  font-family: 'Press Start 2P', monospace;
`;

const DurationBar = styled(motion.div)`
  position: absolute;
  bottom: -5px;
  left: 0;
  width: 100%;
  height: 2px;
  background-color: #333;
  border-radius: 1px;
  overflow: hidden;
`;

const DurationFill = styled(motion.div)`
  height: 100%;
  background-color: ${props => props.color || '#ffffff'};
  width: ${props => props.duration}%;
`;

const EffectTooltip = styled(motion.div)`
  position: absolute;
  ${props => props.target === 'player' ? 'bottom: 100%; left: 50%;' : 'top: 100%; right: 50%;'}
  transform: translateX(-50%);
  background-color: rgba(0, 0, 0, 0.8);
  color: white;
  padding: 5px 10px;
  border-radius: 5px;
  font-family: 'Press Start 2P', monospace;
  font-size: 8px;
  white-space: nowrap;
  pointer-events: none;
  z-index: 1001;
`;

const StatusEffectsDisplay = ({ effects, onEffectClick, target }) => {
  const visualManager = new StatusEffectVisualManager();

  const containerVariants = {
    initial: { opacity: 0, y: target === 'player' ? 100 : -100 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: target === 'player' ? 100 : -100 }
  };

  const iconVariants = {
    initial: { opacity: 0, scale: 0.5 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.5 },
    hover: { scale: 1.1 }
  };

  const formatDuration = (ms) => {
    return Math.ceil(ms / 1000);
  };

  return (
    <EffectsContainer
      target={target}
      variants={containerVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <AnimatePresence>
        {effects.map((effect) => (
          <motion.div
            key={effect.id}
            variants={iconVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            whileHover="hover"
          >
            <EffectIcon
              sprite={`/assets/sprites/effects/${effect.type.toLowerCase()}.png`}
              color={visualManager.getEffectColor(effect.type, effect.stacks)}
              onClick={() => onEffectClick(effect.id)}
            >
              {effect.stacks > 1 && (
                <StackIndicator
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.5 }}
                >
                  x{effect.stacks}
                </StackIndicator>
              )}
              <DurationBar>
                <DurationFill
                  duration={(effect.duration / effect.maxDuration) * 100}
                  color={visualManager.getEffectColor(effect.type, effect.stacks)}
                  initial={{ width: '100%' }}
                  animate={{ width: `${(effect.duration / effect.maxDuration) * 100}%` }}
                  transition={{ duration: 1, repeat: Infinity, repeatType: 'loop' }}
                />
              </DurationBar>
              <EffectTooltip
                target={target}
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.2 }}
              >
                {effect.type} ({formatDuration(effect.duration)}s)
              </EffectTooltip>
            </EffectIcon>
          </motion.div>
        ))}
      </AnimatePresence>
    </EffectsContainer>
  );
};

export default StatusEffectsDisplay; 