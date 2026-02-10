import React from 'react';
import { useNavigate } from 'react-router-dom';

const PayrollSuccess: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className="bg-obsidian-black font-display text-white min-h-screen flex items-center justify-center overflow-hidden relative">
            {/* Background Effects */}
            <div className="absolute inset-0 pointer-events-none opacity-5" style={{
                backgroundImage: 'radial-gradient(circle, #13ec5b 10%, transparent 10%), radial-gradient(circle, #13ec5b 10%, transparent 10%)',
                backgroundSize: '20px 20px',
                backgroundPosition: '0 0, 10px 10px'
            }}></div>
            <div className="fixed bottom-0 left-0 w-96 h-96 opacity-10 pointer-events-none transform -translate-x-1/2 translate-y-1/2">
                <div className="w-full h-full bg-gradient-to-tr from-vibrant-green to-transparent rounded-full blur-[120px]"></div>
            </div>
            <div className="fixed top-0 right-0 w-96 h-96 opacity-5 pointer-events-none transform translate-x-1/4 -translate-y-1/4">
                <div className="w-full h-full bg-gradient-to-bl from-vibrant-green to-transparent rounded-full blur-[120px]"></div>
            </div>

            <main className="max-w-2xl w-full px-6 py-12 relative z-10">
                <div className="text-center mb-10">
                    <div className="inline-flex items-center justify-center w-24 h-24 bg-vibrant-green/10 rounded-full mb-6 relative">
                        <div className="absolute inset-0 animate-ping bg-vibrant-green/20 rounded-full"></div>
                        <div className="relative w-16 h-16 bg-vibrant-green rounded-full flex items-center justify-center shadow-[0_0_25px_rgba(19,236,91,0.6)]">
                            <span className="material-icons text-black text-4xl">check</span>
                        </div>
                    </div>
                    <h1 className="text-4xl font-bold tracking-tight text-white mb-3">
                        Batch Completed Successfully!
                    </h1>
                    <p className="text-lg text-obsidian-silver">
                        Your payroll run has been processed and funds are being disbursed.
                    </p>
                </div>

                <div className="bg-charcoal border border-obsidian-border rounded-xl shadow-2xl overflow-hidden mb-10">
                    <div className="px-8 py-6 border-b border-obsidian-border flex justify-between items-center">
                        <span className="text-xs font-semibold uppercase tracking-widest text-obsidian-silver">Execution Summary</span>
                        <span className="px-3 py-1 bg-vibrant-green/10 text-vibrant-green text-[10px] font-bold rounded-full flex items-center gap-1 border border-vibrant-green/20">
                            <span className="w-1.5 h-1.5 bg-vibrant-green rounded-full shadow-[0_0_5px_#13ec5b]"></span>
                            COMPLETED
                        </span>
                    </div>
                    <div className="grid grid-cols-3 divide-x divide-obsidian-border">
                        <div className="px-8 py-10 text-center">
                            <div className="text-3xl font-bold text-white mb-1">45</div>
                            <div className="text-xs text-obsidian-silver uppercase tracking-wider">Payments Sent</div>
                        </div>
                        <div className="px-8 py-10 text-center bg-white/[0.02]">
                            <div className="text-3xl font-bold text-white mb-1">$67,500.00</div>
                            <div className="text-xs text-obsidian-silver uppercase tracking-wider">Total Value</div>
                        </div>
                        <div className="px-8 py-10 text-center">
                            <div className="text-3xl font-bold text-obsidian-silver/30 mb-1">0</div>
                            <div className="text-xs text-obsidian-silver uppercase tracking-wider">Failures</div>
                        </div>
                    </div>
                    <div className="px-8 py-4 bg-black/40 flex items-center justify-center gap-2">
                        <span className="material-icons text-vibrant-green text-sm">verified_user</span>
                        <span className="text-xs text-obsidian-silver font-mono">ID: VELO-BCH-98234-X2</span>
                    </div>
                </div>

                <div className="flex flex-col items-center gap-6">
                    <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
                        <button
                            onClick={() => navigate('/payroll/batch/8842-VX')}
                            className="bg-vibrant-green hover:bg-vibrant-green/90 text-black font-bold px-8 py-3 rounded-lg transition-all flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(19,236,91,0.4)] hover:shadow-[0_0_25px_rgba(19,236,91,0.6)]"
                        >
                            View Batch Details
                            <span className="material-icons text-sm">arrow_forward</span>
                        </button>
                        <button
                            onClick={() => navigate('/payroll/new')}
                            className="border border-obsidian-border hover:bg-white/5 text-white font-semibold px-8 py-3 rounded-lg transition-all flex items-center justify-center gap-2"
                        >
                            Create Another Batch
                        </button>
                    </div>
                    <div className="flex flex-col items-center gap-4">
                        <a
                            href="#"
                            onClick={(e) => { e.preventDefault(); navigate('/payroll'); }}
                            className="text-obsidian-silver hover:text-vibrant-green text-sm font-medium transition-colors"
                        >
                            Go to Dashboard
                        </a>
                        <div className="flex items-center gap-3 mt-4">
                            <div className="w-48 h-1.5 bg-obsidian-border rounded-full overflow-hidden">
                                <div className="h-full bg-vibrant-green w-3/4 rounded-full shadow-[0_0_8px_#13ec5b] animate-[progress_8s_linear_forwards]"></div>
                            </div>
                            <span className="text-[10px] text-obsidian-silver font-bold uppercase tracking-widest">Redirecting in 8s</span>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default PayrollSuccess;
