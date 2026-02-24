import client from './client';

export const getFxRate = async (source: string, target: string) => {
    const response = await client.get(`/wallet/fx/rate`, {
        params: { source, target }
    });
    return response.data.rate as number;
};

export const convertCurrency = async (source: string, target: string, amount: number) => {
    const response = await client.post('/wallet/fx/convert', {
        source_currency: source,
        target_currency: target,
        amount
    });
    return response.data;
};
