import React from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@nextui-org/react';
import 'tailwindcss/tailwind.css';

const SubmissionForm = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = (data) => {
        console.log(data);
        // Handle form submission logic here
    };

    return (
        <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md prose">
            <h1 className="text-2xl font-bold mb-4">Submit Threat Intelligence</h1>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Threat Indicator</label>
                    <select 
                        {...register('indicatorType', { required: 'Threat indicator type is required.' })}
                        className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                    >
                        <option value="">Select an indicator</option>
                        <option value="IP Address">IP Address</option>
                        <option value="Domain Name">Domain Name</option>
                        <option value="File Hash">File Hash</option>
                        <option value="URL">URL</option>
                        <option value="Email Address">Email Address</option>
                        <option value="Registry Key">Registry Key</option>
                        <option value="Network Signature">Network Signature</option>
                        <option value="Other">Other</option>
                    </select>
                    {errors.indicatorType && <p className="mt-2 text-sm text-red-600">{errors.indicatorType.message}</p>}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Indicator Value</label>
                    <input
                        type="text"
                        {...register('indicatorValue', { required: 'Indicator value is required.' })}
                        className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                        placeholder="Enter the indicator value"
                    />
                    {errors.indicatorValue && <p className="mt-2 text-sm text-red-600">{errors.indicatorValue.message}</p>}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Threat Type</label>
                    <input
                        type="text"
                        {...register('threatType', { required: 'Threat type is required.' })}
                        className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                        placeholder="e.g., APT29, Ransomware, Windows 10"
                    />
                    {errors.threatType && <p className="mt-2 text-sm text-red-600">{errors.threatType.message}</p>}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Severity</label>
                    <select 
                        {...register('severity', { required: 'Severity is required.' })}
                        className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                    >
                        <option value="">Select severity</option>
                        <option value="Low">Low</option>
                        <option value="Medium">Medium</option>
                        <option value="High">High</option>
                        <option value="Critical">Critical</option>
                    </select>
                    {errors.severity && <p className="mt-2 text-sm text-red-600">{errors.severity.message}</p>}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Brief Description</label>
                    <textarea
                        {...register('description', { required: 'Description is required.' })}
                        className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                        placeholder="Provide a brief description of the threat."
                    />
                    {errors.description && <p className="mt-2 text-sm text-red-600">{errors.description.message}</p>}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Upload Sample</label>
                    <input
                        type="file"
                        {...register('file')}
                        className="mt-1 block w-full text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                    />
                    {errors.file && <p className="mt-2 text-sm text-red-600">{errors.file.message}</p>}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Malware Hash</label>
                    <input
                        type="text"
                        {...register('hash')}
                        className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                        placeholder="Enter the hash of the malware sample"
                    />
                </div>

                <div className="flex justify-end">
                    <Button type="submit" className="mt-2 bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700">
                        Submit
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default SubmissionForm;
