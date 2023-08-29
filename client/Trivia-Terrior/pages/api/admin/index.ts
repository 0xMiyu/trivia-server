import type { NextApiRequest, NextApiResponse } from "next";
import authAdminMiddleware from "../../../middlewares/authAdminMiddleware";
import { User, Role } from "@prisma/client";
import { ErrorMessage } from "../../../types/errorMessage";
import adminService from "../../../service/adminService";

interface CreateAdminRequest {
    publicKey: string;
    profilePicture?: string;
    userName: string;
}

const handler = async (
    req: NextApiRequest,
    res: NextApiResponse<User[] | User | ErrorMessage>
) => {
    const { method, body, query } = req;

    switch (method) {
        case "GET": {
            try {
                const admins: User[] = await adminService.getAllAdmins()
                return res.status(200).json(admins);
            } catch (error: any) {
                if(error.message === "Admins not found"){
                    return res.status(404).json({message: error.message})
                }
                return res
                    .status(500)
                    .json({ message: "Internal Server Error" });
            }
        }

        case "POST": {
            try {
                const {
                    publicKey,
                    profilePicture,
                    userName,
                }: CreateAdminRequest = body;

                if (!publicKey) {
                    return res.status(400).json({ message: "Missing params" });
                }

                const newAdmin: User = await adminService.createAdmin({publicKey, profilePicture, userName})

                return res.status(201).json(newAdmin);
            } catch (error: any) {
                if(error.messagee === "Admin already exists"){
                    return res.status(400).json({message: error.message})
                }
                return res
                    .status(500)
                    .json({ message: "Internal Server Error" });
            }
        }

        case "DELETE": {
            try {
                const { publicKey }: User = req.body;
                const admin = await prisma.user.findUnique({
                    where: { publicKey: publicKey }
                });

                if(!admin || admin.role !== Role.ADMIN){
                    return res.status(404).json({message: "Admin not found!"})
                }

                await prisma.user.delete({
                    where: { publicKey: publicKey },
                });

                return res
                    .status(200)
                    .json({ message: "Admin deleted successfully" });
            } catch (error:any) {
                console.log(error.message);
                return res
                    .status(500)
                    .json({ message: "Internal Server Error" });
            }
        }
    }
};

export default authAdminMiddleware(handler);
