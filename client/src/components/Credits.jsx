import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Credits.css';

const Credits = () => {
  const navigate = useNavigate();

  return (
    <div className="credits-container">
      <div className="credits-content">
        <h1 className="credits-title">CRÉDITOS</h1>
        
        <div className="credits-section">
          <h2>DESARROLLO</h2>
          <p>Héctor Flores</p>
        </div>

        <div className="credits-section">
          <h2>ARTE Y DISEÑO</h2>
          <p>Inspirado en Pokémon Platino y The Legend of Zelda GBA</p>
        </div>

        <div className="credits-section">
          <h2>AGRADECIMIENTOS ESPECIALES</h2>
          <ul>
            <li>Comunidad de desarrolladores de juegos retro</li>
            <li>Capcom por Monster Hunter</li>
            <li>Nintendo por Pokémon y Zelda</li>
          </ul>
        </div>

        <div className="credits-section">
          <h2>CONTACTO</h2>
          <p>Twitter: @hectorflores28</p>
          <p>Email: hectoralejandro_1@live.com.mx</p>
        </div>

        <button 
          className="back-button"
          onClick={() => navigate('/')}
        >
          VOLVER AL MENÚ
        </button>
      </div>
    </div>
  );
};

export default Credits; 