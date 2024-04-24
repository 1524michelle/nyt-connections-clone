// eslint-disable-next-line no-unused-vars
import React from 'react';
import PropTypes from 'prop-types';
import connectionsIcon from '../assets/connections-icon-welcome.png';
import { Button } from './';
import './Welcome.css';

const Welcome = ({ onPlay, date }) => {
    return (
        <>
            <div className="welcome-stage" role="presentation">
                <img id='welcome-icon' src={connectionsIcon} alt="connections icon" />
                <h1 className='game-name' id='welcome-name'>Connections</h1>
                <h3 className='welcome-h3'>Group words that share a common thread.</h3>
                <Button text="Play" onClick={onPlay} disabled={false} aria-label="Play button" />
                <div className='welcome-p-div'>
                    <p className='welcome-p bold' role="status" aria-live="polite">{date}</p>
                    <p className='welcome-p by'>By Michelle Huang</p>
                </div>
            </div>
        </>
    );
};

Welcome.propTypes = {
    onPlay: PropTypes.func.isRequired,
    date: PropTypes.string.isRequired
}

export default Welcome;