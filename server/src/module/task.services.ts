import { prisma } from "..";
import { CatchAsync } from "../utils/Utilite";

const addTask = CatchAsync(async (req, res) => {
    const body = req.body;
    const { projectId, taskLabel, taskImg, taskHref } = body;

    if (!projectId) {
        throw new Error("Project id is required");
    }

    if (!taskLabel) {
        throw new Error("Label is required");
    }

    if (!taskImg) {
        throw new Error("Icon is required");
    }

    if (!taskHref) {
        throw new Error("Task link is required");
    }

    const task = await prisma.task.create({
        data: {
            projectId: Number(projectId),
            taskLabel,
            taskHref,
            taskImg,
            userId: req?.user?.id
        }
    });

    res.status(200).json(task);
});

const deleteTask = CatchAsync(async (req, res) => {
    const { id } = req.body;

    if (!id) {
        throw new Error("Task id required");
    }

    const result = await prisma.$transaction(async (transactionClient) => {
        const task = await transactionClient.task.findUniqueOrThrow({
            where: {
                id
            }
        });

        const deleted = await transactionClient.task.delete({
            where: {
                id
            }
        });

        return deleted;
    })

    res.status(200).json(result);
})

const task = {
    addTask,
    deleteTask
}

export default task;