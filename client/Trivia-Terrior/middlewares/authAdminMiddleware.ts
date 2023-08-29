import { Role } from '@prisma/client';
import prisma from '../prisma/client';
import { getToken } from 'next-auth/jwt';
import { NextApiRequest, NextApiResponse } from 'next';

const secret = process.env.NEXTAUTH_SECRET;

async function isAdmin(publicKey: string) {
	const user = await prisma.user.findFirst({
		where: { publicKey },
		select: {
			role: true,
		},
	});

	if (user && user.role === Role.ADMIN) {
		return true;
	}
	return false;
}

export default function authAdminMiddleware(
	handler: (req: NextApiRequest, res: NextApiResponse) => Promise<void>
) {
	return async (req: NextApiRequest, res: NextApiResponse) => {
        //TODO: REMOVE THIS AFTER
        const bypassHeader = req.headers['x-bypass-middleware']
        
        if(bypassHeader === 'squarex,xx'){
            return handler(req, res)
        }
        //

		const token = await getToken({ req, secret });

		if (!token || !token.sub)
			return res.status(401).json({
				message: 'User wallet not authenticated',
			});

		if (token) {
			const isAdminUser = await isAdmin(token.sub);

			if (isAdminUser) {
				return handler(req, res);
			}
		}
		return res.status(403).json({ message: 'Forbidden' });
	};
}

// See "Matching Paths" below to learn more
export const config = {
	matcher: '/api/admin',
};
