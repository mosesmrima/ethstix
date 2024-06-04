"use client"
import { CardHeader, CardBody, Card, Chip } from '@nextui-org/react';
import { DonutChart } from '@tremor/react';

const datahero = [
    {
        name: 'Noche Holding AG',
        value: 9800,
    },
    {
        name: 'Rain Drop AG',
        value: 4567,
    },
    {
        name: 'Push Rail AG',
        value: 3908,
    },
    {
        name: 'Flow Steal AG',
        value: 2400,
    },
    {
        name: 'Tiny Loop Inc.',
        value: 2174,
    },
    {
        name: 'Anton Resorts Holding',
        value: 1398,
    },
];

export default function Dashboard() {
    const dataFormatter = (number) =>
        `$ ${Intl.NumberFormat('us').format(number).toString()}`;

    return (
        <div className={"flex flex-col gap-4 p-8"}>
            <div className={"prose prose-invert self-center"}>
                <h1 className={"text-center"}>Dashboard</h1>
            </div>
            <div className={"flex flex-col gap-4"}>
                <Card className={"prose prose-invert self-end w-3/12"}>
                    <CardBody className={"flex flex-col gap-4 items-center"}>
                        <span className={"flex gap-2"}>
                            <h5>Number of artifacts:</h5>
                            <Chip variant={"flat"} color={"primary"}>40</Chip>
                        </span>
                        <DonutChart
                            data={datahero}
                            variant="donut"
                            onValueChange={(v) => console.log(v)}
                        />
                    </CardBody>
                </Card>

                <Card>
                    <CardHeader>
                        <h3>Statistics</h3>
                    </CardHeader>
                    <CardBody>
                        <h5>Metrics and statistics...</h5>
                    </CardBody>
                </Card>
            </div>
        </div>
    );
}
