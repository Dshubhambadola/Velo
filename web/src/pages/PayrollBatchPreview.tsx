import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const PayrollBatchPreview: React.FC = () => {
    const navigate = useNavigate();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [recipients, _setRecipients] = useState([
        { id: 1, name: 'Jane Doe', wallet: '0x71C...4921', email: 'jane.doe@velo.inc', amount: '4,500.00' },
        { id: 2, name: 'Alex Smith', wallet: '0x3A2...F310', email: 'asmith@velo.inc', amount: '3,200.00' },
        { id: 3, name: 'Marcus Lee', wallet: '0x9B2...88E1', email: 'marcus@velo.inc', amount: '5,150.00' },
        { id: 4, name: 'Sarah Kim', wallet: '0x12E...CC93', email: 'skim@velo.inc', amount: '4,800.00' },
    ]);

    return (
        <div className="bg-background-light dark:bg-background-dark font-display text-slate-900 dark:text-slate-100 min-h-screen flex items-center justify-center p-4">
            {/* Modal Backdrop */}
            <div className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm z-0"></div>

            {/* Modal Container */}
            <div className="relative z-10 w-full max-w-6xl bg-white dark:bg-[#161b2e] rounded-xl shadow-2xl border border-slate-200 dark:border-slate-800 flex flex-col max-h-[90vh]">
                {/* Modal Header */}
                <div className="px-8 py-6 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center">
                    <div>
                        <h2 className="text-2xl font-bold tracking-tight">Payroll Batch Preview</h2>
                        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Reviewing: <span className="font-medium text-[#0f38bd]">Monthly Engineering Payroll - Q3</span></p>
                    </div>
                    <button onClick={() => navigate('/dashboard')} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors">
                        <span className="material-icons text-slate-400">close</span>
                    </button>
                </div>

                {/* Content Area: Table */}
                <div className="flex-1 overflow-hidden flex flex-col">
                    <div className="overflow-x-auto custom-scrollbar">
                        <table className="w-full text-left border-collapse">
                            <thead className="sticky top-0 bg-slate-50 dark:bg-[#1c233a] z-10">
                                <tr>
                                    <th className="px-8 py-4 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Recipient Name</th>
                                    <th className="px-6 py-4 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Wallet Address</th>
                                    <th className="px-6 py-4 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Email Address</th>
                                    <th className="px-6 py-4 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider text-right">Amount (USDC)</th>
                                    <th className="px-8 py-4 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider text-center">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                                {recipients.map((recipient) => (
                                    <tr key={recipient.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors group">
                                        <td className="px-8 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className={`w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center font-bold text-xs ${recipient.id % 4 === 1 ? 'text-primary bg-primary/10' :
                                                    recipient.id % 4 === 2 ? 'text-blue-500 bg-blue-500/10' :
                                                        recipient.id % 4 === 3 ? 'text-emerald-500 bg-emerald-500/10' :
                                                            'text-purple-500 bg-purple-500/10'
                                                    }`}>
                                                    {recipient.name.split(' ').map(n => n[0]).join('')}
                                                </div>
                                                <input className="bg-transparent border-none p-0 focus:ring-0 w-full text-sm font-medium" type="text" defaultValue={recipient.name} />
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <code className="text-xs text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-900 px-2 py-1 rounded">{recipient.wallet}</code>
                                        </td>
                                        <td className="px-6 py-4 text-sm">
                                            <input className="bg-transparent border-none p-0 focus:ring-0 w-full text-slate-500 dark:text-slate-400" type="email" defaultValue={recipient.email} />
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <input className="bg-transparent border-none p-0 focus:ring-0 text-right text-sm font-semibold text-[#0f38bd]" type="text" defaultValue={recipient.amount} />
                                        </td>
                                        <td className="px-8 py-4 text-center">
                                            <button className="text-slate-400 hover:text-red-500 transition-colors">
                                                <span className="material-icons text-lg">delete_outline</span>
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    {/* Add Recipient Button Row */}
                    <div className="px-8 py-4 border-b border-slate-200 dark:border-slate-800">
                        <button className="flex items-center gap-2 text-[#0f38bd] hover:text-[#0f38bd]/80 font-semibold text-sm transition-colors">
                            <span className="material-icons text-lg">add_circle_outline</span>
                            Add Recipient
                        </button>
                    </div>
                </div>

                {/* Modal Footer */}
                <div className="px-8 py-8 bg-slate-50/50 dark:bg-slate-900/40 rounded-b-xl flex flex-col md:flex-row justify-between items-center gap-6">
                    {/* Summary Stats */}
                    <div className="flex items-center gap-8">
                        <div className="flex flex-col">
                            <span className="text-xs text-slate-500 dark:text-slate-400 uppercase font-bold tracking-widest">Recipients</span>
                            <span className="text-xl font-bold">{recipients.length} Users</span>
                        </div>
                        <div className="h-10 w-[1px] bg-slate-300 dark:bg-slate-700"></div>
                        <div className="flex flex-col">
                            <span className="text-xs text-slate-500 dark:text-slate-400 uppercase font-bold tracking-widest">Total Batch Amount</span>
                            <div className="flex items-baseline gap-1">
                                <span className="text-2xl font-bold text-slate-900 dark:text-white">17,650.00</span>
                                <span className="text-sm font-semibold text-slate-500">USDC</span>
                            </div>
                        </div>
                    </div>
                    {/* Action Buttons */}
                    <div className="flex items-center gap-4 w-full md:w-auto">
                        <button className="px-5 py-2.5 rounded text-sm font-semibold border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors flex items-center gap-2">
                            <span className="material-icons text-sm">edit</span>
                            Edit Template
                        </button>
                        <div className="flex-1 md:flex-none"></div>
                        <button onClick={() => navigate('/payroll/first-setup')} className="px-6 py-2.5 rounded text-sm font-semibold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors">
                            Cancel
                        </button>
                        <button onClick={() => navigate('/onboarding/celebration')} className="bg-[#0f38bd] hover:bg-[#0f38bd]/90 text-white px-8 py-2.5 rounded-lg text-sm font-bold shadow-lg shadow-[#0f38bd]/20 transition-all transform active:scale-[0.98]">
                            Create Batch
                        </button>
                    </div>
                </div>
            </div>
            {/* Background Decoration */}
            <div className="fixed inset-0 pointer-events-none -z-10 opacity-10 dark:opacity-20 overflow-hidden">
                <svg className="absolute top-0 left-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5"></path>
                        </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#grid)"></rect>
                </svg>
            </div>
        </div>
    );
};

export default PayrollBatchPreview;
