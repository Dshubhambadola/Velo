import React from 'react';
import { useNavigate } from 'react-router-dom';

const PayrollNewBatch: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className="bg-background-light dark:bg-background-dark font-display text-white min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
            {/* Modal Backdrop */}
            <div className="fixed inset-0 bg-black/75 backdrop-blur-sm z-0"></div>

            {/* Main Modal Card */}
            <div className="relative z-10 w-full max-w-4xl bg-charcoal-modal rounded-xl shadow-2xl overflow-hidden border border-white/5">
                {/* Header Section */}
                <div className="px-8 pt-8 pb-6 border-b border-white/5">
                    <div className="flex items-center justify-between mb-2">
                        <h1 className="text-2xl font-semibold text-white tracking-tight">Create New Payroll Batch</h1>
                        <button onClick={() => navigate('/payroll')} className="text-silver-grey hover:text-white transition-colors">
                            <span className="material-icons">close</span>
                        </button>
                    </div>
                    <p className="text-silver-grey text-sm">Select your preferred method to proceed with the batch creation process. You can change this later.</p>
                </div>

                {/* Content Section: Method Selection */}
                <div className="p-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* Method 1: CSV Upload (Recommended) */}
                        <button
                            onClick={() => navigate('/payroll/upload')}
                            className="flex flex-col text-left p-6 bg-card-midnight border border-primary/50 shadow-[0_0_15px_rgba(25,61,179,0.3)] rounded-xl transition-all group relative hover:bg-card-midnight/80"
                        >
                            <div className="absolute -top-3 left-6 bg-primary text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full text-white">
                                Recommended
                            </div>
                            <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center mb-5 group-hover:bg-primary/30 transition-colors">
                                <span className="material-icons text-primary text-3xl">upload_file</span>
                            </div>
                            <h3 className="text-lg font-medium text-white mb-2">CSV Upload</h3>
                            <p className="text-sm text-silver-grey leading-relaxed">Import recipients and amounts via a spreadsheet. Best for high-volume batches.</p>
                            <div className="mt-auto pt-6 flex items-center text-xs font-medium text-primary">
                                <span>Select Method</span>
                                <span className="material-icons text-sm ml-1">arrow_forward</span>
                            </div>
                        </button>

                        {/* Method 2: Direct Input */}
                        <button
                            onClick={() => navigate('/payroll/manual')}
                            className="flex flex-col text-left p-6 bg-card-midnight border border-white/10 rounded-xl hover:border-primary/50 transition-all group"
                        >
                            <div className="w-12 h-12 bg-white/5 rounded-lg flex items-center justify-center mb-5 group-hover:bg-white/10 transition-colors">
                                <span className="material-icons text-silver-grey text-3xl group-hover:text-white transition-colors">edit_note</span>
                            </div>
                            <h3 className="text-lg font-medium text-white mb-2">Manual Entry</h3>
                            <p className="text-sm text-silver-grey leading-relaxed">Type recipient details directly into the interface. Ideal for small batches.</p>
                            <div className="mt-auto pt-6 flex items-center text-xs font-medium text-silver-grey group-hover:text-white transition-colors">
                                <span>Select Method</span>
                                <span className="material-icons text-sm ml-1">arrow_forward</span>
                            </div>
                        </button>

                        {/* Method 3: API Integration */}
                        <button
                            onClick={() => alert("Integration with HRIS systems is coming soon. Please use CSV Upload for now.")}
                            className="flex flex-col text-left p-6 bg-card-midnight border border-white/10 rounded-xl hover:border-primary/50 transition-all group"
                        >
                            <div className="w-12 h-12 bg-white/5 rounded-lg flex items-center justify-center mb-5 group-hover:bg-white/10 transition-colors">
                                <span className="material-icons text-silver-grey text-3xl group-hover:text-white transition-colors">hub</span>
                            </div>
                            <h3 className="text-lg font-medium text-white mb-2">Connect via API</h3>
                            <p className="text-sm text-silver-grey leading-relaxed">Sync data directly from your HRIS or ERP system for automated updates.</p>
                            <div className="mt-auto pt-6 flex items-center text-xs font-medium text-silver-grey group-hover:text-white transition-colors">
                                <span>Select Method</span>
                                <span className="material-icons text-sm ml-1">arrow_forward</span>
                            </div>
                        </button>
                    </div>
                </div>

                {/* Footer Section */}
                <div className="px-8 py-6 bg-black/40 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-2 text-xs text-silver-grey">
                        <span className="material-icons text-sm text-primary">info</span>
                        <span>Need help with CSV formatting? <button onClick={() => alert("Downloading template...")} className="text-primary hover:underline bg-transparent border-none p-0 cursor-pointer">Download template</button></span>
                    </div>
                    <div className="flex items-center gap-4 w-full sm:w-auto">
                        <button onClick={() => navigate('/payroll')} className="w-full sm:w-auto px-6 py-2.5 text-sm font-medium text-silver-grey hover:text-white transition-colors">
                            Cancel
                        </button>
                        <button
                            onClick={() => navigate('/payroll/upload')}
                            className="w-full sm:w-auto px-10 py-2.5 bg-primary hover:bg-primary/90 text-white text-sm font-semibold rounded-lg shadow-lg shadow-primary/20 transition-all active:scale-[0.98]"
                        >
                            Continue
                        </button>
                    </div>
                </div>
            </div>

            {/* Background Decorative Elements */}
            <div className="fixed top-0 right-0 p-12 opacity-10 pointer-events-none">
                <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuDrqubzmv1BVsumLFTFK_T5SU5decdQHI2J4kx9ARumr8NdFb_-FtpyagbxCwf91LS9e19bNRgiKmgsU7bF05-oZn3uFF2bKDtYuUqudb4qrvh4xKt2VR9N-o1bATOoL_fDYahG34_Lc0rsOH7YMeZjXTKJe3vMj8pIBntRF1Ra-sWNdjHRDEapA11o6DZn6g6FvjapQxwPVNTxC11xVoOxagJdjw8f7uPg3R_ZJNxz4wocxgsrr2M2mxghzYpQb-hvUTtr6EO4CzOt" alt="" className="w-64 h-64" />
            </div>
            <div className="fixed bottom-0 left-0 p-12 opacity-10 pointer-events-none">
                <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuBJ5Kvdo4g_axQ7jUHdst00nUOUuuC2dZmKgH2gtnTlnn8XJBk_dFHWXh8cSN1i0dAaYY5vO9_RbUToVfrRWKD8aKGTzkRrLmaZcWYxFAH8Z3s54nTc6hWFHwho2u6xwWH5Smh74FZwfP_kdqbK_09hCGfm-JqcnaaB8HRfWMA4oWddTjCZz21qdWLQsoEyK7-QhWSjEkrp5K1di_LG_HwPoUfryFfhvAtXGrSListzvPetd_kMGACtkf9t33xyKCmjp-q60mg1zzd2" alt="" className="w-64 h-64" />
            </div>
        </div>
    );
};

export default PayrollNewBatch;
