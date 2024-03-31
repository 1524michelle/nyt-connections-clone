// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './Square.css';

const Square = ({ word, isSelected, onClick, isMistake, handleAnimationEnd }) => {
  const [pressed, setPressed] = useState(false);

  useEffect(() => {
    const handleMouseUp = () => {
      setPressed(false);
    };

    const handleMouseMove = (event) => {
      if (!event.buttons) {
        setPressed(false);
      }
    };

    const handleMouseLeave = () => {
      setPressed(false);
    };

    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  const handleMouseDown = () => {
    setPressed(true);
    onClick(word);
  };

  return (
    <div
      className={`square ${isSelected ? 'selected' : ''} ${pressed ? 'pressed' : ''} ${
        isMistake ? 'mistake' : ''
      }`}
      onMouseDown={handleMouseDown}
      onAnimationEnd={handleAnimationEnd}
    >
      <p className="word">{word}</p>
    </div>
  );
};

Square.propTypes = {
  word: PropTypes.string.isRequired,
  isSelected: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
  isMistake: PropTypes.bool.isRequired,
  handleAnimationEnd: PropTypes.func.isRequired,
};

export default Square;