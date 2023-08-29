import { useEffect, useState } from "react";

interface QuizTimerProps {
    seconds: number;
}

function QuizTimer(props: QuizTimerProps) {
    const time = props.seconds;
    const [timeLeft, setTimeLeft] = useState<number>(time);

    useEffect(() => {
        const interval = setInterval(() => {
            setTimeLeft((time) => {
                if (time > 0) {
                    return time - 1;
                }
                return 0;
            });
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    return <p className="font-bold text-2xl">{timeLeft}</p>;
}

export default QuizTimer;
