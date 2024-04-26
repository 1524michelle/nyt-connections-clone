// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './Row.css';
import './InputRow.css';

const InputRow = ({ difficulty }) => {

  return (
    <>
    <div className='input-row'>
        <div className={`row ${difficulty}`}
        role="row"
        aria-label={`Input row of difficulty: ${difficulty}`}>
            <div>
                <label htmlFor={`category-input ${difficulty}`}>
                    CATEGORY: <input id={`category-input ${difficulty}`} name={`category-input ${difficulty}`} aria-label="Category input" />
                </label>
                <label>
                    WORDS: <span aria-hidden="true"> </span>
                    <input name="prompt" className='word-input' aria-label="Word input"/> <span aria-hidden="true">, </span>
                    <input name="prompt" className='word-input' aria-label="Word input"/> <span aria-hidden="true">, </span>
                    <input name="prompt" className='word-input' aria-label="Word input"/> <span aria-hidden="true">, </span>
                    <input name="prompt" className='word-input' aria-label="Word input"/>
                </label>
            </div>
        </div>
    </div>
    </>
  );
};

InputRow.propTypes = {
  difficulty: PropTypes.string.isRequired
};

export default InputRow;