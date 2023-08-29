// Include results only after the quiz has ended
export type QuizData = {
	quizId: number;
	name: string;
	week: number;
	description: string;
	startDateTime: Date;
	ended: boolean;
	entries?: QuizEntry[];
};

export type QuizEntry = {
	quizEntryId: number;
	publicKey: string;
	quizId: number;
	points: number;
	numOfCorrect: number;
	ranking: number | null;
};

export type QuizOfTheWeekData = {
	quizId: number;
	week: number;
};

export type QuestionServerData = {
	questionId: number;
	quizId: number;
	timeLimit: number;
	text: string;
	image: string | null;
	points: number;
	option: OptionServerData[];
};
export type QuestionClientData = {
	questionId: number;
	quizId: number;
	timeLimit: number;
	text: string;
	image: string | null;
	points: number;
	option: OptionData[];
};

export type OptionData = {
	quizId: number;
	optionId: number;
	questionId: number;
	text: string;
};

export type QuizServerData = {
	quizId: number;
	name: string;
	week: number;
	description: string;
	startDateTime: Date;
	ended: boolean;
	question: QuestionServerData[];
	quizEntry: QuizEntry[];
};

export type QuizClientData = {
	quizId: number;
	name: string;
	week: number;
	description: string;
	startDateTime: Date;
	ended: boolean;
	question: QuestionClientData[];
};

export type OptionServerData = {
	quizId: number;
	optionId: number;
	questionId: number;
	correct: boolean;
	text: string;
};

export type CurrentQuizData = {
	publicKey: string;
	name: string;
	points: number;
	numOfCorrect: number;
};

export type QuizTimer = {
	questionTimeLimit: number | null;
	waitingTime: number | null;
};

export type QuizInformation = {
	quizId: number;
	name: string;
	week: number;
	description: string;
	startDateTime: Date;
	ended: boolean;
};
