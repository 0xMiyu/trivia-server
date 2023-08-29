import React, { useState, useRef, useEffect } from "react";

interface ResizingTextArea {
    value: string;
    onChange: Function;
    background: string;
}

const ResizingTextArea: React.FC<ResizingTextArea> = ({
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
            newWidth = Math.max(newWidth, 50); // minimum 100px
            newWidth = Math.min(newWidth, 300); // maximum 300px
            textAreaRef.current.style.width = `${newWidth}px`;
            let newHeight = mirrorRef.current.offsetHeight;
            newHeight = Math.max(newHeight, 50); // minimum 50px
            newHeight = Math.min(newHeight, 200); // maximum 200px
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
                    "focus:outline-none text-white text-lg text-center " +
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

export default ResizingTextArea;
