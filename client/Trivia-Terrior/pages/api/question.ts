import type { NextApiRequest, NextApiResponse } from 'next';
// import { QuestionData, OptionData } from '../../types/quizTypes';
import { ErrorMessage } from '../../types/errorMessage';

const questionClientDataTest: any = {
	quizId: 3,
	questionId: 1,
	timelimit: 60,
	points: 100,
	text: "What is Solana's maximum TPS?",
	image: 'https://www.antiersolutions.com/wp-content/uploads/2022/08/alpha.gif',
	option: [
		{ optionId: 1, questionId: 1, text: '10,000' },
		{ optionId: 2, questionId: 1, text: '710,000' },
		{ optionId: 3, questionId: 1, text: '1,000,000' },
		{ optionId: 4, questionId: 1, text: '69,000' },
	],
};

// TODO
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	const { method, body, query } = req;

	switch (method) {
		case 'GET':
			const user = req.query.user;
			const quizId = Number(req.query.quizId) || undefined;
			const questionId = Number(req.query.questionId) || undefined;

			// check if user is in
			const isUserIn = true;
			console.log(quizId, questionId);

			if (quizId === undefined) {
				return res.status(400).send({
					message: 'This is an error!',
				});
			}

			if (questionId === undefined) {
				try {
					const data = await prisma.question.findMany({
						where: { quizId: quizId },
						include: {
							option: true,
						},
					});
					console.log(data);
					return res.status(200).json(data);
				} catch (error) {
					return res.status(500).json(error);
				}
			}

			try {
				const data = await prisma.question.findFirst({
					where: { quizId: quizId, questionId: questionId },
				});
				console.log(data);
				return res.status(200).json(data);
			} catch (error) {
				return res.status(500).json(error);
			}
		default:
			res.setHeader('Allow', ['GET']);
			return res.status(405).json({ message: `Method ${method} not allowed` });
	}
}
