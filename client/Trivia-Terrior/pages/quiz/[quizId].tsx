import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import Head from "next/head";
import NavBar from "../../components/landing/NavBar";
import QuizPageWaiting from "../../components/quiz-page/QuizPageWaiting";
import { getSession } from "next-auth/react";
import { useWallet } from "@solana/wallet-adapter-react";
import useSWR from "swr";
import QuizResult from "../../components/quiz-page/QuizResult";
import LiveQuiz from "../../components/quiz-page/LiveQuiz";
import { QuizWithPrizeQuestionOptionEntry } from "../../types/backendReturnTypes";
import { DateTime } from "luxon";
import useSocket from "../../lib/socket/useSocket";
import useQuizSocket from "../../lib/socket/useQuizSocket";
import { getInternalApiUrl } from "../../service/common";

const fetcher = async (url: string) => {
    const res = await fetch(url);
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

function QuizIndividualPage(
    props: InferGetServerSidePropsType<typeof getServerSideProps>
) {
    const wallet = useWallet();
    const { data, error, isLoading } = useSWR<
        QuizWithPrizeQuestionOptionEntry,
        Error
    >(`${getInternalApiUrl()}/api/quiz?quizId=${props.quizId}`, fetcher);

    if (error) {
        console.log(error.message);
    }

    const socket = useSocket(
        process.env.SOCKET_URL
            ? process.env.SOCKET_URL
            : "http://localhost:3001"
    );
    const { quizWorkflowStarted, hasQuizEnded } = useQuizSocket(socket);
    console.log("quizworkflow");
    console.log(quizWorkflowStarted);

    return (
        <NavBar>
            <Head>
                <title>Trivia</title>
            </Head>

            {data ? (
                // Check if the quiz has ended
                data.ended || hasQuizEnded ? (
                    // quiz has ended
                    <QuizResult
                        startDateTime={DateTime.fromISO(
                            data.startDateTime.toString()
                        )}
                        week={data.week}
                        name={data.name}
                        entries={data.quizEntry}
                        prize={data.prize}
                        solPrice={data.solPrice}
                    ></QuizResult>
                ) : quizWorkflowStarted ? (
                    // quiz has started
                    <LiveQuiz entries={data.quizEntry}></LiveQuiz>
                ) : (
                    <QuizPageWaiting
                        startDateTime={DateTime.fromISO(
                            data.startDateTime.toString()
                        )}
                        week={data.week}
                        name={data.name}
                        quizId={data.quizId}
                        prizes={data.prize}
                        entries={data.quizEntry}
                        solPrice={data.solPrice}
                    />
                )
            ) : (
                <></>
            )}
        </NavBar>
    );
}

export async function getServerSideProps(
    ctx: GetServerSidePropsContext<{
        quizId: string;
    }>
) {
    const session = await getSession(ctx);

    const { params } = ctx;
    const quizId = params?.quizId as string;
    return {
        props: {
            quizId,
            session,
        },
    };
}

export default QuizIndividualPage;
