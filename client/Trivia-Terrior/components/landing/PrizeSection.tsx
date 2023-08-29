import { qotw } from '../../atoms/qotwAtom';
import Solana from '../svg/Solana';
import SolValue from '../svg/SolValue';
import { useAtomValue } from 'jotai';

function PrizeSection() {
	const qotwData = useAtomValue(qotw);
	return (
		<div className="my-10">
			<p className="text-base md:text-lg font-semibold border-l-2 border-[#C5FB00] pl-2">
				Keep your eyes on the prize!
			</p>

			<h2 className="text-4xl md:text-5xl text-white font-bold my-2">
				This week&apos;s <span className="font-light text-gradient">grand prize!</span>
			</h2>

			<div className="my-6 flex space-x-3 md:space-x-6">
				<div className="bg-[#C5FB00] rounded-xl md:rounded-3xl w-fit p-4 md:p-5 items-center">
					<Solana className="hidden md:block" />
					<Solana
						className="block md:hidden"
						width={40}
						height={40}
					/>
				</div>

				<div className="border-4 border-white rounded-xl md:rounded-3xl flex flex-col justify-center items-center w-[100%]">
					<p className="text-4xl md:text-7xl font-bold">
						{qotwData &&
							qotwData.prize &&
							qotwData.prize
								.reduce((accumulator, current) => {
									return accumulator + current.solValue;
								}, 0)
								.toLocaleString()}
					</p>
				</div>
			</div>

			<h2 className="text-4xl md:text-5xl text-white font-bold my-2">
				Solana value <span className="font-light text-gradient">in the pot!</span>
			</h2>

			<div className="my-6 flex space-x-3 md:space-x-6">
				<div className="bg-[#C5FB00] rounded-xl md:rounded-3xl w-fit p-2 md:p-5 items-center">
					<SolValue className="hidden md:block" />
					<SolValue
						className="block md:hidden"
						width={60}
						height={60}
					/>
				</div>

				<div className="border-4 border-white rounded-xl md:rounded-3xl flex flex-col justify-center items-center w-[100%]">
					<p className="text-4xl md:text-7xl font-bold">
						{qotwData &&
							qotwData.prize &&
							(qotwData.solPrice * qotwData.quizEntry.length).toLocaleString()}
					</p>
				</div>
			</div>
		</div>
	);
}

export default PrizeSection;
