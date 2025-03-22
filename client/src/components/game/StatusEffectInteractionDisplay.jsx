import React from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { StatusEffectVisualManager } from '../../config/statusEffectInteractions';

const InteractionContainer = styled(motion.div)`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  z-index: 1000;
`;

const InteractionMessage = styled(motion.div)`
  background-color: rgba(0, 0, 0, 0.8);
  color: white;
  padding: 10px 20px;
  border-radius: 5px;
  font-family: 'Press Start 2P', monospace;
  font-size: 12px;
  text-align: center;
  white-space: nowrap;
`;

const EffectIcon = styled(motion.div)`
  width: 48px;
  height: 48px;
  background-image: url(${props => props.sprite});
  background-size: cover;
  position: relative;
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

const StatusEffectInteractionDisplay = ({ interactions, onInteractionComplete }) => {
  const visualManager = new StatusEffectVisualManager();

  const containerVariants = {
    initial: { opacity: 0, scale: 0.8 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.8 }
  };

  const messageVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 }
  };

  const iconVariants = {
    initial: { opacity: 0, scale: 0.5 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.5 }
  };

  return (
    <InteractionContainer>
      <AnimatePresence>
        {interactions.map((interaction) => (
          <motion.div
            key={interaction.id}
            variants={containerVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            onAnimationComplete={() => onInteractionComplete(interaction.id)}
          >
            <InteractionMessage variants={messageVariants}>
              {interaction.message}
            </InteractionMessage>
            <EffectIcon
              variants={iconVariants}
              sprite={`/assets/sprites/effects/${interaction.visualEffect}.png`}
            >
              {interaction.stacks > 1 && (
                <StackIndicator
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.5 }}
                >
                  x{interaction.stacks}
                </StackIndicator>
              )}
            </EffectIcon>
          </motion.div>
        ))}
      </AnimatePresence>
    </InteractionContainer>
  );
};

export default StatusEffectInteractionDisplay; 