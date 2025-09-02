import { prisma } from "..";
import { CatchAsync } from "../utils/Utilite";

const newTap = CatchAsync(async (req, res) => {
    const { jwtToken } = req.body;

    if (!jwtToken) {
        throw new Error("Jwt token required to claim reward, close app and open again to get it.");
    }

    const tapInfo: { tap: number, coin: number, lastTapAt: Date } = JSON.parse(atob(jwtToken));
    if (tapInfo?.tap === 0) {
        throw new Error("Can't claim 0 meaw.");
    }

    const result = await prisma.$transaction(async(prismaClient)=>{
        const user = await prismaClient.user.findFirstOrThrow({
            where: {
                id: req?.user?.id
            }
        });

        const update_balance = await prismaClient.user.update({
            where: {
                id: user?.id
            },
            data: {
                balance: {increment: tapInfo?.coin}
            }
        });

        const tap = await prismaClient.tapReward.create({
            data: {
                userTgId: update_balance?.tgId,
                reward: tapInfo?.coin,
            }
        });

        return tap;
    })

    res.send(result);
});

const tap = {
    newTap
}

export default tap;