import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../prisma/client';
import { ErrorMessage } from '../../types/errorMessage';
import { Leaderboard } from '../../types/userTypes';

interface Req extends NextApiRequest {
	query: {
		publicKey: string;
		limit: string;
	};
}

const DEFAULT_LEADERBOARD_LIMIT = 100;

// TODO: ADD AUTHENTICATION FOR CREATE and UPDATE
export default async function handler(
	req: Req,
	res: NextApiResponse<Leaderboard[] | Leaderboard | ErrorMessage>
) {
	const {
		method,
		body,
		query: { publicKey, limit },
	} = req;

	switch (method) {
		case 'GET':
			try {
				if (publicKey) {
					const user = await prisma.user.findFirst({
						where: {
							publicKey,
						},
						include: {
							quizEntry: true,
						},
					});

					if (!user) {
						return res.status(404).json({ message: 'Users not found' });
					}

					return res.status(200).json({
						publicKey: user.publicKey,
						userName: user.userName,
						overallRanking: user.overallRanking!,
						totalWins: user.totalWins,
						totalPoints: user.totalPoints,
						gamesPlayed: user.quizEntry.length,
					});
				}

				const users = await prisma.user.findMany({
					include: {
						quizEntry: true,
					},
					orderBy: {
						overallRanking: 'asc',
					},
					take: limit ? Number(limit) : DEFAULT_LEADERBOARD_LIMIT,
				});

				if (!users) {
					return res.status(404).json({ message: 'Users not found' });
				}

				const usersWithRanking = users
					// .filter((user) => user.overallRanking !== null)
					.map((user): Leaderboard => {
						return {
							publicKey: user.publicKey,
							userName: user.userName,
							overallRanking: user.overallRanking!,
							totalWins: user.totalWins,
							totalPoints: user.totalPoints,
							gamesPlayed: user.quizEntry.length,
						};
					});

				return res.status(200).json(usersWithRanking);
			} catch (error) {
				return res.status(500).json({ message: 'Error retrieving user', error: error });
			}
		default:
			res.setHeader('Allow', ['GET']);
			return res.status(405).json({ message: `Method ${method} not allowed` });
	}
}
