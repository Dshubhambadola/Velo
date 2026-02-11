import React from 'react';
import Sidebar from '../components/Sidebar';

const AnalyticsDashboard: React.FC = () => {
    return (
        <div className="flex h-screen overflow-hidden bg-black font-display text-white">
            <Sidebar />

            <div className="flex flex-1 overflow-hidden flex-col">
                {/* Top Navigation Bar */}
                <nav className="h-14 border-b border-white/10 bg-black/80 backdrop-blur-md flex items-center justify-between px-6 sticky top-0 z-50 shrink-0">
                    <div className="flex items-center space-x-6">
                        <div className="flex items-center space-x-2">
                            <span className="text-white font-semibold tracking-tight">VELO <span className="text-gray-400 font-light">ANALYTICS</span></span>
                        </div>
                        <div className="h-4 w-[1px] bg-white/20"></div>
                        <div className="flex items-center text-xs text-gray-400 space-x-2">
                            <span className="hover:text-white cursor-pointer transition-colors">Velo</span>
                            <span className="material-icons text-[12px]">chevron_right</span>
                            <span className="text-white">Analytics Dashboard</span>
                        </div>
                    </div>
                    <div className="flex items-center space-x-6">
                        <div className="flex items-center space-x-2">
                            <div className="w-2 h-2 rounded-full bg-[#39ff14] animate-pulse"></div>
                            <span className="text-[10px] font-medium text-gray-400 uppercase tracking-widest">System Live</span>
                        </div>
                    </div>
                </nav>

                <div className="flex flex-1 overflow-hidden">
                    {/* Main Dashboard Content */}
                    <main className="flex-1 overflow-y-auto p-6 relative">
                        {/* Background Grid */}
                        <div className="absolute inset-0 pointer-events-none opacity-20" style={{ backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.05) 1px, transparent 1px)', backgroundSize: '24px 24px' }}></div>

                        {/* Header & Controls */}
                        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4 relative z-10">
                            <div>
                                <h1 className="text-3xl font-bold text-white tracking-tight">Performance Overview</h1>
                                <p className="text-gray-400 text-sm mt-1">Real-time financial telemetry for enterprise operations.</p>
                            </div>
                            <div className="flex items-center space-x-2">
                                <div className="flex bg-[#121212] border border-white/10 rounded-lg p-1">
                                    <button className="px-3 py-1.5 text-xs font-medium text-white bg-primary/20 rounded-md">1H</button>
                                    <button className="px-3 py-1.5 text-xs font-medium text-gray-400 hover:text-white">1D</button>
                                    <button className="px-3 py-1.5 text-xs font-medium text-gray-400 hover:text-white">1W</button>
                                    <button className="px-3 py-1.5 text-xs font-medium text-gray-400 hover:text-white">1M</button>
                                </div>
                                <button className="flex items-center space-x-2 bg-[#121212] border border-white/10 px-4 py-2 rounded-lg text-sm text-white hover:border-primary/50 transition-all">
                                    <span className="material-icons text-sm">calendar_today</span>
                                    <span>May 12 - May 18</span>
                                </button>
                                <button className="flex items-center space-x-2 bg-primary px-4 py-2 rounded-lg text-sm font-semibold text-white hover:bg-primary/90 transition-all shadow-[0_0_15px_rgba(37,140,244,0.3)]">
                                    <span className="material-icons text-sm">tune</span>
                                    <span>Filters</span>
                                </button>
                            </div>
                        </div>

                        {/* KPI Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8 relative z-10">
                            {/* Total Volume */}
                            <div className="bg-[#121212] border border-white/5 p-5 rounded-xl shadow-[0_0_10px_rgba(0,242,255,0.2)]">
                                <div className="flex justify-between items-start mb-4">
                                    <span className="text-gray-400 text-xs font-medium uppercase tracking-wider">Total Volume</span>
                                    <span className="text-[#39ff14] text-xs font-bold">+12.4%</span>
                                </div>
                                <div className="flex items-baseline space-x-2">
                                    <h2 className="text-2xl font-bold text-white tracking-tight">$4.28M</h2>
                                    <span className="text-gray-400 text-[10px]">USD</span>
                                </div>
                                <div className="mt-4 h-1 w-full bg-white/5 rounded-full overflow-hidden">
                                    <div className="h-full bg-primary w-3/4"></div>
                                </div>
                            </div>

                            {/* Success Rate */}
                            <div className="bg-[#121212] border border-white/5 p-5 rounded-xl">
                                <div className="flex justify-between items-start mb-4">
                                    <span className="text-gray-400 text-xs font-medium uppercase tracking-wider">Success Rate</span>
                                    <span className="text-[#00f2ff] text-xs font-bold">99.98%</span>
                                </div>
                                <div className="flex items-baseline space-x-2">
                                    <h2 className="text-2xl font-bold text-white tracking-tight">412,892</h2>
                                    <span className="text-gray-400 text-[10px]">TXS</span>
                                </div>
                                <div className="mt-4 h-1 w-full bg-white/5 rounded-full overflow-hidden">
                                    <div className="h-full bg-[#00f2ff] w-[99%] shadow-[0_0_8px_#00f2ff]"></div>
                                </div>
                            </div>

                            {/* Active Users */}
                            <div className="bg-[#121212] border border-white/5 p-5 rounded-xl">
                                <div className="flex justify-between items-start mb-4">
                                    <span className="text-gray-400 text-xs font-medium uppercase tracking-wider">Active Users</span>
                                    <span className="text-[#39ff14] text-xs font-bold">+2.1k</span>
                                </div>
                                <div className="flex items-baseline space-x-2">
                                    <h2 className="text-2xl font-bold text-white tracking-tight">18.4k</h2>
                                    <span className="text-gray-400 text-[10px]">REAL-TIME</span>
                                </div>
                                <div className="mt-4 h-1 w-full bg-white/5 rounded-full overflow-hidden flex">
                                    <div className="h-full bg-white/20 w-1/2"></div>
                                    <div className="h-full bg-primary w-1/4"></div>
                                </div>
                            </div>

                            {/* Avg Latency */}
                            <div className="bg-[#121212] border border-white/5 p-5 rounded-xl">
                                <div className="flex justify-between items-start mb-4">
                                    <span className="text-gray-400 text-xs font-medium uppercase tracking-wider">Avg Latency</span>
                                    <span className="text-[#39ff14] text-xs font-bold">-14ms</span>
                                </div>
                                <div className="flex items-baseline space-x-2">
                                    <h2 className="text-2xl font-bold text-white tracking-tight">84ms</h2>
                                    <span className="text-gray-400 text-[10px]">GLOBAL</span>
                                </div>
                                <div className="mt-4 h-1 w-full bg-white/5 rounded-full overflow-hidden">
                                    <div className="h-full bg-[#39ff14]/50 w-full"></div>
                                </div>
                            </div>
                        </div>

                        {/* Hero Chart Area */}
                        <div className="bg-[#121212] border border-white/5 rounded-xl p-6 mb-8 relative z-10">
                            <div className="flex items-center justify-between mb-8">
                                <div>
                                    <h3 className="text-lg font-semibold text-white">Payment Volume</h3>
                                    <p className="text-gray-400 text-xs">Aggregate transaction volume across all nodes</p>
                                </div>
                                <div className="flex items-center space-x-4">
                                    <div className="flex items-center space-x-2">
                                        <div className="w-3 h-3 rounded-full bg-primary shadow-[0_0_8px_#258cf4]"></div>
                                        <span className="text-xs text-gray-400">Primary Bridge</span>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <div className="w-3 h-3 rounded-full bg-white/10"></div>
                                        <span className="text-xs text-gray-400">Baseline</span>
                                    </div>
                                </div>
                            </div>
                            <div className="relative h-64 w-full">
                                {/* Custom SVG Area Chart Mockup */}
                                <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 1000 200">
                                    <defs>
                                        <linearGradient id="areaGradient" x1="0" x2="0" y1="0" y2="1">
                                            <stop offset="0%" stopColor="#258cf4" stopOpacity="0.3"></stop>
                                            <stop offset="100%" stopColor="#258cf4" stopOpacity="0"></stop>
                                        </linearGradient>
                                    </defs>
                                    <line stroke="rgba(255,255,255,0.05)" strokeWidth="1" x1="0" x2="1000" y1="50" y2="50"></line>
                                    <line stroke="rgba(255,255,255,0.05)" strokeWidth="1" x1="0" x2="1000" y1="100" y2="100"></line>
                                    <line stroke="rgba(255,255,255,0.05)" strokeWidth="1" x1="0" x2="1000" y1="150" y2="150"></line>
                                    <path d="M0 200 L0 150 Q 150 120, 300 160 T 600 80 T 1000 120 L 1000 200 Z" fill="url(#areaGradient)"></path>
                                    <path d="M0 150 Q 150 120, 300 160 T 600 80 T 1000 120" fill="none" stroke="#258cf4" strokeWidth="3" style={{ filter: 'drop-shadow(0 0 4px #258cf4)' }}></path>
                                    <circle cx="600" cy="80" fill="#258cf4" r="4" stroke="white" strokeWidth="2"></circle>
                                </svg>
                                {/* Tooltip */}
                                <div className="absolute top-10 left-[58%] transform translate-x-[-50%] bg-white/10 backdrop-blur-md border border-white/20 p-2 rounded text-[10px] text-white">
                                    <div className="font-bold">14:00 UTC</div>
                                    <div>$242.4k Volume</div>
                                </div>
                            </div>
                            <div className="flex justify-between mt-4 text-[10px] text-gray-400 font-medium uppercase tracking-widest px-1">
                                <span>08:00</span>
                                <span>10:00</span>
                                <span>12:00</span>
                                <span>14:00</span>
                                <span>16:00</span>
                                <span>18:00</span>
                                <span>20:00</span>
                            </div>
                        </div>

                        {/* Secondary Grid: Map & Donut */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 relative z-10">
                            {/* Map Container */}
                            <div className="bg-[#121212] border border-white/5 rounded-xl p-6">
                                <div className="flex items-center justify-between mb-6">
                                    <h3 className="text-lg font-semibold text-white">Global Activity</h3>
                                    <span className="material-icons text-gray-400 cursor-pointer">more_horiz</span>
                                </div>
                                <div className="relative bg-black/40 rounded-lg overflow-hidden h-[300px] flex items-center justify-center border border-white/5">
                                    <div className="text-gray-500 text-xs">Interactive Map Visualization Placeholder</div>
                                    {/* Neon Highlights on Map (Overlay) - Simulated positioning */}
                                    <div className="absolute top-[40%] left-[25%] w-3 h-3 bg-[#00f2ff] rounded-full animate-ping"></div>
                                    <div className="absolute top-[40%] left-[25%] w-2 h-2 bg-[#00f2ff] rounded-full"></div>
                                    <div className="absolute top-[35%] left-[55%] w-2 h-2 bg-primary rounded-full shadow-[0_0_8px_#258cf4]"></div>
                                    <div className="absolute top-[60%] left-[80%] w-2 h-2 bg-primary rounded-full shadow-[0_0_8px_#258cf4]"></div>
                                    <div className="absolute top-[50%] left-[15%] w-2 h-2 bg-primary rounded-full shadow-[0_0_8px_#258cf4]"></div>
                                </div>
                                <div className="grid grid-cols-3 gap-4 mt-6">
                                    <div>
                                        <p className="text-[10px] text-gray-400 uppercase font-bold tracking-tighter">North America</p>
                                        <p className="text-sm font-semibold text-white">42.4%</p>
                                    </div>
                                    <div>
                                        <p className="text-[10px] text-gray-400 uppercase font-bold tracking-tighter">Europe / EMEA</p>
                                        <p className="text-sm font-semibold text-white">31.8%</p>
                                    </div>
                                    <div>
                                        <p className="text-[10px] text-gray-400 uppercase font-bold tracking-tighter">Asia Pacific</p>
                                        <p className="text-sm font-semibold text-white">25.8%</p>
                                    </div>
                                </div>
                            </div>

                            {/* Status Donut */}
                            <div className="bg-[#121212] border border-white/5 rounded-xl p-6">
                                <div className="flex items-center justify-between mb-6">
                                    <h3 className="text-lg font-semibold text-white">Status Distribution</h3>
                                    <span className="material-icons text-gray-400 cursor-pointer">filter_list</span>
                                </div>
                                <div className="flex items-center justify-around h-[300px]">
                                    <div className="relative w-48 h-48">
                                        {/* Custom Donut Chart Mockup */}
                                        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                                            {/* Success (85%) */}
                                            <circle className="opacity-80" cx="50" cy="50" fill="transparent" r="40" stroke="#39ff14" strokeDasharray="213.6 251.2" strokeDashoffset="0" strokeWidth="12"></circle>
                                            {/* Pending (10%) */}
                                            <circle className="opacity-80" cx="50" cy="50" fill="transparent" r="40" stroke="#258cf4" strokeDasharray="25.12 251.2" strokeDashoffset="-213.6" strokeWidth="12"></circle>
                                            {/* Failed (5%) */}
                                            <circle className="opacity-80" cx="50" cy="50" fill="transparent" r="40" stroke="#ff3131" strokeDasharray="12.56 251.2" strokeDashoffset="-238.72" strokeWidth="12"></circle>
                                        </svg>
                                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                                            <span className="text-3xl font-bold text-white">412k</span>
                                            <span className="text-[10px] text-gray-400 uppercase tracking-widest">Total</span>
                                        </div>
                                    </div>
                                    <div className="space-y-4">
                                        <div className="flex items-center space-x-3">
                                            <div className="w-3 h-3 rounded-sm bg-[#39ff14] shadow-[0_0_6px_#39ff14]"></div>
                                            <div>
                                                <p className="text-xs text-white font-medium">Successful</p>
                                                <p className="text-[10px] text-gray-400">350,210 transactions</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center space-x-3">
                                            <div className="w-3 h-3 rounded-sm bg-primary shadow-[0_0_6px_#258cf4]"></div>
                                            <div>
                                                <p className="text-xs text-white font-medium">Pending</p>
                                                <p className="text-[10px] text-gray-400">41,289 transactions</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center space-x-3">
                                            <div className="w-3 h-3 rounded-sm bg-[#ff3131] shadow-[0_0_6px_#ff3131]"></div>
                                            <div>
                                                <p className="text-xs text-white font-medium">Failed / High Risk</p>
                                                <p className="text-[10px] text-gray-400">20,393 transactions</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </main>
                </div>
            </div>

            {/* Right Sidebar: AI Key Insights */}
            <aside className="w-80 bg-[#121212] border-l border-white/10 flex flex-col hidden xl:flex shrink-0">
                <div className="p-6 border-b border-white/5 flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                        <span className="material-icons text-primary text-xl">auto_awesome</span>
                        <h3 className="font-bold text-white text-sm uppercase tracking-widest">Key AI Insights</h3>
                    </div>
                    <div className="px-2 py-0.5 rounded-full bg-primary/10 border border-primary/20 text-[10px] text-primary font-bold">BETA</div>
                </div>
                <div className="p-6 flex-1 overflow-y-auto space-y-6">
                    {/* Insight Card 1 */}
                    <div className="space-y-3">
                        <div className="flex items-center space-x-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#39ff14]"></span>
                            <h4 className="text-xs font-bold text-white uppercase tracking-tight">Growth Anomaly</h4>
                        </div>
                        <p className="text-gray-400 text-sm leading-relaxed">
                            Transaction volume in <span className="text-white font-medium">EMEA region</span> is up <span className="text-[#39ff14]">12%</span> over the last 4 hours, primarily driven by retail bridge activity.
                        </p>
                    </div>
                    {/* Insight Card 2 */}
                    <div className="space-y-3">
                        <div className="flex items-center space-x-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
                            <h4 className="text-xs font-bold text-white uppercase tracking-tight">Risk Mitigation</h4>
                        </div>
                        <ul className="space-y-3">
                            <li className="flex items-start space-x-2">
                                <span className="text-white mt-1">•</span>
                                <p className="text-gray-400 text-sm">Automated filtering blocked <span className="text-white">1,203</span> suspicious attempts from known high-risk node IP ranges.</p>
                            </li>
                            <li className="flex items-start space-x-2">
                                <span className="text-white mt-1">•</span>
                                <p className="text-gray-400 text-sm">System latency stabilized after rerouting traffic via Frankfurt gateway.</p>
                            </li>
                        </ul>
                    </div>
                    {/* Insight Card 3 */}
                    <div className="bg-primary/5 border border-primary/10 rounded-lg p-4 space-y-3">
                        <h4 className="text-xs font-bold text-primary uppercase tracking-tight">Forecast</h4>
                        <p className="text-gray-400 text-sm">
                            Expected volume spike at <span className="text-white">08:00 UTC</span> Monday. Recommendation: Increase node scaling in Singapore cluster.
                        </p>
                    </div>
                </div>
                <div className="p-6 border-t border-white/5 bg-black/50">
                    <button className="w-full py-3 bg-white text-black font-bold text-xs uppercase tracking-widest rounded-lg hover:bg-gray-300 transition-all flex items-center justify-center space-x-2">
                        <span className="material-icons text-sm">summarize</span>
                        <span>Generate Full Report</span>
                    </button>
                </div>
            </aside>
        </div>
    );
};

export default AnalyticsDashboard;
