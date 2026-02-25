import React, { useState, useEffect } from 'react';
import { CreditCardIcon, PlusIcon, LockClosedIcon, LockOpenIcon, Cog6ToothIcon } from '@heroicons/react/24/outline'; // v2 outline icons
import Sidebar from '../components/Sidebar';
import { getCards, createCard, updateCardStatus, Card } from '../api/cards';

const CorporateCards: React.FC = () => {
    const [cards, setCards] = useState<Card[]>([]);
    const [loading, setLoading] = useState(true);
    const [isIssuing, setIsIssuing] = useState(false);

    // Activation state
    const [activationCardId, setActivationCardId] = useState<string | null>(null);
    const [activationCvV, setActivationCvV] = useState('');

    // Form state
    const [cardType, setCardType] = useState('virtual');
    const [dailyLimit, setDailyLimit] = useState<number | ''>('');
    const [monthlyLimit, setMonthlyLimit] = useState<number | ''>('');

    useEffect(() => {
        loadCards();
    }, []);

    const loadCards = async () => {
        try {
            setLoading(true);
            const data = await getCards();
            setCards(data || []);
        } catch (error) {
            console.error("Failed to fetch cards:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleIssueCard = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            // Using a dummy UUID for the user just for UI since useAuth is not available
            const dummyUserId = "123e4567-e89b-12d3-a456-426614174000"
            const newCard = await createCard(
                cardType,
                dailyLimit === '' ? 0 : dailyLimit,
                monthlyLimit === '' ? 0 : monthlyLimit,
                dummyUserId
            );
            setCards([...cards, newCard]);
            setIsIssuing(false);
            // Reset form
            setDailyLimit('');
            setMonthlyLimit('');
            setCardType('virtual');
        } catch (error) {
            console.error("Failed to issue card:", error);
            alert("Error issuing card. Check console.");
        }
    };

    const handleToggleFreeze = async (cardId: string, currentStatus: string) => {
        const newStatus = currentStatus === 'active' ? 'frozen' : 'active';
        try {
            await updateCardStatus(cardId, newStatus);
            setCards(cards.map(c => c.ID === cardId ? { ...c, Status: newStatus } : c));
        } catch (error) {
            console.error("Failed to update status:", error);
        }
    };

    const handleActivate = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!activationCardId) return;

        try {
            const { activateCard } = await import('../api/cards');
            await activateCard(activationCardId, activationCvV);
            setCards(cards.map(c => c.ID === activationCardId ? { ...c, Status: 'active', ShippingStatus: 'delivered' } : c));
            setActivationCardId(null);
            setActivationCvV('');
            alert("Card successfully activated!");
        } catch (error: any) {
            console.error(error);
            alert(error.response?.data?.error || "Invalid CVV");
        }
    };

    const handlePushProvision = (cardType: string) => {
        alert(`Mocking ${cardType === 'physical' ? 'Apple Pay' : 'Google Pay'} push provisioning payload generation...`);
    };

    return (
        <div className="flex min-h-screen bg-zinc-950 text-slate-200 font-display selection:bg-red-500/30">
            <Sidebar />
            <main className="flex-1 flex flex-col h-screen overflow-y-auto relative p-8">
                <div className="max-w-7xl mx-auto space-y-8 w-full">
                    {/* Header */}
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
                        <div>
                            <h1 className="text-3xl font-bold text-white tracking-tight">Corporate Cards</h1>
                            <p className="text-zinc-400 mt-1">Manage employee spending limits and issue new virtual or physical cards.</p>
                        </div>
                        <button
                            onClick={() => setIsIssuing(true)}
                            className="flex items-center space-x-2 bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white px-5 py-2.5 rounded-xl font-medium transition-all shadow-lg shadow-red-500/20"
                        >
                            <PlusIcon className="w-5 h-5" />
                            <span>Issue New Card</span>
                        </button>
                    </div>

                    {/* Issue Modal/Panel */}
                    {isIssuing && (
                        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 relative shadow-2xl">
                            <button
                                onClick={() => setIsIssuing(false)}
                                className="absolute top-4 right-4 text-zinc-500 hover:text-white"
                            >
                                ✕
                            </button>
                            <h2 className="text-xl font-semibold text-white mb-6">Issue New Card</h2>
                            <form onSubmit={handleIssueCard} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-zinc-400 mb-2">Card Type</label>
                                        <select
                                            value={cardType}
                                            onChange={(e) => setCardType(e.target.value)}
                                            className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-red-500 transition-all"
                                        >
                                            <option value="virtual">Virtual</option>
                                            <option value="physical">Physical</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-zinc-400 mb-2">Daily Limit ($)</label>
                                        <input
                                            type="number"
                                            placeholder="No limit"
                                            value={dailyLimit}
                                            onChange={(e) => setDailyLimit(e.target.value ? Number(e.target.value) : '')}
                                            className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-red-500 transition-all placeholder-zinc-600"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-zinc-400 mb-2">Monthly Limit ($)</label>
                                        <input
                                            type="number"
                                            placeholder="No limit"
                                            value={monthlyLimit}
                                            onChange={(e) => setMonthlyLimit(e.target.value ? Number(e.target.value) : '')}
                                            className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-red-500 transition-all placeholder-zinc-600"
                                        />
                                    </div>
                                </div>

                                <div className="flex justify-end space-x-4 pt-4 border-t border-zinc-800/50">
                                    <button
                                        type="button"
                                        onClick={() => setIsIssuing(false)}
                                        className="px-6 py-2.5 text-zinc-400 font-medium hover:text-white transition-colors"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="bg-white text-black px-6 py-2.5 rounded-xl font-medium hover:bg-zinc-200 transition-colors"
                                    >
                                        Issue {cardType === 'virtual' ? 'Virtual Card' : 'Physical Card'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    )}

                    {/* Activation Modal */}
                    {activationCardId && (
                        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center">
                            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 relative shadow-2xl max-w-sm w-full">
                                <button
                                    onClick={() => setActivationCardId(null)}
                                    className="absolute top-4 right-4 text-zinc-500 hover:text-white"
                                >
                                    ✕
                                </button>
                                <h2 className="text-xl font-semibold text-white mb-2">Activate Physical Card</h2>
                                <p className="text-zinc-400 text-sm mb-6">Enter the 3-digit CVV found on the back of your physical card to unlock it.</p>
                                <form onSubmit={handleActivate} className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-zinc-400 mb-2">CVV</label>
                                        <input
                                            type="text"
                                            maxLength={3}
                                            required
                                            value={activationCvV}
                                            onChange={(e) => setActivationCvV(e.target.value)}
                                            className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-red-500 transition-all font-mono"
                                            placeholder="123"
                                        />
                                    </div>
                                    <button
                                        type="submit"
                                        className="w-full bg-white text-black px-6 py-3 rounded-xl font-medium hover:bg-zinc-200 transition-colors mt-4"
                                    >
                                        Activate Card
                                    </button>
                                </form>
                            </div>
                        </div>
                    )}

                    {/* Cards Grid */}
                    {loading ? (
                        <div className="text-zinc-500 py-10">Loading your cards...</div>
                    ) : cards.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {cards.map((card) => (
                                <div key={card.ID} className={`relative overflow-hidden rounded-2xl p-6 border transition-all ${card.Status === 'frozen' ? 'bg-zinc-900/50 border-zinc-800 opacity-75' : 'bg-gradient-to-br from-zinc-900 to-zinc-950 border-zinc-800 shadow-xl'}`}>

                                    {/* Card Graphic */}
                                    <div className="absolute top-0 right-0 p-6 opacity-10 pointer-events-none">
                                        <svg viewBox="0 0 24 24" fill="currentColor" className="w-48 h-48 text-white">
                                            <path d="M4.5 3.75a3 3 0 00-3 3v.75h21v-.75a3 3 0 00-3-3h-15z" />
                                            <path d="M15 12a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
                                            <path d="M1.5 10.5V17.25a3 3 0 003 3h15a3 3 0 003-3V10.5h-21zM9 15.75a.75.75 0 01.75-.75h2.5a.75.75 0 010 1.5h-2.5a.75.75 0 01-.75-.75z" />
                                        </svg>
                                    </div>

                                    <div className="flex justify-between items-start mb-12 relative z-10">
                                        <div>
                                            <div className="flex items-center space-x-2">
                                                <CreditCardIcon className="w-6 h-6 text-zinc-400" />
                                                <span className="text-sm font-medium text-zinc-300 capitalize">{card.Type}</span>
                                            </div>
                                            <h3 className="text-2xl font-mono text-white mt-4 tracking-widest">
                                                **** {card.Last4}
                                            </h3>
                                        </div>
                                        <span className={`px-2.5 py-1 rounded-full text-xs font-medium border ${card.Status === 'active' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' :
                                            card.Status === 'frozen' ? 'bg-amber-500/10 text-amber-400 border-amber-500/20' :
                                                'bg-red-500/10 text-red-400 border-red-500/20'
                                            }`}>
                                            {card.Status}
                                        </span>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4 mb-8 relative z-10">
                                        <div>
                                            <p className="text-xs text-zinc-500 mb-1">Expiry</p>
                                            <p className="text-sm text-zinc-300 font-medium">
                                                {String(card.ExpiryMonth).padStart(2, '0')}/{String(card.ExpiryYear).slice(-2)}
                                            </p>
                                        </div>
                                        <div>
                                            <p className="text-xs text-zinc-500 mb-1">Limits (Day / Mth)</p>
                                            <p className="text-sm text-zinc-300 font-medium">
                                                {card.DailyLimit > 0 ? `$${card.DailyLimit}` : '∞'} / {card.MonthlyLimit > 0 ? `$${card.MonthlyLimit}` : '∞'}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-center space-x-3 pt-4 border-t border-zinc-800 relative z-10">
                                        <button
                                            onClick={() => handleToggleFreeze(card.ID, card.Status)}
                                            className={`flex-1 flex items-center justify-center space-x-2 py-2 rounded-lg font-medium text-sm transition-colors ${card.Status === 'active' ? 'bg-zinc-800 hover:bg-zinc-700 text-white' : 'bg-red-500/10 hover:bg-red-500/20 text-red-500'
                                                }`}
                                        >
                                            {card.Status === 'active' ? (
                                                <>
                                                    <LockClosedIcon className="w-4 h-4" />
                                                    <span>Freeze Card</span>
                                                </>
                                            ) : (
                                                <>
                                                    <LockOpenIcon className="w-4 h-4" />
                                                    <span>Unfreeze Card</span>
                                                </>
                                            )}
                                        </button>
                                        <button className="p-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-white rounded-lg transition-colors">
                                            <Cog6ToothIcon className="w-5 h-5" />
                                        </button>
                                    </div>

                                    {/* Logistics & Provisioning area */}
                                    {card.Type === 'physical' && card.Status === 'inactive' && (
                                        <div className="mt-4 pt-4 border-t border-zinc-800">
                                            <div className="flex items-center justify-between mb-2">
                                                <span className="text-xs text-zinc-400 font-medium uppercase tracking-wider">Shipping Status</span>
                                                <span className="text-xs text-orange-400 font-medium bg-orange-500/10 px-2 py-0.5 rounded border border-orange-500/20">{card.ShippingStatus || 'shipped'}</span>
                                            </div>
                                            <div className="flex items-center justify-between mb-4">
                                                <span className="text-xs text-zinc-400">Tracking</span>
                                                <span className="text-xs text-zinc-300 font-mono bg-black px-2 py-1 rounded">{card.TrackingNumber || '1Z999999'}</span>
                                            </div>
                                            <button
                                                onClick={() => setActivationCardId(card.ID)}
                                                className="w-full py-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-sm font-medium rounded-lg transition-all"
                                            >
                                                Activate Required
                                            </button>
                                        </div>
                                    )}

                                    {card.Status === 'active' && (
                                        <div className="mt-4 pt-4 border-t border-zinc-800">
                                            <button
                                                onClick={() => handlePushProvision(card.Type)}
                                                className="w-full py-2 bg-black border border-zinc-700 hover:border-zinc-500 text-white text-sm font-medium rounded-lg transition-all flex items-center justify-center gap-2"
                                            >
                                                <span className="material-icons text-sm">contactless</span>
                                                Add to Apple Wallet
                                            </button>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-12 text-center">
                            <CreditCardIcon className="mx-auto h-12 w-12 text-zinc-600 mb-4" />
                            <h3 className="text-lg font-medium text-white mb-2">No corporate cards</h3>
                            <p className="text-zinc-400 mb-6">Issue virtual and physical cards to your team to manage expenses.</p>
                            <button
                                onClick={() => setIsIssuing(true)}
                                className="inline-flex items-center space-x-2 bg-white text-black px-6 py-2.5 rounded-xl font-medium hover:bg-zinc-200 transition-all"
                            >
                                <PlusIcon className="w-5 h-5" />
                                <span>Issue First Card</span>
                            </button>
                        </div>
                    )}
                </div>
            </main>
        </div >
    );
};

export default CorporateCards;
