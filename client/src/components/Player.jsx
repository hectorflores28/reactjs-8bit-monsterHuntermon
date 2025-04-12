import React, { useState, useEffect } from 'react';
import Sprite from './Sprite';
import '../styles/Player.css';

const Player = ({ position, onMove }) => {
  const [direction, setDirection] = useState('right');
  const [isMoving, setIsMoving] = useState(false);
  const [currentAnimation, setCurrentAnimation] = useState('idle');

  useEffect(() => {
    const handleKeyDown = (e) => {
      switch(e.key.toLowerCase()) {
        case 'w':
        case 'a':
        case 's':
        case 'd':
          setIsMoving(true);
          setCurrentAnimation('walk');
          if (e.key.toLowerCase() === 'a') {
            setDirection('left');
          } else if (e.key.toLowerCase() === 'd') {
            setDirection('right');
          }
          break;
      }
    };

    const handleKeyUp = (e) => {
      switch(e.key.toLowerCase()) {
        case 'w':
        case 'a':
        case 's':
        case 'd':
          setIsMoving(false);
          setCurrentAnimation('idle');
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  return (
    <div 
      className="player-container"
      style={{
        position: 'absolute',
        left: `${position.x}px`,
        top: `${position.y}px`,
        transform: `scaleX(${direction === 'right' ? 1 : -1})`
      }}
    >
      <Sprite
        src={`/assets/sprites/player/${currentAnimation}.png`}
        width={64}
        height={64}
        frames={4}
        frameWidth={64}
        frameHeight={64}
        animationSpeed={isMoving ? 100 : 200}
        isPlaying={true}
        direction={direction}
      />
    </div>
  );
};

export default Player; 