// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './Square.css'

const Square = ({ word, isSelected, onClick, isMistake, handleAnimationEnd }) => {
  const [pressed, setPressed] = useState(false);

  const handleMouseDown = () => {
    setPressed(true);
    onClick(word);
  }

  const handleMouseUp = () => {
    setPressed(false);
  }

  return (
    <>
      <div 
        className={`square ${isSelected ? 'selected' : ''} ${pressed ? 'pressed' : ''} ${isMistake ? 'mistake' : ''}`} 
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onAnimationEnd={handleAnimationEnd}>
        <p className="word">{word}</p>
      </div>
    </>
  );
};


Square.propTypes = {
  word: PropTypes.string.isRequired,
  isSelected: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
  isMistake: PropTypes.bool.isRequired,
  handleAnimationEnd: PropTypes.func.isRequired
};

export default Square;