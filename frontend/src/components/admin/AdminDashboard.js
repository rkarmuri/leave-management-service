import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../AuthContext';
import AdminNavbar from './AdminNavbar';
import './Dashboard.css';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { username } = useAuth();
  const [adminId, setAdminId] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAdminId = async () => {
      if (username) {
        try {
          const response = await fetch(`http://localhost:8080/api/admins/id/${username}`);
          if (response.ok) {
            const data = await response.json();
            //console.log('Admin ID fetched:', data);
            setAdminId(data);
          } else {
            console.error('Failed to fetch admin ID');
          }
        } catch (error) {
          console.error('Error fetching admin ID:', error);
        } finally {
          setLoading(false);
        }
      } else {
        console.error('Username is not available');
        setLoading(false);
      }
    };

    fetchAdminId();
  }, [username]);

  const handleLogout = () => {
    navigate('/admin-login?loggedOut=true');
  };

  const navigateToEmployeeAdministration = () => {
    if (adminId) {
      navigate(`/employee-administration/${adminId}`);
    } else {
      console.error('Admin ID is not available');
    }
  };

  if (loading) {
    return <div>Loading...</div>; // Optional loading state
  }

  return (
    <>
      <AdminNavbar adminId={adminId}/>
      <div className="admin-dashboard">
        <h1>Admin Dashboard</h1>
        <div className="dashboard-options">
          <button onClick={() => navigate('/add-employee')}>Add Employee</button>
          <button onClick={navigateToEmployeeAdministration}>Employee Administration</button>
          <button onClick={() => navigate('/leave-administration')}>Leave Administration</button>
          <button onClick={handleLogout}>Log Out</button>
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;
