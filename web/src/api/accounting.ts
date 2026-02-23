import client from './client';

export interface Integration {
    ID: string;
    CompanyID: string;
    Provider: string;
    Status: string;
    LastSyncAt: string | null;
    CreatedAt: string;
}

export const getIntegrations = async () => {
    const response = await client.get('/accounting/integrations');
    return response.data.integrations as Integration[];
};

export const connectIntegration = async (provider: string, accessToken: string, refreshToken: string, expiresIn: number) => {
    const response = await client.post('/accounting/integrations/connect', {
        provider,
        access_token: accessToken,
        refresh_token: refreshToken,
        expires_in: expiresIn
    });
    return response.data.integration as Integration;
};

export const disconnectIntegration = async (provider: string) => {
    const response = await client.delete(`/accounting/integrations/${provider}`);
    return response.data;
};

export const syncIntegration = async (provider: string) => {
    const response = await client.post(`/accounting/integrations/${provider}/sync`);
    return response.data;
};
