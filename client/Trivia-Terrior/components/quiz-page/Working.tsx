import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { Keypair, Transaction } from "@solana/web3.js";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";
import {
    MakeTransactionInputData,
    MakeTransactionOutputData,
} from "../../pages/api/makeTransaction";
import { FindReferenceError, findReference } from "@solana/pay";
import base58 from "bs58";
import { getInternalApiUrl } from "../../service/common";

interface WorkingProps {
    triviaId: number;
    enterQuiz: Function;
    setIsLoading: Function;
    setIsVisible: Function;
}

function Working(props: WorkingProps) {
    const router = useRouter();
    const { connection } = useConnection();
    const wallet = useWallet();

    const [isFinding, setIsFinding] = useState(false);
    const [clickEnter, setClickEnter] = useState(false);

    const [connected, setConnected] = useState(false);

    // State to hold API response fields
    const [transaction, setTransaction] = useState<Transaction | null>(null);
    const [message, setMessage] = useState<string | null>(null);

    // Generate the unique reference which will be used for this transaction
    const reference = useMemo(() => Keypair.generate().publicKey, []);

    // Use our API to fetch the transaction for the selected items
    async function getTransaction() {
        if (!wallet.publicKey) {
            return;
        }

        const body: MakeTransactionInputData = {
            account: wallet.publicKey.toString(),
        };

        const response = await fetch(
            `${getInternalApiUrl()}/api/makeTransaction?quizId=${
                props.triviaId
            }&reference=${reference.toString()}`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(body),
            }
        );

        const json = (await response.json()) as MakeTransactionOutputData;

        if (response.status !== 200) {
            console.error(json);
            return;
        }

        // Deserialize the transaction from the response
        const transaction = Transaction.from(
            Buffer.from(base58.decode(json.transaction))
        );
        setTransaction(transaction);
        setMessage(json.message);
        console.log(transaction);
    }

    function enterQuiz() {
        setClickEnter(true);
        getTransaction();
    }

    // Send the transaction once it's fetched
    useEffect(() => {
        trySendTransaction();
    }, [transaction]);

    // Send the fetched transaction to the connected wallet
    async function trySendTransaction() {
        if (!transaction) {
            return;
        }
        try {
            props.setIsLoading(true);
            setIsFinding(true);
            if (wallet && wallet.signTransaction) {
                const signedTransaction = await wallet.signTransaction(
                    transaction
                );
                const response = await fetch(`${getInternalApiUrl()}/api/enterQuiz`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        transaction: base58.encode(
                            signedTransaction.serialize()
                        ),
                        quizId: router.query.quizId,
                        publicKey: wallet.publicKey,
                    }),
                });
                setIsFinding(false);
                props.setIsVisible(true);
                setClickEnter(false);
                props.enterQuiz();
            }
        } catch (e) {
            console.error(e);
        }
        props.setIsLoading(false);
    }

    useEffect(() => {
        console.log(wallet);
        if (wallet.publicKey) {
            setConnected(true);
        }
        console.log(wallet.publicKey);
        console.log(connected);
    }, [wallet]);

    return (
        <div>
            <h2 className="text-2xl md:text-3xl text-white font-bold">
                How the quiz works?
            </h2>

            <p className="text-base md:text-lg my-4">
                When you enter the quiz our platform connects directly to your
                wallet to provide you with a exciting and competitive trivia
                experience. Trivia Terrier allows you to join live quizzes to
                compete with other players to win the Solana in the pot! The
                higher your place, the larger your take. With the pot tracker,
                you'll always know how much is up for grabs. So what are you
                waiting for? Don't miss out on the trivia revolution!
            </p>
            {!isFinding && (
                <div className="flex">
                    <button
                        className="connect-wallet w-full md:w-[14rem]"
                        onClick={enterQuiz}
                        disabled={!connected}
                    >
                        Enter the quiz
                    </button>
                    {!connected && (
                        <p className="m-2 text-[#dbaaaa]">
                            Connect Your Wallet To Enter!
                        </p>
                    )}
                </div>
            )}
        </div>
    );
}

export default Working;
