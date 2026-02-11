import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getBatch } from '../api/payroll';

const PayrollReview: React.FC = () => {
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    const [filter, setFilter] = useState<'all' | 'issues'>('all');
    const [batch, setBatch] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchBatch = async () => {
            if (!id) return;
            try {
                const data = await getBatch(id);
                setBatch(data);
            } catch (error) {
                console.error("Failed to fetch batch:", error);
                alert("Failed to load batch details");
            } finally {
                setIsLoading(false);
            }
        };
        fetchBatch();
    }, [id]);

    const handleConfirm = () => {
        if (!id) return;
        navigate(`/payroll/confirm/${id}`); // Assuming confirmation page also needs ID
    };

    if (isLoading) {
        return <div className="text-white text-center p-10">Loading Batch Details...</div>;
    }

    if (!batch) {
        return <div className="text-white text-center p-10">Batch not found.</div>;
    }

    const records = batch.Patterns || []; // Assuming 'Patterns' holds the payments
    const filteredRecords = filter === 'all' ? records : records.filter((r: any) => r.status !== 'pending' && r.status !== 'valid'); // Adjust based on real status

    return (
        <div className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 min-h-screen flex flex-col font-display antialiased">
            <style>{`
                .error-row-glow { box-shadow: inset 4px 0 0 0 #ef4444, 0 0 15px rgba(239, 68, 68, 0.05); }
                .status-card-glow-blue { box-shadow: 0 0 20px rgba(19, 70, 236, 0.1); }
                .status-card-glow-red { box-shadow: 0 0 20px rgba(239, 68, 68, 0.1); }
                .status-card-glow-green { box-shadow: 0 0 20px rgba(34, 197, 94, 0.1); }
                .custom-scrollbar::-webkit-scrollbar { width: 6px; height: 6px; }
                .custom-scrollbar::-webkit-scrollbar-track { background: #000000; }
                .custom-scrollbar::-webkit-scrollbar-thumb { background: #333; border-radius: 10px; }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #444; }
            `}</style>

            {/* Header */}
            <header className="border-b border-border-muted bg-charcoal/50 backdrop-blur-md sticky top-0 z-30">
                <div className="max-w-[1600px] mx-auto px-6 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="w-8 h-8 bg-primary rounded flex items-center justify-center">
                            <span className="material-icons text-white text-xl">account_balance_wallet</span>
                        </div>
                        <div>
                            <h1 className="text-sm font-semibold tracking-tight uppercase text-slate-400">Payroll Batch Validation</h1>
                            <div className="flex items-center gap-2">
                                <span className="text-lg font-bold text-white">{batch.description || 'Untitled Batch'}</span>
                                <span className="text-[10px] px-2 py-0.5 rounded bg-white/5 text-slate-400 border border-white/10 uppercase tracking-widest">{batch.status}</span>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center gap-6">
                        <div className="text-right">
                            <p className="text-xs text-slate-500">Created At</p>
                            <p className="text-sm font-medium">{new Date(batch.created_at).toLocaleString()}</p>
                        </div>
                        <button className="p-2 text-slate-400 hover:text-white transition-colors">
                            <span className="material-icons">settings</span>
                        </button>
                        <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center border border-primary/30">
                            <span className="text-xs font-bold text-primary">JD</span>
                        </div>
                    </div>
                </div>
            </header>

            <main className="flex-1 max-w-[1600px] mx-auto w-full px-6 py-8 flex flex-col gap-8 mb-24">
                {/* Summary Cards */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="bg-charcoal border border-border-muted p-5 rounded-xl status-card-glow-blue">
                        <div className="flex justify-between items-start mb-2">
                            <span className="text-slate-500 text-xs font-medium uppercase tracking-wider">Total Records</span>
                            <span className="material-icons text-primary/60 text-lg">list_alt</span>
                        </div>
                        <div className="text-3xl font-bold text-white">{batch.recipient_count}</div>
                        <div className="mt-2 text-[11px] text-slate-500">Full batch file size: 2.4MB</div>
                    </div>
                    <div className="bg-charcoal border border-border-muted p-5 rounded-xl status-card-glow-green">
                        <div className="flex justify-between items-start mb-2">
                            <span className="text-slate-500 text-xs font-medium uppercase tracking-wider">Valid</span>
                            <span className="material-icons text-emerald-500 text-lg">check_circle</span>
                        </div>
                        <div className="text-3xl font-bold text-white">{batch.recipient_count}</div>
                        <div className="mt-2 text-[11px] text-emerald-500/80">100% Accuracy rating (Mock)</div>
                    </div>
                    <div className="bg-charcoal border border-border-muted p-5 rounded-xl status-card-glow-red relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-24 h-24 bg-red-500/5 blur-3xl rounded-full -mr-12 -mt-12"></div>
                        <div className="flex justify-between items-start mb-2">
                            <span className="text-slate-500 text-xs font-medium uppercase tracking-wider">Critical Errors</span>
                            <span className="material-icons text-red-500 text-lg">error_outline</span>
                        </div>
                        <div className="text-3xl font-bold text-white">0</div>
                        <div className="mt-2 text-[11px] text-red-400">Requires manual correction</div>
                    </div>
                    <div className="bg-charcoal border border-border-muted p-5 rounded-xl status-card-glow-blue">
                        <div className="flex justify-between items-start mb-2">
                            <span className="text-slate-500 text-xs font-medium uppercase tracking-wider">Warnings</span>
                            <span className="material-icons text-amber-500 text-lg">warning_amber</span>
                        </div>
                        <div className="text-3xl font-bold text-white">0</div>
                        <div className="mt-2 text-[11px] text-amber-400/80">Potential duplicates found</div>
                    </div>
                </div>

                {/* Table Controls */}
                <div className="flex flex-col gap-4">
                    <div className="flex items-center justify-between">
                        <div className="flex gap-1 p-1 bg-charcoal border border-border-muted rounded-lg">
                            <button
                                onClick={() => setFilter('all')}
                                className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${filter === 'all' ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'text-slate-400 hover:text-white'}`}
                            >
                                All Records
                            </button>
                            <button
                                onClick={() => setFilter('issues')}
                                className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all flex items-center gap-2 ${filter === 'issues' ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'text-slate-400 hover:text-white'}`}
                            >
                                Issues
                                <span className="bg-red-600 text-[10px] text-white px-1.5 py-0.5 rounded-full">0</span>
                            </button>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="relative group">
                                <span className="material-icons absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 text-sm">search</span>
                                <input className="bg-charcoal border border-border-muted rounded-lg pl-9 pr-4 py-2 text-sm text-slate-200 focus:ring-1 focus:ring-primary focus:border-primary outline-none transition-all w-64" placeholder="Search employee ID or name..." type="text" />
                            </div>
                            <button className="flex items-center gap-2 bg-charcoal border border-border-muted rounded-lg px-4 py-2 text-sm text-slate-300 hover:bg-white/5 transition-colors">
                                <span className="material-icons text-sm">filter_list</span>
                                Filter
                            </button>
                        </div>
                    </div>

                    {/* Validation Table */}
                    <div className="bg-charcoal border border-border-muted rounded-xl overflow-hidden shadow-2xl">
                        <div className="overflow-x-auto custom-scrollbar">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-white/5 border-b border-border-muted">
                                        <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-slate-400">Transaction ID</th>
                                        <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-slate-400">Wallet Address</th>
                                        <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-slate-400">Amount</th>
                                        <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-slate-400">Currency</th>
                                        <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-slate-400">Status</th>
                                        <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-slate-400 text-right">Action</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-border-muted">
                                    {filteredRecords.map((record: any, index: number) => (
                                        <tr key={index} className={`transition-colors group hover:bg-white/[0.02]`}>
                                            <td className={`px-6 py-4 font-mono text-sm text-slate-300`}>{record.ID.substring(0, 8)}...</td>
                                            <td className="px-6 py-4 text-sm font-medium text-white font-mono">{record.WalletAddr}</td>
                                            <td className={`px-6 py-4 text-sm font-mono text-slate-300`}>{record.Amount}</td>
                                            <td className={`px-6 py-4 text-sm font-mono text-slate-300`}>{record.Currency}</td>
                                            <td className="px-6 py-4">
                                                <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-500 text-[10px] font-bold uppercase">
                                                    <span className="w-1 h-1 rounded-full bg-emerald-500"></span> {record.Status}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <button className="text-slate-500 hover:text-white transition-colors"><span className="material-icons text-lg">edit</span></button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <div className="px-6 py-4 bg-white/5 border-t border-border-muted flex items-center justify-between">
                            <span className="text-xs text-slate-400 uppercase font-medium">Page 1 of 1</span>
                        </div>
                    </div>
                </div>
            </main>

            {/* Fixed Bottom Action Bar */}
            <div className="fixed bottom-0 inset-x-0 bg-charcoal border-t border-border-muted z-40">
                {/* Multi-tone Progress Bar */}
                <div className="h-1 w-full flex">
                    <div className="h-full bg-emerald-500" style={{ width: '100%' }}></div>
                </div>
                <div className="max-w-[1600px] mx-auto px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-6">
                        <div className="flex flex-col">
                            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Total Batch Value</span>
                            <span className="text-lg font-bold text-white tabular-nums">${batch.total_amount}</span>
                        </div>
                        <div className="h-10 w-px bg-border-muted"></div>
                        <div className="flex items-center gap-2">
                            <div className="flex -space-x-2">
                                <div className="w-6 h-6 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center">
                                    <span className="material-icons text-emerald-500 text-[10px]">shield</span>
                                </div>
                                <div className="w-6 h-6 rounded-full bg-primary/20 border border-primary/40 flex items-center justify-center">
                                    <span className="material-icons text-primary text-[10px]">verified</span>
                                </div>
                            </div>
                            <span className="text-xs text-slate-400 font-medium">Compliance Check Passed</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <button onClick={() => navigate('/payroll')} className="px-6 py-2.5 rounded-lg text-sm font-semibold text-slate-300 hover:text-white border border-border-muted hover:bg-white/5 transition-all">
                            Discard Batch
                        </button>
                        <div className="relative">
                            <button
                                onClick={handleConfirm}
                                className="bg-primary hover:bg-blue-600 text-white px-8 py-2.5 rounded-lg text-sm font-bold transition-all shadow-xl shadow-primary/20 flex items-center gap-2 group"
                            >
                                Confirm & Continue
                                <span className="material-icons text-sm group-hover:translate-x-1 transition-transform">arrow_forward</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PayrollReview;
