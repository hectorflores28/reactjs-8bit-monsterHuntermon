import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import useGameStore from '../stores/gameStore';
import axios from 'axios';

const HuntContainer = styled.div`
    width: 100vw;
    height: 100vh;
    background-color: ${props => props.theme.colors.background};
    color: ${props => props.theme.colors.text};
    display: grid;
    grid-template-columns: 1fr 2fr;
    font-family: ${props => props.theme.fonts.primary};
`;

const MonsterList = styled.div`
    padding: ${props => props.theme.spacing.md};
    background-color: ${props => props.theme.colors.surface};
    border-right: 2px solid ${props => props.theme.colors.border};
    overflow-y: auto;
`;

const MonsterCard = styled(motion.div)`
    background-color: ${props => props.theme.colors.background};
    padding: ${props => props.theme.spacing.md};
    margin-bottom: ${props => props.theme.spacing.md};
    border-radius: 8px;
    border: 2px solid ${props => props.theme.colors.primary};
    cursor: pointer;
    
    &:hover {
        border-color: ${props => props.theme.colors.secondary};
    }
`;

const MonsterDetails = styled.div`
    padding: ${props => props.theme.spacing.md};
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const MonsterSprite = styled(motion.div)`
    width: 200px;
    height: 200px;
    background-color: ${props => props.theme.colors.primary};
    border-radius: 50%;
    margin: ${props => props.theme.spacing.xl} 0;
`;

const HuntButton = styled(motion.button)`
    padding: ${props => props.theme.spacing.md} ${props => props.theme.spacing.xl};
    font-size: 1.2rem;
    background-color: ${props => props.theme.colors.primary};
    color: ${props => props.theme.colors.text};
    border: none;
    border-radius: 8px;
    cursor: pointer;
    margin-top: ${props => props.theme.spacing.xl};
    font-family: ${props => props.theme.fonts.primary};
    
    &:hover {
        background-color: ${props => props.theme.colors.secondary};
        color: ${props => props.theme.colors.background};
    }
    
    &:disabled {
        background-color: ${props => props.theme.colors.surface};
        cursor: not-allowed;
    }
`;

const StatBar = styled.div`
    width: 100%;
    height: 20px;
    background-color: ${props => props.theme.colors.background};
    border: 2px solid ${props => props.theme.colors.border};
    margin: ${props => props.theme.spacing.sm} 0;
    
    &::before {
        content: '';
        display: block;
        height: 100%;
        width: ${props => props.value}%;
        background-color: ${props => props.color};
        transition: width 0.3s ease;
    }
`;

const Hunt = () => {
    const navigate = useNavigate();
    const { jugador, iniciarCombate } = useGameStore();
    const [monstruos, setMonstruos] = useState([]);
    const [monstruoSeleccionado, setMonstruoSeleccionado] = useState(null);
    const [cargando, setCargando] = useState(true);

    useEffect(() => {
        const cargarMonstruos = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/monstruos');
                setMonstruos(response.data);
            } catch (error) {
                console.error('Error al cargar monstruos:', error);
            } finally {
                setCargando(false);
            }
        };

        cargarMonstruos();
    }, []);

    useEffect(() => {
        if (!jugador) {
            navigate('/');
        }
    }, [jugador, navigate]);

    const handleMonstruoSelect = (monstruo) => {
        setMonstruoSeleccionado(monstruo);
    };

    const handleHunt = () => {
        if (monstruoSeleccionado) {
            iniciarCombate(monstruoSeleccionado);
            navigate('/combat');
        }
    };

    if (cargando) {
        return <div>Cargando...</div>;
    }

    return (
        <HuntContainer>
            <MonsterList>
                <h2>Monstruos Disponibles</h2>
                {monstruos.map((monstruo) => (
                    <MonsterCard
                        key={monstruo.id}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => handleMonstruoSelect(monstruo)}
                        style={{
                            borderColor: monstruoSeleccionado?.id === monstruo.id
                                ? '#ffd700'
                                : '#4a90e2'
                        }}
                    >
                        <h3>{monstruo.nombre}</h3>
                        <p>Tipo: {monstruo.tipo}</p>
                        <p>Nivel: {monstruo.nivel}</p>
                        <p>Recompensa: {monstruo.recompensa_base}</p>
                    </MonsterCard>
                ))}
            </MonsterList>

            <MonsterDetails>
                {monstruoSeleccionado ? (
                    <>
                        <h2>{monstruoSeleccionado.nombre}</h2>
                        <MonsterSprite
                            animate={{
                                scale: [1, 1.1, 1],
                                rotate: [0, 5, -5, 0]
                            }}
                            transition={{
                                duration: 2,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}
                        />
                        <p>{monstruoSeleccionado.descripcion}</p>
                        <StatBar
                            value={(monstruoSeleccionado.vida_maxima / 1000) * 100}
                            color="#4CAF50"
                        />
                        <p>Vida: {monstruoSeleccionado.vida_maxima}</p>
                        <HuntButton
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={handleHunt}
                        >
                            Iniciar Caza
                        </HuntButton>
                    </>
                ) : (
                    <h2>Selecciona un monstruo para cazar</h2>
                )}
            </MonsterDetails>
        </HuntContainer>
    );
};

export default Hunt; 