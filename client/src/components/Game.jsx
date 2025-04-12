import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Player from './Player';
import '../styles/Game.css';

const Game = () => {
  const navigate = useNavigate();
  const [gameState, setGameState] = useState({
    health: 100,
    stamina: 100,
    weapon: null,
    inventory: [],
    currentMission: null
  });

  const [playerPosition, setPlayerPosition] = useState({ x: 400, y: 300 });
  const [keys, setKeys] = useState({});

  const moveSpeed = 5;

  useEffect(() => {
    const handleKeyDown = (e) => {
      setKeys(prev => ({ ...prev, [e.key.toLowerCase()]: true }));
    };

    const handleKeyUp = (e) => {
      setKeys(prev => ({ ...prev, [e.key.toLowerCase()]: false }));
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  useEffect(() => {
    const gameLoop = setInterval(() => {
      const newPosition = { ...playerPosition };

      if (keys['w']) newPosition.y -= moveSpeed;
      if (keys['s']) newPosition.y += moveSpeed;
      if (keys['a']) newPosition.x -= moveSpeed;
      if (keys['d']) newPosition.x += moveSpeed;

      // Límites del juego
      newPosition.x = Math.max(0, Math.min(800, newPosition.x));
      newPosition.y = Math.max(0, Math.min(600, newPosition.y));

      setPlayerPosition(newPosition);
    }, 16); // ~60 FPS

    return () => clearInterval(gameLoop);
  }, [keys, playerPosition]);

  return (
    <div className="game-container">
      {/* HUD del juego */}
      <div className="game-hud">
        <div className="health-bar">
          <div className="bar-fill" style={{ width: `${gameState.health}%` }} />
          <span>HP: {gameState.health}</span>
        </div>
        <div className="stamina-bar">
          <div className="bar-fill" style={{ width: `${gameState.stamina}%` }} />
          <span>ST: {gameState.stamina}</span>
        </div>
      </div>

      {/* Área de juego */}
      <div className="game-area">
        <Player position={playerPosition} />
      </div>

      {/* Menú de pausa */}
      <button 
        className="pause-button"
        onClick={() => navigate('/')}
      >
        PAUSA
      </button>
    </div>
  );
};

export default Game; 