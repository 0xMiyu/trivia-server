import { FunctionComponent } from "react";
// import { QuestionAdminData } from "../../types/quizTypes";
import QuestionListItem from "./QuestionListItem";
import useSWR from "swr";
import { ErrorMessage } from "../../types/errorMessage";
import Link from "next/link";
import { getInternalApiUrl } from "../../service/common";

interface QuestionListInterface {
    quizId: number | undefined;
}

const fetcher = async (url: string) => {
    const res = await fetch(url);
    // If the status code is not in the range 200-299,
    // we still try to parse and throw it.
    if (!res.ok) {
        const error = new Error();
        // Attach extra info to the error object.
        error.message = await res.json();
        throw error;
    }

    return res.json();
};

const QuestionList: FunctionComponent<QuestionListInterface> = ({ quizId }) => {
    const { data, error, isLoading } = useSWR(`${getInternalApiUrl()}/api/admin/quiz/${quizId}/question`, fetcher);
    return (
        <div className="h-screen overflow-y-auto p-4 bg-[#A5DB00] w-1/5">
            <h2 className="font-bold text-lg mb-4">Questions</h2>
            {data &&
                data.map((question: any, index: number) => (
                    <QuestionListItem key={index + 1} question={question} />
                ))}
            <div className="grid place-items-center">
                <Link
                    href={`/admin/quiz/${quizId}/question/${
                        data ? data?.length + 1 : 1
                    }?new=True`}
                >
                    <div className="flex items-center border rounded-lg px-4 my-2 hover:bg-[#95CB00]">
                        <p>New Question</p>
                        <p className="text-xl font-bold p-2">+</p>
                    </div>
                </Link>
            </div>
        </div>
    );
};
export default QuestionList;
