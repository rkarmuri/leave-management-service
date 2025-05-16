import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../../home/LoginNavbars.css';

const EmployeeNavbar = () => {
    const [isDropdownOpen, setDropdownOpen] = useState(false);
    const navigate = useNavigate(); // Initialize useNavigate
  
    const toggleDropdown = () => {
      setDropdownOpen(!isDropdownOpen);
    };
  
    const handleLogout = () => {
      // Perform any necessary logout logic here, like clearing tokens or session data
      console.log('Logged out');
      navigate('/employee-login?loggedOut=true'); // Navigate to admin login after logout
    };
  
    return (
      <nav className="employee-navbar">
        <Link to="/employee-dashboard" className="imgSrc">
          <i className="fa-solid fa-envelopes-bulk"></i>
          <h1>Leave Management System</h1>
        </Link>
        <ul className="employee-navList">
          <li className="employee-navItem">
            <Link to="/employee-dashboard" className="employee-navLink">Employee Dashboard</Link>
          </li>
          <li className="employee-navItem dropdown">
            <button className="employee-navLink" onClick={toggleDropdown}>
              Options <i className={`fa ${isDropdownOpen ? 'fa-caret-up' : 'fa-caret-down'}`}></i>
            </button>
            {isDropdownOpen && (
              <ul className="dropdownMenu">
                <li className="dropdownItem">
                  <Link to={`/edit-account`} className="dropdownLink">My Profile</Link>
                </li>
                <li className="dropdownItem">
                  <Link to={`/apply-leave/:id`} className="dropdownLink">Apply Leave</Link>
                </li>
                <li className="dropdownItem">
                  <Link to="/leave-history/:id" className="dropdownLink">Leave Report</Link>
                </li>
              </ul>
            )}
          </li>
          <li className="employee-navItem">
            <button className="employee-navLink logout" onClick={handleLogout}>Logout</button>
          </li>
        </ul>
      </nav>
    );
}

export default EmployeeNavbar;
