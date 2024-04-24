// eslint-disable-next-line no-unused-vars
import React from 'react';
import PropTypes from 'prop-types';
import './Mistakes.css'

const Mistakes = ({ strikes }) => {
  // Create an array with a length equal to the number of strikes
  const mistakeBubbles = Array.from({ length: 4 }, (_, index) => {
    if (index < (4 - strikes)) {
      return <span key={index} className="mistake-bubble"></span>;
    } else {
      return <span key={index} className="mistake-bubble invisible"></span>;
    }
  });

  return (
    <>
      <p id='mistake-text' aria-live="polite">
        Mistakes remaining: 
        <span id='mistake-bubbles'>
          {mistakeBubbles}
        </span>
      </p>
    </>
  );
};


Mistakes.propTypes = {
  strikes: PropTypes.number.isRequired
};

export default Mistakes;