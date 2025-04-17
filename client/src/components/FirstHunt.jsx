import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import useGameStore from '../stores/gameStore';
import ProgressionSystem from './ProgressionSystem';
import InventorySystem from './InventorySystem';
import MissionSystem from './MissionSystem';
import CraftingSystem from './CraftingSystem';
import WeatherSystem from './WeatherSystem';
import StatusSystem from './StatusSystem';
import { Howl } from 'howler';
import { SOUNDS, playSound } from '../config/sounds';

const HuntContainer = styled.div`
  width: 100vw;
  height: 100vh;
  background: #000;
  position: relative;
  overflow: hidden;
  font-family: 'Press Start 2P', cursive;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const HealthBars = styled.div`
  position: absolute;
  top: 20px;
  left: 20px;
  right: 20px;
  display: flex;
  justify-content: space-between;
  gap: 20px;
  padding: 10px;
  background: rgba(0, 0, 0, 0.7);
  border-radius: 10px;
  z-index: 10;
`;

const HealthBar = styled.div`
  flex: 1;
  height: 30px;
  background-color: rgba(0, 0, 0, 0.5);
  border: 2px solid #f1c40f;
  border-radius: 5px;
  overflow: hidden;
  position: relative;
  
  &::before {
    content: '';
    display: block;
    height: 100%;
    width: ${props => props.health}%;
    background-color: ${props => props.health > 50 ? '#2ecc71' : props.health > 25 ? '#f1c40f' : '#e74c3c'};
    transition: width 0.3s ease;
  }

  &::after {
    content: '${props => props.name}';
    position: absolute;
    top: -20px;
    left: 0;
    color: #fff;
    font-size: 0.8rem;
    text-shadow: 2px 2px 0 #000;
  }
`;

const StaminaBar = styled.div`
  position: absolute;
  bottom: 20px;
  left: 20px;
  right: 20px;
  height: 15px;
  background-color: rgba(0, 0, 0, 0.5);
  border: 2px solid #f1c40f;
  border-radius: 5px;
  overflow: hidden;
  padding: 5px;
  z-index: 10;
  
  &::before {
    content: '';
    display: block;
    height: 100%;
    width: ${props => props.stamina}%;
    background-color: #3498db;
    transition: width 0.3s ease;
  }

  &::after {
    content: 'STAMINA';
    position: absolute;
    top: -20px;
    left: 0;
    color: #fff;
    font-size: 0.8rem;
    text-shadow: 2px 2px 0 #000;
  }
