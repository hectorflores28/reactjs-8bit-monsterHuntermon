import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaFire, FaShieldAlt, FaBolt, FaSkull } from 'react-icons/fa';

const CombatContainer = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 1rem;
  background: rgba(0, 0, 0, 0.8);
  color: #fff;
`;

const StatusBar = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
`;

const HealthBar = styled.div`
  width: 100%;
  height: 20px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  overflow: hidden;
`;

const HealthFill = styled(motion.div)`
  width: ${props => props.percentage}%;
  height: 100%;
  background: #ff4444;
  transition: width 0.3s ease;
`;

const StatusEffects = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1rem;
`;

const StatusEffect = styled(motion.div)`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  padding: 0.25rem 0.5rem;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 5px;
  font-size: 0.9rem;

  &.positive {
    border-left: 3px solid #00ff00;
  }

  &.negative {
    border-left: 3px solid #ff4444;
  }
`;

const SkillsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 0.5rem;
`;

const SkillButton = styled(motion.button)`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.25rem;
  padding: 0.5rem;
  background: ${props => props.ready ? '#ffd700' : 'rgba(255, 255, 255, 0.1)'};
  border: none;
  border-radius: 5px;
  color: ${props => props.ready ? '#000' : '#fff'};
  cursor: ${props => props.ready ? 'pointer' : 'not-allowed'};
  position: relative;
  overflow: hidden;

  &:hover {
    transform: ${props => props.ready ? 'translateY(-2px)' : 'none'};
  }
`;

const CooldownOverlay = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
`;

const ComboBar = styled.div`
  width: 100%;
  height: 4px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 2px;
  margin-top: 0.5rem;
  overflow: hidden;
`;

const ComboFill = styled(motion.div)`
  width: ${props => props.percentage}%;
  height: 100%;
  background: #ffd700;
  transition: width 0.3s ease;
`;

const CombatInterface = ({ 
  health,
  maxHealth,
  statusEffects,
  skills,
  comboProgress,
  onSkillUse
}) => {
  return (
    <CombatContainer>
      <StatusBar>
        <div>
          <div>Salud: {health}/{maxHealth}</div>
          <HealthBar>
            <HealthFill 
              percentage={(health / maxHealth) * 100}
              initial={{ width: 0 }}
              animate={{ width: `${(health / maxHealth) * 100}%` }}
            />
          </HealthBar>
        </div>
      </StatusBar>

      <StatusEffects>
        {statusEffects.map((effect, index) => (
          <StatusEffect
            key={index}
            className={effect.type}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
          >
            {effect.type === 'positive' ? <FaFire /> : <FaSkull />}
            <span>{effect.name}</span>
            <span>{effect.duration}s</span>
          </StatusEffect>
        ))}
      </StatusEffects>

      <SkillsContainer>
        {skills.map((skill, index) => (
          <SkillButton
            key={index}
            ready={!skill.cooldown}
            onClick={() => !skill.cooldown && onSkillUse(skill.id)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {skill.icon === 'fire' ? <FaFire /> : 
             skill.icon === 'shield' ? <FaShieldAlt /> : 
             <FaBolt />}
            <span>{skill.name}</span>
            {skill.cooldown > 0 && (
              <CooldownOverlay>
                {skill.cooldown}s
              </CooldownOverlay>
            )}
          </SkillButton>
        ))}
      </SkillsContainer>

      <ComboBar>
        <ComboFill 
          percentage={comboProgress}
          initial={{ width: 0 }}
          animate={{ width: `${comboProgress}%` }}
        />
      </ComboBar>
    </CombatContainer>
  );
};

export default CombatInterface; 