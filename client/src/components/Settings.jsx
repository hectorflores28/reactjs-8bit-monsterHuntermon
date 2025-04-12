import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const SettingsContainer = styled.div`
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

const Title = styled.h1`
  color: #ffd700;
  text-align: center;
  margin-bottom: 2rem;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
`;

const SettingsMenu = styled.div`
  background: rgba(0, 0, 0, 0.8);
  padding: 2rem;
  border-radius: 10px;
  border: 2px solid #ffd700;
  width: 80%;
  max-width: 500px;
`;

const SettingItem = styled.div`
  margin: 1rem 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Label = styled.span`
  font-size: 0.9rem;
`;

const Slider = styled.input`
  width: 150px;
  margin-left: 1rem;
`;

const Button = styled(motion.button)`
  background: #ffd700;
  color: black;
  border: none;
  padding: 0.5rem 1rem;
  font-family: 'Press Start 2P', cursive;
  font-size: 0.8rem;
  margin-top: 1rem;
  cursor: pointer;
  border-radius: 5px;

  &:hover {
    background: #ffed4a;
  }
`;

const Settings = () => {
  const navigate = useNavigate();
  const [settings, setSettings] = useState({
    musicVolume: 50,
    sfxVolume: 70,
    difficulty: 'normal',
    language: 'es'
  });

  useEffect(() => {
    // Cargar configuraciones guardadas
    const savedSettings = localStorage.getItem('gameSettings');
    if (savedSettings) {
      setSettings(JSON.parse(savedSettings));
    }
  }, []);

  const handleSettingChange = (setting, value) => {
    setSettings(prev => {
      const newSettings = { ...prev, [setting]: value };
      localStorage.setItem('gameSettings', JSON.stringify(newSettings));
      return newSettings;
    });
  };

  const handleBack = () => {
    navigate('/menu');
  };

  return (
    <SettingsContainer>
      <Title>CONFIGURACIÓN</Title>
      <SettingsMenu>
        <SettingItem>
          <Label>Música</Label>
          <Slider
            type="range"
            min="0"
            max="100"
            value={settings.musicVolume}
            onChange={(e) => handleSettingChange('musicVolume', e.target.value)}
          />
        </SettingItem>
        <SettingItem>
          <Label>Efectos</Label>
          <Slider
            type="range"
            min="0"
            max="100"
            value={settings.sfxVolume}
            onChange={(e) => handleSettingChange('sfxVolume', e.target.value)}
          />
        </SettingItem>
        <SettingItem>
          <Label>Dificultad</Label>
          <select
            value={settings.difficulty}
            onChange={(e) => handleSettingChange('difficulty', e.target.value)}
            style={{ padding: '5px', fontFamily: 'Press Start 2P' }}
          >
            <option value="easy">Fácil</option>
            <option value="normal">Normal</option>
            <option value="hard">Difícil</option>
          </select>
        </SettingItem>
        <SettingItem>
          <Label>Idioma</Label>
          <select
            value={settings.language}
            onChange={(e) => handleSettingChange('language', e.target.value)}
            style={{ padding: '5px', fontFamily: 'Press Start 2P' }}
          >
            <option value="es">Español</option>
            <option value="en">English</option>
          </select>
        </SettingItem>
        <Button
          onClick={handleBack}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          VOLVER
        </Button>
      </SettingsMenu>
    </SettingsContainer>
  );
};

export default Settings; 