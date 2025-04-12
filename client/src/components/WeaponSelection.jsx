import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const SelectionContainer = styled.div`
  width: 100vw;
  height: 100vh;
  background: url('/assets/weapon-selection-bg.png') no-repeat center center;
  background-size: cover;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
`;

const Title = styled.h1`
  color: white;
  font-family: 'Press Start 2P', cursive;
  font-size: 1.5rem;
  text-align: center;
  margin-bottom: 2rem;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
`;

const WeaponsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  width: 80%;
  max-width: 1200px;
`;

const WeaponCard = styled.div`
  background-color: rgba(0, 0, 0, 0.7);
  border: 4px solid ${props => props.selected ? '#FFD700' : '#666'};
  border-radius: 10px;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    transform: scale(1.05);
    border-color: #FFD700;
  }
`;

const WeaponImage = styled.img`
  width: 64px;
  height: 64px;
  margin-bottom: 0.5rem;
`;

const WeaponName = styled.h3`
  color: white;
  font-family: 'Press Start 2P', cursive;
  font-size: 0.8rem;
  text-align: center;
  margin: 0;
`;

const WeaponDescription = styled.p`
  color: #ccc;
  font-family: 'Press Start 2P', cursive;
  font-size: 0.6rem;
  text-align: center;
  margin: 0.5rem 0;
`;

const SelectButton = styled.button`
  padding: 1rem 2rem;
  font-family: 'Press Start 2P', cursive;
  font-size: 1rem;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 2rem;
  opacity: ${props => props.disabled ? 0.5 : 1};
  
  &:hover:not(:disabled) {
    background-color: #45a049;
  }
`;

const weapons = [
  {
    id: 1,
    name: "Espada Grande",
    image: "/assets/weapons/greatsword.png",
    description: "Un arma pesada pero poderosa"
  },
  {
    id: 2,
    name: "Espada Larga",
    image: "/assets/weapons/longsword.png",
    description: "Equilibrio perfecto entre velocidad y poder"
  },
  {
    id: 3,
    name: "Espada y Escudo",
    image: "/assets/weapons/swordshield.png",
    description: "Defensa y ataque en perfecta armonía"
  },
  {
    id: 4,
    name: "Martillo",
    image: "/assets/weapons/hammer.png",
    description: "Aplasta a tus enemigos con fuerza bruta"
  },
  {
    id: 5,
    name: "Hacha Espada",
    image: "/assets/weapons/switchaxe.png",
    description: "Transforma tu arma en diferentes modos"
  },
  {
    id: 6,
    name: "Lanza",
    image: "/assets/weapons/lance.png",
    description: "Defensa impenetrable y ataques precisos"
  },
  {
    id: 7,
    name: "Lanza Pistola",
    image: "/assets/weapons/gunlance.png",
    description: "Combina ataques cuerpo a cuerpo con disparos"
  },
  {
    id: 8,
    name: "Dual Blades",
    image: "/assets/weapons/dualblades.png",
    description: "Ataques rápidos y furiosos"
  },
  {
    id: 9,
    name: "Hunting Horn",
    image: "/assets/weapons/huntinghorn.png",
    description: "Apoya a tu equipo con melodías poderosas"
  },
  {
    id: 10,
    name: "Insect Glaive",
    image: "/assets/weapons/insectglaive.png",
    description: "Ataques aéreos y control de insectos"
  },
  {
    id: 11,
    name: "Charge Blade",
    image: "/assets/weapons/chargeblade.png",
    description: "Combina espada y hacha con cargas de energía"
  },
  {
    id: 12,
    name: "Bow",
    image: "/assets/weapons/bow.png",
    description: "Ataques a distancia con diferentes tipos de flechas"
  },
  {
    id: 13,
    name: "Light Bowgun",
    image: "/assets/weapons/lightbowgun.png",
    description: "Movilidad y disparos rápidos"
  },
  {
    id: 14,
    name: "Heavy Bowgun",
    image: "/assets/weapons/heavybowgun.png",
    description: "Poder de fuego masivo y munición especial"
  }
];

const WeaponSelection = ({ setGameState }) => {
  const [selectedWeapon, setSelectedWeapon] = useState(null);
  const navigate = useNavigate();

  const handleWeaponSelect = (weapon) => {
    setSelectedWeapon(weapon);
  };

  const handleConfirm = () => {
    if (selectedWeapon) {
      setGameState(prev => ({
        ...prev,
        weapon: selectedWeapon
      }));
      navigate('/first-hunt');
    }
  };

  return (
    <SelectionContainer>
      <Title>Selecciona tu Arma</Title>
      <WeaponsGrid>
        {weapons.map(weapon => (
          <WeaponCard
            key={weapon.id}
            selected={selectedWeapon?.id === weapon.id}
            onClick={() => handleWeaponSelect(weapon)}
          >
            <WeaponImage src={weapon.image} alt={weapon.name} />
            <WeaponName>{weapon.name}</WeaponName>
            <WeaponDescription>{weapon.description}</WeaponDescription>
          </WeaponCard>
        ))}
      </WeaponsGrid>
      <SelectButton
        onClick={handleConfirm}
        disabled={!selectedWeapon}
      >
        Confirmar Arma
      </SelectButton>
    </SelectionContainer>
  );
};

export default WeaponSelection; 