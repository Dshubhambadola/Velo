import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ResetPasswordSuccess: React.FC = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const timer = setTimeout(() => {
            navigate('/login');
        }, 5000);
        return () => clearTimeout(timer);
    }, [navigate]);

    return (
        <div className="bg-obsidian font-display min-h-screen flex flex-col items-center justify-center p-4 transition-colors duration-300">
            <header className="fixed top-0 left-0 right-0 p-8 flex justify-center">
                <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                        <span className="text-white font-bold text-xl">V</span>
                    </div>
                    <span className="text-2xl font-bold tracking-tight text-white">Velo</span>
                </div>
            </header>
            <main className="w-full max-w-md px-6">
                <div className="bg-charcoal border border-white/5 rounded-xl shadow-2xl p-10 text-center flex flex-col items-center">
                    <div className="relative mb-8">
                        <div className="bg-success-vibrant/10 w-24 h-24 rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(34,197,94,0.3)]">
                            <span className="material-icons text-success-vibrant text-5xl">check</span>
                        </div>
                    </div>
                    <h1 className="text-2xl font-bold text-white mb-3">
                        Password reset successful!
                    </h1>
                    <p className="text-silver-grey mb-10 text-sm leading-relaxed">
                        Your password has been changed. You can now use your new password to access your account and manage your finances.
                    </p>
                    <button
                        onClick={() => navigate('/login')}
                        className="w-full bg-primary hover:bg-primary/90 text-white font-semibold py-3.5 px-6 rounded-lg transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-primary/20 flex items-center justify-center group"
                    >
                        Log in to your account
                        <span className="material-icons text-sm ml-2 group-hover:translate-x-1 transition-transform">arrow_forward</span>
                    </button>
                    <div className="mt-8">
                        <button onClick={() => navigate('/login')} className="text-sm font-medium text-silver-grey hover:text-white transition-colors">
                            Back to login page
                        </button>
                    </div>
                </div>
                <div className="mt-12 text-center">
                    <div className="inline-flex items-center px-4 py-2 bg-white/5 rounded-full">
                        <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                        <span className="text-xs font-medium text-subtle-grey-text uppercase tracking-widest">
                            Redirecting in 5s...
                        </span>
                    </div>
                </div>
            </main>
            <footer className="fixed bottom-0 left-0 right-0 p-8 flex justify-center space-x-6">
                <a className="text-xs text-subtle-grey-text hover:text-silver-grey transition-colors" href="#">Help Center</a>
                <a className="text-xs text-subtle-grey-text hover:text-silver-grey transition-colors" href="#">Privacy Policy</a>
                <a className="text-xs text-subtle-grey-text hover:text-silver-grey transition-colors" href="#">Security Standards</a>
            </footer>
            <div className="fixed top-0 left-0 w-full h-full -z-10 pointer-events-none overflow-hidden">
                <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-primary/5 blur-[120px]"></div>
                <div className="absolute bottom-[-5%] left-[-5%] w-[30%] h-[30%] rounded-full bg-success-vibrant/5 blur-[100px]"></div>
            </div>
        </div>
    );
};

export default ResetPasswordSuccess;
