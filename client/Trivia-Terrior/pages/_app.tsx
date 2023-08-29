import Head from "next/head";

import { SessionProvider } from "next-auth/react";
import React, { useMemo } from "react";
import {
    ConnectionProvider,
    WalletProvider,
} from "@solana/wallet-adapter-react";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import { PhantomWalletAdapter } from "@solana/wallet-adapter-wallets";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import { clusterApiUrl } from "@solana/web3.js";
import type { AppProps } from "next/app";
import { QuizWithPrizeQuestionOptionEntry } from "../types/backendReturnTypes";
import { useSetAtom } from "jotai";
import { qotw } from "../atoms/qotwAtom";
import { useEffect } from "react";
import useSWR from "swr";

require("@solana/wallet-adapter-react-ui/styles.css");
import "../styles/globals.css";
import { getInternalApiUrl } from "../service/common";

const fetcher = async (url: string) => {
    const qotwRes = await fetch(`/api/quizOfTheWeek`);
    const data: any = await qotwRes.json();
    const res = await fetch(url + data.quizId);

    // If the status code is not in the range 200-299,
    // we still try to parse and throw it.
    if (!res.ok) {
        const error = new Error("An error occurred while fetching the data.");
        // Attach extra info to the error object.
        // @ts-ignore
        error.info = await res.json();
        // @ts-ignore
        error.status = res.status;
        throw error;
    }

    return res.json();
};

export default function App({ Component, pageProps }: AppProps) {
    const network = WalletAdapterNetwork.Devnet;
    const { data, error, isLoading } = useSWR<
        QuizWithPrizeQuestionOptionEntry,
        Error
    >(`${getInternalApiUrl()}/api/quiz?quizId=`, fetcher);
    const setQotwData = useSetAtom(qotw);
    useEffect(() => {
        setQotwData(data);
    }, [data]);
    const endpoint = useMemo(() => clusterApiUrl(network), [network]);

    const wallets = useMemo(() => [new PhantomWalletAdapter()], []);

    return (
        <ConnectionProvider endpoint={endpoint}>
            <WalletProvider wallets={wallets} autoConnect>
                <WalletModalProvider>
                    <SessionProvider
                        session={pageProps.session}
                        refetchInterval={0}
                    >
                        <Head>
                            <meta
                                name="viewport"
                                content="width=device-width, initial-scale=1"
                            />
                            <link rel="icon" href="/favicon.png"></link>
                        </Head>
                        <Component {...pageProps} />
                    </SessionProvider>
                </WalletModalProvider>
            </WalletProvider>
        </ConnectionProvider>
    );
}
