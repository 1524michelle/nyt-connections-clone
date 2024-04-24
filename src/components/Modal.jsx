// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import closeIcon from '../assets/close.png';
import './Modal.css';

const Modal = ({ isOpen, onClose, children }) => {
  const [isClosing, setIsClosing] = useState(false);
  const modalRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      modalRef.current.focus(); // Focus the modal when it opens
    }
  }, [isOpen]);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      onClose();
      setIsClosing(false);
    }, 250); // wait for the slideOut animation duration (0.25s) before closing
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Escape' && isOpen) {
      handleClose();
    }
  };

  return (
    <>
      {isOpen && (
        <div
          className={`modal-overlay ${isClosing ? 'closing' : ''}`}
          onClick={handleClose}
          onKeyDown={handleKeyDown}
          tabIndex={-1} // Make the overlay focusable
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
          ref={modalRef}
        >
          <div className={`modal ${isClosing ? 'slideOut' : ''}`} onClick={(e) => e.stopPropagation()}>
            {/* Apply aria-label to the button for screen readers */}
            <button className="close-button" onClick={handleClose} aria-label="Close">
              {/* Use closeIcon as an inline image */}
              <img src={closeIcon} alt="Close" className="close-icon" aria-hidden="true" />
            </button>
            <div className="modal-content" id="modal-title">{children}</div>
          </div>
        </div>
      )}
    </>
  );
};

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

export default Modal;
