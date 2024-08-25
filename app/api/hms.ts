import axios from 'axios';

const hms = axios.create({
    baseURL: process.env.NEXT_PUBLIC_HMS_BASE_URI
});

// Request interceptor
hms.interceptors.request.use(
    (config) => {
        // Modify the request config, e.g., add headers
        config.headers.Authorization = `Bearer ${process.env.NEXT_PUBLIC_HMS_MANAGEMENT_TOKEN}`;
        config.headers['Content-Type'] = "application/json"
        return config;
    },
    (error) => {
        // Handle request errors
        return Promise.reject(error);
    }
);

// Response interceptor
hms.interceptors.response.use(
    (response) => {
        // Modify the response data
        return response;
    },
    (error) => {
        // Handle response errors, e.g., redirect on 401
        if (error.response?.status === 401) {
            // Redirect to login page
        }
        return Promise.reject(error);
    }
);

export default hms;