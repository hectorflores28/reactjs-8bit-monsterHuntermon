import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import useCraftingStore from '../stores/craftingStore';

const CraftingContainer = styled(motion.div)`
  padding: 2rem;
  background: rgba(0, 0, 0, 0.8);
  border-radius: 10px;
  color: #fff;
`;

const Tabs = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
`;

const Tab = styled(motion.button)`
  background: ${props => props.active ? '#ffd700' : 'rgba(255, 255, 255, 0.1)'};
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  color: ${props => props.active ? '#000' : '#fff'};
  cursor: pointer;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1rem;
`;

const RecipeCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.1);
  padding: 1rem;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.2);
    transform: translateY(-2px);
  }

  &.available {
    border: 2px solid #00ff00;
  }

  &.unavailable {
    opacity: 0.5;
  }
`;

const MaterialList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 1rem 0;
`;

const MaterialItem = styled.li`
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
  font-size: 0.9rem;
`;

const QueueItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem;
  background: rgba(255, 255, 255, 0.1);
  margin-bottom: 0.5rem;
  border-radius: 3px;
`;

const ProgressBar = styled.div`
  width: 100%;
  height: 4px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 2px;
  overflow: hidden;
`;

const Progress = styled.div`
  width: ${props => props.progress}%;
  height: 100%;
  background: #ffd700;
  transition: width 0.3s ease;
`;

const CraftingInterface = () => {
  const { recipes, materials, craftingQueue, loading, error, loadCraftingData, craftItem, checkRecipeAvailability } = useCraftingStore();
  const [activeTab, setActiveTab] = useState('crafting');

  useEffect(() => {
    loadCraftingData();
  }, [loadCraftingData]);

  const handleCraft = async (recipeId) => {
    if (!checkRecipeAvailability(recipeId)) return;
    try {
      await craftItem(recipeId);
    } catch (error) {
      console.error('Error al fabricar:', error);
    }
  };

  if (loading) return <div>Cargando...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <CraftingContainer
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Tabs>
        <Tab
          active={activeTab === 'crafting'}
          onClick={() => setActiveTab('crafting')}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Fabricación
        </Tab>
        <Tab
          active={activeTab === 'queue'}
          onClick={() => setActiveTab('queue')}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Cola de Fabricación
        </Tab>
      </Tabs>

      {activeTab === 'crafting' ? (
        <Grid>
          {recipes.map(recipe => (
            <RecipeCard
              key={recipe.id}
              className={checkRecipeAvailability(recipe.id) ? 'available' : 'unavailable'}
              onClick={() => handleCraft(recipe.id)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <h3>{recipe.name}</h3>
              <p>{recipe.description}</p>
              <MaterialList>
                {recipe.requirements.map(req => {
                  const material = materials.find(m => m.id === req.materialId);
                  return (
                    <MaterialItem key={req.materialId}>
                      <span>{material?.name || 'Material desconocido'}</span>
                      <span>
                        {material?.quantity || 0}/{req.quantity}
                      </span>
                    </MaterialItem>
                  );
                })}
              </MaterialList>
            </RecipeCard>
          ))}
        </Grid>
      ) : (
        <div>
          {craftingQueue.map(job => (
            <QueueItem key={job.id}>
              <div>
                <h4>{job.recipeName}</h4>
                <p>Tiempo restante: {Math.ceil(job.remainingTime / 1000)}s</p>
              </div>
              <ProgressBar>
                <Progress progress={(job.totalTime - job.remainingTime) / job.totalTime * 100} />
              </ProgressBar>
            </QueueItem>
          ))}
        </div>
      )}
    </CraftingContainer>
  );
};

export default CraftingInterface; 