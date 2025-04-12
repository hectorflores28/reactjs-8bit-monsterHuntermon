import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const WeatherContainer = styled.div`
  position: fixed;
  top: 20px;
  right: 20px;
  background: rgba(0, 0, 0, 0.8);
  padding: 15px;
  border-radius: 10px;
  border: 2px solid #ffd700;
  font-family: 'Press Start 2P', cursive;
  color: white;
  z-index: 1000;
  max-width: 300px;
`;

const WeatherIcon = styled.div`
  font-size: 24px;
  margin-bottom: 10px;
  text-align: center;
`;

const WeatherInfo = styled.div`
  font-size: 12px;
  margin-bottom: 5px;
`;

const WeatherEffect = styled.div`
  font-size: 10px;
  color: #f1c40f;
  margin-top: 5px;
`;

const WeatherSystem = () => {
  const [weather, setWeather] = useState({
    type: 'sunny',
    intensity: 1,
    time: 'day'
  });

  const [effects, setEffects] = useState({
    player: [],
    monster: []
  });

  const weatherTypes = {
    sunny: { icon: '☀️', effects: { player: ['+10% stamina regen'], monster: [] } },
    rainy: { icon: '🌧️', effects: { player: ['-20% stamina regen'], monster: ['-10% attack'] } },
    stormy: { icon: '⛈️', effects: { player: ['-30% stamina regen'], monster: ['-20% attack', '+10% defense'] } },
    night: { icon: '🌙', effects: { player: ['+20% stealth'], monster: ['+10% attack'] } }
  };

  useEffect(() => {
    // Simular cambios de clima
    const weatherInterval = setInterval(() => {
      const types = Object.keys(weatherTypes);
      const randomType = types[Math.floor(Math.random() * types.length)];
      const randomIntensity = Math.floor(Math.random() * 3) + 1;
      const isNight = Math.random() > 0.5;

      setWeather({
        type: randomType,
        intensity: randomIntensity,
        time: isNight ? 'night' : 'day'
      });

      setEffects(weatherTypes[randomType].effects);
    }, 30000); // Cambia cada 30 segundos

    return () => clearInterval(weatherInterval);
  }, []);

  const getWeatherEffects = () => {
    const currentWeather = weatherTypes[weather.type];
    return {
      ...currentWeather.effects,
      time: weather.time === 'night' ? ['+20% stealth'] : []
    };
  };

  return (
    <WeatherContainer>
      <WeatherIcon>
        {weatherTypes[weather.type].icon}
        {weather.time === 'night' ? ' 🌙' : ''}
      </WeatherIcon>
      <WeatherInfo>
        Clima: {weather.type.toUpperCase()}
        <br />
        Intensidad: {weather.intensity}
        <br />
        Tiempo: {weather.time.toUpperCase()}
      </WeatherInfo>
      <WeatherEffect>
        Efectos:
        <br />
        Jugador:
        {getWeatherEffects().player.map((effect, index) => (
          <div key={`player-${index}`}>{effect}</div>
        ))}
        Monstruo:
        {getWeatherEffects().monster.map((effect, index) => (
          <div key={`monster-${index}`}>{effect}</div>
        ))}
      </WeatherEffect>
    </WeatherContainer>
  );
};

export default WeatherSystem; 