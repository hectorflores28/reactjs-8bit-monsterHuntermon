import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { QUEST_STATUS } from '../../config/questConfig';

const DetailsContainer = styled(motion.div)`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 90%;
  max-width: 600px;
  background-color: rgba(0, 0, 0, 0.95);
  border-radius: 10px;
  padding: 20px;
  color: white;
  z-index: 1200;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding-bottom: 10px;
  border-bottom: 2px solid #333;
`;

const Title = styled.h2`
  font-family: 'Press Start 2P', monospace;
  font-size: 18px;
  color: #44ff44;
  margin: 0;
`;

const Status = styled.div`
  padding: 5px 10px;
  border-radius: 5px;
  font-size: 12px;
  background-color: ${props => {
    switch (props.status) {
      case QUEST_STATUS.COMPLETED: return '#44ff44';
      case QUEST_STATUS.IN_PROGRESS: return '#ffff44';
      case QUEST_STATUS.FAILED: return '#ff4444';
      default: return '#666';
    }
  }};
  color: ${props => props.status === QUEST_STATUS.IN_PROGRESS ? '#000' : '#fff'};
`;

const Description = styled.p`
  font-size: 14px;
  line-height: 1.6;
  margin-bottom: 20px;
  color: #aaa;
`;

const Section = styled.div`
  margin-bottom: 20px;
`;

const SectionTitle = styled.h3`
  font-family: 'Press Start 2P', monospace;
  font-size: 14px;
  color: #ffff44;
  margin: 0 0 10px 0;
`;

const ObjectiveList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const ObjectiveItem = styled.li`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px;
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 5px;
  margin-bottom: 5px;

  &:last-child {
    margin-bottom: 0;
  }
`;

const ObjectiveIcon = styled.div`
  width: 24px;
  height: 24px;
  background-color: ${props => props.completed ? '#44ff44' : '#666'};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
`;

const ObjectiveInfo = styled.div`
  flex: 1;
`;

const ObjectiveTitle = styled.div`
  font-size: 14px;
  color: ${props => props.completed ? '#44ff44' : '#fff'};
`;

const ObjectiveProgress = styled.div`
  font-size: 12px;
  color: #aaa;
  margin-top: 5px;
`;

const RewardsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  gap: 10px;
`;

const RewardCard = styled.div`
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 5px;
  padding: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
`;

const RewardIcon = styled.div`
  width: 32px;
  height: 32px;
  background-image: url(${props => props.icon});
  background-size: cover;
`;

const RewardValue = styled.div`
  font-size: 12px;
  color: #ffff44;
`;

const ButtonsContainer = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 20px;
`;

const Button = styled.button`
  flex: 1;
  padding: 10px;
  border: none;
  border-radius: 5px;
  font-family: 'Press Start 2P', monospace;
  font-size: 12px;
  cursor: pointer;
  transition: all 0.3s ease;

  &.primary {
    background-color: #44ff44;
    color: #000;

    &:hover {
      background-color: #33dd33;
    }
  }

  &.secondary {
    background-color: #444;
    color: #fff;

    &:hover {
      background-color: #555;
    }
  }

  &:disabled {
    background-color: #666;
    cursor: not-allowed;
  }
`;

const QuestDetails = ({ quest, onAccept, onAbandon, onClose }) => {
  const canAccept = quest.status === QUEST_STATUS.NOT_STARTED;
  const canAbandon = quest.status === QUEST_STATUS.IN_PROGRESS;

  return (
    <DetailsContainer
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
    >
      <Header>
        <Title>{quest.title}</Title>
        <Status status={quest.status}>
          {quest.status.replace('_', ' ').toUpperCase()}
        </Status>
      </Header>

      <Description>{quest.description}</Description>

      <Section>
        <SectionTitle>Objetivos</SectionTitle>
        <ObjectiveList>
          {quest.objectives.map(objective => (
            <ObjectiveItem key={objective.id}>
              <ObjectiveIcon completed={objective.completed}>
                {objective.completed ? '✓' : '•'}
              </ObjectiveIcon>
              <ObjectiveInfo>
                <ObjectiveTitle completed={objective.completed}>
                  {objective.description}
                </ObjectiveTitle>
                {objective.count > 1 && (
                  <ObjectiveProgress>
                    Progreso: {objective.progress} / {objective.count}
                  </ObjectiveProgress>
                )}
              </ObjectiveInfo>
            </ObjectiveItem>
          ))}
        </ObjectiveList>
      </Section>

      <Section>
        <SectionTitle>Recompensas</SectionTitle>
        <RewardsGrid>
          {quest.reward.experience && (
            <RewardCard>
              <RewardIcon icon="/assets/icons/experience.png" />
              <RewardValue>{quest.reward.experience} EXP</RewardValue>
            </RewardCard>
          )}
          {quest.reward.gold && (
            <RewardCard>
              <RewardIcon icon="/assets/icons/gold.png" />
              <RewardValue>{quest.reward.gold} Gold</RewardValue>
            </RewardCard>
          )}
          {quest.reward.items?.map((item, index) => (
            <RewardCard key={index}>
              <RewardIcon icon={`/assets/icons/items/${item}.png`} />
              <RewardValue>{item.replace('_', ' ')}</RewardValue>
            </RewardCard>
          ))}
        </RewardsGrid>
      </Section>

      <ButtonsContainer>
        {canAccept && (
          <Button
            className="primary"
            onClick={onAccept}
          >
            Aceptar Misión
          </Button>
        )}
        {canAbandon && (
          <Button
            className="secondary"
            onClick={onAbandon}
          >
            Abandonar Misión
          </Button>
        )}
        <Button
          className="secondary"
          onClick={onClose}
        >
          Cerrar
        </Button>
      </ButtonsContainer>
    </DetailsContainer>
  );
};

export default QuestDetails; 