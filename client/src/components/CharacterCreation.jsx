import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import CharacterPreview from './CharacterPreview';

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  background: rgba(0, 0, 0, 0.8);
  border-radius: 15px;
  border: 2px solid #ffd700;
`;

const Title = styled.h1`
  color: #ffd700;
  text-align: center;
  margin-bottom: 30px;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
`;

const Form = styled.form`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Label = styled.label`
  color: #fff;
  font-size: 1.1rem;
`;

const Input = styled.input`
  padding: 10px;
  border-radius: 5px;
  border: 2px solid #ffd700;
  background: rgba(255, 255, 255, 0.1);
  color: #fff;
  font-size: 1rem;

  &:focus {
    outline: none;
    box-shadow: 0 0 5px #ffd700;
  }
`;

const Select = styled.select`
  padding: 10px;
  border-radius: 5px;
  border: 2px solid #ffd700;
  background: rgba(255, 255, 255, 0.1);
  color: #fff;
  font-size: 1rem;

  &:focus {
    outline: none;
    box-shadow: 0 0 5px #ffd700;
  }
`;

const ColorInput = styled.input`
  width: 100%;
  height: 40px;
  padding: 0;
  border: none;
  background: transparent;
  cursor: pointer;

  &::-webkit-color-swatch-wrapper {
    padding: 0;
  }

  &::-webkit-color-swatch {
    border: 2px solid #ffd700;
    border-radius: 5px;
  }
`;

const Button = styled.button`
  grid-column: 1 / -1;
  padding: 15px;
  background: #ffd700;
  color: #000;
  border: none;
  border-radius: 5px;
  font-size: 1.1rem;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: #ffc107;
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(0);
  }
`;

const CharacterCreation = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    gender: 'masculino',
    characterClass: 'cazador',
    hairColor: '#8B4513',
    clothesColor: '#4169E1'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem('character', JSON.stringify(formData));
    navigate('/weapon-selection');
  };

  return (
    <Container>
      <Title>Creación de Personaje</Title>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label>Nombre</Label>
          <Input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </FormGroup>

        <FormGroup>
          <Label>Género</Label>
          <Select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
          >
            <option value="masculino">Masculino</option>
            <option value="femenino">Femenino</option>
          </Select>
        </FormGroup>

        <FormGroup>
          <Label>Clase</Label>
          <Select
            name="characterClass"
            value={formData.characterClass}
            onChange={handleChange}
          >
            <option value="cazador">Cazador</option>
            <option value="artillero">Artillero</option>
          </Select>
        </FormGroup>

        <FormGroup>
          <Label>Color de Pelo</Label>
          <ColorInput
            type="color"
            name="hairColor"
            value={formData.hairColor}
            onChange={handleChange}
          />
        </FormGroup>

        <FormGroup>
          <Label>Color de Ropa</Label>
          <ColorInput
            type="color"
            name="clothesColor"
            value={formData.clothesColor}
            onChange={handleChange}
          />
        </FormGroup>

        <CharacterPreview
          gender={formData.gender}
          characterClass={formData.characterClass}
          hairColor={formData.hairColor}
          clothesColor={formData.clothesColor}
        />

        <Button type="submit">Crear Personaje</Button>
      </Form>
    </Container>
  );
};

export default CharacterCreation; 