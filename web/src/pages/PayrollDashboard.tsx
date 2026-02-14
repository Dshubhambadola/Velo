import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import BatchListHeader from '../components/BatchListHeader';
import AdvancedFilterSidebar from '../components/AdvancedFilterSidebar';
import { getBatches } from '../api/payroll';

const PayrollDashboard: React.FC = () => {
    const navigate = useNavigate();
    const [isFilterSidebarOpen, setIsFilterSidebarOpen] = useState(false);
    const [batches, setBatches] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    // Mock KPI Data (Calculated from real batches in a real app, keeping static for now or could sum up)
    const stats = [
        { title: 'Monthly Spend', value: '$1,420,500', subtext: '+12.5% from last month', icon: 'trending_up', subtextClass: 'text-emerald-500', glow: false },
        { title: 'Active Batches', value: batches.filter(b => b.status === 'pending').length.toString(), subtext: 'Pending approval', icon: 'schedule', subtextClass: 'text-slate-500', glow: false },
        { title: 'Next Pay Date', value: 'Oct 31, 2023', subtext: 'End of month cycle', icon: 'calendar_today', subtextClass: 'text-slate-500', glow: false },
        { title: 'Failed Payouts', value: '0', subtext: "Everything's running smooth", icon: 'warning', subtextClass: 'text-emerald-500', iconClass: 'text-red-500/60 group-hover:text-red-500', glow: false },
    ];

    useEffect(() => {
        const fetchBatches = async () => {
            try {
                const data = await getBatches();
                setBatches(data || []);
            } catch (error) {
                console.error("Failed to fetch batches:", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchBatches();
    }, []);

    const getStatusClass = (status: string) => {
        switch (status) {
            case 'completed': return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20 glow-success';
            case 'processing': return 'bg-amber-500/10 text-amber-400 border-amber-500/20 glow-warning';
            case 'pending': return 'bg-primary/20 text-blue-400 border-primary/30 glow-primary';
            case 'failed': return 'bg-red-500/10 text-red-400 border-red-500/20';
            default: return 'bg-slate-500/10 text-slate-400 border-slate-500/20';
        }
    };

    const getStatusDot = (status: string) => {
        switch (status) {
            case 'completed': return 'bg-emerald-400';
            case 'processing': return 'bg-amber-400';
            case 'pending': return 'bg-blue-400';
            case 'failed': return 'bg-red-400';
            default: return 'bg-slate-400';
        }
    };

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
                    <BatchListHeader onOpenFilters={() => setIsFilterSidebarOpen(true)} />

                    <div className="bg-surface-dark border border-border-dark rounded-xl overflow-hidden shadow-2xl">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-white/[0.02] text-slate-500 uppercase text-[10px] font-bold tracking-widest border-b border-border-dark">
                                        <th className="px-6 py-4">Batch Details</th>
                                        <th className="px-6 py-4">Status</th>
                                        <th className="px-6 py-4">Status</th>
                                        <th className="px-6 py-4">Total Amount</th>
                                        <th className="px-6 py-4 text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-border-dark">
                                    {isLoading ? (
                                        <tr><td colSpan={5} className="px-6 py-8 text-center text-slate-500">Loading batches...</td></tr>
                                    ) : batches.length === 0 ? (
                                        <tr><td colSpan={5} className="px-6 py-8 text-center text-slate-500">No batches found. Create one to get started.</td></tr>
                                    ) : (
                                        batches.map((batch, index) => (
                                            <tr key={index} className="hover:bg-white/[0.02] transition-colors group cursor-pointer" onClick={() => navigate(`/payroll/review/${batch.id}`)}>
                                                <td className="px-6 py-4">
                                                    <div>
                                                        <div className="text-sm font-semibold text-white group-hover:text-primary transition-colors">{batch.description || 'Untitled Batch'}</div>
                                                        <div className="text-xs text-slate-500">ID: {batch.id.substring(0, 8)} • {new Date(batch.created_at).toLocaleDateString()}</div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold border ${getStatusClass(batch.status)}`}>
                                                        <span className={`w-1.5 h-1.5 rounded-full mr-2 ${getStatusDot(batch.status)} ${batch.status === 'processing' ? 'animate-pulse' : ''}`}></span>
                                                        {batch.status}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 text-sm text-slate-300">{batch.recipient_count} Recipients</td>
                                                <td className="px-6 py-4">
                                                    <div className="text-sm font-semibold text-white">${batch.total_amount}</div>
                                                    <div className="text-[10px] text-slate-500">USDC</div>
                                                </td>
                                                <td className="px-6 py-4 text-right">
                                                    <button className="text-slate-500 hover:text-white transition-colors" onClick={(e) => { e.stopPropagation(); navigate(`/payroll/review/${batch.id}`); }}>
                                                        <span className="material-icons text-lg">chevron_right</span>
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                        <div className="px-6 py-4 border-t border-border-dark flex items-center justify-between bg-white/[0.02]">
                            <span className="text-xs text-slate-500">Showing {batches.length} batches</span>
                        </div>
                    </div>

                    {/* Secondary Visual Context */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        <div className="lg:col-span-2 bg-surface-dark border border-border-dark rounded-xl p-6">
                            <div className="flex items-center justify-between mb-6">
                                <h4 className="font-semibold text-white">Batch Performance Trend</h4>
                                <select
                                    className="bg-transparent border-none text-xs text-slate-400 focus:ring-0 cursor-pointer outline-none hover:text-white transition-colors"
                                    defaultValue="Last 6 months"
                                >
                                    <option>Last 6 months</option>
                                    <option>Last Year</option>
                                    <option>All Time</option>
                                </select>
                            </div>
                            <div className="h-48 w-full bg-gradient-to-t from-primary/5 to-transparent flex items-end justify-between px-2 gap-2">
                                {/* Simple Bar Chart Representation */}
                                {[40, 60, 45, 75, 90, 100].map((height, i) => (
                                    <div key={i} className={`w-full rounded-t-sm transition-all group relative ${i === 5 ? 'bg-primary' : 'bg-primary/20 hover:bg-primary/40'}`} style={{ height: `${height}%` }}>
                                        <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-white text-black text-[10px] font-bold px-2 py-1 rounded hidden group-hover:block whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                                            {['$42k', '$61k', '$48k', '$78k', '$92k', '$105k'][i]}
                                        </div>
                                    </div>
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
                            <button
                                onClick={() => navigate('/settings/payroll')}
                                className="w-full py-2.5 rounded-lg border border-primary/40 text-primary text-xs font-bold hover:bg-primary/10 transition-all"
                            >
                                Configure Settings
                            </button>
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
            <AdvancedFilterSidebar
                isOpen={isFilterSidebarOpen}
                onClose={() => setIsFilterSidebarOpen(false)}
            />
        </div>
    );
};

export default PayrollDashboard;
