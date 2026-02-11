import React from 'react';
import Sidebar from '../components/Sidebar';

const ActivityFeed: React.FC = () => {
    // Custom styles for pulse animation and scrollbar
    const customStyles = `
        .custom-scrollbar::-webkit-scrollbar {
            width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
            background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
            background: #2d3748;
            border-radius: 10px;
        }
        .pulse-primary {
            box-shadow: 0 0 0 0 rgba(13, 89, 242, 0.7);
            animation: pulse-ring 2s infinite;
        }
        @keyframes pulse-ring {
            0% { box-shadow: 0 0 0 0 rgba(13, 89, 242, 0.4); }
            70% { box-shadow: 0 0 0 10px rgba(13, 89, 242, 0); }
            100% { box-shadow: 0 0 0 0 rgba(13, 89, 242, 0); }
        }
    `;

    return (
        <div className="flex h-screen overflow-hidden bg-[#101622] font-display text-slate-100">
            <style>{customStyles}</style>
            <Sidebar />

            <main className="flex-1 flex flex-col h-screen overflow-y-auto relative custom-scrollbar">
                <div className="max-w-7xl mx-auto px-6 py-10 w-full">
                    {/* Header Section */}
                    <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                        <div>
                            <h1 className="text-[24px] font-bold tracking-tight text-white">Recent Activity</h1>
                            <p className="text-slate-400 text-sm mt-1">Track and manage your organization's latest transactions and events.</p>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="relative group">
                                <button className="flex items-center gap-2 px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-sm font-medium transition-colors hover:bg-slate-700 text-white">
                                    <span className="material-icons text-lg">calendar_today</span>
                                    Last 7 days
                                    <span className="material-icons text-lg">expand_more</span>
                                </button>
                            </div>
                            <button className="flex items-center gap-2 px-5 py-2 bg-primary text-white rounded-lg text-sm font-semibold hover:bg-blue-600 transition-all shadow-lg shadow-primary/20">
                                <span className="material-icons text-lg">file_download</span>
                                Export
                            </button>
                        </div>
                    </header>

                    {/* Filters & Search */}
                    <div className="space-y-6 mb-8">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                            {/* Filter Tabs */}
                            <nav className="flex items-center bg-slate-800/50 p-1 rounded-lg border border-slate-700 w-fit">
                                <button className="px-5 py-1.5 text-sm font-medium bg-primary text-white rounded shadow-sm">All</button>
                                <button className="px-5 py-1.5 text-sm font-medium text-slate-400 hover:text-white transition-colors">Payments</button>
                                <button className="px-5 py-1.5 text-sm font-medium text-slate-400 hover:text-white transition-colors">Approvals</button>
                                <button className="px-5 py-1.5 text-sm font-medium text-slate-400 hover:text-white transition-colors">Team</button>
                                <button className="px-5 py-1.5 text-sm font-medium text-slate-400 hover:text-white transition-colors">System</button>
                            </nav>
                            {/* Search Bar */}
                            <div className="relative flex-1 max-w-md">
                                <span className="absolute inset-y-0 left-3 flex items-center text-slate-400">
                                    <span className="material-icons">search</span>
                                </span>
                                <input
                                    className="w-full pl-10 pr-4 py-2.5 bg-slate-800 border border-slate-700 rounded-lg text-sm focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all text-white placeholder-slate-500"
                                    placeholder="Search transactions, batches, or users..."
                                    type="text"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Activity Feed */}
                    <div className="relative">
                        {/* Feed Timeline Container */}
                        <div className="space-y-12 relative">
                            {/* Vertical Connector Line (Full height) */}
                            <div className="absolute left-6 top-8 bottom-0 w-0.5 border-l-2 border-dotted border-slate-700 z-0"></div>

                            {/* TODAY GROUP */}
                            <section className="relative z-10">
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="bg-[#101622] px-2 py-1">
                                        <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400">Today</h3>
                                    </div>
                                </div>
                                <div className="space-y-4 ml-2 md:ml-0">
                                    {/* Activity Item: Payment Sent (Unread) */}
                                    <div className="flex items-start gap-6 p-4 rounded-xl bg-primary/10 border border-primary/20 transition-all hover:border-primary/40 group">
                                        <div className="relative z-20">
                                            <div className="w-12 h-12 rounded-full bg-emerald-900/30 text-emerald-400 flex items-center justify-center border-4 border-[#101622]">
                                                <span className="material-icons">arrow_upward</span>
                                            </div>
                                        </div>
                                        <div className="flex-1 grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                                            <div className="md:col-span-5">
                                                <h4 className="font-semibold text-white flex items-center gap-2">
                                                    Payment sent to John Doe
                                                    <span className="w-2 h-2 rounded-full bg-primary inline-block" title="Unread"></span>
                                                </h4>
                                                <p className="text-sm text-slate-400 mt-0.5">Wallet: 0x71C...4e21</p>
                                            </div>
                                            <div className="md:col-span-3">
                                                <div className="text-sm font-bold text-white">$1,500.00 USDC</div>
                                                <div className="text-[10px] text-slate-400 mt-1 uppercase tracking-tight">Fee: 0.12 USDC</div>
                                            </div>
                                            <div className="md:col-span-2">
                                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-900/40 text-emerald-300 border border-emerald-800">
                                                    Completed
                                                </span>
                                            </div>
                                            <div className="md:col-span-2 text-right">
                                                <button className="px-4 py-1.5 text-xs font-semibold bg-slate-700 text-slate-200 border border-slate-600 rounded-lg hover:bg-slate-600 transition-colors">View</button>
                                            </div>
                                        </div>
                                    </div>
                                    {/* Activity Item: Approval Required */}
                                    <div className="flex items-start gap-6 p-4 rounded-xl bg-slate-800 border border-slate-700 transition-all hover:shadow-md">
                                        <div className="relative z-20">
                                            <div className="w-12 h-12 rounded-full bg-amber-900/30 text-amber-400 flex items-center justify-center border-4 border-[#101622]">
                                                <span className="material-icons">schedule</span>
                                            </div>
                                        </div>
                                        <div className="flex-1 grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                                            <div className="md:col-span-5">
                                                <h4 className="font-semibold text-white">Approval required: Marketing Team batch</h4>
                                                <p className="text-sm text-slate-400 mt-0.5">Requested by Sarah Chen • 2h ago</p>
                                            </div>
                                            <div className="md:col-span-3 text-sm font-bold text-white">$34,500.00</div>
                                            <div className="md:col-span-2">
                                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-900/40 text-amber-300 border border-amber-800">
                                                    Pending Review
                                                </span>
                                            </div>
                                            <div className="md:col-span-2 text-right">
                                                <button className="px-4 py-1.5 text-xs font-semibold bg-primary text-white rounded-lg hover:bg-blue-600 transition-all pulse-primary">Review</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </section>

                            {/* YESTERDAY GROUP */}
                            <section className="relative z-10">
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="bg-[#101622] px-2 py-1">
                                        <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400">Yesterday</h3>
                                    </div>
                                </div>
                                <div className="space-y-4 ml-2 md:ml-0">
                                    {/* Activity Item: Batch Created */}
                                    <div className="flex items-start gap-6 p-4 rounded-xl bg-slate-800 border border-slate-700 transition-all hover:shadow-md">
                                        <div className="relative z-20">
                                            <div className="w-12 h-12 rounded-full bg-blue-900/30 text-blue-400 flex items-center justify-center border-4 border-[#101622]">
                                                <span className="material-icons">description</span>
                                            </div>
                                        </div>
                                        <div className="flex-1 grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                                            <div className="md:col-span-5">
                                                <h4 className="font-semibold text-white">Batch created: January Payroll</h4>
                                                <p className="text-sm text-slate-400 mt-0.5">45 recipients • Created by Mike Ross</p>
                                            </div>
                                            <div className="md:col-span-3 text-sm font-bold text-white">$128,400.00</div>
                                            <div className="md:col-span-2">
                                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-700 text-slate-300 border border-slate-600">
                                                    Draft
                                                </span>
                                            </div>
                                            <div className="md:col-span-2 text-right">
                                                <button className="px-4 py-1.5 text-xs font-semibold bg-slate-700 text-slate-200 border border-slate-600 rounded-lg hover:bg-slate-600 transition-colors">Edit</button>
                                            </div>
                                        </div>
                                    </div>
                                    {/* Activity Item: Failed Payment */}
                                    <div className="flex items-start gap-6 p-4 rounded-xl bg-slate-800 border border-slate-700 transition-all hover:shadow-md">
                                        <div className="relative z-20">
                                            <div className="w-12 h-12 rounded-full bg-rose-900/30 text-rose-400 flex items-center justify-center border-4 border-[#101622]">
                                                <span className="material-icons">close</span>
                                            </div>
                                        </div>
                                        <div className="flex-1 grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                                            <div className="md:col-span-5">
                                                <h4 className="font-semibold text-white">Payment failed: Insufficient gas</h4>
                                                <p className="text-sm text-rose-400 mt-0.5">Network congestion detected</p>
                                            </div>
                                            <div className="md:col-span-3 text-sm font-bold text-white">$8,240.00</div>
                                            <div className="md:col-span-2">
                                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-rose-900/40 text-rose-300 border border-rose-800">
                                                    Error
                                                </span>
                                            </div>
                                            <div className="md:col-span-2 text-right">
                                                <button className="px-4 py-1.5 text-xs font-semibold bg-rose-600 text-white rounded-lg hover:bg-rose-700 transition-all">Retry</button>
                                            </div>
                                        </div>
                                    </div>
                                    {/* Activity Item: User Invited */}
                                    <div className="flex items-start gap-6 p-4 rounded-xl bg-slate-800 border border-slate-700 transition-all hover:shadow-md opacity-80">
                                        <div className="relative z-20">
                                            <div className="w-12 h-12 rounded-full bg-indigo-900/30 text-indigo-400 flex items-center justify-center border-4 border-[#101622]">
                                                <span className="material-icons">person_add</span>
                                            </div>
                                        </div>
                                        <div className="flex-1 grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                                            <div className="md:col-span-5">
                                                <h4 className="font-semibold text-white">New team member: Alex Rivera</h4>
                                                <p className="text-sm text-slate-400 mt-0.5">Role: Operations Manager</p>
                                            </div>
                                            <div className="md:col-span-3 text-sm text-slate-400">—</div>
                                            <div className="md:col-span-2">
                                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-900/40 text-indigo-300 border border-indigo-800">
                                                    Joined
                                                </span>
                                            </div>
                                            <div className="md:col-span-2 text-right">
                                                <button className="px-4 py-1.5 text-xs font-semibold bg-slate-700 text-slate-200 border border-slate-600 rounded-lg hover:bg-slate-600 transition-colors">Manage</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </section>
                        </div>
                    </div>

                    {/* Footer Stats / Legend */}
                    <footer className="mt-12 pt-8 border-t border-slate-800 flex flex-col md:flex-row items-center justify-between text-slate-400 text-sm">
                        <div className="flex gap-6 mb-4 md:mb-0">
                            <div className="flex items-center gap-2">
                                <span className="w-3 h-3 rounded-full bg-emerald-500"></span>
                                <span>Payments</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="w-3 h-3 rounded-full bg-amber-500"></span>
                                <span>Approvals</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="w-3 h-3 rounded-full bg-blue-500"></span>
                                <span>Batches</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="w-3 h-3 rounded-full bg-rose-500"></span>
                                <span>Errors</span>
                            </div>
                        </div>
                        <div>
                            Showing <span className="text-white font-medium">1-5</span> of 24 events
                        </div>
                    </footer>
                </div>
            </main>
        </div>
    );
};

export default ActivityFeed;
