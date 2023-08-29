import { FunctionComponent, useState } from "react";
import QuestionForm from "./QuestionForm";
import QuestionList from "./QuestionList";
import useSWR from "swr";
import { ErrorMessage } from "../../types/errorMessage";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Link from "next/link";
import Datetime from "react-datetime";
import "react-datetime/css/react-datetime.css";
import { QuizWithQuestionOption } from "../../types/backendReturnTypes";
import Modal from "react-modal";
import { getInternalApiUrl } from "../../service/common";

interface AdminQuizzesProps {}

const fetcher = async (url: string) => {
    const res = await fetch(url);
    // If the status code is not in the range 200-299,
    // we still try to parse and throw it.
    if (!res.ok) {
        const error = new Error();
        // Attach extra info to the error object.
        const data = await res.json();
        error.message = data.message;
        throw error;
    }

    return res.json();
};

Modal.setAppElement("#__next");

const AdminQuiz: FunctionComponent = () => {
    const router = useRouter();
    const { quizId } = router.query;
    const [showMobileWarning, setShowMobileWarning] = useState(false);
    const [name, setName] = useState<string>("");
    const [week, setWeek] = useState<string>("");
    const [solPrice, setSolPrice] = useState<number>();
    const [description, setDescription] = useState<string>("");
    const [startDateTime, setStartDateTime] = useState<string>("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);
    const [status, setStatus] = useState("");
    const { data, error, isLoading } = useSWR<
        QuizWithQuestionOption,
        ErrorMessage
    >(`${getInternalApiUrl()}/api/admin/quiz/${quizId}`, fetcher);
    useEffect(() => {
        const handleWindowSizeChange = () => {
            setShowMobileWarning(window.innerWidth <= 1024);
        };

        window.addEventListener("resize", handleWindowSizeChange);
        handleWindowSizeChange();

        return () => {
            window.removeEventListener("resize", handleWindowSizeChange);
        };
    }, []);
    useEffect(() => {
        // Assuming data.questions holds the list of questions
        if (
            data &&
            data.question &&
            data.question.length === 0 &&
            router.query.new !== "True"
        ) {
            // Append ?new=True to the URL
            router.push({
                pathname: router.pathname,
                query: { ...router.query, new: "True" },
            });
        }
    }, [quizId, data, router]);

    useEffect(() => {
        if (data) {
            console.log(data);
            setName(data.name);
            setWeek(data.week.toString());
            setDescription(data.description);
            setStartDateTime(data.startDateTime.toISOString());
            setSolPrice(data.solPrice);
        }
    }, [data]);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const openErrorModal = () => {
        setIsStatusModalOpen(true);
    };

    const closeErrorModal = () => {
        setIsStatusModalOpen(false);
    };

    const saveQuizInfo = async (e: React.MouseEvent<HTMLButtonElement>) => {
        const body = {
            name: name,
            week: week,
            description: description,
            startDateTime: startDateTime,
            solPrice: solPrice,
        };
        const response = await fetch(`${getInternalApiUrl()}/api/admin/quiz/${quizId}`, {
            method: "PUT",
            body: JSON.stringify(body),
            headers: {
                "Content-Type": "application/json",
            },
        });
        if (!response.ok) {
            setStatus("Error");
            setIsStatusModalOpen(true);
        } else {
            setStatus("Okay");
            setIsStatusModalOpen(true);
        }
    };

    if (error)
        return (
            <div className="w-full md:w-[70%] mx-auto px-6 md:px-10 ">
                <div className="mt-28 mb-8 rounded-3xl border-[.1px] p-2 border-white ">
                    <div className="grid place-items-center">
                        <h3 className="text-3xl md:text-5xl text-[#C5FB00] font-bold ">
                            Error
                        </h3>

                        <h3 className=" text-center text-3xl md:text-5xl text-white font-bold mt-8">
                            {error.message}
                        </h3>
                    </div>
                </div>
            </div>
        );
    if (isLoading) return <div>loading...</div>;
    if (showMobileWarning) {
        return (
            <div className="grid place-items-center">
                <h1 className="text-white text-2xl">Please view on desktop!</h1>
            </div>
        );
    }
    return (
        <div>
            <div className="flex">
                <div className="w-1/5">
                    <Link href={"/admin"} className="text-white ml-8">
                        Back
                    </Link>
                </div>
                <div className="w-4/5">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <input
                                value={name}
                                className="my-2 ml-8 mr-2 bg-inherit text-white"
                                onChange={(e) => {
                                    setName(e.target.value);
                                }}
                            ></input>
                            <p>Week</p>
                            <input
                                value={week}
                                className="m-2 bg-inherit text-white w-8"
                                onChange={(e) => {
                                    setWeek(e.target.value);
                                }}
                            ></input>
                            <Datetime
                                className="m-2 p-1 text-black border bg-white rounded-md"
                                value={new Date(startDateTime)}
                                onChange={(moment) => {
                                    setStartDateTime(moment.toString());
                                }}
                            />
                            <p className="ml-2">Price:</p>
                            <input
                                value={solPrice}
                                className="ml-2 bg-inherit text-white w-12"
                                type="number"
                                onChange={(e) => {
                                    setSolPrice(e.target.valueAsNumber);
                                }}
                            ></input>
                            <p>Sol</p>
                            <button
                                className="ml-4 text-white border-2 p-1 rounded-md"
                                onClick={openModal}
                            >
                                Edit Description
                            </button>
                        </div>
                        <Modal
                            isOpen={isModalOpen}
                            onRequestClose={closeModal}
                            contentLabel="Description Modal"
                            style={{
                                overlay: {
                                    backgroundColor: "rgba(0, 0, 0, 0.5)", // This creates a semi-transparent dark background
                                },
                                content: {
                                    top: "50%",
                                    left: "50%",
                                    right: "auto",
                                    bottom: "auto",
                                    marginRight: "-50%",
                                    transform: "translate(-50%, -50%)",
                                    backgroundColor: "white",
                                    border: "none",
                                    borderRadius: "0.375rem", // This equals to 'rounded-md' in Tailwind
                                    padding: "2rem", // This equals to 'p-8' in Tailwind
                                    width: "80%",
                                    maxWidth: "600px",
                                },
                            }}
                        >
                            <div className="grid place-items-center">
                                <h2 className="text-2xl mb-4">
                                    Edit Description
                                </h2>
                                <textarea
                                    value={description}
                                    className="w-full p-2 border border-gray-300 rounded-md mb-4"
                                    onChange={(e) =>
                                        setDescription(e.target.value)
                                    }
                                />
                                <button
                                    className="py-2 px-4 text-white rounded-md bg-[#0e0e0e]"
                                    onClick={closeModal}
                                >
                                    Save
                                </button>
                            </div>
                        </Modal>
                        <div className="flex justify-end">
                            <button
                                className="mr-8 text-white border-2 p-1 rounded-md"
                                onClick={saveQuizInfo}
                            >
                                Save Quiz Info
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex">
                <QuestionList quizId={data?.quizId} />
                <div className="w-4/5 p-4">
                    <QuestionForm />
                </div>
            </div>
            <Modal
                isOpen={isStatusModalOpen}
                onRequestClose={closeErrorModal}
                contentLabel=""
                style={{
                    overlay: {
                        backgroundColor: "rgba(0, 0, 0, 0.5)", // This creates a semi-transparent dark background
                    },
                    content: {
                        top: "90%",
                        left: "15%",
                        right: "auto",
                        bottom: "auto",
                        marginRight: "-50%",
                        transform: "translate(-50%, -50%)",
                        backgroundColor:
                            status === "Error" ? "#BB3333" : "#33BB33",
                        border: "none",
                        borderRadius: "0.375rem", // This equals to 'rounded-md' in Tailwind
                        padding: "2rem", // This equals to 'p-8' in Tailwind
                        width: "20%",
                        maxWidth: "600px",
                    },
                }}
            >
                <div className="flex justify-between">
                    <p>{status === "Error" ? "Error Saving Quiz" : "Saved!"}</p>
                    <button onClick={closeErrorModal}>X</button>
                </div>
            </Modal>
        </div>
    );
};

export default AdminQuiz;
