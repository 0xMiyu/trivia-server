import { useEffect, useState } from 'react';
import { calculateTimeDifference } from '../../utils/timeUtils';
import io, { Socket } from 'socket.io-client';
import { DateTime } from 'luxon';

interface TimerProps {
	startDateTime: DateTime | null;
}

export default function Timer(props: TimerProps) {
	const [timeLeft, setTimeLeft] = useState<string | null>(null);
	let intervalId: NodeJS.Timeout;

	const updateTime = () => {
		if (props.startDateTime) {
			const currentDateTime = DateTime.now().setZone('utc');
			const diff = props.startDateTime.diff(currentDateTime);

			if (diff.valueOf() <= 0) {
				setTimeLeft('0h 0m 0s');
				clearInterval(intervalId);
				return;
			}

			const timeLeftString = diff.toFormat("h'h' m'm' s's'");
			setTimeLeft(timeLeftString);
		}
	};

	useEffect(() => {
		intervalId = setInterval(updateTime, 1000);

		return () => {
			clearInterval(intervalId);
		};
	}, []);

	return (
		<div className="flex justify-between items-center mt-6 mb-16">
			{/* days */}
			<div className="bg-transparent border  rounded-3xl items-center p-2 md:p-4 flex flex-col justify-center h-[6rem] md:h-[12rem] w-[100%]">
				<p className="text-white text-center font-bold text-3xl md:text-6xl">Countdown</p>
				<p className="text-white text-center font-extrabold text-2xl md:text-5xl">
					{timeLeft}
				</p>
			</div>
		</div>
	);
}
