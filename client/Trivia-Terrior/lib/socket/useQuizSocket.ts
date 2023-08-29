import { useEffect, useState } from 'react';
import { Socket } from 'socket.io-client';
import { WaitingRoom } from '../../types/socketTypes';
import { QuizInformation } from '../../types/quizTypes';

const EVENT_START_QUIZ = 'startQuiz';
const EVENT_END_QUIZ = 'endQuiz';
const EVENT_WAITING_ROOM_COUNT = 'waitingRoomCount';
const EVENT_QUIZ_INFORMATION = 'quizInformation';

// TODO: FIX ERROR WHEN REFRESH
const useQuizSocket = (
	socket: Socket | null
): {
	quizWorkflowStarted: boolean;
	hasQuizEnded: boolean;
	hasQuizStarted: boolean;
	waitingRoom: WaitingRoom[] | null;
	quizInformation: QuizInformation | null;
} => {
	const [quizWorkflowStarted, setQuizWorkflowStarted] = useState<boolean>(false);
	const [hasQuizStarted, setHasQuizStarted] = useState<boolean>(false);
	const [hasQuizEnded, setHasQuizEnded] = useState<boolean>(false);
	const [waitingRoom, setWaitingRoom] = useState<WaitingRoom[] | null>(null);
	const [quizInformation, setQuizInformation] = useState<QuizInformation | null>(null);

	useEffect(() => {
		if (socket) {
			socket.on(EVENT_QUIZ_INFORMATION, (quizInformation: QuizInformation) => {
				setQuizInformation(quizInformation);
			});

			socket.on(EVENT_WAITING_ROOM_COUNT, (userCount) => {
				setQuizWorkflowStarted(true);
				setWaitingRoom(userCount);
			});

			socket.on(EVENT_START_QUIZ, () => {
				setQuizWorkflowStarted(true);
				setHasQuizStarted(true);
			});

			socket.on(EVENT_END_QUIZ, () => {
				setQuizWorkflowStarted(false);
				setHasQuizEnded(true);
				setWaitingRoom(null);
			});
		}
	}, [socket]);

	return { quizWorkflowStarted, hasQuizEnded, hasQuizStarted, waitingRoom, quizInformation };
};

export default useQuizSocket;
