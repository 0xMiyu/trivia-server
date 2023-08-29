import type { NextApiRequest, NextApiResponse } from "next";
import { ErrorMessage } from "../../../../../../types/errorMessage";
import prizeService from "../../../../../../service/prizeService";
import { Prize } from "@prisma/client";
import authAdminMiddleware from "../../../../../../middlewares/authAdminMiddleware";

interface CreatePrizeRequest {
    name: string
    quantity: number
    image: string
    solValue: number
}

const handler = async (
    req: NextApiRequest,
    res: NextApiResponse<Prize[] | Prize | ErrorMessage>
) => {
    const { method, query, body } = req;
    const quizId = Number(query.quizId as string);

    switch (method) {
        case "GET":
            try {
                const prizes: Prize[] = await prizeService.getAllPrizes({
                    quizId,
                });
                return res.status(200).json(prizes);
            } catch (error: any) {
                if (error.message === "Prizes not found") {
                    return res.status(404).json({ message: error.message });
                }
                return res
                    .status(500)
                    .json({ message: "Internal server error" });
            }

        case "POST":
            try {
                const {name, quantity, image, solValue}: CreatePrizeRequest = body

                if(!name || !quantity || !image || !solValue){
                    return res.status(400).json({message: "Missing requied parameters"})
                }

                const newPrize: Prize = await prizeService.createPrize({quizId, name, quantity, image, solValue})

                return res.status(201).json(newPrize)
            } catch (error: any) {
                if(error.message === "Quiz not found"){
                    return res.status(404).json({message: "Quiz not found"})
                }
                return res.status(500).json({message: "Internal server error"})
            }

        default:
            res.setHeader("Allow", ["GET", "POST"]);
            return res
                .status(405)
                .json({ message: `Method ${method} not allowed` });
    }
};

export default authAdminMiddleware(handler);
