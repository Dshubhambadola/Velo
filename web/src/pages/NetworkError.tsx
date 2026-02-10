import React from 'react';
import { useNavigate } from 'react-router-dom';

const NetworkError: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className="bg-obsidian-black font-display min-h-screen flex items-center justify-center p-6 selection:bg-brand-primary-blue/30">
            <main className="w-full max-w-md">
                <div className="flex justify-center mb-10">
                    <div className="flex items-center gap-2">
                        <div className="w-10 h-10 bg-brand-primary-blue rounded-lg flex items-center justify-center">
                            <span className="text-white font-bold text-xl">V</span>
                        </div>
                        <span className="text-2xl font-bold text-white tracking-tight">Velo</span>
                    </div>
                </div>
                <div className="bg-obsidian-charcoal rounded-xl border border-white/10 overflow-hidden">
                    <div className="p-10 text-center">
                        <div className="mb-8 relative inline-block">
                            <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto">
                                <span className="material-icons-round text-white" style={{ fontSize: '48px' }}>
                                    wifi_off
                                </span>
                            </div>
                            <div className="absolute top-1 right-1">
                                <div className="w-4 h-4 bg-red-600 border-2 border-obsidian-charcoal rounded-full"></div>
                            </div>
                        </div>
                        <h1 className="text-2xl font-bold text-white mb-3">
                            Connection problem
                        </h1>
                        <p className="text-silver-grey mb-10 leading-relaxed max-w-[280px] mx-auto">
                            We couldn't connect to our servers. Please check your internet connection and try again.
                        </p>
                        <div className="space-y-5">
                            <button
                                onClick={() => navigate(0)} // Refresh page
                                className="w-full bg-brand-primary-blue hover:bg-blue-700 text-white font-semibold py-3.5 px-6 rounded-lg transition-colors flex items-center justify-center gap-2"
                            >
                                <span className="material-icons-round text-[20px]">refresh</span>
                                Try again
                            </button>
                            <button className="w-full inline-flex items-center justify-center gap-2 text-silver-grey font-medium hover:text-white py-2 transition-all">
                                <span>Check system status</span>
                                <span className="material-icons-round text-[18px]">open_in_new</span>
                            </button>
                        </div>
                    </div>
                    <div className="bg-white/5 px-8 py-4 border-t border-white/5">
                        <p className="text-[10px] text-zinc-700 tracking-wider font-medium text-center uppercase">
                            Error Code: ERR_NETWORK_TIMEOUT_LOGIN
                        </p>
                    </div>
                </div>
                <div className="mt-10 flex justify-center gap-8">
                    <a className="text-sm text-silver-grey hover:text-white transition-colors" href="#">Help Center</a>
                    <a className="text-sm text-silver-grey hover:text-white transition-colors" href="#">Contact Support</a>
                    <a className="text-sm text-silver-grey hover:text-white transition-colors" href="#">Security</a>
                </div>
            </main>
        </div>
    );
};

export default NetworkError;
