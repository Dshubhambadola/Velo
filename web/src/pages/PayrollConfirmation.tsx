import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const PayrollConfirmation: React.FC = () => {
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);
    const [otp, setOtp] = useState(['', '', '', '', '', '']);

    const handleOtpChange = (index: number, value: string) => {
        if (value.length > 1) return;
        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        // Auto-focus next input
        if (value && index < 5) {
            const nextInput = document.getElementById(`otp-${index + 1}`);
            nextInput?.focus();
        }
    };

    const handleExecute = () => {
        // TODO: Backend integration for execution
        console.log('Executing payroll batch...');
        navigate('/payroll/execute');
    };

    return (
        <div className="bg-obsidian-black min-h-screen font-display text-white antialiased">
            {/* Navigation */}
            <nav className="bg-obsidian-charcoal border-b border-obsidian-border sticky top-0 z-40">
                <div className="max-w-[1440px] mx-auto px-6 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="bg-primary w-8 h-8 rounded flex items-center justify-center">
                            <span className="text-white font-bold">V</span>
                        </div>
                        <span className="font-bold text-xl tracking-tight text-white">Velo</span>
                    </div>
                    <div className="flex items-center gap-8">
                        {/* Progress Stepper */}
                        <div className="flex items-center gap-3">
                            <div className="flex items-center gap-2">
                                <span className="w-6 h-6 rounded-full bg-emerald-500 text-white text-xs flex items-center justify-center">1</span>
                                <span className="text-sm font-medium text-silver-grey">Upload</span>
                            </div>
                            <div className="w-8 h-px bg-obsidian-border"></div>
                            <div className="flex items-center gap-2">
                                <span className="w-6 h-6 rounded-full bg-emerald-500 text-white text-xs flex items-center justify-center">2</span>
                                <span className="text-sm font-medium text-silver-grey">Validate</span>
                            </div>
                            <div className="w-8 h-px bg-obsidian-border"></div>
                            <div className="flex items-center gap-2">
                                <span className="w-6 h-6 rounded-full bg-primary text-white text-xs flex items-center justify-center ring-4 ring-primary/20 font-bold">3</span>
                                <span className="text-sm font-bold text-white">Review</span>
                            </div>
                            <div className="w-8 h-px bg-obsidian-border"></div>
                            <div className="flex items-center gap-2">
                                <span className="w-6 h-6 rounded-full bg-obsidian-border text-silver-grey text-xs flex items-center justify-center">4</span>
                                <span className="text-sm font-medium text-silver-grey">Execute</span>
                            </div>
                        </div>
                        <button onClick={() => navigate('/payroll')} className="text-silver-grey hover:text-white transition-colors">
                            <span className="material-icons">close</span>
                        </button>
                    </div>
                </div>
            </nav>

            {/* Main Content */}
            <main className={`max-w-[1440px] mx-auto px-6 py-8 ${showModal ? 'filter blur-md opacity-50 select-none pointer-events-none transition-all duration-300' : ''}`}>
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Left Column (Details) */}
                    <div className="w-full lg:w-3/5 space-y-6">
                        <div className="space-y-1">
                            <div className="flex items-center gap-2 text-silver-grey text-sm font-medium">
                                <span>Batch ID: VELO-2023-09-001</span>
                                <span className="w-1 h-1 bg-obsidian-border rounded-full"></span>
                                <span>Created Sept 24, 2023</span>
                            </div>
                            <div className="flex items-center group">
                                <input className="text-3xl font-bold bg-transparent border-none p-0 focus:ring-0 w-full text-white" type="text" defaultValue="September Global Payroll" />
                                <span className="material-icons text-obsidian-border group-hover:text-primary cursor-pointer ml-2 transition-colors">edit</span>
                            </div>
                        </div>

                        <div className="space-y-4">
                            {/* Payment Summary */}
                            <div className="bg-charcoal rounded-xl border border-obsidian-border overflow-hidden">
                                <div className="p-5 flex items-center justify-between border-b border-obsidian-border">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center text-primary">
                                            <span className="material-icons">account_balance_wallet</span>
                                        </div>
                                        <h3 className="font-semibold text-lg text-white">Payment Summary</h3>
                                    </div>
                                    <span className="material-icons text-silver-grey">expand_less</span>
                                </div>
                                <div className="p-6">
                                    <div className="grid grid-cols-2 gap-8">
                                        <div className="space-y-4">
                                            <div>
                                                <p className="text-sm text-silver-grey mb-1">Total Batch Amount</p>
                                                <p className="text-3xl font-bold text-white">$67,500.00 <span className="text-sm font-medium text-silver-grey">USDC</span></p>
                                            </div>
                                            <div className="flex items-center gap-2 p-2 bg-obsidian-black/40 rounded-lg border border-obsidian-border">
                                                {/* Placeholder for ETH icon */}
                                                <div className="w-5 h-5 bg-white/20 rounded-full"></div>
                                                <span className="text-sm font-medium text-silver-grey">Ethereum Mainnet</span>
                                            </div>
                                        </div>
                                        <div className="space-y-3 bg-obsidian-black/40 p-4 rounded-xl border border-obsidian-border">
                                            <div className="flex justify-between text-sm">
                                                <span className="text-silver-grey">Subtotal</span>
                                                <span className="font-medium text-white">$67,482.00</span>
                                            </div>
                                            <div className="flex justify-between text-sm">
                                                <span className="text-silver-grey">Gas Fees (Estimated)</span>
                                                <span className="font-medium text-emerald-400">~$12.50</span>
                                            </div>
                                            <div className="flex justify-between text-sm">
                                                <span className="text-silver-grey">Platform Fee</span>
                                                <span className="font-medium text-white">$5.50</span>
                                            </div>
                                            <div className="pt-2 border-t border-obsidian-border flex justify-between font-bold text-white">
                                                <span>Total Cost</span>
                                                <span>$67,500.00</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Recipient Breakdown */}
                            <div className="bg-charcoal rounded-xl border border-obsidian-border overflow-hidden">
                                <div className="p-5 flex items-center justify-between border-b border-obsidian-border">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-lg bg-emerald-900/20 flex items-center justify-center text-emerald-400">
                                            <span className="material-icons">groups</span>
                                        </div>
                                        <h3 className="font-semibold text-lg text-white">Recipient Breakdown</h3>
                                    </div>
                                    <span className="material-icons text-silver-grey">expand_less</span>
                                </div>
                                <div className="p-6 space-y-6">
                                    <div className="flex items-center justify-between">
                                        <div className="flex -space-x-3">
                                            {/* Avatar Placeholders */}
                                            <div className="inline-block h-10 w-10 rounded-full ring-2 ring-charcoal bg-obsidian-border"></div>
                                            <div className="inline-block h-10 w-10 rounded-full ring-2 ring-charcoal bg-obsidian-border"></div>
                                            <div className="inline-block h-10 w-10 rounded-full ring-2 ring-charcoal bg-obsidian-border"></div>
                                            <div className="inline-block h-10 w-10 rounded-full ring-2 ring-charcoal bg-primary/20 flex items-center justify-center text-xs font-bold text-primary">+42</div>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-sm font-bold text-white">45 Total Recipients</p>
                                            <p className="text-xs text-silver-grey">All wallet addresses verified</p>
                                        </div>
                                    </div>
                                    <div className="space-y-4">
                                        <p className="text-sm font-semibold text-white">Amount Distribution</p>
                                        <div className="space-y-3">
                                            <div className="space-y-1">
                                                <div className="flex justify-between text-xs mb-1">
                                                    <span className="text-silver-grey">$0 - $2,000</span>
                                                    <span className="font-medium text-white">28 Recipients</span>
                                                </div>
                                                <div className="w-full bg-obsidian-black rounded-full h-2 overflow-hidden border border-obsidian-border">
                                                    <div className="bg-primary h-full rounded-full" style={{ width: '62%' }}></div>
                                                </div>
                                            </div>
                                            <div className="space-y-1">
                                                <div className="flex justify-between text-xs mb-1">
                                                    <span className="text-silver-grey">$2,001 - $5,000</span>
                                                    <span className="font-medium text-white">12 Recipients</span>
                                                </div>
                                                <div className="w-full bg-obsidian-black rounded-full h-2 overflow-hidden border border-obsidian-border">
                                                    <div className="bg-primary h-full rounded-full opacity-70" style={{ width: '26%' }}></div>
                                                </div>
                                            </div>
                                            <div className="space-y-1">
                                                <div className="flex justify-between text-xs mb-1">
                                                    <span className="text-silver-grey">$5,001+</span>
                                                    <span className="font-medium text-white">5 Recipients</span>
                                                </div>
                                                <div className="w-full bg-obsidian-black rounded-full h-2 overflow-hidden border border-obsidian-border">
                                                    <div className="bg-primary h-full rounded-full opacity-40" style={{ width: '12%' }}></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Execution Settings */}
                            <div className="bg-charcoal rounded-xl border border-obsidian-border overflow-hidden">
                                <div className="p-5 flex items-center justify-between border-b border-obsidian-border">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-lg bg-orange-900/20 flex items-center justify-center text-orange-500">
                                            <span className="material-icons">schedule</span>
                                        </div>
                                        <h3 className="font-semibold text-lg text-white">Execution Settings</h3>
                                    </div>
                                    <span className="material-icons text-silver-grey">expand_less</span>
                                </div>
                                <div className="p-6 grid grid-cols-2 gap-8">
                                    <div className="space-y-4">
                                        <label className="flex items-start gap-3 p-4 border border-primary bg-primary/10 rounded-xl cursor-pointer">
                                            <input defaultChecked className="mt-1 text-primary focus:ring-primary h-4 w-4 bg-obsidian-black border-obsidian-border" name="timing" type="radio" />
                                            <div>
                                                <p className="font-bold text-sm text-white">Execute Immediately</p>
                                                <p className="text-xs text-silver-grey">Process batch as soon as confirmed</p>
                                            </div>
                                        </label>
                                        <label className="flex items-start gap-3 p-4 border border-obsidian-border rounded-xl cursor-pointer hover:border-silver-grey transition-colors bg-obsidian-black/20">
                                            <input className="mt-1 text-primary focus:ring-primary h-4 w-4 bg-obsidian-black border-obsidian-border" name="timing" type="radio" />
                                            <div>
                                                <p className="font-bold text-sm text-white">Schedule for later</p>
                                                <p className="text-xs text-silver-grey">Pick a custom date and time</p>
                                            </div>
                                        </label>
                                    </div>
                                    <div className="space-y-4">
                                        <div className="flex items-center justify-between p-2">
                                            <div>
                                                <p className="text-sm font-semibold text-white">Notify Admin</p>
                                                <p className="text-xs text-silver-grey">Send email on completion</p>
                                            </div>
                                            <div className="relative inline-flex h-6 w-11 items-center rounded-full bg-primary">
                                                <span className="translate-x-6 inline-block h-4 w-4 transform rounded-full bg-white transition"></span>
                                            </div>
                                        </div>
                                        <div className="flex items-center justify-between p-2">
                                            <div>
                                                <p className="text-sm font-semibold text-white">Notify Recipients</p>
                                                <p className="text-xs text-silver-grey">Send blockchain transaction links</p>
                                            </div>
                                            <div className="relative inline-flex h-6 w-11 items-center rounded-full bg-obsidian-border">
                                                <span className="translate-x-1 inline-block h-4 w-4 transform rounded-full bg-silver-grey transition"></span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column (Sidebar) */}
                    <div className="w-full lg:w-2/5">
                        <div className="sticky top-24 space-y-6">
                            {/* Account Liquidity */}
                            <div className="bg-charcoal rounded-xl border border-obsidian-border p-6 shadow-xl">
                                <h4 className="text-sm font-semibold text-silver-grey uppercase tracking-wider mb-4">Account Liquidity</h4>
                                <div className="space-y-4">
                                    <div className="flex justify-between items-end">
                                        <div>
                                            <p className="text-xs text-silver-grey mb-1">Current Balance</p>
                                            <p className="text-2xl font-bold text-white">$125,450.23 <span className="text-sm font-medium text-silver-grey">USDC</span></p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-xs text-silver-grey mb-1">Post-Batch</p>
                                            <p className="text-lg font-bold text-silver-grey">$57,950.23</p>
                                        </div>
                                    </div>
                                    <div className="w-full bg-obsidian-black rounded-full h-3 flex overflow-hidden border border-obsidian-border">
                                        <div className="bg-primary h-full" style={{ width: '54%' }}></div>
                                        <div className="bg-primary/30 h-full border-l border-obsidian-black/50" style={{ width: '46%' }}></div>
                                    </div>
                                </div>
                            </div>

                            {/* Pre-flight Checklist */}
                            <div className="bg-charcoal rounded-xl border border-obsidian-border p-6 shadow-2xl space-y-6">
                                <div>
                                    <h4 className="text-sm font-bold mb-4 text-white">Pre-flight Checklist</h4>
                                    <div className="space-y-3">
                                        <div className="flex items-center gap-3 text-sm">
                                            <span className="material-icons text-emerald-400 text-lg">check_circle</span>
                                            <span className="flex-1 text-white">Sufficient liquidity in USDC wallet</span>
                                        </div>
                                        <div className="flex items-center gap-3 text-sm">
                                            <span className="material-icons text-emerald-400 text-lg">check_circle</span>
                                            <span className="flex-1 text-white">Corporate wallet connected</span>
                                        </div>
                                        <div className="flex items-center gap-3 text-sm">
                                            <span className="material-icons text-amber-500 text-lg">error_outline</span>
                                            <span className="flex-1 text-white">2nd Admin approval pending</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="p-4 bg-orange-950/20 border border-orange-800/50 rounded-lg">
                                    <div className="flex gap-3">
                                        <span className="material-icons text-orange-500">info</span>
                                        <p className="text-xs text-orange-200 leading-relaxed">
                                            <strong>Important Note:</strong> Transactions on the Ethereum network are irreversible. Please ensure all recipient addresses and amounts are correct before proceeding.
                                        </p>
                                    </div>
                                </div>
                                <div className="space-y-3">
                                    <label className="flex items-start gap-3 cursor-pointer group">
                                        <input className="mt-1 rounded border-obsidian-border bg-obsidian-black text-primary focus:ring-primary h-4 w-4" type="checkbox" />
                                        <span className="text-xs text-silver-grey leading-snug group-hover:text-white transition-colors">I confirm that all 45 recipients and their respective amounts have been reviewed.</span>
                                    </label>
                                    <label className="flex items-start gap-3 cursor-pointer group">
                                        <input className="mt-1 rounded border-obsidian-border bg-obsidian-black text-primary focus:ring-primary h-4 w-4" type="checkbox" />
                                        <span className="text-xs text-silver-grey leading-snug group-hover:text-white transition-colors">I understand that gas fees are non-refundable and subject to network volatility.</span>
                                    </label>
                                    <label className="flex items-start gap-3 cursor-pointer group">
                                        <input className="mt-1 rounded border-obsidian-border bg-obsidian-black text-primary focus:ring-primary h-4 w-4" type="checkbox" />
                                        <span className="text-xs text-silver-grey leading-snug group-hover:text-white transition-colors">I agree to Velo's Blockchain Payment Terms and Conditions.</span>
                                    </label>
                                </div>
                                <div className="space-y-4">
                                    <button
                                        onClick={() => setShowModal(true)}
                                        className="w-full bg-primary hover:bg-blue-700 text-white font-bold py-4 px-6 rounded-xl flex flex-col items-center justify-center transition-all shadow-lg shadow-primary/20"
                                    >
                                        <span className="text-lg">Execute Batch</span>
                                        <span className="text-xs font-normal opacity-80">$67,500.00 to 45 recipients</span>
                                    </button>
                                    <button className="w-full bg-obsidian-black text-white border border-obsidian-border font-bold py-3 rounded-xl hover:bg-charcoal transition-colors">
                                        Save as Draft
                                    </button>
                                </div>
                            </div>

                            <div className="text-center">
                                <p className="text-xs text-silver-grey flex items-center justify-center gap-1">
                                    <span className="material-icons text-xs">lock</span>
                                    Secure 256-bit encrypted session
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            {/* 2FA Modal */}
            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-300">
                    <div className="w-full max-w-[500px] bg-[#1A0C0C] border border-primary/20 rounded-xl shadow-2xl overflow-hidden animate-in zoom-in duration-300">
                        <div className="p-8">
                            {/* Warning Header */}
                            <div className="flex flex-col items-center text-center mb-8">
                                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                                    <span className="material-icons text-primary text-4xl">shield</span>
                                </div>
                                <h2 className="text-white text-xl font-bold mb-2">Security Verification Required</h2>
                                <p className="text-primary/70 text-sm">Action requires administrator authorization</p>
                            </div>

                            {/* Summary Statement */}
                            <div className="bg-primary/5 border border-primary/10 rounded-lg p-6 mb-8 text-center">
                                <p className="text-primary/80 text-sm mb-2 font-medium uppercase tracking-wider">Transaction Summary</p>
                                <div className="text-white">
                                    <span className="text-3xl font-bold">$67,500.00</span>
                                </div>
                                <p className="text-primary/60 text-sm mt-1">To be distributed to <span className="text-white font-semibold">45 recipients</span></p>
                            </div>

                            {/* 2FA Section */}
                            <div className="mb-8">
                                <label className="block text-primary/80 text-xs font-semibold uppercase tracking-widest mb-4 text-center">
                                    Enter Authenticator Code
                                </label>
                                <div className="flex justify-between gap-2 max-w-[320px] mx-auto">
                                    {otp.map((digit, index) => (
                                        <input
                                            key={index}
                                            id={`otp-${index}`}
                                            className="w-12 h-14 bg-primary/10 border border-primary/30 text-white text-center text-2xl font-bold rounded focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all"
                                            maxLength={1}
                                            type="text"
                                            value={digit}
                                            onChange={(e) => handleOtpChange(index, e.target.value)}
                                            placeholder="·"
                                        />
                                    ))}
                                </div>
                                <div className="text-center mt-4">
                                    <button className="text-xs text-primary/60 hover:text-primary transition-colors underline underline-offset-4">Resend code to registered device</button>
                                </div>
                            </div>

                            {/* Legal Checkbox */}
                            <div className="flex items-start gap-3 mb-8 bg-black/20 p-4 rounded-lg border border-primary/5">
                                <div className="flex items-center h-5">
                                    <input className="h-4 w-4 rounded border-primary/40 bg-transparent text-primary focus:ring-primary focus:ring-offset-0" id="confirm" type="checkbox" />
                                </div>
                                <label className="text-xs leading-relaxed text-primary/70" htmlFor="confirm">
                                    I confirm this payment and understand that once executed, <span className="text-white font-medium">this transaction cannot be reversed</span>. All funds will be settled within 24-48 hours.
                                </label>
                            </div>

                            {/* Action Buttons */}
                            <div className="grid grid-cols-2 gap-4">
                                <button
                                    onClick={() => setShowModal(false)}
                                    className="px-6 py-3.5 border border-primary/30 text-primary/80 font-semibold rounded-lg hover:bg-primary/5 transition-all text-sm uppercase tracking-wider"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleExecute}
                                    className="px-6 py-3.5 bg-primary text-white font-bold rounded-lg hover:bg-primary/90 transition-all text-sm shadow-lg shadow-primary/20 uppercase tracking-wider flex items-center justify-center gap-2"
                                >
                                    <span>Confirm & Execute</span>
                                    <span className="material-icons text-sm">bolt</span>
                                </button>
                            </div>
                        </div>

                        {/* Modal Footer Security Badge */}
                        <div className="bg-primary/5 px-8 py-3 flex justify-center items-center gap-4 border-t border-primary/10">
                            <div className="flex items-center gap-1.5 opacity-60">
                                <span className="material-icons text-[16px] text-primary">lock</span>
                                <span className="text-[10px] text-white font-medium uppercase tracking-widest">AES-256 Encrypted</span>
                            </div>
                            <div className="w-1 h-1 bg-primary/30 rounded-full"></div>
                            <div className="flex items-center gap-1.5 opacity-60">
                                <span className="material-icons text-[16px] text-primary">verified_user</span>
                                <span className="text-[10px] text-white font-medium uppercase tracking-widest">Verified Session</span>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PayrollConfirmation;
