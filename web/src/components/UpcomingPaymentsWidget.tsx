import React, { useState, useEffect } from 'react';
import { getBatches } from '../api/payroll';
import { useNavigate } from 'react-router-dom';

interface PayrollBatch {
    id: string;
    description: string;
    total_amount: string;
    recipient_count: number;
    status: string;
    created_at: string;
}

const UpcomingPaymentsWidget: React.FC = () => {
    const [batches, setBatches] = useState<PayrollBatch[]>([]);
    const [loading, setLoading] = useState(true);
    // const [isCalendarOpen, setIsCalendarOpen] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchBatches = async () => {
            try {
                const data = await getBatches();
                // Filter for upcoming/pending batches
                const upcoming = data.filter((b: PayrollBatch) => b.status === 'pending' || b.status === 'processing');
                setBatches(upcoming);
            } catch (error) {
                console.error("Failed to fetch batches", error);
            } finally {
                setLoading(false);
            }
        };

        fetchBatches();
    }, []);

    const totalAmount = batches.reduce((sum, b) => sum + parseFloat(b.total_amount), 0);

    return (
        <div className="bg-obsidian-charcoal border border-border-dark-obsidian rounded-xl overflow-hidden flex flex-col h-full">
            {/* Header Section */}
            <div className="p-6 border-b border-border-dark-obsidian flex flex-col gap-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <h2 className="text-xl font-semibold text-white">Upcoming Payments</h2>
                        <span className="bg-primary/10 text-primary text-xs font-bold px-2.5 py-1 rounded-full border border-primary/20">
                            {batches.length} scheduled
                        </span>
                    </div>
                </div>

                <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                        {/* Filter Dropdown */}
                        <div className="relative group">
                            <button className="flex items-center gap-2 px-3 py-2 bg-primary/5 hover:bg-primary/10 border border-primary/20 rounded-lg text-sm transition-all text-slate-400">
                                <span>All Pending</span>
                                <span className="material-icons text-lg group-hover:text-primary transition-colors">expand_more</span>
                            </button>
                        </div>
                    </div>
                    {/* Primary Action Button */}
                    <button
                        onClick={() => navigate('/payroll/new')}
                        className="flex items-center gap-2 bg-primary hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-medium transition-all shadow-lg shadow-primary/20"
                    >
                        <span className="material-icons text-lg">add</span>
                        <span className="text-sm">Schedule</span>
                    </button>
                </div>
            </div>

            {/* List View */}
            <div className="p-6 flex-1 overflow-y-auto custom-scrollbar space-y-8">
                {loading ? (
                    <div className="text-center text-slate-500 py-10">Loading payments...</div>
                ) : batches.length === 0 ? (
                    <div className="text-center text-slate-500 py-10">
                        <span className="material-icons text-4xl mb-2 opacity-50">calendar_today</span>
                        <p>No upcoming payments scheduled.</p>
                    </div>
                ) : (
                    <div>
                        <div className="flex items-center gap-3 mb-4">
                            <span className="text-xs font-bold uppercase tracking-widest text-primary">Pending Batches</span>
                            <div className="h-px flex-1 bg-gradient-to-r from-primary/20 to-transparent"></div>
                        </div>
                        <div className="space-y-4">
                            {batches.map((batch) => (
                                <div key={batch.id} className="group flex flex-col gap-4 p-4 bg-slate-800/30 hover:bg-slate-800/50 border border-primary/10 rounded-xl transition-all">
                                    <div className="flex items-center gap-4">
                                        {/* Date Badge */}
                                        <div className="flex flex-col items-center justify-center w-14 h-14 bg-primary/20 rounded-lg text-primary shrink-0">
                                            <span className="text-[10px] font-bold uppercase">{new Date(batch.created_at).toLocaleString('default', { month: 'short' })}</span>
                                            <span className="text-xl font-bold leading-none">{new Date(batch.created_at).getDate()}</span>
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex flex-wrap items-center gap-2 mb-1">
                                                <h3 className="font-semibold text-white truncate">{batch.description}</h3>
                                                <span className={`flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded uppercase whitespace-nowrap ${batch.status === 'processing' ? 'bg-amber-500/10 text-amber-500 border border-amber-500/20' :
                                                    'bg-blue-500/10 text-blue-400 border border-blue-500/20'
                                                    }`}>
                                                    {batch.status}
                                                </span>
                                            </div>
                                            <div className="flex items-center gap-4">
                                                <span className="text-xl font-bold text-slate-200">${parseFloat(batch.total_amount).toLocaleString()}</span>
                                                <span className="text-sm text-slate-500">{batch.recipient_count} recipients</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2 justify-end">
                                        <button
                                            onClick={() => navigate(`/payroll/batches/${batch.id}`)}
                                            className="flex-1 flex items-center justify-center gap-2 bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition-all shadow-md shadow-primary/10"
                                        >
                                            <span className="material-icons text-lg">visibility</span>
                                            <span className="text-sm font-semibold uppercase tracking-wide">View Details</span>
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {/* Footer / Summary */}
            <div className="p-4 bg-slate-800/30 border-t border-primary/10 flex justify-between items-center text-xs text-slate-500 px-6">
                <div className="flex items-center gap-1">
                    <span className="font-medium">Total Pending:</span>
                    <span className="text-white font-bold">${totalAmount.toLocaleString()}</span>
                </div>
            </div>
        </div>
    );
};

export default UpcomingPaymentsWidget;
