import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { ATTACK_POSITIONS } from '../../config/combatConfig';

const PositionContainer = styled(motion.div)`
  position: fixed;
  bottom: 100px;
  right: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  background-color: rgba(0, 0, 0, 0.7);
  padding: 10px;
  border-radius: 10px;
  z-index: 1000;
`;

const PositionButton = styled(motion.button)`
  background-color: ${props => props.active ? '#44ff44' : '#444'};
  color: white;
  border: none;
  border-radius: 5px;
  padding: 8px 12px;
  font-family: 'Press Start 2P', monospace;
  font-size: 10px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  width: 150px;
  position: relative;
  overflow: hidden;

  &:hover {
    background-color: ${props => props.active ? '#44ff44' : '#555'};
  }
`;

const PositionIcon = styled.div`
  width: 24px;
  height: 24px;
  background-image: url(${props => props.sprite});
  background-size: cover;
`;

const DamageMultiplier = styled.div`
  position: absolute;
  right: 8px;
  color: ${props => props.active ? '#000' : '#44ff44'};
  font-size: 8px;
`;

const PositionDescription = styled(motion.div)`
  position: absolute;
  left: 100%;
  top: 50%;
  transform: translateY(-50%);
  background-color: rgba(0, 0, 0, 0.8);
  color: white;
  padding: 8px;
  border-radius: 5px;
  font-size: 10px;
  white-space: nowrap;
  pointer-events: none;
  margin-left: 10px;
`;

const PositionIndicator = ({ position, onPositionChange }) => {
  return (
    <PositionContainer
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 100 }}
    >
      {Object.entries(ATTACK_POSITIONS).map(([key, data]) => (
        <PositionButton
          key={key}
          active={position === data}
          onClick={() => onPositionChange(data)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <PositionIcon sprite={`/assets/sprites/positions/${key.toLowerCase()}.png`} />
          {data.name}
          <DamageMultiplier active={position === data}>
            x{data.damageMultiplier}
          </DamageMultiplier>
          <PositionDescription
            initial={{ opacity: 0, x: -10 }}
            whileHover={{ opacity: 1, x: 0 }}
          >
            {data.description}
          </PositionDescription>
        </PositionButton>
      ))}
    </PositionContainer>
  );
};

export default PositionIndicator; 