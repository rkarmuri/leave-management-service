import axios from 'axios';

const API_URL = '/api/employee';

export const submitLeaveRequest = (leaveRequest) => {
    return axios.post(`${API_URL}/leave-requests`, leaveRequest);
};

export const getEmployeeLeaveRequests = (userId) => {
    return axios.get(`${API_URL}/leave-requests/${userId}`);
};
