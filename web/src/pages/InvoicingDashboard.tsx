import React, { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar';
import { getCompanyInvoices, createInvoice } from '../api/invoice';
import clsx from 'clsx';
import { formatCurrency } from '../utils/formatCurrency';

const InvoicingDashboard: React.FC = () => {
    const [invoices, setInvoices] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    // Create Modal state
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [clientName, setClientName] = useState('');
    const [clientEmail, setClientEmail] = useState('');
    const [amount, setAmount] = useState('');
    const [isCreating, setIsCreating] = useState(false);

    useEffect(() => {
        const fetchInvoices = async () => {
            try {
                const data = await getCompanyInvoices();
                setInvoices(data.invoices || []);
            } catch (error) {
                console.error("Failed to load invoices", error);
            } finally {
                setLoading(false);
            }
        };
        fetchInvoices();
    }, []);

    const handleCreate = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            setIsCreating(true);
            const amtInCents = Math.round(parseFloat(amount) * 100);
            await createInvoice({
                client_name: clientName,
                client_email: clientEmail,
                amount: amtInCents,
                currency: 'USDC',
                due_days: 30
            });
            setIsCreateModalOpen(false);

            // Refresh
            const data = await getCompanyInvoices();
            setInvoices(data.invoices || []);

            setClientName('');
            setClientEmail('');
            setAmount('');
        } catch (error: any) {
            alert(error.response?.data?.error || "Creation failed.");
        } finally {
            setIsCreating(false);
        }
    };

    const copyPaymentLink = (id: string) => {
        const link = `${window.location.origin}/pay/${id}`;
        navigator.clipboard.writeText(link);
        alert('Payment link copied to clipboard!');
    };

    return (
        <div className="flex min-h-screen bg-black text-white font-display selection:bg-[#0d6cf2]/30">
            <Sidebar />
            <main className="flex-1 max-w-7xl mx-auto px-8 py-10 overflow-y-auto">
                <header className="flex justify-between items-end mb-10">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Invoicing & Receivables</h1>
                        <p className="text-[#A0A0A0] mt-2 max-w-2xl">Create and track invoices. Generate shareable payment links for your clients.</p>
                    </div>
                    <button
                        onClick={() => setIsCreateModalOpen(true)}
                        className="px-6 py-2.5 bg-[#0d6cf2] hover:bg-[#0d6cf2]/90 text-white rounded-lg font-bold shadow-[0_4px_15px_rgba(13,108,242,0.3)] transition-all flex items-center gap-2"
                    >
                        <span className="material-icons text-sm">add</span>
                        New Invoice
                    </button>
                </header>

                <div className="bg-[#121212] border border-[#262626] rounded-xl overflow-hidden shadow-2xl">
                    <div className="p-6 border-b border-[#262626] flex items-center justify-between">
                        <h3 className="text-sm font-bold text-[#A0A0A0] tracking-widest uppercase">Issued Invoices</h3>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-black/50 border-b border-[#262626]">
                                <tr>
                                    <th className="px-6 py-4 text-xs font-bold text-[#A0A0A0] uppercase tracking-wider">Client</th>
                                    <th className="px-6 py-4 text-xs font-bold text-[#A0A0A0] uppercase tracking-wider">Amount</th>
                                    <th className="px-6 py-4 text-xs font-bold text-[#A0A0A0] uppercase tracking-wider">Status</th>
                                    <th className="px-6 py-4 text-xs font-bold text-[#A0A0A0] uppercase tracking-wider">Due Date</th>
                                    <th className="px-6 py-4 text-xs font-bold text-[#A0A0A0] uppercase tracking-wider text-right">Payment Link</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-[#262626]">
                                {loading ? (
                                    <tr>
                                        <td colSpan={5} className="px-6 py-12 text-center text-[#A0A0A0]">
                                            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white mx-auto"></div>
                                        </td>
                                    </tr>
                                ) : invoices.length === 0 ? (
                                    <tr>
                                        <td colSpan={5} className="px-6 py-12 text-center text-[#A0A0A0]">
                                            <span className="material-icons text-4xl mb-3 text-[#333]">receipt</span>
                                            <p className="text-sm">No invoices found. Create one to get started.</p>
                                        </td>
                                    </tr>
                                ) : (
                                    invoices.map((inv: any) => (
                                        <tr key={inv.ID} className="bg-[#121212] hover:bg-white/[0.02] transition-colors group">
                                            <td className="px-6 py-4">
                                                <p className="text-sm font-bold text-white">{inv.ClientName}</p>
                                                <p className="text-xs text-[#A0A0A0]">{inv.ClientEmail}</p>
                                            </td>
                                            <td className="px-6 py-4 font-mono text-sm">
                                                {formatCurrency(inv.Amount / 100)} {inv.Currency}
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className={clsx("inline-flex items-center px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-widest border", {
                                                    'bg-amber-500/10 text-amber-500 border-amber-500/20': inv.Status === 'pending',
                                                    'bg-emerald-500/10 text-emerald-500 border-emerald-500/20': inv.Status === 'paid',
                                                    'bg-red-500/10 text-red-500 border-red-500/20': inv.Status === 'overdue' || inv.Status === 'cancelled'
                                                })}>
                                                    {inv.Status}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-sm text-[#A0A0A0]">
                                                {new Date(inv.DueDate).toLocaleDateString()}
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <button
                                                    onClick={() => copyPaymentLink(inv.ID)}
                                                    className="inline-flex items-center gap-2 text-xs font-semibold text-[#0d6cf2] hover:text-[#0d6cf2]/80 transition-colors"
                                                >
                                                    <span className="material-icons text-sm">link</span> Copy
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Create Invoice Modal */}
                {isCreateModalOpen && (
                    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center">
                        <div className="bg-[#121212] border border-[#262626] rounded-2xl p-8 max-w-md w-full shadow-2xl relative">
                            <button
                                onClick={() => setIsCreateModalOpen(false)}
                                className="absolute top-4 right-4 text-[#A0A0A0] hover:text-white"
                            >
                                <span className="material-icons">close</span>
                            </button>

                            <h2 className="text-2xl font-bold mb-6">Create Invoice</h2>

                            <form onSubmit={handleCreate} className="space-y-4">
                                <div>
                                    <label className="block text-xs font-semibold text-[#A0A0A0] uppercase tracking-wider mb-2">Client Name</label>
                                    <input
                                        type="text"
                                        required
                                        value={clientName}
                                        onChange={e => setClientName(e.target.value)}
                                        className="w-full bg-black border border-[#262626] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#0d6cf2] transition-colors"
                                        placeholder="Acme Corp"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-[#A0A0A0] uppercase tracking-wider mb-2">Client Email</label>
                                    <input
                                        type="email"
                                        required
                                        value={clientEmail}
                                        onChange={e => setClientEmail(e.target.value)}
                                        className="w-full bg-black border border-[#262626] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#0d6cf2] transition-colors"
                                        placeholder="billing@acme.com"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-[#A0A0A0] uppercase tracking-wider mb-2">Amount (USDC)</label>
                                    <div className="relative">
                                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#A0A0A0]">$</span>
                                        <input
                                            type="number"
                                            required
                                            min="1"
                                            step="0.01"
                                            value={amount}
                                            onChange={e => setAmount(e.target.value)}
                                            className="w-full bg-black border border-[#262626] rounded-xl pl-8 pr-4 py-3 text-white font-mono focus:outline-none focus:border-[#0d6cf2] transition-colors"
                                            placeholder="5000.00"
                                        />
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    disabled={isCreating}
                                    className="w-full py-4 mt-4 bg-[#0d6cf2] hover:bg-[#0d6cf2]/90 disabled:opacity-50 text-white rounded-xl font-bold transition-all text-sm"
                                >
                                    {isCreating ? 'Generating...' : 'Generate Invoice'}
                                </button>
                            </form>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
};

export default InvoicingDashboard;
