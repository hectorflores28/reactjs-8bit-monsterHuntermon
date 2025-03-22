import React, { useEffect, useRef } from 'react';
import { Howl } from 'howler';

const SOUND_EFFECTS = {
  ATTACK_LIGHT: new Howl({
    src: ['/assets/sounds/combat/attack_light.mp3'],
    volume: 0.5
  }),
  ATTACK_HEAVY: new Howl({
    src: ['/assets/sounds/combat/attack_heavy.mp3'],
    volume: 0.6
  }),
  ATTACK_COMBO: new Howl({
    src: ['/assets/sounds/combat/attack_combo.mp3'],
    volume: 0.7
  }),
  BLOCK: new Howl({
    src: ['/assets/sounds/combat/block.mp3'],
    volume: 0.4
  }),
  DODGE: new Howl({
    src: ['/assets/sounds/combat/dodge.mp3'],
    volume: 0.3
  }),
  HIT: new Howl({
    src: ['/assets/sounds/combat/hit.mp3'],
    volume: 0.5
  }),
  MONSTER_ATTACK: new Howl({
    src: ['/assets/sounds/combat/monster_attack.mp3'],
    volume: 0.6
  }),
  MONSTER_HIT: new Howl({
    src: ['/assets/sounds/combat/monster_hit.mp3'],
    volume: 0.5
  }),
  VICTORY: new Howl({
    src: ['/assets/sounds/combat/victory.mp3'],
    volume: 0.7
  }),
  DEFEAT: new Howl({
    src: ['/assets/sounds/combat/defeat.mp3'],
    volume: 0.7
  })
};

const CombatSound = ({ action, monsterAction, isVictory, isDefeat }) => {
  const lastActionRef = useRef(null);
  const lastMonsterActionRef = useRef(null);

  useEffect(() => {
    if (action && action !== lastActionRef.current) {
      switch (action) {
        case 'light':
          SOUND_EFFECTS.ATTACK_LIGHT.play();
          break;
        case 'heavy':
          SOUND_EFFECTS.ATTACK_HEAVY.play();
          break;
        case 'combo':
          SOUND_EFFECTS.ATTACK_COMBO.play();
          break;
        case 'block':
          SOUND_EFFECTS.BLOCK.play();
          break;
        case 'dodge':
          SOUND_EFFECTS.DODGE.play();
          break;
        case 'hit':
          SOUND_EFFECTS.HIT.play();
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
        SOUND_EFFECTS.MONSTER_ATTACK.play();
      } else if (monsterAction === 'HIT') {
        SOUND_EFFECTS.MONSTER_HIT.play();
      }
      lastMonsterActionRef.current = monsterAction;
    }
  }, [monsterAction]);

  useEffect(() => {
    if (isVictory) {
      SOUND_EFFECTS.VICTORY.play();
    }
  }, [isVictory]);

  useEffect(() => {
    if (isDefeat) {
      SOUND_EFFECTS.DEFEAT.play();
    }
  }, [isDefeat]);

  return null;
};

export default CombatSound; 