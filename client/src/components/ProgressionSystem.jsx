import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const ProgressionContainer = styled.div`
  position: fixed;
  top: 20px;
  right: 20px;
  background: rgba(0, 0, 0, 0.8);
  padding: 15px;
  border-radius: 10px;
  border: 2px solid #ffd700;
  font-family: 'Press Start 2P', cursive;
  color: white;
  z-index: 1000;
`;

const LevelBar = styled.div`
  width: 200px;
  height: 20px;
  background: #333;
  border: 2px solid #666;
  margin: 10px 0;
  position: relative;
`;

const LevelFill = styled.div`
  height: 100%;
  background: linear-gradient(to right, #4CAF50, #8BC34A);
  transition: width 0.3s ease;
`;

const StatsContainer = styled.div`
  margin-top: 15px;
  font-size: 12px;
`;

const StatRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 5px 0;
`;

const ProgressionSystem = () => {
  const [level, setLevel] = useState(1);
  const [experience, setExperience] = useState(0);
  const [nextLevelExp, setNextLevelExp] = useState(100);
  const [stats, setStats] = useState({
    attack: 10,
    defense: 10,
    stamina: 100,
    health: 100
  });

  const calculateNextLevelExp = (currentLevel) => {
    return Math.floor(100 * Math.pow(1.5, currentLevel - 1));
  };

  const addExperience = (amount) => {
    setExperience(prevExp => {
      const newExp = prevExp + amount;
      if (newExp >= nextLevelExp) {
        levelUp();
        return newExp - nextLevelExp;
      }
      return newExp;
    });
  };

  const levelUp = () => {
    setLevel(prevLevel => {
      const newLevel = prevLevel + 1;
      setNextLevelExp(calculateNextLevelExp(newLevel));
      updateStats(newLevel);
      return newLevel;
    });
  };

  const updateStats = (newLevel) => {
    setStats(prevStats => ({
      attack: prevStats.attack + Math.floor(newLevel * 1.5),
      defense: prevStats.defense + Math.floor(newLevel * 1.2),
      stamina: prevStats.stamina + Math.floor(newLevel * 5),
      health: prevStats.health + Math.floor(newLevel * 10)
    }));
  };

  useEffect(() => {
    // Cargar datos guardados al iniciar
    const savedData = localStorage.getItem('progressionData');
    if (savedData) {
      const { level, experience, stats } = JSON.parse(savedData);
      setLevel(level);
      setExperience(experience);
      setNextLevelExp(calculateNextLevelExp(level));
      setStats(stats);
    }
  }, []);

  useEffect(() => {
    // Guardar datos cuando cambien
    const progressionData = {
      level,
      experience,
      stats
    };
    localStorage.setItem('progressionData', JSON.stringify(progressionData));
  }, [level, experience, stats]);

  return (
    <ProgressionContainer>
      <div>Nivel: {level}</div>
      <LevelBar>
        <LevelFill style={{ width: `${(experience / nextLevelExp) * 100}%` }} />
      </LevelBar>
      <div>EXP: {experience}/{nextLevelExp}</div>
      <StatsContainer>
        <StatRow>
          <span>Ataque:</span>
          <span>{stats.attack}</span>
        </StatRow>
        <StatRow>
          <span>Defensa:</span>
          <span>{stats.defense}</span>
        </StatRow>
        <StatRow>
          <span>Stamina:</span>
          <span>{stats.stamina}</span>
        </StatRow>
        <StatRow>
          <span>Vida:</span>
          <span>{stats.health}</span>
        </StatRow>
      </StatsContainer>
    </ProgressionContainer>
  );
};

export default ProgressionSystem; 