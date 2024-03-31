// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import closeIcon from '../assets/close.png';
import './Modal.css';

const Modal = ({ isOpen, onClose, children }) => {
  const [isClosing, setIsClosing] = useState(false);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      onClose();
      setIsClosing(false);
    }, 250); // wait for the slideOut animation duration (0.25s) before closing
  };

  return (
    <>
      {isOpen && (
        <div className={`modal-overlay ${isClosing ? 'closing' : ''}`} onClick={handleClose}>
          <div className={`modal ${isClosing ? 'slideOut' : ''}`} onClick={(e) => e.stopPropagation()}>
            <img src={closeIcon} className="close-button" onClick={handleClose} />
            <div className="modal-content">{children}</div>
          </div>
        </div>
      )}
    </>
  );
};

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired
};

export default Modal;
