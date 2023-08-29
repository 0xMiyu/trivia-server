import type { NextApiRequest, NextApiResponse } from "next";
import { QuizData } from "../../types/quizTypes";
import { ErrorMessage } from "../../types/errorMessage";
import prisma from "../../prisma/client";

/**
 * API ENDPOINT: /api/quizOfTheWeek
 *
 * DESCRIPTION:
 * This returns the quiz that:
 * - has not ended and
 * - upcoming startDateTime
 */

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<QuizData | ErrorMessage>
) {
    const { method } = req;

    switch (method) {
        case "GET":
            try {
                const upcomingQuizzes = await prisma.quiz.findMany({
                    where: {
                        ended: false,
                        startDateTime: {
                            gte: new Date(),
                        },
                    },
                    orderBy: {
                        startDateTime: "asc",
                    },
                });

                if (upcomingQuizzes.length == 0) {
                    return res.status(404).send({
                        message: "No upcoming quiz",
                    });
                }

                return res.status(200).json(upcomingQuizzes[0]);
            } catch (error) {
                return res.status(501).json({
                    message: "Error retrieving quiz of the week",
                    error: error,
                });
            }
    }

    return res.status(405).json({
        message: "Request method is not supported",
    });
}
