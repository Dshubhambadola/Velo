import React, { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar';
import { getSettings, updateSettings } from '../api/wallet';

const WalletSettings: React.FC = () => {
    const [settings, setSettings] = useState<any>({
        default_network: 'ETH',
        gas_preference: 'standard',
        theme_mode: 'obsidian',
    });
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);

    // API Keys State
    const [apiKeys, setApiKeys] = useState<any[]>([]);
    const [loadingKeys, setLoadingKeys] = useState(false);
    const [generatingKey, setGeneratingKey] = useState(false);
    const [newKeySecret, setNewKeySecret] = useState<string | null>(null);

    useEffect(() => {
        loadSettings();
        loadApiKeys();
    }, []);

    const loadApiKeys = async () => {
        try {
            setLoadingKeys(true);
            const { getDeveloperKeys } = await import('../api/wallet');
            const data = await getDeveloperKeys();
            setApiKeys(data.keys || []);
        } catch (err) {
            console.error('Failed to load API keys', err);
        } finally {
            setLoadingKeys(false);
        }
    };

    const handleGenerateKey = async () => {
        try {
            setGeneratingKey(true);
            setNewKeySecret(null); // Reset previous secret
            const { createDeveloperKey } = await import('../api/wallet');
            const name = `Key - ${new Date().toLocaleDateString()}`;
            const newKey = await createDeveloperKey(name);
            setNewKeySecret(newKey.secret_key);
            loadApiKeys(); // Refresh list
        } catch (err) {
            console.error(err);
            setError('Failed to generate API Key');
        } finally {
            setGeneratingKey(false);
        }
    };

    const handleRevokeKey = async (id: string) => {
        if (!window.confirm('Are you sure you want to revoke this key? Any integrations using it will break.')) return;

        try {
            const { revokeDeveloperKey } = await import('../api/wallet');
            await revokeDeveloperKey(id);
            setSuccessMessage('API key revoked successfully');
            setTimeout(() => setSuccessMessage(null), 3000);
            loadApiKeys();
        } catch (err) {
            console.error(err);
            setError('Failed to revoke API Key');
        }
    };


    const loadSettings = async () => {
        try {
            setLoading(true);
            const data = await getSettings();
            setSettings(data);
            setError(null);
        } catch (err) {
            console.error(err);
            setError('Failed to load settings. Using defaults.');
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async () => {
        try {
            setSaving(true);
            const updated = await updateSettings(settings);
            setSettings(updated);
            setSuccessMessage('Settings saved successfully');
            setTimeout(() => setSuccessMessage(null), 3000);
        } catch (err) {
            console.error(err);
            setError('Failed to save settings');
        } finally {
            setSaving(false);
        }
    };

    const handleChange = (field: string, value: any) => {
        setSettings({ ...settings, [field]: value });
    };

    return (
        <div className="flex min-h-screen bg-black text-white font-display">
            <Sidebar />
            <main className="flex-1 max-w-6xl mx-auto px-6 py-10 pb-32 overflow-y-auto">
                <div className="mb-10">
                    <h1 className="text-3xl font-bold mb-2">Advanced Settings</h1>
                    <p className="text-[#A0A0A0]">Configure network protocols, display overrides, and developer access keys.</p>
                </div>

                {error && (
                    <div className="mb-6 p-4 bg-red-900/20 border border-red-500/50 rounded-lg text-red-200">
                        {error}
                    </div>
                )}

                {successMessage && (
                    <div className="fixed top-6 right-6 p-4 bg-green-900/20 border border-green-500/50 rounded-lg text-green-200 z-50 animate-fade-in-down">
                        {successMessage}
                    </div>
                )}

                {loading ? (
                    <div className="flex items-center justify-center py-20">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#0d6cf2]"></div>
                    </div>
                ) : (
                    <div className="space-y-8">
                        {/* Section 1: Network Preferences */}
                        <section>
                            <div className="flex items-center gap-2 mb-4">
                                <span className="material-icons text-[#0d6cf2] text-sm">settings_input_component</span>
                                <h2 className="text-lg font-semibold tracking-wide uppercase text-[#A0A0A0]/80">Network Preferences</h2>
                            </div>
                            <div className="bg-[#121212] border border-[#262626] rounded-xl p-6 shadow-[0_0_15px_rgba(13,108,242,0.15)] transition-all">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div>
                                        <label className="block text-sm font-medium mb-2 text-white">Default Network</label>
                                        <div className="relative group">
                                            <select
                                                value={settings.default_network}
                                                onChange={(e) => handleChange('default_network', e.target.value)}
                                                className="w-full bg-black border border-[#262626] hover:border-[#0d6cf2]/50 text-white px-4 py-3 rounded-lg appearance-none focus:outline-none focus:border-[#0d6cf2] transition-all"
                                            >
                                                <option value="ETH">Ethereum Mainnet</option>
                                                <option value="MATIC">Polygon</option>
                                                <option value="BASE">Base</option>
                                            </select>
                                            <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
                                                <span className="material-icons text-[#A0A0A0]">expand_more</span>
                                            </div>
                                        </div>
                                        <p className="mt-2 text-xs text-[#A0A0A0]">Default blockchain used for transactions and dapp interactions.</p>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-2 text-white">Gas Price Strategy</label>
                                        <div className="inline-flex p-1 bg-black border border-[#262626] rounded-lg w-full">
                                            <button
                                                onClick={() => handleChange('gas_preference', 'standard')}
                                                className={`flex-1 py-2 text-sm font-medium rounded-md transition-all ${settings.gas_preference === 'standard' ? 'bg-[#262626] text-white' : 'text-[#A0A0A0] hover:text-white'}`}
                                            >
                                                Standard
                                            </button>
                                            <button
                                                onClick={() => handleChange('gas_preference', 'high')}
                                                className={`flex-1 py-2 text-sm font-medium rounded-md transition-all ${settings.gas_preference === 'high' ? 'bg-[#0d6cf2] text-white shadow-lg shadow-[0_0_15px_rgba(13,108,242,0.15)]' : 'text-[#A0A0A0] hover:text-white'}`}
                                            >
                                                Fast
                                            </button>
                                            <button
                                                onClick={() => handleChange('gas_preference', 'instant')}
                                                className={`flex-1 py-2 text-sm font-medium rounded-md transition-all ${settings.gas_preference === 'instant' ? 'bg-[#262626] text-white' : 'text-[#A0A0A0] hover:text-white'}`}
                                            >
                                                Instant
                                            </button>
                                        </div>
                                        <div className="mt-2 flex justify-between items-center">
                                            <p className="text-xs text-[#A0A0A0]">Estimated confirmation: <span className="text-[#0d6cf2]">&lt; 15 seconds</span></p>
                                            <span className="text-xs font-mono text-[#0d6cf2]/80">~12.4 Gwei</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                        {/* Section 2: Display Preferences */}
                        <section>
                            <div className="flex items-center gap-2 mb-4">
                                <span className="material-icons text-[#0d6cf2] text-sm">palette</span>
                                <h2 className="text-lg font-semibold tracking-wide uppercase text-[#A0A0A0]/80">Display Preferences</h2>
                            </div>
                            <div className="bg-[#121212] border border-[#262626] rounded-xl p-6">
                                <div className="mb-8">
                                    <label className="block text-sm font-medium mb-4 text-white">Theme Interface</label>
                                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                        {/* Light Mode */}
                                        <div className="relative cursor-pointer group" onClick={() => handleChange('theme_mode', 'light')}>
                                            <div className={`block p-4 rounded-xl border-2 transition-all ${settings.theme_mode === 'light' ? 'border-[#0d6cf2] bg-[#f5f7f8]' : 'border-[#262626] bg-[#f5f7f8] opacity-50'}`}>
                                                <div className="h-16 w-full bg-white rounded shadow-inner mb-3 flex flex-col gap-2 p-2">
                                                    <div className="h-2 w-2/3 bg-slate-200 rounded"></div>
                                                    <div className="h-2 w-1/2 bg-slate-100 rounded"></div>
                                                </div>
                                                <span className="text-slate-800 font-medium">Light</span>
                                            </div>
                                        </div>
                                        {/* Dark Mode */}
                                        <div className="relative cursor-pointer group" onClick={() => handleChange('theme_mode', 'dark')}>
                                            <div className={`block p-4 rounded-xl border-2 transition-all ${settings.theme_mode === 'dark' ? 'border-[#0d6cf2] bg-slate-900' : 'border-[#262626] bg-slate-900 opacity-50'}`}>
                                                <div className="h-16 w-full bg-slate-800 rounded shadow-inner mb-3 flex flex-col gap-2 p-2">
                                                    <div className="h-2 w-2/3 bg-slate-700 rounded"></div>
                                                    <div className="h-2 w-1/2 bg-slate-700 rounded"></div>
                                                </div>
                                                <span className="text-white font-medium">Dark</span>
                                            </div>
                                        </div>
                                        {/* Obsidian Mode */}
                                        <div className="relative cursor-pointer group" onClick={() => handleChange('theme_mode', 'obsidian')}>
                                            <div className={`block p-4 rounded-xl border-2 transition-all ${settings.theme_mode === 'obsidian' ? 'border-[#0d6cf2] bg-black shadow-[0_0_15px_rgba(13,108,242,0.15)]' : 'border-[#262626] bg-black opacity-50'}`}>
                                                <div className="h-16 w-full bg-[#121212] rounded shadow-inner mb-3 flex flex-col gap-2 p-2 border border-[#262626]">
                                                    <div className="h-2 w-2/3 bg-[#262626] rounded"></div>
                                                    <div className="h-2 w-1/2 bg-[#262626] rounded"></div>
                                                </div>
                                                <div className="flex items-center justify-between">
                                                    <span className="text-white font-medium">Obsidian</span>
                                                    {settings.theme_mode === 'obsidian' && <span className="material-icons text-[#0d6cf2] text-sm">check_circle</span>}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center justify-between py-4 border-t border-[#262626]">
                                    <div>
                                        <p className="font-medium">Compact Mode</p>
                                        <p className="text-xs text-[#A0A0A0]">Reduce padding and font sizes for high-density information.</p>
                                    </div>
                                    <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-[#0d6cf2]/20 border border-[#0d6cf2]/30">
                                        <span className="translate-x-6 inline-block h-4 w-4 transform rounded-full bg-[#0d6cf2] transition"></span>
                                    </button>
                                </div>
                            </div>
                        </section>
                        {/* Section 3: Developer Options (Static for now) */}
                        <section>
                            <div className="flex items-center gap-2 mb-4">
                                <span className="material-icons text-[#0d6cf2] text-sm">code</span>
                                <h2 className="text-lg font-semibold tracking-wide uppercase text-[#A0A0A0]/80">Developer Options</h2>
                            </div>
                            <div className="bg-[#121212] border border-[#262626] rounded-xl overflow-hidden">
                                <div className="p-6 border-b border-[#262626] flex items-center justify-between">
                                    <div>
                                        <h3 className="font-medium">Active API Keys</h3>
                                        <p className="text-xs text-[#A0A0A0]">Keys used to authenticate your custom dApps and integrations.</p>
                                    </div>
                                    <button
                                        onClick={handleGenerateKey}
                                        disabled={generatingKey}
                                        className="px-4 py-2 bg-[#0d6cf2] hover:bg-[#0d6cf2]/90 text-white rounded-lg text-sm font-medium transition-all flex items-center gap-2 disabled:opacity-50">
                                        {generatingKey ? (
                                            <span className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></span>
                                        ) : (
                                            <span className="material-icons text-sm">add</span>
                                        )}
                                        Generate New Key
                                    </button>
                                </div>
                                {newKeySecret && (
                                    <div className="p-4 m-6 mb-0 bg-green-900/20 border border-green-500/50 rounded-lg">
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <h4 className="text-sm font-bold text-green-400 mb-1">Key Generated Successfully</h4>
                                                <p className="text-xs text-green-200 mb-2">Please copy this secret key now. You will not be able to see it again.</p>
                                                <code className="bg-black/50 px-3 py-1.5 rounded text-sm text-white border border-green-500/30 break-all">{newKeySecret}</code>
                                            </div>
                                            <button
                                                onClick={() => navigator.clipboard.writeText(newKeySecret)}
                                                className="p-1.5 text-green-400 hover:bg-green-400/10 rounded transition-colors"
                                                title="Copy to clipboard"
                                            >
                                                <span className="material-icons text-lg">content_copy</span>
                                            </button>
                                        </div>
                                    </div>
                                )}
                                <div className="divide-y divide-[#262626]">
                                    {loadingKeys ? (
                                        <div className="p-8 flex justify-center">
                                            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-[#0d6cf2]"></div>
                                        </div>
                                    ) : apiKeys.length === 0 ? (
                                        <div className="p-8 text-center text-[#A0A0A0] text-sm">
                                            No active API keys found.
                                        </div>
                                    ) : (
                                        apiKeys.map((key) => (
                                            <div key={key.id} className="p-4 flex items-center justify-between hover:bg-white/[0.02] transition-colors">
                                                <div className="flex items-center gap-4">
                                                    <div className="w-10 h-10 rounded bg-[#0d6cf2]/10 flex items-center justify-center text-[#0d6cf2]">
                                                        <span className="material-icons">vpn_key</span>
                                                    </div>
                                                    <div>
                                                        <p className="text-sm font-medium">{key.name}</p>
                                                        <p className="text-xs font-mono text-[#A0A0A0]">{key.prefix}••••••••••••••••</p>
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-4">
                                                    <div className="text-right hidden sm:block">
                                                        <p className="text-[10px] text-[#A0A0A0] uppercase tracking-wider">Created</p>
                                                        <p className="text-xs">{new Date(key.created_at).toLocaleDateString()}</p>
                                                    </div>
                                                    <button
                                                        onClick={() => handleRevokeKey(key.id)}
                                                        className="px-3 py-1 text-xs font-semibold text-red-400 hover:bg-red-400/10 rounded border border-red-400/20 transition-all uppercase tracking-wider">
                                                        Revoke
                                                    </button>
                                                </div>
                                            </div>
                                        ))
                                    )}
                                </div>
                            </div>
                        </section>
                    </div>
                )}
            </main>
            {/* Sticky Action Footer */}
            <div className="fixed bottom-0 inset-x-0 bg-black/80 backdrop-blur-xl border-t border-[#262626] py-4 px-6 z-50 ml-64">
                <div className="max-w-6xl mx-auto flex items-center justify-between">
                    <div className="hidden md:flex items-center gap-2 text-[#A0A0A0] text-xs">
                        <span className="material-icons text-xs">info</span>
                        Last saved: {settings.updated_at ? new Date(settings.updated_at).toLocaleString() : 'Never'}
                    </div>
                    <div className="flex items-center gap-4 w-full md:w-auto">
                        <button
                            className="flex-1 md:flex-none px-6 py-2.5 text-sm font-medium text-[#A0A0A0] hover:text-white transition-colors"
                            onClick={loadSettings}
                        >
                            Reset
                        </button>
                        <button
                            onClick={handleSave}
                            disabled={saving || loading}
                            className={`flex-1 md:flex-none px-8 py-2.5 bg-[#0d6cf2] hover:bg-[#0d6cf2]/90 text-white rounded-lg font-semibold shadow-lg shadow-[0_0_15px_rgba(13,108,242,0.15)] transition-all ${saving ? 'opacity-70 cursor-wait' : ''}`}
                        >
                            {saving ? 'Saving...' : 'Save Changes'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WalletSettings;
