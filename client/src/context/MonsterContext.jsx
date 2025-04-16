import React, { createContext, useContext, useState, useEffect } from 'react';
import { monsterService } from '../services/monsterService';

const MonsterContext = createContext();

export const MonsterProvider = ({ children }) => {
  const [monsters, setMonsters] = useState([]);
  const [selectedMonster, setSelectedMonster] = useState(null);
  const [monsterDetails, setMonsterDetails] = useState(null);
  const [attackPatterns, setAttackPatterns] = useState([]);
  const [weaknesses, setWeaknesses] = useState([]);
  const [rewards, setRewards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadMonsters = async () => {
    try {
      setLoading(true);
      const allMonsters = await monsterService.getAllMonsters();
      setMonsters(allMonsters);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const loadMonsterDetails = async (monsterId) => {
    try {
      setLoading(true);
      const [
        details,
        patterns,
        monsterWeaknesses,
        monsterRewards
      ] = await Promise.all([
        monsterService.getMonsterDetails(monsterId),
        monsterService.getMonsterAttackPatterns(monsterId),
        monsterService.getMonsterWeaknesses(monsterId),
        monsterService.getMonsterRewards(monsterId)
      ]);

      setMonsterDetails(details);
      setAttackPatterns(patterns);
      setWeaknesses(monsterWeaknesses);
      setRewards(monsterRewards);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const selectMonster = async (monsterId) => {
    setSelectedMonster(monsterId);
    await loadMonsterDetails(monsterId);
  };

  const registerDefeat = async (monsterId, data) => {
    try {
      const result = await monsterService.registerMonsterDefeat(monsterId, data);
      await loadMonsters(); // Recargar lista de monstruos
      return result;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  useEffect(() => {
    loadMonsters();
  }, []);

  return (
    <MonsterContext.Provider
      value={{
        monsters,
        selectedMonster,
        monsterDetails,
        attackPatterns,
        weaknesses,
        rewards,
        loading,
        error,
        selectMonster,
        registerDefeat
      }}
    >
      {children}
    </MonsterContext.Provider>
  );
};

export const useMonsters = () => {
  const context = useContext(MonsterContext);
  if (!context) {
    throw new Error('useMonsters debe ser usado dentro de un MonsterProvider');
  }
  return context;
}; 