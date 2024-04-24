// eslint-disable-next-line no-unused-vars
import React from 'react';
import PropTypes from 'prop-types';
import './Attempts.css';

const Attempts = ({ attempts }) => {
  return (
    <div className='grid-container'>
      <h2 className='grid-heading'>Attempts</h2>
      <div className='grid'>
        {attempts.map((attempt, rowIndex) => (
          <div className='grid-row' key={rowIndex} role="row">
            {attempt.map((difficulty, nodeIndex) => (
              <span key={nodeIndex} className={`big-block ${difficulty}`} role="gridcell">
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

Attempts.propTypes = {
  attempts: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string)).isRequired
};

export default Attempts;