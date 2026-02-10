import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SSOSignIn: React.FC = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSSOLogin = (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        // Simulate SSO domain detection delay
        setTimeout(() => {
            setIsLoading(false);
            if (email.includes('error')) {
                navigate('/sso-error');
            } else {
                navigate('/sso-redirect');
            }
        }, 1500);
    };

    return (
        <div className="bg-obsidian w-full font-display min-h-screen flex items-center justify-center p-6">
            <div className="w-full max-w-[500px]">
                <div className="flex flex-col items-center mb-8">
                    <div className="mb-6">
                        <div className="w-16 h-16 bg-white/5 rounded-xl flex items-center justify-center mb-4 border border-card-border">
                            <span className="material-icons text-white text-3xl">account_balance</span>
                        </div>
                    </div>
                </div>
                <div className="bg-obsidian-charcoal shadow-2xl rounded-xl border border-card-border p-10">
                    <div className="text-center mb-8">
                        <h1 className="text-2xl font-bold text-white mb-2">Sign in with SSO</h1>
                        <p className="text-silver-grey">Enter your company email to continue</p>
                    </div>
                    <form onSubmit={handleSSOLogin} className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-silver-grey mb-2" htmlFor="email">Work email</label>
                            <div className="relative">
                                <input
                                    className="w-full px-4 py-3 bg-transparent border border-card-border rounded-lg focus:ring-1 focus:ring-primary focus:border-primary transition-all text-white placeholder-silver-grey/40"
                                    id="email"
                                    name="email"
                                    placeholder="e.g. name@company.com"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                                {isLoading && (
                                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                                        <div className="w-5 h-5 border-2 border-silver-grey/10 border-l-silver-grey rounded-full animate-spin"></div>
                                    </div>
                                )}
                            </div>
                            <p className="mt-2 text-xs text-silver-grey font-medium flex items-center opacity-80">
                                <span className="material-icons text-[14px] mr-1">search</span>
                                Detecting SSO domain...
                            </p>
                        </div>
                        <button className="w-full bg-primary hover:bg-[#2563EB] text-white font-semibold py-3.5 px-4 rounded-lg transition-all shadow-lg flex items-center justify-center" type="submit">
                            Continue
                            <span className="material-icons ml-2 text-sm">arrow_forward</span>
                        </button>
                    </form>
                    <div className="mt-8 pt-6 border-t border-card-border flex flex-col items-center">
                        <div className="inline-flex items-center px-3 py-1.5 rounded-full bg-white/5 border border-card-border text-silver-grey text-xs font-semibold mb-6">
                            <span className="material-icons text-sm mr-1.5 text-white/70">verified_user</span>
                            SECURE SINGLE SIGN-ON
                        </div>
                        <button onClick={() => navigate('/login')} className="text-sm text-silver-grey hover:text-white transition-colors flex items-center">
                            <span className="material-icons text-sm mr-1">keyboard_backspace</span>
                            Back to standard login
                        </button>
                    </div>
                </div>
                <div className="mt-8 flex justify-between items-center px-2 text-xs text-silver-grey/50">
                    <div className="flex space-x-4">
                        <a className="hover:text-white transition-colors" href="#">Privacy Policy</a>
                        <a className="hover:text-white transition-colors" href="#">Terms of Service</a>
                    </div>
                    <div className="flex items-center">
                        <span className="material-icons text-xs mr-1">lock</span>
                        256-bit Encryption
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SSOSignIn;
