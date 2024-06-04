import React, { useState } from 'react';
import { Card, Text, Input, Textarea, Select, Button, Spacer } from '@nextui-org/react';

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
            <Text h3>Submit Threat Intelligence</Text>
            <form onSubmit={handleSubmit}>
                <Select
                    name="indicatorType"
                    label="Threat Indicator"
                    value={formData.indicatorType}
                    onChange={handleChange}
                    placeholder="Select an indicator"
                >
                    <Select.Option value="IP Address">IP Address</Select.Option>
                    <Select.Option value="Domain Name">Domain Name</Select.Option>
                    <Select.Option value="File Hash">File Hash</Select.Option>
                    <Select.Option value="URL">URL</Select.Option>
                    <Select.Option value="Email Address">Email Address</Select.Option>
                    <Select.Option value="Registry Key">Registry Key</Select.Option>
                    <Select.Option value="Network Signature">Network Signature</Select.Option>
                    <Select.Option value="Other">Other</Select.Option>
                </Select>
                {errors.indicatorType && <Text color="error">{errors.indicatorType}</Text>}
                <Spacer y={1} />

                <Input
                    label="Indicator Value"
                    type="text"
                    name="indicatorValue"
                    value={formData.indicatorValue}
                    onChange={handleChange}
                    placeholder="Enter the indicator value"
                />
                {errors.indicatorValue && <Text color="error">{errors.indicatorValue}</Text>}
                <Spacer y={1} />

                <Input
                    label="Threat Type"
                    type="text"
                    name="threatType"
                    value={formData.threatType}
                    onChange={handleChange}
                    placeholder="e.g., APT29, Ransomware, Windows 10"
                />
                {errors.threatType && <Text color="error">{errors.threatType}</Text>}
                <Spacer y={1} />

                <Select
                    name="severity"
                    label="Severity"
                    value={formData.severity}
                    onChange={handleChange}
                    placeholder="Select severity"
                >
                    <Select.Option value="Low">Low</Select.Option>
                    <Select.Option value="Medium">Medium</Select.Option>
                    <Select.Option value="High">High</Select.Option>
                    <Select.Option value="Critical">Critical</Select.Option>
                </Select>
                {errors.severity && <Text color="error">{errors.severity}</Text>}
                <Spacer y={1} />

                <Textarea
                    label="Brief Description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Provide a brief description of the threat."
                />
                {errors.description && <Text color="error">{errors.description}</Text>}
                <Spacer y={1} />

                <Input
                    label="Upload Sample"
                    type="file"
                    name="file"
                    onChange={handleFileChange}
                />
                {errors.file && <Text color="error">{errors.file}</Text>}
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
