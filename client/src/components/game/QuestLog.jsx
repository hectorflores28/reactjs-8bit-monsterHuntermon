import React, { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { QUEST_TYPES, QUEST_STATUS } from '../../config/questConfig';

const QuestLogContainer = styled(motion.div)`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 80%;
  max-width: 800px;
  height: 80vh;
  background-color: rgba(0, 0, 0, 0.9);
  border-radius: 10px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  z-index: 1100;
`;

const QuestTabs = styled.div`
  display: flex;
  gap: 10px;
  border-bottom: 2px solid #333;
  padding-bottom: 10px;
`;

const TabButton = styled.button`
  background-color: ${props => props.active ? '#44ff44' : '#444'};
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  font-family: 'Press Start 2P', monospace;
  font-size: 12px;
  transition: all 0.3s ease;

  &:hover {
    background-color: ${props => props.active ? '#44ff44' : '#555'};
  }
`;

const QuestList = styled.div`
  flex: 1;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding-right: 10px;

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: #222;
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb {
    background: #444;
    border-radius: 4px;
  }
`;

const QuestCard = styled(motion.div)`
  background-color: #222;
  border-radius: 5px;
  padding: 15px;
  cursor: pointer;
  border-left: 4px solid ${props => {
    switch (props.status) {
      case QUEST_STATUS.COMPLETED: return '#44ff44';
      case QUEST_STATUS.IN_PROGRESS: return '#ffff44';
      case QUEST_STATUS.FAILED: return '#ff4444';
      default: return '#666';
    }
  }};
`;

const QuestTitle = styled.h3`
  color: white;
  font-family: 'Press Start 2P', monospace;
  font-size: 14px;
  margin: 0 0 10px 0;
`;

const QuestDescription = styled.p`
  color: #aaa;
  font-size: 12px;
  margin: 0 0 10px 0;
`;

const ObjectivesList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const Objective = styled.li`
  color: ${props => props.completed ? '#44ff44' : '#fff'};
  font-size: 12px;
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 5px;
`;

const ProgressBar = styled.div`
  width: 100%;
  height: 4px;
  background-color: #333;
  border-radius: 2px;
  overflow: hidden;
  margin-top: 10px;
`;

const Progress = styled.div`
  width: ${props => props.progress}%;
  height: 100%;
  background-color: #44ff44;
  transition: width 0.3s ease;
`;

const RewardsList = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 10px;
`;

const RewardItem = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  color: #ffff44;
  font-size: 12px;
`;

const QuestLog = ({ quests, onQuestSelect, onClose }) => {
  const [activeTab, setActiveTab] = useState(QUEST_TYPES.MAIN);

  const filteredQuests = quests.filter(quest => quest.type === activeTab);

  return (
    <QuestLogContainer
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
    >
      <QuestTabs>
        {Object.values(QUEST_TYPES).map(type => (
          <TabButton
            key={type}
            active={activeTab === type}
            onClick={() => setActiveTab(type)}
          >
            {type.charAt(0).toUpperCase() + type.slice(1)} Quests
          </TabButton>
        ))}
      </QuestTabs>

      <QuestList>
        <AnimatePresence>
          {filteredQuests.map(quest => (
            <QuestCard
              key={quest.id}
              status={quest.status}
              onClick={() => onQuestSelect(quest)}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <QuestTitle>{quest.title}</QuestTitle>
              <QuestDescription>{quest.description}</QuestDescription>
              
              <ObjectivesList>
                {quest.objectives.map(objective => (
                  <Objective
                    key={objective.id}
                    completed={objective.completed}
                  >
                    <span>✦</span>
                    {objective.description}
                    {objective.count > 1 && (
                      <span>({objective.progress}/{objective.count})</span>
                    )}
                  </Objective>
                ))}
              </ObjectivesList>

              <ProgressBar>
                <Progress
                  progress={
                    (quest.objectives.filter(obj => obj.completed).length /
                    quest.objectives.length) * 100
                  }
                />
              </ProgressBar>

              <RewardsList>
                {quest.reward && (
                  <>
                    {quest.reward.experience && (
                      <RewardItem>
                        <span>✧</span>
                        {quest.reward.experience} EXP
                      </RewardItem>
                    )}
                    {quest.reward.gold && (
                      <RewardItem>
                        <span>✧</span>
                        {quest.reward.gold} Gold
                      </RewardItem>
                    )}
                  </>
                )}
              </RewardsList>
            </QuestCard>
          ))}
        </AnimatePresence>
      </QuestList>
    </QuestLogContainer>
  );
};

export default QuestLog; 