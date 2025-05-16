import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Modal from 'react-modal';
import './Dashboard.css'; 
import AdminNavbar from './AdminNavbar';

Modal.setAppElement('#root');

const AddEmployee = () => {
  const navigate = useNavigate();
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

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setModalMessage('Employee added successfully!');
    setModalIsOpen(true);

    handleReset();
  };

  const handleReset = () => {
    setFormData({
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
  };

  const closeModal = () => {
    setModalIsOpen(false);
    navigate('/admin-dashboard');
  };

  const handleBackToDashboard = () => {
    navigate('/admin-dashboard');
  };

  return (
    <>
    <AdminNavbar/>
    <div className="add-employee-container">
      <button onClick={handleBackToDashboard} className="back-button">Back to Admin Dashboard</button>
      <h2 className="heading">Add Employee</h2>
      <form onSubmit={handleSubmit} className="employee-form">
        <input
          type="text"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          placeholder="First Name"
          className="form-input"
        />
        <input
          type="text"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          placeholder="Last Name"
          className="form-input"
        />
        <input
          type="text"
          name="role"
          value={formData.role}
          onChange={handleChange}
          placeholder="Role"
          className="form-input"
        />
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
          className="form-input"
        />
        <input
          type="date"
          name="dob"
          value={formData.dob}
          onChange={handleChange}
          className="form-input"
        />
        <input
          type="tel"
          name="mobile"
          value={formData.mobile}
          onChange={handleChange}
          placeholder="Mobile No"
          className="form-input"
        />
        <input
          type="text"
          name="address1"
          value={formData.address1}
          onChange={handleChange}
          placeholder="Address 1"
          className="form-input"
        />
        <input
          type="text"
          name="address2"
          value={formData.address2}
          onChange={handleChange}
          placeholder="Address 2"
          className="form-input"
        />
        <input
          type="text"
          name="country"
          value={formData.country}
          onChange={handleChange}
          placeholder="Country"
          className="form-input"
        />
        <input
          type="text"
          name="state"
          value={formData.state}
          onChange={handleChange}
          placeholder="State"
          className="form-input"
        />
        <input
          type="text"
          name="city"
          value={formData.city}
          onChange={handleChange}
          placeholder="City"
          className="form-input"
        />
        <input
          type="text"
          name="zipcode"
          value={formData.zipcode}
          onChange={handleChange}
          placeholder="Zipcode"
          className="form-input"
        />
        <button type="submit" className="submit-button">Submit</button>
        <button type="button" onClick={handleReset} className="reset-button">Clear/Reset</button>
      </form>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Employee Added"
        className="modal"
        overlayClassName="modal-overlay"
      >
        <h2>{modalMessage}</h2>
        <button onClick={closeModal} className="close-modal-button">Close</button>
      </Modal>
    </div>
    </>
  );
};

export default AddEmployee;
