import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const StatusContainer = styled(motion.div)`
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  pointer-events: none;
  z-index: 100;
`;

const StatusIcon = styled(motion.div)`
  width: 24px;
  height: 24px;
  background: url(${props => props.icon}) no-repeat center center;
  background-size: contain;
`;

const StatusTimer = styled(motion.div)`
  width: 24px;
  height: 4px;
  background: rgba(0, 0, 0, 0.5);
  border-radius: 2px;
  overflow: hidden;
`;

const StatusProgress = styled(motion.div)`
  height: 100%;
  background: ${props => props.color || '#ffffff'};
  border-radius: 2px;
`;

const StatusEffects = ({
  effects,
  position
}) => {
  const getStatusIcon = (type) => {
    const icons = {
      poison: '/assets/effects/poison.png',
      burn: '/assets/effects/burn.png',
      freeze: '/assets/effects/freeze.png',
      paralyze: '/assets/effects/paralyze.png',
      sleep: '/assets/effects/sleep.png',
      buff: '/assets/effects/buff.png',
      debuff: '/assets/effects/debuff.png'
    };
    return icons[type] || icons.buff;
  };

  const getStatusColor = (type) => {
    const colors = {
      poison: '#00ff00',
      burn: '#ff0000',
      freeze: '#00ffff',
      paralyze: '#ffff00',
      sleep: '#ff00ff',
      buff: '#ffffff',
      debuff: '#ff0000'
    };
    return colors[type] || colors.buff;
  };

  return (
    <StatusContainer
      style={{
        left: position.x,
        top: position.y
      }}
    >
      {effects.map((effect, index) => (
        <React.Fragment key={index}>
          <StatusIcon
            icon={getStatusIcon(effect.type)}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            transition={{ duration: 0.2 }}
          />
          <StatusTimer>
            <StatusProgress
              color={getStatusColor(effect.type)}
              initial={{ width: '100%' }}
              animate={{ width: '0%' }}
              transition={{ duration: effect.duration, ease: 'linear' }}
            />
          </StatusTimer>
        </React.Fragment>
      ))}
    </StatusContainer>
  );
};

export default StatusEffects; 