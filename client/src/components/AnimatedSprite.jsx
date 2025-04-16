import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import Sprite from './Sprite';

const AnimationContainer = styled(motion.div)`
  position: relative;
  width: ${props => props.width || '32px'};
  height: ${props => props.height || '32px'};
`;

const AnimatedSprite = ({
  src,
  width,
  height,
  frames,
  frameWidth,
  frameHeight,
  animationSpeed = 0.1,
  isPlaying = true,
  direction = 'right',
  ...props
}) => {
  const variants = {
    animate: {
      backgroundPosition: Array.from({ length: frames }, (_, i) => 
        `-${i * frameWidth}px 0px`
      ),
      transition: {
        duration: frames * animationSpeed,
        repeat: Infinity,
        ease: "linear"
      }
    }
  };

  return (
    <AnimationContainer
      width={width}
      height={height}
      style={{
        backgroundImage: `url(${src})`,
        backgroundSize: 'auto 100%',
        transform: direction === 'left' ? 'scaleX(-1)' : 'scaleX(1)'
      }}
      variants={variants}
      animate={isPlaying ? "animate" : "initial"}
      {...props}
    />
  );
};

export default AnimatedSprite; 