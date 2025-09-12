import { prisma } from "..";
import { CatchAsync } from "../utils/Utilite";
import jwt from "jsonwebtoken";

const create_user = CatchAsync(async (req, res) => {
    const { address } = req?.body;
    if (!address) {
        throw new Error("Wallet address is required");
    }

    const tx = await prisma.$transaction(async (tx) => {
        const user = await tx.user.findFirst({
            where: {
                solAddress: address 
            }
        });

        if (user) {
            return user;
        }


        const val = await tx.user.create({
            data: {
                solAddress: address
            }
        });

        return val;
    });

    const token = jwt.sign(tx, process.env.SECRET as string);

    res.cookie('token', token, { httpOnly: false, maxAge: 1000 * 60 * 60, secure: true, sameSite: "none" }).send({ status: true });
});

const getUser = CatchAsync(async (req, res) => {
    const result = await prisma.$transaction(async (transactionClient) => {
        const user = await transactionClient
            .user
            .findFirstOrThrow({
                where: {
                    id: req?.user?.id
                },
            });


        return { user }
    })

    res.status(200).send(result);
})

const updateUsername = CatchAsync(async (req, res) => {
    const { username } = req?.body;
    if (!username) {
        throw new Error("Username is required");
    }

    const result = await prisma.$transaction(async (transactionClient) => {
        const user = await transactionClient.user.findFirst({
            where: {
                username: username
            }
        });
        if (user) {
            throw new Error("Username already exsits, use another one.");
        }

        const updateUsername = await transactionClient.user.update({
            where: {
                id: req?.user?.id
            },
            data: {
                username: username
            }
        });

        return updateUsername;
    })

    res.status(200).send({ status: true, result });
});

const getUserAdmin = (CatchAsync(async (req, res) => {
    const { page } = req.query;

    const users = await prisma.user.findMany({
        take: 10,
        orderBy: {
            connectAt: "desc"
        },
        skip: Number(page || 0) * 10,
        select: {
            username: true,
            solAddress: true,
            // ips: {
            //     take: 1,
            //     orderBy: {
            //         createdAt: "desc"
            //     },
            //     select: {
            //         ip: true,
            //         city: true,
            //         timezone: true,
            //         country: true
            //     }
            // }
        }
    });

    res.status(200).json(users);
}));

const user = {
    create_user,
    getUser,
    updateUsername,
    getUserAdmin
}

export default user;