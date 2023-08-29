import { User, Role } from "@prisma/client";

interface GetAdminRequest {
    publicKey: string;
}

interface CreateAdminRequest {
    publicKey: string;
    profilePicture?: string;
    userName: string;
}

interface DeleteAdminRequest {
    publicKey: string;
}

const getAllAdmins = async () => {
    const admins = await prisma.user.findMany({
        where: { role: Role.ADMIN },
    });

    if (!admins) {
        throw Error("Admins not found");
    }

    return admins;
};

const getAdmin = async (data: GetAdminRequest) => {
    const { publicKey } = data;

    const admin = await prisma.user.findUnique({
        where: { publicKey: publicKey },
    });

    if(!admin){
        throw Error("Admin not found")
    }

    return admin;
};

const createAdmin = async (data: CreateAdminRequest) => {
    const { publicKey, profilePicture, userName } = data;

    const existingAdmin = await prisma.user.findUnique({
        where: { publicKey: publicKey },
    });

    if (!existingAdmin) {
        const newAdmin = await prisma.user.create({
            data: {
                publicKey,
                profilePicture,
                userName,
                role: Role.ADMIN,
            },
        });
        return newAdmin;
    }

    if (existingAdmin.role !== Role.ADMIN) {
        const updatedAdmin = await prisma.user.update({
            where: { publicKey: publicKey },
            data: { role: Role.ADMIN },
        });
        return updatedAdmin;
    }

    throw Error("Admin already exists");
};

const deleteAdmin = async (data: DeleteAdminRequest) => {
    const { publicKey } = data;

    const admin = await prisma.user.findUnique({
        where: {publicKey: publicKey}
    })

    if(!admin){
        throw Error("Admin not found")
    }

    const deletedAdmin = await prisma.user.delete({
        where: {publicKey: publicKey}
    })

    return deletedAdmin
};

const adminService = {
    getAllAdmins,
    getAdmin,
    createAdmin,
    deleteAdmin,
};

export default adminService;
