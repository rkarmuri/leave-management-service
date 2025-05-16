import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import EditLeave from './EditLeave';
import ConfirmDelete from './ConfirmDelete';
import ApplyLeave from './ApplyLeave';
import './Dashboard2.css'; 
import EmployeeNavbar from './EmployeeNavbar';
import { getLeaveRequestsByEmployeeId, deleteLeaveRequest, updateLeaveRequest } from '../../services/leaveService';

const LeaveHistory = ({ username, employeeId }) => { 
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isApplyLeaveModalOpen, setIsApplyLeaveModalOpen] = useState(false);
    const [selectedLeave, setSelectedLeave] = useState(null);
    const [leaves, setLeaves] = useState([]);
    const modalOverlayRef = useRef(null);
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        const fetchLeaves = async () => {
            try {
                let leaveData;
                if (id) {
                    leaveData = await getLeaveRequestsByEmployeeId(id);
                    console.log('Fetched leave data:', leaveData);
                }
                setLeaves(leaveData);
            } catch (error) {
                console.error('Failed to fetch leave data:', error);
            }
        };

        fetchLeaves();
    }, [id]);

    const handleOpenEditModal = (leave) => {
        setSelectedLeave(leave);
        setIsEditModalOpen(true);
    };

    const handleCloseEditModal = () => {
        setIsEditModalOpen(false);
    };

    const handleSaveEdit = async(updatedLeave) => {
        try{
            await updateLeaveRequest(updatedLeave);
            setLeaves(leaves.map(leave => leave.id === updatedLeave.id ? updatedLeave : leave));
            handleCloseEditModal();
        }
        catch(error){
            console.error('Failed to update leave request:', error);
        }
    };

    const handleOpenDeleteModal = (leave) => {
        setSelectedLeave(leave);
        setIsDeleteModalOpen(true);
    };

    const handleCloseDeleteModal = () => {
        setIsDeleteModalOpen(false);
    };

    const handleConfirmDelete = async(leaveId) => {
        try {
            await deleteLeaveRequest(leaveId);
            setLeaves(leaves.filter(leave => leave.id !== leaveId));
            handleCloseDeleteModal();
        } catch (error) {
            console.error('Failed to delete leave request:', error);
        }
    };

    const handleOpenApplyLeaveModal = () => {
        setIsApplyLeaveModalOpen(true);
    };

    const handleCloseApplyLeaveModal = () => {
        setIsApplyLeaveModalOpen(false);
    };

    const handleClickOutside = useCallback((event) => {
        if (modalOverlayRef.current && !modalOverlayRef.current.contains(event.target)) {
            handleCloseEditModal();
            handleCloseDeleteModal();
            handleCloseApplyLeaveModal();
        }
    }, []);

    useEffect(() => {
        if (isEditModalOpen || isDeleteModalOpen || isApplyLeaveModalOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isEditModalOpen, isDeleteModalOpen, isApplyLeaveModalOpen, handleClickOutside]);

    const handleBackToDashboard = () => {
        navigate('/employee-dashboard');
    };

    return (
        <div className="leave-history-container">
            <EmployeeNavbar />
            <button onClick={handleBackToDashboard} className="button back-button">Back to Dashboard</button>
            <h2 className="heading">Leave History</h2>
            <button onClick={handleOpenApplyLeaveModal} className="button apply-button">Apply New Leave</button>
            <table className="leave-history-table">
                <thead>
                    <tr>
                        <th>Emp ID</th>
                        <th>Emp Name</th>
                        <th>Start Date</th>
                        <th>End Date</th>
                        <th>No of Days</th>
                        <th>Leave Type</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {leaves.map((leave) => (
                        <tr key={leave.id}>
                            <td>{leave.employeeId}</td>
                            <td>{leave.employeeName}</td>
                            <td>{new Date(leave.startDate).toLocaleDateString()}</td>
                            <td>{new Date(leave.endDate).toLocaleDateString()}</td>
                            <td>{leave.totalDays}</td>
                            <td>{leave.leaveType}</td>
                            <td>{leave.status}</td>
                            <td className='action-column'>
                                {leave.status === 'PENDING' && (
                                    <>
                                        <button style={{ display: 'inline-block' }} onClick={() => handleOpenEditModal(leave)}>Edit</button>
                                        <button style={{ display: 'inline-block' }} onClick={() => handleOpenDeleteModal(leave)}>Delete</button>
                                    </>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {isEditModalOpen && selectedLeave && (
                <div ref={modalOverlayRef} className="modal-overlay">
                    <div className="modal">
                        <button onClick={handleCloseEditModal} className="close-button">X</button>
                        <EditLeave
                            leave={selectedLeave}
                            onSave={handleSaveEdit}
                        />
                    </div>
                </div>
            )}
            {isDeleteModalOpen && (
                <div ref={modalOverlayRef} className="modal-overlay">
                    <div className="modal">
                        <ConfirmDelete
                            leaveId={selectedLeave?.id}
                            onConfirm={handleConfirmDelete}
                            onCancel={handleCloseDeleteModal}
                        />
                    </div>
                </div>
            )}
            {isApplyLeaveModalOpen && (
                <div ref={modalOverlayRef} className="modal-overlay">
                    <div className="modal">
                        <button onClick={handleCloseApplyLeaveModal} className="close-button">X</button>
                        <ApplyLeave />
                    </div>
                </div>
            )}
        </div>
    );
};

export default LeaveHistory;
