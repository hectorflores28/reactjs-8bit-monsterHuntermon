import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const InventoryContainer = styled.div`
  position: fixed;
  bottom: 20px;
  left: 20px;
  background: rgba(0, 0, 0, 0.8);
  padding: 15px;
  border-radius: 10px;
  border: 2px solid #ffd700;
  font-family: 'Press Start 2P', cursive;
  color: white;
  z-index: 1000;
  max-width: 300px;
`;

const InventoryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
  margin-top: 10px;
`;

const ItemSlot = styled.div`
  width: 50px;
  height: 50px;
  background: rgba(255, 255, 255, 0.1);
  border: 2px solid #666;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  position: relative;

  &:hover {
    border-color: #ffd700;
  }
`;

const ItemCount = styled.span`
  position: absolute;
  bottom: 2px;
  right: 2px;
  font-size: 10px;
  color: white;
`;

const ItemTooltip = styled.div`
  position: absolute;
  bottom: 100%;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(0, 0, 0, 0.9);
  padding: 10px;
  border: 2px solid #ffd700;
  border-radius: 5px;
  font-size: 12px;
  white-space: nowrap;
  display: none;
  z-index: 1001;

  ${ItemSlot}:hover & {
    display: block;
  }
`;

const InventorySystem = () => {
  const [inventory, setInventory] = useState({
    potions: { count: 3, type: 'consumible' },
    materials: { count: 5, type: 'material' },
    weapons: { count: 1, type: 'equipamiento' }
  });

  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    // Cargar inventario guardado
    const savedInventory = localStorage.getItem('inventoryData');
    if (savedInventory) {
      setInventory(JSON.parse(savedInventory));
    }
  }, []);

  useEffect(() => {
    // Guardar inventario cuando cambie
    localStorage.setItem('inventoryData', JSON.stringify(inventory));
  }, [inventory]);

  const handleItemClick = (itemName) => {
    setSelectedItem(itemName);
  };

  const useItem = (itemName) => {
    if (inventory[itemName] && inventory[itemName].count > 0) {
      setInventory(prev => ({
        ...prev,
        [itemName]: {
          ...prev[itemName],
          count: prev[itemName].count - 1
        }
      }));
    }
  };

  return (
    <InventoryContainer>
      <h3>INVENTARIO</h3>
      <InventoryGrid>
        {Object.entries(inventory).map(([itemName, itemData]) => (
          <ItemSlot 
            key={itemName}
            onClick={() => handleItemClick(itemName)}
          >
            {itemName.charAt(0).toUpperCase()}
            <ItemCount>{itemData.count}</ItemCount>
            <ItemTooltip>
              {itemName.toUpperCase()}
              <br />
              Tipo: {itemData.type}
            </ItemTooltip>
          </ItemSlot>
        ))}
      </InventoryGrid>
    </InventoryContainer>
  );
};

export default InventorySystem; 