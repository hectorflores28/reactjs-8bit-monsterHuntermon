import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useMonsters } from '../context/MonsterContext';

const MonsterContainer = styled.div`
  background: rgba(0, 0, 0, 0.8);
  border: 2px solid #fff;
  padding: 20px;
  margin: 20px;
  font-family: 'Press Start 2P', cursive;
  color: #fff;
`;

const MonsterTitle = styled.h2`
  font-size: 16px;
  margin-bottom: 20px;
  text-align: center;
  text-transform: uppercase;
  color: #ff0;
`;

const MonsterList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
`;

const MonsterItem = styled(motion.li)`
  background: rgba(0, 0, 0, 0.5);
  border: 1px solid #fff;
  padding: 10px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.1);
    transform: scale(1.02);
  }
`;

const MonsterSprite = styled.div`
  width: 100%;
  height: 100px;
  background: #333;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid #fff;
`;

const MonsterName = styled.h3`
  font-size: 12px;
  margin-bottom: 5px;
  text-align: center;
`;

const MonsterType = styled.span`
  font-size: 10px;
  color: #888;
  display: block;
  text-align: center;
`;

const MonsterStats = styled.div`
  margin-top: 10px;
  font-size: 10px;
`;

const StatBar = styled.div`
  height: 10px;
  background: #333;
  border: 1px solid #fff;
  margin-bottom: 5px;
  position: relative;
`;

const StatFill = styled(motion.div)`
  height: 100%;
  background: ${props => {
    switch (props.type) {
      case 'hp':
        return '#ff0000';
      case 'attack':
        return '#ff0';
      case 'defense':
        return '#00ff00';
      default:
        return '#fff';
    }
  }};
`;

const MonsterDetails = styled.div`
  margin-top: 20px;
  padding: 10px;
  background: rgba(0, 0, 0, 0.5);
  border: 1px solid #fff;
`;

const AttackList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 10px 0;
`;

const AttackItem = styled.li`
  font-size: 10px;
  margin-bottom: 5px;
  padding: 5px;
  background: rgba(0, 0, 0, 0.3);
  border: 1px solid #fff;
`;

const WeaknessList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 10px 0;
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
`;

const WeaknessItem = styled.li`
  font-size: 10px;
  padding: 5px;
  background: rgba(255, 0, 0, 0.3);
  border: 1px solid #ff0;
`;

const RewardList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 10px 0;
`;

const RewardItem = styled.li`
  font-size: 10px;
  margin-bottom: 5px;
  padding: 5px;
  background: rgba(255, 255, 0, 0.1);
  border: 1px solid #ff0;
`;

export const MonsterListComponent = () => {
  const {
    monsters,
    selectedMonster,
    monsterDetails,
    attackPatterns,
    weaknesses,
    rewards,
    loading,
    error,
    selectMonster
  } = useMonsters();

  if (loading) {
    return <MonsterContainer>Cargando monstruos...</MonsterContainer>;
  }

  if (error) {
    return <MonsterContainer>Error: {error}</MonsterContainer>;
  }

  return (
    <MonsterContainer>
      <MonsterTitle>Monstruos Disponibles</MonsterTitle>
      <MonsterList>
        {monsters.map((monster) => (
          <MonsterItem
            key={monster.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => selectMonster(monster.id)}
          >
            <MonsterSprite>
              {/* Aquí iría el sprite del monstruo */}
              {monster.name}
            </MonsterSprite>
            <MonsterName>{monster.name}</MonsterName>
            <MonsterType>{monster.type}</MonsterType>
            <MonsterStats>
              <div>HP</div>
              <StatBar>
                <StatFill
                  type="hp"
                  initial={{ width: 0 }}
                  animate={{ width: `${monster.hp}%` }}
                  transition={{ duration: 0.5 }}
                />
              </StatBar>
              <div>Ataque</div>
              <StatBar>
                <StatFill
                  type="attack"
                  initial={{ width: 0 }}
                  animate={{ width: `${monster.attack}%` }}
                  transition={{ duration: 0.5 }}
                />
              </StatBar>
              <div>Defensa</div>
              <StatBar>
                <StatFill
                  type="defense"
                  initial={{ width: 0 }}
                  animate={{ width: `${monster.defense}%` }}
                  transition={{ duration: 0.5 }}
                />
              </StatBar>
            </MonsterStats>
          </MonsterItem>
        ))}
      </MonsterList>

      {selectedMonster && monsterDetails && (
        <MonsterDetails>
          <MonsterTitle>{monsterDetails.name}</MonsterTitle>
          <AttackList>
            <h4>Patrones de Ataque:</h4>
            {attackPatterns.map((attack, index) => (
              <AttackItem key={index}>
                {attack.name} - {attack.description}
              </AttackItem>
            ))}
          </AttackList>
          <WeaknessList>
            <h4>Debilidades:</h4>
            {weaknesses.map((weakness, index) => (
              <WeaknessItem key={index}>{weakness}</WeaknessItem>
            ))}
          </WeaknessList>
          <RewardList>
            <h4>Recompensas:</h4>
            {rewards.map((reward, index) => (
              <RewardItem key={index}>
                {reward.name} - {reward.chance}%
              </RewardItem>
            ))}
          </RewardList>
        </MonsterDetails>
      )}
    </MonsterContainer>
  );
}; 