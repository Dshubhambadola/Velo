import React from 'react';
import { useNavigate } from 'react-router-dom';

const BatchValidationFailed: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col min-h-screen bg-black text-white font-display">
            {/* Header */}
            <header className="border-b border-white/10 bg-black px-8 py-4 flex justify-between items-center sticky top-0 z-50">
                <div className="flex items-center gap-3">
                    <div className="bg-red-600 p-1.5 rounded-lg flex items-center justify-center shadow-[0_0_15px_rgba(220,38,38,0.4)]">
                        <span className="material-icons text-white text-xl">account_balance_wallet</span>
                    </div>
                    <span className="font-bold text-xl tracking-tight">VELO <span className="text-red-600 drop-shadow-[0_0_8px_rgba(220,38,38,0.6)]">PAYROLL</span></span>
                </div>
                <div className="flex items-center gap-4">
                    <span className="text-sm font-medium opacity-60">Session: #VL-99281</span>
                    <div className="h-8 w-8 rounded-full bg-white/10 flex items-center justify-center text-white border border-white/20">
                        <span className="material-icons text-sm">person</span>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="flex-grow container mx-auto max-w-6xl px-4 py-12">
                <div className="text-center mb-12">
                    <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-red-600/20 mb-6 border-4 border-red-600/20">
                        <span className="material-icons text-red-500 text-5xl drop-shadow-[0_0_8px_rgba(239,68,68,0.8)]">close</span>
                    </div>
                    <h1 className="text-4xl font-extrabold mb-3 tracking-tight text-white">Batch Validation Failed</h1>
                    <p className="text-xl text-slate-400">
                        <span className="text-red-500 font-bold drop-shadow-[0_0_8px_rgba(239,68,68,0.6)]">23 of 45 recipients</span> have critical errors that prevent processing.
                    </p>
                </div>

                <div className="space-y-6 mb-32">
                    {/* Invalid Wallet Addresses Card */}
                    <div className="bg-surface-dark rounded-xl border border-white/10 shadow-2xl overflow-hidden">
                        <div className="p-5 flex items-center justify-between cursor-pointer border-b border-white/5">
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-lg bg-red-600 flex items-center justify-center shadow-lg shadow-red-600/40">
                                    <span className="material-icons text-white">account_balance_wallet</span>
                                </div>
                                <div>
                                    <h2 className="text-lg font-bold text-white">Invalid Wallet Addresses</h2>
                                    <p className="text-sm text-slate-400">15 records contain syntax or checksum errors</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <span className="px-3 py-1 bg-red-600/20 text-red-500 text-xs font-bold rounded-full uppercase tracking-wider border border-red-600/30 drop-shadow-[0_0_8px_rgba(239,68,68,0.4)]">High Priority</span>
                                <span className="material-icons text-slate-500">expand_less</span>
                            </div>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead className="bg-black/40 text-xs uppercase text-slate-400 font-bold tracking-wider">
                                    <tr>
                                        <th className="px-6 py-4">Row #</th>
                                        <th className="px-6 py-4">Name</th>
                                        <th className="px-6 py-4">Invalid Input</th>
                                        <th className="px-6 py-4 text-right">Action</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-white/5">
                                    <tr className="hover:bg-white/[0.03] transition-colors">
                                        <td className="px-6 py-4 text-sm font-bold text-slate-500">04</td>
                                        <td className="px-6 py-4 text-sm font-semibold text-white">Sarah Jenkins</td>
                                        <td className="px-6 py-4 text-sm">
                                            <div className="flex flex-col">
                                                <code className="text-red-500 bg-red-500/10 px-2 py-1 rounded border border-red-500/20 w-fit font-mono">0x71C7...f45</code>
                                                <span className="text-[10px] text-red-500 mt-1.5 flex items-center gap-1 font-medium">
                                                    <span className="material-icons text-[12px]">info</span> Checksum mismatch
                                                </span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <button className="text-xs font-bold bg-red-600 text-white px-4 py-2 rounded shadow-lg hover:bg-red-500 transition-all uppercase tracking-tight">Fix Address</button>
                                        </td>
                                    </tr>
                                    <tr className="hover:bg-white/[0.03] transition-colors">
                                        <td className="px-6 py-4 text-sm font-bold text-slate-500">12</td>
                                        <td className="px-6 py-4 text-sm font-semibold text-white">Marcus Webb</td>
                                        <td className="px-6 py-4 text-sm">
                                            <div className="flex flex-col">
                                                <code className="text-red-500 bg-red-500/10 px-2 py-1 rounded border border-red-500/20 w-fit font-mono">velo_9921_x</code>
                                                <span className="text-[10px] text-red-500 mt-1.5 flex items-center gap-1 font-medium">
                                                    <span className="material-icons text-[12px]">info</span> Unsupported format
                                                </span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <button className="text-xs font-bold bg-red-600 text-white px-4 py-2 rounded shadow-lg hover:bg-red-500 transition-all uppercase tracking-tight">Fix Address</button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className="p-3 bg-black/40 text-center border-t border-white/5">
                            <button className="text-xs font-bold text-red-500 hover:underline drop-shadow-[0_0_8px_rgba(239,68,68,0.6)] uppercase tracking-widest">View 13 more wallet errors</button>
                        </div>
                    </div>

                    {/* Duplicate Entries Card */}
                    <div className="bg-surface-dark rounded-xl border border-white/10 shadow-2xl overflow-hidden">
                        <div className="p-5 flex items-center justify-between cursor-pointer">
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-lg bg-amber-600 flex items-center justify-center shadow-lg shadow-amber-600/20">
                                    <span className="material-icons text-white">content_copy</span>
                                </div>
                                <div>
                                    <h2 className="text-lg font-bold text-white">Duplicate Entries</h2>
                                    <p className="text-sm text-slate-400">5 pairs of recipients share identical identifiers</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <span className="px-3 py-1 bg-amber-500/20 text-amber-400 text-xs font-bold rounded-full uppercase tracking-wider border border-amber-500/20">Potential Conflict</span>
                                <span className="material-icons text-slate-500">expand_more</span>
                            </div>
                        </div>
                        <div className="px-5 pb-5 flex gap-3">
                            <div className="flex -space-x-3">
                                <div className="w-9 h-9 rounded-full bg-slate-800 border-2 border-surface-dark flex items-center justify-center text-[11px] font-bold text-white shadow-lg">JD</div>
                                <div className="w-9 h-9 rounded-full bg-slate-700 border-2 border-surface-dark flex items-center justify-center text-[11px] font-bold text-white shadow-lg">KL</div>
                                <div className="w-9 h-9 rounded-full bg-slate-600 border-2 border-surface-dark flex items-center justify-center text-[11px] font-bold text-white shadow-lg">AM</div>
                            </div>
                            <span className="text-xs text-slate-500 self-center font-medium">+2 others flagged</span>
                        </div>
                    </div>

                    {/* Insufficient Funds Warning Card */}
                    <div className="bg-surface-dark rounded-xl border border-white/10 shadow-2xl overflow-hidden opacity-60">
                        <div className="p-5 flex items-center justify-between cursor-pointer">
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-lg bg-slate-700 flex items-center justify-center shadow-lg">
                                    <span className="material-icons text-white">payments</span>
                                </div>
                                <div>
                                    <h2 className="text-lg font-bold text-white">Insufficient Funds Warning</h2>
                                    <p className="text-sm text-slate-400">3 recipients exceed available balance in master wallet</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <span className="px-3 py-1 bg-white/10 text-slate-300 text-xs font-bold rounded-full uppercase tracking-wider border border-white/10">Warning</span>
                                <span className="material-icons text-slate-500">expand_more</span>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            {/* Footer */}
            <footer className="fixed bottom-0 left-0 right-0 bg-surface-dark border-t border-red-600/40 px-8 py-5 flex justify-between items-center shadow-[0_-20px_40px_rgba(0,0,0,0.8)] z-50">
                <div className="flex flex-col">
                    <span className="text-[10px] uppercase font-bold text-slate-500 tracking-[0.2em]">Selected Validation</span>
                    <span className="text-xl font-bold text-white">23 Errors Remaining</span>
                </div>
                <div className="flex gap-4">
                    <button onClick={() => navigate(-1)} className="px-8 py-3 rounded-lg font-bold border border-white/10 text-slate-300 hover:bg-white/5 hover:text-white transition-all">
                        Back to Upload
                    </button>
                    {/* Reusing primary color but overriding for red theme since this is an error page */}
                    <button className="px-10 py-3 rounded-lg font-bold bg-red-600 text-white shadow-[0_0_20px_rgba(220,38,38,0.4)] hover:bg-red-500 active:scale-95 transition-all flex items-center gap-2">
                        <span className="material-icons text-sm">auto_fix_high</span>
                        Fix All Issues
                    </button>
                </div>
            </footer>

            {/* Pro Tip Toast */}
            <div className="fixed top-24 right-8 w-72 bg-black text-white p-5 rounded-xl shadow-[0_10px_40px_rgba(0,0,0,0.6)] border border-white/10 hidden lg:block">
                <div className="flex items-center gap-2 mb-3">
                    <span className="material-icons text-red-500 text-sm drop-shadow-[0_0_8px_rgba(239,68,68,0.6)]">lightbulb</span>
                    <span className="text-[10px] font-black uppercase tracking-[0.15em] text-white">Validation Pro-Tip</span>
                </div>
                <p className="text-xs leading-relaxed text-slate-400 font-medium">
                    You can use the <strong className="text-red-500">"Fix All"</strong> button to automatically attempt checksum corrections for the 15 invalid wallet addresses based on our network history.
                </p>
            </div>
        </div>
    );
};

export default BatchValidationFailed;
