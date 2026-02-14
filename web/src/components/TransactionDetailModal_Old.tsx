import React from 'react';

interface TransactionDetailModalProps {
    isOpen: boolean;
    onClose: () => void;
    transaction: any; // Using any for simplicity in this mock, ideally defined interface
}

const TransactionDetailModal: React.FC<TransactionDetailModalProps> = ({ isOpen, onClose, transaction }) => {
    if (!isOpen || !transaction) return null;

    const isSuccess = transaction.status === 'COMPLETED';

    return (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-xl z-50 flex items-center justify-center p-4 font-display">
            {isSuccess ? (
                // SUCCESS STATE
                <div className="w-full max-w-[900px] bg-card-midnight border border-border-dark-obsidian rounded-xl shadow-2xl overflow-hidden animate-blob">
                    {/* Header / Banner Section */}
                    <div className="p-8 border-b border-border-dark-obsidian text-center relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-50"></div>
                        <div className="flex flex-col items-center">
                            <div className="mb-4">
                                <span className="material-icons text-green-500 text-5xl drop-shadow-[0_0_8px_rgba(34,197,94,0.5)]">check_circle</span>
                            </div>
                            <h2 className="text-silver-grey text-sm font-medium uppercase tracking-widest mb-2">Transaction Successful</h2>
                            <div className="text-5xl font-bold text-white shadow-neon-primary mb-2">
                                ${transaction.amount} <span className="text-xl text-silver-grey font-normal tracking-normal uppercase">USD</span>
                            </div>
                            <div className="flex items-center gap-2 text-silver-grey text-sm bg-background-dark/50 px-3 py-1 rounded-full border border-border-dark-obsidian">
                                <span className="w-2 h-2 rounded-full bg-green-500"></span>
                                Finalized on Ethereum Mainnet
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-12 gap-0">
                        {/* Left Column: Timeline */}
                        <div className="md:col-span-4 border-r border-border-dark-obsidian p-8 bg-background-dark/20">
                            <h3 className="text-xs font-semibold text-silver-grey uppercase tracking-widest mb-8">Process Timeline</h3>
                            <div className="space-y-8">
                                {/* Step 1 */}
                                <div className="relative flex gap-4">
                                    <div className="absolute left-[11px] top-6 bottom-[-24px] w-[2px] bg-primary"></div>
                                    <div className="relative z-10 w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                                        <span className="material-icons text-[14px] text-white">check</span>
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-white">Payment Initiated</p>
                                        <p className="text-xs text-silver-grey">Oct 24, 2023 • 14:20:05</p>
                                    </div>
                                </div>
                                {/* Step 2 */}
                                <div className="relative flex gap-4">
                                    <div className="absolute left-[11px] top-6 bottom-[-24px] w-[2px] bg-primary"></div>
                                    <div className="relative z-10 w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                                        <span className="material-icons text-[14px] text-white">sync</span>
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-white">Validation Complete</p>
                                        <p className="text-xs text-silver-grey">Oct 24, 2023 • 14:20:12</p>
                                    </div>
                                </div>
                                {/* Step 3 */}
                                <div className="relative flex gap-4">
                                    <div className="absolute left-[11px] top-6 bottom-[-24px] w-[2px] bg-primary"></div>
                                    <div className="relative z-10 w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                                        <span className="material-icons text-[14px] text-white">link</span>
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-white">Blockchain Confirmed</p>
                                        <p className="text-xs text-silver-grey">Oct 24, 2023 • 14:21:45</p>
                                    </div>
                                </div>
                                {/* Step 4 */}
                                <div className="relative flex gap-4">
                                    <div className="relative z-10 w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                                        <span className="material-icons text-[14px] text-white">flag</span>
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-white">Funds Disbursed</p>
                                        <p className="text-xs text-silver-grey">Oct 24, 2023 • 14:22:01</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right Column: Metadata & Blockchain Data */}
                        <div className="md:col-span-8 p-8">
                            <div className="grid grid-cols-2 gap-y-8 gap-x-12 mb-10">
                                <div>
                                    <label className="block text-xs font-medium text-silver-grey uppercase tracking-wider mb-1">Sender Address</label>
                                    <div className="flex items-center gap-2 group cursor-pointer">
                                        <span className="text-sm text-white font-mono">0x71C...492E</span>
                                        <span className="material-icons text-silver-grey text-sm group-hover:text-primary transition-colors">content_copy</span>
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-silver-grey uppercase tracking-wider mb-1">Recipient Address</label>
                                    <div className="flex items-center gap-2 group cursor-pointer">
                                        <span className="text-sm text-white font-mono">0x4B2...F881</span>
                                        <span className="material-icons text-silver-grey text-sm group-hover:text-primary transition-colors">content_copy</span>
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-silver-grey uppercase tracking-wider mb-1">Asset Method</label>
                                    <div className="flex items-center gap-2">
                                        <div className="w-5 h-5 rounded-full bg-white flex items-center justify-center">
                                            <span className="material-icons text-black text-[12px]">monetization_on</span>
                                        </div>
                                        <span className="text-sm text-white font-medium">USDC (ERC-20)</span>
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-silver-grey uppercase tracking-wider mb-1">Network Fee</label>
                                    <span className="text-sm text-white">0.0024 ETH ($4.12)</span>
                                </div>
                            </div>

                            {/* Technical Blockchain Details Card */}
                            <div className="bg-background-dark/40 border border-border-dark-obsidian rounded-lg p-5 mb-4">
                                <h4 className="text-xs font-semibold text-white mb-4 flex items-center gap-2 uppercase tracking-widest">
                                    <span className="material-icons text-primary text-sm">terminal</span>
                                    Technical Details
                                </h4>
                                <div className="space-y-4">
                                    <div className="flex justify-between items-center py-2 border-b border-border-dark-obsidian/50">
                                        <span className="text-xs text-silver-grey">Transaction Hash</span>
                                        <div className="flex items-center gap-2 group cursor-pointer">
                                            <span className="text-xs text-white font-mono">0x9f8e7d6c5b4a3f2e1d0c9b8a7f6e5d4c3b2a1f0e</span>
                                            <span className="material-icons text-silver-grey text-xs group-hover:text-primary">launch</span>
                                        </div>
                                    </div>
                                    <div className="flex justify-between items-center py-2 border-b border-border-dark-obsidian/50">
                                        <span className="text-xs text-silver-grey">Block Height</span>
                                        <span className="text-xs text-white font-mono">18,432,901</span>
                                    </div>
                                    <div className="flex justify-between items-center py-2">
                                        <span className="text-xs text-silver-grey">Confirmations</span>
                                        <span className="text-xs text-green-400 font-medium">64 Confirmations</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Footer Actions */}
                    <div className="p-6 bg-background-dark/40 border-t border-border-dark-obsidian flex flex-col md:flex-row items-center justify-between gap-4">
                        <div className="flex items-center gap-4">
                            <button className="bg-primary hover:bg-primary/90 text-white px-6 py-2.5 rounded-lg text-sm font-medium transition-all flex items-center gap-2 shadow-lg shadow-primary/20">
                                <span className="material-icons text-sm">download</span>
                                Download Receipt
                            </button>
                            <button className="border border-border-dark-obsidian hover:bg-border-dark-obsidian/40 text-white px-6 py-2.5 rounded-lg text-sm font-medium transition-all flex items-center gap-2">
                                <span className="material-icons text-sm">explore</span>
                                View on Etherscan
                            </button>
                        </div>
                        <button onClick={onClose} className="text-silver-grey hover:text-white transition-colors text-sm font-medium flex items-center gap-1">
                            Close Details
                            <span className="material-icons text-sm">close</span>
                        </button>
                    </div>
                </div>
            ) : (
                // FAILED STATE
                <div className="relative z-10 w-full max-w-4xl bg-obsidian-dark border border-border-dark-obsidian shadow-2xl rounded-xl overflow-hidden flex flex-col max-h-[90vh]">
                    <div className="bg-error-deep px-6 py-3 flex items-center justify-between text-white border-b border-border-dark-obsidian">
                        <div className="flex items-center gap-2">
                            <span className="material-icons text-xl">error_outline</span>
                            <span className="font-semibold uppercase tracking-wider text-sm">Payment Failed</span>
                        </div>
                        <button onClick={onClose} className="hover:bg-white/10 p-1 rounded-full transition-colors text-white/70 hover:text-white">
                            <span className="material-icons text-xl">close</span>
                        </button>
                    </div>

                    <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-8 bg-black">
                        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                            <div>
                                <h1 className="text-2xl font-bold text-white">Payment Details</h1>
                                <p className="text-silver-grey text-sm mt-1">Ref: {transaction.ref}</p>
                            </div>
                            <div className="text-right">
                                <div className="text-3xl font-bold text-white">${transaction.amount}</div>
                                <div className="flex items-center justify-end gap-1 text-red-400 font-medium text-sm">
                                    <span className="material-icons text-sm">report_problem</span>
                                    Failed Transaction
                                </div>
                            </div>
                        </div>

                        <div className="bg-error-bg border border-red-900/30 rounded-lg p-5">
                            <div className="flex items-start gap-4">
                                <div className="bg-red-950/40 p-2 rounded-lg border border-red-900/20">
                                    <span className="material-icons text-red-500">terminal</span>
                                </div>
                                <div className="space-y-1">
                                    <h3 className="font-bold text-white">Transaction reverted: Insufficient gas</h3>
                                    <p className="text-pink-300 text-sm leading-relaxed">
                                        The transaction was submitted but the network execution ran out of gas. This usually happens when market volatility causes gas prices to spike during processing.
                                    </p>
                                    <div className="mt-3 inline-flex items-center px-2 py-1 bg-red-950/50 rounded text-xs font-mono text-red-400 border border-red-900/30">
                                        ERR_GAS_002
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            <div className="lg:col-span-2 space-y-8">
                                <div className="grid grid-cols-2 gap-y-6 gap-x-4">
                                    <div>
                                        <label className="text-xs font-bold text-silver-grey uppercase tracking-widest block mb-1">Recipient</label>
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded bg-primary/10 border border-primary/20 flex items-center justify-center">
                                                <span className="material-icons text-primary text-sm">business</span>
                                            </div>
                                            <span className="font-medium text-white text-sm">{transaction.name}</span>
                                        </div>
                                    </div>
                                    <div>
                                        <label className="text-xs font-bold text-silver-grey uppercase tracking-widest block mb-1">Payment Date</label>
                                        <div className="flex items-center gap-2 text-sm text-white">
                                            <span className="material-icons text-sm text-silver-grey">calendar_today</span>
                                            Oct 24, 2023, 14:22
                                        </div>
                                    </div>
                                    <div>
                                        <label className="text-xs font-bold text-silver-grey uppercase tracking-widest block mb-1">Network</label>
                                        <div className="flex items-center gap-2 text-sm text-white font-medium">
                                            <span className="w-2 h-2 rounded-full bg-white"></span>
                                            Velo Mainnet (ERC-20)
                                        </div>
                                    </div>
                                    <div>
                                        <label className="text-xs font-bold text-silver-grey uppercase tracking-widest block mb-1">Transaction Hash</label>
                                        <div className="flex items-center gap-2">
                                            <span className="text-sm font-mono text-silver-grey truncate max-w-[120px]">0x72a...f92c</span>
                                            <button className="text-primary hover:text-blue-400 flex items-center transition-colors">
                                                <span className="material-icons text-sm">content_copy</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <hr className="border-border-dark-obsidian" />
                                <div className="space-y-4">
                                    <h4 className="font-semibold text-white flex items-center gap-2">
                                        <span className="material-icons text-primary">psychology_alt</span>
                                        Recommended Steps
                                    </h4>
                                    <ul className="space-y-4">
                                        <li className="flex items-start gap-3 group">
                                            <div className="w-5 h-5 rounded-full border-2 border-primary flex items-center justify-center flex-shrink-0 mt-0.5">
                                                <span className="text-[10px] font-bold text-primary">1</span>
                                            </div>
                                            <p className="text-sm text-silver-grey">
                                                Check your <a className="text-primary hover:text-blue-400 transition-colors" href="#">wallet balance</a> to ensure you have enough native currency for gas fees.
                                            </p>
                                        </li>
                                        <li className="flex items-start gap-3 group">
                                            <div className="w-5 h-5 rounded-full border-2 border-primary flex items-center justify-center flex-shrink-0 mt-0.5">
                                                <span className="text-[10px] font-bold text-primary">2</span>
                                            </div>
                                            <p className="text-sm text-silver-grey">
                                                Adjust gas settings to "Aggressive" or "Market" in your browser extension or Velo settings.
                                            </p>
                                        </li>
                                        <li className="flex items-start gap-3 group">
                                            <div className="w-5 h-5 rounded-full border-2 border-primary flex items-center justify-center flex-shrink-0 mt-0.5">
                                                <span className="text-[10px] font-bold text-primary">3</span>
                                            </div>
                                            <p className="text-sm text-silver-grey">
                                                Retry the transaction after 1-2 minutes once network congestion subsides.
                                            </p>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className="bg-surface-dark rounded-lg p-6 space-y-6 h-fit border border-border-dark-obsidian">
                                <h4 className="font-semibold text-white text-sm">Transaction Timeline</h4>
                                <div className="relative space-y-8 before:absolute before:inset-0 before:ml-[11px] before:-z-10 before:h-full before:w-0.5 before:bg-border-dark-obsidian">
                                    <div className="relative flex items-start gap-4">
                                        <div className="w-6 h-6 rounded-full bg-green-900/40 border border-green-500/50 flex items-center justify-center text-green-400 flex-shrink-0">
                                            <span className="material-icons text-sm">check</span>
                                        </div>
                                        <div className="flex-1">
                                            <p className="text-xs font-bold text-white">Initiated</p>
                                            <p className="text-[10px] text-silver-grey">14:21:05</p>
                                        </div>
                                    </div>
                                    <div className="relative flex items-start gap-4">
                                        <div className="w-6 h-6 rounded-full bg-green-900/40 border border-green-500/50 flex items-center justify-center text-green-400 flex-shrink-0">
                                            <span className="material-icons text-sm">check</span>
                                        </div>
                                        <div className="flex-1">
                                            <p className="text-xs font-bold text-white">Authorized</p>
                                            <p className="text-[10px] text-silver-grey">14:21:12</p>
                                        </div>
                                    </div>
                                    <div className="relative flex items-start gap-4">
                                        <div className="w-6 h-6 rounded-full bg-error-deep flex items-center justify-center text-white flex-shrink-0 ring-4 ring-red-900/20">
                                            <span className="material-icons text-sm">close</span>
                                        </div>
                                        <div className="flex-1">
                                            <p className="text-xs font-bold text-red-500">Failed on Chain</p>
                                            <p className="text-[10px] text-silver-grey">14:22:45</p>
                                        </div>
                                    </div>
                                    <div className="relative flex items-start gap-4 opacity-30">
                                        <div className="w-6 h-6 rounded-full bg-border-dark-obsidian flex items-center justify-center text-silver-grey flex-shrink-0">
                                            <span className="material-icons text-sm">receipt_long</span>
                                        </div>
                                        <div className="flex-1">
                                            <p className="text-xs font-bold text-silver-grey">Settled</p>
                                            <p className="text-[10px] text-silver-grey">Pending</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="border-t border-border-dark-obsidian p-6 bg-surface-dark flex flex-col sm:flex-row items-center justify-between gap-4">
                        <div className="flex items-center gap-2 text-sm text-silver-grey">
                            <span className="material-icons text-sm">help_outline</span>
                            Need assistance? <a className="text-primary font-medium hover:text-blue-400 transition-colors" href="#">Contact Support</a>
                        </div>
                        <div className="flex gap-3 w-full sm:w-auto">
                            <button onClick={onClose} className="flex-1 sm:flex-none px-6 py-2.5 rounded border border-border-dark-obsidian text-white font-semibold hover:bg-white/5 transition-colors">
                                Cancel
                            </button>
                            <button className="flex-1 sm:flex-none px-8 py-2.5 rounded bg-primary hover:bg-blue-700 text-white font-semibold flex items-center justify-center gap-2 shadow-lg shadow-blue-950/40 transition-all">
                                <span className="material-icons text-sm">refresh</span>
                                Retry Payment
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TransactionDetailModal;
