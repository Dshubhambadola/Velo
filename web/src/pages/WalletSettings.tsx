import React from 'react';
import Sidebar from '../components/Sidebar';

const WalletSettings: React.FC = () => {
    return (
        <div className="flex min-h-screen bg-black text-white font-display">
            <Sidebar />
            <main className="flex-1 max-w-6xl mx-auto px-6 py-10 pb-32 overflow-y-auto">
                <div className="mb-10">
                    <h1 className="text-3xl font-bold mb-2">Advanced Settings</h1>
                    <p className="text-[#A0A0A0]">Configure network protocols, display overrides, and developer access keys.</p>
                </div>
                <div className="space-y-8">
                    {/* Section 1: Network Preferences */}
                    <section>
                        <div className="flex items-center gap-2 mb-4">
                            <span className="material-icons text-[#0d6cf2] text-sm">settings_input_component</span>
                            <h2 className="text-lg font-semibold tracking-wide uppercase text-[#A0A0A0]/80">Network Preferences</h2>
                        </div>
                        <div className="bg-[#121212] border border-[#262626] rounded-xl p-6 shadow-[0_0_15px_rgba(13,108,242,0.15)] transition-all">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div>
                                    <label className="block text-sm font-medium mb-2 text-white">Default Network</label>
                                    <div className="relative group">
                                        <button className="w-full bg-black border border-[#262626] hover:border-[#0d6cf2]/50 text-left px-4 py-3 rounded-lg flex items-center justify-between transition-all">
                                            <div className="flex items-center gap-3">
                                                <div className="w-6 h-6 rounded-full bg-slate-800 flex items-center justify-center">
                                                    <img alt="ETH" className="w-4 h-4" src="https://lh3.googleusercontent.com/aida-public/AB6AXuA1YdoiPfbFV7jljN802RY_9HW0nOvFxII3zbMFg58qRV5nfxxxLmhKaQzcy1AThJtxobyCPgkJEHKtHaVTIlKc166J2GU2JSDbqGsw6lDjuNPG_oSmB29rVpktf9knht19tKPBcfemtvrOqXqHB_-r_Vz6l2Gfbybpk5zkqwSpMVJnfbnsngMS-2KpgQ92-ToowisWMtZVHhfqfSOT7xyOWYwyHRsl7EBnWDV39ORtwAbvXYpX3aRJ3QrH_tAI22rHAI9zD_GgORS1" />
                                                </div>
                                                <span>Ethereum Mainnet</span>
                                            </div>
                                            <span className="material-icons text-[#A0A0A0] group-hover:text-[#0d6cf2] transition-colors">expand_more</span>
                                        </button>
                                    </div>
                                    <p className="mt-2 text-xs text-[#A0A0A0]">Default blockchain used for transactions and dapp interactions.</p>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-2 text-white">Gas Price Strategy</label>
                                    <div className="inline-flex p-1 bg-black border border-[#262626] rounded-lg w-full">
                                        <button className="flex-1 py-2 text-sm font-medium rounded-md text-[#A0A0A0] hover:text-white transition-all">Standard</button>
                                        <button className="flex-1 py-2 text-sm font-medium rounded-md bg-[#0d6cf2] text-white shadow-lg shadow-[0_0_15px_rgba(13,108,242,0.15)]">Fast</button>
                                        <button className="flex-1 py-2 text-sm font-medium rounded-md text-[#A0A0A0] hover:text-white transition-all">Instant</button>
                                    </div>
                                    <div className="mt-2 flex justify-between items-center">
                                        <p className="text-xs text-[#A0A0A0]">Estimated confirmation: <span className="text-[#0d6cf2]">&lt; 15 seconds</span></p>
                                        <span className="text-xs font-mono text-[#0d6cf2]/80">~12.4 Gwei</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                    {/* Section 2: Display Preferences */}
                    <section>
                        <div className="flex items-center gap-2 mb-4">
                            <span className="material-icons text-[#0d6cf2] text-sm">palette</span>
                            <h2 className="text-lg font-semibold tracking-wide uppercase text-[#A0A0A0]/80">Display Preferences</h2>
                        </div>
                        <div className="bg-[#121212] border border-[#262626] rounded-xl p-6">
                            <div className="mb-8">
                                <label className="block text-sm font-medium mb-4 text-white">Theme Interface</label>
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                    {/* Light Mode */}
                                    <div className="relative cursor-pointer group">
                                        <input className="peer absolute opacity-0" id="theme-light" name="theme" type="radio" />
                                        <label className="block p-4 rounded-xl border-2 border-[#262626] bg-[#f5f7f8] peer-checked:border-[#0d6cf2] transition-all" htmlFor="theme-light">
                                            <div className="h-16 w-full bg-white rounded shadow-inner mb-3 flex flex-col gap-2 p-2">
                                                <div className="h-2 w-2/3 bg-slate-200 rounded"></div>
                                                <div className="h-2 w-1/2 bg-slate-100 rounded"></div>
                                            </div>
                                            <span className="text-slate-800 font-medium">Light</span>
                                        </label>
                                    </div>
                                    {/* Dark Mode */}
                                    <div className="relative cursor-pointer group">
                                        <input className="peer absolute opacity-0" id="theme-dark" name="theme" type="radio" />
                                        <label className="block p-4 rounded-xl border-2 border-[#262626] bg-slate-900 peer-checked:border-[#0d6cf2] transition-all" htmlFor="theme-dark">
                                            <div className="h-16 w-full bg-slate-800 rounded shadow-inner mb-3 flex flex-col gap-2 p-2">
                                                <div className="h-2 w-2/3 bg-slate-700 rounded"></div>
                                                <div className="h-2 w-1/2 bg-slate-700 rounded"></div>
                                            </div>
                                            <span className="text-white font-medium">Dark</span>
                                        </label>
                                    </div>
                                    {/* Obsidian Mode */}
                                    <div className="relative cursor-pointer group">
                                        <input defaultChecked className="peer absolute opacity-0" id="theme-obsidian" name="theme" type="radio" />
                                        <label className="block p-4 rounded-xl border-2 border-[#0d6cf2] bg-black shadow-[0_0_15px_rgba(13,108,242,0.15)] transition-all" htmlFor="theme-obsidian">
                                            <div className="h-16 w-full bg-[#121212] rounded shadow-inner mb-3 flex flex-col gap-2 p-2 border border-[#262626]">
                                                <div className="h-2 w-2/3 bg-[#262626] rounded"></div>
                                                <div className="h-2 w-1/2 bg-[#262626] rounded"></div>
                                            </div>
                                            <div className="flex items-center justify-between">
                                                <span className="text-white font-medium">Obsidian</span>
                                                <span className="material-icons text-[#0d6cf2] text-sm">check_circle</span>
                                            </div>
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center justify-between py-4 border-t border-[#262626]">
                                <div>
                                    <p className="font-medium">Compact Mode</p>
                                    <p className="text-xs text-[#A0A0A0]">Reduce padding and font sizes for high-density information.</p>
                                </div>
                                <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-[#0d6cf2]/20 border border-[#0d6cf2]/30">
                                    <span className="translate-x-6 inline-block h-4 w-4 transform rounded-full bg-[#0d6cf2] transition"></span>
                                </button>
                            </div>
                        </div>
                    </section>
                    {/* Section 3: Developer Options */}
                    <section>
                        <div className="flex items-center gap-2 mb-4">
                            <span className="material-icons text-[#0d6cf2] text-sm">code</span>
                            <h2 className="text-lg font-semibold tracking-wide uppercase text-[#A0A0A0]/80">Developer Options</h2>
                        </div>
                        <div className="bg-[#121212] border border-[#262626] rounded-xl overflow-hidden">
                            <div className="p-6 border-b border-[#262626] flex items-center justify-between">
                                <div>
                                    <h3 className="font-medium">Active API Keys</h3>
                                    <p className="text-xs text-[#A0A0A0]">Keys used to authenticate your custom dApps and integrations.</p>
                                </div>
                                <button className="px-4 py-2 border border-[#0d6cf2] text-[#0d6cf2] hover:bg-[#0d6cf2]/10 rounded-lg text-sm font-medium transition-all flex items-center gap-2">
                                    <span className="material-icons text-sm">add</span>
                                    Generate New Key
                                </button>
                            </div>
                            <div className="divide-y divide-[#262626]">
                                {/* API Key Item 1 */}
                                <div className="p-4 flex items-center justify-between hover:bg-white/[0.02] transition-colors">
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded bg-[#0d6cf2]/10 flex items-center justify-center text-[#0d6cf2]">
                                            <span className="material-icons">vpn_key</span>
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium">Main App Key</p>
                                            <p className="text-xs font-mono text-[#A0A0A0]">vl_live_••••••••••••••••3a9b</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <button className="p-2 text-[#A0A0A0] hover:text-white transition-colors">
                                            <span className="material-icons text-lg">content_copy</span>
                                        </button>
                                        <button className="px-3 py-1 text-xs font-semibold text-red-400 hover:bg-red-400/10 rounded border border-red-400/20 transition-all uppercase tracking-wider">
                                            Revoke
                                        </button>
                                    </div>
                                </div>
                                {/* API Key Item 2 */}
                                <div className="p-4 flex items-center justify-between hover:bg-white/[0.02] transition-colors">
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded bg-[#0d6cf2]/10 flex items-center justify-center text-[#0d6cf2]">
                                            <span className="material-icons">analytics</span>
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium">Analytics Key</p>
                                            <p className="text-xs font-mono text-[#A0A0A0]">vl_test_••••••••••••••••92f1</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <button className="p-2 text-[#A0A0A0] hover:text-white transition-colors">
                                            <span className="material-icons text-lg">content_copy</span>
                                        </button>
                                        <button className="px-3 py-1 text-xs font-semibold text-red-400 hover:bg-red-400/10 rounded border border-red-400/20 transition-all uppercase tracking-wider">
                                            Revoke
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </main>
            {/* Sticky Action Footer */}
            <div className="fixed bottom-0 inset-x-0 bg-black/80 backdrop-blur-xl border-t border-[#262626] py-4 px-6 z-50 ml-64">
                {/* Note: ml-64 added to offset sidebar */}
                <div className="max-w-6xl mx-auto flex items-center justify-between">
                    <div className="hidden md:flex items-center gap-2 text-[#A0A0A0] text-xs">
                        <span className="material-icons text-xs">info</span>
                        Last saved: 12 minutes ago from 192.168.1.1
                    </div>
                    <div className="flex items-center gap-4 w-full md:w-auto">
                        <button className="flex-1 md:flex-none px-6 py-2.5 text-sm font-medium text-[#A0A0A0] hover:text-white transition-colors">
                            Reset to Default
                        </button>
                        <button className="flex-1 md:flex-none px-8 py-2.5 bg-[#0d6cf2] hover:bg-[#0d6cf2]/90 text-white rounded-lg font-semibold shadow-lg shadow-[0_0_15px_rgba(13,108,242,0.15)] transition-all">
                            Save Changes
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WalletSettings;
