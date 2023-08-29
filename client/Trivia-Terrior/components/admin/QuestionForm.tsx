import { useEffect, useState } from "react";
import { Option, Question } from "@prisma/client";
import { useRouter } from "next/router";
import ResizingTextArea from "./ResizingTextArea";
import LogoGreen from "../svg/LogoGreen";
import useSWR, { mutate } from "swr";
import { v4 as uuidv4 } from "uuid";
import { ErrorMessage } from "../../types/errorMessage";
// import { QuestionAdminData } from "../../types/quizTypes";
import { UpdateQuestionRequest } from "../../pages/api/admin/quiz/[quizId]/question/[questionId]";
import { UpdateOptionRequest } from "../../pages/api/admin/quiz/[quizId]/question/[questionId]/option/[optionId]";
import { CreateQuestionRequest } from "../../pages/api/admin/quiz/[quizId]/question";
import QuestionTextArea from "./QuestionTextArea";
import Modal from "react-modal";
import { getInternalApiUrl } from "../../service/common";

type OptionState = Option & {
    setState: Function;
};

const fetcher = async (url: string) => {
    const res = await fetch(url);
    // If the status code is not in the range 200-299,
    // we still try to parse and throw it.
    if (!res.ok) {
        const error = new Error();
        // Attach extra info to the error object.
        error.message = await res.json();
        throw error;
    }

    return res.json();
};

