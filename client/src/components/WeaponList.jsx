import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import axios from 'axios';

const WeaponContainer = styled.div`
    padding: ${props => props.theme.spacing.md};
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: ${props => props.theme.spacing.md};
`;

const WeaponCard = styled(motion.div)`
    background-color: ${props => props.theme.colors.surface};
    border: 2px solid ${props => props.theme.colors.primary};
    border-radius: 8px;
    padding: ${props => props.theme.spacing.md};
    cursor: pointer;
    transition: all 0.3s ease;
    
    &:hover {
        border-color: ${props => props.theme.colors.secondary};
        transform: translateY(-5px);
    }
`;

const WeaponImage = styled.div`
    width: 100%;
    height: 150px;
    background-color: ${props => props.theme.colors.background};
    border-radius: 4px;
    margin-bottom: ${props => props.theme.spacing.sm};
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: ${props => props.theme.fonts.retro};
    font-size: 2rem;
`;

const WeaponInfo = styled.div`
    h3 {
        color: ${props => props.theme.colors.primary};
        margin-bottom: ${props => props.theme.spacing.xs};
    }
    
    p {
        color: ${props => props.theme.colors.text};
        margin-bottom: ${props => props.theme.spacing.xs};
    }
`;

const WeaponStats = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: ${props => props.theme.spacing.xs};
    margin-top: ${props => props.theme.spacing.sm};
    
    span {
        font-size: 0.9rem;
        color: ${props => props.theme.colors.text};
    }
`;

const ElementBadge = styled.span`
    background-color: ${props => {
        switch(props.elemento) {
            case 'fuego': return '#ff4444';
            case 'hielo': return '#44aaff';
            case 'rayo': return '#ffff44';
            case 'veneno': return '#44ff44';
            default: return '#888888';
        }
    }};
    color: white;
    padding: 2px 8px;
    border-radius: 4px;
    font-size: 0.8rem;
    margin-left: ${props => props.theme.spacing.xs};
`;

const WeaponList = ({ onSelectWeapon }) => {
    const [armas, setArmas] = useState([]);
    const [cargando, setCargando] = useState(true);

    useEffect(() => {
        const cargarArmas = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/armas');
                setArmas(response.data);
            } catch (error) {
                console.error('Error al cargar armas:', error);
            } finally {
                setCargando(false);
            }
        };

        cargarArmas();
    }, []);

    if (cargando) {
        return <div>Cargando armas...</div>;
    }

    return (
        <WeaponContainer>
            {armas.map((arma) => (
                <WeaponCard
                    key={arma.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => onSelectWeapon(arma)}
                >
                    <WeaponImage>
                        {arma.tipo === 'espada' && '⚔️'}
                        {arma.tipo === 'hacha' && '🪓'}
                        {arma.tipo === 'lanza' && '🔱'}
                        {arma.tipo === 'arco' && '🏹'}
                        {arma.tipo === 'martillo' && '🔨'}
                        {arma.tipo === 'escudo' && '🛡️'}
                        {arma.tipo === 'dual' && '⚔️⚔️'}
                        {arma.tipo === 'ballesta' && '🏹'}
                    </WeaponImage>
                    <WeaponInfo>
                        <h3>
                            {arma.nombre}
                            {arma.elemento && <ElementBadge elemento={arma.elemento}>{arma.elemento}</ElementBadge>}
                        </h3>
                        <p>{arma.descripcion}</p>
                        <WeaponStats>
                            <span>Tipo: {arma.tipo}</span>
                            <span>Daño: {arma.daño_base}</span>
                        </WeaponStats>
                    </WeaponInfo>
                </WeaponCard>
            ))}
        </WeaponContainer>
    );
};

export default WeaponList; 