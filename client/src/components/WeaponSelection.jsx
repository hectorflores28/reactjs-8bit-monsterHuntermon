import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const WeaponSelectionContainer = styled.div`
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

const WeaponsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  width: 90%;
  max-width: 1200px;
  margin-bottom: 2rem;
`;

const WeaponCard = styled(motion.div)`
  background: rgba(0, 0, 0, 0.8);
  border: 2px solid ${props => props.selected ? '#ffd700' : '#4a4a4a'};
  border-radius: 10px;
  padding: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    transform: scale(1.05);
    border-color: #ffd700;
  }
`;

const WeaponImage = styled.div`
  width: 100%;
  height: 100px;
  background-color: #333;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
`;

const WeaponName = styled.h3`
  color: #ffd700;
  margin-bottom: 0.5rem;
  font-size: 0.8rem;
`;

const WeaponStats = styled.div`
  font-size: 0.6rem;
  color: #ccc;
`;

const Button = styled(motion.button)`
  background: #ffd700;
  color: black;
  border: none;
  padding: 0.5rem 1rem;
  font-family: 'Press Start 2P', cursive;
  font-size: 0.8rem;
  cursor: pointer;
  border-radius: 5px;
  margin-top: 1rem;

  &:hover {
    background: #ffed4a;
  }
`;

const weapons = [
  {
    id: 1,
    name: 'ESPADA GRANDE',
    damage: 100,
    speed: 50,
    range: 1,
    description: 'Un arma poderosa pero lenta'
  },
  {
    id: 2,
    name: 'ESPADA LARGA',
    damage: 80,
    speed: 70,
    range: 2,
    description: 'Versátil y equilibrada'
  },
  {
    id: 3,
    name: 'ESPADA Y ESCUDO',
    damage: 70,
    speed: 80,
    range: 1,
    description: 'Equilibrio entre ataque y defensa'
  },
  {
    id: 4,
    name: 'MARTILLO',
    damage: 120,
    speed: 40,
    range: 1,
    description: 'Daño masivo pero muy lento'
  },
  {
    id: 5,
    name: 'HACHA DE GUERRA',
    damage: 110,
    speed: 60,
    range: 2,
    description: 'Poderosa y versátil'
  },
  {
    id: 6,
    name: 'LANZA',
    damage: 80,
    speed: 60,
    range: 2,
    description: 'Alcance medio con buen daño'
  },
  {
    id: 7,
    name: 'LANZA DE PISTÓN',
    damage: 90,
    speed: 50,
    range: 2,
    description: 'Combina ataque y explosiones'
  },
  {
    id: 8,
    name: 'ESPADA DOBLE',
    damage: 60,
    speed: 90,
    range: 1,
    description: 'Ataques rápidos y furiosos'
  },
  {
    id: 9,
    name: 'CUERNO DE CAZA',
    damage: 70,
    speed: 70,
    range: 1,
    description: 'Apoya al equipo con melodías'
  },
  {
    id: 10,
    name: 'ARCO',
    damage: 60,
    speed: 90,
    range: 3,
    description: 'Ataques rápidos a distancia'
  },
  {
    id: 11,
    name: 'BALLESTA LIGERA',
    damage: 50,
    speed: 100,
    range: 3,
    description: 'Rápida y versátil'
  },
  {
    id: 12,
    name: 'BALLESTA PESADA',
    damage: 90,
    speed: 70,
    range: 3,
    description: 'Potente arma de proyectiles'
  },
  {
    id: 13,
    name: 'KATANA',
    damage: 85,
    speed: 75,
    range: 2,
    description: 'Elegante y letal'
  },
  {
    id: 14,
    name: 'MARTILLO DE PISTÓN',
    damage: 105,
    speed: 55,
    range: 2,
    description: 'Transformable y poderosa'
  }
];

const WeaponSelection = () => {
  const navigate = useNavigate();
  const [selectedWeapon, setSelectedWeapon] = useState(null);

  const handleWeaponSelect = (weapon) => {
    setSelectedWeapon(weapon);
  };

  const handleContinue = () => {
    if (selectedWeapon) {
      localStorage.setItem('weapon', JSON.stringify(selectedWeapon));
      navigate('/first-hunt');
    }
  };

  return (
    <WeaponSelectionContainer>
      <Title>SELECCIÓN DE ARMA</Title>
      <WeaponsGrid>
        {weapons.map(weapon => (
          <WeaponCard
            key={weapon.id}
            selected={selectedWeapon?.id === weapon.id}
            onClick={() => handleWeaponSelect(weapon)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <WeaponImage>
              {weapon.name.charAt(0)}
            </WeaponImage>
            <WeaponName>{weapon.name}</WeaponName>
            <WeaponStats>
              <div>DAÑO: {weapon.damage}</div>
              <div>VELOCIDAD: {weapon.speed}</div>
              <div>ALCANCE: {weapon.range}</div>
              <div>{weapon.description}</div>
            </WeaponStats>
          </WeaponCard>
        ))}
      </WeaponsGrid>
      <Button
        onClick={handleContinue}
        disabled={!selectedWeapon}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        CONTINUAR
      </Button>
    </WeaponSelectionContainer>
  );
};

export default WeaponSelection; 