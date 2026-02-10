import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const OnboardingStep3: React.FC = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        firstName: 'Jonathan',
        lastName: 'Anderson',
        dob: '',
        phoneCode: '+1',
        phone: '',
        address: '',
        city: '',
        state: '',
        zip: '',
        country: 'United States',
        idType: 'Passport',
        docNumber: '',
        issuingCountry: 'United States',
        expiryDate: ''
    });

    const handleContinue = () => {
        // Navigate to dashboard (placeholder for Step 4)
        navigate('/onboarding/document-upload');
    };

    return (
        <div className="bg-background-page font-display text-[#94A3B8] min-h-screen flex flex-col">
            <header className="bg-background-card border-b border-[#2D3748] py-4 px-8 sticky top-0 z-50">
                <div className="max-w-7xl mx-auto flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-primary rounded flex items-center justify-center">
                            <span className="material-icons text-white text-xl">account_balance</span>
                        </div>
                        <span className="text-xl font-bold tracking-tight text-white">VELO</span>
                    </div>
                    <div className="flex items-center gap-4 text-sm font-medium text-[#94A3B8]">
                        <span>KYC Verification Pipeline</span>
                        <span className="material-icons text-sm">chevron_right</span>
                        <span className="text-primary">Step 3 of 5</span>
                    </div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-4 py-8 md:py-12 flex-grow w-full">
                <div className="max-w-3xl mx-auto mb-10">
                    <div className="flex justify-between items-end mb-2">
                        <span className="text-sm font-semibold text-primary uppercase tracking-wider">Verification Progress</span>
                        <span className="text-sm font-bold text-[#94A3B8]">60% Complete</span>
                    </div>
                    <div className="w-full bg-[#1e293b] h-2 rounded-full overflow-hidden border border-[#2D3748]">
                        <div className="bg-primary h-full w-[60%]" role="progressbar" aria-valuenow={60} aria-valuemin={0} aria-valuemax={100}></div>
                    </div>
                </div>

                <div className="flex flex-col lg:flex-row gap-8 items-start justify-center">
                    <div className="w-full lg:w-[680px]">
                        <div className="bg-background-card rounded-xl shadow-2xl border border-[#2D3748] p-8">
                            <div className="mb-8">
                                <div className="flex items-center gap-2 mb-2">
                                    <h1 className="text-2xl font-bold text-white">Verify your identity</h1>
                                    <span className="material-icons text-primary text-xl">verified_user</span>
                                </div>
                                <p className="text-[#94A3B8]">
                                    Required for compliance. Your information is encrypted and secure 🔒
                                </p>
                            </div>

                            <form className="space-y-10" onSubmit={(e) => { e.preventDefault(); handleContinue(); }}>
                                <section>
                                    <div className="flex items-center gap-2 mb-4">
                                        <span className="w-6 h-6 rounded-full bg-primary/20 text-primary flex items-center justify-center text-xs font-bold">1</span>
                                        <h2 className="font-semibold text-lg text-white">Personal Details</h2>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="relative">
                                            <label className="block text-sm font-medium text-[#94A3B8] mb-1">First Name</label>
                                            <input
                                                className="w-full rounded-lg border-[#2D3748] bg-[#0B0E14] text-white focus:ring-primary focus:border-primary"
                                                type="text"
                                                value={formData.firstName}
                                                onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                                            />
                                            <span className="material-icons absolute right-3 top-9 text-green-500 text-sm">check_circle</span>
                                        </div>
                                        <div className="relative">
                                            <label className="block text-sm font-medium text-[#94A3B8] mb-1">Last Name</label>
                                            <input
                                                className="w-full rounded-lg border-[#2D3748] bg-[#0B0E14] text-white focus:ring-primary focus:border-primary"
                                                type="text"
                                                value={formData.lastName}
                                                onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                                            />
                                            <span className="material-icons absolute right-3 top-9 text-green-500 text-sm">check_circle</span>
                                        </div>
                                        <div className="relative">
                                            <label className="block text-sm font-medium text-[#94A3B8] mb-1">Date of Birth</label>
                                            <div className="relative">
                                                <input
                                                    className="w-full rounded-lg border-[#2D3748] bg-[#0B0E14] text-white focus:ring-primary focus:border-primary"
                                                    type="date"
                                                    onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-[#94A3B8] mb-1">Phone Number</label>
                                            <div className="flex">
                                                <select className="rounded-l-lg border-r-0 border-[#2D3748] bg-[#1e293b] text-white text-sm focus:ring-primary focus:border-primary">
                                                    <option>🇺🇸 +1</option>
                                                    <option>🇬🇧 +44</option>
                                                    <option>🇩🇪 +49</option>
                                                </select>
                                                <input
                                                    className="w-full rounded-r-lg border-[#2D3748] bg-[#0B0E14] text-white focus:ring-primary focus:border-primary"
                                                    placeholder="201 555 0123"
                                                    type="tel"
                                                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </section>

                                <section>
                                    <div className="flex items-center gap-2 mb-4">
                                        <span className="w-6 h-6 rounded-full bg-primary/20 text-primary flex items-center justify-center text-xs font-bold">2</span>
                                        <h2 className="font-semibold text-lg text-white">Residential Address</h2>
                                    </div>
                                    <div className="space-y-4">
                                        <div>
                                            <label className="block text-sm font-medium text-[#94A3B8] mb-1">Street Address</label>
                                            <input
                                                className="w-full rounded-lg border-[#2D3748] bg-[#0B0E14] text-white focus:ring-primary focus:border-primary"
                                                placeholder="123 Business Avenue, Suite 100"
                                                type="text"
                                                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                                            />
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-sm font-medium text-[#94A3B8] mb-1">City</label>
                                                <input
                                                    className="w-full rounded-lg border-[#2D3748] bg-[#0B0E14] text-white focus:ring-primary focus:border-primary"
                                                    placeholder="New York"
                                                    type="text"
                                                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-[#94A3B8] mb-1">State / Province</label>
                                                <select
                                                    className="w-full rounded-lg border-[#2D3748] bg-[#0B0E14] text-white focus:ring-primary focus:border-primary"
                                                    onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                                                >
                                                    <option value="">Select state</option>
                                                    <option value="NY">New York</option>
                                                    <option value="CA">California</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-sm font-medium text-[#94A3B8] mb-1">Postal Code</label>
                                                <input
                                                    className="w-full rounded-lg border-[#2D3748] bg-[#0B0E14] text-white focus:ring-primary focus:border-primary"
                                                    placeholder="10001"
                                                    type="text"
                                                    onChange={(e) => setFormData({ ...formData, zip: e.target.value })}
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-[#94A3B8] mb-1">Country</label>
                                                <input
                                                    className="w-full rounded-lg border-[#2D3748] bg-[#151921] text-[#64748B] cursor-not-allowed"
                                                    readOnly
                                                    type="text"
                                                    value="United States"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </section>

                                <section>
                                    <div className="flex items-center gap-2 mb-4">
                                        <span className="w-6 h-6 rounded-full bg-primary/20 text-primary flex items-center justify-center text-xs font-bold">3</span>
                                        <h2 className="font-semibold text-lg text-white">Identification Document</h2>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-[#94A3B8] mb-1">ID Type</label>
                                            <select
                                                className="w-full rounded-lg border-[#2D3748] bg-[#0B0E14] text-white focus:ring-primary focus:border-primary"
                                                onChange={(e) => setFormData({ ...formData, idType: e.target.value })}
                                            >
                                                <option>Passport</option>
                                                <option>Driver's License</option>
                                                <option>National ID Card</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-[#94A3B8] mb-1 flex items-center gap-1">
                                                Document Number
                                                <span className="material-icons text-[#64748B] text-xs cursor-help">help_outline</span>
                                            </label>
                                            <input
                                                className="w-full rounded-lg border-[#2D3748] bg-[#0B0E14] text-white focus:ring-primary focus:border-primary"
                                                placeholder="E.g. A1234567"
                                                type="text"
                                                onChange={(e) => setFormData({ ...formData, docNumber: e.target.value })}
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-[#94A3B8] mb-1">Issuing Country</label>
                                            <div className="relative">
                                                <select
                                                    className="w-full pl-10 rounded-lg border-[#2D3748] bg-[#0B0E14] text-white focus:ring-primary focus:border-primary"
                                                    onChange={(e) => setFormData({ ...formData, issuingCountry: e.target.value })}
                                                >
                                                    <option>United States</option>
                                                    <option>United Kingdom</option>
                                                    <option>Canada</option>
                                                </select>
                                                <span className="absolute left-3 top-2.5 text-lg">🇺🇸</span>
                                            </div>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-[#94A3B8] mb-1">Expiration Date</label>
                                            <input
                                                className="w-full rounded-lg border-[#2D3748] bg-[#0B0E14] text-white focus:ring-primary focus:border-primary"
                                                type="date"
                                                onChange={(e) => setFormData({ ...formData, expiryDate: e.target.value })}
                                            />
                                        </div>
                                    </div>
                                </section>

                                <div className="pt-6 border-t border-[#2D3748]">
                                    <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                                        <Link to="/onboarding/step2" className="order-2 md:order-1 px-6 py-2.5 rounded-lg border border-[#2D3748] text-white font-medium hover:bg-[#1e293b] transition-colors text-center">
                                            Back
                                        </Link>
                                        <div className="order-1 md:order-2 flex flex-col items-end gap-2 w-full md:w-auto">
                                            <button className="w-full md:w-auto px-8 py-3 rounded-lg bg-primary text-white font-semibold hover:bg-blue-800 shadow-lg shadow-primary/10 transition-all" type="submit">
                                                Continue to Document Upload
                                            </button>
                                            <button className="text-sm font-medium text-primary hover:text-blue-400 hover:underline" type="button">
                                                Save and complete later
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>

                    <aside className="w-full lg:w-[320px] space-y-6">
                        <div className="bg-background-card rounded-xl border border-[#2D3748] overflow-hidden">
                            <div className="p-4 border-b border-[#2D3748] flex items-center justify-between">
                                <h3 className="font-semibold text-white">Why do we need this?</h3>
                                <span className="material-icons text-[#94A3B8]">expand_less</span>
                            </div>
                            <div className="p-4 space-y-3">
                                <div className="text-sm text-[#94A3B8] leading-relaxed">
                                    To comply with anti-money laundering (AML) and know-your-customer (KYC) regulations, we must verify the identity of our users.
                                </div>
                                <ul className="text-xs space-y-2 text-[#94A3B8]">
                                    <li className="flex gap-2">
                                        <span className="material-icons text-primary text-[14px]">check</span>
                                        Prevents fraudulent activity
                                    </li>
                                    <li className="flex gap-2">
                                        <span className="material-icons text-primary text-[14px]">check</span>
                                        Secures your business account
                                    </li>
                                    <li className="flex gap-2">
                                        <span className="material-icons text-primary text-[14px]">check</span>
                                        Enables high-volume transfers
                                    </li>
                                </ul>
                            </div>
                        </div>

                        <div className="bg-primary/5 rounded-xl p-6 border border-primary/20">
                            <h3 className="text-xs font-bold text-[#64748B] uppercase tracking-widest mb-4">Security Standards</h3>
                            <div className="space-y-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-[#1e293b] border border-[#2D3748] shadow-sm flex items-center justify-center">
                                        <span className="material-icons text-primary">lock</span>
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold text-white">AES-256 Bit</p>
                                        <p className="text-xs text-[#94A3B8]">Bank-grade encryption</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-[#1e293b] border border-[#2D3748] shadow-sm flex items-center justify-center">
                                        <span className="material-icons text-primary">security</span>
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold text-white">GDPR Compliant</p>
                                        <p className="text-xs text-[#94A3B8]">Your data belongs to you</p>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-8 pt-6 border-t border-primary/20 flex flex-col items-center">
                                <p className="text-[10px] text-[#64748B] uppercase font-bold mb-3 tracking-tighter">Verified Identity Partner</p>
                                <div className="bg-[#1e293b] px-4 py-2 rounded border border-[#2D3748] flex items-center gap-2">
                                    <span className="material-icons text-green-500 text-sm">verified</span>
                                    <span className="text-xs font-bold text-[#94A3B8]">Verified by Sumsub</span>
                                </div>
                            </div>
                        </div>

                        <div className="text-center p-4">
                            <p className="text-sm text-[#64748B]">Need help? <a className="text-primary font-medium hover:text-blue-400" href="#">Contact Support</a></p>
                        </div>
                    </aside>
                </div>
            </main>
        </div>
    );
};

export default OnboardingStep3;
