import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const SSORedirect: React.FC = () => {
    const navigate = useNavigate();

    useEffect(() => {
        // Simulate redirect to dashboard after "SSO" completes
        const timer = setTimeout(() => {
            navigate('/');
        }, 3000);
        return () => clearTimeout(timer);
    }, [navigate]);

    return (
        <div className="bg-obsidian-black font-display min-h-screen flex items-center justify-center antialiased text-white">
            <div className="max-w-md w-full px-6">
                <div className="bg-obsidian-charcoal shadow-2xl rounded-xl p-10 border border-card-border relative overflow-hidden">
                    <div className="flex flex-col items-center mb-10">
                        <div className="w-16 h-16 bg-white/5 rounded-xl flex items-center justify-center mb-6 ring-1 ring-white/10">
                            {/* Placeholder for Company Logo */}
                            <span className="text-xl font-bold">ACME</span>
                        </div>
                        <h1 className="text-2xl font-semibold text-white text-center tracking-tight">
                            Redirecting to Acme Corp SSO...
                        </h1>
                        <p className="text-zinc-400 text-sm mt-3">
                            Authenticating your session with Velo
                        </p>
                    </div>
                    <div className="relative w-full h-1 bg-zinc-800 rounded-full mb-10 overflow-hidden">
                        <div className="h-full bg-white animate-[progress_3s_linear_forwards] rounded-full shadow-[0_0_8px_rgba(255,255,255,0.4)]"></div>
                    </div>
                    <div className="flex items-start gap-4 bg-white/5 border border-white/10 p-5 rounded-lg mb-8">
                        <span className="material-icons text-white text-xl mt-0.5">verified_user</span>
                        <div>
                            <p className="text-sm font-semibold text-white">
                                Secure Connection Verified
                            </p>
                            <p className="text-xs text-zinc-400 mt-1.5 leading-relaxed">
                                This is a secure connection to your company's identity provider. Your credentials are never shared with Velo.
                            </p>
                        </div>
                    </div>
                    <div className="text-center mb-2">
                        <p className="text-xs text-zinc-500">
                            Not redirected?
                            <button onClick={() => navigate('/')} className="text-white hover:text-zinc-300 underline underline-offset-4 decoration-zinc-700 font-medium transition-colors ml-1">
                                Click here to continue manually
                            </button>
                        </p>
                    </div>
                    <div className="mt-8 pt-8 border-t border-white/5 flex flex-col items-center gap-3">
                        <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-zinc-500">
                            Powered by
                        </span>
                        <div className="flex items-center gap-2 px-3 py-1.5 bg-white/5 rounded-md border border-white/5">
                            <div className="w-5 h-5 bg-white rounded-sm flex items-center justify-center">
                                <span className="text-[11px] text-black font-black">O</span>
                            </div>
                            <span className="text-sm font-bold text-white tracking-tight">Okta</span>
                        </div>
                    </div>
                </div>
                <div className="mt-8 flex justify-center gap-8 text-[11px] text-zinc-500 font-medium uppercase tracking-widest">
                    <a className="hover:text-white transition-colors" href="#">Privacy</a>
                    <a className="hover:text-white transition-colors" href="#">Security</a>
                    <a className="hover:text-white transition-colors" href="#">Support</a>
                </div>
            </div>
        </div>
    );
};

export default SSORedirect;
