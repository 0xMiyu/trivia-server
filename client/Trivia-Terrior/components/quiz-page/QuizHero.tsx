import Image from "next/image";
import PricingAndPot from "./PricingAndPot";
import BG from "../../public/bg/bg-single-page.png";
import { Prize, QuizEntry } from "../../types/backendReturnTypes";

interface QuizHeroProps {
    week: number;
    name: string;
    prizes: Prize[];
    entries: QuizEntry[];
    solPrice: number;
}

function QuizHero(props: QuizHeroProps) {
    console.log(props.prizes);
    return (
        <div>
            <div>
                <Image
                    alt="hero-image"
                    className="-z-10"
                    src={BG}
                    placeholder="blur"
                    fill
                />
            </div>

            <div className="my-10">
                <p className="text-lg h-fit text-[#C5FB00] font-light border-l-2 border-[#C5FB00] pl-2">
                    Trivia Of The Week!
                </p>

                <div className="bg-white my-4 rounded-lg w-14 h-14 md:w-12 md:h-12"></div>

                {/* heading */}
                <h2 className="text-4xl md:text-5xl w-full md:w-[50%] text-[#C5FB00] font-bold">
                    {props.name}
                </h2>
                <h2 className="text-4xl md:text-5xl w-full md:w-[50%] text-white font-bold">
                    Week {props.week} Quiz
                </h2>

                {/* description */}
                <p className="text-base md:text-lg my-2">
                    Take Part in this week’s Trivia and take home all the money
                    in the pot!
                </p>

                {/* Pricings and pot money info */}
                <PricingAndPot
                    prizes={props.prizes}
                    entries={props.entries}
                    solPrice={props.solPrice}
                />
                {props.prizes.length > 0 && (
                    <div className="my-8">
                        <p className="text-xl font-bold my-2">Prizes</p>
                        <div className="xl:grid grid-cols-2">
                            {props.prizes &&
                                props.prizes.map((prize) => {
                                    return (
                                        <div className="grid grid-cols-2 m-2 border-2 rounded-xl p-4">
                                            <div className="ml-4">
                                                <div className="flex my-4">
                                                    <p className="mr-2">
                                                        Name:{" "}
                                                    </p>
                                                    <p>{prize.name}</p>
                                                </div>
                                                <div className="flex my-4">
                                                    <p className="mr-2">
                                                        Quantity:{" "}
                                                    </p>
                                                    <p>{prize.quantity}</p>
                                                </div>
                                                <div className="flex my-4">
                                                    <p className="mr-2">
                                                        Sol Value:{" "}
                                                    </p>
                                                    <p>{prize.solValue}</p>
                                                </div>
                                            </div>
                                            <div className="grid col-span-1 place-items-end mr-4">
                                                {prize.image && (
                                                    <img
                                                        className="h-36 w-36 rounded-md"
                                                        src={prize.image}
                                                    ></img>
                                                )}
                                            </div>
                                        </div>
                                    );
                                })}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default QuizHero;
