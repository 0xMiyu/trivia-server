import { Question } from '@prisma/client';
import { Option } from '@prisma/client';
import optionService from './optionService';

interface GetAllQuestionsRequest {
	quizId: number;
}

interface GetQuestionRequest {
	quizId: number;
	questionId: number;
}

interface CreateQuestionRequest {
	quizId: number;
	timeLimit: number;
	text: string;
	image?: string;
	points: number;
	options?: { correct: boolean; text: string }[];
}

interface UpdateQuestionRequest {
	quizId: number;
	questionId: number;
	timeLimit?: number;
	text?: string;
	image?: string;
	points?: number;
}

interface DeleteQuestionRequest {
	quizId: number;
	questionId: number;
}

const getAllQuestions = async (data: GetAllQuestionsRequest) => {
	const { quizId } = data;
	const questions = await prisma.question.findMany({
		where: { quizId },
		include: {
			option: true,
		},
	});

	if (!questions) {
		throw Error('Questions not found');
	}
	return questions;
};

const getQuestion = async (data: GetQuestionRequest) => {
	const { quizId, questionId } = data;
	const question = await prisma.question.findUnique({
		where: {
			quizId_questionId: { questionId: questionId, quizId: quizId },
		},
		include: {
			option: true,
		},
	});

	if (!question) {
		throw Error('Question not found');
	}
	return question;
};

const createQuestion = async (data: CreateQuestionRequest) => {
	const { quizId, timeLimit, text, image, points, options } = data;

	const quiz = await prisma.quiz.findUnique({
		where: { quizId },
	});

	// KIV
	if (!quiz) {
		throw Error('Quiz not found');
	}
	// Retrieve the highest existing questionId for the quiz
	const highestQuestionId = await prisma.question.findFirst({
		where: { quizId },
		orderBy: { questionId: 'desc' },
		select: { questionId: true },
	});

	// Increment the questionId
	const questionId = highestQuestionId ? highestQuestionId.questionId + 1 : 1;

	const newQuestion = await prisma.question.create({
		data: {
			quizId,
			questionId,
			timeLimit,
			text,
			image,
			points,
		},
	});

	if (options) {
		for (const o of options) {
			await optionService.createOption({
				quizId,
				questionId,
				correct: o.correct,
				text: o.text,
			});
		}
	}

	return newQuestion;
};

const updateQuestion = async (data: UpdateQuestionRequest) => {
	const { quizId, questionId, timeLimit, text, image, points } = data;

	const existingQuestion = await prisma.question.findUnique({
		where: {
			quizId_questionId: { questionId: questionId, quizId: quizId },
		},
	});

	if (!existingQuestion) {
		throw Error('Question not found');
	}

	const updatedQuestion = await prisma.question.update({
		where: {
			quizId_questionId: { questionId: questionId, quizId: quizId },
		},
		data: {
			timeLimit: timeLimit,
			text: text,
			image: image,
			points: points,
		},
	});

	return updatedQuestion;
};

const deleteQuestion = async (data: DeleteQuestionRequest) => {
	const { quizId, questionId } = data;
	const existingQuestion = await prisma.question.findUnique({
		where: {
			quizId_questionId: {
				questionId: questionId,
				quizId: quizId,
			},
		},
	});

	if (!existingQuestion) {
		throw Error('Question not found');
	}

	const deletedQuestion = await prisma.question.delete({
		where: {
			quizId_questionId: {
				questionId: questionId,
				quizId: quizId,
			},
		},
		include: {
			option: true,
		},
	});
	return deletedQuestion;
};

const questionService = {
	getAllQuestions,
	getQuestion,
	createQuestion,
	updateQuestion,
	deleteQuestion,
};

export default questionService;
