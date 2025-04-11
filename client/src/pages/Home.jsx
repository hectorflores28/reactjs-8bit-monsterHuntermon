import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useGameStore } from '../stores/gameStore';

const HomeContainer = styled.div`
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: ${props => props.theme.colors.background};
    color: ${props => props.theme.colors.text};
    padding: 20px;
`;

const Title = styled(motion.h1)`
    font-size: 3rem;
    margin-bottom: 2rem;
    text-align: center;
    text-shadow: 0 0 10px ${props => props.theme.colors.primary};
`;

const InputName = styled(motion.input)`
    padding: 0.8rem;
    font-size: 0.8rem;
    background-color: ${props => props.theme.colors.surface};
    color: ${props => props.theme.colors.text};
    border: 2px solid ${props => props.theme.colors.primary};
    border-radius: 8px;
    margin-bottom: 2rem;
    font-family: 'Press Start 2P', cursive;
    text-align: center;
    width: 100%;
    max-width: 400px;
    height: 50px;

    &::placeholder {
        font-size: 0.6rem;
        opacity: 0.7;
    }
`;

const StartButton = styled(motion.button)`
    padding: 1rem 2rem;
    font-size: 1rem;
    background-color: ${props => props.theme.colors.primary};
    color: ${props => props.theme.colors.text};
    border: none;
    border-radius: 12px;
    cursor: pointer;
    font-family: 'Press Start 2P', cursive;
    
    &:hover {
        background-color: ${props => props.theme.colors.secondary};
    }
`;

const ErrorText = styled.p`
    color: ${props => props.theme.colors.error};
    margin-top: 1rem;
    font-size: 0.8rem;
    text-align: center;
`;

const Home = () => {
    const navigate = useNavigate();
    const [playerName, setPlayerName] = useState('');
    const [error, setError] = useState('');
    const { crearJugador } = useGameStore();

    const handleStart = () => {
        if (!playerName.trim()) {
            setError('Por favor, ingresa tu nombre para comenzar');
            return;
        }

        try {
            crearJugador(playerName);
            navigate('/game');
        } catch (error) {
            setError('Error al crear el jugador. Intenta de nuevo.');
            console.error('Error:', error);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleStart();
        }
    };

    return (
        <HomeContainer>
            <Title
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
            >
                Monster Hunter
            </Title>

            <InputName
                placeholder="Ingresa tu nombre"
                value={playerName}
                onChange={(e) => setPlayerName(e.target.value)}
                onKeyPress={handleKeyPress}
                maxLength={20}
            />

            <StartButton
                onClick={handleStart}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
            >
                Comenzar Aventura
            </StartButton>

            {error && <ErrorText>{error}</ErrorText>}
        </HomeContainer>
    );
};

export default Home; 