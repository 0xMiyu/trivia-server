import type { NextApiRequest, NextApiResponse } from "next";
import { QuizData } from "../../types/quizTypes";
import { ErrorMessage } from "../../types/errorMessage";
import prisma from "../../prisma/client";
import { QuizWithPrizeEntry } from "../../types/backendReturnTypes";

/**
 * API ENDPOINT: /api/quiz?quizId={quizId}
 *
 * DESCRIPTION:
 * - This returns the details of the quiz without the questions.
 * - It will also return the results of the quiz if the quiz has ended and the time has passed
 *
 */

interface Req extends NextApiRequest {
    query: {
        quizId: string;
        limit: string;
    };
}

export default async function handler(
    req: Req,
    res: NextApiResponse<QuizWithPrizeEntry | QuizWithPrizeEntry[] | ErrorMessage>
) {
    const {
        method,
        query: { quizId, limit },
    } = req;

    switch (method) {
        case "GET":
            const reqQuizId = Number(quizId) || undefined;
            try {
                if (reqQuizId) {
                    const quiz = await prisma.quiz.findFirst({
                        where: { quizId: reqQuizId },
                        include: {
                            quizEntry: true,
                            prize: true
                        },
                    });

                    if(!quiz) {
                        return res.status(404).json({message: "Quiz not found"})
                    }
                    
                    if(quiz.quizEntry){
                        quiz.quizEntry.sort((a, b) =>  b.points - a.points)
                    }

                    return res.status(200).json(quiz)
                }

                const quizzes = await prisma.quiz.findMany({
                    include: {
                        quizEntry: true,
                        prize: true
                    },
                });

                if(!quizzes) {
                    return res.status(404).json({message: "Quizzes not found"})
                }

                for(const q of quizzes){
                    if(q.quizEntry){
                        q.quizEntry.sort((a, b) => b.points - a.points)
                    }
                }

                return res.status(200).json(quizzes)

            } catch (error) {
                return res.status(500).json({
                    message: "Error retrieving quiz",
                    error: error,
                });
            }
    }

    return res.status(405).json({
        message: "Request method is not supported",
    });
}
