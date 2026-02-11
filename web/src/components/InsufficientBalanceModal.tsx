import React from 'react';

interface InsufficientBalanceModalProps {
    isOpen: boolean;
    onClose: () => void;
    currentBalance: number;
    requiredAmount: number;
    currency?: string;
}

const InsufficientBalanceModal: React.FC<InsufficientBalanceModalProps> = ({
    isOpen,
    onClose,
    currentBalance = 45000.00,
    requiredAmount = 67500.00,
    currency = 'USDC'
}) => {
    if (!isOpen) return null;

    const shortfall = requiredAmount - currentBalance;
    const progressPercentage = Math.min((currentBalance / requiredAmount) * 100, 100);

    return (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-50 font-display">
            <div className="bg-obsidian-dark w-full max-w-[500px] rounded-xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-border-dark-obsidian overflow-hidden">
                <div className="flex justify-end p-4">
                    <button onClick={onClose} className="text-silver-grey hover:text-white transition-colors">
                        <span className="material-icons text-xl">close</span>
                    </button>
                </div>

                <div className="px-10 pb-10 flex flex-col items-center text-center">
                    <div className="mb-5 bg-amber-500/10 p-4 rounded-full">
                        <span className="material-icons text-5xl text-amber-500">warning</span>
                    </div>

                    <h1 className="text-2xl font-bold text-white mb-2">Insufficient Balance</h1>
                    <p className="text-silver-grey text-sm mb-8 leading-relaxed max-w-sm">
                        You don't have enough funds to execute this payroll batch. Please add funds or modify the batch to proceed.
                    </p>

                    {/* Progress Bar */}
                    <div className="w-full mb-8">
                        <div className="flex justify-between text-[11px] font-bold uppercase tracking-widest text-silver-grey mb-3">
                            <span>Funding Progress</span>
                            <span className="text-primary">{Math.round(progressPercentage)}% Complete</span>
                        </div>
                        <div className="h-2.5 w-full bg-surface-dark rounded-full overflow-hidden flex">
                            <div className="h-full bg-primary transition-all duration-500" style={{ width: `${progressPercentage}%` }}></div>
                            <div className="h-full bg-black flex-grow"></div>
                        </div>
                    </div>

                    {/* Financial Details */}
                    <div className="w-full bg-surface-dark rounded-lg border border-border-dark-obsidian p-5 mb-8">
                        <div className="space-y-4">
                            <div className="flex justify-between items-center">
                                <span className="text-silver-grey text-sm">Current Balance</span>
                                <span className="text-white font-semibold">${currentBalance.toLocaleString('en-US', { minimumFractionDigits: 2 })} {currency}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-silver-grey text-sm">Batch Requires</span>
                                <span className="text-white font-semibold">${requiredAmount.toLocaleString('en-US', { minimumFractionDigits: 2 })} {currency}</span>
                            </div>
                            <div className="pt-4 border-t border-border-dark-obsidian flex justify-between items-center">
                                <span className="text-white font-bold text-sm">Shortfall</span>
                                <span className="text-red-500 font-bold text-xl drop-shadow-[0_0_8px_rgba(239,68,68,0.4)]">-${shortfall.toLocaleString('en-US', { minimumFractionDigits: 2 })} {currency}</span>
                            </div>
                        </div>
                    </div>

                    {/* Quick Deposit Options */}
                    <div className="w-full mb-6">
                        <div className="text-left text-[10px] font-bold text-silver-grey uppercase tracking-widest mb-3">Quick Deposit</div>
                        <div className="grid grid-cols-3 gap-3">
                            {[25000, 30000, 50000].map((amount) => (
                                <button key={amount} className="py-2.5 px-3 border border-border-dark-obsidian hover:border-primary rounded-lg text-sm font-medium text-silver-grey hover:text-white transition-all bg-surface-dark hover:bg-surface-dark/80">
                                    +${(amount / 1000)}k
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Main Actions */}
                    <button className="w-full bg-primary hover:bg-blue-600 text-white font-bold py-4 rounded-lg mb-4 transition-all shadow-lg shadow-primary/20 flex items-center justify-center gap-2">
                        <span className="material-icons text-xl">account_balance_wallet</span>
                        Deposit Funds
                    </button>

                    <div className="grid grid-cols-2 gap-3 w-full">
                        <button className="flex items-center justify-center gap-2 py-3 px-4 border border-border-dark-obsidian rounded-lg text-sm font-bold text-silver-grey hover:bg-surface-dark hover:text-white transition-colors">
                            <span className="material-icons text-lg">edit_note</span>
                            Edit Batch
                        </button>
                        <button className="flex items-center justify-center gap-2 py-3 px-4 border border-border-dark-obsidian rounded-lg text-sm font-bold text-silver-grey hover:bg-surface-dark hover:text-white transition-colors">
                            <span className="material-icons text-lg">call_split</span>
                            Split Batch
                        </button>
                    </div>

                    <div className="mt-8 flex items-center gap-1.5 text-xs text-silver-grey">
                        <span className="material-icons text-sm">info</span>
                        <span>Transfers arrive within 2-4 minutes.</span>
                        <a href="#" className="text-primary hover:text-blue-400 font-semibold ml-1">Need help?</a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InsufficientBalanceModal;
