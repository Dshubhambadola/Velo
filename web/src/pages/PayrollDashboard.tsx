import React from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';

const PayrollDashboard: React.FC = () => {
    const navigate = useNavigate();

    // Mock Data for KPI Cards
    const stats = [
        { title: 'Monthly Spend', value: '$1,420,500', subtext: '+12.5% from last month', icon: 'trending_up', subtextClass: 'text-emerald-500', glow: false },
        { title: 'Active Batches', value: '4', subtext: '2 processing, 2 scheduled', icon: 'schedule', subtextClass: 'text-slate-500', glow: false },
        { title: 'Next Pay Date', value: 'Oct 31, 2023', subtext: 'End of month cycle', icon: 'calendar_today', subtextClass: 'text-slate-500', glow: false },
        { title: 'Failed Payouts', value: '0', subtext: "Everything's running smooth", icon: 'warning', subtextClass: 'text-emerald-500', iconClass: 'text-red-500/60 group-hover:text-red-500', glow: false },
    ];

    // Mock Data for Table
    const batches = [
        {
            id: 'BAT-2023-094',
            name: 'Engineering Oct Bonus',
            date: 'Oct 28, 2023',
            status: 'Completed',
            employees: 142,
            amount: '$452,000.00',
            wallet: 'Via USD Main Wallet',
            statusClass: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20 glow-success',
            statusDot: 'bg-emerald-400',
            animateDot: true
        },
        {
            id: 'BAT-2023-093',
            name: 'Global Marketing Payroll',
            date: 'Oct 27, 2023',
            status: 'Processing',
            employees: 89,
            amount: '$210,400.00',
            wallet: 'Via EUR/GBP Liquidity',
            statusClass: 'bg-amber-500/10 text-amber-400 border-amber-500/20 glow-warning',
            statusDot: 'bg-amber-400',
            animateDot: false
        },
        {
            id: 'BAT-2023-092',
            name: 'Executive Quarterly',
            date: 'Oct 25, 2023',
            status: 'Completed',
            employees: 12,
            amount: '$155,000.00',
            wallet: 'Via USD High-Yield',
            statusClass: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20 glow-success',
            statusDot: 'bg-emerald-400',
            animateDot: false
        },
        {
            id: 'BAT-2023-091',
            name: 'Q4 Contractor Payments',
            date: 'Oct 24, 2023',
            status: 'Scheduled',
            employees: 214,
            amount: '$382,900.00',
            wallet: 'Multi-currency Batch',
            statusClass: 'bg-primary/20 text-blue-400 border-primary/30 glow-primary',
            statusDot: 'bg-blue-400',
            animateDot: false
        },
        {
            id: 'BAT-2023-090',
            name: 'Sales Commissions Q3',
            date: 'Oct 22, 2023',
            status: 'Failed',
            employees: 45,
            amount: '$88,420.00',
            wallet: 'Insufficient Liquidity',
            statusClass: 'bg-red-500/10 text-red-400 border-red-500/20',
            statusDot: 'bg-red-400',
            animateDot: false
        }
    ];

    return (
        <div className="flex h-screen overflow-hidden bg-background-dark font-display text-slate-300 antialiased selection:bg-primary/30">
            {/* Styles for custom scrollbar and glows */}
            <style>{`
                .glow-success { box-shadow: 0 0 12px rgba(16, 185, 129, 0.2); }
                .glow-warning { box-shadow: 0 0 12px rgba(245, 158, 11, 0.2); }
                .glow-primary { box-shadow: 0 0 12px rgba(25, 61, 179, 0.3); }
                ::-webkit-scrollbar { width: 6px; }
                ::-webkit-scrollbar-track { background: #000000; }
                ::-webkit-scrollbar-thumb { background: #1f1f1f; border-radius: 10px; }
                ::-webkit-scrollbar-thumb:hover { background: #2d2d2d; }
            `}</style>

            <Sidebar />

            <main className="flex-1 flex flex-col min-w-0 bg-background-dark overflow-y-auto">
                <Header onNewBatch={() => navigate('/payroll/new')} />

                <div className="p-8 space-y-8">
                    {/* Page Title */}
                    <div>
                        <h1 className="text-2xl font-bold text-white tracking-tight">Payroll Batches</h1>
                        <p className="text-sm text-slate-500 mt-1">Manage and track your organization's payout cycles.</p>
                    </div>

                    {/* Summary Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {stats.map((stat, index) => (
                            <div key={index} className="bg-surface-dark border border-border-dark p-5 rounded-xl flex flex-col justify-between group hover:border-primary/40 transition-colors">
                                <div className="flex items-center justify-between">
                                    <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">{stat.title}</span>
                                    <span className={`material-icons text-primary/60 group-hover:text-primary ${stat.iconClass || ''}`}>{stat.icon}</span>
                                </div>
                                <div className="mt-4">
                                    <div className="text-2xl font-bold text-white">{stat.value}</div>
                                    <div className={`text-[11px] mt-1 font-medium ${stat.subtextClass}`}>{stat.subtext}</div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Table Section */}
                    <div className="bg-surface-dark border border-border-dark rounded-xl overflow-hidden shadow-2xl">
                        <div className="px-6 py-4 border-b border-border-dark flex items-center justify-between bg-white/5">
                            <h3 className="font-semibold text-white">Recent Batches</h3>
                            <div className="flex items-center gap-2">
                                <button className="text-xs text-slate-400 hover:text-white px-3 py-1.5 rounded bg-white/5 border border-white/10 transition-colors">Filter</button>
                                <button className="text-xs text-slate-400 hover:text-white px-3 py-1.5 rounded bg-white/5 border border-white/10 transition-colors">Export CSV</button>
                            </div>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-white/[0.02] text-slate-500 uppercase text-[10px] font-bold tracking-widest border-b border-border-dark">
                                        <th className="px-6 py-4">Batch Details</th>
                                        <th className="px-6 py-4">Status</th>
                                        <th className="px-6 py-4">Employees</th>
                                        <th className="px-6 py-4">Total Amount</th>
                                        <th className="px-6 py-4 text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-border-dark">
                                    {batches.map((batch, index) => (
                                        <tr key={index} className="hover:bg-white/[0.02] transition-colors group">
                                            <td className="px-6 py-4">
                                                <div>
                                                    <div className="text-sm font-semibold text-white group-hover:text-primary transition-colors">{batch.name}</div>
                                                    <div className="text-xs text-slate-500">ID: {batch.id} • {batch.date}</div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold border ${batch.statusClass}`}>
                                                    <span className={`w-1.5 h-1.5 rounded-full mr-2 ${batch.statusDot} ${batch.animateDot ? 'animate-pulse' : ''}`}></span>
                                                    {batch.status}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-sm text-slate-300">{batch.employees}</td>
                                            <td className="px-6 py-4">
                                                <div className="text-sm font-semibold text-white">{batch.amount}</div>
                                                <div className="text-[10px] text-slate-500">{batch.wallet}</div>
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <button className="text-slate-500 hover:text-white transition-colors">
                                                    <span className="material-icons text-lg">more_horiz</span>
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <div className="px-6 py-4 border-t border-border-dark flex items-center justify-between bg-white/[0.02]">
                            <span className="text-xs text-slate-500">Showing 1 to {batches.length} of 248 batches</span>
                            <div className="flex gap-1">
                                <button className="p-2 rounded-lg text-slate-500 hover:bg-white/10 transition-colors disabled:opacity-50" disabled>
                                    <span className="material-icons text-sm">chevron_left</span>
                                </button>
                                <button className="w-8 h-8 rounded-lg bg-primary text-white text-xs font-bold">1</button>
                                <button className="w-8 h-8 rounded-lg text-slate-400 text-xs font-bold hover:bg-white/10 transition-colors">2</button>
                                <button className="w-8 h-8 rounded-lg text-slate-400 text-xs font-bold hover:bg-white/10 transition-colors">3</button>
                                <button className="p-2 rounded-lg text-slate-500 hover:bg-white/10 transition-colors">
                                    <span className="material-icons text-sm">chevron_right</span>
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Secondary Visual Context */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        <div className="lg:col-span-2 bg-surface-dark border border-border-dark rounded-xl p-6">
                            <div className="flex items-center justify-between mb-6">
                                <h4 className="font-semibold text-white">Batch Performance Trend</h4>
                                <select className="bg-transparent border-none text-xs text-slate-400 focus:ring-0 cursor-pointer outline-none">
                                    <option>Last 6 months</option>
                                    <option>Last Year</option>
                                </select>
                            </div>
                            <div className="h-48 w-full bg-gradient-to-t from-primary/5 to-transparent flex items-end justify-between px-2 gap-2">
                                {/* Simple Bar Chart Representation */}
                                {[40, 60, 45, 75, 90, 100].map((height, i) => (
                                    <div key={i} className={`w-full rounded-t-sm transition-all ${i === 5 ? 'bg-primary' : 'bg-primary/20 hover:bg-primary/40'}`} style={{ height: `${height}%` }}></div>
                                ))}
                            </div>
                            <div className="flex justify-between mt-4 text-[10px] text-slate-600 font-bold uppercase tracking-wider">
                                <span>May</span><span>Jun</span><span>Jul</span><span>Aug</span><span>Sep</span><span>Oct</span>
                            </div>
                        </div>
                        <div className="bg-surface-dark border border-border-dark rounded-xl p-6 flex flex-col justify-center items-center text-center">
                            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                                <span className="material-icons text-primary text-3xl">auto_fix_high</span>
                            </div>
                            <h4 className="font-bold text-white mb-2">Auto-Pay Active</h4>
                            <p className="text-sm text-slate-500 mb-6">Next automated batch for <span className="text-white">General Payroll</span> will trigger in 3 days.</p>
                            <button className="w-full py-2.5 rounded-lg border border-primary/40 text-primary text-xs font-bold hover:bg-primary/10 transition-all">Configure Settings</button>
                        </div>
                    </div>

                    {/* Footer */}
                    <footer className="p-8 border-t border-border-dark flex flex-col md:flex-row justify-between items-center gap-4 bg-background-dark/50">
                        <p className="text-[11px] text-slate-600 font-medium">© 2023 Velo Financial Systems. All rights reserved. Data encrypted with AES-256.</p>
                        <div className="flex items-center gap-6 text-[11px] text-slate-500 font-bold uppercase tracking-wider">
                            <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
                            <a href="#" className="hover:text-primary transition-colors">Terms of Service</a>
                            <a href="#" className="hover:text-primary transition-colors">Compliance</a>
                        </div>
                    </footer>
                </div>
            </main>
        </div>
    );
};

export default PayrollDashboard;
