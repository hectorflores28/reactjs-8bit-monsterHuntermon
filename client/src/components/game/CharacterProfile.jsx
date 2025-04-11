import React from 'react';
import styled from 'styled-components';
import { useGameStore } from '../../stores/gameStore';

const ProfileContainer = styled.div`
  background-color: ${props => props.theme.colors.surface};
  border: 2px solid ${props => props.theme.colors.primary};
  border-radius: 10px;
  padding: 20px;
  margin-bottom: 20px;
  width: 100%;
  max-width: 800px;
`;

const ProfileHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const PlayerName = styled.h2`
  color: ${props => props.theme.colors.primary};
  font-size: 1.5rem;
  margin: 0;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 15px;
`;

const StatBox = styled.div`
  background-color: ${props => props.theme.colors.background};
  padding: 10px;
  border-radius: 5px;
  text-align: center;
`;

const StatLabel = styled.div`
  font-size: 0.8rem;
  color: ${props => props.theme.colors.text};
  margin-bottom: 5px;
`;

const StatValue = styled.div`
  font-size: 1.2rem;
  color: ${props => props.theme.colors.primary};
  font-weight: bold;
`;

const ProgressBar = styled.div`
  width: 100%;
  height: 10px;
  background-color: ${props => props.theme.colors.background};
  border-radius: 5px;
  margin-top: 5px;
  overflow: hidden;
`;

const Progress = styled.div`
  width: ${props => props.value}%;
  height: 100%;
  background-color: ${props => props.color};
  transition: width 0.3s ease;
`;

const CharacterProfile = () => {
  const { jugador } = useGameStore();

  if (!jugador) return null;

  // Calcular el progreso de experiencia (ejemplo: nivel * 1000 para siguiente nivel)
  const experienciaParaSiguienteNivel = jugador.nivel * 1000;
  const progresoExperiencia = (jugador.experiencia / experienciaParaSiguienteNivel) * 100;

  return (
    <ProfileContainer>
      <ProfileHeader>
        <PlayerName>{jugador.nombre}</PlayerName>
        <div>Nivel {jugador.nivel}</div>
      </ProfileHeader>

      <StatsGrid>
        <StatBox>
          <StatLabel>Vida</StatLabel>
          <StatValue>{jugador.vida}/100</StatValue>
          <ProgressBar>
            <Progress value={jugador.vida} color="#ff4444"/>
          </ProgressBar>
        </StatBox>

        <StatBox>
          <StatLabel>Energía</StatLabel>
          <StatValue>{jugador.energia}/100</StatValue>
          <ProgressBar>
            <Progress value={jugador.energia} color="#44ff44"/>
          </ProgressBar>
        </StatBox>

        <StatBox>
          <StatLabel>Experiencia</StatLabel>
          <StatValue>{jugador.experiencia}/{experienciaParaSiguienteNivel}</StatValue>
          <ProgressBar>
            <Progress value={progresoExperiencia} color="#4444ff"/>
          </ProgressBar>
        </StatBox>

        <StatBox>
          <StatLabel>Oro</StatLabel>
          <StatValue>{jugador.oro}</StatValue>
        </StatBox>

        <StatBox>
          <StatLabel>Objetos</StatLabel>
          <StatValue>{jugador.inventario?.length || 0}</StatValue>
        </StatBox>

        <StatBox>
          <StatLabel>Cazas</StatLabel>
          <StatValue>0</StatValue>
        </StatBox>
      </StatsGrid>
    </ProfileContainer>
  );
};

export default CharacterProfile; 