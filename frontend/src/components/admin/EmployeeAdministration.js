// EmployeeAdministration.js
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import AdminNavbar from './AdminNavbar';
import './Dashboard.css';

const EmployeeAdministration = () => {
  const { adminId } = useParams();
  const navigate = useNavigate();
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEmployees = async () => {
      if (adminId) {
        try {
          const response = await fetch(`http://localhost:8080/api/employees/admin/${adminId}`);
          if (response.ok) {
            const data = await response.json();
            //console.log(data);
            setEmployees(data);
          } else {
            console.error('Failed to fetch employees');
          }
        } catch (error) {
          console.error('Error fetching employees:', error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchEmployees();
  }, [adminId]);

  const handleBackToDashboard = () => {
    navigate('/admin-dashboard');
  };

  if (loading) {
    return <div>Loading...</div>; // Optional loading state
  }

  return (
    <>
      <AdminNavbar adminId={adminId} />
      <div className="employee-admin-container">
        <button onClick={handleBackToDashboard} style={{ marginBottom: '20px' }}>Back to Admin Dashboard</button>
        <h2>Employee Administration</h2>
        <table border="1" cellPadding="10" cellSpacing="0">
          <thead>
            <tr>
              <th>Employee ID</th>
              <th>First Name</th>
              <th>Mobile No</th>
              <th>Email</th>
              <th>City</th>
            </tr>
          </thead>
          <tbody>
            {employees.length > 0 ? (
              employees.map(employee => (
                <tr key={employee.id}>
                  <td>{employee.id}</td>
                  <td>{employee.firstName}</td>
                  <td>{employee.mobile}</td>
                  <td>{employee.email}</td>
                  <td>{employee.city}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5">No employees found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default EmployeeAdministration;
