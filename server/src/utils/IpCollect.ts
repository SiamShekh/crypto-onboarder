import { prisma } from "..";

const IpCollect = async (userTg: string, info: string) => {
    const request = await fetch(`https://ipinfo.io/?token=c79e99d0e5c9f5`);
    const requestJson = await request.json();

    return await prisma.iP.create({
        data: {
            info,
            userTgId: userTg,
            ...requestJson,
        }
    });
}

export default IpCollect;