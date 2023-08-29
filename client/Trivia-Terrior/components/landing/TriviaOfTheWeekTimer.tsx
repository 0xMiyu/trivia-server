import { useEffect, useState } from "react";
import { calculateTimeDifference } from "../../utils/timeUtils";

interface TriviaOfTheWeekTimerProps {
    startdatetime: Date;
}

function TriviaOfTheWeekTimer(props: TriviaOfTheWeekTimerProps) {
    const result = calculateTimeDifference(
        Date.now(),
        props.startdatetime.getTime(),
        true
    );
    const [timeLeft, setTimeLeft] = useState<string>(result.value);
    const [expired, setExpired] = useState<boolean>(result.expired);

    useEffect(() => {
        const countdownInterval = setInterval(() => {
            const result = calculateTimeDifference(
                Date.now(),
                props.startdatetime.getTime(),
                true
            );
            // console.log("hi");
            setTimeLeft(result.value);

            return () => clearInterval(countdownInterval);
        }, 1000);
    }, []);
    return (
        <p className="text-white text-center text-md md:text-lg">{timeLeft}</p>
    );
}

export default TriviaOfTheWeekTimer;
