import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const DeviceTrust: React.FC = () => {
    const navigate = useNavigate();
    const [trustLevel, setTrustLevel] = useState('trust');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Logic to handle device trust
        console.log('Device trust level:', trustLevel);
        navigate('/dashboard'); // Proceed to dashboard/app
    };

    return (
        <div className="bg-black font-display antialiased text-white overflow-hidden min-h-screen relative">
            {/* Background Blur Effect */}
            <div className="fixed inset-0 z-0 overflow-hidden filter blur-xl opacity-20 pointer-events-none">
                <header className="h-16 border-b border-white/5 flex items-center px-8 bg-black">
                    <div className="h-8 w-24 bg-white/10 rounded"></div>
                    <div className="ml-auto flex gap-4">
                        <div className="h-8 w-8 rounded-full bg-white/10"></div>
                        <div className="h-8 w-32 bg-white/10 rounded"></div>
                    </div>
                </header>
                <main className="p-8 flex gap-6">
                    <aside className="w-64 space-y-4">
                        <div className="h-10 bg-white/5 rounded-lg"></div>
                        <div className="h-10 bg-white/5 rounded-lg w-4/5"></div>
                        <div className="h-10 bg-white/5 rounded-lg w-2/3"></div>
                    </aside>
                    <section className="flex-1 grid grid-cols-3 gap-6">
                        <div className="h-64 bg-white/5 rounded-xl border border-white/5"></div>
                        <div className="h-64 bg-white/5 rounded-xl border border-white/5"></div>
                        <div className="h-64 bg-white/5 rounded-xl border border-white/5"></div>
                        <div className="col-span-3 h-96 bg-white/5 rounded-xl border border-white/5"></div>
                    </section>
                </main>
            </div>

            {/* Modal */}
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
                <div className="w-full max-w-lg bg-obsidian-dark rounded-xl shadow-[0_0_50px_rgba(0,0,0,0.5)] overflow-hidden border border-obsidian-border">
                    <div className="p-8">
                        <div className="flex flex-col items-center text-center mb-8">
                            <div className="w-14 h-14 bg-brand-primary-blue/20 rounded-full flex items-center justify-center mb-4 text-brand-primary-blue">
                                <span className="material-icons-round text-3xl">verified_user</span>
                            </div>
                            <h1 className="text-2xl font-bold text-white mb-2">Is this a trusted device?</h1>
                            <p className="text-silver-grey text-sm leading-relaxed px-4">
                                You’re signing in from a new device or location. To keep your Velo account secure, please verify these details.
                            </p>
                        </div>
                        <div className="bg-obsidian-section rounded-lg p-5 border border-obsidian-border mb-8">
                            <div className="grid grid-cols-2 gap-y-5 gap-x-2">
                                <div className="flex items-start gap-3">
                                    <span className="material-icons-round text-silver-grey text-lg">laptop_mac</span>
                                    <div>
                                        <p className="text-[11px] uppercase tracking-wider font-semibold text-silver-grey">Device</p>
                                        <p className="text-sm font-medium text-white">Chrome on MacOS</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <span className="material-icons-round text-silver-grey text-lg">place</span>
                                    <div>
                                        <p className="text-[11px] uppercase tracking-wider font-semibold text-silver-grey">Location</p>
                                        <p className="text-sm font-medium text-white">San Francisco, CA</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <span className="material-icons-round text-silver-grey text-lg">dns</span>
                                    <div>
                                        <p className="text-[11px] uppercase tracking-wider font-semibold text-silver-grey">IP Address</p>
                                        <p className="text-sm font-medium text-white">192.168.1.1</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <span className="material-icons-round text-silver-grey text-lg">schedule</span>
                                    <div>
                                        <p className="text-[11px] uppercase tracking-wider font-semibold text-silver-grey">Timestamp</p>
                                        <p className="text-sm font-medium text-white">Oct 24, 2023 at 10:45 AM</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <form className="space-y-4" onSubmit={handleSubmit}>
                            <label className={`relative flex items-start p-4 cursor-pointer rounded-lg border hover:bg-obsidian-section transition-colors group ${trustLevel === 'trust' ? 'border-brand-primary-blue ring-1 ring-brand-primary-blue' : 'border-obsidian-border'}`}>
                                <div className="flex items-center h-5">
                                    <input
                                        type="radio"
                                        name="trust_level"
                                        value="trust"
                                        checked={trustLevel === 'trust'}
                                        onChange={() => setTrustLevel('trust')}
                                        className="w-4 h-4 text-brand-primary-blue border-obsidian-border focus:ring-brand-primary-blue bg-black custom-radio"
                                    />
                                </div>
                                <div className="ml-3 flex flex-col">
                                    <span className="block text-sm font-semibold text-white">Yes, trust this device</span>
                                    <span className="block text-xs text-silver-grey mt-1">Recommended for personal computers or office workstations.</span>
                                    {trustLevel === 'trust' && (
                                        <div className="mt-3 pt-3 border-t border-obsidian-border flex items-center gap-2">
                                            <input className="rounded border-obsidian-border text-brand-primary-blue focus:ring-brand-primary-blue bg-black" id="remember" type="checkbox" defaultChecked />
                                            <label className="text-xs font-medium text-silver-grey" htmlFor="remember">Remember for 30 days</label>
                                        </div>
                                    )}
                                </div>
                            </label>
                            <label className={`relative flex items-start p-4 cursor-pointer rounded-lg border hover:bg-obsidian-section transition-colors group ${trustLevel === 'public' ? 'border-brand-primary-blue ring-1 ring-brand-primary-blue' : 'border-obsidian-border'}`}>
                                <div className="flex items-center h-5">
                                    <input
                                        type="radio"
                                        name="trust_level"
                                        value="public"
                                        checked={trustLevel === 'public'}
                                        onChange={() => setTrustLevel('public')}
                                        className="w-4 h-4 text-brand-primary-blue border-obsidian-border focus:ring-brand-primary-blue bg-black custom-radio"
                                    />
                                </div>
                                <div className="ml-3 flex flex-col">
                                    <span className="block text-sm font-semibold text-white">No, this is a shared/public device</span>
                                    <span className="block text-xs text-silver-grey mt-1">Select this for internet cafes, libraries, or temporary hardware.</span>
                                </div>
                            </label>
                            <button className="w-full mt-6 bg-brand-primary-blue hover:bg-blue-700 text-white font-semibold py-3.5 px-4 rounded-lg transition-all shadow-lg shadow-blue-900/20 flex items-center justify-center gap-2" type="submit">
                                Continue
                                <span className="material-icons-round text-base">arrow_forward</span>
                            </button>
                        </form>
                        <div className="mt-8 flex flex-col items-center gap-4">
                            <button onClick={() => navigate('/login')} className="text-sm font-medium text-silver-grey hover:text-white transition-colors flex items-center gap-1">
                                Not you? Go back to login
                            </button>
                            <div className="flex items-center gap-2 pt-4 opacity-70">
                                <span className="material-icons-round text-xs text-silver-grey">lock</span>
                                <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-silver-grey">Secured by Velo Cloud Security</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DeviceTrust;
