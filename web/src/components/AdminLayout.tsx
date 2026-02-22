import { Link, Outlet, useLocation } from 'react-router-dom';
import { clsx } from 'clsx';
import {
    HomeIcon,
    UsersIcon,
    ShieldCheckIcon,
    BanknotesIcon,
    ClipboardDocumentListIcon,
    ArrowRightOnRectangleIcon,
} from '@heroicons/react/24/outline'; // v2 outline icons

const navigation = [
    { name: 'Dashboard', href: '/admin', icon: HomeIcon },
    { name: 'Users', href: '/admin/users', icon: UsersIcon },
    { name: 'Compliance Queue', href: '/admin/compliance', icon: ShieldCheckIcon },
    { name: 'Transactions', href: '/admin/transactions', icon: BanknotesIcon },
    { name: 'Audit Logs', href: '/admin/audit', icon: ClipboardDocumentListIcon },
];

export default function AdminLayout() {
    const location = useLocation();

    return (
        <div className="min-h-screen bg-gray-900 text-white flex">
            {/* Sidebar */}
            <div className="w-64 bg-gray-800 border-r border-gray-700 flex flex-col">
                <div className="h-16 flex items-center px-6 border-b border-gray-700">
                    <span className="text-xl font-bold bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">
                        Velo Admin
                    </span>
                </div>

                <nav className="flex-1 px-4 py-6 space-y-1">
                    {navigation.map((item) => {
                        const isActive = location.pathname === item.href;
                        return (
                            <Link
                                key={item.name}
                                to={item.href}
                                className={clsx(
                                    isActive
                                        ? 'bg-gray-700 text-white'
                                        : 'text-gray-400 hover:bg-gray-700 hover:text-white',
                                    'group flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors'
                                )}
                            >
                                <item.icon
                                    className={clsx(
                                        isActive ? 'text-white' : 'text-gray-400 group-hover:text-white',
                                        'mr-3 flex-shrink-0 h-6 w-6'
                                    )}
                                    aria-hidden="true"
                                />
                                {item.name}
                            </Link>
                        );
                    })}
                </nav>

                <div className="p-4 border-t border-gray-700">
                    <Link
                        to="/logout"
                        className="group flex items-center px-3 py-2 text-sm font-medium text-gray-400 rounded-md hover:bg-gray-700 hover:text-white"
                    >
                        <ArrowRightOnRectangleIcon
                            className="mr-3 flex-shrink-0 h-6 w-6 text-gray-400 group-hover:text-white"
                            aria-hidden="true"
                        />
                        Logout
                    </Link>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col overflow-hidden">
                <main className="flex-1 overflow-y-auto p-8">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}
