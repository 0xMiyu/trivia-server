import LeaderBoard from '../LeaderBoard';
import AboutSection from './AboutSection';
import FAQSection from './FAQSection';
import Hero from './Hero';
import PrizeSection from './PrizeSection';
import TriviaOfTheWeek from './TriviaOfTheWeek';

function LandingPage() {
	return (
		<div className="w-full md:w-[70%] mx-auto px-6 md:px-10">
			{/* Hero */}
			<Hero />

			{/* What is Trivia Terror */}
			<AboutSection />

			{/* Leaderboards */}
			<LeaderBoard publicKey="" />

			{/* Prize section */}
			<PrizeSection />

			{/* Trivia of the week */}
			<TriviaOfTheWeek />

			{/* FAQ */}
			<FAQSection />
		</div>
	);
}

export default LandingPage;
