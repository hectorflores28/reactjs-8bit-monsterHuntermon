import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const IntroContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
`;

const Logo = styled.img`
  width: 80%;
  max-width: 600px;
  opacity: ${props => props.show ? 1 : 0};
  transition: opacity 2s ease-in-out;
  filter: drop-shadow(0 0 10px rgba(255, 0, 0, 0.5));
`;

const PressKeyText = styled.div`
  position: absolute;
  bottom: 20%;
  color: white;
  font-size: 1.5rem;
  opacity: ${props => props.show ? 1 : 0};
  transition: opacity 1s ease-in-out;
  animation: blink 1.5s infinite;
  
  @keyframes blink {
    0% { opacity: 1; }
    50% { opacity: 0; }
    100% { opacity: 1; }
  }
`;

const IntroScreen = () => {
  const [showLogo, setShowLogo] = useState(false);
  const [showText, setShowText] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Mostrar logo después de 1 segundo
    setTimeout(() => setShowLogo(true), 1000);
    // Mostrar texto después de 3 segundos
    setTimeout(() => setShowText(true), 3000);
  }, []);

  const handleKeyPress = (e) => {
    if (showText) {
      navigate('/menu');
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [showText]);

  return (
    <IntroContainer>
      <Logo 
        src="/assets/logo.png" 
        alt="Monster Hunter" 
        show={showLogo}
      />
      <PressKeyText show={showText}>
        Presiona cualquier tecla para continuar
      </PressKeyText>
    </IntroContainer>
  );
};

export default IntroScreen; 