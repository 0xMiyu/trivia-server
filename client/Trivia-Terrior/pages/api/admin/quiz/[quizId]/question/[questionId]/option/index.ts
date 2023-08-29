import type { NextApiRequest, NextApiResponse } from "next";
import { ErrorMessage } from "../../../../../../../../types/errorMessage";
import authAdminMiddleware from "../../../../../../../../middlewares/authAdminMiddleware";
import { Option } from "@prisma/client";
import optionService from "../../../../../../../../service/optionService";



const handler = async (
    req: NextApiRequest,
    res: NextApiResponse<Option[] | Option | ErrorMessage>
) => {
    const { method, body, query } = req;
    const questionId = Number(req.query.questionId as string);
    const quizId = Number(req.query.quizId as string);

    switch (method) {
        case "GET":
            try {
                const options: Option[] = await optionService.getAllOptions({quizId, questionId});
                return res.status(200).json(options);
            } catch (error: any) {
                if (error.message === "Error retrieving options") {
                    return res.status(404).json({
                        message: "Options not found",
                    });
                }
                return res.status(500).json({
                    message: "Error retrieving options",
                    error: error,
                });
            }

        case "POST":
            try {
                const { correct, text } = body;

                if (correct === undefined || correct === null || !text) {
                    return res.status(400).json({
                        message: "Missing required parameters",
                    });
                }

                const newOption: Option = await optionService.createOption({questionId, quizId, correct, text})

                return res.status(201).json(newOption);
            } catch (error: any) {
                if(error.message.includes(":(")){
                    return res.status(500).json({message: error.message})
                }

                return res.status(500).json({
                    message: "Error creating option",
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
