import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const MagicLinkRequest: React.FC = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Simulate sending magic link
        console.log('Sending magic link to:', email);
        navigate('/magic-link-sent', { state: { email } });
    };

    return (
        <div className="font-display min-h-screen flex items-center justify-center p-4 bg-obsidian-black text-white">
            <div className="w-full max-w-[400px] relative z-10">
                <div className="flex justify-center mb-10">
                    <div className="flex items-center gap-2">
                        <div className="w-10 h-10 bg-brand-primary-blue rounded-lg flex items-center justify-center shadow-lg shadow-brand-primary-blue/20">
                            <span className="material-icons-outlined text-white">speed</span>
                        </div>
                        <span className="text-2xl font-bold tracking-tight text-white">Velo</span>
                    </div>
                </div>
                <div className="bg-obsidian-charcoal border border-obsidian-border rounded-xl p-8 shadow-2xl">
                    <div className="text-center mb-8">
                        <h1 className="text-2xl font-semibold text-white mb-2">Log in without password</h1>
                        <p className="text-silver-grey text-sm">We’ll send you a secure login link to your inbox.</p>
                    </div>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-white" htmlFor="email">
                                Work email
                            </label>
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <span className="material-icons-outlined text-silver-grey group-focus-within:text-white transition-colors text-xl">mail</span>
                                </div>
                                <input
                                    className="block w-full pl-10 pr-4 py-3 border border-obsidian-border rounded-lg bg-transparent text-white placeholder-zinc-600 focus:outline-none focus:ring-1 focus:ring-white/20 focus:border-white/40 transition-all text-sm"
                                    id="email"
                                    name="email"
                                    placeholder="e.g., alex@company.com"
                                    required
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                        </div>
                        <button className="w-full bg-brand-primary-blue hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition-all focus:ring-4 focus:ring-blue-900/50 flex items-center justify-center gap-2" type="submit">
                            Send login link
                            <span className="material-icons-outlined text-lg">arrow_forward</span>
                        </button>
                    </form>
                    <div className="mt-8 pt-6 border-t border-obsidian-border text-center">
                        <p className="text-sm text-silver-grey">
                            Prefer password?
                            <button onClick={() => navigate('/login')} className="text-silver-grey hover:text-white font-medium underline underline-offset-4 ml-1 transition-all">
                                Use traditional login
                            </button>
                        </p>
                    </div>
                </div>
                <div className="mt-10 flex items-center justify-center gap-4 text-silver-grey/40">
                    <div className="flex items-center gap-1.5">
                        <span className="material-icons-outlined text-base">lock</span>
                        <span className="text-[10px] font-bold uppercase tracking-[0.1em]">Secure & Encrypted</span>
                    </div>
                    <div className="w-1 h-1 bg-obsidian-border rounded-full"></div>
                    <div className="flex items-center gap-1.5">
                        <span className="material-icons-outlined text-base">verified_user</span>
                        <span className="text-[10px] font-bold uppercase tracking-[0.1em]">B2B Verified</span>
                    </div>
                </div>
            </div>
            <div className="fixed top-0 right-0 -z-0 opacity-[0.03] pointer-events-none">
                <div className="w-[500px] h-[500px] bg-brand-primary-blue rounded-full blur-[120px] -mr-48 -mt-48"></div>
            </div>
            <div className="fixed bottom-0 left-0 -z-0 opacity-[0.02] pointer-events-none">
                <div className="w-[500px] h-[500px] bg-brand-primary-blue rounded-full blur-[120px] -ml-48 -mb-48"></div>
            </div>
        </div>
    );
};

export default MagicLinkRequest;
