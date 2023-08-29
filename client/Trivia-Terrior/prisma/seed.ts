import { Role, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const testPlayers = [
    {
        publicKey: "9WzDXwBbmkg8ZTbNMqUxvQRAyrZzDsGYdLVL9zYtAWWM",
        userName: "John Doe",
        profilePicture: "https://i.imgur.com/1ZQZ1Yx.png",
    },
    {
        publicKey: "7mhcgF1DVsj5iv4CxZDgp51H6MBBwqamsH1KnqXhSRc5",
        userName: "Christian Dior",
        profilePicture: "https://i.imgur.com/keklmaog.png",
        totalWins: 0,
        totalPoints: 0,
        overallRanking: 4,
    },
    {
        publicKey: "7BLd7DP4gXRcfutQCCGEdgmkcsynCZWmp3QNud5pEJsA",
        userName: "Rob Bert",
        profilePicture:
            "https://nftevening.com/wp-content/uploads/2022/09/degods-nft-sell.jpg",
    },
    {
        publicKey: "9QgXqrgdbVU8KcpfskqJpAXKzbaYQJecgMAruSWoXDkM",
        userName: "Bob The Buidler",
        profilePicture:
            "https://blog.mexc.com/wp-content/uploads/2022/09/DeGods.png",
    },
    {
        publicKey: "FbGeZS8LiPCZiFpFwdUUeF2yxXtSsdfJoHTsVMvM8STh",
        userName: "Charles",
        profilePicture:
            "https://static.okx.com/cdn/nft/e719ece5-be9c-4a08-b604-f3af1e97e4e3.png",
        totalWins: 0,
        totalPoints: 0,
        overallRanking: 3,
    },
    {
        publicKey: "52C9T2T7JRojtxumYnYZhyUmrN7kqzvCLc4Ksvjk7TxD",
        userName: "Dave",
        profilePicture: "https://metadata.degods.com/g/9999-dead.png",
        totalWins: 2,
        totalPoints: 470,
        overallRanking: 1,
    },
    {
        publicKey: "Fpt6wkFGE7j2rr4V1LiQsEEJFjdui8hePRQAnxCDJgVJ",
        userName: "tigercxx",
        profilePicture:
            "https://powered.by.dustlabs.com/cdn-cgi/image/width=384/https://metadata.degods.com/g/3475-dead.png",
        totalWins: 2,
        totalPoints: 380,
        overallRanking: 2,
        role: Role.ADMIN,
    },
    {
        publicKey: "ErDNSU1SdDajaT7oHM4FeATJXcJtfwnbhwoABZTWZ2mw",
        userName: "angry",
        profilePicture:
            "https://powered.by.dustlabs.com/cdn-cgi/image/width=384/https://metadata.degods.com/g/3475-dead.png",
        totalWins: 2,
        totalPoints: 380,
        overallRanking: 2,
        role: Role.ADMIN,
    },
];

const testQuizzes = [
    {
        name: "Solana Architecture",
        week: 1,
        description: "Solana's bleeding edge infrastructure and technology",
        startDateTime: new Date("2022-03-23 12:00:00"),
        solPrice: 1.5,
        ended: true,
        question: {
            create: [
                {
                    questionId: 1,
                    timeLimit: 30,
                    text: "What kind of architecture does Solana utilize to ensure scalability?",
                    option: {
                        create: [
                            {
                                optionId: 1,
                                correct: false,
                                text: "Proof of Authority",
                            },
                            { optionId: 2, correct: false, text: "Sharding" },
                            {
                                optionId: 3,
                                correct: false,
                                text: "Proof of Stake",
                            },
                            {
                                optionId: 4,
                                correct: true,
                                text: "Proof of History",
                            },
                        ],
                    },
                },
                {
                    questionId: 2,
                    timeLimit: 60,
                    text: "What does Solana use to create a historical record of events and transactions?",
                    option: {
                        create: [
                            {
                                optionId: 1,
                                correct: true,
                                text: "Proof of History",
                            },
                            {
                                optionId: 2,
                                correct: false,
                                text: " Proof of Stake",
                            },
                            { optionId: 3, correct: false, text: "Blockchain" },
                            {
                                optionId: 4,
                                correct: false,
                                text: "Solana Ledger",
                            },
                        ],
                    },
                },
            ],
        },
        prize: {
            create: [
                {
                    prizeId: 1,
                    name: "Sol",
                    quantity: 6.9,
                    image: "https://vectorlogo4u.com/wp-content/uploads/2021/09/solana-logo-vector-01.png",
                    solValue: 6.9,
                },
                {
                    prizeId: 2,
                    name: "SMB #420",
                    quantity: 1,
                    image: "https://arweave.net/3pHn1xrXGUtbXa66RtkzKoZW7IxAuCtIUjplyMg68FE",
                    solValue: 4.2,
                },
                {
                    prizeId: 3,
                    name: "USDC",
                    quantity: 2.5,
                    image: "https://cryptologos.cc/logos/usd-coin-usdc-logo.png",
                    solValue: 0.25,
                },
            ],
        },
        quizEntry: {
            create: [
                {
                    publicKey: "Fpt6wkFGE7j2rr4V1LiQsEEJFjdui8hePRQAnxCDJgVJ",
                    points: 380,
                    numOfCorrect: 2,
                },
                {
                    publicKey: "ErDNSU1SdDajaT7oHM4FeATJXcJtfwnbhwoABZTWZ2mw",
                    points: 320,
                    numOfCorrect: 2,
                },
                {
                    publicKey: "7BLd7DP4gXRcfutQCCGEdgmkcsynCZWmp3QNud5pEJsA",
                    points: 210,
                    numOfCorrect: 2,
                },
            ],
        },
    },
    {
        name: "Orca Whirlpools",
        week: 2,
        description: "Quiz about orcas or smth idk i don't defi",
        startDateTime: new Date("2023-05-14 12:00:00"),
        solPrice: 6.9,
        ended: false,
        question: {
            create: [
                {
                    questionId: 1,
                    timeLimit: 30,
                    text: "What is the main advantage of using Whirlpools compared to traditional AMMs?",
                    option: {
                        create: [
                            {
                                optionId: 1,
                                correct: false,
                                text: "They offer lower transaction fees.",
                            },
                            {
                                optionId: 2,
                                correct: true,
                                text: "They allow LPs to concentrate their liquidity in specific price ranges.",
                            },
                            {
                                optionId: 3,
                                correct: false,
                                text: "They allow trading in a single transaction.",
                            },
                            {
                                optionId: 4,
                                correct: false,
                                text: "They increase the risk of divergence loss.",
                            },
                        ],
                    },
                },
                {
                    questionId: 2,
                    timeLimit: 30,
                    text: "When was the Whirlpools feature launched by Orca?",
                    option: {
                        create: [
                            { optionId: 1, correct: true, text: "March 23" },
                            { optionId: 2, correct: false, text: "March 20" },
                            { optionId: 3, correct: false, text: "March 25" },
                            { optionId: 4, correct: false, text: "March 24" },
                        ],
                    },
                },
                {
                    questionId: 3,
                    timeLimit: 30,
                    text: "Who are the first users allowed to provide liquidity for Whirlpools?",
                    option: {
                        create: [
                            {
                                optionId: 1,
                                correct: true,
                                text: "All registered Orca users",
                            },
                            {
                                optionId: 2,
                                correct: false,
                                text: "Holders of Orca's Orcanaut NFTs",
                            },
                            {
                                optionId: 3,
                                correct: false,
                                text: "Users with the highest risk tolerance",
                            },
                            {
                                optionId: 4,
                                correct: false,
                                text: "Users trading in large volumes",
                            },
                        ],
                    },
                },
            ],
        },
        quizEntry: {
            create: [
                {
                    publicKey: "Fpt6wkFGE7j2rr4V1LiQsEEJFjdui8hePRQAnxCDJgVJ",
                    points: 190,
                    numOfCorrect: 2,
                },
                {
                    publicKey: "9WzDXwBbmkg8ZTbNMqUxvQRAyrZzDsGYdLVL9zYtAWWM",
                    points: 190,
                    numOfCorrect: 1,
                },
                {
                    publicKey: "ErDNSU1SdDajaT7oHM4FeATJXcJtfwnbhwoABZTWZ2mw",
                    points: 190,
                    numOfCorrect: 2,
                },
            ],
        },
    },
    {
        name: "Solana Tokenomics",
        week: 3,
        description: "",
        startDateTime: new Date("2023-06-17 12:00:00"),
        solPrice: 4.2,
        ended: false,
        question: {
            create: [
                {
                    questionId: 1,
                    timeLimit: 30,
                    text: "What is the purpose of staking SOL tokens in the Solana network?",
                    option: {
                        create: [
                            {
                                optionId: 1,
                                correct: false,
                                text: "To vote on governance proposals",
                            },
                            {
                                optionId: 2,
                                correct: false,
                                text: "To validate transactions and secure the network",
                            },
                            {
                                optionId: 3,
                                correct: false,
                                text: "To earn interest on held tokens",
                            },
                            {
                                optionId: 4,
                                correct: true,
                                text: "All of them",
                            },
                        ],
                    },
                },
                {
                    questionId: 2,
                    timeLimit: 30,
                    text: "How does Solana's inflation rate change over time?",
                    option: {
                        create: [
                            {
                                optionId: 1,
                                correct: false,
                                text: "It increases linearly",
                            },
                            {
                                optionId: 2,
                                correct: false,
                                text: "It stays constant",
                            },
                            {
                                optionId: 3,
                                correct: true,
                                text: "It decreases over time until it reaches a long-term fixed rate",
                            },
                            {
                                optionId: 4,
                                correct: false,
                                text: "It fluctuates based on the number of transactions in the network",
                            },
                        ],
                    },
                },
            ],
        },
        quizEntry: {
            create: [
                {
                    publicKey: "Fpt6wkFGE7j2rr4V1LiQsEEJFjdui8hePRQAnxCDJgVJ",
                    points: 190,
                    numOfCorrect: 2,
                },
                {
                    publicKey: "7mhcgF1DVsj5iv4CxZDgp51H6MBBwqamsH1KnqXhSRc5",
                    points: 90,
                    numOfCorrect: 1,
                },
                {
                    publicKey: "ErDNSU1SdDajaT7oHM4FeATJXcJtfwnbhwoABZTWZ2mw",
                    points: 190,
                    numOfCorrect: 2,
                },
                {
                    publicKey: "9QgXqrgdbVU8KcpfskqJpAXKzbaYQJecgMAruSWoXDkM",
                },
            ],
        },
    },
    {
        name: "Solana dApps",
        week: 4,
        description: "",
        startDateTime: new Date("2023-06-25 12:00:00"),
        solPrice: 1.0,
        ended: false,
        question: {
            create: [
                {
                    questionId: 1,
                    timeLimit: 30,
                    text: "Which of the following is a popular decentralized exchange (DEX) built on Solana?",
                    option: {
                        create: [
                            { optionId: 1, correct: false, text: "Uniswap" },
                            {
                                optionId: 2,
                                correct: false,
                                text: "PancakeSwap",
                            },
                            { optionId: 3, correct: false, text: "SushiSwap" },
                            { optionId: 4, correct: true, text: "Serum" },
                        ],
                    },
                },
                {
                    questionId: 2,
                    timeLimit: 60,
                    text: "Which of the following Solana-based dApps allows users to create and trade Non-Fungible Tokens (NFTs)?",
                    option: {
                        create: [
                            { optionId: 1, correct: false, text: "Serum" },
                            { optionId: 2, correct: false, text: "SolFlare" },
                            { optionId: 3, correct: false, text: "Sollet" },
                            { optionId: 4, correct: true, text: "Metaplex" },
                        ],
                    },
                },
            ],
        },
        prize: {
            create: [
                {
                    prizeId: 1,
                    name: "Mad Lads #8819",
                    quantity: 1,
                    image: "https://madlads.s3.us-west-2.amazonaws.com/images/8819.png",
                    solValue: 80.47,
                },
                {
                    prizeId: 2,
                    name: "Okay Bear #9136",
                    quantity: 1,
                    image: "https://crepetoast.sgp1.digitaloceanspaces.com/nft_collections/okay-bears/large/7fegfVa1eQH16RZSzCYwo8LXXiniD1tAAxfE7djdoDVX.png",
                    solValue: 57.5,
                },
            ],
        },
        quizEntry: {
            create: [
                {
                    publicKey: "9WzDXwBbmkg8ZTbNMqUxvQRAyrZzDsGYdLVL9zYtAWWM",
                },
                {
                    publicKey: "7mhcgF1DVsj5iv4CxZDgp51H6MBBwqamsH1KnqXhSRc5",
                },
            ],
        },
    },
];

async function seed() {
    // for testing purpose
    // do a clean record each time we seed
    if (process.env.NODE_ENV === "development") {
        console.log("reset");
        const tableNames = ["Option", "Question", "QuizEntry", "Quiz", "User"];
        for (const tableName of tableNames)
            await prisma.$queryRawUnsafe(
                `Truncate "${tableName}" restart identity cascade;`
            );
    }

    for (const player of testPlayers) {
        await prisma.user.create({
            data: player,
        });
    }

    for (const quiz of testQuizzes) {
        await prisma.quiz.create({
            data: quiz,
        });
    }
}

seed()
    .catch((error) => console.error(error))
    .finally(() => prisma.$disconnect());
