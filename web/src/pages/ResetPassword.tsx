import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ResetPassword: React.FC = () => {
    const navigate = useNavigate();
    const [password, setPassword] = useState('Vel0_Secur1ty!2024');
    const [confirmPassword, setConfirmPassword] = useState('Vel0_Secur1ty!2024');
    const [showPassword, setShowPassword] = useState(true);

    const handleReset = (e: React.FormEvent) => {
        e.preventDefault();
        // Simulate success or error based on some condition (e.g. password length)
        // For demo, if password is "expired", go to expired link page.
        if (password === 'expired') {
            navigate('/reset-password/expired');
        } else {
            navigate('/reset-password/success');
        }
    };

    return (
        <div className="bg-obsidian font-display min-h-screen flex flex-col items-center justify-center p-4 text-white">
            <main className="w-full max-w-[500px] flex flex-col gap-8">
                <header className="flex flex-col items-center text-center gap-4">
                    <div className="w-12 h-12 bg-primary flex items-center justify-center rounded-xl">
                        <span className="text-white font-bold text-2xl">V</span>
                    </div>
                    <div className="space-y-2">
                        <h1 className="text-2xl font-semibold text-white">Create new password</h1>
                        <p className="text-sm text-silver-grey max-w-[320px] mx-auto leading-relaxed">
                            Your new password must be different from previously used passwords.
                        </p>
                    </div>
                </header>
                <section className="bg-charcoal border border-obsidian-border rounded-xl p-8 md:p-10">
                    <form onSubmit={handleReset} className="space-y-6">
                        <div className="space-y-3">
                            <div className="flex justify-between items-end">
                                <label className="text-sm font-medium text-silver-grey" htmlFor="new-password">New password</label>
                                <button
                                    className="text-xs font-semibold text-primary hover:text-blue-400 transition-all"
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? 'Hide' : 'Show'}
                                </button>
                            </div>
                            <div className="relative">
                                <input
                                    className="w-full px-4 py-3 rounded-lg border border-input-border bg-transparent text-white focus:ring-1 focus:ring-primary focus:border-primary transition-all outline-none"
                                    id="new-password"
                                    type={showPassword ? "text" : "password"}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                            <div className="space-y-2 pt-1">
                                <div className="flex items-center justify-between text-[11px] font-bold uppercase tracking-wider">
                                    <span className="text-silver-grey">Strength</span>
                                    <span className="text-success-vibrant">Strong</span>
                                </div>
                                <div className="flex gap-1.5 h-1 w-full">
                                    <div className="flex-1 bg-success-vibrant rounded-full"></div>
                                    <div className="flex-1 bg-success-vibrant rounded-full"></div>
                                    <div className="flex-1 bg-success-vibrant rounded-full"></div>
                                    <div className="flex-1 bg-success-vibrant rounded-full"></div>
                                </div>
                            </div>
                            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-y-2.5 gap-x-4 pt-4">
                                <li className="flex items-center gap-2 text-xs text-silver-grey">
                                    <span className="material-icons text-success-vibrant text-base">check_circle</span>
                                    <span>12 characters min.</span>
                                </li>
                                <li className="flex items-center gap-2 text-xs text-silver-grey">
                                    <span className="material-icons text-success-vibrant text-base">check_circle</span>
                                    <span>One uppercase letter</span>
                                </li>
                                <li className="flex items-center gap-2 text-xs text-silver-grey">
                                    <span className="material-icons text-success-vibrant text-base">check_circle</span>
                                    <span>One lowercase letter</span>
                                </li>
                                <li className="flex items-center gap-2 text-xs text-silver-grey">
                                    <span className="material-icons text-success-vibrant text-base">check_circle</span>
                                    <span>One number</span>
                                </li>
                                <li className="flex items-center gap-2 text-xs text-silver-grey col-span-1 sm:col-span-2">
                                    <span className="material-icons text-success-vibrant text-base">check_circle</span>
                                    <span>One special character (!@#$...)</span>
                                </li>
                            </ul>
                        </div>
                        <div className="space-y-3 pt-2">
                            <label className="text-sm font-medium text-silver-grey" htmlFor="confirm-password">Confirm new password</label>
                            <div className="relative">
                                <input
                                    className="w-full px-4 py-3 rounded-lg border border-input-border bg-transparent text-white focus:ring-1 focus:ring-primary focus:border-primary transition-all outline-none"
                                    id="confirm-password"
                                    type={showPassword ? "text" : "password"}
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                />
                                <div className="absolute inset-y-0 right-3 flex items-center">
                                    <span className="material-icons text-success-vibrant">check_circle</span>
                                </div>
                            </div>
                        </div>
                        <button className="w-full bg-primary hover:bg-blue-700 text-white font-semibold py-3.5 px-4 rounded-lg transition-all transform active:scale-[0.98] mt-4" type="submit">
                            Reset password
                        </button>
                    </form>
                </section>
                <footer className="flex items-center justify-center gap-2 text-silver-grey">
                    <span className="material-icons text-sm">lock</span>
                    <span className="text-[13px] font-medium tracking-tight">Encrypted 256-bit SSL connection</span>
                </footer>
                <nav className="flex justify-center gap-6 mt-2">
                    <a className="text-xs text-silver-grey hover:text-white transition-colors" href="#">Privacy Policy</a>
                    <a className="text-xs text-silver-grey hover:text-white transition-colors" href="#">Contact Support</a>
                </nav>
            </main>
            <div className="fixed bottom-8 right-8 hidden xl:block">
                <div className="bg-charcoal p-4 rounded-xl border border-obsidian-border shadow-2xl max-w-[240px]">
                    <p className="text-xs text-silver-grey leading-relaxed">
                        Need help? Our security team is available 24/7 to assist with your B2B account access.
                    </p>
                    <div className="mt-3 flex items-center gap-3">
                        <div className="relative">
                            <img alt="Sarah from Velo Support" className="w-8 h-8 rounded-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuA3Bh5G12HIuKAFR7kz2nDXNlZ2H1ueK3YX1UV5jVorbRv9oCto4qyfbRrCMthWE5NTGY_hvYZsVsZTHNcta8_KuAGEKnFe5FhOc0lDWA0h7l-Y9ppHRk_w1UOJilhhkQu9qEIWJD0mF7YYipDJcKT5lpUYGJzK0lGFF14aeI0aCslkS5D3GKZA9aZTeutn-kZeghgJvwU1rzE9X0B4zh6_TNZH7PYeuxVTww16wuOningmuuABrC4GGQinscB7w5lt_prQtdpX1-qv" />
                            <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-success-vibrant border-2 border-charcoal rounded-full"></div>
                        </div>
                        <span className="text-xs font-semibold text-white">Sarah from Velo Support</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ResetPassword;
