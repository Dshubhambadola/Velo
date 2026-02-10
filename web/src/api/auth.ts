import client from './client';

export const register = async (email: string, password: string, fullName: string) => {
    const response = await client.post('/auth/register', { email, password, full_name: fullName });
    return response.data;
};

export const login = async (email: string, password: string) => {
    const response = await client.post('/auth/login', { email, password });
    return response.data;
};
