import React from 'react';

const TeamInvitation: React.FC = () => {
    return (
        <div className="bg-black font-display text-white min-h-screen flex flex-col overflow-x-hidden">
            {/* Sidebar Placeholder (Hidden on mobile) */}
            <div className="fixed left-0 top-0 h-full w-64 bg-[#121212] border-r border-[#262626] p-6 hidden lg:flex flex-col opacity-40 select-none pointer-events-none">
                <div className="flex items-center gap-2 mb-10">
                    <div className="w-8 h-8 bg-primary rounded flex items-center justify-center text-white font-bold">V</div>
                    <span className="text-xl font-bold tracking-tight text-white">Velo</span>
                </div>
                <nav className="space-y-4">
                    <div className="flex items-center gap-3 text-neutral-400"><span className="material-icons text-xl">dashboard</span> Dashboard</div>
                    <div className="flex items-center gap-3 text-neutral-400"><span className="material-icons text-xl">layers</span> Batches</div>
                    <div className="flex items-center gap-3 text-primary font-medium"><span className="material-icons text-xl">group</span> Team</div>
                    <div className="flex items-center gap-3 text-neutral-400"><span className="material-icons text-xl">settings</span> Settings</div>
                </nav>
            </div>

            {/* Main Content */}
            <main className="flex-1 lg:ml-64 flex flex-col items-center justify-center p-6 lg:p-12">
                <div className="w-full max-w-2xl flex flex-col items-center text-center mb-10 drop-shadow-[0_0_20px_rgba(30,64,175,0.15)]">
                    <div className="w-48 h-48 mb-8 relative">
                        <img
                            alt="Single person at desk"
                            className="w-full h-full object-contain brightness-110 contrast-125"
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAF5fdtcn9iYpi326H_2FXGtsFjOR_DvShLjQOAFQCy6P9KBAntN85P7Bvfsw6hhbaHHCA4PvfjyDcY8RnrfOyfXvKIYOz6sT1M6F0eeaJD2mRyvx3yms52A_4Zi5ssGwNJYElcAtUi8r3VSndUkmrMEo1oNTo6Z0efdcPIe716TV9UxHyyQsigQvoOr2L4FINVTZyxbcN-1XNWfQtgwq8B10farAV8az1Jq2f_eMp-C7_M5dBakkkpB-qZX2ElGxtClqXWxQceUyqq"
                        />
                        <div className="absolute -bottom-2 -right-2 w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center border border-primary/30">
                            <span className="material-icons text-primary">person_add_alt_1</span>
                        </div>
                    </div>
                    <h1 className="text-3xl lg:text-4xl font-bold text-white mb-3 tracking-tight">
                        You’re flying solo
                    </h1>
                    <p className="text-neutral-400 text-lg max-w-md">
                        Invite team members to collaborate and delegate batch creation.
                    </p>
                </div>

                <div className="w-full max-w-3xl bg-[#121212] rounded-xl shadow-2xl border border-[#262626] overflow-hidden flex flex-col md:flex-row">
                    {/* Left Info Panel */}
                    <div className="w-full md:w-5/12 bg-white/[0.02] p-8 border-b md:border-b-0 md:border-r border-[#262626]">
                        <h3 className="font-semibold text-white mb-6">Why invite others?</h3>
                        <ul className="space-y-6">
                            <li className="flex gap-4">
                                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/20 border border-primary/40 flex items-center justify-center">
                                    <span className="material-icons text-primary text-sm">done</span>
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-white leading-tight">Delegate batch creation</p>
                                    <p className="text-xs text-neutral-400 mt-1">Let your team handle the heavy lifting while you oversee.</p>
                                </div>
                            </li>
                            <li className="flex gap-4">
                                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/20 border border-primary/40 flex items-center justify-center">
                                    <span className="material-icons text-primary text-sm">done</span>
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-white leading-tight">Set up approval workflows</p>
                                    <p className="text-xs text-neutral-400 mt-1">Define who reviews and approves every step of the process.</p>
                                </div>
                            </li>
                        </ul>
                    </div>

                    {/* Right Form Panel */}
                    <div className="w-full md:w-7/12 p-8">
                        <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
                            <div>
                                <label className="block text-sm font-medium text-neutral-400 mb-2" htmlFor="email">Team Member Email</label>
                                <div className="relative">
                                    <span className="material-icons absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500 text-lg">mail_outline</span>
                                    <input
                                        className="w-full pl-10 pr-4 py-3 bg-transparent border border-[#3f3f46] rounded-lg focus:ring-1 focus:ring-primary focus:border-primary text-white placeholder-zinc-600 transition-all"
                                        id="email"
                                        name="email"
                                        placeholder="team@example.com"
                                        type="email"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-neutral-400 mb-2" htmlFor="role">Assign Role</label>
                                <div className="relative">
                                    <span className="material-icons absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500 text-lg">badge</span>
                                    <select
                                        className="w-full pl-10 pr-10 py-3 bg-transparent border border-[#3f3f46] rounded-lg focus:ring-1 focus:ring-primary focus:border-primary text-white appearance-none transition-all"
                                        id="role"
                                        name="role"
                                        defaultValue=""
                                    >
                                        <option className="bg-[#121212]" value="" disabled>Select a role</option>
                                        <option className="bg-[#121212]" value="accountant">Accountant</option>
                                        <option className="bg-[#121212]" value="manager">Manager</option>
                                        <option className="bg-[#121212]" value="viewer">Viewer</option>
                                    </select>
                                    <span className="material-icons absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 pointer-events-none">expand_more</span>
                                </div>
                            </div>
                            <button
                                className="w-full bg-primary hover:brightness-110 active:scale-[0.98] text-white font-bold py-3.5 rounded-lg shadow-lg shadow-primary/20 transition-all flex items-center justify-center gap-2 group mt-2"
                                type="button"
                            >
                                Send Invitation
                                <span className="material-icons text-lg group-hover:translate-x-1 transition-transform">send</span>
                            </button>
                            <p className="text-center text-[10px] uppercase tracking-wider text-zinc-500 pt-2">
                                Invitation will be sent via email
                            </p>
                        </form>
                    </div>
                </div>

                <div className="mt-12 flex items-center gap-8">
                    <button className="text-sm font-medium text-neutral-400 hover:text-white transition-colors flex items-center gap-2">
                        <span className="material-icons text-[18px]">help_outline</span>
                        Learn about roles
                    </button>
                    <span className="w-1 h-1 rounded-full bg-zinc-800"></span>
                    <button className="text-sm font-medium text-neutral-400 hover:text-white transition-colors">
                        Skip for now
                    </button>
                </div>
            </main>
        </div>
    );
};

export default TeamInvitation;
