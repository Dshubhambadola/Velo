import React from 'react';
import { useNavigate } from 'react-router-dom';

const DocumentUpload: React.FC = () => {
    const navigate = useNavigate();

    const handleNext = () => {
        // Navigate to verification pending screen
        navigate('/verification/pending');
    };

    const handleBack = () => {
        navigate('/onboarding/step3');
    };

    return (
        <div className="bg-dark-main font-display min-h-screen flex flex-col text-white">
            <header className="w-full bg-dark-main border-b border-border-subtle py-4">
                <div className="max-w-5xl mx-auto px-6 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-[#1e3fae] rounded flex items-center justify-center">
                            <span className="text-white font-bold text-lg">V</span>
                        </div>
                        <span className="font-bold text-xl tracking-tight text-white">VELO</span>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                            <div className="h-2 w-8 bg-[#1e3fae] rounded-full"></div>
                            <div className="h-2 w-8 bg-[#1e3fae] rounded-full"></div>
                            <div className="h-2 w-12 bg-[#1e3fae] rounded-full relative">
                                <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-[10px] font-bold text-[#1e3fae] whitespace-nowrap uppercase tracking-widest">Step 3b of 5</div>
                            </div>
                            <div className="h-2 w-8 bg-white/10 rounded-full"></div>
                            <div className="h-2 w-8 bg-white/10 rounded-full"></div>
                        </div>
                    </div>
                </div>
            </header>
            <main className="flex-grow flex items-center justify-center p-6">
                <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    <div className="lg:col-span-8 bg-dark-card border border-border-subtle rounded-xl shadow-2xl overflow-hidden">
                        <div className="flex border-b border-border-subtle">
                            <button className="flex-1 py-4 text-sm font-semibold border-b-2 border-[#1e3fae] text-[#1e3fae] flex items-center justify-center gap-2 bg-[#1e3fae]/5">
                                <span className="material-icons text-lg">videocam</span>
                                Take Photo
                            </button>
                            <button className="flex-1 py-4 text-sm font-medium text-secondary-gray hover:text-white transition-colors flex items-center justify-center gap-2">
                                <span className="material-icons text-lg">upload_file</span>
                                Upload File
                            </button>
                            <button className="flex-1 py-4 text-sm font-medium text-secondary-gray hover:text-white transition-colors flex items-center justify-center gap-2">
                                <span className="material-icons text-lg">phonelink_setup</span>
                                Use Mobile
                            </button>
                        </div>
                        <div className="p-8">
                            <div className="mb-6">
                                <h1 className="text-2xl font-bold text-white">Verify Identity</h1>
                                <p className="text-secondary-gray mt-1">Position the front of your ID card within the frame.</p>
                            </div>
                            <div className="relative aspect-[16/10] bg-black rounded-xl overflow-hidden group border border-white/5">
                                <img className="w-full h-full object-cover opacity-50 grayscale-[0.2]" alt="Camera preview" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCkCynmYZ8R6SXcw9gG_fy2KNPjemA9J8i3h93wyzLXankoFFhEKb_OGqFHdPId7yUCA44IPfXv1efCn2H3YQHZU0PtSo2-J3pAnzyd_f6PPF3DOD3zuDCYSd-R-aY7hp3PTzsIPtta1e9FjAXtThqKDHHDt1tJuZ4Ge1kb7j54fwdz8-IhHSih4OH4ga1eaeUuF_GPRmNw4wZA5D8SMINR7SLF28Sdfr-h9F8Jqy8UWaspDTRjtCuH6l6j4xHITIYBcHB1E52RTpBS" />
                                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                    <div className="w-[85%] h-[75%] border-2 border-white/30 rounded-lg relative">
                                        <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-[#1e3fae] -mt-1 -ml-1"></div>
                                        <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-[#1e3fae] -mt-1 -mr-1"></div>
                                        <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-[#1e3fae] -mb-1 -ml-1"></div>
                                        <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-[#1e3fae] -mb-1 -mr-1"></div>
                                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white/70 text-sm font-bold uppercase tracking-[0.25em]">
                                            Place ID Card Here
                                        </div>
                                    </div>
                                </div>
                                <div className="absolute top-4 left-4 flex items-center gap-2 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-full text-white text-xs font-bold border border-white/10">
                                    <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
                                    LIVE FEED
                                </div>
                            </div>
                            <div className="mt-8 flex flex-wrap justify-between items-center gap-4 py-4 px-6 bg-white/5 rounded-xl border border-white/10">
                                <div className="flex items-center gap-2">
                                    <span className="material-icons text-emerald-400">check_circle</span>
                                    <span className="text-sm font-medium text-white">Good lighting</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="material-icons text-amber-400">warning</span>
                                    <span className="text-sm font-medium text-white">Edges visible</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="material-icons text-red-400">cancel</span>
                                    <span className="text-sm font-medium text-white">Too blurry</span>
                                </div>
                            </div>
                            <div className="mt-10 flex flex-col items-center">
                                <button
                                    onClick={handleNext}
                                    className="group relative flex items-center justify-center"
                                >
                                    <div className="absolute inset-0 bg-[#1e3fae]/30 rounded-full scale-125 group-hover:scale-150 transition-transform duration-300"></div>
                                    <div className="w-20 h-20 bg-dark-card border-4 border-[#1e3fae] rounded-full flex items-center justify-center shadow-xl relative z-10 hover:bg-slate-800 transition-colors">
                                        <div className="w-14 h-14 bg-[#1e3fae] rounded-full flex items-center justify-center text-white">
                                            <span className="material-icons text-3xl">photo_camera</span>
                                        </div>
                                    </div>
                                </button>
                                <span className="mt-4 text-sm font-semibold text-[#1e3fae] uppercase tracking-widest">Capture Photo</span>
                            </div>
                        </div>
                    </div>
                    <aside className="lg:col-span-4 space-y-6">
                        <div className="bg-dark-card border border-border-subtle rounded-xl p-6 shadow-xl">
                            <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                                <span className="material-icons text-[#1e3fae]">verified</span>
                                Requirements
                            </h2>
                            <ul className="space-y-4">
                                <li className="flex items-start gap-3">
                                    <div className="w-5 h-5 mt-0.5 rounded-full border-2 border-[#1e3fae]/40 flex items-center justify-center">
                                        <span className="material-icons text-[12px] text-[#1e3fae]">check</span>
                                    </div>
                                    <div className="text-sm">
                                        <p className="font-semibold text-white">Document in focus</p>
                                        <p className="text-secondary-gray text-xs">Ensure the text is sharp and readable.</p>
                                    </div>
                                </li>
                                <li className="flex items-start gap-3">
                                    <div className="w-5 h-5 mt-0.5 rounded-full border-2 border-[#1e3fae]/40 flex items-center justify-center">
                                        <span className="material-icons text-[12px] text-[#1e3fae]">check</span>
                                    </div>
                                    <div className="text-sm">
                                        <p className="font-semibold text-white">All corners visible</p>
                                        <p className="text-secondary-gray text-xs">The entire document must be within the frame.</p>
                                    </div>
                                </li>
                                <li className="flex items-start gap-3">
                                    <div className="w-5 h-5 mt-0.5 rounded-full border-2 border-[#1e3fae]/40 flex items-center justify-center">
                                        <span className="material-icons text-[12px] text-[#1e3fae]">check</span>
                                    </div>
                                    <div className="text-sm">
                                        <p className="font-semibold text-white">No glare / reflections</p>
                                        <p className="text-secondary-gray text-xs">Avoid direct overhead lighting and flash.</p>
                                    </div>
                                </li>
                                <li className="flex items-start gap-3">
                                    <div className="w-5 h-5 mt-0.5 rounded-full border-2 border-[#1e3fae]/40 flex items-center justify-center">
                                        <span className="material-icons text-[12px] text-[#1e3fae]">check</span>
                                    </div>
                                    <div className="text-sm">
                                        <p className="font-semibold text-white">Valid and unexpired</p>
                                        <p className="text-secondary-gray text-xs">Check your document's expiration date.</p>
                                    </div>
                                </li>
                            </ul>
                        </div>
                        <div className="bg-[#1e3fae]/10 border border-[#1e3fae]/20 rounded-xl p-6">
                            <h3 className="text-sm font-bold text-[#1e3fae] flex items-center gap-2 mb-2 uppercase tracking-wider">
                                <span className="material-icons text-sm">security</span>
                                Your Privacy Matters
                            </h3>
                            <p className="text-xs text-secondary-gray leading-relaxed">
                                Data is encrypted end-to-end. We only use your information for identity verification as required by financial regulations.
                            </p>
                        </div>
                    </aside>
                </div>
            </main>
            <footer className="w-full bg-dark-main border-t border-border-subtle py-6">
                <div className="max-w-5xl mx-auto px-6 flex items-center justify-between">
                    <button
                        onClick={handleBack}
                        className="px-6 py-2.5 text-sm font-semibold text-secondary-gray hover:text-white transition-colors flex items-center gap-2"
                    >
                        <span className="material-icons text-lg">arrow_back</span>
                        Back
                    </button>
                    <button
                        onClick={handleNext}
                        className="bg-[#1e3fae] hover:bg-blue-700 text-white px-8 py-3 rounded-lg text-sm font-bold flex items-center gap-2 shadow-lg transition-all active:scale-95"
                    >
                        Next: Back of ID
                        <span className="material-icons text-lg">arrow_forward</span>
                    </button>
                </div>
            </footer>
        </div>
    );
};

export default DocumentUpload;
