import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../api/auth';

export default function Login() {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            const data = await login(formData.email, formData.password);
            localStorage.setItem('token', data.token); // Store token
            navigate('/dashboard'); // Redirect to dashboard after successful login
        } catch (err: any) {
            setError(err.response?.data?.error || 'Invalid email or password.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-obsidian-black min-h-screen flex flex-col justify-center items-center p-4 font-display">
            <div className="mb-8 flex flex-col items-center">
                <div className="flex items-center gap-2 mb-2">
                    <div className="w-10 h-10 bg-brand-primary-blue rounded-lg flex items-center justify-center">
                        <span className="text-white font-bold text-xl">V</span>
                    </div>
                    <span className="text-2xl font-bold tracking-tight text-white">Velo</span>
                </div>
                <p className="text-silver-grey text-sm font-medium">B2B Fintech Solutions</p>
            </div>
            <main className="w-full max-w-[440px] bg-obsidian-charcoal shadow-2xl rounded-xl border border-obsidian-border p-8">
                <div className="text-center mb-8">
                    <h1 className="text-2xl font-bold text-white">Sign in to Velo</h1>
                    <p className="text-silver-grey mt-2">Enter your professional credentials</p>
                </div>
                <form className="space-y-5" onSubmit={handleSubmit}>
                    <div className="space-y-1.5">
                        <label className="text-sm font-semibold text-silver-grey" htmlFor="email">Work email</label>
                        <div className="relative">
                            <input
                                className={`w-full px-4 py-3 rounded-lg border-2 ${error ? 'border-vibrant-red' : 'border-obsidian-border'} focus:ring-0 focus:outline-none bg-transparent text-white`}
                                id="email"
                                name="email"
                                placeholder="name@company.com"
                                type="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                            {error && (
                                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                                    <span className="material-icons text-vibrant-red text-xl">error_outline</span>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="space-y-1.5">
                        <div className="flex justify-between items-center">
                            <label className="text-sm font-semibold text-silver-grey" htmlFor="password">Password</label>
                        </div>
                        <div className="relative">
                            <input
                                className={`w-full px-4 py-3 rounded-lg border-2 ${error ? 'border-vibrant-red' : 'border-obsidian-border'} focus:ring-0 focus:outline-none bg-transparent text-white`}
                                id="password"
                                name="password"
                                type="password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                            />
                            <button className="absolute inset-y-0 right-0 pr-3 flex items-center text-silver-grey/50 hover:text-white" type="button">
                                <span className="material-icons text-xl">visibility_off</span>
                            </button>
                        </div>
                    </div>

                    {error && (
                        <div className="bg-vibrant-red/5 border border-vibrant-red/20 rounded-lg p-3 space-y-2">
                            <div className="flex items-center gap-2 text-vibrant-red">
                                <span className="material-icons text-lg">warning</span>
                                <p className="text-sm font-medium">{error}</p>
                            </div>
                        </div>
                    )}

                    <div className="flex justify-end">
                        <Link to="/forgot-password" className="text-brand-primary-blue hover:underline text-sm font-bold bg-brand-primary-blue/10 px-2 py-1 rounded">
                            Forgot password?
                        </Link>
                    </div>
                    <button
                        className="w-full bg-brand-primary-blue hover:bg-brand-primary-blue/90 text-white font-bold py-3.5 rounded-lg transition-colors shadow-lg shadow-brand-primary-blue/20 disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={loading}
                    >
                        {loading ? 'Signing in...' : 'Sign in'}
                    </button>
                </form>
                <div className="mt-8 pt-8 border-t border-obsidian-border">
                    <button className="w-full flex items-center justify-center gap-3 px-4 py-3 border border-obsidian-border rounded-lg text-sm font-medium text-silver-grey hover:bg-white/5 transition-colors">
                        <img alt="" className="w-5 h-5" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDmaSng3w5CQEDy9wS9DvPYtDwSLq_JhDDverTy_2fxLWc1abK0XZOgaNG4ULPdyAflyLr6hrFNWkL9w5IGPlKh0EmPkW0kETENw6yQAjaxE47Cn6E5JneeN7ZU4d-7J1aiHVLaaLdXKFgeg_KbKMm4F2jItqeL_iDzOpA-evKi3N-m1gLRoC8pdsMSWCpmj9cwUKqxgfREfVkS1nQGwCdvXnCPf0LM4EKAOoo2GQFaHQ5DVQR7UEtNqUvFHbBEECLxJzoJ-waB09FM" />
                        Sign in with SSO
                    </button>
                </div>
            </main>
            <div className="mt-8 text-center">
                <p className="text-silver-grey/60 text-sm">
                    Don't have an account?
                    <Link to="/signup" className="text-silver-grey font-bold hover:underline ml-1">Create an account</Link>
                </p>
            </div>
            <div className="mt-12 flex items-center gap-4 opacity-40 grayscale transition-all cursor-default">
                <div className="flex items-center gap-1 text-silver-grey">
                    <span className="material-icons text-sm">lock</span>
                    <span className="text-[10px] font-bold uppercase tracking-widest">AES-256 Encryption</span>
                </div>
                <div className="flex items-center gap-1 text-silver-grey">
                    <span className="material-icons text-sm">verified_user</span>
                    <span className="text-[10px] font-semibold uppercase tracking-widest">SOC2 Compliant</span>
                </div>
            </div>
        </div>
    );
}
