import client from './client';

export const getAuditLogs = async (limit: number = 50, offset: number = 0) => {
    const response = await client.get(`/developer/audit-logs?limit=${limit}&offset=${offset}`);
    return response.data;
};
