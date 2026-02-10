import React from 'react';
import { useNavigate } from 'react-router-dom';

const AccountSuspended: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className="bg-obsidian-black font-display min-h-screen flex flex-col items-center justify-center p-6 text-white">
            <div className="mb-8 flex items-center gap-2">
                <div className="w-10 h-10 bg-brand-primary-blue rounded flex items-center justify-center">
                    <span className="material-icons text-white">bolt</span>
                </div>
                <span className="text-2xl font-bold text-white tracking-tight">Velo</span>
            </div>
            <main className="w-full max-w-md bg-obsidian-charcoal shadow-2xl rounded-xl overflow-hidden border border-white/5">
                <div className="p-8 md:p-12 text-center">
                    <div className="mb-8 flex justify-center">
                        <div className="w-20 h-20 bg-error-red/10 rounded-full flex items-center justify-center border border-error-red/20">
                            <span className="material-symbols-outlined text-error-red text-5xl font-bold">block</span>
                        </div>
                    </div>
                    <h1 className="text-3xl font-bold text-white mb-4">
                        Account suspended
                    </h1>
                    <p className="text-silver-grey mb-8 leading-relaxed">
                        Your account has been suspended due to policy violations. If you believe this is a mistake, please reach out to our team.
                    </p>
                    <div className="inline-flex items-center px-4 py-2 bg-white/5 rounded-lg mb-10 border border-white/10">
                        <span className="text-sm font-medium text-silver-grey mr-2">Case ID:</span>
                        <span className="text-sm font-mono font-bold text-white">#123456</span>
                    </div>
                    <div className="flex flex-col gap-4">
                        <button className="w-full py-4 px-6 bg-brand-primary-blue hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors shadow-lg flex items-center justify-center gap-2">
                            <span className="material-icons text-lg">support_agent</span>
                            Contact support
                        </button>
                        <button onClick={() => navigate('/login')} className="text-sm font-medium text-silver-grey hover:text-white transition-colors">
                            Back to login
                        </button>
                    </div>
                </div>
                <div className="px-8 py-5 bg-white/[0.02] border-t border-white/5 text-center">
                    <a className="text-xs text-silver-grey/60 hover:text-silver-grey hover:underline transition-colors" href="#">
                        Read our Terms of Service & Community Guidelines
                    </a>
                </div>
            </main>
            <div className="fixed top-0 left-0 w-full h-1 bg-gradient-to-r from-brand-primary-blue/50 via-error-red/50 to-brand-primary-blue/50 opacity-30"></div>
            <div className="mt-12 text-silver-grey/40 text-sm">
                © 2024 Velo Technologies Inc.
            </div>
        </div>
    );
};

export default AccountSuspended;
