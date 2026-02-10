import React from 'react';
import { useNavigate } from 'react-router-dom';

const SaveProgress: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className="bg-[#f6f6f8] dark:bg-[#121520] font-display min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
            {/* Blurred Background Overlay */}
            <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
                <div className="absolute inset-0 bg-[#121520]/40"></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#1e3fae]/20 rounded-full blur-[120px]"></div>
                <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-[#1e3fae]/10 rounded-full blur-[100px]"></div>
            </div>

            {/* Modal Content */}
            <div className="relative z-10 w-full max-w-[400px]">
                <div className="bg-[#151921] border border-neutral-border-white rounded-xl shadow-2xl overflow-hidden">
                    {/* Header Section */}
                    <div className="p-8 pb-4 text-center">
                        <div className="w-12 h-12 bg-[#1e3fae]/10 rounded-full flex items-center justify-center mx-auto mb-4 border border-[#1e3fae]/20">
                            <span className="material-icons text-[#1e3fae] text-2xl">save</span>
                        </div>
                        <h2 className="text-white text-xl font-semibold tracking-tight">Save your progress</h2>
                        <p className="text-gray-400 text-sm mt-2 leading-relaxed">
                            Don't worry, we've saved your application. You can pick up exactly where you left off at any time.
                        </p>
                    </div>

                    {/* Progress Summary List */}
                    <div className="px-8 py-4">
                        <div className="bg-black/20 rounded-lg p-5 border border-white/5 space-y-4">
                            {/* Step 1: Completed */}
                            <div className="flex items-center gap-3">
                                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-success/20 flex items-center justify-center">
                                    <span className="material-icons text-success text-base">check</span>
                                </div>
                                <div className="flex-grow">
                                    <p className="text-white text-xs font-medium uppercase tracking-wider opacity-60">Step 1</p>
                                    <p className="text-gray-200 text-sm">Company Details</p>
                                </div>
                            </div>
                            {/* Step 2: Active */}
                            <div className="flex items-center gap-3">
                                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-[#1e3fae] flex items-center justify-center">
                                    <span className="material-icons text-white text-base">sync</span>
                                </div>
                                <div className="flex-grow">
                                    <p className="text-[#1e3fae] text-xs font-medium uppercase tracking-wider">Step 2 · Current</p>
                                    <p className="text-white text-sm font-medium">Banking Integration</p>
                                </div>
                            </div>
                            {/* Step 3: Pending */}
                            <div className="flex items-center gap-3 opacity-40">
                                <div className="flex-shrink-0 w-6 h-6 rounded-full border border-gray-500 flex items-center justify-center">
                                    <span className="material-icons text-gray-400 text-base">lock</span>
                                </div>
                                <div className="flex-grow">
                                    <p className="text-gray-400 text-xs font-medium uppercase tracking-wider">Step 3</p>
                                    <p className="text-gray-400 text-sm">Identity Verification</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="p-8 pt-4 space-y-3">
                        <button
                            onClick={() => navigate(-1)} // Go back to where they were
                            className="w-full bg-[#1e3fae] hover:bg-[#1e3fae]/90 text-white font-medium py-3 rounded-lg transition-all duration-200 flex items-center justify-center gap-2"
                        >
                            Continue onboarding
                            <span className="material-icons text-sm">arrow_forward</span>
                        </button>
                        <button
                            onClick={() => navigate('/login')} // Exit to login or home
                            className="w-full bg-transparent border border-white/10 hover:bg-white/5 text-gray-300 font-medium py-3 rounded-lg transition-all duration-200"
                        >
                            Save and exit
                        </button>
                    </div>

                    {/* Footer Metadata */}
                    <div className="px-8 pb-8 text-center border-t border-white/5 pt-6 bg-black/10">
                        <div className="flex items-center justify-center gap-2 mb-2">
                            <span className="material-icons text-gray-500 text-xs">alternate_email</span>
                            <p className="text-gray-500 text-[11px] font-medium tracking-wide">
                                SENT TO: <span className="text-gray-300">james.wilson@acme-inc.co</span>
                            </p>
                        </div>
                        <div className="flex items-center justify-center gap-2">
                            <span className="material-icons text-gray-500 text-xs">history</span>
                            <p className="text-gray-500 text-[11px]">
                                Magic link expires in <span className="text-gray-400">24 hours</span>
                            </p>
                        </div>
                    </div>
                </div>

                {/* Subtle Brand Accent */}
                <div className="mt-6 flex justify-center items-center opacity-30 grayscale contrast-125">
                    <div className="flex items-center gap-2">
                        <div className="w-6 h-6 bg-white rounded-md flex items-center justify-center">
                            <div className="w-3 h-3 bg-black rounded-sm"></div>
                        </div>
                        <span className="text-white font-bold tracking-tighter text-lg">VELO</span>
                    </div>
                </div>
            </div>

            {/* Decorative Elements in Background */}
            <div className="fixed top-0 left-0 w-full h-full pointer-events-none -z-10">
                <div className="absolute top-10 left-10 w-24 h-24 border border-white/5 rounded-xl rotate-12"></div>
                <div className="absolute bottom-20 right-20 w-32 h-32 border border-[#1e3fae]/5 rounded-full"></div>
            </div>
        </div>
    );
};

export default SaveProgress;
