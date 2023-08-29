// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "next-auth/jwt";
import authAdminMiddleware from "../../../middlewares/authAdminMiddleware";
import { User } from "@prisma/client";
import { ErrorMessage } from "../../../types/errorMessage";
import adminService from "../../../service/adminService";

const handler = async (
    req: NextApiRequest,
    res: NextApiResponse<User | ErrorMessage>
) => {
    const { method, body, query } = req;
    const publicKey = query.publicKey as string

    switch (method) {
        case "GET": {
            try {
                const admin: User = await adminService.getAdmin({publicKey})

                return res.status(200).json(admin)
            } catch (error: any) {
                if(error.message === "Admin not found"){
                    return res.status(404).json({message: error.message})
                }
                return res.status(500).json({message: "Internal server error"})
            }
        }

        case "DELETE": {
            try {
                const deletedAdmin = await adminService.deleteAdmin({publicKey})
                
                return res.status(200).json({message: "Admin deleted"})
            } catch (error: any) {
                if(error.message === "Admin not found") {
                    return res.status(404).json({message: error.message})
                }
                return res.status(500).json({message: "Internal server error"})
            }
        }
        default:
            res.setHeader("Allow", ["GET", "POST", "PUT", "DELETE"]);
            return res
                .status(405)
                .json({ message: `Method ${method} not allowed` });
    }
};

export default authAdminMiddleware(handler);
