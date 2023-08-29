export const calculateTimeDifference = (
    from: number,
    to: number,
    verbose: boolean
) => {
    const timeDiff = to - from;

    if (timeDiff <= 0) {
        return {
            value: verbose ? "0h 0m 0s" : "Just now",
            expired: true,
        };
    }

    const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
        (timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

    if (verbose) {
        const returnString = days > 0 ? `${days}d ` : "";
        return {
            value: returnString + `${hours}h ${minutes}m ${seconds}s`,
            expired: false,
        };
    } else {
        if (days > 0)
            return {
                value: `${days} day${getPlural(days)} ago`,
                expired: false,
            };
        else if (hours > 0)
            return {
                value: `${hours} hour${getPlural(hours)} ago`,
                expired: false,
            };
        else if (minutes > 0)
            return {
                value: `${minutes} minute${getPlural(minutes)} ago`,
                expired: false,
            };
        else return { value: `Just now`, expired: false };
    }
};

const getPlural = (value: number) => {
    return value > 1 ? "s" : "";
};
