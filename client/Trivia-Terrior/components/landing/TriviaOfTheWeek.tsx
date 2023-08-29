import Image from "next/image";
import TriviaBG from "../../public/bg/week-trivia-bg.png";
import Link from "next/link";
import TriviaOfTheWeekTimer from "./TriviaOfTheWeekTimer";
import { useAtomValue } from "jotai";
import { qotw } from "../../atoms/qotwAtom";

function TriviaOfTheWeek() {
    // hardcoded 2, but need to know the upcoming quiz
    const data = useAtomValue(qotw);
    // set the data, but only set it once
    console.log(data);
    return (
        <div className="mt-28 mb-8 rounded-3xl border-[.1px] p-2 border-white">
            {/* set a background image for the card */}
            <div className="bg-[#0A0A0A] w-[100%] h-[27rem] md:h-[30rem] relative">
                <Image
                    src={TriviaBG}
                    placeholder="blur"
                    alt="Trivia of the week"
                    fill
                    style={{
                        objectFit: "cover",
                        objectPosition: "center",
                    }}
                    className="rounded-lg"
                />

                {/* content */}
                <div className="px-3 md:px-16 absolute z-10 top-0 left-0">
                    <div className="my-4">
                        <p className="text-lg text-[#C5FB00] font-light border-l-2 border-[#C5FB00] pl-2">
                            Live
                        </p>

                        <h3 className="text-3xl md:text-5xl w-full md:w-[20rem] text-white font-bold mt-8">
                            Trivia of the Week!
                        </h3>

                        <p className="text-base md:text-lg w-full md:w-[25rem] my-3">
                            Take part in this week&apos;s Trivia and take home
                            all the money in the pot!
                        </p>

                        <div className="flex items-center my-4 border-[.1px] border-white rounded-xl w-fit">
                            <Link href={`/quiz/${data?.quizId}`}>
                                <button className="bg-[#C5FB00] font-bold text-black py-2 px-4 border-[#C5FB00] rounded-xl">
                                    <span>More details</span>
                                </button>
                            </Link>
                            <span className="text-lg text-white px-4">
                                {data && (
                                    <TriviaOfTheWeekTimer
                                        startdatetime={
                                            new Date(data?.startDateTime!)
                                        }
                                    ></TriviaOfTheWeekTimer>
                                )}
                            </span>
                        </div>
                    </div>

                    <div className="flex items-center space-x-4 mt-24">
                        <div className="bg-white rounded-lg w-14 h-14 md:w-12 md:h-12"></div>

                        <div className="flex flex-col">
                            <p className="text-base md:text-lg">
                                <b>This week&apos;s Trivia topic : </b>
                                {data?.name}
                            </p>
                            <p className="text-base md:text-lg">
                                Week {data?.week} Newsletter
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TriviaOfTheWeek;
