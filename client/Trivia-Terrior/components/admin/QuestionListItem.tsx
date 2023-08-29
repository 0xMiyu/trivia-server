import { FunctionComponent, useState } from "react";
// import { QuestionAdminData } from "../../types/quizTypes";
import Link from "next/link";
import { mutate } from "swr";
import { getInternalApiUrl } from "../../service/common";

interface QuestionListItemProps {
    question: any;
}

const QuestionListItem: FunctionComponent<QuestionListItemProps> = ({
    question,
}) => {
    const [hover, setHover] = useState(false);
    async function onDelete(quizId: number, questionid: number) {
        // implement delete request.
        const response = await fetch(
            `${getInternalApiUrl()}/api/admin/quiz/${quizId}/question/${questionid}`,
            {
                method: "DELETE",
            }
        );

        if (!response.ok) {
            throw Error("Error deleting");
        }
        mutate(`${getInternalApiUrl()}/api/admin/quiz/${quizId}/question`);
    }

    return (
        <div
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
        >
            <p className="text-[#00FF00]">{question.questionId}</p>
            <div className="flex items-center justify-between">
                <Link
                    href={`/admin/quiz/${question.quizId}/question/${question.questionId}`}
                >
                    <button className="w-full text-left my-2">
                        {question.text}
                    </button>
                </Link>
                {hover && (
                    <button
                        onClick={() => {
                            if (
                                window.confirm(
                                    "Are you sure you want to delete this question?"
                                )
                            ) {
                                onDelete(question.quizId, question.questionId);
                            }
                        }}
                    >
                        <p>X</p>
                    </button>
                )}
            </div>
        </div>
    );
};
export default QuestionListItem;
