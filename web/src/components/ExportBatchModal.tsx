import React from 'react';

interface ExportBatchModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const ExportBatchModal: React.FC<ExportBatchModalProps> = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-50 font-display">
            <div className="bg-obsidian-dark w-full max-w-[500px] rounded-xl shadow-[0_0_40px_rgba(0,0,0,0.5)] border border-border-dark-obsidian overflow-hidden">
                <div className="flex items-center justify-between px-6 py-5 border-b border-border-dark-obsidian">
                    <h2 className="text-xl font-semibold text-white flex items-center gap-2.5">
                        <span className="material-icons text-primary">upload_file</span>
                        Export Batch
                    </h2>
                    <button onClick={onClose} className="text-silver-grey hover:text-white transition-colors">
                        <span className="material-icons">close</span>
                    </button>
                </div>
                <div className="p-6 space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-silver-grey mb-4">Choose Export Format</label>
                        <div className="grid grid-cols-1 gap-3">
                            <div className="relative group cursor-pointer border-2 border-primary bg-primary/5 rounded-lg p-4 flex items-start gap-4 transition-all">
                                <div className="p-2 bg-primary rounded-lg text-white">
                                    <span className="material-icons">table_chart</span>
                                </div>
                                <div className="flex-1">
                                    <div className="flex justify-between items-center">
                                        <h3 className="font-semibold text-white text-sm">CSV File</h3>
                                        <span className="material-icons text-primary text-xl">check_circle</span>
                                    </div>
                                    <p className="text-xs text-silver-grey mt-1">Standard spreadsheet format for data analysis.</p>
                                </div>
                            </div>
                            <div className="relative group cursor-pointer border border-border-dark-obsidian hover:border-silver-grey/50 bg-obsidian-dark rounded-lg p-4 flex items-start gap-4 transition-all">
                                <div className="p-2 bg-border-dark-obsidian rounded-lg text-silver-grey group-hover:text-white transition-colors">
                                    <span className="material-icons">picture_as_pdf</span>
                                </div>
                                <div className="flex-1">
                                    <h3 className="font-semibold text-white text-sm">PDF Report</h3>
                                    <p className="text-xs text-silver-grey mt-1">Formal report with visual formatting.</p>
                                </div>
                            </div>
                            <div className="relative group cursor-pointer border border-border-dark-obsidian hover:border-silver-grey/50 bg-obsidian-dark rounded-lg p-4 flex items-start gap-4 transition-all">
                                <div className="p-2 bg-border-dark-obsidian rounded-lg text-silver-grey group-hover:text-white transition-colors">
                                    <span className="material-icons">code</span>
                                </div>
                                <div className="flex-1">
                                    <h3 className="font-semibold text-white text-sm">JSON Data</h3>
                                    <p className="text-xs text-silver-grey mt-1">Structured data for developer integration.</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="p-4 bg-white/5 rounded-lg space-y-3 border border-border-dark-obsidian">
                        <h4 className="text-[10px] font-bold uppercase tracking-[0.1em] text-silver-grey/60">PDF Report Options</h4>
                        <div className="space-y-3">
                            <label className="flex items-center gap-3 cursor-pointer group">
                                <input defaultChecked className="w-4 h-4 rounded border-border-dark-obsidian bg-transparent text-primary focus:ring-primary focus:ring-offset-obsidian-dark" type="checkbox" />
                                <span className="text-sm text-silver-grey group-hover:text-white transition-colors">Include transaction details</span>
                            </label>
                            <label className="flex items-center gap-3 cursor-pointer group">
                                <input className="w-4 h-4 rounded border-border-dark-obsidian bg-transparent text-primary focus:ring-primary focus:ring-offset-obsidian-dark" type="checkbox" />
                                <span className="text-sm text-silver-grey group-hover:text-white transition-colors">Apply company branding</span>
                            </label>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <h4 className="text-sm font-semibold text-white">File Configuration</h4>
                        <div>
                            <label className="block text-xs font-medium text-silver-grey mb-1.5">File Name</label>
                            <input className="w-full bg-transparent border-border-dark-obsidian rounded-lg focus:ring-primary focus:border-primary text-sm text-white placeholder-silver-grey/40" type="text" defaultValue="Batch_Export_2023-11-24" />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-medium text-silver-grey mb-1.5">Date Format</label>
                                <select className="w-full bg-transparent border-border-dark-obsidian rounded-lg focus:ring-primary focus:border-primary text-sm text-white">
                                    <option className="bg-obsidian-dark">MM/DD/YYYY</option>
                                    <option className="bg-obsidian-dark">DD/MM/YYYY</option>
                                    <option className="bg-obsidian-dark">YYYY-MM-DD</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-xs font-medium text-silver-grey mb-1.5">Amount Format</label>
                                <select className="w-full bg-transparent border-border-dark-obsidian rounded-lg focus:ring-primary focus:border-primary text-sm text-white">
                                    <option className="bg-obsidian-dark">$ 1,234.56</option>
                                    <option className="bg-obsidian-dark">€ 1.234,56</option>
                                    <option className="bg-obsidian-dark">1 234,56</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="px-6 py-5 bg-white/[0.02] border-t border-border-dark-obsidian flex items-center justify-end gap-3">
                    <button onClick={onClose} className="px-4 py-2 text-sm font-medium text-silver-grey hover:text-white transition-colors">
                        Cancel
                    </button>
                    <button className="bg-primary hover:bg-blue-700 text-white px-6 py-2 rounded-lg text-sm font-semibold flex items-center gap-2 shadow-lg shadow-primary/20 transition-all">
                        <span className="material-icons text-lg">download</span>
                        Export
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ExportBatchModal;
