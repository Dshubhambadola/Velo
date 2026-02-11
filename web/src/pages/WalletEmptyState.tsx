import React from 'react';
import { useNavigate } from 'react-router-dom';

const WalletEmptyState: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className="bg-black font-display text-white min-h-screen">
            {/* Nav */}
            <nav className="border-b border-white/10 bg-black px-6 py-4 flex justify-between items-center">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                        <span className="material-icons text-white text-xl">account_balance_wallet</span>
                    </div>
                    <span className="text-xl font-bold tracking-tight text-white">Velo</span>
                </div>
                <div className="flex items-center gap-4">
                    <button className="text-neutral-400 hover:text-primary transition-colors">
                        <span className="material-icons">notifications</span>
                    </button>
                    <div className="w-8 h-8 rounded-full bg-[#121212] border border-white/10 flex items-center justify-center">
                        <span className="material-icons text-neutral-400 text-sm">person</span>
                    </div>
                </div>
            </nav>

            <main className="max-w-6xl mx-auto px-6 py-12 flex flex-col items-center">
                {/* Hero */}
                <div className="flex flex-col items-center text-center mb-16">
                    <div className="w-[200px] h-[200px] mb-8 bg-primary/10 rounded-full flex items-center justify-center relative overflow-hidden">
                        <div className="absolute inset-0 bg-primary/5 blur-2xl"></div>
                        <img
                            alt="Empty Wallet Illustration"
                            className="w-36 h-36 object-contain relative z-10 brightness-75 contrast-125"
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAZ-XOWRZGoFd9tPIe0qn4DHcVcKQzSnnqBDf6xHsV4gty2Vlgvt16gVeTVMNXD2EvDANPNW4YeW3iG8k5pjIe5aUEUlg9PECPvx7Ck3p4mX_nVvDW2cT9Ye8LGV8u8MOiF_ymdnIkJWT3RFDkYqVOX-woLz0Pab5QxUbH2zazLxeINaW7mwRoQsMXKiVgvfUiwOJWBKV5M-QfxcelQs2C8etj-TRluhgZGBy56sMX7wVoidCee0FTiP8qaqHQOoBV2iY5fSlbt-siV"
                        />
                    </div>
                    <h1 className="text-3xl font-bold mb-4 text-white">Fund your wallet to get started</h1>
                    <div className="flex flex-col items-center gap-2">
                        <div className="flex items-center gap-4">
                            <span className="text-5xl font-extrabold tracking-tight text-white">$0.00 <span className="text-neutral-400 font-medium">USDC</span></span>
                            <span className="bg-amber-400 text-black px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border border-amber-300 shadow-[0_0_12px_rgba(245,158,11,0.3)]">
                                Empty
                            </span>
                        </div>
                        <p className="text-neutral-400 max-w-md mt-4 text-lg">
                            Your balance is currently zero. Choose one of the methods below to add liquidity to your account and start trading.
                        </p>
                    </div>
                </div>

                {/* Methods Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl mb-16">
                    {/* Direct USDC */}
                    <div className="bg-[#121212] p-8 rounded-xl border border-white/5 hover:border-white/20 transition-all flex flex-col h-full group">
                        <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center mb-6">
                            <span className="material-icons text-primary">currency_bitcoin</span>
                        </div>
                        <h3 className="text-xl font-bold mb-2 text-white">Direct USDC</h3>
                        <p className="text-neutral-400 text-sm mb-6 flex-grow">
                            Transfer USDC directly from an external blockchain wallet like Metamask or Phantom.
                        </p>
                        <div className="mb-8 space-y-3">
                            <div className="flex items-center gap-2 text-sm">
                                <span className="material-icons text-emerald-500 text-lg">check_circle</span>
                                <span className="text-neutral-400">Fast confirmation</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm">
                                <span className="material-icons text-emerald-500 text-lg">check_circle</span>
                                <span className="text-neutral-400">Low network fees</span>
                            </div>
                        </div>
                        <button className="w-full bg-primary hover:bg-primary/90 text-white font-semibold py-3 px-4 rounded-lg transition-all flex items-center justify-center gap-2 active:scale-[0.98]">
                            Get Wallet Address
                        </button>
                    </div>

                    {/* Bank Transfer */}
                    <div className="bg-[#121212] p-8 rounded-xl border border-white/5 hover:border-white/20 transition-all flex flex-col h-full group">
                        <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center mb-6">
                            <span className="material-icons text-primary">account_balance</span>
                        </div>
                        <h3 className="text-xl font-bold mb-2 text-white">Bank Transfer</h3>
                        <p className="text-neutral-400 text-sm mb-6 flex-grow">
                            Securely connect your bank account to deposit funds via ACH or Wire transfer.
                        </p>
                        <div className="mb-8 space-y-3">
                            <div className="flex items-center gap-2 text-sm">
                                <span className="material-icons text-emerald-500 text-lg">check_circle</span>
                                <span className="text-neutral-400">High deposit limits</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm">
                                <span className="material-icons text-emerald-500 text-lg">check_circle</span>
                                <span className="text-neutral-400">Secured via Plaid</span>
                            </div>
                        </div>
                        <button className="w-full bg-primary hover:bg-primary/90 text-white font-semibold py-3 px-4 rounded-lg transition-all flex items-center justify-center gap-2 active:scale-[0.98]">
                            Connect Bank
                        </button>
                    </div>

                    {/* Credit Card */}
                    <div className="bg-[#121212] p-8 rounded-xl border border-white/5 hover:border-white/20 transition-all flex flex-col h-full group">
                        <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center mb-6">
                            <span className="material-icons text-primary">credit_card</span>
                        </div>
                        <h3 className="text-xl font-bold mb-2 text-white">Credit Card</h3>
                        <p className="text-neutral-400 text-sm mb-6 flex-grow">
                            The fastest way to get started. Purchase USDC instantly using your debit or credit card.
                        </p>
                        <div className="mb-8 space-y-3">
                            <div className="flex items-center gap-2 text-sm">
                                <span className="material-icons text-emerald-500 text-lg">check_circle</span>
                                <span className="text-neutral-400">Instant availability</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm">
                                <span className="material-icons text-emerald-500 text-lg">check_circle</span>
                                <span className="text-neutral-400">Visa & Mastercard</span>
                            </div>
                        </div>
                        <button className="w-full bg-primary hover:bg-primary/90 text-white font-semibold py-3 px-4 rounded-lg transition-all flex items-center justify-center gap-2 active:scale-[0.98]">
                            Buy with Card
                        </button>
                    </div>
                </div>

                {/* Recent Activity */}
                <div className="w-full max-w-5xl">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-bold">Recent Activity</h3>
                        <button className="text-primary text-xs font-bold hover:underline">View All Transactions</button>
                    </div>
                    <div className="bg-white dark:bg-[#121212] border border-slate-200 dark:border-white/10 rounded-xl overflow-hidden shadow-sm">
                        <div className="divide-y divide-slate-100 dark:divide-white/5">
                            {/* Pending Item */}
                            <div className="p-4 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-white/5 transition-colors">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-lg bg-amber-100 dark:bg-amber-900/20 flex items-center justify-center text-amber-600">
                                        <span className="material-icons animate-spin text-lg">sync</span>
                                    </div>
                                    <div>
                                        <div className="font-bold text-sm">Deposit USDC (Polygon)</div>
                                        <div className="text-xs text-slate-500 dark:text-neutral-400">Today, 10:45 AM • 12/24 Confirmations</div>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <div className="font-bold text-sm text-amber-500">+12,500.00 USDC</div>
                                    <div className="text-[10px] text-slate-400 font-mono tracking-tighter">0x4b...a2f9</div>
                                </div>
                            </div>
                            {/* Completed Item */}
                            <div className="p-4 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-white/5 transition-colors cursor-pointer" onClick={() => navigate('/payroll/first-setup')}>
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-lg bg-emerald-100 dark:bg-emerald-900/20 flex items-center justify-center text-emerald-600">
                                        <span className="material-icons text-lg">check_circle</span>
                                    </div>
                                    <div>
                                        <div className="font-bold text-sm">Deposit USDC (Ethereum)</div>
                                        <div className="text-xs text-slate-500 dark:text-neutral-400">Oct 24, 2023 • Successful</div>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <div className="font-bold text-sm">+5,000.00 USDC</div>
                                    <div className="text-[10px] text-slate-400 font-mono tracking-tighter">0xe1...3c1b</div>
                                </div>
                            </div>
                            {/* Completed Item */}
                            <div className="p-4 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-white/5 transition-colors">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-lg bg-emerald-100 dark:bg-emerald-900/20 flex items-center justify-center text-emerald-600">
                                        <span className="material-icons text-lg">check_circle</span>
                                    </div>
                                    <div>
                                        <div className="font-bold text-sm">Deposit USDC (Base)</div>
                                        <div className="text-xs text-slate-500 dark:text-neutral-400">Oct 21, 2023 • Successful</div>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <div className="font-bold text-sm">+25,350.00 USDC</div>
                                    <div className="text-[10px] text-slate-400 font-mono tracking-tighter">0x8a...92de</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-12 text-center">
                    <p className="text-neutral-400 text-sm">
                        Need help? <a className="text-primary hover:underline font-medium" href="#">Contact our support team</a> or <a className="text-primary hover:underline font-medium" href="#">visit our Help Center</a>.
                    </p>
                </div>
            </main>
        </div>
    );
};

export default WalletEmptyState;
