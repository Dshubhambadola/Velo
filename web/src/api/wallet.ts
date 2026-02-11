import client from './client';

export const createWallet = async (userId: string) => {
    const response = await client.post('/wallet', { user_id: userId });
    return response.data;
};

export const getBalance = async (walletId: string) => {
    const response = await client.get(`/wallet/${walletId}`);
    return response.data;
};
