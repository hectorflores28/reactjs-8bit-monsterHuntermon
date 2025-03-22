import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { useGameStore } from '../../store/gameStore';
import MonsterAnimation from './MonsterAnimation';
import CombatEffects from './CombatEffects';
import CombatSound from './CombatSound';
import StatusEffectsDisplay from './StatusEffectsDisplay';
import { MonsterAI } from '../../config/monsterAI';
import { StatusEffectManager, StatusEffectApplier } from '../../config/statusEffects';

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
    updatePlayerStamina,
    addStatusEffect,
    removeStatusEffect
  } = useGameStore();

  const [combatLog, setCombatLog] = useState([]);
  const [monsterAction, setMonsterAction] = useState('IDLE');
  const [isMonsterAttacking, setIsMonsterAttacking] = useState(false);
  const [effects, setEffects] = useState([]);
  const [currentAction, setCurrentAction] = useState(null);
  const [isVictory, setIsVictory] = useState(false);
  const [isDefeat, setIsDefeat] = useState(false);
  const [playerEffects, setPlayerEffects] = useState([]);
  const [monsterEffects, setMonsterEffects] = useState([]);

  const monsterAI = useRef(null);
  const statusEffectManager = useRef(new StatusEffectManager());
  const statusEffectApplier = useRef(new StatusEffectApplier(statusEffectManager.current));

  useEffect(() => {
    if (isInCombat && monster) {
      // Inicializar IA del monstruo
      monsterAI.current = new MonsterAI(monster.type);

      // Iniciar el ciclo de actualización de la IA
      const aiUpdateInterval = setInterval(() => {
        if (!monsterAI.current) return;

        const conditions = {
          health: monster.health / monster.maxHealth,
          playerDistance: calculateDistance(),
          playerAttacking: currentAction !== null
        };

        // Actualizar estado del monstruo
        const stateChanged = monsterAI.current.updateState(conditions);
        if (stateChanged) {
          setMonsterAction(monsterAI.current.currentState);
        }

        // Seleccionar y ejecutar acción
        const pattern = monsterAI.current.selectAttackPattern(conditions);
        if (monsterAI.current.checkCooldown(pattern)) {
          executeMonsterAction(pattern);
        }

        // Actualizar efectos de estado
        statusEffectManager.current.update();
        updateStatusEffects();
      }, 1000);

      return () => clearInterval(aiUpdateInterval);
    }
  }, [isInCombat, monster, currentAction]);

  const calculateDistance = () => {
    // Implementar cálculo de distancia entre jugador y monstruo
    return 2; // Valor temporal
  };

  const executeMonsterAction = (pattern) => {
    setIsMonsterAttacking(true);
    setMonsterAction(pattern.name);

    // Calcular daño con modificadores
    const baseDamage = monster.baseDamage;
    const modifiers = statusEffectManager.current.calculateStatModifiers('monster');
    const damage = Math.floor(baseDamage * pattern.damage * modifiers.damageMultiplier);

    // Aplicar daño al jugador
    updatePlayerHealth(player.health - damage);
    addToCombatLog(`Monstruo causa ${damage} de daño!`, 'damage');

    // Añadir efectos visuales
    setEffects(prev => [...prev, {
      type: 'HIT',
      position: { x: window.innerWidth / 2, y: window.innerHeight / 2 },
      scale: pattern.name === 'special' ? 1.5 : 1,
      duration: pattern.name === 'special' ? 1500 : 1000
    }]);

    // Resetear estado de ataque
    setTimeout(() => {
      setIsMonsterAttacking(false);
      setMonsterAction('IDLE');
    }, 1000);
  };

  const updateStatusEffects = () => {
    setPlayerEffects(statusEffectManager.current.getActiveEffects('player'));
    setMonsterEffects(statusEffectManager.current.getActiveEffects('monster'));
  };

  const handleAttack = (type) => {
    if (player.stamina < 20) return;

    const weapon = WEAPONS[player.weapon];
    const damage = type === 'light' ? weapon.baseDamage : 
                  type === 'heavy' ? weapon.baseDamage * 1.5 : 
                  weapon.baseDamage * 2;
    
    const staminaCost = weapon.staminaCost[type];

    // Calcular daño con modificadores
    const modifiers = statusEffectManager.current.calculateStatModifiers('player');
    const finalDamage = Math.floor(damage * modifiers.damageMultiplier);

    updateMonsterHealth(monster.health - finalDamage);
    updatePlayerStamina(player.stamina - staminaCost);

    addToCombatLog(`Jugador causa ${finalDamage} de daño!`, 'damage');
    
    // Añadir efectos visuales y sonoros
    setCurrentAction(type);
    setEffects(prev => [...prev, {
      type: 'HIT',
      position: { x: window.innerWidth / 2, y: window.innerHeight / 2 },
      scale: type === 'combo' ? 1.5 : 1,
      duration: type === 'combo' ? 1500 : 1000
    }]);

    // Aplicar efectos de estado basados en el tipo de daño
    statusEffectApplier.current.applyEffectFromDamage('monster', weapon.type);

    if (monster.health <= finalDamage) {
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
    addToCombatLog('Jugador bloquea!', 'defense');
    
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
    addToCombatLog('Jugador esquiva!', 'defense');
    setCurrentAction('dodge');
  };

  const handleFlee = () => {
    if (Math.random() < 0.5) {
      endCombat();
      addToCombatLog('Jugador huye exitosamente!', 'defense');
    } else {
      addToCombatLog('Fallo al huir!', 'damage');
      setIsDefeat(true);
    }
  };

  const handleEffectClick = (effectId) => {
    // Implementar lógica para remover efecto al hacer clic
    statusEffectManager.current.removeEffect(effectId);
    updateStatusEffects();
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

      <StatusEffectsDisplay
        effects={playerEffects}
        onEffectClick={handleEffectClick}
        target="player"
      />

      <StatusEffectsDisplay
        effects={monsterEffects}
        onEffectClick={handleEffectClick}
        target="monster"
      />

      <StaminaBar>
        <StaminaFill stamina={(player.stamina / player.maxStamina) * 100} />
      </StaminaBar>

      <Controls>
        <Button 
          onClick={() => handleAttack('light')}
          disabled={player.stamina < 20}
        >
          Ataque Ligero
        </Button>
        <Button 
          onClick={() => handleAttack('heavy')}
          disabled={player.stamina < 30}
        >
          Ataque Pesado
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
          Bloquear
        </Button>
        <Button 
          onClick={handleDodge}
          disabled={player.stamina < 25}
        >
          Esquivar
        </Button>
        <Button onClick={handleFlee}>
          Huir
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