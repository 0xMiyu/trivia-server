import { NextApiRequest, NextApiResponse } from 'next';
import { ErrorMessage } from '../../types/errorMessage';
import { UserWithStats } from '../../types/userTypes';
import { User } from '@prisma/client';
import { getToken } from 'next-auth/jwt';
import userService from '../../service/userService';

interface CreateUserRequest {
	publicKey: string;
	profilePicture?: string;
	userName?: string;
}

export interface UpdateUserRequest {
	publicKey: string;
	profilePicture?: string;
	userName?: string;
}

interface Req extends NextApiRequest {
	query: {
		publicKey: string;
	};
}

const secret = process.env.NEXTAUTH_SECRET;

// TODO: ADD AUTHENTICATION FOR CREATE and UPDATE
export default async function handler(
	req: Req,
	res: NextApiResponse<User | UserWithStats | ErrorMessage>
) {
	const token = await getToken({ req, secret });

	const {
		method,
		body,
		query: { publicKey },
	} = req;

	switch (method) {
		case 'GET':
			if (!publicKey) {
				return res.status(400).json({ message: 'No publicKey provided in query' });
			}
			try {
				const user = await userService.getUserWithQuizEntry({
					publicKey,
				});

				return res.status(200).json(user);
			} catch (error: any) {
				if (error.message === 'User not found') {
					return res.status(404).json({ message: error.message });
				}
				return res.status(500).json({ message: 'Internal server error' });
			}

		case 'POST':
			if (!token || !token.sub) {
				return res.status(401).json({ message: 'User wallet not authenticated' });
			}
			// the token and the publickey that we are modifiying are different
			if (token?.sub !== publicKey) {
				return res.status(401).json({ message: 'User mismatched' });
			}
			try {
				const { publicKey }: CreateUserRequest = body;

				const newUser = await userService.createUser({
					publicKey,
				});

				return res.status(201).json(newUser);
			} catch (error: any) {
				console.log(error.message);
				if (error.message === 'User already exists') {
					return res.status(409).json({
						message: 'User already exists',
					});
				}
				return res.status(500).json({ message: 'Error creating user', error: error });
			}

		case 'PUT':
			if (!token || !token.sub) {
				return res.status(401).json({ message: 'User wallet not authenticated' });
			}
			// the token and the publickey that we are modifiying are different
			if (token?.sub !== publicKey) {
				return res.status(401).json({ message: 'User mismatched' });
			}
			try {
				const { publicKey, profilePicture, userName }: UpdateUserRequest = body;

				const updatedUser = await userService.updateUser({
					publicKey,
					profilePicture,
					userName,
				});

				return res.status(200).json(updatedUser);
			} catch (error: any) {
				if (error.message === 'User not found') {
					return res.status(404).json({ message: 'User not found' });
				}
				return res.status(500).json({ message: 'Error updating user', error: error });
			}

		default:
			res.setHeader('Allow', ['GET', 'POST', 'PUT']);
			return res.status(405).json({ message: `Method ${method} not allowed` });
	}
}
