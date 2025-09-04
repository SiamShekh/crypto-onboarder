import { prisma } from "..";
import { CatchAsync } from "../utils/Utilite";

const addProject = CatchAsync(async (req, res) => {
    const body = req.body;

    const result = await prisma.$transaction(async (transactionClient) => {
        const user = await transactionClient.user.findUniqueOrThrow({
            where: {
                id: req?.user?.id
            }
        });

        const project = await transactionClient.project.create({
            data: {
                name: body?.name,
                tagline: body?.tagline,
                image: body?.logo_image,
                reward: body?.reward,
                task: body?.task,
                userId: user?.id
            }
        });

        return project;
    });

    res.status(200).json({
        status: "success",
        data: result
    })
})

const project = {
    addProject
}

export default project;