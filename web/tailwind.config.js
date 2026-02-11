/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    darkMode: "class",
    theme: {
        extend: {
            colors: {
                "primary": "#1949e6", // Updated for Signup
                "brand-deep": "#0f2db3", // Updated for Signup
                "deep-bg": "#0B0E14", // Updated for First Payroll
                "card-bg": "#151921", // Updated for First Payroll
                "soft-grey": "#94A3B8", // Updated for First Payroll
                "brand-blue": "#136dec",
                "background-light": "#f6f7f8",
                "background-dark": "#101822",
                "background-page": "#0B0E14", // Updated for KYC Step
                "background-card": "#151921", // Updated for KYC Step
                "dark-main": "#0B0E14", // Updated for Document Upload
                "dark-card": "#151921", // Updated for Document Upload
                "secondary-gray": "#94A3B8", // Updated for Document Upload
                "slate-deep": "#1e293b",
                "charcoal": "#0B0E14", // Updated for Success Screen
                "slate-card": "#151921", // Updated for Success Screen
                "row-dark": "#1E2538", // Updated for Additional Info
                "bg-deep-navy": "#0b0f1a", // Updated for Manual Review
                "accent-yellow": "#FBBF24", // Updated for Additional Info
                "neutral-surface": "#1e2235", // Updated for Wallet Funding
                "neutral-border": "#2d3450", // Updated for Wallet Funding
                "success": "#10b981", // Updated for Celebration
                "charcoal-dark": "#151921", // Updated for Save Progress
                "neutral-border-white": "rgba(255, 255, 255, 0.08)", // Updated for Save Progress
                "bg-deep": "#0B0E14",
                "bg-card": "#151921",
                "velo-dark": "#0B0E14",
                "velo-card": "#151921",
                "brand-dark": "#0B0E14", // Updated for Email Verification
                "velo-surface": "#151921", // Updated for Signup
                "velo-border": "rgba(255,255,255,0.08)", // Updated for Signup
                "text-secondary": "#94A3B8",
                "secondary-text": "#94A3B8",
                "border-custom": "#242B37",
                "main-bg": "#0B0E14", // Updated for Onboarding Step 2
                "card-bg": "#151921", // Updated for Onboarding Step 2
                "input-bg": "#1C222B", // Updated for Onboarding Step 2
                "text-white": "#FFFFFF", // Updated for Onboarding Step 2
                "text-grey": "#94A3B8", // Updated for Onboarding Step 2
                "border-subtle": "rgba(148, 163, 184, 0.1)", // Updated for Onboarding Step 2
                "border-grey": "rgba(148, 163, 184, 0.3)", // Updated for Onboarding Step 2
                "obsidian": "#000000", // Updated for Login
                "obsidian-dark": "#121212", // Updated for 2FA
                "obsidian-border": "#262626", // Updated for 2FA
                "input-border": "#333333", // Updated for 2FA
                "text-light-grey": "#D1D5DB", // Updated for 2FA
                "border-subtle-dark": "#262626", // Updated for Login (renamed to avoid conflict)
                "silver": "#a1a1aa", // Updated for Login
                "error-red": "#ef4444", // Updated for Login
                "vibrant-blue": "#3b82f6", // Updated for Forgot Password
                "obsidian-black": "#000000", // Updated for Forgot Password
                "charcoal": "#121212", // Updated for Forgot Password
                "silver-grey": "#A0A0A0", // Updated for Forgot Password
                "card-border": "#262626", // Updated for Forgot Password
                "vibrant-red": "#ff3b30", // Updated for Forgot Password
                "subtle-grey": "#8e8e93", // Updated for Forgot Password
                "success-vibrant": "#22c55e", // Updated for Forgot Password
                "obsidian-bg": "#080808", // Updated for Forgot Password
                "obsidian-card": "#121212", // Updated for Forgot Password
                "subtle-grey-text": "#525252", // Updated for Reset Password Success (renamed to avoid conflict)
                "warning-yellow": "#facc15", // Updated for SSO Error
                "obsidian-charcoal": "#121212", // Updated for SSO
                "warning-orange": "#f97316", // Updated for Session Expired
                "brand-primary-blue": "#1E40AF", // Updated for Login Error
                "obsidian-section": "#1C1C1C", // Updated for Device Trust
                "vibrant-blue": "#2d5cf7", // Updated for Magic Link
                "dark-charcoal": "#121212", // Updated for Magic Link
                "charcoal-modal": "#121212", // Updated for Payroll Batch
                "card-midnight": "#151921", // Updated for Payroll Batch
                "border-muted": "#1f1f23", // Updated for Payroll Review
                "neutral-silver": "#A1A1AA", // Updated for Payroll Manual Entry
                "vibrant-green": "#13ec5b", // Updated for Payroll Success
                "surface-accent": "#1a1a1a", // Updated for Execution Progress
                "obsidian-silver": "#A0A0A0", // Updated for Payroll Success
                "surface-dark": "#121212", // Updated for Batch Detail
                "border-dark-obsidian": "#1f1f1f", // Updated for Batch Detail
                "obsidian-lighter": "#1e1e1e", // Updated for Activity Log
                "obsidian-text-primary": "#FFFFFF", // Updated for Activity Log
                "obsidian-text-secondary": "#A0A0A0", // Updated for Activity Log
            },
            fontFamily: {
                "display": ["Inter", "sans-serif"]
            },
            backgroundImage: {
                "brand-gradient": "linear-gradient(135deg, #1e3a8a 0%, #312e81 50%, #4c1d95 100%)",
            },
            borderRadius: {
                "DEFAULT": "0.25rem",
                "lg": "0.5rem",
                "xl": "0.75rem",
                "full": "9999px"
            },
            animation: {
                'blob': 'blob 7s infinite',
            },
            keyframes: {
                blob: {
                    '0%': { transform: 'translate(0px, 0px) scale(1)' },
                    '33%': { transform: 'translate(30px, -50px) scale(1.1)' },
                    '66%': { transform: 'translate(-20px, 20px) scale(0.9)' },
                    '100%': { transform: 'translate(0px, 0px) scale(1)' },
                }
            }
        },
    },
    plugins: [
        require('@tailwindcss/forms'),
    ],
}
