// eslint-disable-next-line no-unused-vars
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Game from './Game.jsx';
import Create from './components/Create.jsx';

function App() {
  return (
    <Router basename="/nyt-connections-clone">
      <Routes>
        <Route path="/" element={<Game />} />
        <Route path="/create" element={<Create />} />
      </Routes>
    </Router>
  );
}

export default App;
