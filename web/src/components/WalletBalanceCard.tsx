import React from 'react';

interface WalletBalanceCardProps {
    balance: string;
    loading?: boolean;
}

const WalletBalanceCard: React.FC<WalletBalanceCardProps> = ({ balance, loading = false }) => {
    return (
        <div className="bg-obsidian-charcoal border border-border-dark-obsidian rounded-xl shadow-2xl overflow-hidden font-display relative group hover:border-slate-700 transition-colors">
            {/* Header */}
            <div className="flex items-center justify-between p-5 border-b border-white/5">
                <div className="flex items-center gap-2">
                    <h2 className="text-[20px] font-semibold tracking-tight text-white">Wallet Balance</h2>
                    <button className="text-slate-400 hover:text-primary transition-colors">
                        <span className="material-icons text-lg">info_outline</span>
                    </button>
                </div>
                <div className="flex items-center gap-3">
                    <button className="p-1.5 rounded-lg hover:bg-white/5 text-slate-400 transition-colors">
                        <span className="material-icons text-xl">visibility_off</span>
                    </button>
                    <button className="p-1.5 rounded-lg hover:bg-white/5 text-slate-400 transition-colors">
                        <span className="material-icons text-xl">refresh</span>
                    </button>
                    <button className="p-1.5 rounded-lg hover:bg-white/5 text-slate-400 transition-colors">
                        <span className="material-icons text-xl">open_in_full</span>
                    </button>
                </div>
            </div>

            {/* Balance Hero Area */}
            <div className="px-6 pt-8 pb-4">
                <div className="flex items-center gap-2 mb-2">
                    <span className="px-2 py-0.5 bg-primary/10 text-primary text-xs font-bold rounded-full border border-primary/20">USDC</span>
                    <div className="flex items-center gap-1 text-emerald-500 font-medium text-sm">
                        <span className="material-icons text-xs">trending_up</span>
                        <span>+11% (+$12,450)</span>
                    </div>
                </div>
                <div className="flex items-baseline gap-1">
                    {loading ? (
                        <div className="h-12 w-48 bg-white/10 rounded animate-pulse"></div>
                    ) : (
                        <h1 className="text-5xl font-bold bg-gradient-to-br from-primary to-blue-400 bg-clip-text text-transparent tracking-tight">
                            ${parseFloat(balance).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        </h1>
                    )}
                </div>

                {/* Mini Sparkline Graph */}
                <div className="mt-6 relative h-16 w-full mask-image-sparkline">
                    <svg className="w-full h-full" viewBox="0 0 400 100">
                        <defs>
                            <linearGradient id="gradient" x1="0%" x2="0%" y1="0%" y2="100%">
                                <stop offset="0%" stopColor="#0d59f2" stopOpacity="0.3"></stop>
                                <stop offset="100%" stopColor="#0d59f2" stopOpacity="0"></stop>
                            </linearGradient>
                        </defs>
                        <path d="M0 80 Q 50 70, 100 85 T 200 60 T 300 40 T 400 20 L 400 100 L 0 100 Z" fill="url(#gradient)"></path>
                        <path d="M0 80 Q 50 70, 100 85 T 200 60 T 300 40 T 400 20" fill="none" stroke="#0d59f2" strokeLinecap="round" strokeWidth="3"></path>
                        <circle cx="400" cy="20" fill="#00d4ff" r="4"></circle>
                    </svg>
                    <div className="absolute inset-0 bg-gradient-to-t from-obsidian-charcoal/20 to-transparent pointer-events-none"></div>
                </div>
            </div>

            {/* Breakdown Section */}
            <div className="px-6 py-4 space-y-3">
                <div className="flex justify-between items-center group">
                    <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.4)]"></span>
                        <span className="text-slate-400 text-sm">Available</span>
                    </div>
                    <div className="flex-grow mx-4 border-b border-dotted border-slate-700"></div>
                    <span className="font-medium text-sm text-white">$120,000.00</span>
                </div>
                <div className="flex justify-between items-center group">
                    <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.4)]"></span>
                        <span className="text-slate-400 text-sm">Pending</span>
                    </div>
                    <div className="flex-grow mx-4 border-b border-dotted border-slate-700"></div>
                    <span className="font-medium text-sm text-white">$5,450.23</span>
                </div>
                <div className="flex justify-between items-center group opacity-60">
                    <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-slate-400"></span>
                        <span className="text-slate-400 text-sm">Reserved</span>
                    </div>
                    <div className="flex-grow mx-4 border-b border-dotted border-slate-700"></div>
                    <span className="font-medium text-sm text-white">$0.00</span>
                </div>
            </div>

            {/* Action Buttons */}
            <div className="px-6 py-6 flex gap-3">
                <button className="flex-1 bg-primary hover:bg-blue-600 text-white py-2.5 rounded-lg font-medium flex items-center justify-center gap-2 transition-all shadow-lg shadow-primary/20">
                    <span className="material-icons text-lg">south_west</span>
                    <span>Deposit</span>
                </button>
                <button className="flex-1 bg-white/5 hover:bg-white/10 text-white border border-border-dark-obsidian py-2.5 rounded-lg font-medium flex items-center justify-center gap-2 transition-all">
                    <span className="material-icons text-lg">north_east</span>
                    <span>Withdraw</span>
                </button>
                <button className="flex-1 bg-white/5 hover:bg-white/10 text-white border border-border-dark-obsidian py-2.5 rounded-lg font-medium flex items-center justify-center gap-2 transition-all">
                    <span className="material-icons text-lg">swap_horiz</span>
                    <span>Transfer</span>
                </button>
            </div>

            {/* Footer Network Info */}
            <div className="px-6 py-4 bg-black/20 border-t border-border-dark-obsidian flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <div className="w-5 h-5 bg-slate-800 rounded-full flex items-center justify-center">
                        <img alt="Ethereum Logo" className="w-3 h-3" src="https://lh3.googleusercontent.com/aida-public/AB6AXuALycOITKAdd8_jDTwEnMF2whh67xQ203rtDlcuv2AIG1RFDSTcDquD5cJN7COpeiKFgXvGcdbsQ5wEwBzvuwBDmwAcI__aV7tYBcZjWF_4huWOzXVhubIdwDb81gVRt1yYKzO1msKAfx61sfApbUkWC1_FMn1MackcOeIcMZNpeJEjKcSuzBBdLuYe9-fWKUBz4nqDLrq6CnWcpYhXC2ylNjXFEx7SUCq_e3do-rywHpInDL4Jh5ITYM9rIgKRqyhQmeh0IdVJlF5W" />
                    </div>
                    <span className="text-xs font-medium text-slate-400">Ethereum Mainnet</span>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-slate-400">
                    <span className="material-icons text-[14px] text-amber-500">local_fire_department</span>
                    <span className="font-semibold text-slate-300">25 gwei</span>
                </div>
            </div>
        </div>
    );
};

export default WalletBalanceCard;
