import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const CharacterCreationContainer = styled.div`
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

const Form = styled.form`
  background: rgba(0, 0, 0, 0.8);
  padding: 2rem;
  border-radius: 10px;
  border: 2px solid #ffd700;
  width: 80%;
  max-width: 500px;
`;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  color: #ffd700;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.5rem;
  background: #333;
  border: 2px solid #4a4a4a;
  border-radius: 5px;
  color: white;
  font-family: 'Press Start 2P', cursive;
  font-size: 0.8rem;

  &:focus {
    outline: none;
    border-color: #ffd700;
  }
`;

const Select = styled.select`
  width: 100%;
  padding: 0.5rem;
  background: #333;
  border: 2px solid #4a4a4a;
  border-radius: 5px;
  color: white;
  font-family: 'Press Start 2P', cursive;
  font-size: 0.8rem;

  &:focus {
    outline: none;
    border-color: #ffd700;
  }
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
  width: 100%;

  &:hover {
    background: #ffed4a;
  }
`;

const CharacterCreation = () => {
  const navigate = useNavigate();
  const [character, setCharacter] = useState({
    name: '',
    gender: 'masculino',
    class: 'cazador',
    hairColor: '#000000',
    clothesColor: '#000000'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem('character', JSON.stringify(character));
    navigate('/weapon-selection');
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCharacter(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <CharacterCreationContainer>
      <Title>CREACIÓN DE PERSONAJE</Title>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label>NOMBRE</Label>
          <Input
            type="text"
            name="name"
            value={character.name}
            onChange={handleChange}
            required
            maxLength={12}
          />
        </FormGroup>

        <FormGroup>
          <Label>GÉNERO</Label>
          <Select
            name="gender"
            value={character.gender}
            onChange={handleChange}
          >
            <option value="masculino">MASCULINO</option>
            <option value="femenino">FEMENINO</option>
          </Select>
        </FormGroup>

        <FormGroup>
          <Label>CLASE</Label>
          <Select
            name="class"
            value={character.class}
            onChange={handleChange}
          >
            <option value="cazador">CAZADOR</option>
            <option value="cazadora">CAZADORA</option>
            <option value="artillero">ARTILLERO</option>
            <option value="artillera">ARTILLERA</option>
          </Select>
        </FormGroup>

        <FormGroup>
          <Label>COLOR DE PELO</Label>
          <Input
            type="color"
            name="hairColor"
            value={character.hairColor}
            onChange={handleChange}
          />
        </FormGroup>

        <FormGroup>
          <Label>COLOR DE ROPA</Label>
          <Input
            type="color"
            name="clothesColor"
            value={character.clothesColor}
            onChange={handleChange}
          />
        </FormGroup>

        <Button
          type="submit"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          CONTINUAR
        </Button>
      </Form>
    </CharacterCreationContainer>
  );
};

export default CharacterCreation; 