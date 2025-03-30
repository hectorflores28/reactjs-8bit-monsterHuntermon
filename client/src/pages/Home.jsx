import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import useGameStore from '../stores/gameStore';

const HomeContainer = styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: ${props => props.theme.colors.background};
    color: ${props => props.theme.colors.text};
    font-family: ${props => props.theme.fonts.primary};
`;

const Title = styled(motion.h1)`
    font-size: 3rem;
    margin-bottom: ${props => props.theme.spacing.xl};
    text-shadow: 0 0 10px ${props => props.theme.colors.primary};
`;

const StartButton = styled(motion.button)`
    padding: ${props => props.theme.spacing.md} ${props => props.theme.spacing.xl};
    font-size: 1.2rem;
    background-color: ${props => props.theme.colors.primary};
    color: ${props => props.theme.colors.text};
    border: none;
    border-radius: 8px;
    cursor: pointer;
    font-family: ${props => props.theme.fonts.primary};
    
    &:hover {
        background-color: ${props => props.theme.colors.secondary};
        color: ${props => props.theme.colors.background};
    }
`;

const NameInput = styled.input`
    padding: ${props => props.theme.spacing.sm};
    font-size: 1rem;
    margin: ${props => props.theme.spacing.md};
    font-family: ${props => props.theme.fonts.primary};
    text-align: center;
    background-color: ${props => props.theme.colors.surface};
    color: ${props => props.theme.colors.text};
    border: 2px solid ${props => props.theme.colors.primary};
    border-radius: 4px;
`;

const Home = () => {
    const [nombre, setNombre] = useState('');
    const navigate = useNavigate();
    const { crearJugador, cargarJugador } = useGameStore();

    const handleStart = async () => {
        if (!nombre.trim()) return;
        
        try {
            const jugador = await crearJugador(nombre);
            await cargarJugador(jugador.id);
            navigate('/menu');
        } catch (error) {
            console.error('Error al crear jugador:', error);
        }
    };

    return (
        <HomeContainer>
            <Title
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5 }}
            >
                Monster Hunter
            </Title>
            
            <NameInput
                type="text"
                placeholder="Ingresa tu nombre"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                maxLength={20}
            />
            
            <StartButton
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleStart}
            >
                Iniciar Aventura
            </StartButton>
        </HomeContainer>
    );
};

export default Home; 