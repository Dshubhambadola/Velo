import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const PayrollBatchDetail: React.FC = () => {
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();

    // Mock Data
    const transactions = [
        { id: '1', name: 'Acme Logistics Corp', type: 'Vendor Payment', initials: 'AL', color: 'primary', account: 'US88 9201 2281 9901', amount: '45,200.00', status: 'COMPLETED', ref: 'TXN-9021-X99' },
        { id: '2', name: 'Global Holdings Inc', type: 'Dividends', initials: 'GH', color: 'purple', account: 'GB41 BARC 4001 0291', amount: '12,850.50', status: 'COMPLETED', ref: 'TXN-4412-Z01' },
        { id: '3', name: 'Nexus Property Group', type: 'Commercial Lease', initials: 'NP', color: 'orange', account: 'US12 7721 0092 5511', amount: '210,000.00', status: 'PENDING', ref: 'TXN-8822-M44' },
        { id: '4', name: 'Stellar Tech Sol.', type: 'Cloud Infrastructure', initials: 'ST', color: 'blue', account: 'DE81 COMM 0991 1233', amount: '8,440.00', status: 'COMPLETED', ref: 'TXN-1102-S22' },
        { id: '5', name: 'Riverstone Venture', type: 'Cap Call', initials: 'RV', color: 'pink', account: 'KY12 BONY 5510 0022', amount: '500,000.00', status: 'COMPLETED', ref: 'TXN-3392-L19' },
    ];

    return (
        <div className="flex min-h-screen bg-black text-white font-display antialiased selection:bg-primary/30">
            {/* Sidebar Navigation (Condensed) */}
            <aside className="w-20 flex flex-col items-center py-6 border-r border-border-dark-obsidian bg-black fixed h-full z-10">
                <div className="mb-10">
                    <div className="w-10 h-10 bg-primary rounded flex items-center justify-center cursor-pointer" onClick={() => navigate('/payroll')}>
                        <span className="material-icons text-white">bolt</span>
                    </div>
                </div>
                <nav className="flex flex-col gap-8">
                    <button onClick={() => navigate('/payroll')} className="text-silver-grey hover:text-primary transition-colors"><span className="material-icons">dashboard</span></button>
                    <button className="text-primary"><span className="material-icons">account_balance_wallet</span></button>
                    <button className="text-silver-grey hover:text-primary transition-colors"><span className="material-icons">receipt_long</span></button>
                    <button className="text-silver-grey hover:text-primary transition-colors"><span className="material-icons">group</span></button>
                    <button className="text-silver-grey hover:text-primary transition-colors"><span className="material-icons">settings</span></button>
                </nav>
                <div className="mt-auto">
                    <div className="w-10 h-10 rounded-full border border-border-dark-obsidian bg-primary/20 flex items-center justify-center text-xs font-bold text-white">OP</div>
                </div>
            </aside>

            {/* Main Content Area */}
            <main className="flex-1 flex flex-col h-screen overflow-hidden ml-20">
                {/* Global Header */}
                <header className="h-16 border-b border-border-dark-obsidian flex items-center justify-between px-8 bg-black shrink-0">
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2 text-silver-grey text-sm">
                            <span className="cursor-pointer hover:text-white" onClick={() => navigate('/payroll')}>Batches</span>
                            <span className="material-icons text-xs">chevron_right</span>
                            <span className="text-white font-medium">Batch #{id || '8842-VX'}</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <button className="flex items-center gap-2 px-4 py-2 bg-surface-dark border border-border-dark-obsidian rounded-lg text-sm font-medium hover:bg-border-dark-obsidian transition-colors text-silver-grey">
                            <span className="material-icons text-sm">file_download</span>
                            Export
                        </button>
                        <button
                            onClick={() => navigate('/payroll/new')}
                            className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg text-sm font-semibold shadow-lg shadow-primary/20 hover:bg-blue-600 transition-all"
                        >
                            <span className="material-icons text-sm">add</span>
                            New Batch
                        </button>
                    </div>
                </header>

                {/* Scrollable Content */}
                <div className="flex-1 overflow-y-auto custom-scrollbar p-8">
                    {/* Batch Summary Header */}
                    <div className="mb-8 flex flex-col gap-6">
                        <div className="flex justify-between items-end">
                            <div>
                                <h1 className="text-2xl font-bold mb-1 italic tracking-tight uppercase">Batch #{id || '8842-VX'}</h1>
                                <p className="text-silver-grey text-sm flex items-center gap-2">
                                    <span className="material-icons text-xs">calendar_today</span>
                                    Initiated on Oct 24, 2023 · 14:22:10 UTC
                                </p>
                            </div>
                            <div className="flex gap-2">
                                <span className="px-3 py-1 bg-green-500/10 text-green-500 border border-green-500/20 rounded-full text-xs font-semibold flex items-center gap-1">
                                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
                                    COMPLETED
                                </span>
                                <span className="px-3 py-1 bg-primary/10 text-primary border border-primary/20 rounded-full text-xs font-semibold">
                                    HIGH SECURITY
                                </span>
                            </div>
                        </div>

                        {/* Summary Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                            <div className="bg-surface-dark border border-border-dark-obsidian p-5 rounded-xl">
                                <p className="text-silver-grey text-xs font-medium mb-2 uppercase tracking-wider">Total Value</p>
                                <h3 className="text-2xl font-bold tracking-tight text-white">$1,284,550.00</h3>
                                <p className="text-[10px] text-green-500 mt-2 flex items-center gap-1 uppercase">
                                    <span className="material-icons text-[10px]">check_circle</span> 100% Validated
                                </p>
                            </div>
                            <div className="bg-surface-dark border border-border-dark-obsidian p-5 rounded-xl">
                                <p className="text-silver-grey text-xs font-medium mb-2 uppercase tracking-wider">Transactions</p>
                                <h3 className="text-2xl font-bold tracking-tight text-white">428</h3>
                                <p className="text-[10px] text-silver-grey mt-2 uppercase">Avg. $3,001.28 per tx</p>
                            </div>
                            <div className="bg-surface-dark border border-border-dark-obsidian p-5 rounded-xl">
                                <p className="text-silver-grey text-xs font-medium mb-2 uppercase tracking-wider">Source Account</p>
                                <h3 className="text-2xl font-bold tracking-tight text-white italic">Treasury_Ops_01</h3>
                                <p className="text-[10px] text-primary mt-2 uppercase">SWIFT/BIC: VELO88XX</p>
                            </div>
                            <div className="bg-surface-dark border border-border-dark-obsidian p-5 rounded-xl">
                                <p className="text-silver-grey text-xs font-medium mb-2 uppercase tracking-wider">Execution Speed</p>
                                <h3 className="text-2xl font-bold tracking-tight text-white">1.2s</h3>
                                <p className="text-[10px] text-silver-grey mt-2 uppercase">Processed via vNet-V3</p>
                            </div>
                        </div>
                    </div>

                    {/* Transaction List Header & Actions */}
                    <div className="mb-4 flex flex-col md:flex-row justify-between items-center gap-4">
                        <div className="flex items-center bg-surface-dark border border-border-dark-obsidian rounded-lg px-3 py-2 w-full md:w-96">
                            <span className="material-icons text-silver-grey mr-2 text-sm">search</span>
                            <input className="bg-transparent border-none text-sm w-full focus:ring-0 outline-none text-white placeholder:text-silver-grey/50" placeholder="Search transactions, IDs, or accounts..." type="text" />
                        </div>
                        <div className="flex items-center gap-3 w-full md:w-auto">
                            <button className="flex items-center gap-2 px-3 py-2 bg-surface-dark border border-border-dark-obsidian rounded-lg text-xs font-medium hover:bg-border-dark-obsidian text-silver-grey hover:text-white transition-all">
                                <span className="material-icons text-sm">filter_list</span>
                                Filters
                            </button>
                            <div className="h-6 w-[1px] bg-border-dark-obsidian mx-1"></div>
                            <div className="flex items-center gap-1 bg-surface-dark border border-border-dark-obsidian rounded-lg p-1">
                                <button className="p-1 px-2 bg-primary rounded text-xs font-medium text-white">List</button>
                                <button className="p-1 px-2 text-silver-grey hover:text-white text-xs font-medium">Grid</button>
                            </div>
                        </div>
                    </div>

                    {/* Data Table */}
                    <div className="bg-surface-dark border border-border-dark-obsidian rounded-xl overflow-hidden">
                        <div className="overflow-x-auto custom-scrollbar">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-white/5 border-b border-border-dark-obsidian">
                                        <th className="px-6 py-4 text-[11px] font-semibold text-silver-grey uppercase tracking-widest">
                                            <div className="flex items-center gap-1 cursor-pointer hover:text-white">Recipient <span className="material-icons text-[12px]">arrow_downward</span></div>
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
                                        <tr key={index} className="hover:bg-white/[0.03] transition-colors group">
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
                                                        <div className="text-sm font-semibold text-white">{txn.name}</div>
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
                        {/* Pagination Footer */}
                        <div className="px-6 py-4 border-t border-border-dark-obsidian flex items-center justify-between">
                            <p className="text-[11px] text-silver-grey uppercase">Showing 1-5 of 428 Transactions</p>
                            <div className="flex items-center gap-2">
                                <button className="w-8 h-8 border border-border-dark-obsidian flex items-center justify-center rounded-md text-silver-grey hover:bg-white/5 transition-all">
                                    <span className="material-icons text-sm">chevron_left</span>
                                </button>
                                <button className="w-8 h-8 bg-primary flex items-center justify-center rounded-md text-white text-xs font-bold">1</button>
                                <button className="w-8 h-8 border border-border-dark-obsidian flex items-center justify-center rounded-md text-silver-grey hover:bg-white/5 transition-all text-xs font-bold">2</button>
                                <button className="w-8 h-8 border border-border-dark-obsidian flex items-center justify-center rounded-md text-silver-grey hover:bg-white/5 transition-all text-xs font-bold">3</button>
                                <span className="text-silver-grey mx-1 text-xs">...</span>
                                <button className="w-8 h-8 border border-border-dark-obsidian flex items-center justify-center rounded-md text-silver-grey hover:bg-white/5 transition-all text-xs font-bold">43</button>
                                <button className="w-8 h-8 border border-border-dark-obsidian flex items-center justify-center rounded-md text-silver-grey hover:bg-white/5 transition-all">
                                    <span className="material-icons text-sm">chevron_right</span>
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Audit Timeline Condensed */}
                    <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8 pb-10">
                        <div className="lg:col-span-2">
                            <h4 className="text-xs font-bold text-silver-grey uppercase tracking-widest mb-4">Batch Audit Trail</h4>
                            <div className="space-y-4">
                                <div className="flex gap-4">
                                    <div className="flex flex-col items-center">
                                        <div className="w-2 h-2 rounded-full bg-green-500 mt-1.5 shadow-[0_0_8px_rgba(34,197,94,0.6)]"></div>
                                        <div className="w-[1px] h-full bg-border-dark-obsidian my-1"></div>
                                    </div>
                                    <div className="pb-4">
                                        <p className="text-xs font-semibold text-white">Batch Executed Successfully</p>
                                        <p className="text-[10px] text-silver-grey">Oct 24, 2023 · 14:24:55 UTC by Automated System</p>
                                    </div>
                                </div>
                                <div className="flex gap-4">
                                    <div className="flex flex-col items-center">
                                        <div className="w-2 h-2 rounded-full bg-green-500 mt-1.5"></div>
                                        <div className="w-[1px] h-full bg-border-dark-obsidian my-1"></div>
                                    </div>
                                    <div className="pb-4">
                                        <p className="text-xs font-semibold text-white">2-Factor Authorization Provided</p>
                                        <p className="text-[10px] text-silver-grey">Oct 24, 2023 · 14:23:40 UTC by Admin_Sarah_K</p>
                                    </div>
                                </div>
                                <div className="flex gap-4">
                                    <div className="flex flex-col items-center">
                                        <div className="w-2 h-2 rounded-full bg-primary mt-1.5"></div>
                                    </div>
                                    <div>
                                        <p className="text-xs font-semibold text-white">Batch Created & Staged</p>
                                        <p className="text-[10px] text-silver-grey">Oct 24, 2023 · 14:22:10 UTC by Ops_Mike_V</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div className="bg-surface-dark border border-border-dark-obsidian p-6 rounded-xl">
                                <h4 className="text-xs font-bold text-silver-grey uppercase tracking-widest mb-4">Security Insights</h4>
                                <div className="space-y-4">
                                    <div className="flex justify-between items-center">
                                        <span className="text-[11px] text-silver-grey">IP Location</span>
                                        <span className="text-[11px] font-medium text-white">London, UK (10.44.2.1)</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-[11px] text-silver-grey">Browser Fingerprint</span>
                                        <span className="text-[11px] font-mono text-white">#8841-B9</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-[11px] text-silver-grey">Auth Method</span>
                                        <span className="text-[11px] font-medium text-white">Biometric + HSM</span>
                                    </div>
                                    <div className="mt-4 pt-4 border-t border-border-dark-obsidian">
                                        <div className="flex items-center gap-2 text-green-500">
                                            <span className="material-icons text-sm">verified_user</span>
                                            <span className="text-[10px] font-bold uppercase tracking-tight">Zero-Knowledge Proof Verified</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default PayrollBatchDetail;
