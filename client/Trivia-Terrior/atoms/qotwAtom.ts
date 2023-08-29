import { atom } from "jotai";
import { QuizWithPrizeQuestionOptionEntry } from "../types/backendReturnTypes";

export const qotw = atom<(QuizWithPrizeQuestionOptionEntry & {}) | undefined>(
    undefined
);
