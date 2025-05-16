import React, { useState, useEffect } from 'react';
import "./Login.css";
import Navbar from './Navbar';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../AuthContext';

const AdminLogin = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();
    const location = useLocation();
    const { setUsername: setAuthUsername } = useAuth();

    // Check for logout message in query parameters
    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        if (queryParams.get('loggedOut') === 'true') {
            setMessage('Logged out successfully.');
        }
    }, [location.search]);

    const handleLogin = async (e) => {
        e.preventDefault();
    
        try {
            const response = await fetch('http://localhost:8080/api/admins/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });
    
            // Attempt to parse JSON response
            const contentType = response.headers.get('Content-Type');
            let data;
            if (contentType && contentType.includes('application/json')) {
                data = await response.json();
            } else {
                data = await response.text();
            }
    
            if (response.ok) {
                // Login successful, redirect to Admin Dashboard
                setAuthUsername(username);
                navigate('/admin-dashboard');
            } else {
                // Set error message from the response
                setError(data.message || data || 'Invalid username or password');
            }
        } catch (error) {
            console.error('Error during login:', error);
            setError('An error occurred. Please try again.');
        }
    };    

    return (
        <div className="login-container">
        <Navbar/>
        <div className='login-body'>
            <h2>Admin Login</h2>
            {message && <p style={{ color: 'green' }}>{message}</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <form onSubmit={handleLogin}>
                <div className="form-group">
                    <label>Username:</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Login</button>
            </form>
            </div>
        </div>
    );
};

export default AdminLogin;
