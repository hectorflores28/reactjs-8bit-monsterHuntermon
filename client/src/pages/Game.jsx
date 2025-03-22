import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useGameStore } from '../stores/gameStore';
import GameMap from '../components/game/GameMap';
import CombatInterface from '../components/game/CombatInterface';
import CharacterProfile from '../components/game/CharacterProfile';
import Inventory from '../components/game/Inventory';

const GameContainer = styled.div`
  width: 100%;
  height: calc(100vh - 64px);
  position: relative;
  overflow: hidden;
`;

const Game = () => {
  const { loadGame, saveGame } = useGameStore();

  // Cargar el juego al iniciar
  useEffect(() => {
    loadGame();
  }, [loadGame]);

  // Guardar el juego cada 5 minutos
  useEffect(() => {
    const saveInterval = setInterval(() => {
      saveGame();
    }, 5 * 60 * 1000);

    return () => clearInterval(saveInterval);
  }, [saveGame]);

  return (
    <GameContainer>
      <GameMap />
      <CharacterProfile />
      <Inventory />
      <CombatInterface />
    </GameContainer>
  );
};

export default Game; 