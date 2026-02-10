import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const MagicLinkSent: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const email = location.state?.email || 'name@company.com';

    return (
        <div className="bg-obsidian-black font-display min-h-screen flex items-center justify-center p-6 text-white">
            <div className="max-w-xl w-full">
                <div className="flex justify-center mb-10">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-vibrant-blue rounded flex items-center justify-center">
                            <span className="text-white font-bold text-xl italic">V</span>
                        </div>
                        <span className="text-2xl font-bold text-white tracking-tight">Velo</span>
                    </div>
                </div>
                <div className="bg-dark-charcoal shadow-2xl rounded-2xl p-8 md:p-12 border border-white/5 text-center">
                    <div className="relative w-24 h-24 mx-auto mb-8">
                        <div className="absolute inset-0 bg-vibrant-blue/20 rounded-full animate-pulse"></div>
                        <div className="relative flex items-center justify-center h-full">
                            <span className="material-symbols-outlined text-vibrant-blue text-6xl" style={{ fontVariationSettings: "'FILL' 1, 'wght' 400" }}>mark_email_unread</span>
                        </div>
                    </div>
                    <div className="space-y-4 mb-10">
                        <h1 className="text-3xl font-bold text-white tracking-tight">Check your inbox</h1>
                        <p className="text-silver-grey text-lg leading-relaxed">
                            We sent a login link to <span className="text-white font-semibold underline decoration-vibrant-blue/50">{email}</span>.<br />
                            Click the link to log in instantly.
                        </p>
                    </div>
                    <div className="max-w-sm mx-auto mb-10 space-y-5">
                        <div className="flex items-center gap-4 text-left">
                            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-green-500/10 border border-green-500/20 flex items-center justify-center">
                                <span className="material-icons text-green-500 text-base">check_circle</span>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-sm font-semibold text-white">Email sent</span>
                                <span className="text-xs text-silver-grey">Delivered to your server</span>
                            </div>
                        </div>
                        <div className="flex items-center gap-4 text-left">
                            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-vibrant-blue/10 border border-vibrant-blue/20 flex items-center justify-center">
                                <div className="w-4 h-4 border-2 border-vibrant-blue border-t-transparent rounded-full animate-spin"></div>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-sm font-semibold text-vibrant-blue">Waiting for click...</span>
                                <span className="text-xs text-silver-grey">Checking for authorization</span>
                            </div>
                        </div>
                        <div className="flex items-center gap-4 text-left opacity-30">
                            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
                                <span className="material-icons text-silver-grey text-sm">bolt</span>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-sm font-semibold text-white">Will log you in automatically</span>
                                <span className="text-xs text-silver-grey">Redirecting to dashboard</span>
                            </div>
                        </div>
                    </div>
                    <div className="inline-flex items-center gap-2 bg-black/40 px-4 py-2 rounded-lg mb-10 border border-white/10">
                        <span className="material-icons text-vibrant-blue text-sm">schedule</span>
                        <span className="text-sm text-white font-medium">Link expires in 15 minutes</span>
                    </div>
                    <div className="grid grid-cols-1 gap-4 pt-8 border-t border-white/5">
                        <button className="flex items-center justify-center gap-2 text-vibrant-blue font-semibold hover:bg-vibrant-blue/10 py-3 px-4 rounded-xl transition-all group">
                            <span className="material-icons text-sm group-hover:rotate-180 transition-transform duration-500">refresh</span>
                            <span>Resend email <span className="text-silver-grey font-normal ml-1 opacity-60">(54s)</span></span>
                        </button>
                        <div className="flex items-center justify-center gap-4 text-white/20 text-[10px] uppercase tracking-[0.2em] my-1">
                            <div className="h-px bg-white/10 flex-1"></div>
                            <span>or</span>
                            <div className="h-px bg-white/10 flex-1"></div>
                        </div>
                        <button onClick={() => navigate('/login')} className="flex items-center justify-center gap-2 text-silver-grey hover:text-white hover:bg-white/5 font-medium py-3 px-4 rounded-xl transition-colors">
                            <span className="material-symbols-outlined text-sm">passkey</span>
                            <span>Use password instead</span>
                        </button>
                        {/* Hidden button to simulate click for demo purposes */}
                        <button onClick={() => navigate('/magic-link-success')} className="text-xs text-zinc-800 mt-4 hover:text-white transition-colors">
                            [Demo: Simulate Link Click]
                        </button>
                    </div>
                </div>
                <p className="mt-10 text-center text-silver-grey text-sm">
                    Didn't receive the email? Check your spam folder or
                    <a className="text-vibrant-blue hover:text-white transition-colors font-medium ml-1" href="#">contact support</a>.
                </p>
            </div>
        </div>
    );
};

export default MagicLinkSent;
