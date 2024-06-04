import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { FirestoreAdapter } from '@next-auth/firebase-adapter';
import { firestore } from '@/lib/firestore';
import { ethers } from 'ethers';


async function authorizeCrypto(credentials) {
    if (!credentials) {
        return null;
    }

    const { publicAddress, signedNonce } = credentials;
    const userRef = firestore.collection('users').doc(publicAddress);
    const userDoc = await userRef.get();

    if (!userDoc.exists) {
        return null;
    }

    const user = userDoc.data();
    const cryptoLoginNonceRef = firestore.collection('cryptoLoginNonces').doc(publicAddress);
    const cryptoLoginNonceDoc = await cryptoLoginNonceRef.get();

    if (!cryptoLoginNonceDoc.exists) {
        return null;
    }

    const { nonce, expires } = cryptoLoginNonceDoc.data();
    const signerAddress = ethers.verifyMessage(nonce, signedNonce);


    if (signerAddress !== publicAddress) {
        return null;
    }
    if (new Date() > expires.toDate()) {
        console.log("Nonce has expired");
        return null;
    }

    await cryptoLoginNonceRef.update({ nonce: null, expires: null });
    return {
        id: publicAddress,
        publicAddress,
    };
}

const authOptions = {
    pages: {
        signIn: "/auth",
        error: "/auth/error",
    },
    providers: [
        CredentialsProvider({
            id: "crypto",
            name: "Crypto Wallet Auth",
            credentials: {
                publicAddress: { label: "Public Address", type: "text" },
                signedNonce: { label: "Signed Nonce", type: "text" },
            },
            authorize: authorizeCrypto,
        }),
    ],
    adapter: FirestoreAdapter(firestore),
    session: {
        strategy: "jwt",
    },
    secret: process.env.NEXTAUTH_SECRET,
};


const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
