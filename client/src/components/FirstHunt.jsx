import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const HuntContainer = styled.div`
  width: 100vw;
  height: 100vh;
  background: url('/assets/hunt-background.png') no-repeat center center;
  background-size: cover;
  position: relative;
  overflow: hidden;
`;

const Character = styled.div`
  position: absolute;
  width: 64px;
  height: 64px;
  background: url('/assets/character-sprite.png') no-repeat;
  background-size: contain;
  bottom: 20%;
  left: 20%;
  transition: all 0.3s ease;
`;

const Monster = styled.div`
  position: absolute;
  width: 128px;
  height: 128px;
  background: url('/assets/monster-sprite.png') no-repeat;
  background-size: contain;
  bottom: 20%;
  right: 20%;
  transform: ${props => props.attacking ? 'translateX(-50px)' : 'none'};
  transition: transform 0.5s ease;
`;

const HealthBar = styled.div`
  position: absolute;
  width: 200px;
  height: 20px;
  background-color: rgba(0, 0, 0, 0.5);
  border: 2px solid white;
  border-radius: 5px;
  top: 10px;
  left: 10px;
  
  &::before {
    content: '';
    position: absolute;
    width: ${props => props.health}%;
    height: 100%;
    background-color: ${props => props.health > 50 ? '#4CAF50' : props.health > 25 ? '#FFC107' : '#F44336'};
    border-radius: 3px;
    transition: width 0.3s ease;
  }
`;

const Controls = styled.div`
  position: absolute;
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 1rem;
`;

const Button = styled.button`
  padding: 0.5rem 1rem;
  font-family: 'Press Start 2P', cursive;
  font-size: 0.8rem;
  background-color: ${props => props.primary ? '#4CAF50' : '#333'};
  color: white;
  border: 2px solid white;
  border-radius: 5px;
  cursor: pointer;
  
  &:hover {
    background-color: ${props => props.primary ? '#45a049' : '#444'};
  }
`;

const DialogBox = styled.div`
  position: absolute;
  bottom: 20%;
  left: 50%;
  transform: translateX(-50%);
  width: 80%;
  max-width: 800px;
  background-color: rgba(0, 0, 0, 0.8);
  border: 4px solid #fff;
  border-radius: 10px;
  padding: 1rem;
  color: white;
  font-family: 'Press Start 2P', cursive;
  font-size: 0.8rem;
  line-height: 1.5;
  text-align: center;
  opacity: ${props => props.show ? 1 : 0};
  transition: opacity 0.5s ease;
`;

const FirstHunt = ({ gameState }) => {
  const [monsterHealth, setMonsterHealth] = useState(100);
  const [playerHealth, setPlayerHealth] = useState(100);
  const [monsterAttacking, setMonsterAttacking] = useState(false);
  const [showDialog, setShowDialog] = useState(true);
  const [currentDialog, setCurrentDialog] = useState(0);
  const navigate = useNavigate();

  const dialogs = [
    "¡El monstruo está atacando la aldea!",
    "Usa tu nueva arma para defenderte",
    "¡Cuidado con sus ataques!",
    "¡Buena suerte, cazador!"
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowDialog(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  const handleAttack = () => {
    if (monsterHealth > 0) {
      setMonsterHealth(prev => Math.max(0, prev - 10));
      setMonsterAttacking(true);
      
      setTimeout(() => {
        setMonsterAttacking(false);
        // El monstruo contraataca
        setPlayerHealth(prev => Math.max(0, prev - 5));
      }, 500);
    }
  };

  useEffect(() => {
    if (monsterHealth === 0) {
      setTimeout(() => {
        navigate('/menu');
      }, 2000);
    }
  }, [monsterHealth, navigate]);

  return (
    <HuntContainer>
      <HealthBar health={playerHealth} />
      <Character />
      <Monster attacking={monsterAttacking} />
      <DialogBox show={showDialog}>
        {dialogs[currentDialog]}
      </DialogBox>
      <Controls>
        <Button onClick={handleAttack} primary>
          Atacar
        </Button>
        <Button>
          Defender
        </Button>
        <Button>
          Especial
        </Button>
      </Controls>
    </HuntContainer>
  );
};

export default FirstHunt; 