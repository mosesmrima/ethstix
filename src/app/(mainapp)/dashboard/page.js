"use client"
import React, { useState } from 'react';
import { Card as NextUICard, CardHeader, CardBody } from '@nextui-org/react';
import { DonutChart, BarChart, LineChart, ScatterChart, AreaChart, FunnelChart, ProgressCircle, DateRangePicker, Callout, Divider, Table, TableHead, TableRow, TableHeaderCell, TableBody, TableCell, BarList, Title, Text } from '@tremor/react';
import { InformationCircleIcon, ShieldCheckIcon, RssIcon, LockClosedIcon } from '@heroicons/react/solid';
import 'tailwindcss/tailwind.css';

const threatDistribution = [
    { name: 'APT29', value: 120 },
    { name: 'Ransomware', value: 90 },
    { name: 'Phishing', value: 70 },
    { name: 'Malware', value: 50 },
    { name: 'DDoS', value: 40 },
    { name: 'Others', value: 30 },
];

const severityLevels = [
    { name: 'Low', value: 150 },
    { name: 'Medium', value: 100 },
    { name: 'High', value: 80 },
    { name: 'Critical', value: 50 },
];

const threatActors = [
    { name: 'Fancy Bear', occurrences: 50 },
    { name: 'Cozy Bear', occurrences: 40 },
    { name: 'Lazarus Group', occurrences: 30 },
    { name: 'APT28', occurrences: 20 },
    { name: 'Equation Group', occurrences: 10 },
];

const ipAddresses = [
    { ip: '192.168.1.1', occurrences: 40 },
    { ip: '172.16.0.1', occurrences: 30 },
    { ip: '10.0.0.1', occurrences: 20 },
];

const threatTrends = [
    { date: '2023-01-01', Malware: 10, Phishing: 15, DDoS: 5 },
    { date: '2023-02-01', Malware: 15, Phishing: 20, DDoS: 10 },
    { date: '2023-03-01', Malware: 20, Phishing: 25, DDoS: 15 },
    { date: '2023-04-01', Malware: 25, Phishing: 30, DDoS: 20 },
    { date: '2023-05-01', Malware: 30, Phishing: 35, DDoS: 25 },
];

const severityVsImpact = threatDistribution.map(threat => ({
    threat: threat.name,
    severity: Math.random() * 10,
    impact: threat.value / 10,
}));

const Dashboard = () => {
    const [isShareDialogOpen, setIsShareDialogOpen] = useState(false);
    const [shareDescription, setShareDescription] = useState('');
    const [selectedDateRange, setSelectedDateRange] = useState({
        from: new Date(2023, 0, 1),
        to: new Date(2023, 4, 31),
    });

    return (
        <div className="flex flex-col gap-6 p-8  text-white min-h-screen">
            <div className="prose prose-invert self-center">
                <Title className="text-center text-4xl font-bold text-blue-500">EthStix Dashboard</Title>
                <Text className="text-center text-lg text-gray-300">Decentralized and near-real-time cyber threat intelligence sharing</Text>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

                <Card title="Threat Funnel" icon={RssIcon}>
                    <FunnelChart
                        data={threatDistribution.slice(0, 4)}
                        category="value"
                        index="name"
                        colors={['blue', 'indigo', 'purple', 'pink']}
                    />
                    <Text className="text-center mt-4">From detection to mitigation</Text>
                </Card>

                <Card title="Severity Levels" icon={RssIcon}>
                    <BarChart data={severityLevels} categories={["value"]} index="name" colors={['blue', 'indigo', 'purple', 'pink']} />
                </Card>

                <Card title="Threat Trends" icon={InformationCircleIcon}>
                    <AreaChart data={threatTrends} categories={['Malware', 'Phishing', 'DDoS']} index="date" colors={['blue', 'indigo', 'purple']} />
                    <DateRangePicker value={selectedDateRange} onValueChange={setSelectedDateRange} className="mt-4" />
                </Card>

                <Card title="Top Threat Actors" icon={LockClosedIcon}>
                    <BarList data={threatActors.map(a => ({ name: a.name, value: a.occurrences }))} color="cyan" />
                    {/* <List className="mt-4">
                        {threatActors.slice(0, 3).map((actor, index) => (
                            <ListItem key={index}>{actor.name}</ListItem>
                        ))}
                    </List> */}
                </Card>

                <Card title="IP Address Impact" icon={ShieldCheckIcon}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableHeaderCell>IP Address</TableHeaderCell>
                                <TableHeaderCell>Impact</TableHeaderCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {ipAddresses.map((ip, index) => (
                                <TableRow key={index}>
                                    <TableCell>{ip.ip}</TableCell>
                                    <TableCell>
                                        <ProgressCircle value={ip.occurrences} max={40} color={ip.occurrences > 20 ? 'red' : 'yellow'} />
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Card>

                <Card title="Severity vs Impact" icon={InformationCircleIcon}>
                    <ScatterChart
                        data={severityVsImpact}
                        x="severity"
                        y="impact"
                        category="threat"
                        color="blue"
                    />
                    <Text className="text-center mt-4">Higher severity doesn't always mean higher impact</Text>
                </Card>
            </div>

            <Divider color="blue" />

            <Callout
                title="EthStix Innovation"
                icon={InformationCircleIcon}
                color="blue"
                className="mt-4"
            >
                EthStix democratizes cyber threat intelligence sharing by leveraging Ethereum's decentralized nature, enabling near-real-time exchange of data. Our platform serves threat intelligence vendors, consumers, and researchers worldwide.
            </Callout>
        </div>
    );
};

const Card = ({ title, icon: Icon, children }) => (
    <NextUICard className="bg-gray-800 border-blue-500 border-2">
        <CardHeader className="flex items-center space-x-2 bg-blue-900 text-white rounded-t-lg">
            <Icon className="w-6 h-6" />
            <h3 className="text-lg font-semibold">{title}</h3>
        </CardHeader>
        <CardBody>
            {children}
        </CardBody>
    </NextUICard>
);

export default Dashboard;