import Solana from "../svg/Solana";
import SolValue from "../svg/SolValue";
import { Prize, QuizEntry } from "../../types/backendReturnTypes";

interface PricingAndPotProps {
    prizes: Prize[];
    entries: QuizEntry[];
    solPrice: number;
}

function PricingAndPot(props: PricingAndPotProps) {
    console.log(props.entries);
    console.log(props.solPrice);
    return (
        <div className="flex flex-col xl:flex-row xl:space-x-6">
            {/* sol value */}
            <div className="flex flex-col w-full xl:w-[60%]">
                <p className="font-semibold my-2">Solana value in the pot!</p>

                <div className="flex space-x-4">
                    <div className="bg-[#fff] rounded-xl md:rounded-3xl w-fit p-2 md:p-5 items-center">
                        <SolValue
                            width={120}
                            height={120}
                            className="hidden md:block"
                        />
                        <SolValue
                            className="block md:hidden"
                            width={60}
                            height={60}
                        />
                    </div>

                    <div className="border-4 border-white rounded-xl md:rounded-3xl flex flex-col justify-center items-center w-[100%]">
                        <p className="text-3xl md:text-6xl font-bold">
                            {props.entries &&
                                (
                                    props.solPrice * props.entries.length
                                ).toLocaleString()}
                        </p>
                    </div>
                </div>
            </div>

            {/* weeks grand prize */}
            <div className="flex flex-col w-full xl:w-[40%]">
                <p className="font-semibold my-2">
                    This week&apos; Grand Prize!
                </p>

                <div className="flex space-x-4">
                    <div className="bg-[#fff] rounded-xl md:rounded-3xl w-fit p-4 md:p-5 items-center">
                        <Solana
                            width={120}
                            height={120}
                            className="hidden md:block"
                        />
                        <Solana
                            className="block md:hidden"
                            width={40}
                            height={40}
                        />
                    </div>

                    <div className="border-4 border-white rounded-xl md:rounded-3xl flex flex-col justify-center items-center w-[100%]">
                        <p className="text-3xl md:text-6xl font-bold">
                            {props.prizes &&
                                props.prizes
                                    .reduce((accumulator, current) => {
                                        return accumulator + current.solValue;
                                    }, 0)
                                    .toLocaleString()}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PricingAndPot;
