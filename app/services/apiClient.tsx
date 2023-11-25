import axios from 'axios';

const apiClient = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_SCOREKEEP_URL,
    withCredentials: true,
    headers:{
        'Scorekeep-API-Key': process.env.NEXT_PUBLIC_API_SCOREKEEP_KEY,
    }
});

export const getCSRFToken = async () => {
    await apiClient.get('/sanctum/csrf-cookie');
};

apiClient.interceptors.request.use((config) => {
    const authorizationToken = sessionStorage.getItem('Authorization');

    if (authorizationToken) {
        config.headers['Authorization'] = authorizationToken;
    }

    return config;
});

export default apiClient;