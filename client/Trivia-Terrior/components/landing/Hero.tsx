import Image from "next/image";
import Arrow from "../svg/Arrow";
import BG from "../../public/bg/BG.png";

function Hero() {
    return (
        <div className="mt-24 mb-16 md:mb-0 h-auto md:h-[32rem] flex flex-col justify-between">
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

                <div>
                    {/* Hero-text */}
                    <div className="w-full md:w-[66%]">
                        <h2 className="text-4xl md:text-5xl font-extrabold tracking-wide text-white">
                            Take part in the{" "}
                            <span className="font-light text-[#C5FB00]">
                                Trivia Revolution
                            </span>{" "}
                            with{" "}
                            <span className="text-[#C5FB00]">
                                Trivia Terrier!
                            </span>
                        </h2>

                        <p className="my-6 text-lg md:text-xl">
                            With our educational trivia platform, you can track
                            your progress, win big, and have fun with the help
                            of our live weekly timed competitive quizzes!
                        </p>
                    </div>
                </div>

                {/* Hero-buttons */}
                {/* <div className="space-x-3 md:space-x-6">
                    <button className="connect-wallet w-[7rem] md:w-[13rem] button-basic">
                        Let&apos;s Go!
                    </button>
                    <button className="button-white-bordered w-[10rem] md:w-[13rem] button-basic">
                        Quiz of the Week!
                    </button>
                </div> */}
            </div>

            {/* Hero-scroll-down */}
            <div className="space-y-10 items-center hidden md:inline-block">
                <p className="text-lg text-center">Scroll Down</p>
                <div className="flex justify-center animate-bounce">
                    <Arrow />
                </div>
            </div>
        </div>
    );
}

export default Hero;
