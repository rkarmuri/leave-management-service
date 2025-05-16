// ConfirmDelete.js
import React from 'react';
import './Dashboard2.css';

const ConfirmDelete = ({ onConfirm, onCancel, leaveId }) => {
    const handleConfirm = () => {
        onConfirm(leaveId); // Pass the leaveId to the onConfirm handler
    };

    return (
        <div className="confirm-delete-modal">
            <p>Are you sure you want to delete this leave request?</p>
            <button onClick={handleConfirm}>Yes, Delete</button>
            <button onClick={onCancel}>Cancel</button>
        </div>
    );
};

export default ConfirmDelete;
