import React from 'react';
import { useNavigate } from 'react-router-dom';

const OnboardingCelebration: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className="bg-deep-bg font-display min-h-screen text-white selection:bg-blue-500/30 overflow-x-hidden relative">
            <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
                <span className="absolute w-2.5 h-2.5 bg-blue-500 rounded-full opacity-90" style={{ top: '12%', left: '8%', transform: 'rotate(45deg)' }}></span>
                <span className="absolute w-2.5 h-2.5 bg-success rounded-sm opacity-90" style={{ top: '18%', left: '82%', transform: 'rotate(15deg)' }}></span>
                <span className="absolute w-2.5 h-2.5 bg-yellow-400 rounded-full opacity-90" style={{ top: '45%', left: '15%', transform: 'rotate(110deg)' }}></span>
                <span className="absolute w-2.5 h-2.5 bg-pink-500 rounded-sm opacity-90" style={{ top: '65%', left: '88%', transform: 'rotate(200deg)' }}></span>
                <span className="absolute w-2.5 h-2.5 bg-success rounded-full opacity-90" style={{ top: '85%', left: '25%', transform: 'rotate(30deg)' }}></span>
                <span className="absolute w-2.5 h-2.5 bg-blue-400 rounded-sm opacity-90" style={{ top: '72%', left: '78%', transform: 'rotate(90deg)' }}></span>
                <span className="absolute w-2.5 h-2.5 bg-purple-500 rounded-full opacity-90" style={{ top: '8%', left: '42%', transform: 'rotate(60deg)' }}></span>
                <span className="absolute w-2.5 h-2.5 bg-orange-500 rounded-sm opacity-90" style={{ top: '92%', left: '55%', transform: 'rotate(180deg)' }}></span>
            </div>

            <nav className="relative z-10 flex justify-end p-8">
                <button
                    onClick={() => navigate('/dashboard')}
                    className="text-sm font-semibold text-white hover:text-[#1E40AF] transition-colors flex items-center gap-1 group"
                >
                    Skip to Dashboard
                    <span className="material-icons text-base group-hover:translate-x-1 transition-transform">chevron_right</span>
                </button>
            </nav>

            <main className="relative z-10 max-w-4xl mx-auto px-6 pb-20 text-center">
                <div className="mb-12 flex flex-col items-center">
                    <div className="w-24 h-24 mb-6 rounded-full bg-success/20 flex items-center justify-center border-4 border-success/30 shadow-2xl shadow-success/20">
                        <span className="material-icons text-success text-6xl">check_circle</span>
                    </div>
                    <div className="inline-flex items-center justify-center text-4xl mb-4">
                        <span className="mr-3">🎉</span>
                        <h1 className="text-5xl font-bold tracking-tight text-white">You’re all set!</h1>
                    </div>
                    <p className="text-xl text-soft-grey max-w-md mx-auto">
                        Your Velo account is ready. Let’s make your first payment.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-16">
                    <div className="bg-card-bg border border-white/10 p-4 rounded-xl flex items-center justify-center gap-3 shadow-lg">
                        <span className="material-icons text-success text-xl">verified</span>
                        <span className="text-sm font-medium text-white">Account verified</span>
                    </div>
                    <div className="bg-card-bg border border-white/10 p-4 rounded-xl flex items-center justify-center gap-3 shadow-lg">
                        <span className="material-icons text-yellow-500 text-xl">account_balance_wallet</span>
                        <span className="text-sm font-medium text-white">Wallet funded: $5,000</span>
                    </div>
                    <div className="bg-card-bg border border-white/10 p-4 rounded-xl flex items-center justify-center gap-3 shadow-lg">
                        <span className="material-icons text-[#1E40AF] text-xl">fact_check</span>
                        <span className="text-sm font-medium text-white">First batch ready: 5 recipients</span>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
                    <div className="group bg-card-bg border border-white/10 p-8 rounded-xl transition-all hover:bg-[#1C222C] hover:border-[#1E40AF]/40 relative overflow-hidden">
                        <div className="absolute -right-4 -top-4 w-24 h-24 bg-[#1E40AF]/10 rounded-full blur-2xl group-hover:bg-[#1E40AF]/20 transition-colors"></div>
                        <div className="w-12 h-12 bg-[#1E40AF] rounded-lg flex items-center justify-center mb-4 text-white shadow-lg shadow-[#1E40AF]/20">
                            <span className="material-icons">rocket_launch</span>
                        </div>
                        <h3 className="text-xl font-bold mb-2 text-white">Execute your first payment</h3>
                        <p className="text-soft-grey mb-6 text-sm">Distribute funds to your first batch of recipients instantly with our secure rails.</p>
                        <button
                            onClick={() => navigate('/dashboard')}
                            className="bg-[#1E40AF] hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-all flex items-center gap-2 shadow-lg shadow-[#1E40AF]/20"
                        >
                            Send Payments
                            <span className="material-icons text-sm">arrow_forward</span>
                        </button>
                    </div>

                    <div className="group bg-card-bg border border-white/10 p-8 rounded-xl transition-all hover:bg-[#1C222C] hover:border-white/20">
                        <div className="w-12 h-12 bg-white/5 rounded-lg flex items-center justify-center mb-4 text-soft-grey group-hover:text-white transition-colors">
                            <span className="material-icons">group_add</span>
                        </div>
                        <h3 className="text-xl font-bold mb-2 text-white">Invite your team</h3>
                        <p className="text-soft-grey mb-6 text-sm">Add your accountants and managers to help streamline your financial workflow.</p>
                        <button className="border border-soft-grey/30 hover:border-white text-white font-semibold py-2.5 px-6 rounded-lg transition-all bg-transparent">
                            Invite Team
                        </button>
                    </div>

                    <div className="group bg-card-bg border border-white/10 p-8 rounded-xl transition-all hover:bg-[#1C222C] hover:border-white/20">
                        <div className="w-12 h-12 bg-white/5 rounded-lg flex items-center justify-center mb-4 text-soft-grey group-hover:text-white transition-colors">
                            <span className="material-icons">bar_chart</span>
                        </div>
                        <h3 className="text-xl font-bold mb-2 text-white">Explore dashboard</h3>
                        <p className="text-soft-grey mb-6 text-sm">Get a bird’s-eye view of your liquidity, transactions, and payment history.</p>
                        <button
                            onClick={() => navigate('/dashboard')}
                            className="border border-soft-grey/30 hover:border-white text-white font-semibold py-2.5 px-6 rounded-lg transition-all bg-transparent"
                        >
                            Go to Dashboard
                        </button>
                    </div>

                    <div className="group bg-card-bg border border-white/10 p-8 rounded-xl transition-all hover:bg-[#1C222C] hover:border-white/20">
                        <div className="w-12 h-12 bg-white/5 rounded-lg flex items-center justify-center mb-4 text-soft-grey group-hover:text-white transition-colors">
                            <span className="material-icons">calendar_today</span>
                        </div>
                        <h3 className="text-xl font-bold mb-2 text-white">Schedule a call</h3>
                        <p className="text-soft-grey mb-6 text-sm">Need help with high-volume transfers? Speak with a dedicated Velo expert.</p>
                        <button className="border border-soft-grey/30 hover:border-white text-white font-semibold py-2.5 px-6 rounded-lg transition-all bg-transparent">
                            Book Call
                        </button>
                    </div>
                </div>

                <div className="mt-16 flex justify-center items-center gap-8 opacity-40 grayscale hover:grayscale-0 transition-all duration-700 invert">
                    <img alt="Partner Logo 1" className="h-6" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDtVD0gdAA8eaqEu79oGQjgw4fNqqlrivXW7IsmoaKmEbldUua4i7NdGQWVxKmDRYJnoOhxA11P0_NSIo8AGfpghRQtpcPIIrQRKaH9mAd1idW4K6x-WpZ3zexVYZdv4OHVDdL109LKsFtz0PE_QrLMNRu9wtCoz0pRs2-sOO02uW4ErED0_FIjcuUofFl25kbY1DqUv1DErHij7DvWQJ8qhuKaTghAfgW4RL9mQA_bKeJdUDQIx0q628dil8QK4u3q257FIEPdHV4P" />
                    <img alt="Partner Logo 2" className="h-6" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC8A7a7jDb-EonU_m4Yw_TSUemsoSzNOdIzmhqT6sVU4KxmJLkPSYs5MYJ5vGNK6-JBAqVT6EFzzCariNzPxLWaWNE8Tvg_K0atRqk4IqUUkOcb47Ox4CgQnwHXZDJJSWSyJ6eJ6xjGOjXV_oB5g-lS5nSI5U2fykX7ScS9F1up4MAVCOM_Z02r0BgrMzDNoKMCKpmGmQ4WMt2GtouSZBOXU7c1oNvuL5LXcIFfdq0UJT3QplGKcfG2QYYB28pGgBeoqdT5e9ND78T0" />
                    <img alt="Partner Logo 3" className="h-6" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDOF6N3LGYjkYkPn3aG7bqiGITQKglY7bcDIuAkl7iMQK5aft39Dn-lCwpQpqT8jhDf-1FDQ4erEWT1k8BVfMtH_f0mIsBk0_J9wtrZ6em3Zw2wwS2ZzBAM2GvevMFVnYSVeigZUmHRSECvDMVAszC8TAJo_YJfvyUSBAo8aufdhdUyxzy1YA4SbvnRAre8_1DQSrxaJ5PZgHz-2mdm-YLQwzpIi8FE3AiyI_X6ny2UCmbk_9eAMAzGVDCyDUmRdThwXJZZuJFPOM9f" />
                </div>
            </main>
            <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#1E40AF]/10 blur-[150px] -z-10 rounded-full"></div>
        </div>
    );
};

export default OnboardingCelebration;
