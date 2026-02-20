import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { uploadBatch } from '../api/payroll';

type UploadState = 'idle' | 'uploading' | 'complete';

const PayrollUpload: React.FC = () => {
    const navigate = useNavigate();
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [file, setFile] = useState<File | null>(null);
    const [uploadState, setUploadState] = useState<UploadState>('idle');
    const [uploadProgress, setUploadProgress] = useState(0);
    const [recurrenceRule, setRecurrenceRule] = useState('none');
    const [nextExecutionAt, setNextExecutionAt] = useState('');

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setFile(e.target.files[0]);
        }
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            setFile(e.dataTransfer.files[0]);
        }
    };

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
    };

    const startUpload = async () => {
        if (!file) return;
        setUploadState('uploading');
        setUploadProgress(10); // Start progress

        try {
            // Description is currently hardcoded as it's not in the UI
            const response = await uploadBatch(file, `Batch upload: ${file.name}`, recurrenceRule, nextExecutionAt);
            setUploadProgress(100);
            setUploadState('complete');
            // Store batch ID for navigation
            localStorage.setItem('lastUploadedBatchId', response.batch_id);
        } catch (error) {
            console.error("Upload failed", error);
            setUploadState('idle'); // Or ERROR state if implemented
            alert("Upload failed. Please try again.");
        }
    };

    const formatFileSize = (bytes: number) => {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    };

    return (
        <div className="bg-obsidian-black font-display text-white min-h-screen flex flex-col antialiased">
            {/* Header */}
            <header className="bg-charcoal border-b border-obsidian-border">
                <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-8">
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                                <span className="text-white font-bold text-xl italic">V</span>
                            </div>
                            <span className="font-bold text-xl tracking-tight text-white">Velo</span>
                        </div>
                        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-silver-grey">
                            <button onClick={() => navigate('/dashboard')} className="hover:text-white transition-colors">Dashboard</button>
                            <button onClick={() => navigate('/payroll')} className="text-white border-b-2 border-primary py-5">Payroll</button>
                            <button onClick={() => navigate('/wallets')} className="hover:text-white transition-colors">Wallets</button>
                            <button onClick={() => navigate('/reports')} className="hover:text-white transition-colors">Reporting</button>
                        </nav>
                    </div>
                    <div className="flex items-center gap-4">
                        <button className="p-2 text-silver-grey hover:text-white transition-colors">
                            <span className="material-icons">notifications</span>
                        </button>
                        <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-xs border border-primary/30">
                            JD
                        </div>
                    </div>
                </div>
            </header>

            <main className="flex-1 max-w-7xl mx-auto w-full px-6 py-8 flex flex-col gap-8">
                <div className="flex flex-col gap-4">
                    <div className="flex items-center justify-between max-w-2xl">
                        <h1 className="text-2xl font-bold text-white">Create Payroll Batch</h1>
                        <span className="text-xs font-bold uppercase tracking-widest text-primary bg-primary/10 px-3 py-1 rounded-full border border-primary/20">Step 2 of 4</span>
                    </div>
                    {/* Progress Bar (Overall Flow) */}
                    <div className="w-full max-w-2xl h-1 bg-obsidian-border rounded-full overflow-hidden">
                        <div className="w-2/4 h-full bg-primary rounded-full"></div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    <div className="lg:col-span-8 flex flex-col gap-6">
                        {/* Tab Navigation (Only visible in idle state) */}
                        {uploadState === 'idle' && (
                            <div className="flex border-b border-obsidian-border">
                                <button className="px-6 py-3 text-sm font-semibold border-b-2 border-primary text-white">Upload File</button>
                                <button className="px-6 py-3 text-sm font-semibold text-silver-grey hover:text-white transition-colors">Paste CSV Data</button>
                                <button className="px-6 py-3 text-sm font-semibold text-silver-grey hover:text-white transition-colors">Import from URL</button>
                            </div>
                        )}

                        {/* Main Interaction Area */}
                        <div className="bg-charcoal rounded-xl border border-obsidian-border shadow-2xl overflow-hidden">
                            {uploadState === 'idle' && (
                                <div className="p-6 space-y-6">
                                    <div
                                        className="dashed-border w-full min-h-[300px] flex flex-col items-center justify-center bg-obsidian-black/40 group cursor-pointer transition-all duration-300 hover:bg-obsidian-black/60 border-2 border-dashed border-obsidian-border hover:border-primary rounded-xl"
                                        onDrop={handleDrop}
                                        onDragOver={handleDragOver}
                                        onClick={() => fileInputRef.current?.click()}
                                    >
                                        <input
                                            type="file"
                                            ref={fileInputRef}
                                            className="hidden"
                                            accept=".csv"
                                            onChange={handleFileSelect}
                                        />
                                        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-all">
                                            <span className="material-icons text-primary text-4xl">cloud_upload</span>
                                        </div>
                                        <h3 className="text-xl font-semibold mb-2 text-white">
                                            {file ? file.name : 'Drag and drop your CSV file here'}
                                        </h3>
                                        {!file && (
                                            <p className="text-silver-grey mb-8">or <span className="text-primary font-medium hover:underline">click to browse</span> your computer</p>
                                        )}
                                    </div>

                                    {/* Recurrence Settings */}
                                    <div className="bg-charcoal p-4 rounded-lg border border-obsidian-border">
                                        <h4 className="text-sm font-semibold text-white mb-4">Scheduling (Optional)</h4>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-xs text-silver-grey mb-1">Recurrence</label>
                                                <select
                                                    value={recurrenceRule}
                                                    onChange={(e) => setRecurrenceRule(e.target.value)}
                                                    className="w-full bg-obsidian-black border border-obsidian-border rounded px-3 py-2 text-white text-sm focus:border-primary focus:outline-none"
                                                >
                                                    <option value="none">None (One-time)</option>
                                                    <option value="weekly">Weekly</option>
                                                    <option value="bi-weekly">Bi-Weekly</option>
                                                    <option value="monthly">Monthly</option>
                                                </select>
                                            </div>
                                            {recurrenceRule !== 'none' && (
                                                <div>
                                                    <label className="block text-xs text-silver-grey mb-1">First Execution</label>
                                                    <input
                                                        type="datetime-local"
                                                        value={nextExecutionAt}
                                                        onChange={(e) => setNextExecutionAt(e.target.value)}
                                                        className="w-full bg-obsidian-black border border-obsidian-border rounded px-3 py-2 text-white text-sm focus:border-primary focus:outline-none"
                                                    />
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    {/* Upload Button */}
                                    {file && (
                                        <button
                                            onClick={startUpload}
                                            className="w-full py-3 bg-primary hover:bg-primary/90 text-white font-bold rounded-lg transition-colors"
                                        >
                                            Start Upload
                                        </button>
                                    )}
                                </div>
                            )}

                            {uploadState === 'uploading' && (
                                <div className="p-8">
                                    <div className="flex items-center justify-between mb-6">
                                        <h2 className="font-semibold text-lg text-white">Uploading File</h2>
                                        <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-primary/20 text-blue-400">Active Upload</span>
                                    </div>
                                    <div className="border-2 border-dashed border-white/10 rounded-xl p-10 bg-white/[0.02] flex flex-col items-center text-center">
                                        <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mb-4 animate-pulse">
                                            <span className="material-icons text-primary">cloud_upload</span>
                                        </div>
                                        <div className="mb-6 w-full max-w-sm">
                                            <div className="flex justify-between items-end mb-2">
                                                <div className="text-left">
                                                    <p className="font-semibold text-sm text-white">{file?.name}</p>
                                                    <p className="text-xs text-silver-grey">{file ? formatFileSize(file.size) : ''} • {uploadProgress}% uploaded</p>
                                                </div>
                                                <button onClick={() => setUploadState('idle')} className="text-xs font-semibold text-red-400 hover:text-red-300 transition-colors uppercase tracking-wider">Cancel</button>
                                            </div>
                                            <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden">
                                                <div className="bg-primary h-full rounded-full transition-all duration-100 ease-out" style={{ width: `${uploadProgress}%` }}></div>
                                            </div>
                                        </div>
                                        <p className="text-xs text-silver-grey max-w-xs">
                                            Your file is being encrypted and processed. This may take a few moments depending on your connection speed.
                                        </p>
                                    </div>
                                </div>
                            )}

                            {uploadState === 'complete' && (
                                <div className="p-8">
                                    <div className="flex items-center justify-between mb-6">
                                        <h2 className="font-semibold text-lg text-white">Upload Complete</h2>
                                        <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-500">Finished</span>
                                    </div>
                                    <div className="border-2 border-dashed border-emerald-500/20 rounded-xl p-10 bg-emerald-500/[0.03] flex flex-col items-center text-center">
                                        <div className="w-16 h-16 bg-emerald-500 rounded-full flex items-center justify-center mb-6 shadow-lg shadow-emerald-500/20 ring-4 ring-emerald-500/10">
                                            <span className="material-icons text-white text-3xl">check_circle</span>
                                        </div>
                                        <div className="mb-6">
                                            <h3 className="text-xl font-bold text-emerald-500 mb-1">File uploaded successfully!</h3>
                                            <p className="text-sm font-medium text-white">{file?.name}</p>
                                            <p className="text-xs text-silver-grey">{file ? formatFileSize(file.size) : ''} • Processed</p>
                                        </div>
                                        <div className="flex items-center gap-2 py-2 px-4 bg-white/5 rounded-lg border border-emerald-500/20">
                                            <span className="material-icons text-emerald-500 text-sm">security</span>
                                            <span className="text-xs font-medium text-silver-grey">Data validated & encrypted</span>
                                        </div>
                                    </div>
                                    <div className="mt-8 flex flex-col gap-3">
                                        <button
                                            onClick={() => {
                                                const batchId = localStorage.getItem('lastUploadedBatchId');
                                                if (batchId) {
                                                    navigate(`/payroll/review/${batchId}`);
                                                } else {
                                                    alert("Batch ID not found. Please try uploading again.");
                                                }
                                            }}
                                            className="w-full py-3.5 px-6 rounded-lg bg-primary text-white font-semibold shadow-lg shadow-primary/20 hover:brightness-110 transition-all active:scale-[0.98]"
                                        >
                                            Continue to Review
                                        </button>
                                        <button
                                            onClick={() => { setFile(null); setUploadState('idle'); setUploadProgress(0); }}
                                            className="w-full py-3 text-silver-grey text-sm font-medium hover:text-white transition-colors"
                                        >
                                            Upload a different file
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    <aside className="lg:col-span-4 flex flex-col gap-6">
                        {/* Quick Tips */}
                        <div className="bg-charcoal rounded-xl p-6 border border-obsidian-border shadow-sm">
                            <h4 className="text-xs font-bold uppercase tracking-widest text-silver-grey mb-5 flex items-center gap-2">
                                <span className="material-icons text-sm text-primary">lightbulb</span>
                                Quick Tips
                            </h4>
                            <ul className="space-y-4">
                                <li className="flex gap-3">
                                    <span className="material-icons text-emerald-500 text-sm mt-0.5">check_circle</span>
                                    <p className="text-sm leading-relaxed text-silver-grey">Headers must include <code className="bg-obsidian-black px-1.5 py-0.5 rounded text-white border border-obsidian-border">Wallet</code> and <code className="bg-obsidian-black px-1.5 py-0.5 rounded text-white border border-obsidian-border">Amount</code>.</p>
                                </li>
                                <li className="flex gap-3">
                                    <span className="material-icons text-emerald-500 text-sm mt-0.5">check_circle</span>
                                    <p className="text-sm leading-relaxed text-silver-grey">All amounts are processed in <span className="text-white font-semibold">USD</span> by default.</p>
                                </li>
                                <li className="flex gap-3">
                                    <span className="material-icons text-emerald-500 text-sm mt-0.5">check_circle</span>
                                    <p className="text-sm leading-relaxed text-silver-grey">Ensure all <span className="text-white font-semibold">0x wallet addresses</span> are valid Ethereum-compatible strings.</p>
                                </li>
                            </ul>
                        </div>

                        {/* Sample CSV Preview */}
                        <div className="bg-charcoal rounded-xl overflow-hidden border border-obsidian-border shadow-sm">
                            <div className="p-4 border-b border-obsidian-border flex items-center justify-between bg-obsidian-black/40">
                                <h4 className="text-xs font-bold uppercase tracking-widest text-silver-grey">Sample CSV Preview</h4>
                                <button className="text-primary text-[10px] font-bold uppercase tracking-wider hover:text-white transition-colors">Template</button>
                            </div>
                            <div className="p-4 bg-obsidian-black text-silver-grey font-mono text-[11px] leading-6 overflow-x-auto">
                                <div className="text-silver-grey/40">name,wallet,amount,currency</div>
                                <div className="text-silver-grey/90">John Doe,0x71C...456,1500.00,USD</div>
                                <div className="text-silver-grey/90">Jane Smith,0x123...abc,2250.50,USD</div>
                                <div className="text-silver-grey/90">Robert Key,0xf88...991,3100.00,USD</div>
                            </div>
                        </div>

                        {/* Recent Uploads */}
                        <div className="bg-charcoal rounded-xl p-6 border border-obsidian-border shadow-sm">
                            <h4 className="text-xs font-bold uppercase tracking-widest text-silver-grey mb-4">Recent Uploads</h4>
                            <div className="space-y-3">
                                <div className="flex items-center justify-between p-3 rounded-lg border border-obsidian-border bg-obsidian-black/20 hover:bg-obsidian-black/60 transition-colors cursor-pointer group">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-obsidian-border rounded">
                                            <span className="material-icons text-silver-grey group-hover:text-primary transition-colors text-lg">history</span>
                                        </div>
                                        <div>
                                            <p className="text-sm font-semibold text-white">payroll_jan_final.csv</p>
                                            <p className="text-[10px] text-silver-grey">2 days ago • 142 rows</p>
                                        </div>
                                    </div>
                                    <span className="material-icons text-obsidian-border group-hover:text-white text-sm transition-colors">chevron_right</span>
                                </div>
                                <div className="flex items-center justify-between p-3 rounded-lg border border-obsidian-border bg-obsidian-black/20 hover:bg-obsidian-black/60 transition-colors cursor-pointer group">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-obsidian-border rounded">
                                            <span className="material-icons text-silver-grey group-hover:text-primary transition-colors text-lg">history</span>
                                        </div>
                                        <div>
                                            <p className="text-sm font-semibold text-white">bonus_q4_rewards.csv</p>
                                            <p className="text-[10px] text-silver-grey">1 week ago • 24 rows</p>
                                        </div>
                                    </div>
                                    <span className="material-icons text-obsidian-border group-hover:text-white text-sm transition-colors">chevron_right</span>
                                </div>
                            </div>
                        </div>
                    </aside>
                </div>
            </main>

            {/* Sticky Footer */}
            <footer className="bg-charcoal border-t border-obsidian-border py-6 mt-auto">
                <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
                    <button onClick={() => navigate('/payroll/new')} className="px-6 py-2.5 text-sm font-semibold text-silver-grey border border-obsidian-border rounded-lg hover:bg-obsidian-black hover:text-white transition-all flex items-center gap-2">
                        <span className="material-icons text-sm">arrow_back</span>
                        Back
                    </button>
                    <div className="flex items-center gap-6">
                        {uploadState === 'idle' && (
                            <p className="text-xs font-medium text-silver-grey/60 hidden sm:block italic">No file selected</p>
                        )}
                        <button
                            disabled={uploadState !== 'complete'}
                            className={`px-12 py-2.5 text-sm font-bold text-white bg-primary rounded-lg shadow-xl shadow-primary/10 transition-all ${uploadState === 'complete' ? 'hover:bg-blue-600 cursor-pointer' : 'opacity-50 cursor-not-allowed'
                                }`}
                        >
                            Continue
                        </button>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default PayrollUpload;
