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
