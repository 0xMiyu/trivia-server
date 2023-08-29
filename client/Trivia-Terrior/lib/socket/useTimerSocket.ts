import { useEffect, useState } from 'react';
import { Socket } from 'socket.io-client';
import { QuizTimer } from '../../types/quizTypes';

const EVENT_QUESTION_TIMER = 'timer:question';
const EVENT_WAITING_TIMER = 'timer:waiting';

const cleanupEventHandler = (socket: Socket) => {
	socket.removeAllListeners();
};

const useTimerSocket = (socket: Socket | null): QuizTimer => {
	const [questionTimeLimit, setQuestionTimeLimit] = useState<number | null>(null);
	const [waitingTime, setWaitingTime] = useState<number | null>(null);

	useEffect(() => {
		if (socket) {
			socket.on(EVENT_QUESTION_TIMER, (timeLimit: number) => {
				console.log('Time limit:', timeLimit);
				setQuestionTimeLimit(timeLimit);
				setWaitingTime(null);
			});

			socket.on(EVENT_QUESTION_TIMER + ':stop', () => {
				console.log('Moving to waiting');
				setQuestionTimeLimit(null);
			});

			socket.on(EVENT_WAITING_TIMER, (waitingDuration: number) => {
				console.log(`Waiting time: ${waitingDuration}`);
				setWaitingTime(waitingDuration);
				setQuestionTimeLimit(null);
			});

			socket.on(EVENT_WAITING_TIMER + ':stop', () => {
				console.log(`Stop waiting time`);
				setWaitingTime(null);
			});

			// Clean up the event listener on unmount
			return () => {
				cleanupEventHandler(socket);
			};
		}
	}, [socket]);

	return { questionTimeLimit: questionTimeLimit, waitingTime: waitingTime };
};

export default useTimerSocket;
