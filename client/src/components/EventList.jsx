import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useEvents } from '../context/EventContext';

const EventContainer = styled.div`
  background: rgba(0, 0, 0, 0.8);
  border: 2px solid #fff;
  padding: 20px;
  margin: 20px;
  font-family: 'Press Start 2P', cursive;
  color: #fff;
`;

const EventTitle = styled.h2`
  font-size: 16px;
  margin-bottom: 20px;
  text-align: center;
  text-transform: uppercase;
  color: #ff0;
`;

const EventList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const EventItem = styled(motion.li)`
  background: rgba(0, 0, 0, 0.5);
  border: 1px solid #fff;
  margin-bottom: 10px;
  padding: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.1);
    transform: scale(1.02);
  }
`;

const EventName = styled.span`
  font-size: 12px;
`;

const EventTime = styled.span`
  font-size: 10px;
  color: #888;
`;

const EventReward = styled.span`
  font-size: 10px;
  color: #ff0;
`;

const EventButton = styled.button`
  background: #333;
  border: 2px solid #fff;
  color: #fff;
  padding: 5px 10px;
  font-family: 'Press Start 2P', cursive;
  font-size: 10px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: #444;
    transform: scale(1.05);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const EventSection = ({ title, events, onParticipate, onClaimRewards }) => {
  return (
    <EventContainer>
      <EventTitle>{title}</EventTitle>
      <EventList>
        {events.map((event) => (
          <EventItem
            key={event.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div>
              <EventName>{event.name}</EventName>
              <EventTime>{event.timeRemaining}</EventTime>
            </div>
            <div>
              <EventReward>{event.reward}</EventReward>
              {event.canParticipate && (
                <EventButton onClick={() => onParticipate(event.id)}>
                  Participar
                </EventButton>
              )}
              {event.canClaimRewards && (
                <EventButton onClick={() => onClaimRewards(event.id)}>
                  Reclamar
                </EventButton>
              )}
            </div>
          </EventItem>
        ))}
      </EventList>
    </EventContainer>
  );
};

export const EventListComponent = () => {
  const {
    activeEvents,
    dailyEvents,
    weeklyEvents,
    monthlyEvents,
    specialEvents,
    loading,
    error,
    participateInEvent,
    claimEventRewards
  } = useEvents();

  if (loading) {
    return <EventContainer>Cargando eventos...</EventContainer>;
  }

  if (error) {
    return <EventContainer>Error: {error}</EventContainer>;
  }

  return (
    <div>
      <EventSection
        title="Eventos Activos"
        events={activeEvents}
        onParticipate={participateInEvent}
        onClaimRewards={claimEventRewards}
      />
      <EventSection
        title="Eventos Diarios"
        events={dailyEvents}
        onParticipate={participateInEvent}
        onClaimRewards={claimEventRewards}
      />
      <EventSection
        title="Eventos Semanales"
        events={weeklyEvents}
        onParticipate={participateInEvent}
        onClaimRewards={claimEventRewards}
      />
      <EventSection
        title="Eventos Mensuales"
        events={monthlyEvents}
        onParticipate={participateInEvent}
        onClaimRewards={claimEventRewards}
      />
      <EventSection
        title="Eventos Especiales"
        events={specialEvents}
        onParticipate={participateInEvent}
        onClaimRewards={claimEventRewards}
      />
    </div>
  );
}; 