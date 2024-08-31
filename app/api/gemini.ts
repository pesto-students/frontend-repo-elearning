import axios from 'axios';

const geminiClient = axios.create({
    baseURL: process.env.NEXT_PUBLIC_HMS_BASE_URI
});

// Request interceptor
geminiClient.interceptors.request.use(
    (config) => {
        // Modify the request config, e.g., add headers
        // config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
        return config;
    },
    (error) => {
        // Handle request errors
        return Promise.reject(error);
    }
);

// Response interceptor
geminiClient.interceptors.response.use(
    (response) => {
        // Modify the response data
        return response;
    },
    (error) => {
        // Handle response errors, e.g., redirect on 401
        if (error.response.status === 401) {
            // Redirect to login page
        }
        return Promise.reject(error);
    }
);

export default geminiClient;