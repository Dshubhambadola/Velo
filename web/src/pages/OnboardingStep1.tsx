import React from 'react';
import { useNavigate } from 'react-router-dom';

const OnboardingStep1: React.FC = () => {
    const navigate = useNavigate();

    const handleSelect = (goal: string) => {
        console.log('Selected goal:', goal);
        // Navigate to next step
        navigate('/onboarding/step2');
    };

    return (
        <div className="min-h-screen flex items-center justify-center relative overflow-x-hidden bg-velo-dark font-display text-white">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_center,rgba(30,64,175,0.15)_0%,transparent_70%)] pointer-events-none"></div>
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/10 rounded-full blur-[120px] pointer-events-none"></div>
            <div className="absolute bottom-[-10%] right-[-10%] w-[30%] h-[30%] bg-primary/5 rounded-full blur-[100px] pointer-events-none"></div>

            <main className="relative z-10 w-full max-w-6xl px-6 py-12 mx-auto">
                <div className="text-center mb-16">
                    <div className="inline-flex flex-col items-center mb-8">
                        <span className="text-primary font-bold text-xs tracking-[0.2em] uppercase mb-4">Step 1 of 5</span>
                        <div className="w-48 h-1 bg-white/10 rounded-full overflow-hidden">
                            <div className="w-1/5 h-full bg-primary rounded-full shadow-[0_0_10px_rgba(30,64,175,0.8)]"></div>
                        </div>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
                        Welcome to Velo! What brings you here today?
                    </h1>
                    <p className="text-lg text-secondary-text max-w-2xl mx-auto">
                        Select the primary way you'll be using Velo to help us tailor your experience.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Option 1 */}
                    <div className="group relative bg-velo-card p-10 rounded-xl border border-white/10 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.5)] hover:border-primary/50 transition-all duration-300 hover:-translate-y-2 flex flex-col items-center text-center">
                        <div className="w-20 h-20 bg-primary/20 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-primary/30 transition-colors">
                            <span className="material-icons text-primary text-4xl">groups</span>
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-3">Pay contractors monthly</h3>
                        <p className="text-secondary-text mb-10 flex-grow leading-relaxed">
                            Automate recurring payroll for your global or local team members with ease.
                        </p>
                        <button
                            onClick={() => handleSelect('contractors')}
                            className="w-full py-4 px-6 bg-primary hover:bg-blue-700 text-white font-bold rounded-lg transition-all shadow-lg shadow-primary/20 active:scale-[0.98]"
                        >
                            Select
                        </button>
                    </div>

                    {/* Option 2 */}
                    <div className="group relative bg-velo-card p-10 rounded-xl border border-white/10 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.5)] hover:border-primary/50 transition-all duration-300 hover:-translate-y-2 flex flex-col items-center text-center">
                        <div className="w-20 h-20 bg-primary/20 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-primary/30 transition-colors">
                            <span className="material-icons text-primary text-4xl">account_balance_wallet</span>
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-3">One-time vendor payment</h3>
                        <p className="text-secondary-text mb-10 flex-grow leading-relaxed">
                            Quickly send a secure payment to a supplier or service provider.
                        </p>
                        <button
                            onClick={() => handleSelect('vendor')}
                            className="w-full py-4 px-6 bg-primary hover:bg-blue-700 text-white font-bold rounded-lg transition-all shadow-lg shadow-primary/20 active:scale-[0.98]"
                        >
                            Select
                        </button>
                    </div>

                    {/* Option 3 */}
                    <div className="group relative bg-velo-card p-10 rounded-xl border border-white/10 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.5)] hover:border-primary/50 transition-all duration-300 hover:-translate-y-2 flex flex-col items-center text-center">
                        <div className="w-20 h-20 bg-primary/20 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-primary/30 transition-colors">
                            <span className="material-icons text-primary text-4xl">search</span>
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-3">Just exploring</h3>
                        <p className="text-secondary-text mb-10 flex-grow leading-relaxed">
                            Not ready to pay yet? Take a tour and learn how Velo can grow your business.
                        </p>
                        <button
                            onClick={() => handleSelect('exploring')}
                            className="w-full py-4 px-6 bg-primary hover:bg-blue-700 text-white font-bold rounded-lg transition-all shadow-lg shadow-primary/20 active:scale-[0.98]"
                        >
                            Select
                        </button>
                    </div>
                </div>

                <div className="mt-20 text-center space-y-8">
                    <button className="text-secondary-text hover:text-white transition-colors text-sm font-medium border-b border-secondary-text/20 pb-1">
                        I'm not sure, help me choose
                    </button>
                    <div className="flex items-center justify-center gap-10 pt-4">
                        <img alt="Partner Logo 1" className="h-5 opacity-40 brightness-0 invert" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAzpFSNo5lHaKjnKKNWPEU743quyXyuCdq3rsA9sw_lcaNIV6PGKQSETa53L7CYetZMEHIDvAft9IO3kUQkel2Y6Iv4YYAoGsw-e8ge4MCwvjEicOH6vuzvavShFS_oD2rcwAEQRLWctH8bc2hBq8tIRE3_BEKyUNoMffRNu8bAaylmlnNkUVfMUW8TKeQ0i9ZjdZXVeq7qZLzonktBb8VLk0XKAtK2serRH_RoqQBocxli0IX2ljVvbgOHrn09dKFx_-Vmaaty8rvN" />
                        <img alt="Partner Logo 2" className="h-5 opacity-40 brightness-0 invert" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDro_fGgswfZFrYq45ZS7gePFezY9juBb0w0uOZCzABlbHrEe3U7IdW5U2iEsbfVEJ91CCiDWunYtX_hqWYTmlZ2zOonDpVW_8GxyzuWNOr6aPbqan9Kg5IA7yy_ufSc12aXI-A1BDdumqW_3Hvyfr2YW4apv4a3yUzOTD6bcaju2yy10GfxZ5BkgVf-a6ocN5ObVIXmaD6VItxhSA-yace1mM07ZKIxghVoY9wDdC4UOE9mSiXDrCRHs347YnurejFucIESd0SGCoS" />
                        <img alt="Partner Logo 3" className="h-5 opacity-40 brightness-0 invert" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCGX2QL7dMHbnFX1juyt4yDX6rlbpfE38r90rxy4oRYK1un_AMwUHRMDB2wghUSECiRwJm_p4YAuXj21UqQNEsUsEAkh_-YoFMyr7MhwUD801a4QbGjzg3QoI5tTX-4zDC2khwLGKVgqiukgF0qmUhqgNxF2ZGe5MquD0H0x-5SdJrECOZtT46aQ-03C6YbZqaSsdC81WqLZ-TbQPDoThg2vbaTSoWtES3AkBZ0TGfw527m-04xrhfhtGpJRd6OCPTTfUzVd61q-TbA" />
                    </div>
                </div>
            </main>

            <div className="fixed bottom-8 right-8">
                <button className="w-14 h-14 bg-velo-card text-primary rounded-full shadow-2xl flex items-center justify-center hover:scale-110 transition-transform border border-white/10">
                    <span className="material-icons text-3xl">help_outline</span>
                </button>
            </div>
        </div>
    );
};

export default OnboardingStep1;
