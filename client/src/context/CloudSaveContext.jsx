import React, { createContext, useContext, useState, useEffect } from 'react';
import { cloudSaveService } from '../services/cloudSaveService';

const CloudSaveContext = createContext();

export const CloudSaveProvider = ({ children }) => {
  const [isSyncing, setIsSyncing] = useState(false);
  const [lastSync, setLastSync] = useState(null);
  const [error, setError] = useState(null);
  const [syncStatus, setSyncStatus] = useState('idle');

  const saveGameState = async (gameState) => {
    try {
      setIsSyncing(true);
      setSyncStatus('saving');
      await cloudSaveService.saveGameState(gameState);
      setLastSync(new Date());
      setSyncStatus('success');
    } catch (err) {
      setError(err.message);
      setSyncStatus('error');
    } finally {
      setIsSyncing(false);
    }
  };

  const loadGameState = async () => {
    try {
      setIsSyncing(true);
      setSyncStatus('loading');
      const gameState = await cloudSaveService.loadGameState();
      setSyncStatus('success');
      return gameState;
    } catch (err) {
      setError(err.message);
      setSyncStatus('error');
      throw err;
    } finally {
      setIsSyncing(false);
    }
  };

  const syncGameState = async (gameState) => {
    try {
      setIsSyncing(true);
      setSyncStatus('syncing');
      await cloudSaveService.syncGameState(gameState);
      setLastSync(new Date());
      setSyncStatus('success');
    } catch (err) {
      setError(err.message);
      setSyncStatus('error');
    } finally {
      setIsSyncing(false);
    }
  };

  const checkSyncStatus = async () => {
    try {
      const status = await cloudSaveService.checkSyncStatus();
      setSyncStatus(status);
      return status;
    } catch (err) {
      setError(err.message);
      setSyncStatus('error');
      throw err;
    }
  };

  useEffect(() => {
    // Verificar el estado de sincronización cada 5 minutos
    const interval = setInterval(checkSyncStatus, 300000);
    return () => clearInterval(interval);
  }, []);

  return (
    <CloudSaveContext.Provider
      value={{
        isSyncing,
        lastSync,
        error,
        syncStatus,
        saveGameState,
        loadGameState,
        syncGameState,
        checkSyncStatus
      }}
    >
      {children}
    </CloudSaveContext.Provider>
  );
};

export const useCloudSave = () => {
  const context = useContext(CloudSaveContext);
  if (!context) {
    throw new Error('useCloudSave debe ser usado dentro de un CloudSaveProvider');
  }
  return context;
}; 