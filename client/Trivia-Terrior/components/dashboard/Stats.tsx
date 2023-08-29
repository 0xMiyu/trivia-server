interface StatsProps {
    gamesPlayed?: number;
    wins?: number;
    totalPoints?: number;
}

function Stats(props: StatsProps) {
    return (
        <div className="mb-8">
            <h2 className="text-4xl font-bold text-white my-6 ">Stats</h2>

            <div className="bg-[#212121] w-full py-6 px-8 rounded-xl">
                <div className="flex justify-between">
                    <span className="text-3xl font-bold text-white">
                        Games Played
                    </span>
                    <span className="text-3xl font-light text-[#C5FB00]">
                        {props.gamesPlayed}
                    </span>
                </div>

                {/* divider */}
                <div className="w-full h-1 bg-gradient-to-r from-[#C5FB00] to-[#000AFF] my-6"></div>

                <div className="flex justify-between">
                    <span className="text-3xl font-bold text-white">
                        Total Points
                    </span>
                    <span className="text-3xl font-light text-[#C5FB00]">
                        {props.totalPoints}
                    </span>
                </div>
            </div>

            <div className="flex flex-col-reverse md:flex-row justify-between md:space-x-10">
                {/* <div className="bg-[#212121] w-full md:w-[40%] py-6 px-8 rounded-xl my-0 mb-14 md:my-10">

                    <h5 className="text-2xl text-white font-bold mb-4">
                        Answers
                    </h5>

                    <div className="h-[8rem] w-full flex">
                        <div className="w-[30%] bg-[#C5FB00] items-center flex justify-end">
                            <p className="text-sm font-bold text-black transform items-center -rotate-90">
                                Correct 30%
                            </p>
                        </div>
                        <div className="w-[70%] bg-[#454545] items-center flex justify-end">
                            <p className="text-sm font-bold text-white transform items-center -rotate-90">
                                Wrong 70%
                            </p>
                        </div>
                    </div>
                </div> */}

                {/* <div className="bg-[#212121] flex flex-col justify-evenly w-full md:w-[60%] py-6 px-8 rounded-xl my-4 md:my-10">
                    <div className="flex justify-between">
                        <span className="text-3xl font-bold text-white">
                            Average Placement
                        </span>
                        <span className="text-3xl font-light text-[#C5FB00]">
                            16
                        </span>
                    </div>


                    <div className="w-full h-1 bg-gradient-to-r from-[#C5FB00] to-[#000AFF] my-6"></div>

                    <div className="flex justify-between">
                        <span className="text-3xl font-bold text-white">
                            Number of wins
                        </span>
                        <span className="text-3xl font-light text-[#C5FB00]">
                            {props.wins}
                        </span>
                    </div>
                </div> */}
            </div>
        </div>
    );
}

export default Stats;
