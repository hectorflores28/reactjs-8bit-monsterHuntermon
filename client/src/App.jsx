import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import IntroScreen from './components/IntroScreen';
import Menu from './components/Menu';
import CharacterCreation from './components/CharacterCreation';
import HomeScene from './components/HomeScene';
import WeaponSelection from './components/WeaponSelection';
import FirstHunt from './components/FirstHunt';
import Settings from './components/Settings';
import Instructions from './components/Instructions';
import Credits from './components/Credits';
import './styles/App.css';

const App = () => (
  <Router>
    <div className="app-container">
      <Routes>
        <Route path="/" element={<IntroScreen />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/character-creation" element={<CharacterCreation />} />
        <Route path="/home-scene" element={<HomeScene />} />
        <Route path="/weapon-selection" element={<WeaponSelection />} />
        <Route path="/first-hunt" element={<FirstHunt />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/instructions" element={<Instructions />} />
        <Route path="/credits" element={<Credits />} />
      </Routes>
    </div>
  </Router>
);

export default App; 