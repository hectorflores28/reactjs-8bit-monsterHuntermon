import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { WEAPONS } from '../../config/combatConfig';

const ComboContainer = styled.div`
  position: fixed;
  bottom: 200px;
  left: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  z-index: 1000;
`;

const ComboButton = styled(motion.button)`
  background-color: rgba(0, 0, 0, 0.7);
  color: white;
  border: 2px solid ${props => props.disabled ? '#666' : '#44ff44'};
  border-radius: 5px;
  padding: 8px 12px;
  font-family: 'Press Start 2P', monospace;
  font-size: 10px;
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  display: flex;
  align-items: center;
  gap: 8px;
  width: 200px;
  position: relative;
  overflow: hidden;

  &:hover {
    background-color: ${props => props.disabled ? 'rgba(0, 0, 0, 0.7)' : 'rgba(68, 255, 68, 0.2)'};
  }
`;

const ComboName = styled.span`
  flex: 1;
  text-align: left;
`;

const ComboDamage = styled.span`
  color: #ff4444;
`;

const ComboStamina = styled.span`
  color: #44ff44;
`;

const ComboProgress = styled(motion.div)`
  position: absolute;
  bottom: 0;
  left: 0;
  height: 2px;
  background-color: #44ff44;
  width: ${props => props.progress}%;
`;

const ComboSequence = styled.div`
  position: absolute;
  top: -20px;
  left: 0;
  display: flex;
  gap: 4px;
  font-size: 8px;
`;

const SequenceKey = styled.span`
  background-color: rgba(0, 0, 0, 0.8);
  padding: 2px 4px;
  border-radius: 3px;
  color: ${props => props.active ? '#44ff44' : '#666'};
`;

const ComboProgressDisplay = ({ 
  weaponType, 
  currentSequence, 
  onComboSelect, 
  stamina,
  disabled 
}) => {
  const weapon = WEAPONS[weaponType];

  const formatSequence = (sequence) => {
    return sequence.map(key => {
      switch (key) {
        case 'light':
          return 'L';
        case 'heavy':
          return 'H';
        default:
          return key.toUpperCase();
      }
    });
  };

  const isSequenceActive = (comboSequence) => {
    if (!currentSequence || currentSequence.length === 0) return false;
    
    return currentSequence.every((key, index) => 
      comboSequence[index] === key
    );
  };

  const getComboProgress = (comboSequence) => {
    if (!currentSequence || currentSequence.length === 0) return 0;
    
    let progress = 0;
    for (let i = 0; i < currentSequence.length; i++) {
      if (comboSequence[i] === currentSequence[i]) {
        progress = ((i + 1) / comboSequence.length) * 100;
      } else {
        break;
      }
    }
    return progress;
  };

  return (
    <ComboContainer>
      {weapon.combos.map((combo, index) => {
        const isActive = isSequenceActive(combo.sequence);
        const progress = getComboProgress(combo.sequence);
        const isDisabled = disabled || stamina < combo.staminaCost;

        return (
          <ComboButton
            key={index}
            disabled={isDisabled}
            onClick={() => !isDisabled && onComboSelect(combo)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <ComboSequence>
              {formatSequence(combo.sequence).map((key, i) => (
                <SequenceKey 
                  key={i}
                  active={isActive && i < currentSequence.length}
                >
                  {key}
                </SequenceKey>
              ))}
            </ComboSequence>
            <ComboName>{combo.name}</ComboName>
            <ComboDamage>{combo.damage}</ComboDamage>
            <ComboStamina>{combo.staminaCost}</ComboStamina>
            <ComboProgress
              progress={progress}
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3 }}
            />
          </ComboButton>
        );
      })}
    </ComboContainer>
  );
};

export default ComboProgressDisplay; 