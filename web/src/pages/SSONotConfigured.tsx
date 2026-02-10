import React from 'react';
import { useNavigate } from 'react-router-dom';

const SSONotConfigured: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className="font-display bg-obsidian-black text-white min-h-screen flex flex-col">
            <nav className="p-6">
                <div className="max-w-7xl mx-auto flex items-center">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-primary rounded flex items-center justify-center">
                            <span className="text-white font-bold text-xl">V</span>
                        </div>
                        <span className="text-xl font-bold tracking-tight text-white">Velo</span>
                    </div>
                </div>
            </nav>
            <main className="flex-grow flex items-center justify-center px-4 py-12">
                <div className="w-full max-w-md">
                    <div className="bg-obsidian-charcoal shadow-2xl rounded-xl p-8 border border-card-border text-center">
                        <div className="mb-6 flex justify-center">
                            <div className="w-16 h-16 bg-warning-yellow/10 rounded-full flex items-center justify-center border-4 border-obsidian-charcoal shadow-sm">
                                <span className="material-icons text-warning-yellow text-4xl">warning_amber</span>
                            </div>
                        </div>
                        <div className="space-y-3 mb-8">
                            <h1 className="text-2xl font-bold text-white leading-tight">
                                SSO is not set up for your company
                            </h1>
                            <p className="text-silver-grey text-sm leading-relaxed">
                                It looks like your organization hasn't configured Single Sign-On yet. Please contact your system administrator or continue using your standard credentials.
                            </p>
                        </div>
                        <div className="space-y-3">
                            <button
                                onClick={() => navigate('/login')}
                                className="w-full bg-primary hover:bg-primary/90 text-white font-semibold py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-2 shadow-sm"
                            >
                                <span className="material-icons text-sm">email</span>
                                Use email login
                            </button>
                            <button className="w-full bg-transparent border border-card-border hover:bg-white/5 text-silver-grey hover:text-white font-medium py-3 px-4 rounded-lg transition-all">
                                Contact Admin
                            </button>
                        </div>
                        <div className="mt-8 pt-6 border-t border-card-border">
                            <button
                                onClick={() => navigate('/login')}
                                className="text-primary hover:brightness-125 text-sm font-medium flex items-center justify-center gap-1 transition-all"
                            >
                                <span className="material-icons text-sm">arrow_back</span>
                                Back to login selection
                            </button>
                        </div>
                    </div>
                    <p className="mt-8 text-center text-zinc-600 text-xs">
                        © 2024 Velo Enterprise. All rights reserved. <br />
                        Need help? <a className="underline hover:text-primary transition-colors" href="#">Visit Help Center</a>
                    </p>
                </div>
            </main>
            <div className="fixed bottom-6 right-6">
                <button className="bg-obsidian-charcoal p-3 rounded-full shadow-lg border border-card-border hover:bg-zinc-800 transition-all group">
                    <span className="material-icons text-primary group-hover:scale-110 transition-transform">support_agent</span>
                </button>
            </div>
        </div>
    );
};

export default SSONotConfigured;
