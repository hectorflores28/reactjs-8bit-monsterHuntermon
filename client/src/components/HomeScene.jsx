import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';

const SceneContainer = styled.div`
  width: 100vw;
  height: 100vh;
  background: url('/assets/home-scene.png') no-repeat center center;
  background-size: cover;
  position: relative;
  overflow: hidden;
  font-family: 'Press Start 2P', cursive;
`;

const Character = styled(motion.div)`
  position: absolute;
  width: 64px;
  height: 64px;
  background: url('/assets/character-sprite.png') no-repeat;
  background-size: contain;
  bottom: 20%;
  left: 50%;
  transform: translateX(-50%);
  image-rendering: pixelated;
`;

const DialogBox = styled(motion.div)`
  position: absolute;
  bottom: 10%;
  left: 50%;
  transform: translateX(-50%);
  width: 80%;
  max-width: 800px;
  background-color: rgba(0, 0, 0, 0.8);
  border: 4px solid #f1c40f;
  border-radius: 10px;
  padding: 1rem;
  color: white;
  font-size: 0.8rem;
  line-height: 1.5;
  text-align: center;
`;

const Monster = styled(motion.div)`
  position: absolute;
  width: 128px;
  height: 128px;
  background: url('/assets/monster-sprite.png') no-repeat;
  background-size: contain;
  bottom: 20%;
  right: -128px;
  image-rendering: pixelated;
`;

const ContinueButton = styled(motion.button)`
  position: absolute;
  bottom: 5%;
  left: 50%;
  transform: translateX(-50%);
  padding: 0.5rem 1rem;
  background-color: #f1c40f;
  color: #000;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-family: 'Press Start 2P', cursive;
  font-size: 0.8rem;
  
  &:hover {
    background-color: #f39c12;
  }
`;

const HomeScene = () => {
  const navigate = useNavigate();
  const [currentDialog, setCurrentDialog] = useState(0);
  const [showMonster, setShowMonster] = useState(false);
  const [showContinue, setShowContinue] = useState(false);

  const dialogs = [
    "¡Bienvenido a tu nuevo hogar!",
    "Este será tu refugio entre cacerías...",
    "¡OH NO! ¡UN MONSTRUO ESTÁ ATACANDO LA ALDEA!",
    "¡RÁPIDO! ¡ESCOGE UN ARMA Y DEFIÉNDETE!"
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      if (currentDialog < dialogs.length - 1) {
        setCurrentDialog(prev => prev + 1);
      } else {
        setShowContinue(true);
      }
    }, 3000);

    if (currentDialog === 2) {
      setShowMonster(true);
    }

    return () => clearTimeout(timer);
  }, [currentDialog]);

  const handleContinue = () => {
    navigate('/weapon-selection');
  };

  return (
    <SceneContainer>
      <Character
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      />
      
      <AnimatePresence>
        {showMonster && (
          <Monster
            initial={{ x: '100%' }}
            animate={{ x: '0%' }}
            transition={{ duration: 1 }}
          />
        )}
      </AnimatePresence>

      <DialogBox
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        key={currentDialog}
      >
        {dialogs[currentDialog]}
      </DialogBox>

      {showContinue && (
        <ContinueButton
          onClick={handleContinue}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          CONTINUAR
        </ContinueButton>
      )}
    </SceneContainer>
  );
};

export default HomeScene; 