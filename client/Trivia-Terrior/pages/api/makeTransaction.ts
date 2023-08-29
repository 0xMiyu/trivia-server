import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import {
    clusterApiUrl,
    Connection,
    PublicKey,
    Transaction,
    SystemProgram,
    LAMPORTS_PER_SOL,
} from "@solana/web3.js";
import { NextApiRequest, NextApiResponse } from "next";
import { shopAddress } from "../../lib/addresses";
import solanaService from "../../service/solanaService";
import base58 from "bs58";
import quizService from "../../service/quizService";

export type MakeTransactionInputData = {
    account: string;
};

export type MakeTransactionOutputData = {
    transaction: string;
    message: string;
};

type ErrorOutput = {
    error: string;
};

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<MakeTransactionOutputData | ErrorOutput>
) {
    try {
        // We pass the selected items in the query, calculate the expected cost
        // REMEMBER TO ADDDDDDDD IN DBBBBBBB @0xMiyu
        const { quizId }: { quizId: string } = req.query as { quizId: string };
        console.log(quizId);
        const quiz = await quizService.getQuiz({ quizId: Number(quizId) });
        let amount = 0.000001;
        if (quiz) {
            amount = quiz.solPrice;
        }

        // We pass the reference to use in the query
        const { reference } = req.query;
        if (!reference) {
            res.status(400).json({ error: "No reference provided" });
            return;
        }

        // We pass the buyer's public key in JSON body
        const { account } = req.body as MakeTransactionInputData;
        if (!account) {
            res.status(400).json({ error: "No account provided" });
            return;
        }
        const buyerPublicKey = new PublicKey(account);
        const shopPublicKey = shopAddress;

        const connection = solanaService.getSolanaConnection();

        // Get a recent blockhash to include in the transaction
        const { blockhash } = await connection.getLatestBlockhash("finalized");

        const transaction = new Transaction({
            recentBlockhash: blockhash,
            // The buyer pays the transaction fee
            feePayer: buyerPublicKey,
        });

        // Create the instruction to send SOL from the buyer to the shop
        const transferInstruction = SystemProgram.transfer({
            fromPubkey: buyerPublicKey,
            lamports: amount * LAMPORTS_PER_SOL,
            toPubkey: shopPublicKey,
        });

        // Add the reference to the instruction as a key
        // This will mean this transaction is returned when we query for the reference
        transferInstruction.keys.push({
            pubkey: new PublicKey(reference),
            isSigner: false,
            isWritable: false,
        });

        // Add the instruction to the transaction
        transaction.add(transferInstruction);

        // Serialize the transaction and convert to base64 to return it
        const serializedTransaction = transaction.serialize({
            // We will need the buyer to sign this transaction after it's returned to them
            requireAllSignatures: false,
        });

        const tx = base58.encode(serializedTransaction);

        // Insert into database: reference, amount

        // Return the serialized transaction
        res.status(200).json({
            transaction: tx,
            message: "Thanks for your order! 🍪",
        });
    } catch (err) {
        console.error(err);

        res.status(500).json({ error: "error creating transaction" });
        return;
    }
}
