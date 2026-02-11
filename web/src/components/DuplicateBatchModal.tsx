import React, { useState } from 'react';

interface DuplicateBatchModalProps {
    isOpen: boolean;
    onClose: () => void;
    currentBatchName: string;
    recipientCount: number;
    totalAmount: string;
}

const DuplicateBatchModal: React.FC<DuplicateBatchModalProps> = ({ isOpen, onClose, currentBatchName, recipientCount, totalAmount }) => {
    if (!isOpen) return null;

    const [newBatchName, setNewBatchName] = useState(`${currentBatchName} (Copy)`);

    return (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-50 font-display">
            <div className="bg-obsidian-dark w-full max-w-[500px] rounded-xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-border-dark-obsidian overflow-hidden flex flex-col animate-blob">
                <div className="px-6 py-5 border-b border-border-dark-obsidian flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center text-primary">
                            <span className="material-icons-outlined text-[20px]">content_copy</span>
                        </div>
                        <h2 className="text-lg font-semibold text-white">Duplicate Batch</h2>
                    </div>
                    <button onClick={onClose} className="text-silver-grey hover:text-white transition-colors">
                        <span className="material-icons">close</span>
                    </button>
                </div>
                <div className="p-6 space-y-6">
                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-silver-grey" htmlFor="batch-name">
                            New batch name
                        </label>
                        <input
                            className="w-full px-4 py-2.5 bg-obsidian-lighter border border-border-dark-obsidian rounded-lg focus:ring-2 focus:ring-primary focus:border-primary text-white transition-all outline-none placeholder-zinc-600"
                            id="batch-name"
                            type="text"
                            value={newBatchName}
                            onChange={(e) => setNewBatchName(e.target.value)}
                        />
                    </div>
                    <div className="space-y-4">
                        <label className="flex items-center gap-3 cursor-pointer group">
                            <input defaultChecked className="w-5 h-5 rounded bg-obsidian-lighter border-border-dark-obsidian text-primary focus:ring-primary/40 focus:ring-offset-0 cursor-pointer" type="checkbox" />
                            <div className="flex flex-col">
                                <span className="text-sm font-medium text-white group-hover:text-primary transition-colors">Keep recipients</span>
                                <span className="text-xs text-silver-grey">Total of {recipientCount} recipients will be transferred</span>
                            </div>
                        </label>
                        <label className="flex items-center gap-3 cursor-pointer group">
                            <input defaultChecked className="w-5 h-5 rounded bg-obsidian-lighter border-border-dark-obsidian text-primary focus:ring-primary/40 focus:ring-offset-0 cursor-pointer" type="checkbox" />
                            <div className="flex flex-col">
                                <span className="text-sm font-medium text-white group-hover:text-primary transition-colors">Keep amounts</span>
                                <span className="text-xs text-silver-grey">Original value: ${totalAmount}</span>
                            </div>
                        </label>
                    </div>
                    <div className="bg-obsidian-lighter border border-border-dark-obsidian rounded-xl p-5 space-y-4">
                        <div className="flex items-center gap-2 text-primary">
                            <span className="material-icons text-[20px]">tune</span>
                            <h3 className="text-xs font-bold uppercase tracking-widest">Modifications</h3>
                        </div>
                        <div className="space-y-2">
                            <label className="block text-xs font-medium text-silver-grey" htmlFor="adjustment">
                                Adjust amounts by percentage (%)
                            </label>
                            <div className="relative">
                                <input className="w-full pl-4 pr-10 py-2.5 bg-obsidian-dark border border-border-dark-obsidian rounded-lg focus:ring-2 focus:ring-primary focus:border-primary text-white outline-none" id="adjustment" placeholder="0.00" type="number" />
                                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-silver-grey font-medium">%</span>
                            </div>
                            <p className="text-[11px] text-zinc-500 italic">Enter a positive number to increase, negative to decrease.</p>
                        </div>
                    </div>
                    <div className="bg-obsidian-lighter border border-border-dark-obsidian rounded-xl p-4">
                        <div className="flex items-start gap-3">
                            <span className="material-icons text-silver-grey mt-0.5">info</span>
                            <div>
                                <p className="text-xs font-medium text-silver-grey uppercase tracking-wider">Preview Summary</p>
                                <p className="text-sm font-medium text-white mt-1.5 leading-relaxed">
                                    New batch will include <span className="text-primary font-bold">{recipientCount} recipients</span> totaling <span className="text-primary font-bold">${totalAmount}</span>.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="px-6 py-5 bg-obsidian-lighter border-t border-border-dark-obsidian flex items-center justify-end gap-3">
                    <button onClick={onClose} className="px-5 py-2.5 text-sm font-medium text-silver-grey hover:text-white border border-border-dark-obsidian rounded-lg transition-all hover:bg-obsidian-dark">
                        Cancel
                    </button>
                    <button className="px-6 py-2.5 text-sm font-semibold text-white bg-primary hover:brightness-110 rounded-lg shadow-lg shadow-primary/20 transition-all transform active:scale-[0.98]">
                        Create Duplicate
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DuplicateBatchModal;
