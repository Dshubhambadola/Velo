import React from 'react';
import { useNavigate } from 'react-router-dom';

const SessionExpired: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className="bg-[#0A0A0A] font-display antialiased h-screen overflow-hidden relative">
            {/* Background UI Simulation - Blurred */}
            <div aria-hidden="true" className="absolute inset-0 w-full h-full blur-xl opacity-40 select-none pointer-events-none">
                <div className="absolute left-0 top-0 bottom-0 w-64 bg-zinc-900 border-r border-zinc-800 p-6">
                    <div className="w-32 h-8 bg-primary/20 rounded mb-10"></div>
                    <div className="space-y-4">
                        <div className="h-4 bg-zinc-800 rounded w-full"></div>
                        <div className="h-4 bg-zinc-800 rounded w-3/4"></div>
                        <div className="h-4 bg-zinc-800 rounded w-5/6"></div>
                        <div className="h-4 bg-zinc-800 rounded w-full"></div>
                    </div>
                </div>
                <div className="ml-64 p-10">
                    <div className="flex justify-between mb-10">
                        <div className="h-10 bg-zinc-800 rounded w-48"></div>
                        <div className="flex space-x-4">
                            <div className="h-10 w-10 bg-zinc-800 rounded-full"></div>
                            <div className="h-10 w-32 bg-zinc-800 rounded"></div>
                        </div>
                    </div>
                    <div className="grid grid-cols-3 gap-6">
                        <div className="h-40 bg-zinc-900 rounded-xl border border-zinc-800"></div>
                        <div className="h-40 bg-zinc-900 rounded-xl border border-zinc-800"></div>
                        <div className="h-40 bg-zinc-900 rounded-xl border border-zinc-800"></div>
                    </div>
                    <div className="mt-10 h-96 bg-zinc-900 rounded-xl border border-zinc-800"></div>
                </div>
            </div>

            {/* Modal Overlay */}
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-[16px]">
                <div className="bg-[#121212] w-full max-w-[400px] rounded-xl shadow-2xl border border-obsidian-border overflow-hidden transform transition-all">
                    <div className="p-8 text-center">
                        <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-warning-orange/10 mb-6">
                            <span className="material-icons text-warning-orange text-3xl">schedule</span>
                        </div>
                        <h2 className="text-2xl font-bold text-white mb-3">
                            Your session has expired
                        </h2>
                        <p className="text-silver-grey text-sm leading-relaxed mb-8">
                            For your security, you've been logged out due to inactivity for 30 minutes. Any unsaved changes may have been lost.
                        </p>
                        <button
                            onClick={() => navigate('/login')}
                            className="w-full bg-primary hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors shadow-lg shadow-primary/10 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-obsidian-bg"
                        >
                            Log in again
                        </button>
                        <div className="mt-6 border-t border-obsidian-border pt-4">
                            <details className="group">
                                <summary className="flex items-center justify-between cursor-pointer list-none py-2 text-sm font-medium text-zinc-500 hover:text-white transition-colors">
                                    <span>Why did this happen?</span>
                                    <span className="material-icons text-lg group-open:rotate-180 transition-transform">expand_more</span>
                                </summary>
                                <div className="mt-3 text-left">
                                    <div className="p-4 bg-zinc-900/50 rounded-lg border border-obsidian-border">
                                        <p className="text-xs text-silver-grey leading-normal">
                                            Velo automatically ends sessions to protect your financial data from unauthorized access on shared or unattended devices. This is a standard security protocol for all B2B accounts.
                                        </p>
                                        <a className="inline-block mt-3 text-xs font-semibold text-blue-400 hover:text-blue-300 hover:underline decoration-2 underline-offset-4" href="#">
                                            Manage session settings
                                        </a>
                                    </div>
                                </div>
                            </details>
                        </div>
                    </div>
                    <div className="px-8 py-4 bg-zinc-900/40 border-t border-obsidian-border flex items-center justify-center">
                        <div className="flex items-center space-x-2 grayscale opacity-40">
                            <div className="w-5 h-5 bg-primary rounded-sm flex items-center justify-center">
                                <span className="text-[10px] text-white font-bold italic">V</span>
                            </div>
                            <span className="text-xs font-bold tracking-tight text-white uppercase">Velo Security</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="fixed bottom-0 right-0 p-8 text-zinc-700 text-[10px] font-medium uppercase tracking-[0.2em] pointer-events-none opacity-30">
                Enterprise Session Management v2.4.0
            </div>
        </div>
    );
};

export default SessionExpired;
