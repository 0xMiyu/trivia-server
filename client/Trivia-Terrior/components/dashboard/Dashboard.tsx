import { useState } from "react";
import TriviaOfTheWeek from "../landing/TriviaOfTheWeek";
import LeaderBoard from "../LeaderBoard";
import NewUserModal from "./NewUserModal";
import Profile from "./Profile";
import Stats from "./Stats";
import useSWR from "swr";
import { UserWithStats } from "../../types/userTypes";
import { useWallet } from "@solana/wallet-adapter-react";
import EditProfile from "./EditProfile";
import { getInternalApiUrl } from "../../service/common";

interface DashboardProps {
    publicKey: string;
}

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

function Dashboard(props: DashboardProps) {
    // const [showModal, setShowModal] = useState(true);
    const wallet = useWallet();
    const [editState, setEditState] = useState(false);
    const { data, error, isLoading } = useSWR<UserWithStats, Error>(
        `${getInternalApiUrl()}/api/user?publicKey=${props.publicKey}`,
        fetcher
    );

    if (error)
        return (
            <div className="w-full md:w-[70%] mx-auto px-6 md:px-10 ">
                <div className="mt-28 mb-8 rounded-3xl border-[.1px] p-2 border-white ">
                    <div className="grid place-items-center">
                        <h3 className="text-3xl md:text-5xl text-[#C5FB00] font-bold ">
                            Error
                        </h3>

                        <h3 className="text-3xl md:text-5xl text-white font-bold mt-8">
                            Invalid wallet address!
                        </h3>
                    </div>
                </div>
            </div>
        );
    if (isLoading) return <div>loading...</div>;

    return (
        <div className="w-full md:w-[70%] mx-auto px-6 md:px-10">
            {/* <NewUserModal
                isOpen={showModal}
                setIsOpen={() => setShowModal(false)}
            /> */}

            {/* Profile picture and wallet address */}
            {editState ? (
                <EditProfile
                    user={props.publicKey}
                    name={data?.userName}
                    profilepic={data?.profilePicture}
                    save={setEditState}
                />
            ) : (
                <Profile
                    user={props.publicKey}
                    name={data?.userName}
                    profilepic={data?.profilePicture}
                    isCurrentUser={
                        wallet.publicKey?.toString() === props.publicKey
                    }
                    edit={setEditState}
                />
            )}

            {/* trivia of the week */}
            <TriviaOfTheWeek />

            {/* Stats */}
            <Stats
                gamesPlayed={data?.gamesPlayed}
                wins={data?.totalWins}
                totalPoints={data?.totalPoints}
            />

            {/* leader-board */}
            <LeaderBoard publicKey={props.publicKey} />
        </div>
    );
}

export default Dashboard;
