import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';

const NotificationDropdown: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Close on click outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const notifications = [
        {
            id: 1,
            type: 'approval',
            title: 'Approval required: Marketing Batch',
            description: 'New payout batch #MB-4029 requires your final authorization before processing.',
            time: '2m ago',
            icon: 'schedule',
            color: 'amber',
            unread: true,
        },
        {
            id: 2,
            type: 'security',
            title: 'New login detected',
            description: 'A login occurred from a new device: Chrome on MacOS (San Francisco, CA).',
            time: '45m ago',
            icon: 'security',
            color: 'red',
            unread: true,
            action: "Wasn't you? Secure your account"
        },
        {
            id: 3,
            type: 'success',
            title: 'Payment to John Doe confirmed',
            description: 'The transfer of $1,250.00 has been successfully deposited.',
            time: '2h ago',
            icon: 'check_circle',
            color: 'emerald',
            unread: false,
        },
        {
            id: 4,
            type: 'mention',
            title: 'Sarah Chen mentioned you in Q4 Budget Planning',
            description: '"Hey team, can we review these numbers before the meeting tomorrow?"',
            time: '4h ago',
            icon: 'person',
            img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB1YqpE5k38Yq3kVvT1qahOVeeRF-bLkbW8f1CpyJmJH5JkE1XEBJIh8j6lXvT_YcVUtdx52LVEXkz6JUPE_qAtxUhSUf7lTyY0BAlvFIDCkBYXNr2zIVQKL0lPt-SXOvnz1W-XVEqpTqEfj6WdtRu1ajewp8gY-hb3CItZe6L0dSsHbCSkrF_JUffWnS7Qqb9LHU5z4FIUk2wPrPCxLhhCnb9oS6AUoZEm7NNwIzzjf7nDtibFzNY6z04pkwYIpx37w6OK_irxNd4F',
            color: 'blue',
            unread: false,
        }
    ];

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-8 h-8 flex items-center justify-center text-slate-400 hover:text-white transition-colors relative"
            >
                <span className="material-icons text-xl">notifications</span>
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-600 rounded-full"></span>
            </button>

            {isOpen && (
                <div className="absolute right-0 top-12 w-[420px] bg-obsidian-charcoal shadow-2xl rounded-lg border border-border-dark-obsidian overflow-hidden z-50">
                    <div className="px-5 py-4 border-b border-border-dark-obsidian flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <h2 className="text-lg font-bold text-white">Notifications</h2>
                            <span className="px-2 py-0.5 bg-blue-900/40 text-blue-400 text-xs font-semibold rounded-full border border-blue-800/50">
                                3 unread
                            </span>
                        </div>
                        <div className="flex items-center gap-4">
                            <button className="text-xs font-medium text-blue-400 hover:text-blue-300 transition-colors">
                                Mark all as read
                            </button>
                            <button className="text-slate-500 hover:text-white transition-colors">
                                <span className="material-icons text-xl">settings</span>
                            </button>
                        </div>
                    </div>

                    <div className="px-2 pt-2 border-b border-border-dark-obsidian flex gap-1 overflow-x-auto no-scrollbar">
                        <button className="px-3 py-2 text-sm font-semibold border-b-2 border-primary text-white whitespace-nowrap">All</button>
                        <button className="px-3 py-2 text-sm font-medium text-slate-500 hover:text-slate-200 whitespace-nowrap">Unread</button>
                        <button className="px-3 py-2 text-sm font-medium text-slate-500 hover:text-slate-200 whitespace-nowrap">Mentions</button>
                        <button className="px-3 py-2 text-sm font-medium text-slate-500 hover:text-slate-200 whitespace-nowrap">Approvals</button>
                        <button className="px-3 py-2 text-sm font-medium text-slate-500 hover:text-slate-200 whitespace-nowrap">System</button>
                    </div>

                    <div className="max-h-[500px] overflow-y-auto custom-scrollbar">
                        {notifications.map((note) => (
                            <div key={note.id} className={`group relative px-5 py-5 border-b border-border-dark-obsidian hover:bg-white/5 transition-colors ${note.type === 'security' ? 'bg-red-950/10 border-l-4 border-l-red-600' : ''}`}>
                                <div className="flex gap-4">
                                    <div className="flex-shrink-0 mt-1">
                                        {note.img ? (
                                            <div className="w-10 h-10 rounded-full overflow-hidden border border-border-dark-obsidian">
                                                <img alt="Profile" className="w-full h-full object-cover" src={note.img} />
                                            </div>
                                        ) : (
                                            <div className={`w-10 h-10 rounded-lg flex items-center justify-center border ${note.color === 'amber' ? 'bg-amber-500/10 text-amber-500 border-amber-500/20' :
                                                    note.color === 'red' ? 'bg-red-600/10 text-red-600 border-red-600/20' :
                                                        note.color === 'emerald' ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' :
                                                            'bg-slate-800 text-slate-400 border-slate-700'
                                                }`}>
                                                <span className="material-icons">{note.icon}</span>
                                            </div>
                                        )}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex justify-between items-start">
                                            <p className="text-[15px] text-white leading-tight">
                                                {note.type === 'mention' ? (
                                                    <span className="text-slate-400">
                                                        <span className="font-semibold text-white">Sarah Chen</span> mentioned you in <span className="font-semibold text-blue-400">Q4 Budget Planning</span>
                                                    </span>
                                                ) : (
                                                    <span className="font-semibold">{note.title}</span>
                                                )}
                                            </p>
                                            <span className="text-[11px] text-slate-500 whitespace-nowrap ml-2">{note.time}</span>
                                        </div>
                                        <p className={`mt-1 text-sm text-slate-400 ${note.type === 'mention' ? 'italic border-l-2 border-border-dark-obsidian pl-3 mt-2' : ''}`}>
                                            {note.description}
                                        </p>

                                        {note.type === 'approval' && (
                                            <div className="mt-4 flex items-center gap-2">
                                                <button className="px-4 py-1.5 bg-primary text-white text-xs font-semibold rounded-md hover:brightness-110 transition-all">Review</button>
                                                <button className="px-4 py-1.5 border border-border-dark-obsidian text-slate-300 text-xs font-semibold rounded-md hover:bg-white/5 transition-all">Decline</button>
                                            </div>
                                        )}

                                        {note.action && (
                                            <div className="mt-3 text-xs font-medium text-red-500 flex items-center gap-1 cursor-pointer hover:underline">
                                                <span>{note.action}</span>
                                                <span className="material-icons text-sm">chevron_right</span>
                                            </div>
                                        )}

                                        {note.type === 'success' && (
                                            <button className="mt-3 text-xs font-semibold text-blue-400 hover:text-blue-300">View Receipt</button>
                                        )}

                                        {note.type === 'mention' && (
                                            <button className="mt-3 px-3 py-1 border border-border-dark-obsidian text-slate-300 text-xs font-semibold rounded hover:bg-white/5 transition-all">Reply</button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="bg-black/20 py-4 text-center border-t border-border-dark-obsidian">
                        <Link
                            to="/notifications"
                            className="text-sm font-semibold text-blue-400 hover:text-blue-300 transition-colors inline-flex items-center gap-2"
                            onClick={() => setIsOpen(false)}
                        >
                            View all notifications
                            <span className="material-icons text-sm">arrow_forward</span>
                        </Link>
                    </div>
                </div>
            )}
        </div>
    );
};

export default NotificationDropdown;
