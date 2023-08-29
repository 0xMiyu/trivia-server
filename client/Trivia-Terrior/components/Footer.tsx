import Link from "next/link";
import LogoGreen from "./svg/LogoGreen";
import { FaYoutube, FaDiscord, FaTwitter } from "react-icons/fa";

interface FooterProps {
    quizId: number;
}

function Footer(props: FooterProps) {
    return (
        <footer className="pb-6 md:pb-10 z-20 bg-[#000000]">
            {/* Divider */}
            <div className="h-[3px] w-full mx-auto bg-[#C5FB00] my-16" />

            {/* content */}
            <div className="w-full md:w-[70%] px-5 md:px-10 mx-auto flex flex-col md:flex-row justify-between">
                <div className="w-full md:w-[35%] flex flex-row justify-evenly md:justify-between md:flex-col">
                    {/* logo */}
                    <div className="hidden md:inline-flex">
                        <LogoGreen
                            width={180}
                            height={180}
                            view={"410 30 400 800"}
                        />
                    </div>

                    {/* logo-mobile */}
                    <div className="md:hidden">
                        <LogoGreen
                            width={100}
                            height={100}
                            view={"200 230 400 600"}
                        />
                    </div>

                    <div className="w-[50%] md:w-auto">
                        {/* phone */}

                        <p className="text-md text-white">
                            triviaterror@mail.com
                        </p>
                        <p className="text-md text-white">+01 93930 20030</p>

                        {/* socials */}
                        <div className="flex space-x-6 my-2">
                            <FaYoutube className="text-white text-2xl" />
                            <FaDiscord className="text-white text-2xl" />
                            <FaTwitter className="text-white text-2xl" />
                        </div>
                    </div>
                </div>

                <div className="w-full md:w-[60%] flex flex-col justify-between">
                    <div className="flex justify-between">
                        <div className="footer-pages w-[40%]">
                            <Link href={"/"}>
                                <p>Home</p>
                            </Link>
                            <Link href={`/quiz/${props.quizId}`}>
                                <p>Quiz</p>
                            </Link>
                        </div>
                        <div className="footer-pages w-[57%] md:w-[70%]">
                            <h4 className="text-[#C5FB00] text-base md:text-lg font-bold">
                                Trivia Terror
                            </h4>
                            <p className="footer-extract">
                                Live educational trivia events with leaderboard
                                tracking, linked payments, and a pot tracker.
                                Join the fun and test your knowledge today!
                            </p>
                        </div>
                    </div>

                    {/* copyright and credits */}
                    <div className="mt-8 md:mt-0">
                        <p className="text-sm">
                            From the Developers of Divine Doge
                        </p>
                        <p className="text-sm">
                            Use of this site constitutes acceptance of our
                            Privacy Statement and Terms & Conditions.
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
