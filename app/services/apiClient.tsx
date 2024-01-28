import axios from 'axios';
import Cookies from 'js-cookie';

const apiClient = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_SCOREKEEP_URL,
    withCredentials: true,
    headers: {
        'Scorekeep-API-Key': process.env.NEXT_PUBLIC_API_SCOREKEEP_KEY,
    }
});

export const initializeCSRFToken = async () => {
    await apiClient.get('/sanctum/csrf-cookie');
};

apiClient.interceptors.request.use((config) => {
    const authorizationToken = Cookies.get('token');
    if (authorizationToken) {
        config.headers['Authorization'] = authorizationToken;
    }

    const csrfToken = Cookies.get('XSRF-TOKEN');
    if (csrfToken) {
        config.headers['X-XSRF-TOKEN'] = csrfToken;
    }

    return config;
});

export default apiClient;
