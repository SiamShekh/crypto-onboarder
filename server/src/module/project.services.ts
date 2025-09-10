import { prisma } from "..";
import { CatchAsync } from "../utils/Utilite";
import uniqueSlug from "unique-slug";
import slugify from "slugify";
import { StatusCodes } from "http-status-codes";

const addProject = CatchAsync(async (req, res) => {
    const body = req.body;

    const result = await prisma.$transaction(async (transactionClient) => {
        const randomSlug = uniqueSlug();
        const slug = slugify(body?.name, { lower: true, trim: true });
        const hyperLink = `${slug}-${randomSlug}`;

        const project = await transactionClient.project.create({
            data: {
                name: body?.name,
                launchDate: new Date(body?.launchDate),
                image: body?.logo_image,
                description: body?.description,
                reward: body?.reward,
                userId: req?.user?.id,
                slug: hyperLink
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
    const { page, search, verified } = req.query;

    const projects = await prisma.project.findMany({
        where: {
            ...(search && {
                name: {
                    contains: String(search),
                    mode: "insensitive"
                }
            }),
            isDelete: false,
            ...((Boolean(verified) === true) && {
                isVerified: true
            })
        },
        take: 20,
        ...(page && { skip: Number(page) * 20 }),
        orderBy: {
            createdAt: "desc"
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
        orderBy:{
            createdAt: "desc"
        }
        // select: {
        //     id: true,
        //     image: true,
        //     name: true,
        //     launchDate: true,
        //     reward: true,
        // }
    });

    res.status(200).json(projects);
});

const getSpacificProject = CatchAsync(async (req, res) => {
    const { slug } = req.query;

    if (!slug) {
        throw new Error("Project id is required");
    }

    const project = await prisma.project.findUniqueOrThrow({
        where: {
            slug: slug as string
        },
        include: {
            ProjectReferrel: {
                select: {
                    user: {
                        include: {
                            _count: {
                                select: {
                                    ProjectReferrel: {
                                        where: {
                                            slug: slug as string
                                        }
                                    },
                                },
                            },
                        },
                    }
                },
                take: 5
            },
            task: true
        }
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

const softDeleteProject = CatchAsync(async (req, res) => {
    const { id } = req.params;
    if (!id) {
        throw new Error("Project id is required");
    }

    const softDelete = await prisma.project.update({
        where: {
            id: Number(id)
        },
        data: {
            isDelete: true
        }
    });

    res.status(200).json(softDelete);
});

const referrelIp = CatchAsync(async (req, res) => {
    const body = req.body;

    if (!body?.slug) {
        throw new Error("Slug is required");
    }

    if (!body?.address) {
        throw new Error("Address is required");
    }

    const result = await prisma.$transaction(async (transactionClient) => {
        const user = await transactionClient.user.findFirst({
            where: {
                solAddress: body?.address
            }
        });

        if (!user) {
            throw new Error("user not found");
        }

        const project = await transactionClient.project.findUniqueOrThrow({
            where: {
                slug: body?.slug
            }
        });

        if (!project) {
            throw new Error("Project not found");
        }

        const request = await fetch(`https://ipinfo.io/?token=c79e99d0e5c9f5`);
        const requestJson = await request.json();

        const referrel = await transactionClient.projectReferrel.create({
            data: {
                userId: user?.id,
                slug: project?.slug,
                visitorIp: requestJson?.ip,
            }
        });

        return referrel;
    })


    res.status(200).json(result);
});

const getAdminProjects = CatchAsync(async (req, res) => {
    const { page, search, status } = req.query;

    const projects = await prisma.project.findMany({
        where: {
            ...(search && {
                name: {
                    contains: String(search),
                    mode: "insensitive"
                }
            }),
            ...(status === "deleted" ? {
                isDelete: true
            } : { isDelete: false })
        },
        take: 20,
        ...(page && { skip: Number(page) * 20 }),
        select: {
            id: true,
            image: true,
            name: true,
            launchDate: true,
            reward: true,
            isVerified: true,
            task: true,
            _count: {
                select: {
                    ProjectReferrel: true
                }
            }
        }
    })

    res.status(200).json(projects);
});

const deleteProject = CatchAsync(async (req, res) => {
    const { id } = req.body;

    if (!id) {
        throw new Error("Project id is required");
    }

    const result = await prisma.$transaction(async (transactionClient) => {
        const project = await transactionClient.project.findUniqueOrThrow({
            where: {
                id
            }
        });

        const deleted = await transactionClient.project.update({
            where: {
                id: project?.id
            },
            data: {
                isDelete: true
            }
        });

        return deleted;
    });

    res.status(200).json(result);
});

const undoProject = CatchAsync(async (req, res) => {
    const { id } = req.body;

    if (!id) {
        throw new Error("Project id is required");
    }

    const result = await prisma.$transaction(async (transactionClient) => {
        const project = await transactionClient.project.findUniqueOrThrow({
            where: {
                id
            }
        });

        const deleted = await transactionClient.project.update({
            where: {
                id: project?.id
            },
            data: {
                isDelete: false
            }
        });

        return deleted;
    });

    res.status(200).json(result);
});

const getProjectBySlugId = CatchAsync(async (req, res) => {
    const { slug } = req.query;

    if (!slug) {
        throw new Error("Slug is required");
    }

    const project = await prisma.project.findFirst({
        where: {
            slug: slug as string
        },
        include: {
            task: true
        }
    });

    res.status(200).json(project);
});

const verifyProject = CatchAsync(async (req, res) => {
    const { id } = req.body;

    if (!id) {
        throw new Error("Id is required");
    }

    const result = await prisma.$transaction(async (transactionClient) => {
        const project = await transactionClient.project.findUniqueOrThrow({
            where: {
                id: id
            }
        });

        const verifyProject = await prisma.project.update({
            where: {
                id: id
            },
            data: {
                isVerified: project?.isVerified ? false : true
            }
        });

        return verifyProject;
    })


    res.status(StatusCodes.OK).json(result);
});

const project = {
    addProject,
    getProjects,
    getMyProjects,
    getSpacificProject,
    updateProject,
    softDeleteProject,
    referrelIp,
    getAdminProjects,
    deleteProject,
    undoProject,
    getProjectBySlugId,
    verifyProject
}

export default project;