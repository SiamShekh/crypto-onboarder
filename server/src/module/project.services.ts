import { prisma } from "..";
import { CatchAsync } from "../utils/Utilite";

const addProject = CatchAsync(async (req, res) => {
    const body = req.body;

    const result = await prisma.$transaction(async (transactionClient) => {
        const project = await transactionClient.project.create({
            data: {
                name: body?.name,
                tagline: body?.tagline,
                image: body?.logo_image,
                reward: body?.reward,
                task: body?.task,
                userId: req?.user?.id
            }
        });

        return project;
    });

    res.status(200).json({
        status: "success",
        data: result
    })
});

const getProjects = CatchAsync(async (req, res) => {
    const { page, search } = req.query;

    const projects = await prisma.project.findMany({
        where: {
            ...(search && {
                name: {
                    contains: String(search),
                    mode: "insensitive"
                }
            }),
        },
        take: 20,
        ...(page && { skip: Number(page) * 20 }),
        select: {
            id: true,
            image: true,
            name: true,
            tagline: true,
            reward: true,

        }
    })

    res.status(200).json(projects);
})

const project = {
    addProject,
    getProjects
}

export default project;