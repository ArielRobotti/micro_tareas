import { useEffect, useState } from 'react';
import TaskCard from '../components/TaskCard';
import { useSession } from '../context/sessionContext'
import { TaskPreview } from '../declarations/backend/backend.did'
import { useNavigate } from 'react-router-dom';

const BrowseTasks = () => {
    const { backend } = useSession();
    const [previewsTask, setPreviewsTask] = useState<TaskPreview[]>([]);
    const [, setHasNextPage] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchJobs = async () => {
            const response = await backend.getPaginateTaskPreview({ page: BigInt(0), qtyPerPage: [BigInt(50)] })
            setPreviewsTask(response.arr);
            setHasNextPage(response.hasNext)
        };
        fetchJobs()
    }, [backend])

    const handleTaskClick = (taskId: bigint) => {
        navigate(`/tasks/${taskId.toString()}`);
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-6">Browse Jobs</h1>
            {previewsTask.map(
                (task) => (
                    <TaskCard
                        key={task.id.toString()}
                        task={task}
                        onPlaceBid={() => handleTaskClick(task.id)}
                    />
                )
            )}
            {/* <JobCard
                title="Smart Contract Developer for DeFi Protocol"
                description='Seeking an experienced smart contract developer to build and audit DeFi protocols. Must have experience with Solidity, Web3.js, and DeFi concepts. The role involves developing secure smart contracts, implementing tokenomics, and ensuring protocol security through comprehensive testing and auditing.'
                tags={["Solidity", "Web3.js", "DeFi", "Smart Contracts", "Ethereum", "Hardhat", "TypeScript"]}
                rewardRange={[500, 1000]}
                createdAt="10 months ago"
                bidsCounter={13}
                user={{
                    name: "A. N.",
                    lastReply: "10 months ago",
                    score: 5,
                    verified: true,
                }}
                onPlaceBid={() => alert("Bid placed!")}
            />
            <JobCard
                title="Full Stack Web3 Developer for NFT Marketplace"
                description='Looking for a full-stack developer to build a modern NFT marketplace. Must have experience with React, Web3 integration, and blockchain development. The project includes implementing wallet connections, NFT minting, marketplace features, and smart contract integration.'
                tags={["React", "Web3", "NFT", "Solidity", "Ethers.js", "IPFS", "TailwindCSS"]}
                rewardRange={[300, 600]}
                createdAt="2 days ago"
                bidsCounter={7}
                user={{
                    name: "Jane D.",
                    lastReply: "1 day ago",
                }}
                onPlaceBid={() => alert("Bid placed!")}
            /> */}

        </div>
    );
};

export default BrowseTasks; 