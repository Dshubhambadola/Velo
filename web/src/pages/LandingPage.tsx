import React from 'react';
import Features from '../components/Features';
import { Link } from 'react-router-dom';


const LandingPage: React.FC = () => {
    return (
        <div className="bg-background-light dark:bg-background-dark font-display text-slate-900 dark:text-white min-h-screen">
            {/* Navigation */}
            <nav className="fixed top-0 w-full z-50 glass-nav">
                <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 bg-primary rounded flex items-center justify-center">
                            <span className="material-icons text-white text-xl">payments</span>
                        </div>
                        <span className="font-bold text-xl tracking-tight text-white uppercase tracking-[0.1em]">Velo</span>
                    </div>
                    <div className="hidden md:flex items-center space-x-10 text-sm font-medium text-slate-300">
                        <a href="#" className="hover:text-primary transition-colors">Product</a>
                        <a href="#" className="hover:text-primary transition-colors">Pricing</a>
                        <a href="#" className="hover:text-primary transition-colors">Security</a>
                        <a href="#" className="hover:text-primary transition-colors">Network</a>
                    </div>
                    <div className="flex items-center space-x-4">
                        <Link to="/login" className="text-sm font-medium text-slate-300 hover:text-white px-4 py-2">Log in</Link>
                        <Link to="/register" className="bg-primary text-white text-sm font-semibold px-5 py-2.5 rounded hover:bg-blue-600 transition-all">
                            Start Free Trial
                        </Link>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="relative min-h-screen flex items-center pt-20 overflow-hidden hero-gradient">
                {/* Grid Background */}
                <div className="absolute inset-0 opacity-10 pointer-events-none">
                    <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                        <defs>
                            <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                                <path d="M 10 0 L 0 0 0 10" fill="none" stroke="white" strokeWidth="0.1" />
                            </pattern>
                        </defs>
                        <rect width="100%" height="100%" fill="url(#grid)" />
                    </svg>
                </div>

                <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
                    {/* Left Content */}
                    <div className="space-y-8 max-w-xl">
                        <div className="inline-flex items-center space-x-2 bg-primary/10 border border-primary/20 px-3 py-1 rounded-full">
                            <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse"></span>
                            <span className="text-xs font-semibold text-primary uppercase tracking-wider">New: Velo Instant Settlements</span>
                        </div>
                        <h1 className="text-5xl lg:text-6xl font-extrabold leading-[1.1] text-white tracking-tight">
                            Cross-border payroll at <span className="text-primary">blockchain speed</span>
                        </h1>
                        <p className="text-xl text-slate-400 leading-relaxed">
                            Pay your global team in minutes, not days. Velo leverages next-gen stablecoin infrastructure to settle payments instantly while saving you 80% on fees.
                        </p>
                        <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4">
                            <Link to="/register" className="w-full sm:w-auto bg-primary text-white font-bold py-4 px-8 rounded-lg hover:bg-blue-600 transition-all shadow-lg shadow-primary/20 flex items-center justify-center space-x-2">
                                <span>Start Free Trial</span>
                                <span className="material-icons text-sm">arrow_forward</span>
                            </Link>
                            <button className="w-full sm:w-auto bg-white/5 border border-white/10 text-white font-semibold py-4 px-8 rounded-lg hover:bg-white/10 transition-all backdrop-blur-sm flex items-center justify-center space-x-2">
                                <span className="material-icons text-xl">play_circle</span>
                                <span>Watch Demo</span>
                            </button>
                        </div>

                        <div className="pt-8 border-t border-white/5">
                            <div className="flex flex-wrap items-center gap-6 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
                                <div className="flex items-center space-x-2">
                                    <span className="material-icons text-white text-lg">verified_user</span>
                                    <span className="text-white text-xs font-medium tracking-wide">SOC 2 CERTIFIED</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <span className="material-icons text-white text-lg">security</span>
                                    <span className="text-white text-xs font-medium tracking-wide">BANK-GRADE SECURITY</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <span className="material-icons text-white text-lg">bolt</span>
                                    <span className="text-white text-xs font-medium tracking-wide">99.9% UPTIME</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Visual (Isometric Card) */}
                    <div className="relative lg:block hidden">
                        <div className="isometric-card bg-slate-900 border border-slate-800 rounded-xl p-6 relative z-20">
                            <div className="flex items-center justify-between mb-8 border-b border-slate-800 pb-4">
                                <div className="flex items-center space-x-3">
                                    <div className="w-7 h-7 bg-primary rounded flex items-center justify-center">
                                        <span className="material-icons text-white text-sm">payments</span>
                                    </div>
                                    <div>
                                        <h3 className="text-white font-bold text-base flex items-center">
                                            Velo Dashboard
                                            <span className="ml-2 px-1.5 py-0.5 rounded bg-primary/20 text-primary text-[10px] uppercase">Enterprise</span>
                                        </h3>
                                        <p className="text-slate-500 text-[10px]">Batch #8271 • Q3 Global Payroll</p>
                                    </div>
                                </div>
                                <div className="flex space-x-1">
                                    <div className="w-2 h-2 rounded-full bg-red-500/50"></div>
                                    <div className="w-2 h-2 rounded-full bg-yellow-500/50"></div>
                                    <div className="w-2 h-2 rounded-full bg-green-500/50"></div>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4 mb-8">
                                <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700/50">
                                    <p className="text-slate-500 text-[10px] mb-1 uppercase tracking-wider">Total Value Settleable</p>
                                    <p className="text-xl font-bold text-white">$42,500.00 <span className="text-xs text-slate-400 font-normal">USDC</span></p>
                                </div>
                                <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700/50">
                                    <p className="text-slate-500 text-[10px] mb-1 uppercase tracking-wider">Velo Network Nodes</p>
                                    <p className="text-xl font-bold text-primary">12 / 12</p>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-3">
                                        <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-xs font-bold text-slate-300">LD</div>
                                        <div>
                                            <p className="text-sm font-medium text-white leading-none">London, UK Team</p>
                                            <p className="text-[10px] text-slate-500">14 recipients • £12,400.00</p>
                                        </div>
                                    </div>
                                    <div className="w-24 bg-slate-800 h-1.5 rounded-full overflow-hidden">
                                        <div className="bg-primary h-full w-full"></div>
                                    </div>
                                </div>
                                {/* More items... */}
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-3">
                                        <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-xs font-bold text-slate-300">SP</div>
                                        <div>
                                            <p className="text-sm font-medium text-white leading-none">São Paulo, BR Team</p>
                                            <p className="text-[10px] text-slate-500">8 recipients • R$32,000.00</p>
                                        </div>
                                    </div>
                                    <div className="w-24 bg-slate-800 h-1.5 rounded-full overflow-hidden">
                                        <div className="bg-primary h-full w-[65%]"></div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Decorative Elements */}
                        <div className="absolute -top-10 -right-10 w-32 h-32 bg-primary/20 blur-3xl rounded-full"></div>
                        <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-cyan-500/10 blur-3xl rounded-full"></div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <Features />
        </div>
    );
};

export default LandingPage;
