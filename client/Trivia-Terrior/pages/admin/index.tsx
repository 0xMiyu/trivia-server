import type { NextPage } from "next";
import Head from "next/head";
import NavBar from "../../components/landing/NavBar";
import AdminDashboard from "../../components/admin/AdminDashboard";

const Home: NextPage = () => {
    return (
        <div>
            <Head>
                <title>Divine Dogs</title>
                <meta name="description" content="Divine Dogs" />
                <link rel="icon" />
            </Head>
            <NavBar>
                <AdminDashboard />
            </NavBar>
        </div>
    );
};

export default Home;
