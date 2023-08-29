import Image from "next/image";
import CashBag from "../../public/bg/cash-bag.png";

function AboutSection() {
    return (
        <div className="flex justify-between my-10">
            <div className="w-full md:w-[50%] my-auto">
                <h2 className="text-4xl md:text-5xl text-white font-bold">
                    Trivia with a twist!
                </h2>

                <p className="text-lg my-4 span-yellow">
                    Trivia Terrier connects with your wallet to provide you with
                    a unique and exciting trivia experience. Our platform allows
                    you to <span>join live quizzes</span>,{" "}
                    <span>compete with other players</span>, and{" "}
                    <span>win a majority of the pot</span> depending on your
                    placement!
                </p>
            </div>

            <div className="w-[40%] hidden md:inline-flex justify-center">
                <Image
                    placeholder="blur"
                    src={CashBag}
                    alt="cash-bag"
                    width={500}
                    height={500}
                />
            </div>
        </div>
    );
}

export default AboutSection;
