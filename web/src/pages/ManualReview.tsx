import React from 'react';
import { useNavigate } from 'react-router-dom';

const ManualReview: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className="bg-background-dark font-display min-h-screen flex flex-col items-center justify-center p-6">
            <header className="absolute top-0 left-0 w-full p-8 flex justify-between items-center">
                <div className="flex items-center gap-2">
                    <div className="bg-[#38bdf8] p-1.5 rounded-lg">
                        <span className="material-icons text-white text-2xl">account_balance_wallet</span>
                    </div>
                    <span className="text-xl font-bold tracking-tight text-white">Velo</span>
                </div>
                <div className="flex items-center gap-4">
                    <button className="text-sm font-medium text-slate-400 hover:text-[#38bdf8] transition-colors">Help Center</button>
                    <div className="h-8 w-8 rounded-full bg-slate-800 flex items-center justify-center border border-slate-700">
                        <span className="material-icons text-slate-300 text-sm">person</span>
                    </div>
                </div>
            </header>

            <main className="w-full max-w-xl">
                <div className="bg-slate-card shadow-2xl shadow-black/50 rounded-xl overflow-hidden border border-slate-700/50">
                    <div className="bg-slate-900/50 p-12 flex flex-col items-center justify-center border-b border-slate-700/50">
                        <div className="relative">
                            <div className="w-48 h-48 bg-slate-800 rounded-full shadow-inner flex items-center justify-center relative">
                                <span className="material-icons text-9xl text-slate-600 opacity-50">search</span>
                                <div className="absolute -bottom-2 -right-2 bg-[#38bdf8] text-slate-900 p-3 rounded-full shadow-lg">
                                    <span className="material-icons text-xl font-bold">search</span>
                                </div>
                            </div>
                            <div className="absolute top-0 left-0 w-full h-full border-4 border-[#38bdf8]/20 rounded-full scale-110"></div>
                        </div>
                    </div>
                    <div className="p-8 md:p-12 text-center">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-900/30 text-amber-400 text-xs font-bold uppercase tracking-widest mb-6 border border-amber-900/50">
                            <span className="w-2 h-2 rounded-full bg-amber-400"></span>
                            Verification Pending
                        </div>
                        <h1 className="text-3xl font-bold text-white mb-4">Under manual review</h1>
                        <p className="text-slate-300 text-lg leading-relaxed mb-8 max-w-sm mx-auto">
                            Our team is reviewing your documents. This can take up to <span className="text-white font-semibold">24 hours</span>.
                        </p>
                        <div className="bg-slate-900/40 rounded-lg p-4 mb-10 flex items-center justify-between border border-slate-700/80">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-[#38bdf8]/10 rounded-lg">
                                    <span className="material-icons text-[#38bdf8] text-xl">schedule</span>
                                </div>
                                <div className="text-left">
                                    <p className="text-xs text-slate-400 uppercase tracking-tight font-medium">Expected Result</p>
                                    <p className="text-sm font-semibold text-slate-200">Estimated completion: Today, 6:00 PM</p>
                                </div>
                            </div>
                            <span className="material-icons text-slate-500">info_outline</span>
                        </div>
                        <div className="space-y-4">
                            <button
                                onClick={() => navigate('/dashboard')}
                                className="w-full py-4 px-6 rounded-lg border-2 border-[#38bdf8] text-[#38bdf8] font-bold text-sm hover:bg-[#38bdf8] hover:text-slate-900 transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-[#38bdf8]/20"
                            >
                                Go to Dashboard
                            </button>
                            <p className="text-sm text-slate-500">
                                Need help? <a className="text-[#38bdf8] hover:underline font-medium" href="#">Contact our support team</a>
                            </p>
                        </div>
                    </div>
                </div>
                <div className="mt-8 flex justify-center gap-8 text-slate-500">
                    <div className="flex items-center gap-2">
                        <span className="material-icons text-lg">verified_user</span>
                        <span className="text-xs font-medium uppercase tracking-wider">Secure Encryption</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="material-icons text-lg">lock</span>
                        <span className="text-xs font-medium uppercase tracking-wider">Privacy Compliant</span>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default ManualReview;
