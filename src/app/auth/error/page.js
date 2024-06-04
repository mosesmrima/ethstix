import { useRouter } from 'next/router';

export default function ErrorPage() {
    const router = useRouter();
    const { error } = router.query;

    return (
        <div>
            <h1>Authentication Error</h1>
            <p>{error || 'Unknown error occurred'}</p>
            <a href="/auth">Go back to sign in</a>
        </div>
    );
}

// This gets called on every request
export async function getServerSideProps(context) {
    return {
        props: {
            error: context.query.error || 'Unknown error',
        },
    };
}
