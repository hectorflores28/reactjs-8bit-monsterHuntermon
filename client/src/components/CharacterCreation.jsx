import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useGameStore } from '../stores/gameStore';

const CreationContainer = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: #2c3e50;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-family: 'Press Start 2P', cursive;
  color: #ecf0f1;
`;

const CharacterPreview = styled.div`
  width: 128px;
  height: 128px;
  background-color: #34495e;
  border: 4px solid #f1c40f;
  margin-bottom: 2rem;
  image-rendering: pixelated;
  background-image: url(${props => props.sprite});
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
`;

const CustomizationPanel = styled.div`
  background-color: rgba(0, 0, 0, 0.8);
  border: 4px solid #f1c40f;
  border-radius: 10px;
  padding: 2rem;
  width: 80%;
  max-width: 600px;
`;

const OptionGroup = styled.div`
  margin-bottom: 1.5rem;
`;

const OptionTitle = styled.h3`
  color: #f1c40f;
  margin-bottom: 1rem;
  font-size: 1rem;
`;

const OptionList = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
`;

const OptionButton = styled(motion.button)`
  padding: 0.5rem 1rem;
  background-color: ${props => props.selected ? '#f1c40f' : '#34495e'};
  color: ${props => props.selected ? '#000' : '#ecf0f1'};
  border: 2px solid #f1c40f;
  border-radius: 5px;
  cursor: pointer;
  font-family: 'Press Start 2P', cursive;
  font-size: 0.8rem;
  
  &:hover {
    transform: scale(1.05);
  }
`;

const StartButton = styled(motion.button)`
  padding: 1rem 2rem;
  background-color: #f1c40f;
  color: #000;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-family: 'Press Start 2P', cursive;
  font-size: 1rem;
  margin-top: 2rem;
  
  &:hover {
    background-color: #f39c12;
  }
`;

const CharacterCreation = () => {
  const navigate = useNavigate();
  const { crearJugador } = useGameStore();
  const [character, setCharacter] = useState({
    nombre: '',
    genero: 'masculino',
    clase: 'cazador',
    colorPelo: 'negro',
    colorRopa: 'azul'
  });

  const generos = ['masculino', 'femenino'];
  const clases = ['cazador', 'cazadora', 'artillero', 'artillera'];
  const coloresPelo = ['negro', 'rubio', 'castaño', 'rojo'];
  const coloresRopa = ['azul', 'rojo', 'verde', 'negro'];

  const handleStart = () => {
    if (!character.nombre.trim()) {
      alert('Por favor, ingresa un nombre para tu personaje');
      return;
    }
    crearJugador(character);
    navigate('/home-scene');
  };

  const updateCharacter = (key, value) => {
    setCharacter(prev => ({
      ...prev,
      [key]: value
    }));
  };

  return (
    <CreationContainer>
      <CharacterPreview sprite={`/assets/characters/${character.genero}-${character.clase}-${character.colorPelo}-${character.colorRopa}.png`} />
      
      <CustomizationPanel>
        <OptionGroup>
          <OptionTitle>NOMBRE</OptionTitle>
          <input
            type="text"
            value={character.nombre}
            onChange={(e) => updateCharacter('nombre', e.target.value)}
            style={{
              width: '100%',
              padding: '0.5rem',
              fontFamily: "'Press Start 2P', cursive",
              fontSize: '0.8rem',
              backgroundColor: '#34495e',
              color: '#ecf0f1',
              border: '2px solid #f1c40f',
              borderRadius: '5px'
            }}
          />
        </OptionGroup>

        <OptionGroup>
          <OptionTitle>GÉNERO</OptionTitle>
          <OptionList>
            {generos.map(genero => (
              <OptionButton
                key={genero}
                selected={character.genero === genero}
                onClick={() => updateCharacter('genero', genero)}
              >
                {genero.toUpperCase()}
              </OptionButton>
            ))}
          </OptionList>
        </OptionGroup>

        <OptionGroup>
          <OptionTitle>CLASE</OptionTitle>
          <OptionList>
            {clases.map(clase => (
              <OptionButton
                key={clase}
                selected={character.clase === clase}
                onClick={() => updateCharacter('clase', clase)}
              >
                {clase.toUpperCase()}
              </OptionButton>
            ))}
          </OptionList>
        </OptionGroup>

        <OptionGroup>
          <OptionTitle>COLOR DE PELO</OptionTitle>
          <OptionList>
            {coloresPelo.map(color => (
              <OptionButton
                key={color}
                selected={character.colorPelo === color}
                onClick={() => updateCharacter('colorPelo', color)}
              >
                {color.toUpperCase()}
              </OptionButton>
            ))}
          </OptionList>
        </OptionGroup>

        <OptionGroup>
          <OptionTitle>COLOR DE ROPA</OptionTitle>
          <OptionList>
            {coloresRopa.map(color => (
              <OptionButton
                key={color}
                selected={character.colorRopa === color}
                onClick={() => updateCharacter('colorRopa', color)}
              >
                {color.toUpperCase()}
              </OptionButton>
            ))}
          </OptionList>
        </OptionGroup>

        <StartButton
          onClick={handleStart}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          COMENZAR AVENTURA
        </StartButton>
      </CustomizationPanel>
    </CreationContainer>
  );
};

export default CharacterCreation; 