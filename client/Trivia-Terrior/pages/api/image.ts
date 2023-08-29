import type { NextApiRequest, NextApiResponse } from "next";
import { ErrorMessage } from "../../types/errorMessage";
import { getS3PostUrl } from "../../service/common";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const { method, body, query } = req;

    try {
        const imageName = query.imageName as string;
        const imageType = query.imageType as string;
        console.log(imageName, imageType);
        if (!imageName || !imageType) {
            return res.status(400).json({ message: "No image provided" });
        }

        const allowedTypes = ["image/jpeg", "image/png"];

        if (!allowedTypes.includes(imageType)) {
            return res.status(400).json({ message: "Unsupported file type" });
        }

        const url = await getS3PostUrl({ imageName, imageType });

        return res.status(200).json(url);
    } catch (error: any) {
        console.log(error.message);
        return res.status(500).json({ message: "Internal server error" });
    }
}
