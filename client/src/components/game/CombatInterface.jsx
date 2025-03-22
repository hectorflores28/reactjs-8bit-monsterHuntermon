import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { useGameStore } from '../../store/gameStore';
import MonsterAnimation from './MonsterAnimation';
import CombatEffects from './CombatEffects';
import CombatSound from './CombatSound';

const CombatContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 1000;
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
  background-color: #333;
  border-radius: 10px;
  overflow: hidden;
`;

const HealthFill = styled.div`
  height: 100%;
  background-color: #ff4444;
  width: ${props => props.health}%;
  transition: width 0.3s ease;
`;

const StaminaBar = styled.div`
  position: absolute;
  bottom: 20px;
  left: 20px;
  right: 20px;
  height: 10px;
  background-color: #333;
  border-radius: 5px;
  overflow: hidden;
`;

const StaminaFill = styled.div`
  height: 100%;
  background-color: #44ff44;
  width: ${props => props.stamina}%;
  transition: width 0.3s ease;
`;

const Controls = styled.div`
  position: absolute;
  bottom: 40px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 10px;
`;

const Button = styled.button`
  padding: 10px 20px;
  background-color: ${props => props.disabled ? '#666' : '#444'};
  color: white;
  border: none;
  border-radius: 5px;
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${props => props.disabled ? '#666' : '#555'};
  }
`;

const CombatLog = styled.div`
  position: absolute;
  top: 50px;
  right: 20px;
  width: 300px;
  height: 200px;
  background-color: rgba(0, 0, 0, 0.7);
  border-radius: 10px;
  padding: 10px;
  overflow-y: auto;
  color: white;
  font-family: 'Press Start 2P', monospace;
  font-size: 12px;
`;

const LogEntry = styled(motion.div)`
  margin-bottom: 5px;
  color: ${props => props.type === 'damage' ? '#ff4444' : '#44ff44'};
`;

const CombatInterface = () => {
  const { 
    player, 
    monster, 
    isInCombat, 
    endCombat,
    updatePlayerHealth,
    updateMonsterHealth,
    updatePlayerStamina
  } = useGameStore();

  const [combatLog, setCombatLog] = useState([]);
  const [monsterAction, setMonsterAction] = useState('IDLE');
  const [isMonsterAttacking, setIsMonsterAttacking] = useState(false);
  const [effects, setEffects] = useState([]);
  const [currentAction, setCurrentAction] = useState(null);
  const [isVictory, setIsVictory] = useState(false);
  const [isDefeat, setIsDefeat] = useState(false);

  useEffect(() => {
    if (isInCombat && monster) {
      // Iniciar el ciclo de acciones del monstruo
      const monsterActionInterval = setInterval(() => {
        if (Math.random() < 0.3) { // 30% de probabilidad de atacar
          setMonsterAction('ATTACK');
          setIsMonsterAttacking(true);
          setTimeout(() => {
            setIsMonsterAttacking(false);
            setMonsterAction('IDLE');
          }, 1000);
        }
      }, 2000);

      return () => clearInterval(monsterActionInterval);
    }
  }, [isInCombat, monster]);

  const handleAttack = (type) => {
    if (player.stamina < 20) return;

    const damage = type === 'light' ? 10 : type === 'heavy' ? 20 : 30;
    const staminaCost = type === 'light' ? 20 : type === 'heavy' ? 30 : 40;

    updateMonsterHealth(monster.health - damage);
    updatePlayerStamina(player.stamina - staminaCost);

    addToCombatLog(`Player deals ${damage} damage!`, 'damage');
    
    // Añadir efectos visuales y sonoros
    setCurrentAction(type);
    setEffects(prev => [...prev, {
      type: 'HIT',
      position: { x: window.innerWidth / 2, y: window.innerHeight / 2 },
      scale: type === 'combo' ? 1.5 : 1,
      duration: type === 'combo' ? 1500 : 1000
    }]);

    if (monster.health <= damage) {
      setEffects(prev => [...prev, {
        type: 'COMBO',
        position: { x: window.innerWidth / 2, y: window.innerHeight / 2 },
        scale: 2,
        duration: 2000
      }]);
      setIsVictory(true);
      setTimeout(() => {
        endCombat();
      }, 2000);
    }
  };

  const handleBlock = () => {
    if (player.stamina < 15) return;

    updatePlayerStamina(player.stamina - 15);
    addToCombatLog('Player blocks!', 'defense');
    
    // Añadir efectos visuales y sonoros
    setCurrentAction('block');
    setEffects(prev => [...prev, {
      type: 'HIT',
      position: { x: window.innerWidth / 2, y: window.innerHeight / 2 },
      scale: 0.8,
      duration: 800
    }]);
  };

  const handleDodge = () => {
    if (player.stamina < 25) return;

    updatePlayerStamina(player.stamina - 25);
    addToCombatLog('Player dodges!', 'defense');
    setCurrentAction('dodge');
  };

  const handleFlee = () => {
    if (Math.random() < 0.5) {
      endCombat();
      addToCombatLog('Player successfully flees!', 'defense');
    } else {
      addToCombatLog('Failed to flee!', 'damage');
      setIsDefeat(true);
    }
  };

  const addToCombatLog = (message, type) => {
    setCombatLog(prev => [
      { message, type, timestamp: Date.now() },
      ...prev.slice(0, 9)
    ]);
  };

  if (!isInCombat || !monster) return null;

  return (
    <CombatContainer>
      <HealthBars>
        <HealthBar>
          <HealthFill health={(player.health / player.maxHealth) * 100} />
        </HealthBar>
        <HealthBar>
          <HealthFill health={(monster.health / monster.maxHealth) * 100} />
        </HealthBar>
      </HealthBars>

      <MonsterAnimation
        monsterType={monster.type}
        position={{ x: window.innerWidth / 2, y: window.innerHeight / 2 }}
        currentAction={monsterAction}
        isAttacking={isMonsterAttacking}
      />

      <CombatEffects effects={effects} />
      <CombatSound
        action={currentAction}
        monsterAction={monsterAction}
        isVictory={isVictory}
        isDefeat={isDefeat}
      />

      <StaminaBar>
        <StaminaFill stamina={(player.stamina / player.maxStamina) * 100} />
      </StaminaBar>

      <Controls>
        <Button 
          onClick={() => handleAttack('light')}
          disabled={player.stamina < 20}
        >
          Light Attack
        </Button>
        <Button 
          onClick={() => handleAttack('heavy')}
          disabled={player.stamina < 30}
        >
          Heavy Attack
        </Button>
        <Button 
          onClick={() => handleAttack('combo')}
          disabled={player.stamina < 40}
        >
          Combo
        </Button>
        <Button 
          onClick={handleBlock}
          disabled={player.stamina < 15}
        >
          Block
        </Button>
        <Button 
          onClick={handleDodge}
          disabled={player.stamina < 25}
        >
          Dodge
        </Button>
        <Button onClick={handleFlee}>
          Flee
        </Button>
      </Controls>

      <CombatLog>
        <AnimatePresence>
          {combatLog.map((entry, index) => (
            <LogEntry
              key={entry.timestamp}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              type={entry.type}
            >
              {entry.message}
            </LogEntry>
          ))}
        </AnimatePresence>
      </CombatLog>
    </CombatContainer>
  );
};

export default CombatInterface; 