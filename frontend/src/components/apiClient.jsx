import axios from 'axios';

const isDevelopment = import.meta.env.MODE === 'development';

const myBaseUrl = isDevelopment 
    ? import.meta.env.VITE_API_BASE_URL_LOCAL 
    : import.meta.env.VITE_API_BASE_URL_DEPLOY;

const apiClient = axios.create({
    baseURL: myBaseUrl,
    timeout: 5000,
    headers: {
        "Content-Type": "application/json",
        accept: "application/json"
    }
});

export default apiClient;