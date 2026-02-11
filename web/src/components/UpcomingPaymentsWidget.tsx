import React, { useState } from 'react';

const UpcomingPaymentsWidget: React.FC = () => {
    const [isCalendarOpen, setIsCalendarOpen] = useState(false);

    return (
        <div className="bg-obsidian-charcoal border border-border-dark-obsidian rounded-xl overflow-hidden flex flex-col h-full">
            {/* Header Section */}
            <div className="p-6 border-b border-border-dark-obsidian flex flex-col gap-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <h2 className="text-xl font-semibold text-white">Upcoming Payments</h2>
                        <span className="bg-primary/10 text-primary text-xs font-bold px-2.5 py-1 rounded-full border border-primary/20">
                            5 scheduled
                        </span>
                    </div>
                </div>

                <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                        {/* Filter Dropdown */}
                        <div className="relative group">
                            <button className="flex items-center gap-2 px-3 py-2 bg-primary/5 hover:bg-primary/10 border border-primary/20 rounded-lg text-sm transition-all text-slate-400">
                                <span>Next 7 days</span>
                                <span className="material-icons text-lg group-hover:text-primary transition-colors">expand_more</span>
                            </button>
                        </div>
                        {/* Calendar Toggle Button */}
                        <button
                            className="p-2 bg-primary/5 hover:bg-primary/10 border border-primary/20 rounded-lg text-slate-400 hover:text-primary transition-all relative"
                            onClick={() => setIsCalendarOpen(!isCalendarOpen)}
                        >
                            <span className="material-icons">calendar_today</span>
                            {/* Mini Calendar Overlay */}
                            {isCalendarOpen && (
                                <div className="absolute right-0 top-12 w-64 p-4 bg-obsidian-charcoal border border-border-dark-obsidian rounded-xl shadow-2xl z-50">
                                    <div className="flex justify-between items-center mb-4">
                                        <span className="text-xs font-bold text-slate-500 uppercase">February 2024</span>
                                        <div className="flex gap-1">
                                            <span className="material-icons text-sm text-slate-400 cursor-pointer hover:text-white">chevron_left</span>
                                            <span className="material-icons text-sm text-slate-400 cursor-pointer hover:text-white">chevron_right</span>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-7 gap-1 text-[10px] text-center text-slate-500 mb-2">
                                        <span>M</span><span>T</span><span>W</span><span>T</span><span>F</span><span>S</span><span>S</span>
                                    </div>
                                    <div className="grid grid-cols-7 gap-1 text-xs text-center">
                                        {[8, 9, 10].map(d => <div key={d} className="py-1 text-slate-600">{d}</div>)}
                                        <div className="py-1 font-bold text-primary relative">11 <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 bg-amber-500 rounded-full"></span></div>
                                        {[12, 13, 14].map(d => <div key={d} className="py-1 text-slate-400">{d}</div>)}
                                        <div className="py-1 font-bold text-primary relative">15 <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 bg-primary rounded-full"></span></div>
                                        {[16, 17, 18, 19, 20, 21].map(d => <div key={d} className="py-1 text-slate-400">{d}</div>)}
                                    </div>
                                </div>
                            )}
                        </button>
                    </div>
                    {/* Primary Action Button */}
                    <button className="flex items-center gap-2 bg-primary hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-medium transition-all shadow-lg shadow-primary/20">
                        <span className="material-icons text-lg">add</span>
                        <span className="text-sm">Schedule</span>
                    </button>
                </div>
            </div>

            {/* List View */}
            <div className="p-6 flex-1 overflow-y-auto custom-scrollbar space-y-8">
                {/* Today Group */}
                <div>
                    <div className="flex items-center gap-3 mb-4">
                        <span className="text-xs font-bold uppercase tracking-widest text-amber-500">Today</span>
                        <div className="h-px flex-1 bg-gradient-to-r from-amber-500/20 to-transparent"></div>
                    </div>
                    <div className="group flex flex-col gap-4 p-4 bg-amber-500/5 hover:bg-amber-500/10 border border-amber-500/20 rounded-xl transition-all">
                        <div className="flex items-center gap-4">
                            {/* Date Badge Orange */}
                            <div className="flex flex-col items-center justify-center w-14 h-14 bg-amber-500 rounded-lg text-white shadow-lg shadow-amber-500/20 shrink-0">
                                <span className="text-[10px] font-bold uppercase">Feb</span>
                                <span className="text-xl font-bold leading-none">11</span>
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="flex flex-wrap items-center gap-2 mb-1">
                                    <h3 className="font-semibold text-white truncate">Contractor Monthly</h3>
                                    <span className="flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded bg-amber-500/10 text-amber-500 border border-amber-500/20 uppercase whitespace-nowrap">
                                        <span className="material-icons text-[12px]">schedule</span>
                                        Due in 2h
                                    </span>
                                </div>
                                <div className="flex items-center gap-4">
                                    <span className="text-xl font-bold text-slate-200">$15,000.00</span>
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center gap-2 justify-end">
                            <button className="flex-1 flex items-center justify-center gap-2 bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition-all shadow-md shadow-primary/10">
                                <span className="material-icons text-lg">play_arrow</span>
                                <span className="text-sm font-semibold uppercase tracking-wide">Execute</span>
                            </button>
                            <button className="p-2 text-slate-400 hover:text-primary hover:bg-primary/5 rounded-lg transition-all border border-transparent hover:border-primary/20">
                                <span className="material-icons text-xl">edit</span>
                            </button>
                        </div>
                    </div>
                </div>

                {/* This Week Group */}
                <div>
                    <div className="flex items-center gap-3 mb-4">
                        <span className="text-xs font-bold uppercase tracking-widest text-primary">This Week</span>
                        <div className="h-px flex-1 bg-gradient-to-r from-primary/20 to-transparent"></div>
                    </div>
                    <div className="space-y-4">
                        {/* Week Item 1 */}
                        <div className="group flex items-center justify-between p-4 bg-slate-800/30 hover:bg-slate-800/50 border border-primary/10 rounded-xl transition-all">
                            <div className="flex items-center gap-4">
                                {/* Date Badge Blue */}
                                <div className="flex flex-col items-center justify-center w-12 h-12 bg-primary/20 rounded-lg text-primary shrink-0">
                                    <span className="text-[10px] font-bold uppercase">Feb</span>
                                    <span className="text-lg font-bold leading-none">15</span>
                                </div>
                                <div>
                                    <div className="flex items-center gap-2 mb-1">
                                        <h3 className="font-semibold text-white text-sm">Marketing Freelancers</h3>
                                        <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-purple-500/10 text-purple-400 border border-purple-500/20 uppercase">
                                            Scheduled
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <span className="text-base font-bold text-slate-200">$22,500.00</span>
                                        <span className="flex items-center gap-1 text-[10px] font-medium text-slate-500 bg-slate-700/50 px-2 py-0.5 rounded-full">
                                            <span className="material-icons text-[12px]">sync</span>
                                            Recurring
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <button className="p-2 text-slate-400 hover:text-white transition-colors">
                                <span className="material-icons text-lg">more_vert</span>
                            </button>
                        </div>

                        {/* Week Item 2 */}
                        <div className="group flex items-center justify-between p-4 bg-slate-800/30 hover:bg-slate-800/50 border border-primary/10 rounded-xl opacity-70 hover:opacity-100 transition-all">
                            <div className="flex items-center gap-4">
                                <div className="flex flex-col items-center justify-center w-12 h-12 bg-slate-700/50 rounded-lg text-slate-400 shrink-0">
                                    <span className="text-[10px] font-bold uppercase">Feb</span>
                                    <span className="text-lg font-bold leading-none">17</span>
                                </div>
                                <div>
                                    <div className="flex items-center gap-2 mb-1">
                                        <h3 className="font-semibold text-white text-sm">Azure Cloud Credits</h3>
                                        <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20 uppercase">
                                            Auto-pay
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <span className="text-base font-bold text-slate-200">$3,420.00</span>
                                        <div className="flex items-center gap-1 text-[10px] text-slate-500">
                                            <span className="material-icons text-[12px]">credit_card</span>
                                            <span>•••• 4242</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer / Summary */}
            <div className="p-4 bg-slate-800/30 border-t border-primary/10 flex justify-between items-center text-xs text-slate-500 px-6">
                <div className="flex items-center gap-4">
                    <span className="flex items-center gap-1">
                        <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                        Critical
                    </span>
                    <span className="flex items-center gap-1">
                        <span className="w-2 h-2 rounded-full bg-primary"></span>
                        Standard
                    </span>
                </div>
                <div className="flex items-center gap-1">
                    <span className="font-medium">Total:</span>
                    <span className="text-white font-bold">$40,920.00</span>
                </div>
            </div>
        </div>
    );
};

export default UpcomingPaymentsWidget;
