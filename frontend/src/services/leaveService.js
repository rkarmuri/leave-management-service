// services/leaveService.js
import axios from 'axios';

const API_URL = 'http://localhost:8080/api/leave-requests'; // Update with your actual API URL

export const getLeaveRequestsByEmployeeId = async (employeeId) => {
    try {
        const response = await axios.get(`${API_URL}/employee/${employeeId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching leave requests:', error);
        throw error;
    }
};

export const getLeaveRequestsByUsername = async (username) => {
    try {
        const response = await axios.get(`${API_URL}/username/${username}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching leave requests:', error);
        throw error;
    }
};

export const deleteLeaveRequest = async (leaveId) => {
    try {
        await axios.delete(`${API_URL}/${leaveId}`);
    } catch (error) {
        console.error('Error deleting leave request:', error);
        throw error;
    }
};

export const updateLeaveRequest = async (updatedLeave) => {
    const response = await fetch(`${API_URL}/${updatedLeave.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            id: updatedLeave.id,
            leaveType: updatedLeave.leaveType,
            startDate: updatedLeave.startDate,  // Use startDate
            endDate: updatedLeave.endDate,      // Use endDate
            employeeId: updatedLeave.employeeId,
            totalDays: updatedLeave.totalDays,
            status: updatedLeave.status,
            employeeName: updatedLeave.employeeName
        }),
    });
    if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(`Failed to update leave request: ${errorMessage}`);
    }
    return response.json();
};


