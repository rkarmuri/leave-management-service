import React, { useState, useEffect } from 'react';

const EditEmployeeModal = ({ employee, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    role: '',
    email: '',
    dob: '',
    mobile: '',
    address1: '',
    address2: '',
    country: '',
    state: '',
    city: '',
    zipcode: ''
  });

  useEffect(() => {
    if (employee) {
      setFormData({
        firstName: employee.firstName,
        lastName: employee.lastName,
        role: employee.role,
        email: employee.email,
        dob: employee.dob,
        mobile: employee.mobile,
        address1: employee.address1,
        address2: employee.address2,
        country: employee.country,
        state: employee.state,
        city: employee.city,
        zipcode: employee.zipcode,
      });
    }
  }, [employee]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    onSave(formData);
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Edit Employee</h2>
        <form>
          <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} placeholder="First Name" />
          <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} placeholder="Last Name" />
          <input type="text" name="role" value={formData.role} onChange={handleChange} placeholder="Role" />
          <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" />
          <input type="date" name="dob" value={formData.dob} onChange={handleChange} placeholder="Date of Birth" />
          <input type="tel" name="mobile" value={formData.mobile} onChange={handleChange} placeholder="Mobile No" />
          <input type="text" name="address1" value={formData.address1} onChange={handleChange} placeholder="Address 1" />
          <input type="text" name="address2" value={formData.address2} onChange={handleChange} placeholder="Address 2" />
          <input type="text" name="country" value={formData.country} onChange={handleChange} placeholder="Country" />
          <input type="text" name="state" value={formData.state} onChange={handleChange} placeholder="State" />
          <input type="text" name="city" value={formData.city} onChange={handleChange} placeholder="City" />
          <input type="text" name="zipcode" value={formData.zipcode} onChange={handleChange} placeholder="Zipcode" />
        </form>
        <button onClick={handleSubmit}>Save</button>
        <button onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
};

export default EditEmployeeModal;
