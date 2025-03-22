import React, { useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import useCharacterStore from '../stores/characterStore';

const CustomizationContainer = styled(motion.div)`
  padding: 2rem;
  background: rgba(0, 0, 0, 0.8);
  border-radius: 10px;
  color: #fff;
`;

const Section = styled.div`
  margin-bottom: 2rem;
`;

const SectionTitle = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: #ffd700;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1rem;
`;

const OptionCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.1);
  padding: 1rem;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.2);
    transform: translateY(-2px);
  }

  &.selected {
    background: rgba(255, 215, 0, 0.2);
    border: 2px solid #ffd700;
  }
`;

const StatBar = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 0.5rem;
`;

const StatLabel = styled.span`
  width: 100px;
`;

const StatValue = styled.span`
  margin-left: 1rem;
`;

const StatButton = styled.button`
  background: #ffd700;
  border: none;
  padding: 0.25rem 0.5rem;
  border-radius: 3px;
  cursor: pointer;
  margin-left: 0.5rem;

  &:disabled {
    background: #666;
    cursor: not-allowed;
  }
`;

const CharacterCustomization = () => {
  const { character, loading, error, updateAppearance, updateStats, loadCharacter } = useCharacterStore();

  useEffect(() => {
    loadCharacter();
  }, [loadCharacter]);

  const handleAppearanceChange = (type, value) => {
    updateAppearance({
      ...character.appearance,
      [type]: value
    });
  };

  const handleStatChange = (stat, increment) => {
    if (character.stats.availablePoints <= 0 && increment) return;
    
    const newStats = {
      ...character.stats,
      [stat]: character.stats[stat] + (increment ? 1 : -1),
      availablePoints: character.stats.availablePoints + (increment ? -1 : 1)
    };

    updateStats(newStats);
  };

  if (loading) return <div>Cargando...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <CustomizationContainer
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Section>
        <SectionTitle>Apariencia</SectionTitle>
        <Grid>
          {Object.entries(character.appearance).map(([type, value]) => (
            <OptionCard
              key={type}
              className={value === character.appearance[type] ? 'selected' : ''}
              onClick={() => handleAppearanceChange(type, value)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <h3>{type.charAt(0).toUpperCase() + type.slice(1)}</h3>
              <p>{value}</p>
            </OptionCard>
          ))}
        </Grid>
      </Section>

      <Section>
        <SectionTitle>Estadísticas</SectionTitle>
        <p>Puntos disponibles: {character.stats.availablePoints}</p>
        {Object.entries(character.stats)
          .filter(([key]) => key !== 'availablePoints')
          .map(([stat, value]) => (
            <StatBar key={stat}>
              <StatLabel>{stat.charAt(0).toUpperCase() + stat.slice(1)}</StatLabel>
              <StatValue>{value}</StatValue>
              <StatButton
                onClick={() => handleStatChange(stat, true)}
                disabled={character.stats.availablePoints <= 0}
              >
                +
              </StatButton>
              <StatButton
                onClick={() => handleStatChange(stat, false)}
                disabled={value <= 1}
              >
                -
              </StatButton>
            </StatBar>
          ))}
      </Section>
    </CustomizationContainer>
  );
};

export default CharacterCustomization; 