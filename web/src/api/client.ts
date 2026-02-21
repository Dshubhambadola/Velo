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

// Admin API
export const admin = {
    getUsers: async (page = 1, limit = 10) => {
        const response = await client.get(`/admin/users?page=${page}&limit=${limit}`);
        return response.data;
    },
    getUser: async (id: string) => {
        const response = await client.get(`/admin/users/${id}`);
        return response.data;
    },
    getComplianceQueue: async () => {
        const response = await client.get('/admin/compliance/queue');
        return response.data;
    },
    approveKYC: async (id: string) => {
        const response = await client.post(`/admin/compliance/${id}/approve`);
        return response.data;
    },
    rejectKYC: async (id: string) => {
        const response = await client.post(`/admin/compliance/${id}/reject`);
        return response.data;
    },
    getTransactions: async (limit = 50) => {
        const response = await client.get(`/admin/transactions?limit=${limit}`);
        return response.data;
    },
};

export default client;
