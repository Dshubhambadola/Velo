import React, { useState } from 'react';

interface BatchListHeaderProps {
    onOpenFilters: () => void;
}

const BatchListHeader: React.FC<BatchListHeaderProps> = ({ onOpenFilters }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [activeTab, setActiveTab] = useState<'All' | 'Completed' | 'Processing' | 'Pending' | 'Failed'>('All');

    const tabs = [
        { name: 'All', count: 1248, color: 'bg-primary', glow: '' },
        { name: 'Completed', count: 942, color: 'bg-emerald-500', glow: 'shadow-[0_0_8px_rgba(16,185,129,0.4)]' },
        { name: 'Processing', count: 124, color: 'bg-primary', glow: 'shadow-[0_0_8px_rgba(19,127,236,0.4)]' },
        { name: 'Pending', count: 168, color: 'bg-amber-500', glow: 'shadow-[0_0_8px_rgba(245,158,11,0.4)]' },
        { name: 'Failed', count: 14, color: 'bg-red-500', glow: 'shadow-[0_0_8px_rgba(239,68,68,0.4)]' },
    ] as const;

    return (
        <div className="bg-background-dark border border-border-dark-obsidian rounded-xl p-5 space-y-6 mb-6">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                {/* Search Bar */}
                <div className="relative w-full max-w-[600px]">
                    <div className="relative group">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <span className="material-icons text-silver-grey group-focus-within:text-primary transition-colors">search</span>
                        </div>
                        <input
                            type="text"
                            className="block w-full pl-10 pr-24 py-3 bg-surface-dark border border-border-dark-obsidian rounded-lg focus:ring-1 focus:ring-primary/50 focus:border-primary transition-all text-sm placeholder:text-silver-grey/60 text-white"
                            placeholder="Search batches, recipients, or transaction IDs..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <div className="absolute inset-y-0 right-3 flex items-center gap-1">
                            <kbd className="px-2 py-1 bg-black border border-border-dark-obsidian rounded text-[10px] font-semibold text-silver-grey">CMD</kbd>
                            <kbd className="px-2 py-1 bg-black border border-border-dark-obsidian rounded text-[10px] font-semibold text-silver-grey">K</kbd>
                        </div>
                    </div>
                </div>

                {/* Right Actions */}
                <div className="flex items-center gap-3 ml-auto">
                    <button className="flex items-center gap-2 px-3 py-2.5 text-silver-grey hover:text-white text-sm font-medium transition-colors">
                        <span className="material-icons text-[18px]">settings</span>
                        Customize columns
                    </button>
                    <div className="flex border border-border-dark-obsidian rounded-lg p-1 bg-surface-dark">
                        <button className="flex items-center justify-center w-9 h-8 rounded bg-border-dark-obsidian shadow-sm text-primary">
                            <span className="material-icons text-[18px]">view_list</span>
                        </button>
                        <button className="flex items-center justify-center w-9 h-8 rounded text-silver-grey hover:text-white">
                            <span className="material-icons text-[18px]">grid_view</span>
                        </button>
                    </div>
                </div>
            </div>

            {/* Quick Filter Tabs */}
            <div className="flex flex-wrap items-center gap-3">
                {tabs.map((tab) => (
                    <button
                        key={tab.name}
                        onClick={() => setActiveTab(tab.name)}
                        className={`inline-flex items-center gap-2.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-all group ${activeTab === tab.name
                                ? 'bg-surface-dark border border-primary text-white'
                                : 'bg-surface-dark border border-border-dark-obsidian text-slate-400 hover:border-slate-500 hover:text-white'
                            }`}
                    >
                        {tab.name !== 'All' && (
                            <span className={`w-2 h-2 rounded-full ${tab.color} ${tab.glow}`}></span>
                        )}
                        <span>{tab.name}</span>
                        <span className={`px-1.5 py-0.5 rounded text-[10px] ${activeTab === tab.name
                                ? 'bg-primary/20 text-primary'
                                : 'bg-black text-slate-500 group-hover:text-white'
                            }`}>
                            {tab.count.toLocaleString()}
                        </span>
                    </button>
                ))}

                <div className="h-6 w-px bg-border-dark-obsidian mx-2 hidden sm:block"></div>

                <button
                    onClick={onOpenFilters}
                    className="flex items-center gap-1.5 text-sm text-silver-grey hover:text-primary transition-colors"
                >
                    <span className="material-icons text-[18px]">filter_list</span>
                    More Filters
                </button>
            </div>
        </div>
    );
};

export default BatchListHeader;
