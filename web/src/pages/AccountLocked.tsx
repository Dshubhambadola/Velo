import React from 'react';
import { useNavigate } from 'react-router-dom';

const AccountLocked: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className="bg-obsidian-black font-display min-h-screen flex flex-col items-center justify-center p-4 overflow-hidden relative">
            <div className="fixed inset-0 -z-10 pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full blur-3xl opacity-40 bg-[radial-gradient(circle_at_center,rgba(255,59,48,0.08)_0%,transparent_70%)]"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full blur-3xl opacity-40 bg-[radial-gradient(circle_at_center,rgba(255,59,48,0.08)_0%,transparent_70%)]"></div>
                <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(#ffffff 0.5px, transparent 0.5px)', backgroundSize: '30px 30px' }}></div>
            </div>
            <div className="mb-10 z-10">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-vibrant-red rounded flex items-center justify-center shadow-[0_0_15px_rgba(255,59,48,0.4)]">
                        <span className="text-white font-bold text-xl">V</span>
                    </div>
                    <span className="text-2xl font-bold tracking-[0.2em] text-white">VELO</span>
                </div>
            </div>
            <main className="w-full max-w-md bg-obsidian-charcoal rounded-2xl shadow-2xl overflow-hidden border border-white/5 relative z-10">
                <div className="p-10 md:p-14 text-center">
                    <div className="relative inline-flex items-center justify-center mb-8">
                        <div className="absolute inset-0 bg-vibrant-red/20 rounded-full blur-xl scale-150"></div>
                        <div className="relative w-24 h-24 bg-white/[0.03] rounded-full flex items-center justify-center border border-white/10">
                            <span className="material-icons text-vibrant-red text-6xl drop-shadow-[0_0_8px_rgba(255,59,48,0.6)]">lock_person</span>
                            <div className="absolute bottom-2 right-2 bg-vibrant-red text-white rounded-full w-7 h-7 flex items-center justify-center border-2 border-obsidian-charcoal">
                                <span className="material-icons text-xs font-bold">close</span>
                            </div>
                        </div>
                    </div>
                    <h1 className="text-2xl font-bold text-white mb-4 tracking-tight">
                        Account temporarily locked
                    </h1>
                    <p className="text-silver-grey/80 mb-10 leading-relaxed text-sm">
                        Too many failed login attempts. For your security, your account has been locked for 30 minutes.
                    </p>
                    <div className="bg-black/40 rounded-xl p-5 mb-10 border border-white/5">
                        <span className="block text-[10px] uppercase tracking-[0.2em] text-silver-grey mb-2 font-bold">
                            Remaining Time
                        </span>
                        <span className="text-4xl font-mono font-bold text-white tracking-widest">
                            28:45
                        </span>
                    </div>
                    <div className="space-y-4">
                        <button onClick={() => navigate('/forgot-password')} className="block w-full py-4 px-6 bg-vibrant-red text-white font-bold rounded-lg hover:brightness-110 transition-all shadow-[0_4px_20px_rgba(255,59,48,0.3)] uppercase tracking-wider text-sm">
                            Reset password now
                        </button>
                        <div className="pt-6 flex flex-col items-center gap-4">
                            <button className="text-sm text-silver-grey hover:text-white font-medium flex items-center gap-2 transition-colors">
                                <span className="material-icons text-lg">support_agent</span>
                                Contact support
                            </button>
                            <button onClick={() => navigate('/login')} className="text-xs text-silver-grey/60 hover:text-white transition-colors uppercase tracking-widest font-semibold">
                                Back to login
                            </button>
                        </div>
                    </div>
                </div>
                <div className="h-1 w-full bg-gradient-to-r from-transparent via-vibrant-red/50 to-transparent"></div>
            </main>
            <footer className="mt-16 text-center z-10">
                <p className="text-[10px] text-silver-grey/40 uppercase tracking-[0.3em] mb-6">Secure Infrastructure by Velo Systems</p>
                <div className="flex items-center justify-center gap-8">
                    <span className="material-icons text-white opacity-20 text-2xl">lock</span>
                    <span className="material-icons text-white opacity-20 text-2xl">security</span>
                    <span className="material-icons text-white opacity-20 text-2xl">verified_user</span>
                </div>
            </footer>
        </div>
    );
};

export default AccountLocked;
