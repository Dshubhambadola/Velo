import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import { listRoles } from '../api/rbac';

const RolesOverview: React.FC = () => {
    const navigate = useNavigate();
    const [roles, setRoles] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchRoles = async () => {
            try {
                const data = await listRoles();
                setRoles(data.data);
            } catch (error) {
                console.error("Failed to fetch roles", error);
            } finally {
                setLoading(false);
            }
        };

        fetchRoles();
    }, []);

    return (
        <div className="flex h-screen bg-black text-white font-display overflow-hidden">
            <style>{`
                .neon-glow-blue { text-shadow: 0 0 8px rgba(19, 91, 236, 0.6); }
                .neon-glow-purple { text-shadow: 0 0 8px rgba(147, 51, 234, 0.6); }
                .neon-glow-green { text-shadow: 0 0 8px rgba(34, 197, 94, 0.6); }
                .shadow-neon-blue { box-shadow: 0 0 10px rgba(19, 91, 236, 0.4); }
                .shadow-neon-purple { box-shadow: 0 0 10px rgba(147, 51, 234, 0.4); }
                .shadow-brand-glow { box-shadow: 0 0 15px rgba(19, 91, 236, 0.5); }
                .custom-scrollbar::-webkit-scrollbar { width: 6px; }
                .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
                .custom-scrollbar::-webkit-scrollbar-thumb { background: #333; border-radius: 10px; }
            `}</style>

            <Sidebar />

            <main className="flex-1 flex flex-col overflow-y-auto custom-scrollbar bg-black relative">
                <header className="sticky top-0 z-30 w-full bg-black/80 backdrop-blur-md border-b border-[#262626]">
                    <div className="max-w-7xl mx-auto px-6 py-6">
                        <div className="flex items-center justify-between">
                            <div className="flex flex-col gap-1">
                                <nav className="flex items-center space-x-2 text-xs font-medium text-[#A0A0A0]">
                                    <a className="hover:text-[#135bec] transition-colors" href="#">Settings</a>
                                    <span className="material-icons text-[14px]">chevron_right</span>
                                    <a className="hover:text-[#135bec] transition-colors" href="#">User Management</a>
                                    <span className="material-icons text-[14px]">chevron_right</span>
                                    <span className="text-white">Roles</span>
                                </nav>
                                <h1 className="text-[32px] font-bold tracking-tight text-white leading-tight">Roles & Permissions</h1>
                            </div>
                            <button
                                onClick={() => navigate('/settings/roles/create')}
                                className="inline-flex items-center gap-2 bg-[#135bec] hover:bg-[#135bec]/90 text-white px-6 py-3 rounded-lg font-semibold shadow-brand-glow transition-all active:scale-95"
                            >
                                <span className="material-icons text-xl">add</span>
                                Create Custom Role
                            </button>
                        </div>
                    </div>
                </header>

                <div className="max-w-7xl mx-auto px-6 py-8 w-full">
                    <div className="flex items-center justify-between mb-8">
                        <div className="flex items-center gap-6">
                            <div className="flex items-center gap-2">
                                <span className="w-2.5 h-2.5 rounded-full bg-[#135bec] shadow-neon-blue"></span>
                                <span className="text-sm font-medium text-[#A0A0A0]">System Roles</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="w-2.5 h-2.5 rounded-full bg-purple-500 shadow-neon-purple"></span>
                                <span className="text-sm font-medium text-[#A0A0A0]">Privileged</span>
                            </div>
                            <div className="flex items-center gap-2 text-[#A0A0A0]/60">
                                <span className="text-sm font-medium italic">Showing {roles.length} Roles</span>
                            </div>
                        </div>
                        <div className="relative">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 material-icons text-[#A0A0A0]">search</span>
                            <input
                                className="pl-10 pr-4 py-2 bg-[#121212] border border-[#262626] rounded-lg text-sm text-white focus:ring-1 focus:ring-[#135bec] focus:border-[#135bec] w-64 placeholder-[#A0A0A0]/50 outline-none transition-all"
                                placeholder="Search roles..."
                                type="text"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {loading ? (
                            <div className="text-white">Loading roles...</div>
                        ) : (
                            roles.map((role: any) => (
                                <div key={role.ID} className={`group relative bg-[#121212] rounded-xl border border-[#262626] border-l-4 ${role.IsSystemRole ? 'border-l-[#135bec]' : 'border-l-[#A0A0A0]'} transition-all p-6 hover:translate-y-[-2px] hover:shadow-lg`}>
                                    <div className="flex justify-between items-start mb-4">
                                        <div className={`p-2 rounded-lg border ${role.IsSystemRole ? 'bg-[#135bec]/10 border-[#135bec]/20' : 'bg-[#262626]/50 border-[#262626]'}`}>
                                            <span className={`material-icons ${role.IsSystemRole ? 'text-[#135bec] neon-glow-blue' : 'text-[#A0A0A0]'}`}>
                                                {role.IsSystemRole ? 'security' : 'admin_panel_settings'}
                                            </span>
                                        </div>
                                        <div className="flex flex-col items-end gap-2">
                                            <span className={`px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider rounded-md border ${role.IsSystemRole ? 'bg-[#135bec]/20 text-[#135bec] border-[#135bec]/30' : 'bg-[#262626]/40 text-[#A0A0A0] border-[#262626]'}`}>
                                                {role.IsSystemRole ? 'System Role' : 'Custom Role'}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="mb-4">
                                        <h3 className="text-xl font-bold text-white">{role.Name}</h3>
                                        <p className="text-sm text-[#A0A0A0] mt-1">{role.Description || "No description provided."}</p>
                                    </div>
                                    <div className="space-y-4 mb-6">
                                        <div>
                                            <div className="flex justify-between text-xs font-semibold mb-2">
                                                <span className="text-[#A0A0A0]">Permissions</span>
                                                <span className="text-[#135bec] neon-glow-blue">?/15</span>
                                            </div>
                                            <div className="w-full bg-black h-1.5 rounded-full overflow-hidden border border-[#262626]">
                                                <div className="bg-[#135bec] h-full w-[50%] shadow-neon-blue"></div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="pt-6 border-t border-[#262626] flex items-center justify-between">
                                        <div className="flex -space-x-2">
                                            {/* Placeholder avatars for now */}
                                            <div className="h-8 w-8 rounded-full bg-black border border-[#262626] flex items-center justify-center text-[10px] font-bold text-[#A0A0A0] ring-2 ring-[#121212]">...</div>
                                        </div>
                                        <button className="text-[#135bec] text-sm font-semibold hover:text-white transition-colors">Edit Details</button>
                                    </div>
                                </div>
                            ))
                        )}

                        {/* Create Role Trigger */}
                        <div
                            onClick={() => navigate('/settings/roles/create')}
                            className="group relative bg-[#121212]/30 rounded-xl border-2 border-dashed border-[#262626] hover:border-[#135bec]/50 transition-all flex flex-col items-center justify-center p-8 text-center cursor-pointer hover:bg-[#121212]/60"
                        >
                            <div className="w-12 h-12 rounded-full bg-[#262626] flex items-center justify-center mb-4 group-hover:bg-[#135bec]/20 transition-colors">
                                <span className="material-icons text-[#A0A0A0] group-hover:text-[#135bec]">add_moderator</span>
                            </div>
                            <h3 className="text-lg font-semibold text-white">Create New Role</h3>
                            <p className="text-sm text-[#A0A0A0] mt-2 mb-6 max-w-[200px]">Define specific access levels and limits for your team members.</p>
                            <button className="text-sm font-bold text-[#135bec] px-4 py-2 border border-[#135bec]/40 rounded-lg hover:bg-[#135bec] hover:text-white transition-all">
                                Start Building
                            </button>
                        </div>
                    </div>
                </div>

                <footer className="max-w-7xl mx-auto px-6 py-12 w-full mt-auto">
                    <div className="bg-[#0a0f1a] rounded-xl p-6 flex items-start gap-4 border border-blue-900/30">
                        <span className="material-icons text-[#135bec] neon-glow-blue">info</span>
                        <div>
                            <h4 className="text-sm font-bold text-white">RBAC Security Policy</h4>
                            <p className="text-sm text-[#A0A0A0] mt-1">Changes to roles and permissions require dual-authorization by two Organization Owners. All modifications are logged in the <a className="underline font-medium text-[#135bec] hover:text-white transition-colors" href="#">Security Audit Trail</a>.</p>
                        </div>
                    </div>
                </footer>
            </main>
        </div>
    );
};

export default RolesOverview;
