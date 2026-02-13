import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import { getTransactions } from '../api/wallet';

const TransactionHistory: React.FC = () => {
    const [transactions, setTransactions] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        loadTransactions();
    }, []);

    const loadTransactions = async () => {
        try {
            setLoading(true);
            const data = await getTransactions();
            const mapped = data.map((tx: any) => mapTransactionToUI(tx));
            setTransactions(mapped);
            setError(null);
        } catch (err) {
            console.error(err);
            setError('Failed to load transactions');
        } finally {
            setLoading(false);
        }
    };

    const mapTransactionToUI = (tx: any) => {
        // const isReceive = tx.to_address === "MY_WALLET_ADDRESS"; // In real app check against user wallet
        // For MVP we don't know my address here easily without context, let's assume 'transfer' type direction based on logic or just generic

        let type = 'Transaction';
        let icon = 'swap_horiz';
        let iconColor = 'text-[#A3A3A3]';

        if (tx.type === 'transfer') {
            type = 'Transfer';
            icon = 'swap_horiz';
        }

        // Just simple mapping for now
        return {
            id: tx.id || tx.transaction_hash,
            type: type,
            subType: tx.from_address ? `From: ${tx.from_address.substring(0, 6)}...` : `To: ${tx.to_address.substring(0, 6)}...`,
            status: tx.status,
            amount: `${tx.amount} ${tx.currency}`,
            value: '$--.--',
            hash: tx.transaction_hash ? `${tx.transaction_hash.substring(0, 6)}...${tx.transaction_hash.substring(tx.transaction_hash.length - 4)}` : '---',
            date: new Date(tx.created_at).toLocaleDateString(),
            time: new Date(tx.created_at).toLocaleTimeString(),
            icon: icon,
            iconColor: iconColor,
            statusColor: tx.status === 'completed' ? 'text-[#10b981]' : 'text-[#A3A3A3]',
            statusBg: tx.status === 'completed' ? 'bg-[#10b981]/10' : 'bg-[#262626]',
            statusBorder: tx.status === 'completed' ? 'border-[#10b981]/20' : 'border-[#262626]',
        };
    };

    return (
        <div className="flex min-h-screen bg-black text-white font-display">
            <Sidebar />
            <main className="flex-1 flex flex-col h-screen overflow-hidden">
                {/* Header */}
                <header className="h-20 border-b border-[#262626] bg-[#121212]/50 backdrop-blur-md flex items-center justify-between px-8 z-20">
                    <div className="relative flex-1 max-w-xl">
                        <span className="material-icons absolute left-3 top-1/2 -translate-y-1/2 text-[#A3A3A3] text-sm">search</span>
                        <input className="w-full bg-black border-[#262626] rounded-lg pl-10 pr-4 py-2 text-sm text-white focus:ring-1 focus:ring-[#1e3fae] focus:border-[#1e3fae] placeholder:text-[#A3A3A3]/50" placeholder="Search by transaction hash or address..." type="text" />
                    </div>
                    <div className="flex items-center gap-4 ml-6">
                        <button className="w-10 h-10 rounded-lg border border-[#262626] flex items-center justify-center hover:bg-[#121212] transition-colors">
                            <span className="material-icons text-[#A3A3A3]">notifications</span>
                        </button>
                        <div className="h-8 w-[1px] bg-[#262626]"></div>
                        <div className="text-right">
                            <p className="text-xs text-[#A3A3A3]">Balance</p>
                            <p className="text-sm font-bold">12.450 ETH</p>
                        </div>
                    </div>
                </header>

                <div className="flex-1 flex overflow-hidden">
                    {/* Filter Sidebar */}
                    <aside className="w-72 bg-[#121212] border-r border-[#262626] p-6 overflow-y-auto hidden xl:block">
                        <div className="flex items-center justify-between mb-8">
                            <h2 className="text-lg font-semibold">Filters</h2>
                            <button className="text-xs text-[#1e3fae] hover:underline">Clear all</button>
                        </div>
                        <div className="space-y-8">
                            {/* Date Range */}
                            <div>
                                <label className="text-xs font-semibold text-[#A3A3A3] uppercase tracking-widest mb-4 block">Time Range</label>
                                <select className="w-full bg-black border-[#262626] rounded-lg text-sm p-2.5 text-white focus:ring-[#1e3fae] focus:border-[#1e3fae]">
                                    <option>Last 30 Days</option>
                                    <option>Last 7 Days</option>
                                    <option>Last 24 Hours</option>
                                    <option>Custom Range</option>
                                </select>
                            </div>

                            {/* Status */}
                            <div>
                                <label className="text-xs font-semibold text-[#A3A3A3] uppercase tracking-widest mb-4 block">Status</label>
                                <div className="flex flex-wrap gap-2">
                                    <button className="px-3 py-1.5 rounded-full text-xs border border-[#1e3fae] bg-[#1e3fae]/20 text-white">All</button>
                                    <button className="px-3 py-1.5 rounded-full text-xs border border-[#262626] bg-black text-[#A3A3A3] hover:border-[#10b981]/50 hover:text-white transition-all">Success</button>
                                    <button className="px-3 py-1.5 rounded-full text-xs border border-[#262626] bg-black text-[#A3A3A3] hover:border-[#1e3fae]/50 hover:text-white transition-all">Pending</button>
                                    <button className="px-3 py-1.5 rounded-full text-xs border border-[#262626] bg-black text-[#A3A3A3] hover:border-[#ef4444]/50 hover:text-white transition-all">Failed</button>
                                </div>
                            </div>
                        </div>
                    </aside>

                    {/* Table Section */}
                    <section className="flex-1 overflow-y-auto bg-black relative">
                        {error && (
                            <div className="p-4 bg-red-900/20 border-b border-red-500/50 text-red-200 text-center">
                                {error}
                            </div>
                        )}

                        {loading ? (
                            <div className="flex items-center justify-center h-full">
                                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#1e3fae]"></div>
                            </div>
                        ) : transactions.length === 0 ? (
                            <div className="flex flex-col items-center justify-center h-full text-[#A3A3A3]">
                                <span className="material-icons text-4xl mb-2">history</span>
                                <p>No transactions found</p>
                            </div>
                        ) : (
                            <table className="w-full border-collapse">
                                <thead className="sticky top-0 bg-[#121212] z-10">
                                    <tr className="text-left border-b border-[#262626]">
                                        <th className="p-4 w-12 text-center">
                                            <input className="rounded border-[#262626] bg-black text-[#1e3fae] focus:ring-[#1e3fae]" type="checkbox" />
                                        </th>
                                        <th className="p-4 text-xs font-semibold text-[#A3A3A3] uppercase tracking-wider">Transaction</th>
                                        <th className="p-4 text-xs font-semibold text-[#A3A3A3] uppercase tracking-wider">Status</th>
                                        <th className="p-4 text-xs font-semibold text-[#A3A3A3] uppercase tracking-wider">Amount</th>
                                        <th className="p-4 text-xs font-semibold text-[#A3A3A3] uppercase tracking-wider">Hash</th>
                                        <th className="p-4 text-xs font-semibold text-[#A3A3A3] uppercase tracking-wider text-right">Time</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-[#121212]">
                                    {transactions.map((tx) => (
                                        <tr key={tx.id} className={`hover:bg-[#1e3fae]/5 transition-colors group`}>
                                            <td className="p-4 text-center">
                                                <input className="rounded border-[#262626] bg-black text-[#1e3fae] focus:ring-[#1e3fae]" type="checkbox" />
                                            </td>
                                            <td className="p-4">
                                                <div className="flex items-center gap-3">
                                                    <div className={`w-9 h-9 rounded bg-[#121212] flex items-center justify-center border border-[#121212] group-hover:border-[#1e3fae]/50`}>
                                                        <span className={`material-icons ${tx.iconColor} text-sm`}>{tx.icon}</span>
                                                    </div>
                                                    <div>
                                                        <p className="text-sm font-medium">{tx.type}</p>
                                                        <p className="text-[10px] text-[#A3A3A3]">{tx.subType}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="p-4">
                                                <div className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-full ${tx.statusBg} ${tx.statusColor} text-[10px] font-bold uppercase ${tx.glow} border ${tx.statusBorder}`}>
                                                    <span className={`material-icons text-[12px]`}>{tx.status === 'Processing' ? 'schedule' : 'check_circle'}</span>
                                                    {tx.status}
                                                </div>
                                            </td>
                                            <td className="p-4">
                                                <div className="text-sm font-semibold">{tx.amount}</div>
                                                <div className="text-[10px] text-[#A3A3A3]">{tx.value}</div>
                                            </td>
                                            <td className="p-4">
                                                <span className="font-mono text-xs text-[#1e3fae] bg-[#1e3fae]/10 px-2 py-1 rounded">{tx.hash}</span>
                                            </td>
                                            <td className="p-4 text-right">
                                                <div className="text-sm text-white">{tx.date}</div>
                                                <div className="text-[10px] text-[#A3A3A3]">{tx.time}</div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                    </section>
                </div>
            </main>
        </div>
    );
};

export default TransactionHistory;
