import { useEffect, useState } from "react";
import QuizTimer from "./QuizTimer";
import { MouseEvent } from "react";
import LogoGreen from "../svg/LogoGreen";
import useSocket from "../../lib/socket/useSocket";
import useTimerSocket from "../../lib/socket/useTimerSocket";
import useQuestionSocket from "../../lib/socket/useQuestionSocket";
import Timer from "./Timer";
import useQuizSocket from "../../lib/socket/useQuizSocket";
import { OptionData } from "../../types/quizTypes";
import { QuizEntry } from "@prisma/client";
import { useSession } from "next-auth/react";
import { DateTime } from "luxon";

interface MyError extends Error {
    info: { message: string };
    status: number;
}

interface LiveQuizProps {
    entries: QuizEntry[];
}

function LiveQuiz(props: LiveQuizProps) {
    const socket = useSocket(
        process.env.SOCKET_URL
            ? process.env.SOCKET_URL
            : "http://localhost:3001"
    );
    let { hasQuizStarted, waitingRoom, quizInformation } =
        useQuizSocket(socket);
    let { questionTimeLimit, waitingTime } = useTimerSocket(socket);
    let { question, result, correctOption, setOption } =
        useQuestionSocket(socket);

    const [selected, setSelected] = useState(0);

    const { data: session, status } = useSession();
    const publicKey = session
        ? session.user.publicKey
            ? session.user.publicKey
            : ""
        : "";

    let disableButton = false;
    if (selected) {
        disableButton = true;
    }

    const chooseOption = (
        e: MouseEvent<HTMLButtonElement>,
        option: OptionData
    ) => {
        setOption(option);
        setSelected(option.optionId);
    };

    useEffect(() => {
        setSelected(0);
    }, [question]);

    return (
        <div className="w-full md:w-[70%] mx-auto px-6 md:px-10">
            {!hasQuizStarted && quizInformation && (
                <div className="grid place-items-center">
                    <p className="text-xl font-bold">
                        Week {quizInformation.week} Quiz Starting in
                    </p>
                    <Timer
                        startDateTime={DateTime.fromISO(
                            quizInformation.startDateTime.toString()
                        )}
                    />
                </div>
            )}

            {waitingRoom && !hasQuizStarted && (
                <div className="grid place-items-center">
                    {/* People waiting */}
                    <p className="text-xl font-bold">Check out who's in</p>
                    <p>Number of players: {waitingRoom.length}</p>
                    <div>
                        {waitingRoom.map((user) => {
                            return (
                                <div key={user.publicKey}>
                                    <p>{user.userName}</p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}

            {/* TimeLeft */}
            {question && (
                <div>
                    <div className="absolute border-4 rounded-full w-20 h-20 grid place-items-center">
                        {question && questionTimeLimit && (
                            <QuizTimer seconds={questionTimeLimit} />
                        )}
                    </div>
                    <div className="grid place-items-center">
                        <p className="text-3xl font-bold text-center">
                            Question {question?.questionId}
                        </p>
                        <br />
                        <p className="text-3xl font-bold text-center w-2/3">
                            {question?.text}
                        </p>
                        {question?.image !== null && question?.image !== "" ? (
                            <img
                                src={question?.image}
                                className="object-cover h-72 w-96"
                            ></img>
                        ) : (
                            <div className="h-72 w-96 grid place-items-center">
                                <div className="animate-pulse ">
                                    <LogoGreen
                                        className="animate-bounce"
                                        width={100}
                                        height={100}
                                        view={"230 230 400 400"}
                                    />
                                </div>
                            </div>
                        )}
                    </div>
                    {!selected ? (
                        <div className="flex justify-center flex-wrap box">
                            <div className="grid grid-cols-2 grid-rows-2 p-1 min-w-[50%]">
                                {question?.option.map((option) => {
                                    return (
                                        <button
                                            key={option.optionId}
                                            disabled={disableButton}
                                            onClick={(e) =>
                                                chooseOption(e, option!)
                                            }
                                            className="min-w-40"
                                        >
                                            {/* Need make all the height resize dynamically */}
                                            <div
                                                className={
                                                    selected ===
                                                    option?.optionId
                                                        ? "text-white grid border p-4 rounded-xl m-2 text-xl font-bold place-items-center bg-[#A5DB00]"
                                                        : selected
                                                        ? "text-white grid border p-4 rounded-xl m-2 text-xl font-bold place-items-center"
                                                        : "text-white grid border p-4 rounded-xl m-2 text-xl font-bold place-items-center hover:bg-[#A5DB00] hover:scale-105 hover:text-black"
                                                }
                                            >
                                                <p className="text-inherit h-36 grid place-items-center">
                                                    {option?.text}
                                                </p>
                                            </div>
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    ) : (
                        <div>
                            <div className="h-8"></div>
                            <p className="grid place-items-center text-xl font-bold animate-bounce">
                                Speed Demon?
                            </p>
                        </div>
                    )}
                </div>
            )}

            {/* Waiting page between questions */}
            {waitingTime && !question && correctOption && (
                <div>
                    <div className="grid place-items-center">
                        <p className="font-medium text-xl">Countdown</p>
                        <QuizTimer seconds={waitingTime}></QuizTimer>
                    </div>
                    <div className="h-8" />
                    <div className="flex">
                        <p>
                            Correct Option:{" "}
                            {correctOption ? correctOption.text : ""}
                        </p>
                    </div>
                    <div className="h-8" />
                    <p className="font-bold text-2xl">Leaderboard</p>
                    <table className="w-3/4 mt-4 table-fixed">
                        <thead className="w-3/4 bg-[#212121] text-left sticky top-0">
                            <tr>
                                <th className="font-normal text-lg text-white">
                                    Name
                                </th>
                                <th className="text-white font-normal text-lg">
                                    Points
                                </th>
                                <th className="text-white font-normal text-lg">
                                    Ranking
                                </th>
                            </tr>
                            {/* divider */}
                            <tr className="bg-white py-4 w-3/4">
                                <td colSpan={3}></td>
                            </tr>
                        </thead>

                        <tbody className="">
                            {result?.map((item, index: number) => (
                                <tr key={index}>
                                    <td className="text-white font-normal text-lg hover:text-xl truncate">
                                        {item.name}
                                    </td>
                                    <td className="text-white font-normal text-lg">
                                        {item.points}
                                    </td>
                                    <td className="text-white font-normal text-lg">
                                        {index + 1}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}

export default LiveQuiz;
