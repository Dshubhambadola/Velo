import React, { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar';
import { getCompanyTaxDocuments, generate1099s } from '../api/tax';
import clsx from 'clsx';

const TaxCenter: React.FC = () => {
    const [documents, setDocuments] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [generating, setGenerating] = useState(false);
    const [selectedYear, setSelectedYear] = useState<number>(new Date().getFullYear());

    useEffect(() => {
        const fetchDocs = async () => {
            setLoading(true);
            try {
                const data = await getCompanyTaxDocuments(selectedYear);
                setDocuments(data.documents || []);
            } catch (error) {
                console.error("Failed to load tax documents", error);
            } finally {
                setLoading(false);
            }
        };
        fetchDocs();
    }, [selectedYear]);

    const handleGenerate = async () => {
        if (!window.confirm(`Generate 1099s for the year ${selectedYear}? This may take a few minutes.`)) return;

        try {
            setGenerating(true);
            await generate1099s(selectedYear);
            alert("1099 generation started. Documents will appear here once completed.");

            // Refresh
            const data = await getCompanyTaxDocuments(selectedYear);
            setDocuments(data.documents || []);
        } catch (error: any) {
            alert(error.response?.data?.error || "Generation failed.");
        } finally {
            setGenerating(false);
        }
    };

    return (
        <div className="flex min-h-screen bg-black text-white font-display selection:bg-[#0d6cf2]/30">
            <Sidebar />
            <main className="flex-1 max-w-7xl mx-auto px-8 py-10 overflow-y-auto">
                <header className="flex justify-between items-end mb-10">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Tax Center</h1>
                        <p className="text-[#A0A0A0] mt-2 max-w-2xl">Manage contractor tax documents (W-9 / W-8BEN) and automate 1099-NEC generation for end-of-year tax reporting.</p>
                    </div>
                    <div className="flex items-center gap-4">
                        <select
                            value={selectedYear}
                            onChange={(e) => setSelectedYear(Number(e.target.value))}
                            className="bg-[#121212] border border-[#262626] text-white px-4 py-2 rounded-lg font-bold"
                        >
                            {[2024, 2025, 2026, 2027].map(y => (
                                <option key={y} value={y}>{y}</option>
                            ))}
                        </select>
                        <button
                            onClick={handleGenerate}
                            disabled={generating}
                            className="px-6 py-2.5 bg-[#0d6cf2] hover:bg-[#0d6cf2]/90 disabled:opacity-50 text-white rounded-lg font-bold shadow-[0_4px_15px_rgba(13,108,242,0.3)] transition-all flex items-center gap-2"
                        >
                            {generating ? (
                                <span className="material-icons animate-spin text-sm">refresh</span>
                            ) : (
                                <span className="material-icons text-sm">receipt_long</span>
                            )}
                            Generate 1099 Form
                        </button>
                    </div>
                </header>

                <div className="bg-[#121212] border border-[#262626] rounded-xl overflow-hidden shadow-2xl">
                    <div className="p-6 border-b border-[#262626] flex items-center justify-between">
                        <h3 className="text-sm font-bold text-[#A0A0A0] tracking-widest uppercase">Collected Documents</h3>
                        <div className="flex gap-2">
                            <button className="text-xs px-3 py-1.5 bg-[#262626] hover:bg-[#333] rounded transition-colors text-white font-medium flex items-center gap-1">
                                <span className="material-icons text-[14px]">filter_list</span> Filter
                            </button>
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-black/50 border-b border-[#262626]">
                                <tr>
                                    <th className="px-6 py-4 text-xs font-bold text-[#A0A0A0] uppercase tracking-wider">Document ID</th>
                                    <th className="px-6 py-4 text-xs font-bold text-[#A0A0A0] uppercase tracking-wider">Type</th>
                                    <th className="px-6 py-4 text-xs font-bold text-[#A0A0A0] uppercase tracking-wider">Tax Year</th>
                                    <th className="px-6 py-4 text-xs font-bold text-[#A0A0A0] uppercase tracking-wider">Status</th>
                                    <th className="px-6 py-4 text-xs font-bold text-[#A0A0A0] uppercase tracking-wider text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-[#262626]">
                                {loading ? (
                                    <tr>
                                        <td colSpan={5} className="px-6 py-12 text-center text-[#A0A0A0]">
                                            <div className="flex justify-center items-center">
                                                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                                            </div>
                                        </td>
                                    </tr>
                                ) : documents.length === 0 ? (
                                    <tr>
                                        <td colSpan={5} className="px-6 py-12 text-center text-[#A0A0A0]">
                                            <span className="material-icons text-4xl mb-3 text-[#333]">folder_open</span>
                                            <p className="text-sm">No tax documents collected for {selectedYear}</p>
                                        </td>
                                    </tr>
                                ) : (
                                    documents.map((doc: any) => (
                                        <tr key={doc.ID} className="bg-[#121212] hover:bg-white/[0.02] transition-colors group">
                                            <td className="px-6 py-4">
                                                <span className="text-sm text-slate-300 font-mono">{doc.ID.substring(0, 8)}...</span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-2">
                                                    <span className={clsx("w-8 h-8 rounded-lg flex flex-shrink-0 items-center justify-center font-bold text-xs shadow-inner", {
                                                        'bg-indigo-500/10 text-indigo-400': doc.Type.toLowerCase().includes('w9') || doc.Type.toLowerCase().includes('w8'),
                                                        'bg-emerald-500/10 text-emerald-400': doc.Type === '1099'
                                                    })}>
                                                        {doc.Type === '1099' ? '1099' : 'W-9'}
                                                    </span>
                                                    <span className="text-sm font-semibold text-white uppercase tracking-wider">{doc.Type}</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-sm text-[#A0A0A0]">{doc.Year}</td>
                                            <td className="px-6 py-4">
                                                <span className={clsx("inline-flex items-center px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-widest border", {
                                                    'bg-amber-500/10 text-amber-500 border-amber-500/20': doc.Status === 'pending',
                                                    'bg-green-500/10 text-green-500 border-green-500/20': doc.Status === 'verified' || doc.Status === 'generated',
                                                    'bg-red-500/10 text-red-500 border-red-500/20': doc.Status === 'rejected'
                                                })}>
                                                    {doc.Status}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <a
                                                    href={doc.FileURL}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="inline-flex items-center gap-2 text-xs font-semibold text-[#0d6cf2] hover:text-[#0d6cf2]/80 transition-colors"
                                                >
                                                    <span className="material-icons text-sm">download</span> Download
                                                </a>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default TaxCenter;
