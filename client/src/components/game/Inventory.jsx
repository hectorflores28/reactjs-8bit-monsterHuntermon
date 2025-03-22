import React, { useState } from 'react';
import styled from 'styled-components';
import { useGameStore } from '../../stores/gameStore';

const InventoryContainer = styled.div`
  position: fixed;
  top: 80px;
  left: 20px;
  background-color: ${props => props.theme.colors.surface};
  padding: ${props => props.theme.spacing.md};
  border: 2px solid ${props => props.theme.colors.border};
  border-radius: 8px;
  min-width: 300px;
  max-height: calc(100vh - 100px);
  overflow-y: auto;
`;

const Title = styled.h2`
  color: ${props => props.theme.colors.primary};
  margin-bottom: ${props => props.theme.spacing.md};
  font-size: 1.2rem;
  text-transform: uppercase;
`;

const ItemGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: ${props => props.theme.spacing.sm};
`;

const ItemSlot = styled.div`
  width: 64px;
  height: 64px;
  background-color: ${props => props.theme.colors.background};
  border: 2px solid ${props => props.theme.colors.border};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  position: relative;
  transition: all 0.2s ease;

  &:hover {
    border-color: ${props => props.theme.colors.primary};
    transform: scale(1.05);
  }
`;

const ItemImage = styled.img`
  width: 48px;
  height: 48px;
  object-fit: contain;
`;

const ItemQuantity = styled.div`
  position: absolute;
  bottom: 2px;
  right: 2px;
  background-color: ${props => props.theme.colors.background};
  color: ${props => props.theme.colors.text};
  font-size: 0.8rem;
  padding: 2px 4px;
  border: 1px solid ${props => props.theme.colors.border};
`;

const ItemDetails = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: ${props => props.theme.colors.surface};
  padding: ${props => props.theme.spacing.md};
  border: 2px solid ${props => props.theme.colors.border};
  border-radius: 8px;
  min-width: 300px;
  z-index: 1000;
`;

const ItemName = styled.h3`
  color: ${props => props.theme.colors.primary};
  margin-bottom: ${props => props.theme.spacing.sm};
`;

const ItemDescription = styled.p`
  color: ${props => props.theme.colors.text};
  font-size: 0.9rem;
  margin-bottom: ${props => props.theme.spacing.md};
`;

const ItemStats = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: ${props => props.theme.spacing.sm};
  margin-bottom: ${props => props.theme.spacing.md};
`;

const StatItem = styled.div`
  background-color: ${props => props.theme.colors.background};
  padding: ${props => props.theme.spacing.sm};
  text-align: center;
`;

const ActionButtons = styled.div`
  display: flex;
  gap: ${props => props.theme.spacing.sm};
`;

const Button = styled.button`
  flex: 1;
  background-color: ${props => props.theme.colors.background};
  border: 2px solid ${props => props.theme.colors.border};
  color: ${props => props.theme.colors.text};
  padding: ${props => props.theme.spacing.sm};
  cursor: pointer;
  transition: all 0.2s ease;
  text-transform: uppercase;
  font-size: 0.8rem;

  &:hover {
    background-color: ${props => props.theme.colors.primary};
  }
`;

const Inventory = () => {
  const { player, equipItem, removeItem } = useGameStore();
  const [selectedItem, setSelectedItem] = useState(null);

  const handleItemClick = (item) => {
    setSelectedItem(item);
  };

  const handleEquip = () => {
    if (selectedItem) {
      equipItem(selectedItem.id);
      setSelectedItem(null);
    }
  };

  const handleDrop = () => {
    if (selectedItem) {
      removeItem(selectedItem.id);
      setSelectedItem(null);
    }
  };

  return (
    <>
      <InventoryContainer>
        <Title>Inventario</Title>
        <ItemGrid>
          {player.inventory.map((item) => (
            <ItemSlot
              key={item.id}
              onClick={() => handleItemClick(item)}
            >
              <ItemImage src={item.sprite} alt={item.name} />
              {item.quantity > 1 && (
                <ItemQuantity>{item.quantity}</ItemQuantity>
              )}
            </ItemSlot>
          ))}
        </ItemGrid>
      </InventoryContainer>

      {selectedItem && (
        <ItemDetails>
          <ItemName>{selectedItem.name}</ItemName>
          <ItemDescription>{selectedItem.description}</ItemDescription>
          <ItemStats>
            {Object.entries(selectedItem.stats || {}).map(([stat, value]) => (
              <StatItem key={stat}>
                <div>{stat}</div>
                <div>{value}</div>
              </StatItem>
            ))}
          </ItemStats>
          <ActionButtons>
            <Button onClick={handleEquip}>Equipar</Button>
            <Button onClick={handleDrop}>Tirar</Button>
          </ActionButtons>
        </ItemDetails>
      )}
    </>
  );
};

export default Inventory; 