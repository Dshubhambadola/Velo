import client from './client';

export interface Role {
    ID: string;
    Name: string;
    Description: string;
    IsSystemRole: boolean;
}

export interface Permission {
    ID: string;
    Resource: string;
    Action: string;
    Description: string;
}

export const listRoles = async () => {
    const response = await client.get('/roles');
    return response.data;
};

export const createRole = async (name: string, description: string, permissions: string[] = []) => {
    const response = await client.post('/roles', { name, description, permissions });
    return response.data;
};

export const listPermissions = async () => {
    const response = await client.get('/permissions');
    return response.data;
};
