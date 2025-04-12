import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const CreateRoomContainer = styled.div`
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
  width: 80%;
  max-width: 400px;
  background: rgba(0, 0, 0, 0.8);
  border: 2px solid #4a4a4a;
  border-radius: 10px;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.label`
  color: #ffd700;
  font-size: 0.8rem;
`;

const Input = styled.input`
  background: #333;
  border: 2px solid #4a4a4a;
  border-radius: 5px;
  padding: 0.5rem;
  color: white;
  font-family: 'Press Start 2P', cursive;
  font-size: 0.8rem;

  &:focus {
    outline: none;
    border-color: #ffd700;
  }
`;

const Select = styled.select`
  background: #333;
  border: 2px solid #4a4a4a;
  border-radius: 5px;
  padding: 0.5rem;
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

  &:hover {
    background: #ffed4a;
  }
`;

const CreateRoom = () => {
  const navigate = useNavigate();
  const [roomName, setRoomName] = useState('');
  const [maxPlayers, setMaxPlayers] = useState(4);
  const [difficulty, setDifficulty] = useState('normal');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Lógica para crear sala
    navigate('/multiplayer');
  };

  return (
    <CreateRoomContainer>
      <Title>CREAR SALA</Title>
      <Form onSubmit={handleSubmit}>
        <InputGroup>
          <Label>NOMBRE DE LA SALA</Label>
          <Input
            type="text"
            value={roomName}
            onChange={(e) => setRoomName(e.target.value)}
            maxLength={20}
            required
          />
        </InputGroup>

        <InputGroup>
          <Label>JUGADORES MÁXIMOS</Label>
          <Select
            value={maxPlayers}
            onChange={(e) => setMaxPlayers(Number(e.target.value))}
          >
            <option value={2}>2 JUGADORES</option>
            <option value={3}>3 JUGADORES</option>
            <option value={4}>4 JUGADORES</option>
          </Select>
        </InputGroup>

        <InputGroup>
          <Label>DIFICULTAD</Label>
          <Select
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
          >
            <option value="facil">FÁCIL</option>
            <option value="normal">NORMAL</option>
            <option value="dificil">DIFÍCIL</option>
          </Select>
        </InputGroup>

        <Button
          type="submit"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          CREAR
        </Button>
      </Form>
    </CreateRoomContainer>
  );
};

export default CreateRoom; 