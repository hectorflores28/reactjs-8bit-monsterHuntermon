import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { WEAPONS } from '../../config/combatConfig';

const ComboContainer = styled.div`
  position: fixed;
  bottom: 100px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 10px;
  z-index: 1000;
`;

const ComboButton = styled(motion.button)`
  padding: 10px 20px;
  background-color: ${props => props.disabled ? '#666' : '#444'};
  color: white;
  border: none;
  border-radius: 5px;
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  font-family: 'Press Start 2P', monospace;
  font-size: 12px;
  position: relative;
  overflow: hidden;

  &:hover {
    background-color: ${props => props.disabled ? '#666' : '#555'};
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
  font-size: 10px;
`;

const ComboIndicator = styled.div`
  position: absolute;
  bottom: 120px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 5px;
  background-color: rgba(0, 0, 0, 0.7);
  padding: 5px;
  border-radius: 5px;
`;

const ComboDot = styled.div`
  width: 10px;
  height: 10px;
  background-color: ${props => props.active ? '#44ff44' : '#666'};
  border-radius: 50%;
`;

const SpecialAbilityBar = styled.div`
  position: absolute;
  bottom: 140px;
  left: 50%;
  transform: translateX(-50%);
  width: 200px;
  height: 10px;
  background-color: rgba(0, 0, 0, 0.7);
  border-radius: 5px;
  overflow: hidden;
`;

const SpecialAbilityFill = styled(motion.div)`
  height: 100%;
  background-color: #ff4444;
  width: ${props => props.progress}%;
`;

const ComboSystem = ({ 
  weaponType, 
  onComboSelect, 
  onSpecialAbility, 
  stamina,
  disabled
}) => {
  const [currentCombo, setCurrentCombo] = useState([]);
  const [specialAbilityCooldown, setSpecialAbilityCooldown] = useState(0);
  const [specialAbilityCharge, setSpecialAbilityCharge] = useState(0);
  const [comboTimeout, setComboTimeout] = useState(null);

  const weapon = WEAPONS[weaponType];

  useEffect(() => {
    return () => {
      if (comboTimeout) {
        clearTimeout(comboTimeout);
      }
    };
  }, [comboTimeout]);

  const handleAttack = (type) => {
    if (disabled) return;

    const newCombo = [...currentCombo, type];
    setCurrentCombo(newCombo);

    // Buscar un combo que coincida
    const matchingCombo = weapon.combos.find(combo => {
      if (newCombo.length < combo.sequence.length) return false;
      const lastSequence = newCombo.slice(-combo.sequence.length);
      return JSON.stringify(lastSequence) === JSON.stringify(combo.sequence);
    });

    if (matchingCombo) {
      onComboSelect(matchingCombo);
      setCurrentCombo([]);
      // Aumentar la carga de la habilidad especial
      setSpecialAbilityCharge(prev => Math.min(100, prev + 20));
      return;
    }

    // Si no hay combo, ejecutar el ataque normal
    onComboSelect({ type, damage: weapon.baseDamage, staminaCost: weapon.staminaCost[type] });
    // Aumentar la carga de la habilidad especial
    setSpecialAbilityCharge(prev => Math.min(100, prev + 10));

    // Reiniciar el combo después de un tiempo
    if (comboTimeout) {
      clearTimeout(comboTimeout);
    }
    const timeout = setTimeout(() => {
      setCurrentCombo([]);
    }, 3000);
    setComboTimeout(timeout);
  };

  const handleSpecialAbility = () => {
    if (disabled || specialAbilityCooldown > 0 || specialAbilityCharge < 100) return;

    onSpecialAbility(weapon.specialAbility);
    setSpecialAbilityCooldown(weapon.specialAbility.cooldown);
    setSpecialAbilityCharge(0);

    // Iniciar el cooldown
    const interval = setInterval(() => {
      setSpecialAbilityCooldown(prev => {
        if (prev <= 1000) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1000;
      });
    }, 1000);
  };

  const formatCooldown = (ms) => {
    return Math.ceil(ms / 1000);
  };

  return (
    <>
      <SpecialAbilityBar>
        <SpecialAbilityFill
          progress={specialAbilityCharge}
          initial={{ width: 0 }}
          animate={{ width: `${specialAbilityCharge}%` }}
          transition={{ duration: 0.3 }}
        />
      </SpecialAbilityBar>

      <ComboIndicator>
        {currentCombo.map((type, index) => (
          <ComboDot key={index} active={true} />
        ))}
      </ComboIndicator>

      <ComboContainer>
        <ComboButton
          onClick={() => handleAttack('light')}
          disabled={disabled || stamina < weapon.staminaCost.light}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Ligero
        </ComboButton>

        <ComboButton
          onClick={() => handleAttack('heavy')}
          disabled={disabled || stamina < weapon.staminaCost.heavy}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Pesado
        </ComboButton>

        <ComboButton
          onClick={handleSpecialAbility}
          disabled={disabled || specialAbilityCooldown > 0 || specialAbilityCharge < 100}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {weapon.specialAbility.name}
          {specialAbilityCooldown > 0 && (
            <CooldownOverlay
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {formatCooldown(specialAbilityCooldown)}s
            </CooldownOverlay>
          )}
        </ComboButton>
      </ComboContainer>
    </>
  );
};

export default ComboSystem; 