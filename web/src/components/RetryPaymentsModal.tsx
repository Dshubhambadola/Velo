import React from 'react';

interface RetryPaymentsModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const RetryPaymentsModal: React.FC<RetryPaymentsModalProps> = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-50 p-4 font-display">
            <div className="bg-obsidian-dark w-full max-w-[500px] rounded-xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden border border-border-dark-obsidian">
                <div className="px-6 py-5 border-b border-border-dark-obsidian flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
                            <span className="material-icons text-primary text-2xl">refresh</span>
                        </div>
                        <div>
                            <h2 className="text-lg font-semibold text-white leading-tight">Retry Failed Payments</h2>
                            <p className="text-[11px] font-medium text-silver-grey uppercase tracking-wider mt-0.5">3 Transactions Require Action</p>
                        </div>
                    </div>
                    <button onClick={onClose} className="text-silver-grey hover:text-white transition-colors">
                        <span className="material-icons">close</span>
                    </button>
                </div>
                <div className="max-h-[60vh] overflow-y-auto">
                    <div className="p-6 space-y-3">
                        <h3 className="text-[11px] font-bold uppercase tracking-widest text-silver-grey mb-3">Selected Transactions</h3>
                        <div className="flex items-start justify-between p-4 rounded-lg border border-border-dark-obsidian bg-obsidian-dark">
                            <div className="flex flex-col">
                                <span className="text-sm font-semibold text-white">Acme Corp</span>
                                <span className="text-[12px] flex items-center gap-1.5 text-red-500 mt-1.5 font-medium">
                                    <span className="material-icons text-[16px]">error</span>
                                    Insufficient Gas
                                </span>
                            </div>
                            <div className="text-right">
                                <span className="text-sm font-bold text-white tracking-tight">$1,200.00</span>
                            </div>
                        </div>
                        <div className="flex items-start justify-between p-4 rounded-lg border border-border-dark-obsidian bg-obsidian-dark">
                            <div className="flex flex-col">
                                <span className="text-sm font-semibold text-white">Global Tech</span>
                                <span className="text-[12px] flex items-center gap-1.5 text-red-500 mt-1.5 font-medium">
                                    <span className="material-icons text-[16px]">error</span>
                                    Network Timeout
                                </span>
                            </div>
                            <div className="text-right">
                                <span className="text-sm font-bold text-white tracking-tight">$3,000.50</span>
                            </div>
                        </div>
                        <div className="flex items-start justify-between p-4 rounded-lg border border-border-dark-obsidian bg-obsidian-dark">
                            <div className="flex flex-col">
                                <span className="text-sm font-semibold text-white">Zed Finance</span>
                                <span className="text-[12px] flex items-center gap-1.5 text-red-500 mt-1.5 font-medium">
                                    <span className="material-icons text-[16px]">error</span>
                                    Slippage Exceeded
                                </span>
                            </div>
                            <div className="text-right">
                                <span className="text-sm font-bold text-white tracking-tight">$301.00</span>
                            </div>
                        </div>
                    </div>
                    <div className="px-6 pb-6">
                        <h3 className="text-[11px] font-bold uppercase tracking-widest text-silver-grey mb-3">Resolution Strategy</h3>
                        <div className="space-y-2">
                            <label className="relative flex items-center p-4 rounded-lg border border-primary bg-primary/10 cursor-pointer group transition-all">
                                <div className="flex items-center justify-center w-4 h-4 rounded-full border border-primary bg-primary">
                                    <span className="material-icons text-white text-[12px]">check</span>
                                </div>
                                <div className="ml-4 flex-1">
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm font-semibold text-white">Retry with increased gas</span>
                                        <span className="bg-primary text-white text-[9px] font-bold px-2 py-0.5 rounded uppercase tracking-widest">Recommended</span>
                                    </div>
                                    <p className="text-xs text-silver-grey mt-0.5">Prioritize these transactions on the blockchain.</p>
                                </div>
                            </label>
                            <label className="relative flex items-center p-4 rounded-lg border border-border-dark-obsidian bg-obsidian-lighter/50 cursor-pointer group hover:bg-[#222] transition-colors">
                                <div className="w-4 h-4 rounded-full border border-border-dark-obsidian bg-transparent"></div>
                                <div className="ml-4">
                                    <span className="text-sm font-semibold text-white">Use different network</span>
                                    <p className="text-xs text-silver-grey mt-0.5">Switch to fallback RPC node for execution.</p>
                                </div>
                            </label>
                        </div>
                    </div>
                </div>
                <div className="bg-obsidian-lighter p-6 border-t border-border-dark-obsidian">
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <span className="text-[11px] text-silver-grey font-bold uppercase tracking-wider block mb-1">Total Estimated Cost</span>
                            <div className="flex items-baseline gap-2">
                                <span className="text-3xl font-bold text-white">$4,501.50</span>
                                <span className="text-xs text-silver-grey font-medium">USD</span>
                            </div>
                        </div>
                        <div className="text-right">
                            <div className="flex items-center justify-end text-primary gap-1.5 px-3 py-1.5 bg-primary/5 rounded-full border border-primary/20">
                                <span className="material-icons text-sm">info</span>
                                <span className="text-[10px] font-bold uppercase tracking-tight">Includes +15% Gas Buffer</span>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center justify-end gap-4">
                        <button onClick={onClose} className="px-5 py-2.5 text-sm font-semibold text-silver-grey hover:text-white hover:bg-white/5 rounded-lg transition-all">
                            Cancel
                        </button>
                        <button className="px-8 py-3 text-sm font-bold text-white bg-primary hover:bg-blue-600 rounded-lg shadow-lg shadow-blue-900/40 transition-all flex items-center gap-2">
                            <span>Retry Selected (3)</span>
                            <span className="material-icons text-lg">bolt</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RetryPaymentsModal;
