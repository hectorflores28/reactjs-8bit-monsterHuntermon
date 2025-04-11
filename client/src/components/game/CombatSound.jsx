import React, { useEffect, useRef } from 'react';
import { Howl } from 'howler';

// Función auxiliar para crear sonidos con manejo de errores
const createSound = (path, volume = 0.5) => {
  try {
    return new Howl({
      src: [path],
      volume,
      html5: true,
      onloaderror: () => {
        console.warn(`No se pudo cargar el sonido: ${path}`);
      }
    });
  } catch (error) {
    console.warn(`Error al crear el sonido: ${path}`, error);
    return null;
  }
};

const SOUND_EFFECTS = {
  ATTACK_LIGHT: createSound('/assets/sounds/combat/attack_light.mp3', 0.5),
  ATTACK_HEAVY: createSound('/assets/sounds/combat/attack_heavy.mp3', 0.6),
  ATTACK_COMBO: createSound('/assets/sounds/combat/attack_combo.mp3', 0.7),
  BLOCK: createSound('/assets/sounds/combat/block.mp3', 0.4),
  DODGE: createSound('/assets/sounds/combat/dodge.mp3', 0.3),
  HIT: createSound('/assets/sounds/combat/hit.mp3', 0.5),
  MONSTER_ATTACK: createSound('/assets/sounds/combat/monster_attack.mp3', 0.6),
  MONSTER_HIT: createSound('/assets/sounds/combat/monster_hit.mp3', 0.5),
  VICTORY: createSound('/assets/sounds/combat/victory.mp3', 0.7),
  DEFEAT: createSound('/assets/sounds/combat/defeat.mp3', 0.7)
};

const playSound = (sound) => {
  if (sound && typeof sound.play === 'function') {
    try {
      sound.play();
    } catch (error) {
      console.warn('Error al reproducir el sonido:', error);
    }
  }
};

const CombatSound = ({ action, monsterAction, isVictory, isDefeat }) => {
  const lastActionRef = useRef(null);
  const lastMonsterActionRef = useRef(null);

  useEffect(() => {
    if (action && action !== lastActionRef.current) {
      switch (action) {
        case 'light':
          playSound(SOUND_EFFECTS.ATTACK_LIGHT);
          break;
        case 'heavy':
          playSound(SOUND_EFFECTS.ATTACK_HEAVY);
          break;
        case 'combo':
          playSound(SOUND_EFFECTS.ATTACK_COMBO);
          break;
        case 'block':
          playSound(SOUND_EFFECTS.BLOCK);
          break;
        case 'dodge':
          playSound(SOUND_EFFECTS.DODGE);
          break;
        case 'hit':
          playSound(SOUND_EFFECTS.HIT);
          break;
        default:
          break;
      }
      lastActionRef.current = action;
    }
  }, [action]);

  useEffect(() => {
    if (monsterAction && monsterAction !== lastMonsterActionRef.current) {
      if (monsterAction === 'ATTACK') {
        playSound(SOUND_EFFECTS.MONSTER_ATTACK);
      } else if (monsterAction === 'HIT') {
        playSound(SOUND_EFFECTS.MONSTER_HIT);
      }
      lastMonsterActionRef.current = monsterAction;
    }
  }, [monsterAction]);

  useEffect(() => {
    if (isVictory) {
      playSound(SOUND_EFFECTS.VICTORY);
    }
  }, [isVictory]);

  useEffect(() => {
    if (isDefeat) {
      playSound(SOUND_EFFECTS.DEFEAT);
    }
  }, [isDefeat]);

  return null;
};

export default CombatSound; 