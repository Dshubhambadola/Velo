import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const OnboardingStep2: React.FC = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        companyName: 'Acme Corp',
        website: '',
        location: 'United States',
        size: '11-50',
        industry: 'Technology'
    });

    const handleContinue = () => {
        // Navigate to dashboard for now as we don't have step 3
        navigate('/onboarding/step3');
    };

    return (
        <div className="bg-main-bg font-display min-h-screen flex flex-col text-text-grey">
            <header className="w-full pt-8 pb-4">
                <div className="max-w-4xl mx-auto px-6">
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-primary rounded flex items-center justify-center">
                                <span className="text-white font-bold text-xl">V</span>
                            </div>
                            <span className="text-text-white font-bold text-xl tracking-tight">Velo</span>
                        </div>
                        <div className="text-sm font-medium text-text-grey">
                            Step 2 of 5
                        </div>
                    </div>
                    <div className="w-full bg-[#1C222B] h-1.5 rounded-full overflow-hidden">
                        <div className="bg-primary h-full w-[40%] rounded-full shadow-[0_0_10px_rgba(30,64,175,0.5)]"></div>
                    </div>
                </div>
            </header>

            <main className="flex-grow flex items-center justify-center p-6">
                <div className="max-w-5xl w-full bg-card-bg rounded-xl border border-border-subtle shadow-[0_10px_40px_-10px_rgba(0,0,0,0.5)] flex flex-col md:flex-row overflow-hidden">
                    <div className="flex-[1.5] p-8 md:p-12 border-r border-border-subtle">
                        <h1 className="text-3xl font-bold text-text-white mb-2">Tell us about your company</h1>
                        <p className="text-text-grey mb-8">We'll use this information to set up your business account.</p>

                        <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); handleContinue(); }}>
                            <div>
                                <label className="block text-sm font-semibold text-text-white mb-2">Company name</label>
                                <div className="relative">
                                    <input
                                        className="w-full px-4 py-3 bg-input-bg border border-border-grey rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all text-text-white"
                                        type="text"
                                        value={formData.companyName}
                                        onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                                    />
                                    <div className="absolute right-3 top-1/2 -translate-y-1/2 text-green-500">
                                        <span className="material-icons text-xl">check_circle</span>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-text-white mb-2">Company website</label>
                                <div className="relative flex">
                                    <span className="inline-flex items-center px-4 rounded-l-lg border border-r-0 border-border-grey bg-[#232B35] text-text-grey text-sm">
                                        https://
                                    </span>
                                    <input
                                        className="w-full px-4 py-3 bg-input-bg border border-border-grey rounded-r-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all text-text-white"
                                        placeholder="acme.com"
                                        type="url"
                                        value={formData.website}
                                        onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                                    />
                                    <div className="absolute right-3 top-1/2 -translate-y-1/2 text-green-500">
                                        <span className="material-icons text-xl">check_circle</span>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-text-white mb-2">Where is your business located?</label>
                                <div className="relative">
                                    <div className="flex items-center w-full px-4 py-3 bg-input-bg border border-border-grey rounded-lg cursor-pointer hover:border-primary transition-colors">
                                        <span className="mr-2">🇺🇸</span>
                                        <span className="text-text-white">United States</span>
                                        <span className="material-icons ml-auto text-text-grey">expand_more</span>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-text-white mb-3">Company size</label>
                                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                                    {['1-10', '11-50', '51-200', '200+'].map((size) => (
                                        <button
                                            key={size}
                                            type="button"
                                            onClick={() => setFormData({ ...formData, size })}
                                            className={`flex flex-col items-center justify-center p-4 rounded-lg transition-all ${formData.size === size
                                                ? 'border-2 border-primary bg-primary/10'
                                                : 'border border-border-grey bg-input-bg hover:border-primary/50 group'
                                                }`}
                                        >
                                            <span className={`material-icons mb-1 transition-colors ${formData.size === size ? 'text-primary' : 'text-text-grey/60 group-hover:text-primary'
                                                }`}>
                                                {size === '1-10' ? 'person' : size === '11-50' ? 'groups' : size === '51-200' ? 'apartment' : 'domain'}
                                            </span>
                                            <span className={`text-sm font-medium ${formData.size === size ? 'text-text-white font-bold' : 'text-text-grey'
                                                }`}>
                                                {size}
                                            </span>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-text-white mb-2">Industry</label>
                                <div className="relative">
                                    <div className="flex items-center w-full px-4 py-3 bg-input-bg border border-border-grey rounded-lg cursor-pointer hover:border-primary transition-colors">
                                        <span className="material-icons text-primary mr-3">computer</span>
                                        <span className="text-text-white">Technology</span>
                                        <span className="material-icons ml-auto text-text-grey">expand_more</span>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-10 pt-8 border-t border-border-subtle flex items-center justify-between">
                                <Link to="/onboarding/step1" className="text-text-grey hover:text-text-white font-medium flex items-center gap-1 transition-colors">
                                    <span className="material-icons text-lg">arrow_back</span>
                                    Back
                                </Link>
                                <button type="submit" className="bg-primary hover:bg-primary/90 text-white font-bold py-3 px-10 rounded-lg shadow-lg shadow-primary/20 transition-all active:scale-95">
                                    Continue
                                </button>
                            </div>
                        </form>
                    </div>

                    <div className="flex-1 bg-[#0F1218] p-8 md:p-12 flex flex-col">
                        <div className="bg-card-bg p-6 rounded-xl border border-border-subtle shadow-sm">
                            <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center mb-4">
                                <span className="material-icons text-primary">verified_user</span>
                            </div>
                            <h3 className="text-lg font-bold text-text-white mb-3">Why we ask this</h3>
                            <ul className="space-y-4">
                                <li className="flex gap-3">
                                    <span className="material-icons text-primary text-lg">security</span>
                                    <div>
                                        <h4 className="text-sm font-bold text-text-white">Regulatory Compliance</h4>
                                        <p className="text-xs text-text-grey mt-1 leading-relaxed">As a financial institution, we are required by law to verify business information to prevent fraud and ensure security.</p>
                                    </div>
                                </li>
                                <li className="flex gap-3">
                                    <span className="material-icons text-primary text-lg">tune</span>
                                    <div>
                                        <h4 className="text-sm font-bold text-text-white">Personalized Experience</h4>
                                        <p className="text-xs text-text-grey mt-1 leading-relaxed">Your industry and size help us customize your dashboard with relevant features and financial tools.</p>
                                    </div>
                                </li>
                                <li className="flex gap-3">
                                    <span className="material-icons text-primary text-lg">lock</span>
                                    <div>
                                        <h4 className="text-sm font-bold text-text-white">Data Privacy</h4>
                                        <p className="text-xs text-text-grey mt-1 leading-relaxed">Your data is encrypted and will never be shared with third parties without your explicit consent.</p>
                                    </div>
                                </li>
                            </ul>
                            <div className="mt-8 pt-6 border-t border-border-subtle">
                                <div className="flex items-center gap-3">
                                    <div className="flex -space-x-2">
                                        <img className="w-8 h-8 rounded-full border-2 border-card-bg object-cover" alt="Portrait of a smiling professional woman" src="https://lh3.googleusercontent.com/aida-public/AB6AXuA8kRrtfK6tpOMdmGuS3qQ4bZmS9TQnUhpGfbIhxFIylYYuR-FaVm50JPvH-5UHNrbRGIyE6cVLcFQ_C22ZJN7RlXs-DHnT8ejP-qSf0-GdOzCRukJiJQpscWvoc1J3i2fZi7-AECDG3wgIAxGQWnxlhvpt-OsuxBXLe7KGBWXCnKYXZJKCzu6Q1zmIMsoYSyhzIleahHgT0Aspzj4f8e50zBvNnJmg4NL-lAfUQckkR4xgDcxN_1_TJ8BUQJyfwYLvKredmiIAaIs7" />
                                        <img className="w-8 h-8 rounded-full border-2 border-card-bg object-cover" alt="Portrait of a smiling professional man" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBH29Fn7BJPJkUxmP-JDjZFnPncna6s_zrHsN5duCSicJib0keC4AvGgdXo5hD3VMTEdV7EhaIOPOrCajGOOo2FjfK919Iu6cKIXkfVr3kL8DNJuPtQU8XIrJaxlP4gF4eny87cwW5CA2Dr5qEqVuruffWAFOLZqiosPp8XKJrgAhoPcO7o4RksO4tRppIb4CxOtF1Hd3D26wBE4EIg38J692ttcR0AFtvQnNEMHEbKU78jPvmCTQjUjWcGJUQrUEmsb3tUx3bje_PC" />
                                    </div>
                                    <p className="text-[10px] text-text-grey leading-tight">
                                        Trusted by over <span className="font-bold text-primary">15,000+</span> companies worldwide.
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="mt-auto pt-8">
                            <div className="bg-primary/5 rounded-lg p-4 flex items-start gap-3 border border-primary/10">
                                <span className="material-icons text-primary text-sm">info</span>
                                <p className="text-[11px] text-text-grey">
                                    Need help? Contact our onboarding specialist team at <a className="text-primary font-medium hover:underline" href="#">support@velo.io</a>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <footer className="py-6 text-center">
                <p className="text-xs text-text-grey/50">
                    © 2024 Velo Financial Technologies. All rights reserved.
                    <a className="mx-2 hover:text-text-grey transition-colors" href="#">Terms</a>
                    <a className="mx-2 hover:text-text-grey transition-colors" href="#">Privacy</a>
                </p>
            </footer>
        </div>
    );
};

export default OnboardingStep2;
