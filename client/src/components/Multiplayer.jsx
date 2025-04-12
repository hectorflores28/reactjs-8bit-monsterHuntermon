import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const MultiplayerContainer = styled.div`
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

const RoomList = styled.div`
  width: 80%;
  max-width: 600px;
  background: rgba(0, 0, 0, 0.8);
  border: 2px solid #4a4a4a;
  border-radius: 10px;
  padding: 1rem;
  margin-bottom: 2rem;
`;

const RoomItem = styled(motion.div)`
  padding: 1rem;
  border-bottom: 1px solid #4a4a4a;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;

  &:hover {
    background: rgba(255, 215, 0, 0.1);
  }
`;

const RoomInfo = styled.div`
  font-size: 0.8rem;
`;

const RoomPlayers = styled.div`
  color: #ffd700;
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
  margin: 0.5rem;

  &:hover {
    background: #ffed4a;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
`;

const Multiplayer = () => {
  const navigate = useNavigate();
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulación de carga de salas
    setTimeout(() => {
      setRooms([
        { id: 1, name: 'SALA DE PRUEBA', players: 2, maxPlayers: 4 },
        { id: 2, name: 'CAZADORES EXPERTOS', players: 3, maxPlayers: 4 },
        { id: 3, name: 'NUEVOS CAZADORES', players: 1, maxPlayers: 4 }
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  const handleCreateRoom = () => {
    // Lógica para crear sala
    navigate('/multiplayer/create');
  };

  const handleJoinRoom = (roomId) => {
    // Lógica para unirse a sala
    navigate(`/multiplayer/room/${roomId}`);
  };

  return (
    <MultiplayerContainer>
      <Title>MODO MULTIJUGADOR</Title>
      
      {loading ? (
        <div>CARGANDO SALAS...</div>
      ) : (
        <>
          <RoomList>
            {rooms.map(room => (
              <RoomItem
                key={room.id}
                onClick={() => handleJoinRoom(room.id)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <RoomInfo>
                  <div>{room.name}</div>
                  <RoomPlayers>
                    {room.players}/{room.maxPlayers} JUGADORES
                  </RoomPlayers>
                </RoomInfo>
                <div>→</div>
              </RoomItem>
            ))}
          </RoomList>

          <ButtonGroup>
            <Button
              onClick={handleCreateRoom}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              CREAR SALA
            </Button>
            <Button
              onClick={() => navigate('/')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              VOLVER
            </Button>
          </ButtonGroup>
        </>
      )}
    </MultiplayerContainer>
  );
};

export default Multiplayer; 