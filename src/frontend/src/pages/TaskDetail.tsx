import React from 'react';
import { Principal } from "@dfinity/principal"
import { useSession } from '../context/sessionContext';
import { useState } from 'react';
import { TaskExpand, User, Offer, TaskStatus } from '../declarations/backend/backend.did';
import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const TaskDetail: React.FC = () => {
    const { id } = useParams();
    const { backend, user, isAuthenticated } = useSession();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [task, setTask] = useState<TaskExpand | null>(null);
    const [author, setAuthor] = useState<User | null>(null)
    const [bids, setBids] = useState<[Principal, Offer][]>([])
    const [showMyBid, setShowMyBid] = useState(false);
    const [showInfoAuthor, setShowInfoAuthor] = useState(false);
    const [amountBid, setAmountBid] = useState(BigInt(0));
    const navigate = useNavigate();


    const fetchTask = async () => {

        try {
            setLoading(true);
            if (!id) {
                throw new Error('Task ID is required');
            }
            const taskData = await backend.expandTask(BigInt(id));
            if (taskData[0]) {
                setTask(taskData[0].task || null);
                if (taskData[0]) {
                    setAuthor(taskData[0].author)
                    setBids(taskData[0].bidsDetails)
                    setAmountBid(taskData[0].task.rewardRange[0])
                }
                console.log(bids)
            }
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to fetch task');
        } finally {
            setLoading(false);

        }
    };

    const getStatus = (status: TaskStatus) => {
        if ("ToDo" in status) { return "To Do" }
        if ("InProgress" in status) { return "In Progress" }
        if ("Done" in status) { return "Done" }
        if ("Assigned" in status) { return "Assigned" }
        if ("Cancelled" in status) { return "Cancelled" }

    }

    const handlePlaceBid = async () => {
        if (task) {
            const responsePlaceBid = await backend.applyForTask({ taskId: task.id, amount: BigInt(amountBid) });
            if ("Ok" in responsePlaceBid) {
                alert("success")
            };
            if ("Err" in responsePlaceBid) {
                alert(responsePlaceBid.Err)
            }
        }
    }

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
                                <span>Created: {new Date(Number(task.createdAt) / 1000000).toLocaleDateString()}</span>
                                <span>•</span>
                                <span>Status: {getStatus(task.status)}</span>
                            </div>
                        </div>
                        <div className="flex flex-col items-start sm:items-end gap-2">
                            <div className="text-xl font-bold text-gray-800">
                                Reward: {task.rewardRange[0]} - {task.rewardRange[1]} USDC
                            </div>

                            {/* Contenedor relativo para posicionar el div flotante */}
                            <div className="relative">
                                <button
                                    onClick={() => setShowMyBid(!showMyBid)}
                                    className="px-6 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
                                >
                                    Place Bid
                                </button>

                                {/* Div flotante absolutamente posicionado respecto al botón */}
                                {showMyBid && (
                                    <div className="absolute h-50 w-50 right-0 bg-gray-400 rounded shadow-lg text-center flex flex-col items-center justify-center z-10">
                                        <div className='h-10 w-40 bg-gray-500 rounded-full flex items-center justify-center mb-5'>
                                            <input
                                                type="number"
                                                onChange={(e) => setAmountBid(BigInt(e.target.value))}
                                                className='w-24 text-center rounded-full px-2 py-1 text-gray-900
                                            focus:outline-none 
                                            [&::-webkit-outer-spin-button]:appearance-none 
                                            [&::-webkit-inner-spin-button]:appearance-none 
                                            [-moz-appearance:textfield]'
                                                placeholder={task.rewardRange[0].toString()} />

                                            <span>USD</span>
                                        </div>
                                        <span
                                            onClick={handlePlaceBid}
                                            className='bg-[#2244ff] rounded-full py-2 px-4 w-40 hover:bg-[#1122ff] cursor-pointer'
                                        >
                                            submit
                                        </span>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 text-gray-600">
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
                        <div className="bg-white rounded-xl shadow-sm p-6">
                            <h2 className="text-xl font-semibold mb-4">Required Skills</h2>
                            <div className="flex flex-wrap gap-2">
                                {task.keywords.map((keyword, index) => (
                                    <span key={index} className="bg-gray-400 text-gray-700 px-3 py-1 rounded-full text-sm">
                                        {keyword}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Attachments */}
                        <div className="bg-white rounded-xl shadow-sm p-6">
                            <h2 className="text-xl font-semibold mb-4">Attachments</h2>
                            <div className="space-y-2">
                                {task.assets.length > 0 ? (
                                    task.assets.map((asset, index) => (
                                        <div key={index} className="flex items-center gap-2 p-2 hover:bg-gray-50 rounded">
                                            <span className="text-gray-500">{asset.mimeType}</span>
                                        </div>
                                    ))
                                ) : (
                                    <p className="text-gray-500">No attachments</p>
                                )}
                            </div>
                        </div>

                        {/* Bids Section */}
                        {isAuthenticated && (
                            <div className="bg-white rounded-xl shadow-sm p-6">
                                <h2 className="text-xl font-semibold mb-4">Bids</h2>
                                <div className="space-y-4">
                                    {author?.principal.toString() === user?.principal.toString() ? (
                                        // Author view - show all bids
                                        bids.length > 0 ? (
                                            console.log(bids),
                                            bids.map(([bidder, offer], index) => (
                                                <div key={index} className="border rounded-lg p-4 hover:bg-gray-50">
                                                    <div className="flex justify-between items-center">
                                                        <div className="flex items-center gap-3">
                                                            <div
                                                                className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center cursor-pointer"
                                                                onClick={() => navigate(`/users/${bidder}`)}
                                                            >
                                                                <span className="text-lg">👤</span>
                                                            </div>
                                                            <div>
                                                                <p className="font-medium">{bidder.toString().slice(0, 8)}...</p>
                                                                <p className="text-sm text-gray-500">
                                                                    {new Date(Number(offer.date) / 1000000).toLocaleDateString()}
                                                                </p>
                                                            </div>
                                                        </div>
                                                        <div className="text-lg font-semibold">
                                                            {offer.amount.toString()} USDC
                                                        </div>
                                                    </div>
                                                </div>
                                            ))
                                        ) : (
                                            <p className="text-gray-500 text-center py-4">No bids yet</p>
                                        )
                                    ) : (
                                        // Non-author view - show only their bid if they have one

                                        (() => {
                                            const myBid = bids.find(([bidder]) => bidder.toString() === user?.principal.toString());
                                            console.log(bids)
                                            return myBid ? (
                                                <div className="border rounded-lg p-4 bg-blue-50">
                                                    <div className="flex justify-between items-center">
                                                        <div className="flex items-center gap-3">
                                                            <div className="w-10 h-10 rounded-full bg-blue-200 flex items-center justify-center">
                                                                <span className="text-lg">👤</span>
                                                            </div>
                                                            <div>
                                                                <p className="font-medium">Your Bid</p>
                                                                <p className="text-sm text-gray-500">
                                                                    {new Date(Number(myBid[1].date) / 1000000).toLocaleDateString()}
                                                                </p>
                                                            </div>
                                                        </div>
                                                        <div className="text-lg font-semibold">
                                                            {myBid[1].amount.toString()} USDC
                                                        </div>
                                                    </div>
                                                </div>
                                            ) : (
                                                <p className="text-gray-500 text-center py-4">You haven't placed a bid yet</p>
                                            );
                                        })()
                                    )}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Right Column - Sidebar */}
                    <div className="space-y-6">
                        {/* Client Info */}
                        <div className="bg-white rounded-xl shadow-sm p-6">
                            <h2 className="text-xl font-semibold mb-4">About the Client</h2>
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-60 h-12 rounded-full bg-gray-200 flex items-center justify-center cursor-pointer" onMouseDown={() => navigate(`/users/${author?.principal}`)}>
                                    <span className="text-xl">👤</span>
                                    <span>{author?.name}</span>
                                    {author?.score != BigInt(0) && <span className='ml-6'>Score {author?.score}</span>}
                                </div>
                            </div>
                        </div>
                        {/* Sacar esto hacia una page de perfil */}
                        {showInfoAuthor && author && (
                            <div className='absolute top-100 right-100 bg-gray-300 p-4 rounded-lg shadow-md'>
                                <p>Name: {author.name}</p>
                                <p>Score: {author.score}</p>
                                <p>Verified: {author.verified ? "Yes" : "No" }</p>
                                <div className='flex flex-row'>Active Tasks
                                    {
                                    author.tasks.map((id) => (
                                        <div 
                                            className='h-8 w-8 bg-gray-500 rounded-full text-center p-1 mx-2 cursor-pointer select-none'
                                            onClick={() => {console.log(`navegar a la tarea ${id}`)}}
                                        >
                                            {id}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Bids Overview */}
                        <div className="bg-white rounded-xl shadow-sm p-6">
                            <h2 className="text-xl font-semibold mb-4">Bids Overview</h2>
                            <div className="space-y-2">
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-500">Total bids</span>
                                    <span>{task.bidsCounter}</span>
                                </div>
                                {task.bidsCounter !== BigInt(0) && Array.isArray(bids) && bids.length > 0 && (
                                    bids.map((bid, index) => (
                                        <div key={index}>{bid[1].amount.toString()}</div>
                                    ))
                                )}
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TaskDetail;
