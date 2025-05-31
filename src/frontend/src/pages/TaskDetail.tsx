import React from 'react';
import { useSession } from '../context/sessionContext';
import { useState } from 'react';
import { TaskExpand } from '../declarations/backend/backend.did';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

const TaskDetail: React.FC = () => {
    const { id } = useParams();
    const { backend, user, isAuthenticated } = useSession();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [task, setTask] = useState<TaskExpand | null>(null);

    const fetchTask = async () => {

        console.log(user);
        console.log(isAuthenticated);
        try {
            setLoading(true);
            if (!id) {
                throw new Error('Task ID is required');
            }
            const taskData = await backend.expandTask(BigInt(1));
            setTask(taskData[0] || null);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to fetch task');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTask();
    }, [id]);

    if (loading) {
        return (
            <div className="container mx-auto px-4 py-8">
                <div className="max-w-4xl mx-auto">
                    <div className="animate-pulse">
                        <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
                        <div className="h-4 bg-gray-200 rounded w-1/2 mb-8"></div>
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                            <div className="lg:col-span-2 space-y-6">
                                <div className="h-40 bg-gray-200 rounded"></div>
                                <div className="h-32 bg-gray-200 rounded"></div>
                            </div>
                            <div className="space-y-6">
                                <div className="h-48 bg-gray-200 rounded"></div>
                                <div className="h-32 bg-gray-200 rounded"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="container mx-auto px-4 py-8">
                <div className="max-w-4xl mx-auto">
                    <div className="bg-red-50 border border-red-200 rounded-xl p-6">
                        <h2 className="text-xl font-semibold text-red-800 mb-2">Error</h2>
                        <p className="text-red-600">{error}</p>
                    </div>
                </div>
            </div>
        );
    }

    if (!task) {
        return (
            <div className="container mx-auto px-4 py-8">
                <div className="max-w-4xl mx-auto">
                    <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6">
                        <h2 className="text-xl font-semibold text-yellow-800 mb-2">Task Not Found</h2>
                        <p className="text-yellow-600">The requested task could not be found.</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="max-w-4xl mx-auto">
                {/* Header Section */}
                <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
                        <div className="flex-1">
                            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">
                                {task.title}
                            </h1>
                            <div className="flex items-center gap-2 text-sm text-gray-500">
                                <span>Created: {new Date(Number(task.createdAt)).toLocaleDateString()}</span>
                                <span>•</span>
                                <span>Status: {task.status.toString()}</span>
                            </div>
                        </div>
                        <div className="flex flex-col items-start sm:items-end gap-2">
                            <div className="text-xl font-bold text-gray-800">
                                Reward: {task.rewardRange[0]} - {task.rewardRange[1]} USDC
                            </div>
                            <button
                                className="px-6 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
                            >
                                Place Bid
                            </button>
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Left Column - Task Details */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Description */}
                        <div className="bg-white rounded-xl shadow-sm p-6">
                            <h2 className="text-xl font-semibold mb-4">Description</h2>
                            <p className="text-gray-600 whitespace-pre-wrap">
                                {task.description}
                            </p>
                        </div>

                        {/* Keywords */}
                        {/* <div className="bg-white rounded-xl shadow-sm p-6">
                            <h2 className="text-xl font-semibold mb-4">Required Skills</h2>
                            <div className="flex flex-wrap gap-2">
                                {task.keywords.map((keyword, index) => (
                                    <span key={index} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                                        {keyword}
                                    </span>
                                ))}
                            </div>
                        </div> */}

                        {/* Attachments */}
                        <div className="bg-white rounded-xl shadow-sm p-6">
                            <h2 className="text-xl font-semibold mb-4">Attachments</h2>
                            <div className="space-y-2">
                                {task.assets.length > 0 ? (
                                    task.assets.map((asset, index) => (
                                        <div key={index} className="flex items-center gap-2 p-2 hover:bg-gray-50 rounded">
                                            <span className="text-gray-500">{asset.mimeTypes}</span>
                                        </div>
                                    ))
                                ) : (
                                    <p className="text-gray-500">No attachments</p>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Right Column - Sidebar */}
                    <div className="space-y-6">
                        {/* Client Info */}
                        <div className="bg-white rounded-xl shadow-sm p-6">
                            <h2 className="text-xl font-semibold mb-4">About the Client</h2>
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
                                    <span className="text-xl">👤</span>
                                </div>
                                <div>
                                    <p className="font-medium">Client ID: {task.owner.toString()}</p>
                                </div>
                            </div>
                        </div>

                        {/* Bids Overview */}
                        {/* <div className="bg-white rounded-xl shadow-sm p-6">
                            <h2 className="text-xl font-semibold mb-4">Bids Overview</h2>
                            <div className="space-y-2">
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-500">Total bids</span>
                                    <span>{task.bidsCounter}</span>
                                </div>
                            </div>
                        </div> */}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TaskDetail;
