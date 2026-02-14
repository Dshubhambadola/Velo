import client from './client';

export interface BridgeQuote {
    id: string;
    source_chain: string;
    dest_chain: string;
    token: string;
    amount: number;
    fee: number;
    estimated_time: string;
    exchange_rate: number;
    expires_at: number;
}

export const getQuote = async (sourceChain: string, destChain: string, token: string, amount: string): Promise<BridgeQuote> => {
    const response = await client.get(`/bridge/quote?source_chain=${sourceChain}&dest_chain=${destChain}&token=${token}&amount=${amount}`);
    return response.data;
};

export const executeBridge = async (quoteID: string): Promise<any> => {
    const response = await client.post('/bridge/execute', { quote_id: quoteID });
    return response.data;
};
