import React, { createContext, useContext } from 'react';
import { useGameStore } from '../stores/gameStore';

const GameContext = createContext();

export const useGame = () => useContext(GameContext);

export const GameProvider = ({ children }) => {
    const gameStore = useGameStore();

    return (
        <GameContext.Provider value={gameStore}>
            {children}
        </GameContext.Provider>
    );
}; 