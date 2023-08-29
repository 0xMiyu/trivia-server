import { DateTime } from 'luxon';
import Timer from './Timer';

interface QuizCountdownProps {
	startDateTime: DateTime;
}

function QuizCountdown(props: QuizCountdownProps) {
	console.log(props.startDateTime);
	return (
		<div className="mt-20 mb-10">
			<h2 className="text-white font-bold text-4xl">The clock&apos;s ticking...</h2>

			<h2 className="text-4xl my-2 bg-clip-text text-transparent bg-gradient-to-r from-[#C5FB00] via-[#000AFF] to-[#000AFF]">
				Better Hurry!
			</h2>

			{/* countdown */}
			<Timer startDateTime={props.startDateTime} />
		</div>
	);
}

export default QuizCountdown;
