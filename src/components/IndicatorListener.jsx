"use client"
import React, { useEffect } from "react";
import { ethers } from 'ethers';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import  abi from "../../EthSTIX.json"

const provider = new ethers.JsonRpcProvider("http://127.0.0.1:8545");
const contractAddress = "0x58be63CBC1f5087a6548Ef37c43D455736E99B4C";
const contractABI = abi.abi;
const contract = new ethers.Contract(contractAddress, contractABI, provider);

const EventListener = () => {

    useEffect(() => {
        const handleNewArtifact = (id, labels, pattern, created, modified) => {
            toast(`New artifact added: ${id}`, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        };

        contract.on("IndicatorAdded", handleNewArtifact);

        // Cleanup the event listener on component unmount
        return () => {
            contract.off("IndicatorAdded", handleNewArtifact);
        };
    }, []);

    return <ToastContainer />;
};

export default EventListener;
