import { NextResponse } from 'next/server';
import { firestore } from '@/lib/firestore';
import crypto from 'crypto';

export async function POST(req) {
    try {
        const { publicAddress } = await req.json();

        // Note: this nonce is displayed in the user's wallet for them to sign
        // You can use any other representation of the nonce that you want
        // But make sure to keep it a true random number with enough length.
        const nonce = crypto.randomBytes(32).toString('hex');

        // Set the expiry of the nonce to 1 hour
        const expires = new Date(new Date().getTime() + 1000 * 60 * 60);

        const userRef = firestore.collection('users').doc(publicAddress);
        const userDoc = await userRef.get();

        if (userDoc.exists) {
            // Update the nonce in the cryptoLoginNonce collection
            const cryptoLoginNonceRef = firestore.collection('cryptoLoginNonces').doc(publicAddress);
            await cryptoLoginNonceRef.set({
                nonce,
                expires,
                user: userRef,
            }, { merge: true });
        } else {
            // Create the user and nonce
            await userRef.set({
                publicAddress,
                // Other user fields if necessary
            });
            const cryptoLoginNonceRef = firestore.collection('cryptoLoginNonces').doc(publicAddress);
            await cryptoLoginNonceRef.set({
                nonce,
                expires,
                user: userRef,
            });
        }

        return NextResponse.json({
            nonce,
            expires: expires.toISOString(),
        });
    } catch (error) {
        console.error('Error generating nonce:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
