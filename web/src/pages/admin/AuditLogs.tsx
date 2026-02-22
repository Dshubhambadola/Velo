import React, { useEffect, useState } from 'react';
import { getAuditLogs } from '../../api/developer';

const AuditLogs: React.FC = () => {
    const [logs, setLogs] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        loadLogs();
    }, []);

    const loadLogs = async () => {
        try {
            setLoading(true);
            const data = await getAuditLogs();
            setLogs(data.logs || []);
        } catch (err) {
            console.error(err);
            setError('Failed to load audit logs');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-8">
            <h1 className="text-2xl font-semibold text-white mb-6">Audit Logs</h1>

            {error && (
                <div className="bg-red-500/10 border border-red-500/20 text-red-500 p-4 rounded-xl mb-6">
                    {error}
                </div>
            )}

            {loading ? (
                <div className="text-zinc-400 text-center py-10">Loading audit trail...</div>
            ) : (
                <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-zinc-900/50 border-b border-zinc-800 text-xs uppercase text-zinc-500">
                                <tr>
                                    <th className="px-6 py-4 font-medium">Timestamp</th>
                                    <th className="px-6 py-4 font-medium">User</th>
                                    <th className="px-6 py-4 font-medium">Action</th>
                                    <th className="px-6 py-4 font-medium">Resource</th>
                                    <th className="px-6 py-4 font-medium">IP Address</th>
                                    <th className="px-6 py-4 font-medium">Details</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-zinc-800">
                                {logs.map((log) => (
                                    <tr key={log.ID} className="hover:bg-zinc-800/50 transition-colors">
                                        <td className="px-6 py-4 text-sm text-zinc-300">
                                            {new Date(log.CreatedAt).toLocaleString()}
                                        </td>
                                        <td className="px-6 py-4 text-sm text-zinc-300">
                                            {log.UserID || 'System'}
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-zinc-800 text-zinc-300 border border-zinc-700">
                                                {log.Action}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-zinc-400">
                                            {log.Resource} {log.ResourceID ? `(${log.ResourceID})` : ''}
                                        </td>
                                        <td className="px-6 py-4 text-sm text-zinc-500">
                                            {log.IPAddress || 'N/A'}
                                        </td>
                                        <td className="px-6 py-4 text-sm text-zinc-400 max-w-xs truncate" title={JSON.stringify(log.Details)}>
                                            {JSON.stringify(log.Details)}
                                        </td>
                                    </tr>
                                ))}
                                {logs.length === 0 && (
                                    <tr>
                                        <td colSpan={6} className="px-6 py-8 text-center text-zinc-500">
                                            No audit logs found.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AuditLogs;
