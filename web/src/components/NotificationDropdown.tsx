import React, { useState, useEffect, useRef } from 'react';
import { getNotifications, markAsRead, markAllAsRead, Notification } from '../api/notification';
import { Link } from 'react-router-dom';

const NotificationDropdown: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [notifications, setNotifications] = useState<Notification[]>([]);
    const [unreadCount, setUnreadCount] = useState(0);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const fetchNotifications = async () => {
        try {
            const data = await getNotifications(5); // Fetch top 5 for dropdown
            setNotifications(data || []);
            setUnreadCount(data ? data.filter(n => !n.is_read).length : 0);
        } catch (error) {
            console.error("Failed to fetch notifications", error);
        }
    };

    useEffect(() => {
        fetchNotifications();
        // Poll every 30 seconds
        const interval = setInterval(fetchNotifications, 30000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleMarkAllRead = async () => {
        await markAllAsRead();
        fetchNotifications();
    };

    const handleItemClick = async (notif: Notification) => {
        if (!notif.is_read) {
            await markAsRead(notif.id);
            fetchNotifications();
        }
        setIsOpen(false);
    };

    const getIcon = (type: string) => {
        switch (type) {
            case 'SUCCESS': return 'check_circle';
            case 'WARNING': return 'warning';
            case 'ERROR': return 'error';
            default: return 'notifications';
        }
    };

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="relative p-2 text-slate-400 hover:text-white transition-colors rounded-full hover:bg-slate-800"
            >
                <span className="material-icons">notifications</span>
                {unreadCount > 0 && (
                    <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-primary rounded-full border-2 border-[#101622]"></span>
                )}
            </button>

            {isOpen && (
                <div className="absolute right-0 mt-2 w-80 bg-[#101622] border border-slate-700 rounded-xl shadow-2xl z-50 overflow-hidden">
                    <div className="p-3 border-b border-slate-800 flex items-center justify-between">
                        <h3 className="text-sm font-semibold text-white">Notifications</h3>
                        <button onClick={handleMarkAllRead} className="text-xs text-primary hover:text-blue-400">Mark all read</button>
                    </div>

                    <div className="max-h-96 overflow-y-auto custom-scrollbar">
                        {notifications.length === 0 ? (
                            <div className="p-6 text-center text-slate-500 text-sm">
                                No notifications
                            </div>
                        ) : (
                            notifications.map(notif => (
                                <div
                                    key={notif.id}
                                    onClick={() => handleItemClick(notif)}
                                    className={`p-3 border-b border-slate-800 hover:bg-slate-800/50 cursor-pointer flex gap-3 ${!notif.is_read ? 'bg-slate-800/20' : ''}`}
                                >
                                    <div className={`mt-0.5 text-slate-400`}>
                                        <span className="material-icons text-base">{getIcon(notif.type)}</span>
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className={`text-sm truncate ${!notif.is_read ? 'text-white font-medium' : 'text-slate-400'}`}>
                                            {notif.title}
                                        </p>
                                        <p className="text-xs text-slate-500 mt-0.5 line-clamp-2">
                                            {notif.message}
                                        </p>
                                        <p className="text-[10px] text-slate-600 mt-1">
                                            {new Date(notif.created_at).toLocaleTimeString()}
                                        </p>
                                    </div>
                                    {!notif.is_read && (
                                        <div className="self-center w-2 h-2 bg-primary rounded-full shrink-0"></div>
                                    )}
                                </div>
                            ))
                        )}
                    </div>

                    <div className="p-2 border-t border-slate-800 text-center bg-slate-900/50">
                        <Link
                            to="/notifications"
                            className="text-xs text-slate-400 hover:text-white font-medium block w-full py-1"
                            onClick={() => setIsOpen(false)}
                        >
                            View all notifications
                        </Link>
                    </div>
                </div>
            )}
        </div>
    );
};

export default NotificationDropdown;
