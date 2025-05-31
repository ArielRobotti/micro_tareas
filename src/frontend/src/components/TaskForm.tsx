import React, { useState } from 'react';
import { TaskDataInit } from "../declarations/backend/backend.did"

interface TaskFormProps {
    onSubmit: (data: TaskDataInit) => void;
}

const TaskForm: React.FC<TaskFormProps> = ({ onSubmit }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [rawKeywords, setRawKeywords] = useState('');
    const [minReward, setMinReward] = useState('');
    const [maxReward, setMaxReward] = useState('');
    const [files, setFiles] = useState<File[]>([]);
    const [errors, setErrors] = useState<Record<string, string>>({});

    const cleanForm = () => {
        setTitle('');
        setDescription('')
        setRawKeywords('')
        setMinReward('')
        setMaxReward('')
        setFiles([])
        setErrors({})
    }

    const validateForm = (keywords: string[]) => {
        const newErrors: Record<string, string> = {};

        console.log("no hay keywords")
        console.log(rawKeywords.length)
        if (!title.trim()) {
            newErrors.title = 'Title is required';
        }
        if (!description.trim()) {
            newErrors.description = 'Description is required';
        }
        if (keywords.length < 1) {
            newErrors.keywords = 'At least one keyword is required';
        }
        if (!minReward || !maxReward) {
            newErrors.rewardRange = 'Both minimum and maximum rewards are required';
        } else if (Number(minReward) >= Number(maxReward)) {
            newErrors.rewardRange = 'Minimum reward must be less than maximum reward';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const getKeywords = () => {
        return rawKeywords
            .split(',')
            .map(keyword => keyword.trim().toLowerCase())
            .filter(keyword => keyword.length > 0);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const keywords = getKeywords()
        console.log(keywords)
        if (!validateForm(keywords)) return;

        // const assets = await Promise.all(
        //     files.map(async (file) => ({
        //         mimeType: file.type,
        //         data: file
        //     }))
        // );

        onSubmit({
            title,
            description,
            keywords,
            rewardRange: [BigInt(minReward), BigInt(maxReward)],
            assets: []
        });
        cleanForm()
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setFiles(Array.from(e.target.files));
        }
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-2xl mx-auto p-4 sm:p-6 bg-white rounded-xl shadow-sm text-gray-800">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Create New Task</h2>

            {/* Title */}
            <div className="mb-4">
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                    Title
                </label>
                <input
                    type="text"
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${errors.title ? 'border-red-500' : 'border-gray-300'
                        }`}
                    placeholder="Enter task title"
                />
                {errors.title && (
                    <p className="mt-1 text-sm text-red-600">{errors.title}</p>
                )}
            </div>

            {/* Description */}
            <div className="mb-4">
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                </label>
                <textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={4}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${errors.description ? 'border-red-500' : 'border-gray-300'
                        }`}
                    placeholder="Describe your task in detail"
                />
                {errors.description && (
                    <p className="mt-1 text-sm text-red-600">{errors.description}</p>
                )}
            </div>

            {/* Keywords */}
            <div className="mb-4">
                <label htmlFor="keywords" className="block text-sm font-medium text-gray-700 mb-1">
                    Keywords (comma-separated)
                </label>
                <input
                    type="text"
                    id="keywords"
                    value={rawKeywords}
                    onChange={(e) => setRawKeywords(e.target.value)}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${errors.keywords ? 'border-red-500' : 'border-gray-300'
                        }`}
                    placeholder="e.g., React, TypeScript, Web3"
                />
                {errors.keywords && (
                    <p className="mt-1 text-sm text-red-600">{errors.keywords}</p>
                )}
            </div>

            {/* Reward Range */}
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    Reward Range (USDC)
                </label>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <input
                            type="number"
                            value={minReward}
                            onChange={(e) => setMinReward(e.target.value)}
                            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${errors.rewardRange ? 'border-red-500' : 'border-gray-300'
                                }`}
                            placeholder="Min"
                            min="0"
                        />
                    </div>
                    <div>
                        <input
                            type="number"
                            value={maxReward}
                            onChange={(e) => setMaxReward(e.target.value)}
                            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${errors.rewardRange ? 'border-red-500' : 'border-gray-300'
                                }`}
                            placeholder="Max"
                            min="0"
                        />
                    </div>
                </div>
                {errors.rewardRange && (
                    <p className="mt-1 text-sm text-red-600">{errors.rewardRange}</p>
                )}
            </div>

            {/* File Upload */}
            <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    Attachments
                </label>
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg">
                    <div className="space-y-1 text-center">
                        <svg
                            className="mx-auto h-12 w-12 text-gray-400"
                            stroke="currentColor"
                            fill="none"
                            viewBox="0 0 48 48"
                            aria-hidden="true"
                        >
                            <path
                                d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                                strokeWidth={2}
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                        <div className="flex text-sm text-gray-600">
                            <label
                                htmlFor="file-upload"
                                className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500"
                            >
                                <span>Upload files</span>
                                <input
                                    id="file-upload"
                                    name="file-upload"
                                    type="file"
                                    multiple
                                    className="sr-only"
                                    onChange={handleFileChange}
                                />
                            </label>
                            <p className="pl-1">or drag and drop</p>
                        </div>
                        <p className="text-xs text-gray-500">
                            Any file type up to 10MB
                        </p>
                    </div>
                </div>
                {files.length > 0 && (
                    <div className="mt-2">
                        <p className="text-sm text-gray-600">Selected files:</p>
                        <ul className="mt-1 text-sm text-gray-600">
                            {files.map((file, index) => (
                                <li key={index} className="flex items-center gap-2">
                                    <span className="truncate">{file.name}</span>
                                    <span className="text-gray-400">({(file.size / 1024 / 1024).toFixed(2)}MB)</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>

            {/* Submit Button */}
            <div className="flex justify-end">
                <button
                    type="submit"
                    className="px-6 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
                >
                    Create Task
                </button>
            </div>
        </form>
    );
};

export default TaskForm; 