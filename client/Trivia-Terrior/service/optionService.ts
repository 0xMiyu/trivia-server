import { Option } from "@prisma/client";

interface GetAllOptionsRequest {
    quizId: number;
    questionId: number;
}

interface GetOptionRequest {
    quizId: number;
    questionId: number;
    optionId: number;
}

interface CreateOptionRequest {
    quizId: number;
    questionId: number;
    correct: boolean;
    text: string;
}

interface UpdateOptionRequest {
    quizId: number;
    questionId: number;
    optionId: number;
    correct?: boolean;
    text?: string;
}

interface DeleteOptionRequest {
    quizId: number;
    questionId: number;
    optionId: number;
}

const getAllOptions = async (data: GetAllOptionsRequest) => {
    const { quizId, questionId } = data;

    const options: Option[] = await prisma.option.findMany({
        where: { questionId, quizId },
    });

    if (!options) {
        throw new Error("Error retrieving options");
    }

    return options;
};

const getOption = async (data: GetOptionRequest) => {
    const { quizId, questionId, optionId } = data;

    const option = await prisma.option.findUnique({
        where: {
            optionId_questionId_quizId: {
                optionId: optionId,
                questionId: questionId,
                quizId: quizId,
            },
        },
    });

    if (!option) {
        throw Error("Option not found");
    }
    return option;
};

const updateOption = async (data: UpdateOptionRequest) => {
    const { quizId, questionId, optionId, correct, text } = data;
    const existingOption = await prisma.option.findUnique({
        where: {
            optionId_questionId_quizId: {
                optionId: optionId,
                questionId: questionId,
                quizId: quizId,
            },
        },
    });

    if (!existingOption) {
        throw Error("Option not found");
    }

    const updatedOption = await prisma.option.update({
        where: {
            optionId_questionId_quizId: {
                optionId: optionId,
                questionId: questionId,
                quizId: quizId,
            },
        },
        data: {
            correct: correct,
            text: text,
        },
    });

    return updatedOption;
};

const createOption = async (data: CreateOptionRequest) => {
    const { quizId, questionId, correct, text } = data;
    //check if question exists
    const question = await prisma.question.findUnique({
        where: {
            quizId_questionId: {
                quizId: quizId,
                questionId: questionId,
            },
        },
    });
    if (!question) {
        throw Error("Question does not exist :(");
    }

    //check if there's already 4 options
    const options = await prisma.option.findMany({
        where: { questionId, quizId },
    });

    if (options.length >= 4) {
        throw Error("Maximum number of options reached :(");
    }

    //check if there's already a correct option
    const hasExistingCorrectOption = options.some((option) => option.correct);

    if (correct && hasExistingCorrectOption) {
        throw Error("Correct option already exists :(");
    }

    // Retrieve the highest existing optionId for the question
    const highestOptionId = await prisma.option.findFirst({
        where: { questionId, quizId },
        orderBy: { optionId: "desc" },
        select: { optionId: true },
    });

    // Increment the optionId
    const optionId = highestOptionId ? highestOptionId.optionId + 1 : 1;

    const newOption = await prisma.option.create({
        data: {
            questionId,
            quizId,
            optionId,
            correct,
            text,
        },
    });

    return newOption;
};

const deleteOption = async (data: DeleteOptionRequest) => {
    const { quizId, questionId, optionId } = data;

    const existingOption = await prisma.option.findUnique({
        where: {
            optionId_questionId_quizId: {
                optionId: optionId,
                questionId: questionId,
                quizId: quizId,
            },
        },
    });

    if (!existingOption) {
        throw Error("Option not found");
    }

    const deletedOption = await prisma.option.delete({
        where: {
            optionId_questionId_quizId: {
                optionId: optionId,
                questionId: questionId,
                quizId: quizId,
            },
        },
    });
    return deletedOption;
};

const optionService = {
    getOption,
    getAllOptions,
    updateOption,
    createOption,
    deleteOption,
};

export default optionService;
