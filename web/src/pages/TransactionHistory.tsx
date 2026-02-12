import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';

const TransactionHistory: React.FC = () => {
    // Mock data for transactions
    const [transactions] = useState([
        {
            id: 1,
            type: 'Swap ETH for VELO',
            subType: 'Uniswap V3 Protocol',
            status: 'Completed',
            amount: '1.450 ETH',
            value: '$3,241.02',
            hash: '0x4a8b...f2e9',
            date: 'Oct 24, 2023',
            time: '14:23:45 UTC',
            icon: 'swap_horiz',
            iconColor: 'text-[#1e3fae]',
            statusColor: 'text-[#10b981]',
            statusBg: 'bg-[#10b981]/10',
            statusBorder: 'border-[#10b981]/20',
            glow: 'shadow-[0_0_10px_rgba(16,185,129,0.4)]'
        },
        {
            id: 2,
            type: 'Send Funds',
            subType: 'To: 0x82...12fa',
            status: 'Processing',
            amount: '0.125 ETH',
            value: '$280.12',
            hash: '0x9c3d...a041',
            date: 'Oct 24, 2023',
            time: '14:18:12 UTC',
            icon: 'north_east',
            iconColor: 'text-[#A3A3A3]',
            statusColor: 'text-[#1e3fae]',
            statusBg: 'bg-[#1e3fae]/10',
            statusBorder: 'border-[#1e3fae]/20',
            glow: 'shadow-[0_0_10px_rgba(30,63,174,0.4)]',
            animate: true
        },
        {
            id: 3,
            type: 'Receive Funds',
            subType: 'From: Binance Hot Wallet',
            status: 'Completed',
            amount: '12.000 ETH',
            value: '$26,812.44',
            hash: '0x2f1a...bb02',
            date: 'Oct 23, 2023',
            time: '09:12:05 UTC',
            icon: 'south_west',
            iconColor: 'text-[#A3A3A3]',
            statusColor: 'text-[#10b981]',
            statusBg: 'bg-[#10b981]/10',
            statusBorder: 'border-[#10b981]/20',
            glow: 'shadow-[0_0_10px_rgba(16,185,129,0.4)]'
        },
        {
            id: 4,
            type: 'Contract Interaction',
            subType: 'Liquidity Addition',
            status: 'Failed',
            amount: '0.000 ETH',
            value: '$0.00 (Gas Only)',
            hash: '0x67ee...c554',
            date: 'Oct 22, 2023',
            time: '23:44:56 UTC',
            icon: 'layers',
            iconColor: 'text-[#A3A3A3]',
            statusColor: 'text-[#ef4444]',
            statusBg: 'bg-[#ef4444]/10',
            statusBorder: 'border-[#ef4444]/20',
            glow: 'shadow-[0_0_10px_rgba(239,68,68,0.4)]',
            statusIcon: 'cancel'
        },
        {
            id: 5,
            type: 'Swap WBTC for ETH',
            subType: '1inch Aggregator',
            status: 'Completed',
            amount: '0.452 ETH',
            value: '$1,012.30',
            hash: '0x918c...00da',
            date: 'Oct 21, 2023',
            time: '12:10:00 UTC',
            icon: 'swap_horiz',
            iconColor: 'text-[#A3A3A3]',
            statusColor: 'text-[#10b981]',
            statusBg: 'bg-[#10b981]/10',
            statusBorder: 'border-[#10b981]/20',
            opacity: 'opacity-60'
        },
        {
            id: 6,
            type: 'Flash Loan',
            subType: 'Aave V3',
            status: 'Completed',
            amount: '150.0 ETH',
            value: '$335,155.10',
            hash: '0x33e1...da2e',
            date: 'Oct 21, 2023',
            time: '11:55:22 UTC',
            icon: 'bolt',
            iconColor: 'text-[#A3A3A3]',
            statusColor: 'text-[#10b981]',
            statusBg: 'bg-[#10b981]/10',
            statusBorder: 'border-[#10b981]/20',
            opacity: 'opacity-60'
        },
        {
            id: 7,
            type: 'Revoke Allowance',
            subType: 'OpenSea SeaPort',
            status: 'Completed',
            amount: '0.000 ETH',
            value: '$0.00',
            hash: '0x00ae...ff91',
            date: 'Oct 20, 2023',
            time: '18:33:01 UTC',
            icon: 'shield',
            iconColor: 'text-[#A3A3A3]',
            statusColor: 'text-[#10b981]',
            statusBg: 'bg-[#10b981]/10',
            statusBorder: 'border-[#10b981]/20',
            opacity: 'opacity-60'
        }
    ]);

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
                            {/* Transaction Type */}
                            <div>
                                <label className="text-xs font-semibold text-[#A3A3A3] uppercase tracking-widest mb-4 block">Transaction Type</label>
                                <div className="space-y-3">
                                    <label className="flex items-center gap-3 cursor-pointer group">
                                        <input defaultChecked className="rounded border-[#262626] bg-black text-[#1e3fae] focus:ring-[#1e3fae]" type="checkbox" />
                                        <span className="text-sm text-[#A3A3A3] group-hover:text-white transition-colors">Transfers</span>
                                    </label>
                                    <label className="flex items-center gap-3 cursor-pointer group">
                                        <input defaultChecked className="rounded border-[#262626] bg-black text-[#1e3fae] focus:ring-[#1e3fae]" type="checkbox" />
                                        <span className="text-sm text-[#A3A3A3] group-hover:text-white transition-colors">Swaps</span>
                                    </label>
                                    <label className="flex items-center gap-3 cursor-pointer group">
                                        <input className="rounded border-[#262626] bg-black text-[#1e3fae] focus:ring-[#1e3fae]" type="checkbox" />
                                        <span className="text-sm text-[#A3A3A3] group-hover:text-white transition-colors">NFT Mint</span>
                                    </label>
                                    <label className="flex items-center gap-3 cursor-pointer group">
                                        <input className="rounded border-[#262626] bg-black text-[#1e3fae] focus:ring-[#1e3fae]" type="checkbox" />
                                        <span className="text-sm text-[#A3A3A3] group-hover:text-white transition-colors">Contract Call</span>
                                    </label>
                                </div>
                            </div>
                            {/* Amount Range */}
                            <div>
                                <label className="text-xs font-semibold text-[#A3A3A3] uppercase tracking-widest mb-4 block">Amount (ETH)</label>
                                <div className="px-2">
                                    <input className="w-full h-1.5 bg-black border border-[#262626] rounded-lg appearance-none cursor-pointer accent-[#1e3fae]" type="range" />
                                    <div className="flex justify-between mt-2">
                                        <span className="text-[10px] text-[#A3A3A3]">0.01</span>
                                        <span className="text-[10px] text-[#A3A3A3]">100+</span>
                                    </div>
                                </div>
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
                                    <tr key={tx.id} className={`hover:bg-[#1e3fae]/5 transition-colors group ${tx.opacity || ''}`}>
                                        <td className="p-4 text-center">
                                            <input className="rounded border-[#262626] bg-black text-[#1e3fae] focus:ring-[#1e3fae]" type="checkbox" defaultChecked={tx.id <= 3} />
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
                                                <span className={`material-icons text-[12px] ${tx.animate ? 'animate-pulse' : ''}`}>{tx.statusIcon || (tx.status === 'Processing' ? 'schedule' : 'check_circle')}</span>
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
                    </section>
                </div>

                {/* Sticky Bulk Actions Bar */}
                <div className="fixed bottom-8 left-1/2 -translate-x-1/2 w-full max-w-2xl px-6 z-50">
                    <div className="bg-[#121212]/90 backdrop-blur-xl border border-[#1e3fae]/30 rounded-xl px-6 py-4 flex items-center justify-between shadow-2xl">
                        <div className="flex items-center gap-4">
                            <div className="w-6 h-6 rounded-full bg-[#1e3fae] flex items-center justify-center text-[10px] font-bold">12</div>
                            <p className="text-sm font-medium text-white">transactions selected</p>
                        </div>
                        <div className="flex items-center gap-3">
                            <button className="flex items-center gap-2 px-4 py-2 bg-black border border-[#262626] rounded-lg text-sm text-[#A3A3A3] hover:text-white hover:border-[#A3A3A3] transition-all">
                                <span className="material-icons text-sm">sell</span>
                                Tag
                            </button>
                            <button className="flex items-center gap-2 px-4 py-2 bg-[#1e3fae] hover:bg-[#1e3fae]/80 rounded-lg text-sm font-semibold text-white transition-all shadow-lg shadow-[#1e3fae]/20">
                                <span className="material-icons text-sm">file_download</span>
                                Export CSV
                            </button>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default TransactionHistory;
