import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import Papa from 'papaparse';
import { Button, Spacer } from '@nextui-org/react';
import 'tailwindcss/tailwind.css';

const CSVUpload = () => {
    const { register, handleSubmit, setValue, formState: { errors } } = useForm();
    const [csvData, setCsvData] = useState([]);
    const [error, setError] = useState('');

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            Papa.parse(file, {
                header: true,
                skipEmptyLines: true,
                complete: (results) => {
                    const { data, errors } = results;
                    if (errors.length) {
                        setError('Error parsing CSV file');
                    } else {
                        const validationErrors = validateCSV(data);
                        if (validationErrors.length) {
                            setError(`CSV Validation Errors: ${validationErrors.join(', ')}`);
                        } else {
                            setCsvData(data);
                            setError('');
                            setValue('csvFile', file);
                            // Handle CSV data submission logic here
                        }
                    }
                },
            });
        }
    };

    const validateCSV = (data) => {
        const requiredHeaders = ["Threat Indicator Selection", "Threat Indicator Input", "Threat Type Tag", "Severity", "Brief Description", "Upload Sample or Hash"];
        const headers = Object.keys(data[0]);
        const missingHeaders = requiredHeaders.filter(header => !headers.includes(header));

        return missingHeaders.length ? [`Missing headers: ${missingHeaders.join(', ')}`] : [];
    };

    const onSubmit = () => {
        if (!csvData.length) {
            setError('No CSV data to submit');
            return;
        }
        // Handle bulk CSV data submission logic here
    };

    return (
        <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md prose mt-8">
            <h1 className="text-2xl font-bold mb-4">Upload CSV</h1>
            <p>Please ensure your CSV file follows the structure below:</p>
            <pre class="bg-gray-100 p-4 rounded-md text-sm overflow-x-auto text-black font-bold">
                "Threat Indicator Selection","Threat Indicator Input","Threat Type Tag","Severity","Brief Description","Upload Sample or Hash"<br />
                "IP Address","","APT29","Low","Suspicious activity detected","sample.exe"<br />
                "Domain Name","","Ransomware","Medium","Malicious domain identified",""
            </pre>
            <Spacer y={1} />
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Upload CSV</label>
                    <input 
                        type="file" 
                        accept=".csv" 
                        {...register('csvFile', { required: 'CSV file is required.' })}
                        onChange={handleFileChange}
                        className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                    />
                    {errors.csvFile && <p className="mt-2 text-sm text-red-600">{errors.csvFile.message}</p>}
                </div>
                {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
                <div className="flex justify-end">
                    <Button type="submit" className="mt-2 bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700">
                        Submit CSV
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default CSVUpload;
