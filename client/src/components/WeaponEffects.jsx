import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const WeaponEffectContainer = styled(motion.div)`
  position: absolute;
  pointer-events: none;
  z-index: 1000;
`;

const SlashEffect = styled(motion.div)`
  position: absolute;
  width: 64px;
  height: 64px;
  background: url('/assets/effects/slash.png') no-repeat center center;
  background-size: contain;
`;

const ImpactEffect = styled(motion.div)`
  position: absolute;
  width: 48px;
  height: 48px;
  background: url('/assets/effects/impact.png') no-repeat center center;
  background-size: contain;
`;

const TrailEffect = styled(motion.div)`
  position: absolute;
  width: 32px;
  height: 32px;
  background: url('/assets/effects/trail.png') no-repeat center center;
  background-size: contain;
`;

const WeaponEffects = ({
  type,
  position,
  direction = 'right',
  onComplete
}) => {
  const variants = {
    slash: {
      initial: { scale: 0, rotate: 0 },
      animate: { scale: 1, rotate: 360 },
      exit: { scale: 0, rotate: 720 },
      transition: { duration: 0.3 }
    },
    impact: {
      initial: { scale: 0, opacity: 0 },
      animate: { scale: 1, opacity: 1 },
      exit: { scale: 0, opacity: 0 },
      transition: { duration: 0.2 }
    },
    trail: {
      initial: { scale: 1, opacity: 1 },
      animate: { scale: 2, opacity: 0 },
      transition: { duration: 0.5 }
    }
  };

  const getEffectComponent = () => {
    switch (type) {
      case 'slash':
        return <SlashEffect variants={variants.slash} />;
      case 'impact':
        return <ImpactEffect variants={variants.impact} />;
      case 'trail':
        return <TrailEffect variants={variants.trail} />;
      default:
        return null;
    }
  };

  return (
    <WeaponEffectContainer
      style={{
        left: position.x,
        top: position.y,
        transform: direction === 'left' ? 'scaleX(-1)' : 'scaleX(1)'
      }}
      initial="initial"
      animate="animate"
      exit="exit"
      onAnimationComplete={onComplete}
    >
      {getEffectComponent()}
    </WeaponEffectContainer>
  );
};

export default WeaponEffects; 