import { useState, useEffect } from 'react';
import { saveGameData, loadGameData, syncGameData } from '../services/cloudSaveService';

export const useCloudSave = (userId) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [lastSync, setLastSync] = useState(null);

  const save = async (gameData) => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await saveGameData(userId, gameData);
      setLastSync(new Date());
      return response;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const load = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await loadGameData(userId);
      setLastSync(new Date(response.data.lastSync));
      return response.data;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const sync = async (localData) => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await syncGameData(userId, localData);
      setLastSync(new Date(response.data.lastSync));
      return response.data;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  // Sincronización automática cada 5 minutos
  useEffect(() => {
    const interval = setInterval(async () => {
      if (lastSync) {
        const localData = JSON.parse(localStorage.getItem('gameData') || '{}');
        await sync(localData);
      }
    }, 5 * 60 * 1000);

    return () => clearInterval(interval);
  }, [lastSync]);

  return {
    save,
    load,
    sync,
    isLoading,
    error,
    lastSync
  };
}; 