import { Role } from '@prisma/client';
import { QuizEntry } from './quizTypes';

export type UserWithStats = {
	publicKey: string;
	userName: string;
	profilePicture: string;
	totalWins: number;
	totalPoints: number;
	// gamesPlayed is derived
	gamesPlayed: number;
	overallRanking: number | null;
	quizEntry: QuizEntry[];
};

export type UserRole = {
	publicKey: string;
	role: Role;
};

export type Leaderboard = {
	publicKey: string;
	userName: string;
	overallRanking: number | null;
	totalWins: number;
	totalPoints: number;
	gamesPlayed: number;
};
