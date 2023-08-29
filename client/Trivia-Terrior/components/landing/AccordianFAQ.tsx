import { useState } from "react";
import {
    Accordion,
    AccordionHeader,
    AccordionBody,
} from "@material-tailwind/react";

function AccordianFAQ() {
    const [open, setOpen] = useState(1);

    const handleOpen = (value: number) => {
        setOpen(open === value ? 0 : value);
    };

    const heading = {
        color: "#C5FB00",
        textAlign: "left",
    };

    const para = {
        color: "white",
    };

    function Icon({ id, open }: { id: number; open: number }) {
        return (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`${
                    id === open ? "rotate-180" : ""
                } h-5 w-5 transition-transform`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19 9l-7 7-7-7"
                />
            </svg>
        );
    }

    return (
        <div className="">
            <Accordion icon={<Icon id={1} open={open} />} open={open === 1}>
                <AccordionHeader
                    style={{
                        color: "#C5FB00",
                        textAlign: "left",
                        fontSize: "1rem",
                    }}
                    onClick={() => handleOpen(1)}
                >
                    Do I need to pay to enter the quiz?
                </AccordionHeader>
                <AccordionBody style={{ ...para }}>
                    Yes, you need to pay to enter the quiz. The price to enter
                    the quiz will be shown in Solana.
                </AccordionBody>
            </Accordion>

            <Accordion open={open === 3} icon={<Icon id={3} open={open} />}>
                <AccordionHeader
                    style={{
                        color: "#C5FB00",
                        textAlign: "left",
                        fontSize: "1rem",
                    }}
                    onClick={() => handleOpen(3)}
                >
                    What is Trivia Terrier?{" "}
                </AccordionHeader>
                <AccordionBody style={{ ...para }}>
                    Trivia Terrier is where you can take part in weekly live
                    quizzes where you can win prizes and majority of the pot by
                    answering questions correctly.
                </AccordionBody>
            </Accordion>
        </div>
    );
}

export default AccordianFAQ;
