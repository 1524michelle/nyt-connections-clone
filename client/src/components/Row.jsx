// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './Row.css'

const Row = ({ category, words, difficulty }) => {
  const [slam, setSlam] = useState(true);

  useEffect(() => {
    // trigger slam effect on initial render
    setTimeout(() => {
      setSlam(false);
    }, 1000);
  }, []);

  return (
    <>
      <div className={`row ${difficulty} ${slam ? 'slam' : ''}`}
      role="row"
      aria-label={`Category: ${category}, Words: ${words}, Difficulty: ${difficulty}`}>
        <div>
          <p className='category'>{category}</p>
          <p className='words'>{words}</p>
        </div>
      </div>
    </>
  );
};

Row.propTypes = {
  category: PropTypes.string.isRequired,
  words: PropTypes.string.isRequired,
  difficulty: PropTypes.string.isRequired
};

export default Row;