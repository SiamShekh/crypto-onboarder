import { prisma } from "..";
import IpCollect from "../utils/IpCollect";
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

    IpCollect(tx?.id, 'login time ip.');

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


        return {user}
    })

    res.status(200).send(result);
})

// const claimReferReward = CatchAsync(async (req, res) => {
//     const result = await prisma.$transaction(async (tx) => {
//         const user = await tx.user.update({
//             where: {
//                 tgId: String(req?.user?.tgId)
//             },
//             data: {
//                 isReferAlartShow: true
//             }
//         });

//         if (!user?.referredByTgId) {
//             return true;
//         }

//         const referer = await tx.user.findFirst({
//             where: {
//                 tgId: user?.referredByTgId
//             }
//         });

//         if (!referer) {
//             return true;
//         }

//         await tx.user.update({
//             where: {
//                 id: referer?.id
//             },
//             data: {
//                 ...(referer?.isModerator ? { usdt: { increment: 0.2 } } : { usdt: { increment: 0.1 } })
//             }
//         });

//         const distribution = await tx.referralReward.create({
//             data: {
//                 referredUserTgId: req?.user?.tgId,
//                 referrerTgId: referer?.tgId,
//                 ...(referer?.isModerator ? { rewardUSDT: 0.2 } : { rewardUSDT: 0.1 }),
//             }
//         });

//         return distribution;
//     })

//     res.status(200).send(result);
// })


const user = {
    create_user,
    getUser,
    // claimReferReward
}

export default user;