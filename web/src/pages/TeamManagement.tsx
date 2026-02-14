import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import { listMembers } from '../api/team';

const TeamManagement: React.FC = () => {
    const navigate = useNavigate();
    const [members, setMembers] = useState<any[]>([]);
    // const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMembers = async () => {
            try {
                const data = await listMembers();
                // Map backend data to UI format
                // In a real app, backend should return this activity data or we calculate it
                const mappedMembers = data.data.map((u: any, index: number) => ({
                    id: u.ID,
                    name: u.FullName,
                    email: u.Email,
                    designation: u.UserRoles?.[0]?.Role?.Name || "Member",
                    status: u.EmailVerified ? "Active" : "Pending",
                    statusColor: u.EmailVerified ? "green" : "yellow",
                    activityScore: 50 + (index * 10) % 50, // Mock activity
                    activityLabel: "Standard",
                    lastSyncDate: new Date(u.UpdatedAt).toLocaleDateString(),
                    lastSyncTime: new Date(u.UpdatedAt).toLocaleTimeString(),
                    avatar: `https://ui-avatars.com/api/?name=${u.FullName}&background=random`
                }));
                setMembers(mappedMembers);
            } catch (error) {
                console.error("Failed to fetch members", error);
            } finally {
                // setLoading(false); // Can uncomment if loading state needed later
            }
        };

        fetchMembers();
    }, []);

    const [selectedMembers, setSelectedMembers] = useState<number[]>([1, 2]);

    const toggleSelection = (id: number) => {
        if (selectedMembers.includes(id)) {
            setSelectedMembers(selectedMembers.filter(mId => mId !== id));
        } else {
            setSelectedMembers([...selectedMembers, id]);
        }
    };

    // Helper to calculate stroke dash offset for activity ring
    const calculateDashOffset = (percentage: number) => {
        const circumference = 100.5; // 2 * pi * 16 approx
        return circumference - (percentage / 100) * circumference;
    };

    return (
        <div className="flex h-screen bg-black text-white font-display overflow-hidden">
            {/* Global Styles for this page */}
            <style>{`
                .custom-scrollbar::-webkit-scrollbar { width: 4px; }
                .custom-scrollbar::-webkit-scrollbar-track { background: #000000; }
                .custom-scrollbar::-webkit-scrollbar-thumb { background: #2D2D2D; border-radius: 10px; }
                .neon-glow-green { box-shadow: 0 0 10px rgba(34, 197, 94, 0.4); }
                .neon-glow-yellow { box-shadow: 0 0 10px rgba(234, 179, 8, 0.4); }
                .activity-ring { transform: rotate(-90deg); }
                /* Font import if needed, assuming global or Space Grotesk matches app */
            `}</style>

            <Sidebar />

            {/* Filter Sidebar (Secondary) */}
            <aside className="w-80 h-screen bg-[#121212] border-r border-[#2D2D2D] flex flex-col flex-shrink-0">
                <div className="p-6 flex items-center gap-3 border-b border-[#2D2D2D]">
                    <div className="w-8 h-8 bg-[#1e3fae] rounded-lg flex items-center justify-center">
                        <span className="material-icons text-white text-xl">security</span>
                    </div>
                    <h1 className="text-xl font-bold tracking-tight">VELO COMMAND</h1>
                </div>

                <div className="flex-1 overflow-y-auto custom-scrollbar p-6">
                    <div className="mb-8">
                        <h3 className="text-xs font-semibold text-[#A0A0A0] uppercase tracking-widest mb-4">Filters</h3>

                        {/* Search */}
                        <div className="relative mb-6">
                            <span className="material-icons absolute left-3 top-1/2 -translate-y-1/2 text-[#A0A0A0] text-sm">search</span>
                            <input
                                className="w-full bg-black border border-[#2D2D2D] rounded-lg pl-10 pr-4 py-2 text-sm focus:border-[#1e3fae] focus:ring-1 focus:ring-[#1e3fae] outline-none transition-all placeholder-[#A0A0A0] text-white"
                                placeholder="Global search..."
                                type="text"
                            />
                        </div>

                        {/* Departments */}
                        <div className="space-y-4 mb-8">
                            <label className="text-sm font-medium text-white">Department</label>
                            <div className="space-y-2">
                                <label className="flex items-center gap-3 cursor-pointer group">
                                    <input defaultChecked className="rounded border-[#2D2D2D] bg-black text-[#1e3fae] focus:ring-[#1e3fae] w-4 h-4" type="checkbox" />
                                    <span className="text-sm text-[#A0A0A0] group-hover:text-white transition-colors">Engineering</span>
                                </label>
                                <label className="flex items-center gap-3 cursor-pointer group">
                                    <input defaultChecked className="rounded border-[#2D2D2D] bg-black text-[#1e3fae] focus:ring-[#1e3fae] w-4 h-4" type="checkbox" />
                                    <span className="text-sm text-[#A0A0A0] group-hover:text-white transition-colors">Cybersecurity</span>
                                </label>
                                <label className="flex items-center gap-3 cursor-pointer group">
                                    <input className="rounded border-[#2D2D2D] bg-black text-[#1e3fae] focus:ring-[#1e3fae] w-4 h-4" type="checkbox" />
                                    <span className="text-sm text-[#A0A0A0] group-hover:text-white transition-colors">Operations</span>
                                </label>
                                <label className="flex items-center gap-3 cursor-pointer group">
                                    <input className="rounded border-[#2D2D2D] bg-black text-[#1e3fae] focus:ring-[#1e3fae] w-4 h-4" type="checkbox" />
                                    <span className="text-sm text-[#A0A0A0] group-hover:text-white transition-colors">Legal</span>
                                </label>
                            </div>
                        </div>

                        {/* Activity Range */}
                        <div className="space-y-4 mb-8">
                            <div className="flex justify-between items-center">
                                <label className="text-sm font-medium text-white">Activity Threshold</label>
                                <span className="text-xs text-[#1e3fae] font-bold">75+ %</span>
                            </div>
                            <input className="w-full accent-[#1e3fae] h-1 bg-black rounded-lg appearance-none cursor-pointer" type="range" />
                            <div className="flex justify-between text-[10px] text-[#A0A0A0]">
                                <span>0%</span>
                                <span>50%</span>
                                <span>100%</span>
                            </div>
                        </div>

                        {/* Roles */}
                        <div className="space-y-4">
                            <label className="text-sm font-medium text-white">Security Clearance</label>
                            <select className="w-full bg-black border border-[#2D2D2D] rounded-lg px-3 py-2 text-sm focus:border-[#1e3fae] outline-none text-[#A0A0A0]">
                                <option>All Clearances</option>
                                <option>Level 5 - Admin</option>
                                <option>Level 4 - Lead</option>
                                <option>Level 1 - Intern</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Footer User Profile */}
                <div className="p-6 border-t border-[#2D2D2D] bg-black/20">
                    <div className="flex items-center gap-3 mb-4">
                        <img
                            className="w-10 h-10 rounded-full border border-[#1e3fae]/50"
                            alt="Admin User"
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuA-RW13I0Spff90DEiyIQGFi30Wf_1MrCoIau5EMekXVuk-8I4E9Rdopp1PrD89FXg1M1Sf9V9n2KvO1rFKtcJdUB_z42PSmSnFlArhLJWfYvszh9E19edcUOzDX38hpRB_O8gM9tI8vB1M39ZbLFD1QePKFGodOH1V7f7AMvK7LV58Vua_aaU-pdXwWEtoGnCJAMDlO3piN43UcDKo_HVw3786UVrsrNOJsBF2aEGDjz-3QV3f7Qj7dQfVjFe9ank-dhIZoqtbNTCD"
                        />
                        <div>
                            <p className="text-sm font-bold text-white">Admin Console</p>
                            <p className="text-xs text-[#A0A0A0]">Level 5 Access</p>
                        </div>
                    </div>
                    <button
                        onClick={() => { alert("Logging out..."); navigate('/login'); }}
                        className="w-full flex items-center justify-center gap-2 bg-[#1e3fae]/10 hover:bg-[#1e3fae]/20 text-[#1e3fae] py-2 rounded-lg text-sm font-medium transition-all"
                    >
                        <span className="material-icons text-sm">logout</span>
                        Terminal Exit
                    </button>
                </div>
            </aside>

            <main className="flex-1 flex flex-col relative overflow-hidden bg-black">
                {/* Header */}
                <header className="p-8 pb-4 flex items-end justify-between">
                    <div>
                        <h2 className="text-3xl font-bold tracking-tight mb-1 text-white">Personnel Directory</h2>
                        <p className="text-[#A0A0A0] text-sm flex items-center gap-2">
                            <span className="inline-block w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                            248 Total Operatives Synchronized
                        </p>
                    </div>
                    <div className="flex gap-3">
                        <button
                            onClick={() => alert("Exporting PDF report...")}
                            className="flex items-center gap-2 bg-[#121212] border border-[#2D2D2D] px-4 py-2 rounded-lg text-sm text-white hover:bg-[#2D2D2D] transition-colors"
                        >
                            <span className="material-icons text-sm">download</span>
                            Export PDF
                        </button>
                        <button
                            onClick={() => navigate('/employees/invite')}
                            className="flex items-center gap-2 bg-[#1e3fae] hover:bg-blue-700 px-6 py-2 rounded-lg text-sm font-bold text-white shadow-lg shadow-[#1e3fae]/20 transition-all"
                        >
                            <span className="material-icons text-sm">person_add</span>
                            Onboard Member
                        </button>
                    </div>
                </header>

                {/* Table Container */}
                <div className="flex-1 p-8 pt-4 overflow-y-auto custom-scrollbar">
                    <div className="bg-[#121212] rounded-xl border border-[#2D2D2D] overflow-hidden">
                        <table className="w-full border-collapse">
                            <thead>
                                <tr className="text-left border-b border-[#2D2D2D] bg-black/40">
                                    <th className="p-4 w-12 text-center">
                                        <input className="rounded border-[#2D2D2D] bg-black text-[#1e3fae] focus:ring-[#1e3fae] w-4 h-4" type="checkbox" />
                                    </th>
                                    <th className="p-4 text-xs font-bold text-[#A0A0A0] uppercase tracking-wider">Member</th>
                                    <th className="p-4 text-xs font-bold text-[#A0A0A0] uppercase tracking-wider">Designation</th>
                                    <th className="p-4 text-xs font-bold text-[#A0A0A0] uppercase tracking-wider">Status</th>
                                    <th className="p-4 text-xs font-bold text-[#A0A0A0] uppercase tracking-wider">Activity Score</th>
                                    <th className="p-4 text-xs font-bold text-[#A0A0A0] uppercase tracking-wider">Last Sync</th>
                                    <th className="p-4 text-xs font-bold text-[#A0A0A0] uppercase tracking-wider"></th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-[#2D2D2D]/30">
                                {members.map((member) => (
                                    <tr key={member.id} className="group hover:bg-white/5 transition-colors">
                                        <td className="p-4 text-center">
                                            <input
                                                checked={selectedMembers.includes(member.id)}
                                                onChange={() => toggleSelection(member.id)}
                                                className="rounded border-[#2D2D2D] bg-black text-[#1e3fae] focus:ring-[#1e3fae] w-4 h-4"
                                                type="checkbox"
                                            />
                                        </td>
                                        <td className="p-4">
                                            <div className="flex items-center gap-3">
                                                <img
                                                    className="w-10 h-10 rounded-lg grayscale group-hover:grayscale-0 transition-all border border-[#2D2D2D]"
                                                    alt={member.name}
                                                    src={member.avatar}
                                                />
                                                <div>
                                                    <p className="font-bold text-white">{member.name}</p>
                                                    <p className="text-xs text-[#A0A0A0] font-light">{member.email}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="p-4">
                                            <span className="bg-[#1e3fae]/20 text-[#1e3fae] border border-[#1e3fae]/30 px-2 py-1 rounded text-[10px] font-bold uppercase">
                                                {member.designation}
                                            </span>
                                        </td>
                                        <td className="p-4">
                                            <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium 
                                                ${member.statusColor === 'green'
                                                    ? 'bg-green-500/10 text-green-500 border border-green-500/20 neon-glow-green'
                                                    : 'bg-yellow-500/10 text-yellow-500 border border-yellow-500/20 neon-glow-yellow'}`}>
                                                <span className={`w-1.5 h-1.5 rounded-full ${member.statusColor === 'green' ? 'bg-green-500' : 'bg-yellow-500'}`}></span>
                                                {member.status}
                                            </span>
                                        </td>
                                        <td className="p-4">
                                            <div className="flex items-center gap-3">
                                                <div className="relative w-10 h-10">
                                                    <svg className="activity-ring w-10 h-10">
                                                        <circle className="text-[#2D2D2D]" cx="20" cy="20" fill="transparent" r="16" stroke="currentColor" strokeWidth="2.5"></circle>
                                                        <circle
                                                            className="text-cyan-400"
                                                            cx="20" cy="20" fill="transparent" r="16" stroke="currentColor"
                                                            strokeDasharray="100.5"
                                                            strokeDashoffset={calculateDashOffset(member.activityScore)}
                                                            strokeWidth="2.5"
                                                        ></circle>
                                                    </svg>
                                                    <span className="absolute inset-0 flex items-center justify-center text-[10px] font-bold text-cyan-400">
                                                        {member.activityScore}%
                                                    </span>
                                                </div>
                                                <span className="text-xs text-[#A0A0A0]">{member.activityLabel}</span>
                                            </div>
                                        </td>
                                        <td className="p-4">
                                            <p className="text-sm text-[#A0A0A0]">{member.lastSyncDate}</p>
                                            <p className="text-[10px] text-[#2D2D2D]">{member.lastSyncTime}</p>
                                        </td>
                                        <td className="p-4 text-right">
                                            <button className="text-[#A0A0A0] hover:text-white transition-colors">
                                                <span className="material-icons">more_vert</span>
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Table Pagination */}
                    <div className="mt-4 flex items-center justify-between">
                        <p className="text-sm text-[#A0A0A0] italic">Showing <span className="text-white font-bold">1-12</span> of 248 operatives</p>
                        <div className="flex gap-2">
                            <button className="w-8 h-8 flex items-center justify-center rounded border border-[#2D2D2D] bg-[#121212] text-[#A0A0A0] hover:text-white transition-all">
                                <span className="material-icons text-sm">chevron_left</span>
                            </button>
                            <button className="w-8 h-8 flex items-center justify-center rounded border border-[#1e3fae] bg-[#1e3fae]/10 text-white font-bold transition-all">1</button>
                            <button className="w-8 h-8 flex items-center justify-center rounded border border-[#2D2D2D] bg-[#121212] text-[#A0A0A0] hover:text-white transition-all">2</button>
                            <button className="w-8 h-8 flex items-center justify-center rounded border border-[#2D2D2D] bg-[#121212] text-[#A0A0A0] hover:text-white transition-all">3</button>
                            <button className="w-8 h-8 flex items-center justify-center rounded border border-[#2D2D2D] bg-[#121212] text-[#A0A0A0] hover:text-white transition-all">
                                <span className="material-icons text-sm">chevron_right</span>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Bulk Actions Floating Bar */}
                {selectedMembers.length > 0 && (
                    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 w-fit">
                        <div className="bg-[#121212]/95 backdrop-blur-md border border-[#1e3fae]/40 rounded-full px-6 py-4 flex items-center gap-8 shadow-2xl shadow-[#1e3fae]/20 ring-1 ring-white/10">
                            <div className="flex items-center gap-4 pr-8 border-r border-[#2D2D2D]">
                                <div className="w-8 h-8 bg-[#1e3fae] rounded-full flex items-center justify-center text-xs font-bold text-white">
                                    {selectedMembers.length}
                                </div>
                                <span className="text-sm font-medium text-white">Operatives Selected</span>
                            </div>
                            <div className="flex items-center gap-4">
                                <button className="flex items-center gap-2 hover:text-[#1e3fae] transition-colors text-sm text-[#A0A0A0]" onClick={() => alert("Change status dialog...")}>
                                    <span className="material-icons text-lg">sync_alt</span>
                                    Change Status
                                </button>
                                <button className="flex items-center gap-2 hover:text-[#1e3fae] transition-colors text-sm text-[#A0A0A0]" onClick={() => alert("Assign team dialog...")}>
                                    <span className="material-icons text-lg">groups</span>
                                    Assign Team
                                </button>
                                <button className="flex items-center gap-2 hover:text-[#1e3fae] transition-colors text-sm text-[#A0A0A0]" onClick={() => alert("Exporting CSV...")}>
                                    <span className="material-icons text-lg">file_download</span>
                                    Export CSV
                                </button>
                                <button className="flex items-center gap-2 bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white px-4 py-2 rounded-full text-sm font-bold transition-all" onClick={() => alert("Terminating selected users...")}>
                                    <span className="material-icons text-lg">delete_sweep</span>
                                    Terminate
                                </button>
                                <button
                                    onClick={() => { setSelectedMembers([]); alert("Actions applied!"); }}
                                    className="bg-[#1e3fae] hover:bg-blue-700 text-white px-6 py-2 rounded-full text-sm font-bold shadow-lg shadow-[#1e3fae]/30 transition-all"
                                >
                                    Apply Actions
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
};

export default TeamManagement;
