import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getPublicInvoice, payPublicInvoice } from '../api/invoice';
import { formatCurrency } from '../utils/formatCurrency';
import clsx from 'clsx';

const HostedPayment: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [invoice, setInvoice] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [isPaying, setIsPaying] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchInvoice = async () => {
            if (!id) return;
            try {
                const data = await getPublicInvoice(id);
                setInvoice(data.invoice);
            } catch (err) {
                setError("Invoice not found or expired.");
            } finally {
                setLoading(false);
            }
        };
        fetchInvoice();
    }, [id]);

    const handlePayment = async () => {
        if (!id) return;
        try {
            setIsPaying(true);
            await payPublicInvoice(id);
            // Refresh
            const data = await getPublicInvoice(id);
            setInvoice(data.invoice);
            alert("Payment completed successfully!");
        } catch (err: any) {
            alert(err.response?.data?.error || "Payment failed");
        } finally {
            setIsPaying(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#0d6cf2]"></div>
            </div>
        );
    }

    if (error || !invoice) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center text-white">
                <div className="text-center">
                    <span className="material-icons text-6xl text-red-500 mb-4 block">error_outline</span>
                    <h1 className="text-2xl font-bold">{error}</h1>
                </div>
            </div>
        );
    }

    const isPaid = invoice.Status === 'paid';

    return (
        <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center font-display p-4">
            <div className="w-full max-w-md">

                <div className="text-center mb-8">
                    <div className="w-12 h-12 bg-white rounded-xl shadow-[0_0_15px_rgba(255,255,255,0.2)] flex items-center justify-center mx-auto mb-4">
                        <span className="material-icons text-black text-2xl font-black">token</span>
                    </div>
                    <h1 className="text-2xl font-bold tracking-tight">Velo Payment Gateway</h1>
                </div>

                <div className={clsx("bg-[#121212] border border-[#262626] rounded-2xl p-8 shadow-2xl relative overflow-hidden", {
                    'border-emerald-500/30': isPaid
                })}>

                    {isPaid && (
                        <div className="absolute top-0 left-0 right-0 h-1.5 bg-emerald-500"></div>
                    )}

                    <div className="flex justify-between items-start border-b border-[#262626] pb-6 mb-6">
                        <div>
                            <p className="text-xs font-bold text-[#A0A0A0] uppercase tracking-widest mb-1">Billed To</p>
                            <p className="font-medium text-white">{invoice.ClientName}</p>
                            <p className="text-sm text-[#A0A0A0]">{invoice.ClientEmail}</p>
                        </div>
                        <div className="text-right">
                            <span className={clsx("inline-flex items-center px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-widest border", {
                                'bg-amber-500/10 text-amber-500 border-amber-500/20': invoice.Status === 'pending',
                                'bg-emerald-500/10 text-emerald-500 border-emerald-500/20': isPaid,
                            })}>
                                {invoice.Status}
                            </span>
                        </div>
                    </div>

                    <div className="mb-8">
                        <p className="text-xs font-bold text-[#A0A0A0] uppercase tracking-widest mb-2 text-center">Amount Due</p>
                        <h2 className={clsx("text-4xl font-bold text-center font-mono my-2", {
                            'text-emerald-400': isPaid
                        })}>
                            {formatCurrency(invoice.Amount / 100)} {invoice.Currency}
                        </h2>
                        <p className="text-sm text-[#A0A0A0] text-center">Due by {new Date(invoice.DueDate).toLocaleDateString()}</p>
                    </div>

                    {!isPaid ? (
                        <button
                            onClick={handlePayment}
                            disabled={isPaying}
                            className="w-full py-4 bg-[#0d6cf2] hover:bg-[#0d6cf2]/90 disabled:opacity-50 text-white rounded-xl font-bold transition-all text-sm flex items-center justify-center gap-2"
                        >
                            {isPaying ? 'Processing...' : (
                                <>
                                    <span className="material-icons text-sm">payment</span>
                                    Pay securely with USDC
                                </>
                            )}
                        </button>
                    ) : (
                        <div className="w-full py-4 bg-emerald-500/10 text-emerald-500 rounded-xl font-bold text-sm flex items-center justify-center gap-2">
                            <span className="material-icons">check_circle</span>
                            Payment Successfully Processed
                        </div>
                    )}

                    <p className="text-center text-[10px] text-slate-500 mt-6 font-medium">Secured by Velo Infrastructure</p>
                </div>
            </div>
        </div>
    );
};

export default HostedPayment;
