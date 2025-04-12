import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import StartScreen from './components/StartScreen';
import Menu from './components/Menu';
import CharacterCreation from './components/CharacterCreation';
import WeaponSelection from './components/WeaponSelection';
import FirstHunt from './components/FirstHunt';
import Settings from './components/Settings';
import Instructions from './components/Instructions';
import Credits from './components/Credits';
import Multiplayer from './components/Multiplayer';
import CreateRoom from './components/CreateRoom';
import './styles/App.css';

function App() {
  const [showSettings, setShowSettings] = useState(false);
  const [showInstructions, setShowInstructions] = useState(false);
  const [showCredits, setShowCredits] = useState(false);

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<StartScreen />} />
          <Route path="/menu" element={<Menu 
            onSettingsClick={() => setShowSettings(true)}
            onInstructionsClick={() => setShowInstructions(true)}
            onCreditsClick={() => setShowCredits(true)}
          />} />
          <Route path="/character-creation" element={<CharacterCreation />} />
          <Route path="/weapon-selection" element={<WeaponSelection />} />
          <Route path="/first-hunt" element={<FirstHunt />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/instructions" element={<Instructions />} />
          <Route path="/credits" element={<Credits />} />
          <Route path="/multiplayer" element={<Multiplayer />} />
          <Route path="/multiplayer/create" element={<CreateRoom />} />
        </Routes>

        {showSettings && (
          <Settings onClose={() => setShowSettings(false)} />
        )}

        {showInstructions && (
          <Instructions onClose={() => setShowInstructions(false)} />
        )}

        {showCredits && (
          <Credits onClose={() => setShowCredits(false)} />
        )}
      </div>
    </Router>
  );
}

export default App; 