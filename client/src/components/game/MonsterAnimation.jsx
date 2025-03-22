import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { MONSTER_SPRITES } from '../../config/spriteConfig';
import SpriteAnimation from './SpriteAnimation';

const MonsterContainer = styled.div`
  position: absolute;
  width: 64px;
  height: 64px;
  transform-origin: center;
`;

const MonsterAnimation = ({ 
  monsterType, 
  position, 
  currentAction = 'IDLE',
  onAnimationComplete,
  isAttacking = false
}) => {
  const [direction, setDirection] = useState('left');
  const [scale, setScale] = useState(1);

  useEffect(() => {
    if (isAttacking) {
      setScale(1.2);
    } else {
      setScale(1);
    }
  }, [isAttacking]);

  const getMonsterSprite = () => {
    const monster = MONSTER_SPRITES[monsterType];
    if (!monster) return null;

    return {
      ...monster.animations[currentAction],
      width: monster.width,
      height: monster.height
    };
  };

  const handleAnimationComplete = () => {
    if (onAnimationComplete) {
      onAnimationComplete();
    }
  };

  const spriteConfig = getMonsterSprite();
  if (!spriteConfig) return null;

  return (
    <MonsterContainer>
      <SpriteAnimation
        spriteConfig={spriteConfig}
        position={position}
        direction={direction}
        scale={scale}
        onAnimationComplete={handleAnimationComplete}
      />
    </MonsterContainer>
  );
};

export default MonsterAnimation; 