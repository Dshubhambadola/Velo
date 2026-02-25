import React, { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar';
import { getSubAccounts, createSubAccount, depositFunds } from '../api/subaccount';
import { formatCurrency } from '../utils/formatCurrency';

const DepartmentalBudget: React.FC = () => {
    const [subAccounts, setSubAccounts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    const [isCreateOpen, setIsCreateOpen] = useState(false);
    const [deptName, setDeptName] = useState('');
    const [allocAmount, setAllocAmount] = useState('');
    const [spendLimit, setSpendLimit] = useState('');

    // Deposit Modal
    const [isDepositOpen, setIsDepositOpen] = useState(false);
    const [selectedAccId, setSelectedAccId] = useState('');
    const [depositAmount, setDepositAmount] = useState('');

    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        fetchAccounts();
    }, []);

    const fetchAccounts = async () => {
        try {
            const data = await getSubAccounts();
            setSubAccounts(data.sub_accounts || []);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleCreate = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            setIsSubmitting(true);
            const amtInCents = Math.round(parseFloat(allocAmount) * 100);
            const limitInCents = spendLimit ? Math.round(parseFloat(spendLimit) * 100) : 0;

            await createSubAccount({
                name: deptName,
                initial_funding: amtInCents,
                spend_limit: limitInCents
            });
            setIsCreateOpen(false);
            setDeptName('');
            setAllocAmount('');
            setSpendLimit('');
            await fetchAccounts();
        } catch (err: any) {
            alert(err.response?.data?.error || "Failed to create department");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleDeposit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            setIsSubmitting(true);
            const amtInCents = Math.round(parseFloat(depositAmount) * 100);
            await depositFunds(selectedAccId, amtInCents);
            setIsDepositOpen(false);
            setDepositAmount('');
            await fetchAccounts();
        } catch (err: any) {
            alert(err.response?.data?.error || "Failed to deposit funds");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="flex min-h-screen bg-black text-white font-display selection:bg-[#0d6cf2]/30">
            <Sidebar />
            <main className="flex-1 max-w-7xl mx-auto px-8 py-10 overflow-y-auto">
                <header className="flex justify-between items-end mb-10">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Departmental Budgeting</h1>
                        <p className="text-[#A0A0A0] mt-2 max-w-2xl">Create virtual sub-accounts. Allocate treasury funds per department.</p>
                    </div>
                    <button
                        onClick={() => setIsCreateOpen(true)}
                        className="px-6 py-2.5 bg-[#0d6cf2] hover:bg-[#0d6cf2]/90 text-white rounded-lg font-bold shadow-[0_4px_15px_rgba(13,108,242,0.3)] transition-all flex items-center gap-2"
                    >
                        <span className="material-icons text-sm">add_business</span>
                        New Department
                    </button>
                </header>

                {loading ? (
                    <div className="flex justify-center items-center py-20">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {subAccounts.map(acc => (
                            <div key={acc.ID} className="bg-[#121212] border border-[#262626] rounded-2xl p-6 transition-transform hover:-translate-y-1 hover:shadow-2xl hover:border-white/10 relative overflow-hidden group">
                                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#0d6cf2] to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>

                                <div className="flex justify-between items-start mb-6">
                                    <div>
                                        <h3 className="text-lg font-bold text-white mb-1">{acc.Name}</h3>
                                        <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">
                                            {acc.SpendLimit > 0 ? `Limit: ${formatCurrency(acc.SpendLimit / 100)}/mo` : 'No Limit'}
                                        </p>
                                    </div>
                                    <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center">
                                        <span className="material-icons text-white/70">domain</span>
                                    </div>
                                </div>

                                <div className="mb-6">
                                    <p className="text-3xl font-mono tracking-tight font-bold">{formatCurrency(acc.Balance / 100)}</p>
                                    <p className="text-sm text-slate-400 mt-1">Available {acc.Currency}</p>
                                </div>

                                <div className="flex gap-3">
                                    <button
                                        className="flex-1 py-2 bg-white/5 hover:bg-white/10 text-white text-xs font-semibold rounded-lg transition-colors border border-white/5"
                                        onClick={() => {
                                            setSelectedAccId(acc.ID);
                                            setIsDepositOpen(true);
                                        }}
                                    >
                                        Deposit
                                    </button>
                                    <button className="flex-1 py-2 bg-transparent hover:bg-white/5 text-[#A0A0A0] hover:text-white text-xs font-semibold rounded-lg transition-colors border border-transparent hover:border-white/5">
                                        Analytics
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {subAccounts.length === 0 && !loading && (
                    <div className="bg-[#121212] border border-[#262626] rounded-2xl p-12 text-center text-[#A0A0A0]">
                        <span className="material-icons text-5xl mb-4 text-[#333]">account_tree</span>
                        <h2 className="text-xl font-bold text-white mb-2">No Sub-Accounts</h2>
                        <p className="max-w-md mx-auto">You haven't allocated any funds to departments yet. Create a new department to branch off your main treasury.</p>
                    </div>
                )}

                {/* Modals here... */}
                {isCreateOpen && (
                    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center">
                        <div className="bg-[#121212] border border-[#262626] rounded-2xl p-8 max-w-md w-full shadow-2xl relative">
                            <button onClick={() => setIsCreateOpen(false)} className="absolute top-4 right-4 text-[#A0A0A0] hover:text-white">
                                <span className="material-icons">close</span>
                            </button>
                            <h2 className="text-2xl font-bold mb-6">Create Department</h2>
                            <form onSubmit={handleCreate} className="space-y-4">
                                <div>
                                    <label className="block text-xs font-semibold text-[#A0A0A0] uppercase tracking-wider mb-2">Department Name</label>
                                    <input type="text" required value={deptName} onChange={e => setDeptName(e.target.value)} className="w-full bg-black border border-[#262626] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#0d6cf2] transition-colors" placeholder="e.g. Marketing" />
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-[#A0A0A0] uppercase tracking-wider mb-2">Initial Allocation</label>
                                    <input type="number" step="0.01" required value={allocAmount} onChange={e => setAllocAmount(e.target.value)} className="w-full bg-black border border-[#262626] rounded-xl px-4 py-3 text-white font-mono focus:outline-none focus:border-[#0d6cf2] transition-colors" placeholder="10000.00" />
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-[#A0A0A0] uppercase tracking-wider mb-2">Monthly Spend Limit (Optional)</label>
                                    <input type="number" step="0.01" value={spendLimit} onChange={e => setSpendLimit(e.target.value)} className="w-full bg-black border border-[#262626] rounded-xl px-4 py-3 text-white font-mono focus:outline-none focus:border-[#0d6cf2] transition-colors" placeholder="e.g. 5000.00" />
                                </div>
                                <button type="submit" disabled={isSubmitting} className="w-full py-4 mt-4 bg-[#0d6cf2] hover:bg-[#0d6cf2]/90 disabled:opacity-50 text-white rounded-xl font-bold transition-all text-sm">
                                    {isSubmitting ? 'Creating...' : 'Create Department'}
                                </button>
                            </form>
                        </div>
                    </div>
                )}

                {isDepositOpen && (
                    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center">
                        <div className="bg-[#121212] border border-[#262626] rounded-2xl p-8 max-w-md w-full shadow-2xl relative">
                            <button onClick={() => setIsDepositOpen(false)} className="absolute top-4 right-4 text-[#A0A0A0] hover:text-white">
                                <span className="material-icons">close</span>
                            </button>
                            <h2 className="text-2xl font-bold mb-6">Deposit Funds</h2>
                            <form onSubmit={handleDeposit} className="space-y-4">
                                <div>
                                    <label className="block text-xs font-semibold text-[#A0A0A0] uppercase tracking-wider mb-2">Amount (USDC)</label>
                                    <input type="number" step="0.01" required value={depositAmount} onChange={e => setDepositAmount(e.target.value)} className="w-full bg-black border border-[#262626] rounded-xl px-4 py-3 text-white font-mono focus:outline-none focus:border-[#0d6cf2] transition-colors" placeholder="5000.00" />
                                </div>
                                <button type="submit" disabled={isSubmitting} className="w-full py-4 mt-4 bg-white/10 hover:bg-white/20 border border-white/10 disabled:opacity-50 text-white rounded-xl font-bold transition-all text-sm">
                                    {isSubmitting ? 'Transferring...' : 'Transfer from Treasury'}
                                </button>
                            </form>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
};

export default DepartmentalBudget;
