import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';

const NotificationsPage: React.FC = () => {
    // Mock data based on the design
    const [filterStatus, setFilterStatus] = useState<'all' | 'unread' | 'archived'>('all');

    return (
        <div className="flex h-screen overflow-hidden bg-black font-display text-white">
            <Sidebar />

            {/* Main Content Area - Split into Filter Sidebar and Content */}
            <main className="flex-1 flex h-screen overflow-hidden bg-obsidian-charcoal">

                {/* Internal Sidebar (Filter Panel) */}
                <aside className="w-64 border-r border-border-dark-obsidian bg-obsidian-charcoal overflow-y-auto hidden lg:block p-6 space-y-8">
                    <div>
                        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-4">Status</h3>
                        <div className="space-y-1">
                            <button
                                onClick={() => setFilterStatus('all')}
                                className={`w-full flex items-center justify-between px-3 py-2 rounded-lg font-medium text-sm transition-colors ${filterStatus === 'all' ? 'bg-primary/10 text-white' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}
                            >
                                <span className="flex items-center gap-2"><span className="material-icons text-[18px]">all_inbox</span> All</span>
                                <span className={`px-2 py-0.5 rounded text-[10px] ${filterStatus === 'all' ? 'bg-primary/20' : 'bg-white/10'}`}>42</span>
                            </button>
                            <button
                                onClick={() => setFilterStatus('unread')}
                                className={`w-full flex items-center justify-between px-3 py-2 rounded-lg font-medium text-sm transition-colors ${filterStatus === 'unread' ? 'bg-primary/10 text-white' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}
                            >
                                <span className="flex items-center gap-2"><span className="material-icons text-[18px]">mark_as_unread</span> Unread</span>
                                <span className={`px-2 py-0.5 rounded text-[10px] ${filterStatus === 'unread' ? 'bg-primary/20' : 'bg-white/10'}`}>12</span>
                            </button>
                            <button
                                onClick={() => setFilterStatus('archived')}
                                className={`w-full flex items-center justify-between px-3 py-2 rounded-lg font-medium text-sm transition-colors ${filterStatus === 'archived' ? 'bg-primary/10 text-white' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}
                            >
                                <span className="flex items-center gap-2"><span className="material-icons text-[18px]">archive</span> Archived</span>
                            </button>
                        </div>
                    </div>

                    <div>
                        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-4">Type</h3>
                        <div className="space-y-1">
                            {['System Alerts', 'Team Activity', 'Billing', 'Security'].map((type) => (
                                <label key={type} className="flex items-center gap-3 px-3 py-2 cursor-pointer hover:bg-white/5 rounded-lg group">
                                    <input type="checkbox" defaultChecked className="rounded border-border-dark-obsidian bg-black text-primary focus:ring-primary h-4 w-4 transition-colors" />
                                    <span className="text-sm text-slate-400 group-hover:text-white transition-colors">{type}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    <div>
                        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-4">Priority</h3>
                        <div className="flex flex-wrap gap-2">
                            <button className="px-3 py-1.5 border border-red-500/30 bg-red-500/10 text-red-400 rounded-full text-xs font-semibold hover:bg-red-500/20 transition-colors">High</button>
                            <button className="px-3 py-1.5 border border-amber-500/30 bg-amber-500/10 text-amber-400 rounded-full text-xs font-semibold hover:bg-amber-500/20 transition-colors">Medium</button>
                            <button className="px-3 py-1.5 border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 rounded-full text-xs font-semibold hover:bg-emerald-500/20 transition-colors">Low</button>
                        </div>
                    </div>

                    <div>
                        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-4">Date Range</h3>
                        <select className="w-full text-sm border-border-dark-obsidian bg-black text-slate-400 rounded-lg focus:ring-primary focus:border-primary p-2.5">
                            <option>Last 24 Hours</option>
                            <option>Last 7 Days</option>
                            <option>Last 30 Days</option>
                            <option>Custom Range</option>
                        </select>
                    </div>
                </aside>

                {/* Notification List Area */}
                <div className="flex-1 flex flex-col min-w-0 bg-obsidian-charcoal">
                    {/* Toolbar */}
                    <div className="h-14 border-b border-border-dark-obsidian px-6 flex items-center justify-between sticky top-0 bg-obsidian-charcoal/95 backdrop-blur-md z-40">
                        <div className="flex items-center gap-4">
                            <input type="checkbox" className="rounded border-border-dark-obsidian bg-black text-primary focus:ring-primary h-4 w-4" />
                            <span className="text-sm font-medium text-slate-400">Select all</span>
                            <div className="h-4 w-px bg-border-dark-obsidian mx-2"></div>
                            <button className="flex items-center gap-2 px-3 py-1.5 text-sm font-semibold text-slate-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors">
                                <span className="material-icons text-[18px]">done_all</span>
                                Mark as read
                            </button>
                            <button className="flex items-center gap-2 px-3 py-1.5 text-sm font-semibold text-slate-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors">
                                <span className="material-icons text-[18px]">delete_outline</span>
                                Delete
                            </button>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="text-xs text-slate-400">Showing 1-10 of 42</span>
                            <div className="flex gap-1">
                                <button className="p-1 hover:bg-white/5 rounded border border-border-dark-obsidian text-slate-400"><span className="material-icons text-[18px]">chevron_left</span></button>
                                <button className="p-1 hover:bg-white/5 rounded border border-border-dark-obsidian text-slate-400"><span className="material-icons text-[18px]">chevron_right</span></button>
                            </div>
                        </div>
                    </div>

                    {/* List */}
                    <div className="flex-1 overflow-y-auto">
                        <NotificationItem
                            icon="rocket_launch"
                            iconColor="primary"
                            title="Deployment Successful"
                            tag="Success"
                            tagColor="emerald"
                            time="2 mins ago"
                            description="Velo-Production-v2 has been successfully deployed to 12 nodes across all regions. The rollout completed in 3m 42s without any latency spikes."
                            actions={['View Logs', 'Dismiss']}
                        />
                        <NotificationItem
                            icon="warning"
                            iconColor="red"
                            title="Critical System Alert"
                            tag="High Priority"
                            tagColor="red"
                            time="14 mins ago"
                            description="Memory usage exceeded 90% on Server-04 (US-East-1). Auto-scaling was triggered but failed to provision new instances."
                            actions={['Investigate', 'Retry']}
                        />
                        <NotificationItem
                            icon="group_add"
                            iconColor="slate"
                            title="New Team Member Joined"
                            time="2 hours ago"
                            description="Sarah Jenkins has accepted your invitation and joined the 'Engineering' team workspace."
                            actions={['View Profile']}
                        />
                        <NotificationItem
                            icon="credit_card"
                            iconColor="amber"
                            title="Subscription Renewal"
                            time="Yesterday"
                            description="Your Professional Plan is set to renew on Oct 24th, 2023. Ensure your payment method is up to date to avoid service disruption."
                            actions={['Billing Settings']}
                        />
                        <NotificationItem
                            icon="security"
                            iconColor="slate"
                            title="Security Policy Updated"
                            time="2 days ago"
                            description="We've updated our data processing addendum to comply with new regional regulations. No action is required on your part."
                            actions={['Read Details']}
                        />
                    </div>

                    {/* Footer Pagination */}
                    <div className="p-4 border-t border-border-dark-obsidian bg-obsidian-charcoal flex items-center justify-center">
                        <nav className="flex items-center gap-1">
                            <button className="w-10 h-10 flex items-center justify-center rounded-lg text-slate-400 hover:bg-white/5"><span className="material-icons">chevron_left</span></button>
                            <button className="w-10 h-10 flex items-center justify-center rounded-lg bg-primary text-white font-bold shadow-[0_0_12px_rgba(19,127,236,0.3)]">1</button>
                            <button className="w-10 h-10 flex items-center justify-center rounded-lg text-slate-400 hover:bg-white/5 hover:text-white">2</button>
                            <button className="w-10 h-10 flex items-center justify-center rounded-lg text-slate-400 hover:bg-white/5 hover:text-white">3</button>
                            <span className="px-2 text-slate-500 font-bold">...</span>
                            <button className="w-10 h-10 flex items-center justify-center rounded-lg text-slate-400 hover:bg-white/5 hover:text-white">12</button>
                            <button className="w-10 h-10 flex items-center justify-center rounded-lg text-slate-400 hover:bg-white/5"><span className="material-icons">chevron_right</span></button>
                        </nav>
                    </div>
                </div>
            </main>
        </div>
    );
};

// Helper Component for Notification Item
const NotificationItem: React.FC<{
    icon: string;
    iconColor: 'primary' | 'red' | 'amber' | 'slate';
    title: string;
    tag?: string;
    tagColor?: 'emerald' | 'red';
    description: string;
    time: string;
    actions: string[];
}> = ({ icon, iconColor, title, tag, tagColor, description, time, actions }) => {

    const getIconStyles = () => {
        switch (iconColor) {
            case 'primary': return 'bg-primary/10 text-primary border-primary/20';
            case 'red': return 'bg-red-500/10 text-red-500 border-red-500/20';
            case 'amber': return 'bg-amber-500/10 text-amber-500 border-amber-500/20';
            default: return 'bg-white/10 text-slate-400 border-white/10';
        }
    }

    return (
        <div className="p-6 border-b border-border-dark-obsidian hover:bg-white/[0.02] transition-colors group flex items-start gap-4">
            <div className="pt-1">
                <input type="checkbox" className="rounded border-border-dark-obsidian bg-black text-primary focus:ring-primary h-4 w-4" />
            </div>
            <div className="relative">
                <div className={`h-10 w-10 rounded-full flex items-center justify-center border ${getIconStyles()}`}>
                    <span className="material-icons">{icon}</span>
                </div>
                {(iconColor === 'primary' || iconColor === 'red') && (
                    <div className="absolute -top-1 -right-1 h-3 w-3 bg-primary border-2 border-obsidian-charcoal rounded-full shadow-[0_0_8px_rgba(19,127,236,0.6)]"></div>
                )}
            </div>
            <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-4">
                    <div>
                        <h4 className="text-base font-bold text-white mb-1 flex items-center gap-2">
                            {title}
                            {tag && (
                                <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase border shadow-[0_0_10px_rgba(0,0,0,0.2)] ${tagColor === 'emerald' ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30' :
                                        'bg-red-500/20 text-red-400 border-red-500/30'
                                    }`}>
                                    {tag}
                                </span>
                            )}
                        </h4>
                        <p className="text-sm text-slate-400 line-clamp-2 max-w-2xl">
                            {description}
                        </p>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                        <span className="text-[11px] font-medium text-slate-500 whitespace-nowrap uppercase tracking-wider">{time}</span>
                        <div className="opacity-0 group-hover:opacity-100 transition-opacity flex gap-2">
                            {actions.map((action, idx) => (
                                <button key={idx} className={`px-3 py-1 text-xs font-semibold rounded-lg transition-colors ${idx === 0 ? 'bg-primary text-white hover:bg-primary/90' : 'border border-border-dark-obsidian text-white hover:bg-white/5'
                                    }`}>
                                    {action}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default NotificationsPage;
