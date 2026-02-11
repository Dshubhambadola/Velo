import React from 'react';

interface CancelBatchModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const CancelBatchModal: React.FC<CancelBatchModalProps> = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4 font-display">
            <div className="relative w-full max-w-[400px] bg-obsidian-dark rounded-xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden z-10 border border-border-dark-obsidian">
                <div className="pt-8 pb-4 px-6 flex flex-col items-center text-center">
                    <div className="w-12 h-12 bg-primary-yellow/10 rounded-full flex items-center justify-center mb-4 border border-primary-yellow/20">
                        <span className="material-icons text-primary-yellow text-3xl">warning</span>
                    </div>
                    <h2 className="text-xl font-semibold text-white">Cancel Batch Execution?</h2>
                </div>
                <div className="px-6 pb-4">
                    <div className="bg-white/5 rounded-lg p-4 border border-border-dark-obsidian">
                        <div className="flex justify-between items-center mb-2">
                            <span className="text-[10px] font-bold text-silver-grey uppercase tracking-widest">Current Progress</span>
                            <span className="text-xs font-bold text-white">20 / 45</span>
                        </div>
                        <div className="w-full bg-zinc-800 rounded-full h-1.5">
                            <div className="bg-primary h-1.5 rounded-full" style={{ width: '44.4%' }}></div>
                        </div>
                        <p className="mt-2 text-sm text-silver-grey">
                            20 of 45 payments completed
                        </p>
                    </div>
                </div>
                <div className="px-6 mb-6">
                    <div className="flex items-start gap-3 bg-warning-red-bg p-4 rounded-lg border border-warning-red-border">
                        <span className="material-icons text-red-500 text-xl flex-shrink-0">report_problem</span>
                        <div>
                            <p className="text-sm font-semibold text-red-400">Irreversible Action</p>
                            <p className="text-sm text-red-200/80 mt-1">
                                Completed payments cannot be reversed <span className="font-bold text-white">($30,000.00)</span>.
                            </p>
                        </div>
                    </div>
                </div>
                <div className="px-6 space-y-3">
                    <label className="relative flex items-start p-3 rounded-lg border border-border-dark-obsidian cursor-pointer hover:bg-white/5 transition-colors group">
                        <div className="flex items-center h-5">
                            <input defaultChecked className="h-4 w-4 text-primary border-zinc-700 focus:ring-primary focus:ring-offset-0 bg-transparent" name="cancel-option" type="radio" />
                        </div>
                        <div className="ml-3 text-sm">
                            <span className="block font-medium text-white">Cancel remaining payments only</span>
                            <span className="block text-silver-grey">Stops the 25 outstanding transactions.</span>
                        </div>
                    </label>
                    <label className="relative flex items-start p-3 rounded-lg border border-border-dark-obsidian cursor-pointer hover:bg-white/5 transition-colors group">
                        <div className="flex items-center h-5">
                            <input className="h-4 w-4 text-primary border-zinc-700 focus:ring-primary focus:ring-offset-0 bg-transparent" name="cancel-option" type="radio" />
                        </div>
                        <div className="ml-3 text-sm">
                            <span className="block font-medium text-white">Pause batch</span>
                            <span className="block text-silver-grey">Temporarily halt for review.</span>
                        </div>
                    </label>
                </div>
                <div className="px-6 mt-6 pb-6">
                    <label className="flex items-start gap-3 cursor-pointer group">
                        <div className="flex items-center h-5 mt-0.5">
                            <input className="h-4 w-4 rounded border-zinc-700 text-primary focus:ring-primary focus:ring-offset-0 bg-transparent" type="checkbox" />
                        </div>
                        <span className="text-sm text-silver-grey leading-tight group-hover:text-white transition-colors">
                            I understand completed payments cannot be reversed.
                        </span>
                    </label>
                </div>
                <div className="px-6 py-4 bg-black/40 border-t border-border-dark-obsidian flex gap-3">
                    <button onClick={onClose} className="flex-1 px-4 py-2.5 text-sm font-medium text-silver-grey border border-border-dark-obsidian rounded-lg hover:bg-white/5 hover:text-white transition-colors">
                        Go Back
                    </button>
                    <button className="flex-[1.5] px-4 py-2.5 text-sm font-bold text-zinc-900 bg-primary-yellow rounded-lg hover:brightness-110 active:scale-[0.98] transition-all shadow-lg shadow-primary-yellow/10">
                        Cancel Batch
                    </button>
                </div>
            </div>
            <div className="fixed bottom-6 right-6 opacity-40 pointer-events-none">
                <div className="text-2xl font-bold italic text-zinc-700 flex items-center gap-2">
                    <div className="w-6 h-6 bg-primary-yellow rounded-sm"></div>
                    VELO
                </div>
            </div>
        </div>
    );
};

export default CancelBatchModal;
