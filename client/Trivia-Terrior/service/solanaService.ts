import { Connection } from "@solana/web3.js";

const RPC_ENDPOINT = process.env.RPC_ENDPOINT;
const conn = new Connection(RPC_ENDPOINT!, "confirmed");

const getSolanaConnection = () => {
    return conn;
};

const solanaService = {
    getSolanaConnection,
};

export default solanaService;
