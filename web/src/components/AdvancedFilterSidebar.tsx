import React from 'react';

interface AdvancedFilterSidebarProps {
    isOpen: boolean;
    onClose: () => void;
}

const AdvancedFilterSidebar: React.FC<AdvancedFilterSidebarProps> = ({ isOpen, onClose }) => {
    return (
        <>
            {/* Backdrop */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40 transition-opacity"
                    onClick={onClose}
                />
            )}

            {/* Sidebar */}
            <aside className={`fixed right-0 top-0 h-screen w-[400px] bg-background-dark shadow-2xl z-50 flex flex-col border-l border-border-dark-obsidian transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                <div className="px-6 py-6 border-b border-border-dark-obsidian flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <span className="material-icons text-primary">filter_alt</span>
                        <h2 className="text-lg font-bold text-white uppercase tracking-wider">Advanced Filters</h2>
                    </div>
                    <div className="flex items-center gap-4">
                        <button className="text-sm font-medium text-primary hover:text-blue-400 transition-colors">Reset all</button>
                        <button onClick={onClose} className="p-1 hover:bg-white/5 rounded-full text-slate-400 hover:text-white transition-colors">
                            <span className="material-icons text-xl">close</span>
                        </button>
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto px-6 py-6 space-y-8 custom-scrollbar">
                    {/* Status Filter */}
                    <section>
                        <button className="flex items-center justify-between w-full mb-4 group">
                            <span className="text-sm font-semibold text-white">Status</span>
                            <span className="material-icons text-slate-400 transition-transform group-hover:translate-y-0.5">expand_more</span>
                        </button>
                        <div className="grid grid-cols-2 gap-3">
                            <label className="flex items-center p-3 rounded-lg border border-border-dark-obsidian hover:bg-white/5 cursor-pointer transition-colors group">
                                <input defaultChecked className="w-4 h-4 text-primary bg-transparent border-border-dark-obsidian rounded focus:ring-primary/40 focus:ring-offset-0" type="checkbox" />
                                <div className="ml-3 flex flex-col">
                                    <span className="text-xs font-medium text-white">Completed</span>
                                    <span className="text-[10px] text-silver-grey">124 batches</span>
                                </div>
                            </label>
                            <label className="flex items-center p-3 rounded-lg border border-border-dark-obsidian hover:bg-white/5 cursor-pointer transition-colors group">
                                <input className="w-4 h-4 text-primary bg-transparent border-border-dark-obsidian rounded focus:ring-primary/40 focus:ring-offset-0" type="checkbox" />
                                <div className="ml-3 flex flex-col">
                                    <span className="text-xs font-medium text-white">Processing</span>
                                    <span className="text-[10px] text-silver-grey">12 batches</span>
                                </div>
                            </label>
                            <label className="flex items-center p-3 rounded-lg border border-border-dark-obsidian hover:bg-white/5 cursor-pointer transition-colors group">
                                <input className="w-4 h-4 text-primary bg-transparent border-border-dark-obsidian rounded focus:ring-primary/40 focus:ring-offset-0" type="checkbox" />
                                <div className="ml-3 flex flex-col">
                                    <span className="text-xs font-medium text-white">Failed</span>
                                    <span className="text-[10px] text-silver-grey">2 batches</span>
                                </div>
                            </label>
                            <label className="flex items-center p-3 rounded-lg border border-border-dark-obsidian hover:bg-white/5 cursor-pointer transition-colors group">
                                <input className="w-4 h-4 text-primary bg-transparent border-border-dark-obsidian rounded focus:ring-primary/40 focus:ring-offset-0" type="checkbox" />
                                <div className="ml-3 flex flex-col">
                                    <span className="text-xs font-medium text-white">Draft</span>
                                    <span className="text-[10px] text-silver-grey">5 batches</span>
                                </div>
                            </label>
                        </div>
                    </section>

                    {/* Date Range Filter */}
                    <section>
                        <button className="flex items-center justify-between w-full mb-4 group">
                            <span className="text-sm font-semibold text-white">Date Range</span>
                            <span className="material-icons text-slate-400">expand_more</span>
                        </button>
                        <div className="flex flex-wrap gap-2 mb-5">
                            <button className="px-4 py-1.5 text-xs font-medium bg-primary text-white rounded-full">Last 30 days</button>
                            <button className="px-4 py-1.5 text-xs font-medium bg-surface-dark border border-border-dark-obsidian text-silver-grey rounded-full hover:bg-white/10 hover:text-white transition-colors">This month</button>
                            <button className="px-4 py-1.5 text-xs font-medium bg-surface-dark border border-border-dark-obsidian text-silver-grey rounded-full hover:bg-white/10 hover:text-white transition-colors">Quarter to date</button>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="text-[11px] font-bold text-silver-grey uppercase mb-2 block tracking-wider">From</label>
                                <div className="relative">
                                    <input className="w-full text-xs p-2.5 rounded border border-border-dark-obsidian bg-black text-white focus:ring-1 focus:ring-primary focus:border-primary outline-none" type="date" defaultValue="2023-11-20" />
                                </div>
                            </div>
                            <div>
                                <label className="text-[11px] font-bold text-silver-grey uppercase mb-2 block tracking-wider">To</label>
                                <div className="relative">
                                    <input className="w-full text-xs p-2.5 rounded border border-border-dark-obsidian bg-black text-white focus:ring-1 focus:ring-primary focus:border-primary outline-none" type="date" defaultValue="2023-12-20" />
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Amount Range Filter */}
                    <section>
                        <button className="flex items-center justify-between w-full mb-4 group">
                            <span className="text-sm font-semibold text-white">Amount Range (USD)</span>
                            <span className="material-icons text-slate-400">expand_more</span>
                        </button>
                        <div className="px-2 mb-8">
                            <div className="h-1 bg-border-dark-obsidian rounded-full relative">
                                <div className="absolute left-1/4 right-1/4 h-full bg-primary rounded-full"></div>
                                <div className="absolute left-1/4 top-1/2 -translate-y-1/2 w-4 h-4 bg-white border-2 border-primary rounded-full shadow-lg cursor-pointer hover:scale-110 transition-transform"></div>
                                <div className="absolute right-1/4 top-1/2 -translate-y-1/2 w-4 h-4 bg-white border-2 border-primary rounded-full shadow-lg cursor-pointer hover:scale-110 transition-transform"></div>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="relative">
                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-silver-grey text-xs">$</span>
                                <input className="w-full text-xs pl-7 p-2.5 rounded border border-border-dark-obsidian bg-black text-white focus:ring-1 focus:ring-primary focus:border-primary outline-none" placeholder="Min" type="text" defaultValue="1,000" />
                            </div>
                            <div className="relative">
                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-silver-grey text-xs">$</span>
                                <input className="w-full text-xs pl-7 p-2.5 rounded border border-border-dark-obsidian bg-black text-white focus:ring-1 focus:ring-primary focus:border-primary outline-none" placeholder="Max" type="text" defaultValue="50,000" />
                            </div>
                        </div>
                    </section>

                    {/* Recipients Filter */}
                    <section>
                        <button className="flex items-center justify-between w-full mb-4 group">
                            <span className="text-sm font-semibold text-white">Recipients</span>
                            <span className="material-icons text-slate-400">expand_more</span>
                        </button>
                        <div className="space-y-4">
                            <div className="relative">
                                <span className="material-icons absolute left-3 top-1/2 -translate-y-1/2 text-silver-grey text-sm">search</span>
                                <input className="w-full text-xs pl-10 p-3 rounded border border-border-dark-obsidian bg-black text-white placeholder-silver-grey focus:ring-1 focus:ring-primary focus:border-primary outline-none" placeholder="Search by name or wallet..." type="text" />
                            </div>
                            <div className="relative">
                                <select className="w-full text-xs p-3 pr-10 rounded border border-border-dark-obsidian bg-black text-white appearance-none focus:ring-1 focus:ring-primary focus:border-primary outline-none">
                                    <option>Filter by Country</option>
                                    <option>🇺🇸 United States</option>
                                    <option>🇬🇧 United Kingdom</option>
                                    <option>🇪🇺 European Union</option>
                                    <option>🇨🇦 Canada</option>
                                </select>
                                <span className="material-icons absolute right-3 top-1/2 -translate-y-1/2 text-silver-grey text-sm pointer-events-none">expand_more</span>
                            </div>
                        </div>
                    </section>

                    {/* Network Filter */}
                    <section>
                        <button className="flex items-center justify-between w-full mb-4 group">
                            <span className="text-sm font-semibold text-white">Payment Network</span>
                            <span className="material-icons text-slate-400">expand_more</span>
                        </button>
                        <div className="space-y-3">
                            <label className="flex items-center justify-between group cursor-pointer p-1 rounded hover:bg-white/5 transition-colors">
                                <div className="flex items-center gap-3">
                                    <div className="w-6 h-6 rounded-full bg-slate-700 flex items-center justify-center text-[10px] text-white">ETH</div>
                                    <span className="text-xs text-white">Ethereum Mainnet</span>
                                </div>
                                <input defaultChecked className="w-4 h-4 text-primary bg-transparent border-border-dark-obsidian rounded focus:ring-primary/40 focus:ring-offset-0" type="checkbox" />
                            </label>
                            <label className="flex items-center justify-between group cursor-pointer p-1 rounded hover:bg-white/5 transition-colors">
                                <div className="flex items-center gap-3">
                                    <div className="w-6 h-6 rounded-full bg-purple-700 flex items-center justify-center text-[10px] text-white">POL</div>
                                    <span className="text-xs text-white">Polygon POS</span>
                                </div>
                                <input className="w-4 h-4 text-primary bg-transparent border-border-dark-obsidian rounded focus:ring-primary/40 focus:ring-offset-0" type="checkbox" />
                            </label>
                            <label className="flex items-center justify-between group cursor-pointer p-1 rounded hover:bg-white/5 transition-colors">
                                <div className="flex items-center gap-3">
                                    <div className="w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center text-[10px] text-white">BASE</div>
                                    <span className="text-xs text-white">Base</span>
                                </div>
                                <input className="w-4 h-4 text-primary bg-transparent border-border-dark-obsidian rounded focus:ring-primary/40 focus:ring-offset-0" type="checkbox" />
                            </label>
                        </div>
                    </section>
                </div>

                <div className="p-6 border-t border-border-dark-obsidian bg-surface-dark">
                    <div className="flex items-center justify-between mb-5">
                        <button className="text-sm font-medium text-silver-grey hover:text-white transition-colors">Clear all</button>
                        <span className="text-xs text-silver-grey">4 active filters</span>
                    </div>
                    <button onClick={onClose} className="w-full bg-primary hover:bg-blue-700 text-white font-bold py-4 rounded-lg shadow-xl shadow-primary/10 transition-all flex items-center justify-center gap-2">
                        Apply Filters (45 results)
                    </button>
                </div>
            </aside>
        </>
    );
};

export default AdvancedFilterSidebar;
