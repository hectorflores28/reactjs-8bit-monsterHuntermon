import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import useGameStore from '../stores/gameStore';

const SelectionContainer = styled.div`
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

const Title = styled.h1`
  color: #f1c40f;
  margin-bottom: 2rem;
  text-shadow: 3px 3px 0 #000;
  letter-spacing: 2px;
`;

const WeaponsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  width: 80%;
  max-width: 800px;
`;

const WeaponCard = styled(motion.div)`
  background-color: rgba(0, 0, 0, 0.8);
  border: 4px solid ${props => props.selected ? '#f1c40f' : '#34495e'};
  border-radius: 10px;
  padding: 1rem;
  cursor: pointer;
  text-align: center;
  transition: all 0.3s ease;

  &:hover {
    transform: scale(1.05);
    border-color: #f1c40f;
  }
`;

const WeaponIcon = styled.div`
  width: 64px;
  height: 64px;
  margin: 0 auto 1rem;
  background-image: url(${props => props.sprite});
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  image-rendering: pixelated;
`;

const WeaponName = styled.h3`
  color: #f1c40f;
  margin-bottom: 0.5rem;
  font-size: 0.8rem;
`;

const WeaponStats = styled.div`
  font-size: 0.6rem;
  color: #bdc3c7;
`;

const ConfirmButton = styled(motion.button)`
  margin-top: 2rem;
  padding: 1rem 2rem;
  background-color: #f1c40f;
  color: #000;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-family: 'Press Start 2P', cursive;
  font-size: 1rem;
  
  &:hover {
    background-color: #f39c12;
  }
`;

const weapons = [
  {
    id: 1,
    nombre: 'ESPADA GRANDE',
    sprite: '/assets/weapons/greatsword.png',
    ataque: 15,
    velocidad: 5,
    alcance: 3,
    descripcion: 'Una espada enorme que inflige gran daño'
  },
  {
    id: 2,
    nombre: 'ESPADA LARGA',
    sprite: '/assets/weapons/longsword.png',
    ataque: 12,
    velocidad: 8,
    alcance: 4,
    descripcion: 'Una espada versátil y equilibrada'
  },
  {
    id: 3,
    nombre: 'ESPADA Y ESCUDO',
    sprite: '/assets/weapons/swordshield.png',
    ataque: 10,
    velocidad: 10,
    alcance: 2,
    descripcion: 'Perfecta para defensa y ataque'
  },
  {
    id: 4,
    nombre: 'MARTILLO',
    sprite: '/assets/weapons/hammer.png',
    ataque: 18,
    velocidad: 4,
    alcance: 2,
    descripcion: 'Ideal para romper defensas'
  },
  {
    id: 5,
    nombre: 'HACHA DE GUERRA',
    sprite: '/assets/weapons/switchaxe.png',
    ataque: 16,
    velocidad: 6,
    alcance: 3,
    descripcion: 'Poderosa y versátil'
  },
  {
    id: 6,
    nombre: 'LANZA',
    sprite: '/assets/weapons/lance.png',
    ataque: 13,
    velocidad: 7,
    alcance: 5,
    descripcion: 'Gran alcance y defensa'
  },
  {
    id: 7,
    nombre: 'LANZA DE PISTÓN',
    sprite: '/assets/weapons/gunlance.png',
    ataque: 14,
    velocidad: 6,
    alcance: 4,
    descripcion: 'Combina ataque y explosiones'
  },
  {
    id: 8,
    nombre: 'ESPADA DOBLE',
    sprite: '/assets/weapons/dualswords.png',
    ataque: 11,
    velocidad: 12,
    alcance: 2,
    descripcion: 'Ataques rápidos y furiosos'
  },
  {
    id: 9,
    nombre: 'CUERNO DE CAZA',
    sprite: '/assets/weapons/huntinghorn.png',
    ataque: 12,
    velocidad: 7,
    alcance: 3,
    descripcion: 'Apoya al equipo con melodías'
  },
  {
    id: 10,
    nombre: 'ARCO',
    sprite: '/assets/weapons/bow.png',
    ataque: 10,
    velocidad: 9,
    alcance: 8,
    descripcion: 'Ataques a distancia precisos'
  },
  {
    id: 11,
    nombre: 'BALLESTA LIGERA',
    sprite: '/assets/weapons/lightbowgun.png',
    ataque: 9,
    velocidad: 11,
    alcance: 7,
    descripcion: 'Rápida y versátil'
  },
  {
    id: 12,
    nombre: 'BALLESTA PESADA',
    sprite: '/assets/weapons/heavybowgun.png',
    ataque: 14,
    velocidad: 5,
    alcance: 9,
    descripcion: 'Poderosa pero lenta'
  },
  {
    id: 13,
    nombre: 'KATANA',
    sprite: '/assets/weapons/katana.png',
    ataque: 13,
    velocidad: 9,
    alcance: 3,
    descripcion: 'Elegante y letal'
  },
  {
    id: 14,
    nombre: 'MARTILLO DE PISTÓN',
    sprite: '/assets/weapons/chargeblade.png',
    ataque: 17,
    velocidad: 6,
    alcance: 3,
    descripcion: 'Transformable y poderosa'
  }
];

const WeaponSelection = () => {
  const navigate = useNavigate();
  const { actualizarJugador } = useGameStore();
  const [armaSeleccionada, setArmaSeleccionada] = useState(null);

  const handleWeaponSelect = (arma) => {
    setArmaSeleccionada(arma);
  };

  const handleConfirm = () => {
    if (!armaSeleccionada) {
      alert('Por favor, selecciona un arma');
      return;
    }
    actualizarJugador({ arma: armaSeleccionada });
    navigate('/first-hunt');
  };

  return (
    <SelectionContainer>
      <Title>SELECCIONA TU ARMA</Title>
      <WeaponsGrid>
        {weapons.map(arma => (
          <WeaponCard
            key={arma.id}
            selected={armaSeleccionada?.id === arma.id}
            onClick={() => handleWeaponSelect(arma)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <WeaponIcon sprite={arma.sprite} />
            <WeaponName>{arma.nombre}</WeaponName>
            <WeaponStats>
              <div>ATAQUE: {arma.ataque}</div>
              <div>VELOCIDAD: {arma.velocidad}</div>
              <div>ALCANCE: {arma.alcance}</div>
            </WeaponStats>
          </WeaponCard>
        ))}
      </WeaponsGrid>
      <ConfirmButton
        onClick={handleConfirm}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        CONFIRMAR
      </ConfirmButton>
    </SelectionContainer>
  );
};

export default WeaponSelection; 