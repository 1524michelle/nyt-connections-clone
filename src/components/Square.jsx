// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import './Square.css';

const Square = ({ word, isSelected, onClick, isMistake, handleAnimationEnd }) => {
  const [pressed, setPressed] = useState(false);
  const squareRef = useRef(null);

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

  // sizes font size to the square
  useEffect(() => {
    const handleResize = () => {
      const availableWidth = squareRef.current.clientWidth; // width in the square
      const wordWidth = squareRef.current.querySelector('.word').offsetWidth; // word width
      if (wordWidth > availableWidth) {
        const fontSize = (availableWidth / wordWidth) * 18 * 0.9; // 0.9 scaling factor
        squareRef.current.querySelector('.word').style.fontSize = `${fontSize}px`;
      } else {
        squareRef.current.querySelector('.word').style.fontSize = '18px'; // leave it alone if it fits
      }
    };

    handleResize(); // call once to initialize font size
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [word]);

  const handleMouseDown = () => {
    setPressed(true);
    onClick(word);
  };

  return (
    <div
      ref={squareRef}
      className={`square ${isSelected ? 'selected' : ''} ${pressed ? 'pressed' : ''} ${
        isMistake ? 'mistake' : ''
      }`}
      role="button"
      aria-pressed={pressed}
      aria-label={word}
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