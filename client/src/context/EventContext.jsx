import React, { createContext, useContext, useState, useEffect } from 'react';
import { eventService } from '../services/eventService';

const EventContext = createContext();

export const EventProvider = ({ children }) => {
  const [activeEvents, setActiveEvents] = useState([]);
  const [dailyEvents, setDailyEvents] = useState([]);
  const [weeklyEvents, setWeeklyEvents] = useState([]);
  const [monthlyEvents, setMonthlyEvents] = useState([]);
  const [specialEvents, setSpecialEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadEvents = async () => {
    try {
      setLoading(true);
      const [
        active,
        daily,
        weekly,
        monthly,
        special
      ] = await Promise.all([
        eventService.getActiveEvents(),
        eventService.getDailyEvents(),
        eventService.getWeeklyEvents(),
        eventService.getMonthlyEvents(),
        eventService.getSpecialEvents()
      ]);

      setActiveEvents(active);
      setDailyEvents(daily);
      setWeeklyEvents(weekly);
      setMonthlyEvents(monthly);
      setSpecialEvents(special);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const participateInEvent = async (eventId) => {
    try {
      const result = await eventService.participateInEvent(eventId);
      await loadEvents(); // Recargar eventos después de participar
      return result;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const claimEventRewards = async (eventId) => {
    try {
      const result = await eventService.claimEventRewards(eventId);
      await loadEvents(); // Recargar eventos después de reclamar recompensas
      return result;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  useEffect(() => {
    loadEvents();
    // Recargar eventos cada hora
    const interval = setInterval(loadEvents, 3600000);
    return () => clearInterval(interval);
  }, []);

  return (
    <EventContext.Provider
      value={{
        activeEvents,
        dailyEvents,
        weeklyEvents,
        monthlyEvents,
        specialEvents,
        loading,
        error,
        participateInEvent,
        claimEventRewards,
        refreshEvents: loadEvents
      }}
    >
      {children}
    </EventContext.Provider>
  );
};

export const useEvents = () => {
  const context = useContext(EventContext);
  if (!context) {
    throw new Error('useEvents debe ser usado dentro de un EventProvider');
  }
  return context;
}; 