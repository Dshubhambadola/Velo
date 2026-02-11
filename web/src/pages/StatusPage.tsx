import React from 'react';

const StatusPage: React.FC = () => {
    return (
        <div className="bg-black text-white font-mono-space min-h-screen selection:bg-[#0df20d]/30 selection:text-[#0df20d]">
            {/* Navigation Header */}
            <nav className="border-b border-[#0df20d]/20 bg-black/80 backdrop-blur-md sticky top-0 z-50">
                <div className="max-w-[1600px] mx-auto px-6 h-16 flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                        <div className="w-8 h-8 bg-[#0df20d]/10 rounded-lg flex items-center justify-center border border-[#0df20d]/40">
                            <span className="material-icons text-[#0df20d] text-xl">security</span>
                        </div>
                        <h1 className="text-xl font-bold tracking-tighter">VELO <span className="text-[#0df20d]">STATUS</span> SYSTEM</h1>
                    </div>
                    <div className="flex items-center space-x-6 text-sm">
                        <div className="flex items-center space-x-2">
                            <span className="w-2 h-2 rounded-full bg-[#0df20d] animate-pulse shadow-[0_0_4px_#0df20d]"></span>
                            <span className="text-neutral-400 uppercase tracking-widest text-[10px] font-bold">Live Monitoring Active</span>
                        </div>
                        <div className="text-neutral-400 font-mono">2023-10-24 14:42:01 UTC</div>
                        <div className="flex items-center space-x-2 border-l border-white/10 pl-6">
                            <button className="p-2 hover:bg-[#0df20d]/10 rounded transition-colors text-neutral-400 hover:text-[#0df20d]">
                                <span className="material-icons text-sm">refresh</span>
                            </button>
                            <button className="p-2 hover:bg-[#0df20d]/10 rounded transition-colors text-neutral-400 hover:text-[#0df20d]">
                                <span className="material-icons text-sm">settings</span>
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            <main className="max-w-[1600px] mx-auto px-6 py-8">
                {/* Top Banner: System Condition */}
                <div className="mb-8 p-6 rounded-xl bg-[#121212] border-l-4 border-[#0df20d] shadow-[0_0_15px_rgba(13,242,13,0.1),inset_0_0_10px_rgba(13,242,13,0.05)] flex items-center justify-between">
                    <div className="flex items-center space-x-6">
                        <div className="bg-[#0df20d]/20 p-4 rounded-full">
                            <span className="material-icons text-[#0df20d] text-3xl shadow-[0_0_4px_#0df20d]">check_circle</span>
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold text-white">All Systems Operational</h2>
                            <p className="text-neutral-400 mt-1">System health is optimal. No active incidents reported in the last 24 hours.</p>
                        </div>
                    </div>
                    <div className="flex items-center space-x-4">
                        <div className="text-right">
                            <p className="text-xs text-neutral-400 uppercase font-bold tracking-widest">Global Latency</p>
                            <p className="text-xl font-bold text-[#0df20d] font-mono">14ms</p>
                        </div>
                        <div className="h-10 w-[1px] bg-white/10"></div>
                        <div className="text-right">
                            <p className="text-xs text-neutral-400 uppercase font-bold tracking-widest">Uptime</p>
                            <p className="text-xl font-bold text-[#0df20d] font-mono">99.998%</p>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-12 gap-8">
                    {/* Left Column: Core Gauges & Service Grid */}
                    <div className="col-span-12 lg:col-span-8 space-y-8">
                        {/* Metrics Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {/* Health Gauge */}
                            <div className="bg-[#121212] p-6 rounded-xl border border-white/5 flex flex-col items-center justify-center space-y-4">
                                <p className="text-neutral-400 text-xs font-bold uppercase tracking-widest">System Health Score</p>
                                <div className="relative w-32 h-32 flex items-center justify-center">
                                    <div className="absolute inset-0 rounded-full border-4 border-white/5"></div>
                                    <div className="absolute inset-0 rounded-full border-4 border-[#0df20d] opacity-20" style={{ background: 'conic-gradient(from 180deg at 50% 50%, #0df20d 0deg, #0df20d 320deg, transparent 320deg)' }}></div>
                                    <div className="absolute inset-0 rounded-full border-4 border-[#0df20d] border-t-transparent border-l-transparent rotate-[45deg] shadow-[0_0_15px_rgba(13,242,13,0.4)]"></div>
                                    <div className="text-center">
                                        <span className="text-4xl font-bold text-white">98</span>
                                        <span className="text-xs text-neutral-400 block">OPTIMAL</span>
                                    </div>
                                </div>
                            </div>

                            {/* Uptime Stats */}
                            <div className="bg-[#121212] p-6 rounded-xl border border-white/5 flex flex-col justify-between">
                                <p className="text-neutral-400 text-xs font-bold uppercase tracking-widest mb-4">Uptime (30d)</p>
                                <div className="space-y-4">
                                    <div className="h-8 w-full flex items-end space-x-1">
                                        {/* Mock Uptime Bars */}
                                        <div className="flex-1 bg-[#0df20d] h-4 rounded-sm opacity-60"></div>
                                        <div className="flex-1 bg-[#0df20d] h-6 rounded-sm"></div>
                                        <div className="flex-1 bg-[#0df20d] h-5 rounded-sm opacity-80"></div>
                                        <div className="flex-1 bg-[#0df20d] h-8 rounded-sm"></div>
                                        <div className="flex-1 bg-[#0df20d] h-7 rounded-sm opacity-70"></div>
                                        <div className="flex-1 bg-[#0df20d] h-8 rounded-sm"></div>
                                        <div className="flex-1 bg-[#0df20d] h-6 rounded-sm opacity-90"></div>
                                        <div className="flex-1 bg-[#0df20d] h-8 rounded-sm"></div>
                                        <div className="flex-1 bg-[#0df20d] h-7 rounded-sm opacity-80"></div>
                                        <div className="flex-1 bg-[#0df20d] h-8 rounded-sm"></div>
                                        <div className="flex-1 bg-[#0df20d] h-4 rounded-sm opacity-60"></div>
                                        <div className="flex-1 bg-[#0df20d] h-6 rounded-sm"></div>
                                    </div>
                                    <div className="flex justify-between text-[10px] text-neutral-400 font-mono">
                                        <span>30 DAYS AGO</span>
                                        <span>TODAY</span>
                                    </div>
                                </div>
                            </div>

                            {/* Requests Card */}
                            <div className="bg-[#121212] p-6 rounded-xl border border-white/5 flex flex-col justify-between">
                                <p className="text-neutral-400 text-xs font-bold uppercase tracking-widest mb-2">Requests / Sec</p>
                                <div className="flex items-baseline space-x-2">
                                    <span className="text-4xl font-bold text-white font-mono">12.4k</span>
                                    <span className="text-[#0df20d] text-xs flex items-center"><span className="material-icons text-xs">arrow_upward</span> 4%</span>
                                </div>
                                <div className="mt-4 p-2 bg-black rounded border border-white/5 text-[10px] font-mono text-neutral-400">
                                    PEAK: 15.2k (08:45 UTC)
                                </div>
                            </div>
                        </div>

                        {/* Service Grid */}
                        <div>
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-xl font-bold flex items-center space-x-2">
                                    <span className="material-icons text-[#0df20d]/60">grid_view</span>
                                    <span>Service Infrastructure</span>
                                </h3>
                                <div className="flex space-x-2">
                                    <span className="px-2 py-1 bg-white/5 rounded text-[10px] text-neutral-400 border border-white/10 uppercase">Total Services: 18</span>
                                </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {/* Service Item 1 */}
                                <div className="bg-[#121212] p-4 rounded-lg border border-white/5 hover:border-[#0df20d]/30 transition-all flex items-center justify-between group">
                                    <div className="flex items-center space-x-4">
                                        <div className="w-10 h-10 rounded bg-black flex items-center justify-center border border-white/5 group-hover:border-[#0df20d]/40">
                                            <span className="material-icons text-neutral-400 group-hover:text-[#0df20d] text-xl">dns</span>
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-white text-sm">API Gateway Central</h4>
                                            <p className="text-xs text-neutral-400">Cluster-01 / Load Balancer</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center space-x-3">
                                        <span className="text-[10px] font-mono text-[#0df20d]/60">12ms</span>
                                        <div className="w-2.5 h-2.5 rounded-full bg-[#0df20d] shadow-[0_0_4px_#0df20d]"></div>
                                    </div>
                                </div>
                                {/* Service Item 2 */}
                                <div className="bg-[#121212] p-4 rounded-lg border border-white/5 hover:border-[#0df20d]/30 transition-all flex items-center justify-between group">
                                    <div className="flex items-center space-x-4">
                                        <div className="w-10 h-10 rounded bg-black flex items-center justify-center border border-white/5 group-hover:border-[#0df20d]/40">
                                            <span className="material-icons text-neutral-400 group-hover:text-[#0df20d] text-xl">storage</span>
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-white text-sm">Redis Cache Layer</h4>
                                            <p className="text-xs text-neutral-400">Global / In-Memory</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center space-x-3">
                                        <span className="text-[10px] font-mono text-[#0df20d]/60">1ms</span>
                                        <div className="w-2.5 h-2.5 rounded-full bg-[#0df20d] shadow-[0_0_4px_#0df20d]"></div>
                                    </div>
                                </div>
                                {/* Service Item 3 */}
                                <div className="bg-[#121212] p-4 rounded-lg border border-white/5 hover:border-[#0df20d]/30 transition-all flex items-center justify-between group">
                                    <div className="flex items-center space-x-4">
                                        <div className="w-10 h-10 rounded bg-black flex items-center justify-center border border-white/5 group-hover:border-[#0df20d]/40">
                                            <span className="material-icons text-neutral-400 group-hover:text-[#0df20d] text-xl">public</span>
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-white text-sm">CDN Edge Nodes</h4>
                                            <p className="text-xs text-neutral-400">14 Regions / Active</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center space-x-3">
                                        <span className="text-[10px] font-mono text-[#0df20d]/60">24ms</span>
                                        <div className="w-2.5 h-2.5 rounded-full bg-[#0df20d] shadow-[0_0_4px_#0df20d]"></div>
                                    </div>
                                </div>
                                {/* Service Item 4 */}
                                <div className="bg-[#121212] p-4 rounded-lg border border-white/5 hover:border-yellow-500/30 transition-all flex items-center justify-between group">
                                    <div className="flex items-center space-x-4">
                                        <div className="w-10 h-10 rounded bg-black flex items-center justify-center border border-white/5 group-hover:border-yellow-500/40">
                                            <span className="material-icons text-neutral-400 group-hover:text-yellow-500 text-xl">hub</span>
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-white text-sm">Websocket Hub</h4>
                                            <p className="text-xs text-neutral-400">Socket.io / Maintenance</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center space-x-3">
                                        <span className="text-[10px] font-mono text-yellow-500/60">105ms</span>
                                        <div className="w-2.5 h-2.5 rounded-full bg-yellow-500 shadow-[0_0_8px_rgba(234,179,8,0.4)]"></div>
                                    </div>
                                </div>
                                {/* Service Item 5 */}
                                <div className="bg-[#121212] p-4 rounded-lg border border-white/5 hover:border-[#0df20d]/30 transition-all flex items-center justify-between group">
                                    <div className="flex items-center space-x-4">
                                        <div className="w-10 h-10 rounded bg-black flex items-center justify-center border border-white/5 group-hover:border-[#0df20d]/40">
                                            <span className="material-icons text-neutral-400 group-hover:text-[#0df20d] text-xl">security</span>
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-white text-sm">Auth AuthZ Service</h4>
                                            <p className="text-xs text-neutral-400">OAuth2.0 / Secure</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center space-x-3">
                                        <span className="text-[10px] font-mono text-[#0df20d]/60">42ms</span>
                                        <div className="w-2.5 h-2.5 rounded-full bg-[#0df20d] shadow-[0_0_4px_#0df20d]"></div>
                                    </div>
                                </div>
                                {/* Service Item 6 */}
                                <div className="bg-[#121212] p-4 rounded-lg border border-white/5 hover:border-[#0df20d]/30 transition-all flex items-center justify-between group">
                                    <div className="flex items-center space-x-4">
                                        <div className="w-10 h-10 rounded bg-black flex items-center justify-center border border-white/5 group-hover:border-[#0df20d]/40">
                                            <span className="material-icons text-neutral-400 group-hover:text-[#0df20d] text-xl">database</span>
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-white text-sm">Primary DB Cluster</h4>
                                            <p className="text-xs text-neutral-400">PostgreSQL / Synchronized</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center space-x-3">
                                        <span className="text-[10px] font-mono text-[#0df20d]/60">8ms</span>
                                        <div className="w-2.5 h-2.5 rounded-full bg-[#0df20d] shadow-[0_0_4px_#0df20d]"></div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Live Console */}
                        <div className="bg-black border border-white/10 rounded-xl overflow-hidden">
                            <div className="bg-[#121212] px-4 py-2 border-b border-white/5 flex items-center justify-between">
                                <div className="flex items-center space-x-2">
                                    <div className="flex space-x-1.5">
                                        <div className="w-2.5 h-2.5 rounded-full bg-red-500/40"></div>
                                        <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/40"></div>
                                        <div className="w-2.5 h-2.5 rounded-full bg-green-500/40"></div>
                                    </div>
                                    <span className="text-[10px] font-mono text-neutral-400 uppercase ml-4 tracking-widest font-bold">Live System Pings</span>
                                </div>
                                <span className="text-[10px] font-mono text-[#0df20d]">STREAMING...</span>
                            </div>
                            <div className="p-4 font-mono text-xs text-neutral-400 h-40 overflow-y-auto custom-scrollbar space-y-1">
                                <p className="text-[#0df20d]/70">[14:41:55] <span className="text-white">INFO:</span> Authentication handshake successful - node_id: 8192</p>
                                <p>[14:41:56] <span className="text-white">PING:</span> edge-tokyo-04 latency: 28ms</p>
                                <p>[14:41:57] <span className="text-white">PING:</span> edge-london-02 latency: 12ms</p>
                                <p className="text-yellow-500/70">[14:41:58] <span className="text-white">WARN:</span> Websocket high payload detected - pool_b</p>
                                <p>[14:41:59] <span className="text-white">INFO:</span> Cron job 'daily_cleanup' scheduled for 00:00 UTC</p>
                                <p>[14:42:00] <span className="text-white">PING:</span> db-replica-01 lag: 0.002s</p>
                                <p className="text-[#0df20d]/70">[14:42:01] <span className="text-white">INFO:</span> System heartbeat packet broadcasted</p>
                                <p className="animate-pulse">_</p>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Sidebar Metadata & Feed */}
                    <div className="col-span-12 lg:col-span-4 space-y-8">
                        {/* Action Buttons */}
                        <div className="grid grid-cols-2 gap-4">
                            <button className="bg-[#0df20d] text-black font-bold py-3 rounded-lg flex items-center justify-center space-x-2 hover:bg-[#0df20d]/90 transition-all">
                                <span className="material-icons text-sm">download</span>
                                <span>EXPORT LOGS</span>
                            </button>
                            <button className="bg-black border border-[#0df20d] text-[#0df20d] font-bold py-3 rounded-lg flex items-center justify-center space-x-2 hover:bg-[#0df20d]/10 transition-all">
                                <span className="material-icons text-sm">restart_alt</span>
                                <span>SYSTEM RESET</span>
                            </button>
                        </div>

                        {/* Recent Events */}
                        <div className="bg-[#121212] rounded-xl border border-white/5 p-6">
                            <h3 className="text-lg font-bold mb-6 flex items-center space-x-2">
                                <span className="material-icons text-[#0df20d]/60">history</span>
                                <span>Event History</span>
                            </h3>
                            <div className="space-y-6">
                                {/* Event 1 */}
                                <div className="relative pl-6 border-l border-white/10 pb-6 last:pb-0">
                                    <div className="absolute -left-[5px] top-0 w-2.5 h-2.5 rounded-full bg-[#0df20d] shadow-[0_0_4px_#0df20d]"></div>
                                    <p className="text-[10px] text-neutral-400 font-mono uppercase font-bold mb-1">Oct 24, 12:30 UTC</p>
                                    <h4 className="text-sm font-bold text-white">Full Backup Completed</h4>
                                    <p className="text-xs text-neutral-400 mt-1">Incremental backup of S3 bucket 'assets' finished successfully. (4.2 GB)</p>
                                </div>
                                {/* Event 2 */}
                                <div className="relative pl-6 border-l border-white/10 pb-6 last:pb-0">
                                    <div className="absolute -left-[5px] top-0 w-2.5 h-2.5 rounded-full bg-yellow-500 shadow-[0_0_8px_rgba(234,179,8,0.4)]"></div>
                                    <p className="text-[10px] text-neutral-400 font-mono uppercase font-bold mb-1">Oct 24, 09:15 UTC</p>
                                    <h4 className="text-sm font-bold text-white">Minor Degradation: Websockets</h4>
                                    <p className="text-xs text-neutral-400 mt-1">Investigating increased latency in EMEA region. Service resumed shortly after rerouting.</p>
                                </div>
                                {/* Event 3 */}
                                <div className="relative pl-6 border-l border-white/10 pb-6 last:pb-0">
                                    <div className="absolute -left-[5px] top-0 w-2.5 h-2.5 rounded-full bg-[#0df20d] shadow-[0_0_4px_#0df20d]"></div>
                                    <p className="text-[10px] text-neutral-400 font-mono uppercase font-bold mb-1">Oct 23, 22:00 UTC</p>
                                    <h4 className="text-sm font-bold text-white">Security Patch v4.2.1 Applied</h4>
                                    <p className="text-xs text-neutral-400 mt-1">Automatic rolling update deployed to all containers without downtime.</p>
                                </div>
                            </div>
                        </div>

                        {/* System Metadata */}
                        <div className="bg-[#121212] rounded-xl border border-white/5 overflow-hidden">
                            <div className="p-4 bg-white/5 border-b border-white/5">
                                <p className="text-xs text-neutral-400 font-bold uppercase tracking-widest">Server Specification</p>
                            </div>
                            <div className="p-6 space-y-4">
                                <div className="flex justify-between items-center text-sm">
                                    <span className="text-neutral-400">Kernel Version</span>
                                    <span className="font-mono text-white">v6.4.12-velo-secure</span>
                                </div>
                                <div className="flex justify-between items-center text-sm">
                                    <span className="text-neutral-400">Region</span>
                                    <span className="font-mono text-white">US-EAST-1 (Virginia)</span>
                                </div>
                                <div className="flex justify-between items-center text-sm">
                                    <span className="text-neutral-400">CPU Usage</span>
                                    <div className="flex items-center space-x-3 w-1/2">
                                        <div className="h-1 flex-1 bg-white/10 rounded-full overflow-hidden">
                                            <div className="h-full bg-[#0df20d] w-[42%]"></div>
                                        </div>
                                        <span className="font-mono text-white text-xs">42%</span>
                                    </div>
                                </div>
                                <div className="flex justify-between items-center text-sm">
                                    <span className="text-neutral-400">Memory</span>
                                    <div className="flex items-center space-x-3 w-1/2">
                                        <div className="h-1 flex-1 bg-white/10 rounded-full overflow-hidden">
                                            <div className="h-full bg-[#0df20d] w-[68%]"></div>
                                        </div>
                                        <span className="font-mono text-white text-xs">68%</span>
                                    </div>
                                </div>
                                <div className="flex justify-between items-center text-sm">
                                    <span className="text-neutral-400">SSL Status</span>
                                    <span className="text-[#0df20d] flex items-center text-xs">
                                        <span className="material-icons text-[14px] mr-1">verified</span>
                                        VALID (Exp. 240d)
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Deployment Map Visualization (Abstract) */}
                        <div className="rounded-xl overflow-hidden bg-[#121212] border border-white/5 aspect-video relative group">
                            <img
                                className="w-full h-full object-cover opacity-20 grayscale group-hover:grayscale-0 transition-all duration-700"
                                alt="High tech abstract world map with glowing dots"
                                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBaLxC0E0GxtnpTK0IgwsiDwK1H4mWfg0T-koipl0nxiejEowlCqacxRFk4EwjRzLC92Lfe6c6uNmavoVzEMKbLueTdftkKmQLPsz840XNcH7v8ZMdEm88hMU8s3Kikr_YktWU3PAihQxd6mt0zVuRvNx8cNPWv9R-_zWUW50nv15li7Z1W1wyN4FDj8qq_Qu6WLaMphlwl8uAG8WnQRMs5KQkK2-sYK1JxOh4NXznSLVAeoW9Uv52SVsQZeJ7pQU-BUbRSjgR5eD0H"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>
                            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                                <p className="text-[10px] text-neutral-400 font-bold uppercase tracking-widest">Global Node Map</p>
                                <span className="text-[10px] text-[#0df20d] font-mono px-2 py-0.5 bg-[#0df20d]/20 rounded border border-[#0df20d]/30">14 NODES ACTIVE</span>
                            </div>
                            {/* Mock map markers */}
                            <div className="absolute top-1/2 left-1/3 w-2 h-2 bg-[#0df20d] rounded-full animate-pulse shadow-[0_0_4px_#0df20d]"></div>
                            <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-[#0df20d] rounded-full animate-pulse shadow-[0_0_4px_#0df20d]"></div>
                            <div className="absolute top-1/3 right-1/4 w-2 h-2 bg-[#0df20d] rounded-full animate-pulse shadow-[0_0_4px_#0df20d]"></div>
                            <div className="absolute bottom-1/4 left-1/2 w-2 h-2 bg-[#0df20d] rounded-full animate-pulse shadow-[0_0_4px_#0df20d]"></div>
                        </div>
                    </div>
                </div>
            </main>

            {/* Footer Stats Overlay */}
            <footer className="fixed bottom-0 left-0 right-0 bg-black/90 backdrop-blur-md border-t border-white/10 z-50 py-3 px-6">
                <div className="max-w-[1600px] mx-auto flex items-center justify-between text-[10px] font-mono tracking-widest uppercase text-neutral-400">
                    <div className="flex space-x-8">
                        <div className="flex items-center">
                            <span className="text-[#0df20d] mr-2">●</span> SYSTEM_READY
                        </div>
                        <div className="flex items-center">
                            <span className="text-white/20 mr-2">|</span> ENCRYPTION_TLS_1.3
                        </div>
                        <div className="flex items-center">
                            <span className="text-white/20 mr-2">|</span> FIREWALL_STATE: ACTIVE
                        </div>
                    </div>
                    <div className="flex items-center space-x-6">
                        <span>TX: 124.5 GB/s</span>
                        <span>RX: 89.2 GB/s</span>
                        <span className="text-[#0df20d]">SECURE SESSION</span>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default StatusPage;
