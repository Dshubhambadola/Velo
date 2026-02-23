import client from './client';

export interface YieldBalance {
    CompanyID: string;
    AllocatedAmount: number;
    EarnedInterest: number;
    CurrentAPY: number;
    LastAccrualTime: string;
    ProviderReference: string;
    CreatedAt: string;
    UpdatedAt: string;
}

export const getYieldBalance = async () => {
    const response = await client.get('/wallet/yield');
    return response.data.balance as YieldBalance;
};

export const allocateYieldFunds = async (amount: number) => {
    const response = await client.post('/wallet/yield/allocate', { amount });
    return response.data;
};

export const withdrawYieldFunds = async (amount: number) => {
    const response = await client.post('/wallet/yield/withdraw', { amount });
    return response.data;
};
