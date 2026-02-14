import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import { getActivities, Activity } from '../api/activity';

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

    const [activities, setActivities] = useState<Activity[]>([]);
    const [loading, setLoading] = useState(true);
    const [filterType, setFilterType] = useState<string>('ALL');
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        const fetchActivities = async () => {
            try {
                const data = await getActivities();
                setActivities(data || []);
            } catch (error) {
                console.error("Failed to fetch activities", error);
            } finally {
                setLoading(false);
            }
        };
        fetchActivities();
    }, []);

    const filteredActivities = activities.filter(activity => {
        const matchesType = filterType === 'ALL' || activity.type === filterType;
        const matchesSearch = activity.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            activity.description.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesType && matchesSearch;
    });

    const getIcon = (type: string) => {
        switch (type) {
            case 'TRANSACTION': return 'paid';
            case 'SECURITY': return 'security';
            case 'SYSTEM': return 'dns';
            case 'USER': return 'person';
            default: return 'notifications';
        }
    };

    const getIconColorClass = (type: string) => {
        switch (type) {
            case 'TRANSACTION': return 'bg-emerald-900/30 text-emerald-400';
            case 'SECURITY': return 'bg-rose-900/30 text-rose-400';
            case 'SYSTEM': return 'bg-blue-900/30 text-blue-400';
            case 'USER': return 'bg-indigo-900/30 text-indigo-400';
            default: return 'bg-slate-700/30 text-slate-400';
        }
    };

    // Group activities by date (Today, Yesterday, etc.) could be added here
    // For now, just listing them flat or single group

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
                            <button className="flex items-center gap-2 px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-sm font-medium transition-colors hover:bg-slate-700 text-white" onClick={() => window.location.reload()}>
                                <span className="material-icons text-lg">refresh</span>
                                Refresh
                            </button>
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
                                {['ALL', 'TRANSACTION', 'SECURITY', 'SYSTEM', 'USER'].map(type => (
                                    <button
                                        key={type}
                                        onClick={() => setFilterType(type)}
                                        className={`px-5 py-1.5 text-sm font-medium rounded shadow-sm transition-colors ${filterType === type ? 'bg-primary text-white' : 'text-slate-400 hover:text-white'}`}
                                    >
                                        {type === 'ALL' ? 'All' : type.charAt(0) + type.slice(1).toLowerCase()}
                                    </button>
                                ))}
                            </nav>
                            {/* Search Bar */}
                            <div className="relative flex-1 max-w-md">
                                <span className="absolute inset-y-0 left-3 flex items-center text-slate-400">
                                    <span className="material-icons">search</span>
                                </span>
                                <input
                                    className="w-full pl-10 pr-4 py-2.5 bg-slate-800 border border-slate-700 rounded-lg text-sm focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all text-white placeholder-slate-500"
                                    placeholder="Search activities..."
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
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

                            {loading ? (
                                <div className="text-center py-10 text-slate-500">Loading activities...</div>
                            ) : filteredActivities.length === 0 ? (
                                <div className="text-center py-10 text-slate-500">No activities found.</div>
                            ) : (
                                <section className="relative z-10">
                                    <div className="flex items-center gap-4 mb-6">
                                        <div className="bg-[#101622] px-2 py-1">
                                            <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400">Timeline</h3>
                                        </div>
                                    </div>
                                    <div className="space-y-4 ml-2 md:ml-0">
                                        {filteredActivities.map((activity) => (
                                            <div key={activity.id} className="flex items-start gap-6 p-4 rounded-xl bg-slate-800/50 border border-slate-700 transition-all hover:bg-slate-800 hover:shadow-md group">
                                                <div className="relative z-20">
                                                    <div className={`w-12 h-12 rounded-full flex items-center justify-center border-4 border-[#101622] ${getIconColorClass(activity.type)}`}>
                                                        <span className="material-icons">{getIcon(activity.type)}</span>
                                                    </div>
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <div className="flex justify-between items-start">
                                                        <div>
                                                            <h4 className="font-semibold text-white">{activity.title}</h4>
                                                            <p className="text-sm text-slate-400 mt-0.5">{activity.description}</p>
                                                        </div>
                                                        <div className="text-right">
                                                            <div className="text-xs text-slate-500">{new Date(activity.created_at).toLocaleString()}</div>
                                                        </div>
                                                    </div>
                                                    {activity.metadata && Object.keys(activity.metadata).length > 0 && (
                                                        <div className="mt-3 bg-black/30 p-2 rounded text-xs font-mono text-slate-500 overflow-x-auto">
                                                            {JSON.stringify(activity.metadata, null, 2)}
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </section>
                            )}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default ActivityFeed;
