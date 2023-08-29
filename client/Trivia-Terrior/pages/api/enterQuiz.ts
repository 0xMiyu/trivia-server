import base58 from "bs58";
import { NextApiRequest, NextApiResponse } from "next";
import solanaService from "../../service/solanaService";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    const { method, query, body } = req;
    const { quizId, publicKey, transaction } = body;
    const quizIdNum = Number(quizId);

    if (method !== "POST") {
        return res.status(405).json({ message: "Method not supported" });
    }

    if (!transaction) {
        return res.status(400).json({ message: "No transaction supplied" });
    }

    try {
        const conn = solanaService.getSolanaConnection();
        const tx = await conn.sendRawTransaction(base58.decode(transaction));
        const blockhashObj = await conn.getLatestBlockhash();
        const confirmedRes = await conn.confirmTransaction(
            {
                signature: tx,
                blockhash: blockhashObj.blockhash,
                lastValidBlockHeight: blockhashObj.lastValidBlockHeight,
            },
            "confirmed"
        );
        if (!confirmedRes || confirmedRes.value.err) {
            return res.status(404).json({ message: "transaction failed" });
        }
        const player = await prisma.user.findUnique({
            where: { publicKey },
        });
        if (!player) {
            return res.status(404).json({ message: "player not found" });
        }

        const quiz = await prisma.quiz.findUnique({
            where: { quizId: quizIdNum },
        });
        if (!quiz) {
            return res.status(404).json({ message: "quiz not found bitch" });
        }

        const newQuizEntry = await prisma.quizEntry.create({
            data: {
                quizId: quizIdNum,
                publicKey: publicKey,
            },
        });

        return res
            .status(200)
            .send({ message: "success", quizEntry: newQuizEntry });
    } catch (e: any) {
        console.log(e);
        return res
            .status(500)
            .json({ message: e.message, additional: e.stack });
    }
};

export default handler;
