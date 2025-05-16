import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import LeaveDetailsModal from './LeaveDetailsModal';
import AdminNavbar from './AdminNavbar';
import './Dashboard.css';
import { useAuth } from '../../AuthContext';

const LeaveAdministration = () => {
  const navigate = useNavigate(); // Initialize useNavigate
  const [leaveRequests, setLeaveRequests] = useState([]);
  const [selectedLeave, setSelectedLeave] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { username } = useAuth();
  const [adminId, setAdminId] = useState(null);

  console.log('Username from Auth Context:', username);

  useEffect(() => {
    if (username) {
      // Fetch adminId based on the username
      fetch(`http://localhost:8080/api/admins/id/${username}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then(response => {
          if (!response.ok) {
            if (response.status === 401) {
              throw new Error('Unauthorized access. Please log in.');
            } else {
              throw new Error('Error fetching admin ID');
            }
          }
          console.log('Response JSON:', response.status);
          return response.json();
        })
        .then(data => {
          console.log('Admin ID response data:', data);
          if (data) {
            setAdminId(data); // Correctly set adminId
            console.log('Admin ID set to:', data);
          } else {
            console.error('Admin ID not found');
          }
        })
        .catch(error => console.error('Error fetching admin ID:', error));
    }
  }, [username]);
  

  useEffect(() => {
    if (adminId !== null) {
      console.log('Fetching leave requests for adminId:', adminId);
      // Fetch leave requests based on adminId
      fetch(`http://localhost:8080/api/leave-requests/admin/${adminId}`)
        .then(response => response.json())
        .then(data => {
          console.log('Fetched data:', data);
          setLeaveRequests(data);
        })
        .catch(error => console.error('Error fetching leave requests:', error));
    }
  }, [adminId]);

  const openModal = (leaveRequest) => {
    setSelectedLeave(leaveRequest);
    setIsModalOpen(true);
  };

  const handleSave = (updatedLeave) => {
    // Call the backend to update the leave request
    console.log('Updated Leave:', updatedLeave);
    // Update the leave request list
    setLeaveRequests(leaveRequests.map(lr => lr.id === updatedLeave.id ? updatedLeave : lr));
    setIsModalOpen(false);
  };

  const handleBackToDashboard = () => {
    navigate('/admin-dashboard'); // Navigate to admin dashboard
  };

  return (
    <>
      <AdminNavbar adminId={adminId}/>
      <div className='leave-admin-container'>
        <button onClick={handleBackToDashboard} style={{ marginBottom: '20px' }}>Back to Admin Dashboard</button>
        <h2>Leave Administration</h2>
        <table border="1" cellPadding="10" cellSpacing="0">
          <thead>
            <tr>
              <th>Emp ID</th>
              <th>Emp Name</th>
              <th>From Date</th>
              <th>To Date</th>
              <th>No of Days</th>
              <th>Leave Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {leaveRequests.length > 0 ? (
              leaveRequests.map(request => (
                <tr key={request.id}>
                  <td>{request.employeeId}</td>
                  <td>{request.employeeName}</td>
                  <td>{request.startDate}</td>
                  <td>{request.endDate}</td>
                  <td>{request.totalDays}</td>
                  <td>{request.status}</td>
                  <td>
                  <button 
                      onClick={() => openModal(request)}
                      disabled={request.status !== 'PENDING'} // Disable button if status is not 'PENDING'
                      title={request.status !== 'PENDING' ? 'Action not allowed' : 'Complete'} // Tooltip for disabled button
                    >
                      <span role="img" aria-label="Edit">✏️</span>
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7">No leave requests found</td>
              </tr>
            )}
          </tbody>
        </table>

        {isModalOpen && selectedLeave && (
          <LeaveDetailsModal
            leaveRequest={selectedLeave}
            onClose={() => setIsModalOpen(false)}
            onSave={handleSave}
          />
        )}
      </div>
    </>
  );
};

export default LeaveAdministration;
