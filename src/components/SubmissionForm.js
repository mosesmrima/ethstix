import React, { useState } from 'react';
import { Card, Input, Textarea, Select, SelectItem, Button, Spacer } from '@nextui-org/react';


const SubmissionForm = () => {
    const [formData, setFormData] = useState({
        indicatorType: '',
        indicatorValue: '',
        threatType: '',
        severity: '',
        description: '',
        file: null,
        hash: '',
    });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        setErrors({ ...errors, [name]: '' });
    };

    const handleFileChange = (e) => {
        setFormData({ ...formData, file: e.target.files[0] });
        setErrors({ ...errors, file: '' });
    };

    const validate = () => {
        const newErrors = {};

        if (!formData.indicatorType) newErrors.indicatorType = 'Threat indicator type is required.';
        if (!formData.indicatorValue) newErrors.indicatorValue = 'Indicator value is required.';
        if (!formData.threatType) newErrors.threatType = 'Threat type is required.';
        if (!formData.severity) newErrors.severity = 'Severity is required.';
        if (!formData.description) newErrors.description = 'Description is required.';
        if (!formData.file && !formData.hash) newErrors.file = 'Either a file or a hash is required.';

        return newErrors;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const newErrors = validate();
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        // Handle form submission logic here
    };

    return (
        <Card css={{ maxWidth: '600px', margin: '0 auto' }}>
            <h1>Submit Threat Intelligence</h1>
            <form onSubmit={handleSubmit}>
                <Select
                    name="indicatorType"
                    label="Threat Indicator"
                    value={formData.indicatorType}
                    onChange={handleChange}
                    placeholder="Select an indicator"
                >
                    <SelectItem value="IP Address">IP Address</SelectItem>
                    <SelectItem value="Domain Name">Domain Name</SelectItem>
                    <SelectItem value="File Hash">File Hash</SelectItem>
                    <SelectItem value="URL">URL</SelectItem>
                    <SelectItem value="Email Address">Email Address</SelectItem>
                    <SelectItem value="Registry Key">Registry Key</SelectItem>
                    <SelectItem value="Network Signature">Network Signature</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                </Select>
                {errors.indicatorType && <h1 color="error">{errors.indicatorType}</h1>}
                <Spacer y={1} />

                <Input
                    label="Indicator Value"
                    type="text"
                    name="indicatorValue"
                    value={formData.indicatorValue}
                    onChange={handleChange}
                    placeholder="Enter the indicator value"
                />
                {errors.indicatorValue && <h1 color="error">{errors.indicatorValue}</h1>}
                <Spacer y={1} />

                <Input
                    label="Threat Type"
                    type="text"
                    name="threatType"
                    value={formData.threatType}
                    onChange={handleChange}
                    placeholder="e.g., APT29, Ransomware, Windows 10"
                />
                {errors.threatType && <h1 color="error">{errors.threatType}</h1>}
                <Spacer y={1} />

                <Select
                    name="severity"
                    label="Severity"
                    value={formData.severity}
                    onChange={handleChange}
                    placeholder="Select severity"
                >
                    <SelectItem value="Low">Low</SelectItem>
                    <SelectItem value="Medium">Medium</SelectItem>
                    <SelectItem value="High">High</SelectItem>
                    <SelectItem value="Critical">Critical</SelectItem>
                </Select>
                {errors.severity && <h1 color="error">{errors.severity}</h1>}
                <Spacer y={1} />

                <Textarea
                    label="Brief Description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Provide a brief description of the threat."
                />
                {errors.description && <h1 color="error">{errors.description}</h1>}
                <Spacer y={1} />

                <Input
                    label="Upload Sample"
                    type="file"
                    name="file"
                    onChange={handleFileChange}
                />
                {errors.file && <h1 color="error">{errors.file}</h1>}
                <Spacer y={1} />

                <Input
                    label="Malware Hash"
                    type="text"
                    name="hash"
                    value={formData.hash}
                    onChange={handleChange}
                    placeholder="Enter the hash of the malware sample"
                />
                <Spacer y={1} />

                <Button type="submit">Submit</Button>
            </form>
        </Card>
    );
};

export default SubmissionForm;
