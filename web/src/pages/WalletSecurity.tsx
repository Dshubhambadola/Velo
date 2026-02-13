import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import { getSecurityLogs } from '../api/wallet';

const WalletSecurity: React.FC = () => {
    const [logs, setLogs] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    // const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        loadLogs();
    }, []);

    const loadLogs = async () => {
        try {
            setLoading(true);
            const data = await getSecurityLogs();
            setLogs(data);
            // setError(null);
        } catch (err) {
            console.error(err);
            // setError('Failed to load security logs');
        } finally {
            setLoading(false);
        }
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleString();
    };

    const getStatusColor = (status: string) => {
        if (status === 'success' || status === 'verified') return 'text-green-500 bg-green-500/20 border-green-500/30';
        if (status === 'failed' || status === 'flagged') return 'text-[#ffaa00] bg-[#ffaa00]/20 border-[#ffaa00]/30';
        return 'text-[#00f3ff] bg-[#00f3ff]/20 border-[#00f3ff]/30';
    };

    return (
        <div className="flex min-h-screen bg-black font-display text-white selection:bg-[#f90606]/30">
            <Sidebar />
            <div className="flex-1 flex flex-col h-screen overflow-hidden relative">
                {/* Visual Scanline Overlay */}
                <div className="absolute inset-0 pointer-events-none z-[100]" style={{
                    background: 'linear-gradient(to bottom, transparent 50%, rgba(0, 0, 0, 0.5) 50%)',
                    backgroundSize: '100% 4px'
                }}></div>

                {/* Top Security Alert Banner */}
                <div className="w-full bg-[#ffaa00]/10 border-b border-[#ffaa00]/30 py-2 px-6 flex items-center justify-between sticky top-0 z-50 backdrop-blur-md">
                    <div className="flex items-center gap-3">
                        <span className="material-icons text-[#ffaa00] animate-pulse">warning</span>
                        <p className="text-sm font-medium tracking-wide">
                            <span className="text-[#ffaa00] uppercase mr-2 font-bold">Security Alert:</span>
                            Suspicious login attempt from <span className="underline decoration-[#ffaa00]/50">New York, NY</span> detected on Administrator Node 04.
                        </p>
                    </div>
                    <div className="flex items-center gap-4">
                        <span className="text-[10px] font-mono text-[#a0a0a0] uppercase tracking-widest">Priority: High</span>
                        <button className="text-xs font-bold border border-[#ffaa00]/50 px-3 py-1 rounded hover:bg-[#ffaa00] hover:text-black transition-colors">DISMISS</button>
                    </div>
                </div>

                {/* Main Navigation / Header */}
                <header className="border-b border-white/5 bg-[#121212]/50 px-8 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-8">
                        <div className="flex items-center gap-2">
                            <h1 className="text-xl font-bold tracking-tighter uppercase italic">Velo <span className="text-[#a0a0a0] font-light">Obsidian</span></h1>
                        </div>
                        <nav className="hidden md:flex items-center gap-6 text-xs font-bold tracking-widest text-[#a0a0a0]">
                            <a className="text-[#f90606] border-b-2 border-[#f90606] pb-1" href="#">DASHBOARD</a>
                            <a className="hover:text-white transition-colors" href="#">WALLETS</a>
                            <a className="hover:text-white transition-colors" href="#">NETWORK</a>
                            <a className="hover:text-white transition-colors" href="#">PROTOCOLS</a>
                        </nav>
                    </div>
                    <div className="flex items-center gap-6">
                        <div className="text-right hidden sm:block">
                            <div className="text-[10px] font-mono text-[#a0a0a0] uppercase tracking-tighter">System Clock (UTC)</div>
                            <div className="text-sm font-mono font-bold">{new Date().toISOString().replace('T', ' ').substring(0, 19)}</div>
                        </div>
                        <div className="flex items-center gap-3 bg-white/5 p-1 rounded-full px-3">
                            <div className="w-2 h-2 rounded-full bg-[#00f3ff] shadow-[0_0_15px_rgba(0,243,255,0.3)]"></div>
                            <span className="text-[10px] font-bold tracking-widest uppercase">Node: Active</span>
                        </div>
                    </div>
                </header>

                <main className="flex-1 overflow-y-auto p-6">
                    <div className="max-w-[1600px] mx-auto grid grid-cols-12 gap-6">
                        {/* Column 1: Security Metrics */}
                        <div className="col-span-12 lg:col-span-3 space-y-6">
                            {/* Security Score Card */}
                            <div className="bg-[#121212] border border-white/10 p-6 rounded-xl relative overflow-hidden group">
                                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                                    <span className="material-icons text-6xl">security</span>
                                </div>
                                <h3 className="text-[#a0a0a0] text-[10px] font-bold tracking-widest uppercase mb-6">Security Health Score</h3>
                                <div className="relative flex items-center justify-center py-4">
                                    {/* SVG Gauge */}
                                    <svg className="w-40 h-40 transform -rotate-90">
                                        <circle className="text-white/5" cx="80" cy="80" fill="transparent" r="70" stroke="currentColor" strokeWidth="8"></circle>
                                        <circle className="text-[#00f3ff] drop-shadow-[0_0_8px_rgba(0,243,255,0.8)]" cx="80" cy="80" fill="transparent" r="70" stroke="currentColor" strokeDasharray="440" strokeDashoffset="66" strokeWidth="8"></circle>
                                    </svg>
                                    <div className="absolute flex flex-col items-center">
                                        <span className="text-4xl font-bold text-white">85</span>
                                        <span className="text-[10px] font-mono text-[#00f3ff] uppercase">Optimal</span>
                                    </div>
                                </div>
                                <div className="mt-4 grid grid-cols-2 gap-2">
                                    <div className="bg-white/5 p-2 rounded">
                                        <div className="text-[9px] text-[#a0a0a0] uppercase">Encryption</div>
                                        <div className="text-xs font-bold text-[#00f3ff]">99.9%</div>
                                    </div>
                                    <div className="bg-white/5 p-2 rounded">
                                        <div className="text-[9px] text-[#a0a0a0] uppercase">Uptime</div>
                                        <div className="text-xs font-bold text-[#00f3ff]">100%</div>
                                    </div>
                                </div>
                            </div>
                            {/* Wallet Status */}
                            <div className="bg-[#121212] border border-white/10 p-6 rounded-xl">
                                <h3 className="text-[#a0a0a0] text-[10px] font-bold tracking-widest uppercase mb-4">Protected Wallets</h3>
                                <div className="space-y-3">
                                    <div className="flex items-center justify-between p-3 border border-white/5 rounded hover:bg-white/5 transition-colors group">
                                        <div className="flex items-center gap-3">
                                            <span className="material-icons text-sm text-[#00f3ff]">account_balance_wallet</span>
                                            <div>
                                                <div className="text-xs font-bold">Main Custody</div>
                                                <div className="text-[10px] font-mono text-[#a0a0a0]">0x883...4f21</div>
                                            </div>
                                        </div>
                                        <span className="material-icons text-xs text-green-500">verified_user</span>
                                    </div>
                                    <div className="flex items-center justify-between p-3 border border-white/5 rounded hover:bg-white/5 transition-colors group">
                                        <div className="flex items-center gap-3">
                                            <span className="material-icons text-sm text-[#00f3ff]">savings</span>
                                            <div>
                                                <div className="text-xs font-bold">Cold Reserve</div>
                                                <div className="text-[10px] font-mono text-[#a0a0a0]">0x112...a90e</div>
                                            </div>
                                        </div>
                                        <span className="material-icons text-xs text-green-500">verified_user</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Column 2: Geographic Intelligence */}
                        <div className="col-span-12 lg:col-span-6 space-y-6">
                            <div className="bg-[#121212] border border-white/10 rounded-xl overflow-hidden h-full flex flex-col">
                                <div className="p-6 border-b border-white/5 flex items-center justify-between">
                                    <div>
                                        <h3 className="text-white text-sm font-bold tracking-tight">Geographic Threat Map</h3>
                                        <p className="text-[#a0a0a0] text-[10px] uppercase tracking-wider">Real-time login & transaction origin tracking</p>
                                    </div>
                                    <div className="flex gap-2">
                                        <button className="bg-white/5 p-2 rounded hover:bg-white/10 transition-all">
                                            <span className="material-icons text-sm">fullscreen</span>
                                        </button>
                                    </div>
                                </div>
                                <div className="flex-grow relative bg-[#0a0a0a]">
                                    <img
                                        className="w-full h-full object-cover opacity-40 grayscale contrast-125"
                                        alt="A dark neon world map with glowing nodes and pulse points"
                                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuD6j2HWlAoE7eeF9DVYbtj-XRn2IwCT9Cq5IQOL-0oOetyDKhKn8TxOWQEtM7PLYKICq_wreT7uV-A9nL2suSa3DnnA3piQad0dePTJGYhovRxF-b_VidaiWtFP9wysrCI9nnmBrqJLHQC7BRH6m-gBETltjULE9-_CAdaOlsI1B1emJs5_SBD9WpxIRY3AH4gNOtM_7NvlbsFRR31B-Z67cR4M1I_36jVLbGXo0mb8jHo3CVs5_TjAH5zLuXfl8Q4HMKDX3NejzsR0"
                                    />
                                    {/* Map Overlays (Pulse Points) */}
                                    <div className="absolute top-1/4 left-1/4">
                                        <div className="relative">
                                            <div className="absolute -inset-2 bg-[#ffaa00] rounded-full animate-ping opacity-40"></div>
                                            <div className="w-3 h-3 bg-[#ffaa00] rounded-full shadow-[0_0_10px_rgba(255,170,0,0.2)]"></div>
                                        </div>
                                    </div>
                                    <div className="absolute top-1/2 left-2/3">
                                        <div className="relative">
                                            <div className="absolute -inset-2 bg-[#00f3ff] rounded-full animate-ping opacity-40"></div>
                                            <div className="w-3 h-3 bg-[#00f3ff] rounded-full shadow-[0_0_15px_rgba(0,243,255,0.3)]"></div>
                                        </div>
                                    </div>
                                    <div className="absolute bottom-1/3 left-1/2">
                                        <div className="relative">
                                            <div className="absolute -inset-2 bg-[#00f3ff] rounded-full animate-ping opacity-40"></div>
                                            <div className="w-3 h-3 bg-[#00f3ff] rounded-full shadow-[0_0_15px_rgba(0,243,255,0.3)]"></div>
                                        </div>
                                    </div>
                                    {/* Legend */}
                                    <div className="absolute bottom-4 left-4 flex gap-4">
                                        <div className="flex items-center gap-2 text-[10px] bg-black/60 backdrop-blur-md px-3 py-1.5 rounded border border-white/10">
                                            <div className="w-2 h-2 rounded-full bg-[#00f3ff]"></div>
                                            <span className="font-bold tracking-widest uppercase">Authorized</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-[10px] bg-black/60 backdrop-blur-md px-3 py-1.5 rounded border border-white/10">
                                            <div className="w-2 h-2 rounded-full bg-[#ffaa00]"></div>
                                            <span className="font-bold tracking-widest uppercase">Suspicious</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Column 3: Lockdown & Quick Actions */}
                        <div className="col-span-12 lg:col-span-3 space-y-6">
                            {/* Lockdown Button */}
                            <button className="w-full bg-[#f90606] aspect-square lg:aspect-auto lg:h-64 rounded-xl flex flex-col items-center justify-center gap-4 transition-all hover:brightness-110 active:scale-95 shadow-[0_0_20px_rgba(249,6,6,0.4)] group border-4 border-[#f90606]/20">
                                <span className="material-icons text-6xl group-hover:scale-110 transition-transform">gpp_maybe</span>
                                <div className="text-center">
                                    <div className="text-xl font-black tracking-tighter uppercase italic">One-Click Lockdown</div>
                                    <div className="text-[10px] font-bold tracking-widest uppercase text-white/70">Critical Protocol 0-A</div>
                                </div>
                            </button>
                            {/* Quick Actions */}
                            <div className="bg-[#121212] border border-white/10 p-6 rounded-xl space-y-4">
                                <h3 className="text-[#a0a0a0] text-[10px] font-bold tracking-widest uppercase">Security Protocols</h3>
                                <div className="grid grid-cols-1 gap-3">
                                    <button className="flex items-center justify-between p-4 bg-white/5 rounded border border-white/5 hover:border-white/20 transition-all text-left">
                                        <div className="flex items-center gap-3">
                                            <span className="material-icons text-[#a0a0a0]">vpn_key</span>
                                            <span className="text-xs font-bold uppercase tracking-wide">Rotate API Keys</span>
                                        </div>
                                        <span className="material-icons text-xs">chevron_right</span>
                                    </button>
                                    <button className="flex items-center justify-between p-4 bg-white/5 rounded border border-white/5 hover:border-white/20 transition-all text-left">
                                        <div className="flex items-center gap-3">
                                            <span className="material-icons text-[#a0a0a0]">logout</span>
                                            <span className="text-xs font-bold uppercase tracking-wide">Force Logout All</span>
                                        </div>
                                        <span className="material-icons text-xs text-[#f90606]">chevron_right</span>
                                    </button>
                                    <button className="flex items-center justify-between p-4 bg-white/5 rounded border border-white/5 hover:border-white/20 transition-all text-left">
                                        <div className="flex items-center gap-3">
                                            <span className="material-icons text-[#a0a0a0]">history_edu</span>
                                            <span className="text-xs font-bold uppercase tracking-wide">Export Full Audit</span>
                                        </div>
                                        <span className="material-icons text-xs">download</span>
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Bottom Row: Audit Trail */}
                        <div className="col-span-12">
                            <div className="bg-[#121212] border border-white/10 rounded-xl overflow-hidden">
                                <div className="px-6 py-4 border-b border-white/5 flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <span className="material-icons text-[#a0a0a0] text-lg">list_alt</span>
                                        <h3 className="text-sm font-bold tracking-tight uppercase">Technical Audit Trail</h3>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <div className="relative">
                                            <span className="material-icons absolute left-3 top-1/2 -translate-y-1/2 text-[#a0a0a0] text-xs">search</span>
                                            <input className="bg-black/50 border-white/10 rounded-full pl-8 pr-4 py-1 text-[10px] font-mono focus:ring-[#f90606] focus:border-[#f90606] w-64 text-white placeholder:text-[#a0a0a0]" placeholder="Filter by hash, IP, or ID..." type="text" />
                                        </div>
                                        <button className="text-xs text-[#a0a0a0] hover:text-white flex items-center gap-1">
                                            <span className="material-icons text-xs">filter_list</span>
                                        </button>
                                    </div>
                                </div>
                                <div className="overflow-x-auto">
                                    {loading ? (
                                        <div className="flex items-center justify-center p-8">
                                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#00f3ff]"></div>
                                        </div>
                                    ) : logs.length === 0 ? (
                                        <div className="flex items-center justify-center p-8 text-[#a0a0a0]">
                                            No security logs found.
                                        </div>
                                    ) : (
                                        <table className="w-full text-left font-mono">
                                            <thead>
                                                <tr className="bg-black/40 text-[#a0a0a0] text-[10px] uppercase tracking-widest border-b border-white/5">
                                                    <th className="px-6 py-3 font-medium">Timestamp</th>
                                                    <th className="px-6 py-3 font-medium">Event Type</th>
                                                    <th className="px-6 py-3 font-medium">Origin IP</th>
                                                    <th className="px-6 py-3 font-medium">User Agent</th>
                                                    <th className="px-6 py-3 font-medium">Status</th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-white/5 text-[11px]">
                                                {logs.map((log) => (
                                                    <tr key={log.id} className="hover:bg-white/5 transition-colors group">
                                                        <td className="px-6 py-4 text-[#a0a0a0]">{formatDate(log.created_at)}</td>
                                                        <td className="px-6 py-4 font-bold">{log.event_type}</td>
                                                        <td className="px-6 py-4 text-[#a0a0a0]">{log.ip_address}</td>
                                                        <td className="px-6 py-4 text-[#a0a0a0] truncate max-w-xs" title={log.user_agent}>{log.user_agent}</td>
                                                        <td className="px-6 py-4">
                                                            <span className={`px-2 py-0.5 rounded-full border ${getStatusColor(log.status)} uppercase`}>
                                                                {log.status}
                                                            </span>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    )}
                                </div>
                                <div className="px-6 py-3 border-t border-white/5 bg-black/40 flex justify-between items-center text-[10px] text-[#a0a0a0]">
                                    <span>Showing {logs.length} recent events</span>
                                    <div className="flex gap-2">
                                        <button className="px-2 py-1 bg-white/5 rounded hover:bg-white/10 transition-all">PREVIOUS</button>
                                        <button className="px-2 py-1 bg-white/5 rounded hover:bg-white/10 transition-all text-white">NEXT</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default WalletSecurity;
