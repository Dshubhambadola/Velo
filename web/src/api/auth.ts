import client from './client';

export const register = async (email: string, password: string, fullName: string) => {
    const response = await client.post('/auth/register', { email, password, full_name: fullName });
    return response.data;
};

export const login = async (email: string, password: string) => {
    const response = await client.post('/auth/login', { email, password });
    return response.data;
};

export const forgotPassword = async (email: string) => {
    const response = await client.post('/auth/forgot-password', { email });
    return response.data;
};

export const resetPassword = async (token: string, newPassword: string) => {
    const response = await client.post('/auth/reset-password', { token, new_password: newPassword });
    return response.data;
};

export const requestMagicLink = async (email: string) => {
    const response = await client.post('/auth/magic-link', { email });
    return response.data;
};

export const loginWithMagicLink = async (token: string) => {
    const response = await client.post('/auth/magic-login', { token });
    return response.data;
};

export const generate2FA = async (userId: string) => {
    const response = await client.post('/auth/2fa/generate', { user_id: userId });
    return response.data;
};

export const enable2FA = async (userId: string, code: string) => {
    const response = await client.post('/auth/2fa/enable', { user_id: userId, code });
    return response.data;
};

export const verify2FA = async (userId: string, code: string) => {
    const response = await client.post('/auth/2fa/verify', { user_id: userId, code });
    return response.data;
};

export const initiateSSO = async (provider: string) => {
    const response = await client.get(`/auth/sso/${provider}/initiate`);
    return response.data;
};
