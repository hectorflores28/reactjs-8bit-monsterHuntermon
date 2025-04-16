import React from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';

const EffectContainer = styled(motion.div)`
  position: absolute;
  pointer-events: none;
  z-index: 1000;
`;

const DamageNumber = styled(motion.span)`
  position: absolute;
  font-family: 'Press Start 2P', cursive;
  font-size: 16px;
  color: ${props => props.type === 'critical' ? '#ff0000' : '#ffffff'};
  text-shadow: 2px 2px 0 #000;
`;

const HitEffect = styled(motion.div)`
  position: absolute;
  width: 32px;
  height: 32px;
  background: url('/assets/effects/hit.png') no-repeat center center;
  background-size: contain;
`;

const CriticalEffect = styled(motion.div)`
  position: absolute;
  width: 64px;
  height: 64px;
  background: url('/assets/effects/critical.png') no-repeat center center;
  background-size: contain;
`;

const CombatEffects = ({
  damage,
  position,
  type = 'normal',
  onComplete
}) => {
  const variants = {
    damage: {
      initial: { y: 0, opacity: 1 },
      animate: { y: -50, opacity: 0 },
      transition: { duration: 1 }
    },
    hit: {
      initial: { scale: 0, opacity: 0 },
      animate: { scale: 1, opacity: 1 },
      exit: { scale: 0, opacity: 0 },
      transition: { duration: 0.3 }
    },
    critical: {
      initial: { scale: 0, opacity: 0, rotate: 0 },
      animate: { scale: 1.5, opacity: 1, rotate: 360 },
      exit: { scale: 0, opacity: 0, rotate: 720 },
      transition: { duration: 0.5 }
    }
  };

  return (
    <EffectContainer
      style={{
        left: position.x,
        top: position.y
      }}
    >
      <AnimatePresence>
        {damage && (
          <DamageNumber
            type={type}
            variants={variants.damage}
            initial="initial"
            animate="animate"
            onAnimationComplete={onComplete}
          >
            {damage}
          </DamageNumber>
        )}
      </AnimatePresence>

      <AnimatePresence>
        <HitEffect
          variants={variants.hit}
          initial="initial"
          animate="animate"
          exit="exit"
        />
      </AnimatePresence>

      {type === 'critical' && (
        <AnimatePresence>
          <CriticalEffect
            variants={variants.critical}
            initial="initial"
            animate="animate"
            exit="exit"
          />
        </AnimatePresence>
      )}
    </EffectContainer>
  );
};

export default CombatEffects; 