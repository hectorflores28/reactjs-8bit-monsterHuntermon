import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { SOUNDS, playSound } from '../config/sounds';
import { WEAPON_ASSETS, WEAPON_EFFECTS } from '../config/weapons';

const WeaponSelectionContainer = styled.div`
  width: 100vw;
  height: 100vh;
  background: url('/assets/backgrounds/weapon-selection.png') no-repeat center center;
  background-size: cover;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
  font-family: 'Press Start 2P', cursive;
`;

const Title = styled.h1`
  color: #f1c40f;
  text-shadow: 3px 3px 0 #000;
  margin-bottom: 2rem;
  font-size: 2rem;
`;

const WeaponsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  width: 80%;
  max-width: 1200px;
  margin-bottom: 2rem;
`;

const WeaponCard = styled(motion.div)`
  background: ${props => props.selected ? 'rgba(241, 196, 15, 0.2)' : 'rgba(0, 0, 0, 0.7)'};
  border: 2px solid ${props => props.selected ? '#f1c40f' : '#666'};
  border-radius: 10px;
  padding: 1rem;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    border-color: #f1c40f;
  }
`;

const WeaponImage = styled.div`
  width: 100px;
  height: 100px;
  background: url(${props => props.src}) no-repeat center center;
  background-size: contain;
  image-rendering: pixelated;
  filter: drop-shadow(2px 2px 0 #000);
`;

const WeaponName = styled.h2`
  color: #fff;
  font-size: 1rem;
  text-align: center;
  text-shadow: 2px 2px 0 #000;
`;

const WeaponStats = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.5rem;
  width: 100%;
  color: #fff;
  font-size: 0.8rem;
  text-shadow: 1px 1px 0 #000;

  div {
    display: flex;
    justify-content: space-between;
    padding: 0.2rem;
    background: rgba(0, 0, 0, 0.5);
    border-radius: 5px;
  }
`;

const PreviewContainer = styled(motion.div)`
  position: fixed;
  top: 50%;
  right: 2rem;
  transform: translateY(-50%);
  width: 30%;
  min-width: 300px;
  max-width: 400px;
  background: rgba(0, 0, 0, 0.9);
  border: 4px solid #f1c40f;
  border-radius: 10px;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  z-index: 1000;
  box-shadow: 0 0 20px rgba(241, 196, 15, 0.3);
`;

const PreviewImage = styled(motion.div)`
  width: 200px;
  height: 200px;
  background: url(${props => props.src}) no-repeat center center;
  background-size: contain;
  image-rendering: pixelated;
  filter: drop-shadow(2px 2px 0 #000);
`;

const PreviewStats = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  width: 100%;
  color: #fff;
  font-size: 0.9rem;
  text-shadow: 1px 1px 0 #000;

  div {
    display: flex;
    justify-content: space-between;
    padding: 0.5rem;
    background: rgba(0, 0, 0, 0.5);
    border-radius: 5px;
  }
`;

const Button = styled(motion.button)`
  padding: 1rem 2rem;
  background-color: ${props => props.disabled ? '#666' : '#f1c40f'};
  color: #000;
  border: none;
  border-radius: 5px;
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  font-family: 'Press Start 2P', cursive;
  font-size: 1rem;
  text-shadow: 1px 1px 0 #fff;
  
  &:hover:not(:disabled) {
    background-color: #f39c12;
    transform: translateY(-2px);
  }

  &:active:not(:disabled) {
    transform: translateY(2px);
  }
`;

const EffectBadge = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
  padding: 0.2rem 0.5rem;
  background: ${props => props.color};
  border-radius: 15px;
  font-size: 0.7rem;
  color: #fff;
  text-shadow: 1px 1px 0 #000;
  margin: 0.2rem;
`;

const EffectList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin: 0.5rem 0;
`;

const weapons = [
  {
    id: 1,
    name: 'ESPADA LARGA',
    damage: 100,
    speed: 80,
    range: 3,
    description: 'Equilibrada y versátil',
    sprite: WEAPON_ASSETS.SPRITES.LONG_SWORD,
    preview: WEAPON_ASSETS.PREVIEWS.LONG_SWORD,
    effects: ['SLASH', 'THRUST'],
    specialAbility: {
      name: 'ESPADA ESPIRITUAL',
      description: 'Aumenta el daño en 50% por 5 segundos',
      cooldown: 30
    }
  },
  {
    id: 2,
    name: 'ESPADA Y ESCUDO',
    damage: 80,
    speed: 90,
    range: 2,
    description: 'Defensa y ataque',
    sprite: '/assets/weapons/sprites/swordshield.png',
    preview: '/assets/weapons/previews/swordshield.png',
    effects: ['BLOCK', 'BASH'],
    specialAbility: {
      name: 'DEFENSA PERFECTA',
      description: 'Bloquea todo el daño por 3 segundos',
      cooldown: 25
    }
  },
  {
    id: 3,
    name: 'MARTILLO',
    damage: 120,
    speed: 60,
    range: 2,
    description: 'Poderosa y lenta',
    sprite: '/assets/weapons/sprites/hammer.png',
    preview: '/assets/weapons/previews/hammer.png',
    effects: ['STUN', 'CRUSH'],
    specialAbility: {
      name: 'GOLPE DE MARTILLO',
      description: 'Aturde al enemigo por 3 segundos',
      cooldown: 35
    }
  },
  {
    id: 4,
    name: 'LANZA',
    damage: 90,
    speed: 85,
    range: 4,
    description: 'Alcance y precisión',
    sprite: '/assets/weapons/sprites/lance.png',
    preview: '/assets/weapons/previews/lance.png',
    effects: ['THRUST', 'COUNTER'],
    specialAbility: {
      name: 'IMPULSO DE LANZA',
      description: 'Empuja al enemigo y causa daño adicional',
      cooldown: 30
    }
  },
  {
    id: 5,
    name: 'HACHA DE GUERRA',
    damage: 110,
    speed: 70,
    range: 2,
    description: 'Daño devastador',
    sprite: '/assets/weapons/sprites/greataxe.png',
    preview: '/assets/weapons/previews/greataxe.png',
    effects: ['CLEAVE', 'RAGE'],
    specialAbility: {
      name: 'FURIA BERSERKER',
      description: 'Aumenta el daño y la velocidad por 5 segundos',
      cooldown: 40
    }
  },
  {
    id: 6,
    name: 'ESPADA DOBLE',
    damage: 70,
    speed: 100,
    range: 2,
    description: 'Rápida y ágil',
    sprite: '/assets/weapons/sprites/dualswords.png',
    preview: '/assets/weapons/previews/dualswords.png',
    effects: ['COMBO', 'DANCE'],
    specialAbility: {
      name: 'DANZA DE ESPADAS',
      description: 'Realiza una serie de ataques rápidos',
      cooldown: 25
    }
  },
  {
    id: 7,
    name: 'ARCO',
    damage: 85,
    speed: 75,
    range: 5,
    description: 'Ataques a distancia',
    sprite: '/assets/weapons/sprites/bow.png',
    preview: '/assets/weapons/previews/bow.png',
    effects: ['SHOT', 'RAIN'],
    specialAbility: {
      name: 'LLUVIA DE FLECHAS',
      description: 'Dispara múltiples flechas al mismo tiempo',
      cooldown: 30
    }
  },
  {
    id: 8,
    name: 'BALISTA',
    damage: 130,
    speed: 50,
    range: 6,
    description: 'Daño masivo a distancia',
    sprite: '/assets/weapons/sprites/ballista.png',
    preview: '/assets/weapons/previews/ballista.png',
    effects: ['PIERCE', 'EXPLOSION'],
    specialAbility: {
      name: 'DISPARO PERFECTO',
      description: 'Causa daño crítico garantizado',
      cooldown: 45
    }
  },
  {
    id: 9,
    name: 'ESPADA CURVA',
    damage: 95,
    speed: 85,
    range: 3,
    description: 'Cortes precisos',
    sprite: '/assets/weapons/sprites/curvedsword.png',
    preview: '/assets/weapons/previews/curvedsword.png',
    effects: ['SLASH', 'BLEED'],
    specialAbility: {
      name: 'CORTE PROFUNDO',
      description: 'Causa sangrado al enemigo',
      cooldown: 30
    }
  },
  {
    id: 10,
    name: 'MAZA',
    damage: 105,
    speed: 65,
    range: 2,
    description: 'Golpes contundentes',
    sprite: '/assets/weapons/sprites/mace.png',
    preview: '/assets/weapons/previews/mace.png',
    effects: ['CRUSH', 'STUN'],
    specialAbility: {
      name: 'GOLPE CONTUNDENTE',
      description: 'Aturde al enemigo y causa daño adicional',
      cooldown: 35
    }
  },
  {
    id: 11,
    name: 'LANZA DE HACHA',
    damage: 95,
    speed: 75,
    range: 3,
    description: 'Versátil y equilibrada',
    sprite: '/assets/weapons/sprites/halberd.png',
    preview: '/assets/weapons/previews/halberd.png',
    effects: ['THRUST', 'CLEAVE'],
    specialAbility: {
      name: 'GIRO MORTAL',
      description: 'Realiza un giro que causa daño en área',
      cooldown: 30
    }
  },
  {
    id: 12,
    name: 'ESPADA GIGANTE',
    damage: 140,
    speed: 40,
    range: 3,
    description: 'Daño masivo',
    sprite: '/assets/weapons/sprites/greatsword.png',
    preview: '/assets/weapons/previews/greatsword.png',
    effects: ['CLEAVE', 'STUN'],
    specialAbility: {
      name: 'CORTE PODEROSO',
      description: 'Realiza un corte que causa daño masivo',
      cooldown: 45
    }
  },
  {
    id: 13,
    name: 'KATANA',
    damage: 90,
    speed: 95,
    range: 3,
    description: 'Rápida y precisa',
    sprite: '/assets/weapons/sprites/katana.png',
    preview: '/assets/weapons/previews/katana.png',
    effects: ['SLASH', 'COUNTER'],
    specialAbility: {
      name: 'IAIDO',
      description: 'Realiza un corte instantáneo con daño crítico',
      cooldown: 35
    }
  },
  {
    id: 14,
    name: 'MARTILLO DE PISTÓN',
    damage: 105,
    speed: 55,
    range: 2,
    description: 'Transformable y poderosa',
    sprite: '/assets/weapons/sprites/pistonhammer.png',
    preview: '/assets/weapons/previews/pistonhammer.png',
    effects: ['CRUSH', 'EXPLOSION'],
    specialAbility: {
      name: 'IMPACTO DE PISTÓN',
      description: 'Causa daño explosivo en área',
      cooldown: 40
    }
  }
];

const WeaponSelection = () => {
  const navigate = useNavigate();
  const [selectedWeapon, setSelectedWeapon] = useState(null);
  const [showPreview, setShowPreview] = useState(false);

  const handleWeaponSelect = (weapon) => {
    setSelectedWeapon(weapon);
    setShowPreview(true);
    playSound(SOUNDS.UI.SELECT);
  };

  const handleContinue = () => {
    if (selectedWeapon) {
      localStorage.setItem('weapon', JSON.stringify(selectedWeapon));
      playSound(SOUNDS.UI.SELECT);
      navigate('/first-hunt');
    }
  };

  const renderEffects = (effects) => {
    return (
      <EffectList>
        {effects.map(effect => {
          const effectData = WEAPON_EFFECTS[effect];
          return (
            <EffectBadge key={effect} color={effectData.color}>
              {effectData.icon} {effectData.name}
            </EffectBadge>
          );
        })}
      </EffectList>
    );
  };

  return (
    <WeaponSelectionContainer>
      <Title>SELECCIÓN DE ARMA</Title>
      <WeaponsGrid>
        {weapons.map(weapon => (
          <WeaponCard
            key={weapon.id}
            selected={selectedWeapon?.id === weapon.id}
            onClick={() => handleWeaponSelect(weapon)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <WeaponImage src={weapon.sprite} />
            <WeaponName>{weapon.name}</WeaponName>
            <WeaponStats>
              <div>DAÑO: {weapon.damage}</div>
              <div>VELOCIDAD: {weapon.speed}</div>
              <div>ALCANCE: {weapon.range}</div>
              <div>{weapon.description}</div>
            </WeaponStats>
            {renderEffects(weapon.effects)}
          </WeaponCard>
        ))}
      </WeaponsGrid>

      <AnimatePresence>
        {showPreview && selectedWeapon && (
          <PreviewContainer
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
          >
            <PreviewImage src={selectedWeapon.preview} />
            <WeaponName>{selectedWeapon.name}</WeaponName>
            <PreviewStats>
              <div>DAÑO: {selectedWeapon.damage}</div>
              <div>VELOCIDAD: {selectedWeapon.speed}</div>
              <div>ALCANCE: {selectedWeapon.range}</div>
              <div>EFECTOS: {renderEffects(selectedWeapon.effects)}</div>
              <div>HABILIDAD ESPECIAL: {selectedWeapon.specialAbility.name}</div>
              <div>DESCRIPCIÓN: {selectedWeapon.specialAbility.description}</div>
              <div>ENFRIAMIENTO: {selectedWeapon.specialAbility.cooldown}s</div>
            </PreviewStats>
            <Button
              onClick={handleContinue}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              CONTINUAR
            </Button>
          </PreviewContainer>
        )}
      </AnimatePresence>
    </WeaponSelectionContainer>
  );
};

export default WeaponSelection; 