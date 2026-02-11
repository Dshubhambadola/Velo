import client from './client';

export interface CompanyData {
    name: string;
    website: string;
    size: string;
    industry: string;
    location: string;
}

export interface KYCData {
    first_name: string;
    last_name: string;
    dob: string;
    phone_code: string;
    phone: string;
    address: string;
    city: string;
    state: string;
    zip: string;
    country: string;
    id_type: string;
    id_number: string;
    issuing_country: string;
    id_expiry: string;
}

export const updateCompany = async (data: CompanyData) => {
    const response = await client.post('/onboarding/company', data);
    return response.data;
};

export const updateKYC = async (data: KYCData) => {
    const response = await client.post('/onboarding/kyc', data);
    return response.data;
};

export const completeOnboarding = async () => {
    const response = await client.post('/onboarding/complete');
    return response.data;
};
