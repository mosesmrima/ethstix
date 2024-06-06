"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, CardHeader, CardBody, Button, Spinner, Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from "@nextui-org/react";

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
        return(<Spinner className={"m-auto mt-24"} />)
    }

    if (error) {
        return <p>Error loading data: {error.message}</p>;
    }

    return (
        <div className="flex items-center flex-col  w-screen">
            <h2>Indicators Data</h2>
            <div className={"flex flex-col items-center gap-8"}>
                <Card className={"w-1/2"}>
                    <CardHeader className={"flex justify-between px-8"}>
                        <h4>Indicators</h4>
                        <Button size={"sm"} className="self-end justify-self-end" color="primary" onClick={downloadJson}>
                            Download JSON
                        </Button>
                    </CardHeader>
                    <CardBody>
                        <Table isStriped={true} isCompact={true} isHeaderSticky={true} aria-label="Indicators Table">
                            <TableHeader>
                                <TableColumn>ID</TableColumn>
                                <TableColumn>Labels</TableColumn>
                                <TableColumn>Pattern</TableColumn>
                                <TableColumn>Created</TableColumn>
                                <TableColumn>Modified</TableColumn>
                            </TableHeader>
                            <TableBody>
                                {indicators.map((indicator) => (
                                    <TableRow key={indicator.id}>
                                        <TableCell>{indicator.id}</TableCell>
                                        <TableCell>{indicator.labels.join(", ")}</TableCell>
                                        <TableCell height={4}>
                                            <pre>{indicator.pattern}</pre>
                                        </TableCell>
                                        <TableCell>{indicator.created}</TableCell>
                                        <TableCell>{indicator.modified}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardBody>
                </Card>
            </div>
        </div>
    );
};

export default IndicatorsDisplay;
