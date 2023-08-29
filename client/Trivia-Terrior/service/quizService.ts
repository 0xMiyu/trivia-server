import { Quiz } from "@prisma/client";
import questionService from "./questionService";
import prizeService from "./prizeService";

interface GetQuizRequest {
    quizId: number;
}

interface CreateQuizRequest {
    name: string;
    week: number;
    description: string;
    startDateTime: Date;
    solPrice: number;
    prizes?: {
        name: string;
        quantity: number;
        image: string;
        solValue: number;
    }[];
    questions?: {
        timeLimit: number;
        text: string;
        image?: string;
        points: number;
        options?: { correct: boolean; text: string }[];
    }[];
}

interface UpdateQuizRequest {
    quizId: number;
    name?: string;
    week?: number;
    description?: string;
    startDateTime?: Date;
    solPrice?: number;
}

interface DeleteQuizRequest {
    quizId: number;
}

interface CreateQuizEntryRequest {
    quizId: number;
    publicKey: string;
}

const getAllQuizzes = async () => {
    const quizzes = await prisma.quiz.findMany({
        include: {
            prize: true,
            question: {
                include: {
                    option: true,
                },
            },
            quizEntry: true,
        },
    });

    if (!quizzes) {
        throw Error("No quizzes found");
    }

    return quizzes;
};

const getQuiz = async (data: GetQuizRequest) => {
    const { quizId } = data;

    const quiz = await prisma.quiz.findFirst({
        where: { quizId },
        include: {
            prize: true,
            question: {
                include: {
                    option: true,
                },
            },
            quizEntry: true,
        },
    });

    if (!quiz) {
        throw Error("Quiz not found");
    }

    return quiz;
};

const createQuiz = async (data: CreateQuizRequest) => {
    let { name, week, description, startDateTime, solPrice, questions, prizes } = data;

    const newQuiz = await prisma.quiz.create({
        data: {
            name: name,
            week: week,
            description: description,
            startDateTime: startDateTime,
            solPrice: solPrice,
            ended: false,
        },
    });

    if (!questions) {
        questions = [];
    }

    if (!prizes) {
        prizes = [];
    }

    for (const q of questions) {
        await questionService.createQuestion({
            quizId: newQuiz.quizId,
            timeLimit: q.timeLimit,
            text: q.text,
            image: q.image,
            points: q.points,
            options: q.options,
        });
    }

    for (const p of prizes) {
        await prizeService.createPrize({
            quizId: newQuiz.quizId,
            name: p.name,
            quantity: p.quantity,
            image: p.image,
            solValue: p.solValue,
        });
    }

    return newQuiz;
};

const updateQuiz = async (data: UpdateQuizRequest) => {
    const { quizId, name, week, description, startDateTime, solPrice } = data;

    const quiz = await prisma.quiz.findFirst({
        where: { quizId },
    });

    if (!quiz) {
        throw Error("Quiz not found");
    }

    const updatedQuiz = await prisma.quiz.update({
        where: { quizId },
        data: {
            name,
            week,
            description,
            startDateTime,
            solPrice
        },
    });

    return updatedQuiz;
};

const deleteQuiz = async (data: DeleteQuizRequest) => {
    const { quizId } = data;

    const quiz = await prisma.quiz.findFirst({
        where: { quizId },
    });

    if (!quiz) {
        throw Error("Quiz not found");
    }

    const deletedQuiz = await prisma.quiz.delete({
        where: { quizId },
    });

    return deletedQuiz;
};

const createQuizEntry = async (data: CreateQuizEntryRequest) => {
    const {quizId, publicKey} = data;

    const player = await prisma.user.findUnique({
        where: {publicKey}
    })
    if (!player) {
        throw Error("Player not found")
    }

    const quiz = await prisma.quiz.findUnique({
        where: {quizId}
    })
    if (!quiz) {
        throw Error("Quiz not found")
    }

    const newQuizEntry = await prisma.quizEntry.create({
        data: {
            quizId: quizId,
            publicKey: publicKey
        }
    })

    return newQuizEntry;
}

const quizService = {
    getAllQuizzes,
    getQuiz,
    createQuiz,
    updateQuiz,
    deleteQuiz,
    createQuizEntry
};

export default quizService;
