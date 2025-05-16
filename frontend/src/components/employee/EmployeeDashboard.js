import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../AuthContext';
import EmployeeNavbar from './EmployeeNavbar';
import './Dashboard2.css';

const EmployeeDashboard = () => {
    const navigate = useNavigate();
    const { username } = useAuth();
    const [employeeId, setEmployeeId] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchEmployeeId = async () => {
            if (username) {
                try {
                    const response = await fetch(`http://localhost:8080/api/employees/id/${username}`);
                    if (response.ok) {
                        const data = await response.json();
                        //console.log('Employee ID fetched:', data);
                        setEmployeeId(data);
                    } else {
                        console.error('Failed to fetch employee ID');
                    }
                } catch (error) {
                    console.error('Error fetching employee ID:', error);
                } finally {
                    setLoading(false);
                }
            } else {
                console.error('Username is not available');
                setLoading(false);
            }
        };

        fetchEmployeeId();
    }, [username]);

    const handleLogout = () => {
        navigate('/employee-login?loggedOut=true');
    };

    const navigateToApplyLeave = () => {
        if (employeeId) {
            navigate(`/apply-leave/${employeeId}`);
        } else {
            console.error('Employee ID is not available');
        }
    };

    const navigateToLeaveHistory = () => {
        if (employeeId) {
            navigate(`/leave-history/${employeeId}`);
        } else {
            console.error('Employee ID is not available');
        }
    };

    if (loading) {
        return <div>Loading...</div>; // Optional loading state
    }

    return (
        <div className="employee-dashboard">
            <EmployeeNavbar />
            <div className='dash-body'>
                <h1>Welcome, {username}!</h1> {/* Display the username */}
                <div className="dashboard-options">
                    <button onClick={navigateToApplyLeave}>Apply Leave</button>
                    <button onClick={navigateToLeaveHistory}>Leaves History/Report</button>
                    <button onClick={() => navigate('/edit-account')}>Edit Account</button>
                    <button onClick={handleLogout}>Logout</button>
                </div>
            </div>
        </div>
    );
};

export default EmployeeDashboard;
