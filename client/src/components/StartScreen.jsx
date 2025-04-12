import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const StartScreenContainer = styled.div`
  width: 100vw;
  height: 100vh;
  background: #000;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-family: 'Press Start 2P', cursive;
  color: white;
`;

const Title = styled(motion.h1)`
  color: #ffd700;
  text-align: center;
  margin-bottom: 2rem;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  font-size: 2.5rem;
`;

const Subtitle = styled(motion.p)`
  color: #fff;
  text-align: center;
  font-size: 1rem;
  opacity: 0;
`;

const StartScreen = () => {
  const navigate = useNavigate();
  const [showSubtitle, setShowSubtitle] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSubtitle(true);
    }, 2000);

    const handleKeyPress = (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        navigate('/menu');
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [navigate]);

  return (
    <StartScreenContainer>
      <Title
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        MONSTER HUNTER
      </Title>
      <Subtitle
        initial={{ opacity: 0 }}
        animate={{ opacity: showSubtitle ? 1 : 0 }}
        transition={{ duration: 0.5 }}
      >
        PRESIONA UNA TECLA PARA COMENZAR
      </Subtitle>
    </StartScreenContainer>
  );
};

export default StartScreen; 