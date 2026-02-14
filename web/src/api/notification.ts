import client from './client';

export interface Notification {
    id: string;
    user_id: string;
    type: 'INFO' | 'SUCCESS' | 'WARNING' | 'ERROR';
    title: string;
    message: string;
    is_read: boolean;
    link?: string;
    metadata?: any;
    created_at: string;
}

export const getNotifications = async (limit: number = 20, offset: number = 0): Promise<Notification[]> => {
    const response = await client.get(`/notifications?limit=${limit}&offset=${offset}`);
    return response.data;
};

export const markAsRead = async (id: string): Promise<void> => {
    await client.post(`/notifications/${id}/read`);
};

export const markAllAsRead = async (): Promise<void> => {
    await client.post(`/notifications/read-all`);
};
