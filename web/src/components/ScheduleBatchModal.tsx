import React from 'react';

interface ScheduleBatchModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const ScheduleBatchModal: React.FC<ScheduleBatchModalProps> = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-50 font-display">
            <div className="bg-obsidian-dark w-full max-w-[600px] rounded-xl shadow-2xl border border-border-dark-obsidian overflow-hidden">
                <div className="px-6 py-5 border-b border-border-dark-obsidian flex items-center justify-between">
                    <h2 className="text-xl font-semibold text-white flex items-center gap-2">
                        <span className="material-icons text-primary">schedule</span>
                        Schedule Batch Execution
                    </h2>
                    <button onClick={onClose} className="text-silver-grey hover:text-white transition-colors">
                        <span className="material-icons">close</span>
                    </button>
                </div>
                <div className="p-6 space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                        <label className="relative cursor-pointer group">
                            <input defaultChecked className="peer sr-only" name="execution_type" type="radio" />
                            <div className="p-4 border-2 border-border-dark-obsidian bg-obsidian-dark rounded-lg group-hover:bg-obsidian-surface/50 peer-checked:border-primary transition-all">
                                <p className="text-sm font-semibold text-white">One-time</p>
                                <p className="text-xs text-silver-grey mt-1">Single execution event</p>
                            </div>
                            <div className="absolute top-3 right-3 opacity-0 peer-checked:opacity-100">
                                <span className="material-icons text-primary text-sm">check_circle</span>
                            </div>
                        </label>
                        <label className="relative cursor-pointer group">
                            <input className="peer sr-only" name="execution_type" type="radio" />
                            <div className="p-4 border-2 border-border-dark-obsidian bg-obsidian-dark rounded-lg group-hover:bg-obsidian-surface/50 peer-checked:border-primary transition-all">
                                <p className="text-sm font-semibold text-white">Recurring</p>
                                <p className="text-xs text-silver-grey mt-1">Automated repeat cycle</p>
                            </div>
                            <div className="absolute top-3 right-3 opacity-0 peer-checked:opacity-100">
                                <span className="material-icons text-primary text-sm">check_circle</span>
                            </div>
                        </label>
                    </div>
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <label className="text-[10px] font-bold uppercase tracking-[0.1em] text-silver-grey">Frequency</label>
                            <div className="relative">
                                <select className="w-full bg-obsidian-dark border border-border-dark-obsidian rounded-lg px-4 py-3 text-white focus:ring-1 focus:ring-primary focus:border-primary transition-all appearance-none outline-none">
                                    <option>Weekly</option>
                                    <option selected>Monthly</option>
                                    <option>Quarterly</option>
                                    <option>Custom Interval</option>
                                </select>
                                <span className="material-icons absolute right-3 top-1/2 -translate-y-1/2 text-silver-grey pointer-events-none">expand_more</span>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-[10px] font-bold uppercase tracking-[0.1em] text-silver-grey">Day of Month</label>
                                <div className="relative">
                                    <input className="w-full bg-obsidian-dark border border-border-dark-obsidian rounded-lg px-4 py-3 text-white focus:ring-1 focus:ring-primary focus:border-primary transition-all outline-none" max="31" min="1" type="number" defaultValue="25" />
                                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-silver-grey text-sm">th</span>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-bold uppercase tracking-[0.1em] text-silver-grey">Execution Time (UTC)</label>
                                <div className="relative">
                                    <span className="material-icons absolute left-3 top-1/2 -translate-y-1/2 text-silver-grey text-lg">schedule</span>
                                    <input className="w-full bg-obsidian-dark border border-border-dark-obsidian rounded-lg pl-10 pr-4 py-3 text-white focus:ring-1 focus:ring-primary focus:border-primary transition-all outline-none" type="time" defaultValue="09:00" />
                                </div>
                            </div>
                        </div>
                        <div className="pt-2 flex items-center gap-6">
                            <label className="flex items-center gap-3 cursor-pointer group">
                                <div className="relative">
                                    <input defaultChecked className="peer sr-only" type="checkbox" />
                                    <div className="w-10 h-5 bg-border-dark-obsidian rounded-full peer-checked:bg-primary transition-colors"></div>
                                    <div className="absolute left-1 top-1 w-3 h-3 bg-white rounded-full transition-transform peer-checked:translate-x-5"></div>
                                </div>
                                <span className="text-sm text-silver-grey group-hover:text-white">Skip weekends</span>
                            </label>
                            <label className="flex items-center gap-3 cursor-pointer group">
                                <div className="relative">
                                    <input className="peer sr-only" type="checkbox" />
                                    <div className="w-10 h-5 bg-border-dark-obsidian rounded-full peer-checked:bg-primary transition-colors"></div>
                                    <div className="absolute left-1 top-1 w-3 h-3 bg-white rounded-full transition-transform peer-checked:translate-x-5"></div>
                                </div>
                                <span className="text-sm text-silver-grey group-hover:text-white">Notify on failure</span>
                            </label>
                        </div>
                    </div>
                    <div className="bg-obsidian-surface border border-border-dark-obsidian rounded-lg p-5 flex gap-4 items-start">
                        <span className="material-icons text-primary text-2xl">info</span>
                        <div>
                            <p className="text-sm font-semibold text-white">Execution Summary</p>
                            <p className="text-sm text-silver-grey mt-1 leading-relaxed">
                                Will execute on <span className="font-semibold text-white">Jan 25, 2026</span> at 09:00 AM.
                                Subsequent runs will occur on the 25th of every month.
                            </p>
                        </div>
                    </div>
                </div>
                <div className="px-6 py-5 bg-obsidian-dark flex items-center justify-end gap-4 border-t border-border-dark-obsidian">
                    <button onClick={onClose} className="px-5 py-2.5 text-sm font-medium text-silver-grey hover:text-white transition-colors">
                        Cancel
                    </button>
                    <button className="bg-primary hover:bg-blue-700 text-white px-8 py-2.5 rounded-lg text-sm font-semibold shadow-lg shadow-primary/20 transition-all flex items-center gap-2">
                        <span className="material-icons text-base">save</span>
                        Save Schedule
                    </button>
                </div>
            </div>
            {/* Background Decoration */}
            <div className="absolute top-1/4 -left-20 w-96 h-96 bg-primary/20 rounded-full blur-[120px] pointer-events-none"></div>
            <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-primary/10 rounded-full blur-[120px] pointer-events-none"></div>
        </div>
    );
};

export default ScheduleBatchModal;
