import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const SceneContainer = styled.div`
  width: 100vw;
  height: 100vh;
  background: url('/assets/home-scene.png') no-repeat center center;
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
  left: 50%;
  transform: translateX(-50%);
  transition: all 0.3s ease;
`;

const DialogBox = styled.div`
  position: absolute;
  bottom: 10%;
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

const Monster = styled.div`
  position: absolute;
  width: 128px;
  height: 128px;
  background: url('/assets/monster-sprite.png') no-repeat;
  background-size: contain;
  bottom: 20%;
  right: -128px;
  transform: ${props => props.attacking ? 'translateX(-200px)' : 'translateX(0)'};
  transition: transform 1s ease;
`;

const HomeScene = ({ gameState }) => {
  const [showDialog, setShowDialog] = useState(false);
  const [monsterAttacking, setMonsterAttacking] = useState(false);
  const [currentDialog, setCurrentDialog] = useState(0);
  const navigate = useNavigate();

  const dialogs = [
    "¡Bienvenido a tu nuevo hogar!",
    "Este será tu refugio entre cacerías...",
    "¡OH NO! ¡UN MONSTRUO ESTÁ ATACANDO LA ALDEA!",
    "¡RÁPIDO! ¡ESCOGE UN ARMA Y DEFIÉNDETE!"
  ];

  useEffect(() => {
    // Mostrar el primer diálogo después de 2 segundos
    const timer1 = setTimeout(() => {
      setShowDialog(true);
    }, 2000);

    // Mostrar el monstruo atacando después de 8 segundos
    const timer2 = setTimeout(() => {
      setMonsterAttacking(true);
      setCurrentDialog(2);
    }, 8000);

    // Navegar a la selección de armas después de 12 segundos
    const timer3 = setTimeout(() => {
      setCurrentDialog(3);
      setTimeout(() => {
        navigate('/weapon-selection');
      }, 3000);
    }, 12000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, [navigate]);

  return (
    <SceneContainer>
      <Character />
      <Monster attacking={monsterAttacking} />
      <DialogBox show={showDialog}>
        {dialogs[currentDialog]}
      </DialogBox>
    </SceneContainer>
  );
};

export default HomeScene; 