
interface GetAllPrizesRequest {
    quizId: number
}

interface GetPrizeRequest {
    quizId: number
    prizeId: number
}

interface CreatePrizeRequest {
    quizId: number
    name: string
    quantity: number
    image: string
    solValue: number
}

interface UpdatePrizeRequest {
    quizId: number
    prizeId: number
    name?: string
    quantity?: number
    image?: string
    solValue?: number
}

interface DeletePrizeRequest {
    quizId: number
    prizeId: number
}

const getAllPrizes = async(data: GetAllPrizesRequest) => {
    const {quizId} = data;
    const prizes = await prisma.prize.findMany(
        {
            where: {quizId}
        }
    )

    if(!prizes) {
        throw Error("Prizes not found")
    }

    return prizes;
}

const getPrize = async(data: GetPrizeRequest) => {
    const {quizId, prizeId} = data;

    const prize = await prisma.prize.findUnique({
        where: {
            quizId_prizeId: {quizId: quizId, prizeId: prizeId}
        }
    })

    if(!prize) {
        throw Error("Prize not found")
    }

    return prize
}

const createPrize = async(data: CreatePrizeRequest) => {
    const {quizId, name, quantity, image, solValue} = data

    const quiz = await prisma.quiz.findUnique({
        where: {quizId}
    })

    if(!quiz) {
        throw Error("Quiz not found")
    }

    // Retrieve the highest existing prizeId for the quiz
	const highestPrizeId = await prisma.prize.findFirst({
		where: { quizId },
		orderBy: { prizeId: 'desc' },
		select: { prizeId: true },
	});

	// Increment the prizeId
	const prizeId = highestPrizeId ? highestPrizeId.prizeId + 1 : 1;
    
    const newPrize = await prisma.prize.create({
        data: {
            quizId,
            prizeId,
            name,
            quantity,
            image,
            solValue
        }
    })

    return newPrize
}

const updatePrize = async(data: UpdatePrizeRequest) => {
    const {quizId, prizeId, name, quantity, image, solValue} = data
    const existingPrize = await prisma.prize.findUnique({
        where: {
            quizId_prizeId: {quizId: quizId, prizeId: prizeId}
        }
    })

    if(!existingPrize){
        throw Error("Prize not found")
    }

    const updatedPrize = await prisma.prize.update({
        where: {
            quizId_prizeId: {quizId: quizId, prizeId: prizeId}
        },
        data: {
            name: name,
            quantity: quantity,
            image: image,
            solValue: solValue
        }
    })

    return updatedPrize
}

const deletePrize = async(data: DeletePrizeRequest) => {
    const {quizId, prizeId} = data
    const existingPrize = await prisma.prize.findUnique({
        where: {
            quizId_prizeId: {quizId: quizId, prizeId: prizeId}
        }
    })

    if(!existingPrize) {
        throw Error("Prize not found")
    }

    const deletedPrize = await prisma.prize.delete({
        where: {
            quizId_prizeId: {quizId: quizId, prizeId: prizeId}
        }
    })

    return deletedPrize
}

const prizeService = {
    getAllPrizes,
    getPrize,
    createPrize,
    updatePrize,
    deletePrize
}

export default prizeService;
