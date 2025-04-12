import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/IntroScreen.css';

const IntroScreen = () => {
  const navigate = useNavigate();
  const [showTitle, setShowTitle] = useState(false);
  const [showPressKey, setShowPressKey] = useState(false);

  useEffect(() => {
    // Efecto de aparición del título después de 1 segundo
    const titleTimer = setTimeout(() => {
      setShowTitle(true);
    }, 1000);

    // Efecto de aparición del texto "Presiona una tecla" después de 3 segundos
    const pressKeyTimer = setTimeout(() => {
      setShowPressKey(true);
    }, 3000);

    const handleKeyPress = () => {
      navigate('/menu');
    };

    window.addEventListener('keydown', handleKeyPress);

    return () => {
      clearTimeout(titleTimer);
      clearTimeout(pressKeyTimer);
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [navigate]);

  return (
    <div className="intro-container">
      <div className={`title ${showTitle ? 'visible' : ''}`}>
        MONSTER HANTER
      </div>
      <div className={`press-key ${showPressKey ? 'visible' : ''}`}>
        PRESIONA UNA TECLA PARA COMENZAR
      </div>
    </div>
  );
};

export default IntroScreen; 