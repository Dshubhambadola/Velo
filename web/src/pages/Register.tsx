import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Register() {
    const [formData, setFormData] = useState({
        email: '',
    });
    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Register attempt:', formData);
        navigate('/verify-email');
    };

    return (
        <div className="flex min-h-screen font-display">
            {/* Left Sidebar (Gradient & Testimonials) */}
            <aside className="hidden lg:flex w-[40%] bg-gradient-to-br from-[#0f2db3] to-[#0369a1] relative overflow-hidden flex-col justify-between p-12">
                <div className="absolute inset-0 opacity-10 pointer-events-none">
                    <svg height="100%" width="100%" xmlns="http://www.w3.org/2000/svg">
                        <defs>
                            <pattern height="40" id="grid" patternUnits="userSpaceOnUse" width="40">
                                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="1"></path>
                            </pattern>
                        </defs>
                        <rect fill="url(#grid)" height="100%" width="100%"></rect>
                    </svg>
                </div>
                <div className="relative z-10">
                    <div className="flex items-center gap-2 mb-16">
                        <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
                            <span className="material-icons text-primary text-2xl font-bold">account_balance_wallet</span>
                        </div>
                        <span className="text-white text-3xl font-bold tracking-tight">Velo</span>
                    </div>
                    <div className="space-y-6">
                        <h1 className="text-white text-5xl font-bold leading-tight">
                            Join 500+ companies paying globally
                        </h1>
                        <p className="text-white/70 text-lg max-w-md">
                            The modern financial operating system for international businesses. Send, receive, and manage capital anywhere.
                        </p>
                    </div>
                </div>
                <div className="relative z-10 flex-grow flex items-center justify-center py-12">
                    <div className="w-full aspect-square relative">
                        <div className="absolute inset-0 bg-white/5 rounded-3xl backdrop-blur-md border border-white/10 flex items-center justify-center shadow-2xl">
                            <img alt="Digital Currency Flow" className="w-4/5 h-4/5 object-contain mix-blend-lighten opacity-90" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDHFEr-EMouL8DWRqJ6sjZoiZRnhhTC7omKhRKe4xSXGB6dTENshPo4wN99CSJWMo74SdW0_f1fka7t7T3O7tP6frvkCMYfB7K2FQJJzdkslyVBDo7CJgL13JTRmFPHcf6imoEfl1s0G_Im_8WxI0DGog0XFi_W0Pe3rZ3MwfhmdjXmdel-wCIE7kS4o5yH-_I0t4aLER_FZF17cfGaJKgSKQCKYrPPjp7HPeWt_TrPvQI-A20wYtifb-I_9EnKVc242t_NfTSzX5dw" />
                        </div>
                    </div>
                </div>
                <div className="relative z-10 grid grid-cols-1 gap-4 pt-8 border-t border-white/10">
                    <div className="flex items-center gap-4">
                        <div className="flex gap-6">
                            <div className="flex items-center gap-2 text-white/80">
                                <span className="material-icons text-white/60 text-sm">verified_user</span>
                                <span className="text-[10px] font-semibold uppercase tracking-widest">Bank-grade security</span>
                            </div>
                            <div className="flex items-center gap-2 text-white/80">
                                <span className="material-icons text-white/60 text-sm">security</span>
                                <span className="text-[10px] font-semibold uppercase tracking-widest">FDIC insured</span>
                            </div>
                            <div className="flex items-center gap-2 text-white/80">
                                <span className="material-icons text-white/60 text-sm">gpp_good</span>
                                <span className="text-[10px] font-semibold uppercase tracking-widest">SOC 2 certified</span>
                            </div>
                        </div>
                    </div>
                </div>
            </aside>

            {/* Right Content (Form) */}
            <main className="w-full lg:w-[60%] flex items-center justify-center p-6 sm:p-12 bg-velo-dark text-white">
                <div className="w-full max-w-md space-y-8">
                    <div className="text-center lg:text-left">
                        <h2 className="text-3xl font-bold text-white">Get started with Velo</h2>
                        <p className="mt-2 text-slate-400">Your first 10 payments are free</p>
                    </div>
                    <div className="grid grid-cols-1 gap-4">
                        <button className="flex items-center justify-center gap-3 w-full px-4 py-3 bg-velo-surface border border-velo-border rounded-lg hover:bg-slate-800/50 transition-all shadow-sm font-medium text-slate-200">
                            <img alt="Google Logo" className="w-5 h-5" src="https://lh3.googleusercontent.com/aida-public/AB6AXuASgaRqcpav19hVF9ZWA84Dmz_EenJwIfZKAX9ZtakRe2EybDYCUVWwqTJ1gndlwfBaSp4Pnnx44eyA1lxNf6TEhws-KDM5KhJU5mzg-mrCAweodDBQfEwH8-OsCnbELoy_eIGuQ1y8zYabpf0hUQWeESt2AyVIHqMgkrLjNJXpfyqUqmCoy_R3GndRSOY_E_7d-1Mb8vZJw32Ev1vsyNGeaV7-3vEI2xFjoYPiSh9zKH4rfwt85hTiuqpUDM9Gy_5UT3cMO7sdJzVn" />
                            Continue with Google
                        </button>
                        <button className="flex items-center justify-center gap-3 w-full px-4 py-3 bg-velo-surface border border-velo-border rounded-lg hover:bg-slate-800/50 transition-all shadow-sm font-medium text-slate-200">
                            <img alt="Microsoft Logo" className="w-5 h-5" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDeaJTqPGsOj4LNAS_vMsf8PCENq-JE_HrDd03sk-8ky-rSbUH8tcBsT45_LZpug4orBBrX7nQIQjmTuMcmMWWw_DvlYmBgykn_43jeGRTh8JC3_Xz6Mt5s2LT6gDXV-J2r_Gz8mGv7_EcuaSFD3322LXtUMAd3ru6rdbZIPRkbHr01ua4lrLwutIpjspsAZmGQKmNKsLQlyoRKyIBE5wmghDZ8Y8KTFZ8QNqd7ID4IZIas3A8L50UhLL77zw7RQfzHwzLkq86poFj1" />
                            Continue with Microsoft
                        </button>
                    </div>
                    <div className="relative py-4">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-velo-border"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-4 bg-velo-dark text-slate-500 font-medium">or sign up with email</span>
                        </div>
                    </div>
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="email" className="block text-sm font-semibold text-slate-300 mb-2">Work Email</label>
                            <input
                                autoFocus
                                className="w-full px-4 py-3 bg-velo-surface border border-velo-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all text-white placeholder:text-slate-600 shadow-sm"
                                id="email"
                                name="email"
                                placeholder="name@company.com"
                                type="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <button className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-3.5 px-4 rounded-lg shadow-lg shadow-primary/20 transition-all flex items-center justify-center gap-2 group" type="submit">
                            Continue with Email
                            <span className="material-icons text-lg group-hover:translate-x-1 transition-transform">arrow_forward</span>
                        </button>
                    </form>
                    <div className="space-y-6 pt-4">
                        <p className="text-center text-sm text-slate-400">
                            Already have an account?
                            <Link to="/login" className="text-primary font-semibold hover:text-blue-400 transition-colors ml-1">Log in</Link>
                        </p>
                        <p className="text-center text-[10px] leading-relaxed text-slate-500 uppercase tracking-widest px-8 opacity-60">
                            By signing up, you agree to our
                            <a className="underline hover:text-slate-300 ml-1" href="#">Terms of Service</a>
                            <span className="mx-1">and</span>
                            <a className="underline hover:text-slate-300" href="#">Privacy Policy</a>.
                        </p>
                    </div>
                </div>
            </main>
        </div>
    );
}
