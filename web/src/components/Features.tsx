import React from 'react';

const Features: React.FC = () => {
    return (
        <section className="max-w-7xl mx-auto px-4 py-20 lg:py-32">
            <div className="text-center mb-16 max-w-3xl mx-auto">
                <h2 className="text-4xl lg:text-5xl font-bold tracking-tight mb-6 text-white">
                    Why companies choose <span className="text-brand-blue">Velo</span>
                </h2>
                <p className="text-lg text-slate-400">
                    Stop waiting for legacy infrastructure to catch up. Velo provides a modern financial stack designed for the speed of global business.
                </p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
                {/* Traditional Banking Card */}
                <div className="bg-slate-900/40 glow-card rounded-2xl border border-slate-800 p-8 flex flex-col opacity-70 transition-all hover:opacity-100">
                    <div className="mb-8">
                        <span className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-slate-800 text-slate-500 mb-4">
                            <span className="material-icons">account_balance</span>
                        </span>
                        <h3 className="text-2xl font-semibold text-slate-300">Traditional Banking</h3>
                        <p className="text-slate-500 mt-2">Legacy infrastructure</p>
                    </div>
                    <ul className="space-y-6 flex-grow">
                        <li className="flex items-start gap-4">
                            <span className="material-icons text-red-500 mt-0.5">close</span>
                            <div>
                                <p className="font-medium text-slate-200">Slow (3-5 days)</p>
                                <p className="text-sm text-slate-500">Standard settlement times</p>
                            </div>
                        </li>
                        <li className="flex items-start gap-4">
                            <span className="material-icons text-red-500 mt-0.5">close</span>
                            <div>
                                <p className="font-medium text-slate-200">Expensive (3-7% fees)</p>
                                <p className="text-sm text-slate-500">Hidden markup & wire costs</p>
                            </div>
                        </li>
                        <li className="flex items-start gap-4">
                            <span className="material-icons text-red-500 mt-0.5">close</span>
                            <div>
                                <p className="font-medium text-slate-200">Complex</p>
                                <p className="text-sm text-slate-500">Heavy paperwork & manual ops</p>

                            </div>
                        </li>
                    </ul>
                    <div className="mt-12 pt-6 border-t border-slate-800">
                        <p className="text-xs uppercase tracking-widest text-slate-500 font-bold">Inefficiency Score</p>
                        <div className="w-full bg-slate-800 h-2 mt-2 rounded-full overflow-hidden">
                            <div className="bg-slate-600 w-4/5 h-full"></div>
                        </div>
                    </div>
                </div>

                {/* Velo Modern Fintech Card */}
                <div className="relative bg-slate-800/60 glow-card-featured rounded-2xl border-2 border-brand-blue p-8 flex flex-col transform lg:-translate-y-4 backdrop-blur-sm">
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-brand-blue text-white px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest shadow-lg shadow-brand-blue/20">
                        Recommended
                    </div>
                    <div className="mb-8">
                        <span className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-brand-blue/20 text-brand-blue mb-4">
                            <span className="material-icons">bolt</span>
                        </span>
                        <h3 className="text-2xl font-bold text-white">Velo Modern Fintech</h3>
                        <p className="text-brand-blue font-medium mt-2">Next-gen liquidity</p>
                    </div>
                    <ul className="space-y-6 flex-grow">
                        <li className="flex items-start gap-4">
                            <span className="material-icons text-emerald-400 mt-0.5">check_circle</span>
                            <div>
                                <p className="font-semibold text-white">Fast (&lt;30 min)</p>
                                <p className="text-sm text-slate-400">Instant global settlements</p>
                            </div>
                        </li>
                        <li className="flex items-start gap-4">
                            <span className="material-icons text-emerald-400 mt-0.5">check_circle</span>
                            <div>
                                <p className="font-semibold text-white">Affordable (1% fee)</p>
                                <p className="text-sm text-slate-400">Transparent flat-rate pricing</p>
                            </div>
                        </li>
                        <li className="flex items-start gap-4">
                            <span className="material-icons text-emerald-400 mt-0.5">check_circle</span>
                            <div>
                                <p className="font-semibold text-white">Simple</p>
                                <p className="text-sm text-slate-400">Automated API-first workflow</p>
                            </div>
                        </li>
                    </ul>
                    <button className="mt-12 w-full py-4 bg-brand-blue text-white font-bold rounded-xl hover:bg-blue-500 transition-all shadow-lg shadow-brand-blue/30 active:scale-[0.98]">
                        Upgrade to Velo
                    </button>
                </div>

                {/* Velo Advantage Card */}
                <div className="bg-slate-900/40 glow-card rounded-2xl border border-slate-800 p-8 flex flex-col">
                    <div className="mb-8">
                        <span className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-cyan-500/10 text-cyan-400 mb-4">
                            <span className="material-icons">insights</span>
                        </span>
                        <h3 className="text-2xl font-semibold text-white">The Velo Advantage</h3>
                        <p className="text-slate-400 mt-2">Performance Metrics</p>
                    </div>
                    <div className="space-y-8 flex-grow">
                        <div>
                            <div className="flex justify-between text-sm mb-3">
                                <span className="text-slate-400 font-medium">Fee Comparison</span>
                                <span className="text-emerald-400 font-bold">85% Lower</span>
                            </div>
                            <div className="space-y-3">
                                <div className="relative flex items-center h-9 bg-slate-800/50 rounded-xl border border-slate-700 overflow-hidden">
                                    <div className="bg-slate-700 h-full w-full opacity-40"></div>
                                    <span className="absolute left-3 text-[10px] font-bold text-slate-500 tracking-wider">TRADITIONAL (7%)</span>
                                </div>
                                <div className="relative flex items-center h-9 bg-brand-blue/10 rounded-xl border border-brand-blue/20 overflow-hidden">
                                    <div className="bg-brand-blue h-full w-[14%]"></div>
                                    <span className="absolute left-[18%] text-[10px] font-bold text-brand-blue tracking-wider">VELO (1%)</span>
                                    <span className="absolute right-3 material-icons text-brand-blue text-sm">arrow_back</span>
                                </div>
                            </div>
                        </div>
                        <div className="bg-emerald-500/5 border border-emerald-500/20 rounded-2xl p-6 text-center">
                            <p className="text-xs uppercase tracking-widest text-emerald-400/80 font-bold mb-2">Annual Savings Potential</p>
                            <div className="flex items-center justify-center gap-1">
                                <span className="text-3xl font-black text-emerald-400">$10,000</span>
                            </div>
                            <p className="text-sm text-slate-400 mt-1 font-medium">per 100 employees</p>
                        </div>
                        <div className="flex items-center justify-between p-4 bg-slate-800/40 rounded-xl border border-slate-700">
                            <div className="flex flex-col">
                                <span className="text-xs text-slate-500 font-bold uppercase tracking-tighter">Settlement</span>
                                <span className="text-lg font-bold text-white">99% Faster</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="flex space-x-1">
                                    <div className="w-1.5 h-6 bg-slate-700 rounded-full"></div>
                                    <div className="w-1.5 h-6 bg-slate-700 rounded-full"></div>
                                    <div className="w-1.5 h-6 bg-slate-700 rounded-full"></div>
                                </div>
                                <span className="material-icons text-brand-blue">trending_flat</span>
                                <div className="w-6 h-6 bg-brand-blue rounded-full shadow-[0_0_10px_rgba(19,109,236,0.5)]"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Features;
