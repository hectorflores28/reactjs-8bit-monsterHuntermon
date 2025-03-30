import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import styled from 'styled-components';
import { ThemeProvider } from 'styled-components';
import { GameProvider } from './context/GameContext';
import { createGlobalStyle } from 'styled-components';
import Home from './pages/Home';
import MainMenu from './components/MainMenu';
import WeaponList from './components/WeaponList';
import Hunt from './pages/Hunt';
import Combat from './pages/Combat';
import theme from './styles/theme';

// Componentes
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Register from './pages/Register';
import Game from './pages/Game';
import Profile from './pages/Profile';

const GlobalStyle = createGlobalStyle`
    @import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap');
    
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    body {
        background-color: ${props => props.theme.colors.background};
        color: ${props => props.theme.colors.text};
        font-family: ${props => props.theme.fonts.primary};
        line-height: 1.6;
        overflow-x: hidden;
    }

    button {
        cursor: pointer;
        font-family: ${props => props.theme.fonts.primary};
    }
`;

const AppContainer = styled.div`
    min-height: 100vh;
    background-color: ${props => props.theme.colors.background};
    color: ${props => props.theme.colors.text};
    font-family: ${props => props.theme.fonts.primary};
`;

function App() {
    return (
        <ThemeProvider theme={theme}>
            <GlobalStyle />
            <GameProvider>
                <Router>
                    <AppContainer>
                        <Navbar />
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/login" element={<Login />} />
                            <Route path="/register" element={<Register />} />
                            <Route path="/game" element={<Game />} />
                            <Route path="/profile" element={<Profile />} />
                            <Route path="/menu" element={<MainMenu />} />
                            <Route path="/hunt" element={<Hunt />} />
                            <Route path="/combat" element={<Combat />} />
                        </Routes>
                    </AppContainer>
                </Router>
            </GameProvider>
        </ThemeProvider>
    );
}

export default App; 