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

async function getAllIndicators() {
    try {
        const indicators = await contract.getAllIndicators();
        return indicators.map(indicator => ({
            id: indicator[0],
            labels: indicator[1],
            pattern: indicator[2],
            created: indicator[3],
            modified: indicator[4]
        }));
    } catch (error) {
        console.error('Error fetching indicators:', error);
        throw error;
    }
}

export async function GET() {
    console.log("Received a GET request");
    try {
        const indicators = await getAllIndicators();
        return NextResponse.json({ indicators });
    } catch (error) {
        console.error('Error:', error);
        return NextResponse.json({ message: 'Error fetching indicators', error }, { status: 500 });
    }
}
