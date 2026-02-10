import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ForgotPassword: React.FC = () => {
    const navigate = useNavigate();
    const [view, setView] = useState<'request' | 'success' | 'error'>('request');
    const [email, setEmail] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Mock logic: 
        // - if email contains 'error', show error state
        // - otherwise show success state
        if (email.includes('error')) {
            setView('error');
        } else {
            setView('success');
        }
    };

    if (view === 'success') {
        return (
            <div className="bg-obsidian-bg font-display antialiased overflow-hidden min-h-screen relative text-white">
                {/* Background Grid */}
                <div className="fixed inset-0 z-0 grid grid-cols-12 grid-rows-6 opacity-20 select-none pointer-events-none">
                    <div className="col-span-2 row-span-6 bg-slate-900 border-r border-white/5 p-6">
                        <div className="w-32 h-8 bg-white/10 rounded mb-12"></div>
                        <div className="space-y-4">
                            <div className="w-full h-4 bg-white/5 rounded"></div>
                            <div className="w-full h-4 bg-white/5 rounded"></div>
                            <div className="w-full h-4 bg-white/5 rounded"></div>
                            <div className="w-full h-4 bg-white/5 rounded"></div>
                        </div>
                    </div>
                    <div className="col-span-10 h-16 bg-slate-900 border-b border-white/5 flex items-center justify-between px-8">
                        <div className="w-48 h-4 bg-white/5 rounded"></div>
                        <div className="w-8 h-8 bg-white/10 rounded-full"></div>
                    </div>
                    <div className="col-span-10 row-span-5 p-8 grid grid-cols-3 gap-6">
                        <div className="col-span-2 space-y-6">
                            <div className="h-40 bg-slate-900 rounded-xl border border-white/5 shadow-sm"></div>
                            <div className="grid grid-cols-2 gap-6">
                                <div className="h-32 bg-slate-900 rounded-xl border border-white/5 shadow-sm"></div>
                                <div className="h-32 bg-slate-900 rounded-xl border border-white/5 shadow-sm"></div>
                            </div>
                            <div className="h-64 bg-slate-900 rounded-xl border border-white/5 shadow-sm"></div>
                        </div>
                        <div className="col-span-1 bg-slate-900 rounded-xl border border-white/5 shadow-sm"></div>
                    </div>
                </div>

                <div className="fixed inset-0 bg-black/80 z-10 backdrop-blur-[12px]"></div>

                <div className="relative z-20 min-h-screen flex items-center justify-center p-4">
                    <div className="w-full max-w-md bg-obsidian-card rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] p-8 md:p-10 border border-white/5">
                        <div className="flex justify-center mb-10">
                            <div className="flex items-center gap-2">
                                <div className="w-8 h-8 bg-primary rounded flex items-center justify-center">
                                    <span className="text-white font-bold">V</span>
                                </div>
                                <span className="text-xl font-bold text-white tracking-tight">Velo</span>
                            </div>
                        </div>
                        <div className="text-center">
                            <div className="inline-flex items-center justify-center w-20 h-20 bg-success-vibrant/10 rounded-full mb-8 drop-shadow-[0_0_12px_rgba(34,197,94,0.45)]">
                                <span className="material-icons text-success-vibrant text-6xl">check_circle</span>
                            </div>
                            <h1 className="text-2xl font-bold text-white mb-3">Check your email</h1>
                            <p className="text-silver-grey mb-10 leading-relaxed">
                                We sent password reset instructions to<br />
                                <span className="font-semibold text-white">{email}</span>
                            </p>

                            <button onClick={() => navigate('/login')} className="block w-full py-4 bg-primary hover:bg-primary/90 text-white font-semibold rounded-lg transition-all shadow-lg shadow-primary/20 mb-8">
                                Back to login
                            </button>

                            <div className="space-y-6">
                                <p className="text-sm text-silver-grey/70">
                                    Didn't receive the email? Check your spam folder.
                                </p>
                                <div className="pt-6 border-t border-white/5">
                                    <button className="inline-flex items-center gap-2 text-sm font-medium text-light-grey cursor-not-allowed opacity-80" disabled>
                                        <span className="material-icons text-base">schedule</span>
                                        Resend in 59s
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="fixed bottom-8 left-0 right-0 z-20 flex justify-center pointer-events-none">
                    <div className="flex items-center gap-2 px-4 py-2 bg-white/5 backdrop-blur-md rounded-full border border-white/10">
                        <span className="material-icons text-white/40 text-sm">lock</span>
                        <span className="text-xs font-medium text-white/40 tracking-wide uppercase">Secure Enterprise Authentication</span>
                    </div>
                </div>
            </div>
        );
    }

    if (view === 'error') {
        return (
            <div className="bg-obsidian-black font-display min-h-screen flex flex-col items-center justify-center p-4 text-white">
                <div className="mb-10 flex flex-col items-center">
                    <div className="flex items-center gap-2.5 mb-2">
                        <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center shadow-lg">
                            <span className="text-white font-bold text-2xl">V</span>
                        </div>
                        <span className="text-2xl font-bold text-white tracking-tight">Velo</span>
                    </div>
                </div>
                <main className="w-full max-w-md bg-charcoal-dark shadow-2xl rounded-2xl overflow-hidden border border-white/10">
                    <div className="p-10 pb-0 text-center">
                        <div className="inline-flex items-center justify-center w-14 h-14 bg-vibrant-red/10 rounded-full mb-6">
                            <span className="material-icons text-vibrant-red text-4xl">error_outline</span>
                        </div>
                        <h1 className="text-2xl font-semibold text-white mb-3">Account not found</h1>
                        <p className="text-subtle-grey text-sm leading-relaxed">
                            We couldn’t find an account with that email. Try another email or sign up for a new account.
                        </p>
                    </div>
                    <div className="p-10">
                        <form className="space-y-6">
                            <div className="space-y-2">
                                <label className="block text-xs font-semibold uppercase tracking-wider text-subtle-grey" htmlFor="email-error">
                                    Email Address
                                </label>
                                <div className="relative">
                                    <input
                                        className="block w-full px-4 py-3.5 rounded-xl bg-obsidian-black border-vibrant-red text-white focus:ring-vibrant-red focus:border-vibrant-red border-2 transition-all placeholder:text-white/20"
                                        id="email-error"
                                        type="email"
                                        value={email}
                                        readOnly
                                    />
                                    <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                                        <span className="material-icons text-vibrant-red">cancel</span>
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-col gap-4">
                                <button onClick={() => setView('request')} className="w-full py-3.5 px-4 bg-primary hover:bg-blue-600 text-white font-semibold rounded-xl transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-charcoal-dark focus:ring-primary shadow-lg" type="button">
                                    Try again
                                </button>
                                <button onClick={() => navigate('/signup')} className="w-full py-3.5 px-4 bg-transparent hover:bg-white/5 border border-white/20 text-white font-semibold rounded-xl transition-all focus:outline-none" type="button">
                                    Sign up
                                </button>
                            </div>
                        </form>
                    </div>
                    <div className="px-10 py-6 bg-black/40 border-t border-white/5 flex items-start gap-3">
                        <span className="material-icons text-subtle-grey text-lg mt-0.5">verified_user</span>
                        <p className="text-xs text-subtle-grey leading-relaxed">
                            <span className="font-medium text-white/40">Security Note:</span> To protect your privacy, if an account exists for the email provided, you will receive instructions via email shortly.
                        </p>
                    </div>
                </main>
                <div className="mt-10 text-center space-x-6">
                    <a className="text-xs text-subtle-grey hover:text-white transition-colors uppercase tracking-widest" href="#">Privacy</a>
                    <span className="text-white/10">•</span>
                    <a className="text-xs text-subtle-grey hover:text-white transition-colors uppercase tracking-widest" href="#">Support</a>
                    <span className="text-white/10">•</span>
                    <a className="text-xs text-subtle-grey hover:text-white transition-colors uppercase tracking-widest" href="#">Status</a>
                </div>
            </div>
        );
    }

    // Default Request View
    return (
        <div className="bg-obsidian-black text-silver-grey font-display min-h-screen flex flex-col items-center justify-center p-4">
            <div className="w-full max-w-[500px] mb-8 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-primary rounded flex items-center justify-center">
                        <span className="text-white font-bold text-xl">V</span>
                    </div>
                    <span className="text-2xl font-bold tracking-tight text-white">Velo</span>
                </div>
                <button onClick={() => navigate('/login')} className="flex items-center text-sm font-medium text-silver-grey hover:text-white transition-colors group">
                    <span className="material-icons text-lg mr-1 group-hover:-translate-x-1 transition-transform">arrow_back</span>
                    Back to login
                </button>
            </div>
            <main className="w-full max-w-[500px] bg-charcoal rounded-xl border border-card-border p-8 md:p-10 shadow-2xl">
                <div className="flex flex-col items-center text-center mb-8">
                    <div className="w-16 h-16 bg-vibrant-blue/10 rounded-full flex items-center justify-center mb-6 border border-vibrant-blue/20">
                        <span className="material-icons text-vibrant-blue text-3xl">vpn_key</span>
                    </div>
                    <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">Forgot your password?</h1>
                    <p className="text-silver-grey">No worries, we’ll send you reset instructions.</p>
                </div>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                        <label className="block text-sm font-semibold text-silver-grey" htmlFor="email">
                            Work email
                        </label>
                        <div className="relative group">
                            <input
                                className="w-full px-4 py-3 rounded-lg border border-card-border bg-transparent text-white placeholder:text-zinc-600 focus:ring-2 focus:ring-primary/40 focus:border-primary outline-none transition-all"
                                id="email"
                                name="email"
                                placeholder="e.g. name@company.com"
                                required
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <p className="text-xs text-silver-grey/70">
                            Enter the email associated with your account.
                        </p>
                    </div>
                    <button className="w-full bg-primary hover:bg-primary/90 text-white font-semibold py-3.5 px-4 rounded-lg transition-all flex items-center justify-center gap-2" type="submit">
                        Send reset link
                    </button>
                </form>
                <div className="mt-8 pt-8 border-t border-card-border text-center">
                    <p className="text-sm text-silver-grey">
                        Remember your password?
                        <button onClick={() => navigate('/login')} className="text-primary font-semibold hover:text-vibrant-blue transition-colors ml-1">Log in</button>
                    </p>
                </div>
            </main>
            <footer className="mt-12 text-center text-zinc-500 text-xs">
                <p>© 2024 Velo Financial Technologies. All rights reserved.</p>
                <div className="mt-4 flex justify-center gap-4">
                    <a className="hover:text-silver-grey transition-colors" href="#">Privacy Policy</a>
                    <span className="text-zinc-700">•</span>
                    <a className="hover:text-silver-grey transition-colors" href="#">Terms of Service</a>
                    <span className="text-zinc-700">•</span>
                    <a className="hover:text-silver-grey transition-colors" href="#">Contact Support</a>
                </div>
            </footer>
        </div>
    );
};

export default ForgotPassword;
