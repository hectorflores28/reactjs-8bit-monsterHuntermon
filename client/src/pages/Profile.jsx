import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import CharacterCustomization from '../components/CharacterCustomization';
import CraftingInterface from '../components/CraftingInterface';

const ProfileContainer = styled.div`
  padding: 2rem;
  color: #fff;
  min-height: 100vh;
  background: linear-gradient(135deg, #1a1a1a 0%, #2a2a2a 100%);
`;

const ProfileTitle = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 2rem;
  text-align: center;
  color: #ffd700;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
`;

const TabsContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 2rem;
`;

const Tab = styled(motion.button)`
  background: ${props => props.active ? '#ffd700' : 'rgba(255, 255, 255, 0.1)'};
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  color: ${props => props.active ? '#000' : '#fff'};
  cursor: pointer;
  font-size: 1.1rem;
  font-weight: bold;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }
`;

const ContentContainer = styled(motion.div)`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  background: rgba(0, 0, 0, 0.5);
  border-radius: 15px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
`;

const Profile = () => {
  const [activeTab, setActiveTab] = useState('customization');

  return (
    <ProfileContainer>
      <ProfileTitle>Perfil del Cazador</ProfileTitle>
      <TabsContainer>
        <Tab
          active={activeTab === 'customization'}
          onClick={() => setActiveTab('customization')}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Personalización
        </Tab>
        <Tab
          active={activeTab === 'crafting'}
          onClick={() => setActiveTab('crafting')}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Fabricación
        </Tab>
      </TabsContainer>
      <ContentContainer
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {activeTab === 'customization' ? (
          <CharacterCustomization />
        ) : (
          <CraftingInterface />
        )}
      </ContentContainer>
    </ProfileContainer>
  );
};

export default Profile; 