import type { NextApiRequest, NextApiResponse } from "next";
import { ErrorMessage } from "../../types/errorMessage";
import prisma from "../../prisma/client";
import { QuizEntry } from "@prisma/client";
import quizService from "../../service/quizService";

interface CreateQuizEntryRequest {
    quizId: number;
    publicKey: string;
}

const handler = async (req: NextApiRequest, res: NextApiResponse<QuizEntry | ErrorMessage>) => {
    const { method, query, body } = req;
    const { quizId, publicKey } = body;

    if (method !== "POST") {
        return res.status(405).json({ message: "Unsupported method" });
    }

    if (!quizId || !publicKey) {
        return res.status(400).json({ message: "Missing params" });
    }

    try {
        const newQuizEntry: QuizEntry = await quizService.createQuizEntry({
            quizId,
            publicKey,
        });
        return res.status(200).json(newQuizEntry);
    } catch (error: any) {
        if (
            error.message === "Player not found" ||
            error.message === "Quiz not found"
        ) {
            return res.status(404).json({ message: error.message });
        }
        return res.status(500).json({ message: "Internal server error" });
    }
};
