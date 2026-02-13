import client from './client';

export interface User {
    ID: string;
    Email: string;
    FullName: string;
    CompanyID: string;
    UserRoles: { Role: { Name: string } }[];
}

export const listMembers = async () => {
    const response = await client.get('/team/members');
    return response.data;
};

export const inviteMember = async (email: string, fullName: string, role: string, message?: string) => {
    const response = await client.post('/team/invite', { email, full_name: fullName, role, message });
    return response.data;
};

export const updateMemberRole = async (userId: string, role: string) => {
    const response = await client.put(`/team/members/${userId}/role`, { role });
    return response.data;
};

export const removeMember = async (userId: string) => {
    const response = await client.delete(`/team/members/${userId}`);
    return response.data;
};
