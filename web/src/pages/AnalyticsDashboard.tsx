import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import { getAnalyticsOverview, AnalyticsData } from '../api/analytics';

const AnalyticsDashboard: React.FC = () => {
    // Custom styles
    const customStyles = `
        .custom-scrollbar::-webkit-scrollbar {
            width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
            background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
            background: #2d3748;
            border-radius: 10px;
        }
    `;

    const [data, setData] = useState<AnalyticsData | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await getAnalyticsOverview();
                setData(result);
            } catch (error) {
                console.error("Failed to fetch analytics", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);
    };

    const formatNumber = (num: number) => {
        return new Intl.NumberFormat('en-US').format(num);
    };

    return (
        <div className="flex h-screen overflow-hidden bg-[#101622] font-display text-slate-100">
            <style>{customStyles}</style>
            <Sidebar />

            <main className="flex-1 flex flex-col h-screen overflow-y-auto relative custom-scrollbar">
                <div className="max-w-7xl mx-auto px-6 py-10 w-full">
                    {/* Header */}
                    <header className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div>
                            <h1 className="text-2xl font-bold tracking-tight text-white">Analytics Overview</h1>
                            <p className="text-slate-400 text-sm mt-1">Real-time insights into your organization's financial health.</p>
                        </div>
                        <div className="flex items-center gap-3">
                            <select className="bg-slate-800 border border-slate-700 text-white text-sm rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary outline-none">
                                <option>Last 7 Days</option>
                                <option>Last 30 Days</option>
                                <option>Last Year</option>
                            </select>
                            <button className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg text-sm font-semibold hover:bg-blue-600 transition-all shadow-lg shadow-primary/20">
                                <span className="material-icons text-lg">file_download</span>
                                Export
                            </button>
                        </div>
                    </header>

                    {loading ? (
                        <div className="text-center py-20 text-slate-500">Loading analytics...</div>
                    ) : !data ? (
                        <div className="text-center py-20 text-slate-500">Failed to load data.</div>
                    ) : (
                        <>
                            {/* KPI Cards */}
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                                {/* Total Volume */}
                                <div className="bg-slate-800/50 border border-slate-700 p-6 rounded-xl hover:bg-slate-800 transition-colors group relative overflow-hidden">
                                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                                        <span className="material-icons text-4xl text-primary">account_balance_wallet</span>
                                    </div>
                                    <p className="text-sm font-medium text-slate-400 mb-2 uppercase tracking-wide">Total Volume</p>
                                    <h2 className="text-3xl font-bold text-white mb-2">{formatCurrency(data.total_volume)}</h2>
                                    <div className="flex items-center gap-2 text-sm">
                                        <span className={`flex items-center font-medium ${data.total_volume_trend >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                                            <span className="material-icons text-base">{data.total_volume_trend >= 0 ? 'trending_up' : 'trending_down'}</span>
                                            {Math.abs(data.total_volume_trend)}%
                                        </span>
                                        <span className="text-slate-500">vs last period</span>
                                    </div>
                                </div>

                                {/* Active Users */}
                                <div className="bg-slate-800/50 border border-slate-700 p-6 rounded-xl hover:bg-slate-800 transition-colors group relative overflow-hidden">
                                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                                        <span className="material-icons text-4xl text-amber-500">group</span>
                                    </div>
                                    <p className="text-sm font-medium text-slate-400 mb-2 uppercase tracking-wide">Active Users</p>
                                    <h2 className="text-3xl font-bold text-white mb-2">{formatNumber(data.active_users)}</h2>
                                    <div className="flex items-center gap-2 text-sm">
                                        <span className={`flex items-center font-medium ${data.active_users_trend >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                                            <span className="material-icons text-base">{data.active_users_trend >= 0 ? 'trending_up' : 'trending_down'}</span>
                                            {Math.abs(data.active_users_trend)}%
                                        </span>
                                        <span className="text-slate-500">vs last period</span>
                                    </div>
                                </div>

                                {/* Transactions */}
                                <div className="bg-slate-800/50 border border-slate-700 p-6 rounded-xl hover:bg-slate-800 transition-colors group relative overflow-hidden">
                                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                                        <span className="material-icons text-4xl text-blue-400">receipt_long</span>
                                    </div>
                                    <p className="text-sm font-medium text-slate-400 mb-2 uppercase tracking-wide">Transactions</p>
                                    <h2 className="text-3xl font-bold text-white mb-2">{formatNumber(data.transactions)}</h2>
                                    <div className="flex items-center gap-2 text-sm">
                                        <span className={`flex items-center font-medium ${data.transactions_trend >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                                            <span className="material-icons text-base">{data.transactions_trend >= 0 ? 'trending_up' : 'trending_down'}</span>
                                            {Math.abs(data.transactions_trend)}%
                                        </span>
                                        <span className="text-slate-500">vs last period</span>
                                    </div>
                                </div>

                                {/* Network Health */}
                                <div className="bg-slate-800/50 border border-slate-700 p-6 rounded-xl hover:bg-slate-800 transition-colors group relative overflow-hidden">
                                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                                        <span className="material-icons text-4xl text-emerald-400">dns</span>
                                    </div>
                                    <p className="text-sm font-medium text-slate-400 mb-2 uppercase tracking-wide">Network Health</p>
                                    <h2 className="text-3xl font-bold text-white mb-2">{data.network_health}%</h2>
                                    <div className="flex items-center gap-2 text-sm">
                                        <span className="flex items-center font-medium text-emerald-400">
                                            Operational
                                        </span>
                                        <span className="text-slate-500">All systems go</span>
                                    </div>
                                </div>
                            </div>

                            {/* Charts Section */}
                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                                {/* Main Chart Placeholder */}
                                <div className="lg:col-span-2 bg-slate-800/50 border border-slate-700 rounded-xl p-6 min-h-[300px] flex flex-col">
                                    <h3 className="text-lg font-semibold text-white mb-6">Transaction Volume Trend</h3>
                                    <div className="flex-1 flex items-end justify-between gap-2 px-4 pb-2 border-b border-slate-700/50 relative">
                                        {/* Simple Bar Chart Visualization */}
                                        {data.chart_data.map((point, i) => (
                                            <div key={i} className="flex flex-col items-center gap-2 flex-1 group">
                                                <div
                                                    className="w-full bg-primary/20 hover:bg-primary/40 rounded-t transition-all relative group-hover:shadow-[0_0_15px_rgba(19,127,236,0.3)]"
                                                    style={{ height: `${(point.value / 30000) * 100}%` }}
                                                >
                                                    <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-xs px-2 py-1 rounded border border-slate-700 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-10">
                                                        {formatCurrency(point.value)}
                                                    </div>
                                                </div>
                                                <span className="text-xs text-slate-500">{point.date}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Geographic Data */}
                                <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
                                    <h3 className="text-lg font-semibold text-white mb-6">Top Regions</h3>
                                    <div className="space-y-6">
                                        {data.geographic_data.map((geo, i) => (
                                            <div key={i}>
                                                <div className="flex justify-between items-center mb-2">
                                                    <span className="text-sm font-medium text-white">{geo.country}</span>
                                                    <span className="text-xs text-slate-400">{formatNumber(geo.users)} users</span>
                                                </div>
                                                <div className="w-full bg-slate-700 h-2 rounded-full overflow-hidden">
                                                    <div
                                                        className="h-full bg-primary rounded-full"
                                                        style={{ width: `${(geo.users / 2000) * 100}%` }} // Simplified percentage
                                                    ></div>
                                                </div>
                                                <div className="mt-1 text-right text-xs text-slate-500">
                                                    Vol: {formatCurrency(geo.volume)}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </main>
        </div>
    );
};

export default AnalyticsDashboard;
