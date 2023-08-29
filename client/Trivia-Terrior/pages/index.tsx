import type { NextPage } from "next";
import Head from "next/head";
import LandingPage from "../components/landing/LandingPage";
import NavBar from "../components/landing/NavBar";

const Home: NextPage = () => {
    return (
        <div>
            <Head>
                <title>Divine Dogs</title>
                <meta name="description" content="Divine Dogs" />
                <link rel="icon" />
            </Head>
            <NavBar>
                <LandingPage />
            </NavBar>
        </div>
    );
};

export default Home;
