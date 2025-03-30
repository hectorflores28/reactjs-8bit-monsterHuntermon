import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import useGameStore from '../stores/gameStore';

const MenuContainer = styled.div`
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
    font-size: 2.5rem;
    margin-bottom: ${props => props.theme.spacing.xl};
    text-shadow: 0 0 10px ${props => props.theme.colors.primary};
`;

const MenuButton = styled(motion.button)`
    width: 300px;
    padding: ${props => props.theme.spacing.md};
    margin: ${props => props.theme.spacing.sm};
    font-size: 1.2rem;
    background-color: ${props => props.theme.colors.surface};
    color: ${props => props.theme.colors.text};
    border: 2px solid ${props => props.theme.colors.primary};
    border-radius: 8px;
    cursor: pointer;
    font-family: ${props => props.theme.fonts.primary};
    
    &:hover {
        background-color: ${props => props.theme.colors.primary};
        color: ${props => props.theme.colors.background};
    }
    
    &:disabled {
        opacity: 0.5;
        cursor: not-allowed;
    }
`;

const PlayerStats = styled.div`
    position: absolute;
    top: ${props => props.theme.spacing.md};
    right: ${props => props.theme.spacing.md};
    background-color: ${props => props.theme.colors.surface};
    padding: ${props => props.theme.spacing.md};
    border-radius: 8px;
    border: 2px solid ${props => props.theme.colors.primary};
    
    h3 {
        color: ${props => props.theme.colors.secondary};
        margin-bottom: ${props => props.theme.spacing.sm};
    }
    
    p {
        margin: ${props => props.theme.spacing.xs} 0;
    }
`;

const MainMenu = () => {
    const navigate = useNavigate();
    const { jugador } = useGameStore();

    const handleMenuOption = (ruta) => {
        navigate(ruta);
    };

    return (
        <MenuContainer>
            {jugador && (
                <PlayerStats>
                    <h3>{jugador.nombre}</h3>
                    <p>Nivel: {jugador.nivel}</p>
                    <p>Experiencia: {jugador.experiencia}</p>
                </PlayerStats>
            )}
            
            <Title
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5 }}
            >
                Menú Principal
            </Title>
            
            <MenuButton
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleMenuOption('/hunt')}
            >
                Ir de Caza
            </MenuButton>
            
            <MenuButton
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleMenuOption('/inventory')}
            >
                Inventario
            </MenuButton>
            
            <MenuButton
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleMenuOption('/character')}
            >
                Personaje
            </MenuButton>
            
            <MenuButton
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleMenuOption('/shop')}
            >
                Tienda
            </MenuButton>
        </MenuContainer>
    );
};

export default MainMenu; 