const QuestionForm = () => {
    // timeLimit, text, image, points, options
    const router = useRouter();
    const { quizId, questionId, new: isNew } = router.query;
    const [questionText, setQuestionText] = useState<string>("");
    const [timeLimit, setTimeLimit] = useState<number>(60);
    const [points, setPoints] = useState<number>(1000);
    const [fileBlob, setFileBlob] = useState<File>();
    const [file, setFile] = useState<string>("");
    const [option1, setOption1] = useState("");
    const [option2, setOption2] = useState("");
    const [option3, setOption3] = useState("");
    const [option4, setOption4] = useState("");
    const [correctOption, setCorrectOption] = useState([
        false,
        false,
        false,
        false,
    ]);
    const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);
    const [status, setStatus] = useState("");

    const { data, error, isLoading } = useSWR(
        `${getInternalApiUrl()}/api/admin/quiz/${quizId}/question/${questionId}`,
        fetcher
    );

    const OptionData: OptionState[] = [
        {
            optionId: 1,
            questionId: Number(questionId),
            quizId: Number(quizId),
            correct: correctOption[0],
            text: option1,
            setState: setOption1,
        },
        {
            optionId: 2,
            questionId: Number(questionId),
            quizId: Number(quizId),
            correct: correctOption[1],
            text: option2,
            setState: setOption2,
        },
        {
            optionId: 3,
            questionId: Number(questionId),
            quizId: Number(quizId),
            correct: correctOption[2],
            text: option3,
            setState: setOption3,
        },
        {
            optionId: 4,
            questionId: Number(questionId),
            quizId: Number(quizId),
            correct: correctOption[3],
            text: option4,
            setState: setOption4,
        },
    ];
    // to handle transition between new question and actual question
    useEffect(() => {
        if (!isNew && data) {
            // question
            setQuestionText(data.text);
            // option correct
            for (let i = 0; i < data.option.length; i++) {
                if (data.option[i].correct === true) {
                    let values = [false, false, false, false];
                    values[i] = true;
                    setCorrectOption(values);
                }
            }
            // option text
            setOption1(data.option[0].text);
            setOption2(data.option[1].text);
            setOption3(data.option[2].text);
            setOption4(data.option[3].text);
            // image
            data.image ? setFile(data.image) : setFile("");
            // time limit
            setTimeLimit(data.timelimit);
            setPoints(data.points);
        } else {
            clearInput();
        }
    }, [data, isNew]);

    function clearInput() {
        setQuestionText("");
        let values = [false, false, false, false];
        setCorrectOption(values);
        setOption1("");
        setOption2("");
        setOption3("");
        setOption4("");
        setFile("");
        setTimeLimit(60);
        setPoints(1000);
    }

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        console.log(e.target.files);
        if (e.target.files) {
            setFileBlob(e.target.files[0]);
            setFile(
                e.target.files && e.target.files.length > 0
                    ? URL.createObjectURL(e.target.files[0])
                    : ""
            );
        }
    }
    function removeImage(e: React.MouseEvent<HTMLButtonElement>) {
        setFile("");
    }

    const uploadImage = async () => {
        let filename;
        let fileType;
        let new_uuid = uuidv4();
        if (fileBlob) {
            console.log(fileBlob);
            filename = encodeURIComponent(new_uuid);
            fileType = encodeURIComponent(fileBlob.type);
        } else {
            throw Error("Error uploading image");
        }

        const res = await fetch(
            `${getInternalApiUrl()}/api/image?imageName=${filename}&imageType=${fileType}`
        );
        const { url, fields } = await res.json();
        const formData = new FormData();

        Object.entries({ ...fields, file: fileBlob }).forEach(
            ([key, value]) => {
                formData.append(key, value as string);
            }
        );

        console.log(url + new_uuid);
        try {
            // returns an error cuz of cors, or smth but it still uploads
            const upload = await fetch(url, {
                method: "POST",
                body: formData,
            });
            return url + new_uuid;
        } catch (e) {
            // return here because of the error
            return url + new_uuid;
        }
    };

    const onSave: React.MouseEventHandler<HTMLButtonElement> = async (e) => {
        e.preventDefault();
        // upload image
        let image_url;
        if (fileBlob) {
            console.log("UPLOADINGGGG");
            image_url = await uploadImage();
        } else {
            if (file === "") {
                console.log("set to empty string");
                image_url = "";
            }
        }

        if (quizId && questionId) {
            const body: UpdateQuestionRequest = {
                timeLimit: timeLimit,
                text: questionText,
                image: image_url,
                points: points,
            };
            const option_1: UpdateOptionRequest = {
                quizId: Number(quizId),
                questionId: Number(questionId),
                correct: correctOption[0],
                text: option1,
                optionId: 0,
            };

            const option_2: UpdateOptionRequest = {
                quizId: Number(quizId),
                questionId: Number(questionId),
                correct: correctOption[1],
                text: option2,
                optionId: 1,
            };

            const option_3: UpdateOptionRequest = {
                quizId: Number(quizId),
                questionId: Number(questionId),
                correct: correctOption[2],
                text: option3,
                optionId: 2,
            };

            const option_4: UpdateOptionRequest = {
                quizId: Number(quizId),
                questionId: Number(questionId),
                correct: correctOption[3],
                text: option4,
                optionId: 3,
            };

            const options = [option_1, option_2, option_3, option_4];

            if (isNew) {
                console.log("sending NEW");
                console.log("in is new: " + image_url);
                const createQuestion: CreateQuestionRequest = {
                    timeLimit: timeLimit,
                    points: points,
                    image: image_url,
                    text: questionText,
                    options: [
                        {
                            correct: correctOption[0],
                            text: option1,
                        },
                        {
                            correct: correctOption[1],
                            text: option2,
                        },
                        {
                            correct: correctOption[2],
                            text: option3,
                        },
                        {
                            correct: correctOption[3],
                            text: option4,
                        },
                    ],
                };
                const questionResponse = await fetch(
                    `${getInternalApiUrl()}/api/admin/quiz/${quizId}/question`,
                    {
                        method: "POST",
                        body: JSON.stringify(createQuestion),
                        headers: {
                            "Content-Type": "application/json",
                        },
                    }
                );
                console.log("PUSHING");

                if (!questionResponse.ok) {
                    // error modal stuff
                    setStatus("Error");
                    setIsStatusModalOpen(true);
                    throw Error();
                } else {
                    router.push(
                        `/admin/quiz/${quizId}/question/${
                            Number(questionId) + 1
                        }?new=True`
                    );
                    clearInput();
                    setStatus("Okay");
                    setIsStatusModalOpen(true);
                }
            } else {
                let okay = true;
                const questionResponse = await fetch(
                    `${getInternalApiUrl()}/api/admin/quiz/${quizId}/question/${questionId}`,
                    {
                        method: "PUT",
                        body: JSON.stringify(body),
                        headers: {
                            "Content-Type": "application/json",
                        },
                    }
                );
                if (!questionResponse.ok) {
                    // error modal stuff
                    console.log("question not ok");
                    okay = false;
                    throw Error();
                }
                for (let i = 0; i < 4; i++) {
                    const optionResponse = await fetch(
                        `${getInternalApiUrl()}/api/admin/quiz/${quizId}/question/${questionId}/option/${
                            i + 1
                        }`,
                        {
                            method: "PUT",
                            body: JSON.stringify(options[i]),
                            headers: {
                                "Content-Type": "application/json",
                            },
                        }
                    );
                    if (!optionResponse.ok) {
                        // error modal stuff
                        console.log("option not ok");
                        okay = false;
                        throw Error();
                    }
                }
                if (!okay) {
                    setStatus("Error");
                    setIsStatusModalOpen(true);
                } else {
                    setStatus("Okay");
                    setIsStatusModalOpen(true);
                }
            }
        }
        mutate(`${getInternalApiUrl()}/api/admin/quiz/${quizId}/question`);
    };

    const openErrorModal = () => {
        setIsStatusModalOpen(true);
    };

    const closeErrorModal = () => {
        setIsStatusModalOpen(false);
    };

    return (
        <div className="p-4">
            <div className="absolute border-4 rounded-full w-20 h-20 grid place-items-center">
                <input
                    className="text-white text-2xl bg-[#0e0e0e] w-14 text-center font-sora"
                    value={timeLimit}
                    placeholder=""
                    onChange={(e) => {
                        setTimeLimit(Number(e.target.value));
                    }}
                ></input>
            </div>
            <div className="flex justify-end">
                <label className="text-white px-2">Upload Image!</label>
                <input
                    type="file"
                    className="w-[120px]"
                    onChange={handleChange}
                    accept=".png,.jpeg"
                ></input>
            </div>
            <div className="grid place-items-center">
                <h2 className="font-bold text-3xl mb-4 text-white">
                    Question {questionId}
                </h2>
                {/* <input
                    className="bg-[#0e0e0e] text-white text-3xl font-bold text-center focus:outline-none"
                    value={questionText}
                    placeholder="Question Text"
                    onChange={(e) => {
                        setQuestionText(e.target.value);
                    }}
                ></input> */}
                <div className="h-8"></div>
                <QuestionTextArea
                    value={questionText}
                    onChange={setQuestionText}
                    background="bg-[#0e0e0e]"
                ></QuestionTextArea>
                {file !== "" ? (
                    <div className="m-4">
                        <img src={file} className="object-cover h-72 w-96" />
                        <div className="flex justify-end">
                            <button
                                onClick={removeImage}
                                className="text-white"
                            >
                                Remove
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="h-64 w-80 grid place-items-center">
                        <div className="animate-pulse ">
                            <LogoGreen
                                className="animate-bounce"
                                width={100}
                                height={100}
                                view={"230 230 400 400"}
                            />
                        </div>
                    </div>
                )}
            </div>
            <div className="flex justify-center flex-wrap box ">
                <div className="grid grid-cols-2 grid-rows-2 p-1">
                    {OptionData.map((option, index) => {
                        return (
                            <button
                                key={option.optionId}
                                className="w-96"
                                onClick={(
                                    e: React.MouseEvent<HTMLButtonElement>
                                ) => {
                                    setCorrectOption((correctOption) => {
                                        const result = [
                                            false,
                                            false,
                                            false,
                                            false,
                                        ];
                                        result[index] = true;
                                        console.log(result);
                                        return result;
                                    });
                                }}
                            >
                                <div
                                    className={
                                        "text-white grid p-4 h-36 border rounded-xl m-2 text-xl font-bold place-items-center " +
                                        (correctOption[index]
                                            ? "bg-[#A5DB00]"
                                            : "")
                                    }
                                >
                                    <ResizingTextArea
                                        value={option.text}
                                        onChange={option.setState}
                                        background={
                                            correctOption[index]
                                                ? "bg-[#A5DB00]"
                                                : "bg-[#0e0e0e]"
                                        }
                                    />
                                </div>
                            </button>
                        );
                    })}
                </div>
            </div>
            <div className="flex justify-between">
                <label className="grid text-white px-4">
                    Maximum Points
                    <input
                        className="text-white text-xl bg-[#0e0e0e] w-[100px] border rounded-lg p-1"
                        placeholder="1000"
                        value={points}
                        onChange={(e) => {
                            setPoints(Number(e.target.value));
                        }}
                    />
                </label>
                <div>
                    <button
                        className="relative border rounded-md px-4 py-2 top-[20px] right-[20px] text-white md:right-[100px]"
                        type="submit"
                        onClick={onSave}
                    >
                        Save
                    </button>
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
export default QuestionForm;
