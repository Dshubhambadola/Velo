import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import DepositModal from '../components/DepositModal';
import WithdrawModal from '../components/WithdrawModal';
import TransactionDetailModal from '../components/TransactionDetailModal';
import { getWalletBalance, getWalletTransactions, getWallet } from '../api/wallet';
import { convertCurrency, getFxRate } from '../api/fx';
import { getSubAccounts } from '../api/subaccount';

const WalletDashboard: React.FC = () => {
    // State for wallet balance
    const [balance, setBalance] = useState<any>(null);
    const [transactions, setTransactions] = useState<any[]>([]);
    const [subAccounts, setSubAccounts] = useState<any[]>([]);
    const [isLoadingBalance, setIsLoadingBalance] = useState(true);
    const [isDepositModalOpen, setIsDepositModalOpen] = useState(false);
    const [isWithdrawModalOpen, setIsWithdrawModalOpen] = useState(false);
    const [isTransactionModalOpen, setIsTransactionModalOpen] = useState(false);
    const [selectedTransaction, setSelectedTransaction] = useState<any>(null);
    const [wallet, setWallet] = useState<any>(null);

    // FX State
    const [isFxModalOpen, setIsFxModalOpen] = useState(false);
    const [fxSource, setFxSource] = useState('USDC');
    const [fxTarget, setFxTarget] = useState('EUR');
    const [fxAmount, setFxAmount] = useState('');
    const [fxRate, setFxRate] = useState<number | null>(null);
    const [isConverting, setIsConverting] = useState(false);

    const [chartRange, setChartRange] = useState('1W');

    // Fetch rate when currencies change
    useEffect(() => {
        if (isFxModalOpen && fxSource && fxTarget && fxSource !== fxTarget) {
            getFxRate(fxSource, fxTarget).then(setFxRate).catch(console.error);
        } else {
            setFxRate(null);
        }
    }, [isFxModalOpen, fxSource, fxTarget]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const balanceData = await getWalletBalance();
                setBalance(balanceData);

                const walletData = await getWallet();
                setWallet(walletData);

                const txData = await getWalletTransactions();
                setTransactions(Array.isArray(txData) ? txData : []);

                const subData = await getSubAccounts();
                setSubAccounts(subData.sub_accounts || []);
            } catch (error) {
                console.error("Failed to fetch wallet data", error);
            } finally {
                setIsLoadingBalance(false);
            }
        };
        fetchData();
    }, []);

    // Helper to format currency
    const formatCurrency = (amount: string | number) => {
        const val = typeof amount === 'string' ? parseFloat(amount) : amount;
        return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(val || 0);
    };

    const handleConvert = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            setIsConverting(true);
            await convertCurrency(fxSource, fxTarget, parseFloat(fxAmount));

            // Refresh data
            const balanceData = await getWalletBalance();
            setBalance(balanceData);
            const walletData = await getWallet();
            setWallet(walletData);

            setIsFxModalOpen(false);
            setFxAmount('');
        } catch (error: any) {
            alert(error.response?.data?.error || "Conversion failed");
        } finally {
            setIsConverting(false);
        }
    };

    return (
        <div className="flex min-h-screen bg-background-dark text-slate-200 font-display selection:bg-primary/30">
            <Sidebar />

            {/* Modals */}
            <DepositModal isOpen={isDepositModalOpen} onClose={() => setIsDepositModalOpen(false)} />
            <WithdrawModal isOpen={isWithdrawModalOpen} onClose={() => setIsWithdrawModalOpen(false)} />
            <TransactionDetailModal isOpen={isTransactionModalOpen} onClose={() => setIsTransactionModalOpen(false)} transaction={selectedTransaction} />

            {/* FX Conversion Modal */}
            {isFxModalOpen && (
                <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-obsidian border border-obsidian-border rounded-xl w-full max-w-md p-6 relative overflow-hidden">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-bold text-white flex items-center gap-2">
                                <span className="material-icons text-indigo-400">currency_exchange</span>
                                Convert Currency
                            </h2>
                            <button onClick={() => setIsFxModalOpen(false)} className="text-slate-400 hover:text-white transition-colors">
                                <span className="material-icons">close</span>
                            </button>
                        </div>
                        <form onSubmit={handleConvert}>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-xs font-semibold text-slate-400 uppercase tracking-widest mb-2">From</label>
                                    <div className="flex bg-black border border-white/10 rounded-lg p-2 items-center focus-within:border-primary transition-colors">
                                        <select
                                            value={fxSource}
                                            onChange={(e) => setFxSource(e.target.value)}
                                            className="bg-transparent text-white font-bold outline-none border-none pr-4"
                                        >
                                            <option value="USDC">USDC (Base)</option>
                                            <option value="EUR">EUR (Euro)</option>
                                            <option value="GBP">GBP (British Pound)</option>
                                        </select>
                                        <div className="w-px h-6 bg-white/10 mx-2"></div>
                                        <input
                                            type="number"
                                            step="0.01"
                                            min="0.01"
                                            value={fxAmount}
                                            onChange={(e) => setFxAmount(e.target.value)}
                                            placeholder="0.00"
                                            className="w-full bg-transparent text-white outline-none pl-2 text-right"
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="flex justify-center -my-2 relative z-10">
                                    <div className="bg-obsidian-grey border border-obsidian-border rounded-full p-1 cursor-pointer hover:bg-slate-800 transition-colors"
                                        onClick={() => { setFxSource(fxTarget); setFxTarget(fxSource); }}
                                    >
                                        <span className="material-icons text-slate-400 text-sm">swap_vert</span>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-xs font-semibold text-slate-400 uppercase tracking-widest mb-2">To</label>
                                    <div className="flex bg-black border border-white/10 rounded-lg p-3 items-center">
                                        <select
                                            value={fxTarget}
                                            onChange={(e) => setFxTarget(e.target.value)}
                                            className="bg-transparent text-white font-bold outline-none border-none pr-4"
                                        >
                                            <option value="USDC">USDC (Base)</option>
                                            <option value="EUR">EUR (Euro)</option>
                                            <option value="GBP">GBP (British Pound)</option>
                                        </select>
                                        <div className="w-px h-6 bg-white/10 mx-2"></div>
                                        <div className="w-full text-right text-slate-300">
                                            {fxAmount && fxRate ? (parseFloat(fxAmount) * fxRate).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : '0.00'}
                                        </div>
                                    </div>
                                </div>

                                {fxRate !== null && (
                                    <div className="flex justify-between items-center text-xs text-indigo-400 bg-indigo-500/10 p-2 rounded-lg border border-indigo-500/20">
                                        <span>Exchange Rate</span>
                                        <span className="font-mono">1 {fxSource} = {fxRate.toFixed(4)} {fxTarget}</span>
                                    </div>
                                )}
                            </div>

                            <div className="mt-8">
                                <button
                                    type="submit"
                                    disabled={isConverting || !fxAmount}
                                    className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg font-bold transition-all disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center gap-2"
                                >
                                    {isConverting ? <span className="material-icons animate-spin text-sm">refresh</span> : 'Execute Conversion'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

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
                            <span className="text-xs text-slate-500 font-mono">ID: {balance?.ExternalID || 'VELO-...'}</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => setIsFxModalOpen(true)}
                            className="px-5 py-2.5 bg-obsidian-grey border border-obsidian-border hover:border-slate-600 rounded-lg text-sm font-semibold transition-all flex items-center gap-2 text-indigo-400"
                        >
                            <span className="material-icons text-sm">currency_exchange</span> Convert
                        </button>
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
                                {isLoadingBalance ? 'Loading...' : formatCurrency(balance?.Available)}
                            </h2>
                            <p className="text-green-400 text-sm mt-2 flex items-center gap-1">
                                <span className="material-icons text-xs">trending_up</span> +0.0% <span className="text-slate-500 ml-1">last 30d</span>
                            </p>
                        </div>
                        <div className="mt-8 grid grid-cols-2 gap-4">
                            <div className="p-3 bg-black/40 rounded-lg border border-white/5">
                                <p className="text-[10px] text-slate-500 uppercase font-bold">Available</p>
                                <p className="text-lg font-bold text-white">{isLoadingBalance ? '...' : formatCurrency(balance?.Available)}</p>
                            </div>
                            <div className="p-3 bg-black/40 rounded-lg border border-white/5">
                                <p className="text-[10px] text-slate-500 uppercase font-bold">Pending</p>
                                <p className="text-lg font-bold text-white">{isLoadingBalance ? '...' : formatCurrency(balance?.Pending)}</p>
                            </div>
                        </div>
                    </div>

                    {/* Chart Card (Still Simulated for MVP) */}
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

                {/* Fiat & Crypto Balances */}
                <div className="mb-8">
                    <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-widest mb-4">Global Balances</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="bg-obsidian-grey border border-obsidian-border p-4 rounded-xl flex items-center gap-4 hover:border-primary/50 transition-all cursor-pointer group">
                            <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.2)]">
                                <span className="material-icons font-bold">attach_money</span>
                            </div>
                            <div>
                                <p className="text-xs font-bold text-white group-hover:text-primary transition-colors">USDC (Base)</p>
                                <p className="text-xs text-slate-500 font-mono">{formatCurrency(wallet?.Balance || balance?.Available)}</p>
                            </div>
                        </div>

                        {wallet?.FiatBalances && Object.entries(wallet.FiatBalances).map(([currency, amount]) => (
                            <div key={currency} className="bg-obsidian-grey border border-obsidian-border p-4 rounded-xl flex items-center gap-4 hover:border-indigo-400/50 transition-all cursor-pointer group">
                                <div className="w-10 h-10 rounded-lg bg-indigo-500/10 flex items-center justify-center text-indigo-400 shadow-[0_0_10px_rgba(99,102,241,0.2)]">
                                    <span className="material-icons font-bold">{currency === 'EUR' ? 'euro' : currency === 'GBP' ? 'currency_pound' : 'account_balance_wallet'}</span>
                                </div>
                                <div>
                                    <p className="text-xs font-bold text-white group-hover:text-indigo-400 transition-colors uppercase">{currency} (Fiat)</p>
                                    <p className="text-xs text-slate-500 font-mono">
                                        {new Intl.NumberFormat('en-US', { style: 'currency', currency }).format(parseFloat(amount as string))}
                                    </p>
                                </div>
                            </div>
                        ))}

                        {/* Add Currency Placeholder */}
                        <div
                            onClick={() => setIsFxModalOpen(true)}
                            className="border border-dashed border-white/10 p-4 rounded-xl flex flex-col items-center justify-center gap-2 hover:border-white/30 hover:bg-white/[0.02] transition-all cursor-pointer text-slate-500 hover:text-white"
                        >
                            <span className="material-icons text-lg">add</span>
                            <p className="text-[10px] font-bold uppercase tracking-widest">Convert Funds</p>
                        </div>
                    </div>
                </div>

                {/* Departmental Allocation */}
                {subAccounts && subAccounts.length > 0 && (
                    <div className="mb-8">
                        <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-widest mb-4">Departmental Budgets</h3>
                        <div className="bg-obsidian-grey border border-obsidian-border rounded-xl p-6">
                            <div className="flex gap-4">
                                {subAccounts.map((acc, index) => {
                                    const totalAllocated = subAccounts.reduce((sum, a) => sum + a.Balance, 0);
                                    const treasuryBalance = (balance?.Available || 0) * 100;
                                    const totalFunds = treasuryBalance + totalAllocated;
                                    const widthPercent = (acc.Balance / totalFunds) * 100;

                                    // Different colors for different departments
                                    const colors = ['bg-indigo-500', 'bg-emerald-500', 'bg-amber-500', 'bg-purple-500', 'bg-rose-500'];
                                    const bgColor = colors[index % colors.length];

                                    return (
                                        <div key={acc.ID} className="flex flex-col gap-2 w-full" style={{ width: `${Math.max(widthPercent, 5)}%` }}>
                                            <div className={`h-2 rounded-full ${bgColor}`}></div>
                                            <div className="mt-1">
                                                <p className="text-xs font-bold text-white truncate">{acc.Name}</p>
                                                <p className="text-[10px] text-slate-500 font-mono mt-0.5">{formatCurrency(acc.Balance / 100)}</p>
                                            </div>
                                        </div>
                                    );
                                })}
                                {/* Treasury Remainder */}
                                <div className="flex flex-col gap-2 flex-grow">
                                    <div className="h-2 rounded-full bg-slate-700"></div>
                                    <div className="mt-1">
                                        <p className="text-xs font-bold text-slate-400">Main Treasury</p>
                                        <p className="text-[10px] text-slate-500 font-mono mt-0.5">{formatCurrency(balance?.Available)}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Transaction Table - Real Data */}
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
                                {transactions.length === 0 ? (
                                    <tr>
                                        <td colSpan={5} className="px-6 py-8 text-center text-slate-500 text-sm">
                                            No transactions found.
                                        </td>
                                    </tr>
                                ) : (
                                    transactions.map((tx: any) => (
                                        <tr key={tx.TransactionHash} className="hover:bg-white/[0.02] transition-colors cursor-pointer" onClick={() => {
                                            setSelectedTransaction(tx);
                                            setIsTransactionModalOpen(true);
                                        }}>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                                                        <span className="material-icons text-sm">swap_horiz</span>
                                                    </div>
                                                    <div>
                                                        <p className="text-sm font-medium text-white">Transfer</p>
                                                        <p className="text-[10px] text-slate-500">{new Date(tx.CreatedAt).toLocaleDateString()}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-2">
                                                    <span className="text-sm text-slate-300 font-medium">{tx.Currency}</span>
                                                    <span className="px-1.5 py-0.5 rounded text-[8px] border border-blue-500/30 text-blue-400 uppercase font-mono">Circle</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <p className="text-sm font-bold text-white">{formatCurrency(tx.Amount)}</p>
                                            </td>
                                            <td className="px-6 py-4">
                                                <p className="text-xs font-mono text-slate-400">{tx.ToAddress?.substring(0, 10)}...</p>
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <span className="inline-flex items-center px-2 py-1 rounded-md text-[10px] font-bold bg-green-500/10 text-green-400 border border-green-500/20 shadow-[0_0_10px_rgba(34,197,94,0.15)]">{tx.Status}</span>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default WalletDashboard;
