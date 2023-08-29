import type { NextApiRequest, NextApiResponse } from 'next';
import authAdminMiddleware from '../../../../middlewares/authAdminMiddleware';
import quizService from '../../../../service/quizService';
import { QuizWithPrizeQuestionOptionEntry } from '../../../../types/backendReturnTypes';
import { Quiz } from '@prisma/client';

export interface CreateQuizRequest {
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

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	const { method, body, query } = req;

	switch (method) {
		case 'GET':
			try {
				const quizzes: QuizWithPrizeQuestionOptionEntry[] =
					await quizService.getAllQuizzes();
				return res.status(200).json(quizzes);
			} catch (error: any) {
				if (error.message === 'No quizzes found') {
					return res.status(404).json({ message: error.message });
				}
				return res.status(500).json({
					message: 'Error retrieving quizzes',
					error: error,
				});
			}
		case 'POST':
			try {
				const {
					name,
					week,
					description,
					startDateTime,
                    solPrice,
					questions,
					prizes,
				}: CreateQuizRequest = body;

				if (!name || !week || !description || !startDateTime || !solPrice) {
					return res.status(400).json({
						message:
							'Missing params. Required params: name, week, description, startDateTime',
					});
				}

				const newQuiz: Quiz = await quizService.createQuiz({
					name,
					week,
					description,
					startDateTime,
                    solPrice,
					questions,
					prizes,
				});

				return res.status(201).json(newQuiz);
			} catch (error: any) {
				console.log(error.message);
				return res.status(500).json({
					message: 'Error creating quiz',
					error: error,
				});
			}
		default:
			res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
			return res.status(405).json({ message: `Method ${method} not allowed` });
	}
};

export default authAdminMiddleware(handler);
