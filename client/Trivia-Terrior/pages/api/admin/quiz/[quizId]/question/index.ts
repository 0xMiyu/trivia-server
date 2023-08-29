import type { NextApiRequest, NextApiResponse } from "next";
import { ErrorMessage } from "../../../../../../types/errorMessage";
import authAdminMiddleware from "../../../../../../middlewares/authAdminMiddleware";
import { Option, Question } from "@prisma/client";
import questionService from "../../../../../../service/questionService";
import { QuestionWithOption } from "../../../../../../types/backendReturnTypes";

export interface CreateQuestionRequest {
    timeLimit: number;
    text: string;
    image?: string;
    points: number;
    options: { correct: boolean; text: string }[];
}

const handler = async (
    req: NextApiRequest,
    res: NextApiResponse<Question[] | Question | ErrorMessage>
) => {
    const { method, body, query } = req;
    const quizId = Number(req.query.quizId as string);

    switch (method) {
        case "GET":
            try {
                const questions: QuestionWithOption[] =
                    await questionService.getAllQuestions({ quizId });
                return res.status(200).json(questions);
            } catch (error: any) {
                if (error.message === "Questions not found") {
                    return res.status(404).json({ message: error.message });
                }
                return res.status(500).json({
                    message: "Error retrieving questions",
                    error: error,
                });
            }

        case "POST":
            try {
                const {
                    timeLimit,
                    text,
                    image,
                    points,
                    options,
                }: CreateQuestionRequest = body;

                if (!timeLimit || !text || !points) {
                    return res.status(400).json({
                        message: "Missing required parameters",
                    });
                }

                const newQuestion: Question =
                    await questionService.createQuestion({
                        quizId,
                        timeLimit,
                        text,
                        image,
                        points,
                        options,
                    });

                return res.status(201).json(newQuestion);
            } catch (error: any) {
                console.log(error.message);
                if (error.message === "Quiz not found") {
                    return res.status(404).json({ message: error.message });
                }
                return res.status(500).json({
                    message: "Error creating question",
                    error: error,
                });
            }

        default:
            res.setHeader("Allow", ["GET", "POST"]);
            return res
                .status(405)
                .json({ message: `Method ${method} not allowed` });
    }
};

export default authAdminMiddleware(handler);
