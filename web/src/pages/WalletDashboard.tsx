import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import DepositModal from '../components/DepositModal';
import WithdrawModal from '../components/WithdrawModal';
import TransactionDetailModal from '../components/TransactionDetailModal';

const WalletDashboard: React.FC = () => {
    // State for wallet balance
    const [isLoadingBalance, setIsLoadingBalance] = useState(true);
    const [isDepositModalOpen, setIsDepositModalOpen] = useState(false);
    const [isWithdrawModalOpen, setIsWithdrawModalOpen] = useState(false);
    const [isTransactionModalOpen, setIsTransactionModalOpen] = useState(false);
    const [selectedTransaction, setSelectedTransaction] = useState<any>(null);

    useEffect(() => {
        // Simulating fetch
        setTimeout(() => {
            setIsLoadingBalance(false);
        }, 1000);
    }, []);

    const [chartRange, setChartRange] = useState('1W');

    return (
        <div className="flex min-h-screen bg-background-dark text-slate-200 font-display selection:bg-primary/30">
            <Sidebar />

            {/* Modals */}
            <DepositModal isOpen={isDepositModalOpen} onClose={() => setIsDepositModalOpen(false)} />
            <WithdrawModal isOpen={isWithdrawModalOpen} onClose={() => setIsWithdrawModalOpen(false)} />
            <TransactionDetailModal isOpen={isTransactionModalOpen} onClose={() => setIsTransactionModalOpen(false)} transaction={selectedTransaction} />

            {/* Main Content */}
            <main className="flex-1 flex flex-col h-screen overflow-y-auto bg-black relative p-8">
                {/* Top Bar */}
                <header className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-2xl font-bold text-white tracking-tight">Main Treasury</h1>
                        <div className="flex items-center gap-2 mt-1">
                            <span className="flex items-center gap-1 text-[10px] font-bold text-green-400 bg-green-400/10 px-2 py-0.5 rounded-full uppercase tracking-tighter border border-green-400/20">
                                <span className="w-1 h-1 bg-green-400 rounded-full animate-pulse"></span> Active
                            </span>
                            <span className="text-xs text-slate-500 font-mono">ID: VELO-PRO-8892</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => setIsDepositModalOpen(true)}
                            className="px-5 py-2.5 bg-obsidian-grey border border-obsidian-border hover:border-slate-600 rounded-lg text-sm font-semibold transition-all flex items-center gap-2"
                        >
                            <span className="material-icons text-sm">south_west</span> Receive
                        </button>
                        <button
                            onClick={() => setIsWithdrawModalOpen(true)}
                            className="px-5 py-2.5 bg-primary hover:bg-primary/90 rounded-lg text-sm font-semibold transition-all flex items-center gap-2 shadow-[0_4px_20px_rgba(13,89,242,0.3)]"
                        >
                            <span className="material-icons text-sm text-white">north_east</span> Send Assets
                        </button>
                    </div>
                </header>

                {/* Hero Section */}
                <div className="grid grid-cols-12 gap-6 mb-8">
                    {/* Balance Card */}
                    <div className="col-span-12 lg:col-span-4 bg-obsidian-grey border border-obsidian-border rounded-xl p-8 relative overflow-hidden flex flex-col justify-between">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl -mr-16 -mt-16"></div>
                        <div>
                            <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-1">Total Net Worth</p>
                            <h2 className="text-4xl font-bold bg-gradient-to-r from-white via-primary to-cyan-400 bg-clip-text text-transparent glow-blue tracking-tighter">
                                {isLoadingBalance ? 'Loading...' : '$2,482,192.40'}
                            </h2>
                            <p className="text-green-400 text-sm mt-2 flex items-center gap-1">
                                <span className="material-icons text-xs">trending_up</span> +14.2% <span className="text-slate-500 ml-1">last 30d</span>
                            </p>
                        </div>
                        <div className="mt-8 grid grid-cols-2 gap-4">
                            <div className="p-3 bg-black/40 rounded-lg border border-white/5">
                                <p className="text-[10px] text-slate-500 uppercase font-bold">Available</p>
                                <p className="text-lg font-bold text-white">$1.8M</p>
                            </div>
                            <div className="p-3 bg-black/40 rounded-lg border border-white/5">
                                <p className="text-[10px] text-slate-500 uppercase font-bold">Staked</p>
                                <p className="text-lg font-bold text-white">$682k</p>
                            </div>
                        </div>
                    </div>

                    {/* Chart Card */}
                    <div className="col-span-12 lg:col-span-8 bg-obsidian-grey border border-obsidian-border rounded-xl p-6 relative overflow-hidden">
                        <div className="flex items-center justify-between mb-6">
                            <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest">Portfolio Performance</p>
                            <div className="flex gap-2">
                                {['1D', '1W', '1M', '1Y'].map((range) => (
                                    <button
                                        key={range}
                                        onClick={() => setChartRange(range)}
                                        className={`px-3 py-1 text-[10px] font-bold rounded uppercase tracking-widest transition-colors ${chartRange === range
                                                ? 'bg-primary/20 text-primary border border-primary/30'
                                                : 'hover:bg-white/5 text-slate-500'
                                            }`}
                                    >
                                        {range}
                                    </button>
                                ))}
                            </div>
                        </div>
                        <div className="h-48 w-full relative">
                            {/* Simulated Area Chart */}
                            <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-primary/15 to-transparent"></div>
                            <svg className="w-full h-40 absolute inset-x-0 bottom-0 overflow-visible" preserveAspectRatio="none" viewBox="0 0 1000 100">
                                <path className="drop-shadow-[0_0_8px_rgba(13,89,242,0.8)]" d="M0,80 Q100,60 200,75 T400,30 T600,45 T800,10 T1000,20" fill="none" stroke="#0d59f2" strokeWidth="3"></path>
                            </svg>
                            <div className="absolute inset-0 flex items-end justify-between pointer-events-none px-2 opacity-30">
                                <div className="h-full w-px bg-slate-800"></div>
                                <div className="h-full w-px bg-slate-800"></div>
                                <div className="h-full w-px bg-slate-800"></div>
                                <div className="h-full w-px bg-slate-800"></div>
                                <div className="h-full w-px bg-slate-800"></div>
                            </div>
                        </div>
                        <div className="flex justify-between mt-4 px-2">
                            <span className="text-[10px] text-slate-600 font-mono">01 APR</span>
                            <span className="text-[10px] text-slate-600 font-mono">08 APR</span>
                            <span className="text-[10px] text-slate-600 font-mono">15 APR</span>
                            <span className="text-[10px] text-slate-600 font-mono">22 APR</span>
                            <span className="text-[10px] text-slate-600 font-mono">29 APR</span>
                        </div>
                    </div>
                </div>

                {/* Network Assets */}
                <div className="mb-8">
                    <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-widest mb-4">Active Networks</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="bg-obsidian-grey border border-obsidian-border p-4 rounded-xl flex items-center gap-4 hover:border-primary/50 transition-all cursor-pointer group">
                            <div className="w-10 h-10 rounded-lg bg-indigo-500/10 flex items-center justify-center text-indigo-500 shadow-[0_0_10px_rgba(99,102,241,0.2)]">
                                <span className="material-icons">diamond</span>
                            </div>
                            <div>
                                <p className="text-xs font-bold text-white group-hover:text-primary transition-colors">Ethereum</p>
                                <p className="text-xs text-slate-500 font-mono">12.5 ETH</p>
                            </div>
                        </div>
                        <div className="bg-obsidian-grey border border-obsidian-border p-4 rounded-xl flex items-center gap-4 hover:border-primary/50 transition-all cursor-pointer group">
                            <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center text-purple-500 shadow-[0_0_10px_rgba(168,85,247,0.2)]">
                                <span className="material-icons">pentagon</span>
                            </div>
                            <div>
                                <p className="text-xs font-bold text-white group-hover:text-primary transition-colors">Polygon</p>
                                <p className="text-xs text-slate-500 font-mono">45k MATIC</p>
                            </div>
                        </div>
                        <div className="bg-obsidian-grey border border-obsidian-border p-4 rounded-xl flex items-center gap-4 hover:border-primary/50 transition-all cursor-pointer group">
                            <div className="w-10 h-10 rounded-lg bg-blue-400/10 flex items-center justify-center text-blue-400 shadow-[0_0_10px_rgba(96,165,250,0.2)]">
                                <span className="material-icons">token</span>
                            </div>
                            <div>
                                <p className="text-xs font-bold text-white group-hover:text-primary transition-colors">Arbitrum</p>
                                <p className="text-xs text-slate-500 font-mono">8,200 ARB</p>
                            </div>
                        </div>
                        <div className="bg-obsidian-grey border border-obsidian-border p-4 rounded-xl flex items-center gap-4 hover:border-primary/50 transition-all cursor-pointer group">
                            <div className="w-10 h-10 rounded-lg bg-yellow-500/10 flex items-center justify-center text-yellow-500 shadow-[0_0_10px_rgba(234,179,8,0.2)]">
                                <span className="material-icons">currency_bitcoin</span>
                            </div>
                            <div>
                                <p className="text-xs font-bold text-white group-hover:text-primary transition-colors">WBTC</p>
                                <p className="text-xs text-slate-500 font-mono">2.1 BTC</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Transaction Table */}
                <div className="bg-obsidian-grey border border-obsidian-border rounded-xl overflow-hidden">
                    <div className="p-6 border-b border-obsidian-border flex items-center justify-between">
                        <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-widest">Recent Activity</h3>
                        <a className="text-xs text-primary font-bold hover:underline" href="#" onClick={(e) => { e.preventDefault(); alert("Navigating to full history..."); }}>View All</a>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="text-left text-[10px] font-bold text-slate-500 uppercase tracking-widest bg-black/50">
                                    <th className="px-6 py-4">Transaction Type</th>
                                    <th className="px-6 py-4">Asset / Network</th>
                                    <th className="px-6 py-4 text-right">Amount</th>
                                    <th className="px-6 py-4">Counterparty</th>
                                    <th className="px-6 py-4 text-right">Status</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-obsidian-border">
                                <tr className="hover:bg-white/[0.02] transition-colors cursor-pointer" onClick={() => {
                                    setSelectedTransaction({
                                        id: "#TX-84920-A",
                                        amount: "12,400.00",
                                        currency: "USDC",
                                        status: "SUCCESS",
                                        sender: "Stripe Marketplace",
                                        recipient: "0x8a...4b1c"
                                    });
                                    setIsTransactionModalOpen(true);
                                }}>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-lg bg-green-500/10 flex items-center justify-center text-green-500">
                                                <span className="material-icons text-sm">south_west</span>
                                            </div>
                                            <div>
                                                <p className="text-sm font-medium text-white">Salary Inflow</p>
                                                <p className="text-[10px] text-slate-500">Apr 28, 14:02</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2">
                                            <span className="text-sm text-slate-300 font-medium">USDC</span>
                                            <span className="px-1.5 py-0.5 rounded text-[8px] border border-blue-500/30 text-blue-400 uppercase font-mono">Arbitrum</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <p className="text-sm font-bold text-white">+$12,000.00</p>
                                        <p className="text-[10px] text-slate-500 font-mono">12k USDC</p>
                                    </td>
                                    <td className="px-6 py-4">
                                        <p className="text-xs font-mono text-slate-400">0x8a...4b1c</p>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <span className="inline-flex items-center px-2 py-1 rounded-md text-[10px] font-bold bg-green-500/10 text-green-400 border border-green-500/20 shadow-[0_0_10px_rgba(34,197,94,0.15)]">SUCCESS</span>
                                    </td>
                                </tr>
                                <tr className="hover:bg-white/[0.02] transition-colors cursor-pointer" onClick={() => {
                                    setSelectedTransaction({
                                        id: "#TX-84919-B",
                                        amount: "84,200.00",
                                        currency: "ETH",
                                        status: "PENDING",
                                        sender: "Payroll Dist.",
                                        recipient: "0x2d...99e1"
                                    });
                                    setIsTransactionModalOpen(true);
                                }}>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                                                <span className="material-icons text-sm">north_east</span>
                                            </div>
                                            <div>
                                                <p className="text-sm font-medium text-white">Payroll Dist.</p>
                                                <p className="text-[10px] text-slate-500">Apr 27, 09:15</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2">
                                            <span className="text-sm text-slate-300 font-medium">ETH</span>
                                            <span className="px-1.5 py-0.5 rounded text-[8px] border border-indigo-500/30 text-indigo-400 uppercase font-mono">Mainnet</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <p className="text-sm font-bold text-white">-$84,200.00</p>
                                        <p className="text-[10px] text-slate-500 font-mono">24.1 ETH</p>
                                    </td>
                                    <td className="px-6 py-4">
                                        <p className="text-xs font-mono text-slate-400">0x2d...99e1</p>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <span className="inline-flex items-center px-2 py-1 rounded-md text-[10px] font-bold bg-yellow-500/10 text-yellow-400 border border-yellow-500/20 shadow-[0_0_10px_rgba(234,179,8,0.15)]">PENDING</span>
                                    </td>
                                </tr>
                                <tr className="hover:bg-white/[0.02] transition-colors cursor-pointer" onClick={() => {
                                    setSelectedTransaction({
                                        id: "#TX-84918-C",
                                        amount: "2,100.00",
                                        currency: "MATIC",
                                        status: "FAILED",
                                        sender: "Stake Reward",
                                        recipient: "Vault_V3"
                                    });
                                    setIsTransactionModalOpen(true);
                                }}>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-lg bg-red-500/10 flex items-center justify-center text-red-500">
                                                <span className="material-icons text-sm">priority_high</span>
                                            </div>
                                            <div>
                                                <p className="text-sm font-medium text-white">Stake Reward</p>
                                                <p className="text-[10px] text-slate-500">Apr 26, 22:40</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2">
                                            <span className="text-sm text-slate-300 font-medium">MATIC</span>
                                            <span className="px-1.5 py-0.5 rounded text-[8px] border border-purple-500/30 text-purple-400 uppercase font-mono">Polygon</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <p className="text-sm font-bold text-white">+$2,100.00</p>
                                        <p className="text-[10px] text-slate-500 font-mono">2.8k MATIC</p>
                                    </td>
                                    <td className="px-6 py-4">
                                        <p className="text-xs font-mono text-slate-400">Vault_V3</p>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <span className="inline-flex items-center px-2 py-1 rounded-md text-[10px] font-bold bg-red-500/10 text-red-400 border border-red-500/20 shadow-[0_0_10px_rgba(239,68,68,0.15)]">FAILED</span>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default WalletDashboard;
