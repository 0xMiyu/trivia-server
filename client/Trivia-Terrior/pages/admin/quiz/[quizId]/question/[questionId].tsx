import { FunctionComponent } from "react";
import AdminQuiz from "../../../../../components/admin/AdminQuiz";
import NavBar from "../../../../../components/landing/NavBar";
import Head from "next/head";

interface AdminQuizPageProps {}

const AdminQuizPage: FunctionComponent<AdminQuizPageProps> = () => {
    return (
        <div>
            <Head>
                <title>Quiz</title>
            </Head>
            <NavBar>
                <AdminQuiz />
            </NavBar>
        </div>
    );
};

export default AdminQuizPage;
