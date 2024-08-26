import axios from 'axios';

const restClient = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BACKEND_URI
});

// Request interceptor
restClient.interceptors.request.use(
    (config) => {
        const accessToken = localStorage.getItem('accessToken');
        if (accessToken) {
            config.headers['Authorization'] = `Bearer ${accessToken}`;  // Example: Bearer token
            config.headers['accessToken'] = accessToken; // Set custom accessToken header
          }
       
        return config;
    },
    (error) => {
        // Handle request errors
        return Promise.reject(error);
    }
);

// Response interceptor
restClient.interceptors.response.use(
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

export default restClient;