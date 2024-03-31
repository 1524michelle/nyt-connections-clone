// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';
import { Grid, LoadingBar, Toolbar, Welcome } from './components';
import './Game.css';

function getDate() {
  const today = new Date();
  const month = today.toLocaleString('default', { month: 'long' });
  const date = today.getDate();
  const year = today.getFullYear();
  return `${month} ${date}, ${year}`;
}

const Game = () => {
  // eslint-disable-next-line no-unused-vars
  const [date, setDate] = useState(getDate());
  const [loading, setLoading] = useState(true);
  const [showWelcome, setShowWelcome] = useState(true);
  const [fadeIn, setFadeIn] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 500); // simulate loading delay
    return () => clearTimeout(timeout);
  }, []);

  const handlePlay = () => {
    setFadeIn(false); // Trigger fade out animation
    setTimeout(() => setShowWelcome(false), 300); // Hide Welcome component after animation
  };

  return (
    <div className='app'>
      <h1 id='game-header'>
        <span className='game-name'>Connections</span>
        <span id='date'>{date}</span>
      </h1>
      {loading ? (
        <LoadingBar />
      ) : (
        <>
          {showWelcome && (
            <div className={`welcome-stage ${fadeIn ? 'fade-in' : 'fade-out'}`}>
              <Welcome onPlay={handlePlay} date={date} />
            </div>
          )}
          {!showWelcome && (
            <div className='grid-stage'>
              <Toolbar />
              <Grid />
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Game;