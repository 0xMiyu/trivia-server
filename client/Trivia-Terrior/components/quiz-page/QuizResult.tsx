import QuizHero from "./QuizHero";
import Image from "next/image";
import podium from "../../public/podium.png";
import Link from "next/link";
import { QuizEntry } from "@prisma/client";
import { User } from "@prisma/client";
import { useEffect, useState } from "react";
import { Prize } from "../../types/backendReturnTypes";
import { DateTime } from "luxon";
import { getInternalApiUrl } from "../../service/common";

interface QuizResultProps {
    startDateTime: DateTime;
    week: number;
    name: string;
    entries?: QuizEntry[];
    prize: Prize[];
    solPrice: number;
}

function QuizResult(props: QuizResultProps) {
    const [winners, setWinners] = useState<User[]>([]);
    useEffect(() => {});
    async function getUserbyPubKey(publicKey: string) {
        const response = await fetch(`${getInternalApiUrl()}/api/user?publicKey=${publicKey}`);
        const result = await response.json();
        return result;
    }
    useEffect(() => {
        if (props.entries) {
            const publicKeys = props.entries.map((entry) => entry.publicKey);
            Promise.all(publicKeys.map(getUserbyPubKey))
                .then((users) => setWinners(users))
                .catch((error) =>
                    console.error("Failed to fetch users:", error)
                );
        }
    }, [props.entries]);
    return (
        <div className="w-full md:w-[70%] mx-auto px-6 md:px-10">
            {/* Topic */}
            <QuizHero
                week={props.week}
                name={props.name}
                prizes={props.prize}
                solPrice={props.solPrice}
                entries={props.entries!}
            />
            {/* Results */}
            <p className="grid place-items-center text-[#C5FB00] text-xl">
                {props.startDateTime.day +
                    "/" +
                    props.startDateTime.month +
                    "/" +
                    props.startDateTime.year}
            </p>
            <p></p>
            {/* TODO */}
            {props.entries && (
                <div className="grid place-items-center">
                    <h2 className="text-3xl font-extrabold h-fit text-[#C5FB00]">
                        The Winners
                    </h2>
                    <div className="grid grid-cols-3 place-items-center col-start-1 col-end-1">
                        {winners[1] && (
                            <div className="grid place-items-center">
                                <Link
                                    href={`/dashboard/${winners[1]?.publicKey}`}
                                >
                                    <div className=" grid place-items-center md:relative inset-y-10 ">
                                        <p className="text-xl text-[#C5FB00]">
                                            2nd
                                        </p>
                                        <p className="text-xl">
                                            {winners[1]?.userName}
                                        </p>
                                        <img
                                            className="rounded"
                                            alt="profile picture"
                                            src={winners[1]?.profilePicture}
                                            width={200}
                                            height={200}
                                        ></img>
                                    </div>
                                </Link>

                                <Image
                                    alt="podium"
                                    src={podium}
                                    width={500}
                                    height={500}
                                ></Image>
                            </div>
                        )}
                        <div className="grid place-items-center relative inset-y-20 col-start-2 col-end-2">
                            <Link href={`/dashboard/${winners[0]?.publicKey}`}>
                                <div className=" grid place-items-center md:relative inset-y-10 ">
                                    <p className="text-xl text-[#C5FB00]">
                                        1st
                                    </p>
                                    <p className="text-xl">
                                        {winners[0]?.userName}
                                    </p>
                                    <img
                                        className="rounded"
                                        alt="profile picture"
                                        src={winners[0]?.profilePicture}
                                        width={200}
                                        height={200}
                                    ></img>
                                </div>
                            </Link>
                            <Image
                                className="min-h-200 min-w-200"
                                alt="podium"
                                src={podium}
                                width={700}
                                height={475}
                                sizes="100vw"
                                style={{
                                    width: "100%",
                                    height: "auto",
                                }}
                            ></Image>
                        </div>
                        {winners[2] && (
                            <div className="grid place-items-center col-start-3 col-end-3">
                                <Link
                                    href={`/dashboard/${winners[2]?.publicKey}`}
                                >
                                    <div className=" grid place-items-center md:relative inset-y-10 ">
                                        <p className="text-xl text-[#C5FB00]">
                                            3rd
                                        </p>
                                        <p className="text-xl">
                                            {winners[2]?.userName}
                                        </p>
                                        <img
                                            className="rounded"
                                            alt="profile picture"
                                            src={winners[2]?.profilePicture}
                                            width={200}
                                            height={200}
                                        ></img>
                                    </div>
                                </Link>

                                <Image
                                    alt="podium"
                                    src={podium}
                                    width={500}
                                    height={500}
                                ></Image>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}

export default QuizResult;
