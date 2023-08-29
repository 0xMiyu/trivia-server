import type { NextApiRequest, NextApiResponse } from "next";
import { ErrorMessage } from "../../../../../../types/errorMessage";
import authAdminMiddleware from "../../../../../../middlewares/authAdminMiddleware";
import prizeService from "../../../../../../service/prizeService";
import { Prize } from "@prisma/client";

interface UpdatePrizeRequest {
    name?: string;
    quantity?: number;
    image?: string;
    solValue?: number;
}

const handler = async (
    req: NextApiRequest,
    res: NextApiResponse<Prize | ErrorMessage>
) => {
    const { method, body, query } = req;
    const quizId = Number(query.quizId as string);
    const prizeId = Number(query.prizeId as string);

    switch (method) {
        case "GET":
            try {
                const prize: Prize = await prizeService.getPrize({
                    quizId,
                    prizeId,
                });
                return res.status(200).json(prize);
            } catch (error: any) {
                if (error.message === "Prize not found") {
                    return res.status(404).json({ message: error.message });
                }
                return res
                    .status(500)
                    .json({ message: "Internal server error" });
            }

        case "PUT":
            try {
                const { name, quantity, image, solValue }: UpdatePrizeRequest =
                    body;

                if (!name && !quantity && !image && !solValue) {
                    return res
                        .status(400)
                        .json({ message: "No fields provided for update" });
                }

                const updatedPrize: Prize = await prizeService.updatePrize({
                    quizId,
                    prizeId,
                    name,
                    quantity,
                    image,
                    solValue,
                });

                return res.status(200).json(updatedPrize);
            } catch (error: any) {
                if (error.message === "Prize not found") {
                    return res.status(404).json({ message: error.message });
                }
                return res
                    .status(500)
                    .json({ message: "Internal server error" });
            }

        case "DELETE":
            try {
                const deletedPrize = await prizeService.deletePrize({
                    quizId,
                    prizeId,
                });

                return res
                    .status(200)
                    .json({ message: "Prize deleted successfully" });
            } catch (error: any) {
                if (error.message === "Prize not found") {
                    return res.status(404).json({ message: error.message });
                }
                return res
                    .status(500)
                    .json({ message: "Internal server error" });
            }
        default:
            res.setHeader("Allow", ["GET", "PUT", "DELETE"]);
            return res
                .status(405)
                .json({ message: `Method ${method} not allowed` });
    }
};

export default authAdminMiddleware(handler);
