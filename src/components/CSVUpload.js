import React, { useState } from 'react';
import Papa from 'papaparse';
import { Card, Input, Button, Spacer } from '@nextui-org/react';

const CSVUpload = () => {
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

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!csvData.length) {
            setError('No CSV data to submit');
            return;
        }
        // Handle bulk CSV data submission logic here
    };

    return (
        <Card css={{ maxWidth: '600px', margin: '0 auto' }}>
            <h1>Upload CSV</h1>
            <h1>
                Please ensure your CSV file follows the structure below:
            </h1>
            <Spacer y={0.5} />
            <h1>
                "Threat Indicator Selection","Threat Indicator Input","Threat Type Tag","Severity","Brief Description","Upload Sample or Hash"
                <br />
                "IP Address","","APT29","Low","Suspicious activity detected","sample.exe"
                <br />
                "Domain Name","","Ransomware","Medium","Malicious domain identified",""
            </h1>
            <Spacer y={1} />
            <form onSubmit={handleSubmit}>
                <Input type="file" accept=".csv" onChange={handleFileChange} bordered />
                {error && <h1 color="error">{error}</h1>}
                <Spacer y={1} />
                <Button type="submit">Submit CSV</Button>
            </form>
        </Card>
    );
};

export default CSVUpload;
