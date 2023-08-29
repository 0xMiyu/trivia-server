import Image from "next/image";
import useSWR from "swr";
import type { Leaderboard } from "../types/userTypes";
import Link from "next/link";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import { getSession, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { getInternalApiUrl } from "../service/common";

interface LeaderBoardProps {
    publicKey: string;
}

const fetcher = (url: string) =>
    fetch(url, {
        method: "GET",
    }).then((res) => res.json());

function IndividualLeaderBoard({ publicKey }: { publicKey: string }) {
    const { data, error, isLoading } = useSWR<Leaderboard, Error>(
        `${getInternalApiUrl()}/api/leaderboard?publicKey=${publicKey}`,
        fetcher
    );

    if (error) return <div>failed to load</div>;
    if (isLoading) return <div>loading...</div>;
    return (
        <div>
            <div className="bg-white rounded-t-lg px-4 py-2">
                <span className="text-sm text-black font-bold">
                    #{data?.overallRanking}
                </span>
            </div>
            <div className="flex justify-between text-black bg-[#C5FB00] px-4 py-2 font-normal rounded-b-lg text-lg">
                <span className=" max-w-[50%] font-orbitron truncate">
                    {data?.userName}
                </span>
                <span>
                    {data?.totalWins} Wins in {data?.gamesPlayed} Games
                </span>
                <span>{data?.totalPoints} points</span>
            </div>
        </div>
    );
}

export default function LeaderBoard(props: LeaderBoardProps) {
    const { data, error, isLoading } = useSWR<Leaderboard[], Error>(
        `${getInternalApiUrl()}/api/leaderboard`,
        fetcher
    );

    if (error) return <div>failed to load</div>;
    if (isLoading) return <div>loading...</div>;

    return (
        <div>
            <h2 className="text-4xl font-bold text-white mb-2">Leaderboard</h2>

            {/* individual */}
            {props.publicKey && (
                <IndividualLeaderBoard publicKey={props.publicKey} />
            )}

            {/* global leaderboard */}
            <div className="bg-[#212121] max-w-[70rem] w-full md:max-w-none md:w-full overflow-x-scroll md:overflow-x-hidden scrollbar px-8 py-4 rounded-lg my-8">
                {/* header stats */}
                <div className="flex justify-between max-w-[50rem] w-[50rem] md:max-w-none md:w-full items-center">
                    <div className="flex justify-between space-x-8 items-center">
                        <div className="w-16 h-16 rounded-full p-1 items-center flex justify-center bg-[#C5FB00]">
                            <Image
                                src="/icons/cup.svg"
                                alt="trophy"
                                width={50}
                                height={50}
                            />
                        </div>

                        <h4 className="text-3xl font-bold text-white font-orbitron">
                            {data?.[0].userName}
                        </h4>
                    </div>

                    <div className="flex flex-col items-center">
                        <span className="text-[#C5FB00] font-bold text-lg">
                            {data?.[0].totalWins} Wins in
                        </span>
                        <span className="text-[#C5FB00] font-bold text-lg">
                            {data?.[0].gamesPlayed} Games
                        </span>
                    </div>

                    <span className="text-white font-normal text-3xl">
                        {data?.[0].totalPoints}
                    </span>
                </div>

                {/* global */}
                <div className="max-h-[14rem] w-[50rem] md:w-full overflow-y-scroll scrollbar">
                    <table className="w-full mt-4 table-fixed">
                        <thead className="w-full bg-[#212121] text-left sticky top-0">
                            <tr>
                                <th className="font-normal text-lg text-[#C5FB00]">
                                    Name
                                </th>
                                <th className="text-white font-normal text-lg">
                                    Wins
                                </th>
                                <th className="text-white font-normal text-lg">
                                    Games Played
                                </th>
                                <th className="text-[#C5FB00] font-normal text-lg text-right">
                                    Total Points
                                </th>
                            </tr>
                            {/* divider */}
                            <tr className="bg-white py-4">
                                <td colSpan={4}></td>
                            </tr>
                        </thead>

                        <tbody className="">
                            {data?.map((item, index: number) => (
                                <tr key={index}>
                                    <td className="text-[#e6fb7a] font-normal text-lg hover:text-xl truncate">
                                        <Link
                                            href={`/dashboard/${item.publicKey}`}
                                        >
                                            {item.userName}
                                        </Link>
                                    </td>
                                    <td className="text-white font-normal text-lg">
                                        {item.totalWins}
                                    </td>
                                    <td className="text-white font-normal text-lg">
                                        {item.gamesPlayed}
                                    </td>
                                    <td className="text-white font-normal text-lg text-right">
                                        {item.totalPoints}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
