import React from 'react';
import { Link } from 'react-router-dom';

const OnboardingHome: React.FC = () => {
    return (
        <div className="bg-black text-white min-h-screen flex flex-col font-display">
            {/* Header */}
            <header className="bg-black border-b border-[#262626] px-8 py-4 flex items-center justify-between sticky top-0 z-50">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-white rounded flex items-center justify-center">
                        <span className="text-black font-bold text-xl">V</span>
                    </div>
                    <span className="text-xl font-bold tracking-tight text-white">Velo</span>
                </div>
                <nav className="hidden md:flex items-center gap-8">
                    <Link to="/dashboard" className="text-white font-medium border-b-2 border-white pb-1">Dashboard</Link>
                    <a href="#" className="text-neutral-400 hover:text-white transition-colors">Payments</a>
                    <a href="#" className="text-neutral-400 hover:text-white transition-colors">Recipients</a>
                    <a href="#" className="text-neutral-400 hover:text-white transition-colors">Analytics</a>
                </nav>
                <div className="flex items-center gap-4">
                    <button className="p-2 text-neutral-400 hover:text-white transition-colors">
                        <span className="material-icons">notifications</span>
                    </button>
                    <div className="h-8 w-8 bg-white/10 rounded-full flex items-center justify-center text-white font-semibold border border-white/20 cursor-pointer">
                        JD
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="flex-grow flex flex-col items-center max-w-7xl mx-auto w-full px-6 pt-12 pb-20">
                {/* Progress Bar */}
                <div className="w-full max-w-4xl mb-16">
                    <div className="flex justify-between items-end mb-3">
                        <span className="text-xs font-bold text-primary uppercase tracking-[0.2em]">Your Progress</span>
                        <span className="text-sm font-medium text-neutral-400">0 of 4 tasks completed</span>
                    </div>
                    <div className="h-1.5 w-full bg-[#262626] rounded-full overflow-hidden">
                        <div className="h-full bg-primary w-2 rounded-full transition-all duration-1000"></div>
                    </div>
                </div>

                {/* Hero Section */}
                <section className="flex flex-col items-center text-center mb-16">
                    <div className="relative w-[300px] h-[300px] mb-8 group">
                        <div className="absolute inset-0 bg-primary/20 rounded-full scale-110 blur-[80px] opacity-40"></div>
                        <img
                            alt="Rocket launch conceptual illustration"
                            className="w-full h-full object-contain relative z-10"
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuArMT9xV-LxjY0WsI1Fw-HYN5ewlm1pLnsa8DqwR9RRybNz1FJCtWpVAirQguay2RdvDUT1_s5_q2VLMooV5e80UCXlKxHqf6PFsBiRVGDxN2NS30H9UZIWcM5w8AIuh2ZA2UYp3Rv2zi-SJ4Gl-BCyRm-JALLOWWtUgHBvx3JTE-dE6oJWR9_VMmnh3h4w39_zlMT_8FhUD588k4xk6XRfQLKQ_WAuDw_a1dbyz2nOArI1Y2u5ui0QPH5AiPeVAJDcpr3PjrfNSq7k"
                        />
                    </div>
                    <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-white">
                        Welcome to Velo!
                    </h1>
                    <p className="text-lg md:text-xl text-neutral-400 max-w-2xl leading-relaxed">
                        We're excited to have you here. Let’s get you started with your first payment by following our quick onboarding guide.
                    </p>
                </section>

                {/* Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full max-w-6xl">
                    {/* Step 1: Active */}
                    <div className="group bg-[#121212] border border-[#262626] p-8 rounded-xl hover:border-primary transition-all cursor-pointer">
                        <div className="w-14 h-14 bg-primary rounded-lg flex items-center justify-center mb-6">
                            <span className="material-icons text-white text-3xl">person_outline</span>
                        </div>
                        <h3 className="text-xl font-bold mb-2 text-white">Complete Profile</h3>
                        <p className="text-neutral-400 text-sm leading-relaxed mb-6">
                            Tell us a bit about yourself to unlock all payment features.
                        </p>
                        <div className="flex items-center text-primary font-bold text-sm">
                            <span>Start Now</span>
                            <span className="material-icons text-sm ml-1 group-hover:translate-x-1 transition-transform">arrow_forward</span>
                        </div>
                    </div>

                    {/* Step 2: Locked */}
                    <div className="group bg-[#121212] border border-[#262626] p-8 rounded-xl opacity-60 hover:opacity-100 transition-all cursor-pointer">
                        <div className="w-14 h-14 bg-white/5 rounded-lg flex items-center justify-center mb-6">
                            <span className="material-icons text-neutral-400 text-3xl">account_balance_wallet</span>
                        </div>
                        <h3 className="text-xl font-bold mb-2 text-white">Fund Wallet</h3>
                        <p className="text-neutral-400 text-sm leading-relaxed mb-6">
                            Add balance to your Velo account via bank or card to begin.
                        </p>
                        <div className="flex items-center text-neutral-500 font-semibold text-sm">
                            <span className="material-icons text-sm mr-2">lock</span>
                            <span>Unlock Step 1</span>
                        </div>
                    </div>

                    {/* Step 3: Locked */}
                    <div className="group bg-[#121212] border border-[#262626] p-8 rounded-xl opacity-60 hover:opacity-100 transition-all cursor-pointer">
                        <div className="w-14 h-14 bg-white/5 rounded-lg flex items-center justify-center mb-6">
                            <span className="material-icons text-neutral-400 text-3xl">description</span>
                        </div>
                        <h3 className="text-xl font-bold mb-2 text-white">Create Batch</h3>
                        <p className="text-neutral-400 text-sm leading-relaxed mb-6">
                            Organize your recipients into a single payment group.
                        </p>
                        <div className="flex items-center text-neutral-500 font-semibold text-sm">
                            <span className="material-icons text-sm mr-2">lock</span>
                            <span>Unlock Step 2</span>
                        </div>
                    </div>

                    {/* Step 4: Locked */}
                    <div className="group bg-[#121212] border border-[#262626] p-8 rounded-xl opacity-60 hover:opacity-100 transition-all cursor-pointer">
                        <div className="w-14 h-14 bg-white/5 rounded-lg flex items-center justify-center mb-6">
                            <span className="material-icons text-neutral-400 text-3xl">send</span>
                        </div>
                        <h3 className="text-xl font-bold mb-2 text-white">Make Payment</h3>
                        <p className="text-neutral-400 text-sm leading-relaxed mb-6">
                            Send your first batch and track it in real-time.
                        </p>
                        <div className="flex items-center text-neutral-500 font-semibold text-sm">
                            <span className="material-icons text-sm mr-2">lock</span>
                            <span>Unlock Step 3</span>
                        </div>
                    </div>
                </div>

                {/* Footer Links */}
                <div className="mt-20 flex flex-col items-center gap-6 text-neutral-400">
                    <p className="text-sm">Need help setting up your account?</p>
                    <div className="flex flex-wrap justify-center gap-8">
                        <a href="#" className="flex items-center gap-2 hover:text-white transition-colors">
                            <span className="material-icons text-lg">menu_book</span>
                            <span className="text-sm font-medium">Read Docs</span>
                        </a>
                        <a href="#" className="flex items-center gap-2 hover:text-white transition-colors">
                            <span className="material-icons text-lg">support_agent</span>
                            <span className="text-sm font-medium">Contact Support</span>
                        </a>
                        <a href="#" className="flex items-center gap-2 hover:text-white transition-colors">
                            <span className="material-icons text-lg">play_circle_outline</span>
                            <span className="text-sm font-medium">Watch Tutorial</span>
                        </a>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default OnboardingHome;
