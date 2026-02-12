import React from 'react';
import Sidebar from '../components/Sidebar';

const AddressBook: React.FC = () => {
    return (
        <div className="flex min-h-screen bg-black text-slate-200 font-display">
            <Sidebar />
            <div className="flex-1 flex overflow-hidden">
                {/* Internal Sidebar */}
                <aside className="w-72 bg-[#121212] border-r border-white/5 flex flex-col hidden lg:flex">
                    <div className="p-6 border-b border-white/5 flex items-center gap-3">
                        <div className="w-8 h-8 bg-[#0657f9] rounded flex items-center justify-center">
                            <span className="material-icons text-white text-lg">shield</span>
                        </div>
                        <h1 className="text-xl font-bold tracking-tight text-white">VELO <span className="text-[#0657f9]">VAULT</span></h1>
                    </div>
                    <div className="flex-1 overflow-y-auto p-4 space-y-6">
                        {/* Navigation */}
                        <nav className="space-y-1">
                            <p className="px-3 text-[10px] uppercase tracking-widest text-slate-500 font-bold mb-2">Main Menu</p>
                            <a className="flex items-center gap-3 px-3 py-2 text-white bg-[#0657f9]/10 border-l-2 border-[#0657f9] rounded-r" href="#">
                                <span className="material-icons text-[#0657f9]">contacts</span>
                                <span className="text-sm font-medium">All Contacts</span>
                            </a>
                            <a className="flex items-center gap-3 px-3 py-2 text-slate-400 hover:text-white hover:bg-white/5 transition-colors" href="#">
                                <span className="material-icons text-sm">verified_user</span>
                                <span className="text-sm font-medium">Whitelisted</span>
                            </a>
                            <a className="flex items-center gap-3 px-3 py-2 text-slate-400 hover:text-white hover:bg-white/5 transition-colors" href="#">
                                <span className="material-icons text-sm">group</span>
                                <span className="text-sm font-medium">Network Groups</span>
                            </a>
                            <a className="flex items-center gap-3 px-3 py-2 text-slate-400 hover:text-white hover:bg-white/5 transition-colors" href="#">
                                <span className="material-icons text-sm">history</span>
                                <span className="text-sm font-medium">Recent Activity</span>
                            </a>
                        </nav>
                        {/* Alerts */}
                        <div className="bg-yellow-400/5 border border-yellow-400/20 p-4 rounded-xl relative">
                            <div className="flex items-center justify-between mb-2">
                                <span className="flex h-2 w-2 rounded-full bg-yellow-400 shadow-[0_0_10px_rgba(250,204,21,0.4)]"></span>
                                <span className="bg-yellow-400 text-black text-[10px] font-bold px-1.5 py-0.5 rounded uppercase">Alert</span>
                            </div>
                            <p className="text-xs text-yellow-100 font-medium">3 Duplicate entries found in Ethereum mainnet.</p>
                            <button className="mt-3 w-full py-1.5 bg-yellow-400 hover:bg-yellow-500 text-black text-xs font-bold rounded transition-colors">
                                Merge Duplicates
                            </button>
                        </div>
                        {/* Settings */}
                        <nav className="space-y-1">
                            <p className="px-3 text-[10px] uppercase tracking-widest text-slate-500 font-bold mb-2">System</p>
                            <a className="flex items-center gap-3 px-3 py-2 text-slate-400 hover:text-white hover:bg-white/5 transition-colors" href="#">
                                <span className="material-icons text-sm">settings</span>
                                <span className="text-sm font-medium">Security Settings</span>
                            </a>
                            <a className="flex items-center gap-3 px-3 py-2 text-slate-400 hover:text-white hover:bg-white/5 transition-colors" href="#">
                                <span className="material-icons text-sm">terminal</span>
                                <span className="text-sm font-medium">API Keys</span>
                            </a>
                        </nav>
                    </div>
                    {/* Profile Info */}
                    <div className="p-4 border-t border-white/5 bg-black/20">
                        <div className="flex items-center gap-3">
                            <img className="w-10 h-10 rounded-full border border-[#0657f9]/30" alt="User avatar" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBy7pOnWw9_hkmCBcGwzQvuGILOSDVc3J6bD4kkZyFCYv7HKm3LpXHG5xyfTP-efFJvhc5_spmHNXP-GTS1ZJyTMWp6bdtgpQ7w0ofYvO_L5BtfqIbvEWvxkDTMZX6s8a5f1hB_f5Jy9JtBR2tRTsUCXw9VqUCpEDbp-Q22aN8dzSuBl6IF0BIhFUwz7AsSy9V_3QGgkvqqrmuLmAHCitN91ZHDSYIc8vU-oOCu_jkdoqeyc1eNPTjBPdglhRP6WlkzBLOKxdM6tmDy" />
                            <div className="flex-1 min-w-0">
                                <p className="text-xs font-bold text-white truncate">Vault_Admin_01</p>
                                <p className="text-[10px] text-slate-500 font-mono truncate">0x71C...392A</p>
                            </div>
                        </div>
                    </div>
                </aside>

                {/* Main Content */}
                <main className="flex-1 flex flex-col bg-black relative overflow-hidden">
                    {/* Top Bar */}
                    <header className="h-20 border-b border-white/5 flex items-center justify-between px-8 bg-black/80 backdrop-blur-md z-10">
                        <div className="flex items-center flex-1 max-w-xl">
                            <div className="relative w-full group">
                                <span className="material-icons absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-[#0657f9] transition-colors">search</span>
                                <input className="w-full bg-[#121212] border border-white/10 rounded-xl py-2.5 pl-12 pr-4 text-sm font-medium focus:ring-1 focus:ring-[#0657f9] focus:border-[#0657f9] transition-all text-slate-200 placeholder:text-slate-600 font-mono" placeholder="Search contacts by name, ENS, or wallet address..." type="text" />
                            </div>
                        </div>
                        <div className="flex items-center gap-4 ml-6">
                            <button className="flex items-center gap-2 px-4 py-2.5 border border-white/10 hover:border-[#0657f9]/50 text-slate-300 hover:text-white text-sm font-medium rounded-xl transition-all">
                                <span className="material-icons text-sm">ios_share</span>
                                Export
                            </button>
                            <button className="flex items-center gap-2 px-6 py-2.5 bg-[#0657f9] hover:bg-[#0657f9]/90 text-white text-sm font-bold rounded-xl shadow-lg shadow-[#0657f9]/20 transition-all">
                                <span className="material-icons text-sm text-white">person_add</span>
                                Add New Contact
                            </button>
                        </div>
                    </header>

                    {/* Scrollable Area */}
                    <div className="flex-1 overflow-y-auto p-8">
                        <div className="flex items-center justify-between mb-8">
                            <div>
                                <h2 className="text-2xl font-bold text-white">All Contacts</h2>
                                <p className="text-slate-500 text-sm mt-1">Managing 1,284 secure addresses across 4 networks.</p>
                            </div>
                            <div className="flex gap-2">
                                <button className="p-2 bg-[#121212] border border-white/5 rounded-lg text-slate-400"><span className="material-icons">filter_list</span></button>
                                <button className="p-2 bg-[#121212] border border-white/5 rounded-lg text-slate-400"><span className="material-icons">sort</span></button>
                            </div>
                        </div>

                        {/* Contact Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {/* Contact Card 1 */}
                            <div className="group relative bg-[#181818] border border-white/5 rounded-xl p-6 transition-all hover:border-[#0657f9]/40 hover:bg-[#121212]">
                                <div className="flex justify-between items-start mb-4">
                                    <div className="flex items-center gap-2 bg-[#0657f9]/10 border border-[#0657f9]/20 px-2 py-0.5 rounded-full shadow-[0_0_10px_rgba(6,87,249,0.4)]">
                                        <span className="w-1.5 h-1.5 rounded-full bg-[#0657f9] animate-pulse"></span>
                                        <span className="text-[10px] font-bold text-[#0657f9] uppercase tracking-tighter">Verified</span>
                                    </div>
                                    <label className="inline-flex items-center cursor-pointer">
                                        <span className="text-[10px] font-bold text-slate-500 uppercase mr-2">Whitelist</span>
                                        <div className="relative">
                                            <input defaultChecked className="sr-only peer" type="checkbox" />
                                            <div className="w-8 h-4 bg-white/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-3 after:w-3 after:transition-all peer-checked:bg-[#0657f9]"></div>
                                        </div>
                                    </label>
                                </div>
                                <div className="flex items-center gap-4 mb-4">
                                    <img className="w-12 h-12 rounded-lg border border-white/10 group-hover:border-[#0657f9]/50 transition-colors" alt="Contact profile" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCDBoU5_dQFNiOonhfjz11HSRmD_44551DRpPSdSDwVlNkmq6-NuVXYXzAh1IQ_ZQ7jbpuqczMAVXprpiduBM4E85xEqrnVf910xz1RlhUDI2rGw00cxGQuqH7RTfM6qiRHJ5quu8mT2IY031uds-l_36m5Lg_p4WjjpHO8g49vTyL8mhGSfMKb9dTWMjw1PXFXW6yPsjmen1RWFVr9FL2eOlMQ574u8wnbAijip75N0Dxkkf3KfHS_1X6LEwzIMqTZ4qF4m9VdTsuJ" />
                                    <div className="flex-1 min-w-0">
                                        <h3 className="text-base font-bold text-white truncate">vitalik.eth</h3>
                                        <p className="text-[11px] font-mono text-slate-500 truncate">0xAb5801a...9bA1E</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3 pt-4 border-t border-white/5">
                                    <div className="flex -space-x-2">
                                        <div className="w-6 h-6 rounded-full bg-[#627EEA] flex items-center justify-center border-2 border-[#181818]" title="Ethereum">
                                            <img className="w-3 h-3 brightness-0 invert" alt="Ethereum" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC8ybicKJpAdYcrPdZcC6dwHqd7aqL0xvmUZFVcvBA77rENX2Nzuvtz-ndIDMiY5KaLyj4ellqxOtWBvhwp5ZtljtvsYdszXETu_h6f5WCLXEXZqKp25-mhr8SPXZl_RzeCF_E9a_TZjykNUDx8wTcF_Sugj4NNI6ldCFxjuyDxDhzsmGWjbpuPYHY903JI0TXIWsHOTRwZkqrPNfh-Nf3KHQNJMkOhU68CBtg55JcJ7wVYdiRqCstsYd9wjuKALLOygS_WJzG2i7fx" />
                                        </div>
                                        <div className="w-6 h-6 rounded-full bg-[#8247E5] flex items-center justify-center border-2 border-[#181818]" title="Polygon">
                                            <img className="w-3 h-3 brightness-0 invert" alt="Polygon" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDNCkQLbkPDshARJi9j30d13v9auO-RpZA88Z2gAb9vdp4K-9tBayoIcp8Jh1AJkELioKv6GYGGSRvLIQQhO4P4epgHoMEAWeLnwNa-PkuAO-JZ5hAsEeaM2bGVXZ6-YTVh-55XuqneTX8V1AJ5glTrbFGdGcPerE62_wFEiQOAlP4U9806PueEIQk8e5VzjdYvNe0Td24R6uDHVFiAvuO7c7zSsWa5fafxOtYvVPeD6FviJy2ODpef5fj9S4d7pzbB5qm4rNMBBokQ" />
                                        </div>
                                    </div>
                                    <span className="text-[10px] font-medium text-slate-400">Supported Chains</span>
                                </div>
                                <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute inset-0 bg-black/60 backdrop-blur-sm rounded-xl flex items-center justify-center gap-3 p-4">
                                    <button className="flex items-center gap-2 px-3 py-2 bg-[#0657f9] text-white text-[11px] font-bold rounded-lg shadow-lg">
                                        <span className="material-icons text-sm">qr_code_2</span>
                                        QR CODE
                                    </button>
                                    <button className="flex items-center gap-2 px-3 py-2 bg-white/10 hover:bg-white/20 text-white text-[11px] font-bold rounded-lg border border-white/20">
                                        <span className="material-icons text-sm">contact_page</span>
                                        vCARD
                                    </button>
                                </div>
                            </div>

                            {/* Contact Card 2 */}
                            <div className="group relative bg-[#181818] border border-white/5 rounded-xl p-6 transition-all hover:border-[#0657f9]/40 hover:bg-[#121212]">
                                <div className="flex justify-between items-start mb-4">
                                    <div className="flex items-center gap-2 bg-white/5 border border-white/10 px-2 py-0.5 rounded-full">
                                        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-tighter">Unknown</span>
                                    </div>
                                    <label className="inline-flex items-center cursor-pointer">
                                        <span className="text-[10px] font-bold text-slate-500 uppercase mr-2">Whitelist</span>
                                        <div className="relative">
                                            <input className="sr-only peer" type="checkbox" />
                                            <div className="w-8 h-4 bg-white/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-3 after:w-3 after:transition-all peer-checked:bg-[#0657f9]"></div>
                                        </div>
                                    </label>
                                </div>
                                <div className="flex items-center gap-4 mb-4">
                                    <img className="w-12 h-12 rounded-lg border border-white/10 group-hover:border-[#0657f9]/50 transition-colors" alt="Contact profile" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAlJIO9LpqzcdkbRId4QJZfsADqbKthMOvqQq6-wmpKPsz2dstcRoEuBMi3nBP2Iiyjm7-mrMmxfrw749AGu5e7nKkA5WVRlAHvn3_qiRXwC-UuOJuFbeBiZge1Z4PmTC6n9bxgk7fPJLGfQRVT0m_uJgvRw-UQXYKRyC6VwY2ItewqNS7uzvfKdDmqUkK2FLz9rh0futnhZBJ_e-ji5e5mPwg53aTBzbK9scUiiKANZ3iaOGCMzI-iBZ1Cey-pYLYib31lv3eR1hOG" />
                                    <div className="flex-1 min-w-0">
                                        <h3 className="text-base font-bold text-white truncate">Alex Vance</h3>
                                        <p className="text-[11px] font-mono text-slate-500 truncate">0x52E...A908</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3 pt-4 border-t border-white/5">
                                    <div className="flex -space-x-2">
                                        <div className="w-6 h-6 rounded-full bg-[#627EEA] flex items-center justify-center border-2 border-[#181818]">
                                            <img className="w-3 h-3 brightness-0 invert" alt="Ethereum" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDPv9PFR2__l1oxdLDbBbvVDszARpHeohIUWuGCJN9gfzqzE3g0xzy-bziWJQR8wrxhhUkSrXcYtmI-1fX_UqIxtCSgtAa-7C1F5HQAXXyDbRkUyYIAobRHaivE_LCClx3ODBaEPhGrKZhqE4tgizMjbps9zfA5wYJpZ9e6MANV6UvoZoYXK97usWrqewgrddQF3VbSBO158W7-QhsCbZSzZwh2sCYQPo2PsyMR1Q9DXQQzTQOv3G39YWDB25EYl-2KVvmsYQmBund_" />
                                        </div>
                                    </div>
                                    <span className="text-[10px] font-medium text-slate-400">Supported Chains</span>
                                </div>
                                <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute inset-0 bg-black/60 backdrop-blur-sm rounded-xl flex items-center justify-center gap-3 p-4">
                                    <button className="flex items-center gap-2 px-3 py-2 bg-[#0657f9] text-white text-[11px] font-bold rounded-lg shadow-lg">
                                        <span className="material-icons text-sm">qr_code_2</span>
                                        QR CODE
                                    </button>
                                    <button className="flex items-center gap-2 px-3 py-2 bg-white/10 hover:bg-white/20 text-white text-[11px] font-bold rounded-lg border border-white/20">
                                        <span className="material-icons text-sm">contact_page</span>
                                        vCARD
                                    </button>
                                </div>
                            </div>

                            {/* Contact Card 3 */}
                            <div className="group relative bg-[#181818] border border-white/5 rounded-xl p-6 transition-all hover:border-[#0657f9]/40 hover:bg-[#121212]">
                                <div className="flex justify-between items-start mb-4">
                                    <div className="flex items-center gap-2 bg-[#0657f9]/10 border border-[#0657f9]/20 px-2 py-0.5 rounded-full shadow-[0_0_10px_rgba(6,87,249,0.4)]">
                                        <span className="w-1.5 h-1.5 rounded-full bg-[#0657f9] animate-pulse"></span>
                                        <span className="text-[10px] font-bold text-[#0657f9] uppercase tracking-tighter">Verified</span>
                                    </div>
                                    <label className="inline-flex items-center cursor-pointer">
                                        <span className="text-[10px] font-bold text-slate-500 uppercase mr-2">Whitelist</span>
                                        <div className="relative">
                                            <input defaultChecked className="sr-only peer" type="checkbox" />
                                            <div className="w-8 h-4 bg-white/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-3 after:w-3 after:transition-all peer-checked:bg-[#0657f9]"></div>
                                        </div>
                                    </label>
                                </div>
                                <div className="flex items-center gap-4 mb-4">
                                    <img className="w-12 h-12 rounded-lg border border-white/10 group-hover:border-[#0657f9]/50 transition-colors" alt="Contact profile" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBtRYqI9FrHLEVIwWdoqEK3nn5AIXC47VasoRHivE5e7l0EyUKnSEv83AUx_KCsJ2daq11xLvg7gHW9GqmuAta7jh0u3oNbI3q2j_EmzoZuy1JCxC00YJYQEncvJeoUvqeSFIloidf5z1lUiPEwa7t1wOGizqH0sms9C4Kzq7rH8KWvD4XzGoCF7kk8nvPpXugRvSqzw2n2uYRUbaZjwW5SGjk4sINLESc0lAfAilbKJCGHHmjrPeP6Ac2k6S-N5z0AEnWmMXS5RHpv" />
                                    <div className="flex-1 min-w-0">
                                        <h3 className="text-base font-bold text-white truncate">Sarah Dev</h3>
                                        <p className="text-[11px] font-mono text-slate-500 truncate">sarah.lens</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3 pt-4 border-t border-white/5">
                                    <div className="flex -space-x-2">
                                        <div className="w-6 h-6 rounded-full bg-[#8247E5] flex items-center justify-center border-2 border-[#181818]">
                                            <img className="w-3 h-3 brightness-0 invert" alt="Polygon" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAZiahxWU8vCrWtpz5RS7hzI57zzgEaY1TJFBoTsXKEIGKlUxMe4UbtfF8nkMBffJ-1W_G-sXAd9u1-kn-Ix4IoL5eqoGjaGFGQ9ZpbqJmtLvThYYHvjJPV4bPM8Sgg0kBXmKCDi9OSKaKA-nmLAklivKI6L5-UQ3tUiolg_maMsFzqeUuyJ9MYOPV7i5qq0Mnz6WK4kG8RQ49Tj3dEz_v1loUxNrUKV0VU1AdgWAp1AGoFNMn094Dpzdhwl9MyMdZ4C77yF90yaFpu" />
                                        </div>
                                    </div>
                                    <span className="text-[10px] font-medium text-slate-400">Supported Chains</span>
                                </div>
                                <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute inset-0 bg-black/60 backdrop-blur-sm rounded-xl flex items-center justify-center gap-3 p-4">
                                    <button className="flex items-center gap-2 px-3 py-2 bg-[#0657f9] text-white text-[11px] font-bold rounded-lg shadow-lg">
                                        <span className="material-icons text-sm">qr_code_2</span>
                                        QR CODE
                                    </button>
                                    <button className="flex items-center gap-2 px-3 py-2 bg-white/10 hover:bg-white/20 text-white text-[11px] font-bold rounded-lg border border-white/20">
                                        <span className="material-icons text-sm">contact_page</span>
                                        vCARD
                                    </button>
                                </div>
                            </div>

                            {/* Add New Card Placeholder */}
                            <button className="group relative bg-transparent border border-dashed border-white/10 rounded-xl p-6 flex flex-col items-center justify-center gap-3 transition-all hover:border-[#0657f9]/50 hover:bg-[#0657f9]/5">
                                <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-[#0657f9]/20 transition-colors">
                                    <span className="material-icons text-slate-500 group-hover:text-[#0657f9]">add</span>
                                </div>
                                <span className="text-sm font-bold text-slate-500 group-hover:text-[#0657f9]">Add New Contact</span>
                            </button>
                        </div>
                    </div>
                    {/* Status Bar */}
                    <footer className="h-10 bg-[#121212] border-t border-white/5 px-6 flex items-center justify-between text-[10px] font-mono tracking-wider z-20 sticky bottom-0">
                        <div className="flex items-center gap-6">
                            <div className="flex items-center gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                                <span className="text-emerald-500">SYNCED: BLOCK #18,921,432</span>
                            </div>
                            <div className="text-slate-500">NODE: AWS-USEAST-01</div>
                            <div className="text-slate-500">UPTIME: 99.99%</div>
                        </div>
                        <div className="flex items-center gap-4 text-slate-500 uppercase">
                            <span className="hover:text-white cursor-pointer">Security Protocol v2.4</span>
                            <span className="hover:text-white cursor-pointer">System Logs</span>
                            <span className="text-[#0657f9] font-bold">Encrypted Connection Active</span>
                        </div>
                    </footer>
                </main>
            </div>
        </div>
    );
};

export default AddressBook;
