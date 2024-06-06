"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, CardHeader, CardBody, Button, Spinner } from "@nextui-org/react";

const IndicatorsDisplay = () => {
    const [indicators, setIndicators] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("/api/getallindicators");
                setIndicators(response.data.indicators);
                setLoading(false);
            } catch (err) {
                setError(err);
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const downloadJson = () => {
        const fileData = JSON.stringify(indicators, null, 2);
        const blob = new Blob([fileData], { type: "application/json" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = "indicators.json";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <Spinner className="text-blue-500" />
            </div>
        );
    }

    if (error) {
        return <p>Error loading data: {error.message}</p>;
    }

    return (
        <div className="min-h-screen bg-gray-900 text-white py-8">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold mb-8 text-center">
                    Indicators Data
                </h2>
                <div className="flex justify-center">
                    <Card className="w-full md:w-3/4 lg:w-1/2">
                        <CardHeader className="flex justify-between px-8 bg-gray-800 rounded-t-lg">
                            <h4 className="text-xl font-semibold">
                                Indicators
                            </h4>
                            <Button
                                size="sm"
                                color="primary"
                                onClick={downloadJson}
                            >
                                Download JSON
                            </Button>
                        </CardHeader>
                        <CardBody className="bg-gray-800 rounded-b-lg">
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead>
                                        <tr className="bg-gray-700 text-gray-300">
                                            <th className="py-2 px-4">ID</th>
                                            <th className="py-2 px-4">Labels</th>
                                            <th className="py-2 px-4">Pattern</th>
                                            <th className="py-2 px-4">Created</th>
                                            <th className="py-2 px-4">
                                                Modified
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {indicators.map((indicator) => (
                                            <tr
                                                key={indicator.id}
                                                className="bg-gray-800 hover:bg-gray-700 transition-colors duration-200"
                                            >
                                                <td className="py-2 px-4">
                                                    {indicator.id}
                                                </td>
                                                <td className="py-2 px-4">
                                                    {indicator.labels.join(", ")}
                                                </td>
                                                <td className="py-2 px-4 font-mono">
                                                    {indicator.pattern}
                                                </td>
                                                <td className="py-2 px-4">
                                                    {indicator.created}
                                                </td>
                                                <td className="py-2 px-4">
                                                    {indicator.modified}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </CardBody>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default IndicatorsDisplay;
