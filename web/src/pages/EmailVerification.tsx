import React from 'react';
import { Link } from 'react-router-dom';

const EmailVerification: React.FC = () => {
    return (
        <div className="min-h-screen w-full flex flex-col items-center justify-center bg-[radial-gradient(circle_at_center,rgba(25,73,230,0.05)_0%,#0B0E14_100%)] relative p-6 bg-brand-dark font-display text-white">
            <div className="absolute top-10 left-10">
                <Link to="/" className="flex items-center gap-3 group cursor-pointer">
                    <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white shadow-lg shadow-primary/30">
                        <span className="material-icons font-bold">bolt</span>
                    </div>
                    <span className="text-2xl font-bold tracking-tight text-white">Velo</span>
                </Link>
            </div>
            <div className="w-full max-w-lg text-center flex flex-col items-center space-y-10">
                <div className="relative w-64 h-64 flex items-center justify-center mb-2">
                    <div className="absolute inset-0 bg-primary/20 rounded-full blur-[80px]"></div>
                    <div className="relative animate-[float_6s_ease-in-out_infinite] z-10">
                        <img
                            alt="Email verification illustration"
                            className="w-48 h-48 object-contain drop-shadow-[0_25px_25px_rgba(0,0,0,0.5)]"
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDOoJpC7RXbArMTDNx1_QpvvGft4mVxeNzAq1xn5jQ3fmOd2AXCFGeZoQVE4spXSS2ioTZGcUe-dX4dSEgVhbkdqYeyrXOvyk8E4Nc_LPu05HrGi_vYIwEIjdAZSxuBuUhXywHtw4P32T5jfzcFuYuk3sCvT2JcKjxviw_UEaE038QrsB3MTEGoqp4pcVS5KaE2BeIygmazn5A6pRz12LU-tpsbCqq_DKo7q793VbIwyabVywyQf5U5uQOD_AkB-0uJlhB9JeqzCKP-"
                        />
                        <div className="absolute -top-2 -right-2 bg-slate-900/80 backdrop-blur-md p-3 rounded-2xl shadow-2xl border border-white/10">
                            <span className="material-icons text-primary text-3xl">mail</span>
                        </div>
                    </div>
                </div>
                <div className="space-y-4">
                    <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white">
                        Check your inbox
                    </h1>
                    <p className="text-lg text-secondary-text leading-relaxed max-w-md mx-auto">
                        We've sent a verification link to <span className="text-white font-semibold">alex.design@company.com</span>. Click the link in the email to get started.
                    </p>
                </div>
                <div className="w-full flex flex-col items-center space-y-8 pt-2">
                    <div className="w-full max-w-sm space-y-4">
                        <button className="hover:shadow-[0_0_25px_rgba(25,73,230,0.25)] shadow-[0_0_15px_rgba(25,73,230,0.15)] w-full bg-primary/5 hover:bg-primary/10 text-primary border border-primary/40 py-4 px-8 rounded-xl font-semibold flex items-center justify-center gap-3 cursor-not-allowed transition-all duration-300 backdrop-blur-sm">
                            <span className="material-icons text-xl animate-spin">refresh</span>
                            Resend in 54s
                        </button>
                        <p className="text-sm text-slate-500">
                            Didn't receive it? Check your spam folder or wait for the timer.
                        </p>
                    </div>
                    <div className="pt-4">
                        <Link to="/register" className="inline-flex items-center gap-2 text-secondary-text hover:text-white font-medium transition-all group">
                            <span className="material-icons text-sm group-hover:-translate-x-1 transition-transform">arrow_back</span>
                            Use a different email address
                        </Link>

                        {/* Demo bypass link */}
                        <div className="mt-8">
                            <Link to="/onboarding/step1" className="text-xs text-slate-700 hover:text-slate-500">
                                [Demo: Skip Verification]
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            <div className="absolute inset-0 -z-10 opacity-30 overflow-hidden pointer-events-none">
                <div className="absolute -bottom-48 -left-48 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px]"></div>
                <div className="absolute top-1/4 -right-24 w-96 h-96 bg-primary/5 rounded-full blur-[100px]"></div>
            </div>
            <div className="absolute bottom-10 right-10">
                <button className="flex items-center gap-2 text-slate-500 hover:text-white text-sm font-medium transition-colors">
                    <span className="material-icons text-base">help</span>
                    Contact Support
                </button>
            </div>
        </div>
    );
};

export default EmailVerification;
