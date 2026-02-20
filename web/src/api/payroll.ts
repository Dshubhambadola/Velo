import client from './client';

// Uploads a batch CSV file
export const uploadBatch = async (file: File, description: string, recurrenceRule?: string, nextExecutionAt?: string) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('description', description);
    if (recurrenceRule) formData.append('recurrence_rule', recurrenceRule);
    if (nextExecutionAt) formData.append('next_execution_at', nextExecutionAt);

    const response = await client.post('/payroll/upload', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
    return response.data;
};

export const approveBatch = async (approvalId: string) => {
    const response = await client.post(`/payroll/approve/${approvalId}`);
    return response.data;
};

// Fetches all batches for the company
export const getBatches = async () => {
    const response = await client.get('/payroll/batches');
    return response.data;
};

// Fetches details of a specific batch
export const getBatch = async (batchId: string) => {
    const response = await client.get(`/payroll/batches/${batchId}`);
    return response.data;
};

// Executes a payroll batch
export const executeBatch = async (batchId: string) => {
    const response = await client.post(`/payroll/batches/${batchId}/execute`);
    return response.data;
};

// Creates a manual payroll batch
export const createBatchManual = async (description: string, payments: any[], recurrenceRule?: string, nextExecutionAt?: string) => {
    const response = await client.post('/payroll/create', {
        description,
        payments,
        recurrence_rule: recurrenceRule,
        next_execution_at: nextExecutionAt,
    });
    return response.data;
};
