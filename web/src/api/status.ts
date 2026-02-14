import axios from 'axios';

// Create a separate instance for public status check if needed, 
// or use the auth client if we want to support both.
// For status page, typically it should be public.
// But our client.ts might inject auth headers.
// Since we registered /status as public (outside protected group but inside main),
// wait, I registered it inside `func main()` but `r.GET("/status", ...)` uses `r` which is the main engine.
// So it is public.

const publicClient = axios.create({
    baseURL: '/api',
});

export interface ComponentStatus {
    name: string;
    status: 'operational' | 'degraded' | 'outage';
    latency_ms: number;
}

export interface SystemStatus {
    overall_status: 'operational' | 'degraded' | 'outage';
    components: ComponentStatus[];
    updated_at: string;
}

export const getSystemStatus = async (): Promise<SystemStatus> => {
    const response = await publicClient.get('/status');
    return response.data;
};
