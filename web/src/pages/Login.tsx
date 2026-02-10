import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [isError, setIsError] = useState(false);

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        // Simulate error for demo if searching for 'invalid'
        if (email.includes('invalid')) {
            setIsError(true);
            return;
        }
        if (email.includes('locked')) {
            navigate('/account-locked');
            return;
        }
        if (email.includes('suspended')) {
            navigate('/account-suspended');
            return;
        }
        if (email.includes('network')) {
            navigate('/network-error');
            return;
        }

        // Simulate successful login
        console.log('Login attempt');
        navigate('/verify-2fa');
    };

    return (
        <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-obsidian text-white font-display">
            {/* Left Column - Form */}
            <div className="hidden lg:flex lg:w-full relative flex-col justify-between p-16 bg-brand-gradient">
                <div className="relative z-10">
                    <div className="flex items-center space-x-3">
                        <div className="w-11 h-11 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl flex items-center justify-center">
                            <span className="material-icons text-white text-2xl">account_balance_wallet</span>
                        </div>
                        <span className="text-2xl font-bold tracking-widest text-white uppercase">Velo</span>
                    </div>
                    {/* New Apple and SSO buttons added here */}
                    <div className="mt-8">
                        <button className="w-full flex items-center justify-center border border-border-subtle-dark rounded-xl py-3.5 hover:bg-white/5 transition-colors duration-200 group">
                            <span className="material-icons text-white mr-2 text-xl group-hover:scale-110 transition-transform">apple</span>
                            <span className="text-sm font-semibold text-white">Sign in with Apple</span>
                        </button>
                    </div>

                    <div className="mt-4">
                        <button onClick={() => navigate('/sso-login')} className="w-full text-center text-xs font-medium text-silver hover:text-white transition-colors">
                            Sign in with SSO
                        </button>
                    </div>

                    <div className="relative my-8">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-border-subtle-dark"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-4 bg-brand-gradient text-silver uppercase tracking-[0.2em] text-[10px] font-bold">Or continue with</span>
                        </div>
                    </div>
                </div>
                <div className="relative z-10 max-w-lg">
                    <h1 className="text-6xl font-bold text-white mb-8 leading-[1.1] tracking-tight">
                        Future-proof <br />your capital.
                    </h1>
                    <p className="text-xl text-white/70 leading-relaxed font-light">
                        Securely manage institutional digital assets on the world's most advanced B2B fintech infrastructure.
                    </p>
                </div>
                <div className="relative z-10">
                    <div className="flex flex-col space-y-8">
                        <div className="flex items-center space-x-6">
                            <div className="flex -space-x-3">
                                <img alt="User" className="w-11 h-11 rounded-full border-2 border-indigo-900 object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC5fbYU1nT-YvVLeVDFzrm_wVMppI6XMGmfHgvmvBeDZVlspThyeFjuPaV_RufjD1SDN1InR0ivmC94EsH5-Xbfkn09G13Iup82A4QAM9O_w9kcEJLRUy5HrrPYHUsAed5b9viCQfN1e5C4PQZLFSz_ZA6S7v-PK3WedgXhYxOd_rYRsAzSE9T3JIG5jMLQdj5yeOn19Yt1tmo63ZQ7MFHMYhcpKicW65UXsSF1RS1OrJHTS2c2wQwnEYcgmoqXYEXrvnNaspyG-FvG" />
                                <img alt="User" className="w-11 h-11 rounded-full border-2 border-indigo-900 object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDMmtfoZTugkRvHHN9BVGt8iQomOjvmO6yV5RGZ74wpVUl-p9cpc_xDVwWaOQgJXmldclHAmcLscpwgKz4Jx5wxWFqkG_AMIVEOfrxt7e6soqaRY0BVqtoRAxqAYF7sDsvN8jBMFldTuUzUkYkKlwGXxPuDZe-C9y6wNTyqkSugbMHYMsiu9uvG8HKU1914c9Qhm2V5yb4Kl-yomtgzvcXcd5pxiRJkRdhjhnOYWSZLy4II43sFTOQv9oy_wJVheoCeb3DgojHQduHY" />
                                <img alt="User" className="w-11 h-11 rounded-full border-2 border-indigo-900 object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDvPPhJ-Ja9elmz8-nlErMGY1-NjCU2gUf5VN9JAHTNmXGaXIeLC5ERJ4YOhun_OdCIo5hLcVHBngxv-yuGBi7snyMZv1t15Odw7fNTYEL-TVgkh6jh4Sas2xKEiAIoIPS4vB1144jkGTUHUyzXKx-Xsundue7E13BMSGqTYGKjVgLopPbX5NXOum_e3PTYRn7n_7ynAwx69glR16wM4iA59DigE6hfG4UivikVnVtnR72gm3zuKFPzbYLGiTo5SkBnZV9gpeBjpKT2" />
                            </div>
                            <span className="text-sm font-medium text-white/60 tracking-wide">Trusted by 2,000+ global institutions</span>
                        </div>
                        <div className="flex items-center space-x-8 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
                            <div className="flex items-center space-x-2 border border-white/20 px-3 py-1.5 rounded bg-white/5">
                                <span className="material-icons text-sm">verified_user</span>
                                <span className="text-[10px] font-bold tracking-tighter uppercase">SOC 2 Type II</span>
                            </div>
                            <div className="flex items-center space-x-2 border border-white/20 px-3 py-1.5 rounded bg-white/5">
                                <span className="material-icons text-sm">lock</span>
                                <span className="text-[10px] font-bold tracking-tighter uppercase">ISO 27001</span>
                            </div>
                            <div className="flex items-center space-x-2 border border-white/20 px-3 py-1.5 rounded bg-white/5">
                                <span className="material-icons text-sm">gpp_good</span>
                                <span className="text-[10px] font-bold tracking-tighter uppercase">GDPR Compliant</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="absolute inset-0 opacity-40 pointer-events-none overflow-hidden">
                    <div className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] bg-blue-500/20 rounded-full blur-[120px]"></div>
                    <div className="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] bg-violet-600/30 rounded-full blur-[100px]"></div>
                </div>
            </div>

            <div className="w-full lg:w-1/2 flex items-center justify-center p-8 sm:p-12 md:p-24 bg-obsidian">
                <div className="w-full max-w-md">
                    <div className="mb-12 lg:hidden">
                        <div className="flex items-center space-x-2">
                            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                                <span className="material-icons text-white text-2xl">account_balance_wallet</span>
                            </div>
                            <span className="text-2xl font-bold tracking-tight text-white uppercase">Velo</span>
                        </div>
                    </div>
                    <div className="mb-10">
                        <h2 className="text-3xl font-bold text-white mb-3">Sign in</h2>
                        <p className="text-silver font-light">Access your secure institutional dashboard.</p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
                        <button className="flex items-center justify-center space-x-3 py-3 px-4 bg-transparent border border-border-subtle-dark hover:border-silver/50 rounded-xl transition-all duration-300 group">
                            <svg className="w-5 h-5" viewBox="0 0 24 24">
                                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"></path>
                                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"></path>
                                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"></path>
                                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"></path>
                            </svg>
                            <span className="text-sm font-medium text-white group-hover:text-white">Google</span>
                        </button>
                        <button className="flex items-center justify-center space-x-3 py-3 px-4 bg-transparent border border-border-subtle-dark hover:border-silver/50 rounded-xl transition-all duration-300 group">
                            <svg className="w-5 h-5" viewBox="0 0 24 24">
                                <path d="M11.4 12V0H0v11.4h11.4V12zM24 0h-11.4v11.4H24V0zm-12.6 12.6H0V24h11.4v-11.4zm12.6 0h-11.4V24H24v-11.4z" fill="#0078D4"></path>
                            </svg>
                            <span className="text-sm font-medium text-white group-hover:text-white">Azure AD</span>
                        </button>
                    </div>
                    <div className="relative mb-10">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-border-subtle-dark"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-4 bg-obsidian text-silver uppercase tracking-[0.2em] text-[10px] font-bold">Secure Email Login</span>
                        </div>
                    </div>
                    <form className="space-y-6" onSubmit={handleLogin}>
                        <div>
                            <label className="block text-sm font-medium text-silver mb-2.5" htmlFor="email">Work Email</label>
                            <div className="relative">
                                <input
                                    className={`block w-full px-4 py-3.5 rounded-xl bg-transparent border ${isError ? 'border-error-red focus:border-error-red' : 'border-border-subtle-dark focus:border-primary'} focus:ring-1 ${isError ? 'focus:ring-error-red' : 'focus:ring-primary/30'} transition-all duration-200 text-white placeholder-silver/30`}
                                    id="email"
                                    placeholder="name@firm.com"
                                    type="email"
                                    value={email}
                                    onChange={(e) => {
                                        setEmail(e.target.value);
                                        if (isError) setIsError(false);
                                    }}
                                    required
                                />
                                {isError && (
                                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                                        <span className="material-icons text-error-red text-xl">error_outline</span>
                                    </div>
                                )}
                            </div>
                        </div>
                        <div>
                            <div className="flex justify-between items-center mb-2">
                                <label className="block text-sm font-semibold text-silver" htmlFor="password">Password</label>
                                <button type="button" onClick={() => navigate('/forgot-password')} className="text-sm font-semibold text-primary hover:text-primary/80 transition-colors">Forgot Password?</button>
                            </div>
                            <div className="relative">
                                <input
                                    className={`w-full px-4 py-3.5 rounded-xl bg-obsidian-dark border ${isError ? 'border-error-red focus:border-error-red' : 'border-input-border focus:border-primary'} text-white focus:ring-1 ${isError ? 'focus:ring-error-red' : 'focus:ring-primary'} transition-all placeholder:text-silver/30`}
                                    id="password"
                                    type="password"
                                    placeholder="Enter your password"
                                    required
                                />
                                <button type="button" className="absolute inset-y-0 right-0 pr-4 flex items-center text-silver/50 hover:text-white transition-colors">
                                    <span className="material-icons text-xl">visibility_off</span>
                                </button>
                            </div>
                        </div>
                        <div className="flex items-center">
                            <input className="h-4 w-4 bg-transparent border-border-subtle-dark text-primary focus:ring-primary/20 rounded cursor-pointer" id="remember-me" name="remember-me" type="checkbox" />
                            <label className="ml-2.5 block text-sm text-silver cursor-pointer" htmlFor="remember-me">Keep me logged in for 30 days</label>
                        </div>
                        <button className="w-full flex justify-center py-4 px-4 rounded-xl shadow-lg shadow-primary/10 bg-primary hover:bg-blue-700 text-white text-sm font-bold tracking-wide transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary/50" type="submit">
                            Sign In to Dashboard
                        </button>
                    </form>
                    <p className="mt-10 text-center text-sm text-silver">
                        New to the platform?
                        <button onClick={() => navigate('/register')} className="font-bold text-white hover:text-primary transition-colors underline underline-offset-4 decoration-border-subtle-dark ml-1">Request Access</button>
                    </p>
                    <div className="mt-16 flex items-center justify-center space-x-6 text-[11px] text-silver/40 uppercase tracking-widest font-bold">
                        <a className="hover:text-white transition-colors" href="#">Privacy</a>
                        <span className="text-border-subtle-dark">•</span>
                        <a className="hover:text-white transition-colors" href="#">Terms</a>
                        <span className="text-border-subtle-dark">•</span>
                        <a className="hover:text-white transition-colors" href="#">Status</a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
