// eslint-disable-next-line no-unused-vars
import React from 'react';
import PropTypes from 'prop-types';
import './Attempts.css';

const Attempts = ({ attempts }) => {
    return (
        <>
        <div className='grid-container'>
            {attempts.map((attempt, index) => (
                <div className='grid-row' key={index}>
                    {attempt.map((difficulty, nodeIndex) => (
                        <span key={nodeIndex} className={`big-block ${difficulty}`}></span>
                    ))}
                </div>
            ))}
        </div>
        </>
    );
};

Attempts.propTypes = {
    attempts: PropTypes.arrayOf(PropTypes.array).isRequired
}

export default Attempts;