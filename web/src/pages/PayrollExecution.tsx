import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const PayrollExecution: React.FC = () => {
    const navigate = useNavigate();
    const [progress, setProgress] = useState(0);
    const [processedItems, setProcessedItems] = useState(0);
    const totalItems = 600;

    // Simulate progress
    useEffect(() => {
        const interval = setInterval(() => {
            setProcessedItems(prev => {
                const next = prev + 5;
                if (next >= totalItems) {
                    clearInterval(interval);
                    setTimeout(() => navigate('/payroll/success'), 1000); // Navigate to success after completion
                    return totalItems;
                }
                return next;
            });
        }, 100);

        return () => clearInterval(interval);
    }, [navigate]);

    useEffect(() => {
        setProgress((processedItems / totalItems) * 100);
    }, [processedItems]);

    return (
        <div className="bg-background-dark font-display text-slate-300 antialiased min-h-screen flex flex-col">
            {/* Top Navigation Bar */}
            <nav className="sticky top-0 z-50 border-b border-white/5 bg-background-dark/80 backdrop-blur-md px-6 py-3 flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <div className="bg-primary p-1.5 rounded-lg shadow-[0_0_15px_2px_rgba(19,70,236,0.4)]">
                        <span className="material-icons text-white text-xl">account_balance_wallet</span>
                    </div>
                    <div>
                        <h1 className="text-white font-bold text-lg tracking-tight">VELO <span className="text-primary font-medium">B2B</span></h1>
                        <p className="text-[10px] text-slate-500 uppercase tracking-widest font-semibold">Core Fintech Engine</p>
                    </div>
                </div>
                <div className="flex items-center gap-6">
                    <div className="flex items-center gap-2 px-3 py-1.5 bg-green-500/10 border border-green-500/20 rounded-full">
                        <span className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,1)] animate-pulse"></span>
                        <span className="text-xs font-mono text-green-400">HSM VERIFIED • ENCRYPTED TUNNEL</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <button className="text-slate-400 hover:text-white transition-colors">
                            <span className="material-icons">notifications</span>
                        </button>
                        <div className="w-8 h-8 rounded-full border border-white/10 overflow-hidden">
                            <div className="w-full h-full bg-primary/20 flex items-center justify-center text-xs font-bold text-white">OP</div>
                        </div>
                    </div>
                </div>
            </nav>

            <main className="max-w-[1600px] mx-auto p-8 grid grid-cols-12 gap-8 flex-1 w-full">
                {/* Left Section: Progress & Summary */}
                <div className="col-span-12 lg:col-span-8 flex flex-col gap-8">
                    {/* Header Metadata */}
                    <div className="flex justify-between items-end">
                        <div>
                            <div className="flex items-center gap-3 text-slate-400 text-sm mb-1 uppercase tracking-wider font-semibold">
                                <span>Batch ID: BTCH-992-XRAY</span>
                                <span className="w-1 h-1 bg-slate-700 rounded-full"></span>
                                <span>Settlement Window: Q4-24</span>
                            </div>
                            <h2 className="text-3xl font-bold text-white tracking-tight">Batch Execution Progress</h2>
                        </div>
                        <div className="flex gap-3">
                            <button className="px-4 py-2 border border-white/10 hover:bg-white/5 rounded-lg text-sm font-medium transition-all">
                                Security Override
                            </button>
                            <button className="px-4 py-2 bg-primary hover:bg-primary/80 text-white rounded-lg text-sm font-medium shadow-[0_0_15px_2px_rgba(19,70,236,0.4)] transition-all flex items-center gap-2">
                                <span className="material-icons text-sm">pause</span> Pause Batch
                            </button>
                        </div>
                    </div>

                    {/* Execution Hub Card */}
                    <div className="bg-surface/80 backdrop-blur-md border border-white/5 rounded-xl p-10 flex flex-col items-center justify-center relative overflow-hidden">
                        {/* Background decorative elements */}
                        <div className="absolute -top-24 -right-24 w-64 h-64 bg-primary/10 rounded-full blur-[100px]"></div>
                        <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-primary/10 rounded-full blur-[100px]"></div>

                        <div className="relative w-72 h-72">
                            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                                {/* Background Circle */}
                                <circle className="text-white/5 stroke-current" cx="50" cy="50" fill="transparent" r="42" strokeWidth="6"></circle>
                                {/* Progress Circle */}
                                <circle
                                    className="text-primary stroke-current transition-all duration-300 ease-linear"
                                    cx="50"
                                    cy="50"
                                    fill="transparent"
                                    r="42"
                                    strokeDasharray="264"
                                    strokeDashoffset={264 - (264 * progress) / 100}
                                    strokeLinecap="round"
                                    strokeWidth="6"
                                ></circle>
                            </svg>
                            <div className="absolute inset-0 flex flex-col items-center justify-center">
                                <span className="text-5xl font-bold text-white drop-shadow-[0_0_10px_rgba(19,70,236,0.6)]">{Math.round(progress)}%</span>
                                <span className="text-xs text-slate-500 font-semibold tracking-widest mt-1 uppercase">Processed</span>
                            </div>
                        </div>

                        <div className="grid grid-cols-3 gap-12 mt-12 w-full max-w-2xl border-t border-white/5 pt-8">
                            <div className="text-center">
                                <p className="text-xs text-slate-500 uppercase tracking-widest mb-1">Total Volume</p>
                                <p className="text-2xl font-bold text-white">$12,450,000.00</p>
                            </div>
                            <div className="text-center">
                                <p className="text-xs text-slate-500 uppercase tracking-widest mb-1">Items Processed</p>
                                <p className="text-2xl font-bold text-white">{processedItems} / {totalItems}</p>
                            </div>
                            <div className="text-center">
                                <p className="text-xs text-slate-500 uppercase tracking-widest mb-1">Est. Completion</p>
                                <p className="text-2xl font-bold text-white">04:12 <span className="text-sm font-normal text-slate-500">min</span></p>
                            </div>
                        </div>
                    </div>

                    {/* Payment Execution Cards List */}
                    <div className="flex flex-col gap-4">
                        <div className="flex items-center justify-between px-2">
                            <h3 className="text-white font-semibold">Live Transaction Feed</h3>
                            <div className="flex items-center gap-4 text-xs">
                                <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-green-500"></span> Success</span>
                                <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-primary"></span> Processing</span>
                                <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-red-500"></span> Failed</span>
                            </div>
                        </div>
                        {/* Card 1 */}
                        <div className="bg-surface hover:bg-surface-accent border-l-4 border-green-500 p-4 rounded-lg flex items-center justify-between transition-colors shadow-[0_0_10px_1px_rgba(34,197,94,0.1)]">
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded bg-green-500/10 flex items-center justify-center">
                                    <span className="material-icons text-green-500">check_circle</span>
                                </div>
                                <div>
                                    <p className="text-white font-medium">TXN_22904_S34</p>
                                    <p className="text-xs text-slate-500 font-mono">HASH: 0x44a2...f331</p>
                                </div>
                            </div>
                            <div className="text-right">
                                <p className="text-white font-bold">$142,500.00</p>
                                <span className="text-[10px] bg-green-500/20 text-green-400 px-2 py-0.5 rounded uppercase font-bold tracking-wider">Settled</span>
                            </div>
                        </div>
                        {/* Card 2 */}
                        <div className="bg-surface hover:bg-surface-accent border-l-4 border-primary p-4 rounded-lg flex items-center justify-between transition-colors shadow-[0_0_15px_2px_rgba(19,70,236,0.1)]">
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded bg-primary/10 flex items-center justify-center">
                                    <span className="material-icons text-primary animate-pulse">sync</span>
                                </div>
                                <div>
                                    <p className="text-white font-medium">TXN_22905_S34</p>
                                    <p className="text-xs text-slate-500 font-mono">HASH: 0x11b9...a22c</p>
                                </div>
                            </div>
                            <div className="text-right">
                                <p className="text-white font-bold">$12,000.00</p>
                                <span className="text-[10px] bg-primary/20 text-primary px-2 py-0.5 rounded uppercase font-bold tracking-wider">Authorizing</span>
                            </div>
                        </div>
                        {/* Card 3 */}
                        <div className="bg-surface hover:bg-surface-accent border-l-4 border-red-500 p-4 rounded-lg flex items-center justify-between transition-colors shadow-[0_0_10px_1px_rgba(239,68,68,0.1)]">
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded bg-red-500/10 flex items-center justify-center">
                                    <span className="material-icons text-red-500">error_outline</span>
                                </div>
                                <div>
                                    <p className="text-white font-medium">TXN_22906_S34</p>
                                    <p className="text-xs text-slate-500 font-mono">HASH: 0x92f1...884e</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-6">
                                <div className="text-right">
                                    <p className="text-white font-bold">$842.10</p>
                                    <span className="text-[10px] bg-red-500/20 text-red-400 px-2 py-0.5 rounded uppercase font-bold tracking-wider">Failed</span>
                                </div>
                                <button className="bg-white/5 hover:bg-white/10 p-2 rounded text-xs text-white uppercase font-bold border border-white/5">Retry</button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Section: Logs & Security */}
                <div className="col-span-12 lg:col-span-4 flex flex-col gap-8">
                    {/* Timeline / Execution Flow */}
                    <div className="bg-surface/80 backdrop-blur-md border border-white/5 rounded-xl p-6">
                        <h3 className="text-white font-semibold mb-6 flex items-center gap-2">
                            <span className="material-icons text-primary text-sm">hub</span> Execution Flow
                        </h3>
                        <div className="flex flex-col gap-6 relative">
                            <div className="absolute left-3 top-2 bottom-2 w-px bg-white/10"></div>
                            <div className="flex items-center gap-4 relative z-10">
                                <div className="w-6 h-6 rounded-full bg-green-500 border-4 border-background-dark shadow-[0_0_10px_1px_rgba(34,197,94,0.3)]"></div>
                                <div className="flex-1">
                                    <p className="text-sm font-medium text-white">Validation</p>
                                    <p className="text-xs text-slate-500">Integrity check completed at 14:22:01</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4 relative z-10">
                                <div className="w-6 h-6 rounded-full bg-green-500 border-4 border-background-dark shadow-[0_0_10px_1px_rgba(34,197,94,0.3)]"></div>
                                <div className="flex-1">
                                    <p className="text-sm font-medium text-white">Authorization</p>
                                    <p className="text-xs text-slate-500">Banking node response: 200 OK</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4 relative z-10">
                                <div className="w-6 h-6 rounded-full bg-primary border-4 border-background-dark shadow-[0_0_15px_2px_rgba(19,70,236,0.4)] animate-pulse"></div>
                                <div className="flex-1">
                                    <p className="text-sm font-medium text-white">Settlement</p>
                                    <p className="text-xs text-primary font-medium italic">Pending confirmation from 4/6 shards...</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4 relative z-10 opacity-30">
                                <div className="w-6 h-6 rounded-full bg-slate-700 border-4 border-background-dark"></div>
                                <div className="flex-1">
                                    <p className="text-sm font-medium text-white">Post-Process Audit</p>
                                    <p className="text-xs text-slate-500">Awaiting current phase completion</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Terminal Execution Log */}
                    <div className="bg-black border border-white/10 rounded-xl overflow-hidden flex flex-col h-[500px]">
                        <div className="bg-white/5 px-4 py-2 border-b border-white/10 flex items-center justify-between">
                            <span className="text-[10px] font-mono text-slate-500 tracking-widest uppercase font-bold">Live System Logs</span>
                            <div className="flex gap-1.5">
                                <div className="w-2 h-2 rounded-full bg-red-500/50"></div>
                                <div className="w-2 h-2 rounded-full bg-yellow-500/50"></div>
                                <div className="w-2 h-2 rounded-full bg-green-500/50"></div>
                            </div>
                        </div>
                        <div className="p-4 font-mono text-xs overflow-y-auto flex flex-col gap-2 scrollbar-thin scrollbar-thumb-white/10">
                            <p className="text-slate-600">[14:22:01.033] <span className="text-primary">INFO</span> Initializing cryptographic handshake...</p>
                            <p className="text-slate-600">[14:22:01.145] <span className="text-green-500">AUTH</span> HSM Cluster-A: Verified signature.</p>
                            <p className="text-slate-600">[14:22:01.146] <span className="text-primary">INFO</span> Stream opened for batch 992.</p>
                            <p className="text-slate-600">[14:22:05.411] <span className="text-slate-400">SYNC</span> Transferred 1,024 KB to ledger node.</p>
                            <p className="text-slate-300">[14:22:08.921] <span className="text-primary">TXN</span> Processing TXN_22904_S34...</p>
                            <p className="text-green-400">[14:22:09.102] <span className="text-green-500">SUCCESS</span> TXN_22904_S34 committed.</p>
                            <p className="text-slate-300">[14:22:09.331] <span className="text-primary">TXN</span> Processing TXN_22905_S34...</p>
                            <p className="text-slate-300">[14:22:09.554] <span className="text-yellow-500">WAIT</span> Node latency increase: +12ms.</p>
                            <p className="text-slate-300">[14:22:10.001] <span className="text-primary">TXN</span> Processing TXN_22906_S34...</p>
                            <p className="text-red-400">[14:22:10.222] <span className="text-red-500">ERROR</span> Insufficient liquidity in Source Vault_32.</p>
                            <p className="text-slate-600">[14:22:10.223] <span className="text-red-500">FAIL</span> TXN_22906_S34 rolled back.</p>
                            <p className="text-slate-300">[14:22:11.045] <span className="text-primary">TXN</span> Retrying queue stream...</p>
                            <p className="text-white animate-pulse">_</p>
                        </div>
                        <div className="mt-auto p-3 bg-white/5 border-t border-white/10">
                            <button className="w-full py-1.5 border border-white/10 rounded text-[10px] text-slate-400 hover:text-white hover:bg-white/5 transition-all font-mono uppercase tracking-widest">Export Execution Logs (.json)</button>
                        </div>
                    </div>

                    {/* Security Footer Stats */}
                    <div className="flex items-center justify-between px-2 text-[10px] text-slate-600 font-mono">
                        <div className="flex items-center gap-2">
                            <span className="material-icons text-[12px]">fingerprint</span>
                            <span>OP: ADM_772</span>
                        </div>
                        <div>
                            <span>SHA-256: e3b0c442...1d1f</span>
                        </div>
                    </div>
                </div>
            </main>

            {/* Bottom Notification Bar */}
            <div className="fixed bottom-0 w-full bg-background-dark border-t border-white/5 px-8 py-3 flex items-center justify-between text-xs">
                <div className="flex gap-8">
                    <div className="flex items-center gap-2">
                        <span className="text-slate-500 uppercase font-semibold">Uptime:</span>
                        <span className="text-white font-mono">99.999%</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="text-slate-500 uppercase font-semibold">Latency:</span>
                        <span className="text-white font-mono">14ms</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="text-slate-500 uppercase font-semibold">Throughput:</span>
                        <span className="text-white font-mono">2,400 tx/s</span>
                    </div>
                </div>
                <div className="flex items-center gap-4">
                    <span className="text-slate-500 italic">Velo Cloud Infrastructure • AWS Region us-east-1</span>
                    <div className="w-4 h-4 rounded-full bg-primary/20 flex items-center justify-center">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary shadow-[0_0_15px_2px_rgba(19,70,236,0.4)]"></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PayrollExecution;
