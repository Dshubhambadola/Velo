import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import { getNotifications, markAsRead, markAllAsRead, Notification } from '../api/notification';

const NotificationsPage: React.FC = () => {
    // Custom styles
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
    `;

    const [notifications, setNotifications] = useState<Notification[]>([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState<'ALL' | 'UNREAD'>('ALL');

    const fetchNotifications = async () => {
        setLoading(true);
        try {
            const data = await getNotifications();
            setNotifications(data || []);
        } catch (error) {
            console.error("Failed to fetch notifications", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchNotifications();
    }, []);

    const handleMarkAsRead = async (id: string) => {
        try {
            await markAsRead(id);
            setNotifications(prev => prev.map(n => n.id === id ? { ...n, is_read: true } : n));
        } catch (error) {
            console.error("Failed to mark as read", error);
        }
    };

    const handleMarkAllAsRead = async () => {
        try {
            await markAllAsRead();
            setNotifications(prev => prev.map(n => ({ ...n, is_read: true })));
        } catch (error) {
            console.error("Failed to mark all as read", error);
        }
    };

    const filteredNotifications = notifications.filter(n => filter === 'ALL' || !n.is_read);

    const getIcon = (type: string) => {
        switch (type) {
            case 'SUCCESS': return 'check_circle';
            case 'WARNING': return 'warning';
            case 'ERROR': return 'error';
            default: return 'info';
        }
    };

    const getIconColor = (type: string) => {
        switch (type) {
            case 'SUCCESS': return 'text-emerald-400 bg-emerald-900/20';
            case 'WARNING': return 'text-amber-400 bg-amber-900/20';
            case 'ERROR': return 'text-rose-400 bg-rose-900/20';
            default: return 'text-blue-400 bg-blue-900/20';
        }
    };

    return (
        <div className="flex h-screen overflow-hidden bg-[#101622] font-display text-slate-100">
            <style>{customStyles}</style>
            <Sidebar />

            <main className="flex-1 flex flex-col h-screen overflow-y-auto relative custom-scrollbar">
                <div className="max-w-4xl mx-auto px-6 py-10 w-full">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h1 className="text-2xl font-bold text-white">Notifications</h1>
                            <p className="text-slate-400 text-sm mt-1">Manage your alerts and system messages.</p>
                        </div>
                        <div className="flex gap-3">
                            <button
                                onClick={handleMarkAllAsRead}
                                className="px-4 py-2 text-sm font-medium text-slate-300 hover:text-white bg-slate-800 border border-slate-700 rounded-lg hover:bg-slate-700 transition"
                            >
                                Mark all as read
                            </button>
                            <button
                                onClick={fetchNotifications}
                                className="p-2 text-slate-300 hover:text-white bg-slate-800 border border-slate-700 rounded-lg hover:bg-slate-700 transition"
                            >
                                <span className="material-icons text-lg">refresh</span>
                            </button>
                        </div>
                    </div>

                    {/* Filters */}
                    <div className="flex gap-4 mb-6 border-b border-slate-800 pb-4">
                        <button
                            onClick={() => setFilter('ALL')}
                            className={`pb-2 text-sm font-medium transition-colors relative ${filter === 'ALL' ? 'text-white' : 'text-slate-500 hover:text-slate-300'}`}
                        >
                            All
                            {filter === 'ALL' && <span className="absolute bottom-[-17px] left-0 right-0 h-0.5 bg-primary rounded-full"></span>}
                        </button>
                        <button
                            onClick={() => setFilter('UNREAD')}
                            className={`pb-2 text-sm font-medium transition-colors relative ${filter === 'UNREAD' ? 'text-white' : 'text-slate-500 hover:text-slate-300'}`}
                        >
                            Unread
                            {filter === 'UNREAD' && <span className="absolute bottom-[-17px] left-0 right-0 h-0.5 bg-primary rounded-full"></span>}
                        </button>
                    </div>

                    {/* Notification List */}
                    <div className="space-y-4">
                        {loading ? (
                            <div className="text-center py-10 text-slate-500">Loading notifications...</div>
                        ) : filteredNotifications.length === 0 ? (
                            <div className="text-center py-10 text-slate-500">No notifications found.</div>
                        ) : (
                            filteredNotifications.map((notif) => (
                                <div
                                    key={notif.id}
                                    className={`relative p-4 rounded-xl border transition-all hover:bg-slate-800/80 ${notif.is_read ? 'bg-slate-900/50 border-slate-800/50' : 'bg-slate-800 border-slate-700 shadow-sm'}`}
                                >
                                    <div className="flex gap-4">
                                        <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${getIconColor(notif.type)}`}>
                                            <span className="material-icons text-xl">{getIcon(notif.type)}</span>
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex justify-between items-start gap-4">
                                                <h3 className={`text-sm font-semibold truncate ${notif.is_read ? 'text-slate-400' : 'text-white'}`}>
                                                    {notif.title}
                                                </h3>
                                                <span className="text-xs text-slate-500 whitespace-nowrap">
                                                    {new Date(notif.created_at).toLocaleString()}
                                                </span>
                                            </div>
                                            <p className={`text-sm mt-1 mb-2 ${notif.is_read ? 'text-slate-500' : 'text-slate-300'}`}>
                                                {notif.message}
                                            </p>

                                            <div className="flex items-center gap-4">
                                                {!notif.is_read && (
                                                    <button
                                                        onClick={() => handleMarkAsRead(notif.id)}
                                                        className="text-xs font-medium text-primary hover:text-blue-400 transition-colors"
                                                    >
                                                        Mark as read
                                                    </button>
                                                )}
                                                {notif.link && (
                                                    <a href={notif.link} className="flex items-center gap-1 text-xs font-medium text-slate-400 hover:text-white transition-colors">
                                                        <span>View Details</span>
                                                        <span className="material-icons text-[14px]">arrow_forward</span>
                                                    </a>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                    {!notif.is_read && (
                                        <div className="absolute top-4 right-4 w-2 h-2 rounded-full bg-primary"></div>
                                    )}
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
};

export default NotificationsPage;
