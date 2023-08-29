export interface QuizWithPrizeQuestionOptionEntry {
	quizId: number;
	name: string;
	week: number;
	description: string;
	startDateTime: Date;
	solPrice: number;
	ended: boolean;
	question: QuestionWithOption[];
	prize: Prize[];
	quizEntry: QuizEntry[];
}

export interface QuizWithPrizeEntry {
	quizId: number;
	name: string;
	week: number;
	description: string;
	startDateTime: Date;
	solPrice: number;
	ended: boolean;
	prize: Prize[];
	quizEntry: QuizEntry[];
}

export interface QuizWithQuestionOption {
	quizId: number;
	name: string;
	week: number;
	description: string;
	startDateTime: Date;
	solPrice: number;
	ended: boolean;
	question: QuestionWithOption[];
}

export interface QuestionWithOption {
	quizId: number;
	questionId: number;
	timeLimit: number;
	text: string;
	image: string | null;
	points: number;
	option: Option[];
}

export interface Prize {
	quizId: number;
	prizeId: number;
	name: string;
	quantity: number;
	image: string | null;
	solValue: number;
}

export interface Option {
	optionId: number;
	questionId: number;
	quizId: number;
	correct: boolean;
	text: string;
}

export interface QuizEntry {
	quizEntryId: number;
	publicKey: string;
	quizId: number;
	points: number;
	numOfCorrect: number;
	ranking: number | null;
}
