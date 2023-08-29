import { FormEvent, FunctionComponent } from "react";
import NavBar from "../../../components/landing/NavBar";
import Head from "next/head";
import Datetime from "react-datetime";
import "react-datetime/css/react-datetime.css";
import { useRouter } from "next/navigation";

import { useState } from "react";
import { CreateQuizRequest } from "../../api/admin/quiz";
import { getInternalApiUrl } from "../../../service/common";

interface Prize {
    nftName: string;
    quantity: string;
    imageUrl: string;
    solValue: string;
}

const QuizCreationForm = () => {
    const [name, setName] = useState<string>("");
    const [week, setWeek] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [solPrice, setSolPrice] = useState<number>(0.1);
    const [startDateTime, setStartDateTime] = useState<string>("");
    const [nftPrizes, setNftPrizes] = useState<Prize[]>([
        { nftName: "", quantity: "", imageUrl: "", solValue: "" },
    ]);
    const router = useRouter();

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // POST
        const body: CreateQuizRequest = {
            name: name,
            week: Number(week),
            description: description,
            solPrice: solPrice,
            startDateTime: new Date(startDateTime),
        };
        const prizes: {
            name: string;
            quantity: number;
            image: string;
            solValue: number;
        }[] = [];
        nftPrizes.forEach((prize: Prize) => {
            const value = {
                name: prize.nftName,
                quantity: Number(prize.quantity),
                image: prize.imageUrl,
                solValue: Number(prize.solValue),
            };
            prizes.push(value);
        });
        body["prizes"] = prizes;
        const response = await fetch(`${getInternalApiUrl()}/api/admin/quiz`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
        });
        if (response.status === 201) {
            router.push("/admin");
        } else {
            alert("Error");
        }
    };

    const addNftPrize = () => {
        setNftPrizes([
            ...nftPrizes,
            {
                nftName: "",
                quantity: "",
                imageUrl: "",
                solValue: "",
            },
        ]);
    };

    const removeNftPrize = (index: number) => {
        const newNftPrizes = [...nftPrizes];
        newNftPrizes.splice(index, 1);
        setNftPrizes(newNftPrizes);
    };

    const handleNftPrizeChange = (
        index: number,
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        const values: Prize[] = [...nftPrizes];
        if (event.target.name in values[index]) {
            values[index][event.target.name as keyof Prize] =
                event.target.value;
        }
        setNftPrizes(values);
        console.log(nftPrizes);
    };

    return (
        <div>
            <Head>
                <title>New Quiz</title>
            </Head>
            <NavBar>
                <button
                    className="text-white text-xl font-medium p-2 mx-8"
                    onClick={(e) => {
                        router.back();
                    }}
                >
                    Back
                </button>
                <div className="grid place-items-center">
                    <form
                        className="grid gap-2 p-4 border-2 bg-[#101010] rounded-lg"
                        onSubmit={handleSubmit}
                    >
                        <h3 className="font-bold text-lg mb-4 text-[#A5DB00] text-center">
                            Create New Quiz
                        </h3>
                        <div className="flex justify-between items-center">
                            <label htmlFor="name" className="text-[#A5DB00]">
                                Name:
                            </label>
                            <input
                                id="name"
                                value={name}
                                className="m-2 p-1 text-black border-white border-2 rounded-md"
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </div>
                        <div className="flex justify-between items-center">
                            <label htmlFor="week" className="text-[#A5DB00]">
                                Week:
                            </label>
                            <input
                                id="week"
                                value={week}
                                className="m-2 p-1 text-black border-white border-2 rounded-md"
                                onChange={(e) => setWeek(e.target.value)}
                                required
                            />
                        </div>
                        <div className="flex justify-between items-center">
                            <label
                                htmlFor="description"
                                className="text-[#A5DB00]"
                            >
                                Description:
                            </label>
                            <textarea
                                id="description"
                                value={description}
                                className="m-2 p-1 text-black border-white border-2 rounded-md"
                                onChange={(e) => setDescription(e.target.value)}
                                required
                            />
                        </div>
                        <div className="flex justify-between items-center">
                            <label
                                htmlFor="Sol Price"
                                className="text-[#A5DB00]"
                            >
                                Sol Price:
                            </label>
                            <input
                                id="Sol Price"
                                value={solPrice}
                                type="number"
                                className="m-2 p-1 text-black border-white border-2 rounded-md"
                                onChange={(e) => {
                                    if (e.target.valueAsNumber >= 0) {
                                        setSolPrice(e.target.valueAsNumber);
                                    }
                                }}
                                required
                            />
                        </div>
                        <div className="flex justify-between items-center">
                            <label htmlFor="prizes" className="text-[#A5DB00]">
                                Prizes:
                            </label>
                            {nftPrizes.length === 0 && <p>No prizes</p>}
                        </div>
                        {nftPrizes.map((nftPrize, index) => (
                            <div
                                key={index}
                                className="grid grid-cols-2 gap-4 items-center"
                            >
                                <input
                                    name="nftName"
                                    value={nftPrize.nftName}
                                    onChange={(event) =>
                                        handleNftPrizeChange(index, event)
                                    }
                                    className="m-2 p-1 text-black border-white border-2 rounded-md"
                                    placeholder="NFT Name"
                                    required
                                />
                                <input
                                    name="quantity"
                                    value={nftPrize.quantity}
                                    onChange={(event) =>
                                        handleNftPrizeChange(index, event)
                                    }
                                    className="m-2 p-1 text-black border-white border-2 rounded-md"
                                    placeholder="Quantity"
                                    type="number"
                                    required
                                />
                                <input
                                    name="imageUrl"
                                    value={nftPrize.imageUrl}
                                    onChange={(event) =>
                                        handleNftPrizeChange(index, event)
                                    }
                                    className="m-2 p-1 text-black border-white border-2 rounded-md"
                                    placeholder="Image URL"
                                    required
                                />
                                <input
                                    name="solValue"
                                    value={nftPrize.solValue}
                                    onChange={(event) =>
                                        handleNftPrizeChange(index, event)
                                    }
                                    className="m-2 p-1 text-black border-white border-2 rounded-md"
                                    placeholder="Sol Value"
                                    type="number"
                                    required
                                />
                                <button
                                    className="text-white hover:text-gray-500"
                                    onClick={() => removeNftPrize(index)}
                                >
                                    Remove
                                </button>
                            </div>
                        ))}

                        <button
                            className="text-white hover:text-gray-500"
                            onClick={addNftPrize}
                        >
                            Add NFT Prize
                        </button>
                        <div className="flex justify-between items-center">
                            <label
                                htmlFor="datetime"
                                className="text-[#A5DB00]"
                            >
                                Start DateTime:
                            </label>
                            <Datetime
                                className="m-2 p-1 text-black border bg-white rounded-md"
                                onChange={(moment) => {
                                    setStartDateTime(moment.toString());
                                }}
                            />
                        </div>
                        <button
                            className="text-white hover:text-gray-500"
                            type="submit"
                        >
                            Create Quiz
                        </button>
                    </form>
                </div>
            </NavBar>
        </div>
    );
};

export default QuizCreationForm;
