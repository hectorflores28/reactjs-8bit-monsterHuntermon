import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { StatusEffectInteractionManager } from '../../config/statusEffectInteractions';

const CountermeasuresContainer = styled(motion.div)`
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

const CountermeasureItem = styled(motion.div)`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 5px 10px;
  background-color: ${props => props.disabled ? '#666' : '#444'};
  border-radius: 5px;
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  opacity: ${props => props.disabled ? 0.5 : 1};
`;

const ItemIcon = styled.div`
  width: 32px;
  height: 32px;
  background-image: url(${props => props.sprite});
  background-size: cover;
`;

const ItemInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

const ItemName = styled.div`
  color: white;
  font-family: 'Press Start 2P', monospace;
  font-size: 10px;
`;

const ItemCount = styled.div`
  color: #44ff44;
  font-family: 'Press Start 2P', monospace;
  font-size: 8px;
`;

const CountermeasuresDisplay = ({ activeEffects, inventory, onUseCountermeasure, disabled }) => {
  const interactionManager = new StatusEffectInteractionManager();

  const getCountermeasureForEffect = (effect) => {
    const countermeasure = interactionManager.getCountermeasure(effect);
    if (!countermeasure) return null;

    return {
      ...countermeasure,
      count: inventory[countermeasure.item] || 0
    };
  };

  const availableCountermeasures = activeEffects
    .map(effect => getCountermeasureForEffect(effect.type))
    .filter(countermeasure => countermeasure && countermeasure.count > 0);

  return (
    <CountermeasuresContainer
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 100 }}
    >
      {availableCountermeasures.map((countermeasure) => (
        <CountermeasureItem
          key={countermeasure.item}
          disabled={disabled}
          whileHover={{ scale: disabled ? 1 : 1.05 }}
          whileTap={{ scale: disabled ? 1 : 0.95 }}
          onClick={() => !disabled && onUseCountermeasure(countermeasure.effect, countermeasure.item)}
        >
          <ItemIcon sprite={`/assets/sprites/items/${countermeasure.item.toLowerCase()}.png`} />
          <ItemInfo>
            <ItemName>{countermeasure.item}</ItemName>
            <ItemCount>x{countermeasure.count}</ItemCount>
          </ItemInfo>
        </CountermeasureItem>
      ))}
    </CountermeasuresContainer>
  );
};

export default CountermeasuresDisplay; 