import React from 'react';

interface DeleteBatchModalProps {
    isOpen: boolean;
    onClose: () => void;
    batchName: string;
    recipientCount: number;
    totalAmount: string;
}

const DeleteBatchModal: React.FC<DeleteBatchModalProps> = ({ isOpen, onClose, batchName, recipientCount, totalAmount }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4 font-display">
            <div className="relative z-10 w-full max-w-[400px] bg-charcoal rounded-lg shadow-2xl border border-border-dark-obsidian overflow-hidden">
                <div className="h-1 w-full bg-primary-red shadow-[0_0_15px_rgba(236,19,19,0.3)]"></div>
                <div className="p-8">
                    <div className="flex flex-col items-center text-center mb-8">
                        <div className="w-14 h-14 bg-primary-red/10 rounded-full flex items-center justify-center mb-5 border border-primary-red/20">
                            <span className="material-icons text-primary-red text-3xl">warning</span>
                        </div>
                        <h2 className="text-2xl font-semibold text-white tracking-tight">Delete Batch?</h2>
                        <p className="mt-3 text-sm text-silver-grey leading-relaxed">
                            This action cannot be undone. All data associated with this batch will be permanently removed.
                        </p>
                    </div>
                    <div className="bg-obsidian-lighter border border-border-dark-obsidian rounded-lg p-5 mb-8">
                        <div className="text-[10px] font-bold text-silver-grey/60 uppercase tracking-[0.1em] mb-3">Batch Recap</div>
                        <div className="flex justify-between items-end">
                            <div>
                                <h3 className="font-medium text-white text-base">{batchName}</h3>
                                <p className="text-sm text-silver-grey mt-0.5">{recipientCount} recipients</p>
                            </div>
                            <div className="text-right">
                                <div className="text-lg font-bold text-white tracking-tight">${totalAmount}</div>
                                <div className="text-[10px] text-silver-grey/40 uppercase font-medium">Total Value</div>
                            </div>
                        </div>
                    </div>
                    <div className="space-y-5">
                        <div>
                            <label className="block text-sm font-medium text-silver-grey mb-3" htmlFor="confirm_delete">
                                Type <span className="text-white font-bold px-1">DELETE</span> to confirm
                            </label>
                            <input
                                autoComplete="off"
                                className="w-full px-4 py-3 bg-transparent border border-border-dark-obsidian rounded focus:ring-1 focus:ring-primary-red focus:border-primary-red outline-none transition-all text-white placeholder-white/10 text-center tracking-widest uppercase"
                                id="confirm_delete"
                                name="confirm_delete"
                                placeholder="••••••"
                                type="text"
                            />
                        </div>
                    </div>
                    <div className="mt-8 flex flex-col gap-3">
                        <button className="w-full bg-primary-red hover:bg-red-600 active:bg-red-700 text-white font-bold py-3.5 rounded transition-all shadow-lg shadow-primary-red/10">
                            Delete Batch
                        </button>
                        <button onClick={onClose} className="w-full bg-transparent border border-border-dark-obsidian hover:bg-white/5 text-silver-grey hover:text-white font-medium py-3 rounded transition-colors">
                            Cancel
                        </button>
                    </div>
                </div>
                <div className="bg-black/40 px-6 py-3.5 border-t border-border-dark-obsidian flex items-center justify-center gap-2.5">
                    <span className="material-icons text-silver-grey/30 text-[16px]">lock</span>
                    <span className="text-[10px] text-silver-grey/40 uppercase tracking-[0.2em] font-semibold">Secure Authorization Required</span>
                </div>
                {/* Background Decoration */}
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary-red/5 rounded-full blur-[120px] pointer-events-none"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-primary-red/5 rounded-full blur-[120px] pointer-events-none"></div>
            </div>
        </div>
    );
};

export default DeleteBatchModal;
