import React, { useState } from 'react';

interface DepositModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const DepositModal: React.FC<DepositModalProps> = ({ isOpen, onClose }) => {
    const [activeTab, setActiveTab] = useState<'usdc' | 'bridge' | 'fiat'>('usdc');
    const [fiatTab, setFiatTab] = useState<'wire' | 'ach' | 'card'>('ach');
    const [amount, setAmount] = useState<string>("");

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
            {/* Main Modal Container */}
            <div className="w-full max-w-lg bg-[#121212] border border-[#262626] rounded-xl shadow-2xl overflow-hidden relative font-display">

                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-[#262626]">
                    <div className="flex items-center gap-2">
                        <span className="material-icons text-[#0d59f2] text-xl">account_balance_wallet</span>
                        <h1 className="text-xl font-bold tracking-tight text-white">Deposit Funds</h1>
                    </div>
                    <button onClick={onClose} className="text-[#A3A3A3] hover:text-white transition-colors">
                        <span className="material-icons">close</span>
                    </button>
                </div>

                {/* Main Tabs */}
                <div className="flex p-2 gap-2 bg-black/40 border-b border-[#262626]">
                    <button
                        onClick={() => setActiveTab('usdc')}
                        className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all ${activeTab === 'usdc' ? 'bg-[#0d59f2] text-white shadow-[0_0_15px_rgba(13,89,242,0.4)]' : 'text-[#A3A3A3] hover:text-white hover:bg-[#1c1c1c]'}`}
                    >
                        Direct USDC
                    </button>
                    <button
                        onClick={() => setActiveTab('bridge')}
                        className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all ${activeTab === 'bridge' ? 'bg-[#0d59f2] text-white shadow-[0_0_15px_rgba(13,89,242,0.4)]' : 'text-[#A3A3A3] hover:text-white hover:bg-[#1c1c1c]'}`}
                    >
                        Bridge Assets
                    </button>
                    <button
                        onClick={() => setActiveTab('fiat')}
                        className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all ${activeTab === 'fiat' ? 'bg-[#0d59f2] text-white shadow-[0_0_15px_rgba(13,89,242,0.4)]' : 'text-[#A3A3A3] hover:text-white hover:bg-[#1c1c1c]'}`}
                    >
                        Buy with Fiat
                    </button>
                </div>

                {/* Content Area */}
                <div className="p-0">
                    {activeTab === 'usdc' && (
                        <div className="p-8 space-y-6">
                            {/* Instruction Text */}
                            <div className="space-y-1">
                                <h2 className="text-white font-medium">Send USDC to your Velo address</h2>
                                <p className="text-[#A3A3A3] text-sm">Ensure you are sending via the correct network to avoid loss of funds.</p>
                            </div>

                            {/* Network Selector */}
                            <div className="bg-[#1c1c1c] border border-[#262626] p-3 rounded-lg flex items-center justify-between cursor-pointer hover:border-[#0d59f2]/50 transition-colors">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-full bg-[#0d59f2]/20 flex items-center justify-center">
                                        <span className="material-icons text-[#0d59f2] text-sm">hub</span>
                                    </div>
                                    <div>
                                        <p className="text-[10px] text-[#A3A3A3] uppercase tracking-widest font-bold">Network</p>
                                        <p className="text-sm font-medium text-white">Ethereum Mainnet</p>
                                    </div>
                                </div>
                                <span className="material-icons text-[#A3A3A3]">expand_more</span>
                            </div>

                            {/* QR Code Section */}
                            <div className="flex justify-center">
                                <div className="p-4 bg-white rounded-xl">
                                    <img
                                        alt="QR Code for Wallet Address"
                                        className="w-40 h-40"
                                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuB0jOQddXtQHuLnD8fWDL4FHQohLZ_zKbpWrB-lEaceg01snf4hn2nQ0cw40oOReVGygxxIe9un21dn_TxbImzYi6B1SRf1a0eBQqz3g_MBzA7aZ5Q8QMJESTzq5jM19s55rdqQTZ0MO6bDamDumzly3VudyUILO8QNft_O0Cfys-bjIGCmJdq97MjarijPrQDbiaPBZ5CGbAHPnzJn1HuRdkVJ9ekZaIosBjAmpc8o7wbOGG6H_GciTcgVV-ez7DplWU46VmmRSCAt"
                                    />
                                </div>
                            </div>

                            {/* Wallet Address Box */}
                            <div className="space-y-2">
                                <label className="text-[10px] text-[#A3A3A3] uppercase tracking-widest font-bold ml-1">Your Deposit Address</label>
                                <div className="flex items-center gap-2 bg-[#1c1c1c] border border-[#262626] p-1 rounded-lg">
                                    <code className="flex-1 px-3 py-2 text-sm text-[#A3A3A3] font-mono truncate">0x71C7656EC7ab88b098defB751B7401B5f6d8976F</code>
                                    <button
                                        onClick={() => navigator.clipboard.writeText("0x71C7656EC7ab88b098defB751B7401B5f6d8976F")}
                                        className="bg-[#0d59f2] hover:bg-[#0d59f2]/80 text-white px-4 py-2 rounded-md flex items-center gap-2 transition-all shadow-[0_0_15px_rgba(13,89,242,0.4)]"
                                    >
                                        <span className="material-icons text-sm">content_copy</span>
                                        <span className="text-xs font-bold uppercase">Copy</span>
                                    </button>
                                </div>
                            </div>

                            {/* Security Badge */}
                            <div className="flex items-center justify-center gap-2 pt-2">
                                <span className="material-icons text-[#0d59f2]/60 text-base">verified_user</span>
                                <span className="text-[11px] text-[#A3A3A3] uppercase tracking-wider">Secure End-to-End Encrypted Transfer</span>
                            </div>

                            {/* Status Bar */}
                            <div className="bg-[#0d59f2]/10 border border-[#0d59f2]/20 p-4 rounded-lg flex items-center justify-between mt-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-2 h-2 rounded-full bg-[#0d59f2] animate-[pulse_2s_infinite]"></div>
                                    <span className="text-sm font-medium text-[#0d59f2]">Transaction detected</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="text-xs text-[#A3A3A3]">Confirmations: 2/12</span>
                                    <span className="material-icons text-[#0d59f2] text-sm animate-spin">refresh</span>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'fiat' && (
                        <div className="flex flex-col h-[600px] lg:h-auto">
                            {/* Fiat Sub-tabs */}
                            <div className="px-6 pt-6 pb-2">
                                <div className="flex bg-[#000000]/50 p-1 rounded-lg w-fit border border-[#262626]">
                                    <button
                                        onClick={() => setFiatTab('wire')}
                                        className={`px-4 py-1.5 text-xs font-bold rounded-md transition-all uppercase tracking-wider ${fiatTab === 'wire' ? 'bg-[#1c1c1c] text-white shadow-sm border border-[#262626]' : 'text-[#A3A3A3] hover:text-white'}`}
                                    >
                                        Bank Wire
                                    </button>
                                    <button
                                        onClick={() => setFiatTab('ach')}
                                        className={`px-4 py-1.5 text-xs font-bold rounded-md transition-all uppercase tracking-wider ${fiatTab === 'ach' ? 'bg-[#1c1c1c] text-white shadow-sm border border-[#262626]' : 'text-[#A3A3A3] hover:text-white'}`}
                                    >
                                        Bank Transfer (ACH)
                                    </button>
                                    <button
                                        onClick={() => setFiatTab('card')}
                                        className={`px-4 py-1.5 text-xs font-bold rounded-md transition-all uppercase tracking-wider ${fiatTab === 'card' ? 'bg-[#1c1c1c] text-white shadow-sm border border-[#262626]' : 'text-[#A3A3A3] hover:text-white'}`}
                                    >
                                        Debit Card
                                    </button>
                                </div>
                            </div>

                            <div className="p-6 space-y-6 overflow-y-auto">
                                {/* Plaid Integration Section */}
                                <div className="bg-[#0d59f2]/5 border border-[#0d59f2]/20 rounded-xl p-6">
                                    <div className="flex items-start justify-between">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center p-1">
                                                <img
                                                    alt="Plaid Logo"
                                                    className="w-6 h-6 object-contain"
                                                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuAdnPEEx1fchEmqbSZqvSWtRot7o3fPubHk8taSGsiznUn9opdHx8b1iaPI4I7DC9m1rFHZsQJ2K256NqKgYuyLOs_olvcc_2H2KavuGUUa0m8kX7WSSadrQMMHIzPmmQ9zGBx2mr7G_sR959OuvUVsPIln5RNPp7_sDqzjdebdTHoKery0odr5zOQ9y-q2khsAY-vaOjb_wEgawUcf0EVpr0EZvuqG2HBGy0iAK0MWj8u_lDyF5BEkOcfDMNKxvHOaPpD_OascUjqz"
                                                />
                                            </div>
                                            <div>
                                                <h3 className="font-semibold text-white">Connect Bank Account</h3>
                                                <p className="text-xs text-[#A3A3A3]">Securely link your account via Plaid</p>
                                            </div>
                                        </div>
                                        <button className="bg-[#0d59f2] hover:bg-[#0d59f2]/90 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-all">
                                            Connect Bank
                                        </button>
                                    </div>
                                    <div className="mt-4 flex gap-4">
                                        <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-[#A3A3A3]">
                                            <span className="material-icons text-xs text-green-500">verified_user</span>
                                            Bank-Grade Security
                                        </div>
                                        <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-[#A3A3A3]">
                                            <span className="material-icons text-xs text-green-500">lock</span>
                                            End-to-End Encrypted
                                        </div>
                                    </div>
                                </div>

                                {/* Amount Input */}
                                <div className="space-y-4">
                                    <label className="block text-sm font-medium text-[#A3A3A3] uppercase tracking-widest">Amount to Deposit (USD)</label>
                                    <div className="relative">
                                        <span className="absolute left-6 top-1/2 -translate-y-1/2 text-4xl font-light text-[#A3A3A3]">$</span>
                                        <input
                                            value={amount}
                                            onChange={(e) => setAmount(e.target.value)}
                                            className="w-full bg-[#000000]/50 border-2 border-[#262626] rounded-xl py-6 pl-14 pr-6 text-4xl font-display font-medium focus:ring-0 focus:border-[#0d59f2] outline-none transition-all placeholder:text-[#262626] text-white"
                                            placeholder="0.00"
                                            type="text"
                                        />
                                    </div>
                                    <div className="flex gap-3 mt-4">
                                        <button onClick={() => setAmount("1000")} className="flex-1 py-3 px-4 bg-[#1c1c1c] hover:bg-[#262626] rounded-lg text-sm font-semibold text-white transition-all border border-[#262626]">
                                            +$1,000
                                        </button>
                                        <button onClick={() => setAmount("5000")} className="flex-1 py-3 px-4 bg-[#1c1c1c] hover:bg-[#262626] rounded-lg text-sm font-semibold text-white transition-all border border-[#262626]">
                                            +$5,000
                                        </button>
                                        <button onClick={() => setAmount("10000")} className="flex-1 py-3 px-4 bg-[#1c1c1c] hover:bg-[#262626] rounded-lg text-sm font-semibold text-white transition-all border border-[#262626]">
                                            +$10,000
                                        </button>
                                    </div>
                                </div>

                                {/* Summary */}
                                <div className="bg-[#1c1c1c]/50 p-6 rounded-xl border border-[#262626]">
                                    <h3 className="text-sm font-medium text-[#A3A3A3] uppercase tracking-widest mb-6">Conversion Summary</h3>
                                    <div className="space-y-4">
                                        <div className="flex justify-between items-center text-sm">
                                            <span className="text-[#A3A3A3]">Deposit Amount</span>
                                            <span className="font-medium text-white">${amount || '0.00'}</span>
                                        </div>
                                        <div className="flex justify-between items-center text-sm">
                                            <div className="flex items-center gap-1">
                                                <span className="text-[#A3A3A3]">Velo Fee</span>
                                                <span className="text-[10px] bg-[#0d59f2]/10 text-[#0d59f2] px-1.5 py-0.5 rounded font-bold">1.5%</span>
                                            </div>
                                            <span className="font-medium text-red-500">-${amount ? (parseFloat(amount) * 0.015).toFixed(2) : '0.00'}</span>
                                        </div>
                                        <div className="pt-4 border-t border-[#262626]">
                                            <div className="flex flex-col gap-1">
                                                <span className="text-sm text-[#A3A3A3]">Total you'll receive</span>
                                                <div className="flex items-end gap-2">
                                                    <span className="text-3xl font-bold font-display text-[#0d59f2]">
                                                        {amount ? (parseFloat(amount) * 0.985).toFixed(2) : '0.00'}
                                                    </span>
                                                    <span className="text-xl font-bold text-[#A3A3A3] mb-1">USDC</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <button className="w-full mt-6 py-4 bg-[#0d59f2] hover:bg-[#0d59f2]/90 text-white font-bold rounded-xl shadow-[0_0_20px_rgba(13,89,242,0.3)] transition-all flex items-center justify-center gap-2 group">
                                        Confirm Deposit
                                        <span className="material-icons text-sm group-hover:translate-x-1 transition-transform">arrow_forward</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'bridge' && (
                        <div className="p-12 text-center flex flex-col items-center justify-center h-64">
                            <span className="material-icons text-5xl mb-4 text-[#262626]">construction</span>
                            <p className="text-[#A3A3A3] font-medium">Bridge functionality is currently under maintenance.</p>
                            <p className="text-[#A3A3A3]/50 text-sm mt-2">Please check back later.</p>
                        </div>
                    )}
                </div>

                {/* Background Glow */}
                <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-[#0d59f2]/5 blur-[120px] rounded-full pointer-events-none"></div>
                <div className="absolute bottom-[-10%] left-[-10%] w-[30%] h-[30%] bg-[#0d59f2]/5 blur-[100px] rounded-full pointer-events-none"></div>
            </div>
        </div>
    );
};

export default DepositModal;
