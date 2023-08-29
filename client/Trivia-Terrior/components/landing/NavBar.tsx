import Link from "next/link";
import { useRouter } from "next/router";

import { signOut, useSession } from "next-auth/react";
import { useUserSignIn } from "../../lib/useUserSignIn";

import Footer from "../Footer";
import LogoGreen from "../svg/LogoGreen";
import { QuizOfTheWeekData } from "../../types/quizTypes";
import useSWR from "swr";
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

function NavBar({ children }: { children: React.ReactNode }) {
    let isTriviaPage = false;
    let isConfirmationPage = false;
    let isDashboardPage = false;
    let isAdminPage = false;

    const router = useRouter();
    const path = router.pathname;

    /* Authentication and sessions */
    const { data: session, status } = useSession();
    const loading = status === "loading";

    if (path.includes("trivia")) isTriviaPage = true;
    if (path.includes("success")) isConfirmationPage = true;
    if (path.includes("dashboard")) isDashboardPage = true;
    if (path.includes("admin")) isAdminPage = true;

    const { data, error, isLoading } = useSWR<QuizOfTheWeekData, Error>(
        `${getInternalApiUrl()}/api/quizOfTheWeek`,
        fetcher
    );

    const { wallet, handleSignIn } = useUserSignIn(status);

    return (
        <div>
            <nav className="w-full px-1 md:px-0 md:w-[70%] mx-auto mt-6 items-center flex justify-between">
                {/* Logo */}
                <div className="">
                    <Link href="/">
                        <LogoGreen
                            height={100}
                            width={100}
                            view={"0 0 800 800"}
                        />
                    </Link>
                </div>

                {/* extra, connect-wallet */}
                <div className="space-x-4 md:space-x-16 mr-4 md:mr-0">
                    {!isTriviaPage && !isAdminPage && data && (
                        <Link
                            href={`/quiz/${data.quizId}`}
                            className="text-white underline text-sm md:text-lg"
                        >
                            Quiz of the week
                        </Link>
                    )}

                    {/* add authentication rules */}

                    {!session && !isConfirmationPage && !isDashboardPage ? (
                        <button
                            className="connect-wallet text-sm md:text-lg"
                            onClick={handleSignIn}
                        >
                            Connect Wallet
                        </button>
                    ) : (
                        !isDashboardPage && (
                            <Link href={`/dashboard/${wallet.publicKey}`}>
                                <button className="connect-wallet text-sm md:text-lg">
                                    Dashboard
                                </button>
                            </Link>
                        )
                    )}

                    {session?.user && (
                        <>
                            <button
                                // href={`/api/auth/signout`}
                                className="sign-out text-sm md:text-lg"
                                onClick={(e) => {
                                    e.preventDefault();
                                    signOut();
                                }}
                            >
                                Sign out
                            </button>
                        </>
                    )}
                </div>
            </nav>

            {children}

            {data && <Footer quizId={data?.quizId} />}
        </div>
    );
}

export default NavBar;
