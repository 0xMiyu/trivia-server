import React, { useState, useRef, useEffect } from "react";

interface QuestionTextArea {
    value: string;
    onChange: Function;
    background: string;
}

const QuestionTextArea: React.FC<QuestionTextArea> = ({
    value,
    onChange,
    background,
}) => {
    const textAreaRef = useRef<HTMLTextAreaElement>(null);
    const mirrorRef = useRef<HTMLSpanElement>(null);

    useEffect(() => {
        if (textAreaRef.current && mirrorRef.current) {
            mirrorRef.current.textContent = value;
            let newWidth = Math.min(
                mirrorRef.current.offsetWidth,
                textAreaRef.current.parentElement?.clientWidth || Infinity
            );
            newWidth = Math.max(newWidth, 100); // minimum 100px
            newWidth = Math.min(newWidth, 800); // maximum 300px
            textAreaRef.current.style.width = `${newWidth}px`;
            let newHeight = mirrorRef.current.offsetHeight;
            newHeight = Math.max(newHeight, 50); // minimum 50px
            newHeight = Math.min(newHeight, 300); // maximum 200px
            textAreaRef.current.style.height = `${newHeight}px`;
        }
    }, [value]);

    const onChangeHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        onChange(e.target.value);
    };

    return (
        <div className="grid place-items-center">
            <textarea
                ref={textAreaRef}
                value={value}
                onChange={onChangeHandler}
                style={{ position: "absolute", overflow: "hidden" }}
                className={
                    "focus:outline-none text-white text-xl font-bold text-center " +
                    background
                }
            />
            <span
                ref={mirrorRef}
                style={{
                    whiteSpace: "pre-wrap",
                    visibility: "hidden",
                    wordBreak: "break-word",
                }}
            />
        </div>
    );
};

export default QuestionTextArea;
