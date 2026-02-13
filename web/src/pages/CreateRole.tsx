import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { createRole, listPermissions } from '../api/rbac';

const CreateRole: React.FC = () => {
    const navigate = useNavigate();
    const [step, setStep] = useState<number>(1);
    const [roleName, setRoleName] = useState('');
    const [roleDescription, setRoleDescription] = useState('');
    const [availablePermissions, setAvailablePermissions] = useState<any[]>([]);
    const [selectedPermissions, setSelectedPermissions] = useState<string[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchPermissions = async () => {
            try {
                const data = await listPermissions();
                setAvailablePermissions(data.data);
            } catch (error) {
                console.error("Failed to fetch permissions", error);
            }
        };
        fetchPermissions();
    }, []);

    const handleCreateRole = async () => {
        setLoading(true);
        try {
            await createRole(roleName, roleDescription, selectedPermissions);
            navigate('/settings/roles'); // Redirect after success
        } catch (error) {
            console.error("Failed to create role", error);
            alert("Failed to create role. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const togglePermission = (permissionId: string) => {
        setSelectedPermissions(prev =>
            prev.includes(permissionId)
                ? prev.filter(id => id !== permissionId)
                : [...prev, permissionId]
        );
    };

    return (
        <div className="bg-black font-display min-h-screen flex items-center justify-center p-4">
            <style>{`
                .custom-scrollbar::-webkit-scrollbar { width: 6px; }
                .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
                .custom-scrollbar::-webkit-scrollbar-thumb { background: #333; border-radius: 10px; }
                .custom-scrollbar:hover::-webkit-scrollbar-thumb { background: #444; }
                .neon-glow-primary { box-shadow: 0 0 10px rgba(19, 236, 91, 0.4); }
                .backdrop-blur-custom { backdrop-filter: blur(12px); background-color: rgba(0, 0, 0, 0.85); }
            `}</style>

            <div className="bg-[#121212] border border-[#27272a] w-full max-w-[1000px] h-[750px] shadow-[0_0_50px_rgba(0,0,0,0.5)] rounded-xl overflow-hidden flex flex-col font-display">
                {/* Header */}
                <div className="px-8 py-6 border-b border-[#27272a] flex flex-col gap-6">
                    <div className="flex justify-between items-center">
                        <div>
                            <h1 className="text-xl font-bold text-white">Create Custom Role</h1>
                            <p className="text-sm text-[#a0a0a0]">Step {step} of 4: Permission Selection</p>
                        </div>
                        <button onClick={() => navigate('/settings/roles')} className="text-[#71717a] hover:text-white transition-colors">
                            <span className="material-icons">close</span>
                        </button>
                    </div>
                    {/* Stepper */}
                    <div className="flex items-center justify-between w-full max-w-2xl mx-auto">
                        <div className="flex flex-col items-center gap-2 group cursor-pointer" onClick={() => setStep(1)}>
                            <div className="w-8 h-8 rounded-full bg-[#13ec5b] text-[#121212] border-2 border-[#13ec5b] flex items-center justify-center text-sm font-bold">
                                <span className="material-icons text-sm font-black">check</span>
                            </div>
                            <span className="text-[11px] font-bold uppercase tracking-wider text-[#13ec5b]">Role Info</span>
                        </div>
                        <div className="h-[2px] flex-1 bg-[#13ec5b] mx-4"></div>
                        <div className="flex flex-col items-center gap-2">
                            <div className="w-8 h-8 rounded-full bg-white text-[#121212] flex items-center justify-center text-sm font-bold shadow-[0_0_15px_rgba(255,255,255,0.3)]">2</div>
                            <span className="text-[11px] font-bold uppercase tracking-wider text-white">Permissions</span>
                        </div>
                        <div className="h-[2px] flex-1 bg-[#27272a] mx-4"></div>
                        <div className="flex flex-col items-center gap-2 text-[#71717a]">
                            <div className="w-8 h-8 rounded-full bg-[#27272a] text-[#71717a] flex items-center justify-center text-sm font-bold">3</div>
                            <span className="text-[11px] font-bold uppercase tracking-wider">Users</span>
                        </div>
                        <div className="h-[2px] flex-1 bg-[#27272a] mx-4"></div>
                        <div className="flex flex-col items-center gap-2 text-[#71717a]">
                            <div className="w-8 h-8 rounded-full bg-[#27272a] text-[#71717a] flex items-center justify-center text-sm font-bold">4</div>
                            <span className="text-[11px] font-bold uppercase tracking-wider">Review</span>
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                <div className="flex-1 flex overflow-hidden">
                    {/* Sidebar Nav - Only show for Step 2 for now, or maybe always? keeping it simple for now */}

                    {step === 1 && (
                        <div className="p-8 w-full max-w-2xl mx-auto">
                            <h2 className="text-2xl font-bold text-white mb-6">Role Information</h2>
                            <div className="space-y-6">
                                <div>
                                    <label className="block text-sm font-medium text-[#a0a0a0] mb-2">Role Name</label>
                                    <input
                                        type="text"
                                        value={roleName}
                                        onChange={(e) => setRoleName(e.target.value)}
                                        className="w-full bg-[#181818] border border-[#27272a] rounded-lg px-4 py-3 text-white focus:border-[#13ec5b] outline-none transition-colors"
                                        placeholder="e.g. Senior Accountant"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-[#a0a0a0] mb-2">Description</label>
                                    <textarea
                                        value={roleDescription}
                                        onChange={(e) => setRoleDescription(e.target.value)}
                                        className="w-full bg-[#181818] border border-[#27272a] rounded-lg px-4 py-3 text-white focus:border-[#13ec5b] outline-none transition-colors h-32 resize-none"
                                        placeholder="Describe the responsibilities of this role..."
                                    />
                                </div>
                            </div>
                        </div>
                    )}

                    {step === 2 && (
                        <>
                            {/* Permission Settings */}
                            <div className="flex-1 overflow-y-auto custom-scrollbar p-8 bg-[#121212]">
                                <div className="flex items-center justify-between mb-8">
                                    <div>
                                        <h2 className="text-lg font-bold text-white">Permissions</h2>
                                        <p className="text-xs text-[#a0a0a0]">Configure access levels for this role.</p>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    {availablePermissions.map(perm => (
                                        <div key={perm.ID}
                                            onClick={() => togglePermission(perm.ID)}
                                            className={`p-5 bg-[#181818] border rounded-xl cursor-pointer transition-all ${selectedPermissions.includes(perm.ID) ? 'border-[#13ec5b]/60 bg-[#13ec5b]/5' : 'border-[#27272a] hover:border-[#13ec5b]/40'}`}>
                                            <div className="flex items-start justify-between">
                                                <div className="flex items-start gap-4">
                                                    <div className={`w-10 h-10 rounded-lg border flex items-center justify-center ${selectedPermissions.includes(perm.ID) ? 'bg-[#13ec5b]/10 border-[#13ec5b]/20 text-[#13ec5b]' : 'bg-[#18181b] border-[#27272a] text-[#52525b]'}`}>
                                                        <span className="material-icons">verified_user</span>
                                                    </div>
                                                    <div>
                                                        <h3 className="text-sm font-bold text-white">{perm.Name}</h3>
                                                        <p className="text-xs text-[#a0a0a0] mt-0.5 leading-relaxed">{perm.Description}</p>
                                                    </div>
                                                </div>
                                                <button className={`w-10 h-5 rounded-full relative flex items-center transition-all ${selectedPermissions.includes(perm.ID) ? 'bg-[#13ec5b] shadow-[0_0_10px_rgba(19,236,91,0.3)]' : 'bg-[#27272a]'}`}>
                                                    <div className={`absolute w-3 h-3 bg-[#121212] rounded-full transition-all ${selectedPermissions.includes(perm.ID) ? 'right-1' : 'left-1'}`}></div>
                                                </button>
                                            </div>
                                        </div>
                                    ))}

                                    {availablePermissions.length === 0 && (
                                        <div className="text-[#a0a0a0] text-center p-8">No permissions found via API.</div>
                                    )}
                                </div>
                            </div>
                        </>
                    )}

                    {step === 3 && (
                        <div className="p-8 w-full max-w-2xl mx-auto text-center">
                            <h2 className="text-2xl font-bold text-white mb-4">Assign Users</h2>
                            <p className="text-[#a0a0a0]">User assignment is not yet implemented in this wizard. You can assign users after creating the role.</p>
                        </div>
                    )}

                    {step === 4 && (
                        <div className="p-8 w-full max-w-2xl mx-auto">
                            <h2 className="text-2xl font-bold text-white mb-6">Review Role</h2>
                            <div className="bg-[#181818] rounded-xl p-6 border border-[#27272a] space-y-4">
                                <div>
                                    <div className="text-xs text-[#a0a0a0] uppercase tracking-wider mb-1">Role Name</div>
                                    <div className="text-xl font-bold text-white">{roleName}</div>
                                </div>
                                <div>
                                    <div className="text-xs text-[#a0a0a0] uppercase tracking-wider mb-1">Description</div>
                                    <div className="text-sm text-[#e4e4e7]">{roleDescription}</div>
                                </div>
                                <div>
                                    <div className="text-xs text-[#a0a0a0] uppercase tracking-wider mb-1">Permissions ({selectedPermissions.length})</div>
                                    <div className="flex flex-wrap gap-2 mt-2">
                                        {selectedPermissions.map(id => {
                                            const perm = availablePermissions.find(p => p.ID === id);
                                            return perm ? (
                                                <span key={id} className="px-2 py-1 bg-[#13ec5b]/10 text-[#13ec5b] text-xs font-bold rounded border border-[#13ec5b]/20">
                                                    {perm.Name}
                                                </span>
                                            ) : null;
                                        })}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                </div>

                {/* Footer Actions */}
                <div className="px-8 py-5 border-t border-[#27272a] flex justify-between items-center bg-[#181818]">
                    <button
                        onClick={() => setStep(Math.max(1, step - 1))}
                        disabled={step === 1}
                        className="px-4 py-2 text-sm font-bold text-[#a0a0a0] hover:text-white transition-colors flex items-center gap-2 group disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <span className="material-icons text-sm transition-transform group-hover:-translate-x-1">arrow_back</span>
                        Previous Step
                    </button>
                    <div className="flex gap-4">
                        {step < 4 ? (
                            <button
                                onClick={() => setStep(step + 1)}
                                disabled={step === 1 && !roleName}
                                className="px-8 py-2.5 bg-[#13ec5b] text-[#121212] font-bold rounded-lg shadow-[0_0_20px_rgba(19,236,91,0.2)] hover:shadow-[0_0_30px_rgba(19,236,91,0.4)] transition-all flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                Next Step
                                <span className="material-icons text-sm font-black">arrow_forward</span>
                            </button>
                        ) : (
                            <button
                                onClick={handleCreateRole}
                                disabled={loading}
                                className="px-8 py-2.5 bg-[#13ec5b] text-[#121212] font-bold rounded-lg shadow-[0_0_20px_rgba(19,236,91,0.2)] hover:shadow-[0_0_30px_rgba(19,236,91,0.4)] transition-all flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {loading ? 'Creating...' : 'Create Role'}
                                {!loading && <span className="material-icons text-sm font-black">check</span>}
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreateRole;
