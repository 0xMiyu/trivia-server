import { FunctionComponent } from "react";
// import { QuizAdminData } from "../../types/quizTypes";
import useSWR from "swr";
import { ErrorMessage } from "../../types/errorMessage";
import Link from "next/link";
import QuizItem from "./QuizItem";
import { getInternalApiUrl } from "../../service/common";

interface AdminQuizzesProps {}

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

const AdminQuizzes: FunctionComponent<AdminQuizzesProps> = () => {
    const { data, error, isLoading } = useSWR(
        `${getInternalApiUrl()}/api/admin/quiz`,
        fetcher
    );

    return (
        <div>
            {/* low priority, get to it later */}
            {/* <p className="p-2 text-[#e5e5e5]">Filter</p> */}
            <div className="grid place-items-end pt-8 pr-8">
                <Link href={`/admin/quiz/newquiz`}>
                    <div className="bg-[#202020] h-12 w-40 rounded-lg grid place-items-center hover:bg-[#171717]">
                        <div className="flex items-center">
                            <p className="pr-4">New Quiz</p>
                            <div className="grid place-items-center">
                                <p className="font-bold text-2xl text-[#BBBBBB]">
                                    +
                                </p>
                            </div>
                        </div>
                    </div>
                </Link>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-8 py-8">
                {data?.map((quiz: any) => {
                    return <QuizItem key={quiz.quizId} quiz={quiz}></QuizItem>;
                })}
            </div>{" "}
        </div>
    );
};

export default AdminQuizzes;
