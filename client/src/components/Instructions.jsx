import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Instructions.css';

const Instructions = () => {
  const navigate = useNavigate();

  return (
    <div className="instructions-container">
      <div className="instructions-content">
        <h1 className="instructions-title">INSTRUCCIONES</h1>
        
        <div className="instructions-section">
          <h2>CONTROLES</h2>
          <ul>
            <li>WASD - Movimiento</li>
            <li>ESPACIO - Saltar</li>
            <li>CLIC IZQUIERDO - Atacar</li>
            <li>CLIC DERECHO - Bloquear</li>
            <li>E - Interactuar</li>
            <li>ESC - Menú</li>
          </ul>
        </div>

        <div className="instructions-section">
          <h2>OBJETIVO</h2>
          <p>
            Tu misión es cazar monstruos y dragones en diferentes biomas.
            Completa misiones, mejora tu equipo y conviértete en el mejor cazador.
          </p>
        </div>

        <div className="instructions-section">
          <h2>COMBATE</h2>
          <p>
            Cada arma tiene combos únicos y mecánicas especiales.
            Aprende los patrones de ataque de los monstruos para vencerlos.
          </p>
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

export default Instructions; 