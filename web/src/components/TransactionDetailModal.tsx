import React from 'react';

interface TransactionDetailModalProps {
    isOpen: boolean;
    onClose: () => void;
    transaction: any; // Ideally replace 'any' with a defined interface
}

const TransactionDetailModal: React.FC<TransactionDetailModalProps> = ({ isOpen, onClose, transaction }) => {
    if (!isOpen || !transaction) return null;

    const isSuccess = transaction.status === 'COMPLETED' || transaction.status === 'SUCCESS';

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200 font-display text-white">
            {/* Transaction Modal Container */}
            <div className="w-full max-w-6xl bg-[#121212] border border-[#262626] rounded-xl shadow-2xl overflow-hidden flex flex-col h-[85vh]">

                {/* Header */}
                <header className="p-6 border-b border-[#262626] flex items-center justify-between shrink-0">
                    <div className="flex items-center gap-4">
                        <div className={`w-12 h-12 rounded-full border flex items-center justify-center ${isSuccess ? 'bg-[#25f46a]/10 border-[#25f46a]/20 shadow-[0_0_8px_rgba(37,244,106,0.4)]' : 'bg-red-500/10 border-red-500/20 shadow-[0_0_8px_rgba(239,68,68,0.4)]'}`}>
                            <span className={`material-icons text-3xl ${isSuccess ? 'text-[#25f46a]' : 'text-red-500'}`}>{isSuccess ? 'check_circle' : 'error'}</span>
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold tracking-tight">{isSuccess ? 'Transaction Confirmed' : 'Transaction Failed'}</h1>
                            <p className="text-[#a3a3a3] text-sm font-mono flex items-center gap-2">
                                Hash: {transaction.hash || '0x71c...a2f9'}
                                <span className="material-icons text-[#3b82f6] text-base cursor-pointer hover:opacity-80">content_copy</span>
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <button className="px-4 py-2 rounded-lg border border-[#262626] hover:bg-white/5 transition-colors text-sm font-medium">
                            Download Receipt
                        </button>
                        <button className="px-4 py-2 rounded-lg bg-[#25f46a] text-black font-bold hover:bg-[#25f46a]/90 transition-colors text-sm">
                            View on Explorer
                        </button>
                        <button onClick={onClose} className="p-2 text-[#a3a3a3] hover:text-white transition-colors">
                            <span className="material-icons">close</span>
                        </button>
                    </div>
                </header>

                <div className="flex-1 flex overflow-hidden">
                    {/* Main Content Column */}
                    <main className="flex-1 overflow-y-auto p-8 custom-scrollbar space-y-10">
                        {/* Summary Section */}
                        <section className="grid grid-cols-3 gap-8">
                            <div className="space-y-1">
                                <label className="text-[#a3a3a3] text-xs uppercase tracking-widest font-semibold">Amount Transferred</label>
                                <div className="text-3xl font-bold">{transaction.amount} {transaction.currency || 'VELO'}</div>
                                <p className="text-[#a3a3a3] text-sm">≈ ${transaction.usdValue || '4,120.32'} USD</p>
                            </div>
                            <div className="space-y-1">
                                <label className="text-[#a3a3a3] text-xs uppercase tracking-widest font-semibold">Network</label>
                                <div className="flex items-center gap-2">
                                    <div className="w-5 h-5 rounded-full bg-[#25f46a]/20 border border-[#25f46a]/40"></div>
                                    <span className="text-lg font-medium">Velo Mainnet</span>
                                </div>
                            </div>
                            <div className="space-y-1">
                                <label className="text-[#a3a3a3] text-xs uppercase tracking-widest font-semibold">Timestamp</label>
                                <div className="text-lg font-medium">{transaction.timestamp || 'Oct 24, 2023 14:22:10'}</div>
                                <p className="text-[#a3a3a3] text-sm">12 seconds ago</p>
                            </div>
                        </section>

                        {/* Addresses Section */}
                        <section className="grid grid-cols-2 gap-6">
                            <div className="p-5 rounded-xl border border-[#262626] bg-white/[0.02]">
                                <div className="flex items-center justify-between mb-4">
                                    <span className="text-[#a3a3a3] text-xs uppercase tracking-widest font-bold">Sender</span>
                                    <span className="material-icons text-[#3b82f6] text-lg cursor-pointer">content_copy</span>
                                </div>
                                <div className="font-mono text-white break-all text-sm leading-relaxed">
                                    {transaction.sender || '0x25f46a9a2f9c8d1e0b3c5a7f9e8d1c2b3a4f5e6a'}
                                </div>
                            </div>
                            <div className="p-5 rounded-xl border border-[#262626] bg-white/[0.02]">
                                <div className="flex items-center justify-between mb-4">
                                    <span className="text-[#a3a3a3] text-xs uppercase tracking-widest font-bold">Recipient</span>
                                    <span className="material-icons text-[#3b82f6] text-lg cursor-pointer">content_copy</span>
                                </div>
                                <div className="font-mono text-white break-all text-sm leading-relaxed">
                                    {transaction.recipient || '0x3b82f6a1c2d3e4f5g6h7i8j9k0l1m2n3o4p5q6r7'}
                                </div>
                            </div>
                        </section>

                        {/* Timeline Section */}
                        <section className="space-y-6">
                            <h3 className="text-[#a3a3a3] text-xs uppercase tracking-widest font-bold">Transaction Timeline</h3>
                            <div className="relative space-y-8 before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-[2px] before:bg-[#262626]">
                                {/* Step 1 */}
                                <div className="relative flex items-start gap-6 pl-10">
                                    <div className="absolute left-0 w-6 h-6 rounded-full bg-[#25f46a] flex items-center justify-center shadow-[0_0_8px_rgba(37,244,106,0.4)] z-10">
                                        <span className="material-icons text-black text-xs font-bold">check</span>
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-white">Transaction Submitted</h4>
                                        <p className="text-[#a3a3a3] text-sm">Broadcast to network nodes</p>
                                    </div>
                                    <span className="ml-auto font-mono text-[#a3a3a3] text-xs">14:22:08</span>
                                </div>
                                {/* Step 2 */}
                                <div className="relative flex items-start gap-6 pl-10">
                                    <div className="absolute left-0 w-6 h-6 rounded-full bg-[#3b82f6] flex items-center justify-center shadow-[0_0_8px_rgba(59,130,246,0.4)] z-10">
                                        <span className="material-icons text-white text-xs">south_east</span>
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-white">Routing & Validation</h4>
                                        <p className="text-[#a3a3a3] text-sm">Verifying signatures and gas limits</p>
                                    </div>
                                    <span className="ml-auto font-mono text-[#a3a3a3] text-xs">14:22:09</span>
                                </div>
                                {/* Step 3 */}
                                <div className="relative flex items-start gap-6 pl-10">
                                    <div className={`absolute left-0 w-6 h-6 rounded-full flex items-center justify-center z-10 ${isSuccess ? 'bg-[#25f46a] shadow-[0_0_8px_rgba(37,244,106,0.4)]' : 'bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.4)]'}`}>
                                        <span className={`material-icons text-xs font-bold ${isSuccess ? 'text-black' : 'text-white'}`}>{isSuccess ? 'check' : 'close'}</span>
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-white">{isSuccess ? 'Confirmed in Block' : 'Transaction Failed'}</h4>
                                        <p className="text-[#a3a3a3] text-sm">{isSuccess ? 'Block height #18,442,109' : 'Reverted on-chain'}</p>
                                    </div>
                                    <span className="ml-auto font-mono text-[#a3a3a3] text-xs">14:22:10</span>
                                </div>
                            </div>
                        </section>

                        {/* Technical Details Grid */}
                        <section className="space-y-6">
                            <h3 className="text-[#a3a3a3] text-xs uppercase tracking-widest font-bold">Technical Specifications</h3>
                            <div className="grid grid-cols-2 gap-x-12 gap-y-6 bg-white/[0.01] p-6 rounded-xl border border-[#262626]">
                                <div className="flex justify-between items-center border-b border-[#262626] pb-3">
                                    <span className="text-[#a3a3a3] text-sm">Gas Limit</span>
                                    <span className="font-mono font-medium">21,000</span>
                                </div>
                                <div className="flex justify-between items-center border-b border-[#262626] pb-3">
                                    <span className="text-[#a3a3a3] text-sm">Gas Used</span>
                                    <span className="font-mono font-medium">21,000 (100%)</span>
                                </div>
                                <div className="flex justify-between items-center border-b border-[#262626] pb-3">
                                    <span className="text-[#a3a3a3] text-sm">Base Fee</span>
                                    <span className="font-mono font-medium">12.5 Gwei</span>
                                </div>
                                <div className="flex justify-between items-center border-b border-[#262626] pb-3">
                                    <span className="text-[#a3a3a3] text-sm">Max Priority Fee</span>
                                    <span className="font-mono font-medium">1.5 Gwei</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-[#a3a3a3] text-sm">Nonce</span>
                                    <span className="font-mono font-medium">452</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-[#a3a3a3] text-sm">Chain ID</span>
                                    <span className="font-mono font-medium">1</span>
                                </div>
                            </div>
                        </section>
                    </main>

                    {/* Sidebar */}
                    <aside className="w-80 border-l border-[#262626] p-6 bg-white/[0.01] overflow-y-auto custom-scrollbar flex flex-col gap-8 hidden lg:flex">
                        {/* Balance Impact Visualization */}
                        <section className="space-y-4">
                            <h3 className="text-[#a3a3a3] text-xs uppercase tracking-widest font-bold">Balance Impact</h3>
                            <div className="space-y-6">
                                <div className="space-y-2">
                                    <div className="flex justify-between text-xs">
                                        <span className="text-[#a3a3a3]">Outgoing Asset</span>
                                        <span className="text-white">-{transaction.amount} {transaction.currency}</span>
                                    </div>
                                    <div className="w-full h-3 bg-[#262626] rounded-full overflow-hidden">
                                        <div className="h-full bg-[#3b82f6] shadow-[0_0_8px_rgba(59,130,246,0.4)]" style={{ width: '75%' }}></div>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <div className="flex justify-between text-xs">
                                        <span className="text-[#a3a3a3]">Network Fees</span>
                                        <span className="text-white">-0.00042 ETH</span>
                                    </div>
                                    <div className="w-full h-3 bg-[#262626] rounded-full overflow-hidden">
                                        <div className="h-full bg-[#a3a3a3]/40" style={{ width: '5%' }}></div>
                                    </div>
                                </div>
                            </div>
                            <div className="p-4 bg-[#25f46a]/5 border border-[#25f46a]/10 rounded-lg mt-4">
                                <p className="text-xs text-[#25f46a]/80 font-medium">
                                    The balance was successfully updated across all decentralized nodes.
                                </p>
                            </div>
                        </section>

                        {/* Network Detail */}
                        <section className="space-y-4">
                            <h3 className="text-[#a3a3a3] text-xs uppercase tracking-widest font-bold">Node Information</h3>
                            <div className="space-y-3">
                                <div className="flex flex-col gap-1">
                                    <span className="text-[#a3a3a3] text-[10px] uppercase font-bold">Block Hash</span>
                                    <span className="font-mono text-[11px] text-white truncate">0x9d4b...4c2e</span>
                                </div>
                                <div className="flex flex-col gap-1">
                                    <span className="text-[#a3a3a3] text-[10px] uppercase font-bold">Validated By</span>
                                    <span className="font-mono text-[11px] text-white">Velo-Validator-04</span>
                                </div>
                                <div className="flex flex-col gap-1">
                                    <span className="text-[#a3a3a3] text-[10px] uppercase font-bold">Consensus Method</span>
                                    <span className="font-mono text-[11px] text-white">PoS V3.1</span>
                                </div>
                            </div>
                        </section>

                        <div className="mt-auto pt-6">
                            <div className="relative w-full h-32 rounded-lg overflow-hidden border border-[#262626]">
                                <img
                                    alt="Abstract Blockchain Map"
                                    className="w-full h-full object-cover opacity-30 grayscale"
                                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuBD0qj756IMVG_vnXaHKYd2Vv6uef2Btlbpe3u0BryqZShevcvnArzCiI3vJNF9465srystZAP1_V3wXLgY3_ryNeAYEYr0N8QzdDlAfIVAqzvjr7VWCjgbpHkheloMFadmOw_BYcC-q3vvO-yjIvo5Lsss21_waSsFo34DvxMrUrYyWeE-NQlwuT0uEKR32Ff9nwrYirII0I-9-SSOyXSe7C6SOCITm_6rvQAAlKz9DTY1iL-p_sZ9TBTYbqZBOnZUq4-I_naFu9OS"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#121212] to-transparent"></div>
                                <div className="absolute bottom-2 left-2 flex items-center gap-1.5">
                                    <div className="w-2 h-2 rounded-full bg-[#25f46a] animate-pulse"></div>
                                    <span className="text-[10px] font-bold text-white uppercase tracking-tighter">Live Network Feed</span>
                                </div>
                            </div>
                        </div>
                    </aside>
                </div>

                {/* Footer Actions */}
                <footer className="p-6 border-t border-[#262626] flex justify-end gap-3 shrink-0 bg-white/[0.01]">
                    <button className="px-6 py-2.5 rounded-lg border border-[#262626] hover:border-[#a3a3a3] transition-colors font-semibold text-sm">
                        Flag Transaction
                    </button>
                    <button onClick={onClose} className="px-6 py-2.5 rounded-lg bg-white text-black hover:bg-[#a3a3a3] transition-colors font-bold text-sm">
                        Close
                    </button>
                </footer>
            </div>
        </div>
    );
};

export default TransactionDetailModal;
