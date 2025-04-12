import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const CreationContainer = styled.div`
  width: 100vw;
  height: 100vh;
  background: url('/assets/creation-background.png') no-repeat center center;
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CreationBox = styled.div`
  background-color: rgba(0, 0, 0, 0.8);
  border: 4px solid #fff;
  border-radius: 10px;
  padding: 2rem;
  width: 600px;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Title = styled.h1`
  color: white;
  font-family: 'Press Start 2P', cursive;
  font-size: 1.5rem;
  text-align: center;
  margin-bottom: 2rem;
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.label`
  color: white;
  font-family: 'Press Start 2P', cursive;
  font-size: 0.8rem;
`;

const Input = styled.input`
  padding: 0.5rem;
  font-family: 'Press Start 2P', cursive;
  font-size: 0.8rem;
  background-color: #333;
  color: white;
  border: 2px solid #666;
  border-radius: 5px;
`;

const Select = styled.select`
  padding: 0.5rem;
  font-family: 'Press Start 2P', cursive;
  font-size: 0.8rem;
  background-color: #333;
  color: white;
  border: 2px solid #666;
  border-radius: 5px;
`;

const Button = styled.button`
  padding: 1rem;
  font-family: 'Press Start 2P', cursive;
  font-size: 1rem;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 2rem;
  
  &:hover {
    background-color: #45a049;
  }
`;

const CharacterCreation = ({ setGameState }) => {
  const [character, setCharacter] = useState({
    name: '',
    gender: 'male',
    skinColor: '#FFD700',
    hairColor: '#000000',
    hairStyle: 'short'
  });

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setGameState(prev => ({
      ...prev,
      character
    }));
    navigate('/home');
  };

  return (
    <CreationContainer>
      <CreationBox>
        <Title>Crear Personaje</Title>
        <form onSubmit={handleSubmit}>
          <InputGroup>
            <Label>Nombre:</Label>
            <Input
              type="text"
              value={character.name}
              onChange={(e) => setCharacter({...character, name: e.target.value})}
              maxLength={12}
              required
            />
          </InputGroup>

          <InputGroup>
            <Label>Género:</Label>
            <Select
              value={character.gender}
              onChange={(e) => setCharacter({...character, gender: e.target.value})}
            >
              <option value="male">Masculino</option>
              <option value="female">Femenino</option>
            </Select>
          </InputGroup>

          <InputGroup>
            <Label>Color de Piel:</Label>
            <Input
              type="color"
              value={character.skinColor}
              onChange={(e) => setCharacter({...character, skinColor: e.target.value})}
            />
          </InputGroup>

          <InputGroup>
            <Label>Color de Cabello:</Label>
            <Input
              type="color"
              value={character.hairColor}
              onChange={(e) => setCharacter({...character, hairColor: e.target.value})}
            />
          </InputGroup>

          <InputGroup>
            <Label>Estilo de Cabello:</Label>
            <Select
              value={character.hairStyle}
              onChange={(e) => setCharacter({...character, hairStyle: e.target.value})}
            >
              <option value="short">Corto</option>
              <option value="medium">Medio</option>
              <option value="long">Largo</option>
              <option value="spiky">Puntiagudo</option>
            </Select>
          </InputGroup>

          <Button type="submit">Crear Personaje</Button>
        </form>
      </CreationBox>
    </CreationContainer>
  );
};

export default CharacterCreation; 