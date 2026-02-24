import client from './client';

export const getCompanyTaxDocuments = async (year?: number) => {
    const response = await client.get(`/tax/documents`, {
        params: { year }
    });
    return response.data;
};

export const uploadTaxDocument = async (data: any) => {
    const response = await client.post('/tax/documents/upload', data);
    return response.data;
};

export const generate1099s = async (year: number) => {
    const response = await client.post('/tax/generate-1099s', { year });
    return response.data;
};
