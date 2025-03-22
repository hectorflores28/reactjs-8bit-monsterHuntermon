import React from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { StatusEffectInteractionManager } from '../../config/statusEffectInteractions';

const CountermeasuresContainer = styled.div`
  position: fixed;
  top: 20px;
  right: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  z-index: 1000;
`;

const CountermeasureButton = styled(motion.button)`
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
  width: 150px;
  position: relative;
  overflow: hidden;

  &:hover {
    background-color: ${props => props.disabled ? 'rgba(0, 0, 0, 0.7)' : 'rgba(68, 255, 68, 0.2)'};
  }
`;

const CountermeasureIcon = styled.div`
  width: 24px;
  height: 24px;
  background-image: url(${props => props.sprite});
  background-size: cover;
`;

const CountermeasureName = styled.span`
  flex: 1;
  text-align: left;
`;

const CountermeasureCount = styled.span`
  color: #44ff44;
  font-size: 8px;
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
  font-size: 8px;
`;

const CountermeasuresDisplay = ({ 
  activeEffects, 
  inventory, 
  onUseCountermeasure,
  disabled 
}) => {
  const interactionManager = new StatusEffectInteractionManager();

  const getCountermeasureCount = (itemType) => {
    return inventory[itemType] || 0;
  };

  const handleCountermeasureClick = (effect, type) => {
    if (disabled || getCountermeasureCount(type) <= 0) return;
    onUseCountermeasure(effect, type);
  };

  return (
    <CountermeasuresContainer>
      <AnimatePresence>
        {activeEffects.map((effect) => {
          const countermeasure = interactionManager.getCountermeasure(effect.type);
          if (!countermeasure) return null;

          const itemCount = getCountermeasureCount(countermeasure.item);
          const isDisabled = disabled || itemCount <= 0;

          return (
            <CountermeasureButton
              key={effect.type}
              disabled={isDisabled}
              onClick={() => handleCountermeasureClick(effect.type, countermeasure.item)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <CountermeasureIcon sprite={`/assets/sprites/items/${countermeasure.item.toLowerCase()}.png`} />
              <CountermeasureName>{countermeasure.item}</CountermeasureName>
              <CountermeasureCount>{itemCount}</CountermeasureCount>
              {effect.cooldown > 0 && (
                <CooldownOverlay
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  {Math.ceil(effect.cooldown / 1000)}s
                </CooldownOverlay>
              )}
            </CountermeasureButton>
          );
        })}
      </AnimatePresence>
    </CountermeasuresContainer>
  );
};

export default CountermeasuresDisplay; 