`;

const Character = styled(motion.div)`
  position: absolute;
  width: 64px;
  height: 64px;
  background: url(${props => props.sprite || '/assets/characters/default.png'}) no-repeat;
  background-size: contain;
  bottom: 20%;
  left: 20%;
  image-rendering: pixelated;
  filter: drop-shadow(2px 2px 0 #000);
  z-index: 5;
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
  filter: drop-shadow(2px 2px 0 #000);
  z-index: 5;
`;

const Controls = styled.div`
  position: absolute;
  bottom: 40px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 10px;
  background: rgba(0, 0, 0, 0.7);
  padding: 10px;
  border-radius: 10px;
  z-index: 10;
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
  text-shadow: 1px 1px 0 #fff;
  
  &:hover:not(:disabled) {
    background-color: #f39c12;
    transform: translateY(-2px);
  }

  &:active:not(:disabled) {
    transform: translateY(2px);
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
  box-shadow: 0 0 10px rgba(241, 196, 15, 0.5);
  z-index: 10;
`;

const DamageIndicator = styled(motion.div)`
  position: absolute;
  color: #ff4444;
  font-size: 1.2rem;
  font-weight: bold;
  text-shadow: 2px 2px 0 #000;
  pointer-events: none;
  z-index: 20;
`;

const TutorialTip = styled(motion.div)`
  position: absolute;
  background: rgba(0, 0, 0, 0.8);
  border: 2px solid #f1c40f;
  border-radius: 5px;
  padding: 10px;
  color: white;
  font-size: 0.8rem;
  max-width: 300px;
  pointer-events: none;
  z-index: 1000;

  &::after {
    content: '';
    position: absolute;
    width: 0;
    height: 0;
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
    border-top: 10px solid #f1c40f;
    bottom: -10px;
    left: 50%;
    transform: translateX(-50%);
  }
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
  const [damageIndicators, setDamageIndicators] = useState([]);
  const [combatSounds] = useState(SOUNDS.COMBAT);
  const [showTutorialTip, setShowTutorialTip] = useState(true);
  const [tutorialStep, setTutorialStep] = useState(0);
  const [tutorialTips] = useState([
    {
      text: "¡Bienvenido a tu primera cacería!",
      position: { x: '50%', y: '30%' }
    },
    {
      text: "Usa el botón ATAQUE para golpear al monstruo",
      position: { x: '50%', y: '80%' }
    },
    {
      text: "El botón DEFENSA te ayudará a reducir el daño",
      position: { x: '50%', y: '80%' }
    },
    {
      text: "¡Cuidado con tu stamina! Se consume con cada acción",
      position: { x: '50%', y: '90%' }
    },
    {
      text: "¡A veces puedes hacer daño crítico!",
      position: { x: '50%', y: '40%' }
    }
  ]);

  const dialogs = [
    "¡Tu primera cacería comienza!",
    "Usa el botón ATAQUE para golpear al monstruo",
    "El botón DEFENSA te ayudará a reducir el daño",
    "¡Cuidado con tu stamina!",
    "¡Buena suerte, cazador!"
  ];

  useEffect(() => {
    if (!jugador) {
      navigate('/character-creation');
      return;
    }

    const timer = setTimeout(() => {
      if (dialogIndex < dialogs.length - 1) {
        setDialogIndex(prev => prev + 1);
      } else {
        setShowDialog(false);
      }
    }, 3000);

    return () => clearTimeout(timer);
  }, [dialogIndex, jugador, navigate]);

  useEffect(() => {
    if (tutorialStep < tutorialTips.length - 1) {
      const timer = setTimeout(() => {
        setTutorialStep(prev => prev + 1);
      }, 5000);
      return () => clearTimeout(timer);
    } else {
      setShowTutorialTip(false);
    }
  }, [tutorialStep]);

  const addDamageIndicator = (damage, position, isCritical = false) => {
    const id = Date.now();
    setDamageIndicators(prev => [...prev, { id, damage, position, isCritical }]);
    setTimeout(() => {
      setDamageIndicators(prev => prev.filter(di => di.id !== id));
    }, 1000);
  };

  const handleAttack = () => {
    if (stamina >= 20) {
      setStamina(prev => prev - 20);
      const damage = Math.floor(Math.random() * 10) + 10;
      const isCritical = Math.random() < 0.2;
      const finalDamage = isCritical ? damage * 2 : damage;
      
      setMonsterHealth(prev => {
        const newHealth = prev - finalDamage;
        if (newHealth <= 0) {
          playSound(SOUNDS.COMBAT.VICTORY);
          progressionSystem.addExperience(50);
          actualizarJugador({
            experiencia: jugador.experiencia + 100,
            zenny: jugador.zenny + 500
          });
          setTimeout(() => navigate('/menu'), 2000);
        } else {
          playSound(SOUNDS.COMBAT.ATTACK);
          setTimeout(() => playSound(SOUNDS.COMBAT.HIT), 200);
          if (isCritical) {
            setTimeout(() => playSound(SOUNDS.COMBAT.CRITICAL), 300);
          }
        }
        return newHealth;
      });
      
      setIsAttacking(true);
      addDamageIndicator(finalDamage, { x: '70%', y: '40%' }, isCritical);
      
      if (isCritical && tutorialStep === 4) {
        setShowTutorialTip(true);
        setTutorialStep(4);
      }
      
      setTimeout(() => {
        setIsAttacking(false);
        
        setTimeout(() => {
          if (!isDefending) {
            setIsMonsterAttacking(true);
            const monsterDamage = Math.floor(Math.random() * 15) + 5;
            setPlayerHealth(prev => Math.max(0, prev - monsterDamage));
            addDamageIndicator(monsterDamage, { x: '30%', y: '40%' });
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
    playSound(SOUNDS.COMBAT.DEFEND);
    
    setTimeout(() => {
      setIsDefending(false);
    }, 1000);
  };

  useEffect(() => {
    if (playerHealth === 0) {
      setTimeout(() => navigate('/menu'), 2000);
    }
  }, [playerHealth, navigate]);

  return (
    <HuntContainer>
      <ProgressionSystem />
      <InventorySystem />
      <MissionSystem />
      <CraftingSystem />
      <WeatherSystem />
      <StatusSystem />
      <HealthBars>
        <HealthBar health={playerHealth} name={jugador?.name || 'Cazador'} />
        <HealthBar health={monsterHealth} name="Jagras" />
      </HealthBars>

      <Character
        sprite={jugador?.sprite}
        animate={{
          x: isAttacking ? [0, 50, 0] : 0,
          scale: isDefending ? 1.2 : 1,
          filter: isDefending ? 'brightness(1.5)' : 'brightness(1)'
        }}
        transition={{ duration: 0.5 }}
      />

      <Monster
        animate={{
          x: isMonsterAttacking ? [-50, 0, -50] : 0,
          scale: isMonsterAttacking ? 1.2 : 1
        }}
        transition={{ duration: 0.5 }}
      />

      <StaminaBar stamina={stamina} />

      <Controls>
        <Button
          onClick={handleAttack}
          disabled={stamina < 20}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          ATAQUE
        </Button>
        <Button
          onClick={handleDefend}
          disabled={stamina < 10}
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
            key={dialogIndex}
          >
            {dialogs[dialogIndex]}
          </DialogBox>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {damageIndicators.map(({ id, damage, position, isCritical }) => (
          <DamageIndicator
            key={id}
            initial={{ opacity: 1, y: 0 }}
            animate={{ opacity: 0, y: -50 }}
            transition={{ duration: 1 }}
            style={{
              left: position.x,
              top: position.y,
              color: isCritical ? '#ff0000' : '#ff4444',
              fontSize: isCritical ? '1.5rem' : '1.2rem'
            }}
          >
            {damage}
          </DamageIndicator>
        ))}
      </AnimatePresence>

      <AnimatePresence>
        {showTutorialTip && (
          <TutorialTip
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            style={{
              left: tutorialTips[tutorialStep].position.x,
              top: tutorialTips[tutorialStep].position.y
            }}
          >
            {tutorialTips[tutorialStep].text}
          </TutorialTip>
        )}
      </AnimatePresence>
    </HuntContainer>
  );
};

export default FirstHunt; 