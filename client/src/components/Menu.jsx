import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Menu.css';

const Menu = () => {
  const navigate = useNavigate();
  const [selectedOption, setSelectedOption] = useState(0);
  const menuOptions = [
    { text: 'JUGAR', action: () => navigate('/character-creation') },
    { text: 'CONFIGURACIÓN', action: () => navigate('/settings') },
    { text: 'INSTRUCCIONES', action: () => navigate('/instructions') },
    { text: 'CRÉDITOS', action: () => navigate('/credits') }
  ];

  const handleKeyDown = (e) => {
    switch(e.key) {
      case 'ArrowUp':
        setSelectedOption(prev => (prev - 1 + menuOptions.length) % menuOptions.length);
        break;
      case 'ArrowDown':
        setSelectedOption(prev => (prev + 1) % menuOptions.length);
        break;
      case 'Enter':
        menuOptions[selectedOption].action();
        break;
    }
  };

  React.useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedOption]);

  return (
    <div className="menu-container">
      <div className="menu-box">
        <h1 className="menu-title">MONSTER HUNTER</h1>
        <div className="menu-options">
          {menuOptions.map((option, index) => (
            <div 
              key={index}
              className={`menu-option ${selectedOption === index ? 'selected' : ''}`}
              onClick={option.action}
            >
              {option.text}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Menu; 