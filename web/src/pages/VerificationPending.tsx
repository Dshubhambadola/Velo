import React from 'react';

const VerificationPending: React.FC = () => {
    return (
        <div className="bg-bg-deep font-display min-h-screen text-white antialiased flex flex-col">
            <nav className="w-full py-6 px-8 flex justify-between items-center border-b border-white/5 bg-bg-deep/50 backdrop-blur-md">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-[#1E40AF] rounded-lg flex items-center justify-center">
                        <span className="text-white font-bold text-xl italic">V</span>
                    </div>
                    <span className="text-xl font-bold tracking-tight text-white">Velo</span>
                </div>
                <div className="flex items-center gap-4 text-sm font-medium text-body-gray">
                    <span>Help Center</span>
                    <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center border border-white/10">
                        <span className="material-icons text-body-gray text-sm">person</span>
                    </div>
                </div>
            </nav>

            <main className="max-w-4xl mx-auto px-6 py-12 md:py-20 flex flex-col items-center w-full flex-grow">
                <div className="w-full mb-16 px-4 md:px-0">
                    <div className="relative flex justify-between items-center w-full">
                        <div className="absolute top-1/2 left-0 w-full h-0.5 bg-slate-800 -translate-y-1/2 z-0"></div>
                        <div className="absolute top-1/2 left-0 w-1/2 h-0.5 bg-[#1E40AF] -translate-y-1/2 z-0"></div>
                        <div className="relative z-10 flex flex-col items-center gap-2">
                            <div className="w-8 h-8 rounded-full bg-[#1E40AF] text-white flex items-center justify-center shadow-lg shadow-[#1E40AF]/20">
                                <span className="material-icons text-sm">check</span>
                            </div>
                            <span className="text-[10px] md:text-xs font-semibold text-white absolute -bottom-8 whitespace-nowrap">Account created</span>
                        </div>
                        <div className="relative z-10 flex flex-col items-center gap-2">
                            <div className="w-8 h-8 rounded-full bg-[#1E40AF] text-white flex items-center justify-center shadow-lg shadow-[#1E40AF]/20">
                                <span className="material-icons text-sm">check</span>
                            </div>
                            <span className="text-[10px] md:text-xs font-semibold text-white absolute -bottom-8 whitespace-nowrap">Company details</span>
                        </div>
                        <div className="relative z-10 flex flex-col items-center gap-2">
                            <div className="w-10 h-10 rounded-full bg-card-dark border-2 border-[#1E40AF] text-[#1E40AF] flex items-center justify-center shadow-xl ring-4 ring-[#1E40AF]/20">
                                <span className="material-icons text-lg">hourglass_empty</span>
                            </div>
                            <span className="text-[10px] md:text-xs font-bold text-[#1E40AF] absolute -bottom-10 whitespace-nowrap uppercase tracking-wider">Identity verification</span>
                        </div>
                        <div className="relative z-10 flex flex-col items-center gap-2">
                            <div className="w-8 h-8 rounded-full bg-slate-800 border-2 border-slate-700 text-slate-500 flex items-center justify-center">
                            </div>
                            <span className="text-[10px] md:text-xs font-medium text-slate-500 absolute -bottom-8 whitespace-nowrap">Fund wallet</span>
                        </div>
                        <div className="relative z-10 flex flex-col items-center gap-2">
                            <div className="w-8 h-8 rounded-full bg-slate-800 border-2 border-slate-700 text-slate-500 flex items-center justify-center">
                            </div>
                            <span className="text-[10px] md:text-xs font-medium text-slate-500 absolute -bottom-8 whitespace-nowrap">First payment</span>
                        </div>
                    </div>
                </div>

                <div className="bg-card-dark w-full max-w-[560px] rounded-xl shadow-2xl border border-white/5 p-8 md:p-12 text-center transition-all duration-300">
                    <div className="mb-10 flex justify-center">
                        <div className="w-24 h-24 rounded-full bg-[#1E40AF]/10 flex items-center justify-center">
                            <span className="material-icons text-[#1E40AF] text-5xl animate-[spin_3s_linear_infinite]">hourglass_bottom</span>
                        </div>
                    </div>
                    <h1 className="text-2xl md:text-3xl font-bold text-white mb-4">
                        We’re verifying your identity
                    </h1>
                    <p className="text-body-gray text-lg mb-2">
                        This usually takes less than 5 minutes.
                    </p>
                    <p className="text-slate-500 text-base mb-10">
                        We’ll send an email to <span className="font-medium text-white underline decoration-[#1E40AF]/40">user@example.com</span> when your account is ready.
                    </p>
                    <div className="py-8 border-t border-white/5">
                        <p className="text-body-gray text-sm mb-6">
                            In the meantime, let’s set up your wallet to start transacting faster.
                        </p>
                        <button className="w-full bg-[#1E40AF] hover:bg-blue-700 text-white font-semibold py-4 px-8 rounded-lg transition-all shadow-lg shadow-[#1E40AF]/30 active:scale-[0.98]">
                            Continue Setup
                        </button>
                    </div>
                    <div className="mt-8 flex items-center justify-between p-5 bg-bg-deep/50 rounded-xl border border-white/5">
                        <div className="flex items-center gap-4 text-left">
                            <div className="w-10 h-10 rounded-full bg-[#1E40AF]/20 flex items-center justify-center">
                                <span className="material-icons text-[#1E40AF] text-xl">notifications</span>
                            </div>
                            <div>
                                <p className="text-sm font-semibold text-white">Push Notifications</p>
                                <p className="text-xs text-body-gray">Notify me when verification is complete</p>
                            </div>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" checked className="sr-only peer" readOnly />
                            <div className="w-11 h-6 bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-600 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#1E40AF]"></div>
                        </label>
                    </div>
                </div>

                <p className="mt-12 text-slate-600 text-sm">
                    Need help? <a href="#" className="text-[#1E40AF] hover:text-blue-400 font-medium transition-colors">Contact our support team</a>
                </p>
            </main>

            <div className="fixed bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#1E40AF]/50 to-transparent"></div>
        </div>
    );
};

export default VerificationPending;
