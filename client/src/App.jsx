import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Menu from './components/Menu';
import Game from './components/Game';
import Instructions from './components/Instructions';
import Credits from './components/Credits';
import './styles/App.css';

const App = () => (
  <Router>
    <div className="app-container">
      <Routes>
        <Route path="/" element={<Menu />} />
        <Route path="/game" element={<Game />} />
        <Route path="/instructions" element={<Instructions />} />
        <Route path="/credits" element={<Credits />} />
      </Routes>
    </div>
  </Router>
);

export default App; 