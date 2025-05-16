import React from 'react';
import { Link } from 'react-router-dom';
import './Login.css';

const Navbar = () => {
  return (
    <nav className='navbar'>
      <Link to='/' className='imgSrc'>
        <i className="fa-solid fa-envelopes-bulk"></i>
        <h1>Leave Management System</h1>
      </Link>
      <ul className='navList'>
        <li className='navItem'>
          <Link to="/" className='navLink'>Home</Link>
        </li>
        <li className='navItem'>
          <Link to="/about" className='navLink'>About</Link>
        </li>
        <li className='navItem'>
          <Link to="/admin-login" className='navLink'>Admin Login</Link>
        </li>
        <li className='navItem'>
          <Link to="/employee-login" className='navLink'>Employee Login</Link>
        </li>
        <li className='navItem'>
          <Link to="/contact" className='navLink'>Contact</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
