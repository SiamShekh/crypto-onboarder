import { prisma } from "..";
import IpCollect from "../utils/IpCollect";
import { CatchAsync } from "../utils/Utilite";
import { isValid, parse } from '@telegram-apps/init-data-node';
import jwt from "jsonwebtoken";

const create_user = CatchAsync(async (req, res) => {
    const { key } = req?.body;
    if (!key) {
        throw new Error("init key is not found");
    }

    if (!isValid(key, process.env.BOT_TOKEN as string)) {
        throw new Error("Unknown traffic");
    }

    const parseValue = parse(key);

    const tx = await prisma.$transaction(async (tx) => {
        const user = await tx.user.findFirst({
            where: {
                tgId: String(parseValue?.user?.id)
            }
        });

        if (user) {
            return user;
        }

        const referer = await tx.user.findFirst({
            where: {
                tgId: parseValue?.start_param
            }
        });

        // if (referer) {

        // }

        const val = await tx.user.create({
            data: {
                name: parseValue?.user?.first_name + " " + parseValue?.user?.last_name,
                tgId: String(parseValue?.user?.id),
                username: parseValue?.user?.username,
                referralCode: String(parseValue?.user?.id),
                balance: Math.floor(Math.random() * 400),
                ...(referer?.tgId && { referredByTgId: parseValue?.start_param })
            }
        });

        // if (val?.referBy) {
        //     await tx.joining_reward_by_refer.create({
        //         data:{
        //             userTg: val?.tgId,
        //             rewardInUSDT: 1
        //         }
        //     })
        // }

        return val;
    });

    IpCollect(tx?.tgId, 'login time ip.');

    const token = jwt.sign(tx, process.env.SECRET as string);

    res.send({ token: token, channel_join: tx?.isChannelJoined });
});

const getUser = CatchAsync(async (req, res) => {

    const result = await prisma.$transaction(async (transactionClient) => {
        const user = await transactionClient
            .user
            .findFirstOrThrow({
                where: {
                    id: req?.user?.id
                },
                select: {
                    name: true,
                    balance: true,
                    isBlocked: true,
                    isDeleted: true,
                    isChannelJoined: true,
                    joinedAt: true,
                    tgId: true,
                    referredByTgId: true,
                    isReferAlartShow: true
                }
            });

        const rank = await transactionClient.user.count({
            where: {
                balance: { gte: user?.balance }
            }
        });

        const frens = await transactionClient.user.count({
            where: {
                referredByTgId: user?.tgId
            }
        });

        const friends = await transactionClient.referralReward.findMany({
            where: {
                referrerTgId: req?.user?.tgId,
            },
            select: {
                referredUser: {
                    select: {
                        name: true,
                        username: true,
                    }
                },
                rewardUSDT: true,
                createdAt: true
            },
            orderBy: {
                createdAt: "desc"
            },
            take: 5
        })

        return { ...user, rank: rank || 0, frens: frens || 0, friends: friends }
    })

    res.status(200).send(result);
})

const claimReferReward = CatchAsync(async (req, res) => {
    const result = await prisma.$transaction(async (tx) => {
        const user = await tx.user.update({
            where: {
                tgId: String(req?.user?.tgId)
            },
            data: {
                isReferAlartShow: true
            }
        });

        if (!user?.referredByTgId) {
            return true;
        }

        const referer = await tx.user.findFirst({
            where: {
                tgId: user?.referredByTgId
            }
        });

        if (!referer) {
            return true;
        }

        await tx.user.update({
            where: {
                id: referer?.id
            },
            data: {
                ...(referer?.isModerator ? { usdt: { increment: 0.2 } } : { usdt: { increment: 0.1 } })
            }
        });

        const distribution = await tx.referralReward.create({
            data: {
                referredUserTgId: req?.user?.tgId,
                referrerTgId: referer?.tgId,
                ...(referer?.isModerator ? { rewardUSDT: 0.2 } : { rewardUSDT: 0.1 }),
            }
        });

        return distribution;
    })

    res.status(200).send(result);
})


const user = {
    create_user,
    getUser,
    claimReferReward
}

export default user;