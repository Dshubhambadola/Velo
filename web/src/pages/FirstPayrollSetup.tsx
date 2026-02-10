import React from 'react';
import { useNavigate } from 'react-router-dom';

const FirstPayrollSetup: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className="bg-deep-bg font-display min-h-screen flex flex-col">
            <header className="bg-card-bg border-b border-white/5 px-8 py-4">
                <div className="max-w-7xl mx-auto flex justify-between items-center">
                    <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 bg-[#1E40AF] rounded-lg flex items-center justify-center">
                            <span className="material-icons text-white text-xl">account_balance_wallet</span>
                        </div>
                        <span className="text-xl font-bold tracking-tight text-white">Velo</span>
                    </div>
                    <div className="flex items-center space-x-6 text-sm font-medium text-soft-grey">
                        <span className="flex items-center"><span className="w-2 h-2 bg-emerald-500 rounded-full mr-2"></span> Step 5 of 5</span>
                        <button onClick={() => navigate('/onboarding/save-progress')} className="text-soft-grey hover:text-white transition-colors">Save & Exit</button>
                    </div>
                </div>
            </header>
            <main className="flex-grow max-w-7xl mx-auto w-full px-8 py-10">
                <div className="grid grid-cols-12 gap-8">
                    <div className="col-span-12 lg:col-span-9">
                        <div className="mb-10">
                            <h1 className="text-3xl font-bold text-white mb-2">Create your first payroll batch</h1>
                            <p className="text-soft-grey text-lg">Choose a template to get started quickly or upload your own data.</p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                            <div onClick={() => navigate('/payroll/preview')} className="group relative bg-card-bg border-2 border-[#1E40AF] rounded-xl p-6 shadow-[0_0_20px_rgba(30,64,175,0.15)] transition-all cursor-pointer">
                                <div className="absolute -top-3 left-6 bg-[#1E40AF] text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full shadow-lg">
                                    Popular
                                </div>
                                <div className="flex items-center justify-between mb-4">
                                    <div className="w-12 h-12 bg-[#1E40AF]/20 rounded-lg flex items-center justify-center text-[#1E40AF]">
                                        <span className="material-icons text-3xl">rocket_launch</span>
                                    </div>
                                    <div className="text-[#1E40AF]">
                                        <span className="material-icons">check_circle</span>
                                    </div>
                                </div>
                                <h3 className="text-xl font-bold mb-1 text-white">Startup Pack</h3>
                                <p className="text-sm text-soft-grey mb-4">5 contractors • $5,000 total</p>
                                <div className="space-y-2 pt-4 border-t border-white/5">
                                    <div className="flex items-center text-xs text-soft-grey">
                                        <span className="material-icons text-[16px] mr-2 text-white">laptop</span>
                                        3x Software Engineers
                                    </div>
                                    <div className="flex items-center text-xs text-soft-grey">
                                        <span className="material-icons text-[16px] mr-2 text-white">palette</span>
                                        1x UI Designer
                                    </div>
                                    <div className="flex items-center text-xs text-soft-grey">
                                        <span className="material-icons text-[16px] mr-2 text-white">work</span>
                                        1x Product Manager
                                    </div>
                                </div>
                            </div>
                            <div className="group bg-card-bg border border-white/5 rounded-xl p-6 hover:border-white/20 transition-all cursor-pointer">
                                <div className="flex items-center justify-between mb-4">
                                    <div className="w-12 h-12 bg-white/5 rounded-lg flex items-center justify-center text-white">
                                        <span className="material-icons text-3xl">corporate_fare</span>
                                    </div>
                                </div>
                                <h3 className="text-xl font-bold mb-1 text-white">Agency</h3>
                                <p className="text-sm text-soft-grey mb-4">10 freelancers • $12,000 total</p>
                                <div className="space-y-2 pt-4 border-t border-white/5">
                                    <div className="flex items-center text-xs text-soft-grey">
                                        <span className="material-icons text-[16px] mr-2 text-white">groups</span>
                                        Mixed creative & dev roles
                                    </div>
                                    <div className="flex items-center text-xs text-soft-grey">
                                        <span className="material-icons text-[16px] mr-2 text-white">schedule</span>
                                        Recurring monthly cycle
                                    </div>
                                </div>
                            </div>
                            <div className="group bg-card-bg border border-white/5 rounded-xl p-6 hover:border-white/20 transition-all cursor-pointer">
                                <div className="flex items-center justify-between mb-4">
                                    <div className="w-12 h-12 bg-white/5 rounded-lg flex items-center justify-center text-white">
                                        <span className="material-icons text-3xl">group</span>
                                    </div>
                                </div>
                                <h3 className="text-xl font-bold mb-1 text-white">Small Team</h3>
                                <p className="text-sm text-soft-grey mb-4">3 employees • $8,000 total</p>
                                <div className="space-y-2 pt-4 border-t border-white/5">
                                    <div className="flex items-center text-xs text-soft-grey">
                                        <span className="material-icons text-[16px] mr-2 text-white">badge</span>
                                        Full-time core personnel
                                    </div>
                                    <div className="flex items-center text-xs text-soft-grey">
                                        <span className="material-icons text-[16px] mr-2 text-white">account_balance</span>
                                        Tax withholding included
                                    </div>
                                </div>
                            </div>
                            <div className="group bg-white/5 border-2 border-dashed border-white/10 rounded-xl p-6 flex flex-col items-center justify-center text-center hover:border-[#1E40AF] hover:bg-[#1E40AF]/5 transition-all cursor-pointer min-h-[220px]">
                                <div className="w-14 h-14 bg-card-bg rounded-full shadow-lg flex items-center justify-center text-[#1E40AF] mb-4 group-hover:scale-110 transition-transform">
                                    <span className="material-icons text-3xl">cloud_upload</span>
                                </div>
                                <h3 className="text-lg font-bold text-white">Start from scratch</h3>
                                <p className="text-xs text-soft-grey mt-2">Upload your own CSV or XLS file</p>
                            </div>
                        </div>
                    </div>
                    <aside className="col-span-12 lg:col-span-3">
                        <div className="bg-card-bg rounded-xl border border-white/5 p-6 sticky top-8">
                            <h4 className="text-lg font-bold mb-6 flex items-center text-white">
                                <span className="material-icons text-[#1E40AF] mr-2">help_outline</span>
                                Need help?
                            </h4>
                            <div className="space-y-6">
                                <a href="#" className="group flex items-start space-x-3 hover:bg-white/5 -mx-2 p-2 rounded-lg transition-colors">
                                    <span className="material-icons text-white bg-[#1E40AF] p-1.5 rounded-lg text-lg">description</span>
                                    <div>
                                        <p className="text-sm font-semibold text-white group-hover:text-[#1E40AF] transition-colors">CSV Requirements</p>
                                        <p className="text-xs text-soft-grey mt-1">Check format and fields</p>
                                    </div>
                                </a>
                                <a href="#" className="group flex items-start space-x-3 hover:bg-white/5 -mx-2 p-2 rounded-lg transition-colors">
                                    <span className="material-icons text-white bg-[#1E40AF] p-1.5 rounded-lg text-lg">play_circle</span>
                                    <div>
                                        <p className="text-sm font-semibold text-white group-hover:text-[#1E40AF] transition-colors">Video Tutorial</p>
                                        <p className="text-xs text-soft-grey mt-1">3-minute setup guide</p>
                                    </div>
                                </a>
                                <a href="#" className="group flex items-start space-x-3 hover:bg-white/5 -mx-2 p-2 rounded-lg transition-colors">
                                    <span className="material-icons text-white bg-[#1E40AF] p-1.5 rounded-lg text-lg">support_agent</span>
                                    <div>
                                        <p className="text-sm font-semibold text-white group-hover:text-[#1E40AF] transition-colors">Contact Support</p>
                                        <p className="text-xs text-soft-grey mt-1">Available 24/7 for you</p>
                                    </div>
                                </a>
                            </div>
                            <div className="mt-8 pt-8 border-t border-white/5">
                                <div className="bg-white/5 rounded-lg p-4">
                                    <p className="text-xs font-medium text-soft-grey mb-3 uppercase tracking-wider">Onboarding Tip</p>
                                    <p className="text-sm text-slate-300 leading-relaxed">
                                        You can always edit employee details or amounts before final submission.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </aside>
                </div>
            </main>
            <footer className="bg-card-bg border-t border-white/5 px-8 py-6 mt-12">
                <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
                    <div className="flex items-center space-x-4">
                        <div className="relative w-48 h-2 bg-white/10 rounded-full overflow-hidden">
                            <div className="absolute top-0 left-0 h-full bg-[#1E40AF] w-[80%]"></div>
                        </div>
                        <p className="text-sm font-medium text-slate-300">
                            4 of 5 steps complete. <span className="text-soft-grey font-normal">Almost there! 🎉</span>
                        </p>
                    </div>
                    <div className="flex items-center space-x-4">
                        <button onClick={() => navigate('/wallet/funding')} className="px-6 py-2.5 text-sm font-semibold text-soft-grey hover:text-white transition-colors">
                            Back
                        </button>
                        <button onClick={() => navigate('/payroll/preview')} className="bg-[#1E40AF] hover:bg-[#1E40AF]/90 text-white px-8 py-2.5 rounded-lg font-bold shadow-lg shadow-[#1E40AF]/20 transition-all flex items-center">
                            Create Batch
                            <span className="material-icons ml-2 text-lg">arrow_forward</span>
                        </button>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default FirstPayrollSetup;
