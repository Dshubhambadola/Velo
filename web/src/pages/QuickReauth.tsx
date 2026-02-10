import React from 'react';
import { useNavigate } from 'react-router-dom';

const QuickReauth: React.FC = () => {
    const navigate = useNavigate();

    const handleReauth = (e: React.FormEvent) => {
        e.preventDefault();
        navigate('/');
    };

    return (
        <div className="bg-obsidian-black font-display min-h-screen flex items-center justify-center p-4 text-white">
            <main className="w-full max-w-[400px] relative z-10">
                <div className="flex justify-center mb-10">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-primary rounded flex items-center justify-center">
                            <span className="text-white font-bold text-lg">V</span>
                        </div>
                        <span className="text-2xl font-semibold tracking-tight text-white">Velo</span>
                    </div>
                </div>
                <div className="bg-obsidian-charcoal border border-white/10 rounded-xl p-8 shadow-2xl">
                    <div className="flex flex-col items-center text-center mb-8">
                        <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center mb-4 border border-white/10">
                            <span className="material-icons text-silver-grey text-2xl">lock</span>
                        </div>
                        <h1 className="text-2xl font-bold text-white mb-2">Welcome back</h1>
                        <p className="text-silver-grey text-sm font-medium">name@company.com</p>
                    </div>
                    <form onSubmit={handleReauth} className="space-y-6">
                        <div>
                            <label className="block text-xs font-semibold uppercase tracking-widest text-silver-grey/70 mb-2" htmlFor="password">
                                Password
                            </label>
                            <div className="relative">
                                <input
                                    autoFocus
                                    className="block w-full px-4 py-3 bg-transparent border border-white/20 rounded-lg text-white focus:ring-1 focus:ring-primary focus:border-primary transition-all placeholder:text-silver-grey/40"
                                    id="password"
                                    name="password"
                                    placeholder="Enter your password"
                                    required
                                    type="password"
                                />
                                <button className="absolute inset-y-0 right-0 pr-3 flex items-center text-silver-grey/60 hover:text-white transition-colors" type="button">
                                    <span className="material-icons text-xl">visibility</span>
                                </button>
                            </div>
                        </div>
                        <button className="w-full bg-primary hover:bg-[#1e3a8a] text-white font-semibold py-3 px-4 rounded-lg transition-all active:scale-[0.98] flex items-center justify-center gap-2" type="submit">
                            Continue
                            <span className="material-icons text-lg">arrow_forward</span>
                        </button>
                    </form>
                    <div className="mt-6 text-center">
                        <button onClick={() => navigate('/forgot-password')} className="text-xs font-medium text-silver-grey hover:text-white transition-colors">
                            Forgot password?
                        </button>
                    </div>
                </div>
                <div className="mt-8 text-center">
                    <button onClick={() => navigate('/login')} className="inline-flex items-center gap-2 text-sm text-silver-grey/60 hover:text-silver-grey transition-colors">
                        <span className="material-icons text-base">account_circle</span>
                        Not you? Log in with different account
                    </button>
                </div>
                <div className="mt-12 flex items-center justify-center gap-4 opacity-40">
                    <div className="flex items-center gap-1">
                        <span className="material-icons text-sm">verified_user</span>
                        <span className="text-[10px] font-bold uppercase tracking-widest text-silver-grey">Secure AES-256</span>
                    </div>
                    <div className="h-3 w-px bg-white/10"></div>
                    <div className="flex items-center gap-1">
                        <span className="material-icons text-sm">shield</span>
                        <span className="text-[10px] font-bold uppercase tracking-widest text-silver-grey">PCI-DSS Compliant</span>
                    </div>
                </div>
            </main>
            <div className="fixed top-0 left-0 w-full h-full -z-10 overflow-hidden pointer-events-none">
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px]"></div>
                <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px]"></div>
            </div>
        </div>
    );
};

export default QuickReauth;
