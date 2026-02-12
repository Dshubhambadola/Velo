import client from './client';

export const createWallet = async (userId: string) => {
    const response = await client.post('/wallet', { user_id: userId });
    return response.data;
};

export const getBalance = async () => {
    const response = await client.get('/wallet/balance');
    return response.data;
};

export const getTransactions = async () => {
    const response = await client.get('/wallet/transactions');
    return response.data;
};

export const getSettings = async () => {
    const response = await client.get('/wallet/settings');
    return response.data;
};

export const updateSettings = async (settings: any) => {
    const response = await client.put('/wallet/settings', settings);
    return response.data;
};

export const getLimits = async () => {
    const response = await client.get('/wallet/limits');
    return response.data;
};

export const updateLimits = async (limits: any) => {
    const response = await client.put('/wallet/limits', limits);
    return response.data;
};

export const getContacts = async () => {
    const response = await client.get('/wallet/contacts');
    return response.data;
};

export const addContact = async (contact: any) => {
    const response = await client.post('/wallet/contacts', contact);
    return response.data;
};

export const getSecurityLogs = async () => {
    const response = await client.get('/wallet/security');
    return response.data;
};

export const getAnalytics = async () => {
    const response = await client.get('/wallet/analytics');
    return response.data;
};
