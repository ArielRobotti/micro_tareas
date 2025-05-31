import React from 'react';
import { TaskPreview } from '../declarations/backend/backend.did';

interface TaskCardProps {
    // title: string;
    // description: string;
    // tags: string[];
    // rewardRange: [number, number];
    // createdAt: string;
    // bidsCounter: number;
    task: TaskPreview;
    // user: {
    //     name: string;
    //     avatar?: string;
    //     lastReply: string;
    //     score?: number;
    //     verified?: boolean;
    // };
    onPlaceBid?: () => void;
}

const TaskCard: React.FC<TaskCardProps> = ({
    // title,
    // description,
    // tags,
    // rewardRange,
    // createdAt,
    // bidsCounter,
    task,
    // user,
    onPlaceBid,
}) => {
    return (
        <div
            className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 sm:p-6 max-w-2xl mx-auto mb-6 cursor-pointer hover:shadow-md transition-shadow"
            onClick={onPlaceBid}
        >
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4 mb-2">
                <div className="flex-1">
                    <h2 className="text-lg sm:text-xl font-semibold text-gray-800 leading-tight mb-1 truncate">{task.title}</h2>
                    <div className="text-xs text-gray-500 leading-tight mb-1">
                        Published: {new Date(Number(task.createdAt) / 1000000).toLocaleString()}
                        <span className='ml-10'>bids: {task.bidsCounter} </span>
                    </div>
                </div>
                <div className="flex flex-col items-start sm:items-end gap-2">
                    <button
                        className="w-full sm:w-auto border border-blue-400 text-blue-600 rounded-full px-5 py-2 font-semibold hover:bg-blue-50 transition"
                        onClick={(e) => {
                            e.stopPropagation();
                            onPlaceBid?.();
                        }}
                    >
                        Place a bid
                    </button>
                    <div className="text-left sm:text-right text-gray-700 font-bold text-lg">{task.rewardRange[0]} - {task.rewardRange[1]} USDC</div>
                </div>
            </div>
            <div className="text-gray-700 mb-3 line-clamp-2 text-sm sm:text-base">
                {task.description}
            </div>
            <div className="flex flex-wrap gap-2 mb-4">
                {task.keywords.map((tag) => (
                    <span key={tag} className="bg-gray-100 text-gray-700 px-2 sm:px-3 py-1 rounded-full text-xs font-medium">
                        {tag}
                    </span>
                ))}
            </div>
            {/* <div className="flex items-center justify-between mt-2">
                <div className="flex items-center gap-2">
                    {user.avatar ? (
                        <img src={user.avatar} alt={user.name} className="w-6 h-6 sm:w-7 sm:h-7 rounded-full" />
                    ) : (
                        <span className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-gray-200 flex items-center justify-center text-base sm:text-lg">😊</span>
                    )}
                    <div className="flex flex-col sm:flex-row sm:items-center sm:gap-2">
                        <span className="font-medium text-gray-700 text-xs sm:text-sm">{user.name}</span>
                        <span className="text-xs text-gray-400">Last reply: {user.lastReply}</span>
                    </div>
                </div>
            </div> */}
        </div>
    );
};

export default TaskCard; 