import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TwoFactorAuth: React.FC = () => {
    const navigate = useNavigate();
    const [code, setCode] = useState(['', '', '', '', '', '']);
    const [error, setError] = useState(false);

    const handleChange = (index: number, value: string) => {
        if (value.length > 1) value = value[0];
        const newCode = [...code];
        newCode[index] = value;
        setCode(newCode);

        // Auto-focus next input
        if (value && index < 5) {
            const nextInput = document.getElementById(`code-${index + 1}`);
            nextInput?.focus();
        }
    };

    const handleVerify = () => {
        // Simulate verification logic
        const enteredCode = code.join('');
        if (enteredCode === '123456') {
            navigate('/dashboard');
        } else {
            setError(true);
            setTimeout(() => setError(false), 2000); // Reset error after 2s
        }
    };

    return (
        <div className="bg-obsidian font-display antialiased min-h-screen flex items-center justify-center p-4 text-white">
            <main className="w-full max-w-[480px]">
                <div className="flex items-center justify-between mb-8">
                    <button onClick={() => navigate('/login')} className="flex items-center text-text-secondary hover:text-white transition-colors group">
                        <span className="material-icons text-[20px] mr-1 group-hover:-translate-x-1 transition-transform">arrow_back</span>
                        <span className="text-sm font-medium">Back to login</span>
                    </button>
                    <div className="flex items-center px-3 py-1 bg-obsidian-dark border border-obsidian-border rounded-full shadow-sm">
                        <span className="material-icons text-primary text-[16px] mr-2">lock</span>
                        <span className="text-[12px] font-semibold text-primary uppercase tracking-wider">Secure Login</span>
                    </div>
                </div>

                <div className="bg-obsidian-dark border border-obsidian-border rounded-xl shadow-2xl overflow-hidden">
                    <div className="p-8 md:p-10">
                        <header className="text-center mb-8">
                            <h1 className="text-2xl font-bold text-white mb-2">Enter verification code</h1>
                            <p className="text-text-secondary text-sm leading-relaxed">
                                We sent a 6-digit code to your authenticator app.
                            </p>
                            <p className="text-xs text-text-secondary mt-1">(Try <span className="font-mono text-white">123456</span>)</p>
                        </header>

                        <div className="flex justify-center items-center gap-6 mb-8">
                            <div className="flex flex-col items-center opacity-80 hover:opacity-100 transition-all cursor-default">
                                <img className="w-8 h-8 mb-1 brightness-110" alt="Google Authenticator" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCMwmgdczxYTooJzJ5gNIpUa5zq0KgwhJPsHjx_x16ELHnKKSvg5QZ81scKxtLtAfcpAY9U2H1Kb4T409ACKcfI4hS2kJ52MeKnpdNRBox1jPRvy__DdZBI185u9jI4IwPpsVgxOMITQq_JS6lWe1wB4Hyo_Y7evqiN6-QtVkLhk1bYmKFF5Ys2O7NtfFCUK5t85jSPV86igfVaV0SizU_47wBsaforFIWGWuol-fFftzTe_NY90CyLoccgC7Wxw5FDYG4BbH7CYCnq" />
                                <span className="text-[10px] font-medium text-text-secondary">Google</span>
                            </div>
                            <div className="w-px h-6 bg-obsidian-border"></div>
                            <div className="flex flex-col items-center opacity-80 hover:opacity-100 transition-all cursor-default">
                                <img className="w-8 h-8 mb-1 brightness-110" alt="Authy" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCgYs0mvrYrz7hPpsrORAqowRYzM-LDYxwFyh_IRLeawjCydpK76-QWVAgBAqin1rAFEgVs2pL31DA6Yw1kQ47vE-DXfetFnam5V93ts_SpCt9rssAtU2YyZfS52BaGkfuBV5ADyLcZmpNQkggruSp60CnTx-zV_DtLaFt11VZzEQcTbMIHgxWIbUNi3u-6Ex4Khs04OEm1zL4nw75tbBwqkCWSKuBv7J7KzP0W4Ac7BAzYiSaQ6nXtuJiFVcjoyKNxREyg9ONMNInT" />
                                <span className="text-[10px] font-medium text-text-secondary">Authy</span>
                            </div>
                        </div>

                        <div className={`flex justify-center gap-2 mb-6 ${error ? 'animate-shake' : ''}`}>
                            {code.map((digit, index) => (
                                <input
                                    key={index}
                                    id={`code-${index}`}
                                    className={`w-[50px] h-[50px] sm:w-[60px] sm:h-[60px] text-center text-3xl font-bold bg-transparent border rounded-lg focus:outline-none focus:shadow-[0_0_12px_rgba(30,64,175,0.3)] transition-all
                                        ${error
                                            ? 'border-error-red text-error-red bg-error-red/5'
                                            : 'border-input-border text-white focus:border-primary'
                                        }
                                        ${digit ? 'border-primary' : ''}
                                    `}
                                    maxLength={1}
                                    type="text"
                                    value={digit}
                                    onChange={(e) => handleChange(index, e.target.value)}
                                    placeholder="·"
                                />
                            ))}
                        </div>

                        {error && (
                            <div className="mb-6 flex items-center justify-center gap-2 text-error-red animate-pulse">
                                <span className="material-icons text-sm">error_outline</span>
                                <span className="text-sm font-semibold">Invalid code. Please try again.</span>
                            </div>
                        )}

                        <div className="flex items-center justify-center mb-10">
                            <span className="material-icons text-[18px] text-text-secondary mr-2">timer</span>
                            <p className="text-sm font-medium text-text-secondary">Code expires in <span className="text-white font-mono">0:45</span></p>
                        </div>

                        <button
                            onClick={handleVerify}
                            className="w-full bg-primary hover:bg-[#2563EB] text-white font-semibold py-4 rounded-lg shadow-lg shadow-blue-900/20 transition-all active:scale-[0.98] mb-8"
                        >
                            Verify Identity
                        </button>

                        <div className="space-y-4 text-center">
                            <p className="text-sm text-text-secondary">
                                Didn’t receive a code?
                                <a href="#" className="text-text-light-grey font-semibold hover:text-white hover:underline ml-1">Resend</a>
                            </p>
                            <div className="flex items-center justify-center gap-4 text-sm font-medium">
                                <a href="#" className="text-text-light-grey hover:text-white transition-colors">Use backup code instead</a>
                                <span className="text-obsidian-border">|</span>
                                <a href="#" className="text-text-light-grey hover:text-white transition-colors">Try another way</a>
                            </div>
                        </div>
                    </div>

                    <div className="bg-[#0A0A0A] border-t border-obsidian-border py-4 px-6">
                        <div className="flex items-center justify-center text-text-secondary">
                            <span className="material-icons text-[14px] mr-2">verified_user</span>
                            <p className="text-[11px] font-medium uppercase tracking-widest">This extra step keeps your account safe</p>
                        </div>
                    </div>
                </div>

                <div className="mt-8 text-center hidden md:block">
                    <p className="text-[12px] text-text-secondary">
                        © 2024 Velo Financial Systems. All rights reserved. <br />
                        Enterprise-grade B2B security protocol.
                    </p>
                </div>
            </main>

            <style>{`
                @keyframes shake {
                    10%, 90% { transform: translate3d(-1px, 0, 0); }
                    20%, 80% { transform: translate3d(2px, 0, 0); }
                    30%, 50%, 70% { transform: translate3d(-4px, 0, 0); }
                    40%, 60% { transform: translate3d(4px, 0, 0); }
                }
                .animate-shake {
                    animation: shake 0.4s cubic-bezier(.36,.07,.19,.97) both;
                }
            `}</style>
        </div>
    );
};

export default TwoFactorAuth;
