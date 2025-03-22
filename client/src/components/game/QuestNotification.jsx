import React from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';

const NotificationContainer = styled(motion.div)`
  position: fixed;
  top: 20px;
  right: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  z-index: 1300;
`;

const NotificationCard = styled(motion.div)`
  background-color: rgba(0, 0, 0, 0.9);
  border-radius: 5px;
  padding: 15px;
  width: 300px;
  border-left: 4px solid #44ff44;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
`;

const NotificationHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 10px;
`;

const QuestIcon = styled.div`
  width: 24px;
  height: 24px;
  background-image: url(${props => props.icon});
  background-size: cover;
`;

const QuestTitle = styled.div`
  color: #44ff44;
  font-family: 'Press Start 2P', monospace;
  font-size: 12px;
`;

const ProgressText = styled.div`
  color: white;
  font-size: 12px;
  margin-bottom: 8px;
`;

const ProgressBar = styled.div`
  width: 100%;
  height: 4px;
  background-color: #333;
  border-radius: 2px;
  overflow: hidden;
`;

const Progress = styled(motion.div)`
  height: 100%;
  background-color: #44ff44;
  width: ${props => props.progress}%;
`;

const CompletionMessage = styled.div`
  color: #ffff44;
  font-size: 12px;
  margin-top: 8px;
  text-align: center;
`;

const QuestNotification = ({ notifications, onNotificationComplete }) => {
  return (
    <NotificationContainer>
      <AnimatePresence>
        {notifications.map(notification => (
          <NotificationCard
            key={notification.id}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
            onAnimationComplete={() => {
              if (notification.duration) {
                setTimeout(() => {
                  onNotificationComplete(notification.id);
                }, notification.duration);
              }
            }}
          >
            <NotificationHeader>
              <QuestIcon icon={`/assets/icons/quests/${notification.type.toLowerCase()}.png`} />
              <QuestTitle>{notification.questTitle}</QuestTitle>
            </NotificationHeader>

            <ProgressText>
              {notification.objectiveDescription}
            </ProgressText>

            {notification.showProgress && (
              <ProgressBar>
                <Progress
                  progress={(notification.currentProgress / notification.totalProgress) * 100}
                  initial={{ width: 0 }}
                  animate={{ width: `${(notification.currentProgress / notification.totalProgress) * 100}%` }}
                  transition={{ duration: 0.5 }}
                />
              </ProgressBar>
            )}

            {notification.isCompleted && (
              <CompletionMessage>
                ¡Objetivo Completado!
              </CompletionMessage>
            )}
          </NotificationCard>
        ))}
      </AnimatePresence>
    </NotificationContainer>
  );
};

export default QuestNotification; 