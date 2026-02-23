import client from './client';

export interface Card {
    ID: string;
    Type: string;
    Status: string;
    Last4: string;
    ExpiryMonth: number;
    ExpiryYear: number;
    DailyLimit: number;
    MonthlyLimit: number;
    CreatedAt: string;
}

export const getCards = async () => {
    const response = await client.get('/wallet/cards');
    return response.data.cards;
};

export const createCard = async (type: string, daily_limit: number, monthly_limit: number, user_id: string) => {
    const response = await client.post('/wallet/cards', {
        type,
        daily_limit,
        monthly_limit,
        user_id
    });
    return response.data.card;
};

export const updateCardStatus = async (id: string, status: string) => {
    const response = await client.put(`/wallet/cards/${id}/status`, { status });
    return response.data;
};

export const updateCardLimits = async (id: string, daily_limit: number, monthly_limit: number) => {
    const response = await client.put(`/wallet/cards/${id}/limits`, { daily_limit, monthly_limit });
    return response.data;
};
