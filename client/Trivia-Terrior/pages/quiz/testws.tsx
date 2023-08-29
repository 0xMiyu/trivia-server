import type { NextPage } from 'next';
import useSocket from '../../lib/socket/useSocket';
import useTimerSocket from '../../lib/socket/useTimerSocket';
import useQuestionSocket from '../../lib/socket/useQuestionSocket';
import { OptionData } from '../../types/quizTypes';

const SOCKET_URL = 'http://localhost:3001';

const Testws: NextPage = () => {
	const socket = useSocket(SOCKET_URL);
	let { questionTimeLimit, waitingTime } = useTimerSocket(socket);
	let { question, result, correctOption, setOption } = useQuestionSocket(socket);

	const handleOptionSelected = (selectedOption: OptionData) => {
		// Call the optionSelectedHook function with the selected option
		setOption(selectedOption);
	};

	return (
		<>
			<p>Hello world</p>
			{/* <p>
				Question Time:{' '}
				{questionTimeLimit !== null ? `${questionTimeLimit} seconds` : 'Loading...'}
			</p>
			<p>Waiting Time: {waitingTime !== null ? `${waitingTime} seconds` : 'Loading...'}</p>
			<p>{question?.text}</p>
			<div className="text-white">
				{question?.option.map((option) => {
					return (
						<button
							className="block"
							onClick={() => handleOptionSelected(option)}
						>
							{option.text}
						</button>
					);
				})}
			</div>
			{result && result.top ? (
				<ol className="text-white">
					{result.top.map((person: any, index: number) => {
						return (
							<li key={index}>
								{person.ranking} - {person.publicKey}: {person.points}
							</li>
						);
					})}
				</ol>
			) : (
				<p>No results</p>
			)} */}
		</>
	);
};

export default Testws;
