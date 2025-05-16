import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Dashboard2.css';
import EmployeeNavbar from './EmployeeNavbar';

const EditAccount = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        dateOfBirth: '',
        mobileNo: '',
        address1: '',
        address2: '',
        country: '',
        state: '',
        city: '',
        zipcode: '',
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Perform submission logic
        console.log("Form data submitted:", formData);
        // Navigate back after submission
        navigate('/employee-dashboard');
    };

    const handleBack = () => {
        navigate('/employee-dashboard');
    };

    return (
        <>
        <EmployeeNavbar/>
        <div className="edit-account-container">
            <button className="back-button" onClick={handleBack}>Back to Dashboard</button>
            <h2>Edit Account</h2>
            <form onSubmit={handleSubmit} className="edit-account-form">
                {Object.keys(formData).map((key) => (
                    <label key={key} className="form-label">
                        {key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')}:
                        <input
                            type={key === "dateOfBirth" ? "date" : "text"}
                            name={key}
                            value={formData[key]}
                            onChange={handleChange}
                            required={key !== "address2"}
                            className="form-input"
                        />
                    </label>
                ))}
                <button type="submit" className="submit-button">Save</button>
            </form>
        </div>
        </>
    );
};

export default EditAccount;
