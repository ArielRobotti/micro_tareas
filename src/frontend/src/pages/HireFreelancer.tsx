// import React from 'react';
import TaskForm from '../components/TaskForm';
import { useSession } from "../context/sessionContext";
import { TaskDataInit } from "../declarations/backend/backend.did"

const HireFreelancer = () => {

    const { backend } = useSession();
    const handleSubmit = async (data: TaskDataInit) => {
        
        const response  = await backend.createTask(data);
        if("Ok" in response){alert("the task was created successfully")}
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