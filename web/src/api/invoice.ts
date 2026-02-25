import client from './client';

export const createInvoice = async (data: any) => {
    const response = await client.post('/invoices', data);
    return response.data;
};

export const getCompanyInvoices = async () => {
    const response = await client.get('/invoices');
    return response.data;
};

// Public endpoints (don't require auth token)
export const getPublicInvoice = async (invoiceId: string) => {
    const response = await client.get(`/public/invoices/${invoiceId}`);
    return response.data;
};

export const payPublicInvoice = async (invoiceId: string) => {
    const response = await client.post(`/public/invoices/${invoiceId}/pay`);
    return response.data;
};
