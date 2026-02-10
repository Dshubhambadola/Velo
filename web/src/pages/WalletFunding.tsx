import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const WalletFunding: React.FC = () => {
    const navigate = useNavigate();
    const [selectedNetwork, setSelectedNetwork] = useState('Polygon');

    return (
        <div className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 font-display min-h-screen">
            {/* Floating Balance Widget */}
            <div className="fixed top-8 right-8 z-50">
                <div className="bg-white dark:bg-neutral-surface border border-slate-200 dark:border-neutral-border p-4 rounded-xl shadow-2xl backdrop-blur-md bg-opacity-90 dark:bg-opacity-90 min-w-[200px]">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="w-8 h-8 rounded-full bg-[#1e3fae]/10 flex items-center justify-center">
                            <span className="material-icons text-[#1e3fae] text-sm">account_balance_wallet</span>
                        </div>
                        <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">Total Balance</span>
                    </div>
                    <div className="space-y-0.5">
                        <div className="text-2xl font-bold tracking-tight">42,850.00 <span className="text-sm font-medium text-slate-400">USDC</span></div>
                        <div className="text-sm text-slate-500 dark:text-slate-400">≈ $42,850.00 USD</div>
                    </div>
                    <div className="mt-4 pt-4 border-t border-slate-100 dark:border-neutral-border flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                        <span className="text-[10px] uppercase font-bold text-slate-400">Live Network Status</span>
                    </div>
                </div>
            </div>

            {/* Main Content Container */}
            <main className="max-w-3xl mx-auto py-16 px-6">
                {/* Header Section */}
                <header className="mb-10 text-center">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1e3fae]/10 text-[#1e3fae] text-xs font-bold mb-4 uppercase tracking-widest">
                        Step 1: Liquidity Injection
                    </div>
                    <h1 className="text-4xl font-bold mb-3 tracking-tight">Fund Your Velo Wallet</h1>
                    <p className="text-slate-500 dark:text-slate-400 text-lg">Top up your payroll account with USDC to start paying your global team instantly.</p>
                </header>

                {/* Focused Deposit Section */}
                <section className="bg-white dark:bg-neutral-surface border border-slate-200 dark:border-neutral-border rounded-xl shadow-sm overflow-hidden mb-8">
                    <div className="p-8">
                        <div className="flex items-center justify-between mb-8">
                            <h2 className="text-xl font-bold flex items-center gap-2">
                                <span className="material-icons text-[#1e3fae]">lan</span>
                                Select Deposit Network
                            </h2>
                            <span className="text-xs text-slate-400 flex items-center gap-1">
                                <span className="material-icons text-[14px]">info</span>
                                USDC only
                            </span>
                        </div>

                        {/* Network Grid */}
                        <div className="grid grid-cols-3 gap-4 mb-10">
                            {/* Ethereum Card */}
                            <button
                                onClick={() => setSelectedNetwork('Ethereum')}
                                className={`group relative flex flex-col items-center p-6 rounded-xl border-2 transition-all duration-200 ${selectedNetwork === 'Ethereum' ? 'border-[#1e3fae] bg-[#1e3fae]/5 dark:bg-[#1e3fae]/10' : 'border-slate-100 dark:border-neutral-border bg-slate-50/50 dark:bg-slate-800/30 hover:border-[#1e3fae]'}`}
                            >
                                <div className="w-12 h-12 mb-4 rounded-full bg-white dark:bg-slate-900 flex items-center justify-center shadow-sm">
                                    <img alt="Ethereum" className="w-7 h-7" src="https://lh3.googleusercontent.com/aida-public/AB6AXuB5LMphdTcCY911wC59RAWrld7Bk5eyvfqA4e13QFcgQTwtRfFZrMaOR-P7Nw_jrwVacq2UgtIwNMBArjNg1wkdjHDWBlXNI60h9bcw7z9RRoAoiuONpZnEVVsj68faclyjA1rgTdI4ujHLvZ3hfjWCdCll-n7VQXj7b_b2WWlyHQLQAPbW-KJSTXcxZPJj6CAMXNqqN2yq6D0OPqS77cVA9Ae7V_HPScyaXzQUtTqcHBzOhqIkvC66lNEEpOZAg7IiqrzEbHC2YeQY" />
                                </div>
                                <span className="font-bold text-sm">Ethereum</span>
                                <span className="text-[10px] mt-1 text-slate-400 uppercase font-bold">Mainnet</span>
                            </button>

                            {/* Polygon Card (Selected) */}
                            <button
                                onClick={() => setSelectedNetwork('Polygon')}
                                className={`group relative flex flex-col items-center p-6 rounded-xl border-2 transition-all duration-200 ${selectedNetwork === 'Polygon' ? 'border-[#1e3fae] bg-[#1e3fae]/5 dark:bg-[#1e3fae]/10' : 'border-slate-100 dark:border-neutral-border bg-slate-50/50 dark:bg-slate-800/30 hover:border-[#1e3fae]'}`}
                            >
                                {selectedNetwork === 'Polygon' && (
                                    <div className="absolute -top-2 -right-2 bg-[#1e3fae] text-white p-1 rounded-full flex items-center justify-center">
                                        <span className="material-icons text-[14px]">check</span>
                                    </div>
                                )}
                                <div className="w-12 h-12 mb-4 rounded-full bg-white dark:bg-slate-900 flex items-center justify-center shadow-sm">
                                    <img alt="Polygon" className="w-7 h-7" src="https://lh3.googleusercontent.com/aida-public/AB6AXuACNOqYeln-p9_ic6a_BOR6cGXGsAxVXMP-uL8mWBFx0s24aBMRrwQv3DIXDpcbY83cBCkEXZZe38QXjaC3hD9rBN0vSgMRwEW8X4f74KAsyV9ppe2qnV0q98VpFM3glIIKUwWklKAaD9fSalgLntvbHZtbCuKrEq16jes8YFpuPmcI0YwDN_TsZKN98O3o5sNZbAuIBqK95KYWPXymMa15H5-UqLPtjJu3QRMbPQ4ShnS7j_DrRQFqZfi7_6VESngJ1s9Ay9E_jOcA" />
                                </div>
                                <span className="font-bold text-sm">Polygon</span>
                                <span className="text-[10px] mt-1 text-[#1e3fae] uppercase font-bold">Recommended</span>
                            </button>

                            {/* Base Card */}
                            <button
                                onClick={() => setSelectedNetwork('Base')}
                                className={`group relative flex flex-col items-center p-6 rounded-xl border-2 transition-all duration-200 ${selectedNetwork === 'Base' ? 'border-[#1e3fae] bg-[#1e3fae]/5 dark:bg-[#1e3fae]/10' : 'border-slate-100 dark:border-neutral-border bg-slate-50/50 dark:bg-slate-800/30 hover:border-[#1e3fae]'}`}
                            >
                                <div className="w-12 h-12 mb-4 rounded-full bg-white dark:bg-slate-900 flex items-center justify-center shadow-sm">
                                    <img alt="Base" className="w-7 h-7" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAwEcvTfI5qYM2gJX-SsDGCGZo2YZqXnTfifjtKN0KakQpatiSqG3oskBj7aL9ABasWXnNmC4xv4hMtU8-cReSJaq2JK6CAUX8RUZIQrAyhjHxg9aG1Xt34mHNKcfUE-GUe8nh4oE7KjwkXJw62sCZ6-nw7qszXay1gP2TwFullPyyfYDUEyr5_6bZALYOIfB87rUB6-7c3EtzCx-DBzMDnbg6wC7DnNXEsge5fB216Q8nF5VfwfJfgm88q1hJWMDn3n-_mje9ugIID" />
                                </div>
                                <span className="font-bold text-sm">Base</span>
                                <span className="text-[10px] mt-1 text-slate-400 uppercase font-bold">L2 Scaled</span>
                            </button>
                        </div>

                        {/* Deposit Details Area */}
                        <div className="bg-slate-50 dark:bg-slate-900/50 rounded-xl p-8 border border-slate-200 dark:border-neutral-border flex flex-col md:flex-row items-center gap-8">
                            <div className="shrink-0">
                                <div className="bg-white p-3 rounded-lg shadow-inner">
                                    <img alt="QR Code" className="w-32 h-32" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBSX0Ly98V7trjZjlM3DNJPDphgMHiEA1GqhxAZOGLSVyKDbj6_Z7ZQ64X2QEpLgWo9pS2KYh4gwIRnOx6MqXeW2uS2f6SqF_wI0Sdoy8uFXkU8_ol3KV3_MVWMshz08cFda6xlFV20WQWoo9tym5qEElUFyigP2DnXmr-Z8dPHwJdVHwxttCrJfMZRTL_P-WkFtFUHpBUENI0ClsI43vay20ztvy3bhAFnYs85V_jApQXfVY_tYNvriX6x8nq_6pI4CPcv6p2mbSrW" />
                                </div>
                            </div>
                            <div className="flex-1 w-full">
                                <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-2">{selectedNetwork} USDC Deposit Address</label>
                                <div className="flex items-center gap-2">
                                    <div className="flex-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-neutral-border px-4 py-3 rounded-lg font-mono text-sm break-all">
                                        0x742d35Cc6634C0532925a3b844Bc454e4438f44e
                                    </div>
                                    <button className="bg-[#1e3fae] hover:bg-blue-700 text-white p-3 rounded-lg transition-colors flex items-center justify-center">
                                        <span className="material-icons">content_copy</span>
                                    </button>
                                </div>
                                <div className="mt-4 flex items-start gap-2 text-xs text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/20 p-3 rounded-lg">
                                    <span className="material-icons text-sm mt-0.5">warning</span>
                                    <p>Send only <span className="font-bold">USDC</span> via the <span className="font-bold">{selectedNetwork}</span> network. Assets sent via other networks or other tokens will be permanently lost.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Secondary Methods */}
                <section className="mb-12">
                    <h3 className="text-sm font-bold text-slate-400 uppercase tracking-[0.2em] mb-4 text-center">Other Funding Methods</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <button className="flex items-center gap-4 p-5 rounded-xl border border-slate-200 dark:border-neutral-border bg-white dark:bg-neutral-surface hover:shadow-md transition-all group">
                            <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-400 group-hover:bg-[#1e3fae]/10 group-hover:text-[#1e3fae] transition-colors">
                                <span className="material-icons">account_balance</span>
                            </div>
                            <div className="text-left">
                                <div className="font-bold text-sm">Bank Transfer</div>
                                <div className="text-xs text-slate-400 uppercase tracking-tight">ACH / Wire Transfer (1-3 days)</div>
                            </div>
                        </button>
                        <button className="flex items-center gap-4 p-5 rounded-xl border border-slate-200 dark:border-neutral-border bg-white dark:bg-neutral-surface hover:shadow-md transition-all group">
                            <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-400 group-hover:bg-[#1e3fae]/10 group-hover:text-[#1e3fae] transition-colors">
                                <span className="material-icons">credit_card</span>
                            </div>
                            <div className="text-left">
                                <div className="font-bold text-sm">Debit / Credit Card</div>
                                <div className="text-xs text-slate-400 uppercase tracking-tight">Instant (Fees Apply)</div>
                            </div>
                        </button>
                    </div>
                </section>

                {/* Recent Activity */}
                <section>
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-bold">Recent Activity</h3>
                        <button className="text-[#1e3fae] text-xs font-bold hover:underline">View All Transactions</button>
                    </div>
                    <div className="bg-white dark:bg-neutral-surface border border-slate-200 dark:border-neutral-border rounded-xl overflow-hidden shadow-sm">
                        <div className="divide-y divide-slate-100 dark:divide-neutral-border">
                            {/* Pending Item */}
                            <div className="p-4 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-lg bg-amber-100 dark:bg-amber-900/20 flex items-center justify-center text-amber-600">
                                        <span className="material-icons animate-spin text-lg">sync</span>
                                    </div>
                                    <div>
                                        <div className="font-bold text-sm">Deposit USDC (Polygon)</div>
                                        <div className="text-xs text-slate-500 dark:text-slate-400">Today, 10:45 AM • 12/24 Confirmations</div>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <div className="font-bold text-sm text-amber-500">+12,500.00 USDC</div>
                                    <div className="text-[10px] text-slate-400 font-mono tracking-tighter">0x4b...a2f9</div>
                                </div>
                            </div>
                            {/* Completed Item */}
                            <div className="p-4 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors cursor-pointer" onClick={() => navigate('/payroll/first-setup')}>
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-lg bg-emerald-100 dark:bg-emerald-900/20 flex items-center justify-center text-emerald-600">
                                        <span className="material-icons text-lg">check_circle</span>
                                    </div>
                                    <div>
                                        <div className="font-bold text-sm">Deposit USDC (Ethereum)</div>
                                        <div className="text-xs text-slate-500 dark:text-slate-400">Oct 24, 2023 • Successful</div>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <div className="font-bold text-sm">+5,000.00 USDC</div>
                                    <div className="text-[10px] text-slate-400 font-mono tracking-tighter">0xe1...3c1b</div>
                                </div>
                            </div>
                            {/* Completed Item */}
                            <div className="p-4 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-lg bg-emerald-100 dark:bg-emerald-900/20 flex items-center justify-center text-emerald-600">
                                        <span className="material-icons text-lg">check_circle</span>
                                    </div>
                                    <div>
                                        <div className="font-bold text-sm">Deposit USDC (Base)</div>
                                        <div className="text-xs text-slate-500 dark:text-slate-400">Oct 21, 2023 • Successful</div>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <div className="font-bold text-sm">+25,350.00 USDC</div>
                                    <div className="text-[10px] text-slate-400 font-mono tracking-tighter">0x8a...92de</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Footer Help */}
                <footer className="mt-12 text-center">
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                        Need help with funding? <a className="text-[#1e3fae] font-semibold hover:underline" href="#">Contact Velo Treasury Support</a>
                    </p>
                </footer>
            </main>
        </div>
    );
};

export default WalletFunding;
