"use client"
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Home() {
    const router = useRouter();
    const { status } = useSession({
        required: true,
        onUnauthenticated() {
            router.push("/auth");
        },
    });

    if (status !== "authenticated") return null;

    return (
        <main>
            <p>Secure stuff that requires login.</p>
        </main>
    );
}
