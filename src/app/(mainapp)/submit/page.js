"use client"
import React from 'react';
import SubmissionForm from '@/components/SubmissionForm';
import CSVUpload from '@/components/CSVUpload';

export default function SubmitPage() {
    return (
        <div className="p-8">
            <h1 className="text-center text-2xl font-bold mb-8">Submit Threat Intelligence</h1>
            <div className="mb-8">
                <SubmissionForm />
            </div>
            <div>
                <CSVUpload />
            </div>
        </div>
    );
}
