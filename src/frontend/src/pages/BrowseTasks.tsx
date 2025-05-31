import { useState } from 'react';
import TaskCard from '../components/TaskCard';
import { useSession } from '../context/sessionContext';
import { TaskPreview } from '../declarations/backend/backend.did';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const BrowseTasks = () => {
    const { backend } = useSession();
    const [tasks, setTasks] = useState<TaskPreview[]>([]);
    const navigate = useNavigate();

    const fetchTasks = async () => {
        const tasks = await backend.getPaginateTaskPreview({ page: BigInt(0), qtyPerPage: [BigInt(10)] });
        setTasks(tasks.arr);
    }
    useEffect(() => {
        fetchTasks();
    }, []);

    const handleTaskClick = (taskId: bigint) => {
        navigate(`/tasks/${taskId.toString()}`);
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-6">Browse Jobs</h1>
            {tasks.map((task) => {
                // Conversiones
                const rewardRange = task.rewardRange.map(r => Number(r));
                const createdAtDate = new Date(Number(task.createdAt / 1_000_000n));
                const timeAgo = createdAtDate.toLocaleDateString();
                const bids = task.bidsCounter.toString();
                const ownerText = task.owner.toText();

                return (
                    <TaskCard
                        key={task.id.toString()}
                        title={task.title}
                        description={task.description}
                        tags={["ICP", "Motoko", "DeFi", "Smart Contracts"]}
                        rewardRange={rewardRange as [number, number]}
                        createdAt={timeAgo}
                        bidsCounter={Number(bids)}
                        user={{
                            name: ownerText,
                            lastReply: timeAgo,
                            score: 5,
                            verified: true,
                        }}
                        onClick={() => handleTaskClick(task.id)}
                        onPlaceBid={(e) => {
                            alert(`Placing bid on task ${task.id.toString()}`);
                        }}
                    />
                );
            })}
        </div>
    );
};

export default BrowseTasks; 