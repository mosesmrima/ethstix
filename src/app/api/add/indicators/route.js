import { NextResponse } from 'next/server';
import { ethers } from 'ethers';
import fs from 'fs';
import path from 'path';
import 'dotenv/config';

// Load environment variables
const { PRIVATE_KEY, RPC_URL, CONTRACT_ADDRESS } = process.env;

if (!PRIVATE_KEY || !RPC_URL || !CONTRACT_ADDRESS) {
    console.error('Missing environment variables');
}

// Initialize Ethers provider
const provider = new ethers.JsonRpcProvider(RPC_URL);

// Load contract ABI from the absolute path
const contractPath = 'C:\\Users\\HomePC\\WebstormProjects\\ethstix\\EthSTIX.abi';
let contractABI;
try {
    contractABI = JSON.parse(fs.readFileSync(contractPath, 'utf-8'));
} catch (error) {
    console.error('Error loading contract ABI:', error);
}

const wallet = new ethers.Wallet(PRIVATE_KEY, provider);
const contract = new ethers.Contract(CONTRACT_ADDRESS, contractABI, wallet);

async function addOrUpdateIndicators(indicators) {
    for (const indicator of indicators) {
        console.log('Adding or updating indicator:', indicator);
        const tx = await contract.addOrUpdateIndicator(
            indicator.id,
            indicator.labels,
            indicator.pattern,
            indicator.created,
            indicator.modified
        );

        try {
            const receipt = await tx.wait();
            console.log('Transaction receipt:', receipt);
        } catch (error) {
            console.error('Error sending transaction:', error);
        }
    }
}

export async function POST(req) {
    console.log("Received a POST request");
    try {
        const { indicators } = await req.json();
        await addOrUpdateIndicators(indicators);
        return NextResponse.json({ message: 'Indicators added/updated successfully' });
    } catch (error) {
        console.error('Error:', error);
        return NextResponse.json({ message: 'Error adding/updating indicators', error }, { status: 500 });
    }
}
