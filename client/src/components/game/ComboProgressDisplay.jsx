import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { WEAPONS } from '../../config/combatConfig';

const ComboContainer = styled(motion.div)`
  position: fixed;
  bottom: 100px;
  left: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  background-color: rgba(0, 0, 0, 0.7);
  padding: 10px;
  border-radius: 10px;
  z-index: 1000;
`;

const ComboButton = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: 5px;
  padding: 8px;
  background-color: ${props => props.disabled ? '#666' : '#444'};
  border-radius: 5px;
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  opacity: ${props => props.disabled ? 0.5 : 1};
`;

const ComboName = styled.div`
  color: white;
  font-family: 'Press Start 2P', monospace;
  font-size: 10px;
`;

const ComboDamage = styled.div`
  color: #ff4444;
  font-family: 'Press Start 2P', monospace;
  font-size: 8px;
`;

const ComboStamina = styled.div`
  color: #44ff44;
  font-family: 'Press Start 2P', monospace;
  font-size: 8px;
`;

const ComboProgress = styled(motion.div)`
  height: 4px;
  background-color: #333;
  border-radius: 2px;
  overflow: hidden;
`;

const ProgressFill = styled(motion.div)`
  height: 100%;
  background-color: #44ff44;
  width: ${props => props.progress}%;
`;

const ComboSequence = styled.div`
  display: flex;
  gap: 5px;
  margin-top: 5px;
`;

const SequenceKey = styled.div`
  width: 20px;
  height: 20px;
  background-color: ${props => props.active ? '#44ff44' : '#666'};
  color: white;
  font-family: 'Press Start 2P', monospace;
  font-size: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 3px;
`;

const ComboProgressDisplay = ({ weaponType, currentSequence, onComboSelect, stamina, disabled }) => {
  const weapon = WEAPONS[weaponType];

  const formatSequence = (sequence) => {
    return sequence.map(key => {
      switch (key) {
        case 'light': return 'L';
        case 'heavy': return 'H';
        case 'combo': return 'C';
        default: return key;
      }
    });
  };

  const isSequenceActive = (sequence) => {
    if (sequence.length > currentSequence.length) return false;
    return sequence.every((key, index) => key === currentSequence[index]);
  };

  const getComboProgress = (sequence) => {
    if (!isSequenceActive(sequence)) return 0;
    return (currentSequence.length / sequence.length) * 100;
  };

  return (
    <ComboContainer
      initial={{ opacity: 0, x: -100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -100 }}
    >
      {weapon.combos.map((combo) => (
        <ComboButton
          key={combo.name}
          disabled={disabled || stamina < combo.staminaCost}
          whileHover={{ scale: disabled ? 1 : 1.05 }}
          whileTap={{ scale: disabled ? 1 : 0.95 }}
          onClick={() => !disabled && stamina >= combo.staminaCost && onComboSelect(combo)}
        >
          <ComboName>{combo.name}</ComboName>
          <ComboDamage>Daño: {combo.damage}</ComboDamage>
          <ComboStamina>Stamina: {combo.staminaCost}</ComboStamina>
          <ComboProgress>
            <ProgressFill
              progress={getComboProgress(combo.sequence)}
              initial={{ width: 0 }}
              animate={{ width: `${getComboProgress(combo.sequence)}%` }}
              transition={{ duration: 0.3 }}
            />
          </ComboProgress>
          <ComboSequence>
            {formatSequence(combo.sequence).map((key, index) => (
              <SequenceKey
                key={index}
                active={isSequenceActive(combo.sequence) && index < currentSequence.length}
              >
                {key}
              </SequenceKey>
            ))}
          </ComboSequence>
        </ComboButton>
      ))}
    </ComboContainer>
  );
};

export default ComboProgressDisplay; 