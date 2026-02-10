import React from 'react';
import { useNavigate } from 'react-router-dom';

const SessionWarning: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className="font-display min-h-screen relative overflow-hidden bg-[#111521] text-slate-100">
            <div className="blur-[2px] pointer-events-none select-none">
                <nav className="bg-slate-900 border-b border-white/5 px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-8">
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                                <span className="text-white font-bold">V</span>
                            </div>
                            <span className="text-xl font-bold tracking-tight">Velo</span>
                        </div>
                        <div className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-400">
                            <button className="hover:text-primary transition-colors">Dashboard</button>
                            <button className="hover:text-primary transition-colors">Accounts</button>
                            <button className="hover:text-primary transition-colors">Transactions</button>
                            <button className="hover:text-primary transition-colors">Settings</button>
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <button className="p-2 text-slate-400 hover:text-primary transition-colors">
                            <span className="material-icons">notifications</span>
                        </button>
                        <div className="w-8 h-8 rounded-full bg-primary/10 border border-primary/20 overflow-hidden">
                            <img alt="Profile" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBBN5bkMrd9o0islFa8G9ApGm-ZS9sb75C9eUitawELDjipFsvmr35kWVVRbSgYNDdBkFxuYgV2GxAggC-1u5o8reIXGzLXYl-idwo267M0tlupRIjOLM8ZaVnPW5BnbBkrkbhxX6H8-D1QsmgX0IwXIZmXC87rAy5VYKeBzAzgl1nYlBUECxV--u0QCTt37SFdj6Ocq8BB_w4cX4NFYFQQhj7h53BSa0QrAa4jDhN22Zbj6tmsuP1vR0aD1co0Qbin8lEcJHuE_Ddb" />
                        </div>
                    </div>
                </nav>
                <main className="max-w-7xl mx-auto p-6 md:p-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                        <div className="bg-slate-900 p-6 rounded-xl border border-white/5 shadow-sm">
                            <div className="flex justify-between items-start mb-4">
                                <span className="text-slate-500 text-sm font-medium">Total Balance</span>
                                <span className="material-icons text-primary/40">account_balance_wallet</span>
                            </div>
                            <div className="text-2xl font-bold">$124,502.45</div>
                            <div className="text-xs text-green-500 mt-2 font-medium flex items-center gap-1">
                                <span className="material-icons text-xs">trending_up</span> +12.5% this month
                            </div>
                        </div>
                        <div className="bg-slate-900 p-6 rounded-xl border border-white/5 shadow-sm">
                            <div className="flex justify-between items-start mb-4">
                                <span className="text-slate-500 text-sm font-medium">Monthly Spending</span>
                                <span className="material-icons text-primary/40">credit_card</span>
                            </div>
                            <div className="text-2xl font-bold">$12,840.12</div>
                            <div className="text-xs text-slate-500 mt-2 font-medium">Within budget</div>
                        </div>
                        <div className="bg-slate-900 p-6 rounded-xl border border-white/5 shadow-sm">
                            <div className="flex justify-between items-start mb-4">
                                <span className="text-slate-500 text-sm font-medium">Active Subscriptions</span>
                                <span className="material-icons text-primary/40">sync</span>
                            </div>
                            <div className="text-2xl font-bold">18</div>
                            <div className="text-xs text-slate-500 mt-2 font-medium">3 due this week</div>
                        </div>
                    </div>
                </main>
            </div>

            {/* Warning Toast */}
            <div className="fixed top-6 right-6 z-50 w-full max-w-sm">
                <div className="bg-charcoal rounded-xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-white/10 ring-1 ring-white/5 overflow-hidden">
                    <div className="p-5">
                        <div className="flex items-start gap-4">
                            <div className="flex-shrink-0 bg-warning-orange/10 p-2 rounded-lg">
                                <span className="material-icons text-warning-orange block leading-none">warning</span>
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center justify-between mb-1">
                                    <h3 className="text-sm font-bold text-white leading-5">Session expiring soon</h3>
                                    <button onClick={() => navigate('/')} className="text-slate-500 hover:text-white transition-colors">
                                        <span className="material-icons text-sm">close</span>
                                    </button>
                                </div>
                                <p className="text-sm text-silver-grey leading-relaxed mb-4">
                                    You'll be logged out in <span className="font-bold text-white tabular-nums">04:59</span> due to inactivity. Please extend your session to continue working.
                                </p>
                                <div className="flex items-center gap-3">
                                    <button onClick={() => navigate('/')} className="bg-primary hover:bg-primary/90 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-all shadow-lg active:scale-95">
                                        Stay logged in
                                    </button>
                                    <button onClick={() => navigate('/session-expired')} className="text-silver-grey hover:text-white text-sm font-medium px-2 py-2 transition-colors">
                                        Sign out
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="h-1 w-full bg-white/5">
                        <div className="h-full bg-warning-orange w-[80%]"></div>
                    </div>
                </div>
            </div>
            <div className="fixed inset-0 bg-[#0A0A0A]/40 pointer-events-none backdrop-blur-[2px] z-40"></div>
        </div>
    );
};

export default SessionWarning;
