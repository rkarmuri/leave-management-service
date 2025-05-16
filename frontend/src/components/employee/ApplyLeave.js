import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import EmployeeNavbar from './EmployeeNavbar';
import './Dashboard2.css';

const ApplyLeave = () => {
    const [availableDays, setAvailableDays] = useState(21);
    const [formData, setFormData] = useState({
        fromDate: '',
        toDate: '',
        leaveType: '',
        totalDays: 0,
        additionalInfo: ''
    });
    const [warning, setWarning] = useState('');
    const navigate = useNavigate();
    const { id } = useParams();
    console.log('Employee ID:', id);

    useEffect(() => {
        if (formData.fromDate && formData.toDate) {
            const from = new Date(formData.fromDate);
            const to = new Date(formData.toDate);
            const diffTime = Math.abs(to - from);
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
            setFormData((prev) => ({
                ...prev,
                totalDays: diffDays
            }));
        }
    }, [formData.fromDate, formData.toDate]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (formData.totalDays > availableDays) {
            setWarning('You do not have enough leave days available.');
            return;
        }
    
        try {
            const response = await fetch('http://localhost:8080/api/leave-requests/apply', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    employeeId: id, // Use the employee ID from useParams
                    leaveType: formData.leaveType,
                    startDate: formData.fromDate, // Correct field name
                    endDate: formData.toDate,     // Correct field name
                    totalDays: formData.totalDays,
                    additionalInfo: formData.additionalInfo,
                    status: 'PENDING',
                }),
            });
    
            if (response.ok) {
                const result = await response.json();
                alert('Leave applied successfully!');
                console.log('Leave request response:', result);
                setAvailableDays(availableDays - formData.totalDays);
                setFormData({
                    fromDate: '',
                    toDate: '',
                    leaveType: '',
                    totalDays: 0,
                    additionalInfo: ''
                });
            } else {
                const errorMessage = await response.text();
                console.error('Failed to apply leave:', errorMessage);
                setWarning(`Failed to apply leave: ${errorMessage}`);
            }
        } catch (error) {
            console.error('Error applying leave:', error);
            setWarning('An error occurred while applying leave.');
        }
    };
        

    const handleReset = () => {
        setFormData({
            fromDate: '',
            toDate: '',
            leaveType: '',
            totalDays: 0,
            additionalInfo: ''
        });
        setWarning('');
    };

    const handleBack = () => {
        navigate('/employee-dashboard');
    };

    return (
        <>
            <EmployeeNavbar />
            <div className="apply-leave-container">
                <button className="button back-button" onClick={handleBack}>Back to Dashboard</button>
                <h2 className="heading">Apply for Leave</h2>
                {warning && <p className="warning">{warning}</p>}
                <form onSubmit={handleSubmit} className='form-body'>
                    <div className="form-group">
                        <label>From Date:</label>
                        <input
                            type="date"
                            name="fromDate"
                            value={formData.fromDate}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>To Date:</label>
                        <input
                            type="date"
                            name="toDate"
                            value={formData.toDate}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Leave Type:</label>
                        <select
                            name="leaveType"
                            value={formData.leaveType}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Select Leave Type</option>
                            <option value="sick">Sick Leave</option>
                            <option value="casual">Casual Leave</option>
                            <option value="annual">Annual Leave</option>
                            <option value="other">Other</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Total Days:</label>
                        <input
                            type="number"
                            name="totalDays"
                            value={formData.totalDays}
                            readOnly
                        />
                    </div>
                    <div className="form-group">
                        <label>Available Days:</label>
                        <input
                            type="number"
                            value={availableDays}
                            readOnly
                        />
                    </div>
                    <div className="form-group">
                        <label>Additional Info:</label>
                        <textarea
                            name="additionalInfo"
                            value={formData.additionalInfo}
                            onChange={handleChange}
                        />
                    </div>
                    <button type="submit" className="button submit-button">Submit</button>
                    <button type="button" onClick={handleReset} className="button reset-button">Reset</button>
                </form>
            </div>
        </>
    );
};

export default ApplyLeave;
