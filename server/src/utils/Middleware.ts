import { RequestHandler } from "express";
import jwt from "jsonwebtoken";
import { prisma } from "..";
import { CatchAsync } from "./Utilite";

export const UserVaildation: RequestHandler = CatchAsync(async (req, res, next) => {
    const token = req?.cookies.token;

    if (!token) {
        throw new Error("token not found");
    }

    const decode = await jwt.verify(token, process.env.SECRET as string);
    const userDecode = decode as { id: number, address: string };
    
    if (!userDecode) {
        throw new Error("Jwt not found");
    }

    const user = await prisma.user.findFirst({
        where: {
            id: userDecode.id
        }
    });

    if (!user) {
        throw new Error("User not found");
    }

    req.user = {
        id: user?.id,
        address: user.solAddress
    }

    if (user) next();
})

export const AdminVaildation: RequestHandler = CatchAsync(async (req, res, next) => {
    const token = req?.cookies.token;

    if (!token) {
        throw new Error("token not found");
    }

    jwt.verify(token, process.env.SECRET as string, async (err: any, decode: any) => {
        if (err) next(err);

        const admin = await prisma.admins.findUniqueOrThrow({
            where: {
                id: decode?.id
            }
        });

        req.admin = {
            id: admin?.id,
            email: admin.email,
            password: admin.password
        }

        if (admin) next();
    })
});