import client from './client';

export interface ChartPoint {
    date: string;
    value: number;
}

export interface GeoPoint {
    country: string;
    users: number;
    volume: number;
}

export interface AnalyticsData {
    total_volume: number;
    total_volume_trend: number;
    active_users: number;
    active_users_trend: number;
    transactions: number;
    transactions_trend: number;
    network_health: number;
    revenue: number;
    revenue_trend: number;
    chart_data: ChartPoint[];
    geographic_data: GeoPoint[];
}

export const getAnalyticsOverview = async (): Promise<AnalyticsData> => {
    const response = await client.get('/analytics/overview');
    return response.data;
};
