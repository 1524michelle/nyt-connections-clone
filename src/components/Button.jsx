// eslint-disable-next-line no-unused-vars
import React from 'react';
import PropTypes from 'prop-types';
import './Button.css';

const Button = ({ text, onClick, disabled }) => {
  let buttonClass = 'button';

  if (!disabled) {
    if (text === 'Submit' || text === 'Share Your Results' || text === 'Play') {
      buttonClass += ' active-submit';
      if (text === 'Play') {
        buttonClass += ' play';
      }
    } else {
      buttonClass += ' active-other';
    }
  } else {
    buttonClass += ' disabled';
  }

  return (
    <button className={buttonClass} onClick={onClick} disabled={disabled} aria-disabled={disabled}>
      {text}
    </button>
  );
};

Button.propTypes = {
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  disabled: PropTypes.bool.isRequired
};

export default Button;
