// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Grid, LoadingBar, Toolbar, Welcome } from './components';
import './Game.css';

function getDate() {
  const today = new Date();
  const month = today.toLocaleString('default', { month: 'long' });
  const date = today.getDate();
  const year = today.getFullYear();
  return `${month} ${date}, ${year}`;
}

const Game = ({ shouldShowWelcome }) => {
  // eslint-disable-next-line no-unused-vars
  const [date, setDate] = useState(getDate());
  const [loading, setLoading] = useState(true);
  const [showWelcome, setShowWelcome] = useState(shouldShowWelcome);
  const [fadeIn, setFadeIn] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 500); // simulate loading delay
    return () => clearTimeout(timeout);
  }, []);

  const handlePlay = () => {
    setFadeIn(false); // trigger fade out animation
    setTimeout(() => setShowWelcome(false), 300); // hide welcome stage after animation
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

Game.propTypes = {
  shouldShowWelcome: PropTypes.bool.isRequired // if /:id suffix, we don't want to show welcome at all
}

export default Game;