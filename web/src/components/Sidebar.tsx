import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Sidebar: React.FC = () => {
    const location = useLocation();

    const isActive = (path: string) => location.pathname === path;

    return (
        <aside className="w-64 bg-surface-dark border-r border-border-dark flex flex-col shrink-0">
            <div className="p-6 flex items-center gap-3">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-xl italic">V</span>
                </div>
                <span className="text-white font-semibold text-lg tracking-tight">Velo Payroll</span>
            </div>

            <nav className="flex-1 px-4 space-y-1">
                <Link
                    to="/dashboard"
                    className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${isActive('/dashboard')
                        ? 'text-white bg-primary/10 border border-primary/20'
                        : 'text-slate-400 hover:text-white hover:bg-white/5'
                        }`}
                >
                    <span className={`material-icons text-xl ${isActive('/dashboard') ? 'text-primary' : ''}`}>dashboard</span>
                    <span className="text-sm font-medium">Dashboard</span>
                </Link>

                <Link
                    to="/payroll"
                    className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${isActive('/payroll')
                        ? 'text-white bg-primary/10 border border-primary/20'
                        : 'text-slate-400 hover:text-white hover:bg-white/5'
                        }`}
                >
                    <span className={`material-icons text-xl ${isActive('/payroll') ? 'text-primary' : ''}`}>account_tree</span>
                    <span className="text-sm font-medium">Payroll Batches</span>
                </Link>

                <Link
                    to="/employees"
                    className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${isActive('/employees')
                        ? 'text-white bg-primary/10 border border-primary/20'
                        : 'text-slate-400 hover:text-white hover:bg-white/5'
                        }`}
                >
                    <span className={`material-icons text-xl ${isActive('/employees') ? 'text-primary' : ''}`}>people</span>
                    <span className="text-sm font-medium">Employees</span>
                </Link>

                <Link
                    to="/wallets"
                    className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${isActive('/wallets')
                        ? 'text-white bg-primary/10 border border-primary/20'
                        : 'text-slate-400 hover:text-white hover:bg-white/5'
                        }`}
                >
                    <span className={`material-icons text-xl ${isActive('/wallets') ? 'text-primary' : ''}`}>account_balance_wallet</span>
                    <span className="text-sm font-medium">Wallets</span>
                </Link>

                <Link
                    to="/reports"
                    className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${isActive('/reports')
                        ? 'text-white bg-primary/10 border border-primary/20'
                        : 'text-slate-400 hover:text-white hover:bg-white/5'
                        }`}
                >
                    <span className={`material-icons text-xl ${isActive('/reports') ? 'text-primary' : ''}`}>assessment</span>
                    <span className="text-sm font-medium">Reports</span>
                </Link>

                <div className="pt-4 pb-2 px-3 text-xs font-semibold text-slate-600 uppercase tracking-wider">Infrastructure</div>

                <Link
                    to="/api-keys"
                    className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${isActive('/api-keys')
                        ? 'text-white bg-primary/10 border border-primary/20'
                        : 'text-slate-400 hover:text-white hover:bg-white/5'
                        }`}
                >
                    <span className={`material-icons text-xl ${isActive('/api-keys') ? 'text-primary' : ''}`}>api</span>
                    <span className="text-sm font-medium">API Keys</span>
                </Link>

                <Link
                    to="/webhooks"
                    className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${isActive('/webhooks')
                        ? 'text-white bg-primary/10 border border-primary/20'
                        : 'text-slate-400 hover:text-white hover:bg-white/5'
                        }`}
                >
                    <span className={`material-icons text-xl ${isActive('/webhooks') ? 'text-primary' : ''}`}>webhook</span>
                    <span className="text-sm font-medium">Webhooks</span>
                </Link>

                <Link
                    to="/settings"
                    className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${isActive('/settings')
                        ? 'text-white bg-primary/10 border border-primary/20'
                        : 'text-slate-400 hover:text-white hover:bg-white/5'
                        }`}
                >
                    <span className={`material-icons text-xl ${isActive('/settings') ? 'text-primary' : ''}`}>settings</span>
                    <span className="text-sm font-medium">Settings</span>
                </Link>
            </nav>

            <div className="p-4 border-t border-border-dark">
                <div className="bg-black/40 rounded-lg p-3 border border-border-dark">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-[10px] font-bold text-slate-500 uppercase">System Load</span>
                        <div className="w-2 h-2 bg-green-500 rounded-full shadow-[0_0_10px_rgba(34,197,94,0.3)]"></div>
                    </div>
                    <div className="w-full bg-border-dark h-1 rounded-full overflow-hidden">
                        <div className="bg-primary w-1/3 h-full"></div>
                    </div>
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;
