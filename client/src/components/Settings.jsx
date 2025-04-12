import React, { useState } from 'react';
import styled from 'styled-components';

const SettingsContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const SettingsBox = styled.div`
  background-color: #1a1a1a;
  border: 4px solid #4a4a4a;
  border-radius: 8px;
  padding: 20px;
  width: 80%;
  max-width: 500px;
  color: #fff;
  font-family: 'Press Start 2P', cursive;
`;

const Title = styled.h2`
  text-align: center;
  margin-bottom: 30px;
  color: #ffd700;
  text-shadow: 2px 2px #000;
`;

const SettingGroup = styled.div`
  margin-bottom: 20px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 10px;
  font-size: 0.8em;
`;

const Select = styled.select`
  width: 100%;
  padding: 10px;
  background-color: #333;
  color: #fff;
  border: 2px solid #4a4a4a;
  border-radius: 4px;
  font-family: 'Press Start 2P', cursive;
  font-size: 0.7em;
`;

const Button = styled.button`
  background-color: #4a4a4a;
  color: #fff;
  border: none;
  padding: 10px 20px;
  margin: 10px;
  cursor: pointer;
  font-family: 'Press Start 2P', cursive;
  font-size: 0.8em;
  transition: all 0.3s ease;

  &:hover {
    background-color: #ffd700;
    color: #000;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 30px;
`;

const Settings = ({ onClose }) => {
  const [difficulty, setDifficulty] = useState('normal');
  const [musicVolume, setMusicVolume] = useState('medium');
  const [soundEffects, setSoundEffects] = useState('on');

  const handleSave = () => {
    // Aquí se implementará la lógica para guardar la configuración
    onClose();
  };

  return (
    <SettingsContainer>
      <SettingsBox>
        <Title>CONFIGURACIÓN</Title>
        
        <SettingGroup>
          <Label>DIFICULTAD</Label>
          <Select 
            value={difficulty} 
            onChange={(e) => setDifficulty(e.target.value)}
          >
            <option value="easy">FÁCIL</option>
            <option value="normal">NORMAL</option>
            <option value="hard">DIFÍCIL</option>
          </Select>
        </SettingGroup>

        <SettingGroup>
          <Label>VOLUMEN MÚSICA</Label>
          <Select 
            value={musicVolume} 
            onChange={(e) => setMusicVolume(e.target.value)}
          >
            <option value="off">SIN SONIDO</option>
            <option value="low">BAJO</option>
            <option value="medium">MEDIO</option>
            <option value="high">ALTO</option>
          </Select>
        </SettingGroup>

        <SettingGroup>
          <Label>EFECTOS DE SONIDO</Label>
          <Select 
            value={soundEffects} 
            onChange={(e) => setSoundEffects(e.target.value)}
          >
            <option value="on">ACTIVADO</option>
            <option value="off">DESACTIVADO</option>
          </Select>
        </SettingGroup>

        <ButtonContainer>
          <Button onClick={handleSave}>GUARDAR</Button>
          <Button onClick={onClose}>CANCELAR</Button>
        </ButtonContainer>
      </SettingsBox>
    </SettingsContainer>
  );
};

export default Settings; 