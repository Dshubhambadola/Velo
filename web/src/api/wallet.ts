import client from './client';

export const createWallet = async () => {
    const response = await client.post('/wallet');
    return response.data;
};

export const getWalletBalance = async () => {
    const response = await client.get('/wallet/balance');
    return response.data;
};

export const getWalletTransactions = async () => {
    const response = await client.get('/wallet/transactions');
    return response.data;
};

// Aliases for compatibility
export const getBalance = getWalletBalance;
export const getTransactions = getWalletTransactions;

export const getLimits = async () => {
    const response = await client.get('/wallet/limits');
    return response.data;
};

export const updateLimits = async (data: any) => {
    const response = await client.put('/wallet/limits', data);
    return response.data;
};

export const getSecurityLogs = async () => {
    const response = await client.get('/wallet/security');
    return response.data;
};

export const getSettings = async () => {
    const response = await client.get('/wallet/settings');
    return response.data;
};

export const updateSettings = async (data: any) => {
    const response = await client.put('/wallet/settings', data);
    return response.data;
};

export const getContacts = async () => {
    const response = await client.get('/wallet/contacts');
    return response.data;
};

export const addContact = async (data: any) => {
    const response = await client.post('/wallet/contacts', data);
    return response.data;
};

export const getAnalytics = async () => {
    const response = await client.get('/wallet/analytics');
    return response.data;
};
