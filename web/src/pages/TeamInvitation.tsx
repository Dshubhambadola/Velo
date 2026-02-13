import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { inviteMember } from '../api/team';

const TeamInvitation: React.FC = () => {
    const navigate = useNavigate();
    const [step, setStep] = useState<number>(0);
    const [method, setMethod] = useState<'single' | 'bulk'>('single');

    // Form Data State for Single Invite
    const [formData, setFormData] = useState({
        email: "alex.rivera@company.com",
        firstName: "Alex",
        lastName: "Rivera",
        role: "Finance Manager",
        department: "Finance Operations",
        expiry: "7 days",
        message: ""
    });

    const handleMethodSelect = (selected: 'single' | 'bulk') => {
        setMethod(selected);
        setStep(1);
    };

    const [loading, setLoading] = useState(false);

    const handleFormSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setStep(2); // Review Step
    };

    const handleReviewConfirm = async () => {
        setLoading(true);
        try {
            await inviteMember(formData.email, `${formData.firstName} ${formData.lastName}`, formData.role, formData.message);
            setStep(3); // Success Step
        } catch (error) {
            console.error("Failed to invite member", error);
            alert("Failed to send invitation. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const handleBulkUpload = () => {
        // Simulate upload
        setTimeout(() => {
            setStep(3); // Go to success directly for bulk
        }, 1000);
    };

    // Step 0: Method Selection
    if (step === 0) {
        return (
            <div className="font-display min-h-screen bg-[#000000] text-[#FFFFFF] flex items-center justify-center p-4">
                <style>{`
                    .custom-scrollbar::-webkit-scrollbar { width: 4px; }
                    .custom-scrollbar::-webkit-scrollbar-track { background: #121212; }
                    .custom-scrollbar::-webkit-scrollbar-thumb { background: #262626; border-radius: 10px; }
                `}</style>
                <div className="max-w-[700px] w-full bg-[#121212] border border-[#262626] shadow-2xl rounded-xl overflow-hidden">
                    <div className="px-8 pt-8 pb-4 relative">
                        <div className="flex justify-between items-center mb-8">
                            <div className="flex items-center gap-2">
                                <div className="w-8 h-8 bg-[#1E40AF] rounded-lg flex items-center justify-center shadow-lg shadow-blue-900/20">
                                    <span className="text-white font-bold text-lg">V</span>
                                </div>
                                <span className="font-bold text-xl tracking-tight text-white">Velo</span>
                            </div>
                            <div className="flex items-center gap-4">
                                <span className="text-[10px] font-bold text-[#1E40AF] uppercase tracking-[0.1em] bg-[#1E40AF]/10 px-2 py-1 rounded">Step 1 of 3</span>
                                <div className="flex gap-1.5">
                                    <div className="w-8 h-1 rounded-full bg-[#1E40AF]"></div>
                                    <div className="w-8 h-1 rounded-full bg-[#262626]"></div>
                                    <div className="w-8 h-1 rounded-full bg-[#262626]"></div>
                                </div>
                            </div>
                        </div>
                        <div className="text-center">
                            <h1 className="text-2xl font-bold text-white mb-2">Invite Team Member</h1>
                            <p className="text-[#A0A0A0] max-w-md mx-auto text-sm leading-relaxed">Select how you'd like to add members to your organization. You can customize permissions in the next step.</p>
                        </div>
                    </div>
                    <div className="px-8 py-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <button
                                onClick={() => handleMethodSelect('single')}
                                className="group relative flex flex-col text-left p-6 bg-[#181818] border-2 border-[#1E40AF] rounded-xl transition-all duration-200 hover:bg-[#1c1c1c] focus:outline-none"
                            >
                                <div className="absolute top-4 right-4 text-[#1E40AF]">
                                    <span className="material-icons text-xl">check_circle</span>
                                </div>
                                <div className="w-12 h-12 bg-[#1E40AF]/20 rounded-lg flex items-center justify-center mb-4 border border-[#1E40AF]/30">
                                    <span className="material-icons text-[#1E40AF]">person_add</span>
                                </div>
                                <h3 className="text-lg font-bold text-white mb-2">Single Invitation</h3>
                                <p className="text-sm text-[#A0A0A0] leading-relaxed">Add one member at a time and configure custom permissions for their specific role.</p>
                            </button>
                            <button
                                onClick={() => handleMethodSelect('bulk')}
                                className="group relative flex flex-col text-left p-6 bg-[#181818] border-2 border-[#262626] rounded-xl transition-all duration-200 hover:border-[#1E40AF]/50 hover:bg-[#1c1c1c] focus:outline-none"
                            >
                                <div className="w-12 h-12 bg-white/5 rounded-lg flex items-center justify-center mb-4 border border-[#262626] group-hover:bg-[#1E40AF]/10 transition-colors">
                                    <span className="material-icons text-white group-hover:text-[#1E40AF] transition-colors">group_add</span>
                                </div>
                                <h3 className="text-lg font-bold text-white mb-2">Bulk Upload</h3>
                                <p className="text-sm text-[#A0A0A0] leading-relaxed">Import multiple members via CSV file for faster onboarding. Perfect for departments.</p>
                            </button>
                        </div>
                    </div>
                    <div className="px-8 pb-4">
                        <div className="bg-[#1a1a1a] border border-[#262626] rounded-xl p-5 flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-full bg-[#1E40AF]/10 flex items-center justify-center">
                                    <span className="material-icons text-[#1E40AF]">link</span>
                                </div>
                                <div>
                                    <p className="text-sm font-semibold text-white">Need to share a link instead?</p>
                                    <p className="text-xs text-[#A0A0A0]">Perfect for internal messaging channels.</p>
                                </div>
                            </div>
                            <button className="text-sm font-bold text-[#1E40AF] hover:text-blue-400 transition-colors px-4 py-2 bg-[#1E40AF]/5 rounded-lg border border-[#1E40AF]/20">
                                Generate invitation link
                            </button>
                        </div>
                    </div>
                    <div className="px-8 py-6 bg-[#0a0a0a] flex items-center justify-between border-t border-[#262626]">
                        <button onClick={() => navigate('/employees')} className="px-4 py-2 text-sm font-semibold text-[#A0A0A0] hover:text-white transition-colors">
                            Cancel
                        </button>
                        <div className="flex gap-4">
                            <button
                                onClick={() => handleMethodSelect('single')}
                                className="px-8 py-3 bg-[#1E40AF] text-white font-bold rounded-lg hover:bg-blue-700 transition-all shadow-lg shadow-blue-900/20 flex items-center gap-2"
                            >
                                Continue
                                <span className="material-icons text-sm">arrow_forward</span>
                            </button>
                        </div>
                    </div>
                    <div className="fixed top-0 left-0 w-full h-full -z-10 pointer-events-none overflow-hidden">
                        <div className="absolute -top-48 -left-48 w-[600px] h-[600px] bg-[#1E40AF]/10 rounded-full blur-[120px]"></div>
                        <div className="absolute -bottom-48 -right-48 w-[500px] h-[500px] bg-purple-900/10 rounded-full blur-[120px]"></div>
                    </div>
                </div>
            </div>
        );
    }

    // Step 1: Single Form
    if (step === 1 && method === 'single') {
        return (
            <div className="font-display min-h-screen bg-[#000000] text-[#FFFFFF] flex items-center justify-center p-4">
                <div className="max-w-[700px] w-full bg-[#121212] shadow-2xl rounded-xl overflow-hidden border border-[#262626]">
                    <div className="px-8 pt-8 pb-4">
                        <div className="flex items-center justify-between mb-6">
                            <button onClick={() => setStep(0)} className="flex items-center text-[#A0A0A0] hover:text-white transition-colors text-sm font-medium">
                                <span className="material-icons text-lg mr-1">arrow_back</span>
                                Back
                            </button>
                            <div className="flex items-center gap-2">
                                <div className="h-1.5 w-12 rounded-full bg-[#1E40AF]/20">
                                    <div className="h-full w-full bg-[#1E40AF] rounded-full shadow-[0_0_8px_rgba(30,64,175,0.5)]"></div>
                                </div>
                                <div className="h-1.5 w-12 rounded-full bg-[#1E40AF]/20">
                                    <div className="h-full w-full bg-[#1E40AF] rounded-full shadow-[0_0_8px_rgba(30,64,175,0.5)]"></div>
                                </div>
                                <div className="h-1.5 w-12 rounded-full bg-white/10"></div>
                            </div>
                        </div>
                        <h1 className="text-2xl font-bold text-white mb-1">Invite Team Member</h1>
                        <p className="text-[#A0A0A0] text-sm">Step 2 of 3: Configure member access and permissions.</p>
                    </div>
                    <form className="px-8 pb-8 space-y-8" onSubmit={handleFormSubmit}>
                        <section>
                            <h2 className="text-xs font-semibold uppercase tracking-wider text-[#A0A0A0]/60 mb-4">Member Information</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="md:col-span-2 relative">
                                    <label className="block text-sm font-medium text-[#A0A0A0] mb-1.5">Email Address</label>
                                    <div className="relative">
                                        <input
                                            className="w-full bg-transparent border border-white/20 rounded-lg py-2.5 px-4 focus:ring-1 focus:ring-[#1E40AF] focus:border-[#1E40AF] transition-all text-sm text-white outline-none placeholder:text-[#A0A0A0]/40"
                                            placeholder="Enter email address"
                                            type="email"
                                            value={formData.email}
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        />
                                        <span className="absolute right-3 top-1/2 -translate-y-1/2 material-icons text-green-500 text-xl">check_circle</span>
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-[#A0A0A0] mb-1.5">First Name</label>
                                    <input
                                        className="w-full bg-transparent border border-white/20 rounded-lg py-2.5 px-4 focus:ring-1 focus:ring-[#1E40AF] focus:border-[#1E40AF] transition-all text-sm text-white outline-none"
                                        type="text"
                                        value={formData.firstName}
                                        onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-[#A0A0A0] mb-1.5">Last Name</label>
                                    <input
                                        className="w-full bg-transparent border border-white/20 rounded-lg py-2.5 px-4 focus:ring-1 focus:ring-[#1E40AF] focus:border-[#1E40AF] transition-all text-sm text-white outline-none"
                                        type="text"
                                        value={formData.lastName}
                                        onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                                    />
                                </div>
                            </div>
                        </section>
                        <section>
                            <div className="flex justify-between items-end mb-4">
                                <h2 className="text-xs font-semibold uppercase tracking-wider text-[#A0A0A0]/60">Role Assignment</h2>
                                <a className="text-[#1E40AF] text-xs font-medium hover:text-white transition-colors" href="#">View Role Matrix</a>
                            </div>
                            <div className="space-y-3">
                                <div
                                    className={`relative flex items-center p-4 rounded-xl border cursor-pointer transition-all bg-transparent ${formData.role === 'Owner' ? 'border-[#1E40AF] bg-[#1E40AF]/10' : 'border-white/10 hover:border-white/20'}`}
                                    onClick={() => setFormData({ ...formData, role: 'Owner' })}
                                >
                                    <div className="h-5 w-5 rounded-full border border-white/30 flex-shrink-0"></div>
                                    <div className="ml-4">
                                        <span className="block text-sm font-semibold text-white">Owner</span>
                                        <span className="block text-xs text-[#A0A0A0]">Full access to all features and billing controls.</span>
                                    </div>
                                </div>
                                <div
                                    className={`relative p-4 rounded-xl border-2 transition-all cursor-pointer ${formData.role === 'Finance Manager' ? 'border-[#1E40AF] bg-[#1E40AF]/10 shadow-[0_0_15px_rgba(30,64,175,0.15)]' : 'border-white/10 hover:border-white/20'}`}
                                    onClick={() => setFormData({ ...formData, role: 'Finance Manager' })}
                                >
                                    <div className="flex items-center">
                                        <div className="h-5 w-5 rounded-full bg-[#1E40AF] flex-shrink-0 flex items-center justify-center shadow-[0_0_10px_rgba(30,64,175,0.6)]">
                                            <span className="material-icons text-white text-[14px]">check</span>
                                        </div>
                                        <div className="ml-4">
                                            <span className="block text-sm font-semibold text-white">Finance Manager</span>
                                            <span className="block text-xs text-[#A0A0A0]">Manage payments, approvals, and financial reporting.</span>
                                        </div>
                                    </div>
                                    {formData.role === 'Finance Manager' && (
                                        <div className="mt-4 pt-4 border-t border-[#1E40AF]/30">
                                            <div className="bg-black/30 rounded-lg p-3 border border-[#1E40AF]/20">
                                                <div className="flex items-center justify-between mb-2">
                                                    <span className="text-xs font-medium text-[#A0A0A0] uppercase">Approval Limit</span>
                                                    <span className="text-xs font-bold text-white">$50,000 USD</span>
                                                </div>
                                                <div className="grid grid-cols-2 gap-2">
                                                    <div className="flex items-center text-[11px] text-[#A0A0A0]">
                                                        <span className="material-icons text-sm mr-1 text-green-500">check</span> Create Payments
                                                    </div>
                                                    <div className="flex items-center text-[11px] text-[#A0A0A0]">
                                                        <span className="material-icons text-sm mr-1 text-green-500">check</span> Export Reports
                                                    </div>
                                                    <div className="flex items-center text-[11px] text-[#A0A0A0]">
                                                        <span className="material-icons text-sm mr-1 text-green-500">check</span> View Payroll
                                                    </div>
                                                    <div className="flex items-center text-[11px] text-[#A0A0A0]">
                                                        <span className="material-icons text-sm mr-1 text-[#1E40AF]">edit</span> Edit Cards
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                                <div
                                    className={`relative flex items-center p-4 rounded-xl border cursor-pointer transition-all bg-transparent ${formData.role === 'Accountant' ? 'border-[#1E40AF] bg-[#1E40AF]/10' : 'border-white/10 hover:border-white/20'}`}
                                    onClick={() => setFormData({ ...formData, role: 'Accountant' })}
                                >
                                    <div className="h-5 w-5 rounded-full border border-white/30 flex-shrink-0"></div>
                                    <div className="ml-4">
                                        <span className="block text-sm font-semibold text-white">Accountant</span>
                                        <span className="block text-xs text-[#A0A0A0]">Read-only access to transactions and reporting.</span>
                                    </div>
                                </div>
                            </div>
                        </section>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <section>
                                <h2 className="text-xs font-semibold uppercase tracking-wider text-[#A0A0A0]/60 mb-4">Department</h2>
                                <select
                                    className="w-full bg-transparent border border-white/20 rounded-lg py-2.5 px-4 focus:ring-1 focus:ring-[#1E40AF] focus:border-[#1E40AF] transition-all text-sm text-white outline-none appearance-none"
                                    value={formData.department}
                                    onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                                >
                                    <option className="bg-[#121212] text-white">Finance Operations</option>
                                    <option className="bg-[#121212] text-white">Product & Engineering</option>
                                    <option className="bg-[#121212] text-white">Sales & Marketing</option>
                                    <option className="bg-[#121212] text-white">Executive Team</option>
                                </select>
                            </section>
                            <section>
                                <h2 className="text-xs font-semibold uppercase tracking-wider text-[#A0A0A0]/60 mb-4">Invitation Expiry</h2>
                                <select
                                    className="w-full bg-transparent border border-white/20 rounded-lg py-2.5 px-4 focus:ring-1 focus:ring-[#1E40AF] focus:border-[#1E40AF] transition-all text-sm text-white outline-none appearance-none"
                                    value={formData.expiry}
                                    onChange={(e) => setFormData({ ...formData, expiry: e.target.value })}
                                >
                                    <option className="bg-[#121212] text-white">24 hours</option>
                                    <option className="bg-[#121212] text-white">3 days</option>
                                    <option className="bg-[#121212] text-white">7 days</option>
                                    <option className="bg-[#121212] text-white">30 days</option>
                                </select>
                            </section>
                        </div>
                        <section>
                            <h2 className="text-xs font-semibold uppercase tracking-wider text-[#A0A0A0]/60 mb-4">Welcome Message (Optional)</h2>
                            <textarea
                                className="w-full bg-transparent border border-white/20 rounded-lg py-2.5 px-4 focus:ring-1 focus:ring-[#1E40AF] focus:border-[#1E40AF] transition-all text-sm text-white outline-none min-h-[100px] placeholder:text-[#A0A0A0]/40"
                                placeholder="Hi Alex, welcome to the Velo finance team! Looking forward to working together."
                                value={formData.message}
                                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                            ></textarea>
                        </section>
                        <div className="px-8 py-6 bg-black/40 border-t border-[#262626] flex items-center justify-between -mx-8 -mb-8 rounded-b-xl">
                            <button onClick={() => navigate('/employees')} type="button" className="px-6 py-2.5 rounded-lg border border-white/10 text-[#A0A0A0] font-semibold text-sm hover:bg-white/5 hover:text-white transition-all">
                                Cancel
                            </button>
                            <div className="flex items-center gap-3">
                                <button type="button" className="px-6 py-2.5 rounded-lg border border-[#1E40AF]/50 text-[#1E40AF] font-semibold text-sm hover:bg-[#1E40AF]/10 transition-all">
                                    Save as Draft
                                </button>
                                <button type="submit" className="px-8 py-2.5 rounded-lg bg-[#1E40AF] text-white font-semibold text-sm shadow-[0_0_20px_rgba(30,64,175,0.4)] hover:bg-blue-700 hover:-translate-y-0.5 transition-all">
                                    Continue
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        );
    }

    // Step 1: Bulk Upload
    if (step === 1 && method === 'bulk') {
        return (
            <div className="bg-[#000000] font-display min-h-screen flex items-center justify-center p-6 text-white">
                <div className="w-full max-w-[700px] bg-[#121212] rounded-xl shadow-[0_0_50px_rgba(0,0,0,0.5)] border border-white/5 overflow-hidden">
                    <div className="px-8 pt-8 pb-6 border-b border-white/5">
                        <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2 px-3 py-1 bg-[#1949e6]/20 text-[#1949e6] text-[10px] font-bold rounded-full uppercase tracking-widest">
                                Step 2 of 3
                            </div>
                            <button onClick={() => setStep(0)} className="text-zinc-500 hover:text-white transition-colors">
                                <span className="material-icons text-xl">close</span>
                            </button>
                        </div>
                        <h1 className="text-2xl font-bold text-white mb-2">Bulk Invite Team Members</h1>
                        <p className="text-zinc-400 text-sm leading-relaxed max-w-lg">
                            Speed up your setup by uploading your team list. Ensure your CSV matches our template for a seamless import.
                        </p>
                    </div>
                    <div className="px-8 py-6 bg-black/20">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-xs font-semibold text-zinc-500 uppercase tracking-widest">CSV Template Preview</h3>
                            <button className="flex items-center gap-2 text-[#1949e6] hover:text-blue-400 text-sm font-medium transition-colors">
                                <span className="material-icons text-sm">download</span>
                                Download CSV Template
                            </button>
                        </div>
                        <div className="overflow-hidden border border-white/5 rounded-lg">
                            <table className="w-full text-left text-xs">
                                <thead>
                                    <tr className="bg-black text-white font-medium">
                                        <th className="px-4 py-3 border-b border-white/5 font-medium uppercase tracking-tight">Full Name</th>
                                        <th className="px-4 py-3 border-b border-white/5 font-medium uppercase tracking-tight">Email Address</th>
                                        <th className="px-4 py-3 border-b border-white/5 font-medium uppercase tracking-tight">Role</th>
                                    </tr>
                                </thead>
                                <tbody className="text-[#a1a1aa] bg-[#121212]">
                                    <tr className="border-b border-white/5">
                                        <td className="px-4 py-2.5">John Doe</td>
                                        <td className="px-4 py-2.5 italic opacity-80">john.doe@company.com</td>
                                        <td className="px-4 py-2.5">Admin</td>
                                    </tr>
                                    <tr className="border-b border-white/5">
                                        <td className="px-4 py-2.5">Sarah Smith</td>
                                        <td className="px-4 py-2.5 italic opacity-80">s.smith@company.com</td>
                                        <td className="px-4 py-2.5">Editor</td>
                                    </tr>
                                    <tr>
                                        <td className="px-4 py-2.5 text-zinc-600">...</td>
                                        <td className="px-4 py-2.5 text-zinc-600">...</td>
                                        <td className="px-4 py-2.5 text-zinc-600">...</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className="px-8 py-8">
                        <div
                            className="relative w-full max-w-[600px] mx-auto h-[300px] flex flex-col items-center justify-center border-2 border-dashed border-zinc-700 rounded-xl bg-black/40 hover:border-[#1949e6] hover:bg-[#1949e6]/5 transition-all cursor-pointer group"
                            onClick={handleBulkUpload}
                        >
                            <div className="mb-5 p-5 bg-[#1949e6]/10 rounded-full text-[#1949e6] group-hover:scale-110 transition-transform">
                                <span className="material-icons text-5xl">cloud_upload</span>
                            </div>
                            <h4 className="text-lg font-semibold text-white mb-1">Drag and drop CSV file here</h4>
                            <p className="text-zinc-400 text-sm">or <span className="text-[#1949e6] font-medium hover:underline">browse your computer</span></p>
                            <input accept=".csv" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" type="file" onChange={handleBulkUpload} />
                        </div>
                        <div className="mt-6 flex flex-wrap justify-center gap-4">
                            <div className="flex items-center gap-1.5 text-[11px] font-medium text-white bg-black/60 border border-white/5 px-4 py-1.5 rounded-full shadow-sm">
                                <span className="material-icons text-[14px] text-zinc-500">description</span>
                                Format: CSV only
                            </div>
                            <div className="flex items-center gap-1.5 text-[11px] font-medium text-white bg-black/60 border border-white/5 px-4 py-1.5 rounded-full shadow-sm">
                                <span className="material-icons text-[14px] text-zinc-500">straighten</span>
                                Max size: 5MB
                            </div>
                            <div className="flex items-center gap-1.5 text-[11px] font-medium text-white bg-black/60 border border-white/5 px-4 py-1.5 rounded-full shadow-sm">
                                <span className="material-icons text-[14px] text-zinc-500">reorder</span>
                                Max rows: 100
                            </div>
                        </div>
                    </div>
                    <div className="px-8 py-6 bg-black border-t border-white/5 flex items-center justify-between">
                        <button onClick={() => setStep(0)} className="px-6 py-2.5 text-sm font-semibold text-zinc-400 hover:text-white transition-colors flex items-center gap-2">
                            <span className="material-icons text-lg">arrow_back</span>
                            Back
                        </button>
                        <div className="flex gap-3">
                            <button className="px-6 py-2.5 text-sm font-semibold text-zinc-500 bg-white/5 hover:bg-white/10 rounded-lg transition-colors">
                                Skip for now
                            </button>
                            <button onClick={handleBulkUpload} className="px-8 py-2.5 text-sm font-semibold text-white bg-[#1949e6] hover:bg-blue-700 rounded-lg shadow-lg shadow-[#1949e6]/20 transition-all">
                                Upload and Invite
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // Step 2: Review (Single)
    if (step === 2 && method === 'single') {
        return (
            <div className="bg-[#000000] text-white font-display min-h-screen flex items-center justify-center p-4">
                <style>{`
                    .obsidian-glow { box-shadow: 0 0 15px rgba(15, 56, 189, 0.4); }
                    .badge-glow { box-shadow: 0 0 8px rgba(15, 56, 189, 0.3); }
                    .warning-glow { box-shadow: 0 0 10px rgba(245, 158, 11, 0.1); }
                `}</style>
                <div className="max-w-2xl w-full bg-[#121212] border border-[#262626] rounded-xl shadow-2xl overflow-hidden">
                    <div className="px-8 pt-8 pb-6 border-b border-[#262626]">
                        <div className="flex justify-between items-center mb-6">
                            <div>
                                <h1 className="text-2xl font-bold text-white tracking-tight">Review Invitation</h1>
                                <p className="text-[#A0A0A0] text-sm mt-1">Finalize team access and security settings</p>
                            </div>
                            <div className="text-right">
                                <span className="text-xs uppercase tracking-widest text-[#0f38bd] font-semibold">Step 3 of 3</span>
                                <div className="flex gap-1 mt-2">
                                    <div className="h-1 w-8 bg-[#0f38bd] rounded-full"></div>
                                    <div className="h-1 w-8 bg-[#0f38bd] rounded-full"></div>
                                    <div className="h-1 w-8 bg-[#0f38bd] rounded-full"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="p-8 space-y-8">
                        <div className="bg-black/40 border border-[#262626] p-6 rounded-lg flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-full bg-[#0f38bd]/20 flex items-center justify-center border border-[#0f38bd]/30">
                                    <span className="text-[#0f38bd] font-bold text-lg">
                                        {formData.firstName.charAt(0)}{formData.lastName.charAt(0)}
                                    </span>
                                </div>
                                <div>
                                    <p className="text-[#A0A0A0] text-xs uppercase tracking-wider">Inviting Member</p>
                                    <h2 className="text-xl font-medium text-white">{formData.firstName} {formData.lastName}</h2>
                                </div>
                            </div>
                            <div className="bg-[#0f38bd]/10 border border-[#0f38bd]/40 px-4 py-1.5 rounded-full badge-glow">
                                <span className="text-[#0f38bd] text-sm font-semibold flex items-center gap-2">
                                    <span className="w-2 h-2 rounded-full bg-[#0f38bd] animate-pulse"></span>
                                    {formData.role}
                                </span>
                            </div>
                        </div>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <h3 className="text-white font-medium flex items-center gap-2">
                                    <span className="material-icons text-sm text-[#A0A0A0]">admin_panel_settings</span>
                                    Access Summary
                                    <span className="ml-2 text-xs bg-[#262626] text-[#A0A0A0] px-2 py-0.5 rounded">12 permissions</span>
                                </h3>
                                <button className="text-[#0f38bd] text-sm hover:underline flex items-center gap-1">
                                    View Details <span className="material-icons text-sm">expand_more</span>
                                </button>
                            </div>
                            <div className="grid grid-cols-2 gap-3 bg-black/20 p-4 rounded-lg border border-[#262626]/50">
                                <div className="flex items-center gap-3 py-1">
                                    <span className="material-icons text-emerald-500 text-sm">check_circle</span>
                                    <span className="text-[#A0A0A0] text-sm">Manage Billing Methods</span>
                                </div>
                                <div className="flex items-center gap-3 py-1">
                                    <span className="material-icons text-emerald-500 text-sm">check_circle</span>
                                    <span className="text-[#A0A0A0] text-sm">View Revenue Analytics</span>
                                </div>
                                <div className="flex items-center gap-3 py-1">
                                    <span className="material-icons text-emerald-500 text-sm">check_circle</span>
                                    <span className="text-[#A0A0A0] text-sm">Approve Invoices</span>
                                </div>
                                <div className="flex items-center gap-3 py-1">
                                    <span className="material-icons text-emerald-500 text-sm">check_circle</span>
                                    <span className="text-[#A0A0A0] text-sm">Tax Document Access</span>
                                </div>
                                <div className="flex items-center gap-3 py-1">
                                    <span className="material-icons text-emerald-500 text-sm">check_circle</span>
                                    <span className="text-[#A0A0A0] text-sm">Edit Payroll Settings</span>
                                </div>
                                <div className="flex items-center gap-3 py-1">
                                    <span className="material-icons text-emerald-500 text-sm">check_circle</span>
                                    <span className="text-[#A0A0A0] text-sm">Audit Log Visibility</span>
                                </div>
                            </div>
                        </div>
                        <div className="bg-amber-500/5 border border-amber-500/30 p-4 rounded-lg warning-glow flex gap-4">
                            <span className="material-icons text-amber-500">warning_amber</span>
                            <div>
                                <h4 className="text-amber-500 text-sm font-semibold uppercase tracking-tight">Elevated Privileges</h4>
                                <p className="text-[#A0A0A0] text-xs mt-1 leading-relaxed">
                                    The <span className="text-white font-medium">{formData.role}</span> role grants comprehensive access to sensitive billing data, invoicing systems, and stored payment methods. Ensure this invitation is intended for a trusted administrator.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="px-8 py-6 bg-black/40 border-t border-[#262626] flex justify-between items-center">
                        <button onClick={() => setStep(1)} className="px-6 py-2.5 text-[#A0A0A0] hover:text-white text-sm font-medium transition-colors flex items-center gap-2">
                            <span className="material-icons text-sm">arrow_back</span>
                            Back
                        </button>
                        <div className="flex gap-4">
                            <button className="px-6 py-2.5 text-[#A0A0A0] hover:bg-white/5 border border-[#262626] rounded-md text-sm font-medium transition-colors">
                                Save as Draft
                            </button>
                            <button onClick={handleReviewConfirm} disabled={loading} className="px-8 py-2.5 bg-[#0f38bd] hover:bg-[#0f38bd]/90 text-white rounded-md text-sm font-semibold obsidian-glow transition-all active:scale-[0.98] flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed">
                                {loading ? 'Sending...' : 'Confirm & Send Invitation'}
                                {!loading && <span className="material-icons text-sm">send</span>}
                            </button>
                        </div>
                    </div>
                    <div className="fixed top-0 left-0 w-full h-full -z-10 pointer-events-none overflow-hidden">
                        <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-[#0f38bd]/10 blur-[120px] rounded-full"></div>
                        <div className="absolute bottom-[-10%] left-[-10%] w-[30%] h-[30%] bg-[#0f38bd]/5 blur-[100px] rounded-full"></div>
                    </div>
                </div>
            </div>
        );
    }

    // Step 3: Success
    if (step === 3) {
        return (
            <div className="bg-[#000000] font-display min-h-screen text-white transition-colors duration-200">
                <style>{`
                    .confetti-piece { position: absolute; width: 8px; height: 8px; background: #13ec5b; opacity: 0.2; border-radius: 50%; }
                    .step-glow { box-shadow: 0 0 10px rgba(19, 236, 91, 0.4); }
                `}</style>
                <nav className="border-b border-[#262626] bg-[#000000]/80 backdrop-blur-md sticky top-0 z-50">
                    <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-[#13ec5b] rounded-lg flex items-center justify-center">
                                <span className="text-black font-bold text-xl">V</span>
                            </div>
                            <span className="font-bold text-xl tracking-tight text-white">Velo</span>
                        </div>
                        <button onClick={() => navigate('/employees')} className="text-sm font-medium text-[#a3a3a3] hover:text-[#13ec5b] transition-colors flex items-center gap-1">
                            <span className="material-icons text-lg">arrow_back</span>
                            Back to Dashboard
                        </button>
                    </div>
                </nav>
                <main className="max-w-4xl mx-auto px-6 py-12">
                    <div className="relative text-center mb-12 py-8 overflow-hidden">
                        <div className="absolute inset-0 pointer-events-none">
                            <div className="confetti-piece top-10 left-[10%]"></div>
                            <div className="confetti-piece top-20 left-[85%] bg-[#13ec5b]/40"></div>
                            <div className="confetti-piece top-40 left-[20%] w-3 h-3"></div>
                            <div className="confetti-piece top-60 left-[75%] w-2 h-2"></div>
                            <div className="confetti-piece top-5 left-[50%] bg-[#13ec5b]/60"></div>
                        </div>
                        <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-[#13ec5b]/10 mb-6 border-4 border-[#13ec5b]/20">
                            <span className="material-icons text-[#13ec5b] text-6xl drop-shadow-[0_0_15px_rgba(19,236,91,0.5)]">check_circle</span>
                        </div>
                        <h1 className="text-4xl font-bold mb-3 text-white tracking-tight">{method === 'bulk' ? 'Invitations Sent! 🎉' : 'Invitation Sent! 🎉'}</h1>
                        <p className="text-lg text-[#a3a3a3]">
                            {method === 'bulk'
                                ? "We sent invitations to 12 team members. They'll receive an email shortly."
                                : `We sent an invitation to ${formData.email}. They'll receive an email shortly.`}
                        </p>
                    </div>
                    {/* Only show metrics for Bulk */}
                    {method === 'bulk' && (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                            <div className="bg-[#121212] p-6 rounded-xl border border-[#262626] shadow-sm text-center">
                                <p className="text-xs font-bold uppercase tracking-wider text-[#a3a3a3] mb-1">Total Invited</p>
                                <p className="text-3xl font-bold text-white">12</p>
                            </div>
                            <div className="bg-[#121212] p-6 rounded-xl border border-[#262626] shadow-sm text-center">
                                <p className="text-xs font-bold uppercase tracking-wider text-[#13ec5b] mb-1">Successfully Sent</p>
                                <p className="text-3xl font-bold text-[#13ec5b]">12</p>
                            </div>
                            <div className="bg-[#121212] p-6 rounded-xl border border-[#262626] shadow-sm text-center">
                                <p className="text-xs font-bold uppercase tracking-wider text-[#a3a3a3] mb-1">Pending Status</p>
                                <div className="flex items-center justify-center gap-2">
                                    <p className="text-3xl font-bold text-white">12</p>
                                    <span className="material-icons text-amber-500 text-sm">schedule</span>
                                </div>
                            </div>
                        </div>
                    )}

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        <div className="lg:col-span-2 space-y-6">
                            <div className="bg-[#121212] rounded-xl border border-[#262626] shadow-sm overflow-hidden">
                                <div className="p-4 border-b border-[#262626] flex justify-between items-center bg-[#121212]/50">
                                    <h2 className="font-semibold text-sm uppercase tracking-wider text-[#a3a3a3]">Recently Invited Members</h2>
                                    <span className="text-xs bg-[#13ec5b]/10 text-[#13ec5b] px-2 py-0.5 rounded-full font-medium">Batch #204</span>
                                </div>
                                <div className="divide-y divide-[#262626]">
                                    {method === 'bulk' ? (
                                        <>
                                            <div className="p-4 hover:bg-white/5 transition-colors">
                                                <div className="flex items-center justify-between mb-1">
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-8 h-8 rounded-full bg-[#13ec5b]/20 flex items-center justify-center text-[#13ec5b] font-bold text-xs uppercase">JD</div>
                                                        <div>
                                                            <p className="font-semibold text-white">John Doe</p>
                                                            <p className="text-xs text-[#a3a3a3]">john.doe@company.com</p>
                                                        </div>
                                                    </div>
                                                    <div className="text-right">
                                                        <span className="text-xs font-medium text-[#a3a3a3] bg-black/40 px-2 py-1 rounded border border-[#262626]">Admin</span>
                                                    </div>
                                                </div>
                                            </div>
                                            {/* More mock rows... */}
                                        </>
                                    ) : (
                                        <div className="p-4 hover:bg-white/5 transition-colors">
                                            <div className="flex items-center justify-between mb-1">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-8 h-8 rounded-full bg-[#13ec5b]/20 flex items-center justify-center text-[#13ec5b] font-bold text-xs uppercase">
                                                        {formData.firstName.charAt(0)}{formData.lastName.charAt(0)}
                                                    </div>
                                                    <div>
                                                        <p className="font-semibold text-white">{formData.firstName} {formData.lastName}</p>
                                                        <p className="text-xs text-[#a3a3a3]">{formData.email}</p>
                                                    </div>
                                                </div>
                                                <div className="text-right">
                                                    <span className="text-xs font-medium text-[#a3a3a3] bg-black/40 px-2 py-1 rounded border border-[#262626]">{formData.role}</span>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className="flex flex-col sm:flex-row gap-4 pt-4">
                                <button onClick={() => navigate('/employees')} className="flex-1 bg-[#13ec5b] text-black font-bold py-4 rounded-xl shadow-lg shadow-[#13ec5b]/10 hover:brightness-110 active:scale-[0.98] transition-all flex items-center justify-center gap-2">
                                    View Pending Invitations
                                    <span className="material-icons">arrow_forward</span>
                                </button>
                                <button onClick={() => { setStep(0); setMethod('single'); }} className="flex-1 border-2 border-[#262626] text-white font-bold py-4 rounded-xl hover:bg-white/5 transition-all flex items-center justify-center gap-2">
                                    <span className="material-icons">person_add</span>
                                    Invite More Members
                                </button>
                            </div>
                        </div>
                        <div className="lg:col-span-1">
                            <div className="bg-[#121212] p-6 rounded-xl border border-[#262626] shadow-sm h-full">
                                <h3 className="font-bold text-lg mb-6 flex items-center gap-2 text-white">
                                    <span className="material-icons text-[#13ec5b]">route</span>
                                    What's Next?
                                </h3>
                                {/* List... */}
                                <div className="space-y-8 relative">
                                    <div className="absolute left-4 top-2 bottom-2 w-0.5 bg-[#262626]"></div>
                                    <div className="relative flex gap-4">
                                        <div className="z-10 w-8 h-8 rounded-full bg-[#13ec5b] flex items-center justify-center text-black font-bold text-xs border-4 border-[#121212] step-glow">1</div>
                                        <div>
                                            <p className="font-bold text-sm text-white">Invitations Delivered</p>
                                            <p className="text-xs text-[#a3a3a3] mt-1">Check emails are out and not in spam folders.</p>
                                        </div>
                                    </div>
                                    <div className="relative flex gap-4">
                                        <div className="z-10 w-8 h-8 rounded-full bg-[#262626] flex items-center justify-center text-[#13ec5b] font-bold text-xs border-4 border-[#121212]">2</div>
                                        <div>
                                            <p className="font-bold text-sm text-[#a3a3a3]">Secure Link Access</p>
                                        </div>
                                    </div>
                                    {/* ... */}
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        );
    }

    return null;
};

export default TeamInvitation;
