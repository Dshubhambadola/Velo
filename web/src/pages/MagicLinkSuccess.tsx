import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const MagicLinkSuccess: React.FC = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const timer = setTimeout(() => {
            navigate('/dashboard');
        }, 2500); // Redirect after 2.5s to match animation/text

        return () => clearTimeout(timer);
    }, [navigate]);

    return (
        <div className="bg-obsidian-black font-display min-h-screen flex flex-col items-center justify-center relative overflow-hidden text-white">
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute -top-24 -left-24 w-96 h-96 bg-brand-primary-blue/10 rounded-full blur-[100px]"></div>
                <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-brand-primary-blue/10 rounded-full blur-[100px]"></div>
            </div>
            <div className="z-10 w-full max-w-md px-6">
                <div className="flex justify-center mb-8">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                            <span className="text-black font-bold text-xl">V</span>
                        </div>
                        <span className="text-xl font-bold tracking-tight text-white">Velo</span>
                    </div>
                </div>
                <div className="bg-obsidian-charcoal shadow-2xl shadow-black/50 rounded-xl border border-white/5 p-10 text-center relative overflow-hidden">
                    <div className="mb-10 flex justify-center">
                        <div className="w-24 h-24 bg-success-vibrant/5 rounded-full flex items-center justify-center relative">
                            <span className="material-icons text-7xl text-success-vibrant drop-shadow-[0_0_15px_rgba(34,197,94,0.4)]">check_circle</span>
                            <div className="absolute inset-0 rounded-full border-2 border-success-vibrant/20 animate-ping"></div>
                        </div>
                    </div>
                    <div className="space-y-3 mb-10">
                        <h1 className="text-3xl font-bold text-white tracking-tight">You’re logged in!</h1>
                        <p className="text-silver-grey text-sm">Redirecting to your dashboard in 2s...</p>
                    </div>
                    <div className="w-full bg-white/5 h-1 rounded-full mb-10 overflow-hidden">
                        <div className="bg-success-vibrant h-full w-full animate-[shrink_2s_linear_forwards]"></div>
                    </div>
                    <div className="flex items-center justify-center gap-2 pt-6 border-t border-white/5">
                        <span className="material-symbols-outlined text-[18px] text-silver-grey">verified_user</span>
                        <span className="text-[10px] font-semibold text-silver-grey uppercase tracking-[0.2em]">Confirming it’s you</span>
                    </div>
                </div>
                <div className="mt-8 text-center">
                    <p className="text-sm text-silver-grey">
                        Not redirecting?
                        <button onClick={() => navigate('/dashboard')} className="text-white hover:text-success-vibrant transition-colors underline underline-offset-4 font-medium ml-1">Click here to continue</button>
                    </p>
                </div>
            </div>
            <div className="absolute bottom-12 left-12 hidden lg:block">
                <div className="flex flex-col gap-1.5 opacity-10">
                    <div className="flex gap-1.5">
                        <div className="w-1.5 h-1.5 rounded-full bg-white"></div>
                        <div className="w-1.5 h-1.5 rounded-full bg-white"></div>
                        <div className="w-1.5 h-1.5 rounded-full bg-white"></div>
                    </div>
                    <div className="flex gap-1.5">
                        <div className="w-1.5 h-1.5 rounded-full bg-white"></div>
                        <div className="w-1.5 h-1.5 rounded-full bg-white"></div>
                        <div className="w-1.5 h-1.5 rounded-full bg-white"></div>
                    </div>
                </div>
            </div>
            <div className="fixed bottom-0 left-0 w-full p-8 text-center lg:text-left">
                <div className="max-w-7xl mx-auto flex flex-col lg:row justify-between items-center gap-4 text-[11px] text-zinc-600 uppercase tracking-widest font-medium">
                    <p>© 2024 Velo Financial Technologies</p>
                    <div className="flex gap-8">
                        <a className="hover:text-white transition-colors" href="#">Privacy</a>
                        <a className="hover:text-white transition-colors" href="#">Terms</a>
                        <a className="hover:text-white transition-colors" href="#">Security</a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MagicLinkSuccess;
