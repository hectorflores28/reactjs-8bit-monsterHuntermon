import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const StatusContainer = styled.div`
  position: fixed;
  top: 60px;
  left: 20px;
  background: rgba(0, 0, 0, 0.8);
  padding: 15px;
  border-radius: 10px;
  border: 2px solid #ffd700;
  font-family: 'Press Start 2P', cursive;
  color: white;
  z-index: 1000;
  max-width: 300px;
`;

const StatusList = styled.div`
  margin-top: 10px;
`;

const StatusEffect = styled.div`
  margin-bottom: 10px;
  padding: 10px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 5px;
  border: 1px solid ${props => props.type === 'buff' ? '#2ecc71' : '#e74c3c'};
`;

const StatusIcon = styled.span`
  font-size: 16px;
  margin-right: 10px;
`;

const StatusName = styled.div`
  font-size: 12px;
  margin-bottom: 5px;
  color: ${props => props.type === 'buff' ? '#2ecc71' : '#e74c3c'};
`;

const StatusDuration = styled.div`
  font-size: 10px;
  color: #ccc;
`;

const StatusDescription = styled.div`
  font-size: 10px;
  color: #f1c40f;
  margin-top: 5px;
`;

const StatusSystem = () => {
  const [activeEffects, setActiveEffects] = useState([]);

  const statusTypes = {
    envenenado: {
      icon: '☠️',
      type: 'debuff',
      effect: 'Daño gradual',
      duration: 10,
      tickDamage: 5
    },
    quemado: {
      icon: '🔥',
      type: 'debuff',
      effect: 'Daño gradual y -20% defensa',
      duration: 8,
      tickDamage: 3
    },
    paralizado: {
      icon: '⚡',
      type: 'debuff',
      effect: '-50% velocidad de movimiento',
      duration: 5
    },
    fortalecido: {
      icon: '💪',
      type: 'buff',
      effect: '+30% ataque',
      duration: 15
    },
    protegido: {
      icon: '🛡️',
      type: 'buff',
      effect: '+30% defensa',
      duration: 12
    },
    regeneración: {
      icon: '💚',
      type: 'buff',
      effect: 'Recuperación de vida',
      duration: 10,
      tickHeal: 5
    }
  };

  const addEffect = (effectName) => {
    if (statusTypes[effectName]) {
      const newEffect = {
        ...statusTypes[effectName],
        name: effectName,
        remainingDuration: statusTypes[effectName].duration
      };

      setActiveEffects(prev => [...prev, newEffect]);
    }
  };

  const removeEffect = (effectName) => {
    setActiveEffects(prev => prev.filter(effect => effect.name !== effectName));
  };

  useEffect(() => {
    // Actualizar duración y aplicar efectos
    const effectsInterval = setInterval(() => {
      setActiveEffects(prev => 
        prev.map(effect => ({
          ...effect,
          remainingDuration: effect.remainingDuration - 1
        })).filter(effect => effect.remainingDuration > 0)
      );
    }, 1000);

    return () => clearInterval(effectsInterval);
  }, []);

  // Ejemplo de cómo aplicar un efecto basado en el clima
  useEffect(() => {
    const weatherEffects = {
      stormy: 'paralizado',
      rainy: 'protegido',
      sunny: 'regeneración'
    };

    // Aquí se conectaría con el sistema de clima
    // Por ahora, simularemos un cambio aleatorio
    const interval = setInterval(() => {
      const effects = Object.values(weatherEffects);
      const randomEffect = effects[Math.floor(Math.random() * effects.length)];
      addEffect(randomEffect);
    }, 15000);

    return () => clearInterval(interval);
  }, []);

  return (
    <StatusContainer>
      <h3>ESTADOS</h3>
      <StatusList>
        {activeEffects.map((effect, index) => (
          <StatusEffect key={`${effect.name}-${index}`} type={effect.type}>
            <StatusIcon>{effect.icon}</StatusIcon>
            <StatusName type={effect.type}>
              {effect.name.toUpperCase()}
            </StatusName>
            <StatusDuration>
              Duración: {effect.remainingDuration}s
            </StatusDuration>
            <StatusDescription>
              {effect.effect}
            </StatusDescription>
          </StatusEffect>
        ))}
      </StatusList>
    </StatusContainer>
  );
};

export default StatusSystem; 