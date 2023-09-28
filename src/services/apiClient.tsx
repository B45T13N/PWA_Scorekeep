import axios from 'axios';

const apiClient = axios.create({
    baseURL: process.env.REACT_APP_API_SCOREKEEP_URL,
    withCredentials: true,
    headers:{
        'Scorekeep-API-Key': process.env.REACT_APP_API_SCOREKEEP_KEY,
        'Authorization': sessionStorage.getItem("Authorization"),
    }
});

export default apiClient;