import React from 'react';
import { useNavigate } from 'react-router-dom';
import menuBg from '../assets/menu-bg.svg';
import '../styles/Menu.css';

const Menu = () => {
  const navigate = useNavigate();

  return (
    <div className="menu-container">
      <img src={menuBg} alt="Menu Background" className="menu-bg" />
      <div className="menu-content">
        <h1 className="menu-title">MONSTER HANTER</h1>
        <button 
          className="menu-button"
          onClick={() => navigate('/game')}
        >
          INICIAR JUEGO
        </button>
        <button 
          className="menu-button"
          onClick={() => navigate('/instructions')}
        >
          INSTRUCCIONES
        </button>
        <button 
          className="menu-button"
          onClick={() => navigate('/credits')}
        >
          CRÉDITOS
        </button>
      </div>
    </div>
  );
};

export default Menu; 