import { RequestHandler } from "express";
import jwt from "jsonwebtoken";
import { prisma } from "..";
import { CatchAsync } from "./Utilite";

export const UserVaildation: RequestHandler = CatchAsync(async (req, res, next) => {
    const token = req?.cookies.token;

    if (!token) {
        throw new Error("token not found");
    }

    jwt.verify(token, process.env.SECRET as string, async (err:any, decode: any) => {
        if (err) next(err);
        
        const user = await prisma.user.findUniqueOrThrow({
            where: {
                id: decode?.id
            }
        });

        req.user = {
            id: user?.id,
            address: user.solAddress
        }

        if (user) next();
    })
})

