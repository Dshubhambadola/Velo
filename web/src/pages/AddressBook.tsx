import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import { getContacts, addContact } from '../api/wallet';

const AddressBook: React.FC = () => {
    const [contacts, setContacts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    // const [error, setError] = useState<string | null>(null);
    const [showAddModal, setShowAddModal] = useState(false);

    // New Contact State
    const [newContact, setNewContact] = useState({
        name: '',
        address: '',
        network: 'ETH',
        tags: [] as string[],
    });
    const [adding, setAdding] = useState(false);

    useEffect(() => {
        loadContacts();
    }, []);

    const loadContacts = async () => {
        try {
            setLoading(true);
            const data = await getContacts();
            setContacts(data);
            // setError(null);
        } catch (err) {
            console.error(err);
            // setError('Failed to load contacts');
        } finally {
            setLoading(false);
        }
    };

    const handleAddContact = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            setAdding(true);
            const added = await addContact(newContact);
            setContacts([...contacts, added]);
            setShowAddModal(false);
            setNewContact({ name: '', address: '', network: 'ETH', tags: [] }); // Reset
        } catch (err) {
            console.error(err);
            alert('Failed to add contact');
        } finally {
            setAdding(false);
        }
    };

    return (
        <div className="flex min-h-screen bg-black text-slate-200 font-display">
            <Sidebar />
            <div className="flex-1 flex overflow-hidden relative">
                {/* Internal Sidebar */}
                <aside className="w-72 bg-[#121212] border-r border-white/5 flex flex-col hidden lg:flex">
                    <div className="p-6 border-b border-white/5 flex items-center gap-3">
                        <div className="w-8 h-8 bg-[#0657f9] rounded flex items-center justify-center">
                            <span className="material-icons text-white text-lg">shield</span>
                        </div>
                        <h1 className="text-xl font-bold tracking-tight text-white">VELO <span className="text-[#0657f9]">VAULT</span></h1>
                    </div>
                    <div className="flex-1 overflow-y-auto p-4 space-y-6">
                        {/* Navigation */}
                        <nav className="space-y-1">
                            <p className="px-3 text-[10px] uppercase tracking-widest text-slate-500 font-bold mb-2">Main Menu</p>
                            <a className="flex items-center gap-3 px-3 py-2 text-white bg-[#0657f9]/10 border-l-2 border-[#0657f9] rounded-r" href="#">
                                <span className="material-icons text-[#0657f9]">contacts</span>
                                <span className="text-sm font-medium">All Contacts</span>
                            </a>
                        </nav>
                        {/* Alerts */}
                        <div className="bg-yellow-400/5 border border-yellow-400/20 p-4 rounded-xl relative">
                            <div className="flex items-center justify-between mb-2">
                                <span className="flex h-2 w-2 rounded-full bg-yellow-400 shadow-[0_0_10px_rgba(250,204,21,0.4)]"></span>
                                <span className="bg-yellow-400 text-black text-[10px] font-bold px-1.5 py-0.5 rounded uppercase">Alert</span>
                            </div>
                            <p className="text-xs text-yellow-100 font-medium">3 Duplicate entries found in Ethereum mainnet.</p>
                            <button className="mt-3 w-full py-1.5 bg-yellow-400 hover:bg-yellow-500 text-black text-xs font-bold rounded transition-colors">
                                Merge Duplicates
                            </button>
                        </div>
                    </div>
                </aside>

                {/* Main Content */}
                <main className="flex-1 flex flex-col bg-black relative overflow-hidden">
                    {/* Top Bar */}
                    <header className="h-20 border-b border-white/5 flex items-center justify-between px-8 bg-black/80 backdrop-blur-md z-10">
                        <div className="flex items-center flex-1 max-w-xl">
                            <div className="relative w-full group">
                                <span className="material-icons absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-[#0657f9] transition-colors">search</span>
                                <input className="w-full bg-[#121212] border border-white/10 rounded-xl py-2.5 pl-12 pr-4 text-sm font-medium focus:ring-1 focus:ring-[#0657f9] focus:border-[#0657f9] transition-all text-slate-200 placeholder:text-slate-600 font-mono" placeholder="Search contacts by name, ENS, or wallet address..." type="text" />
                            </div>
                        </div>
                        <div className="flex items-center gap-4 ml-6">
                            <button className="flex items-center gap-2 px-4 py-2.5 border border-white/10 hover:border-[#0657f9]/50 text-slate-300 hover:text-white text-sm font-medium rounded-xl transition-all">
                                <span className="material-icons text-sm">ios_share</span>
                                Export
                            </button>
                            <button
                                onClick={() => setShowAddModal(true)}
                                className="flex items-center gap-2 px-6 py-2.5 bg-[#0657f9] hover:bg-[#0657f9]/90 text-white text-sm font-bold rounded-xl shadow-lg shadow-[#0657f9]/20 transition-all"
                            >
                                <span className="material-icons text-sm text-white">person_add</span>
                                Add New Contact
                            </button>
                        </div>
                    </header>

                    {/* Scrollable Area */}
                    <div className="flex-1 overflow-y-auto p-8">
                        <div className="flex items-center justify-between mb-8">
                            <div>
                                <h2 className="text-2xl font-bold text-white">All Contacts</h2>
                                <p className="text-slate-500 text-sm mt-1">Managing {contacts.length} secure addresses.</p>
                            </div>
                        </div>

                        {loading ? (
                            <div className="flex items-center justify-center h-64">
                                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#0657f9]"></div>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                {/* Add New Card Placeholder */}
                                <button
                                    onClick={() => setShowAddModal(true)}
                                    className="group relative bg-transparent border border-dashed border-white/10 rounded-xl p-6 flex flex-col items-center justify-center gap-3 transition-all hover:border-[#0657f9]/50 hover:bg-[#0657f9]/5 min-h-[200px]"
                                >
                                    <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-[#0657f9]/20 transition-colors">
                                        <span className="material-icons text-slate-500 group-hover:text-[#0657f9]">add</span>
                                    </div>
                                    <span className="text-sm font-bold text-slate-500 group-hover:text-[#0657f9]">Add New Contact</span>
                                </button>

                                {contacts.map((contact) => (
                                    <div key={contact.id} className="group relative bg-[#181818] border border-white/5 rounded-xl p-6 transition-all hover:border-[#0657f9]/40 hover:bg-[#121212]">
                                        <div className="flex justify-between items-start mb-4">
                                            <div className="flex items-center gap-2 bg-[#0657f9]/10 border border-[#0657f9]/20 px-2 py-0.5 rounded-full shadow-[0_0_10px_rgba(6,87,249,0.4)]">
                                                <span className="w-1.5 h-1.5 rounded-full bg-[#0657f9] animate-pulse"></span>
                                                <span className="text-[10px] font-bold text-[#0657f9] uppercase tracking-tighter">Verified</span>
                                            </div>
                                            {/* Whitelist Toggle (Mock) */}
                                            <label className="inline-flex items-center cursor-pointer">
                                                <span className="text-[10px] font-bold text-slate-500 uppercase mr-2">Whitelist</span>
                                                <div className="relative">
                                                    <input defaultChecked={contact.whitelisted} className="sr-only peer" type="checkbox" />
                                                    <div className="w-8 h-4 bg-white/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-3 after:w-3 after:transition-all peer-checked:bg-[#0657f9]"></div>
                                                </div>
                                            </label>
                                        </div>
                                        <div className="flex items-center gap-4 mb-4">
                                            <div className="w-12 h-12 rounded-lg border border-white/10 bg-[#121212] flex items-center justify-center">
                                                <span className="material-icons text-2xl text-slate-400">person</span>
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <h3 className="text-base font-bold text-white truncate">{contact.name}</h3>
                                                <p className="text-[11px] font-mono text-slate-500 truncate">{contact.address}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3 pt-4 border-t border-white/5">
                                            <span className="px-2 py-1 rounded bg-white/5 text-[10px] text-slate-300 font-bold">{contact.network}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </main>

                {/* Add Contact Modal */}
                {showAddModal && (
                    <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
                        <div className="bg-[#181818] border border-white/10 rounded-xl p-8 w-full max-w-md shadow-2xl">
                            <h2 className="text-xl font-bold text-white mb-6">Add New Contact</h2>
                            <form onSubmit={handleAddContact} className="space-y-4">
                                <div>
                                    <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Name</label>
                                    <input
                                        className="w-full bg-[#121212] border border-white/10 rounded-lg p-3 text-white focus:border-[#0657f9] focus:ring-1 focus:ring-[#0657f9]"
                                        value={newContact.name}
                                        onChange={e => setNewContact({ ...newContact, name: e.target.value })}
                                        required
                                        placeholder="e.g. Alice"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Wallet Address</label>
                                    <input
                                        className="w-full bg-[#121212] border border-white/10 rounded-lg p-3 text-white focus:border-[#0657f9] focus:ring-1 focus:ring-[#0657f9] font-mono text-sm"
                                        value={newContact.address}
                                        onChange={e => setNewContact({ ...newContact, address: e.target.value })}
                                        required
                                        placeholder="0x..."
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Network</label>
                                    <select
                                        className="w-full bg-[#121212] border border-white/10 rounded-lg p-3 text-white focus:border-[#0657f9] focus:ring-1 focus:ring-[#0657f9]"
                                        value={newContact.network}
                                        onChange={e => setNewContact({ ...newContact, network: e.target.value })}
                                    >
                                        <option value="ETH">Ethereum</option>
                                        <option value="MATIC">Polygon</option>
                                        <option value="SOL">Solana</option>
                                    </select>
                                </div>
                                <div className="pt-4 flex justify-end gap-3">
                                    <button
                                        type="button"
                                        onClick={() => setShowAddModal(false)}
                                        className="px-4 py-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-colors"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={adding}
                                        className="px-6 py-2 rounded-lg bg-[#0657f9] hover:bg-[#0657f9]/90 text-white font-bold shadow-lg shadow-[#0657f9]/20 transition-all disabled:opacity-50"
                                    >
                                        {adding ? 'Adding...' : 'Save Contact'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AddressBook;
