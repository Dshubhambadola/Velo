import React from 'react';

interface NetworkCongestionModalProps {
    isOpen: boolean;
    onClose: () => void;
    currentGas: number;
    normalGas: number;
}

const NetworkCongestionModal: React.FC<NetworkCongestionModalProps> = ({
    isOpen,
    onClose,
    currentGas = 150,
    normalGas = 15
}) => {
    if (!isOpen) return null;

    const increasePercentage = Math.round(((currentGas - normalGas) / normalGas) * 100);

    return (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-50 font-display p-6">
            <div className="w-full max-w-4xl bg-black border border-border-dark-obsidian rounded-xl shadow-2xl overflow-hidden">
                {/* Header */}
                <div className="bg-red-500/10 px-6 py-4 border-b border-red-500/20 flex items-center gap-4">
                    <div className="bg-red-500/20 p-2 rounded-lg shadow-[0_0_8px_rgba(239,68,68,0.4)]">
                        <span className="material-icons text-red-500 text-2xl">warning</span>
                    </div>
                    <div>
                        <h2 className="text-lg font-bold text-white leading-tight">Network Congestion Detected</h2>
                        <p className="text-sm text-silver-grey">Ethereum network is currently congested. Gas fees are 3x higher than normal.</p>
                    </div>
                    <div className="ml-auto text-right">
                        <button onClick={onClose} className="text-silver-grey hover:text-white">
                            <span className="material-icons">close</span>
                        </button>
                    </div>
                </div>

                <div className="p-6 md:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
                    {/* Fee Comparison */}
                    <div className="lg:col-span-4 flex flex-col justify-center">
                        <span className="text-[10px] font-bold text-silver-grey uppercase tracking-widest mb-4">Fee Comparison</span>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between p-3 rounded-lg bg-surface-dark border border-border-dark-obsidian">
                                <span className="text-sm text-silver-grey">Normal Fee</span>
                                <span className="text-lg font-bold text-white">${normalGas.toFixed(2)}</span>
                            </div>
                            <div className="flex items-center justify-between p-4 rounded-lg bg-red-500/5 border border-red-500/30">
                                <span className="text-sm font-semibold text-red-400">Current Fee</span>
                                <div className="text-right">
                                    <span className="text-2xl font-black text-red-500">${currentGas.toFixed(2)}</span>
                                    <div className="text-[10px] font-bold text-red-400/80 uppercase tracking-tighter">+{increasePercentage}% Increase</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Live Gas Tracker */}
                    <div className="lg:col-span-3 flex flex-col items-center justify-center border-x border-border-dark-obsidian px-8">
                        <span className="text-[10px] font-bold text-silver-grey uppercase tracking-widest mb-6">Live Gas Tracker</span>
                        <div className="relative w-32 h-32 flex items-center justify-center">
                            <svg className="w-full h-full transform -rotate-90 drop-shadow-[0_0_8px_rgba(239,68,68,0.4)]">
                                <circle className="text-border-dark-obsidian" cx="64" cy="64" fill="transparent" r="58" stroke="currentColor" strokeWidth="8"></circle>
                                <circle className="text-red-500" cx="64" cy="64" fill="transparent" r="58" stroke="currentColor" strokeDasharray="364.4" strokeDashoffset="91.1" strokeLinecap="round" strokeWidth="8"></circle>
                            </svg>
                            <div className="absolute inset-0 flex flex-col items-center justify-center">
                                <span className="text-3xl font-black text-white">150</span>
                                <span className="text-[10px] font-bold text-red-500 uppercase tracking-widest">Gwei (High)</span>
                            </div>
                        </div>
                        <span className="text-[10px] text-silver-grey mt-4 flex items-center gap-1 font-medium">
                            <span className="material-icons text-[12px] animate-spin">sync</span>
                            Live Refreshing
                        </span>
                    </div>

                    {/* Actions */}
                    <div className="lg:col-span-5 flex flex-col justify-center gap-3">
                        <span className="text-[10px] font-bold text-silver-grey uppercase tracking-widest mb-1">Recommended Actions</span>
                        <button className="w-full bg-emerald-500 hover:brightness-110 text-black font-black py-4 px-6 rounded-lg transition-all flex items-center justify-between group shadow-lg shadow-emerald-500/10">
                            <div className="flex items-center gap-3">
                                <span className="material-icons font-bold">account_tree</span>
                                <div className="text-left">
                                    <div className="text-sm leading-none mb-1">Use Polygon Instead</div>
                                    <div className="text-[10px] opacity-70 font-bold uppercase tracking-tight">Save $29.40 in fees immediately</div>
                                </div>
                            </div>
                            <span className="material-icons group-hover:translate-x-1 transition-transform">arrow_forward</span>
                        </button>
                        <div className="grid grid-cols-2 gap-3">
                            <button className="bg-primary hover:brightness-110 text-white text-xs font-black py-3 px-4 rounded-lg transition-colors uppercase tracking-widest">
                                Continue
                            </button>
                            <button onClick={onClose} className="bg-black hover:bg-surface-dark text-white border border-border-dark-obsidian text-xs font-black py-3 px-4 rounded-lg transition-colors uppercase tracking-widest">
                                Schedule Later
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NetworkCongestionModal;
