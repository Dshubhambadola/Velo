import React, { useState } from 'react';

interface WithdrawModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const WithdrawModal: React.FC<WithdrawModalProps> = ({ isOpen, onClose }) => {
    const [activeTab, setActiveTab] = useState<'bank' | 'crypto'>('bank');
    const [amount, setAmount] = useState<string>("10000.00");

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200 font-display text-white">
            {/* Modal Container */}
            <div className="w-full max-w-[540px] bg-[#121212] border border-[#262626] rounded-xl shadow-2xl overflow-hidden relative">

                {/* Header */}
                <div className="px-8 pt-8 pb-6 flex justify-between items-center border-b border-[#262626]">
                    <h1 className="text-2xl font-semibold tracking-tight">Withdraw Funds</h1>
                    <button onClick={onClose} className="text-[#A0A0A0] hover:text-white transition-colors">
                        <span className="material-icons">close</span>
                    </button>
                </div>

                {/* Navigation Tabs */}
                <div className="flex px-8 border-b border-[#262626]">
                    <button
                        onClick={() => setActiveTab('bank')}
                        className={`py-4 text-sm font-medium relative transition-colors ${activeTab === 'bank' ? 'text-white border-b-2 border-[#0d59f2]' : 'text-[#A0A0A0] hover:text-white'}`}
                    >
                        To Bank Account
                        {activeTab === 'bank' && <span className="absolute bottom-[-2px] left-0 w-full h-0.5 bg-[#0d59f2] shadow-[0_0_15px_rgba(13,89,242,0.4)]"></span>}
                    </button>
                    <button
                        onClick={() => setActiveTab('crypto')}
                        className={`py-4 px-8 text-sm font-medium transition-colors ${activeTab === 'crypto' ? 'text-white border-b-2 border-[#0d59f2]' : 'text-[#A0A0A0] hover:text-white'}`}
                    >
                        To Crypto Wallet
                        {activeTab === 'crypto' && <span className="absolute bottom-[-2px] left-0 w-full h-0.5 bg-[#0d59f2] shadow-[0_0_15px_rgba(13,89,242,0.4)]"></span>}
                    </button>
                </div>

