import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import { motion } from 'framer-motion';
import { useGameStore } from '../stores/gameStore';

const pulseAnimation = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`;

const HomeContainer = styled.div`
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: ${props => props.theme.colors.background};
    color: ${props => props.theme.colors.text};
    position: relative;
    overflow: hidden;
    padding: 20px;
`;

const Title = styled(motion.h1)`
    font-size: 3rem;
    margin-bottom: 2rem;
    text-align: center;
    text-shadow: 0 0 10px ${props => props.theme.colors.primary};
    letter-spacing: 4px;

    @media (max-width: 768px) {
        font-size: 2rem;
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
    position: relative;
    overflow: hidden;
    transition: all 0.3s ease;
    
    &:hover {
        background-color: ${props => props.theme.colors.secondary};
        transform: translateY(-2px);
        box-shadow: 0 5px 15px rgba(0,0,0,0.3);
    }

    &:before {
        content: '';
        position: absolute;
        top: -50%;
        left: -50%;
        width: 200%;
        height: 200%;
        background: linear-gradient(
            45deg,
            transparent,
            rgba(255,255,255,0.1),
            transparent
        );
        transform: rotate(45deg);
        animation: ${pulseAnimation} 2s infinite;
    }
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

    &:focus {
        outline: none;
        border-color: ${props => props.theme.colors.secondary};
        box-shadow: 0 0 10px ${props => props.theme.colors.primary};
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

    const handleStart = async () => {
        if (!playerName.trim()) {
            setError('Por favor, ingresa tu nombre para comenzar');
            return;
        }

        try {
            const jugador = await crearJugador(playerName);
            navigate('/game');
        } catch (error) {
            setError('Error al crear el jugador. Intenta de nuevo.');
        }
    };

    return (
        <HomeContainer>
            <Title
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, type: "spring" }}
            >
                Monster Hanter
            </Title>

            <InputName
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                placeholder="Ingresa tu nombre"
                value={playerName}
                onChange={(e) => setPlayerName(e.target.value)}
                maxLength={20}
            />

            <StartButton
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.5 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleStart}
            >
                Comenzar Aventura
            </StartButton>

            {error && <ErrorText>{error}</ErrorText>}
        </HomeContainer>
    );
};

export default Home; 