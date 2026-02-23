import React, { useState, useEffect } from 'react';
import { CloudArrowUpIcon, LinkIcon, XMarkIcon, ArrowPathIcon } from '@heroicons/react/24/outline'; // v2 outline icons
import Sidebar from '../components/Sidebar';
import { getIntegrations, connectIntegration, disconnectIntegration, syncIntegration, Integration } from '../api/accounting';

const PROVIDERS = [
    { id: 'quickbooks', name: 'QuickBooks Online', logo: 'QB' },
    { id: 'xero', name: 'Xero', logo: 'X' },
    { id: 'netsuite', name: 'NetSuite', logo: 'N' }
];

const AccountingSync: React.FC = () => {
    const [integrations, setIntegrations] = useState<Integration[]>([]);
    const [loading, setLoading] = useState(true);
    const [isProcessing, setIsProcessing] = useState<string | null>(null); // To track which provider is being acted on

    useEffect(() => {
        loadIntegrations();
    }, []);

    const loadIntegrations = async () => {
        try {
            setLoading(true);
            const data = await getIntegrations();
            setIntegrations(data || []);
        } catch (error) {
            console.error("Failed to load integrations:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleConnect = async (providerId: string) => {
        setIsProcessing(providerId);
        try {
            // Simulate OAuth Flow return data
            const dummyAccessToken = "mock_access_" + Date.now();
            const dummyRefreshToken = "mock_refresh_" + Date.now();

            await connectIntegration(providerId, dummyAccessToken, dummyRefreshToken, 3600);
            await loadIntegrations();
        } catch (error) {
            console.error("Failed to connect:", error);
            alert("Connection failed.");
        } finally {
            setIsProcessing(null);
        }
    };

    const handleDisconnect = async (providerId: string) => {
        if (!confirm('Are you sure you want to disconnect this integration?')) return;

        setIsProcessing(providerId);
        try {
            await disconnectIntegration(providerId);
            await loadIntegrations();
        } catch (error) {
            console.error("Failed to disconnect:", error);
        } finally {
            setIsProcessing(null);
        }
    };

    const handleSync = async (providerId: string) => {
        setIsProcessing(`sync_${providerId}`);
        try {
            await syncIntegration(providerId);
            await loadIntegrations(); // Refresh last sync time
        } catch (error) {
            console.error("Failed to sync:", error);
            alert("Sync failed.");
        } finally {
            setIsProcessing(null);
        }
    };

    const getIntegrationStatus = (providerId: string) => {
        return integrations.find(i => i.Provider === providerId);
    };

    return (
        <div className="flex min-h-screen bg-zinc-950 text-slate-200 font-display selection:bg-blue-500/30">
            <Sidebar />

            <main className="flex-1 flex flex-col h-screen overflow-y-auto relative p-8">
                <div className="max-w-7xl mx-auto space-y-8 w-full">

                    {/* Header */}
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
                        <div>
                            <h1 className="text-3xl font-bold text-white tracking-tight">Accounting Integrations</h1>
                            <p className="text-zinc-400 mt-1">Automatically sync your Velo payroll and corporate card transactions.</p>
                        </div>
                    </div>

                    {/* Providers Grid */}
                    {loading ? (
                        <div className="h-64 flex items-center justify-center text-zinc-500">Loading integrations...</div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {PROVIDERS.map((provider) => {
                                const integration = getIntegrationStatus(provider.id);
                                const isConnected = !!integration;
                                const isSyncing = isProcessing === `sync_${provider.id}`;
                                const isConnecting = isProcessing === provider.id;

                                return (
                                    <div key={provider.id} className={`bg-zinc-900 border ${isConnected ? 'border-blue-500/30 shadow-[0_0_15px_rgba(59,130,246,0.1)]' : 'border-zinc-800'} rounded-2xl p-6 relative overflow-hidden transition-all hover:border-zinc-700 block`}>

                                        <div className="flex items-center justify-between mb-8">
                                            <div className="flex items-center space-x-4">
                                                <div className="w-12 h-12 bg-zinc-950 rounded-xl border border-zinc-800 flex items-center justify-center font-bold text-xl text-white">
                                                    {provider.logo}
                                                </div>
                                                <div>
                                                    <h3 className="text-lg font-semibold text-white">{provider.name}</h3>
                                                    {isConnected ? (
                                                        <span className="text-xs font-medium text-emerald-400 flex items-center space-x-1 mt-1">
                                                            <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full"></span>
                                                            <span>Connected</span>
                                                        </span>
                                                    ) : (
                                                        <span className="text-xs font-medium text-zinc-500 mt-1 block">Not connected</span>
                                                    )}
                                                </div>
                                            </div>
                                        </div>

                                        {isConnected && integration ? (
                                            <div className="space-y-4 pt-4 border-t border-zinc-800">
                                                <div className="flex justify-between items-center">
                                                    <span className="text-sm text-zinc-400">Last Sync</span>
                                                    <span className="text-sm font-medium text-zinc-300">
                                                        {integration.LastSyncAt && new Date(integration.LastSyncAt).getTime() > 0
                                                            ? new Date(integration.LastSyncAt).toLocaleString()
                                                            : 'Never'
                                                        }
                                                    </span>
                                                </div>

                                                <div className="flex space-x-3 pt-2">
                                                    <button
                                                        onClick={() => handleSync(provider.id)}
                                                        disabled={isSyncing || isProcessing !== null}
                                                        className="flex-1 flex items-center justify-center space-x-2 bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 py-2.5 rounded-lg text-sm font-medium transition-colors disabled:opacity-50"
                                                    >
                                                        <ArrowPathIcon className={`w-4 h-4 ${isSyncing ? 'animate-spin' : ''}`} />
                                                        <span>{isSyncing ? 'Syncing...' : 'Sync Now'}</span>
                                                    </button>
                                                    <button
                                                        onClick={() => handleDisconnect(provider.id)}
                                                        disabled={isProcessing !== null}
                                                        className="px-4 py-2.5 bg-zinc-950 hover:bg-red-500/10 text-zinc-400 hover:text-red-400 border border-zinc-800 hover:border-red-500/30 rounded-lg transition-colors disabled:opacity-50"
                                                        title="Disconnect"
                                                    >
                                                        <XMarkIcon className="w-5 h-5" />
                                                    </button>
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="pt-4 mt-auto">
                                                <button
                                                    onClick={() => handleConnect(provider.id)}
                                                    disabled={isConnecting || isProcessing !== null}
                                                    className="w-full flex items-center justify-center space-x-2 bg-white text-black py-2.5 rounded-lg text-sm font-medium hover:bg-zinc-200 transition-colors disabled:opacity-50"
                                                >
                                                    {isConnecting ? (
                                                        <ArrowPathIcon className="w-4 h-4 animate-spin" />
                                                    ) : (
                                                        <LinkIcon className="w-4 h-4" />
                                                    )}
                                                    <span>{isConnecting ? 'Connecting...' : 'Connect'}</span>
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    )}

                    {/* How it works info */}
                    <div className="bg-blue-500/5 border border-blue-500/20 rounded-2xl p-6 mt-8">
                        <h4 className="flex items-center space-x-2 text-blue-400 font-medium mb-2">
                            <CloudArrowUpIcon className="w-5 h-5" />
                            <span>How it works</span>
                        </h4>
                        <p className="text-zinc-400 text-sm leading-relaxed max-w-3xl">
                            Connecting your accounting software allows Velo to automatically push payroll runs, contractor payments, and corporate card expenses as journal entries or bills. This eliminates manual data entry and ensures your books are always up to date.
                        </p>
                    </div>

                </div>
            </main>
        </div>
    );
};

export default AccountingSync;
