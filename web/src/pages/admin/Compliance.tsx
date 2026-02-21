import { useState, useEffect } from 'react';
import { admin } from '../../api/client';
import { CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/solid';

export default function AdminCompliance() {
    const [queue, setQueue] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadQueue();
    }, []);

    const loadQueue = async () => {
        try {
            setLoading(true);
            const data = await admin.getComplianceQueue();
            setQueue(data || []);
        } catch (error) {
            console.error('Failed to load compliance queue', error);
        } finally {
            setLoading(false);
        }
    };

    const handleApprove = async (id: string) => {
        try {
            await admin.approveKYC(id);
            loadQueue(); // Refresh
        } catch (error) {
            console.error('Failed to approve', error);
            alert('Failed to approve user');
        }
    };

    const handleReject = async (id: string) => {
        if (!confirm('Are you sure you want to reject this user?')) return;
        try {
            await admin.rejectKYC(id);
            loadQueue(); // Refresh
        } catch (error) {
            console.error('Failed to reject', error);
            alert('Failed to reject user');
        }
    };

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold text-white">Compliance Review Queue</h1>

            {queue.length === 0 && !loading && (
                <div className="bg-gray-800 rounded-lg p-6 text-center text-gray-400">
                    No pending KYC requests.
                </div>
            )}

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {queue.map((user) => (
                    <div key={user.ID} className="bg-gray-800 overflow-hidden shadow rounded-lg border border-gray-700">
                        <div className="px-4 py-5 sm:p-6">
                            <div className="flex items-center justify-between">
                                <h3 className="text-lg leading-6 font-medium text-white">
                                    {user.FullName || 'Unknown User'}
                                </h3>
                                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                                    PENDING
                                </span>
                            </div>
                            <div className="mt-2 max-w-xl text-sm text-gray-400">
                                <p>Email: {user.Email}</p>
                                <p>Company: {user.Company?.Name || 'N/A'}</p>
                                <p>Joined: {new Date(user.CreatedAt).toLocaleDateString()}</p>
                            </div>
                            <div className="mt-4">
                                <h4 className="text-sm font-medium text-gray-300">Submitted Documents</h4>
                                <ul className="mt-2 list-disc list-inside text-sm text-gray-400">
                                    <li>ID Document (Front/Back)</li>
                                    <li>Selfie Check</li>
                                </ul>
                            </div>
                            <div className="mt-5 flex justify-end space-x-3">
                                <button
                                    onClick={() => handleReject(user.ID)}
                                    className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-red-100 bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                                >
                                    <XCircleIcon className="-ml-0.5 mr-2 h-4 w-4" aria-hidden="true" />
                                    Reject
                                </button>
                                <button
                                    onClick={() => handleApprove(user.ID)}
                                    className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-green-100 bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                                >
                                    <CheckCircleIcon className="-ml-0.5 mr-2 h-4 w-4" aria-hidden="true" />
                                    Approve
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
