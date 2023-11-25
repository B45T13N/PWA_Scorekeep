import axios from 'axios';

const apiClient = axios.create({
    baseURL: process.env.REACT_APP_API_SCOREKEEP_URL,
    withCredentials: true,
    headers:{
        'Scorekeep-API-Key': process.env.REACT_APP_API_SCOREKEEP_KEY,
    }
});

apiClient.interceptors.request.use((config) => {
    const authorizationToken = sessionStorage.getItem('Authorization');

    if (authorizationToken) {
        config.headers['Authorization'] = authorizationToken;
    }

    return config;
});

export default apiClient;