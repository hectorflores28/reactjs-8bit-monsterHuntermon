import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useGameStore } from '../stores/gameStore';
import CharacterProfile from '../components/game/CharacterProfile';

const GameContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  background-color: ${props => props.theme.colors.background};
  color: ${props => props.theme.colors.text};
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ActionButtons = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  width: 100%;
  max-width: 800px;
  margin-top: 20px;
`;

const ActionButton = styled.button`
  padding: 20px;
  font-size: 1rem;
  background-color: ${props => props.theme.colors.primary};
  color: ${props => props.theme.colors.text};
  border: none;
  border-radius: 10px;
  cursor: pointer;
  font-family: 'Press Start 2P', cursive;
  transition: all 0.3s ease;

  &:hover {
    background-color: ${props => props.theme.colors.secondary};
    transform: translateY(-2px);
  }
`;

const Game = () => {
  const { jugador } = useGameStore();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (!jugador) {
      navigate('/');
    }
  }, [jugador, navigate]);

  if (!jugador) return null;

  return (
    <GameContainer>
      <CharacterProfile />
      
      <ActionButtons>
        <ActionButton>Cazar Monstruos</ActionButton>
        <ActionButton>Tienda</ActionButton>
        <ActionButton>Inventario</ActionButton>
        <ActionButton>Descansar</ActionButton>
      </ActionButtons>
    </GameContainer>
  );
};

export default Game; 