import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import WalletBalanceCard from '../components/WalletBalanceCard';
import AdvancedFilterSidebar from '../components/AdvancedFilterSidebar';
import QuickActionsModal from '../components/QuickActionsModal';
import UpcomingPaymentsWidget from '../components/UpcomingPaymentsWidget';
import NotificationDropdown from '../components/NotificationDropdown';

const Dashboard: React.FC = () => {
    // State for the advanced filter sidebar
    const [isFilterSidebarOpen, setIsFilterSidebarOpen] = useState(false);
    // State for the quick actions modal
    const [isQuickActionsOpen, setIsQuickActionsOpen] = useState(false);

    // Handle CMD+K to open Quick Actions
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
                e.preventDefault();
                setIsQuickActionsOpen(prev => !prev);
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    return (
        <div className="flex h-screen overflow-hidden bg-black font-display text-white">
            <Sidebar />

            {/* Main Content */}
            <main className="flex-1 flex flex-col h-screen overflow-y-auto bg-black relative">
                {/* Advanced Filter Sidebar */}
                <AdvancedFilterSidebar
                    isOpen={isFilterSidebarOpen}
                    onClose={() => setIsFilterSidebarOpen(false)}
                />

                {/* Quick Actions Modal */}
                <QuickActionsModal
                    isOpen={isQuickActionsOpen}
                    onClose={() => setIsQuickActionsOpen(false)}
                />

                {/* Top Header */}
                <header className="h-16 border-b border-border-dark-obsidian bg-obsidian-charcoal/50 backdrop-blur-md flex items-center justify-between px-8 sticky top-0 z-10 shrink-0">
                    <div className="flex items-center gap-6">
                        <div className="relative">
                            <span className="material-icons absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 text-sm">search</span>
                            <input
                                className="bg-black/50 border border-border-dark-obsidian text-sm rounded-lg pl-10 pr-4 py-1.5 w-64 focus:outline-none focus:border-primary transition-all text-slate-300 placeholder-slate-600"
                                placeholder="Search transactions, users..."
                                type="text"
                            />
                        </div>
                        <div className="h-6 w-[1px] bg-border-dark-obsidian"></div>
                        <div className="flex items-center gap-2">
                            <span className="material-icons text-amber-500 text-sm">local_gas_station</span>
                            <span className="text-xs font-medium text-slate-400">Gas: <span className="text-amber-500">45 Gwei</span></span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="w-2 h-2 bg-green-500 rounded-full shadow-[0_0_10px_rgba(34,197,94,0.3)]"></span>
                            <span className="text-xs font-medium text-slate-400">Mainnet Operational</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <NotificationDropdown />
                        <div className="flex items-center gap-3 pl-4 border-l border-border-dark-obsidian">
                            <div className="text-right hidden md:block">
                                <p className="text-xs font-semibold text-white">Alex Vanguard</p>
                                <p className="text-[10px] text-slate-500">Tier 4 Admin</p>
                            </div>
                            <img
                                className="w-8 h-8 rounded-full border border-border-dark-obsidian object-cover"
                                alt="User Profile"
                                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCz6fIo0PxGnzyY-NUKwnGAQmCNlX_RsFsT3QTb0noWhXL0qbCOuD9oPHQ0ZT9rU1bHFP2X-Q8W7gdXUlzJkCQJoOAC-Umtiwgu1PKJcGWKywHtf1JsZ22p3qCa1SmhTRVXJzd95UCCR5AfRT-XEINijYs2UCzgV2DcL5tjjfo049qjHAsK84gj_PXpwPjKR6tQ1eV5l0aNdiLvMI_1o2we_uuxbrvdoy0viZunXWo72vpq8AFH3U_ub0k77UaDlNekUYs9klGsAMXB"
                            />
                        </div>
                    </div>
                </header>

                {/* Dashboard Content */}
                <div className="p-8 space-y-8">
                    {/* KPI Section */}
                    <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* Custom Wallet Balance Card */}
                        <WalletBalanceCard />

                        {/* Pending Transactions */}
                        <div className="bg-obsidian-charcoal border border-border-dark-obsidian p-6 rounded-xl group hover:border-slate-700 transition-colors flex flex-col justify-between">
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <p className="text-xs font-medium text-slate-500 uppercase tracking-widest mb-1">Pending Volume</p>
                                    <h3 className="text-3xl font-bold text-white tracking-tight">$142,900.00</h3>
                                </div>
                                <div className="w-10 h-10 rounded-lg bg-orange-500/10 flex items-center justify-center text-orange-500 shadow-[0_0_10px_rgba(249,115,22,0.3)]">
                                    <span className="material-icons">pending_actions</span>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="text-white text-xs font-bold">42 Transactions</span>
                                <span className="text-[10px] text-slate-500">Processing now</span>
                            </div>
                        </div>

                        {/* Success Rate */}
                        <div className="bg-obsidian-charcoal border border-border-dark-obsidian p-6 rounded-xl group hover:border-slate-700 transition-colors flex flex-col justify-between">
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <p className="text-xs font-medium text-slate-500 uppercase tracking-widest mb-1">Success Rate</p>
                                    <h3 className="text-3xl font-bold text-white tracking-tight">99.98%</h3>
                                </div>
                                <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center text-green-500 shadow-[0_0_10px_rgba(34,197,94,0.3)]">
                                    <span className="material-icons">verified</span>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="text-white text-xs font-bold">Near Zero Failure</span>
                                <span className="text-[10px] text-slate-500">Global average: 94.2%</span>
                            </div>
                        </div>
                    </section>

                    <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                        {/* Main Analytics Area Chart */}
                        <div className="xl:col-span-2 bg-obsidian-charcoal border border-border-dark-obsidian rounded-xl p-6">
                            <div className="flex items-center justify-between mb-8">
                                <div>
                                    <h4 className="text-lg font-bold text-white">Payment Volume</h4>
                                    <p className="text-sm text-slate-500">Daily aggregate processing volume across all channels</p>
                                </div>
                                <div className="flex gap-2 bg-black rounded-lg p-1 border border-border-dark-obsidian">
                                    <button className="px-3 py-1 text-[11px] font-bold text-white bg-slate-800 rounded shadow-sm">30D</button>
                                    <button className="px-3 py-1 text-[11px] font-bold text-slate-500 hover:text-white transition-colors">90D</button>
                                    <button className="px-3 py-1 text-[11px] font-bold text-slate-500 hover:text-white transition-colors">1Y</button>
                                </div>
                            </div>

                            {/* Mock Chart Container */}
                            <div className="h-[400px] w-full relative flex items-end gap-1">
                                {/* Neon Blue Gradient Background */}
                                <div className="absolute inset-x-0 bottom-0 h-4/5 bg-gradient-to-t from-primary/20 to-transparent rounded-t-lg"></div>

                                {/* Decorative chart lines using bar representation for simplicity in React without external lib */}
                                {[40, 55, 48, 65, 72, 68, 85, 92, 88, 75, 82].map((height, i) => (
                                    <div key={i} className="flex-1 bg-primary/40 rounded-t-sm relative group cursor-pointer hover:bg-primary transition-all" style={{ height: `${height}%` }}>
                                        {i === 0 && (
                                            <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-white text-black text-[10px] font-bold px-2 py-1 rounded hidden group-hover:block whitespace-nowrap">$45k</div>
                                        )}
                                    </div>
                                ))}

                                {/* Current value bar */}
                                <div className="flex-1 bg-primary h-[98%] rounded-t-sm relative group shadow-[0_0_15px_rgba(13,89,242,0.5)]">
                                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-white text-black text-[10px] font-bold px-2 py-1 rounded whitespace-nowrap z-10">Current: $122k</div>
                                </div>

                                {/* X Axis Labels */}
                                <div className="absolute -bottom-6 inset-x-0 flex justify-between text-[10px] text-slate-600 font-bold px-2">
                                    <span>01 OCT</span>
                                    <span>08 OCT</span>
                                    <span>15 OCT</span>
                                    <span>22 OCT</span>
                                    <span>30 OCT</span>
                                </div>
                            </div>
                        </div>

                        {/* Upcoming Payments Widget */}
                        <div className="h-[500px]">
                            <UpcomingPaymentsWidget />
                        </div>
                    </div>

                    {/* Transaction Table Section - Using BatchListHeader for Filter controls */}
                    <div className="bg-obsidian-charcoal border border-border-dark-obsidian rounded-xl overflow-hidden">
                        {/* Using the previously created BatchListHeader for consistency if desired, or manual header as per design */}
                        {/* The design asks for a specific "Recent Transactions" header with a simple filter button. 
                            However, since we have a powerful BatchListHeader, we might want to use that for the "Payroll" page 
                            and keep this simple for Dashboard, or reuse it. 
                            For this specific "Dashboard" view, the design shows a simple header. I will stick to the design.
                        */}
                        <div className="p-6 border-b border-border-dark-obsidian flex items-center justify-between">
                            <h4 className="text-lg font-bold text-white">Recent Transactions</h4>
                            <button
                                className="text-sm font-semibold text-slate-400 hover:text-white transition-colors flex items-center gap-1"
                                onClick={() => setIsFilterSidebarOpen(true)}
                            >
                                Filter <span className="material-icons text-sm">filter_list</span>
                            </button>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead>
                                    <tr className="bg-black/20 text-[10px] font-bold text-slate-500 uppercase tracking-widest border-b border-border-dark-obsidian">
                                        <th className="px-6 py-4">Transaction ID</th>
                                        <th className="px-6 py-4">Merchant / Recipient</th>
                                        <th className="px-6 py-4">Status</th>
                                        <th className="px-6 py-4">Amount</th>
                                        <th className="px-6 py-4">Method</th>
                                        <th className="px-6 py-4">Time</th>
                                        <th className="px-6 py-4 text-right">Action</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-border-dark-obsidian">
                                    <tr className="hover:bg-white/5 transition-colors group">
                                        <td className="px-6 py-4 font-mono text-xs text-slate-400">#TX-84920-A</td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded bg-slate-800 flex items-center justify-center font-bold text-slate-300">S</div>
                                                <div>
                                                    <p className="text-sm font-semibold text-white">Stripe Marketplace</p>
                                                    <p className="text-[10px] text-slate-500">Processing Node: US-East-1</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="px-2 py-0.5 rounded-full bg-green-500/10 text-green-500 text-[10px] font-bold border border-green-500/20">SUCCESS</span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <p className="text-sm font-bold text-white">$12,400.00</p>
                                            <p className="text-[10px] text-slate-500">USD Equivalent</p>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2">
                                                <span className="material-icons text-slate-400 text-sm">credit_card</span>
                                                <span className="text-xs text-slate-400 font-medium">VISA **** 4492</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-xs text-slate-400 font-medium">2 mins ago</td>
                                        <td className="px-6 py-4 text-right">
                                            <button className="material-icons text-slate-500 hover:text-white transition-colors">more_vert</button>
                                        </td>
                                    </tr>
                                    <tr className="hover:bg-white/5 transition-colors group">
                                        <td className="px-6 py-4 font-mono text-xs text-slate-400">#TX-84919-B</td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded bg-slate-800 flex items-center justify-center font-bold text-slate-300">K</div>
                                                <div>
                                                    <p className="text-sm font-semibold text-white">Kraken Liquidity</p>
                                                    <p className="text-[10px] text-slate-500">Bridge Protocol: V3.1</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="px-2 py-0.5 rounded-full bg-orange-500/10 text-orange-500 text-[10px] font-bold border border-orange-500/20">PENDING</span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <p className="text-sm font-bold text-white">2.45 ETH</p>
                                            <p className="text-[10px] text-slate-500">$6,842.12</p>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2">
                                                <span className="material-icons text-slate-400 text-sm">account_balance_wallet</span>
                                                <span className="text-xs text-slate-400 font-medium">Main Vault (W1)</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-xs text-slate-400 font-medium">8 mins ago</td>
                                        <td className="px-6 py-4 text-right">
                                            <button className="material-icons text-slate-500 hover:text-white transition-colors">more_vert</button>
                                        </td>
                                    </tr>
                                    <tr className="hover:bg-white/5 transition-colors group">
                                        <td className="px-6 py-4 font-mono text-xs text-slate-400">#TX-84918-C</td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded bg-slate-800 flex items-center justify-center font-bold text-slate-300">A</div>
                                                <div>
                                                    <p className="text-sm font-semibold text-white">Amazon Web Services</p>
                                                    <p className="text-[10px] text-slate-500">SaaS Subscription</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="px-2 py-0.5 rounded-full bg-green-500/10 text-green-500 text-[10px] font-bold border border-green-500/20">SUCCESS</span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <p className="text-sm font-bold text-white">$4,200.00</p>
                                            <p className="text-[10px] text-slate-500">USD Corporate</p>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2">
                                                <span className="material-icons text-slate-400 text-sm">payment</span>
                                                <span className="text-xs text-slate-400 font-medium">Direct Debit</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-xs text-slate-400 font-medium">14 mins ago</td>
                                        <td className="px-6 py-4 text-right">
                                            <button className="material-icons text-slate-500 hover:text-white transition-colors">more_vert</button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className="p-4 border-t border-border-dark-obsidian bg-black/20 text-center">
                            <button className="text-xs font-bold text-primary hover:text-primary/80 transition-colors uppercase tracking-widest">Load More Transactions</button>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Dashboard;
