import { useEffect, useState } from 'react';
import { Socket } from 'socket.io-client';
import {
	CurrentQuizData,
	QuestionClientData,
	OptionData,
	OptionServerData,
} from '../../types/quizTypes';
import { useSession } from 'next-auth/react';

const EVENT_START_QUESTION = 'startQuestion';
const EVENT_STOP_QUESTION = 'stopQuestion';
const EVENT_USER_SELECTED_OPTION = 'selectOption';
const EVENT_SEND_CORRECT_ANSWER = 'sendCorrectOption';
const EVENT_END_QUIZ = 'endQuiz';
const EVENT_SHOW_LEADERBOARD = 'showLeaderboard';

const useQuestionSocket = (
	socket: Socket | null
): {
	question: QuestionClientData | null;
	result: CurrentQuizData[] | null;
	correctOption: OptionServerData | null;
	setOption: (option: OptionData | null) => void;
} => {
	const [question, setQuestion] = useState<QuestionClientData | null>(null);
	const [option, setOption] = useState<OptionData | null>(null);
	const [isDisabled, setIsDisabled] = useState<boolean>(false);
	const [correctOption, setCorrectOption] = useState<OptionServerData | null>(null);

	const [result, setResult] = useState<CurrentQuizData[] | null>(null);

	const { data: session, status } = useSession();

	// TODO option
	useEffect(() => {
		if (socket) {
			socket.on(EVENT_START_QUESTION, (currentQuestion: QuestionClientData) => {
				console.log('Question ', currentQuestion);
				setOption(null);
				setIsDisabled(false);
				setQuestion(currentQuestion);
			});

			socket.on(EVENT_SEND_CORRECT_ANSWER, (correctOption: OptionServerData | null) => {
				console.log(correctOption);
				setCorrectOption(correctOption);
			});

			socket.on(EVENT_STOP_QUESTION, () => {
				console.log('stop question');
				setOption(null);
				setIsDisabled(false);
				setQuestion(null);
			});

			socket.on(EVENT_SHOW_LEADERBOARD, (leaderBoard: CurrentQuizData[]) => {
				console.log(leaderBoard);
				setResult(leaderBoard);
			});

			socket.on(EVENT_END_QUIZ, () => {
				console.log('ended');
			});
		}
	}, [socket]);

	useEffect(() => {
		if (!isDisabled && option) {
			console.log('user selected', option);
			setIsDisabled(true);
			if (socket) {
				console.log(
					'sending',
					session?.user.publicKey,
					option.quizId,
					option.questionId,
					option.optionId
				);
				socket.emit(
					EVENT_USER_SELECTED_OPTION,
					session?.user.publicKey,
					option.quizId,
					option.questionId,
					option.optionId
				);
			}
		}
	}, [option]);

	return { question, result, correctOption, setOption };
};

export default useQuestionSocket;
