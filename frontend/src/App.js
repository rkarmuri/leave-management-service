import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './home/Home';
import About from './home/About';
import AdminLogin from './home/AdminLogin';
import EmployeeLogin from './home/EmployeeLogin';
import Contact from './home/Contact';
import AdminDashboard from './components/admin/AdminDashboard';
import EmployeeDashboard from './components/employee/EmployeeDashboard';
import AddEmployee from './components/admin/AddEmployee'; 
import EmployeeAdministration from './components/admin/EmployeeAdministration'; 
import LeaveAdministration from './components/admin/LeaveAdministration'; 
import ApplyLeave from './components/employee/ApplyLeave'; 
import LeaveHistory from './components/employee/LeaveHistory'; 
import EditAccount from './components/employee/EditAccount';
//import TestConnection from './services/TestConnection';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/employee-login" element={<EmployeeLogin />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/employee-dashboard" element={<EmployeeDashboard />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/add-employee" element={<AddEmployee />} />
        <Route path="/employee-administration/:adminId" element={<EmployeeAdministration />} />
        <Route path="/leave-administration" element={<LeaveAdministration />} />
        <Route path="/apply-leave/:id" element={<ApplyLeave />} />
        <Route path="/leave-history/:id" element={<LeaveHistory />} />
        <Route path="/edit-account" element={<EditAccount />} />
        {/*<Route path="/test-connection" element={<TestConnection />} />*/}
      </Routes>
    </Router>
  );
};

export default App;
