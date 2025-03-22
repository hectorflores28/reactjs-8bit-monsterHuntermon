import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const UltimateContainer = styled(motion.div)`
  position: fixed;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
  z-index: 1000;
`;

const EnergyBar = styled.div`
  width: 200px;
  height: 10px;
  background-color: #333;
  border-radius: 5px;
  overflow: hidden;
  position: relative;
`;

const EnergyFill = styled(motion.div)`
  height: 100%;
  background: linear-gradient(90deg, #44ff44, #00ff00);
  width: ${props => props.energy}%;
  position: relative;
  overflow: hidden;

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.2),
      transparent
    );
    animation: shine 2s infinite;
  }

  @keyframes shine {
    0% {
      transform: translateX(-100%);
    }
    100% {
      transform: translateX(100%);
    }
  }
`;

const UltimateButton = styled(motion.button)`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: ${props => props.disabled ? '#666' : '#444'};
  border: 2px solid ${props => props.disabled ? '#999' : '#44ff44'};
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  position: relative;
  overflow: hidden;
  opacity: ${props => props.disabled ? 0.5 : 1};

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: radial-gradient(circle, rgba(68,255,68,0.2) 0%, transparent 70%);
    opacity: ${props => props.disabled ? 0 : 1};
  }
`;

const CooldownOverlay = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-family: 'Press Start 2P', monospace;
  font-size: 12px;
`;

const UltimateName = styled.div`
  color: white;
  font-family: 'Press Start 2P', monospace;
  font-size: 10px;
  text-align: center;
  margin-top: 5px;
`;

const UltimateAbilityBar = ({ ultimateAbility, currentEnergy, onUltimateUse, disabled, cooldown }) => {
  const formatCooldown = (ms) => {
    return Math.ceil(ms / 1000);
  };

  return (
    <UltimateContainer
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 100 }}
    >
      <EnergyBar>
        <EnergyFill
          energy={currentEnergy}
          initial={{ width: 0 }}
          animate={{ width: `${currentEnergy}%` }}
          transition={{ duration: 0.3 }}
        />
      </EnergyBar>
      <UltimateButton
        disabled={disabled || cooldown > 0}
        onClick={() => !disabled && cooldown === 0 && onUltimateUse(ultimateAbility)}
        whileHover={{ scale: disabled ? 1 : 1.1 }}
        whileTap={{ scale: disabled ? 1 : 0.9 }}
      >
        {cooldown > 0 && (
          <CooldownOverlay
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {formatCooldown(cooldown)}s
          </CooldownOverlay>
        )}
      </UltimateButton>
      <UltimateName>{ultimateAbility.name}</UltimateName>
    </UltimateContainer>
  );
};

export default UltimateAbilityBar; 