import React from 'react';
import { useNavigate } from 'react-router-dom';

const ResetLinkExpired: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className="bg-obsidian font-display min-h-screen flex flex-col items-center justify-center p-6 antialiased text-white">
            <div className="mb-10">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center text-white shadow-lg shadow-primary/10">
                        <span className="material-icons text-2xl">account_balance</span>
                    </div>
                    <span className="text-2xl font-bold tracking-tight text-white font-display">Velo</span>
                </div>
            </div>
            <main className="w-full max-w-md bg-charcoal border border-white/10 rounded-xl shadow-2xl overflow-hidden">
                <div className="p-8 md:p-12 flex flex-col items-center text-center">
                    <div className="mb-8">
                        <div className="w-20 h-20 bg-vibrant-red/10 rounded-full flex items-center justify-center border border-vibrant-red/20">
                            <span className="material-icons text-vibrant-red text-5xl">report_problem</span>
                        </div>
                    </div>
                    <h1 className="text-2xl font-bold text-white mb-4 font-display tracking-tight">
                        Reset link expired
                    </h1>
                    <p className="text-silver-grey mb-10 leading-relaxed max-w-[280px] md:max-w-none">
                        This reset link has expired or is invalid. Please request a new one to continue and secure your account access.
                    </p>
                    <div className="w-full space-y-5">
                        <button
                            onClick={() => navigate('/forgot-password')}
                            className="w-full bg-primary hover:bg-blue-600 text-white font-semibold py-4 px-6 rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-obsidian shadow-lg shadow-primary/20"
                        >
                            Request new reset link
                        </button>
                        <div>
                            <button
                                onClick={() => navigate('/login')}
                                className="inline-flex items-center justify-center text-sm font-medium text-white hover:text-silver-grey transition-colors py-2 group"
                            >
                                <span className="material-icons text-lg mr-2 transition-transform group-hover:-translate-x-1">arrow_back</span>
                                Return to sign in
                            </button>
                        </div>
                    </div>
                </div>
                <div className="px-8 py-5 bg-white/[0.02] border-t border-white/5 text-center">
                    <div className="flex items-center justify-center gap-2">
                        <span className="material-icons text-xs text-silver-grey/60">lock</span>
                        <p className="text-[11px] uppercase tracking-widest font-medium text-silver-grey/60">
                            Secure 256-bit encrypted connection
                        </p>
                    </div>
                </div>
            </main>
            <footer className="mt-10 text-center">
                <p className="text-sm text-silver-grey">
                    Having trouble? <a className="text-primary hover:text-blue-400 underline underline-offset-4 font-medium" href="#">Contact Velo Support</a>
                </p>
            </footer>
            <div className="fixed top-0 left-0 w-full h-1 bg-gradient-to-r from-primary/0 via-primary/40 to-primary/0"></div>
            <div className="fixed -bottom-48 -left-48 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] pointer-events-none"></div>
            <div className="fixed -top-48 -right-48 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] pointer-events-none"></div>
        </div>
    );
};

export default ResetLinkExpired;
