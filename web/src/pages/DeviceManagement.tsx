import React from 'react';
import { useNavigate } from 'react-router-dom';

const DeviceManagement: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className="font-display bg-obsidian-black text-silver-grey min-h-screen">
            <nav className="border-b border-obsidian-border bg-obsidian-black px-6 py-4">
                <div className="max-w-6xl mx-auto flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-brand-primary-blue rounded flex items-center justify-center text-white font-bold">V</div>
                        <span className="text-xl font-bold tracking-tight text-white">Velo Settings</span>
                    </div>
                    <div className="flex items-center gap-4">
                        <button className="p-2 text-silver-grey hover:bg-obsidian-charcoal rounded-full transition-colors">
                            <span className="material-icons-outlined">notifications</span>
                        </button>
                        <div className="w-8 h-8 rounded-full overflow-hidden bg-obsidian-charcoal border border-obsidian-border">
                            <img alt="User Profile" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAtvcQOyKkb-AKJBDS14ygF0UTs76w-Q21XCLM1TBb_2ErXtya1S44QeExKABcQveAuBDUnCbnU2guCdyYFCdABsd_vYGMrZpnZhAM8zXp0XHUdK7NYzJ8fKrkGMhYmvgPJC9Gv_AMrL0g_DsalaPWrci2dWBvf8Z3uwxEPuYV1x7PExLt_gxzExd-YEh32h3yKtls8CasEb3v3_a0hkZAmazuOIyPXXNxO70lQ3YP3tVIt5Q5bkTv6ZXMFaJ3aKVNqS2qfHNn2SvUK" />
                        </div>
                    </div>
                </div>
            </nav>
            <main className="max-w-6xl mx-auto px-6 py-10">
                <div className="flex items-center gap-2 text-sm text-silver-grey mb-8">
                    <span onClick={() => navigate('/dashboard')} className="hover:text-white cursor-pointer transition-colors">Settings</span>
                    <span className="material-icons-outlined text-sm">chevron_right</span>
                    <span className="text-brand-primary-blue font-medium">Device Management</span>
                </div>
                <div className="flex flex-col lg:flex-row gap-10">
                    <div className="flex-1">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                            <div>
                                <h1 className="text-3xl font-bold text-white tracking-tight">Logged in devices</h1>
                                <p className="text-silver-grey mt-2">Manage and sign out of your active sessions on different devices.</p>
                            </div>
                            <button className="bg-brand-primary-blue hover:opacity-90 text-white px-5 py-2.5 rounded-lg font-semibold transition-all shadow-sm flex items-center gap-2 text-sm whitespace-nowrap">
                                <span className="material-icons-outlined text-lg">logout</span>
                                Log out all other devices
                            </button>
                        </div>
                        <div className="space-y-4">
                            <div className="bg-obsidian-charcoal p-6 rounded-xl border border-obsidian-border flex items-start gap-4">
                                <div className="w-12 h-12 rounded-lg bg-obsidian-black border border-obsidian-border flex items-center justify-center text-brand-primary-blue">
                                    <span className="material-icons-outlined text-2xl">laptop_mac</span>
                                </div>
                                <div className="flex-1">
                                    <div className="flex items-center gap-3">
                                        <h3 className="font-bold text-white text-lg">MacBook Pro - Chrome</h3>
                                        <span className="bg-brand-primary-blue text-white text-[10px] uppercase font-bold tracking-widest px-2.5 py-1 rounded">This device</span>
                                    </div>
                                    <p className="text-sm text-silver-grey mt-1">San Francisco, CA • 192.168.1.1</p>
                                    <div className="flex items-center gap-2 mt-4">
                                        <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
                                        <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest">Active now</span>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-obsidian-charcoal p-6 rounded-xl border border-obsidian-border flex items-start gap-4 group">
                                <div className="w-12 h-12 rounded-lg bg-obsidian-black border border-obsidian-border flex items-center justify-center text-silver-grey">
                                    <span className="material-icons-outlined text-2xl">phone_iphone</span>
                                </div>
                                <div className="flex-1">
                                    <div className="flex items-center justify-between">
                                        <h3 className="font-bold text-white text-lg">iPhone 14 Pro - Safari</h3>
                                        <button className="text-vibrant-red hover:brightness-125 font-bold text-sm transition-all uppercase tracking-wide">Log out</button>
                                    </div>
                                    <p className="text-sm text-silver-grey mt-1">Palo Alto, CA • 104.28.25.12</p>
                                    <p className="text-xs text-neutral-500 mt-4 font-medium uppercase tracking-tight">Last active: 2 hours ago</p>
                                </div>
                            </div>
                            <div className="bg-obsidian-charcoal p-6 rounded-xl border border-obsidian-border flex items-start gap-4 group">
                                <div className="w-12 h-12 rounded-lg bg-obsidian-black border border-obsidian-border flex items-center justify-center text-silver-grey">
                                    <span className="material-symbols-outlined text-2xl">tablet_android</span>
                                </div>
                                <div className="flex-1">
                                    <div className="flex items-center justify-between">
                                        <h3 className="font-bold text-white text-lg">Samsung Galaxy Tab S8</h3>
                                        <button className="text-vibrant-red hover:brightness-125 font-bold text-sm transition-all uppercase tracking-wide">Log out</button>
                                    </div>
                                    <p className="text-sm text-silver-grey mt-1">London, UK • 81.102.14.9</p>
                                    <p className="text-xs text-neutral-500 mt-4 font-medium uppercase tracking-tight">Last active: 1 day ago</p>
                                </div>
                            </div>
                            <div className="bg-obsidian-charcoal p-6 rounded-xl border border-obsidian-border flex items-start gap-4 group">
                                <div className="w-12 h-12 rounded-lg bg-obsidian-black border border-obsidian-border flex items-center justify-center text-silver-grey">
                                    <span className="material-icons-outlined text-2xl">desktop_windows</span>
                                </div>
                                <div className="flex-1">
                                    <div className="flex items-center justify-between">
                                        <h3 className="font-bold text-white text-lg">Windows Workstation - Firefox</h3>
                                        <button className="text-vibrant-red hover:brightness-125 font-bold text-sm transition-all uppercase tracking-wide">Log out</button>
                                    </div>
                                    <p className="text-sm text-silver-grey mt-1">Austin, TX • 12.34.56.78</p>
                                    <p className="text-xs text-neutral-500 mt-4 font-medium uppercase tracking-tight">Last active: Aug 12, 2023</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <aside className="w-full lg:w-80 space-y-6">
                        <div className="bg-obsidian-charcoal rounded-xl border border-obsidian-border p-6">
                            <h2 className="text-lg font-bold text-white mb-8 border-b border-obsidian-border pb-4">Security Settings</h2>
                            <div className="space-y-8">
                                <div className="flex items-start justify-between gap-4">
                                    <div className="flex-1">
                                        <label className="text-sm font-bold text-white block mb-1">Remember me by default</label>
                                        <p className="text-xs text-silver-grey leading-relaxed">Automatically save login state on recognized devices.</p>
                                    </div>
                                    <div className="relative inline-flex items-center cursor-pointer mt-1">
                                        <input defaultChecked className="sr-only peer" type="checkbox" value="" />
                                        <div className="w-11 h-6 bg-neutral-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-brand-primary-blue border border-obsidian-border"></div>
                                    </div>
                                </div>
                                <div className="flex items-start justify-between gap-4">
                                    <div className="flex-1">
                                        <label className="text-sm font-bold text-white block mb-1">Require 2FA on new devices</label>
                                        <p className="text-xs text-silver-grey leading-relaxed">Force verification code when logging in from a new location.</p>
                                    </div>
                                    <div className="relative inline-flex items-center cursor-pointer mt-1">
                                        <input defaultChecked className="sr-only peer" type="checkbox" value="" />
                                        <div className="w-11 h-6 bg-neutral-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-brand-primary-blue border border-obsidian-border"></div>
                                    </div>
                                </div>
                                <div className="space-y-3 pt-4 border-t border-obsidian-border">
                                    <label className="text-sm font-bold text-white block">Session duration</label>
                                    <p className="text-xs text-silver-grey leading-relaxed">Determine how long a device stays logged in before requiring a new sign-in.</p>
                                    <div className="relative group">
                                        <select className="w-full bg-obsidian-black border border-obsidian-border text-white rounded-lg py-2.5 px-4 text-sm appearance-none focus:ring-2 focus:ring-brand-primary-blue/40 focus:border-brand-primary-blue outline-none transition-all cursor-pointer" defaultValue="30">
                                            <option value="1">24 hours</option>
                                            <option value="7">7 days</option>
                                            <option value="30">30 days</option>
                                            <option value="90">90 days</option>
                                        </select>
                                        <span className="material-icons-outlined absolute right-3 top-2.5 text-silver-grey pointer-events-none group-hover:text-white transition-colors">expand_more</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="bg-brand-primary-blue/10 rounded-xl border border-brand-primary-blue/30 p-6">
                            <div className="flex gap-4">
                                <span className="material-symbols-outlined text-brand-primary-blue text-2xl">security</span>
                                <div>
                                    <h4 className="text-sm font-bold text-brand-primary-blue mb-2">Need help?</h4>
                                    <p className="text-xs text-silver-grey leading-relaxed">If you don't recognize a device, change your password immediately and contact support.</p>
                                    <button className="mt-4 text-xs font-bold text-brand-primary-blue hover:text-white transition-colors underline underline-offset-4 decoration-2">Security Audit Guide</button>
                                </div>
                            </div>
                        </div>
                    </aside>
                </div>
            </main>
        </div>
    );
};

export default DeviceManagement;
