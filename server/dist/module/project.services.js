"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const __1 = require("..");
const Utilite_1 = require("../utils/Utilite");
const addProject = (0, Utilite_1.CatchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    const result = yield __1.prisma.$transaction((transactionClient) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        const project = yield transactionClient.project.create({
            data: {
                name: body === null || body === void 0 ? void 0 : body.name,
                tagline: body === null || body === void 0 ? void 0 : body.tagline,
                image: body === null || body === void 0 ? void 0 : body.logo_image,
                reward: body === null || body === void 0 ? void 0 : body.reward,
                task: body === null || body === void 0 ? void 0 : body.task,
                userId: (_a = req === null || req === void 0 ? void 0 : req.user) === null || _a === void 0 ? void 0 : _a.id
            }
        });
        return project;
    }));
    res.status(200).json({
        status: "success",
        data: result
    });
}));
const getProjects = (0, Utilite_1.CatchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { page, search } = req.query;
    const projects = yield __1.prisma.project.findMany(Object.assign(Object.assign({ where: Object.assign(Object.assign({}, (search && {
            name: {
                contains: String(search),
                mode: "insensitive"
            }
        })), { isDelete: false }), take: 20 }, (page && { skip: Number(page) * 20 })), { select: {
            id: true,
            image: true,
            name: true,
            tagline: true,
            reward: true,
        } }));
    res.status(200).json(projects);
}));
const getMyProjects = (0, Utilite_1.CatchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const projects = yield __1.prisma.project.findMany({
        where: {
            userId: (_a = req === null || req === void 0 ? void 0 : req.user) === null || _a === void 0 ? void 0 : _a.id,
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
}));
const getSpacificProject = (0, Utilite_1.CatchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.query;
    if (!id) {
        throw new Error("Project id is required");
    }
    const project = yield __1.prisma.project.findUniqueOrThrow({
        where: {
            id: Number(id)
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
                                            projectId: Number(id)
                                        }
                                    },
                                },
                            },
                        },
                    }
                }
            }
        }
    });
    res.status(200).json(project);
}));
const updateProject = (0, Utilite_1.CatchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const body = req.body;
    if (!id) {
        throw new Error("Project id is required");
    }
    const result = yield __1.prisma.$transaction((transactionClient) => __awaiter(void 0, void 0, void 0, function* () {
        var _a, _b;
        yield transactionClient.project.findUniqueOrThrow({
            where: {
                id: Number(id),
                userId: (_a = req === null || req === void 0 ? void 0 : req.user) === null || _a === void 0 ? void 0 : _a.id
            },
        });
        const updateProject = yield transactionClient.project.update({
            where: {
                id: Number(id),
                userId: (_b = req === null || req === void 0 ? void 0 : req.user) === null || _b === void 0 ? void 0 : _b.id
            },
            data: body
        });
        return updateProject;
    }));
    res.status(200).json(result);
}));
const softDeleteProject = (0, Utilite_1.CatchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    if (!id) {
        throw new Error("Project id is required");
    }
    const softDelete = yield __1.prisma.project.update({
        where: {
            id: Number(id)
        },
        data: {
            isDelete: true
        }
    });
    res.status(200).json(softDelete);
}));
const referrelIp = (0, Utilite_1.CatchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    if (!(body === null || body === void 0 ? void 0 : body.projectId)) {
        throw new Error("Project id is required");
    }
    if (!(body === null || body === void 0 ? void 0 : body.address)) {
        throw new Error("Address is required");
    }
    const result = yield __1.prisma.$transaction((transactionClient) => __awaiter(void 0, void 0, void 0, function* () {
        const user = yield transactionClient.user.findFirst({
            where: {
                solAddress: body === null || body === void 0 ? void 0 : body.address
            }
        });
        if (!user) {
            throw new Error("user not found");
        }
        const project = yield transactionClient.project.findUniqueOrThrow({
            where: {
                id: body === null || body === void 0 ? void 0 : body.projectId
            }
        });
        if (!project) {
            throw new Error("Project not found");
        }
        const request = yield fetch(`https://ipinfo.io/?token=c79e99d0e5c9f5`);
        const requestJson = yield request.json();
        const referrel = yield __1.prisma.projectReferrel.create({
            data: {
                userId: user === null || user === void 0 ? void 0 : user.id,
                projectId: project === null || project === void 0 ? void 0 : project.id,
                visitorIp: requestJson === null || requestJson === void 0 ? void 0 : requestJson.ip,
            }
        });
        return referrel;
    }));
    res.status(200).json(result);
}));
const getAdminProjects = (0, Utilite_1.CatchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { page, search, status } = req.query;
    const projects = yield __1.prisma.project.findMany(Object.assign(Object.assign({ where: Object.assign(Object.assign({}, (search && {
            name: {
                contains: String(search),
                mode: "insensitive"
            }
        })), (status === "deleted" ? {
            isDelete: true
        } : { isDelete: false })), take: 20 }, (page && { skip: Number(page) * 20 })), { select: {
            id: true,
            image: true,
            name: true,
            tagline: true,
            reward: true,
            task: true,
            _count: {
                select: {
                    ProjectReferrel: true
                }
            }
        } }));
    res.status(200).json(projects);
}));
const deleteProject = (0, Utilite_1.CatchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.body;
    if (!id) {
        throw new Error("Project id is required");
    }
    const result = yield __1.prisma.$transaction((transactionClient) => __awaiter(void 0, void 0, void 0, function* () {
        const project = yield transactionClient.project.findUniqueOrThrow({
            where: {
                id
            }
        });
        const deleted = yield transactionClient.project.update({
            where: {
                id: project === null || project === void 0 ? void 0 : project.id
            },
            data: {
                isDelete: true
            }
        });
        return deleted;
    }));
    res.status(200).json(result);
}));
const undoProject = (0, Utilite_1.CatchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.body;
    if (!id) {
        throw new Error("Project id is required");
    }
    const result = yield __1.prisma.$transaction((transactionClient) => __awaiter(void 0, void 0, void 0, function* () {
        const project = yield transactionClient.project.findUniqueOrThrow({
            where: {
                id
            }
        });
        const deleted = yield transactionClient.project.update({
            where: {
                id: project === null || project === void 0 ? void 0 : project.id
            },
            data: {
                isDelete: false
            }
        });
        return deleted;
    }));
    res.status(200).json(result);
}));
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
    undoProject
};
exports.default = project;
