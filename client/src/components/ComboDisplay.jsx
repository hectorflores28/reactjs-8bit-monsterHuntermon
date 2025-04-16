import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useCombo } from '../context/ComboContext';

const ComboContainer = styled.div`
  position: fixed;
  bottom: 20px;
  left: 20px;
  background: rgba(0, 0, 0, 0.8);
  border: 2px solid #fff;
  padding: 20px;
  font-family: 'Press Start 2P', cursive;
  color: #fff;
  z-index: 1000;
`;

const ComboTitle = styled.h2`
  font-size: 16px;
  margin-bottom: 20px;
  text-align: center;
  text-transform: uppercase;
  color: #ff0;
`;

const ComboList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const ComboItem = styled(motion.li)`
  background: rgba(0, 0, 0, 0.5);
  border: 1px solid #fff;
  margin-bottom: 10px;
  padding: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ComboName = styled.span`
  font-size: 12px;
`;

const ComboPattern = styled.span`
  font-size: 10px;
  color: #888;
`;

const ComboProgress = styled.div`
  width: 100px;
  height: 10px;
  background: #333;
  border: 1px solid #fff;
  margin-left: 10px;
`;

const ProgressBar = styled(motion.div)`
  height: 100%;
  background: #ff0;
`;

const CurrentCombo = styled.div`
  position: fixed;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(0, 0, 0, 0.8);
  border: 2px solid #fff;
  padding: 10px;
  font-family: 'Press Start 2P', cursive;
  color: #fff;
  z-index: 1000;
  text-align: center;
`;

const ComboKey = styled.span`
  display: inline-block;
  margin: 0 5px;
  padding: 5px;
  background: #333;
  border: 1px solid #fff;
  font-size: 12px;
  color: ${props => props.type === 'heavy' ? '#ff0' : '#fff'};
`;

export const ComboDisplay = () => {
  const {
    availableCombos,
    comboProgress,
    currentCombo,
    loading,
    error
  } = useCombo();

  if (loading) {
    return <ComboContainer>Cargando combos...</ComboContainer>;
  }

  if (error) {
    return <ComboContainer>Error: {error}</ComboContainer>;
  }

  return (
    <>
      <CurrentCombo>
        {currentCombo.map((type, index) => (
          <ComboKey key={index} type={type}>
            {type === 'heavy' ? 'H' : 'L'}
          </ComboKey>
        ))}
      </CurrentCombo>

      <ComboContainer>
        <ComboTitle>Combos Disponibles</ComboTitle>
        <ComboList>
          {availableCombos.map((combo) => (
            <ComboItem
              key={combo.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div>
                <ComboName>{combo.name}</ComboName>
                <ComboPattern>
                  {combo.pattern.split('-').map((type, index) => (
                    <span key={index}>
                      {type === 'heavy' ? 'H' : 'L'}
                      {index < combo.pattern.split('-').length - 1 ? ' - ' : ''}
                    </span>
                  ))}
                </ComboPattern>
              </div>
              <ComboProgress>
                <ProgressBar
                  initial={{ width: 0 }}
                  animate={{
                    width: `${(comboProgress[combo.id] || 0) * 100}%`
                  }}
                  transition={{ duration: 0.5 }}
                />
              </ComboProgress>
            </ComboItem>
          ))}
        </ComboList>
      </ComboContainer>
    </>
  );
}; 