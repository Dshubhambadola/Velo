import React from 'react';
import { useNavigate } from 'react-router-dom';

const VerificationSuccess: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className="bg-charcoal font-display min-h-screen flex flex-col items-center text-white">
            <header className="w-full py-6 px-8 flex justify-between items-center bg-charcoal/80 backdrop-blur-md sticky top-0 z-50 border-b border-white/5">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-[#193db3] rounded-lg flex items-center justify-center">
                        <span className="text-white font-bold text-xl">V</span>
                    </div>
                    <span className="text-xl font-bold text-white tracking-tight">Velo</span>
                </div>
                <div className="hidden md:flex items-center gap-4 text-sm font-medium text-slate-400">
                    <span>Support</span>
                    <div className="h-4 w-px bg-slate-700"></div>
                    <button className="hover:text-[#193db3] transition-colors">Sign Out</button>
                </div>
            </header>

            <main className="flex-grow flex flex-col items-center justify-center w-full max-w-4xl px-4 py-12">
                <div className="w-full max-w-2xl mb-16">
                    <div className="flex items-center justify-between relative">
                        <div className="absolute top-1/2 left-0 w-full h-0.5 bg-slate-800 -translate-y-1/2 z-0"></div>
                        <div className="absolute top-1/2 left-0 w-1/2 h-0.5 bg-green-500 -translate-y-1/2 z-0"></div>
                        <div className="relative z-10 flex flex-col items-center group">
                            <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center text-white ring-4 ring-charcoal">
                                <span className="material-icons text-xl">check</span>
                            </div>
                            <span className="absolute -bottom-8 text-xs font-semibold text-green-400 whitespace-nowrap">Account Setup</span>
                        </div>
                        <div className="relative z-10 flex flex-col items-center group">
                            <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center text-white ring-4 ring-charcoal">
                                <span className="material-icons text-xl">check</span>
                            </div>
                            <span className="absolute -bottom-8 text-xs font-semibold text-green-400 whitespace-nowrap">Identity Verification</span>
                        </div>
                        <div className="relative z-10 flex flex-col items-center group">
                            <div className="w-10 h-10 rounded-full bg-slate-800 border-2 border-[#193db3] flex items-center justify-center text-[#193db3] ring-4 ring-charcoal">
                                <span className="text-sm font-bold text-white">3</span>
                            </div>
                            <span className="absolute -bottom-8 text-xs font-semibold text-slate-500 whitespace-nowrap">Funding</span>
                        </div>
                    </div>
                </div>

                <div className="w-full max-w-lg bg-slate-card rounded-xl shadow-2xl border border-white/5 overflow-hidden relative">
                    <div className="absolute inset-0 pointer-events-none opacity-20">
                        <div className="absolute top-10 left-10 w-4 h-4 rounded-full bg-yellow-400 rotate-45"></div>
                        <div className="absolute top-20 right-12 w-3 h-3 bg-[#193db3] rounded-sm -rotate-12"></div>
                        <div className="absolute bottom-24 left-16 w-2 h-6 bg-green-400 rounded-full rotate-[30deg]"></div>
                        <div className="absolute top-1/2 right-8 w-4 h-4 border-2 border-pink-400 rounded-full"></div>
                        <div className="absolute top-1/4 left-1/4 w-3 h-3 bg-blue-400 rounded-full"></div>
                    </div>
                    <div className="relative px-8 pt-16 pb-12 text-center">
                        <div className="mb-8 relative inline-block">
                            <div className="w-24 h-24 bg-green-500/10 rounded-full flex items-center justify-center mx-auto">
                                <span className="material-icons text-6xl text-green-500">verified</span>
                            </div>
                            <div className="absolute inset-0 rounded-full ring-8 ring-green-500/10 animate-pulse"></div>
                        </div>
                        <div className="space-y-3 mb-10">
                            <h1 className="text-3xl font-bold text-green-500">Identity verified! ✅</h1>
                            <p className="text-slate-400 text-lg">
                                You’re all set. Let’s fund your wallet to start trading and managing your assets.
                            </p>
                        </div>
                        <div className="space-y-4">
                            <button
                                onClick={() => navigate('/wallet/funding')}
                                className="w-full bg-[#193db3] hover:bg-blue-600 text-white font-bold py-4 px-6 rounded-xl transition-all duration-200 transform hover:scale-[1.02] shadow-lg shadow-[#193db3]/20 flex items-center justify-center gap-2"
                            >
                                Continue to Funding
                                <span className="material-icons">arrow_forward</span>
                            </button>
                            <button
                                onClick={() => navigate('/dashboard')}
                                className="w-full bg-transparent hover:bg-white/5 text-white font-medium py-3 px-6 rounded-xl transition-colors"
                            >
                                Go to Dashboard
                            </button>
                        </div>
                    </div>
                    <div className="bg-white/5 px-8 py-4 border-t border-white/5 flex items-center justify-center gap-2">
                        <span className="material-icons text-green-500 text-sm">shield</span>
                        <span className="text-xs text-white uppercase tracking-widest font-bold">Bank-grade Security</span>
                    </div>
                </div>

                <div className="mt-12 flex flex-col md:flex-row items-center gap-8">
                    <div className="flex items-center gap-2 group cursor-default">
                        <span className="material-icons text-white">lock</span>
                        <span className="text-sm font-medium text-white">End-to-End Encryption</span>
                    </div>
                    <div className="flex items-center gap-2 group cursor-default">
                        <span className="material-icons text-white">account_balance</span>
                        <span className="text-sm font-medium text-white">Regulated Entity</span>
                    </div>
                    <div className="flex items-center gap-2 group cursor-default">
                        <span className="material-icons text-white">support_agent</span>
                        <span className="text-sm font-medium text-white">24/7 Support</span>
                    </div>
                </div>
            </main>

            <footer className="w-full py-8 px-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-slate-500 text-sm">
                <p>© 2024 Velo Financial Technology. All rights reserved.</p>
                <div className="flex gap-6 mt-4 md:mt-0">
                    <a className="hover:text-white transition-colors" href="#">Privacy Policy</a>
                    <a className="hover:text-white transition-colors" href="#">Terms of Service</a>
                    <a className="hover:text-white transition-colors" href="#">Contact</a>
                </div>
            </footer>
        </div>
    );
};

export default VerificationSuccess;
