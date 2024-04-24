// eslint-disable-next-line no-unused-vars
import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import './Alert.css';

const Alert = ({ message, isVisible }) => {
  const alertRef = useRef(null);

  useEffect(() => {
    // Focus the alert when it becomes visible
    if (isVisible) {
      alertRef.current.focus();
    }
  }, [isVisible]);

  return (
    <>
      {isVisible && (
        <div
          className={`alert fade ${isVisible ? 'fade-in' : 'fade-out'}`}
          ref={alertRef}
          tabIndex={0}
          role="alert"
          aria-live="assertive"
        >
          <span>{message}</span>
        </div>
      )}
    </>
  );
};

Alert.propTypes = {
  message: PropTypes.string.isRequired,
  isVisible: PropTypes.bool.isRequired,
};

export default Alert;
