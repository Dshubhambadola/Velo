import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';

const CrossNetworkBridge: React.FC = () => {
    return (
        <div className="flex min-h-screen bg-[#101822] text-slate-200 font-display">
            <Sidebar />
            <main className="flex-1 flex flex-col h-screen overflow-hidden">
                {/* Header / Navigation */}
                <header className="border-b border-[#232e3d] bg-[#16202c] px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-8">
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-[#2b7cee] rounded flex items-center justify-center">
                                <span className="material-icons text-white text-xl">account_balance_wallet</span>
                            </div>
                            <span className="font-bold text-lg tracking-tight text-white">BRIDGE<span className="text-[#2b7cee]">PRO</span></span>
                        </div>
                        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-400">
                            <a className="hover:text-[#2b7cee] transition-colors" href="#">Dashboard</a>
                            <a className="text-[#2b7cee]" href="#">Bridge Assets</a>
                            <a className="hover:text-[#2b7cee] transition-colors" href="#">Portfolio</a>
                            <a className="hover:text-[#2b7cee] transition-colors" href="#">History</a>
                        </nav>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="hidden sm:flex flex-col items-end mr-2">
                            <span className="text-xs text-slate-500 uppercase font-bold tracking-widest">Global Balance</span>
                            <span className="text-sm font-bold text-white">$1,240,580.42</span>
                        </div>
                        <div className="w-10 h-10 rounded-full bg-[#2b7cee]/20 flex items-center justify-center border border-[#2b7cee]/30">
                            <span className="material-icons text-[#2b7cee]">person</span>
                        </div>
                    </div>
                </header>

                {/* Main Content Layout */}
                <div className="flex-grow grid grid-cols-1 lg:grid-cols-12 gap-6 p-6 max-w-[1600px] mx-auto w-full overflow-y-auto">
                    {/* Central Bridge View */}
                    <div className="lg:col-span-8 flex flex-col gap-6">
                        <div className="bg-[#16202c] border border-[#232e3d] rounded-xl p-8 shadow-xl">
                            <div className="flex items-center justify-between mb-8">
                                <div>
                                    <h1 className="text-2xl font-extrabold tracking-tight text-white">Bridge Assets</h1>
                                    <p className="text-slate-500 text-sm mt-1">Institutional cross-chain liquidity transfer via CCTP</p>
                                </div>
                                <span className="px-3 py-1 bg-[#2b7cee]/10 text-[#2b7cee] text-xs font-bold rounded-full border border-[#2b7cee]/20">SECURE NODE</span>
                            </div>
                            {/* Source to Destination Flow */}
                            <div className="space-y-4">
                                {/* From Ethereum */}
                                <div className="bg-[#101822] border border-[#232e3d] rounded-lg p-5">
                                    <div className="flex justify-between items-center mb-4">
                                        <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">From Network</span>
                                        <span className="text-xs text-slate-400 italic">Balance: $85,450.00</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center">
                                                <img alt="Ethereum" className="w-6 h-6" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAgGj3myronEMgtEn7q8hGX-qQhht_dVvksOfnFEs8I5xVQWIQyLYuVr2kl14_0AvDUMQ1V1npBV-Akm3SVi4dB8jFoqHmEepzDshHpMotBxljr05Pf1GBjqIkTfrD3gyN8785GHj42UmC1OA9GBaLV1_00fXsKt5EJIAGgFpLB0m0oTyQOato8Kohhs0nDGJ-kaTDf5HqbBkUrif5zCFOTCjnNl6OuB-3dUeZCJVQ6_122-pnXO5clHWe8sA47x9Mct8wNJqmBN-eM" />
                                            </div>
                                            <div>
                                                <div className="font-bold text-lg text-white">Ethereum</div>
                                                <div className="text-xs text-slate-500">Mainnet (L1)</div>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <input className="bg-transparent border-none text-right text-2xl font-bold focus:ring-0 p-0 w-32 placeholder-slate-600 text-white" placeholder="0.00" type="text" defaultValue="12,500" />
                                            <div className="text-xs font-bold text-[#2b7cee] mt-1">USDC</div>
                                        </div>
                                    </div>
                                </div>
                                {/* Flow Visualizer */}
                                <div className="relative flex justify-center h-8">
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-[#2b7cee]/30 to-transparent"></div>
                                    </div>
                                    <button className="relative z-10 w-10 h-10 bg-[#2b7cee] rounded-full border-4 border-[#16202c] flex items-center justify-center text-white shadow-lg">
                                        <span className="material-icons">south</span>
                                    </button>
                                </div>
                                {/* To Polygon */}
                                <div className="bg-[#101822] border border-[#232e3d] rounded-lg p-5">
                                    <div className="flex justify-between items-center mb-4">
                                        <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">To Network</span>
                                        <span className="text-xs text-slate-400 italic">Current: $30,000.00</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center">
                                                <img alt="Polygon" className="w-6 h-6" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBQkbPCqjNS--BjQqV6xdvOKsch_D182SWgvr6NKgSZAQVQJ2acban-wJXlDkUKYwOAn_4gcZn-1O6VvYXeyklg0n9bcYVxqLKbtAuA6xKnptPpXne3d5AOwvN4jVlwO56554NgeeJ_ZM51_GzrqW7mk_T7ixffKJJ3YmWhQ-kAWkYp3MYBr7vkMbRk02qbtiYYtCwKbQlSsV7lTA8PPEsj8vYGVYfkkRr2xUXtPztrRq40_yPFQnhQzWt5rl2njDBwwuR4VvAo51JT" />
                                            </div>
                                            <div>
                                                <div className="font-bold text-lg text-white">Polygon</div>
                                                <div className="text-xs text-slate-500">PoS Mainnet</div>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <div className="text-2xl font-bold text-slate-400">12,500.00</div>
                                            <div className="text-xs font-bold text-slate-500 mt-1">USDC</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* Bridge Details */}
                            <div className="mt-8 border-t border-[#232e3d] pt-6 space-y-3">
                                <div className="flex justify-between text-sm">
                                    <span className="text-slate-500">Bridge Provider</span>
                                    <div className="flex items-center gap-2">
                                        <span className="material-icons text-[#2b7cee] text-sm">verified_user</span>
                                        <span className="font-bold text-white">Circle CCTP</span>
                                    </div>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-slate-500">Bridge Fee</span>
                                    <span className="font-mono font-bold text-green-500">$0.00 <span className="text-[10px] uppercase font-sans text-slate-400 ml-1">(Promo)</span></span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-slate-500">Estimated Time</span>
                                    <span className="font-bold text-white">5 - 10 min</span>
                                </div>
                            </div>
                            <button className="w-full mt-8 bg-[#2b7cee] hover:bg-blue-600 text-white font-bold py-4 rounded-xl shadow-lg shadow-[#2b7cee]/30 transition-all flex items-center justify-center gap-2">
                                <span>Review Bridge Transaction</span>
                                <span className="material-icons">arrow_forward</span>
                            </button>
                        </div>
                        <div className="bg-[#2b7cee]/5 border border-[#2b7cee]/20 rounded-lg p-4 flex items-start gap-3">
                            <span className="material-icons text-[#2b7cee] mt-0.5">info</span>
                            <p className="text-xs leading-relaxed text-slate-400">
                                <strong className="text-[#2b7cee]">Institutional Note:</strong> This transaction will require 2/3 multi-sig approvals from the treasury workspace once reviewed. Assets are routed through native burn-and-mint protocols for maximum security.
                            </p>
                        </div>
                    </div>
                    {/* Right Sidebar (Health & Monitors) */}
                    <div className="lg:col-span-4 flex flex-col gap-6">
                        {/* Network Health */}
                        <div className="bg-[#16202c] border border-[#232e3d] rounded-xl p-5">
                            <div className="flex items-center justify-between mb-5">
                                <h3 className="font-bold text-sm uppercase tracking-wider text-slate-500">Network Health</h3>
                                <span className="material-icons text-slate-400 text-lg">sensors</span>
                            </div>
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]"></div>
                                        <span className="text-sm font-medium text-white">Ethereum</span>
                                    </div>
                                    <span className="text-[10px] font-bold bg-green-500/10 text-green-500 px-2 py-0.5 rounded uppercase">Operational</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]"></div>
                                        <span className="text-sm font-medium text-white">Polygon</span>
                                    </div>
                                    <span className="text-[10px] font-bold bg-green-500/10 text-green-500 px-2 py-0.5 rounded uppercase">Operational</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="w-2 h-2 rounded-full bg-yellow-500 shadow-[0_0_8px_rgba(234,179,8,0.6)]"></div>
                                        <span className="text-sm font-medium text-white">Arbitrum</span>
                                    </div>
                                    <span className="text-[10px] font-bold bg-yellow-500/10 text-yellow-500 px-2 py-0.5 rounded uppercase">Congested</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]"></div>
                                        <span className="text-sm font-medium text-white">Base</span>
                                    </div>
                                    <span className="text-[10px] font-bold bg-green-500/10 text-green-500 px-2 py-0.5 rounded uppercase">Operational</span>
                                </div>
                            </div>
                        </div>
                        {/* Gas Price Monitor */}
                        <div className="bg-[#16202c] border border-[#232e3d] rounded-xl p-5">
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="font-bold text-sm uppercase tracking-wider text-slate-500">Gas Price Monitor</h3>
                                <div className="flex items-center gap-1 text-[#2b7cee]">
                                    <span className="text-[10px] font-bold uppercase">Live</span>
                                    <div className="w-1 h-1 rounded-full bg-[#2b7cee] animate-pulse"></div>
                                </div>
                            </div>
                            <div className="grid grid-cols-3 gap-3 mb-6">
                                <div className="text-center p-3 bg-[#101822] rounded-lg border border-[#232e3d]">
                                    <div className="text-xs text-slate-500 mb-1">Low</div>
                                    <div className="text-lg font-bold font-mono text-white">18</div>
                                    <div className="text-[10px] text-slate-400">Gwei</div>
                                </div>
                                <div className="text-center p-3 bg-[#2b7cee]/10 rounded-lg border border-[#2b7cee]/30 ring-2 ring-[#2b7cee]/20">
                                    <div className="text-xs text-[#2b7cee] font-bold mb-1">Std</div>
                                    <div className="text-lg font-bold font-mono text-white">24</div>
                                    <div className="text-[10px] text-[#2b7cee]/70">Gwei</div>
                                </div>
                                <div className="text-center p-3 bg-[#101822] rounded-lg border border-[#232e3d]">
                                    <div className="text-xs text-slate-500 mb-1">Fast</div>
                                    <div className="text-lg font-bold font-mono text-white">32</div>
                                    <div className="text-[10px] text-slate-400">Gwei</div>
                                </div>
                            </div>
                            {/* Simple Gauge Visualization */}
                            <div className="relative pt-2">
                                <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden flex">
                                    <div className="h-full bg-green-500" style={{ width: '30%' }}></div>
                                    <div className="h-full bg-yellow-500" style={{ width: '40%' }}></div>
                                    <div className="h-full bg-red-500" style={{ width: '30%' }}></div>
                                </div>
                                <div className="absolute top-0 left-[24%] -mt-1 transform -translate-x-1/2">
                                    <div className="w-0.5 h-4 bg-[#2b7cee] relative">
                                        <div className="absolute -top-1 -left-1 w-2.5 h-2.5 bg-[#2b7cee] rounded-full shadow-lg"></div>
                                    </div>
                                </div>
                                <div className="flex justify-between mt-2">
                                    <span className="text-[10px] text-slate-500 font-bold uppercase">Optimal Entry</span>
                                    <span className="text-[10px] text-slate-500 font-bold uppercase">Peak Load</span>
                                </div>
                            </div>
                        </div>
                        {/* Recent Activity Mini-Widget */}
                        <div className="bg-[#16202c] border border-[#232e3d] rounded-xl p-5">
                            <h3 className="font-bold text-sm uppercase tracking-wider text-slate-500 mb-4">Bridge Routes</h3>
                            <div className="space-y-3">
                                <div className="flex items-center gap-3 p-2 hover:bg-slate-800/50 rounded-lg cursor-pointer transition-colors group">
                                    <div className="w-8 h-8 rounded bg-[#2b7cee]/10 flex items-center justify-center text-[#2b7cee] group-hover:bg-[#2b7cee] group-hover:text-white transition-all">
                                        <span className="material-icons text-sm">history</span>
                                    </div>
                                    <div>
                                        <div className="text-xs font-bold text-white">ETH → ARB</div>
                                        <div className="text-[10px] text-slate-500">Last: 25k USDC, 4m ago</div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3 p-2 hover:bg-slate-800/50 rounded-lg cursor-pointer transition-colors group">
                                    <div className="w-8 h-8 rounded bg-[#2b7cee]/10 flex items-center justify-center text-[#2b7cee] group-hover:bg-[#2b7cee] group-hover:text-white transition-all">
                                        <span className="material-icons text-sm">history</span>
                                    </div>
                                    <div>
                                        <div className="text-xs font-bold text-white">BASE → ETH</div>
                                        <div className="text-[10px] text-slate-500">Last: 120k USDC, 2h ago</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer Stats */}
                <footer className="border-t border-[#232e3d] bg-[#16202c] px-6 py-3">
                    <div className="flex flex-wrap justify-between items-center gap-4 text-[10px] font-bold uppercase tracking-widest text-slate-500">
                        <div className="flex gap-6">
                            <div className="flex items-center gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
                                API: CONNECTED
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
                                RPC NODES: ACTIVE
                            </div>
                        </div>
                        <div className="hidden sm:block">
                            SYSTEM TIME: 14:22:10 UTC
                        </div>
                        <div className="text-[#2b7cee] hover:underline cursor-pointer">
                            Security Audit Report v2.4
                        </div>
                    </div>
                </footer>
            </main>
        </div>
    );
};

export default CrossNetworkBridge;
