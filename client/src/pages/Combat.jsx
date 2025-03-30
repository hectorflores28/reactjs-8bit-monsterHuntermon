import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import useGameStore from '../stores/gameStore';

const CombatContainer = styled.div`
    width: 100vw;
    height: 100vh;
    background-color: #1a1a1a;
    color: #fff;
    display: grid;
    grid-template-columns: 1fr 2fr 1fr;
    font-family: 'Press Start 2P', cursive;
`;

const PlayerStats = styled.div`
    padding: 1rem;
    background-color: #2a2a2a;
    border-right: 2px solid #4a90e2;
`;

const CombatArea = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: relative;
`;

const MonsterStats = styled.div`
    padding: 1rem;
    background-color: #2a2a2a;
    border-left: 2px solid #4a90e2;
`;

const HealthBar = styled.div`
    width: 100%;
    height: 20px;
    background-color: #333;
    border: 2px solid #666;
    margin: 0.5rem 0;
    
    &::before {
        content: '';
        display: block;
        height: 100%;
        width: ${props => props.health}%;
        background-color: ${props => props.health > 50 ? '#4CAF50' : props.health > 25 ? '#FFC107' : '#F44336'};
        transition: width 0.3s ease;
    }
`;

const ActionButton = styled(motion.button)`
    padding: 0.5rem 1rem;
    margin: 0.5rem;
    background-color: #4a90e2;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-family: 'Press Start 2P', cursive;
    
    &:hover {
        background-color: #357abd;
    }
    
    &:disabled {
        background-color: #666;
        cursor: not-allowed;
    }
`;

const MonsterSprite = styled(motion.div)`
    width: 200px;
    height: 200px;
    background-color: #4a90e2;
    border-radius: 50%;
    margin: 2rem 0;
`;

const Combat = () => {
    const navigate = useNavigate();
    const { monstruoActual, finalizarCombate } = useGameStore();
    const [playerHealth, setPlayerHealth] = useState(100);
    const [monsterHealth, setMonsterHealth] = useState(100);
    const [isAttacking, setIsAttacking] = useState(false);

    useEffect(() => {
        if (!monstruoActual) {
            navigate('/');
        }
    }, [monstruoActual, navigate]);

    const handleAttack = async () => {
        if (isAttacking) return;
        
        setIsAttacking(true);
        
        // Simular ataque del jugador
        const damage = Math.floor(Math.random() * 20) + 10;
        setMonsterHealth(prev => Math.max(0, prev - damage));
        
        // Simular ataque del monstruo
        setTimeout(() => {
            const monsterDamage = Math.floor(Math.random() * 15) + 5;
            setPlayerHealth(prev => Math.max(0, prev - monsterDamage));
            
            // Verificar fin del combate
            if (monsterHealth <= 0 || playerHealth <= 0) {
                const resultado = monsterHealth <= 0 ? 'éxito' : 'fracaso';
                const recompensa = resultado === 'éxito' ? monstruoActual.recompensa_base : 0;
                finalizarCombate(resultado, 5, recompensa);
            }
            
            setIsAttacking(false);
        }, 1000);
    };

    if (!monstruoActual) return null;

    return (
        <CombatContainer>
            <PlayerStats>
                <h3>Jugador</h3>
                <HealthBar health={playerHealth} />
                <p>HP: {playerHealth}/100</p>
            </PlayerStats>

            <CombatArea>
                <MonsterSprite
                    animate={{
                        scale: isAttacking ? [1, 1.2, 1] : 1,
                        rotate: isAttacking ? [0, 10, -10, 0] : 0
                    }}
                    transition={{ duration: 0.5 }}
                />
                <h2>{monstruoActual.nombre}</h2>
                <HealthBar health={monsterHealth} />
                <p>HP: {monsterHealth}/100</p>
                <ActionButton
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleAttack}
                    disabled={isAttacking || playerHealth <= 0 || monsterHealth <= 0}
                >
                    Atacar
                </ActionButton>
            </CombatArea>

            <MonsterStats>
                <h3>Monstruo</h3>
                <p>Tipo: {monstruoActual.tipo}</p>
                <p>Nivel: {monstruoActual.nivel}</p>
                <p>Recompensa: {monstruoActual.recompensa_base}</p>
            </MonsterStats>
        </CombatContainer>
    );
};

export default Combat; 