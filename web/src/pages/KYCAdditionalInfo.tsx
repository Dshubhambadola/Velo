import React from 'react';

const KYCAdditionalInfo: React.FC = () => {
    return (
        <div className="bg-background-dark font-display min-h-screen flex items-center justify-center p-6">
            <header className="fixed top-0 left-0 right-0 h-16 bg-background-dark/80 backdrop-blur-md border-b border-white/5 flex items-center px-8 z-50">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-[#193db3] rounded-lg flex items-center justify-center">
                        <span className="text-white font-bold text-xl">V</span>
                    </div>
                    <span className="font-bold text-white text-xl tracking-tight">Velo</span>
                </div>
            </header>

            <main className="w-full max-w-xl mt-12">
                <div className="bg-card-dark border border-white/5 shadow-2xl rounded-xl overflow-hidden">
                    <div className="h-1.5 w-full bg-white/5">
                        <div className="h-full bg-[#193db3] w-3/4"></div>
                    </div>
                    <div className="p-8 md:p-12">
                        <div className="flex flex-col items-center mb-8 text-center">
                            <div className="relative mb-6">
                                <div className="w-24 h-24 bg-[#193db3]/20 rounded-full flex items-center justify-center">
                                    <span className="material-icons text-[#193db3] text-5xl">description</span>
                                </div>
                                <div className="absolute -bottom-1 -right-1 w-10 h-10 bg-accent-yellow rounded-full flex items-center justify-center border-4 border-card-dark">
                                    <span className="material-icons text-background-dark text-xl font-bold">priority_high</span>
                                </div>
                            </div>
                            <h1 className="text-2xl md:text-3xl font-bold text-white mb-3">
                                We need more information
                            </h1>
                            <p className="text-gray-400 max-w-sm">
                                We couldn’t verify some details. Please provide the following documents to continue with your application.
                            </p>
                        </div>
                        <div className="space-y-4 mb-10">
                            <div className="group flex items-center justify-between p-4 bg-row-dark border border-white/5 hover:border-[#193db3]/40 rounded-lg transition-all">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-lg bg-card-dark border border-white/10 flex items-center justify-center">
                                        <span className="material-icons text-[#193db3]/80 group-hover:text-[#193db3]">badge</span>
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-white">Proof of Residence</h3>
                                        <p className="text-xs text-gray-400">Government ID or Lease Agreement</p>
                                    </div>
                                </div>
                                <button className="flex items-center gap-2 px-4 py-2 border border-white/20 hover:border-white/40 hover:bg-white/5 text-white font-semibold text-sm rounded-lg transition-all">
                                    <span className="material-icons text-sm">cloud_upload</span>
                                    Upload
                                </button>
                            </div>
                            <div className="group flex items-center justify-between p-4 bg-row-dark border border-white/5 hover:border-[#193db3]/40 rounded-lg transition-all">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-lg bg-card-dark border border-white/10 flex items-center justify-center">
                                        <span className="material-icons text-[#193db3]/80 group-hover:text-[#193db3]">receipt_long</span>
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-white">Utility Bill</h3>
                                        <p className="text-xs text-gray-400">Water, Electricity or Internet bill</p>
                                    </div>
                                </div>
                                <button className="flex items-center gap-2 px-4 py-2 border border-white/20 hover:border-white/40 hover:bg-white/5 text-white font-semibold text-sm rounded-lg transition-all">
                                    <span className="material-icons text-sm">cloud_upload</span>
                                    Upload
                                </button>
                            </div>
                        </div>
                        <div className="space-y-4">
                            <button className="w-full py-4 bg-[#193db3] hover:bg-[#193db3]/90 text-white font-bold rounded-xl shadow-lg shadow-[#193db3]/20 transition-all flex items-center justify-center gap-2">
                                Upload Documents
                            </button>
                            <div className="flex flex-col items-center gap-4 pt-4">
                                <div className="flex items-center gap-1 text-sm text-gray-500">
                                    <span className="material-icons text-xs">lock</span>
                                    <span>Your data is encrypted and secure</span>
                                </div>
                                <button className="text-[#193db3] hover:text-[#193db3]/80 hover:underline font-medium text-sm flex items-center gap-1">
                                    Contact Support <span className="material-icons text-xs">open_in_new</span>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white/5 p-6 border-t border-white/5">
                        <div className="flex items-start gap-3">
                            <span className="material-icons text-[#193db3]/60">info</span>
                            <p className="text-xs text-gray-400 leading-relaxed">
                                To speed up the process, please ensure the documents are clear, not expired, and show your full name and address matching your application. Files should be in PDF, JPG, or PNG format and under 5MB.
                            </p>
                        </div>
                    </div>
                </div>
                <div className="mt-8 relative h-48 rounded-xl overflow-hidden hidden md:block group">
                    <div className="absolute inset-0 bg-background-dark/60 mix-blend-multiply group-hover:bg-background-dark/50 transition-colors"></div>
                    {/* Placeholder image background */}
                    <div className="w-full h-full bg-slate-800 flex items-center justify-center">
                        <span className="material-icons text-white/10 text-9xl">folder_shared</span>
                    </div>

                    <div className="absolute inset-0 p-8 flex flex-col justify-center">
                        <h4 className="text-white font-bold text-lg mb-1">Need help with documents?</h4>
                        <p className="text-white/80 text-sm max-w-xs mb-4">Check our guide on what constitutes a valid proof of residence.</p>
                        <a className="text-white underline text-sm font-semibold hover:text-white/90" href="#">View Guide</a>
                    </div>
                </div>
                <p className="text-center text-gray-600 text-xs mt-8">
                    © 2024 Velo Financial Services. All rights reserved.
                </p>
            </main>
        </div>
    );
};

export default KYCAdditionalInfo;
