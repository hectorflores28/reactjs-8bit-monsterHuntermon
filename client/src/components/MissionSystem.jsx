import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const MissionContainer = styled.div`
  position: fixed;
  top: 20px;
  left: 20px;
  background: rgba(0, 0, 0, 0.8);
  padding: 15px;
  border-radius: 10px;
  border: 2px solid #ffd700;
  font-family: 'Press Start 2P', cursive;
  color: white;
  z-index: 1000;
  max-width: 300px;
`;

const MissionList = styled.div`
  margin-top: 10px;
`;

const MissionItem = styled.div`
  margin-bottom: 10px;
  padding: 10px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 5px;
  border: 1px solid ${props => props.completed ? '#2ecc71' : '#666'};
`;

const MissionTitle = styled.div`
  font-size: 12px;
  margin-bottom: 5px;
  color: ${props => props.completed ? '#2ecc71' : 'white'};
`;

const MissionProgress = styled.div`
  font-size: 10px;
  color: #ccc;
`;

const MissionReward = styled.div`
  font-size: 10px;
  color: #f1c40f;
  margin-top: 5px;
`;

const MissionSystem = () => {
  const [missions, setMissions] = useState({
    daily: [
      {
        id: 1,
        title: 'Cazar 3 monstruos',
        progress: 0,
        target: 3,
        reward: { exp: 100, items: ['potion'] },
        completed: false
      },
      {
        id: 2,
        title: 'Recolectar 5 materiales',
        progress: 0,
        target: 5,
        reward: { exp: 50, items: ['material'] },
        completed: false
      }
    ],
    main: [
      {
        id: 1,
        title: 'Derrotar al Gran Jagras',
        progress: 0,
        target: 1,
        reward: { exp: 500, items: ['weapon'] },
        completed: false
      }
    ]
  });

  useEffect(() => {
    // Cargar misiones guardadas
    const savedMissions = localStorage.getItem('missionData');
    if (savedMissions) {
      setMissions(JSON.parse(savedMissions));
    }
  }, []);

  useEffect(() => {
    // Guardar misiones cuando cambien
    localStorage.setItem('missionData', JSON.stringify(missions));
  }, [missions]);

  const updateMissionProgress = (missionId, type, amount = 1) => {
    setMissions(prev => ({
      ...prev,
      [type]: prev[type].map(mission => {
        if (mission.id === missionId) {
          const newProgress = mission.progress + amount;
          return {
            ...mission,
            progress: newProgress,
            completed: newProgress >= mission.target
          };
        }
        return mission;
      })
    }));
  };

  return (
    <MissionContainer>
      <h3>MISIONES</h3>
      <MissionList>
        <h4>Diarias</h4>
        {missions.daily.map(mission => (
          <MissionItem key={mission.id} completed={mission.completed}>
            <MissionTitle completed={mission.completed}>
              {mission.title}
            </MissionTitle>
            <MissionProgress>
              {mission.progress}/{mission.target}
            </MissionProgress>
            <MissionReward>
              Recompensa: {mission.reward.exp} EXP
            </MissionReward>
          </MissionItem>
        ))}
        <h4>Principales</h4>
        {missions.main.map(mission => (
          <MissionItem key={mission.id} completed={mission.completed}>
            <MissionTitle completed={mission.completed}>
              {mission.title}
            </MissionTitle>
            <MissionProgress>
              {mission.progress}/{mission.target}
            </MissionProgress>
            <MissionReward>
              Recompensa: {mission.reward.exp} EXP
            </MissionReward>
          </MissionItem>
        ))}
      </MissionList>
    </MissionContainer>
  );
};

export default MissionSystem; 