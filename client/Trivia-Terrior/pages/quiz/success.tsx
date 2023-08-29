import Head from "next/head";
import { useRouter } from "next/router";
import ConfirmationPage from "../../components/confirmation-page/ConfirmationPage";
import NavBar from "../../components/landing/NavBar";

function ConfirmationMessagePage() {
    const router = useRouter();

    const triviaId = router.query.triviaId as string;

    console.log("triviaId", triviaId);

    return (
        <NavBar>
            <Head>
                <title>Successfully joined trivia #{triviaId}</title>
            </Head>

            <ConfirmationPage />
        </NavBar>
    );
}

export default ConfirmationMessagePage;
