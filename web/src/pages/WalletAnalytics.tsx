import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import { getAnalytics } from '../api/wallet';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Cell } from 'recharts';

const chartData = [
    { name: 'Jan', actual: 4000, forecast: 4100 },
    { name: 'Feb', actual: 3000, forecast: 3200 },
    { name: 'Mar', actual: 2000, forecast: 2200 },
    { name: 'Apr', actual: 2780, forecast: 2900 },
    { name: 'May', actual: 1890, forecast: 2100 },
    { name: 'Jun', actual: 2390, forecast: 2500 },
    { name: 'Jul', actual: 3490, forecast: 3600 },
];
const networkData = [
    { name: 'ETH', fees: 21492, color: '#0657f9' },
    { name: 'POLY', fees: 12110, color: '#00f2ff' },
    { name: 'SOL', fees: 6233, color: '#ffffff' },
    { name: 'BASE', fees: 3066, color: '#93c5fd' },
];

const WalletAnalytics: React.FC = () => {
    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        loadAnalytics();
    }, []);

    const loadAnalytics = async () => {
        try {
            setLoading(true);
            const analyticsData = await getAnalytics();
            setData(analyticsData);
            setError(null);
        } catch (err) {
            console.error(err);
            setError('Failed to load analytics data');
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="flex min-h-screen bg-black text-white font-display">
                <Sidebar />
                <main className="flex-1 flex items-center justify-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#0657f9]"></div>
                </main>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex min-h-screen bg-black text-white font-display">
                <Sidebar />
                <main className="flex-1 flex flex-col items-center justify-center">
                    <p className="text-red-400 mb-4">{error}</p>
                    <button
                        onClick={loadAnalytics}
                        className="px-4 py-2 bg-[#0657f9] rounded-lg hover:bg-[#0657f9]/80 transition-colors"
                    >
                        Retry
                    </button>
                </main>
            </div>
        );
    }

    return (
        <div className="flex min-h-screen bg-black text-white font-display">
            <style>{`
                .glow-cyan { filter: drop-shadow(0 0 4px rgba(0, 242, 255, 0.4)); }
                .glow-primary { filter: drop-shadow(0 0 6px rgba(6, 87, 249, 0.5)); }
                .glass-dropdown { background: rgba(18, 18, 18, 0.9); backdrop-filter: blur(12px); border: 1px solid #1c1c1c; }
                .custom-scrollbar::-webkit-scrollbar { width: 4px; }
                .custom-scrollbar::-webkit-scrollbar-track { background: #000; }
                .custom-scrollbar::-webkit-scrollbar-thumb { background: #1c1c1c; border-radius: 10px; }
            `}</style>
            <Sidebar />
            <main className="flex-1 flex flex-col overflow-y-auto custom-scrollbar">
                {/* Header Section */}
                <header className="sticky top-0 bg-black/80 backdrop-blur-md z-20 px-8 py-6 flex justify-between items-center border-b border-[#1c1c1c]">
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight">Wallet Analytics</h1>
                        <p className="text-[#A0A0A0] text-sm">Real-time obsidian command center • Velo B2B</p>
                    </div>
                    <div className="flex items-center gap-4 relative">
                        <div className="flex items-center bg-[#121212] border border-[#1c1c1c] rounded-lg px-3 py-2 gap-3">
                            <span className="material-icons text-[#A0A0A0] text-sm">calendar_today</span>
                            <span className="text-sm font-medium">Last 30 Days</span>
                        </div>
                        {/* Export Dropdown Active State */}
                        <div className="relative group">
                            <button className="flex items-center gap-2 bg-[#0657f9] hover:bg-[#0657f9]/90 text-white px-5 py-2 rounded-lg font-medium transition-all shadow-lg shadow-[#0657f9]/20">
                                <span className="material-icons text-sm">download</span>
                                Export
                                <span className="material-icons text-sm">expand_more</span>
                            </button>
                            {/* Visible Dropdown on Hover */}
                            <div className="absolute right-0 mt-2 w-48 glass-dropdown rounded-xl shadow-2xl overflow-hidden py-1 z-50 hidden group-hover:block">
                                <div className="px-4 py-2 text-[10px] uppercase tracking-widest text-[#A0A0A0] font-bold border-b border-[#1c1c1c] mb-1">Select Format</div>
                                <button className="w-full text-left px-4 py-3 hover:bg-[#0657f9]/10 flex items-center gap-3 transition-colors">
                                    <span className="material-icons text-red-500 text-lg">picture_as_pdf</span>
                                    <span className="text-sm font-medium">PDF Document</span>
                                </button>
                                <button className="w-full text-left px-4 py-3 hover:bg-[#0657f9]/10 flex items-center gap-3 transition-colors">
                                    <span className="material-icons text-green-500 text-lg">description</span>
                                    <span className="text-sm font-medium">CSV Spreadsheet</span>
                                </button>
                                <button className="w-full text-left px-4 py-3 hover:bg-[#0657f9]/10 flex items-center gap-3 transition-colors">
                                    <span className="material-icons text-blue-500 text-lg">table_chart</span>
                                    <span className="text-sm font-medium">Excel (.xlsx)</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </header>

                <div className="p-8 space-y-8">
                    {/* KPI Row */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="bg-[#121212] border border-[#1c1c1c] p-6 rounded-xl relative overflow-hidden group">
                            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                                <span className="material-icons text-6xl text-[#0657f9]">account_balance</span>
                            </div>
                            <p className="text-[#A0A0A0] text-sm font-medium uppercase tracking-wider mb-2">Total Spend</p>
                            <div className="flex items-end gap-3">
                                <h3 className="text-3xl font-bold">${data?.total_spend?.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</h3>
                                <span className="text-emerald-400 text-sm font-medium mb-1 flex items-center">
                                    <span className="material-icons text-xs">arrow_upward</span> 12.5%
                                </span>
                            </div>
                            <div className="mt-4 h-1 w-full bg-[#1c1c1c] rounded-full overflow-hidden">
                                <div className="h-full bg-[#0657f9] w-[75%] glow-primary"></div>
                            </div>
                        </div>
                        <div className="bg-[#121212] border border-[#1c1c1c] p-6 rounded-xl relative overflow-hidden group">
                            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                                <span className="material-icons text-6xl text-[#00f2ff]">receipt_long</span>
                            </div>
                            <p className="text-[#A0A0A0] text-sm font-medium uppercase tracking-wider mb-2">Network Fees</p>
                            <div className="flex items-end gap-3">
                                <h3 className="text-3xl font-bold">${data?.network_fees?.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</h3>
                                <span className="text-red-400 text-sm font-medium mb-1 flex items-center">
                                    <span className="material-icons text-xs">arrow_upward</span> 4.2%
                                </span>
                            </div>
                            <div className="mt-4 h-1 w-full bg-[#1c1c1c] rounded-full overflow-hidden">
                                <div className="h-full bg-[#00f2ff] w-[45%] glow-cyan"></div>
                            </div>
                        </div>
                        <div className="bg-[#121212] border border-[#1c1c1c] p-6 rounded-xl relative overflow-hidden group">
                            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                                <span className="material-icons text-6xl text-[#A0A0A0]">groups</span>
                            </div>
                            <p className="text-[#A0A0A0] text-sm font-medium uppercase tracking-wider mb-2">Active Wallets</p>
                            <div className="flex items-end gap-3">
                                <h3 className="text-3xl font-bold">{data?.active_wallets}</h3>
                                <span className="text-emerald-400 text-sm font-medium mb-1 flex items-center">
                                    <span className="material-icons text-xs">arrow_upward</span> 8 new
                                </span>
                            </div>
                            <div className="mt-4 h-1 w-full bg-[#1c1c1c] rounded-full overflow-hidden">
                                <div className="h-full bg-white/20 w-[88%]"></div>
                            </div>
                        </div>
                    </div>

                    {/* Middle Charts Row */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* Budget Forecast Line Chart */}
                        <div className="lg:col-span-2 bg-[#121212] border border-[#1c1c1c] p-6 rounded-xl flex flex-col">
                            <div className="flex justify-between items-center mb-8">
                                <div>
                                    <h4 className="text-lg font-bold">Budget Forecast</h4>
                                    <p className="text-[#A0A0A0] text-xs">Projected vs Historical Spend (90d)</p>
                                </div>
                                <div className="flex gap-4">
                                    <div className="flex items-center gap-2">
                                        <span className="w-3 h-3 rounded-full bg-[#0657f9] glow-primary"></span>
                                        <span className="text-xs text-[#A0A0A0]">Actual</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="w-3 h-3 rounded-full border border-dashed border-[#00f2ff] glow-cyan"></span>
                                        <span className="text-xs text-[#A0A0A0]">Forecast</span>
                                    </div>
                                </div>
                            </div>
                            <div className="flex-1 w-full min-h-[300px]">
                                <ResponsiveContainer width="100%" height="100%">
                                    <AreaChart data={data?.forecast_data || chartData} margin={{ top: 10, right: 10, left: 10, bottom: 0 }}>
                                        <defs>
                                            <linearGradient id="colorActual" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="#0657f9" stopOpacity={0.3} />
                                                <stop offset="95%" stopColor="#0657f9" stopOpacity={0} />
                                            </linearGradient>
                                            <linearGradient id="colorForecast" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="#00f2ff" stopOpacity={0.3} />
                                                <stop offset="95%" stopColor="#00f2ff" stopOpacity={0} />
                                            </linearGradient>
                                        </defs>
                                        <CartesianGrid strokeDasharray="4 4" stroke="#1c1c1c" vertical={false} />
                                        <XAxis
                                            dataKey="name"
                                            stroke="#A0A0A0"
                                            fontSize={10}
                                            tickLine={false}
                                            axisLine={false}
                                            dy={10}
                                        />
                                        <YAxis
                                            stroke="#A0A0A0"
                                            fontSize={10}
                                            tickLine={false}
                                            axisLine={false}
                                            tickFormatter={(value) => `$${value / 1000}k`}
                                            dx={-10}
                                        />
                                        <Tooltip
                                            contentStyle={{ backgroundColor: '#121212', borderColor: '#1c1c1c', borderRadius: '8px' }}
                                            itemStyle={{ color: '#fff' }}
                                        />
                                        <Area type="monotone" dataKey="actual" stroke="#0657f9" strokeWidth={3} fillOpacity={1} fill="url(#colorActual)" />
                                        <Area type="monotone" dataKey="forecast" stroke="#00f2ff" strokeWidth={2} strokeDasharray="5 5" fillOpacity={1} fill="url(#colorForecast)" />
                                    </AreaChart>
                                </ResponsiveContainer>
                            </div>
                        </div>

                        {/* Cost Analysis Stacked Bar chart */}
                        <div className="bg-[#121212] border border-[#1c1c1c] p-6 rounded-xl flex flex-col">
                            <div className="mb-6">
                                <h4 className="text-lg font-bold">Cost Analysis</h4>
                                <p className="text-[#A0A0A0] text-xs">Fees paid per network</p>
                            </div>
                            <div className="flex-1 w-full min-h-[250px]">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart
                                        data={data?.network_data || networkData}
                                        layout="vertical"
                                        margin={{ top: 0, right: 20, left: 0, bottom: 0 }}
                                    >
                                        <CartesianGrid strokeDasharray="3 3" stroke="#1c1c1c" horizontal={false} />
                                        <XAxis type="number" hide />
                                        <YAxis
                                            dataKey="name"
                                            type="category"
                                            axisLine={false}
                                            tickLine={false}
                                            tick={{ fill: '#A0A0A0', fontSize: 10, fontWeight: 'bold' }}
                                            width={60}
                                        />
                                        <Tooltip
                                            cursor={{ fill: '#1c1c1c', opacity: 0.4 }}
                                            contentStyle={{ backgroundColor: '#121212', borderColor: '#1c1c1c', borderRadius: '8px' }}
                                            itemStyle={{ color: '#fff' }}
                                        />
                                        <Bar dataKey="fees" radius={[0, 4, 4, 0]}>
                                            {networkData.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={entry.color} />
                                            ))}
                                        </Bar>
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                            <div className="mt-8 pt-6 border-t border-[#1c1c1c] flex justify-between items-center">
                                <span className="text-xs text-[#A0A0A0]">Avg. Network Fee</span>
                                <span className="text-sm font-bold">$12.44</span>
                            </div>
                        </div>
                    </div>

                    {/* Bottom Row: Geo & Distribution */}
                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 pb-8">
                        {/* Geographic Distribution Map */}
                        <div className="lg:col-span-3 bg-[#121212] border border-[#1c1c1c] p-6 rounded-xl overflow-hidden relative min-h-[400px]">
                            <div className="flex justify-between items-center mb-6 relative z-10">
                                <div>
                                    <h4 className="text-lg font-bold">Geographic Distribution</h4>
                                    <p className="text-[#A0A0A0] text-xs">Global spending hot-spots</p>
                                </div>
                                <div className="flex gap-2">
                                    <span className="px-3 py-1 bg-[#1c1c1c] rounded-full text-[10px] font-bold uppercase tracking-widest text-[#A0A0A0]">Global</span>
                                </div>
                            </div>
                            {/* Map Visual Placeholder */}
                            <div className="absolute inset-0 flex items-center justify-center opacity-40">
                                <img alt="World Map" className="w-full h-full object-cover filter grayscale brightness-50 contrast-125" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBcEMEwVGJmETW8tVYlCuRpr_kigiYsqwEO-xCRF63uBGO0mg6ZPhOxhjb8b8K-tnE-9byokO-Xkj1h1FBQzB8iNEguJjX0dJmDTmRDo8ayhJur5Ff8qYbw8lrt-CtU-13pavGz87VHRrNgtFWALdcTDg-HLb-dKRo_o7Mloqoydk4glx-XYQdxrBwxH5rodRi7sbk3166m9oRS4L7LBdlKmr1dsacJkAUDzL9_EXF5mCg7GD7F1H4z55odofxB0DgMdflvC3-YCqc3" />
                            </div>
                            {/* Pulse Markers */}
                            <div className="absolute top-1/3 left-1/4 w-4 h-4 bg-[#00f2ff] rounded-full animate-ping glow-cyan"></div>
                            <div className="absolute top-1/2 left-1/3 w-3 h-3 bg-[#0657f9] rounded-full glow-primary"></div>
                            <div className="absolute bottom-1/4 left-1/2 w-4 h-4 bg-[#00f2ff] rounded-full animate-pulse glow-cyan"></div>
                            <div className="absolute top-1/4 right-1/4 w-3 h-3 bg-white rounded-full opacity-50"></div>
                            {/* Legend */}
                            <div className="absolute bottom-6 left-6 z-10 space-y-3">
                                <div className="bg-black/60 backdrop-blur-md p-3 rounded-lg border border-[#1c1c1c] flex items-center gap-4">
                                    <span className="w-2 h-2 rounded-full bg-[#00f2ff]"></span>
                                    <span className="text-xs font-medium">North America</span>
                                    <span className="text-xs font-bold ml-auto text-[#00f2ff]">42%</span>
                                </div>
                                <div className="bg-black/60 backdrop-blur-md p-3 rounded-lg border border-[#1c1c1c] flex items-center gap-4">
                                    <span className="w-2 h-2 rounded-full bg-[#0657f9]"></span>
                                    <span className="text-xs font-medium">Europe (EU)</span>
                                    <span className="text-xs font-bold ml-auto text-[#0657f9]">31%</span>
                                </div>
                            </div>
                        </div>

                        {/* Market Sentiment/Small Donut */}
                        <div className="bg-[#121212] border border-[#1c1c1c] p-6 rounded-xl flex flex-col justify-between">
                            <div>
                                <h4 className="text-lg font-bold">Gas Trends</h4>
                                <p className="text-[#A0A0A0] text-xs">Network congestion status</p>
                            </div>
                            <div className="relative py-8 flex justify-center">
                                <svg className="w-40 h-40 transform -rotate-90">
                                    <circle cx="80" cy="80" fill="transparent" r="70" stroke="#1c1c1c" strokeWidth="12"></circle>
                                    <circle className="glow-cyan" cx="80" cy="80" fill="transparent" r="70" stroke="#00f2ff" strokeDasharray="440" strokeDashoffset="132" strokeWidth="12"></circle>
                                </svg>
                                <div className="absolute inset-0 flex flex-col items-center justify-center">
                                    <span className="text-3xl font-bold">32</span>
                                    <span className="text-[10px] text-[#A0A0A0] uppercase font-bold tracking-widest">GWEI</span>
                                </div>
                            </div>
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <span className="text-xs text-[#A0A0A0]">Priority Level</span>
                                    <span className="text-xs font-bold text-emerald-400">OPTIMAL</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-xs text-[#A0A0A0]">Next Block</span>
                                    <span className="text-xs font-bold">~12.4s</span>
                                </div>
                                <button className="w-full py-3 bg-[#1c1c1c] hover:bg-white/10 rounded-lg text-xs font-bold uppercase tracking-widest transition-colors">
                                    Gas History
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default WalletAnalytics;
