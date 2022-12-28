import Head from 'next/head'
import HomePage from "./HomePage";

export default function Home() {
    return (
        <>
            <Head>
                <title>Interview Candidates</title>
                <meta name="description" content="Interview Candidates"/>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
                <link rel="icon" href="/favicon.ico"/>
            </Head>
            <HomePage/>
        </>
    )
}
