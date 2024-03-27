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

  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 500); // simulate loading delay
    return () => clearTimeout(timeout);
  }, []);

  const handlePlay = () => {
    setShowWelcome(false);
  };

  return (
    <>
      
        <div className='app'>
          <h1 id='game-header'>
            <span className='game-name'>Connections</span>
            <span id='date'>{date}</span>
          </h1>
          {loading ? (
            <LoadingBar />
          ) : showWelcome ? (
            <Welcome onPlay={handlePlay} date={date} />
          ) : (
            <div>
              <Toolbar />
              <Grid />
            </div>
          )
          }   
        </div>
    </>
  );
};

export default Game;