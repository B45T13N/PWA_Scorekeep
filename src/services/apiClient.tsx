import axios from 'axios';

const apiClient = axios.create({
    baseURL: process.env.REACT_APP_API_SCOREKEEP_URL,
    withCredentials: true,
});

export default apiClient;