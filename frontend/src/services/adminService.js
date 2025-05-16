import axios from 'axios';

const API_URL = '/api/admin';

export const getPendingLeaveRequests = () => {
    return axios.get(`${API_URL}/leave-requests/pending`);
};

export const updateLeaveRequestStatus = (id, status) => {
    return axios.put(`${API_URL}/leave-requests/${id}`, null, { params: { status } });
};
