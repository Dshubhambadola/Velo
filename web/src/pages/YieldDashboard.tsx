import React, { useState, useEffect } from 'react';
import { ChartBarIcon, ArrowTrendingUpIcon, ArrowDownTrayIcon, CurrencyDollarIcon } from '@heroicons/react/24/outline';
import Sidebar from '../components/Sidebar';
import { getYieldBalance, allocateYieldFunds, withdrawYieldFunds, YieldBalance } from '../api/yield';

const YieldDashboard: React.FC = () => {
    const [balance, setBalance] = useState<YieldBalance | null>(null);
    const [loading, setLoading] = useState(true);
    const [actionAmount, setActionAmount] = useState<number | ''>('');
    const [actionType, setActionType] = useState<'allocate' | 'withdraw' | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        loadBalance();
    }, []);

    const loadBalance = async () => {
        try {
            setLoading(true);
            const data = await getYieldBalance();
            setBalance(data);
        } catch (error) {
            console.error("Failed to fetch yield balance:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleAction = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!actionAmount || actionAmount <= 0) return;

        setIsSubmitting(true);
        try {
            // Convert dollars to cents for backend
            const amountInCents = Math.round(actionAmount * 100);

            if (actionType === 'allocate') {
                await allocateYieldFunds(amountInCents);
            } else if (actionType === 'withdraw') {
                await withdrawYieldFunds(amountInCents);
            }

            await loadBalance();
            setActionType(null);
            setActionAmount('');
        } catch (error: any) {
            console.error(`Failed to ${actionType}:`, error);
            alert(error.response?.data?.error || `Failed to ${actionType} funds.`);
        } finally {
            setIsSubmitting(false);
        }
    };

    const formatCurrency = (cents: number | undefined) => {
        if (cents === undefined) return '$0.00';
        return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(cents / 100);
    };

    return (
        <div className="flex min-h-screen bg-zinc-950 text-slate-200 font-display selection:bg-emerald-500/30">
            <Sidebar />
            <main className="flex-1 flex flex-col h-screen overflow-y-auto relative p-8">
                <div className="max-w-7xl mx-auto space-y-8 w-full">
                    {/* Header */}
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
                        <div>
                            <h1 className="text-3xl font-bold text-white tracking-tight flex items-center space-x-3">
                                <span>Treasury Yield</span>
                                <span className="px-2.5 py-1 text-xs font-semibold bg-emerald-500/20 text-emerald-400 rounded-full border border-emerald-500/30">
                                    {balance ? `${balance.CurrentAPY.toFixed(2)}% APY` : '...'}
                                </span>
                            </h1>
                            <p className="text-zinc-400 mt-1">Earn interest on your idle funds safely and automatically.</p>
                        </div>
                        <div className="flex space-x-3">
                            <button
                                onClick={() => setActionType('withdraw')}
                                className="flex items-center space-x-2 bg-zinc-900 border border-zinc-700 hover:bg-zinc-800 text-white px-5 py-2.5 rounded-xl font-medium transition-all"
                            >
                                <ArrowDownTrayIcon className="w-5 h-5" />
                                <span>Withdraw</span>
                            </button>
                            <button
                                onClick={() => setActionType('allocate')}
                                className="flex items-center space-x-2 bg-emerald-600 hover:bg-emerald-500 text-white px-5 py-2.5 rounded-xl font-medium transition-all shadow-lg shadow-emerald-600/20"
                            >
                                <ArrowTrendingUpIcon className="w-5 h-5" />
                                <span>Allocate Funds</span>
                            </button>
                        </div>
                    </div>

                    {/* Main Stats */}
                    {loading ? (
                        <div className="h-64 flex items-center justify-center text-zinc-500">Loading portfolio...</div>
                    ) : (
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                            {/* Balance Card */}
                            <div className="lg:col-span-2 bg-gradient-to-br from-zinc-900 to-zinc-950 border border-zinc-800 rounded-3xl p-8 relative overflow-hidden shadow-2xl">
                                <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none">
                                    <ChartBarIcon className="w-64 h-64 text-emerald-500" />
                                </div>
                                <div className="relative z-10 h-full flex flex-col justify-between">
                                    <div>
                                        <p className="text-zinc-400 font-medium tracking-wide uppercase text-sm mb-2">Total Allocated Value</p>
                                        <h2 className="text-5xl font-mono text-white tracking-tight">
                                            {formatCurrency(balance?.AllocatedAmount)}
                                        </h2>
                                    </div>
                                    <div className="mt-12 grid grid-cols-2 gap-8">
                                        <div>
                                            <p className="text-sm text-zinc-500 mb-1">Total Interest Earned</p>
                                            <p className="text-2xl font-mono text-emerald-400">+{formatCurrency(balance?.EarnedInterest)}</p>
                                        </div>
                                        <div>
                                            <p className="text-sm text-zinc-500 mb-1">Last Accrual</p>
                                            <p className="text-lg text-white">
                                                {balance?.LastAccrualTime ? new Date(balance.LastAccrualTime).toLocaleDateString() : 'N/A'}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Info Card */}
                            <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8 flex flex-col justify-between">
                                <div>
                                    <div className="w-12 h-12 bg-emerald-500/10 rounded-2xl flex items-center justify-center mb-6 border border-emerald-500/20">
                                        <CurrencyDollarIcon className="w-6 h-6 text-emerald-400" />
                                    </div>
                                    <h3 className="text-xl font-semibold text-white mb-3">Institutional Yield</h3>
                                    <p className="text-zinc-400 text-sm leading-relaxed mb-6">
                                        Your idle funds are automatically deployed into low-risk, over-collateralized lending protocols simulating Aave and Compound.
                                        Interest accrues daily and auto-compounds directly into your balance.
                                    </p>
                                </div>
                                <div className="p-4 bg-zinc-950 rounded-xl border border-zinc-800/50">
                                    <div className="flex justify-between items-center mb-2">
                                        <span className="text-sm text-zinc-400">Current Base APY</span>
                                        <span className="text-sm font-semibold text-emerald-400">{balance?.CurrentAPY.toFixed(2)}%</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-sm text-zinc-400">Lockup Period</span>
                                        <span className="text-sm font-medium text-white">None</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Action Modal */}
                    {actionType && (
                        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
                            <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8 max-w-md w-full shadow-2xl relative">
                                <button
                                    onClick={() => setActionType(null)}
                                    className="absolute top-6 right-6 text-zinc-500 hover:text-white"
                                    disabled={isSubmitting}
                                >
                                    ✕
                                </button>
                                <h3 className="text-2xl font-semibold text-white mb-2">
                                    {actionType === 'allocate' ? 'Allocate to Yield' : 'Withdraw to Main Wallet'}
                                </h3>
                                <p className="text-zinc-400 mb-8">
                                    {actionType === 'allocate'
                                        ? 'Move funds from your main wallet into the treasury yield protocol to start earning interest.'
                                        : 'Instantly move funds from the yield protocol back to your main Velo wallet.'}
                                </p>

                                <form onSubmit={handleAction} className="space-y-6">
                                    <div>
                                        <label className="block text-sm font-medium text-zinc-400 mb-2">Amount (USD)</label>
                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                                <span className="text-zinc-500 sm:text-lg">$</span>
                                            </div>
                                            <input
                                                type="number"
                                                min="1"
                                                step="0.01"
                                                required
                                                value={actionAmount}
                                                onChange={(e) => setActionAmount(e.target.value ? Number(e.target.value) : '')}
                                                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl pl-8 pr-4 py-4 text-white text-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all placeholder-zinc-700 font-mono"
                                                placeholder="0.00"
                                                disabled={isSubmitting}
                                            />
                                        </div>
                                    </div>
                                    <div className="flex space-x-4 pt-4">
                                        <button
                                            type="button"
                                            onClick={() => setActionType(null)}
                                            disabled={isSubmitting}
                                            className="flex-1 px-4 py-3 text-zinc-400 font-medium hover:text-white hover:bg-zinc-800 rounded-xl transition-all"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            type="submit"
                                            disabled={isSubmitting || !actionAmount}
                                            className={`flex-1 px-4 py-3 rounded-xl font-medium transition-all ${actionType === 'allocate'
                                                    ? 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-500/20'
                                                    : 'bg-white text-black hover:bg-zinc-200 shadow-lg shadow-white/10'
                                                } disabled:opacity-50 disabled:cursor-not-allowed`}
                                        >
                                            {isSubmitting ? 'Processing...' : 'Confirm'}
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
};

export default YieldDashboard;
