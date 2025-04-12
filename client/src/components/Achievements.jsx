import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const AchievementsContainer = styled.div`
  width: 100vw;
  height: 100vh;
  background: #000;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-family: 'Press Start 2P', cursive;
  color: white;
`;

const Title = styled.h1`
  color: #ffd700;
  text-align: center;
  margin-bottom: 2rem;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
`;

const AchievementsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
  width: 90%;
  max-width: 1000px;
  margin-bottom: 2rem;
`;

const AchievementCard = styled(motion.div)`
  background: rgba(0, 0, 0, 0.8);
  border: 2px solid ${props => props.unlocked ? '#ffd700' : '#4a4a4a'};
  border-radius: 10px;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  opacity: ${props => props.unlocked ? 1 : 0.6};
`;

const AchievementIcon = styled.div`
  width: 64px;
  height: 64px;
  background: ${props => props.unlocked ? '#ffd700' : '#4a4a4a'};
  border-radius: 50%;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
`;

const AchievementName = styled.h3`
  color: ${props => props.unlocked ? '#ffd700' : '#4a4a4a'};
  text-align: center;
  font-size: 0.8rem;
`;

const AchievementDescription = styled.p`
  color: #ccc;
  font-size: 0.6rem;
  text-align: center;
`;

const AchievementProgress = styled.div`
  width: 100%;
  height: 4px;
  background: #4a4a4a;
  border-radius: 2px;
  margin-top: 0.5rem;
`;

const ProgressBar = styled.div`
  height: 100%;
  background: #ffd700;
  border-radius: 2px;
  width: ${props => props.progress}%;
`;

const Button = styled(motion.button)`
  background: #ffd700;
  color: black;
  border: none;
  padding: 0.5rem 1rem;
  font-family: 'Press Start 2P', cursive;
  font-size: 0.8rem;
  cursor: pointer;
  border-radius: 5px;
  margin-top: 1rem;

  &:hover {
    background: #ffed4a;
  }
`;

const achievements = [
  {
    id: 1,
    name: 'PRIMERA CAZA',
    description: 'Completa tu primera cacería',
    icon: '🎯',
    unlocked: true,
    progress: 100
  },
  {
    id: 2,
    name: 'MAESTRO CAZADOR',
    description: 'Derrota 50 monstruos',
    icon: '🏆',
    unlocked: false,
    progress: 30
  },
  {
    id: 3,
    name: 'COLECCIONISTA',
    description: 'Recolecta 100 materiales',
    icon: '📦',
    unlocked: false,
    progress: 45
  },
  {
    id: 4,
    name: 'ARTESANO',
    description: 'Crea 20 objetos',
    icon: '🔨',
    unlocked: false,
    progress: 15
  },
  {
    id: 5,
    name: 'EXPLORADOR',
    description: 'Visita todas las zonas',
    icon: '🗺️',
    unlocked: false,
    progress: 60
  },
  {
    id: 6,
    name: 'SOCIAL',
    description: 'Completa 10 misiones en grupo',
    icon: '👥',
    unlocked: false,
    progress: 0
  }
];

const Achievements = () => {
  const navigate = useNavigate();
  const [achievementsList, setAchievementsList] = useState(achievements);

  useEffect(() => {
    // Aquí se cargarían los logros del jugador desde el almacenamiento local
    const savedAchievements = localStorage.getItem('achievements');
    if (savedAchievements) {
      setAchievementsList(JSON.parse(savedAchievements));
    }
  }, []);

  return (
    <AchievementsContainer>
      <Title>LOGROS</Title>
      <AchievementsGrid>
        {achievementsList.map(achievement => (
          <AchievementCard
            key={achievement.id}
            unlocked={achievement.unlocked}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <AchievementIcon unlocked={achievement.unlocked}>
              {achievement.icon}
            </AchievementIcon>
            <AchievementName unlocked={achievement.unlocked}>
              {achievement.name}
            </AchievementName>
            <AchievementDescription>
              {achievement.description}
            </AchievementDescription>
            {!achievement.unlocked && (
              <AchievementProgress>
                <ProgressBar progress={achievement.progress} />
              </AchievementProgress>
            )}
          </AchievementCard>
        ))}
      </AchievementsGrid>
      <Button
        onClick={() => navigate('/')}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        VOLVER
      </Button>
    </AchievementsContainer>
  );
};

export default Achievements; 