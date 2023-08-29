import type { NextApiRequest, NextApiResponse } from "next";
import { ErrorMessage } from "../../../../../../../../types/errorMessage";
import authAdminMiddleware from "../../../../../../../../middlewares/authAdminMiddleware";
import { Option } from "@prisma/client";
import optionService from "../../../../../../../../service/optionService";

export interface UpdateOptionRequest {
    questionId: number;
    quizId: number;
    optionId: number;
    correct?: boolean;
    text?: string;
}

const handler = async (
    req: NextApiRequest,
    res: NextApiResponse<Option[] | Option | ErrorMessage>
) => {
    const { method, body, query } = req;
    const questionId = Number(req.query.questionId as string);
    const quizId = Number(req.query.quizId as string);
    const optionId = Number(req.query.optionId as string);

    switch (method) {
        case "GET":
            try {
                const option: Option = await optionService.getOption({
                    quizId,
                    questionId,
                    optionId,
                });
                return res.status(200).json(option);
            } catch (error: any) {
                if (error.message === "Option not found") {
                    return res.status(404).json({ message: error.message });
                }
                return res.status(500).json({
                    message: "Error retrieving option",
                    error: error,
                });
            }
        case "PUT":
            try {
                const { correct, text }: UpdateOptionRequest = body;

                if (correct === undefined && text === undefined) {
                    return res
                        .status(400)
                        .json({ message: "No fields provided for update" });
                }

                const updatedOption: Option = await optionService.updateOption({
                    questionId,
                    quizId,
                    optionId,
                    correct,
                    text,
                });

                return res.status(200).json(updatedOption);
            } catch (error: any) {
                if (error.message === "Option not found") {
                    return res.status(404).json({ message: error.message });
                }
                return res.status(500).json({
                    message: "Error updating option",
                    error: error,
                });
            }

        case "DELETE":
            try {
                const deletedOption = optionService.deleteOption({
                    quizId,
                    questionId,
                    optionId,
                });

                return res
                    .status(200)
                    .json({ message: "Option deleted successfully" });
            } catch (error: any) {
                if (error.message === "Option not found") {
                    return res.status(404).json({ message: error.message });
                }

                return res.status(500).json({
                    message: "Error deleting option",
                    error: error,
                });
            }

        default:
            res.setHeader("Allow", ["GET", "POST"]);
            return res
                .status(405)
                .json({ message: `Method ${method} not allowed` });
    }
};

export default authAdminMiddleware(handler);
