import React from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { REWARDS } from '../../config/combatConfig';

const RewardContainer = styled(motion.div)`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: rgba(0, 0, 0, 0.9);
  border: 2px solid #444;
  border-radius: 10px;
  padding: 20px;
  color: white;
  font-family: 'Press Start 2P', monospace;
  z-index: 1100;
  min-width: 300px;
`;

const RewardTitle = styled.h2`
  text-align: center;
  margin-bottom: 20px;
  color: #ffd700;
`;

const RewardList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const RewardItem = styled(motion.div)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5px;
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 5px;
`;

const RewardIcon = styled.div`
  width: 24px;
  height: 24px;
  margin-right: 10px;
  background-color: ${props => props.color};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
`;

const RewardName = styled.span`
  flex: 1;
`;

const RewardAmount = styled.span`
  color: ${props => props.color || '#ffffff'};
`;

const CloseButton = styled(motion.button)`
  margin-top: 20px;
  width: 100%;
  padding: 10px;
  background-color: #444;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-family: 'Press Start 2P', monospace;
  font-size: 12px;

  &:hover {
    background-color: #555;
  }
`;

const RewardSystem = ({ 
  monsterType, 
  onClose,
  experience,
  money,
  materials
}) => {
  const containerVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.8 }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 20 }
  };

  return (
    <AnimatePresence>
      <RewardContainer
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <RewardTitle>¡Recompensas!</RewardTitle>
        
        <RewardList>
          <AnimatePresence>
            <RewardItem
              key="exp"
              variants={itemVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <RewardIcon color="#44ff44">EXP</RewardIcon>
              <RewardName>Experiencia</RewardName>
              <RewardAmount color="#44ff44">+{experience}</RewardAmount>
            </RewardItem>

            <RewardItem
              key="money"
              variants={itemVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <RewardIcon color="#ffd700">$</RewardIcon>
              <RewardName>Monedas</RewardName>
              <RewardAmount color="#ffd700">+{money}</RewardAmount>
            </RewardItem>

            {materials.map((material, index) => (
              <RewardItem
                key={material}
                variants={itemVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                transition={{ delay: index * 0.1 }}
              >
                <RewardIcon color="#ff9800">M</RewardIcon>
                <RewardName>{material}</RewardName>
                <RewardAmount color="#ff9800">+1</RewardAmount>
              </RewardItem>
            ))}
          </AnimatePresence>
        </RewardList>

        <CloseButton
          onClick={onClose}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Cerrar
        </CloseButton>
      </RewardContainer>
    </AnimatePresence>
  );
};

export default RewardSystem; 