                <div className="p-8 space-y-8">
                    {activeTab === 'bank' ? (
                        <>
                            {/* Connect Bank Section (Plaid) */}
                            <div className="space-y-3">
                                <div className="flex justify-between items-end">
                                    <label className="text-xs font-semibold uppercase tracking-wider text-[#A0A0A0]">Bank Connection</label>
                                    <div className="flex items-center gap-2">
                                        <span className="w-2 h-2 rounded-full bg-[#0d59f2] shadow-[0_0_8px_rgba(13,89,242,0.8)]"></span>
                                        <span className="text-[10px] font-bold text-[#0d59f2] uppercase tracking-widest">System Ready</span>
                                    </div>
                                </div>
                                <div className="bg-black/40 border border-[#262626] rounded-lg p-5 flex items-center justify-between group hover:border-[#0d59f2]/50 transition-all cursor-pointer">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center overflow-hidden p-1">
                                            <img
                                                className="w-full h-full object-contain"
                                                alt="Chase Bank"
                                                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDYKEMeZnL1cG6yRhayorK43DlWrRAkpbgJ9dOUzfUQ6lZUBYiiFJ-YAWXh0jIp0OZIIzHXi8cueBOMiqZ-kEj3mPpVKs9TQVAxHubdtZHbr-MoTnEcux2c9QwHxNeOTX92FUoTe3IDX76WvvWBU5oemQx4oBRaVQziqyueXRTbOyF2R2htMz8VoqyW0qbboDagbTcVhwrznae7i4a3B69vcaCcnGsEYB0tBs-K7Jd4rmsiXK72wnNfOM7V05urdRAeujcXaIDIRSuv"
                                            />
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-white">Chase Bank •••• 8829</p>
                                            <p className="text-xs text-[#A0A0A0]">Connected via Plaid</p>
                                        </div>
                                    </div>
                                    <span className="material-icons text-[#A0A0A0] group-hover:text-white transition-colors">chevron_right</span>
                                </div>
                            </div>

                            {/* Withdrawal Amount Section */}
                            <div className="space-y-3">
                                <label className="text-xs font-semibold uppercase tracking-wider text-[#A0A0A0]">Withdrawal Amount</label>
                                <div className="relative">
                                    <input
                                        className="w-full bg-black/40 border border-[#262626] rounded-lg py-5 px-6 text-3xl font-bold text-white focus:ring-1 focus:ring-[#0d59f2] focus:border-[#0d59f2] transition-all outline-none"
                                        type="text"
                                        value={amount}
                                        onChange={(e) => setAmount(e.target.value)}
                                    />
                                    <div className="absolute right-6 top-1/2 -translate-y-1/2 text-xl font-medium text-[#A0A0A0]">
                                        USD
                                    </div>
                                </div>
                                {/* Fee Breakdown */}
                                <div className="bg-[#0d59f2]/5 rounded-lg p-4 border border-[#0d59f2]/10">
                                    <div className="flex justify-between text-sm mb-2">
                                        <span className="text-[#A0A0A0]">Withdrawal Fee (1.5%)</span>
                                        <span className="text-white font-medium">-${(parseFloat(amount.replace(/,/g, '')) * 0.015).toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between text-base">
                                        <span className="text-[#A0A0A0] font-medium">You receive</span>
                                        <span className="text-[#0d59f2] font-bold tracking-tight">${(parseFloat(amount.replace(/,/g, '')) * 0.985).toFixed(2)} USD</span>
                                    </div>
                                </div>
                            </div>

                            {/* Arrival Timeline */}
                            <div className="flex items-center gap-3 py-2">
                                <div className="w-10 h-10 rounded-full bg-[#262626] flex items-center justify-center">
                                    <span className="material-icons text-[#0d59f2] text-xl">schedule</span>
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-white">Estimated Arrival</p>
                                    <p className="text-xs text-[#A0A0A0]">3-5 business days</p>
                                </div>
                            </div>

                            {/* Action Button */}
                            <div className="pt-2">
                                <button className="w-full bg-[#0d59f2] hover:bg-blue-600 text-white font-bold py-5 rounded-lg transition-all transform active:scale-[0.98] shadow-[0_0_15px_rgba(13,89,242,0.4)] flex items-center justify-center gap-2 group">
                                    <span>Withdraw to Bank</span>
                                    <span className="material-icons text-lg group-hover:translate-x-1 transition-transform">arrow_forward</span>
                                </button>
                                <p className="text-center mt-6 text-[11px] text-[#A0A0A0] leading-relaxed">
                                    By clicking "Withdraw to Bank", you agree to Velo's <a className="text-[#0d59f2] hover:underline" href="#">Terms of Service</a> and authorize the electronic transfer via the Plaid network.
                                </p>
                            </div>
                        </>
                    ) : (
                        <div className="flex flex-col items-center justify-center h-64 text-center">
                            <span className="material-icons text-5xl mb-4 text-[#262626]">currency_bitcoin</span>
                            <p className="text-[#A0A0A0] font-medium">Crypto withdrawals are currently disabled.</p>
                            <p className="text-[#A0A0A0]/50 text-sm mt-2">Please contact support for large OTC transfers.</p>
                        </div>
                    )}
                </div>

                {/* Background Elements for Depth */}
                <div className="absolute -top-1/4 -right-1/4 w-[600px] h-[600px] bg-[#0d59f2]/10 rounded-full blur-[120px] pointer-events-none"></div>
                <div className="absolute -bottom-1/4 -left-1/4 w-[600px] h-[600px] bg-[#0d59f2]/5 rounded-full blur-[120px] pointer-events-none"></div>
            </div>
        </div>
    );
};

export default WithdrawModal;
