import type { NextApiRequest, NextApiResponse } from "next";
import { ErrorMessage } from "../../../../../../../types/errorMessage";
import authAdminMiddleware from "../../../../../../../middlewares/authAdminMiddleware";
import { Question } from "@prisma/client";
import questionService from "../../../../../../../service/questionService";
import { QuestionWithOption } from "../../../../../../../types/backendReturnTypes";

export interface UpdateQuestionRequest {
    timeLimit?: number;
    text?: string;
    image?: string;
    points?: number;
}

const handler = async (
    req: NextApiRequest,
    res: NextApiResponse<Question | ErrorMessage>
) => {
    const { method, body, query } = req;
    const questionId = Number(req.query.questionId as string);
    const quizId = Number(req.query.quizId as string);

    switch (method) {
        case "GET":
            try {
                const question: QuestionWithOption =
                    await questionService.getQuestion({
                        quizId,
                        questionId,
                    });
                return res.status(200).json(question);
            } catch (error: any) {
                if (error.message === "Question not found") {
                    return res.status(404).json({ message: error.message });
                }
                return res.status(500).json({
                    message: "Error retrieving question",
                    error: error,
                });
            }

        case "PUT":
            try {
                const {
                    timeLimit,
                    text,
                    image,
                    points,
                }: UpdateQuestionRequest = body;

                if (!timeLimit && !text && !image && !points) {
                    return res.status(400).json({
                        message: "No fields provided for update",
                    });
                }

                const updatedQuestion: Question =
                    await questionService.updateQuestion({
                        quizId,
                        questionId,
                        timeLimit,
                        text,
                        image,
                        points,
                    });

                return res.status(200).json(updatedQuestion);
            } catch (error: any) {
                if (error.message === "Question not found") {
                    return res.status(404).json({ message: error.message });
                }
                return res.status(500).json({
                    message: "Error updating question",
                    error: error,
                });
            }

        case "DELETE":
            try {
                const deletedQuestion = await questionService.deleteQuestion({
                    quizId,
                    questionId,
                });

                return res
                    .status(200)
                    .json({ message: "Question deleted successfully" });
            } catch (error: any) {
                if (error.message === "Question not found") {
                    return res.status(404).json({ message: error.message });
                }
                return res.status(500).json({
                    message: "Error deleting question",
                    error: error,
                });
            }

        default:
            res.setHeader("Allow", ["GET", "PUT", "DELETE"]);
            return res
                .status(405)
                .json({ message: `Method ${method} not allowed` });
    }
};

export default authAdminMiddleware(handler);
