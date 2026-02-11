import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import TransactionDetailModal from '../components/TransactionDetailModal';
import DuplicateBatchModal from '../components/DuplicateBatchModal';
import DeleteBatchModal from '../components/DeleteBatchModal';
import ExportBatchModal from '../components/ExportBatchModal';
import ScheduleBatchModal from '../components/ScheduleBatchModal';
import CancelBatchModal from '../components/CancelBatchModal';
import RetryPaymentsModal from '../components/RetryPaymentsModal';

const PayrollBatchDetail: React.FC = () => {
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    const [activeTab, setActiveTab] = useState<'payments' | 'activity'>('payments');
    const [selectedTransaction, setSelectedTransaction] = useState<any>(null);

    // Modal States
    const [isDuplicateModalOpen, setIsDuplicateModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isExportModalOpen, setIsExportModalOpen] = useState(false);
    const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);
    const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
    const [isRetryModalOpen, setIsRetryModalOpen] = useState(false);

    // Mock Data for Payments
    const transactions = [
        { id: '1', name: 'Acme Logistics Corp', type: 'Vendor Payment', initials: 'AL', color: 'primary', account: 'US88 9201 2281 9901', amount: '45,200.00', status: 'COMPLETED', ref: 'TXN-9021-X99' },
        { id: '2', name: 'Global Holdings Inc', type: 'Dividends', initials: 'GH', color: 'purple', account: 'GB41 BARC 4001 0291', amount: '12,850.50', status: 'FAILED', ref: 'TXN-4412-Z01' }, // Changed to FAILED for testing
        { id: '3', name: 'Nexus Property Group', type: 'Commercial Lease', initials: 'NP', color: 'orange', account: 'US12 7721 0092 5511', amount: '210,000.00', status: 'PENDING', ref: 'TXN-8822-M44' },
        { id: '4', name: 'Stellar Tech Sol.', type: 'Cloud Infrastructure', initials: 'ST', color: 'blue', account: 'DE81 COMM 0991 1233', amount: '8,440.00', status: 'COMPLETED', ref: 'TXN-1102-S22' },
        { id: '5', name: 'Riverstone Venture', type: 'Cap Call', initials: 'RV', color: 'pink', account: 'KY12 BONY 5510 0022', amount: '500,000.00', status: 'COMPLETED', ref: 'TXN-3392-L19' },
    ];

    return (
        <div className="flex min-h-screen bg-black text-white font-display antialiased selection:bg-primary/30">
            {/* Sidebar Navigation (Condensed) */}
            <aside className="w-20 flex flex-col items-center py-6 border-r border-border-dark-obsidian bg-black fixed h-full z-10 transition-all duration-300">
                <div className="mb-10">
                    <div className="w-10 h-10 bg-primary rounded flex items-center justify-center cursor-pointer hover:shadow-[0_0_15px_rgba(25,73,230,0.5)] transition-shadow" onClick={() => navigate('/payroll')}>
                        <span className="material-icons text-white">bolt</span>
                    </div>
                </div>
                <nav className="flex flex-col gap-8">
                    <button onClick={() => navigate('/payroll')} className="text-silver-grey hover:text-primary transition-colors"><span className="material-icons">dashboard</span></button>
                    <button className="text-primary"><span className="material-icons">account_balance_wallet</span></button>
                    <button className="text-silver-grey hover:text-primary transition-colors"><span className="material-icons">receipt_long</span></button>
                    <button className="text-silver-grey hover:text-primary transition-colors"><span className="material-icons">analytics</span></button>
                    <button className="text-silver-grey hover:text-primary transition-colors"><span className="material-icons">settings</span></button>
                </nav>
                <div className="mt-auto">
                    <div className="w-10 h-10 rounded-full border border-border-dark-obsidian bg-primary/20 flex items-center justify-center text-xs font-bold text-white">OP</div>
                </div>
            </aside>

            {/* Main Content Area */}
            <main className="flex-1 flex flex-col h-screen overflow-hidden ml-20 bg-black">
                {/* Global Header */}
                <header className="h-auto border-b border-border-dark-obsidian bg-black shrink-0 px-8 pt-6 pb-0 sticky top-0 z-20">
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-4">
                            <button onClick={() => navigate('/payroll')} className="text-silver-grey hover:text-white transition-colors">
                                <span className="material-icons">arrow_back</span>
                            </button>
                            <div className="flex items-center gap-3">
                                <h1 className="text-2xl font-bold text-white tracking-tight">Batch #{id || '8842-VX'}</h1>
                                <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-900/40 text-blue-400 border border-blue-800 flex items-center gap-1">
                                    <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse"></span>
                                    In Progress
                                </span>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <button onClick={() => setIsExportModalOpen(true)} className="w-10 h-10 rounded-lg bg-surface-dark border border-border-dark-obsidian flex items-center justify-center text-silver-grey hover:text-white hover:bg-white/[0.05] transition-colors" title="Export Batch">
                                <span className="material-icons text-xl">ios_share</span>
                            </button>
                            <button onClick={() => setIsDuplicateModalOpen(true)} className="w-10 h-10 rounded-lg bg-surface-dark border border-border-dark-obsidian flex items-center justify-center text-silver-grey hover:text-white hover:bg-white/[0.05] transition-colors" title="Duplicate Batch">
                                <span className="material-icons text-xl">content_copy</span>
                            </button>
                            <button onClick={() => setIsScheduleModalOpen(true)} className="w-10 h-10 rounded-lg bg-surface-dark border border-border-dark-obsidian flex items-center justify-center text-silver-grey hover:text-white hover:bg-white/[0.05] transition-colors" title="Schedule Execution">
                                <span className="material-icons text-xl">schedule</span>
                            </button>
                            <button onClick={() => setIsRetryModalOpen(true)} className="w-10 h-10 rounded-lg bg-surface-dark border border-border-dark-obsidian flex items-center justify-center text-silver-grey hover:text-white hover:bg-white/[0.05] transition-colors" title="Retry Failed Payments">
                                <span className="material-icons text-xl">refresh</span>
                            </button>
                            <button onClick={() => setIsCancelModalOpen(true)} className="w-10 h-10 rounded-lg bg-surface-dark border border-border-dark-obsidian flex items-center justify-center text-silver-grey hover:text-white hover:bg-white/[0.05] transition-colors" title="Cancel Execution">
                                <span className="material-icons text-xl">block</span>
                            </button>
                            <button onClick={() => setIsDeleteModalOpen(true)} className="w-10 h-10 rounded-lg bg-surface-dark border border-border-dark-obsidian flex items-center justify-center text-red-500 hover:text-red-400 hover:bg-red-500/10 transition-colors" title="Delete Batch">
                                <span className="material-icons text-xl">delete_outline</span>
                            </button>
                        </div>
                    </div>

                    {/* Summary Stats Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                        <div className="p-4 bg-surface-dark rounded-xl border border-border-dark-obsidian hover:border-white/10 transition-colors">
                            <p className="text-xs text-silver-grey font-medium mb-1 uppercase tracking-wider">Total Value</p>
                            <p className="text-lg font-bold text-white">$1,284,550.00</p>
                        </div>
                        <div className="p-4 bg-surface-dark rounded-xl border border-border-dark-obsidian hover:border-white/10 transition-colors">
                            <p className="text-xs text-silver-grey font-medium mb-1 uppercase tracking-wider">Item Count</p>
                            <p className="text-lg font-bold text-white">428 Transactions</p>
                        </div>
                        <div className="p-4 bg-surface-dark rounded-xl border border-border-dark-obsidian hover:border-white/10 transition-colors">
                            <p className="text-xs text-silver-grey font-medium mb-1 uppercase tracking-wider">Created Date</p>
                            <p className="text-lg font-bold text-white">Oct 24, 2023</p>
                        </div>
                        <div className="p-4 bg-surface-dark rounded-xl border border-border-dark-obsidian hover:border-white/10 transition-colors">
                            <p className="text-xs text-silver-grey font-medium mb-1 uppercase tracking-wider">Current Step</p>
                            <p className="text-lg font-bold text-blue-400">Pending Execution</p>
                        </div>
                    </div>

                    {/* Tabs */}
                    <div className="flex gap-8 border-b border-border-dark-obsidian">
                        <button className="pb-3 text-sm font-medium text-silver-grey hover:text-white transition-colors relative">
                            General Info
                        </button>
                        <button
                            onClick={() => setActiveTab('payments')}
                            className={`pb-3 text-sm font-medium transition-colors relative ${activeTab === 'payments' ? 'text-primary' : 'text-silver-grey hover:text-white'}`}
                        >
                            Payments
                            {activeTab === 'payments' && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-primary shadow-[0_0_8px_rgba(25,73,230,0.8)]"></div>}
                        </button>
                        <button
                            onClick={() => setActiveTab('activity')}
                            className={`pb-3 text-sm font-medium transition-colors relative ${activeTab === 'activity' ? 'text-primary' : 'text-silver-grey hover:text-white'}`}
                        >
                            Activity Log
                            {activeTab === 'activity' && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-primary shadow-[0_0_8px_rgba(25,73,230,0.8)]"></div>}
                        </button>
                        <button className="pb-3 text-sm font-medium text-silver-grey hover:text-white transition-colors">
                            Documents
                        </button>
                    </div>
                </header>

                {/* Scrollable Content */}
                <div className="flex-1 overflow-y-auto custom-scrollbar p-8">
                    {activeTab === 'payments' ? (
                        <>
                            {/* Transaction List Header & Actions */}
                            <div className="mb-4 flex flex-col md:flex-row justify-between items-center gap-4">
                                <div className="flex items-center bg-surface-dark border border-border-dark-obsidian rounded-lg px-3 py-2 w-full md:w-96 transition-colors focus-within:border-primary/50">
                                    <span className="material-icons text-silver-grey mr-2 text-sm">search</span>
                                    <input className="bg-transparent border-none text-sm w-full focus:ring-0 outline-none text-white placeholder:text-silver-grey/50" placeholder="Search transactions, IDs, or accounts..." type="text" />
                                </div>
                                <div className="flex items-center gap-3 w-full md:w-auto">
                                    <button className="flex items-center gap-2 px-3 py-2 bg-surface-dark border border-border-dark-obsidian rounded-lg text-xs font-medium hover:bg-white/5 text-silver-grey hover:text-white transition-all">
                                        <span className="material-icons text-sm">filter_list</span>
                                        Filters
                                    </button>
                                    <div className="h-6 w-[1px] bg-border-dark-obsidian mx-1"></div>
                                    <div className="flex items-center gap-1 bg-surface-dark border border-border-dark-obsidian rounded-lg p-1">
                                        <button className="p-1 px-2 bg-primary rounded text-xs font-medium text-white shadow-sm">List</button>
                                        <button className="p-1 px-2 text-silver-grey hover:text-white text-xs font-medium">Grid</button>
                                    </div>
                                </div>
                            </div>

                            {/* Data Table */}
                            <div className="bg-surface-dark border border-border-dark-obsidian rounded-xl overflow-hidden shadow-lg shadow-black/50">
                                <div className="overflow-x-auto custom-scrollbar">
                                    <table className="w-full text-left border-collapse">
                                        <thead>
                                            <tr className="bg-white/5 border-b border-border-dark-obsidian">
                                                <th className="px-6 py-4 text-[11px] font-semibold text-silver-grey uppercase tracking-widest">
                                                    <div className="flex items-center gap-1 cursor-pointer hover:text-white transition-colors">Recipient <span className="material-icons text-[12px]">arrow_downward</span></div>
                                                </th>
                                                <th className="px-6 py-4 text-[11px] font-semibold text-silver-grey uppercase tracking-widest">Account Number</th>
                                                <th className="px-6 py-4 text-[11px] font-semibold text-silver-grey uppercase tracking-widest text-right">Amount</th>
                                                <th className="px-6 py-4 text-[11px] font-semibold text-silver-grey uppercase tracking-widest">Status</th>
                                                <th className="px-6 py-4 text-[11px] font-semibold text-silver-grey uppercase tracking-widest">Reference ID</th>
                                                <th className="px-6 py-4 text-[11px] font-semibold text-silver-grey uppercase tracking-widest text-center">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-border-dark-obsidian">
                                            {transactions.map((txn, index) => (
                                                <tr key={index} className="hover:bg-white/[0.03] transition-colors group cursor-pointer">
                                                    <td className="px-6 py-4">
                                                        <div className="flex items-center gap-3">
                                                            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-bold 
                                                                ${txn.color === 'primary' ? 'bg-primary/20 text-primary' :
                                                                    txn.color === 'purple' ? 'bg-purple-500/20 text-purple-400' :
                                                                        txn.color === 'orange' ? 'bg-orange-500/20 text-orange-400' :
                                                                            txn.color === 'blue' ? 'bg-blue-500/20 text-blue-400' :
                                                                                'bg-pink-500/20 text-pink-400'}`}>
                                                                {txn.initials}
                                                            </div>
                                                            <div>
                                                                <div className="text-sm font-semibold text-white group-hover:text-primary transition-colors">{txn.name}</div>
                                                                <div className="text-[10px] text-silver-grey uppercase">{txn.type}</div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 font-mono text-xs text-silver-grey">{txn.account}</td>
                                                    <td className="px-6 py-4 text-right">
                                                        <div className="text-sm font-bold text-white">${txn.amount}</div>
                                                        <div className="text-[10px] text-silver-grey">USD</div>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <span className={`px-2 py-0.5 border rounded-md text-[10px] font-bold 
                                                            ${txn.status === 'COMPLETED' ? 'bg-green-500/10 text-green-500 border-green-500/20' :
                                                                'bg-yellow-500/10 text-yellow-500 border-yellow-500/20'}`}>
                                                            {txn.status}
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4 font-mono text-[10px] text-silver-grey">{txn.ref}</td>
                                                    <td className="px-6 py-4 text-center">
                                                        <button className="text-silver-grey hover:text-white transition-colors"><span className="material-icons text-sm">more_horiz</span></button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                                <div className="px-6 py-4 border-t border-border-dark-obsidian flex items-center justify-between">
                                    <p className="text-[11px] text-silver-grey uppercase">Showing 1-5 of 428 Transactions</p>
                                    <div className="flex items-center gap-2">
                                        <button className="w-8 h-8 border border-border-dark-obsidian flex items-center justify-center rounded-md text-silver-grey hover:bg-white/5 transition-all">
                                            <span className="material-icons text-sm">chevron_left</span>
                                        </button>
                                        <button className="w-8 h-8 bg-primary flex items-center justify-center rounded-md text-white text-xs font-bold shadow-md shadow-primary/20">1</button>
                                        <button className="w-8 h-8 border border-border-dark-obsidian flex items-center justify-center rounded-md text-silver-grey hover:bg-white/5 transition-all text-xs font-bold">2</button>
                                        <button className="w-8 h-8 border border-border-dark-obsidian flex items-center justify-center rounded-md text-silver-grey hover:bg-white/5 transition-all">
                                            <span className="material-icons text-sm">chevron_right</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </>
                    ) : (
                        <div className="max-w-4xl mx-auto py-4">
                            <div className="relative">
                                {/* Vertical Line connection */}
                                <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-border-dark-obsidian"></div>
                                <div className="space-y-12">
                                    {/* Item 1: Execution Started */}
                                    <div className="relative flex gap-6">
                                        <div className="relative z-10 w-12 h-12 flex items-center justify-center rounded-full bg-blue-900/30 text-blue-400 border-4 border-black">
                                            <span className="material-icons text-xl font-bold">play_arrow</span>
                                        </div>
                                        <div className="flex-1 pt-1">
                                            <div className="bg-surface-dark rounded-xl border border-border-dark-obsidian p-5 shadow-lg shadow-black/30 hover:border-white/10 transition-colors">
                                                <div className="flex justify-between items-start mb-2">
                                                    <h3 className="text-sm font-bold uppercase tracking-tight text-white">Execution Started</h3>
                                                    <span className="text-xs text-silver-grey">Oct 24, 2023, 14:22:01</span>
                                                </div>
                                                <p className="text-sm text-silver-grey mb-4">The batch execution was triggered via API call to the processing engine.</p>
                                                <div className="p-3 bg-obsidian-lighter rounded-lg border border-border-dark-obsidian">
                                                    <div className="flex items-center justify-between text-xs mb-2">
                                                        <span className="font-semibold text-silver-grey">Technical Details</span>
                                                        <span className="material-icons text-sm text-silver-grey">expand_less</span>
                                                    </div>
                                                    <code className="text-xs text-silver-grey block font-mono leading-relaxed">
                                                        Request ID: req_9a2f_8812_bb01<br />
                                                        Origin: System (Automated Trigger)<br />
                                                        Endpoint: /v1/batch/execute
                                                    </code>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Item 2: Approved */}
                                    <div className="relative flex gap-6">
                                        <div className="relative z-10 w-12 h-12 flex items-center justify-center rounded-full bg-emerald-900/30 text-emerald-400 border-4 border-black">
                                            <span className="material-icons text-xl font-bold">verified</span>
                                        </div>
                                        <div className="flex-1 pt-1">
                                            <div className="bg-surface-dark rounded-xl border border-border-dark-obsidian p-5 shadow-lg shadow-black/30 hover:border-white/10 transition-colors">
                                                <div className="flex justify-between items-start mb-3">
                                                    <h3 className="text-sm font-bold uppercase tracking-tight text-white">Approved</h3>
                                                    <span className="text-xs text-silver-grey">Oct 24, 2023, 14:05:45</span>
                                                </div>
                                                <div className="flex items-center gap-3">
                                                    <div className="w-8 h-8 rounded-full border border-border-dark-obsidian bg-primary/20 flex items-center justify-center text-xs font-bold text-white">MT</div>
                                                    <div>
                                                        <p className="text-sm font-medium text-white">Mark Thompson <span className="text-silver-grey font-normal">applied digital signature</span></p>
                                                        <p className="text-xs text-silver-grey italic">"Verified against internal payroll ledger. Approved for disbursement."</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Item 3: Approval Requested */}
                                    <div className="relative flex gap-6">
                                        <div className="relative z-10 w-12 h-12 flex items-center justify-center rounded-full bg-amber-900/30 text-amber-500 border-4 border-black">
                                            <span className="material-icons text-xl font-bold">assignment_late</span>
                                        </div>
                                        <div className="flex-1 pt-1">
                                            <div className="bg-surface-dark rounded-xl border border-border-dark-obsidian p-5 shadow-lg shadow-black/30 hover:border-white/10 transition-colors">
                                                <div className="flex justify-between items-start mb-2">
                                                    <h3 className="text-sm font-bold uppercase tracking-tight text-white">Approval Requested</h3>
                                                    <span className="text-xs text-silver-grey">Oct 24, 2023, 13:42:12</span>
                                                </div>
                                                <p className="text-sm text-silver-grey">System automatically routed batch to Tier 2 Approval queue after successful validation.</p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Item 4: System Validation */}
                                    <div className="relative flex gap-6">
                                        <div className="relative z-10 w-12 h-12 flex items-center justify-center rounded-full bg-blue-900/30 text-blue-400 border-4 border-black">
                                            <span className="material-icons text-xl font-bold">auto_fix_high</span>
                                        </div>
                                        <div className="flex-1 pt-1">
                                            <div className="bg-surface-dark rounded-xl border border-border-dark-obsidian p-5 shadow-lg shadow-black/30 hover:border-white/10 transition-colors">
                                                <div className="flex justify-between items-start mb-2">
                                                    <h3 className="text-sm font-bold uppercase tracking-tight text-white">System Validation Passed</h3>
                                                    <span className="text-xs text-silver-grey">Oct 24, 2023, 13:31:05</span>
                                                </div>
                                                <div className="space-y-2">
                                                    <div className="flex items-center gap-2 text-xs text-silver-grey">
                                                        <span className="material-icons text-sm text-emerald-500">check_circle</span>
                                                        CheckSum Integrity: Verified
                                                    </div>
                                                    <div className="flex items-center gap-2 text-xs text-silver-grey">
                                                        <span className="material-icons text-sm text-emerald-500">check_circle</span>
                                                        Account Balances: Sufficient
                                                    </div>
                                                    <div className="flex items-center gap-2 text-xs text-silver-grey">
                                                        <span className="material-icons text-sm text-emerald-500">check_circle</span>
                                                        KYC/Compliance: No matches
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Item 5: Batch Created */}
                                    <div className="relative flex gap-6 pb-4">
                                        <div className="relative z-10 w-12 h-12 flex items-center justify-center rounded-full bg-border-dark-obsidian text-silver-grey border-4 border-black">
                                            <span className="material-icons text-xl font-bold">add_circle</span>
                                        </div>
                                        <div className="flex-1 pt-1">
                                            <div className="bg-surface-dark rounded-xl border border-border-dark-obsidian p-5 shadow-lg shadow-black/30 hover:border-white/10 transition-colors">
                                                <div className="flex justify-between items-start mb-3">
                                                    <h3 className="text-sm font-bold uppercase tracking-tight text-white">Batch Created</h3>
                                                    <span className="text-xs text-silver-grey">Oct 24, 2023, 13:28:44</span>
                                                </div>
                                                <div className="flex items-center gap-3">
                                                    <div className="w-8 h-8 rounded-full border border-border-dark-obsidian bg-purple-500/20 flex items-center justify-center text-xs font-bold text-white">SJ</div>
                                                    <div>
                                                        <p className="text-sm font-medium text-white">Sarah Jenkins <span className="text-silver-grey font-normal">uploaded file</span></p>
                                                        <p className="text-xs text-blue-400 font-medium hover:underline cursor-pointer flex items-center gap-1 group">
                                                            <span className="material-icons text-[10px] group-hover:rotate-45 transition-transform">attachment</span>
                                                            payroll_batch_q4_final.csv
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </main>

            <TransactionDetailModal
                isOpen={!!selectedTransaction}
                onClose={() => setSelectedTransaction(null)}
                transaction={selectedTransaction}
            />

            <DuplicateBatchModal
                isOpen={isDuplicateModalOpen}
                onClose={() => setIsDuplicateModalOpen(false)}
                currentBatchName="January 2026 Payroll"
                recipientCount={45}
                totalAmount="67,500.00"
            />

            <DeleteBatchModal
                isOpen={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                batchName="January 2026 Payroll"
                recipientCount={45}
                totalAmount="67,500.00"
            />

            <ExportBatchModal
                isOpen={isExportModalOpen}
                onClose={() => setIsExportModalOpen(false)}
            />

            <ScheduleBatchModal
                isOpen={isScheduleModalOpen}
                onClose={() => setIsScheduleModalOpen(false)}
            />

            <CancelBatchModal
                isOpen={isCancelModalOpen}
                onClose={() => setIsCancelModalOpen(false)}
            />

            <RetryPaymentsModal
                isOpen={isRetryModalOpen}
                onClose={() => setIsRetryModalOpen(false)}
            />
        </div>
    );
};

export default PayrollBatchDetail;
