import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import useGameStore from '../stores/gameStore';
import ProgressionSystem from './ProgressionSystem';
import InventorySystem from './InventorySystem';

const HuntContainer = styled.div`
  width: 100vw;
  height: 100vh;
  background: url('/assets/hunt-background.png') no-repeat center center;
  background-size: cover;
  position: relative;
  overflow: hidden;
  font-family: 'Press Start 2P', cursive;
`;

const HealthBars = styled.div`
  position: absolute;
  top: 20px;
  left: 20px;
  right: 20px;
  display: flex;
  justify-content: space-between;
  gap: 20px;
`;

const HealthBar = styled.div`
  flex: 1;
  height: 20px;
  background-color: rgba(0, 0, 0, 0.5);
  border: 2px solid #f1c40f;
  border-radius: 5px;
  overflow: hidden;
  
  &::before {
    content: '';
    display: block;
    height: 100%;
    width: ${props => props.health}%;
    background-color: ${props => props.health > 50 ? '#2ecc71' : props.health > 25 ? '#f1c40f' : '#e74c3c'};
    transition: width 0.3s ease;
  }
`;

const StaminaBar = styled.div`
  position: absolute;
  bottom: 20px;
  left: 20px;
  right: 20px;
  height: 10px;
  background-color: rgba(0, 0, 0, 0.5);
  border: 2px solid #f1c40f;
  border-radius: 5px;
  overflow: hidden;
  
  &::before {
    content: '';
    display: block;
    height: 100%;
    width: ${props => props.stamina}%;
    background-color: #3498db;
    transition: width 0.3s ease;
  }
`;

const Character = styled(motion.div)`
  position: absolute;
  width: 64px;
  height: 64px;
  background: url(${props => props.sprite}) no-repeat;
  background-size: contain;
  bottom: 20%;
  left: 20%;
  image-rendering: pixelated;
`;

const Monster = styled(motion.div)`
  position: absolute;
  width: 128px;
  height: 128px;
  background: url('/assets/monsters/great-jagras.png') no-repeat;
  background-size: contain;
  bottom: 20%;
  right: 20%;
  image-rendering: pixelated;
`;

const Controls = styled.div`
  position: absolute;
  bottom: 40px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 10px;
`;

const Button = styled(motion.button)`
  padding: 10px 20px;
  background-color: ${props => props.disabled ? '#666' : '#f1c40f'};
  color: #000;
  border: none;
  border-radius: 5px;
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  font-family: 'Press Start 2P', cursive;
  font-size: 0.8rem;
  
  &:hover:not(:disabled) {
    background-color: #f39c12;
  }
`;

const DialogBox = styled(motion.div)`
  position: absolute;
  bottom: 100px;
  left: 50%;
  transform: translateX(-50%);
  width: 80%;
  max-width: 800px;
  background-color: rgba(0, 0, 0, 0.8);
  border: 4px solid #f1c40f;
  border-radius: 10px;
  padding: 1rem;
  color: white;
  font-size: 0.8rem;
  line-height: 1.5;
  text-align: center;
`;

const FirstHunt = () => {
  const navigate = useNavigate();
  const { jugador, actualizarJugador } = useGameStore();
  const [playerHealth, setPlayerHealth] = useState(100);
  const [monsterHealth, setMonsterHealth] = useState(100);
  const [stamina, setStamina] = useState(100);
  const [dialogIndex, setDialogIndex] = useState(0);
  const [showDialog, setShowDialog] = useState(true);
  const [isAttacking, setIsAttacking] = useState(false);
  const [isDefending, setIsDefending] = useState(false);
  const [isMonsterAttacking, setIsMonsterAttacking] = useState(false);
  const [progressionSystem] = useState(() => new ProgressionSystem());

  const dialogs = [
    "¡Tu primera cacería comienza!",
    "Usa el botón ATAQUE para golpear al monstruo",
    "El botón DEFENSA te ayudará a reducir el daño",
    "¡Cuidado con tu stamina!",
    "¡Buena suerte, cazador!"
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      if (dialogIndex < dialogs.length - 1) {
        setDialogIndex(prev => prev + 1);
      } else {
        setShowDialog(false);
      }
    }, 3000);

    return () => clearTimeout(timer);
  }, [dialogIndex]);

  const handleAttack = () => {
    if (stamina >= 20) {
      setStamina(prev => prev - 20);
      setMonsterHealth(prev => {
        const newHealth = prev - 10;
        if (newHealth <= 0) {
          progressionSystem.addExperience(50);
          setDialogIndex(3);
        }
        return newHealth;
      });
      
      setIsAttacking(true);
      
      setTimeout(() => {
        setIsAttacking(false);
        
        // Monstruo contraataca
        setTimeout(() => {
          if (!isDefending) {
            setIsMonsterAttacking(true);
            setPlayerHealth(prev => Math.max(0, prev - 15));
            setTimeout(() => setIsMonsterAttacking(false), 500);
          }
        }, 1000);
      }, 500);
    }
  };

  const handleDefend = () => {
    if (stamina < 10) return;
    
    setIsDefending(true);
    setStamina(prev => Math.max(0, prev - 10));
    
    setTimeout(() => {
      setIsDefending(false);
    }, 1000);
  };

  useEffect(() => {
    if (monsterHealth === 0) {
      actualizarJugador({
        experiencia: jugador.experiencia + 100,
        zenny: jugador.zenny + 500
      });
      setTimeout(() => navigate('/menu'), 2000);
    }
  }, [monsterHealth]);

  useEffect(() => {
    if (playerHealth === 0) {
      setTimeout(() => navigate('/menu'), 2000);
    }
  }, [playerHealth]);

  return (
    <HuntContainer>
      <ProgressionSystem />
      <InventorySystem />
      <HealthBars>
        <HealthBar health={playerHealth} />
        <HealthBar health={monsterHealth} />
      </HealthBars>

      <Character
        sprite={jugador?.sprite}
        animate={{
          x: isAttacking ? [0, 50, 0] : 0,
          scale: isDefending ? 1.2 : 1
        }}
        transition={{ duration: 0.5 }}
      />

      <Monster
        animate={{
          x: isMonsterAttacking ? [-50, 0] : 0,
          scale: isMonsterAttacking ? 1.2 : 1
        }}
        transition={{ duration: 0.5 }}
      />

      <StaminaBar stamina={stamina} />

      <Controls>
        <Button
          onClick={handleAttack}
          disabled={stamina < 20 || isAttacking}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          ATAQUE
        </Button>
        <Button
          onClick={handleDefend}
          disabled={stamina < 10 || isDefending}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          DEFENSA
        </Button>
      </Controls>

      <AnimatePresence>
        {showDialog && (
          <DialogBox
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            key={currentDialog}
          >
            {dialogs[currentDialog]}
          </DialogBox>
        )}
      </AnimatePresence>
    </HuntContainer>
  );
};

export default FirstHunt; 