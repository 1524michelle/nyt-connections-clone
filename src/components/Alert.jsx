// eslint-disable-next-line no-unused-vars
import React from 'react';
import PropTypes from 'prop-types';
import './Alert.css';

const Alert = ({ message, isVisible }) => {
    return (
      <>
        {isVisible && (
          <div className="alert">
            <span>{message}</span>
          </div>
        )}
      </>
    );
};

Alert.propTypes = {
    message: PropTypes.string.isRequired,
    isVisible: PropTypes.bool.isRequired
}

export default Alert;