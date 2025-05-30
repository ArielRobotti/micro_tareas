import React from 'react';
import TaskForm from '../components/TaskForm';

const HireFreelancer = () => {
    const handleSubmit = (data: {
        title: string;
        description: string;
        keywords: string;
        rewardRange: [number, number];
        assets: Array<{ mimeType: string; data: Blob }>;
    }) => {
        // TODO: Implement the submission logic to the backend
        console.log('Form submitted:', data);
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-6">Hire Freelancers</h1>
            <div className="grid gap-6">
                <div className="bg-gray-50 rounded-lg p-6 mb-8">
                    <h2 className="text-xl font-semibold mb-4">Post a New Job</h2>
                    <TaskForm onSubmit={handleSubmit} />
                </div>
                <div className="mt-8">
                    <h2 className="text-xl font-semibold mb-4">Find Talented Freelancers</h2>
                    <p className="text-gray-600">Browse through our pool of skilled professionals</p>
                </div>
            </div>
        </div>
    );
};

export default HireFreelancer; 