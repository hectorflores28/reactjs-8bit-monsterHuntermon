import React from 'react';
import styled from 'styled-components';
import { useCloudSave } from '../context/CloudSaveContext';

const StatusContainer = styled.div`
  position: fixed;
  bottom: 20px;
  right: 20px;
  background: rgba(0, 0, 0, 0.8);
  border: 2px solid #fff;
  padding: 10px;
  font-family: 'Press Start 2P', cursive;
  font-size: 12px;
  color: #fff;
  z-index: 1000;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  border-radius: 5px;
  text-align: center;
`;

const StatusText = styled.div`
  margin-bottom: 5px;
  text-transform: uppercase;
`;

const StatusIcon = styled.div`
  width: 16px;
  height: 16px;
  display: inline-block;
  margin-right: 5px;
  background-color: ${props => {
    switch (props.status) {
      case 'success':
        return '#00ff00';
      case 'error':
        return '#ff0000';
      case 'syncing':
      case 'saving':
      case 'loading':
        return '#ffff00';
      default:
        return '#808080';
    }
  }};
  border: 2px solid #fff;
  border-radius: 50%;
`;

const LastSync = styled.div`
  font-size: 10px;
  color: #888;
  margin-top: 5px;
`;

export const CloudSaveStatus = () => {
  const { syncStatus, lastSync, isSyncing } = useCloudSave();

  const getStatusText = () => {
    switch (syncStatus) {
      case 'success':
        return 'Guardado';
      case 'error':
        return 'Error';
      case 'syncing':
        return 'Sincronizando';
      case 'saving':
        return 'Guardando';
      case 'loading':
        return 'Cargando';
      default:
        return 'Listo';
    }
  };

  const formatLastSync = (date) => {
    if (!date) return 'Nunca';
    return `Última sincronización: ${date.toLocaleTimeString()}`;
  };

  return (
    <StatusContainer>
      <StatusText>
        <StatusIcon status={syncStatus} />
        {getStatusText()}
      </StatusText>
      {lastSync && <LastSync>{formatLastSync(lastSync)}</LastSync>}
    </StatusContainer>
  );
}; 