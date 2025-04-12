import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const CraftingContainer = styled.div`
  position: fixed;
  bottom: 20px;
  right: 20px;
  background: rgba(0, 0, 0, 0.8);
  padding: 15px;
  border-radius: 10px;
  border: 2px solid #ffd700;
  font-family: 'Press Start 2P', cursive;
  color: white;
  z-index: 1000;
  max-width: 300px;
`;

const RecipeList = styled.div`
  margin-top: 10px;
`;

const RecipeItem = styled.div`
  margin-bottom: 10px;
  padding: 10px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 5px;
  border: 1px solid ${props => props.canCraft ? '#2ecc71' : '#666'};
  cursor: ${props => props.canCraft ? 'pointer' : 'not-allowed'};
`;

const RecipeTitle = styled.div`
  font-size: 12px;
  margin-bottom: 5px;
  color: ${props => props.canCraft ? '#2ecc71' : 'white'};
`;

const RecipeMaterials = styled.div`
  font-size: 10px;
  color: #ccc;
`;

const RecipeResult = styled.div`
  font-size: 10px;
  color: #f1c40f;
  margin-top: 5px;
`;

const CraftButton = styled.button`
  background: ${props => props.canCraft ? '#2ecc71' : '#666'};
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 5px;
  cursor: ${props => props.canCraft ? 'pointer' : 'not-allowed'};
  font-family: 'Press Start 2P', cursive;
  font-size: 10px;
  margin-top: 5px;
`;

const CraftingSystem = () => {
  const [recipes, setRecipes] = useState([
    {
      id: 1,
      name: 'Poción de Vida',
      materials: [
        { name: 'hierba', count: 2 },
        { name: 'miel', count: 1 }
      ],
      result: { name: 'potion', count: 1 }
    },
    {
      id: 2,
      name: 'Espada Mejorada',
      materials: [
        { name: 'hierro', count: 3 },
        { name: 'madera', count: 2 }
      ],
      result: { name: 'weapon', count: 1 }
    }
  ]);

  const [inventory, setInventory] = useState({
    hierba: 5,
    miel: 3,
    hierro: 2,
    madera: 4
  });

  useEffect(() => {
    // Cargar inventario guardado
    const savedInventory = localStorage.getItem('inventoryData');
    if (savedInventory) {
      setInventory(JSON.parse(savedInventory));
    }
  }, []);

  const canCraftRecipe = (recipe) => {
    return recipe.materials.every(material => 
      inventory[material.name] >= material.count
    );
  };

  const craftItem = (recipe) => {
    if (canCraftRecipe(recipe)) {
      // Restar materiales
      const newInventory = { ...inventory };
      recipe.materials.forEach(material => {
        newInventory[material.name] -= material.count;
      });

      // Agregar resultado
      if (!newInventory[recipe.result.name]) {
        newInventory[recipe.result.name] = 0;
      }
      newInventory[recipe.result.name] += recipe.result.count;

      setInventory(newInventory);
      localStorage.setItem('inventoryData', JSON.stringify(newInventory));
    }
  };

  return (
    <CraftingContainer>
      <h3>CRAFTING</h3>
      <RecipeList>
        {recipes.map(recipe => {
          const canCraft = canCraftRecipe(recipe);
          return (
            <RecipeItem key={recipe.id} canCraft={canCraft}>
              <RecipeTitle canCraft={canCraft}>
                {recipe.name}
              </RecipeTitle>
              <RecipeMaterials>
                Materiales:
                {recipe.materials.map(material => (
                  <div key={material.name}>
                    {material.name}: {inventory[material.name] || 0}/{material.count}
                  </div>
                ))}
              </RecipeMaterials>
              <RecipeResult>
                Resultado: {recipe.result.count} {recipe.result.name}
              </RecipeResult>
              <CraftButton
                canCraft={canCraft}
                onClick={() => craftItem(recipe)}
              >
                CRAFT
              </CraftButton>
            </RecipeItem>
          );
        })}
      </RecipeList>
    </CraftingContainer>
  );
};

export default CraftingSystem; 