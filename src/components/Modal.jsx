// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import closeIcon from '../assets/close.png';
import './Modal.css';

const Modal = ({ isOpen, onClose, children }) => {
  const handleClose = () => {
    onClose();
  };


  return (
    <>
      {isOpen && (
        <div className="modal-overlay" onClick={handleClose}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
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
}

export default Modal;
