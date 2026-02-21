import { useState, useEffect } from 'react';
import { admin } from '../../api/client';
import { ArrowTrendingUpIcon, ArrowTrendingDownIcon } from '@heroicons/react/24/solid';

export default function AdminTransactions() {
    const [transactions, setTransactions] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadTransactions();
    }, []);

    const loadTransactions = async () => {
        try {
            setLoading(true);
            const data = await admin.getTransactions(50);
            setTransactions(data || []);
        } catch (error) {
            console.error('Failed to load transactions', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold text-white">Recent Transactions</h1>

            <div className="bg-gray-800 shadow overflow-hidden sm:rounded-lg">
                <ul className="divide-y divide-gray-700">
                    {loading ? (
                        <li className="px-6 py-4 text-center text-gray-400">Loading...</li>
                    ) : transactions.map((tx) => (
                        <li key={tx.ID} className="px-6 py-4 hover:bg-gray-750 transition-colors">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                    <div className="flex-shrink-0">
                                        {tx.Type === 'deposit' ? (
                                            <ArrowTrendingUpIcon className="h-8 w-8 text-green-400" />
                                        ) : (
                                            <ArrowTrendingDownIcon className="h-8 w-8 text-red-400" />
                                        )}
                                    </div>
                                    <div className="ml-4">
                                        <p className="text-sm font-medium text-white">
                                            {tx.Description || 'Transaction'}
                                        </p>
                                        <div className="text-xs text-gray-400">
                                            {new Date(tx.CreatedAt).toLocaleString()}
                                        </div>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className={`text-sm font-bold ${tx.Amount > 0 ? 'text-green-400' : 'text-white'}`}>
                                        {tx.Amount > 0 ? '+' : ''}
                                        {parseFloat(tx.Amount).toFixed(2)} {tx.Currency}
                                    </p>
                                    <p className="text-xs text-gray-500">{tx.Status}</p>
                                </div>
                            </div>
                        </li>
                    ))}
                    {transactions.length === 0 && !loading && (
                        <li className="px-6 py-4 text-center text-gray-400">No transactions found.</li>
                    )}
                </ul>
            </div>
        </div>
    );
}
