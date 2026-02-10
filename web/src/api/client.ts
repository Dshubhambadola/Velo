import axios from 'axios';

const client = axios.create({
    baseURL: '/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add a request interceptor to attach the token
client.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Add a response interceptor to handle common errors
client.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            // Handle unauthorized access (e.g., redirect to login)
            // For now, we'll just clear the token
            localStorage.removeItem('token');
        }
        return Promise.reject(error);
    }
);

export default client;
