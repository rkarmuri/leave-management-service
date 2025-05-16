import React, { useState, useEffect } from 'react';
import './Dashboard.css';

const LeaveDetailsModal = ({ leaveRequest, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    employeeId: '',
    employeeName: '',
    startDate: '',
    endDate: '',
    totalDays: '',
    status: '',
  });

  useEffect(() => {
    if (leaveRequest) {
      setFormData({
        employeeId: leaveRequest.employeeId,
        employeeName: leaveRequest.employeeName,
        startDate: leaveRequest.startDate,
        endDate: leaveRequest.endDate,
        totalDays: leaveRequest.totalDays,
        status: leaveRequest.status,
      });
    }
  }, [leaveRequest]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    const normalizedStatus = formData.status.toUpperCase(); // Normalize the status to uppercase for comparison

  let url = '';

  if (normalizedStatus === 'APPROVED') {
    url = `http://localhost:8080/api/leave-requests/approve/${leaveRequest.id}`;
  } else if (normalizedStatus === 'DECLINED') {
    url = `http://localhost:8080/api/leave-requests/reject/${leaveRequest.id}`;
  } else {
    console.log('Case is still pending');
    return;
  }

    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(data => {
        console.log('Updated Leave Request:', data);
        // Update the leave request list
        onSave(data);
        onClose();
      })
      .catch(error => console.error('Error updating leave request:', error));
  };
  

  return (
    <div className="modal-overlay">
      <div className="modal admin-leaves">
        <h2>Leave Details</h2>
        <form className='admin-form'>
          <input type="text" name="employeeId" value={formData.employeeId} onChange={handleChange} placeholder="Emp ID" disabled />
          <input type="text" name="employeeName" value={formData.employeeName} onChange={handleChange} placeholder="Emp Name" disabled />
          <input type="date" name="startDate" value={formData.startDate} onChange={handleChange} placeholder="From Date" />
          <input type="date" name="endDate" value={formData.endDate} onChange={handleChange} placeholder="To Date" />
          <input type="number" name="totalDays" value={formData.totalDays} onChange={handleChange} placeholder="No of Days" />
          <select name="status" value={formData.status} onChange={handleChange}>
            <option value="Pending">PENDING</option>
            <option value="Approved">APPROVED</option>
            <option value="Declined">DECLINED</option>
          </select>
        </form>
        <button onClick={handleSubmit}>Save</button>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default LeaveDetailsModal;
