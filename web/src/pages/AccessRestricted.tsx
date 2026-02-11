import React from 'react';
import { Link } from 'react-router-dom';

const AccessRestricted: React.FC = () => {
    return (
        <div className="bg-black min-h-screen flex flex-col font-display text-white selection:bg-primary/30">
            <header className="h-16 border-b border-white/5 bg-black px-8 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                        <span className="text-white font-bold text-xl">V</span>
                    </div>
                    <span className="font-bold text-lg text-white">Velo</span>
                </div>
                <div className="flex items-center gap-4">
                    <div className="w-8 h-8 rounded-full bg-white/10"></div>
                </div>
            </header>

            <main className="flex-grow flex items-center justify-center p-6 relative z-10">
                <div className="max-w-xl w-full text-center">
                    <div className="mb-10 flex justify-center">
                        <div className="relative w-40 h-40 flex items-center justify-center bg-red-500/5 rounded-full shadow-[inset_0_0_30px_rgba(255,59,59,0.15),0_0_50px_rgba(255,59,59,0.1)] border border-red-500/20">
                            <div className="relative z-10 text-[#ff3b3b] drop-shadow-[0_0_20px_rgba(255,59,59,0.8)]">
                                <span className="material-icons" style={{ fontSize: '84px' }}>lock_person</span>
                            </div>
                            <div className="absolute bottom-2 right-2 bg-[#ff3b3b] text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-widest shadow-2xl border border-white/10">
                                Forbidden
                            </div>
                        </div>
                    </div>

                    <div className="space-y-3 mb-12">
                        <h1 className="text-4xl font-bold tracking-tight text-white">Access Restricted</h1>
                        <p className="text-lg text-neutral-400">You don’t have permission to view this section</p>
                    </div>

                    <div className="bg-[#121212] border border-white/10 rounded-xl p-8 mb-12 text-left shadow-2xl">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative">
                            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-white/5"></div>

                            <div className="space-y-3">
                                <span className="text-[11px] font-bold uppercase tracking-[0.15em] text-neutral-500">Required Role</span>
                                <div className="flex items-center gap-3">
                                    <span className="material-icons text-primary text-2xl">verified_user</span>
                                    <span className="font-semibold text-white">Finance Manager or Owner</span>
                                </div>
                            </div>

                            <div className="space-y-3">
                                <span className="text-[11px] font-bold uppercase tracking-[0.15em] text-neutral-500">Your Role</span>
                                <div className="flex items-center gap-3">
                                    <span className="material-icons text-[#ff3b3b] text-2xl">account_circle</span>
                                    <div className="flex flex-col">
                                        <span className="font-semibold text-white">Accountant</span>
                                        <span className="text-[10px] font-bold text-[#ff3b3b] uppercase tracking-tighter">Insufficient Privileges</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col items-center gap-8">
                        <div className="flex flex-col sm:flex-row gap-5 w-full sm:w-auto">
                            <button className="bg-primary hover:bg-primary/90 text-white font-bold py-3.5 px-10 rounded-lg shadow-lg shadow-primary/20 transition-all flex items-center justify-center gap-2">
                                <span className="material-icons text-xl">admin_panel_settings</span>
                                Request Access
                            </button>
                            <button className="border border-white/20 text-white hover:bg-white/5 font-bold py-3.5 px-10 rounded-lg transition-all flex items-center justify-center gap-2">
                                <span className="material-icons text-xl">mail_outline</span>
                                Contact Admin
                            </button>
                        </div>
                        <Link to="/dashboard" className="text-neutral-400 hover:text-white font-medium flex items-center gap-2 transition-colors group">
                            <span className="material-icons text-sm group-hover:-translate-x-1 transition-transform">arrow_back</span>
                            Return to Dashboard
                        </Link>
                    </div>
                </div>
            </main>

            <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.03] pointer-events-none select-none">
                <span className="material-icons text-[600px] text-white">security</span>
            </div>

            <footer className="py-8 text-center text-white/20 text-xs tracking-widest uppercase">
                <p>© 2024 Velo Financial Technologies Inc.</p>
            </footer>
        </div>
    );
};

export default AccessRestricted;
