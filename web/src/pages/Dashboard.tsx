import React from 'react';

const Dashboard: React.FC = () => {
    return (
        <div className="flex h-screen overflow-hidden bg-bg-deep font-display text-white">
            {/* Sidebar */}
            <aside className="w-64 bg-bg-card border-r border-border-custom flex flex-col">
                <div className="p-6">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center shadow-[0_0_15px_rgba(30,64,175,0.4)]">
                            <span className="material-icons text-white text-xl">payments</span>
                        </div>
                        <span className="text-xl font-bold tracking-tight text-white">Velo</span>
                    </div>
                </div>
                <nav className="flex-1 px-4 space-y-1">
                    <a className="flex items-center gap-3 px-4 py-3 bg-primary/10 text-white rounded-lg font-medium sidebar-active-glow" href="#">
                        <span className="material-icons text-primary text-xl">dashboard</span>
                        Dashboard
                    </a>
                    <a className="flex items-center gap-3 px-4 py-3 text-text-secondary hover:text-white hover:bg-white/5 rounded-lg transition-colors" href="#">
                        <span className="material-icons text-xl">receipt_long</span>
                        Payroll
                    </a>
                    <a className="flex items-center gap-3 px-4 py-3 text-text-secondary hover:text-white hover:bg-white/5 rounded-lg transition-colors" href="#">
                        <span className="material-icons text-xl">swap_horiz</span>
                        Transactions
                    </a>
                    <a className="flex items-center gap-3 px-4 py-3 text-text-secondary hover:text-white hover:bg-white/5 rounded-lg transition-colors" href="#">
                        <span className="material-icons text-xl">groups</span>
                        Team
                    </a>
                    <a className="flex items-center gap-3 px-4 py-3 text-text-secondary hover:text-white hover:bg-white/5 rounded-lg transition-colors" href="#">
                        <span className="material-icons text-xl">account_balance_wallet</span>
                        Wallet
                    </a>
                    <a className="flex items-center gap-3 px-4 py-3 text-text-secondary hover:text-white hover:bg-white/5 rounded-lg transition-colors" href="#">
                        <span className="material-icons text-xl">settings</span>
                        Settings
                    </a>
                </nav>
                <div className="p-4 border-t border-border-custom">
                    <div className="flex items-center gap-3 p-2 bg-white/5 rounded-xl">
                        <img alt="User Profile" className="w-10 h-10 rounded-full object-cover border border-white/10" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBJGOhyNtqGyR6_3mzzgP3m_LsLGHzsJIB6egXF9vNAvAy1I0ewMzv4ofBsFcdZgELjUovHeAnuOqJIsARFvjVsRVgdG37_8BGHQXTDevuPj8YbfRzsoUfgYp-eFVaRI7a8RE0Ya_Snt62orFk3uisrqjE-yLvFqcKCBvzElylMdQBCwVlRrxmyi6hRCM5ZjYwKPJsjvO0VJlWeDBI169kZ4NdDO4e5c8B_-1WmHsZzP0aAQe_p4PYAoME3YvrW1MaHCBv8cpM5ntDP" />
                        <div className="overflow-hidden">
                            <p className="text-sm font-semibold truncate text-white">Alex Chen</p>
                            <p className="text-xs text-text-secondary truncate">Admin Account</p>
                        </div>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 flex flex-col overflow-y-auto">
                <header className="h-16 border-b border-border-custom bg-bg-deep/80 backdrop-blur-md sticky top-0 z-10 px-8 flex items-center justify-between">
                    <div>
                        <h1 className="text-xl font-bold text-white">Good morning, Alex</h1>
                        <p className="text-xs text-text-secondary">Tuesday, October 24, 2023</p>
                    </div>
                    <div className="flex items-center gap-4">
                        <button className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-white/5 text-text-secondary transition-colors">
                            <span className="material-icons">notifications</span>
                        </button>
                        <div className="h-8 w-[1px] bg-border-custom"></div>
                        <div className="flex items-center gap-2 px-3 py-1.5 bg-green-500/10 text-green-400 border border-green-500/20 rounded-full text-xs font-medium">
                            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                            Network: Ethereum Mainnet
                        </div>
                    </div>
                </header>

                <div className="p-8 space-y-8">
                    {/* Balance Card */}
                    <div className="bg-bg-card rounded-xl shadow-2xl border border-border-custom p-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
                        <div>
                            <p className="text-sm font-medium text-text-secondary mb-1">Total Wallet Balance</p>
                            <div className="flex items-baseline gap-3">
                                <h2 className="text-4xl font-bold tracking-tight text-white">$125,450.23</h2>
                                <span className="text-xl font-medium text-text-secondary">USDC</span>
                            </div>
                            <p className="text-xs text-emerald-400 mt-2 flex items-center gap-1">
                                <span className="material-icons text-sm">trending_up</span>
                                +2.4% from last payroll batch
                            </p>
                        </div>
                        <div className="flex items-center gap-3">
                            <button className="px-6 py-2.5 bg-primary text-white font-semibold rounded-lg hover:bg-blue-600 transition-all shadow-lg shadow-primary/30 flex items-center gap-2">
                                <span className="material-icons text-sm">add</span>
                                Deposit
                            </button>
                            <button className="px-6 py-2.5 bg-white/5 border border-border-custom text-white font-semibold rounded-lg hover:bg-white/10 transition-colors flex items-center gap-2">
                                <span className="material-icons text-sm">file_download</span>
                                Withdraw
                            </button>
                        </div>
                    </div>

                    {/* Recent Batches */}
                    <section className="bg-bg-card rounded-xl shadow-sm border border-border-custom overflow-hidden">
                        <div className="p-6 border-b border-border-custom flex items-center justify-between">
                            <h3 className="font-bold text-lg text-white">Recent Payroll Batches</h3>
                            <button className="text-sm text-primary font-medium hover:text-blue-400 transition-colors">View all</button>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead className="bg-white/5 text-text-secondary text-xs uppercase font-bold tracking-wider">
                                    <tr>
                                        <th className="px-6 py-4">Date</th>
                                        <th className="px-6 py-4">Batch Name</th>
                                        <th className="px-6 py-4">Amount</th>
                                        <th className="px-6 py-4">Status</th>
                                        <th className="px-6 py-4 text-right">Action</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-border-custom">
                                    <tr className="hover:bg-white/[0.02] transition-colors">
                                        <td className="px-6 py-4 text-sm text-text-secondary">Oct 24, 2023</td>
                                        <td className="px-6 py-4 text-sm font-medium text-white">Monthly Dev Team Payroll</td>
                                        <td className="px-6 py-4 text-sm text-white">$45,200.00 USDC</td>
                                        <td className="px-6 py-4">
                                            <span className="px-3 py-1 bg-green-500/10 text-green-400 text-xs font-semibold rounded-full border border-green-500/30 status-glow-green">Completed</span>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <button className="text-text-secondary hover:text-white transition-colors"><span className="material-icons">more_horiz</span></button>
                                        </td>
                                    </tr>
                                    <tr className="hover:bg-white/[0.02] transition-colors">
                                        <td className="px-6 py-4 text-sm text-text-secondary">Oct 20, 2023</td>
                                        <td className="px-6 py-4 text-sm font-medium text-white">Design Retainer - Q4</td>
                                        <td className="px-6 py-4 text-sm text-white">$12,400.00 USDC</td>
                                        <td className="px-6 py-4">
                                            <span className="px-3 py-1 bg-primary/10 text-blue-400 text-xs font-semibold rounded-full border border-primary/30 status-glow-blue">Processing</span>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <button className="text-text-secondary hover:text-white transition-colors"><span className="material-icons">more_horiz</span></button>
                                        </td>
                                    </tr>
                                    <tr className="hover:bg-white/[0.02] transition-colors">
                                        <td className="px-6 py-4 text-sm text-text-secondary">Oct 18, 2023</td>
                                        <td className="px-6 py-4 text-sm font-medium text-white">Contractor Payout - Asia</td>
                                        <td className="px-6 py-4 text-sm text-white">$8,150.25 USDC</td>
                                        <td className="px-6 py-4">
                                            <span className="px-3 py-1 bg-amber-500/10 text-amber-400 text-xs font-semibold rounded-full border border-amber-500/30 status-glow-amber">Pending</span>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <button className="text-text-secondary hover:text-white transition-colors"><span className="material-icons">more_horiz</span></button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </section>

                    {/* Charts & Graphs (Simulated) */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pb-8">
                        {/* Payment Volume Chart */}
                        <div className="bg-bg-card p-6 rounded-xl border border-border-custom shadow-sm">
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="font-bold text-white">Payment Volume</h3>
                                <select className="text-xs bg-white/5 text-white border-border-custom rounded-lg focus:ring-primary">
                                    <option>Last 30 days</option>
                                    <option>Last 90 days</option>
                                </select>
                            </div>
                            <div className="h-64 flex flex-col justify-between">
                                <div className="flex-1 relative flex items-end gap-2 px-2">
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <div className="w-full h-[1px] bg-white/5 absolute top-1/4"></div>
                                        <div className="w-full h-[1px] bg-white/5 absolute top-1/2"></div>
                                        <div className="w-full h-[1px] bg-white/5 absolute top-3/4"></div>
                                    </div>
                                    <div className="w-full h-full flex items-end justify-between relative z-1">
                                        <div className="w-5 h-[30%] bg-blue-500/30 border-t border-blue-400/50 rounded-t-sm shadow-[0_0_15px_rgba(59,130,246,0.1)]"></div>
                                        <div className="w-5 h-[45%] bg-blue-500/30 border-t border-blue-400/50 rounded-t-sm shadow-[0_0_15px_rgba(59,130,246,0.1)]"></div>
                                        <div className="w-5 h-[40%] bg-blue-500/30 border-t border-blue-400/50 rounded-t-sm shadow-[0_0_15px_rgba(59,130,246,0.1)]"></div>
                                        <div className="w-5 h-[60%] bg-blue-500/40 border-t border-blue-400/60 rounded-t-sm shadow-[0_0_15px_rgba(59,130,246,0.1)]"></div>
                                        <div className="w-5 h-[55%] bg-blue-500/40 border-t border-blue-400/60 rounded-t-sm shadow-[0_0_15px_rgba(59,130,246,0.1)]"></div>
                                        <div className="w-5 h-[80%] bg-blue-500/60 border-t-2 border-blue-400 rounded-t-sm shadow-[0_0_15px_rgba(59,130,246,0.2)]"></div>
                                        <div className="w-5 h-[70%] bg-blue-500/60 border-t-2 border-blue-400 rounded-t-sm shadow-[0_0_15px_rgba(59,130,246,0.2)]"></div>
                                        <div className="w-5 h-[90%] bg-blue-500 border-t-2 border-blue-300 rounded-t-sm shadow-[0_0_20px_rgba(59,130,246,0.3)]"></div>
                                        <div className="w-5 h-[85%] bg-blue-500 border-t-2 border-blue-300 rounded-t-sm shadow-[0_0_20px_rgba(59,130,246,0.3)]"></div>
                                        <div className="w-5 h-[95%] bg-blue-400 border-t-2 border-white rounded-t-sm shadow-[0_0_25px_rgba(59,130,246,0.4)]"></div>
                                    </div>
                                </div>
                                <div className="flex justify-between mt-4 text-[10px] text-text-secondary font-medium px-2">
                                    <span>1 OCT</span>
                                    <span>7 OCT</span>
                                    <span>14 OCT</span>
                                    <span>21 OCT</span>
                                    <span>30 OCT</span>
                                </div>
                            </div>
                        </div>

                        {/* Top Recipients */}
                        <div className="bg-bg-card p-6 rounded-xl border border-border-custom shadow-sm">
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="font-bold text-white">Top Recipients</h3>
                                <span className="material-icons text-text-secondary text-sm">info</span>
                            </div>
                            <div className="space-y-5">
                                <div className="space-y-2">
                                    <div className="flex justify-between text-xs font-medium">
                                        <span className="text-white">Engineering Dept</span>
                                        <span className="text-blue-400 font-bold">$64,200 USDC</span>
                                    </div>
                                    <div className="w-full h-2.5 bg-white/5 rounded-full overflow-hidden">
                                        <div className="h-full bg-gradient-to-r from-primary to-blue-400 rounded-full shadow-[0_0_10px_rgba(59,130,246,0.3)]" style={{ width: '85%' }}></div>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <div className="flex justify-between text-xs font-medium">
                                        <span className="text-white">Product & Design</span>
                                        <span className="text-blue-400 font-bold">$32,150 USDC</span>
                                    </div>
                                    <div className="w-full h-2.5 bg-white/5 rounded-full overflow-hidden">
                                        <div className="h-full bg-gradient-to-r from-primary to-blue-400 rounded-full opacity-80" style={{ width: '45%' }}></div>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <div className="flex justify-between text-xs font-medium">
                                        <span className="text-white">Marketing Team</span>
                                        <span className="text-blue-400 font-bold">$18,400 USDC</span>
                                    </div>
                                    <div className="w-full h-2.5 bg-white/5 rounded-full overflow-hidden">
                                        <div className="h-full bg-gradient-to-r from-primary to-blue-400 rounded-full opacity-60" style={{ width: '28%' }}></div>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <div className="flex justify-between text-xs font-medium">
                                        <span className="text-white">Operations</span>
                                        <span className="text-blue-400 font-bold">$10,700 USDC</span>
                                    </div>
                                    <div className="w-full h-2.5 bg-white/5 rounded-full overflow-hidden">
                                        <div className="h-full bg-gradient-to-r from-primary to-blue-400 rounded-full opacity-40" style={{ width: '15%' }}></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            {/* Right Sidebar */}
            <aside className="w-80 bg-bg-card border-l border-border-custom flex flex-col">
                <div className="p-6 border-b border-border-custom">
                    <h3 className="font-bold text-white mb-6">Quick Actions</h3>
                    <div className="space-y-3">
                        <button className="w-full py-3 bg-primary text-white font-semibold rounded-lg flex items-center justify-center gap-2 hover:bg-blue-600 transition-all shadow-lg shadow-primary/20">
                            <span className="material-icons">rocket_launch</span>
                            New Batch
                        </button>
                        <button className="w-full py-3 bg-white/5 text-white font-semibold rounded-lg flex items-center justify-center gap-2 hover:bg-white/10 border border-border-custom transition-all">
                            <span className="material-icons">list</span>
                            View Transactions
                        </button>
                        <button className="w-full py-3 bg-white/5 text-white font-semibold rounded-lg flex items-center justify-center gap-2 hover:bg-white/10 border border-border-custom transition-all">
                            <span className="material-icons">manage_accounts</span>
                            Team Settings
                        </button>
                    </div>
                </div>
                <div className="flex-1 overflow-y-auto p-6">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="font-bold text-white">Activity Feed</h3>
                        <span className="material-icons text-text-secondary text-sm cursor-pointer hover:text-white transition-colors">refresh</span>
                    </div>
                    <div className="space-y-6">
                        <div className="flex gap-4">
                            <div className="mt-1 w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center flex-shrink-0">
                                <span className="material-icons text-blue-400 text-base">person_add</span>
                            </div>
                            <div>
                                <p className="text-sm font-medium text-white">New member added</p>
                                <p className="text-xs text-text-secondary">Sarah Jenkins joined the Design Team</p>
                                <span className="text-[10px] text-text-secondary mt-1 block">2 hours ago</span>
                            </div>
                        </div>
                        <div className="flex gap-4">
                            <div className="mt-1 w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0">
                                <span className="material-icons text-green-400 text-base">check_circle</span>
                            </div>
                            <div>
                                <p className="text-sm font-medium text-white">Payroll successful</p>
                                <p className="text-xs text-text-secondary">September Monthly Batch completed</p>
                                <span className="text-[10px] text-text-secondary mt-1 block">Yesterday at 4:32 PM</span>
                            </div>
                        </div>
                        <div className="flex gap-4">
                            <div className="mt-1 w-8 h-8 rounded-full bg-amber-500/20 flex items-center justify-center flex-shrink-0">
                                <span className="material-icons text-amber-400 text-base">warning</span>
                            </div>
                            <div>
                                <p className="text-sm font-medium text-white">Action Required</p>
                                <p className="text-xs text-text-secondary">Verification needed for transaction #8492</p>
                                <span className="text-[10px] text-text-secondary mt-1 block">Oct 22, 11:15 AM</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="p-6 bg-white/5 m-4 rounded-xl border border-dashed border-border-custom">
                    <div className="flex items-center gap-2 mb-2">
                        <span className="material-icons text-primary">contact_support</span>
                        <span className="text-sm font-bold text-white">Need Help?</span>
                    </div>
                    <p className="text-xs text-text-secondary mb-3 leading-relaxed">Contact your account manager for large-volume payroll support.</p>
                    <button className="text-xs font-bold text-primary hover:text-blue-400 transition-colors">Support Center →</button>
                </div>
            </aside>
        </div>
    );
};

export default Dashboard;
