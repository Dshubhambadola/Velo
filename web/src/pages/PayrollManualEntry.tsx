import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createBatchManual } from '../api/payroll';

const PayrollManualEntry: React.FC = () => {
    const navigate = useNavigate();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [recurrenceRule, setRecurrenceRule] = useState('none');
    const [nextExecutionAt, setNextExecutionAt] = useState('');

    // Mock Data for Table
    const [recipients, setRecipients] = useState([
        { id: '01', name: 'Alexander Thorne', type: 'INTERNAL USER', account: 'US29 4920 3847 2910', bank: 'Chase Bank NA', amount: '4,500.00', status: 'valid' },
        { id: '02', name: 'Sarah Jenkins', type: 'EXTERNAL CONTRACTOR', account: 'GB10 BARC 2039 4851', bank: 'Barclays UK', amount: '3,250.00', status: 'active' },
        { id: '03', name: 'Michael Chen', type: 'ERROR', account: '', bank: '', amount: '0.00', status: 'error' },
        { id: '04', name: 'Elena Rodriguez', type: 'FULL-TIME EMPLOYEE', account: 'ES44 0049 1847 3849', bank: 'Santander Bank', amount: '5,820.00', status: 'valid' },
    ]);

    const handleAmountChange = (index: number, value: string) => {
        const newRecipients = [...recipients];
        newRecipients[index].amount = value;
        setRecipients(newRecipients);
    };

    const handleSaveAndContinue = async () => {
        setIsSubmitting(true);
        try {
            // Transform recipients to match API expectation
            const payments = recipients.map(r => ({
                wallet_address: r.account || "0x0000000000000000000000000000000000000000", // TODO: validation
                amount: parseFloat(r.amount.replace(/,/g, '')),
                currency: "USD"
            }));

            // Filter out invalid/empty rows if necessary
            const validPayments = payments.filter(p => p.amount > 0);

            const response = await createBatchManual("Manual Entry Batch", validPayments, recurrenceRule, nextExecutionAt);
            navigate(`/payroll/review/${response.batch_id}`);
        } catch (error) {
            console.error("Failed to create batch:", error);
            alert("Failed to create batch. Please check your inputs.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="bg-background-dark font-display text-white selection:bg-primary/30 min-h-screen flex flex-col antialiased">
            {/* Top Navigation Header */}
            <header className="h-16 border-b border-border-dark bg-background-dark/80 backdrop-blur-md sticky top-0 z-50 px-6 flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <button onClick={() => navigate('/payroll/new')} className="p-2 hover:bg-surface rounded transition-colors text-neutral-silver">
                        <span className="material-icons text-xl">arrow_back</span>
                    </button>
                    <div className="h-6 w-px bg-border-dark"></div>
                    <div>
                        <h1 className="text-sm font-semibold text-white">Batch #VY-9021-Payroll</h1>
                        <p className="text-[10px] text-neutral-silver uppercase tracking-wider">Manual Entry Mode • USD</p>
                    </div>
                </div>
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2 px-3 py-1.5 bg-surface border border-border-dark rounded text-xs">
                        <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                        <span className="text-neutral-silver">Autosaved at 14:20:05</span>
                    </div>
                    <button className="flex items-center gap-2 text-sm font-medium text-neutral-silver hover:text-white transition-colors">
                        <span className="material-icons text-lg">file_download</span>
                        Export CSV
                    </button>
                </div>
            </header>

            <div className="flex h-[calc(100vh-64px-72px)] overflow-hidden">
                {/* Main Recipient List Area */}
                <main className="flex-1 overflow-y-auto custom-scrollbar p-6">
                    {/* Search and Bulk Actions */}
                    <div className="flex items-center justify-between mb-6 gap-4">
                        <div className="relative flex-1 max-w-md">
                            <span className="material-icons absolute left-3 top-1/2 -translate-y-1/2 text-neutral-silver text-lg">search</span>
                            <input className="w-full bg-surface border border-border-dark rounded-lg py-2 pl-10 pr-4 text-sm text-white placeholder:text-neutral-silver/50 focus:ring-1 focus:ring-primary focus:border-primary outline-none transition-all" placeholder="Search by name or account..." type="text" />
                        </div>
                        <div className="flex items-center gap-2">
                            <button className="px-4 py-2 border border-border-dark bg-surface hover:bg-zinc-800 text-white text-sm font-medium rounded-lg transition-colors flex items-center gap-2">
                                <span className="material-icons text-lg">person_add</span> Add Recipient
                            </button>
                            <button className="px-3 py-2 border border-border-dark bg-surface hover:bg-zinc-800 text-neutral-silver rounded-lg">
                                <span className="material-icons text-lg">more_horiz</span>
                            </button>
                        </div>
                    </div>

                    {/* List Header */}
                    <div className="grid grid-cols-12 gap-4 px-4 py-3 text-[11px] font-bold text-neutral-silver uppercase tracking-widest border-b border-border-dark mb-2">
                        <div className="col-span-1">No.</div>
                        <div className="col-span-3">Recipient Name</div>
                        <div className="col-span-3">Account Number / IBAN</div>
                        <div className="col-span-3">Bank Details</div>
                        <div className="col-span-2 text-right">Amount (USD)</div>
                    </div>

                    {/* Recipient Cards */}
                    <div className="space-y-3">
                        {recipients.map((recipient, index) => (
                            <div key={recipient.id} className={`grid grid-cols-12 gap-4 items-center p-4 rounded-xl transition-colors group ${recipient.status === 'active' ? 'bg-surface border-2 border-primary/50 ring-4 ring-primary/5' :
                                recipient.status === 'error' ? 'bg-surface border border-red-500/30 hover:bg-[#1a1a1a]' :
                                    'bg-surface border border-border-dark hover:bg-[#1a1a1a]'
                                }`}>
                                <div className={`col-span-1 text-xs font-mono override-text-color ${recipient.status === 'active' ? 'text-primary font-bold' : 'text-neutral-silver'}`}>{recipient.id}</div>
                                <div className="col-span-3">
                                    <input className="w-full bg-transparent border-none p-0 text-sm text-white font-medium focus:ring-0 outline-none" type="text" defaultValue={recipient.name} />
                                    {recipient.status === 'error' ? (
                                        <div className="flex items-center gap-1 mt-1">
                                            <span className="material-icons text-[10px] text-red-400">error</span>
                                            <span className="text-[10px] text-red-400 font-semibold uppercase">Missing Tax ID</span>
                                        </div>
                                    ) : (
                                        <div className="text-[10px] text-neutral-silver mt-1">{recipient.type}</div>
                                    )}
                                </div>
                                <div className="col-span-3">
                                    <input
                                        className={`w-full bg-transparent border-none p-0 text-sm font-mono focus:ring-0 outline-none ${recipient.status === 'error' ? 'text-red-400 placeholder:text-red-900/50' : 'text-white/90'}`}
                                        type="text"
                                        defaultValue={recipient.account}
                                        placeholder={recipient.status === 'error' ? "Enter IBAN..." : ""}
                                    />
                                </div>
                                <div className="col-span-3">
                                    {recipient.status === 'error' ? (
                                        <div className="flex items-center gap-2 opacity-50">
                                            <div className="w-6 h-6 rounded bg-zinc-800 flex items-center justify-center">
                                                <span className="material-icons text-[14px] text-neutral-silver">help_outline</span>
                                            </div>
                                            <span className="text-xs text-neutral-silver italic">Awaiting details...</span>
                                        </div>
                                    ) : (
                                        <div className="flex items-center gap-2">
                                            <div className={`w-6 h-6 rounded flex items-center justify-center ${recipient.status === 'active' ? 'bg-zinc-800' : 'bg-primary/20'}`}>
                                                <span className={`material-icons text-[14px] ${recipient.status === 'active' ? 'text-neutral-silver' : 'text-primary'}`}>account_balance</span>
                                            </div>
                                            <span className={`text-xs ${recipient.status === 'active' ? 'text-neutral-silver' : 'text-neutral-silver'}`}>{recipient.bank}</span>
                                        </div>
                                    )}
                                </div>
                                <div className="col-span-2 text-right relative">
                                    <input
                                        className={`w-full bg-transparent border-none p-0 text-sm text-right font-semibold focus:ring-0 outline-none ${recipient.status === 'error' ? 'text-neutral-silver' : 'text-white'}`}
                                        type="text"
                                        value={recipient.amount}
                                        onChange={(e) => handleAmountChange(index, e.target.value)}
                                    />
                                    {recipient.status === 'active' && (
                                        <div className="absolute -bottom-1 right-0 h-px w-full bg-primary/40"></div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </main>

                {/* Right Sidebar Summary */}
                <aside className="w-80 border-l border-border-dark bg-surface flex flex-col">
                    <div className="p-6 flex-1 overflow-y-auto custom-scrollbar">
                        <h2 className="text-xs font-bold text-neutral-silver uppercase tracking-widest mb-6">Batch Summary</h2>
                        <div className="space-y-6">
                            {/* Totals Card */}
                            <div className="space-y-4">
                                <div className="flex justify-between items-center">
                                    <span className="text-sm text-neutral-silver">Recipients</span>
                                    <span className="text-sm font-semibold">12</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-sm text-neutral-silver">Subtotal</span>
                                    <span className="text-sm font-semibold">$13,570.00</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-sm text-neutral-silver">Processing Fee</span>
                                    <span className="text-sm font-semibold">$12.50</span>
                                </div>
                                <div className="h-px bg-border-dark my-2"></div>
                                <div className="flex justify-between items-end">
                                    <span className="text-sm font-medium text-white">Total Debit</span>
                                    <span className="text-xl font-bold text-primary">$13,582.50</span>
                                </div>
                            </div>

                            {/* Recurrence Settings */}
                            <div className="p-4 bg-background-dark border border-border-dark rounded-xl">
                                <div className="flex items-center gap-2 mb-3">
                                    <span className="material-icons text-primary text-sm">schedule</span>
                                    <span className="text-[10px] font-bold text-primary uppercase">Scheduling</span>
                                </div>
                                <div className="space-y-3">
                                    <div>
                                        <label className="block text-[10px] text-neutral-silver mb-1 uppercase tracking-wider font-bold">Recurrence</label>
                                        <select
                                            value={recurrenceRule}
                                            onChange={(e) => setRecurrenceRule(e.target.value)}
                                            className="w-full bg-surface border border-border-dark rounded px-2 py-1.5 text-white text-xs focus:border-primary focus:outline-none"
                                        >
                                            <option value="none">None (One-time)</option>
                                            <option value="weekly">Weekly</option>
                                            <option value="bi-weekly">Bi-Weekly</option>
                                            <option value="monthly">Monthly</option>
                                        </select>
                                    </div>
                                    {recurrenceRule !== 'none' && (
                                        <div>
                                            <label className="block text-[10px] text-neutral-silver mb-1 uppercase tracking-wider font-bold">First Execution</label>
                                            <input
                                                type="datetime-local"
                                                value={nextExecutionAt}
                                                onChange={(e) => setNextExecutionAt(e.target.value)}
                                                className="w-full bg-surface border border-border-dark rounded px-2 py-1.5 text-white text-xs focus:border-primary focus:outline-none"
                                            />
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Quick Support Widget */}
                    <div className="p-6 border-t border-border-dark">
                        <div className="flex items-center justify-between p-3 bg-zinc-900 rounded-lg">
                            <div className="flex items-center gap-2">
                                <div className="w-8 h-8 rounded-full bg-zinc-800 overflow-hidden">
                                    {/* Placeholder for avatar */}
                                    <div className="w-full h-full bg-primary/40 flex items-center justify-center text-xs font-bold text-white">JD</div>
                                </div>
                                <div className="text-[10px]">
                                    <div className="text-white font-semibold">Account Manager</div>
                                    <div className="text-emerald-500 flex items-center gap-1">
                                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> Online
                                    </div>
                                </div>
                            </div>
                            <button className="text-neutral-silver hover:text-white transition-colors">
                                <span className="material-icons text-lg">chat_bubble_outline</span>
                            </button>
                        </div>
                    </div>
                </aside>
            </div>

            {/* Bottom Action Bar */}
            <footer className="h-[72px] border-t border-border-dark bg-surface/90 backdrop-blur-xl fixed bottom-0 left-0 right-0 z-50 px-8 flex items-center justify-between">
                <div className="flex items-center gap-8">
                    <div className="flex flex-col">
                        <span className="text-[10px] text-neutral-silver uppercase font-bold tracking-widest">Selected Mode</span>
                        <span className="text-sm font-semibold text-white">Velo Real-Time Settlement</span>
                    </div>
                    <div className="h-8 w-px bg-border-dark"></div>
                    <div className="flex items-center gap-6">
                        <div className="flex items-center gap-2">
                            <span className="text-xs text-neutral-silver">Volume Discount:</span>
                            <span className="text-xs font-bold text-emerald-500">-0.12%</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="text-xs text-neutral-silver">Est. Completion:</span>
                            <span className="text-xs font-bold text-white">&lt; 2 Minutes</span>
                        </div>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <button className="px-6 py-2.5 text-sm font-semibold text-white hover:bg-zinc-800 rounded-lg transition-all">
                        Save Draft
                    </button>
                    <button
                        onClick={handleSaveAndContinue}
                        disabled={isSubmitting}
                        className="bg-primary hover:bg-primary/90 text-white px-10 py-2.5 rounded-lg text-sm font-bold shadow-lg shadow-primary/20 transition-all active:scale-[0.98] flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isSubmitting ? 'Creating...' : 'Review & Continue'}
                        {!isSubmitting && <span className="material-icons text-sm">arrow_forward</span>}
                    </button>
                </div>
            </footer>
        </div>
    );
};

export default PayrollManualEntry;
