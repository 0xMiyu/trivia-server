import Link from "next/link";
import { useState } from "react";
// import { QuizAdminData } from "../../types/quizTypes";
import { mutate } from "swr";
import { getInternalApiUrl } from "../../service/common";

interface QuizItemProps {
    quiz: any;
}

const QuizItem: React.FC<QuizItemProps> = ({ quiz }) => {
    const [hover, setHover] = useState(false);
    async function onDelete(quizId: number) {
        // implement delete request.
        const response = await fetch(`${getInternalApiUrl()}/api/admin/quiz/${quizId}`, {
            method: "DELETE",
        });

        if (!response.ok) {
            throw Error("Error deleting");
        }
        mutate(`${getInternalApiUrl()}/api/admin/quiz`);
    }
    return (
        <div
            className="bg-[#0E0E0E] border-2 rounded-lg h-48"
            key={quiz?.quizId}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
        >
            <Link href={`/admin/quiz/${quiz?.quizId}/question/${1}`}>
                <div className="p-4">
                    <h2 className="text-lg font-bold text-[#C5FB00] mb-2 truncate">
                        {quiz?.name}
                    </h2>
                    <p className="truncate">Week: {quiz?.week}</p>
                    <p className=" truncate">
                        Start Time:
                        <br />
                        {quiz && new Date(quiz?.startDateTime).toLocaleString()}
                    </p>
                    <div className="border-t-2 border-[#9C9C9C] my-2"></div>
                    <p className="grid place-items-center text-[#C5FB00]">
                        {quiz?.ended ? "Ended" : "Ongoing"}
                    </p>
                </div>
            </Link>
            {hover && (
                <div dir="rtl">
                    <button
                        onClick={() => {
                            if (
                                window.confirm(
                                    "Are you sure you want to delete this question?"
                                )
                            ) {
                                onDelete(quiz.quizId);
                            }
                        }}
                        className="text-white text-lg relative bottom-48 font-bold"
                    >
                        X
                    </button>
                </div>
            )}
        </div>
    );
};

export default QuizItem;
