import client from './client';

export interface Activity {
    id: string;
    user_id: string;
    type: 'TRANSACTION' | 'SECURITY' | 'SYSTEM' | 'USER';
    title: string;
    description: string;
    metadata: any;
    created_at: string;
}

export const getActivities = async (limit: number = 20, offset: number = 0): Promise<Activity[]> => {
    const response = await client.get(`/activity?limit=${limit}&offset=${offset}`);
    return response.data;
};
