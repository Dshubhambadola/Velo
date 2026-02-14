import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import { getQuote, executeBridge, BridgeQuote } from '../api/bridge';

const CrossNetworkBridge: React.FC = () => {
    // Component State
    const [sourceChain, setSourceChain] = useState('Ethereum');
    const [destChain, setDestChain] = useState('Arbitrum');
    const [token, setToken] = useState('USDC');
    const [amount, setAmount] = useState('');

    // Status State
    const [loading, setLoading] = useState(false);
    const [quote, setQuote] = useState<BridgeQuote | null>(null);
    const [step, setStep] = useState(1); // 1: Input, 2: Review, 3: Success

    const [error, setError] = useState<string | null>(null);

    const handleGetQuote = async () => {
        if (!amount) return;
        setLoading(true);
        setError(null);
        try {
            const data = await getQuote(sourceChain, destChain, token, amount);
            setQuote(data);
            setStep(2);
        } catch (error) {
            console.error("Failed to get quote", error);
            setError("Failed to generate quote. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const handleExecute = async () => {
        if (!quote) return;
        setLoading(true);
        try {
            await executeBridge(quote.id);
            setStep(3);
        } catch (error) {
            console.error("Failed to execute bridge", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex h-screen overflow-hidden bg-[#101622] font-display text-slate-100">
            <Sidebar />

            <main className="flex-1 flex flex-col h-screen overflow-y-auto relative">
                <div className="max-w-2xl mx-auto px-6 py-20 w-full">
                    {/* Header */}
                    <div className="text-center mb-10">
                        <h1 className="text-3xl font-bold text-white mb-2">Cross-Chain Bridge</h1>
                        <p className="text-slate-400">Transfer assets securely across supported networks.</p>
                    </div>

                    {/* Bridge Card */}
                    <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-8 relative overflow-hidden backdrop-blur-sm shadow-xl">
                        {/* Background Decoration */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-[100px] pointer-events-none"></div>

                        {step === 1 && (
                            <div className="space-y-6 relative z-10">
                                {error && (
                                    <div className="bg-red-500/10 border border-red-500/20 text-red-500 p-3 rounded-lg text-sm flex items-center gap-2">
                                        <span className="material-icons text-base">error_outline</span>
                                        {error}
                                    </div>
                                )}
                                {/* From Network */}
                                <div>
                                    <label className="block text-sm font-medium text-slate-300 mb-2">From Network</label>
                                    <select
                                        className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-primary outline-none appearance-none"
                                        value={sourceChain}
                                        onChange={(e) => setSourceChain(e.target.value)}
                                    >
                                        <option value="Ethereum">Ethereum Mainnet</option>
                                        <option value="Arbitrum">Arbitrum One</option>
                                        <option value="Optimism">Optimism</option>
                                        <option value="Base">Base</option>
                                    </select>
                                </div>

                                {/* To Network */}
                                <div>
                                    <label className="block text-sm font-medium text-slate-300 mb-2">To Network</label>
                                    <select
                                        className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-primary outline-none appearance-none"
                                        value={destChain}
                                        onChange={(e) => setDestChain(e.target.value)}
                                    >
                                        <option value="Arbitrum">Arbitrum One</option>
                                        <option value="Ethereum">Ethereum Mainnet</option>
                                        <option value="Optimism">Optimism</option>
                                        <option value="Base">Base</option>
                                    </select>
                                </div>

                                {/* Asset Selection */}
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-slate-300 mb-2">Asset</label>
                                        <select
                                            className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-primary outline-none"
                                            value={token}
                                            onChange={(e) => setToken(e.target.value)}
                                        >
                                            <option value="USDC">USDC (USD Coin)</option>
                                            <option value="ETH">ETH (Ether)</option>
                                            <option value="USDT">USDT (Tether)</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-slate-300 mb-2">Amount</label>
                                        <input
                                            type="number"
                                            placeholder="0.00"
                                            className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:ring-2 focus:ring-primary outline-none"
                                            value={amount}
                                            onChange={(e) => setAmount(e.target.value)}
                                        />
                                    </div>
                                </div>

                                <button
                                    onClick={handleGetQuote}
                                    disabled={loading || !amount}
                                    className="w-full bg-primary hover:bg-blue-600 text-white font-bold py-4 rounded-xl transition-all shadow-lg shadow-primary/25 disabled:opacity-50 disabled:cursor-not-allowed mt-4"
                                >
                                    {loading ? 'Calculating Quote...' : 'Review Transfer'}
                                </button>
                            </div>
                        )}

                        {step === 2 && quote && (
                            <div className="space-y-6 relative z-10 animate-fade-in">
                                <h3 className="text-xl font-bold text-white border-b border-slate-700 pb-4">Confirm Transfer</h3>

                                <div className="space-y-4">
                                    <div className="flex justify-between items-center py-2 border-b border-slate-700/50">
                                        <span className="text-slate-400">Source</span>
                                        <span className="text-white font-medium flex items-center gap-2">
                                            {quote.source_chain}
                                        </span>
                                    </div>
                                    <div className="flex justify-between items-center py-2 border-b border-slate-700/50">
                                        <span className="text-slate-400">Destination</span>
                                        <span className="text-white font-medium flex items-center gap-2">
                                            {quote.dest_chain}
                                        </span>
                                    </div>
                                    <div className="flex justify-between items-center py-2 border-b border-slate-700/50">
                                        <span className="text-slate-400">Amount</span>
                                        <span className="text-white font-medium">{quote.amount} {quote.token}</span>
                                    </div>
                                    <div className="flex justify-between items-center py-2 border-b border-slate-700/50">
                                        <span className="text-slate-400">Network Fee</span>
                                        <span className="text-white font-medium">~${quote.fee.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between items-center py-2 border-b border-slate-700/50">
                                        <span className="text-slate-400">Est. Time</span>
                                        <span className="text-emerald-400 font-medium flex items-center gap-1">
                                            <span className="material-icons text-sm">bolt</span>
                                            {quote.estimated_time}
                                        </span>
                                    </div>
                                </div>

                                <div className="pt-4 flex gap-4">
                                    <button
                                        onClick={() => setStep(1)}
                                        className="flex-1 bg-slate-800 hover:bg-slate-700 text-white font-bold py-3 rounded-xl transition-all border border-slate-600"
                                    >
                                        Back
                                    </button>
                                    <button
                                        onClick={handleExecute}
                                        disabled={loading}
                                        className="flex-1 bg-primary hover:bg-blue-600 text-white font-bold py-3 rounded-xl transition-all shadow-lg shadow-primary/25 disabled:opacity-50"
                                    >
                                        {loading ? 'Processing...' : 'Confirm & Send'}
                                    </button>
                                </div>
                            </div>
                        )}

                        {step === 3 && (
                            <div className="text-center py-10 animate-fade-in relative z-10">
                                <div className="w-20 h-20 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <span className="material-icons text-5xl text-emerald-400">check_circle</span>
                                </div>
                                <h3 className="text-2xl font-bold text-white mb-2">Transfer Initiated!</h3>
                                <p className="text-slate-400 mb-8 max-w-sm mx-auto">
                                    Your {amount} {token} bridge transaction has been submitted.
                                    You can track the status in your activity feed.
                                </p>
                                <button
                                    onClick={() => { setStep(1); setAmount(''); }}
                                    className="bg-slate-800 hover:bg-slate-700 text-white font-bold py-3 px-8 rounded-xl transition-all border border-slate-600"
                                >
                                    Make Another Transfer
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
};

export default CrossNetworkBridge;
