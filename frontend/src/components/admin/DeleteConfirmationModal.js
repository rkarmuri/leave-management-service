import React from 'react';

const DeleteConfirmationModal = ({ employeeName, onClose, onDelete }) => {
  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Confirm Delete</h2>
        <p>Are you sure you want to delete {employeeName}?</p>
        <button onClick={onDelete}>Yes</button>
        <button onClick={onClose}>No</button>
      </div>
    </div>
  );
};

export default DeleteConfirmationModal;
