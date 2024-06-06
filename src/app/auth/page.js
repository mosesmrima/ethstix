"use client"
import { ethers } from "ethers";
import { signIn } from "next-auth/react";
import { Button } from "@nextui-org/react";
import {EvervaultCard} from "@/components/aceternity/evervault-card";
import {BackgroundGradient} from "@/components/aceternity/background-gradient";
import metamaskLogo from "../../../public/metamask.png";
import Image from "next/image"

export default function Page() {
    return (
        <main className={"h-screen flex justify-center items-center"}>
            <BackgroundGradient className="rounded-[22px] max-w-sm bg-black">
                <div className={" max-w-sm mx-auto relative h-[32rem]"}>

                    <Button endContent={<Image src={metamaskLogo} alt={"metamask logo"} width={25}/>} className={"z-40 absolute top-3/4 left-1/4"} color={"primary"} onClick={onSignInWithCrypto}>Sign
                        in with MetaMask</Button>
                    <EvervaultCard text={"You will be prompted to connect your wallet and sign a nonce."}/>
                </div>
            </BackgroundGradient>
        </main>
    );
}

async function onSignInWithCrypto() {
    try {
        if (!window.ethereum) {
            window.alert("Please install MetaMask first.");
            return;
        }

        const provider = new ethers.BrowserProvider(window.ethereum);
        await provider.send("eth_requestAccounts", []);
        const signer = await provider.getSigner();
        const publicAddress = await signer.getAddress();

        const response = await fetch("/api/auth/crypto/generateNonce", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                publicAddress,
            }),
        });

        if (!response.ok) {
            const errorMessage = await response.text();
            throw new Error(`Server error: ${errorMessage}`);
        }

        const responseData = await response.json();

        const signedNonce = await signer.signMessage(responseData.nonce);

        // Use NextAuth to sign in with our address and the nonce
        await signIn("crypto", {
            publicAddress,
            signedNonce,
            callbackUrl: "/",
        });
    } catch (error) {
        console.error("Error with signing:", error);
        window.alert(`Error with signing: ${error.message}`);
    }
}
