import React, { useEffect } from 'react';

interface QuickActionsModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const QuickActionsModal: React.FC<QuickActionsModalProps> = ({ isOpen, onClose }) => {
    // Handle Escape key to close
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };

        if (isOpen) {
            window.addEventListener('keydown', handleKeyDown);
        }
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
                onClick={onClose}
            ></div>

            {/* Modal Container */}
            <div className="w-full max-w-2xl bg-[#121212] border border-[#262626] rounded-xl shadow-2xl overflow-hidden relative z-10 animate-blob">
                {/* Header */}
                <div className="px-6 py-4 flex items-center justify-between border-b border-[#262626]">
                    <div className="flex items-center gap-2">
                        <span className="material-icons text-primary text-xl">bolt</span>
                        <h1 className="text-lg font-semibold tracking-tight text-white">Quick Actions</h1>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="hidden md:inline-flex items-center gap-1 px-2 py-1 text-xs font-medium text-[#A3A3A3] bg-[#262626] rounded">
                            <span className="text-[10px]">⌘</span>K
                        </div>
                        <button
                            onClick={onClose}
                            className="text-[#A3A3A3] hover:text-white transition-colors"
                        >
                            <span className="material-icons">close</span>
                        </button>
                    </div>
                </div>

                {/* Recently Used Section */}
                <div className="px-6 pt-6 pb-4">
                    <h2 className="text-xs font-bold uppercase tracking-widest text-[#A3A3A3] mb-4">Recently Used</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {/* Recent Action 1 */}
                        <button className="flex items-start p-4 bg-[#121212] border border-[#262626] rounded-lg transition-all text-left hover:border-[#404040] hover:bg-[#1a1a1a] group">
                            <div className="mr-4 mt-1">
                                <span className="material-icons text-primary text-lg shadow-[0_0_8px_rgba(13,89,242,0.6)]">send</span>
                            </div>
                            <div>
                                <div className="font-semibold text-sm text-white">Send Transfer</div>
                                <div className="text-xs text-[#A3A3A3] mt-0.5">Instant payout to saved vendors</div>
                            </div>
                        </button>
                        {/* Recent Action 2 */}
                        <button className="flex items-start p-4 bg-[#121212] border border-[#262626] rounded-lg transition-all text-left hover:border-[#404040] hover:bg-[#1a1a1a] group">
                            <div className="mr-4 mt-1">
                                <span className="material-icons text-green-500 text-lg shadow-[0_0_8px_rgba(34,197,94,0.6)]">account_balance_wallet</span>
                            </div>
                            <div>
                                <div className="font-semibold text-sm text-white">View Wallet</div>
                                <div className="text-xs text-[#A3A3A3] mt-0.5">Check real-time treasury balances</div>
                            </div>
                        </button>
                    </div>
                </div>

                <div className="px-6">
                    <hr className="border-[#262626]" />
                </div>

                {/* All Actions Grid */}
                <div className="px-6 py-6 space-y-8">
                    {/* Payments Category */}
                    <section>
                        <h3 className="text-xs font-bold uppercase tracking-widest text-[#A3A3A3]/60 mb-4">Payments & Treasury</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            <button className="flex items-center p-3 bg-[#121212] border border-[#262626] rounded-lg transition-all text-left group hover:border-[#404040] hover:bg-[#1a1a1a]">
                                <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-primary/10 mr-3 group-hover:bg-primary/20 transition-colors">
                                    <span className="material-icons text-primary text-lg shadow-[0_0_8px_rgba(13,89,242,0.6)]">add_card</span>
                                </div>
                                <div>
                                    <div className="font-medium text-sm text-white">Initiate Payout</div>
                                    <div className="text-[11px] text-[#A3A3A3]">Single transaction settlement</div>
                                </div>
                            </button>
                            <button className="flex items-center p-3 bg-[#121212] border border-[#262626] rounded-lg transition-all text-left group hover:border-[#404040] hover:bg-[#1a1a1a]">
                                <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-primary/10 mr-3 group-hover:bg-primary/20 transition-colors">
                                    <span className="material-icons text-primary text-lg shadow-[0_0_8px_rgba(13,89,242,0.6)]">layers</span>
                                </div>
                                <div>
                                    <div className="font-medium text-sm text-white">Bulk Payment</div>
                                    <div className="text-[11px] text-[#A3A3A3]">Upload CSV for mass distribution</div>
                                </div>
                            </button>
                            <button className="flex items-center p-3 bg-[#121212] border border-[#262626] rounded-lg transition-all text-left group hover:border-[#404040] hover:bg-[#1a1a1a]">
                                <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-green-500/10 mr-3 group-hover:bg-green-500/20 transition-colors">
                                    <span className="material-icons text-green-500 text-lg shadow-[0_0_8px_rgba(34,197,94,0.6)]">currency_exchange</span>
                                </div>
                                <div>
                                    <div className="font-medium text-sm text-white">Convert Currency</div>
                                    <div className="text-[11px] text-[#A3A3A3]">FX spot trade at interbank rates</div>
                                </div>
                            </button>
                            <button className="flex items-center p-3 bg-[#121212] border border-[#262626] rounded-lg transition-all text-left group hover:border-[#404040] hover:bg-[#1a1a1a]">
                                <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-green-500/10 mr-3 group-hover:bg-green-500/20 transition-colors">
                                    <span className="material-icons text-green-500 text-lg shadow-[0_0_8px_rgba(34,197,94,0.6)]">move_up</span>
                                </div>
                                <div>
                                    <div className="font-medium text-sm text-white">Internal Transfer</div>
                                    <div className="text-[11px] text-[#A3A3A3]">Move funds between accounts</div>
                                </div>
                            </button>
                        </div>
                    </section>

                    {/* Admin Category */}
                    <section>
                        <h3 className="text-xs font-bold uppercase tracking-widest text-[#A3A3A3]/60 mb-4">Identity & Settings</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            <button className="flex items-center p-3 bg-[#121212] border border-[#262626] rounded-lg transition-all text-left group hover:border-[#404040] hover:bg-[#1a1a1a]">
                                <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-amber-500/10 mr-3 group-hover:bg-amber-500/20 transition-colors">
                                    <span className="material-icons text-amber-500 text-lg shadow-[0_0_8px_rgba(245,158,11,0.6)]">person_add</span>
                                </div>
                                <div>
                                    <div className="font-medium text-sm text-white">Add User</div>
                                    <div className="text-[11px] text-[#A3A3A3]">Invite team member to workspace</div>
                                </div>
                            </button>
                            <button className="flex items-center p-3 bg-[#121212] border border-[#262626] rounded-lg transition-all text-left group hover:border-[#404040] hover:bg-[#1a1a1a]">
                                <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-purple-500/10 mr-3 group-hover:bg-purple-500/20 transition-colors">
                                    <span className="material-icons text-purple-500 text-lg shadow-[0_0_8px_rgba(168,85,247,0.6)]">api</span>
                                </div>
                                <div>
                                    <div className="font-medium text-sm text-white">API Settings</div>
                                    <div className="text-[11px] text-[#A3A3A3]">Manage keys and webhooks</div>
                                </div>
                            </button>
                        </div>
                    </section>
                </div>

                {/* Footer */}
                <div className="px-6 py-4 bg-[#1a1a1a]/50 border-t border-[#262626] flex items-center justify-center">
                    <button className="text-xs font-medium text-primary hover:text-blue-400 transition-colors flex items-center gap-1.5">
                        <span className="material-icons text-sm">settings_suggest</span>
                        Customize Shortcuts
                    </button>
                </div>

                {/* Background Decorative Elements */}
                <div className="absolute top-0 left-0 w-full h-full -z-10 overflow-hidden pointer-events-none opacity-20">
                    <div className="absolute top-[-10%] left-[-5%] w-[40%] h-[40%] bg-primary rounded-full blur-[120px]"></div>
                    <div className="absolute bottom-[-10%] right-[-5%] w-[30%] h-[30%] bg-green-900 rounded-full blur-[100px]"></div>
                </div>
            </div>
        </div>
    );
};

export default QuickActionsModal;
