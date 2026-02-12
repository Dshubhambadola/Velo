import React from 'react';
import Sidebar from '../components/Sidebar';

const MultiNetworkWallet: React.FC = () => {
    return (
        <div className="flex min-h-screen bg-black text-white font-display">
            <Sidebar />
            <main className="flex-1 p-8 lg:p-12 bg-black overflow-y-auto">
                <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
                    <div className="space-y-2">
                        <h1 className="text-[32px] font-bold tracking-tight text-white">Multi-Network Wallet</h1>
                        <div className="flex items-center gap-3">
                            <span className="text-[#A0A0A0] font-medium">Total Balance</span>
                            <span className="text-2xl font-semibold text-white">$125,450.23 <span className="text-sm font-normal text-[#A0A0A0]">USDC</span></span>
                        </div>
                    </div>
                    <button className="flex items-center justify-center gap-2 bg-[#25f46a] hover:brightness-110 text-black px-6 py-3 rounded-lg font-bold transition-all shadow-[0_0_15px_rgba(37,244,106,0.3)]">
                        <span className="material-icons">add</span>
                        Add Network
                    </button>
                </header>
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                    {/* Ethereum Card */}
                    <div className="bg-[#181818] border-t-2 border-[#627EEA] shadow-[0_-4px_15px_-5px_rgba(98,126,234,0.4)] rounded-lg border border-[#262626] p-6 flex flex-col justify-between">
                        <div>
                            <div className="flex items-center justify-between mb-6">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-[#627EEA]/20 flex items-center justify-center">
                                        <span className="material-icons text-[#627EEA]">token</span>
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-lg leading-tight text-white">Ethereum</h3>
                                        <div className="flex items-center gap-1.5">
                                            <span className="w-1.5 h-1.5 rounded-full bg-[#25f46a] shadow-[0_0_8px_#25f46a]"></span>
                                            <span className="text-[10px] text-[#A0A0A0] uppercase font-bold tracking-wider">Mainnet</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <span className="text-2xl font-bold block text-white">$85,450.00</span>
                                    <span className="text-xs text-[#A0A0A0] font-medium tracking-wide">32.41 ETH</span>
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4 mb-8">
                                <div className="bg-black/50 p-3 rounded-lg border border-[#262626]">
                                    <span className="text-[10px] text-[#A0A0A0] font-bold uppercase block mb-1">Gas Status</span>
                                    <div className="flex items-center gap-2">
                                        <span className="text-sm font-semibold text-white">25 gwei</span>
                                        <span className="text-[10px] px-2 py-0.5 bg-yellow-500/20 text-yellow-500 border border-yellow-500/30 rounded-full font-bold">Normal</span>
                                    </div>
                                </div>
                                <div className="bg-black/50 p-3 rounded-lg border border-[#262626]">
                                    <span className="text-[10px] text-[#A0A0A0] font-bold uppercase block mb-1">Avg. Cost</span>
                                    <span className="text-sm font-semibold text-white">~$0.50 / tx</span>
                                </div>
                            </div>
                            <div className="h-16 w-full mb-6">
                                <div className="flex items-end h-full gap-1.5">
                                    {[40, 60, 55, 75, 85, 80, 95].map((h, i) => (
                                        <div key={i} className={`flex-1 rounded-t-sm drop-shadow-[0_0_4px_rgba(37,244,106,0.6)] ${i === 6 ? 'bg-[#25f46a]' : 'bg-[#25f46a]/20'}`} style={{ height: `${h}%` }}></div>
                                    ))}
                                </div>
                                <p className="text-[10px] text-[#A0A0A0] mt-2 text-center uppercase font-bold tracking-[0.2em]">7-Day activity trend</p>
                            </div>
                        </div>
                        <div className="grid grid-cols-3 gap-3 border-t border-[#262626] pt-6">
                            <button className="flex items-center justify-center gap-1.5 py-2.5 px-3 border border-[#262626] hover:border-white text-white rounded font-medium text-sm transition-all bg-black/30">
                                <span className="material-icons text-sm">send</span> Send
                            </button>
                            <button className="flex items-center justify-center gap-1.5 py-2.5 px-3 border border-[#262626] hover:border-white text-white rounded font-medium text-sm transition-all bg-black/30">
                                <span className="material-icons text-sm">call_received</span> Receive
                            </button>
                            <button className="flex items-center justify-center gap-1.5 py-2.5 px-3 border border-[#262626] hover:border-white text-white rounded font-medium text-sm transition-all bg-black/30">
                                <span className="material-icons text-sm">swap_calls</span> Bridge
                            </button>
                        </div>
                    </div>

                    {/* Polygon Card */}
                    <div className="bg-[#181818] border-t-2 border-[#8247E5] shadow-[0_-4px_15px_-5px_rgba(130,71,229,0.4)] rounded-lg border border-[#262626] p-6 flex flex-col justify-between">
                        <div>
                            <div className="flex items-center justify-between mb-6">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-[#8247E5]/20 flex items-center justify-center">
                                        <span className="material-icons text-[#8247E5]">hexagon</span>
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-lg leading-tight text-white">Polygon</h3>
                                        <div className="flex items-center gap-1.5">
                                            <span className="w-1.5 h-1.5 rounded-full bg-[#25f46a] shadow-[0_0_8px_#25f46a]"></span>
                                            <span className="text-[10px] text-[#A0A0A0] uppercase font-bold tracking-wider">POS</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <span className="text-2xl font-bold block text-white">$30,000.00</span>
                                    <span className="text-xs text-[#A0A0A0] font-medium tracking-wide">24,580 MATIC</span>
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4 mb-8">
                                <div className="bg-black/50 p-3 rounded-lg border border-[#262626]">
                                    <span className="text-[10px] text-[#A0A0A0] font-bold uppercase block mb-1">Gas Status</span>
                                    <div className="flex items-center gap-2">
                                        <span className="text-sm font-semibold text-white">30 gwei</span>
                                        <span className="text-[10px] px-2 py-0.5 bg-[#25f46a]/20 text-[#25f46a] border border-[#25f46a]/30 rounded-full font-bold">Low</span>
                                    </div>
                                </div>
                                <div className="bg-black/50 p-3 rounded-lg border border-[#262626]">
                                    <span className="text-[10px] text-[#A0A0A0] font-bold uppercase block mb-1">Avg. Cost</span>
                                    <span className="text-sm font-semibold text-white">~$0.02 / tx</span>
                                </div>
                            </div>
                            <div className="h-16 w-full mb-6">
                                <div className="flex items-end h-full gap-1.5">
                                    {[90, 80, 75, 70, 65, 60, 55].map((h, i) => (
                                        <div key={i} className={`flex-1 rounded-t-sm drop-shadow-[0_0_4px_rgba(37,244,106,0.6)] bg-[#25f46a]/${50 - i * 5}`} style={{ height: `${h}%` }}></div>
                                    ))}
                                </div>
                                <p className="text-[10px] text-[#A0A0A0] mt-2 text-center uppercase font-bold tracking-[0.2em]">7-Day activity trend</p>
                            </div>
                        </div>
                        <div className="grid grid-cols-3 gap-3 border-t border-[#262626] pt-6">
                            <button className="flex items-center justify-center gap-1.5 py-2.5 px-3 border border-[#262626] hover:border-white text-white rounded font-medium text-sm transition-all bg-black/30">
                                <span className="material-icons text-sm">send</span> Send
                            </button>
                            <button className="flex items-center justify-center gap-1.5 py-2.5 px-3 border border-[#262626] hover:border-white text-white rounded font-medium text-sm transition-all bg-black/30">
                                <span className="material-icons text-sm">call_received</span> Receive
                            </button>
                            <button className="flex items-center justify-center gap-1.5 py-2.5 px-3 border border-[#262626] hover:border-white text-white rounded font-medium text-sm transition-all bg-black/30">
                                <span className="material-icons text-sm">swap_calls</span> Bridge
                            </button>
                        </div>
                    </div>

                    {/* Base Card */}
                    <div className="bg-[#181818] border-t-2 border-[#00D1FF] shadow-[0_-4px_15px_-5px_rgba(0,209,255,0.4)] rounded-lg border border-[#262626] p-6 flex flex-col justify-between">
                        <div>
                            <div className="flex items-center justify-between mb-6">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-[#00D1FF]/20 flex items-center justify-center">
                                        <span className="material-icons text-[#00D1FF]">auto_fix_high</span>
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-lg leading-tight text-white">Base</h3>
                                        <div className="flex items-center gap-1.5">
                                            <span className="w-1.5 h-1.5 rounded-full bg-[#25f46a] shadow-[0_0_8px_#25f46a]"></span>
                                            <span className="text-[10px] text-[#A0A0A0] uppercase font-bold tracking-wider">Layer 2</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <span className="text-2xl font-bold block text-white">$10,000.23</span>
                                    <span className="text-xs text-[#A0A0A0] font-medium tracking-wide">10,000.23 USDC</span>
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4 mb-8">
                                <div className="bg-black/50 p-3 rounded-lg border border-[#262626]">
                                    <span className="text-[10px] text-[#A0A0A0] font-bold uppercase block mb-1">Gas Status</span>
                                    <div className="flex items-center gap-2">
                                        <span className="text-sm font-semibold text-white">0.001 gwei</span>
                                        <span className="text-[10px] px-2 py-0.5 bg-[#25f46a]/20 text-[#25f46a] border border-[#25f46a]/30 rounded-full font-bold">Low</span>
                                    </div>
                                </div>
                                <div className="bg-black/50 p-3 rounded-lg border border-[#262626]">
                                    <span className="text-[10px] text-[#A0A0A0] font-bold uppercase block mb-1">Avg. Cost</span>
                                    <span className="text-sm font-semibold text-white">~$0.03 / tx</span>
                                </div>
                            </div>
                            <div className="h-16 w-full mb-6">
                                <div className="flex items-end h-full gap-1.5">
                                    {[20, 30, 40, 50, 65, 80, 90].map((h, i) => (
                                        <div key={i} className={`flex-1 rounded-t-sm drop-shadow-[0_0_4px_rgba(37,244,106,0.6)] ${i === 6 ? 'bg-[#25f46a]' : `bg-[#25f46a]/${(i + 1) * 10}`}`} style={{ height: `${h}%` }}></div>
                                    ))}
                                </div>
                                <p className="text-[10px] text-[#A0A0A0] mt-2 text-center uppercase font-bold tracking-[0.2em]">7-Day activity trend</p>
                            </div>
                        </div>
                        <div className="grid grid-cols-3 gap-3 border-t border-[#262626] pt-6">
                            <button className="flex items-center justify-center gap-1.5 py-2.5 px-3 border border-[#262626] hover:border-white text-white rounded font-medium text-sm transition-all bg-black/30">
                                <span className="material-icons text-sm">send</span> Send
                            </button>
                            <button className="flex items-center justify-center gap-1.5 py-2.5 px-3 border border-[#262626] hover:border-white text-white rounded font-medium text-sm transition-all bg-black/30">
                                <span className="material-icons text-sm">call_received</span> Receive
                            </button>
                            <button className="flex items-center justify-center gap-1.5 py-2.5 px-3 border border-[#262626] hover:border-white text-white rounded font-medium text-sm transition-all bg-black/30">
                                <span className="material-icons text-sm">swap_calls</span> Bridge
                            </button>
                        </div>
                    </div>

                    {/* Arbitrum Inactive Card */}
                    <div className="bg-[#181818]/50 border border-dashed border-[#262626] rounded-lg p-6 flex flex-col justify-between">
                        <div>
                            <div className="flex items-center justify-between mb-6">
                                <div className="flex items-center gap-3 grayscale opacity-40">
                                    <div className="w-10 h-10 rounded-full bg-[#A0A0A0]/20 flex items-center justify-center">
                                        <span className="material-icons text-[#A0A0A0]">waves</span>
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-lg leading-tight text-white">Arbitrum</h3>
                                        <div className="flex items-center gap-1.5">
                                            <span className="w-1.5 h-1.5 rounded-full bg-[#A0A0A0]"></span>
                                            <span className="text-[10px] text-[#A0A0A0] uppercase font-bold tracking-wider">Not Active</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <span className="text-2xl font-bold block text-[#A0A0A0]">$0.00</span>
                                    <span className="text-xs text-[#A0A0A0] font-medium tracking-wide">0.00 ARB</span>
                                </div>
                            </div>
                            <div className="flex flex-col items-center justify-center py-12 text-center">
                                <span className="material-icons text-4xl text-[#262626] mb-4">cloud_off</span>
                                <p className="text-white font-medium mb-1">Network inactive on this account</p>
                                <p className="text-xs text-[#A0A0A0] max-w-[240px]">Activate Arbitrum One to start managing L2 assets and bridging funds.</p>
                            </div>
                        </div>
                        <div className="pt-6">
                            <button className="w-full bg-[#25f46a] hover:brightness-110 text-black py-3 rounded-lg font-bold shadow-[0_0_15px_rgba(37,244,106,0.2)] transition-all">
                                Activate Arbitrum
                            </button>
                        </div>
                    </div>
                </div>

                {/* Footer Stats Grid */}
                <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="flex items-center gap-4 bg-[#181818] p-5 rounded-xl border border-[#262626]">
                        <div className="w-12 h-12 bg-[#25f46a]/10 rounded-full flex items-center justify-center">
                            <div className="w-2 h-2 rounded-full bg-[#25f46a] shadow-[0_0_8px_#25f46a] mr-1"></div>
                            <span className="material-icons text-[#25f46a]">security</span>
                        </div>
                        <div>
                            <p className="text-[10px] text-[#A0A0A0] font-bold uppercase tracking-widest">Security Level</p>
                            <p className="font-bold text-white">Multi-Sig High</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-4 bg-[#181818] p-5 rounded-xl border border-[#262626]">
                        <div className="w-12 h-12 bg-[#25f46a]/10 rounded-full flex items-center justify-center">
                            <div className="w-2 h-2 rounded-full bg-[#25f46a] shadow-[0_0_8px_#25f46a] mr-1"></div>
                            <span className="material-icons text-[#25f46a]">speed</span>
                        </div>
                        <div>
                            <p className="text-[10px] text-[#A0A0A0] font-bold uppercase tracking-widest">Active RPCs</p>
                            <p className="font-bold text-white">4 Nodes Optimal</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-4 bg-[#181818] p-5 rounded-xl border border-[#262626]">
                        <div className="w-12 h-12 bg-[#25f46a]/10 rounded-full flex items-center justify-center">
                            <div className="w-2 h-2 rounded-full bg-[#25f46a] shadow-[0_0_8px_#25f46a] mr-1"></div>
                            <span className="material-icons text-[#25f46a]">history</span>
                        </div>
                        <div>
                            <p className="text-[10px] text-[#A0A0A0] font-bold uppercase tracking-widest">Sync Status</p>
                            <p className="font-bold text-white">Last Block: 2s ago</p>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default MultiNetworkWallet;
