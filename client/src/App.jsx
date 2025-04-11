import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import styled from 'styled-components';
import { GameProvider } from './context/GameContext';

// Componentes
import Home from './pages/Home';
import Game from './pages/Game';

const AppContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  background-color: ${props => props.theme.colors.background};
  color: ${props => props.theme.colors.text};
  display: flex;
  flex-direction: column;
`;

const MainContent = styled.main`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

function App() {
  return (
    <GameProvider>
      <Router>
        <AppContainer>
          <MainContent>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/game" element={<Game />} />
            </Routes>
          </MainContent>
        </AppContainer>
      </Router>
    </GameProvider>
  );
}

export default App; 