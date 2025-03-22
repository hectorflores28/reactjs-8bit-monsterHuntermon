import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { useGameStore } from '../../store/gameStore';
import MonsterAnimation from './MonsterAnimation';
import CombatEffects from './CombatEffects';
import CombatSound from './CombatSound';
import StatusEffectsDisplay from './StatusEffectsDisplay';
import ComboSystem from './ComboSystem';
import UltimateAbilityBar from './UltimateAbilityBar';
import StatusEffectInteractionDisplay from './StatusEffectInteractionDisplay';
import { MonsterAI } from '../../config/monsterAI';
import { StatusEffectManager, StatusEffectApplier } from '../../config/statusEffects';
import { StatusEffectInteractionManager, StatusEffectVisualManager } from '../../config/statusEffectInteractions';
import { ATTACK_POSITIONS, WEAPONS, MONSTERS, COMBAT_EFFECTS } from '../../config/combatConfig';
import ComboProgressDisplay from './ComboProgressDisplay';

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
  const [currentEnergy, setCurrentEnergy] = useState(0);
  const [ultimateCooldown, setUltimateCooldown] = useState(0);
  const [playerPosition, setPlayerPosition] = useState({ x: 0, y: 0 });
  const [monsterPosition, setMonsterPosition] = useState({ x: 0, y: 0 });
  const [comboCount, setComboCount] = useState(0);
  const [statusEffectCount, setStatusEffectCount] = useState(0);
  const [combatStartTime, setCombatStartTime] = useState(null);
  const [effectInteractions, setEffectInteractions] = useState([]);
  const [currentSequence, setCurrentSequence] = useState([]);
  const [sequenceTimeout, setSequenceTimeout] = useState(null);

  const monsterAI = useRef(null);
  const statusEffectManager = useRef(new StatusEffectManager());
  const statusEffectApplier = useRef(new StatusEffectApplier(statusEffectManager.current));
  const statusEffectInteractionManager = useRef(new StatusEffectInteractionManager());
  const statusEffectVisualManager = useRef(new StatusEffectVisualManager());
  const combatTimer = useRef(null);

  useEffect(() => {
    if (isInCombat && monster) {
      setCombatStartTime(Date.now());
      monsterAI.current = new MonsterAI(monster.type);
      startCombatTimer();
    }
    return () => {
      if (combatTimer.current) {
        clearInterval(combatTimer.current);
      }
    };
  }, [isInCombat, monster]);

  const startCombatTimer = () => {
    combatTimer.current = setInterval(() => {
      // Actualizar posiciones y calcular distancia
      updatePositions();
      
      // Actualizar IA del monstruo
      if (monsterAI.current) {
        const conditions = {
          health: monster.health / monster.maxHealth,
          playerDistance: calculateDistance(),
          playerAttacking: currentAction !== null,
          playerPosition: playerPosition,
          monsterPosition: monsterPosition
        };

        const stateChanged = monsterAI.current.updateState(conditions);
        if (stateChanged) {
          setMonsterAction(monsterAI.current.currentState);
        }

        const pattern = monsterAI.current.selectAttackPattern(conditions);
        if (monsterAI.current.checkCooldown(pattern)) {
          executeMonsterAction(pattern);
        }
      }

      // Actualizar efectos de estado
      statusEffectManager.current.update();
      updateStatusEffects();

      // Actualizar cooldown de habilidad definitiva
      if (ultimateCooldown > 0) {
        setUltimateCooldown(prev => Math.max(0, prev - 1000));
      }
    }, 1000);
  };

  const updatePositions = () => {
    // Simular movimiento del jugador y monstruo
    setPlayerPosition(prev => ({
      x: prev.x + (Math.random() - 0.5) * 0.1,
      y: prev.y + (Math.random() - 0.5) * 0.1
    }));
    setMonsterPosition(prev => ({
      x: prev.x + (Math.random() - 0.5) * 0.1,
      y: prev.y + (Math.random() - 0.5) * 0.1
    }));
  };

  const calculateDistance = () => {
    const dx = playerPosition.x - monsterPosition.x;
    const dy = playerPosition.y - monsterPosition.y;
    return Math.sqrt(dx * dx + dy * dy);
  };

  const calculateAttackPosition = () => {
    const dx = monsterPosition.x - playerPosition.x;
    const dy = monsterPosition.y - playerPosition.y;
    const angle = Math.atan2(dy, dx) * 180 / Math.PI;

    if (angle > -45 && angle <= 45) return ATTACK_POSITIONS.SIDE;
    if (angle > 45 && angle <= 135) return ATTACK_POSITIONS.BACK;
    if (angle > 135 || angle <= -135) return ATTACK_POSITIONS.SIDE;
    return ATTACK_POSITIONS.FRONT;
  };

  const executeMonsterAction = (pattern) => {
    setIsMonsterAttacking(true);
    setMonsterAction(pattern.name);

    const baseDamage = monster.baseDamage;
    const modifiers = statusEffectManager.current.calculateStatModifiers('monster');
    const damage = Math.floor(baseDamage * pattern.damage * modifiers.damageMultiplier);

    updatePlayerHealth(player.health - damage);
    addToCombatLog(`Monstruo causa ${damage} de daño!`, 'damage');

    setEffects(prev => [...prev, {
      type: 'HIT',
      position: { x: window.innerWidth / 2, y: window.innerHeight / 2 },
      scale: pattern.name === 'special' ? 1.5 : 1,
      duration: pattern.name === 'special' ? 1500 : 1000
    }]);

    setTimeout(() => {
      setIsMonsterAttacking(false);
      setMonsterAction('IDLE');
    }, 1000);
  };

  const handleCombo = (combo) => {
    const weapon = WEAPONS[player.weapon];
    const attackPosition = calculateAttackPosition();
    const positionMultiplier = weapon.specialAbility.positionMultipliers[attackPosition] || 1;
    
    const damage = Math.floor(combo.damage * positionMultiplier);
    updateMonsterHealth(monster.health - damage);
    updatePlayerStamina(player.stamina - combo.staminaCost);

    addToCombatLog(`¡${combo.name} causa ${damage} de daño!`, 'damage');
    
    setCurrentAction('combo');
    setEffects(prev => [...prev, {
      type: 'COMBO_FINISH',
      position: { x: window.innerWidth / 2, y: window.innerHeight / 2 },
      scale: 1.5,
      duration: 1500
    }]);

    // Aplicar efectos de estado
    combo.statusEffects.forEach(effect => {
      statusEffectApplier.current.applyEffectFromAbility('monster', effect);
    });

    // Aumentar contadores
    setComboCount(prev => prev + 1);
    setStatusEffectCount(prev => prev + combo.statusEffects.length);

    // Aumentar energía
    setCurrentEnergy(prev => Math.min(100, prev + combo.energyGain));

    // Verificar victoria
    if (monster.health <= damage) {
      handleVictory();
    }
  };

  const handleUltimateAbility = (ultimate) => {
    if (currentEnergy < 100 || ultimateCooldown > 0) return;

    const weapon = WEAPONS[player.weapon];
    const attackPosition = calculateAttackPosition();
    const positionMultiplier = weapon.ultimateAbility.positionMultipliers?.[attackPosition] || 1;
    
    const damage = Math.floor(ultimate.damage * positionMultiplier);
    updateMonsterHealth(monster.health - damage);
    updatePlayerStamina(player.stamina - ultimate.energyCost);

    addToCombatLog(`¡${ultimate.name} causa ${damage} de daño!`, 'damage');
    
    setCurrentAction('ultimate');
    setEffects(prev => [...prev, {
      type: 'ULTIMATE_ABILITY',
      position: { x: window.innerWidth / 2, y: window.innerHeight / 2 },
      scale: 2,
      duration: 2000
    }]);

    // Aplicar efectos de estado
    ultimate.statusEffects.forEach(effect => {
      statusEffectApplier.current.applyEffectFromAbility('monster', effect);
    });

    // Resetear energía y cooldown
    setCurrentEnergy(0);
    setUltimateCooldown(ultimate.cooldown);

    // Verificar victoria
    if (monster.health <= damage) {
      handleVictory();
    }
  };

  const handleVictory = () => {
    setIsVictory(true);
    const combatTime = Date.now() - combatStartTime;
    const rewards = calculateRewards(combatTime);
    
    setTimeout(() => {
      endCombat(rewards);
    }, 2000);
  };

  const calculateRewards = (combatTime) => {
    const baseRewards = {
      experience: REWARDS.EXPERIENCE[monster.type],
      money: REWARDS.MONEY[monster.type],
      materials: REWARDS.MATERIALS[monster.type]
    };

    let multiplier = 1;

    // Bonus por velocidad
    if (combatTime < REWARDS.BONUS_REWARDS.SPEED_KILL.timeThreshold) {
      multiplier *= REWARDS.BONUS_REWARDS.SPEED_KILL.multiplier;
    }

    // Bonus por no recibir daño
    if (player.health === player.maxHealth) {
      multiplier *= REWARDS.BONUS_REWARDS.NO_DAMAGE.multiplier;
    }

    // Bonus por combos
    if (comboCount >= REWARDS.BONUS_REWARDS.COMBO_MASTER.requiredCombos) {
      multiplier *= REWARDS.BONUS_REWARDS.COMBO_MASTER.multiplier;
    }

    // Bonus por efectos de estado
    if (statusEffectCount >= REWARDS.BONUS_REWARDS.STATUS_EFFECT.requiredEffects) {
      multiplier *= REWARDS.BONUS_REWARDS.STATUS_EFFECT.multiplier;
    }

    return {
      experience: Math.floor(baseRewards.experience * multiplier),
      money: Math.floor(baseRewards.money * multiplier),
      materials: baseRewards.materials
    };
  };

  const handleEffectInteraction = (effect1, effect2, target) => {
    const interaction = statusEffectInteractionManager.current.applyInteraction(target, effect1, effect2);
    if (!interaction) return;

    const interactionId = Date.now();
    setEffectInteractions(prev => [...prev, { ...interaction, id: interactionId }]);

    switch (interaction.type) {
      case 'CLEAR':
        statusEffectManager.current.removeEffect(effect1, target);
        break;
      case 'POTENTIATE':
        statusEffectManager.current.potentiateEffect(effect1, target, interaction.multiplier);
        break;
      case 'EXTEND':
        statusEffectManager.current.extendEffect(effect1, target, interaction.duration);
        break;
    }

    updateStatusEffects();
  };

  const handleInteractionComplete = (interactionId) => {
    setEffectInteractions(prev => prev.filter(interaction => interaction.id !== interactionId));
  };

  const updateStatusEffects = () => {
    const playerEffects = statusEffectManager.current.getActiveEffects('player');
    const monsterEffects = statusEffectManager.current.getActiveEffects('monster');

    // Verificar interacciones entre efectos
    playerEffects.forEach(effect1 => {
      monsterEffects.forEach(effect2 => {
        handleEffectInteraction(effect1.type, effect2.type, 'monster');
      });
    });

    monsterEffects.forEach(effect1 => {
      playerEffects.forEach(effect2 => {
        handleEffectInteraction(effect1.type, effect2.type, 'player');
      });
    });

    setPlayerEffects(playerEffects);
    setMonsterEffects(monsterEffects);
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
    
    // Actualizar secuencia de combo
    setCurrentSequence(prev => [...prev, type]);
    
    // Limpiar timeout anterior
    if (sequenceTimeout) {
      clearTimeout(sequenceTimeout);
    }

    // Establecer nuevo timeout para resetear la secuencia
    const timeout = setTimeout(() => {
      setCurrentSequence([]);
    }, 3000);

    setSequenceTimeout(timeout);

    // Verificar si la secuencia actual coincide con algún combo
    const currentSequenceStr = [...currentSequence, type].join(',');
    const matchingCombo = weapon.combos.find(combo => 
      combo.sequence.join(',') === currentSequenceStr
    );

    if (matchingCombo) {
      handleCombo(matchingCombo);
      setCurrentSequence([]);
    }
    
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

  const weapon = WEAPONS[player.weapon];

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

      <StatusEffectInteractionDisplay
        interactions={effectInteractions}
        onInteractionComplete={handleInteractionComplete}
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

      <UltimateAbilityBar
        ultimateAbility={weapon.ultimateAbility}
        currentEnergy={currentEnergy}
        onUltimateUse={handleUltimateAbility}
        disabled={player.stamina < weapon.ultimateAbility.energyCost}
        cooldown={ultimateCooldown}
      />

      <ComboSystem
        weaponType={player.weapon}
        onComboSelect={handleCombo}
        onSpecialAbility={() => {}}
        stamina={player.stamina}
        disabled={isVictory || isDefeat}
      />

      <ComboProgressDisplay
        weaponType={player.weapon}
        currentSequence={currentSequence}
        onComboSelect={handleCombo}
        stamina={player.stamina}
        disabled={isVictory || isDefeat}
      />

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