import { createContext, useContext } from 'react';
import useGameStore from '../stores/gameStore';

const GameContext = createContext();

export const GameProvider = ({ children }) => {
    const gameState = useGameStore();

    return (
        <GameContext.Provider value={gameState}>
            {children}
        </GameContext.Provider>
    );
};

export const useGame = () => {
    const context = useContext(GameContext);
    if (!context) {
        throw new Error('useGame debe ser usado dentro de un GameProvider');
    }
    return context;
}; 