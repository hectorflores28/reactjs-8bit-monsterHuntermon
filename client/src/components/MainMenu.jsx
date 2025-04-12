import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import useGameStore from '../stores/gameStore';

const MenuContainer = styled.div`
    width: 100%;
    height: 100%;
    background: url('/assets/menu-background.png') no-repeat center center;
    background-size: cover;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const MenuBox = styled.div`
    background-color: rgba(0, 0, 0, 0.8);
    border: 4px solid #fff;
    border-radius: 10px;
    padding: 2rem;
    width: 300px;
`;

const MenuItem = styled.div`
    color: white;
    font-size: 1rem;
    padding: 1rem;
    cursor: pointer;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    
    &:hover {
        background-color: rgba(255, 255, 255, 0.1);
        transform: scale(1.05);
    }
    
    &::before {
        content: '▶';
        margin-right: 1rem;
        opacity: ${props => props.selected ? 1 : 0};
    }
`;

const Title = styled(motion.h1)`
    font-size: 2.5rem;
    margin-bottom: ${props => props.theme.spacing.xl};
    text-shadow: 0 0 10px ${props => props.theme.colors.primary};
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
    const [selectedItem, setSelectedItem] = useState(0);
    const navigate = useNavigate();
    const { jugador } = useGameStore();

    const menuItems = [
        { text: 'Nueva Partida', action: () => navigate('/character-creation') },
        { text: 'Continuar', action: () => console.log('Continuar') },
        { text: 'Configuración', action: () => console.log('Configuración') },
        { text: 'Créditos', action: () => console.log('Créditos') },
        { text: 'Salir', action: () => window.close() }
    ];

    const handleKeyDown = (e) => {
        switch(e.key) {
            case 'ArrowUp':
                setSelectedItem(prev => (prev > 0 ? prev - 1 : menuItems.length - 1));
                break;
            case 'ArrowDown':
                setSelectedItem(prev => (prev < menuItems.length - 1 ? prev + 1 : 0));
                break;
            case 'Enter':
                menuItems[selectedItem].action();
                break;
            default:
                break;
        }
    };

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [selectedItem]);

    return (
        <MenuContainer>
            {jugador && (
                <PlayerStats>
                    <h3>{jugador.nombre}</h3>
                    <p>Nivel: {jugador.nivel}</p>
                    <p>Experiencia: {jugador.experiencia}</p>
                </PlayerStats>
            )}
            
            <MenuBox>
                {menuItems.map((item, index) => (
                    <MenuItem
                        key={index}
                        selected={selectedItem === index}
                        onClick={() => {
                            setSelectedItem(index);
                            item.action();
                        }}
                    >
                        {item.text}
                    </MenuItem>
                ))}
            </MenuBox>
        </MenuContainer>
    );
};

export default MainMenu; 