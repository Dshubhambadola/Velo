import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

export default function SSOCallback() {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    useEffect(() => {
        const token = searchParams.get('token');
        if (token) {
            localStorage.setItem('token', token);
            navigate('/dashboard');
        } else {
            console.error('No token found in SSO callback');
            navigate('/login?error=sso_failed');
        }
    }, [searchParams, navigate]);

    return (
        <div className="min-h-screen bg-obsidian-black flex flex-col justify-center items-center font-display text-white">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand-primary-blue mb-4"></div>
            <h2 className="text-xl font-bold">Completing Sign In...</h2>
            <p className="text-silver-grey mt-2">Please wait while we log you in.</p>
        </div>
    );
}
