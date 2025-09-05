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
            isDelete: false
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
});

const getMyProjects = CatchAsync(async (req, res) => {
    const projects = await prisma.project.findMany({
        where: {
            userId: req?.user?.id,
            isDelete: false
        },
        select: {
            id: true,
            image: true,
            name: true,
            tagline: true,
            reward: true,
        }
    });

    res.status(200).json(projects);
});

const getSpacificProject = CatchAsync(async (req, res) => {
    const { id } = req.query;

    if (!id) {
        throw new Error("Project id is required");
    }

    const project = await prisma.project.findUniqueOrThrow({
        where: {
            id: Number(id)
        },
    });

    res.status(200).json(project);
});

const updateProject = CatchAsync(async (req, res) => {
    const { id } = req.params;
    const body = req.body;
    
    if (!id) {
        throw new Error("Project id is required");
    }

    const result = await prisma.$transaction(async (transactionClient) => {
        await transactionClient.project.findUniqueOrThrow({
            where: {
                id: Number(id),
                userId: req?.user?.id
            },
        });

        const updateProject = await transactionClient.project.update({
            where: {
                id: Number(id),
                userId: req?.user?.id
            },
            data: body
        });

        return updateProject;
    })


    res.status(200).json(result);
});

const softDeleteProject = CatchAsync(async(req, res)=>{
    const { id } = req.params;
    if (!id) {
        throw new Error("Project id is required");
    }

    const softDelete = await  prisma.project.update({
        where: {
            id: Number(id)
        },
        data:{
            isDelete: true
        }
    });

    res.status(200).json(softDelete);
})

const project = {
    addProject,
    getProjects,
    getMyProjects,
    getSpacificProject,
    updateProject,
    softDeleteProject
}

export default project;