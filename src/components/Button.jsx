// eslint-disable-next-line no-unused-vars
import React from 'react';
import PropTypes from 'prop-types';
import './Button.css';

const Button = ({ text, onClick, isActive }) => {
  let buttonClass = 'button';
  if (isActive && (text == 'Submit' || text == 'Share Your Results' || text == 'Play')) {
    buttonClass += ' active-submit';
    if (text == 'Play') {
      buttonClass += ' play';
    }
  } else if (isActive) {
    buttonClass += ' active-other';
  }

  return (
    <button className={buttonClass} onClick={onClick}>
      {text}
    </button>
  );
};

Button.propTypes = {
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  isActive: PropTypes.bool.isRequired
};

export default Button;
