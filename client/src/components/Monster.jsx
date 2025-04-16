import React from 'react';
import styled from 'styled-components';
import AnimatedSprite from './AnimatedSprite';

const MonsterContainer = styled.div`
  position: relative;
  width: ${props => props.size || '96px'};
  height: ${props => props.size || '96px'};
`;

const Monster = ({
  monsterData,
  animation = 'idle',
  direction = 'right',
  size = '96px',
  ...props
}) => {
  const {
    type,
    variant,
    level
  } = monsterData;

  const getSpritePath = () => {
    const basePath = '/assets/monsters';
    return `${basePath}/${type}/${variant}/${animation}.png`;
  };

  const animationConfig = {
    idle: { frames: 4, frameWidth: 96, frameHeight: 96, speed: 0.2 },
    walk: { frames: 6, frameWidth: 96, frameHeight: 96, speed: 0.15 },
    attack: { frames: 8, frameWidth: 96, frameHeight: 96, speed: 0.1 },
    hurt: { frames: 4, frameWidth: 96, frameHeight: 96, speed: 0.2 },
    death: { frames: 6, frameWidth: 96, frameHeight: 96, speed: 0.2 }
  };

  const config = animationConfig[animation] || animationConfig.idle;

  return (
    <MonsterContainer size={size} {...props}>
      <AnimatedSprite
        src={getSpritePath()}
        width={config.frameWidth}
        height={config.frameHeight}
        frames={config.frames}
        frameWidth={config.frameWidth}
        frameHeight={config.frameHeight}
        animationSpeed={config.speed}
        direction={direction}
      />
    </MonsterContainer>
  );
};

export default Monster; 