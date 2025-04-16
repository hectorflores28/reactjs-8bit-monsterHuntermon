import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { comboService } from '../services/comboService';

const ComboContext = createContext();

export const ComboProvider = ({ children }) => {
  const [availableCombos, setAvailableCombos] = useState([]);
  const [comboProgress, setComboProgress] = useState({});
  const [currentCombo, setCurrentCombo] = useState([]);
  const [clickStartTime, setClickStartTime] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadCombos = async () => {
    try {
      setLoading(true);
      const [combos, progress] = await Promise.all([
        comboService.getAvailableCombos(),
        comboService.getComboProgress()
      ]);
      setAvailableCombos(combos);
      setComboProgress(progress);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleClickStart = useCallback(() => {
    setClickStartTime(Date.now());
  }, []);

  const handleClickEnd = useCallback((event) => {
    if (!clickStartTime) return;

    const clickType = comboService.detectClickType(event, clickStartTime);
    setCurrentCombo(prev => [...prev, clickType]);
    setClickStartTime(null);
  }, [clickStartTime]);

  const checkCombo = useCallback(() => {
    const comboString = currentCombo.join('-');
    const matchingCombo = availableCombos.find(
      combo => combo.pattern === comboString
    );

    if (matchingCombo) {
      registerCombo(matchingCombo.id);
    }

    // Limpiar combo después de un tiempo
    setTimeout(() => {
      setCurrentCombo([]);
    }, 2000);
  }, [currentCombo, availableCombos]);

  const registerCombo = async (comboId) => {
    try {
      await comboService.registerCombo({ comboId });
      await loadCombos(); // Recargar combos y progreso
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    loadCombos();
  }, []);

  useEffect(() => {
    if (currentCombo.length > 0) {
      checkCombo();
    }
  }, [currentCombo, checkCombo]);

  return (
    <ComboContext.Provider
      value={{
        availableCombos,
        comboProgress,
        currentCombo,
        loading,
        error,
        handleClickStart,
        handleClickEnd,
        registerCombo
      }}
    >
      {children}
    </ComboContext.Provider>
  );
};

export const useCombo = () => {
  const context = useContext(ComboContext);
  if (!context) {
    throw new Error('useCombo debe ser usado dentro de un ComboProvider');
  }
  return context;
}; 