import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import '../styles/Menu.css';

const MenuContainer = styled.div`
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

const MenuTitle = styled(motion.h1)`
  color: #ffd700;
  text-align: center;
  margin-bottom: 2rem;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
`;

const MenuOptions = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;
`;

const MenuOption = styled(motion.button)`
  background: none;
  border: none;
  color: white;
  font-family: 'Press Start 2P', cursive;
  font-size: 1.2rem;
  cursor: pointer;
  padding: 0.5rem 1rem;
  position: relative;
  transition: all 0.3s ease;

  &:hover {
    color: #ffd700;
  }

  &::before {
    content: '>';
    position: absolute;
    left: -1rem;
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  &.selected::before {
    opacity: 1;
  }
`;

const Menu = ({ onSettingsClick, onInstructionsClick, onCreditsClick }) => {
  const navigate = useNavigate();
  const [selectedOption, setSelectedOption] = useState(0);
  const menuOptions = [
    { text: 'JUGAR', action: () => navigate('/character-creation') },
    { text: 'CONFIGURACIÓN', action: onSettingsClick },
    { text: 'INSTRUCCIONES', action: onInstructionsClick },
    { text: 'CRÉDITOS', action: onCreditsClick }
  ];

  useEffect(() => {
    const handleKeyDown = (e) => {
      switch (e.key) {
        case 'ArrowUp':
          setSelectedOption((prev) => (prev > 0 ? prev - 1 : menuOptions.length - 1));
          break;
        case 'ArrowDown':
          setSelectedOption((prev) => (prev < menuOptions.length - 1 ? prev + 1 : 0));
          break;
        case 'Enter':
          menuOptions[selectedOption].action();
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedOption, menuOptions]);

  return (
    <MenuContainer>
      <MenuTitle
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        MONSTER HUNTER
      </MenuTitle>
      <MenuOptions>
        {menuOptions.map((option, index) => (
          <MenuOption
            key={option.text}
            className={selectedOption === index ? 'selected' : ''}
            onClick={option.action}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {option.text}
          </MenuOption>
        ))}
      </MenuOptions>
    </MenuContainer>
  );
};

export default Menu; 