import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../../home/LoginNavbars.css';

const AdminNavbar = ({ adminId }) => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate(); // Initialize useNavigate

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = () => {
    // Perform any necessary logout logic here, like clearing tokens or session data
    console.log('Logged out');
    navigate('/admin-login?loggedOut=true'); // Navigate to admin login after logout
  };

  return (
    <nav className="admin-navbar">
      <Link to="/admin-dashboard" className="imgSrc">
        <i className="fa-solid fa-envelopes-bulk"></i>
        <h1>Leave Management System</h1>
      </Link>
      <ul className="admin-navList">
        <li className="admin-navItem">
          <Link to="/admin-dashboard" className="admin-navLink">Admin Dashboard</Link>
        </li>
        <li className="admin-navItem dropdown">
          <button className="admin-navLink" onClick={toggleDropdown}>
            Options <i className={`fa ${isDropdownOpen ? 'fa-caret-up' : 'fa-caret-down'}`}></i>
          </button>
          {isDropdownOpen && (
            <ul className="dropdownMenu">
              <li className="dropdownItem">
                <Link to={`/employee-administration/${adminId}`} className="dropdownLink">Employee Administration</Link>
              </li>
              <li className="dropdownItem">
                <Link to="/leave-administration" className="dropdownLink">Leave Administration</Link>
              </li>
            </ul>
          )}
        </li>
        <li className="admin-navItem">
          <button className="admin-navLink logout" onClick={handleLogout}>Logout</button>
        </li>
      </ul>
    </nav>
  );
};

export default AdminNavbar;
