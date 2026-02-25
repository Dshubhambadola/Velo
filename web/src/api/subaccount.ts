import client from './client';

export const createSubAccount = async (data: { name: string, initial_funding: number, spend_limit?: number }) => {
    const response = await client.post('/sub-accounts', data);
    return response.data;
};

export const getSubAccounts = async () => {
    const response = await client.get('/sub-accounts');
    return response.data;
};

export const depositFunds = async (id: string, amount: number) => {
    const response = await client.post(`/sub-accounts/${id}/deposit`, { amount });
    return response.data;
};
