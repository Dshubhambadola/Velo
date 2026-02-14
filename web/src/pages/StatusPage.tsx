import React, { useState, useEffect } from 'react';
import { getSystemStatus, SystemStatus } from '../api/status';

const StatusPage: React.FC = () => {
    const [status, setStatus] = useState<SystemStatus | null>(null);
    const [loading, setLoading] = useState(true);

    const fetchStatus = async () => {
        setLoading(true);
        try {
            const data = await getSystemStatus();
            setStatus(data);
        } catch (error) {
            console.error("Failed to fetch system status", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchStatus();
        // Poll every minute
        const interval = setInterval(fetchStatus, 60000);
        return () => clearInterval(interval);
    }, []);

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'operational': return 'text-emerald-400';
            case 'degraded': return 'text-amber-400';
            case 'outage': return 'text-rose-400';
            default: return 'text-slate-400';
        }
    };

    const getStatusBg = (status: string) => {
        switch (status) {
            case 'operational': return 'bg-emerald-500';
            case 'degraded': return 'bg-amber-500';
            case 'outage': return 'bg-rose-500';
            default: return 'bg-slate-500';
        }
    };

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'operational': return 'check_circle';
            case 'degraded': return 'warning';
            case 'outage': return 'error';
            default: return 'help';
        }
    };

    return (
        <div className="min-h-screen bg-[#101622] text-white font-display">
            {/* Header */}
            <header className="border-b border-slate-800 bg-[#16202c]">
                <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                            <span className="font-bold text-white">V</span>
                        </div>
                        <span className="font-bold text-lg tracking-tight">Velo Status</span>
                    </div>
                    <a
                        href="/"
                        className="text-sm font-medium text-slate-400 hover:text-white transition-colors"
                    >
                        Go to Dashboard &rarr;
                    </a>
                </div>
            </header>

            <main className="max-w-3xl mx-auto px-6 py-12">
                {loading && !status ? (
                    <div className="text-center py-20 text-slate-500">Just a moment...</div>
                ) : !status ? (
                    <div className="text-center py-20 text-rose-500">Failed to load system status.</div>
                ) : (
                    <>
                        {/* Overall Status */}
                        <div className={`p-8 rounded-2xl border mb-12 flex flex-col items-center justify-center text-center shadow-2xl relative overflow-hidden ${status.overall_status === 'operational' ? 'bg-emerald-900/10 border-emerald-500/20 shadow-emerald-900/20' :
                            status.overall_status === 'degraded' ? 'bg-amber-900/10 border-amber-500/20 shadow-amber-900/20' :
                                'bg-rose-900/10 border-rose-500/20 shadow-rose-900/20'
                            }`}>
                            {/* Background Glow */}
                            <div className={`absolute top-0 w-full h-1/2 opacity-20 blur-[60px] ${getStatusBg(status.overall_status)}`}></div>

                            <span className={`material-icons text-6xl mb-4 relative z-10 ${getStatusColor(status.overall_status)}`}>
                                {getStatusIcon(status.overall_status)}
                            </span>
                            <h1 className="text-3xl font-bold text-white relative z-10">
                                {status.overall_status === 'operational' ? 'All Systems Operational' :
                                    status.overall_status === 'degraded' ? 'Partial System Degradation' :
                                        'Major System Outage'}
                            </h1>
                            <p className="text-slate-400 mt-2 relative z-10">
                                Last updated: {new Date(status.updated_at).toLocaleString()}
                            </p>
                        </div>

                        {/* Components List */}
                        <div className="space-y-4">
                            <h2 className="text-xl font-bold text-white mb-6">System Components</h2>

                            {status.components.map((comp, idx) => (
                                <div key={idx} className="bg-[#16202c] border border-slate-700 rounded-xl p-5 flex items-center justify-between hover:border-slate-600 transition-colors">
                                    <div className="flex items-center gap-4">
                                        <div className={`w-2 h-2 rounded-full shadow-[0_0_8px] ${getStatusBg(comp.status)} ${comp.status === 'operational' ? 'shadow-emerald-500' :
                                            comp.status === 'degraded' ? 'shadow-amber-500' : 'shadow-rose-500'
                                            }`}></div>
                                        <div>
                                            <h3 className="font-semibold text-white">{comp.name}</h3>
                                            <p className="text-xs text-slate-500 mt-0.5">Latency: {comp.latency_ms}ms</p>
                                        </div>
                                    </div>
                                    <span className={`text-sm font-bold uppercase tracking-wider ${getStatusColor(comp.status)}`}>
                                        {comp.status}
                                    </span>
                                </div>
                            ))}
                        </div>

                        {/* Past Incidents (Static/Mock for now) */}
                        <div className="mt-16">
                            <h2 className="text-xl font-bold text-white mb-6">Past Incidents</h2>
                            <div className="space-y-8 relative">
                                <div className="absolute left-3 top-2 bottom-2 w-px bg-slate-800"></div>

                                <div className="relative pl-10">
                                    <div className="absolute left-1.5 top-2 w-3 h-3 rounded-full bg-slate-700 border-2 border-[#101622]"></div>
                                    <h3 className="font-bold text-white">No incidents reported today.</h3>
                                    <p className="text-sm text-slate-500 mt-1">{new Date().toLocaleDateString()}</p>
                                </div>

                                <div className="relative pl-10">
                                    <div className="absolute left-1.5 top-2 w-3 h-3 rounded-full bg-amber-500 border-2 border-[#101622]"></div>
                                    <h3 className="font-bold text-white">API High Latency</h3>
                                    <div className="text-sm text-slate-400 mt-2 space-y-2">
                                        <p><strong className="text-emerald-400">Resolved</strong> - The issue with API latency has been resolved. Systems are operating normally.</p>
                                        <p><strong className="text-amber-400">Monitoring</strong> - We are observing high latency on the USDC bridge endpoint. Engineers are investigating.</p>
                                    </div>
                                    <p className="text-sm text-slate-500 mt-3">Oct 29, 2023</p>
                                </div>
                            </div>
                        </div>
                    </>
                )}
            </main>

            <footer className="border-t border-slate-800 py-8 mt-12 text-center">
                <p className="text-slate-500 text-sm">&copy; {new Date().getFullYear()} Velo Financial Technologies. All rights reserved.</p>
                <div className="flex justify-center gap-6 mt-4 text-sm font-medium text-slate-400">
                    <button onClick={() => alert("Support portal opening...")} className="hover:text-white bg-transparent border-none cursor-pointer">Support</button>
                    <button onClick={() => alert("API Docs opening...")} className="hover:text-white bg-transparent border-none cursor-pointer">API Utils</button>
                    <button onClick={() => alert("Incident report form...")} className="hover:text-white bg-transparent border-none cursor-pointer">Report Incident</button>
                </div>
            </footer>
        </div>
    );
};

export default StatusPage;
