import useSWR from "swr";
import { ErrorMessage } from "../../types/errorMessage";
import { User } from "@prisma/client";
import { useWallet } from "@solana/wallet-adapter-react";
import AdminQuizzes from "./AdminQuizzes";
import { getInternalApiUrl } from "../../service/common";

const fetcher = async (url: string) => {
    const res = await fetch(url);
    // If the status code is not in the range 200-299,
    // we still try to parse and throw it.
    if (!res.ok) {
        const error = new Error();
        // Attach extra info to the error object.
        // @ts-ignore
        error.info = await res.json();
        // @ts-ignore
        error.status = res.status;
        throw error;
    }

    return res.json();
};

function AdminDashboard() {
    const wallet = useWallet();

    const { data, error, isLoading } = useSWR<User, ErrorMessage>(
        `${getInternalApiUrl()}/api/admin/${wallet.publicKey}`,
        fetcher
    );
    // either not logged in or not authorised as error

    if (error)
        return (
            <div className="w-full md:w-[70%] mx-auto px-6 md:px-10 ">
                <div className="mt-28 mb-8 rounded-3xl border-[.1px] p-2 border-white ">
                    <div className="grid place-items-center">
                        <h3 className="text-3xl md:text-5xl text-[#C5FB00] font-bold ">
                            Error
                        </h3>

                        <h3 className=" text-center text-3xl md:text-5xl text-white font-bold mt-8">
                            {error.message}
                        </h3>
                    </div>
                </div>
            </div>
        );
    // for the actual quiz will need to have react query maybe? need save state.
    return (
        <div className="w-full md:w-[70%] mx-auto px-6 md:px-10">
            <div className="text-center relative py-10 mt-28 bg-[#212121] rounded-xl w-full">
                <img
                    className="absolute m-auto left-0 right-0 h-32 w-32 md:h-48 md:w-48 mx-auto z-10 -top-16 md:-top-28 bg-white rounded-3xl"
                    src={data?.profilePicture}
                ></img>

                <h3 className="text-[#C5FB00] mt-16 text-2xl md:text-4xl font-bold">
                    Welcome {data?.userName}
                </h3>
            </div>
            <AdminQuizzes />
        </div>
    );
}

export default AdminDashboard;
