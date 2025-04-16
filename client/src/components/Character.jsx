import React from 'react';
import styled from 'styled-components';
import AnimatedSprite from './AnimatedSprite';

const CharacterContainer = styled.div`
  position: relative;
  width: 64px;
  height: 64px;
`;

const Character = ({
  characterData,
  animation = 'idle',
  direction = 'right',
  ...props
}) => {
  const {
    gender,
    class: characterClass,
    hairColor,
    clothesColor
  } = characterData;

  const getSpritePath = () => {
    const basePath = '/assets/characters';
    return `${basePath}/${gender}/${characterClass}/${animation}.png`;
  };

  const animationConfig = {
    idle: { frames: 4, frameWidth: 64, frameHeight: 64, speed: 0.2 },
    walk: { frames: 6, frameWidth: 64, frameHeight: 64, speed: 0.15 },
    attack: { frames: 8, frameWidth: 64, frameHeight: 64, speed: 0.1 },
    hurt: { frames: 4, frameWidth: 64, frameHeight: 64, speed: 0.2 }
  };

  const config = animationConfig[animation] || animationConfig.idle;

  return (
    <CharacterContainer {...props}>
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
    </CharacterContainer>
  );
};

export default Character; 