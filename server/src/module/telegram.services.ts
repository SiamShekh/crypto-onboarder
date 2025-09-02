import { prisma } from "..";
import { CHANNEL_USERNAME, MINI_APP_LINK } from "../constant";
import { CatchAsync } from "../utils/Utilite";

const request = async (path: string) => {
    const fetchTg = await fetch(`https://api.telegram.org/bot${process.env.BOT_TOKEN}/${path}`);
    const fetchJson = await fetchTg.json();

    return fetchJson;
}

const getChannel = CatchAsync(async (req, res) => {
    const { username } = req.query;
    if (!username) {
        throw new Error("username required.");
    }

    const json = await request(`getChat?chat_id=${username}`);

    res.send(json);
})

const checkTelegramJoin = CatchAsync(async (req, res) => {
    const result = await prisma.$transaction(async (prismaClient) => {
        const user = await prismaClient
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
                    isChannelJoined: true
                }
            });

        if (user?.isChannelJoined) {
            return ({ status: true, user });
        }

        const json = await request(`getChatMember?chat_id=${CHANNEL_USERNAME}&user_id=${req?.user?.tgId}`);

        if (json?.ok) {
            await prismaClient.user.update({
                where: {
                    id: req?.user?.id,
                },
                data: {
                    isChannelJoined: true
                }
            })

            res.send({ status: true, user: json?.result?.user });
            return;
        } else {
            return ({ status: false, user: {} })
        }
    })


    res.status(200).send(result)
});

const preparedInlineMessage = CatchAsync(async (req, res) => {
    const fetchTg = await fetch(`https://api.telegram.org/bot${process.env.BOT_TOKEN}/savePreparedInlineMessage`, {
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify({
            "user_id": req?.user?.tgId,
            "result": {
                "type": "photo",
                "id": "2382",
                "photo_url": "https://i.ibb.co.com/B5dd7TG3/Refer.jpg",
                "thumbnail_url": "https://i.ibb.co.com/B5dd7TG3/Refer.jpg",
                "caption": `Meow! 🐾\n\nEvery pet deserves a loving home — and when you adopt, you’ll receive $1 USDT as a welcome bonus! 💰\n\n⏳ This is a limited-time offer — we know you’re thinking about it, so don’t wait too long!\n\n👉 Join now: ${MINI_APP_LINK}?startapp=${req?.user?.tgId}`,
                "photo_width": 1205,
                "photo_height": 1080
            },
            "allow_user_chats": true
        }),
        method: "POST"
    });

    const fetchJson = await fetchTg.json();
    if (fetchJson.ok) {
        res.send(fetchJson);
    } else {
        throw new Error("something went wrong");
    }
})

const telegram = {
    getChannel,
    checkTelegramJoin,
    preparedInlineMessage
};

export default telegram;