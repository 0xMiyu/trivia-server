import prisma from '../prisma/client';

interface GetUserRequest {
	publicKey: string;
}

interface CreateUserRequest {
	publicKey: string;
}

interface UpdateUserRequest {
	publicKey: string;
	profilePicture?: string;
	userName?: string;
}

const getUser = async (data: GetUserRequest) => {
	const { publicKey } = data;

	const user = await prisma.user.findUnique({
		where: { publicKey },
	});

	if (!user) {
		throw Error('User not found');
	}

	return user;
};

const getUserWithQuizEntry = async (data: GetUserRequest) => {
	const { publicKey } = data;

	const user = await prisma.user.findUnique({
		where: { publicKey },
		include: {
			quizEntry: true,
		},
	});

	if (!user) {
		throw Error('User not found');
	}

	let { totalPoints, ...restOfUser } = user;

	return {
		...restOfUser,
		totalPoints: user.quizEntry.reduce((sum, x) => sum + x.points, 0),
		gamesPlayed: user.quizEntry.length,
	};
};

const createUser = async (data: CreateUserRequest) => {
	const { publicKey } = data;

	const user = await prisma.user.findUnique({
		where: { publicKey },
	});

	if (!user) {

        const defaultUsername = publicKey.substring(0,5) + "..."

		const newUser = await prisma.user.create({
			data: {
				publicKey,
                userName: defaultUsername
			},
		});
		
		return newUser;
	}

	throw new Error('User already exists');
};

const updateUser = async (data: UpdateUserRequest) => {
	const { publicKey, profilePicture, userName } = data;

	const user = await prisma.user.findUnique({
		where: { publicKey },
	});

	if (!user) {
		throw new Error('User not found');
	}

	const updatedUser = await prisma.user.update({
		where: { publicKey },
		data: {
			userName: userName || user.userName,
			profilePicture: profilePicture || user.profilePicture,
		},
	});

	return updatedUser;
};

const userService = {
	getUser,
	getUserWithQuizEntry,
	createUser,
	updateUser,
};

export default userService;
