import React from 'react';
import Sidebar from '../components/Sidebar';

const WalletLimits: React.FC = () => {
    return (
        <div className="flex min-h-screen bg-black text-white font-display">
            <Sidebar />
            <main className="flex-1 max-w-7xl mx-auto px-6 py-8 overflow-y-auto">
                <div className="mb-8">
                    <h1 className="text-3xl font-extrabold mb-6 text-white">Wallet Settings</h1>
                    <div className="flex gap-8 border-b border-[#262626]">
                        <button className="pb-4 text-[#A1A1AA] font-medium hover:text-white transition-colors">General Info</button>
                        <button className="pb-4 text-[#1E40AF] font-bold border-b-2 border-[#1E40AF] relative">
                            Limits & Permissions
                            <span className="absolute -top-1 -right-2 flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#1E40AF] opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#1E40AF]"></span>
                            </span>
                        </button>
                        <button className="pb-4 text-[#A1A1AA] font-medium hover:text-white transition-colors">Security</button>
                        <button className="pb-4 text-[#A1A1AA] font-medium hover:text-white transition-colors">Team Access</button>
                    </div>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pb-20">
                    <section className="bg-[#121212] border border-[#262626] rounded-xl p-6 shadow-sm">
                        <div className="flex items-center justify-between mb-8">
                            <div>
                                <h2 className="text-lg font-bold text-white">Withdrawal Limits</h2>
                                <p className="text-sm text-[#A1A1AA]">Current cycle: Daily</p>
                            </div>
                            <button className="px-4 py-2 bg-[#1E40AF] text-white rounded-lg text-sm font-bold transition-all border border-[#1E40AF]/30 shadow-[0_0_15px_rgba(30,64,175,0.4)] hover:bg-blue-700">
                                Increase Limit
                            </button>
                        </div>
                        <div className="flex flex-col items-center py-4">
                            <div className="relative w-48 h-48">
                                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                                    <circle className="text-black" cx="50" cy="50" fill="transparent" r="42" stroke="currentColor" strokeWidth="8"></circle>
                                    <circle className="drop-shadow-[0_0_5px_rgba(30,64,175,0.8)]" cx="50" cy="50" fill="transparent" r="42" stroke="#1E40AF" strokeDasharray="263.89" strokeDashoffset="200.55" strokeLinecap="round" strokeWidth="8"></circle>
                                </svg>
                                <div className="absolute inset-0 flex flex-col items-center justify-center">
                                    <span className="text-3xl font-extrabold text-white">24%</span>
                                    <span className="text-xs uppercase tracking-wider text-[#A1A1AA] font-bold">Used</span>
                                </div>
                            </div>
                            <div className="mt-8 text-center">
                                <p className="text-2xl font-bold tabular-nums text-white">$12,000.00</p>
                                <p className="text-sm text-[#A1A1AA]">of $50,000.00 daily limit used</p>
                            </div>
                        </div>
                        <div className="mt-6 pt-6 border-t border-[#262626] flex items-center gap-3">
                            <span className="material-icons text-[#1E40AF] text-sm">info</span>
                            <p className="text-xs text-[#A1A1AA]">Limits reset daily at 00:00 UTC. Level 3 verification unlocks limits up to $250k.</p>
                        </div>
                    </section>
                    <section className="bg-[#121212] border border-[#262626] rounded-xl p-6 shadow-sm flex flex-col">
                        <div className="mb-8">
                            <h2 className="text-lg font-bold text-white">Spending Controls</h2>
                            <p className="text-sm text-[#A1A1AA]">Manage automation and safety thresholds</p>
                        </div>
                        <div className="space-y-10 flex-grow">
                            <div>
                                <div className="flex justify-between items-end mb-4">
                                    <label className="text-sm font-bold text-white">Auto-approval threshold</label>
                                    <div className="bg-black px-3 py-1 rounded border border-[#262626]">
                                        <span className="text-[#1E40AF] font-bold tabular-nums">$1,000</span>
                                    </div>
                                </div>
                                <input className="w-full h-2 bg-black rounded-lg appearance-none cursor-pointer accent-[#1E40AF]" max="10000" min="0" step="100" type="range" defaultValue="1000" />
                                <div className="flex justify-between mt-2 text-[10px] text-[#A1A1AA] uppercase font-bold tracking-widest">
                                    <span>$0</span>
                                    <span>$5,000</span>
                                    <span>$10,000</span>
                                </div>
                                <p className="mt-4 text-xs text-[#A1A1AA] italic">
                                    Transactions below this amount won't require secondary approval.
                                </p>
                            </div>
                            <div className="p-4 rounded-lg bg-black/50 border border-[#262626]">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-lg bg-[#1E40AF]/10 flex items-center justify-center text-[#1E40AF]">
                                            <span className="material-icons">security</span>
                                        </div>
                                        <div>
                                            <h4 className="text-sm font-bold text-white">Dual-Key Enforcement</h4>
                                            <p className="text-xs text-[#A1A1AA]">Requires 2 admins for withdrawals &gt; $25k</p>
                                        </div>
                                    </div>
                                    <div className="relative inline-flex items-center cursor-pointer">
                                        <div className="w-11 h-6 bg-[#1E40AF] rounded-full"></div>
                                        <div className="absolute left-6 top-1 bg-white w-4 h-4 rounded-full transition"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="mt-auto pt-6">
                            <button className="w-full py-3 bg-black hover:bg-zinc-900 text-[#A1A1AA] rounded-lg text-sm font-bold transition-all border border-[#262626]">
                                Save Controls
                            </button>
                        </div>
                    </section>
                    <section className="bg-[#121212] border border-[#262626] rounded-xl p-6 shadow-sm">
                        <div className="flex items-center justify-between mb-8">
                            <div>
                                <h2 className="text-lg font-bold text-white">Your Permissions</h2>
                                <p className="text-sm text-[#A1A1AA]">Defined by your role in the organization</p>
                            </div>
                            <span className="px-3 py-1 bg-[#1E40AF] text-white rounded-full text-[10px] font-extrabold uppercase tracking-widest shadow-[0_0_15px_rgba(30,64,175,0.4)]">
                                Owner
                            </span>
                        </div>
                        <div className="space-y-4">
                            {[
                                { text: 'Create payment batches', icon: 'check_circle' },
                                { text: 'Execute international payments', icon: 'check_circle' },
                                { text: 'View financial reports', icon: 'check_circle' },
                                { text: 'Manage team members', icon: 'check_circle' }
                            ].map((perm, i) => (
                                <div key={i} className="flex items-center justify-between p-3 bg-black/30 rounded-lg border border-transparent hover:border-[#1E40AF]/20 transition-all">
                                    <div className="flex items-center gap-3">
                                        <span className="material-icons text-[#1E40AF]">{perm.icon}</span>
                                        <span className="text-sm font-medium text-white">{perm.text}</span>
                                    </div>
                                    <span className="material-icons text-[#A1A1AA]/40 text-sm">lock_open</span>
                                </div>
                            ))}
                            <div className="flex items-center justify-between p-3 bg-black/10 rounded-lg border border-dashed border-[#262626] opacity-60">
                                <div className="flex items-center gap-3">
                                    <span className="material-icons text-[#A1A1AA]">do_not_disturb_on</span>
                                    <span className="text-sm font-medium text-[#A1A1AA]">Close Organization Account</span>
                                </div>
                                <span className="material-icons text-[#A1A1AA] text-sm">lock</span>
                            </div>
                        </div>
                    </section>
                    <section className="bg-[#121212] border border-[#262626] rounded-xl p-6 shadow-sm overflow-hidden relative">
                        <div className="absolute -right-12 -top-12 w-48 h-48 bg-[#1E40AF]/5 rounded-full blur-3xl"></div>
                        <div className="relative z-10">
                            <h2 className="text-lg font-bold mb-1 text-white">Account Verification</h2>
                            <p className="text-sm text-[#A1A1AA] mb-8">Higher levels unlock enterprise features</p>
                            <div className="flex items-center gap-4 mb-10">
                                <div className="relative">
                                    <div className="w-16 h-16 rounded-2xl bg-[#1E40AF]/20 flex items-center justify-center border-2 border-[#1E40AF]/50">
                                        <span className="material-icons text-[#1E40AF] text-3xl">verified_user</span>
                                    </div>
                                    <div className="absolute -bottom-2 -right-2 bg-[#1E40AF] text-white w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs ring-4 ring-[#121212]">
                                        2
                                    </div>
                                </div>
                                <div>
                                    <div className="flex items-center gap-2">
                                        <h3 className="text-xl font-extrabold text-white">Level 2 - Verified</h3>
                                        <span className="material-icons text-[#1E40AF] text-sm">check_circle</span>
                                    </div>
                                    <p className="text-sm text-[#A1A1AA]">Business verification completed</p>
                                </div>
                            </div>
                            <div className="space-y-6">
                                <div className="relative pt-1">
                                    <div className="flex mb-2 items-center justify-between">
                                        <div>
                                            <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-[#1E40AF] bg-[#1E40AF]/10">
                                                Verification Progress
                                            </span>
                                        </div>
                                        <div className="text-right">
                                            <span className="text-xs font-semibold inline-block text-[#1E40AF]">
                                                66%
                                            </span>
                                        </div>
                                    </div>
                                    <div className="overflow-hidden h-2 mb-4 text-xs flex rounded-full bg-black border border-[#262626]">
                                        <div className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-[#1E40AF]" style={{ width: '66%' }}></div>
                                    </div>
                                </div>
                                <div className="grid grid-cols-3 gap-2 text-center text-[10px] font-bold uppercase tracking-tighter">
                                    <div className="text-[#1E40AF]">Level 1</div>
                                    <div className="text-[#1E40AF]">Level 2</div>
                                    <div className="text-[#A1A1AA]">Level 3</div>
                                </div>
                                <div className="p-4 bg-[#1E40AF]/5 border border-[#1E40AF]/20 rounded-lg">
                                    <p className="text-xs leading-relaxed text-[#A1A1AA]">
                                        <strong className="text-[#1E40AF]">Pro-tip:</strong> Upgrade to Level 3 to enable bulk international wire transfers and dedicated 24/7 account management.
                                    </p>
                                </div>
                                <button className="w-full py-4 bg-[#1E40AF] hover:bg-blue-700 text-white rounded-lg text-sm font-extrabold transition-all shadow-[0_0_15px_rgba(30,64,175,0.4)] flex items-center justify-center gap-2">
                                    <span>UPGRADE TO LEVEL 3</span>
                                    <span className="material-icons text-sm">arrow_forward</span>
                                </button>
                            </div>
                        </div>
                    </section>
                </div>
            </main>
            <div className="fixed bottom-0 right-0 p-8 pointer-events-none opacity-10 hidden xl:block">
                <div className="w-64 h-64 border-4 border-[#1E40AF]/20 rounded-full blur-3xl"></div>
            </div>
        </div>
    );
};

export default WalletLimits;
