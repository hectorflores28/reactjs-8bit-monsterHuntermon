import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const SpriteContainer = styled(motion.div)`
  position: relative;
  width: ${props => props.width || '32px'};
  height: ${props => props.height || '32px'};
  overflow: hidden;
  image-rendering: pixelated;
`;

const SpriteImage = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: contain;
`;

const Sprite = ({
  src,
  width,
  height,
  animation,
  initial,
  animate,
  transition,
  ...props
}) => {
  return (
    <SpriteContainer
      width={width}
      height={height}
      initial={initial}
      animate={animate}
      transition={transition}
      {...props}
    >
      <SpriteImage src={src} alt="Sprite" />
    </SpriteContainer>
  );
};

export default Sprite; 