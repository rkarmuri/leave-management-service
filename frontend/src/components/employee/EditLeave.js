import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Dashboard2.css';

const EditLeave = ({ leave, onSave }) => {
    const [formData, setFormData] = useState({
        ...leave,
        startDate: leave.startDate ? leave.startDate.split('T')[0] : '',
        endDate: leave.endDate ? leave.endDate.split('T')[0] : ''
    });
    const [totalDays, setTotalDays] = useState(calculateDays(leave.startDate, leave.endDate));
    const navigate = useNavigate();

    // Function to calculate total days
    function calculateDays(startDate, endDate) {
        if (!startDate || !endDate) return 0;
        const start = new Date(startDate);
        const end = new Date(endDate);
        const diffTime = Math.abs(end - start);
        return Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1; // Adding 1 to include the end date
    }

    // Update total days when startDate or endDate changes
    useEffect(() => {
        setTotalDays(calculateDays(formData.startDate, formData.endDate));
    }, [formData.startDate, formData.endDate]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: name.includes('Date') ? value : value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Ensure the dates are in the correct format before saving
        onSave({
            ...formData,
            startDate: new Date(formData.startDate).toISOString(),
            endDate: new Date(formData.endDate).toISOString(),
            totalDays
        });
        navigate('/employee-dashboard'); // Navigate back to leave history
    };

    return (
        <div className='edit-modal'>
            <h2 className='edit-header'>Edit Leave</h2>
            <form onSubmit={handleSubmit} className='edit-form'>
                <div>
                    <label>Start Date:</label>
                    <input
                        type="date"
                        name="startDate"
                        value={formData.startDate}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>End Date:</label>
                    <input
                        type="date"
                        name="endDate"
                        value={formData.endDate}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
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
                <div>
                    <label>Total Days:</label>
                    <input
                        type="number"
                        name="totalDays"
                        value={totalDays}
                        readOnly
                    />
                </div>
                <div>
                    <label>Additional Info:</label>
                    <textarea
                        name="additionalInfo"
                        value={formData.additionalInfo || ''}
                        onChange={handleChange}
                    />
                </div>
                <button type="button" onClick={() => navigate('/employee-dashboard')}>Cancel</button>
                <button type="submit">Save</button>
            </form>
        </div>
    );
};

export default EditLeave;
